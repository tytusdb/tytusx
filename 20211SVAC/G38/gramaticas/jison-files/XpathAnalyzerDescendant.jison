/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}

BSL                                 "\\".
%s                                  comment
%%
\s+                                 /* skip whitespace */

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
"//"                        return 'any_expresion';
"/"                         return 'root_expresion';
".."                        return 'parent_expresion';
"."                         return 'current_expresion';
"@"                         return 'atribute_expresion';

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
"="                        return 'equal';

"and"                       return 'and';
"or"                        return 'or';

"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchetes';
"]"                         return 'rcorchetes';

"|"                         return 'node_set';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z][a-zA-Z0-9_ñÑ]*             return 'identifier';

"“"[^\"\n]*"”" 				        return 'StringLiteral';
"\""[^\"\n]*"\"" 			        return 'StringLiteral';
"'"[^''\n]*"'" 				        return 'StringLiteral';
"‘"[^''\n]*"’" 				        return 'StringLiteral';
"`"[^''\n]*"`" 				        return 'StringLiteral';

//error lexico
.                                   {
                                        ListaErrores.AgregarErrorXPATH(new TokenError(TipoError.Lexico,"No se reconocio el token "+yytext,yylloc.first_line,yylloc.first_column));
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    //const {Print} = require("../Instrucciones/Primitivas/Print");
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'lparen' 'rparen'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : LISTA-XPATH EOF { ReporteGramatical.agregarProduccionXpath("S -> LISTA-XPATH EOF","S.LISTA = LISTA_XPATH;");
                          $$ = new ListaXpathExpresion($1, @1.first_line,@1.first_column); return $$; }
       ;

LISTA-XPATH: XPATH-EXPRESION LISTA-XPATH_P { ReporteGramatical.agregarProduccionXpath("LISTA-XPATH -> XPATH LISTA_XPATH_P","LISTA-XPATH_P.LISTA = [ XPATH ];</br>LISTA_XPATH.LISTA = LISTA_XPATH_P.LISTA;");
                                            $$ = $2; $$.unshift($1); }
           ;

LISTA-XPATH_P : node_set XPATH-EXPRESION LISTA-XPATH_P { ReporteGramatical.agregarProduccionXpath("LISTA-XPATH_P -> | XPATH LISTA-XPATH_P","LISTA-XPATH_P.LISTA.ADD( XPATH );</br>LISTA-XPATH_P1.LISTA = LISTA-XPATH_P.LISTA;");
                                                         $$ = $3; $$.unshift($2);  }
              | { ReporteGramatical.agregarProduccionXpath("LISTA-XPATH_P -> epsilon","LISTA-XPATH_P.LISTA_SINTETIZADA = LISTA-XPATH_P.LISTA_HEREDADA;");
                    $$ = [];
                }
              ;

XPATH-EXPRESION : EXPRESION  XPATH-EXPRESION_P { ReporteGramatical.agregarProduccionXpath("XPATH -> EXPRESION XPATH_P","XPATH.LISTA.ADD(EXPRESION); XPATH_P.LISTA = XPATH.LISTA;");
                                                 $$ = $2;  $$.unshift($1); }
                | FIRST_EXPRESION XPATH-EXPRESION_P { ReporteGramatical.agregarProduccionXpath("XPATH -> EXPRESION XPATH_P","XPATH.LISTA.ADD(EXPRESION); XPATH_P.LISTA = XPATH.LISTA;");
                                                      $$ = $2;  $$.unshift($1); }
                ;

XPATH_EXPRESION_P : EXPRESION XPATH_EXPRESION_P { ReporteGramatical.agregarProduccionXpath("XPATH_P -> EXPRESION XPATH_P","XPATH_P.LISTA.ADD( XPATH );</br>XPATH_P1.LISTA = XPATH_P.LISTA;");
                                                  $$ = $2; $$.unshift($1); }
                  | {  ReporteGramatical.agregarProduccionXpath("XPATH_P -> epsilon","XPATH_P.LISTA_SINTETIZADA = XPATH_P.LISTA_HEREDADA;");
                       $$ = []; }
                  ;

FIRST_EXPRESION : identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> id","EXPRESION = NodoXpath(id);");
                                $$ = new RootIdentifier($1,[],@1.first_line,@1.first_column); }
                  | times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> *","EXPRESION = NodoXpath('*');");
                            $$ = new RootTimes([],@1.first_line,@1.first_column); }
                  | node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> node()","EXPRESION = NodoXpath('node');");
                                         $$ = new RootNode([],@1.first_line,@1.first_column); }
                  | identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> id LISTA_PREDICADOS","EXPRESION = NodoXpath(id, LISTA_PREDICADOS);");
                                                  $$ = new RootIdentifier($1,$2,@1.first_line,@1.first_column); }
                  | node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> node LISTA_PREDICADOS","EXPRESION = NodoXpath('node', LISTA_PREDICADOS);");
                                                          $$ = new RootNode($4,@1.first_line,@1.first_column); }
                  | times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> * LISTA_PREDICADOS","EXPRESION = NodoXpath('*', LISTA_PREDICADOS);");
                                             $$ = new RootTimes($2,@1.first_line,@1.first_column); }
                  ;

