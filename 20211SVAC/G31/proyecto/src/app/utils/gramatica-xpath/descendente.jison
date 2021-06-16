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
                            console.error(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y columna ${yylloc.first_column}`);
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
                      arbol.graficaAST = new NodoGrafico('RAIZ DESC XPATH', [$1.graficaAST]);
                      arbol.graficaCST = new NodoGrafico('RAIZ DESC XPATH', [$1.graficaCST]);
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


QUERIES : QUERY QUERIES_PRIMA {
                                $$ = {
                                  instrucciones: [$1.instrucciones].concat($2.instrucciones),
                                  graficaAST: new NodoGrafico('QUERIES', [
                                    $1.graficaAST,
                                    $2.graficaAST
                                  ]),
                                  graficaCST: new NodoGrafico('QUERIES', [
                                    $1.graficaCST,
                                    $2.graficaCST
                                  ]),
                                  gramatica: `<QUERIES> ::= <QUERY> <QUERIES_PRIMA> \n`
                                };
                                $$.gramatica += $1.gramatica;
                                $$.gramatica += $2.gramatica;
                              }
        ;

QUERIES_PRIMA : '|' QUERY QUERIES_PRIMA {
                                          $$ = {
                                            instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                            graficaAST: new NodoGrafico('QUERIES_PRIMA', [
                                              new NodoGrafico('|', []),
                                              $2.graficaAST,
                                              $3.graficaAST
                                            ]),
                                            graficaCST: new NodoGrafico('|', [
                                              $2.graficaCST,
                                              $3.graficaCST
                                            ]),
                                            gramatica: `<QUERIES_PRIMA> ::= "|" <QUERY> <QUERIES_PRIMA> \n`
                                          };
                                          $$.gramatica += $2.gramatica;
                                          $$.gramatica += $3.gramatica;
                                        }
              |                         {
                                          $$ = {
                                            instrucciones: [],
                                            graficaAST: new NodoGrafico('QUERIES_PRIMA', [
                                              new NodoGrafico('ε', [])
                                            ]),
                                            graficaCST: new NodoGrafico('ε', []),
                                            gramatica: `<QUERIES_PRIMA> ::= ε \n`
                                          };
                                        }
              | error                   {
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

PATH_EXPR : STEP_EXPR PATH_EXPR_PRIMA {
                                        $$ = {
                                          instrucciones: null,                        //TODO implementar FUNCION
                                          graficaAST: new NodoGrafico('PATH_EXPR', [
                                            $1.graficaAST,
                                            $2.graficaAST
                                          ]),
                                          graficaCST: new NodoGrafico('PATH_EXPR', [
                                            $1.graficaCST,
                                            $2.graficaCST
                                          ]),
                                          gramatica: `<PATH_EXPR> ::= <STEP_EXPR> <PATH_EXPR_PRIMA> \n`
                                        };
                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $2.gramatica;
                                      }
          ;

PATH_EXPR_PRIMA : '/' STEP_EXPR PATH_EXPR_PRIMA   {
                                                    $$ = {
                                                      instrucciones: null,                        //TODO implementar FUNCION
                                                      graficaAST: new NodoGrafico('PATH_EXPR_PRIMA', [
                                                        new NodoGrafico('/', []),
                                                        $2.graficaAST,
                                                        $3.graficaAST
                                                      ]),
                                                      graficaCST: new NodoGrafico('/', [
                                                        $2.graficaCST,
                                                        $3.graficaCST
                                                      ]),
                                                      gramatica: `<PATH_EXPR_PRIMA> ::= "/" <STEP_EXPR> <PATH_EXPR_PRIMA> \n`
                                                    };
                                                    $$.gramatica += $2.gramatica;
                                                    $$.gramatica += $3.gramatica;
                                                  }
                | '//' STEP_EXPR PATH_EXPR_PRIMA  {
                                                    $$ = {
                                                      instrucciones: null,                        //TODO implementar FUNCION
                                                      graficaAST: new NodoGrafico('PATH_EXPR_PRIMA', [
                                                        new NodoGrafico('//', []),
                                                        $2.graficaAST,
                                                        $3.graficaAST
                                                      ]),
                                                      graficaCST: new NodoGrafico('//', [
                                                        $2.graficaCST,
                                                        $3.graficaCST
                                                      ]),
                                                      gramatica: `<PATH_EXPR_PRIMA> ::= "//" <STEP_EXPR> <PATH_EXPR_PRIMA> \n`
                                                    };
                                                    $$.gramatica += $2.gramatica;
                                                    $$.gramatica += $3.gramatica;
                                                  }
                |                                 {
                                                    $$ = {
                                                      instrucciones: [],
                                                      graficaAST: new NodoGrafico('PATH_EXPR_PRIMA', [
                                                        new NodoGrafico('ε', [])
                                                      ]),
                                                      graficaCST: new NodoGrafico('ε', []),
                                                      gramatica: `<PATH_EXPR_PRIMA> ::= ε \n`
                                                    };
                                                  }
                ;

STEP_EXPR : POST_FIX_EXPR   {
                              $$ = {
                                instrucciones: $1.instrucciones,            //TODO implementar FUNCION
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
                                instrucciones: $1.instrucciones,            //TODO implementar FUNCION
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
                                                instrucciones: null,            //TODO implementar FUNCION
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
                                                instrucciones: null,                        //TODO implementar FUNCION
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
                                                instrucciones: null,            //TODO implementar FUNCION
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
                                                instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                            instrucciones: null,                        //TODO implementar FUNCION
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
                            instrucciones: null,                        //TODO implementar FUNCION
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
                            instrucciones: null,                        //TODO implementar FUNCION
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
                                                  instrucciones: null,                        //TODO implementar FUNCION
                                                  graficaAST: new NodoGrafico('POST_FIX_EXPR', [
                                                    $1.graficaAST
                                                  ]),
                                                  graficaCST: $1.graficaCST,                           //TODO implementar CST
                                                  gramatica: `<POST_FIX_EXPR> ::= <PRIMARY_EXPR> \n`
                                                };
                                                $$.gramatica += $1.gramatica;
                                              }
              | PRIMARY_EXPR PREDICATE_LIST   {
                                                $$ = {
                                                  instrucciones: null,                        //TODO implementar FUNCION
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

PREDICATE_LIST : PREDICATE PREDICATE_LIST_PRIMA {
                                                  $$ = {
                                                    instrucciones: null,                        //TODO implementar FUNCION
                                                    graficaAST: new NodoGrafico('PREDICATE_LIST', [
                                                      $1.graficaAST,
                                                      $2.graficaAST
                                                    ]),
                                                    graficaCST: new NodoGrafico('PREDICATE_LIST', [
                                                      $1.graficaCST,
                                                      $2.graficaCST
                                                    ]),
                                                    gramatica: `<PREDICATE_LIST> ::= <PREDICATE> <PREDICATE_LIST_PRIMA> \n`
                                                  };
                                                  $$.gramatica += $1.gramatica;
                                                  $$.gramatica += $2.gramatica;
                                                }
               ;

PREDICATE_LIST_PRIMA : PREDICATE PREDICATE_LIST_PRIMA {
                                                        $$ = {
                                                          instrucciones: null,                        //TODO implementar FUNCION
                                                          graficaAST: new NodoGrafico('PREDICATE_LIST_PRIMA', [
                                                            $1.graficaAST,
                                                            $2.graficaAST
                                                          ]),
                                                          graficaCST: new NodoGrafico('PREDICATE_LIST_PRIMA', [
                                                            $1.graficaCST,
                                                            $2.graficaCST
                                                          ]),
                                                          gramatica: `<PREDICATE_LIST_PRIMA> ::= <PREDICATE> <PREDICATE_LIST_PRIMA> \n`
                                                        };
                                                        $$.gramatica += $1.gramatica;
                                                        $$.gramatica += $2.gramatica;
                                                      }
                     |                                {
                                                        $$ = {
                                                          instrucciones: [],
                                                          graficaAST: new NodoGrafico('PREDICATE_LIST_PRIMA', [
                                                            new NodoGrafico('ε', [])
                                                          ]),
                                                          graficaCST: new NodoGrafico('ε', []),
                                                          gramatica: `<PREDICATE_LIST_PRIMA> ::= ε \n`
                                                        };
                                                      }
                     ;

PREDICATE : '[' EXPR ']'    {
                              $$ = {
                                instrucciones: null,                        //TODO implementar FUNCION
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
                                        instrucciones: null,                        //TODO implementar FUNCION
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
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico('.', [])
                                        ]),
                                        graficaCST: new NodoGrafico('.', []),
                                        gramatica: `<PRIMARY_EXPR> ::= "." \n`
                                      };
                                    }
             | 'cadena'             {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | 'digito'             {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | 'decimal'            {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('PRIMARY_EXPR', [
                                          new NodoGrafico($1, [])
                                        ]),
                                        graficaCST: new NodoGrafico($1, []),
                                        gramatica: `<PRIMARY_EXPR> ::= "${$1}" \n`
                                      };
                                    }
             | '[' ']'              {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
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
                                        instrucciones: null,                        //TODO implementar FUNCION
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
                                        instrucciones: null,                        //TODO implementar FUNCION
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

QUERY_LIST : QUERY QUERY_LIST_PRIMA {
                                      $$ = {
                                        instrucciones: null,                        //TODO implementar FUNCION
                                        graficaAST: new NodoGrafico('QUERY_LIST', [
                                          $1.graficaAST,
                                          $2.graficaAST
                                        ]),
                                        graficaCST: new NodoGrafico('QUERY_LIST', [
                                          $1.graficaCST,
                                          $2.graficaCST
                                        ]),
                                        gramatica: `<QUERY_LIST> ::= <QUERY> <QUERY_LIST_PRIMA> \n`
                                      };
                                      $$.gramatica += $1.gramatica;
                                      $$.gramatica += $2.gramatica;
                                    }
           ;

QUERY_LIST_PRIMA : ',' QUERY QUERY_LIST_PRIMA {
                                                $$ = {
                                                  instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                  graficaAST: new NodoGrafico('QUERY_LIST_PRIMA', [
                                                    new NodoGrafico(',', []),
                                                    $2.graficaAST,
                                                    $3.graficaAST
                                                  ]),
                                                  graficaCST: new NodoGrafico(',', [
                                                    $2.graficaCST,
                                                    $3.graficaCST
                                                  ]),
                                                  gramatica: `<QUERY_LIST_PRIMA> ::= "," <QUERY> <QUERY_LIST_PRIMA> \n`
                                                };
                                                $$.gramatica += $2.gramatica;
                                                $$.gramatica += $3.gramatica;
                                              }
                 |                            {
                                                $$ = {
                                                  instrucciones: [],
                                                  graficaAST: new NodoGrafico('QUERY_LIST_PRIMA', [
                                                    new NodoGrafico('ε', [])
                                                  ]),
                                                  graficaCST: new NodoGrafico('ε', []),
                                                  gramatica: `<QUERY_LIST_PRIMA> ::= ε \n`
                                                };
                                              }

                 ;

KIND_TEST : 'text' '(' ')'  {
                              $$ = {
                                instrucciones: null,                        //TODO implementar FUNCION
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
                                instrucciones: null,                        //TODO implementar FUNCION
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('node', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('node()', []),                         //TODO implementar CST
                                gramatica: `<KIND_TEST> ::= "node" "(" ")" \n`
                              };
                            }
          | 'last' '(' ')'  {
                              $$ = {
                                instrucciones: null,                        //TODO implementar FUNCION
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('last', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('last()', []),                         //TODO implementar CST
                                gramatica: `<KIND_TEST> ::= "last" "(" ")" \n`
                              };
                            }
          | 'position' '(' ')'  {
                              $$ = {
                                instrucciones: null,                        //TODO implementar FUNCION
                                graficaAST: new NodoGrafico('KIND_TEST', [
                                  new NodoGrafico('position', []),
                                  new NodoGrafico('(', []),
                                  new NodoGrafico(')', [])
                                ]),
                                graficaCST: new NodoGrafico('position()', []),                         //TODO implementar CST
                                gramatica: `<KIND_TEST> ::= "position" "(" ")" \n`
                              };
                            }
          ;

//TODO AGREGAR PALABRAS RESERVADAS?
EQNAME : 'nodename'               {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'ancestor-or-self'       {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'ancestor'               {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'attribute'              {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'child'                  {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'descendant-or-self'     {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'descendant'             {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'following-sibling'      {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'following'              {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'last'                   {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'namespace'              {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'node'                   {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'parent'                 {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'position'               {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'preceding-sibling'      {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'preceding'              {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'self'                   {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'text'                   {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'and'                    {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'or'                     {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'div'                    {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       | 'mod'                    {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('EQNAME', [
                                        new NodoGrafico($1, [])
                                      ]),
                                      graficaCST: new NodoGrafico($1, []),
                                      gramatica: `<EQNAME> ::= "${$1}" \n`
                                    };
                                  }
       ;

EXPR : EXPR_SINGLE EXPR_PRIMA   {
                                  $$ = {
                                    instrucciones: null,                        //TODO implementar FUNCION
                                    graficaAST: new NodoGrafico('EXPR', [
                                      $1.graficaAST,
                                      $2.graficaAST
                                    ]),
                                    graficaCST: new NodoGrafico('EXPR', [
                                      $1.graficaCST,
                                      $2.graficaCST
                                    ]),
                                    gramatica: `<EXPR> ::= <EXPR_SINGLE> <EXPR_PRIMA> \n`
                                  };
                                  $$.gramatica += $1.gramatica;
                                  $$.gramatica += $2.gramatica;
                                }
     ;

EXPR_PRIMA : ',' EXPR_SINGLE EXPR_PRIMA   {
                                          $$ = {
                                            instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                            graficaAST: new NodoGrafico('EXPR_PRIMA', [
                                              new NodoGrafico(',', []),
                                              $2.graficaAST,
                                              $3.graficaAST
                                            ]),
                                            graficaCST: new NodoGrafico(',', [
                                              $2.graficaCST,
                                              $3.graficaCST
                                            ]),
                                            gramatica: `<EXPR_PRIMA> ::= "," <EXPR_SINGLE> <EXPR_PRIMA> \n`
                                          };
                                          $$.gramatica += $2.gramatica;
                                          $$.gramatica += $3.gramatica;
                                        }
           |                            {
                                          $$ = {
                                            instrucciones: [],
                                            graficaAST: new NodoGrafico('EXPR_PRIMA', [
                                              new NodoGrafico('ε', [])
                                            ]),
                                            graficaCST: new NodoGrafico('ε', []),
                                            gramatica: `<EXPR_PRIMA> ::= ε \n`
                                          };
                                        }
           ;

EXPR_SINGLE : OR_EXPR {
                        $$ = {
                          instrucciones: null,                        //TODO implementar FUNCION
                          graficaAST: new NodoGrafico('EXPR_SINGLE', [
                            $1.graficaAST
                          ]),
                          graficaCST: $1.graficaCST,
                          gramatica: `<EXPR_SINGLE> ::= <OR_EXPR> \n`
                        };
                        $$.gramatica += $1.gramatica;
                      }
            ;

OR_EXPR : AND_EXPR OR_EXPR_PRIMA  {
                                    $$ = {
                                      instrucciones: null,                        //TODO implementar FUNCION
                                      graficaAST: new NodoGrafico('OR_EXPR', [
                                        $1.graficaAST,
                                        $2.graficaAST
                                      ]),
                                      graficaCST: new NodoGrafico('OR_EXPR', [
                                        $1.graficaCST,
                                        $2.graficaCST
                                      ]),
                                      gramatica: `<OR_EXPR> ::= <AND_EXPR> <OR_EXPR_PRIMA> \n`
                                    };
                                    $$.gramatica += $1.gramatica;
                                    $$.gramatica += $2.gramatica;
                                  }
        ;

OR_EXPR_PRIMA : 'or' AND_EXPR OR_EXPR_PRIMA   {
                                                $$ = {
                                                  instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                  graficaAST: new NodoGrafico('OR_EXPR_PRIMA', [
                                                    new NodoGrafico('or', []),
                                                    $2.graficaAST,
                                                    $3.graficaAST
                                                  ]),
                                                  graficaCST: new NodoGrafico('or', [
                                                    $2.graficaCST,
                                                    $3.graficaCST
                                                  ]),
                                                  gramatica: `<OR_EXPR_PRIMA> ::= "or" <AND_EXPR> <OR_EXPR_PRIMA> \n`
                                                };
                                                $$.gramatica += $2.gramatica;
                                                $$.gramatica += $3.gramatica;
                                              }
              |                               {
                                                $$ = {
                                                  instrucciones: [],
                                                  graficaAST: new NodoGrafico('OR_EXPR_PRIMA', [
                                                    new NodoGrafico('ε', [])
                                                  ]),
                                                  graficaCST: new NodoGrafico('ε', []),
                                                  gramatica: `<OR_EXPR_PRIMA> ::= ε \n`
                                                };
                                              }
              ;

AND_EXPR : COMPARISON_EXPR AND_EXPR_PRIMA   {
                                              $$ = {
                                                instrucciones: null,                        //TODO implementar FUNCION
                                                graficaAST: new NodoGrafico('AND_EXPR', [
                                                  $1.graficaAST,
                                                  $2.graficaAST
                                                ]),
                                                graficaCST: new NodoGrafico('AND_EXPR', [
                                                  $1.graficaCST,
                                                  $2.graficaCST
                                                ]),
                                                gramatica: `<AND_EXPR> ::= <COMPARISON_EXPR> <AND_EXPR_PRIMA> \n`
                                              };
                                              $$.gramatica += $1.gramatica;
                                              $$.gramatica += $2.gramatica;
                                            }
         ;

AND_EXPR_PRIMA : 'and' COMPARISON_EXPR AND_EXPR_PRIMA   {
                                                          $$ = {
                                                            instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                            graficaAST: new NodoGrafico('AND_EXPR_PRIMA', [
                                                              new NodoGrafico('and', []),
                                                              $2.graficaAST,
                                                              $3.graficaAST
                                                            ]),
                                                            graficaCST: new NodoGrafico('and', [
                                                              $2.graficaCST,
                                                              $3.graficaCST
                                                            ]),
                                                            gramatica: `<AND_EXPR_PRIMA> ::= "and" <COMPARISON_EXPR> <AND_EXPR_PRIMA> \n`
                                                          };
                                                          $$.gramatica += $2.gramatica;
                                                          $$.gramatica += $3.gramatica;
                                                        }
               |                                        {
                                                          $$ = {
                                                            instrucciones: [],
                                                            graficaAST: new NodoGrafico('AND_EXPR_PRIMA', [
                                                              new NodoGrafico('ε', [])
                                                            ]),
                                                            graficaCST: new NodoGrafico('ε', []),
                                                            gramatica: `<AND_EXPR_PRIMA> ::= ε \n`
                                                          };
                                                        }
               ;

COMPARISON_EXPR : ADDITIVE_EXPR                       {
                                                        $$ = {
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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
                                                          instrucciones: null,                        //TODO implementar FUNCION
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

ADDITIVE_EXPR : MULTIPLICATIVE_EXPR ADDITIVE_EXPR_PRIMA   {
                                                            $$ = {
                                                              instrucciones: null,                        //TODO implementar FUNCION
                                                              graficaAST: new NodoGrafico('ADDITIVE_EXPR', [
                                                                $1.graficaAST,
                                                                $2.graficaAST
                                                              ]),
                                                              graficaCST: new NodoGrafico('ADDITIVE_EXPR', [
                                                                $1.graficaCST,
                                                                $2.graficaCST
                                                              ]),
                                                              gramatica: `<ADDITIVE_EXPR> ::= <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA> \n`
                                                            };
                                                            $$.gramatica += $1.gramatica;
                                                            $$.gramatica += $2.gramatica;
                                                          }
              ;

ADDITIVE_EXPR_PRIMA : '+' MULTIPLICATIVE_EXPR ADDITIVE_EXPR_PRIMA   {
                                                                      $$ = {
                                                                        instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                                        graficaAST: new NodoGrafico('ADDITIVE_EXPR_PRIMA', [
                                                                          new NodoGrafico('+', []),
                                                                          $2.graficaAST,
                                                                          $3.graficaAST
                                                                        ]),
                                                                        graficaCST: new NodoGrafico('+', [
                                                                          $2.graficaCST,
                                                                          $3.graficaCST
                                                                        ]),
                                                                        gramatica: `<ADDITIVE_EXPR_PRIMA> ::= "+" <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA> \n`
                                                                      };
                                                                      $$.gramatica += $2.gramatica;
                                                                      $$.gramatica += $3.gramatica;
                                                                    }
                    | '-' MULTIPLICATIVE_EXPR ADDITIVE_EXPR_PRIMA   {
                                                                      $$ = {
                                                                        instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                                        graficaAST: new NodoGrafico('ADDITIVE_EXPR_PRIMA', [
                                                                          new NodoGrafico('-', []),
                                                                          $2.graficaAST,
                                                                          $3.graficaAST
                                                                        ]),
                                                                        graficaCST: new NodoGrafico('-', [
                                                                          $2.graficaCST,
                                                                          $3.graficaCST
                                                                        ]),
                                                                        gramatica: `<ADDITIVE_EXPR_PRIMA> ::= "-" <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA> \n`
                                                                      };
                                                                      $$.gramatica += $2.gramatica;
                                                                      $$.gramatica += $3.gramatica;
                                                                    }
                    |                                               {
                                                                      $$ = {
                                                                        instrucciones: [],
                                                                        graficaAST: new NodoGrafico('ADDITIVE_EXPR_PRIMA', [
                                                                          new NodoGrafico('ε', [])
                                                                        ]),
                                                                        graficaCST: new NodoGrafico('ε', []),
                                                                        gramatica: `<ADDITIVE_EXPR_PRIMA> ::= ε \n`
                                                                      };
                                                                    }
                    ;

MULTIPLICATIVE_EXPR : UNARY_EXPR MULTIPLICATIVE_EXPR_PRIMA    {
                                                                $$ = {
                                                                  instrucciones: null,                        //TODO implementar FUNCION
                                                                  graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR', [
                                                                    $1.graficaAST,
                                                                    $2.graficaAST
                                                                  ]),
                                                                  graficaCST: new NodoGrafico('MULTIPLICATIVE_EXPR', [
                                                                    $1.graficaCST,
                                                                    $2.graficaCST
                                                                  ]),
                                                                  gramatica: `<MULTIPLICATIVE_EXPR> ::= <UNARY_EXPR> <MULTIPLICATIVE_EXPR> \n`
                                                                };
                                                                $$.gramatica += $1.gramatica;
                                                                $$.gramatica += $2.gramatica;
                                                              }
                    ;


MULTIPLICATIVE_EXPR_PRIMA : '*' UNARY_EXPR MULTIPLICATIVE_EXPR_PRIMA    {
                                                                          $$ = {
                                                                            instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                                            graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR_PRIMA', [
                                                                              new NodoGrafico('*', []),
                                                                              $2.graficaAST,
                                                                              $3.graficaAST
                                                                            ]),
                                                                            graficaCST: new NodoGrafico('*', [
                                                                              $2.graficaCST,
                                                                              $3.graficaCST
                                                                            ]),
                                                                            gramatica: `<MULTIPLICATIVE_EXPR_PRIMA> ::= "*" <UNARY_EXPR> <MULTIPLICATIVE_EXPR_PRIMA> \n`
                                                                          };
                                                                          $$.gramatica += $2.gramatica;
                                                                          $$.gramatica += $3.gramatica;
                                                                        }
                          | 'div' UNARY_EXPR MULTIPLICATIVE_EXPR_PRIMA  {
                                                                          $$ = {
                                                                            instrucciones: [$2.instrucciones].concat($3.instrucciones),
                                                                            graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR_PRIMA', [
                                                                              new NodoGrafico('div', []),
                                                                              $2.graficaAST,
                                                                              $3.graficaAST
                                                                            ]),
                                                                            graficaCST: new NodoGrafico('div', [
                                                                              $2.graficaCST,
                                                                              $3.graficaCST
                                                                            ]),
                                                                            gramatica: `<MULTIPLICATIVE_EXPR_PRIMA> ::= "div" <UNARY_EXPR> <MULTIPLICATIVE_EXPR_PRIMA> \n`
                                                                          };
                                                                          $$.gramatica += $2.gramatica;
                                                                          $$.gramatica += $3.gramatica;
                                                                        }
                          |                                             {
                                                                          $$ = {
                                                                            instrucciones: [],
                                                                            graficaAST: new NodoGrafico('MULTIPLICATIVE_EXPR_PRIMA', [
                                                                              new NodoGrafico('ε', [])
                                                                            ]),
                                                                            graficaCST: new NodoGrafico('ε', []),
                                                                            gramatica: `<MULTIPLICATIVE_EXPR_PRIMA> ::= ε \n`
                                                                          };
                                                                        }
                          ;

//TODO VALUE_EXPR = QUERY
UNARY_EXPR  : QUERY                           {
                                                $$ = {
                                                  instrucciones: null,                        //TODO implementar FUNCION
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
                                                  instrucciones: null,                        //TODO implementar FUNCION
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
