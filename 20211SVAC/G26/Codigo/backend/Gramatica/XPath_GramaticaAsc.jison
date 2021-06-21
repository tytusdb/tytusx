
/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const {Primitiva} = require("../Expresiones/Primitiva");
    const {Operacion} = require("../Expresiones/Operacion");
    const {Consulta} = require("../XPath/Consulta");
    const {Nodo} = require("../XPath/Nodo");
    const {Predicate} = require("../XPath/Predicate");
    const {TipoPrim} = require("../Expresiones/Primitiva")
    const {TipoOperacion} = require("../Expresiones/Operacion");
    const {TipoNodo} = require("../XPath/Nodo");
    const {TipoAxis} = require("../XPath/Nodo")

    const errores = require('../Global/ListaError');
%}


/* Definición Léxica */
%lex


escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'

//CUALQUIER CARACTER EXCEPT <
content                         [^<]

%s                                  comment
%%


\s+                                 /* skip whitespace */

"="                         return 'igual';
"/"                         return 'diag';
"."                         return "dot";
"@"                         return "attr";
"["                         return "corA";
"]"                         return "corC";
"|"                         return "andSelect";
"::"                        return "dospuntos";
"("                         return "parA";
")"                         return "parC";

//OPERADORES
"*"                         return 'asterisco';
"+"                         return "mas";
"-"                         return "menos";
"div"                       return "div";
"<="                        return 'lte';
">="                        return "gte";
"<"                         return 'lt';
">"                         return 'gt';
"!="                        return "nequal";
"or"                        return "or";
"and"                       return "and";
"mod"                       return "mod";

/* PALABRAS RESERVADAS */

"ancestor-or-self"              return "ancestorSelf";
"ancestor"                      return "ancestor";
"attribute"                     return "attribute";
"child"                         return "child";
"descendant-or-self"            return "descendantSelf";
"descendant"                    return "descendant";
"following-sibling"             return "followingSib";
"following"                     return "following";
"namespace"                     return "namespace";
"parent"                        return "parent";
"preceding-sibling"             return "precedSib";
"preceding"                     return "preced";
"self"                          return "self";

// FUNCIONES NATIVAS
"last()"                        return "lastFunc";
"position()"                    return "positionFunc";
"node()"                        return "nodeFunc";
"text()"                        return "textFunc";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*            return 'identifier';

{stringliteral}                     return 'cadena';
{charliteral}                       return 'cadena2';



//error lexico
.                                   {
                                        console.log(errores.default);
                                        errores.default.agregarError('lexico', 'Simbolo inesperado ' + yytext, yylloc.first_line, yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex



// DEFINIMOS PRECEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'igual' 'nequal'
%left 'mas' 'menos'
%left 'asterisco' 'div' 'mod'
%left UMINUS

%left 'parA' 'parC'



//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : LISTACONSULTAS EOF         { $$ = $1; return $$; }
    ;


LISTACONSULTAS: LISTACONSULTAS andSelect CONSULTA { $1.push(new Consulta($3,@3.first_line, @3.first_column)); $$ = $1; }
        |  CONSULTA     { $$ = [new Consulta($1, @1.first_line, @1.first_column)];}
;


CONSULTA: identifier { $$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)]}
        | identifier LISTANODOS {$$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)]; $$ = $$.concat($2); }
        | MASTIPOS LISTANODOS{ $$ = [$1]; $$ = $$.concat($2)}
        | LISTANODOS { $$ = $1;}
        | MASTIPOS { $$ = [$1];}
;

LISTANODOS:  LISTANODOS NODO{ $1.push($2); $$ = $1;}
        | NODO { $$ = [$1]; }
;

NODO: diag TIPONODO 
        { 
                if($$ != null){
                        $2.fromRoot = true; $$ = $2;
                }
        }
    | diag diag TIPONODO 
        { 
                if($$ != null){
                        $3.fromRoot = false; $$ = $3;
                }
        }
    | diag error = { console.log('Entra a error sintactico de one diag');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = new Nodo($2, TipoNodo.NODOERROR, @1.first_line, @1.first_column);}
    | diag diag error = { console.log('Entra a error sintactico de two diags');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = new Nodo($3, TipoNodo.NODOERROR, @1.first_line, @1.first_column);}                     
;

TIPONODO: identifier { $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column); }
        | identifier corA EXPRESION corC { $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column, new Predicate($3, @1.first_line, @1.first_column));}
        | MASTIPOS { $$ = $1; }
        |  AXES { $$ = $1; }    

;
MASTIPOS: attr identifier PREDICATE { $$ = new Nodo($2, TipoNodo.ATRIBUTO, @1.first_line, @1.first_column);}
    | attr asterisco PREDICATE { $$ = new Nodo($2, TipoNodo.ATRIBUTO, @1.first_line, @1.first_column);} 
    | dot PREDICATE { $$ = new Nodo($1, TipoNodo.DOT, @1.first_line, @1.first_column);}
    | dot dot PREDICATE { $$ = new Nodo($1+$2, TipoNodo.DOTDOT, @1.first_line, @1.first_column);}
    | asterisco PREDICATE {  $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column);}
    | FUNCIONES { $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column);}
