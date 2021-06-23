/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

%%

\s+                                                     /* skip whitespace */

"last"                                                  return 'resLast'
"attr"                                                  return 'resAttr'
"node"                                                  return 'resNode'
"text"                                                  return 'resText'
"position"                                              return 'resPosition'
"parent"                                                return 'resParent'
"child"                                                 return 'resChild'
"self"                                                  return 'resSelf'
"preceding"                                             return 'resPrec'
"preceding-sibling"                                     return 'resPrecSibling'
"attribute"                                             return 'resAttribute'
"descendant"                                            return 'resDesc'
"descendant-or-self"                                    return 'resDescSelf'
"ancestor"                                              return 'resAnc'
"ancestor-or-self"                                      return 'resAncSelf'
"folowing"                                              return 'resFollow'
"folowing-sibling"                                      return 'resFollowSibling'
"div"                                                   return 'opDiv'
"mod"                                                   return 'opMod'
"or"                                                    return 'oPor'
"and"                                                   return 'opAnd'
"+"                                                     return '+'
"-"                                                     return '-'
"*"                                                     return '*'
"="                                                     return '='
"!="                                                    return '!='
"<"                                                     return '<'
">"                                                     return '>'
"<="                                                    return '<='
">="                                                    return '>='
"/"                                                     return 'div'
"|"                                                     return '|'
"."                                                     return '.'
".."                                                    return '..'
"::"                                                    return '::'
"@"                                                     return '@'
"["                                                     return '['
"]"                                                     return ']'
"("                                                     return '('
")"                                                     return ')'

/* Number literals */

(([0-9]+"."[0-9]*)|("."[0-9]+))                         return 'double';
[0-9]+                                                  return 'integer';
([a-zA-Z])[a-zA-Z0-9_]*                                 return 'id';
{stringliteral}                                         return 'StringLiteral'

<<EOF>>                                                 return 'EOF'

//error lexico
.                                                       {
                                                            var lexerAscError = new Error(
                                                                yytext, 
                                                                yylloc.first_line, 
                                                                yylloc.first_column, 
                                                                'Error léxico'
                                                            );
                                                            xPathAscSyntaxErrors.push(lexerAscError)
                                                        }

/lex

