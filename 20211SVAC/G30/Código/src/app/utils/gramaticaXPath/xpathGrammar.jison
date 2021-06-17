
/* description: Parsea lenguaje XPath */

%{

    /*Acá importo mis cosas errores, tokens para la tabla de símbolos y eso*/

    const { Excepcion } = require('src/app/models/excepcion.model');
    const { tipoToken } = require('src/app/models/xpathTipo.model');
    const { ambitoToken } = require('src/app/models/xpathTipo.model');
    const { Paquete } = require('src/app/models/reportes.model');
    const { NodoFinal } = require('src/app/models/AST/nodoAST.model');
    const { Token } = require('src/app/models/token.model');

    
    var ambito = '';
    var profundidad = 0;

    var errores = [];
    var contaerrores = 0;
    var contatokens = 0;
    var tokenss = [];

    var tokensF = [];

    var specabierto = false;

%}

/* Analizador Léxico */
%lex

%options case-insensitive
number  [0-9]+("."[0-9]+)?\b 

%%

\s+                   /* skip whitespace */
{number}              { tokensF.push(new Token('1111', 'NUMBER'));
                        return 'NUMBER';}
"//"                   { tokensF.push(new Token('//', '//'));
                        return '//';}
"/"                   { tokensF.push(new Token('/', '/'));
                        return '/';}

\"([^\\\"\n]|\\.)*\"	{ tokensF.push(new Token('cadena', 'cadena'));
                        return 'cadena';}
\'([^\\\"\n]|\\.)*\'	{ tokensF.push(new Token('cadena', 'cadena'));
                        return 'cadena';}

"["                   { tokensF.push(new Token('[', '['));
                        return '[';}
"]"                   { tokensF.push(new Token(']', ']'));
                        return ']';}
"("                   { tokensF.push(new Token('(', '('));
                        return '(';}
")"                   { tokensF.push(new Token(')', ')'));
                        return ')';}
"|"                   { tokensF.push(new Token('|', '|'));
                        return '|';}

"+"                   { tokensF.push(new Token('+', '+'));
                        return '+';}
"-"                   { tokensF.push(new Token('-', '-'));
                        return '-';}
"*"                   { tokensF.push(new Token('*', '*'));
                        return '*';}
"div"                  { tokensF.push(new Token('div', 'div'));
                        return 'div';}
"="                   { tokensF.push(new Token('=', '='));
                        return '=';}
"!="                   { tokensF.push(new Token('!=', '!='));
                        return '!=';}

"<="                   { tokensF.push(new Token('<=', '<='));
                        return '<=';}
"<"                   { tokensF.push(new Token('<', '<'));
                        return '<';}
">="                   { tokensF.push(new Token('>=', '>='));
                        return '>=';}
">"                   { tokensF.push(new Token('>', '>'));
                        return '>';}

"or"                   { tokensF.push(new Token('or', 'or'));
                        return 'or';}
"and"                  { tokensF.push(new Token('and', 'and'));
                        return 'and';}
"mod"                   { tokensF.push(new Token('mod', 'mod'));
                        return 'mod';}

"@"                   { tokensF.push(new Token('@', '@'));
                        return '@';}
"'"                   { tokensF.push(new Token('\'', '\''));
                        return '\'';}
"\""                   { tokensF.push(new Token('\"', '\"'));
                        return '\"';}
"ancestor-or-self"           { tokensF.push(new Token('ancestor-or-self', 'ancestor-or-self'));
                        return 'ancestor-or-self';}
"ancestor"                   { tokensF.push(new Token('ancestor', 'ancestor'));
                        return 'ancestor';}

"attribute"                  { tokensF.push(new Token('attribute', 'attribute'));
                        return 'attribute';}
"child"                      { tokensF.push(new Token('child', 'child'));
                        return 'child';}

"descendant-or-self"         { tokensF.push(new Token('descendant-or-self', 'descendant-or-self'));
                        return 'descendant-or-self';}
"descendant"                 { tokensF.push(new Token('descendant', 'descendant'));
                        return 'descendant';}
"following-sibling"          { tokensF.push(new Token('following-or-sibling', 'following-or-sibling'));
                        return 'following-or-sibling';}
"following"                  { tokensF.push(new Token('following', 'following'));
                        return 'following';}

"namespace"                  { tokensF.push(new Token('namespace', 'namespace'));
                        return 'namespace';}
