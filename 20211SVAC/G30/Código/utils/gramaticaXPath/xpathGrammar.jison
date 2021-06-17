
/* description: Parsea lenguaje XPath */

%{

    /*Acá importo mis cosas errores, tokens para la tabla de símbolos y eso*/

    const { Excepcion } = require('src/app/models/excepcion.model');
    const { tipoToken } = require('src/app/models/xpathTipo.model');
    const { ambitoToken } = require('src/app/models/xpathTipo.model');
    const { Paquete } = require('src/app/models/reportes.model');
    const { NodoFinal } = require('src/app/models/AST/nodoAST.model');

    
    var ambito = '';
    var profundidad = 0;

    var errores = [];
    var contaerrores = 0;
    var contatokens = 0;
    var tokenss = [];

    var specabierto = false;

%}

/* Analizador Léxico */
%lex

%options case-insensitive
number  [0-9]+("."[0-9]+)?\b 

%%

\s+                   /* skip whitespace */
{number}              return 'NUMBER'
"//"                   return '//'
"/"                   return '/'

\"([^\\\"\n]|\\.)*\"	return "cadena"
\'([^\\\"\n]|\\.)*\'	return "cadena"

"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
"|"                   return '|'

"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"div"                   return 'div'
"="                   return '='
"!="                   return '!='

"<="                   return '<='
"<"                   return '<'
">="                   return '>='
">"                   return '>'

"or"                   return 'or'
"and"                   return 'and'
"mod"                   return 'mod'

"@"                   return '@'
"'"                   return '\''
"\""                   return '\"'
"ancestor-or-self"           return 'ancestor-or-self'
"ancestor"                   return 'ancestor'

"attribute"                  return 'attribute'
"child"                      return 'child'

"descendant-or-self"         return 'descendant-or-self'
"descendant"                 return 'descendant'
"following-sibling"          return 'following-or-sibling'
"following"                  return 'following'

"namespace"                  return 'namespace'
"parent"                     return 'parent'
"preceding-sibling"          return 'preceding-sibling'
"preceding"                  return 'preceding'

"self"                       return 'self'
"text"                       return 'text'
"node"                       return 'node'
"position"                       return 'text'
"last"                       return 'last'

"::"                   return '::'
".."                   return '..'
"."                   return '.'


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID'
<<EOF>>               return 'EOF'
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
        const miPaquete = new Paquete(errores, tokenss, raiz, gramaticarecorrida);        
		return miPaquete;
	}
;

instrucciones 
    : instrucciones primero 	{
                                    $$ = {
                                        final: new NodoFinal('Instrucciones-primero', [$1.final, $2.final])
                                    };
                                }
	| primero					{
                                    $$ = {
                                        final: new NodoFinal('Primero', [$1.final])
                                    };
                                }
;

