
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%s                                  comment
%%
"(:"                                this.begin('comment');
<comment>":)"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                   /* skip whitespace */

/*WORD RESERVED*/
'substring'                 return 'substring_t';
'upper-case'                return 'upper-case_t';
'lower-case'                return 'lower-case_t';
'number'                    return 'number_t';
'imprimir'                  return 'imprimir';
'declare'                   return 'declare_terminal';
'function'                  return 'function_terminal';
'local'                     return 'local';
'as'                        return 'as_terminal';
'xs'                        return 'xs';
'decimal'                   return 'decimal_t';
'float'                     return 'float_t';
'boolean'                   return 'boolean_t';
'string'                    return 'string_t';
'int'                       return 'int_t';
'anyURI'                    return 'anyURI';
'to'                        return 'to';
'at'                        return 'at';
'if'                        return 'if';
'else'                      return 'else';
'then'                      return 'then';
'data'                      return 'data';
'for'                       return 'for_terminal';
'in'                        return 'in';
'where'                     return 'where';
'order'                     return 'order';
'by'                        return 'by';
'return'                    return 'return_terminal';
'let'                       return 'let';
'node'                      return 'node';
'last'                      return 'last';
'position'                  return 'position';
'text'                      return 'text';
'ancestor-or-self'          return 'ancestor-or-self';
'ancestor'                  return 'ancestor';
'attribute'                 return 'attribute';
'child'                     return 'child';
'descendant-or-self'        return 'descendant-or-self';
'descendant'                return 'descendant';
'following-sibling'         return 'following-sibling';
'following'                 return 'following';
'namespace'                 return 'namespace';
'preceding-sibling'         return 'preceding-sibling';
'parent'                    return 'parent';
'preceding'                 return 'preceding';
'self'                      return 'self';
"::"                        return 'axe_connector';
":"                         return 'colon';
";"                         return 'semicolon';
"//"                        return 'any_expresion';
"/"                         return 'root_expresion';
".."                        return 'parent_expresion';
"."                         return 'current_expresion';
"@"                         return 'atribute_expresion';

"?"                         return 'question';
"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"div"                       return 'div';
"mod"                       return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"!="                        return 'nequal';
"="                         return 'equal';

"and"                       return 'and';
"or"                        return 'or';

"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchetes';
"]"                         return 'rcorchetes';
"{"                         return 'lllave';
"}"                         return 'rllave';

"|"                         return 'node_set';
","                         return 'coma';

/*REGULAR EXPRESSIONS*/
"“"[^\"\n]*"”" 				return 'str'
"\""[^\"\n]*"\"" 			return 'str'
"'"[^''\n]*"'" 				return 'str'
"‘"[^''\n]*"’" 				return 'str'
"`"[^''\n]*"`" 				return 'str'

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';
"$"[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]|"_")*			return 'variable'
[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]|"_"|"-")*			return 'identifier'

.                                   {
                                        ListaErrores.AgregarErrorXQUERY(new TokenError(TipoError.Lexico,"No se reconocio el token "+yytext,yylloc.first_line,yylloc.first_column));
                                    }
<<EOF>>               return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'lparen' 'rparen'
%left LISTA_NUM

%start S

%% /* language grammar */

S   :  XQUERY_XPATH EOF { $$ = $1; return $$; }
    ;

XQUERY_XPATH : XQUERY { $$ = new XqueryList($1); }
             ;

XQUERY: XQUERY INSTRUCCION { $$ = $1; $$.push($2); }
      | INSTRUCCION { $$ = []; $$.push($1); }
        ;

INSTRUCCION : DECLARACION { $$ = $1; }
            | ASIGNACION { $$ = $1; }
            | FLOWER { $$ = $1; }
            | FUNCIONES_NATIVAS_XQUERY { $$ = $1; }
            | IF_XQUERY { $$ = $1; }
            | RETURN_QUERY { $$ = $1; }
            | DECLARACION_FUNCION { $$ = $1; }
            | LLAMADA_FUNCION_INSTRUCCION { $$ = $1; }
            | IMPRESION { $$ = $1; }
            ;

SENTENCIAS : SENTENCIAS SENTENCIA { $$ = $1; $$.push($2); }
           | SENTENCIA {  $$ = []; $$.push($1); }
           ;

SENTENCIA  :  DECLARACION { $$ = $1; }
            | ASIGNACION { $$ = $1; }
            | RETURN_QUERY { $$ = $1; }
            | IMPRESION { $$ = $1; }
            | FLOWER { $$ = $1; }
            | FUNCIONES_NATIVAS_XQUERY { $$ = $1; }
            | LLAMADA_FUNCION_INSTRUCCION { $$ = $1; }
            | IF_XQUERY { $$ = $1; }
            ;

IMPRESION: imprimir lparen INSTRUCCION_RETORNO  rparen { $$ = new Imprimir($3,@1.first_line,@1.first_column); }
          ;