//SECCION DE IMPORTS
%{
        const { Error } = require('../Errores/Error')
        const { Element, Filter, Operation, TypeElement, TypeOperation } = require('../Instrucciones/Element/Element')

        var xPathAscSyntaxErrors = []
        var xPathAscLexerErrors = []
        var xPathAscAST_nodes
        var xPathAscAST_path
        var xPathAscAST_pathAux
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'opOr'
%left 'opAnd'
%left '=' '!=' '<' '>' '<=' '>='
%left '+' '-'
%left '*' 'opDiv' 'opMod'
%right '.' div

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START : 
        PATHS EOF               {
                                    $$ =    { 
                                                XPath: $1,
                                                SyntaxErrors: xPathAscSyntaxErrors,
                                                LexerErrors: xPathAscLexerErrors
                                            };

                                    var nodo = {
                                        name: 'START',
                                        val: 'START',
                                        children: [xPathAscAST_path]
                                    }
                                    $$ = {...$$, Nodo: nodo}

                                    xPathAscLexerErrors = [];
                                    xPathAscSyntaxErrors = [];

                                    return $$; 
                                }
        ;

PATHS : 
        PATHS '|' PATH          { 
                                    $1.push($3) 
                                    $$ = $1
                                    var nodo = {
                                        name: 'PATHS', 
                                        val: 'PATHS', 
                                        children: [
                                            xPathAscAST_path,
                                            {name: '|', val: '|', children: []},
                                            xPathAscAST_pathAux
                                        ]
                                    }
                                    xPathAscAST_path = nodo
                                }
        | PATH                  { 
                                    $$ = [$1]
                                    var nodo = {name: 'PATHS', val: 'PATHS', children: [xPathAscAST_pathAux]}
                                    xPathAscAST_path = nodo
                                }
        ;

PATH : 
        NODES                   { 
                                    $$ = $1 
                                    var nodo = {name: 'PATH', val: 'PATH', children: [xPathAscAST_nodes]}
                                    // $$ = {...$$, Nodo: nodo}
                                    xPathAscAST_pathAux = nodo
                                }
        ;

NODES :
        NODES SLASH EL       {
                                    $3.slashes = $2.count
                                    $1.push($3)
                                    $$ = $1
                                    var nodo = {
                                        name: 'NODES',
                                        val: 'NODES',
                                        children: [
                                            xPathAscAST_nodes,
                                            $3.Nodo
                                        ]
                                    }
                                    xPathAscAST_nodes = nodo
                                }
        | SLASH EL           {
                                    $2.slashes = $1.count
                                    $$ = [$2]
                                    var nodo = {
                                        name: 'NODES',
                                        val: 'NODES',
                                        children: [
                                            $1.Nodo
                                        ]
                                    }
                                    xPathAscAST_nodes = nodo
                                }
        ;

SLASH:
        div div                 { 
                                    $$ = { count: 2 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: [
                                            {name: 'div', val: '/', children: []},
                                            {name: 'div', val: '/', children: []},
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | div                   { 
                                    $$ = { count: 1 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: [{name: 'div', val: '/', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        |                       { 
                                    $$ = { count: 0 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: []
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
;

EL :
        id                      { 
                                    $$ = new Element($1, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: 'id', val: $1, children: []},]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | id PRE                { 
                                    $$ = new Element($1, TypeElement.NODO, $2, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: 'id', val: $1, children: []},{name: 'PRE', val: $2, children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resParent '::' id     { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resParent', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resChild '::' id      { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resChild', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resSelf '::' id       { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resSelf', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resPrec '::' id       { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resPrec', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resPrecSibling '::' id   { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resPrecSibling', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resAttribute '::' id  { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAttribute', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resDesc '::' id       { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resDesc', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resDescSelf '::' id   { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resDescSelf', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resAnc '::' id        { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAnc', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resAncSelf '::' id    { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAncSelf', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resFollow '::' id     { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resFollow', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resFollowSibling '::' id  { 
                                    $$ = new Element($3, TypeElement.NODO, undefined, 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resFollowSibling', val: $1, children: []}, 
                                            {name: 'id', val: $3, children: []}
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | '*'                   { 
                                    $$ = new Element('', TypeElement.ALL, [], 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '*', val: '*', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | '..'                  { 
                                    $$ = new Element('', TypeElement.PARENT, [], 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '..', val: '..', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | '.'                   { 
                                    $$ = new Element('', TypeElement.CURRENT, [], 1, @1.first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '.', val: '.', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | ATTR                  { 
                                    $$ = $1 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [$1.Nodo]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | error                 { 
                                    var xPathSyntaxAscError = new Error(
                                        yytext,
                                        this._$.first_line,
                                        this._$.first_column,
                                        'Error sintáctico'    
                                    )
                                    xPathAscSyntaxErrors.push(xPathSyntaxAscError) 
                                }
        ;

ATTR :
        '@' ATTR_P              { 
                                    $$ = $2 
                                    var nodo = {
                                        name: 'ATTR',
                                        val: 'ATTR',
                                        children: [
                                            {name: '@', val: '@', children: []},
                                            $2.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        ;

ATTR_P :
        id                      { 
                                    $$ = new Element($1, TypeElement.ATRIBUTO, [], 1, @1.first_column)
                                    var nodo = {
                                        name: 'ATTR_P',
                                        val: 'ATTR_P',
                                        children: [{name: 'id', val: $1, children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | '*'                   { 
                                    $$ = new Element($1, TypeElement.ALL_ATRIBUTO, [], 1, @1.first_column)
                                    var nodo = {
                                        name: 'ATTR_P',
                                        val: 'ATTR_P',
                                        children: [{name: '*', val: '*', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        ;

PRE :
        '[' E ']'               { 
                                    $$ = $2 
                                    var nodo = {
                                        name: 'PRE',
                                        val: 'PRE',
                                        children: [
                                            {name: '{', val: '{', children: []},
                                            $2.Nodo,
                                            {name: '}', val: '}', children: []},
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        ;

E : // return new Operacion()
        E '+' E                 { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.SUMA)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '+', val: '+', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '-' E               { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.RESTA)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '-', val: '-', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '*' E               { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.MULTIPLICACION)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '*', val: '*', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E 'opDiv' E           { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.DIVISION)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: 'div', val: 'div', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '=' E               { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.IGUAL)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '=', val: '=', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '!=' E              { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.DIFERENTE)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '!=', val: '!=', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '<' E               { 
                                    console.log({E1: $1, op: $2, E2: $3})
                                    var op = new Operation(1, @1.first_column, TypeOperation.MENOR)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '<', val: '<', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '>' E               { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.MAYOR)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '>', val: '>', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '<=' E              { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.MENOR_IGUAL)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '<=', val: '<=', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E '>=' E              { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.MAYOR_IGUAL)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: '>=', val: '>=', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E 'opOr' E            { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.OR)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: 'or', val: 'or', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E 'opAnd' E           { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.AND)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: 'and', val: 'and', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | E 'opMod' E           { 
                                    
                                    var op = new Operation(1, @1.first_column, TypeOperation.MOD)
                                    op.saveBinaryOp($1, $3)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $1.Nodo,
                                            {name: 'mod', val: 'mod', children: []},
                                            $3.Nodo
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | '(' E ')'             { 
                                    $$ = $2 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            {name: '(', val: '(', children: []},
                                            $2.Nodo,
                                            {name: ')', val: ')', children: []},
                                        ]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | double                { 
                                    var op = new Operation(1, @1.first_column, TypeOperation.DOUBLE)
                                    op.savePrimitiveOp($1)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'double', val: $1, children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | integer               { 
                                    var op = new Operation(1, @1.first_column, TypeOperation.INTEGER)
                                    op.savePrimitiveOp($1)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'integer', val: $1, children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | StringLiteral         { 
                                    var op = new Operation(1, @1.first_column, TypeOperation.STRING)
                                    op.savePrimitiveOp($1)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'string', val: $1, children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | id                    { 
                                    var op = new Operation(1, @1.first_column, TypeOperation.ID)
                                    op.savePrimitiveOp($1)
                                    $$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'id', val: 'id', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resLast '(' ')'       { 
                                    $$ = new Operation('LAST'.first_line, @1.first_column, TypeOperation.LAST) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'last()', val: 'last()', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resPosition '(' ')'   { 
                                    $$ = new Operation('POSITION'.first_line, @1.first_column, TypeOperation.POSITION) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'position()', val: 'position()', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resText '(' ')'       { 
                                    $$ = new Operation('TEXT'.first_line, @1.first_column, TypeOperation.TEXT) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'text()', val: 'text()', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | resNode '(' ')'       { 
                                    $$ = new Operation('NODE'.first_line, @1.first_column, TypeOperation.NODE) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'node()', val: 'node()', children: []}]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        | ATTR                  { 
                                    $$ = new Operation($1.name, $1.linea, $1.columna, TypeOperation.ATRIBUTO) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [$1.Nodo]
                                    }
                                    $$ = {...$$, Nodo: nodo}
                                }
        ;