"parent"                     { tokensF.push(new Token('parent', 'parent'));
                        return 'parent';}
"preceding-sibling"          { tokensF.push(new Token('preceding-sibling', 'preceding-sibling'));
                        return 'preceding-sibling';}
"preceding"                  { tokensF.push(new Token('preceding', 'preceding'));
                        return 'preceding';}

"self"                       { tokensF.push(new Token('self', 'self'));
                        return 'self';}
"text"                       { tokensF.push(new Token('text', 'text'));
                        return 'text';}
"node"                      { tokensF.push(new Token('node', 'node'));
                        return 'node';}
"position"                       { tokensF.push(new Token('position', 'position'));
                        return 'position';}
"last"                       { tokensF.push(new Token('last', 'last'));
                        return 'last';}

"::"                   { tokensF.push(new Token('::', '::'));
                        return '::';}
".."                   { tokensF.push(new Token('..', '..'));
                        return '..';}
"."                  { tokensF.push(new Token('.', '.'));
                        return '.';}


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	{ tokensF.push(new Token('ID', 'ID'));
                        return 'ID';}
<<EOF>>               { tokensF.push(new Token('EOF', 'EOF'));
                        return 'EOF';}
.           {
                contaerrores++;                
                errores.push(new Excepcion('Léxico', yylloc.first_line, yylloc.first_column, `Patrón desconocido -> ${yytext}`));
                
                console.log(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y en la columna ${yylloc.first_column}`);
            }

/lex


/* operator associations and precedence */

%left '=', '!='
%left '>=', '<=', '<', '>'
%left '+' '-' 
%left '*' 'div'

%left '|'
%left 'or'
%left 'and'
%left 'mod'


%start Init

%% /* SINTACTICO == Gramática */

Init
    : instrucciones EOF {
		// cuado se haya reconocido la entrada completa retornamos el AST y todo lo demás
        $$ = {
            final: new NodoFinal('INICIO', [$1.final])
        };
        const gramaticarecorrida = '';
        const raiz = $$.final
        console.log('XPATH completo! :D');
        const miPaquete = new Paquete(errores, tokensF, raiz, gramaticarecorrida);        
		return miPaquete;
	}
;

instrucciones 
    : instrucciones primero 	{
                                    $$ = {
                                        final: new NodoFinal('INSTRUCCIONES', [$1.final, $2.final])
                                    };
                                    
                                }
	| primero					{
                                    $$ = {
                                        final: $1.final,
                                    };
                                }
;

primero
    : '//'  segundo         
                            {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };                                
                                tokenss.push(new Token($1, '//'));                                
                            }
    | '/' segundo           {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                                tokenss.push(new Token($1, '/')); 
                            }
    | '.' Barritas          {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                                tokenss.push(new Token($1, '.')); 
                            }
    | '..' Barritas         {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                                tokenss.push(new Token($1, '..')); 
                            } 
    | sinBarritas           {
                                $$ = {
                                    final: $1.final,
                                };
                            }
    | error Barritas {
                $$ = $1;
                @$.first_column = @1.first_column;
                @$.first_line = @1.first_line;                
                if($1 != ''){
                
                contaerrores++;
                console.log('Sintáctico ->', $1, @1.first_column,",",@1.first_line);
                var alo = 'No se esperaba el caracter de: ';
                alo += $1;
                errores.push(new Excepcion('Sintáctico', @1.first_line, @1.first_column, alo));
                }
                
            }
;

/* HASTA ACÁ CHIDO*/

sinBarritas
    : 'ID' Barritas         {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, []), $2.final])
                                };
                                tokenss.push(new Token($1, 'ID')); 
                            } 
    | 'ID'                  {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, [])])
                                };
                                tokenss.push(new Token($1, 'ID')); 
                            }
    | 'ID' specs            {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, []), $2.final])
                                };
                                tokenss.push(new Token($1, 'ID')); 
                            }
    | 'ID' specs Barritas            {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, []), $2.final, $3.final])
                                };
                            }
    | Axes Barritas                 {
                                $$ = {
                                    final: new NodoFinal('AXE', [$1.final, $2.final]),
                                };
                            }
;

Barritas
    : '//'  segundo         
                            {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | '/' segundo           {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | '|' primero           {
                                $$ = {
                                    final: new NodoFinal('AND', [new NodoFinal($1, []), $2.final])
                                };
                            }
    |                       {
                                $$ = {
                                    final: new NodoFinal('EOF', [new NodoFinal('EOF', [])])
                                };
                            }
;

segundo
    : 'ID' specs Barritas   {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, []), $2.final, $3.final])
                                };
                            }
    | '*' specs Barritas    {
                                $$ = {
                                    final: new NodoFinal('ALL', [new NodoFinal($1, []), $2.final, $3.final])
                                };
                            }
    | '*' Barritas          {
                                $$ = {
                                    final: new NodoFinal('ALL', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | 'ID' Barritas         {
                                $$ = {
                                    final: new NodoFinal('ID', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | '@' 'ID' specs        {
                                $$ = {
                                    final: new NodoFinal('Atributos', [new NodoFinal($1, []), new NodoFinal($2, []), $3.final])
                                };
                            }
    | '@' '*' specs         {
                                $$ = {
                                    final: new NodoFinal('Atributos', [new NodoFinal($1, []), new NodoFinal($2, []), $3.final])
                                };
                            }
    | '@' 'ID'              {
                                $$ = {
                                    final: new NodoFinal('Atributo', [new NodoFinal($1, []), new NodoFinal($2, [])])
                                };
                            }
    | '@' '*'               {
                                $$ = {
                                    final: new NodoFinal('Atributos', [new NodoFinal($1, []), new NodoFinal($2, [])])
                                };
                            }
    | Axes Barritas         {
                                $$ = {
                                    final: new NodoFinal('AXE', [$1.final, $2.final])
                                };
                            }
    | '.' specs Barritas    {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final, $3.final])
                                };
                            }
    | '.' Barritas          {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | '..' specs Barritas   {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final, $3.final])
                                };
                            }
    | '..' Barritas         {
                                $$ = {
                                    final: new NodoFinal('NODO', [new NodoFinal($1, []), $2.final])
                                };
                            }
    | 'text''('')'          {
                                $$ = {
                                    final: new NodoFinal('F_TEXT', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                                };
                            }
    | 'node''('')'      {
                                $$ = {
                                    final: new NodoFinal('F_NODE', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                                };
                            }
    

;

/*    DE ACÁ PARA ABAJO TODO ESTÁ BIEN Y TODO FUNCIONA      */

specs
    : '[' expr ']'  {
                        $$ = {
                            final: new NodoFinal('specs', [new NodoFinal($1, []), $2.final, new NodoFinal($3, [])])
                        };
                    }
;


expr
    : '(' expr ')'      {
                            $$ = {
                                final: new NodoFinal('expr', [new NodoFinal($1, []), $2.final, new NodoFinal($3, [])])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    
    | expr '+' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '-' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '*' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr 'div' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '=' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '!=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '<' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '<=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '>' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr '>=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr 'or' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr 'and' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | expr 'mod' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                            tokenss.push(new Token($2, $2));
                        }
    | ident             {
                            $$ = {
                                final: new NodoFinal('ID', [$1.final])
                            };
                        }
;

ident
    : 'text''('')'      {                                
                            $$ = {
                                final: new NodoFinal('f_text', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                            tokenss.push(new Token($1, 'text'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'node''('')'      {                                
                            $$ = {
                                final: new NodoFinal('f_node', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                            tokenss.push(new Token($1, 'node'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'position''('')'  {                                
                            $$ = {
                                final: new NodoFinal('f_position', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                            tokenss.push(new Token($1, 'position'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'last''('')'      {                                
                            $$ = {
                                final: new NodoFinal('f_last', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                            tokenss.push(new Token($1, 'last'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                            
                        }
    | '@''ID'           {                                
                            $$ = {
                                final: new NodoFinal('Atributo', [new NodoFinal($1, []), new NodoFinal($2, [])])
                            }; 
                            tokenss.push(new Token($1, '@')); 
                            tokenss.push(new Token($2, 'ID')); 
                        }
    | '@''*'            {                                
                            $$ = {
                                final: new NodoFinal('Atributos', [new NodoFinal($1, []), new NodoFinal($2, [])])
                            }; 
                            tokenss.push(new Token($1, '@')); 
                            tokenss.push(new Token($2, '*')); 
                        }
    | 'ID'              {                                
                            $$ = {
                                final: new NodoFinal('ID', [new NodoFinal($1, [])])
                            }; 
                            tokenss.push(new Token($1, 'ID')); 
                        }
    | 'NUMBER'          {                                
                            $$ = {
                                final: new NodoFinal('Numero', [new NodoFinal($1, [])])                                
                            }; 
                            tokenss.push(new Token($1, 'numero')); 
                        }
    | 'cadena'          {                                
                            $$ = {
                                final: new NodoFinal('Cadena', [new NodoFinal($1, [])])
                            }; 
                            tokenss.push(new Token($1, 'cadena')); 
                        }
    | Axes              {
                            $$ = {
                                final: $1.final,
                            };
                        }
    | error {
                $$ = $1;
                @$.first_column = @1.first_column;
                @$.first_line = @1.first_line;                
                if($1 != ''){
                
                contaerrores++;
                console.log('Sintáctico ->', $1, @1.first_column,",",@1.first_line);
                var alo = 'No se esperaba el caracter de: ';
                alo += $1;
                errores.push(new Excepcion('Sintáctico', @1.first_line, @1.first_column, alo));
                }
                
            }
;

Axes
    : nombre '::' predicado         {
                                        $$ = {
                                           final: new NodoFinal('AXE', [$1.final, new NodoFinal($2, []), $3.final])
                                        };
                                        tokenss.push(new Token($2, '::')); 
                                    }
    | nombre '::' predicado specs      {
                                        $$ = {
                                           final: new NodoFinal('AXE', [$1.final, new NodoFinal($2, []), $3.final, $4.final])
                                        };
                                        tokenss.push(new Token($2, '::')); 
                                    }
;

nombre
    : 'ancestor'            {                                
                                $$ = {
                                final: new NodoFinal('PR_ancestor', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'ancestor')); 
                            }
    | 'ancestor-or-self'    {                                
                                $$ = {
                                final: new NodoFinal('PR_ancestor-or-self', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'ancestor-or-self'));  
                            }
    | 'attribute'           {                                
                                $$ = {
                                final: new NodoFinal('PR_attribute', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'attribute'));  
                            }
    | 'child'               {                                
                                $$ = {
                                    final: new NodoFinal('PR_child', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'child'));  
                            }
    | 'descendant'          {                                
                                $$ = {
                                    final: new NodoFinal('PR_descendant', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'descendant'));  
                            }
    | 'descendant-or-self'  {                                
                                $$ = {
                                    final: new NodoFinal('PR_descendant-or-self', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'descendant-or-self'));  
                            }
    | 'following'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_following', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'following'));  
                            }
    | 'following-sibling'   {                                
                                $$ = {
                                    final: new NodoFinal('PR_following-sibling', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'following-sibling'));  
                            }
    | 'namespace'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_namespace', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'namespace'));  
                            }
    | 'parent'              {                                
                                $$ = {
                                    final: new NodoFinal('PR_parent', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'parent'));  
                            }
    | 'preceding'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_preceding', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'preceeding'));  
                            }
    | 'preceding-sibling'   {                                
                                $$ = {
                                    final: new NodoFinal('PR_preceding-sibling', [new NodoFinal($1, [])])
                                }; 
                                tokenss.push(new Token($1, 'preceding-sibling')); 
                            }
    | 'self'                {
                                $$ = {
                                    final: new NodoFinal('PR_SELF', [new NodoFinal($1, [])])
                                };   
                                tokenss.push(new Token($1, 'self'));                             
                            }
    
;

predicado
    : '*'               {
                            $$ = {
                                final: new NodoFinal('ALL', [new NodoFinal($1, [])])
                            };
                            tokenss.push(new Token($1, '*'));
                        }
    | 'ID'              {
                            $$ = {
                                final: new NodoFinal('ID', [new NodoFinal($1, [])])
                            };
                            tokenss.push(new Token($1, 'ID'));
                        }
    | 'text''('')'      {
                            $$ = {
                                final: new NodoFinal('F_TEXT', [new NodoFinal('text', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                            tokenss.push(new Token($1, 'text'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'node''('')'      {
                            $$ = {
                                final: new NodoFinal('F_NODE', [new NodoFinal('node', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                            tokenss.push(new Token($1, 'node'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'position''('')'  {
                            $$ = {
                                final: new NodoFinal('F_POSITION', [new NodoFinal('final', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                            tokenss.push(new Token($1, 'final'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
    | 'last''('')'      {
                            $$ = {
                                final: new NodoFinal('F_LAST', [new NodoFinal('last', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                            tokenss.push(new Token($1, 'last'));
                            tokenss.push(new Token($2, '('));
                            tokenss.push(new Token($3, ')'));
                        }
;