primero
    : '//'  segundo         
                            {
                                $$ = {
                                    final: new NodoFinal('slash2_i', [$1, $2.final])
                                };
                            }
    | '/' segundo           {
                                $$ = {
                                    final: new NodoFinal('slash_i', [$1, $2.final])
                                };
                            }
    | '.' Barritas          {
                                $$ = {
                                    final: new NodoFinal('actual_i', [$1, $2.final])
                                };
                            }
    | '..' Barritas         {
                                $$ = {
                                    final: new NodoFinal('padre_i', [$1, $2.final])
                                };
                            } 
    | sinBarritas           {
                                $$ = {
                                    final: new NodoFinal('sinBarritas', [$1.final])
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


sinBarritas
    : 'ID' Barritas         {
                                $$ = {
                                    final: new NodoFinal('ID_b', [$1, $2.final])
                                };
                            } 
    | 'ID'                  {
                                $$ = {
                                    final: new NodoFinal('ID', [$1])
                                };
                            }
    | 'ID' specs            {
                                $$ = {
                                    final: new NodoFinal('ID', [$1, $2.final])
                                };
                            }
    | 'ID' specs Barritas            {
                                $$ = {
                                    final: new NodoFinal('ID', [$1, $2.final, $3.final])
                                };
                            }
    | Axes Barritas                 {
                                $$ = {
                                    final: $1.final,
                                };
                            }
;

Barritas
    : '//'  segundo         
                            {
                                $$ = {
                                    final: new NodoFinal('slash2', [$1, $2.final])
                                };
                            }
    | '/' segundo           {
                                $$ = {
                                    final: new NodoFinal('slash', [$1, $2.final])
                                };
                            }
    | '|' primero           {
                                $$ = {
                                    final: new NodoFinal('AND', [$1, $2.final])
                                };
                            }
    |                       {
                                $$ = {
                                    final: new NodoFinal('EOF', ['EOF'])
                                };
                            }
;

segundo
    : 'ID' specs Barritas   {
                                $$ = {
                                    final: new NodoFinal('id_s_i', [$1, $2.final, $3.final])
                                };
                            }
    | '*' specs Barritas    {
                                $$ = {
                                    final: new NodoFinal('all_s_i', [$1, $2.final, $3.final])
                                };
                            }
    | '*' Barritas          {
                                $$ = {
                                    final: new NodoFinal('all_i', [$1, $2.final])
                                };
                            }
    | 'ID' Barritas         {
                                $$ = {
                                    final: new NodoFinal('ID_i', [$1, $2.final])
                                };
                            }
    | '@' 'ID' specs        {
                                $$ = {
                                    final: new NodoFinal('atributo_s', [$1, $2, $3.final])
                                };
                            }
    | '@' '*' specs         {
                                $$ = {
                                    final: new NodoFinal('atributos_s', [$1, $2, $3.final])
                                };
                            }
    | '@' 'ID'              {
                                $$ = {
                                    final: new NodoFinal('atributo', [$1, $2])
                                };
                            }
    | '@' '*'               {
                                $$ = {
                                    final: new NodoFinal('atributos', [$1, $2])
                                };
                            }
    | Axes Barritas         {
                                $$ = {
                                    final: new NodoFinal('Axes', [$1.final, $2.final])
                                };
                            }
    | '.' specs Barritas    {
                                $$ = {
                                    final: new NodoFinal('local_s', [$1, $2.final, $3.final])
                                };
                            }
    | '.' Barritas          {
                                $$ = {
                                    final: new NodoFinal('local', [$1, $2.final])
                                };
                            }
    | '..' specs Barritas   {
                                $$ = {
                                    final: new NodoFinal('padre_s', [$1, $2.final, $3.final])
                                };
                            }
    | '..' Barritas         {
                                $$ = {
                                    final: new NodoFinal('padre', [$1, $2.final])
                                };
                            }
    | 'text''('')'          {
                                $$ = {
                                    final: new NodoFinal('F_TEXT', [$1,$2,$3])
                                };
                            }
    | 'node''('')'      {
                                $$ = {
                                    final: new NodoFinal('F_NODE', [$1,$2,$3])
                                };
                            }
    

;

/*    DE ACÁ PARA ABAJO TODO ESTÁ BIEN Y TODO FUNCIONA      */

specs
    : '[' expr ']'  {
                        $$ = {
                            final: new NodoFinal('specs', [$1, $2.final, $3])
                        };
                    }
;


expr
    : '(' expr ')'      {
                            $$ = {
                                final: new NodoFinal('expr', [new NodoFinal($1, []), $2.final, new NodoFinal($3, [])])
                            };
                        }
    
    | expr '+' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '-' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '*' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr 'div' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '=' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '!=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '<' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '<=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '>' expr     {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr '>=' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr 'or' expr    {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr 'and' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
                        }
    | expr 'mod' expr   {
                            $$ = {
                                final: new NodoFinal('expr', [$1.final, new NodoFinal($2, []), $3.final])
                            };
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
                        }
    | 'node''('')'      {                                
                            $$ = {
                                final: new NodoFinal('f_node', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                        }
    | 'position''('')'  {                                
                            $$ = {
                                final: new NodoFinal('f_position', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                        }
    | 'last''('')'      {                                
                            $$ = {
                                final: new NodoFinal('f_last', [new NodoFinal($1, []), new NodoFinal($2, []), new NodoFinal($3, [])])
                            }; 
                        }
    | '@''ID'           {                                
                            $$ = {
                                final: new NodoFinal('Atributo', [new NodoFinal($1, []), new NodoFinal($2, [])])
                            }; 
                        }
    | '@''*'            {                                
                            $$ = {
                                final: new NodoFinal('Atributos', [new NodoFinal($1, []), new NodoFinal($2, [])])
                            }; 
                        }
    | 'ID'              {                                
                            $$ = {
                                final: new NodoFinal('ID', [new NodoFinal($1, [])])
                            }; 
                        }
    | 'NUMBER'          {                                
                            $$ = {
                                final: new NodoFinal('Numero', [new NodoFinal($1, [])])
                            }; 
                        }
    | 'cadena'          {                                
                            $$ = {
                                final: new NodoFinal('Cadena', [new NodoFinal($1, [])])
                            }; 
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
                                    }
    | nombre '::' predicado specs      {
                                        $$ = {
                                           final: new NodoFinal('AXE', [$1.final, new NodoFinal($2, []), $3.final, $4.final])
                                        };
                                    }
;

nombre
    : 'ancestor'            {                                
                                $$ = {
                                final: new NodoFinal('PR_ancestor', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'ancestor-or-self'    {                                
                                $$ = {
                                final: new NodoFinal('PR_ancestor-or-self', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'attribute'           {                                
                                $$ = {
                                final: new NodoFinal('PR_attribute', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'child'               {                                
                                $$ = {
                                    final: new NodoFinal('PR_child', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'descendant'          {                                
                                $$ = {
                                    final: new NodoFinal('PR_descendant', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'descendant-or-self'  {                                
                                $$ = {
                                    final: new NodoFinal('PR_descendant-or-self', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'following'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_following', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'following-sibling'   {                                
                                $$ = {
                                    final: new NodoFinal('PR_following-sibling', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'namespace'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_namespace', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'parent'              {                                
                                $$ = {
                                    final: new NodoFinal('PR_parent', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'preceding'           {                                
                                $$ = {
                                    final: new NodoFinal('PR_preceding', [new NodoFinal($1, [])])
                                }; 
                            }
    | 'preceding-sibling'   {                                
                                $$ = {
                                    final: new NodoFinal('PR_preceding-sibling', [new NodoFinal($1, [])])
                                };  
                            }
    | 'self'                {
                                $$ = {
                                    final: new NodoFinal('PR_SELF', [new NodoFinal($1, [])])
                                };                                
                            }
    
;

predicado
    : '*'               {
                            $$ = {
                                final: new NodoFinal('ALL', [new NodoFinal($1, [])])
                            };
                        }
    | 'ID'              {
                            $$ = {
                                final: new NodoFinal('ID', [new NodoFinal($1, [])])
                            };
                        }
    | 'text''('')'      {
                            $$ = {
                                final: new NodoFinal('F_TEXT', [new NodoFinal('text', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                        }
    | 'node''('')'      {
                            $$ = {
                                final: new NodoFinal('F_NODE', [new NodoFinal('node', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                        }
    | 'position''('')'  {
                            $$ = {
                                final: new NodoFinal('F_POSITION', [new NodoFinal('final', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                        }
    | 'last''('')'      {
                            $$ = {
                                final: new NodoFinal('F_LAST', [new NodoFinal('last', []),new NodoFinal('(', []),new NodoFinal(')', [])])
                            };
                        }
;