;

AXES:    ancestor dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ANCESTOR, $3)}
        |     ancestorSelf dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ANCESTORORSELF, $3)}
        |     attribute dospuntos NODETEST { $$ =new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ATTRIBUTE, $3)}
        |     child dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.CHILD, $3)}
        |     descendant dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.DESCENDANT, $3)}
        |     descendantSelf dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.DESCENDANTORSELF, $3)}
        |     following dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.FOLLOWING, $3)}
        |     followingSib dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.FOLLOWINGSIBLING, $3)}
        |     namespace dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.NAMESPACE, $3)}
        |     parent dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PARENT, $3)}
        |     preced dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PRECEDING, $3)}
        |     precedSib dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PRECEDINGSIBLING, $3)}
        |     self dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.SELF, $3)}
;

PREDICATE: corA EXPRESION corC  { $$ = new Predicate($2, @1.first_line, @1.first_column); }
        |                       { $$ = [];}
;

NODETEST: identifier PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column, $2);                                
                        }else{
                                $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column);
                        }
                }
        |  textFunc PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column, $2);
                        }else{
                                $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column);
                        }
                }        
        | nodeFunc PREDICATE 
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column, $2);
                        }else{
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column);
                        }
                }        
        | asterisco PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column, $2);
                        }else{
                                $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column);
                        }
                }
        ;

LISTAEXPRESIONES: LISTAEXPRESIONES EXPRESION { $1.push($2); $$ = $1} 
                    | EXPRESION { $$ =  [$1] }
                    ;

EXPRESION:  PRIMITIVA { $$ = $1; }
            | OPERACION { $$ = $1;}
;

OPERACION: EXPRESION asterisco EXPRESION { $$ = new Operacion(TipoOperacion.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION mas EXPRESION { $$ = new Operacion(TipoOperacion.SUMA, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION menos EXPRESION { $$ = new Operacion(TipoOperacion.RESTA, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION div EXPRESION { $$ = new Operacion(TipoOperacion.DIVISION, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION lte EXPRESION { $$ = new Operacion(TipoOperacion.MENORIGUALQUE, $1, $3, @1.first_line, @1.first_column);}  
        | EXPRESION lt EXPRESION { $$ = new Operacion(TipoOperacion.MENORQUE, $1, $3, @1.first_line, @1.first_column);} 
        | EXPRESION gte EXPRESION { $$ = new Operacion(TipoOperacion.MAYORIGUALQUE, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION gt EXPRESION { $$ = new Operacion(TipoOperacion.MAYORQUE, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION igual EXPRESION { $$ = new Operacion(TipoOperacion.IGUAL, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION nequal EXPRESION { $$ = new Operacion(TipoOperacion.DIFERENTEQUE, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION or EXPRESION { $$ = new Operacion(TipoOperacion.OR, $1, $3, @1.first_line, @1.first_column);}
        | EXPRESION and EXPRESION { $$ = new Operacion(TipoOperacion.AND, $1, $3, @1.first_line, @1.first_column);}  
        | EXPRESION mod EXPRESION { $$ = new Operacion(TipoOperacion.MOD, $1, $3, @1.first_line, @1.first_column);}                                 
        //| menos EXPRESION %prec UMINUS { $$ = "-"+$2;}
        | parA EXPRESION parC { $$ = new Operacion(TipoOperacion.PAR, $2, null, @1.first_line, @1.first_column);}     
;

PRIMITIVA: DoubleLiteral { $$ = new Primitiva($1, TipoPrim.DOUBLE, @1.first_line, @1.first_column); }
        | IntegerLiteral { $$ = new Primitiva($1, TipoPrim.INTEGER, @1.first_line, @1.first_column); }
        | cadena { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column); }
        | cadena2 { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column); }
        | identifier { $$ = new Primitiva($1, TipoPrim.IDENTIFIER, @1.first_line, @1.first_column); }
        | attr identifier { $$ = new Primitiva($1, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column);}
        | attr asterisco { $$ = new Primitiva($1, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column);} 
        | dot { $$ = new Primitiva($1, TipoPrim.DOT, @1.first_line, @1.first_column);}
        | identifier LISTANODOS { 
                $$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)]; 
                $$ = $$.concat($2); 
                $$ = new Primitiva($$, TipoPrim.CONSULTA, @1.first_line, @1.first_column);
                }        
        | FUNCIONES { $$ = new Primitiva($1, TipoPrim.FUNCION, @1.first_line, @1.first_column);}
    ;

FUNCIONES: 
        lastFunc { $$ = $1; }
        | positionFunc { $$ = $1; }
        | nodeFunc { $$ = $1;}
        | textFunc { $$ = $1;}
;