INSTRUCCION_RETORNO : FLOWER { $$ = $1; }
                  | FUNCIONES_NATIVAS_XQUERY { $$ = $1; }
                  | IF_XQUERY { $$ = $1; }
                  | PREDICATE { $$ = $1; }
                  ;

DECLARACION : let variable colon equal PREDICATE { $$ = new Declaracion($2,$5,@2.first_line,@2.first_column); }
            ;

ASIGNACION  : variable colon equal PREDICATE { $$ = new Asignacion($1,$4,@1.first_line,@1.first_column); }
            ;

LLAMADA_FUNCION_INSTRUCCION : local colon identifier lparen rparen { $$ = new LlamadaFuncionInstruccion($3,[],@1.first_line,@1.first_column); }
                            | local colon identifier lparen LISTA_VALORES rparen { $$ = new LlamadaFuncionInstruccion($3,$5,@1.first_line,@1.first_column); }
                            ;

LLAMADA_FUNCION_EXPRESION : local colon identifier lparen rparen { $$ = new LlamadaFuncion($3,[],@1.first_line,@1.first_column); }
                          | local colon identifier lparen LISTA_VALORES rparen { $$ = new LlamadaFuncion($3,$5,@1.first_line,@1.first_column); }
                          ;

LISTA_VALORES : LISTA_VALORES coma PREDICATE { $$ = $1; $$.push($3); }
              | PREDICATE { $$ = []; $$.push($1); }
              ;

DECLARACION_FUNCION : declare_terminal function_terminal local colon
                      identifier lparen LISTA_PARAMETROS rparen as_terminal TIPO_DATO
                      lllave SENTENCIAS rllave semicolon { $$ = new Funcion($5,$7,$10,$12,@1.first_line,@1.first_column); }
                    | declare_terminal function_terminal local colon
                      identifier lparen rparen as_terminal TIPO_DATO
                      lllave SENTENCIAS rllave semicolon { $$ = new Funcion($5,[],$9,$11,@1.first_line,@1.first_column); }
                    ;

LISTA_PARAMETROS : LISTA_PARAMETROS coma PARAMETRO { $$ = $1; $$.push($3); }
                 | PARAMETRO { $$ = []; $$.push($1); }
                 ;

PARAMETRO : variable as_terminal TIPO_DATO { $$ = new Parametro($1,$3,@1.first_line,@1.first_column); }
          ;

FLOWER : for_terminal variable in LISTA-XPATH where variable PREDICATE order by PREDICATE RETURN_QUERY { var sentenciaXpath = new ListaXpathExpresion($4, @1.first_line,@1.first_column);
                                                                                                         var filterNode = new FilterResult($6,$7,@6.first_line,@6.first_column);
                                                                                                         $$ = new SentenciaFor($2,sentenciaXpath,filterNode,$10,$11,@1.first_line,@1.first_column);
                                                                                                       }
       | for_terminal variable in LISTA-XPATH where variable PREDICATE RETURN_QUERY { var sentenciaXpath = new ListaXpathExpresion($4, @1.first_line,@1.first_column);
                                                                                      var filterNode = new FilterResult($6,$7,@6.first_line,@6.first_column);
                                                                                      $$ = new SentenciaFor($2,sentenciaXpath,filterNode,null,$8,@1.first_line,@1.first_column);
                                                                                    }
       | for_terminal variable in LISTA-XPATH order by PREDICATE RETURN_QUERY { var sentenciaXpath = new ListaXpathExpresion($4, @1.first_line,@1.first_column);
                                                                                $$ = new SentenciaFor($2,sentenciaXpath,null,$7,$8,@1.first_line,@1.first_column); }
       | for_terminal variable in LISTA-XPATH RETURN_QUERY { var sentenciaXpath = new ListaXpathExpresion($4, @1.first_line,@1.first_column);
                                                             $$ = new SentenciaFor($2,sentenciaXpath,null,null,$5,@1.first_line,@1.first_column); }

       | for_terminal variable at variable in LISTA-XPATH where PREDICATE order by PREDICATE RETURN_QUERY
       | for_terminal variable at variable in LISTA-XPATH where PREDICATE RETURN_QUERY
       | for_terminal variable at variable in LISTA-XPATH order by PREDICATE RETURN_QUERY
       | for_terminal variable at variable in LISTA-XPATH RETURN_QUERY

       | for_terminal LISTA_VALORES_FLOWER RETURN_QUERY { $$ = new SentenciaForNumerica($2,$3,@1.first_line,@1.first_column); }
       ;

LISTA_VALORES_FLOWER : LISTA_VALORES_FLOWER coma VALOR_FLOWER { $$ = $1; $$.push($3); }
                     | VALOR_FLOWER { $$ = []; $$.push($1); }
                     ;

VALOR_FLOWER : variable in lparen IntegerLiteral to IntegerLiteral rparen { $$ = new ValorFlower($1,null,Number($4),Number($6),@1.first_line,@1.first_column); }
             | variable in lparen LISTA_NUMEROS rparen { $$ = new ValorFlower($1,$4,null,null,@1.first_line,@1.first_column); }
              ;


