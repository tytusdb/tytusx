%{
  const { Arbol } = require('src/app/models/arbol.model')
  const { Excepcion } = require('src/app/models/excepcion.model');
  const { Tipo } = require('src/app/models/tipo.model');

  const { Primitivo } = require('src/app/controllers/expresiones/primitivo.controller');
  // ARITMETICAS
  const { Suma } = require('src/app/controllers/expresiones/aritmeticas/suma.controller');
  const { Resta } = require('src/app/controllers/expresiones/aritmeticas/resta.controller');
  const { Multiplicacion } = require('src/app/controllers/expresiones/aritmeticas/multiplicacion.controller');
  const { Division } = require('src/app/controllers/expresiones/aritmeticas/division.controller');
  const { Negativo } = require('src/app/controllers/expresiones/aritmeticas/negativo.controller');
  const { Positivo } = require('src/app/controllers/expresiones/aritmeticas/positivo.controller');
  // RELACIONALES
  const { Mayor } = require('src/app/controllers/expresiones/relacionales/mayor.controller');
  const { Menor } = require('src/app/controllers/expresiones/relacionales/menor.controller');
  const { MayorQue } = require('src/app/controllers/expresiones/relacionales/mayorQue.controller');
  const { MenorQue } = require('src/app/controllers/expresiones/relacionales/menorQue.controller');
  const { Igualdad } = require('src/app/controllers/expresiones/relacionales/igualdad.controller');
  const { Diferencia } = require('src/app/controllers/expresiones/relacionales/diferencia.controller');
  // LOGICAS
  const { And } = require('src/app/controllers/expresiones/logicas/and.controller');
  const { Or } = require('src/app/controllers/expresiones/logicas/or.controller');
  const { Not } = require('src/app/controllers/expresiones/logicas/not.controller');

  const { Query } = require('src/app/controllers/instrucciones/query.controller');
  const { PathExpr } = require('src/app/controllers/instrucciones/path-expr.controller');
  const { AxisStep } = require('src/app/controllers/instrucciones/axis-step.controller');
  const { ForwardStep } = require('src/app/controllers/instrucciones/forward-step.controller');
  const { ReverseStep } = require('src/app/controllers/instrucciones/reverse-step.controller');
  const { MatchesAny } = require('src/app/controllers/instrucciones/matches-any.controller');
  const { PostFixExpr } = require('src/app/controllers/instrucciones/postfix-expr.controller');
  const { Predicate } = require('src/app/controllers/instrucciones/predicate.controller');
  const { KindTest } = require('src/app/controllers/instrucciones/kind-test.controller');

  const { NodoGrafico } = require('src/app/utils/reports/nodoGrafico');

  var arbol;
  var excepciones = [];
%}

/* Análisis Lexico */
%lex
%options case-sensitive
// comentarios       (\(\:[\s\S]*?\:\))
nodename          ([a-zñÑA-Z])[a-zA-ZñÑ0-9_-]*
digito            [0-9]+
decimal           {digito}?"."{digito}+
comillaSimple     "'"
comillaDoble      "\""
comillas          {comillaDoble}|{comillaSimple}
cadena            {comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas}

%%
\s+               /* ignorar espacios en blanco */
// {comentarios}     /* ignorar comentarios */

"//"                    return '//'
"/"                     return '/'
".."                    return '..'
"."                     return '.'
"::"                    return '::'
":"                     return ':'
"@"                     return '@'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
"|"                     return '|'


"ancestor-or-self"        return 'ancestor-or-self'
"ancestor"                return 'ancestor'
"attribute"               return 'attribute'
"child"                   return 'child'
"descendant-or-self"      return 'descendant-or-self'
"descendant"              return 'descendant'
"following-sibling"       return 'following-sibling'
"following"               return 'following'
"last"                    return 'last'
"namespace"               return 'namespace'
"node"                    return 'node'
"parent"                  return 'parent'
"position"                return 'position'
"preceding-sibling"       return 'preceding-sibling'
"preceding"               return 'preceding'
"self"                    return 'self'
"text"                    return 'text'

"and"                     return 'and'
"or"                      return 'or'
"<="                      return '<='
"<"                       return '<'
">="                      return '>='
">"                       return '>'
"="                       return '='
"!="                      return '!='
"*"                       return '*'
"div"                     return 'div'
"mod"                     return 'mod'
"+"                       return '+'
"-"                       return '-'