EXPRESION : root_expresion identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /id","EXPRESION = NodoXpath('/',id);");
                                        $$ = new RootIdentifier($2,[],@2.first_line,@2.first_column); }
          | root_expresion atribute_expresion identifier { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /@id","EXPRESION = NodoXpath('/@',id);");
                                                            $$ = new RootAtribute($3,[],@3.first_line,@3.first_column); }
          | root_expresion current_expresion { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /.","EXPRESION = NodoXpath('/.');");
                                                $$ = new RootCurrent([],@1.first_line,@1.first_column); }
          | root_expresion parent_expresion { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /..","EXPRESION = NodoXpath('/..');");
                                                $$ = new RootParent([],@1.first_line,@1.first_column); }
          | root_expresion times { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /*","EXPRESION = NodoXpath('/*');");
                                    $$ = new RootTimes([],@1.first_line,@1.first_column); }
          | root_expresion node lparen rparen { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /node()","EXPRESION = NodoXpath('/node');");
                                                $$ = new RootNode([],@1.first_line,@1.first_column); }

          | any_expresion identifier {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //id","EXPRESION = NodoXpath('//',id);");
                                        $$ = new AnyIdentifier($2,[],@2.first_line,@2.first_column); }
          | any_expresion atribute_expresion identifier {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@id","EXPRESION = NodoXpath('//@',id);");
                                                            $$ = new AnyAtribute($3,[],@3.first_line,@3.first_column); }
          | any_expresion current_expresion {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //.","EXPRESION = NodoXpath('//.');");
                                                $$ = new AnyCurrent([],@1.first_line,@1.first_column); }
          | any_expresion parent_expresion {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> //..","EXPRESION = NodoXpath('//..');");
                                                $$ = new AnyParent([],@1.first_line,@1.first_column); }
          | any_expresion times {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> //*","EXPRESION = NodoXpath('//*');");
                                    $$ = new AnyTimes([],@1.first_line,@1.first_column); }
          | any_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //node()","EXPRESION = NodoXpath('//node');");
                                                $$ = new AnyNode([],@1.first_line,@1.first_column); }


          | root_expresion identifier LISTA_PREDICATES {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> /id LISTA_PREDICADOS","EXPRESION = NodoXpath('/',id, LISTA_PREDICADOS);");
                                                            $$ = new RootIdentifier($2,$3,@2.first_line,@2.first_column); }
          | root_expresion atribute_expresion identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /@id LISTA_PREDICADOS","EXPRESION = NodoXpath('/@',id,LISTA_PREDICADOS);");
                                                                            $$ = new RootAtribute($3,$4,@3.first_line,@3.first_column); }
          | root_expresion current_expresion LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/.' LISTA_PREDICADOS","EXPRESION = NodoXpath('/.',LISTA_PREDICADOS);");
                                                                $$ = new RootCurrent($3,@1.first_line,@1.first_column); }
          | root_expresion parent_expresion LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/..' LISTA_PREDICADOS","EXPRESION = NodoXpath('/..',LISTA_PREDICADOS);");
                                                                $$ = new RootParent($3,@1.first_line,@1.first_column); }
          | root_expresion times LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> /* LISTA_PREDICADOS","EXPRESION = NodoXpath('/*',LISTA_PREDICADOS);");
                                                    $$ = new RootTimes($3,@1.first_line,@1.first_column); }
          | root_expresion node lparen rparen LISTA_PREDICATES {    ReporteGramatical.agregarProduccionXpath("EXPRESION -> '/node()' LISTA_PREDICADOS","EXPRESION = NodoXpath('/node',LISTA_PREDICADOS);");
                                                                    $$ = new RootNode($5,@1.first_line,@1.first_column); }

          | any_expresion identifier LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //id LISTA_PREDICADOS","EXPRESION = NodoXpath('//',id, LISTA_PREDICADOS);");
                                                        $$ = new AnyIdentifier($2,$3,@2.first_line,@2.first_column); }
          | any_expresion atribute_expresion identifier LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //@id LISTA_PREDICADOS","EXPRESION = NodoXpath('//@',id,LISTA_PREDICADOS);");
                                                                            $$ = new AnyAtribute($3,$4,@3.first_line,@3.first_column); }
          | any_expresion current_expresion LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> '//.' LISTA_PREDICADOS","EXPRESION = NodoXpath('//.',LISTA_PREDICADOS);");
                                                                $$ = new AnyCurrent($3,@1.first_line,@1.first_column); }
          | any_expresion parent_expresion LISTA_PREDICATES {   ReporteGramatical.agregarProduccionXpath("EXPRESION -> '//..' LISTA_PREDICADOS","EXPRESION = NodoXpath('//..',LISTA_PREDICADOS);");
                                                                $$ = new AnyParent($3,@1.first_line,@1.first_column); }
          | any_expresion times LISTA_PREDICATES {  ReporteGramatical.agregarProduccionXpath("EXPRESION -> //* LISTA_PREDICADOS","EXPRESION = NodoXpath('//*',LISTA_PREDICADOS);");
                                                    $$ = new AnyTimes($3,@1.first_line,@1.first_column); }
          | any_expresion node lparen rparen LISTA_PREDICATES { ReporteGramatical.agregarProduccionXpath("EXPRESION -> //node() LISTA_PREDICADOS","EXPRESION = NodoXpath('//node',LISTA_PREDICADOS);");
                                                                $$ = new AnyNode($5,@1.first_line,@1.first_column); }
          |error
          {
              ReporteGramatical.agregarProduccionXpath("EXPRESION -> error","ListaErrores.agregar(error)");
              ListaErrores.AgregarErrorXPATH(new TokenError(TipoError.Sintactico,"No se esperaba: "+yytext+".",@1.first_line,@1.first_column));
              $$ = new NodoError(@1.first_line,@1.first_column);
          }
          ;

LISTA_PREDICATES: lcorchetes PREDICATE rcorchetes LISTA_PREDICATES_P { ReporteGramatical.agregarProduccionXpath("LISTA_PREDICADOS -> [ PREDICADO ] LISTA_PREDICADOS_P","LISTA_PREDICADOS.LISTA = LISTA_PREDICADOS_P.LISTA; </br>LISTA_PREDICADOS.LISTA.ADD_FIRST(PREDICADO);");
                                                                        $$ = $4; $$.unshift($2);
                                                                      }
                ;

LISTA_PREDICATES_P :  lcorchetes PREDICATE rcorchetes LISTA_PREDICATES_P { ReporteGramatical.agregarProduccionXpath("PREDICADOS_P-> [ PREDICADO ] PREDICADOS_P","PREDICADOS_P.LISTA = PREDICADOS_P1.LISTA ;</br>PREDICADOS_P.LISTA.ADD_FIRST( PREDICADO );");
                                                                           $$ = $4; $$.unshift($2); }
                   | {  ReporteGramatical.agregarProduccionXpath("PREDICADOS_P -> epsilon","PREDICADOS_P.LISTA = [];");
                        $$ = []; }
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
                                                $$ = new Relational($1,$3,RelationalOperators.greaterOrLessThan,@2.first_line,@2.first_column); }
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
              | text lparen rparen { ReporteGramatical.agregarProduccionXpath("FUNCION_NATIVA -> text()","FUNCION_NATIVA = new FuncionNativa('text');");
                                     $$ = new NativeFunctionExpresion(NativeFunction.text, @1.first_line, @1.first_column); }
              ;

PRIMITIVA: LISTA-XPATH { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> LISTA-XPATH","PRIMITIVA = new ListaXpath( LISTA-XPATH );");
                         $$ = new ListaXpathExpresion($1, @1.first_line,@1.first_column); }
         | AXES_NAME axe_connector XPATH-EXPRESION { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> AXES_NAME :: XPATH-EXPRESION","PRIMITIVA = new AxeExpresion('"+AxeType[$1]+"', XPATH-EXPRESION );");
                                                     $$ = AxeFabric.createAxeExpresion($1, new XpathExpresion($3, @3.first_line,@3.first_column) ,
                                                                                       @2.first_line, @2.first_column);
                                                    }
         | FUNCION_NATIVA { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> FUNCION_NATIVA-XPATH","PRIMITIVA = FUNCION_NATIVA;");
                            $$ = $1; }
         | DoubleLiteral {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> decimal","PRIMITIVA = new PRIMITIVA(Tipo.Decimal,decimal);");
                            $$ = new Primitive(Number($1), new Tipo(TipoDato.numero),@1.first_line, @1.first_column ); }
         | IntegerLiteral { ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> entero","PRIMITIVA = new PRIMITIVA(Tipo.entero,entero);");
                            $$ = new Primitive(Number($1), new Tipo(TipoDato.numero),@1.first_line, @1.first_column ); }
         | StringLiteral {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> cadena","PRIMITIVA = new PRIMITIVA(Tipo.cadena,cadena);");
                            $$ = new Primitive($1, new Tipo(TipoDato.cadena),@1.first_line, @1.first_column ); }
         | atribute_expresion identifier {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> @ id","PRIMITIVA = new Atributo(id);");
                                            $$ = new AtributeIdentifier($1,@1.first_line, @1.first_column ); }
         | atribute_expresion times {   ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> @ *","PRIMITIVA = new Atributo(times);");
                                        $$ = new AtributeTimes(@1.first_line, @1.first_column ); }
         | atribute_expresion node lparen rparen {  ReporteGramatical.agregarProduccionXpath("PRIMITIVA -> @node()","PRIMITIVA = new Atributo(nodo);");
                                                    $$ = new AtributeNode(@1.first_line, @1.first_column ); }
         ;