LISTA_NUMEROS : LISTA_NUMEROS coma IntegerLiteral { $$ = $1; $$.push(Number($3)); }
              | IntegerLiteral { $$ = []; $$.push(Number($1)); }
              ;

IF_XQUERY : SENTENCIA_IF  LISTA_ELSE_IF { $$ = $2;  $$.agregarPrimerIf($1); }
           ;

SENTENCIA_IF : if lparen PREDICATE rparen then lparen SENTENCIAS  rparen { $$ = new SentenciaIf($3,$7,@1.first_line,@1.first_column); }
             ;

LISTA_ELSE_IF : LISTA_ELSE_IF else SENTENCIA_IF { $$=$1; $$.agregarElseIf($3); }
              | LISTA_ELSE_IF else lparen SENTENCIAS  rparen { $$ = $1; $$.agregarElse(new SentenciaElse($4,@2.first_line,@2.first_column)) }
              | else SENTENCIA_IF { $$ = new InstruccionIf(@1.first_line,@1.first_column); $$.agregarElseIf($2); }
              | else lparen SENTENCIAS  rparen { $$ = new InstruccionIf(@1.first_line,@1.first_column); $$.agregarElse(new SentenciaElse($3,@1.first_line,@1.first_column)); }
              ;

RETURN_QUERY :  return_terminal INSTRUCCION_RETORNO { $$ = new Retorno($2,@1.first_line,@1.first_column); }
             ;

TIPO_DATO : xs colon anyURI question { $$ = new Tipo(TipoDato.xpathValue); }
          | xs colon decimal_t question { $$ = new Tipo(TipoDato.numero); }
          | xs colon float_t question { $$ = new Tipo(TipoDato.numero); }
          | xs colon boolean_t question { $$ = new Tipo(TipoDato.booleano); }
          | xs colon string_t question { $$ = new Tipo(TipoDato.cadena); }
          | xs colon int_t question { $$ = new Tipo(TipoDato.numero); }
          ;

FUNCIONES_NATIVAS_XQUERY : data lparen LISTA-XPATH  rparen
                         ;

LISTA-XPATH: LISTA-XPATH node_set XPATH-EXPRESION { ReporteGramatical.agregarProduccionXpath("LISTA-XPATH -> LISTA-XPATH | XPATH","LISTA-XPATH1.LISTA.ADD( XPATH );</br>LISTA-XPATH.LISTA = LISTA-XPATH1.LISTA;");
                                                    var expresion = new XpathExpresion($3, @3.first_line,@3.first_column);
                                                    $1.push( expresion ); $$=$1; }
           | XPATH-EXPRESION { ReporteGramatical.agregarProduccionXpath("LISTA-XPATH -> XPATH","LISTA-XPATH.LISTA = XPATH;");
                               var expresion = new XpathExpresion($1, @1.first_line,@1.first_column);
                               $$ = [expresion]; }
           ;

XPATH-EXPRESION : XPATH-EXPRESION EXPRESION { ReporteGramatical.agregarProduccionXpath("XPATH -> XPATH EXPRESION","XPATH1.LISTA.ADD( EXPRESION );</br>XPATH.LISTA = XPATH1.LISTA;");
                                              if( !($2 instanceof NodoError) ) $1.push($2);
                                              $$ = $1;
                                            }
                | EXPRESION  { ReporteGramatical.agregarProduccionXpath("XPATH -> EXPRESION","XPATH.LISTA = [EXPRESION];");
                               if($1 instanceof NodoError) $$ = [];
                               else  $$ = [$1];
                             }
                | FIRST_EXPRESION { ReporteGramatical.agregarProduccionXpath("XPATH -> EXPRESION","XPATH.LISTA = [EXPRESION];");
                                    if($1 instanceof NodoError) $$ = [];
                                    else  $$ = [$1];
                                  }
                ;