{nodename}                return 'nodename'
{decimal}                 return 'decimal'
{digito}                  return 'digito'
{cadena}                  { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<<EOF>>                   return 'EOF';

.                         {
                            excepciones.push(new Excepcion('Léxico', `Patrón desconocido ${yytext}`, yylloc.first_line, yylloc.first_column));
                            console.log(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y columna ${yylloc.first_column}`);
                          }
/lex

/* Asociación y precedencia de operadores */
%right '='
%left 'or'
%left 'and'
%left '=', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' 'div' 'mod'
%left UMINUS UPLUS

%start RAIZ
%% /* Gramática */

RAIZ : QUERIES EOF  {
                      arbol = new Arbol($1.instrucciones);
                      arbol.graficaAST = new NodoGrafico('RAIZ ASC XPATH', [$1.graficaAST]);
                      arbol.graficaCST = new NodoGrafico('RAIZ ASC XPATH', [$1.graficaCST]);
                      arbol.gramatica = $1.gramatica;

                      if (excepciones.length > 0) {
                        arbol.excepciones = arbol.excepciones.concat(excepciones);
                        excepciones = [];
                      }
                      return arbol;
                    }
    | EOF           {
                      arbol = new Arbol([]);

                      if (excepciones.length > 0) {
                        arbol.excepciones = arbol.excepciones.concat(excepciones);
                        excepciones = [];
                      }
                      return arbol;
                    }
    ;

QUERIES : QUERIES '|' QUERY   {
                                $1.instrucciones = $1.instrucciones.concat($3.instrucciones);
                                $$ = {
                                  instrucciones: $1.instrucciones,
                                  graficaAST: new NodoGrafico('QUERIES', [
                                    $1.graficaAST,
                                    new NodoGrafico('|', []),
                                    $3.graficaAST
                                  ]),
                                  graficaCST: new NodoGrafico('|', [
                                    $1.graficaCST,
                                    $3.graficaCST
                                  ]),
                                  gramatica: `<QUERIES> ::= <QUERIES> "|" <QUERY> \n`
                                };
                                $$.gramatica += $1.gramatica;
                                $$.gramatica += $3.gramatica;
                              }
        | QUERY               {
                                $$ = {
                                  instrucciones: [$1.instrucciones],
                                  graficaAST: new NodoGrafico('QUERIES', [
                                    $1.graficaAST
                                  ]),
                                  graficaCST: $1.graficaCST,
                                  gramatica: `<QUERIES> ::= <QUERY> \n`
                                };
                                $$.gramatica += $1.gramatica;
                              }
        | QUERIES '|' error   {
                                excepciones.push(new Excepcion('Sintáctico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                                console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                              }
        | error '|' QUERY     {
                                excepciones.push(new Excepcion('Sintáctico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                                console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                              }
        | error               {
                                excepciones.push(new Excepcion('Sintáctico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                                console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                              }
        ;

QUERY : '/'                   {
                                $$ = {
                                  instrucciones: new Query(Tipo.OBJETO, '/', undefined,
                                    this._$.first_line, this._$.first_column),
                                  graficaAST: new NodoGrafico('QUERY', [
                                    new NodoGrafico('/', [])
                                  ]),
                                  graficaCST: new NodoGrafico('/', []),
                                  gramatica: `<QUERY> ::= "/" \n`
                                };
                              }
      | '/' PATH_EXPR         {
                                $$ = {
                                  instrucciones: new Query(Tipo.OBJETO, '/', $2.instrucciones,
                                    this._$.first_line, this._$.first_column),
                                  graficaAST: new NodoGrafico('QUERY', [
                                    new NodoGrafico('/', []),
                                    $2.graficaAST
                                  ]),
                                  graficaCST: new NodoGrafico('QUERY', [
                                    new NodoGrafico('/', []),
                                    $2.graficaCST
                                  ]),
                                  gramatica: `<QUERY> ::= "/" <PATH_EXPR> \n`
                                };
                                $$.gramatica += $2.gramatica;
                              }
      | '//' PATH_EXPR        {
                                $$ = {
                                  instrucciones: new Query(Tipo.OBJETO, '//', $2.instrucciones,
                                    this._$.first_line, this._$.first_column),
                                  graficaAST: new NodoGrafico('QUERY', [
                                    new NodoGrafico('//', []),
                                    $2.graficaAST
                                  ]),
                                  graficaCST: new NodoGrafico('QUERY', [
                                    new NodoGrafico('//', []),
                                    $2.graficaCST
                                  ]),
                                  gramatica: `<QUERY> ::= "//" <PATH_EXPR> \n`
                                };
                                $$.gramatica += $2.gramatica;
                              }
      | PATH_EXPR             {
                                $$ = {
                                  instrucciones: new Query(Tipo.OBJETO, '', $1.instrucciones,
                                    this._$.first_line, this._$.first_column),
                                  graficaAST: new NodoGrafico('QUERY', [
                                    $1.graficaAST
                                  ]),
                                  graficaCST: $1.graficaCST,
                                  gramatica: `<QUERY> ::= <PATH_EXPR> \n`
                                };
                                $$.gramatica += $1.gramatica;
                              }
      ;

PATH_EXPR : PATH_EXPR '/' STEP_EXPR   {
                                        $$ = {
                                          instrucciones: new PathExpr(Tipo.OBJETO, '/', $1.instrucciones,
                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                          graficaAST: new NodoGrafico('PATH_EXPR', [
                                            $1.graficaAST,
                                            new NodoGrafico('/', []),
                                            $3.graficaAST
                                          ]),
                                          graficaCST: new NodoGrafico('/', [
                                            $1.graficaCST,
                                            $3.graficaCST
                                          ]),
                                          gramatica: `<PATH_EXPR> ::= <PATH_EXPR> "/" <STEP_EXPR> \n`
                                        };
                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $3.gramatica;
                                      }
          | PATH_EXPR '//' STEP_EXPR  {
                                        $$ = {
                                          instrucciones: new PathExpr(Tipo.OBJETO, '//', $1.instrucciones,
                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                          graficaAST: new NodoGrafico('PATH_EXPR', [
                                            $1.graficaAST,
                                            new NodoGrafico('//', []),
                                            $3.graficaAST
                                          ]),
                                          graficaCST: new NodoGrafico('//', [
                                            $1.graficaCST,
                                            $3.graficaCST
                                          ]),
                                          gramatica: `<PATH_EXPR> ::= <PATH_EXPR> "//" <STEP_EXPR> \n`
                                        };
                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $3.gramatica;
                                      }
          | STEP_EXPR                 {
                                        $$ = {
                                          instrucciones: new PathExpr(Tipo.OBJETO, '', $1.instrucciones,
                                            undefined, this._$.first_line, this._$.first_column),
                                          graficaAST: new NodoGrafico('PATH_EXPR', [
                                            $1.graficaAST
                                          ]),
                                          graficaCST: $1.graficaCST,
                                          gramatica: `<PATH_EXPR> ::= <STEP_EXPR> \n`
                                        };
                                        $$.gramatica += $1.gramatica;
                                      }
          ;

STEP_EXPR : POST_FIX_EXPR   {
                              $$ = {
                                instrucciones: $1.instrucciones,
                                graficaAST: new NodoGrafico('STEP_EXPR', [
                                  $1.graficaAST
                                ]),
                                graficaCST: $1.graficaCST,
                                gramatica: `<STEP_EXPR> ::= <POST_FIX_EXPR> \n`
                              };
                              $$.gramatica += $1.gramatica;
                            }
          | AXIS_STEP       {
                              $$ = {
                                instrucciones: $1.instrucciones,
                                graficaAST: new NodoGrafico('STEP_EXPR', [
                                  $1.graficaAST
                                ]),
                                graficaCST: $1.graficaCST,
                                gramatica: `<STEP_EXPR> ::= <AXIS_STEP> \n`
                              };
                              $$.gramatica += $1.gramatica;
                            }
          ;

AXIS_STEP : REVERSE_STEP                    {
                                              $$ = {
                                                instrucciones: new AxisStep(Tipo.OBJETO, $1.instrucciones,
                                                  [], this._$.first_line, this._$.first_column),
                                                graficaAST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaAST
                                                ]),
                                                graficaCST: $1.graficaCST,
                                                gramatica: `<AXIS_STEP> ::= <REVERSE_STEP> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                            }
          | REVERSE_STEP PREDICATE_LIST     {
                                              $$ = {
                                                instrucciones: new AxisStep(Tipo.OBJETO, $1.instrucciones,
                                                  $2.instrucciones, this._$.first_line, this._$.first_column),
                                                graficaAST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaAST,
                                                  $2.graficaAST,
                                                ]),
                                                graficaCST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaCST,
                                                  $2.graficaCST,
                                                ]),
                                                gramatica: `<AXIS_STEP> ::= <REVERSE_STEP> <PREDICATE_LIST> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                              $$.gramatica += $2.gramatica;
                                            }
          | FORWARD_STEP                    {
                                              $$ = {
                                                instrucciones: new AxisStep(Tipo.OBJETO, $1.instrucciones,
                                                  [], this._$.first_line, this._$.first_column),
                                                graficaAST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaAST
                                                ]),
                                                graficaCST: $1.graficaCST,
                                                gramatica: `<AXIS_STEP> ::= <FORWARD_STEP> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                            }
          | FORWARD_STEP PREDICATE_LIST     {
                                              $$ = {
                                                instrucciones: new AxisStep(Tipo.OBJETO, $1.instrucciones,
                                                  $2.instrucciones, this._$.first_line, this._$.first_column),
                                                graficaAST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaAST,
                                                  $2.graficaAST,
                                                ]),
                                                graficaCST: new NodoGrafico('AXIS_STEP', [
                                                  $1.graficaCST,
                                                  $2.graficaCST,
                                                ]),
                                                gramatica: `<AXIS_STEP> ::= <FORWARD_STEP> <PREDICATE_LIST> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                              $$.gramatica += $2.gramatica;
                                            }
          ;

FORWARD_STEP : 'attribute' '::' NODE_TEST             {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'attribute',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('attribute', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('attribute', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "attribute" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'child' '::' NODE_TEST                 {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'child',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('child', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('child', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "child" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'descendant' '::' NODE_TEST            {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'descendant',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('descendant', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('descendant', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "descendant" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'descendant-or-self' '::' NODE_TEST    {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'descendant-or-self',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('descendant-or-self', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('descendant-or-self', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "descendant-or-self" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'following' '::' NODE_TEST             {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'following',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('following', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('following', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "following" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'following-sibling' '::' NODE_TEST     {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'following-sibling',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('following-sibling', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('following-sibling', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "following-sibling" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'namespace' '::' NODE_TEST             {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'namespace',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('namespace', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('namespace', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "namespace" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'self' '::' NODE_TEST                  {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, 'self',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('self', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('self', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "self" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | '@' NODE_TEST                          {
                                                        $$ = {
                                                          instrucciones: new ForwardStep(Tipo.OBJETO, '@',
                                                            $2.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            new NodoGrafico('@', []),
                                                            $2.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('@', [
                                                            $2.graficaCST
                                                          ]),
                                                          gramatica: `<FORWARD_STEP> ::= "@" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $2.gramatica;
                                                      }
             | NODE_TEST                              {
                                                        $$ = {
                                                          instrucciones: $1.instrucciones,
                                                          graficaAST: new NodoGrafico('FORWARD_STEP', [
                                                            $1.graficaAST
                                                          ]),
                                                          graficaCST: $1.graficaCST,
                                                          gramatica: `<FORWARD_STEP> ::= <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                      }
             ;

REVERSE_STEP : 'ancestor' '::' NODE_TEST              {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, 'ancestor',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('ancestor', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('ancestor', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<REVERSE_STEP> ::= "ancestor" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'ancestor-or-self' '::' NODE_TEST      {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, 'ancestor-or-self',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('ancestor-or-self', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('ancestor-or-self', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<REVERSE_STEP> ::= "ancestor-or-self" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'parent' '::' NODE_TEST                {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, 'parent',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('parent', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('parent', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<REVERSE_STEP> ::= "parent" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'preceding' '::' NODE_TEST             {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, 'preceding',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('preceding', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('preceding', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<REVERSE_STEP> ::= "preceding" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | 'preceding-sibling' '::' NODE_TEST     {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, 'preceding-sibling',
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('preceding-sibling', []),
                                                            new NodoGrafico('::', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('::', [
                                                            new NodoGrafico('preceding-sibling', []),
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<REVERSE_STEP> ::= "preceding-sibling" "::" <NODE_TEST> \n`
                                                        };
                                                        $$.gramatica += $3.gramatica;
                                                      }
             | '..'                                   {
                                                        $$ = {
                                                          instrucciones: new ReverseStep(Tipo.OBJETO, '..',
                                                            undefined, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('REVERSE_STEP', [
                                                            new NodoGrafico('..', [])
                                                          ]),
                                                          graficaCST: new NodoGrafico('..', []),
                                                          gramatica: `<REVERSE_STEP> ::= ".." \n`
                                                        };
                                                      }
             ;

NODE_TEST : KIND_TEST   {
                          $$ = {
                            instrucciones: $1.instrucciones,
                            graficaAST: new NodoGrafico('NODE_TEST', [
                              $1.graficaAST
                            ]),
                            graficaCST: $1.graficaCST,
                            gramatica: `<NODE_TEST> ::= <KIND_TEST> \n`
                          };
                          $$.gramatica += $1.gramatica;
                        }
          | EQNAME      {
                          $$ = {
                            instrucciones: $1.instrucciones,
                            graficaAST: new NodoGrafico('NODE_TEST', [
                              $1.graficaAST
                            ]),
                            graficaCST: $1.graficaCST,
                            gramatica: `<NODE_TEST> ::= <EQNAME> \n`
                          };
                          $$.gramatica += $1.gramatica;
                        }
          | '*'         {
                          $$ = {
                            instrucciones: new MatchesAny(Tipo.OBJETO, '*',
                              this._$.first_line, this._$.first_column),
                            graficaAST: new NodoGrafico('NODE_TEST', [
                              new NodoGrafico('*', [])
                            ]),
                            graficaCST: new NodoGrafico('*', []),
                            gramatica: `<NODE_TEST> ::= '*' \n`
                          };
                        }
          ;

POST_FIX_EXPR : PRIMARY_EXPR                  {
                                                $$ = {
                                                  instrucciones: new PostFixExpr(Tipo.OBJETO, $1.instrucciones,
                                                    [], this._$.first_line, this._$.first_column),
                                                  graficaAST: new NodoGrafico('POST_FIX_EXPR', [
                                                    $1.graficaAST
                                                  ]),
                                                  graficaCST: $1.graficaCST,
                                                  gramatica: `<POST_FIX_EXPR> ::= <PRIMARY_EXPR> \n`
                                                };
                                                $$.gramatica += $1.gramatica;
                                              }
              | PRIMARY_EXPR PREDICATE_LIST   {
                                                $$ = {
                                                  instrucciones: new PostFixExpr(Tipo.OBJETO, $1.instrucciones,
                                                    $2.instrucciones, this._$.first_line, this._$.first_column),
                                                  graficaAST: new NodoGrafico('POST_FIX_EXPR', [
                                                    $1.graficaAST,
                                                    $2.graficaAST,
                                                  ]),
                                                  graficaCST: new NodoGrafico('POST_FIX_EXPR', [
                                                    $1.graficaCST,
                                                    $2.graficaCST,
                                                  ]),
                                                  gramatica: `<POST_FIX_EXPR> ::= <PRIMARY_EXPR> <PREDICATE_LIST> \n`
                                                };
                                                $$.gramatica += $1.gramatica;
                                                $$.gramatica += $2.gramatica;
                                              }
              ;

PREDICATE_LIST : PREDICATE_LIST PREDICATE   {
                                              $1.instrucciones = $1.instrucciones.concat($3.instrucciones);
                                              $$ = {
                                                instrucciones: $1.instrucciones,
                                                graficaAST: new NodoGrafico('PREDICATE_LIST', [
                                                  $1.graficaAST,
                                                  $2.graficaAST
                                                ]),
                                                graficaCST: new NodoGrafico('PREDICATE_LIST', [
                                                  $1.graficaCST,
                                                  $2.graficaCST,
                                                ]),
                                                gramatica: `<PREDICATE_LIST> ::= <PREDICATE_LIST> <PREDICATE> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                              $$.gramatica += $2.gramatica;
                                            }
               | PREDICATE                  {
                                              $$ = {
                                                instrucciones: [$1.instrucciones],
                                                graficaAST: new NodoGrafico('PREDICATE_LIST', [
                                                  $1.graficaAST
                                                ]),
                                                graficaCST: $1.graficaCST,
                                                gramatica: `<PREDICATE_LIST> ::= <PREDICATE> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                            }
               ;

PREDICATE : '[' EXPR ']'    {
                              $$ = {
                                instrucciones: new Predicate(Tipo.OBJETO, $2.instrucciones,
                                  this._$.first_line, this._$.first_column),
                                graficaAST: new NodoGrafico('PREDICATE', [
                                  new NodoGrafico('[', []),
                                  $2.graficaAST,
                                  new NodoGrafico(']', [])
                                ]),
                                graficaCST: new NodoGrafico('[EXPR]', [
                                  $2.graficaCST
                                ]),
                                gramatica: `<PREDICATE> ::= "[" <EXPR> "]" \n`
                              };
                              $$.gramatica += $2.gramatica;
                            }
          ;

//TODO VERIFICAR PARENTHESIZED_EXPR
PRIMARY_EXPR : PARENTHESIZED_EXPR   {
                                      $$ = {
                                        instrucciones: $1.instrucciones,
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          $1.graficaAST
                                        ]),
                                        graficaCST: $1.graficaCST,
                                        gramatica: `<PRIMARY_EXPR> ::= <PARENTHESIZED_EXPR> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                    }
             | '.'                  {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.CURRENT_NODE, '.',
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico('.', [])
                                        ]),
                                        graficaCST: new NodoGrafico('.', []),
                                        gramatica: `<PRIMARY_EXPR> ::= "." \n`
                                      };
                                    }
             | 'cadena'             {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.STRING, $1,
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | 'digito'             {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.INTEGER, $1,
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | 'decimal'            {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.DOUBLE, $1,
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | '[' ']'              {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.ARRAY, [],
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico('[', []),
                                          new NodoGrafico(']', [])
                                        ]),
                                        graficaCST: new NodoGrafico('[]', []),
                                        gramatica: `<PRIMARY_EXPR> ::= "[" "]" \n`
                                      };
                                    }
             //TODO VERIFICAR SI PUEDE VENIR EL AND Y OR
             | '[' QUERY_LIST ']'   {
                                      $$ = {
                                        instrucciones: new Primitivo(Tipo.ARRAY, $2.instrucciones,
                                          this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico('[', []),
                                          $2.graficaAST,
                                          new NodoGrafico(']', [])
                                        ]),
                                        graficaCST: new NodoGrafico('[QUERY_LIST]', [
                                          $2.graficaCST,
                                        ]),
                                        gramatica: `<PRIMARY_EXPR> ::= "[" <QUERY_LIST> "]" \n`
                                      };
                                      $$.gramatica += $2.gramatica;
                                    }
             ;

PARENTHESIZED_EXPR : '(' ')'        {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('PARENTHESIZED_EXPR', [
                                          new NodoGrafico('(', []),
                                          new NodoGrafico(')', [])
                                        ]),
                                        graficaCST: new NodoGrafico('()', []),
                                        gramatica: `<PARENTHESIZED_EXPR> ::= "(" ")" \n`
                                      };
                                    }
                   | '(' EXPR ')'   {
                                      $$ = {
                                        instrucciones: $2.instrucciones,
                                        graficaAST: new NodoGrafico('PARENTHESIZED_EXPR', [
                                          new NodoGrafico('(', []),
                                          $2.graficaAST,
                                          new NodoGrafico(')', [])
                                        ]),
                                        graficaCST: new NodoGrafico('(EXPR)', [
                                          $2.graficaCST,
                                        ]),
                                        gramatica: `<PARENTHESIZED_EXPR> ::= "(" <EXPR> ")" \n`
                                      };
                                      $$.gramatica += $2.gramatica;
                                    }
                   ;

QUERY_LIST : QUERY_LIST ',' QUERY   {
                                      $1.instrucciones = $1.instrucciones.concat($3.instrucciones);
                                      $$ = {
                                        instrucciones: $1.instrucciones,
                                        graficaAST: new NodoGrafico('QUERY_LIST', [
                                          $1.graficaAST,
                                          new NodoGrafico(',', []),
                                          $3.graficaAST
                                        ]),
                                        graficaCST: new NodoGrafico(',', [
                                          $1.graficaCST,
                                          $3.graficaCST
                                        ]),
                                        gramatica: `<QUERY_LIST> ::= <QUERY_LIST> "," <QUERY> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                      $$.gramatica += $3.gramatica;
                                    }
           | QUERY                  {
                                      $$ = {
                                        instrucciones: [$1.instrucciones],
                                        graficaAST: new NodoGrafico('QUERY_LIST', [
                                          $1.graficaAST
                                        ]),
                                        graficaCST: $1.graficaCST,
                                        gramatica: `<QUERY_LIST> ::= <QUERY> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                    }
           ;

KIND_TEST : 'text' '(' ')'  {
                              $$ = {
                                instrucciones: new KindTest(Tipo.OBJETO, 'text',
                                  this._$.first_line, this._$.first_column),
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('text', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('text()', []),
                                gramatica: `<KIND_TEST> ::= "text" "(" ")" \n`
                              };
                            }
          | 'node' '(' ')'  {
                              $$ = {
                                instrucciones: new KindTest(Tipo.OBJETO, 'node',
                                  this._$.first_line, this._$.first_column),
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('node', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('node()', []),
                                gramatica: `<KIND_TEST> ::= "node" "(" ")" \n`
                              };
                            }
          | 'last' '(' ')'  {
                              $$ = {
                                instrucciones: new KindTest(Tipo.OBJETO, 'last',
                                  this._$.first_line, this._$.first_column),
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('last', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('last()', []),
                                gramatica: `<KIND_TEST> ::= "last" "(" ")" \n`
                              };
                            }
          | 'position' '(' ')'  {
                              $$ = {
                                instrucciones: new KindTest(Tipo.OBJETO, 'position',
                                  this._$.first_line, this._$.first_column),
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('position', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('position()', []),
                                gramatica: `<KIND_TEST> ::= "position" "(" ")" \n`
                              };
                            }
          ;

//TODO AGREGAR PALABRAS RESERVADAS?
EQNAME : 'nodename'               {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'ancestor-or-self'       {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'ancestor'               {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'attribute'              {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'child'                  {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'descendant-or-self'     {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'descendant'             {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'following-sibling'      {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'following'              {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'last'                   {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'namespace'              {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'node'                   {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'parent'                 {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'position'               {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'preceding-sibling'      {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'preceding'              {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'self'                   {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'text'                   {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'and'                    {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'or'                     {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'div'                    {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'mod'                    {
                                    $$ = {
                                      instrucciones: new Primitivo(Tipo.ID, $1,
                                        this._$.first_line, this._$.first_column),
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       ;

EXPR : EXPR ',' EXPR_SINGLE   {
                                $1.instrucciones = $1.instrucciones.concat($3.instrucciones);
                                $$ = {
                                  instrucciones: $1.instrucciones,
                                  graficaAST: new NodoGrafico('EXPR', [
                                    $1.graficaAST,
                                    new NodoGrafico(',', []),
                                    $3.graficaAST
                                  ]),
                                  graficaCST: new NodoGrafico(',', [
                                    $1.graficaCST,
                                    $3.graficaCST
                                  ]),gramatica: `<EXPR> ::= <EXPR> "," <EXPR_SINGLE> \n`
                                };
                                $$.gramatica += $1.gramatica;
                                $$.gramatica += $3.gramatica;
                              }
     | EXPR_SINGLE            {
                                $$ = {
                                  instrucciones: [$1.instrucciones],
                                  graficaAST: new NodoGrafico('EXPR', [
                                    $1.graficaAST
                                  ]),
                                  graficaCST: $1.graficaCST,
                                  gramatica: `<EXPR> ::= <EXPR_SINGLE> \n`
                                };
                                $$.gramatica += $1.gramatica;
                              }
     ;

EXPR_SINGLE : OR_EXPR {
                        $$ = {
                          instrucciones: $1.instrucciones,
                          graficaAST: new NodoGrafico('EXPR_SINGLE', [
                            $1.graficaAST
                          ]),
                          graficaCST: $1.graficaCST,
                          gramatica: `<EXPR_SINGLE> ::= <OR_EXPR> \n`
                        };
                        $$.gramatica += $1.gramatica;
                      }
            ;

OR_EXPR : AND_EXPR                  {
                                      $$ = {
                                        instrucciones: $1.instrucciones,
                                        graficaAST: new NodoGrafico('OR_EXPR', [
                                          $1.graficaAST
                                        ]),
                                        graficaCST: $1.graficaCST,
                                        gramatica: `<OR_EXPR> ::= <AND_EXPR> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                    }
        | OR_EXPR 'or' AND_EXPR     {
                                      $$ = {
                                        instrucciones: new Or(Tipo.BOOLEAN, $1.instrucciones,
                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                        graficaAST: new NodoGrafico('OR_EXPR', [
                                          $1.graficaAST,
                                          new NodoGrafico('or', []),
                                          $3.graficaAST
                                        ]),
                                        graficaCST: new NodoGrafico('or', [
                                          $1.graficaCST,
                                          $3.graficaCST
                                        ]),
                                        gramatica: `<OR_EXPR> ::= <OR_EXPR> "or" <AND_EXPR> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                      $$.gramatica += $3.gramatica;
                                    }
        ;

AND_EXPR : COMPARISON_EXPR                          {
                                                      $$ = {
                                                        instrucciones: $1.instrucciones,
                                                        graficaAST: new NodoGrafico('AND_EXPR', [
                                                          $1.graficaAST
                                                        ]),
                                                        graficaCST: $1.graficaCST,
                                                        gramatica: `<AND_EXPR> ::= <COMPARISON_EXPR> \n`
                                                      };
                                                      $$.gramatica += $1.gramatica;
                                                    }
         | AND_EXPR 'and' COMPARISON_EXPR           {
                                                      $$ = {
                                                        instrucciones: new And(Tipo.BOOLEAN, $1.instrucciones,
                                                            $3.instrucciones, this._$.first_line, this._$.first_column),
                                                        graficaAST: new NodoGrafico('OR_EXPR', [
                                                          $1.graficaAST,
                                                          new NodoGrafico('and', []),
                                                          $3.graficaAST
                                                        ]),
                                                        graficaCST: new NodoGrafico('and', [
                                                          $1.graficaCST,
                                                          $3.graficaCST
                                                        ]),
                                                        gramatica: `<AND_EXPR> ::= <AND_EXPR> "and" <COMPARISON_EXPR> \n`
                                                      };
                                                      $$.gramatica += $1.gramatica;
                                                      $$.gramatica += $3.gramatica;
                                                    }
         ;

COMPARISON_EXPR : ADDITIVE_EXPR                       {
                                                        $$ = {
                                                          instrucciones: $1.instrucciones,
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST
                                                          ]),
                                                          graficaCST: $1.graficaCST,
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                      }
                | ADDITIVE_EXPR '<' ADDITIVE_EXPR     {
                                                        $$ = {
                                                          instrucciones: new Menor(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('<', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('<', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> "<" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                | ADDITIVE_EXPR '>' ADDITIVE_EXPR     {
                                                        $$ = {
                                                          instrucciones: new Mayor(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('>', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('>', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> ">" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                | ADDITIVE_EXPR '<=' ADDITIVE_EXPR    {
                                                        $$ = {
                                                          instrucciones: new MenorQue(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('<=', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('<=', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> "<=" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                | ADDITIVE_EXPR '>=' ADDITIVE_EXPR    {
                                                        $$ = {
                                                          instrucciones: new MayorQue(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('>=', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('>=', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> ">=" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                | ADDITIVE_EXPR '=' ADDITIVE_EXPR     {
                                                        $$ = {
                                                          instrucciones: new Igualdad(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('=', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('=', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> "=" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                | ADDITIVE_EXPR '!=' ADDITIVE_EXPR    {
                                                        $$ = {
                                                          instrucciones: new Diferencia(Tipo.BOOLEAN, $1.instrucciones,
                                                              $3.instrucciones, this._$.first_line, this._$.first_column),
                                                          graficaAST: new NodoGrafico('COMPARISON_EXPR', [
                                                            $1.graficaAST,
                                                            new NodoGrafico('!=', []),
                                                            $3.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('!=', [
                                                            $1.graficaCST,
                                                            $3.graficaCST
                                                          ]),
                                                          gramatica: `<COMPARISON_EXPR> ::= <ADDITIVE_EXPR> "!=" <ADDITIVE_EXPR> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $3.gramatica;
                                                      }
                ;

ADDITIVE_EXPR : MULTIPLICATIVE_EXPR                           {
                                                                $$ = {
                                                                  instrucciones: $1.instrucciones,
                                                                  graficaAST: new NodoGrafico('ADDITIVE_EXPR', [
                                                                    $1.graficaAST
                                                                  ]),
                                                                  graficaCST: $1.graficaCST,
                                                                  gramatica: `<ADDITIVE_EXPR> ::= <MULTIPLICATIVE_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                              }
              | ADDITIVE_EXPR '+' MULTIPLICATIVE_EXPR         {
                                                                $$ = {
                                                                  instrucciones: new Suma(Tipo.STRING, $1.instrucciones,
                                                                    $3.instrucciones, this._$.first_line, this._$.first_column),
                                                                  graficaAST: new NodoGrafico('ADDITIVE_EXPR', [
                                                                    $1.graficaAST,
                                                                    new NodoGrafico('+', []),
                                                                    $3.graficaAST
                                                                  ]),
                                                                  graficaCST: new NodoGrafico('+', [
                                                                    $1.graficaCST,
                                                                    $3.graficaCST
                                                                  ]),
                                                                  gramatica: `<ADDITIVE_EXPR> ::= <ADDITIVE_EXPR> "+" <MULTIPLICATIVE_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                                $$.gramatica += $3.gramatica;
                                                              }
              | ADDITIVE_EXPR '-' MULTIPLICATIVE_EXPR         {
                                                                $$ = {
                                                                  instrucciones: new Resta(Tipo.STRING, $1.instrucciones,
                                                                    $3.instrucciones, this._$.first_line, this._$.first_column),
                                                                  graficaAST: new NodoGrafico('ADDITIVE_EXPR', [
                                                                    $1.graficaAST,
                                                                    new NodoGrafico('-', []),
                                                                    $3.graficaAST
                                                                  ]),
                                                                  graficaCST: new NodoGrafico('-', [
                                                                    $1.graficaCST,
                                                                    $3.graficaCST
                                                                  ]),
                                                                  gramatica: `<ADDITIVE_EXPR> ::= <ADDITIVE_EXPR> "-" <MULTIPLICATIVE_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                                $$.gramatica += $3.gramatica;
                                                              }
              ;

MULTIPLICATIVE_EXPR : UNARY_EXPR                            {
                                                              $$ = {
                                                                instrucciones: $1.instrucciones,
                                                                graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR', [
                                                                  $1.graficaAST
                                                                ]),
                                                                graficaCST: $1.graficaCST,
                                                                gramatica: `<MULTIPLICATIVE_EXPR> ::= <UNARY_EXPR> \n`
                                                              };
                                                              $$.gramatica += $1.gramatica;
                                                            }
                    | MULTIPLICATIVE_EXPR '*' UNARY_EXPR      {
                                                                $$ = {
                                                                  instrucciones: new Multiplicacion(Tipo.STRING, $1.instrucciones,
                                                                    $3.instrucciones, this._$.first_line, this._$.first_column),
                                                                  graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR', [
                                                                    $1.graficaAST,
                                                                    new NodoGrafico('*', []),
                                                                    $3.graficaAST
                                                                  ]),
                                                                  graficaCST: new NodoGrafico('*', [
                                                                    $1.graficaCST,
                                                                    $3.graficaCST
                                                                  ]),
                                                                  gramatica: `<UNARY_EXPR> ::= <MULTIPLICATIVE_EXPR> "*" <UNARY_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                                $$.gramatica += $3.gramatica;
                                                              }
                    | MULTIPLICATIVE_EXPR 'div' UNARY_EXPR    {
                                                                $$ = {
                                                                  instrucciones: new Division(Tipo.STRING, $1.instrucciones,
                                                                    $3.instrucciones, this._$.first_line, this._$.first_column),
                                                                  graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR', [
                                                                    $1.graficaAST,
                                                                    new NodoGrafico('div', []),
                                                                    $3.graficaAST
                                                                  ]),
                                                                  graficaCST: new NodoGrafico('div', [
                                                                    $1.graficaCST,
                                                                    $3.graficaCST
                                                                  ]),
                                                                  gramatica: `<UNARY_EXPR> ::= <MULTIPLICATIVE_EXPR> "div" <UNARY_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                                $$.gramatica += $3.gramatica;
                                                              }
                    ;

//TODO VALUE_EXPR = QUERY
UNARY_EXPR  : QUERY                         {
                                              $$ = {
                                                instrucciones: $1.instrucciones,
                                                graficaAST: new NodoGrafico('UNARY_EXPR', [
                                                  $1.graficaAST
                                                ]),
                                                graficaCST: $1.graficaCST,
                                                gramatica: `<UNARY_EXPR> ::= <QUERY> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                            }
            | '-' UNARY_EXPR %prec UMINUS     {
                                                $$ = {
                                                  instrucciones: new Negativo(Tipo.STRING, $2.instrucciones,
                                                    this._$.first_line, this._$.first_column),
                                                  graficaAST: new NodoGrafico('UNARY_EXPR', [
                                                    new NodoGrafico('-', []),
                                                    $2.graficaAST
                                                  ]),
                                                  graficaCST: new NodoGrafico('-', [
                                                    $2.graficaCST
                                                  ]),
                                                  gramatica: `<UNARY_EXPR> ::= "-" <UNARY_EXPR> \n`
                                                };
                                                $$.gramatica += $2.gramatica;
                                              }
            | '+' UNARY_EXPR %prec UPLUS      {
                                                $$ = {
                                                  instrucciones: null,                        //TODO implementar FUNCION
                                                  graficaAST: new NodoGrafico('UNARY_EXPR', [
                                                    new NodoGrafico('+', []),
                                                    $2.graficaAST
                                                  ]),
                                                  graficaCST: new NodoGrafico('+', [
                                                    $2.graficaCST
                                                  ]),
                                                  gramatica: `<UNARY_EXPR> ::= "+" <UNARY_EXPR> \n`
                                                };
                                                $$.gramatica += $2.gramatica;
                                              }
            ;

ERROR : '/'
      | '//'
      | '::'
      | ']'
      | '['
      | '.'
      | '..'
      | '@'
      | '('
      | ')'
      ;