FIRST_EXPRESION : identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> id","EXPRESION = NodoXpath(id);");
                                $$ = new RootIdentifier($1,[],@1.first_line,@1.first_column); }
                  | variable { ReporteGramatical.agregarProduccionXpath("EXPRESION -> $id","EXPRESION = NodoXquery($id);");
                               $$ = new Variable($1,@1.first_line,@1.first_column); }
                  | node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> node()","EXPRESION = NodoXpath('node');");
                                         $$ = new RootNode([],@1.first_line,@1.first_column); }
                  | current_expresion { ReporteGramatical.agregarProduccionXpath("EXPRESION -> .","EXPRESION = NodoXpath('.');");
                                                    $$ = new RootCurrent([],@1.first_line,@1.first_column); }
                  | atribute_expresion identifier {  ReporteGramatical.agregarProduccionXpath("EXPREISON -> @ id","EXPREISON = new Atributo(id);");
                                                   $$ = new RootAtributeIdentifier($2,[],@1.first_line, @1.first_column ); }
                  | atribute_expresion times {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> @ *","EXPRESION = new Atributo(times);");
                                               $$ = new RootAtributeTimes([],@1.first_line, @1.first_column ); }
                  | atribute_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> @node()","EXPRESION = new Atributo(nodo);");
                                                           $$ = new RootAtributeTimes([],@1.first_line, @1.first_column ); }
                  | atribute_expresion identifier LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPREISON -> @ id","EXPREISON = new Atributo(id);");
                                                                      $$ = new RootAtributeIdentifier($2,$3,@1.first_line, @1.first_column ); }
                  | atribute_expresion times LISTA_PREDICATES {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> @ *","EXPRESION = new Atributo(times);");
                                                                  $$ = new RootAtributeTimes($3,@1.first_line, @1.first_column ); }
                  | atribute_expresion node lparen rparen LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> @node()","EXPRESION = new Atributo(nodo);");
                                                                              $$ = new RootAtributeTimes($5,@1.first_line, @1.first_column ); }
                  | identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> id LISTA_PREDICADOS","EXPRESION = NodoXpath(id, LISTA_PREDICADOS);");
                                                  $$ = new RootIdentifier($1,$2,@1.first_line,@1.first_column); }
                  | node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> node LISTA_PREDICADOS","EXPRESION = NodoXpath('node', LISTA_PREDICADOS);");
                                                          $$ = new RootNode($4,@1.first_line,@1.first_column); }

                  | AXES_NAME axe_connector identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: id","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', "+$3+" );");
                                                              $$ = AxeFabric.createAxeExpresion($1,AxeOperation.identifier, $3,[],@2.first_line, @2.first_column);
                                                            }
                  | AXES_NAME axe_connector times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: *","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', * );");
                                                         $$ = AxeFabric.createAxeExpresion($1,AxeOperation.times, "",[],@2.first_line, @2.first_column);
                                                       }
                  | AXES_NAME axe_connector node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: node()","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', node() );");
                                                                 $$ = AxeFabric.createAxeExpresion($1,AxeOperation.node, "",[],@2.first_line, @2.first_column);
                                                               }
                  | AXES_NAME axe_connector text lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: text()","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', text() );");
                                                                 $$ = AxeFabric.createAxeExpresion($1,AxeOperation.text, "",[],@2.first_line, @2.first_column);
                                                               }
                  | AXES_NAME axe_connector identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: id LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', "+$3+", LISTA_PREDICADOS );");
                                                                          $$ = AxeFabric.createAxeExpresion($1,AxeOperation.identifier, $3,$4,@2.first_line, @2.first_column);
                                                                        }
                  | AXES_NAME axe_connector times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: * LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', * , LISTA_PREDICADOS);");
                                                                     $$ = AxeFabric.createAxeExpresion($1,AxeOperation.times, "",$4,@2.first_line, @2.first_column);
                                                                   }
                  | AXES_NAME axe_connector node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: node() LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', node(), LISTA_PREDICADOS );");
                                                                                  $$ = AxeFabric.createAxeExpresion($1,AxeOperation.node, "",$6,@2.first_line, @2.first_column);
                                                                                }
                  | AXES_NAME axe_connector text lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> AXES_NAME :: text() LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$1]+"', text(), LISTA_PREDICADOS );");
                                                                                  $$ = AxeFabric.createAxeExpresion($1,AxeOperation.text, "",$6,@2.first_line, @2.first_column);
                                                                                }
                  ;

EXPRESION : root_expresion identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /id","EXPRESION = NodoXpath('/',id);");
                                        $$ = new RootIdentifier($2,[],@2.first_line,@2.first_column); }
          | root_expresion atribute_expresion identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /@id","EXPRESION = NodoXpath('/@',id);");
                                                            $$ = new RootAtributeIdentifier($3,[],@3.first_line,@3.first_column); }
          | root_expresion atribute_expresion times {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> @ *","EXPRESION = new Atributo(times);");
                                                         $$ = new RootAtributeTimes([],@1.first_line, @1.first_column ); }
          | root_expresion atribute_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> @node()","EXPRESION = new Atributo(nodo);");
                                                                     $$ = new RootAtributeTimes([],@1.first_line, @1.first_column ); }
          | root_expresion current_expresion { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /.","EXPRESION = NodoXpath('/.');");
                                                $$ = new RootCurrent([],@1.first_line,@1.first_column); }
          | root_expresion parent_expresion { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /..","EXPRESION = NodoXpath('/..');");
                                                $$ = new RootParent([],@1.first_line,@1.first_column); }
          | root_expresion times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /*","EXPRESION = NodoXpath('/*');");
                                    $$ = new RootTimes([],@1.first_line,@1.first_column); }
          | root_expresion node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /node()","EXPRESION = NodoXpath('/node');");
                                                $$ = new RootNode([],@1.first_line,@1.first_column); }
          | root_expresion AXES_NAME axe_connector identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: id","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', "+$4+" );");
                                                                $$ = AxeFabric.createAxeExpresion($2,AxeOperation.identifier, $4,[],@3.first_line, @3.first_column);
                                                              }
          | root_expresion AXES_NAME axe_connector times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: *","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', * );");
                                                           $$ = AxeFabric.createAxeExpresion($2,AxeOperation.times, "",[],@3.first_line, @3.first_column);
                                                         }
          | root_expresion AXES_NAME axe_connector node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: node()","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', node() );");
                                                                        $$ = AxeFabric.createAxeExpresion($2,AxeOperation.node, "",[],@3.first_line, @3.first_column);
                                                                      }
          | root_expresion AXES_NAME axe_connector text lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: text()","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', text() );");
                                                                        $$ = AxeFabric.createAxeExpresion($2,AxeOperation.text, "",[],@3.first_line, @3.first_column);
                                                                      }
          | root_expresion text lparen rparen { ReporteGramatical.agregarProduccionXpath("Expresion -> /text()","Expresion = new TextExpresion();");
                                 $$ = new RootText([], @1.first_line, @1.first_column); }


          | any_expresion identifier {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //id","EXPRESION = NodoXpath('//',id);");
                                        $$ = new AnyIdentifier($2,[],@2.first_line,@2.first_column); }
          | any_expresion atribute_expresion identifier {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@id","EXPRESION = NodoXpath('//@',id);");
                                                            $$ = new AnyAtributeIdentifier($3,[],@3.first_line,@3.first_column); }
          | any_expresion atribute_expresion times {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@ *","EXPRESION = new Atributo(/times);");
                                                       $$ = new AnyAtributeTimes([],@1.first_line, @1.first_column ); }
          | any_expresion atribute_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@node()","EXPRESION = new Atributo(//nodo);");
                                                                   $$ = new AnyAtributeTimes([],@1.first_line, @1.first_column ); }
          | any_expresion current_expresion {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //.","EXPRESION = NodoXpath('//.');");
                                                $$ = new AnyCurrent([],@1.first_line,@1.first_column); }
          | any_expresion parent_expresion {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> //..","EXPRESION = NodoXpath('//..');");
                                                $$ = new AnyParent([],@1.first_line,@1.first_column); }
          | any_expresion times {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //*","EXPRESION = NodoXpath('//*');");
                                    $$ = new AnyTimes([],@1.first_line,@1.first_column); }
          | any_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //node()","EXPRESION = NodoXpath('//node');");
                                                $$ = new AnyNode([],@1.first_line,@1.first_column); }
          | any_expresion AXES_NAME axe_connector identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: id","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', "+$4+" );");
                                                                $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.identifier, $4,[],@3.first_line, @3.first_column);
                                                              }
          | any_expresion AXES_NAME axe_connector times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: *","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', * );");
                                                           $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.times, "",[],@3.first_line, @3.first_column);
                                                         }
          | any_expresion AXES_NAME axe_connector node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: node()","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', node() );");
                                                                        $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.node, "",[],@3.first_line, @3.first_column);
                                                                      }
          | any_expresion AXES_NAME axe_connector text lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: text()","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', text() );");
                                                                        $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.text, "",[],@3.first_line, @3.first_column);
                                                                      }
          | any_expresion text lparen rparen { ReporteGramatical.agregarProduccionXpath("Expresion -> //text()","Expresion = new AnyTextExpresion();");
                                               $$ = new AnyText([], @1.first_line, @1.first_column); }


          | root_expresion identifier LISTA_PREDICATES {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> /id LISTA_PREDICADOS","EXPRESION = NodoXpath('/',id, LISTA_PREDICADOS);");
                                                            $$ = new RootIdentifier($2,$3,@2.first_line,@2.first_column); }
          | root_expresion atribute_expresion identifier LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPREISON -> /@ id","EXPREISON = new Atributo(/id);");
                                                                          $$ = new RootAtributeIdentifier($3,$4,@1.first_line, @1.first_column ); }
          | root_expresion atribute_expresion times LISTA_PREDICATES {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> @ *","EXPRESION = new Atributo(times);");
                                                                      $$ = new RootAtributeTimes($4,@1.first_line, @1.first_column ); }
          | root_expresion atribute_expresion node lparen rparen LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> /@node()","EXPRESION = new Atributo(/nodo);");
                                                                                   $$ = new RootAtributeTimes($6,@1.first_line, @1.first_column ); }
          | root_expresion current_expresion LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/.' LISTA_PREDICADOS","EXPRESION = NodoXpath('/.',LISTA_PREDICADOS);");
                                                                $$ = new RootCurrent($3,@1.first_line,@1.first_column); }
          | root_expresion parent_expresion LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/..' LISTA_PREDICADOS","EXPRESION = NodoXpath('/..',LISTA_PREDICADOS);");
                                                                $$ = new RootParent($3,@1.first_line,@1.first_column); }
          | root_expresion times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /* LISTA_PREDICADOS","EXPRESION = NodoXpath('/*',LISTA_PREDICADOS);");
                                                    $$ = new RootTimes($3,@1.first_line,@1.first_column); }
          | root_expresion node lparen rparen LISTA_PREDICATES {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/node()' LISTA_PREDICADOS","EXPRESION = NodoXpath('/node',LISTA_PREDICADOS);");
                                                                    $$ = new RootNode($5,@1.first_line,@1.first_column); }
          | root_expresion AXES_NAME axe_connector identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: id LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', "+$4+", LISTA_PREDICADOS );");
                                                                                 $$ = AxeFabric.createAxeExpresion($2,AxeOperation.identifier, $4,$5,@3.first_line, @3.first_column);
                                                                               }
          | root_expresion AXES_NAME axe_connector times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: * LISTA_PREDICADOS","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', * , LISTA_PREDICADOS);");
                                                                            $$ = AxeFabric.createAxeExpresion($2,AxeOperation.times, "",$5,@3.first_line, @3.first_column);
                                                                          }
          | root_expresion AXES_NAME axe_connector node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: node()","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', node(), LISTA_PREDICADOS );");
                                                                                         $$ = AxeFabric.createAxeExpresion($2,AxeOperation.node, "",$7,@3.first_line, @3.first_column);
                                                                                       }
          | root_expresion AXES_NAME axe_connector text lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /AXES_NAME :: text()","EXPRESION = new AxeExpresion('"+AxeType[$2]+"', text(), LISTA_PREDICADOS );");
                                                                                         $$ = AxeFabric.createAxeExpresion($2,AxeOperation.text, "",$7,@3.first_line, @3.first_column);
                                                                                        }
          | root_expresion text lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("Expresion -> /text()","Expresion = new TextExpresion();");
                                                                 $$ = new RootText($5, @1.first_line, @1.first_column); }

          | any_expresion identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //id LISTA_PREDICADOS","EXPRESION = NodoXpath('//',id, LISTA_PREDICADOS);");
                                                        $$ = new AnyIdentifier($2,$3,@2.first_line,@2.first_column); }
          | any_expresion atribute_expresion identifier LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@id LISTA_PREDICADOS","EXPRESION = NodoXpath('//@',id,LISTA_PREDICADOS);");
                                                                            $$ = new AnyAtributeIdentifier($3,$4,@3.first_line,@3.first_column); }
          | any_expresion atribute_expresion times LISTA_PREDICATES {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@ * LISTA_PREDICADOS","EXPRESION = new Atributo(//times,LISTA_PREDICADOS);");
                                                                         $$ = new AnyAtributeTimes($4,@1.first_line, @1.first_column ); }
          | any_expresion atribute_expresion node lparen rparen LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@node() LISTA_PREDICADOS","EXPRESION = new Atributo(//nodo,LISTA_PREDICADOS);");
                                                                                     $$ = new AnyAtributeTimes($6,@1.first_line, @1.first_column ); }

          | any_expresion current_expresion LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> '//.' LISTA_PREDICADOS","EXPRESION = NodoXpath('//.',LISTA_PREDICADOS);");
                                                                $$ = new AnyCurrent($3,@1.first_line,@1.first_column); }
          | any_expresion parent_expresion LISTA_PREDICATES {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> '//..' LISTA_PREDICADOS","EXPRESION = NodoXpath('//..',LISTA_PREDICADOS);");
                                                                $$ = new AnyParent($3,@1.first_line,@1.first_column); }
          | any_expresion times LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //* LISTA_PREDICADOS","EXPRESION = NodoXpath('//*',LISTA_PREDICADOS);");
                                                    $$ = new AnyTimes($3,@1.first_line,@1.first_column); }
          | any_expresion node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //node() LISTA_PREDICADOS","EXPRESION = NodoXpath('//node',LISTA_PREDICADOS);");
                                                                $$ = new AnyNode($5,@1.first_line,@1.first_column); }
          | any_expresion AXES_NAME axe_connector identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: id LISTA_PREDICADOS","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', "+$4+", LISTA_PREDICADOS );");
                                                                                $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.identifier, $4,$5,@3.first_line, @3.first_column);
                                                                              }
          | any_expresion AXES_NAME axe_connector times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: * LISTA_PREDICADOS","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', * , LISTA_PREDICADOS);");
                                                                           $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.times, "",$5,@3.first_line, @3.first_column);
                                                                         }
          | any_expresion AXES_NAME axe_connector node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: node()","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', node(), LISTA_PREDICADOS );");
                                                                                        $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.node, "",$7,@3.first_line, @3.first_column);
                                                                                      }
          | any_expresion AXES_NAME axe_connector text lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //AXES_NAME :: text()","EXPRESION = new AnyAxeExpresion('"+AxeType[$2]+"', text(), LISTA_PREDICADOS );");
                                                                                        $$ = AnyAxeFabric.createAnyAxeExpresion($2,AxeOperation.text, "",$7,@3.first_line, @3.first_column);
                                                                                       }
          | any_expresion text lparen rparen LISTA_PREDICATES{ ReporteGramatical.agregarProduccionXpath("Expresion -> //text()","Expresion = new AnyTextExpresion();");
                                                               $$ = new AnyText($5, @1.first_line, @1.first_column); }
          |error
          {
              ReporteGramatical.agregarProduccionXpath("EXPRESION -> error","ListaErrores.agregar(error)");
              ListaErrores.AgregarErrorXQUERY(new TokenError(TipoError.Sintactico,"No se esperaba: "+yytext,@1.first_line,@1.first_column));
              $$ = new NodoError(@1.first_line,@1.first_column);
          }
          ;

LISTA_PREDICATES: LISTA_PREDICATES lcorchetes PREDICATE rcorchetes { ReporteGramatical.agregarProduccionXpath("LISTA_PREDICADOS -> LISTA_PREDICADOS [ PREDICADO ]","LISTA_PREDICADOS1.LISTA.ADD(PREDICADO); </br>LISTA_PREDICADOS.LISTA = LISTA_PREDICADOS1.LISTA;");
                                                                     $1.push($3); $$ = $1; }
                | lcorchetes PREDICATE rcorchetes { ReporteGramatical.agregarProduccionXpath("LISTA_PREDICADOS -> [ PREDICADO ]","LISTA_PREDICADOS.LISTA = []; </br>LISTA_PREDICADOS.LISTA.ADD(PREDICADO);");
                                                    $$ = [$2];
                                                  }
                ;

PREDICATE:  EXPRESION_NUMERICA { ReporteGramatical.agregarProduccionXpath("PREDICADO -> EXPRESION_NUMERICA","PREDICADO = EXPRESION_NUMERICA;");
                                 $$ = $1; }
          | EXPRESION_RELACIONAL { ReporteGramatical.agregarProduccionXpath("PREDICADO -> EXPRESION_RELACIONAL","PREDICADO = EXPRESION_RELACIONAL;");
                                   $$ = $1; }
          | EXPRESION_LOGICA {  ReporteGramatical.agregarProduccionXpath("PREDICADO -> EXPRESION_LOGICA","PREDICADO = EXPRESION_LOGICA;");
                                $$ = $1; }
          | PRIMITIVA { ReporteGramatical.agregarProduccionXpath("PREDICADO -> PRIMITIVA","PREDICADO = PRIMITIVA;");
                        $$ = $1; }
          | lparen PREDICATE rparen {   ReporteGramatical.agregarProduccionXpath("PREDICADO -> ( PREDICADO )","PREDICADO = PREDICADO1;");
                                        $$ = $2; }
          | CUSTOM_FUNCTIONS { $$ = $1; }
          ;

CUSTOM_FUNCTIONS : string_t lparen PREDICATE rparen { $$ = new StringFunction($3,@1.first_line,@1.first_column); }
                 | substring_t lparen PREDICATE  coma PREDICATE coma PREDICATE rparen { $$ = new SubstringFunction($3,$5,$7,@1.first_line,@1.first_column); }
                 | substring_t lparen PREDICATE  coma PREDICATE rparen { $$ = new SubstringFunction($3,$5,null,@1.first_line,@1.first_column); }
                 | upper-case_t lparen PREDICATE rparen { $$ = new UpperLowerCaseFunction($3,true,@1.first_line,@1.first_column); }
                 | lower-case_t lparen PREDICATE rparen { $$ = new UpperLowerCaseFunction($3,false,@1.first_line,@1.first_column); }
                 | number_t lparen PREDICATE rparen { $$ = new NumberFunction($3,@1.first_line,@1.first_column); }
                 ;

EXPRESION_LOGICA: PREDICATE or PREDICATE {  ReporteGramatical.agregarProduccionXpath("PREDICADO -> PREDICADO or PREDICADO","PREDICADO = new OrLogica(PREDICADO1,PREDICADO2);");
                                            $$ = new OrLogica($1,$3,@2.first_line,@2.first_column); }
                | PREDICATE and PREDICATE { ReporteGramatical.agregarProduccionXpath("PREDICADO -> PREDICADO or PREDICADO","PREDICADO = new AndLogica(PREDICADO1,PREDICADO2);");
                                            $$ = new AndLogica($1,$3,@2.first_line,@2.first_column); }
                ;

EXPRESION_RELACIONAL: PREDICATE lt PREDICATE {  ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO < PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'<');");
                                                $$ = new Relational($1,$3,RelationalOperators.lessThan,@2.first_line,@2.first_column); }
                    | PREDICATE lte PREDICATE { ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO <= PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'<=');");
                                                $$ = new Relational($1,$3,RelationalOperators.lessOrEqualThan,@2.first_line,@2.first_column); }
                    | PREDICATE gt PREDICATE {  ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO > PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'>');");
                                                $$ = new Relational($1,$3,RelationalOperators.greaterThan,@2.first_line,@2.first_column); }
                    | PREDICATE gte PREDICATE { ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO >= PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'>=');");
                                                $$ = new Relational($1,$3,RelationalOperators.greaterOrEqualThan,@2.first_line,@2.first_column); }
                    | PREDICATE equal PREDICATE {   ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO = PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'=');");
                                                    $$ = new Comparison($1,$3,RelationalOperators.equal,@2.first_line,@2.first_column); }
                    | PREDICATE nequal PREDICATE {  ReporteGramatical.agregarProduccionXpath("EXPRESION_RELACIONAL -> PREDICADO != PREDICADO","PREDICADO = new Relacional(PREDICADO1,PREDICADO2,'!=');");
                                                    $$ = new Comparison($1,$3,RelationalOperators.notEqual,@2.first_line,@2.first_column); }
                    ;

EXPRESION_NUMERICA: PREDICATE plus PREDICATE {  ReporteGramatical.agregarProduccionXpath("EXPRESION_NUMERICA -> PREDICADO + PREDICADO","PREDICADO = new Aritmetica(PREDICADO1,PREDICADO2,'+');");
                                                $$ = new Suma($1,$3,@2.first_line,@2.first_column); }
                  | PREDICATE minus PREDICATE { ReporteGramatical.agregarProduccionXpath("EXPRESION_NUMERICA -> PREDICADO - PREDICADO","PREDICADO = new Aritmetica(PREDICADO1,PREDICADO2,'-');");
                                                $$ = new Resta($1,$3,@2.first_line,@2.first_column); }
                  | PREDICATE times PREDICATE { ReporteGramatical.agregarProduccionXpath("EXPRESION_NUMERICA -> PREDICADO * PREDICADO","PREDICADO = new Aritmetica(PREDICADO1,PREDICADO2,'*');");
                                                $$ = new Multiplicacion($1,$3,@2.first_line,@2.first_column); }
                  | PREDICATE div PREDICATE {   ReporteGramatical.agregarProduccionXpath("EXPRESION_NUMERICA -> PREDICADO div PREDICADO","PREDICADO = new Aritmetica(PREDICADO1,PREDICADO2,'/');");
                                                $$ = new Division($1,$3,@2.first_line,@2.first_column); }
                  | PREDICATE mod PREDICATE {   ReporteGramatical.agregarProduccionXpath("EXPRESION_NUMERICA -> PREDICADO mod PREDICADO","PREDICADO = new Aritmetica(PREDICADO1,PREDICADO2,'%');");
                                                $$ = new Modulo($1,$3,@2.first_line,@2.first_column); }
                  ;

AXES_NAME: ancestor-or-self { $$ = AxeType.ancestoOrSelfType; }
          |ancestor { $$ = AxeType.ancestorType; }
          |attribute { $$ = AxeType.attributeType; }
          |child { $$ = AxeType.childType; }
          |descendant-or-self { $$ = AxeType.descendantOrSelfType; }
          |descendant { $$ = AxeType.descendantType; }
          |following-sibling { $$ = AxeType.followingSiblingType; }
          |following { $$ = AxeType.followingType; }
          |namespace { $$ = AxeType.namespaceType; }
          |preceding-sibling { $$ = AxeType.precedingSiblingType; }
          |preceding { $$ = AxeType.precedingType; }
          |parent { $$ = AxeType.parentType; }
          |self { $$ = AxeType.selfType; }
          ;

FUNCION_NATIVA: last lparen rparen { ReporteGramatical.agregarProduccionXpath("FUNCION_NATIVA -> last()","FUNCION_NATIVA = new FuncionNativa('last');");
                                     $$ = new NativeFunctionExpresion(NativeFunction.last, @1.first_line, @1.first_column); }
              | position lparen rparen {    ReporteGramatical.agregarProduccionXpath("FUNCION_NATIVA -> position()","FUNCION_NATIVA = new FuncionNativa('position');");
                                            $$ = new NativeFunctionExpresion(NativeFunction.position, @1.first_line, @1.first_column); }
              ;

PRIMITIVA: LISTA-XPATH { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> LISTA-XPATH","PRIMITIVA = new ListaXpath( LISTA-XPATH );");
                         $$ = new ListaXpathExpresion($1, @1.first_line,@1.first_column); }
         | FUNCION_NATIVA { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> FUNCION_NATIVA-XPATH","PRIMITIVA = FUNCION_NATIVA;");
                            $$ = $1; }
         | DoubleLiteral {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> decimal","PRIMITIVA = new PRIMITIVA(Tipo.Decimal,decimal);");
                            $$ = new Primitive(Number($1), new Tipo(TipoDato.numero),@1.first_line, @1.first_column ); }
         | IntegerLiteral { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> entero","PRIMITIVA = new PRIMITIVA(Tipo.entero,entero);");
                            $$ = new Primitive(Number($1), new Tipo(TipoDato.numero),@1.first_line, @1.first_column ); }
         | str {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> cadena","PRIMITIVA = new PRIMITIVA(Tipo.cadena,cadena);");
                            $$ = new Primitive($1.substr(1,$1.length-2), new Tipo(TipoDato.cadena),@1.first_line, @1.first_column ); }
         | LLAMADA_FUNCION_EXPRESION { $$ = $1; }
         ;
