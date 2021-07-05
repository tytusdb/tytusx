/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".
%s                          comment
%%


"(:"                      this.begin('comment');
<comment>":)"              this.popState();
<comment>.                  /* skip commentario content*/
("$")([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_idflower'; %}
"data"                          %{ return 'tk_data';  %}
"if"                          %{ return 'tk_if';  %}
"then"                        %{ return 'tk_then';  %}
"else"                        %{ return 'tk_else';  %}
"eq"                          %{ return 'tk_eq';  %}
"ne"                          %{ return 'tk_ne';  %}
"lt"                          %{ return 'tk_lt';  %}
"le"                          %{ return 'tk_le';  %}
"gt"                          %{ return 'tk_gt';  %}
"ge"                          %{ return 'tk_ge';  %}
"declare"                     %{ return 'tk_declare';  %}
"function"                    %{ return 'tk_function';  %}
"local:"                      %{ return 'tk_local';  %}
"number"                      %{ return 'tk_number';  %}
"as"                          %{ return 'tk_as';  %}
"xs:"                         %{ return 'tk_xs';  %}
"boolean"                     %{ return 'tk_boolean';  %}
"integer"                     %{ return 'tk_integer';  %}
"double"                      %{ return 'tk_double';  %}
"float"                       %{ return 'tk_float';  %} 
"decimal"                       %{ return 'tk_decimal';  %} 
"number"                      %{ return 'tk_number';  %}
"substring"                   %{ return 'tk_substring';  %}
"upper-case"                  %{ return 'tk_uppercase';  %}
"lower-case"                  %{ return 'tk_lowercase';  %}
"string"                      %{ return 'tk_string';  %}
"node()"                      %{ return 'tk_node';  %}
"last()"                      %{ return 'tk_last';  %}
"position()"                  %{ return 'tk_position';  %}
"ancestor-or-self::"          %{ return 'tk_ancestorself';  %}
"ancestor::"                  %{ return 'tk_ancestor';  %}
"attribute::"                 %{ return 'tk_attribute';  %}
"child::"                     %{ return 'tk_child';  %}
"descendant-or-self::"        %{ return 'tk_descendantself';  %}
"descendant::"                %{ return 'tk_descendant';  %}
"following-sibling::"         %{ return 'tk_followingsibling';  %}
"following::"                  %{ return 'tk_following';  %}
"parent::"                    %{ return 'tk_parent';  %}
"preceding-sibling::"         %{ return 'tk_precedingsibling';  %}
"preceding::"                 %{ return 'tk_preceding';  %}
"self::"                      %{ return 'tk_self';  %}
"div"                       %{ return 'tk_division';  %}
"or"                        %{ return 'tk_or';  %}
"and"                       %{ return 'tk_and';  %}
"mod"                       %{ return 'tk_mod';  %}
"for"                       %{ return 'tk_for';  %}
"in"                       %{ return 'tk_in';  %}
"to"                       %{ return 'tk_to';  %}
"let"                       %{ return 'tk_let';  %}
"where"                       %{ return 'tk_where';  %}
"return"                       %{ return 'tk_return';  %}
"order"                       %{ return 'tk_order';  %}
"by"                       %{ return 'tk_by';  %}
"@*"                         %{ return 'tk_arrobaasterisco';  %}
"@"                         %{ return 'tk_arroba';  %}
"|"                         %{ return 'tk_barra';  %}
"+"                         %{ return 'tk_mas';  %}
"-"                         %{ return 'tk_menos';  %}
"*"                         %{ return 'tk_asterisco';  %}
"!="                        %{ return 'tk_noigual'; %}
":="                         %{ return 'tk_dospuntosigual'; %}
"<="                        %{ return 'tk_menorigual'; %}
">="                        %{ return 'tk_mayorigual'; %}
"="                         %{ return 'tk_igual'; %}
">"                         %{ return 'tk_mayor'; %}
"<"                         %{ return 'tk_menor'; %}
","                         %{ return 'tk_coma'; %}
";"                         %{ return 'tk_puntoycoma'; %}
"?"                         %{ return 'tk_interrogacion'; %}
"..//"                        %{ return 'tk_dpds'; %}
".//"                        %{ return 'tk_pds'; %}
"../"                        %{ return 'tk_dps'; %}
"./"                        %{ return 'tk_ps'; %}
"/."                        %{ return 'tk_slashpunto'; %}
"/.."                        %{ return 'tk_slashdoblepunto'; %}
"//"                        %{ return 'tk_dobleslash'; %}
"/"                        %{ return 'tk_slash'; %}
".."                        %{ return 'tk_doblepunto'; %}
"."                         %{ return 'tk_punto'; %}
([0-9]+["."][0-9]+)\b        %{ return 'tk_decimal';  %}
[0-9]+\b                    %{ return 'tk_entero';  %}
\"[^\"]*\"                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
"["                         %{ return 'tk_corchetea'; %}
"]"                         %{ return 'tk_corchetec'; %}
"("                         %{ return 'tk_parentesisa'; %}
")"                         %{ return 'tk_parentesisc'; %}
"{"                         %{ return 'tk_llavea'; %}
"}"                         %{ return 'tk_llavec'; %}

\s+                         /* skip whitespace */
[ \t\r\n\f]                 %{ /*Los Ignoramos*/   %}
<<EOF>>                     %{ return 'EOF';       %}
.                           {  
        ListaErr.agregarError(new Error(NumeroE, yylloc.first_line, yylloc.first_column + 1, "Lexico", "El caracter " + yytext + " no pertenece al lenguaje.","XQuery")); NumeroE++;
 }

/lex

//SECCION DE IMPORTS
%{

%}


/* Asociación de operadores y precedencia */
%nonassoc CALL 
%left tk_or
%left tk_and
%left tk_menor tk_menorigual tk_mayor tk_mayorigual tk_igual tk_noigual PMENOR
%left tk_eq tk_ne tk_gt tk_lt tk_ge tk_le
%left tk_mas tk_menos
%left tk_asterisco tk_division tk_mod
%left tk_identificador tk_slash tk_dobleslash tk_punto tk_doblepunto
%left tk_dobleslash tk_slash tk_dpds tk_pds tk_dps tk_ps
%left UMENOS EXPMENOS
%left tk_parentesisa tk_parentesisc


// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : INSTRUCCIONES EOF     {  console.log("TODO CORRECTO :D XQUERY ASC VERSION");
                                instrucciones = $1[0];
                                nodo = $1[1];
                                $$ =[instrucciones,nodo];
                                return $$; } ;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION { $1[0].push($2[0]);
                                           $1[1].agregarHijo($2[1]);
                                           $$ = [$1[0],$1[1]]; }
        | INSTRUCCION { $$ = [[$1[0]],$1[1]]; };

INSTRUCCION: FLOWER  { $$ = $1; }
        | FUNCION { $$ = $1; }
        | XFOR { $$ = $1; };

XFOR : tk_for tk_idflower tk_in tk_parentesisa tk_entero tk_to tk_entero tk_parentesisc tk_return tk_menor tk_identificador tk_mayor tk_llavea tk_idflower tk_llavec tk_menor tk_slash tk_identificador tk_mayor
        { xForAux = new XFor(@1.first_line, @1.first_column, Number($5), Number($7), $11, $18, $2, $14);
          nodoaux = new NodoArbol("for","");   
          nodoaux.agregarHijo(new NodoArbol($5 + " to " + $7,""));
          $$ = [xForAux,nodoaux]; 
        }
        |tk_for tk_idflower tk_in tk_parentesisa tk_entero tk_to tk_entero tk_parentesisc tk_return tk_idflower
        { xForAux = new XForSimple(@1.first_line, @1.first_column, Number($5), Number($7), $2, $10);
          nodoaux = new NodoArbol("for","");   
          nodoaux.agregarHijo(new NodoArbol($5 + " to " + $7,""));
          $$ = [xForAux,nodoaux]; 
        }; 


FUNCION : tk_number tk_parentesisa EXPRESION_CADENA tk_parentesisc {
                xNumberAux = new XNumber(@1.first_line, @1.first_column, $3[0]);
                nodoaux = new NodoArbol("number()","");
                nodoaux.agregarHijo($3[1]);
                $$ = [xNumberAux,nodoaux]; }
        | tk_substring tk_parentesisa CADENA tk_coma tk_entero tk_parentesisc  { 
                xSubAux = new XSubstring(@1.first_line, @1.first_column, $3[0], Number($5), 0, 0);
                nodoaux = new NodoArbol("substring()","");
                nodoaux.agregarHijo($3[1]);
                nodoaux.agregarHijo(new NodoArbol($5,""));
                $$ = [xSubAux,nodoaux]; }            
        | tk_substring tk_parentesisa CADENA tk_coma tk_entero tk_coma tk_entero tk_parentesisc { 
                xSubAux = new XSubstring(@1.first_line, @1.first_column, $3[0], Number($5), Number($7), 1);
                nodoaux = new NodoArbol("substring()","");
                nodoaux.agregarHijo($3[1]);
                nodoaux.agregarHijo(new NodoArbol($5,""));
                nodoaux.agregarHijo(new NodoArbol($7,""));
                $$ = [xSubAux,nodoaux]; } 
        | tk_uppercase tk_parentesisa CADENA tk_parentesisc {
                xUpperAux = new XUpperCase(@1.first_line, @1.first_column, $3[0]);
                nodoaux = new NodoArbol("upper-case()","");
                nodoaux.agregarHijo($3[1]);
                $$ = [xUpperAux,nodoaux]; }
        | tk_lowercase tk_parentesisa CADENA tk_parentesisc {
                xUpperAux = new XLowerCase(@1.first_line, @1.first_column, $3[0]);
                nodoaux = new NodoArbol("lower-case()","");
                nodoaux.agregarHijo($3[1]);
                $$ = [xUpperAux,nodoaux]; }
        | tk_string tk_parentesisa EXPRESION_CADENA tk_parentesisc {
                xStringAux = new XString(@1.first_line, @1.first_column, $3[0]);
                nodoaux = new NodoArbol("string()","");
                nodoaux.agregarHijo($3[1]);
                $$ = [xStringAux,nodoaux]; }
        | tk_declare tk_function tk_local tk_identificador tk_parentesisa PARAMETROS tk_parentesisc RETORNO tk_llavea SENTENCIAS_FUNCION tk_llavec tk_puntoycoma {
                               
                xFuncionAux = new XFuncion(@1.first_line, @1.first_column, $4, $6[0], $10[0], $8[0]);
                xDeclararFuncionAux = new  XDeclararFuncion(@1.first_line, @1.first_column, xFuncionAux);
                nodoaux = new NodoArbol($4+"()","");
                nodoaux.agregarHijo(new NodoArbol("as xs:"+$8[1],""));
                nodoaux.agregarHijo($6[1]);
                nodoaux.agregarHijo($10[1]);
                $$ = [xDeclararFuncionAux,nodoaux]; } 
        | tk_menor tk_identificador tk_mayor tk_llavea tk_local tk_identificador tk_parentesisa VALORESXPATH tk_parentesisc tk_llavec tk_menor tk_slash tk_identificador tk_mayor {
                xLlamadaAux = new XLlamada($6, @1.first_line, @1.first_column, $8[0], "");
                XLlamadaFuncionAux = new XLlamadaFuncion(@1.first_line, @1.first_column, xLlamadaAux, $2, $13);
                nodoaux = new NodoArbol($1+""+$2+""+$3+""+$4+""+$10+""+$11+""+$12+""+$13+""+$14,"");
                nodoLlamadaAux = new NodoArbol($6+"()","");
                nodoLlamadaAux.agregarHijo($8[1]);  
                nodoaux.agregarHijo(nodoLlamadaAux);    
                $$ = [XLlamadaFuncionAux,nodoaux];

        }
        |  tk_local tk_identificador tk_parentesisa VALORESXPATH tk_parentesisc {
                xLlamadaAux = new XLlamada($2, @1.first_line, @1.first_column, $4[0], "");
                XLlamadaFuncionSimpleAux = new XLlamadaFuncionSimple(@1.first_line, @1.first_column, xLlamadaAux);
                nodoaux = new NodoArbol($2+"()","");
                nodoaux.agregarHijo($4[1]);    
                $$ = [XLlamadaFuncionSimpleAux,nodoaux];

        };

PARAMETROS : PARAMETROS tk_coma PARAMETRO {     $1[1].agregarHijo($3[1]);
                                                $1[0].push($3[0]); 
                                                $$ = [$1[0],$1[1]];}
        | PARAMETRO { $$ = [[$1[0]],$1[1]]; };

PARAMETRO: tk_idflower tk_as tk_xs DATA_TYPE tk_interrogacion  { 
                xParametroAux = new XParametro($1, @1.first_line, @1.first_column, $4[0]);
                nodoaux = new NodoArbol($1+" as xs:"+$4[1],"");
                $$ = [xParametroAux, nodoaux];

};

DATA_TYPE: tk_integer   { $$ = [TipoXDataType.INTEGER, $1];  }
        |  tk_double    { $$ = [TipoXDataType.INTEGER,  $1];  }
        |  tk_float     { $$ = [TipoXDataType.INTEGER,   $1];  }
        |  tk_decimal   { $$ = [TipoXDataType.INTEGER, $1];  }
        |  tk_boolean   { $$ = [TipoXDataType.BOOLEAN, $1];  }
        |  tk_string    { $$ = [TipoXDataType.STRING,  $1];  };

RETORNO: tk_as tk_xs DATA_TYPE  tk_interrogacion {  $$ = $3; };


SENTENCIAS_FUNCION : SENTENCIAS_FUNCION SENFUNCION { 
                        $1[1].agregarHijo($2[1]);
                        $1[0].push($2[0]); 
                        $$ = [$1[0],$1[1]]; }

                | SENFUNCION { $$ = [[$1[0]],$1[1]]; };

SENFUNCION: tk_if tk_parentesisa EXP_NUMERICA tk_parentesisc tk_then RETURN_IF tk_else RETURN_IF {
                XIFAux = new XIF(@1.first_line, @1.first_column, $3[0], null, $6[0], null, $8[0], TipoXIF.IF);
                nodoaux = new NodoArbol("If","");
                nodoaux.agregarHijo($3[1]);
                thenaux = new NodoArbol("Then","");
                thenaux.agregarHijo($6[1]);
                elseaux = new NodoArbol("Else","");
                elseaux.agregarHijo($8[1]);
                nodoaux.agregarHijo(thenaux);
                nodoaux.agregarHijo(elseaux);
                $$ = [XIFAux,nodoaux];
 }
|  tk_if tk_parentesisa EXP_NUMERICA tk_parentesisc tk_then RETURN_IF tk_else tk_if tk_parentesisa EXP_NUMERICA tk_parentesisc tk_then RETURN_IF tk_else RETURN_IF {
                XIFAux = new XIF(@1.first_line, @1.first_column, $3[0], $10[0], $6[0], $13[0], $15[0], TipoXIF.IFELSE);
                nodoaux = new NodoArbol("If","");
                nodoaux.agregarHijo($3[1]);
                thenaux = new NodoArbol("Then","");
                thenaux.agregarHijo($6[1]);
                elseifaux = new NodoArbol("Else If","");
                nodoaux.agregarHijo($10[1]);
                elseifthenaux = new NodoArbol("Then","");
                elseifthenaux.agregarHijo($13[1]);
                elseifaux.agregarHijo(elseifthenaux);
                elseaux = new NodoArbol("Else","");
                elseaux.agregarHijo($15[1]);
                nodoaux.agregarHijo(thenaux);
                nodoaux.agregarHijo(elseifaux);
                elseifaux.agregarHijo(elseaux);
                $$ = [XIFAux,nodoaux];  }
| tk_let tk_idflower tk_dospuntosigual EXP_CADENA {
                XLetAux = new XLet(@1.first_line, @1.first_column, $2, $4[0], TipoXSENFUNCION.XLET);
                nodoaux = new NodoArbol($2,"");
                nodoaux.agregarHijo($4[1]);
                $$ = [XLetAux,nodoaux];}                
| tk_idflower tk_dospuntosigual EXP_CADENA {
                XAsignacionAux = new XAsignacion(@1.first_line, @1.first_column, $1, $3[0], TipoXSENFUNCION.XASIGNACION);
                nodoaux = new NodoArbol($1,"");
                nodoaux.agregarHijo($3[1]);
                $$ = [XAsignacionAux,nodoaux];}
| tk_return RETURN_IF {
                XReturnAux = new XReturn(@1.first_line, @1.first_column, $2[0], TipoXSENFUNCION.XRETURN);
                nodoaux = new NodoArbol($1,"");
                nodoaux.agregarHijo($2[1]);
                $$ = [XReturnAux,nodoaux];};

RETURN_IF:  EXP_CADENA { $$ = $1; };



EXP_CADENA:    XCADENA { $$ = $1; }
        |     tk_parentesisa XCADENA tk_parentesisc { $$ = $2; }
        |      EXP_NUMERICA { $$ = $1; };

XCADENA :         tk_cadena1 {  primitivoAux = new XPrimitivo($1, @1.first_line, @1.first_column,TipoXPrimitivo.CADENA);
                                primitivoAux.setCadena(true);
                                nodoaux = new NodoArbol($1,"");
                                $$ = [primitivoAux,nodoaux]; }

        |        tk_cadena2 {  primitivoAux = new XPrimitivo($1, @1.first_line, @1.first_column,TipoXPrimitivo.CADENA);
                                primitivoAux.setCadena(true);
                                nodoaux = new NodoArbol($1,"");
                                $$ = [primitivoAux,nodoaux]; };

EXP_NUMERICA :  tk_menos EXP_NUMERICA %prec EXPMENOS { 
                                negativo = new XPrimitivo(-1, @1.first_line, @1.first_column,"");
                                operacionAux = new XOperacion($2[0], negativo, Operador.MULTIPLICACION, @1.first_line, @1.first_column, "");
                                nodoaux = new NodoArbol("*","");
                                nodoaux.agregarHijo(new NodoArbol("-1",""));
                                nodoaux.agregarHijo($2[1]);
                                $$ = [operacionAux,nodoaux]; }
        | EXP_NUMERICA tk_and EXP_NUMERICA {  
                                operacionAux = new XOperacion($1[0], $3[0], Operador.AND, @1.first_line, @1.first_column, "");
                                nodoaux = new NodoArbol("and","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux]; } 
        |  EXP_NUMERICA tk_or EXP_NUMERICA {  
                                operacionAux = new XOperacion($1[0], $3[0], Operador.OR, @1.first_line, @1.first_column, "");
                                nodoaux = new NodoArbol("or","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux]; }

        | EXP_NUMERICA tk_gt EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MAYOR_QUE, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol(">","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_lt EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MENOR_QUE, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("<","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_ge EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MAYOR_IGUAL_QUE, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol(">=","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_le EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MENOR_IGUAL_QUE, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("<=","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_eq EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.IGUAL, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("==","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_ne EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.DIFERENTE_QUE, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("!=","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}

        |       EXP_NUMERICA tk_mas EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.SUMA, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("+","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_menos EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.RESTA, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("-","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_asterisco EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MULTIPLICACION, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("*","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_mod EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.MODULO, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("%","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       EXP_NUMERICA tk_division EXP_NUMERICA { 
                                operacionAux = new XOperacion($1[0], $3[0], Operador.DIVISION, @1.first_line, @1.first_column,"");
                                nodoaux = new NodoArbol("÷","");
                                nodoaux.agregarHijo($1[1]);
                                nodoaux.agregarHijo($3[1]);
                                $$ = [operacionAux,nodoaux];}
        |       tk_parentesisa EXP_NUMERICA tk_parentesisc { $$ = $2; }
        |       tk_entero {     primitivoAux = new XPrimitivo(Number($1), @1.first_line, @1.first_column,TipoXPrimitivo.NUMERO);
                                nodoaux = new NodoArbol($1,"");
                                $$ = [primitivoAux,nodoaux]; }
        |       tk_decimal {    primitivoAux = new XPrimitivo(Number($1), @1.first_line, @1.first_column,TipoXPrimitivo.NUMERO);
                                nodoaux = new NodoArbol($1,"");
                                $$ = [primitivoAux,nodoaux];}
        |       tk_identificador { primitivoAux = new XPrimitivo($1, @1.first_line, @1.first_column,TipoXPrimitivo.IDENTIFICADOR);
                                   nodoaux = new NodoArbol($1,"");
                                   $$ = [primitivoAux,nodoaux]; }
        |       tk_idflower {      primitivoAux = new XPrimitivo($1, @1.first_line, @1.first_column,TipoXPrimitivo.IDFLOWER);
                                   nodoaux = new NodoArbol($1,"");
                                   $$ = [primitivoAux,nodoaux]; }                           
       
        |       tk_local tk_identificador tk_parentesisa VALORES tk_parentesisc { 
                                xLlamadaAux = new XLlamada($2, @1.first_line, @1.first_column, $4[0], "");
                                nodoaux = new NodoArbol($2+"()","");
                                nodoaux.agregarHijo($4[1]);    
                                $$ = [xLlamadaAux,nodoaux];};

VALORES : VALORES tk_coma VALOR {       $1[1].agregarHijo($3[1]);
                                        $1[0].push($3[0]); 
                                        $$ = [$1[0],$1[1]]; }
        |       VALOR  { $$ = [[$1[0]],$1[1]]; };

VALOR: EXP_CADENA {     xValorAux = new XValor($1[0], @1.first_line, @1.first_column, TipoXValor.PRIMITIVO);
                        $$ = [xValorAux, $1[1]]; };



VALORESXPATH: VALORESXPATH tk_coma VALORXPATH {  $1[1].agregarHijo($3[1]);
                                                 $1[0].push($3[0]); 
                                                 $$ = [$1[0],$1[1]]; }
        |  VALORXPATH { $$ = [[$1[0]],$1[1]]; };

VALORXPATH: SETS {      instruccionAux = new XPath(@1.first_line, @1.first_column, $1[0]);
                        xValorAux = new XValor(instruccionAux, @1.first_line, @1.first_column, TipoXValor.XPATH);
                        $$ = [xValorAux, $1[1]]; }
        |  tk_entero {  
                        primitivoAux = new XPrimitivo(Number($1), @1.first_line, @1.first_column,TipoXPrimitivo.NUMERO);
                        nodoaux = new NodoArbol($1,"");
                        xValorAux = new XValor(primitivoAux, @1.first_line, @1.first_column, TipoXValor.PRIMITIVO);
                        $$ = [xValorAux, nodoaux];
        }
        |  tk_decimal{  
                        primitivoAux = new XPrimitivo(Number($1), @1.first_line, @1.first_column,TipoXPrimitivo.NUMERO);
                        nodoaux = new NodoArbol($1,"");
                        xValorAux = new XValor(primitivoAux, @1.first_line, @1.first_column, TipoXValor.PRIMITIVO);
                        $$ = [xValorAux, nodoaux];
        }
        |  XCADENA {     xValorAux = new XValor($1[0], @1.first_line, @1.first_column, TipoXValor.PRIMITIVO);
                        $$ = [xValorAux, $1[1]];
        };


SETS: SETS SET { $1[1].agregarHijo($2[1]);
                 $1[0].push($2[0]); 
                 $$ = [$1[0],$1[1]]; }

    | SET { $$ = [[$1[0]],$1[1]]; } ;

SET:    SELECTORES EXPRESION { nodoXPath = new NodoXpath("", TipoNodo.SELECTOR_EXPRESION, null, $1[0], $2[0], @1.first_line, @1.first_column); 
                               nodoaux= new NodoArbol($1[1],"");
                               nodoaux.agregarHijo($2[1]);
                               $$ = [nodoXPath,nodoaux]; }

        |    EXPRESION {nodoXPath = new NodoXpath("", TipoNodo.EXPRESION, null, [], $1[0], @1.first_line, @1.first_column);  
                        $$ = [nodoXPath,$1[1]] }

        |    AXES {     nodoXPath = new NodoXpath("", TipoNodo.AXES, $1[0], [], null, @1.first_line, @1.first_column); 
                        $$ = [nodoXPath,$1[1]]; }

        |    SELECTORES AXES {  nodoXPath = new NodoXpath("", TipoNodo.SELECTOR_AXES, $2[0], $1[0], null, @1.first_line, @1.first_column);    
                                nodoaux= new NodoArbol($1[1],"");
                                nodoaux.agregarHijo($2[1]);
                                $$ = [nodoXPath,nodoaux]; };



SELECTORES: tk_dobleslash OTRO_SELECTOR { arr = [TipoSelector.DOBLE_SLASH]; 
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1] ;
                                          $$ = [arr,$1]; }

         |  tk_dobleslash { $$ = [[TipoSelector.DOBLE_SLASH],$1]; }

         |  tk_slash { $$ = [[TipoSelector.SLASH],$1]; }
         
         |  tk_slash OTRO_SELECTOR {    arr = [TipoSelector.SLASH] 
                                        arr = arr.concat($2[0]);
                                        $1 = $1+""+$2[1];
                                        $$ = [arr,$1];}

         |  OTRO_SELECTOR { $$ = [$1[0],$1[1]];  } ;

OTRO_SELECTOR: tk_dpds AGREGAR_SELECTOR { arr = [TipoSelector.DOSPUNTOS_DOSSLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_pds  AGREGAR_SELECTOR { arr = [TipoSelector.PUNTO_DOSSLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_dps  AGREGAR_SELECTOR { arr = [TipoSelector.DOSPUNTOS_SLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_ps   AGREGAR_SELECTOR { arr = [TipoSelector.PUNTO_SLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];};

AGREGAR_SELECTOR:  OTRO_SELECTOR { $$ = [$1[0],$1[1]];  }

                | { $$ = [[TipoSelector.FIN],""];  };

EXPRESION : tk_identificador PREDICADO { expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.IDENTIFICADOR, $2[0]);
                                         nodoaux = new NodoArbol($1,"");
                                         nodoaux.agregarHijo($2[1]);
                                         $$ = [expresionAux,nodoaux];}

        |  tk_asterisco PREDICADO {     expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.ASTERISCO, $2[0]);
                                        nodoaux = new NodoArbol($1,"");
                                        nodoaux.agregarHijo($2[1]);
                                        $$ = [expresionAux,nodoaux];}

        |  tk_punto PREDICADO { expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.PUNTO, null);
                                nodoaux = new NodoArbol($1,"");
                                $$ = [expresionAux,nodoaux]; }

        |  tk_arrobaasterisco PREDICADO { expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.ARROBA, null);
                                          nodoaux = new NodoArbol($1,"");
                                          $$ = [expresionAux,nodoaux];}

        |  tk_arroba tk_identificador PREDICADO { expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $2, TipoExpresionXPath.ARROBA_ID, null);
                                                  nodoaux = new NodoArbol($1+""+$2,"");
                                                  $$ = [expresionAux,nodoaux]; }

        |  tk_texto PREDICADO { expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.TEXT, $2[0]);
                                nodoaux = new NodoArbol($1,"");
                                nodoaux.agregarHijo($2[1]);
                                $$ = [expresionAux,nodoaux]; }

        |  tk_doblepunto PREDICADO {    expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.DOBLEPUNTO, null);
                                        nodoaux = new NodoArbol($1,"");
                                        $$ = [expresionAux,nodoaux];}

        |  tk_node PREDICADO {  expresionAux = new ExpresionXPath(@1.first_line, @1.first_column, $1, TipoExpresionXPath.NODE, $2[0]);
                                nodoaux = new NodoArbol($1,"");
                                nodoaux.agregarHijo($2[1]);
                                $$ = [expresionAux,nodoaux]; };

PREDICADO : tk_corchetea EXPRESION_FILTRO tk_corchetec { nodoaux = new NodoArbol("Predicado","");
                                                         nodoaux.agregarHijo(new NodoArbol("[",""));
                                                         nodoaux.agregarHijo($2[1]);
                                                         nodoaux.agregarHijo(new NodoArbol("]",""));
                                                         $$ = [$2[0],nodoaux]; } 
        |  {    nodoaux = new NodoArbol("Predicado","");
                nodoaux.agregarHijo(new NodoArbol("[",""));
                nodoaux.agregarHijo(new NodoArbol("]",""));
                $$ = [null,nodoaux];} ;


EXPRESION_FILTRO : EXPRESION_LOGICA { $$ = $1; };

AXES :          tk_ancestorself   EXPRESION      { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.ANCESTOR_OR_SELF, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_ancestor   EXPRESION          { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.ANCESTOR, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_child      EXPRESION          { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.CHILD, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_descendantself EXPRESION      { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.DESCENDANT_OR_SELF, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_descendant  EXPRESION         { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.DESCENDANT, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_followingsibling EXPRESION    { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.FOLLOWING_SIBLING, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux]; }

        |       tk_following  EXPRESION          { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.FOLLOWING, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_self  EXPRESION               { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.SELF, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_parent  EXPRESION             { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.PARENT, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_precedingsibling EXPRESION    { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.PRECEDING_SIBLING, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux];}

        |       tk_preceding  EXPRESION          { axesAux = new Axes(@1.first_line, @1.first_column, TipoAxes.PRECEDING, $2[0]);
                                                   nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [axesAux,nodoaux]; };

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA {    idAux = new Primitivo($2, @1.first_line, @1.first_column);
                                                           operacionAux = new Operacion(TipoOperadores.ATRIBUTOS, idAux, $4[0], Operador.IGUAL, @1.first_line, @1.first_column);
                                                           nodoaux = new NodoArbol("=","");
                                                           nodoaux.agregarHijo(new NodoArbol("@"+$2,""));
                                                           nodoaux.agregarHijo($4[1]);
                                                           $$ = [operacionAux,nodoaux]; }

        |  tk_attribute tk_identificador tk_igual CADENA { idAux = new Primitivo($2, @1.first_line, @1.first_column);
                                                           operacionAux = new Operacion(TipoOperadores.ATRIBUTOS, idAux, $4[0], Operador.IGUAL, @1.first_line, @1.first_column);
                                                           nodoaux = new NodoArbol("=","");
                                                           nodoaux.agregarHijo(new NodoArbol("attribute::"+$2,""));
                                                           nodoaux.agregarHijo($4[1]);
                                                           $$ = [operacionAux,nodoaux]; } ;


EXPRESION_LOGICA : EXPRESION_LOGICA tk_and EXPRESION_RELACIONAL { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.AND, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("and","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

                |  EXPRESION_LOGICA tk_or EXPRESION_RELACIONAL {  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.OR, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("or","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }     
                |  EXPRESION_RELACIONAL { $$ = $1;  };


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MAYOR_QUE, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol(">","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MENOR_QUE, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol("<","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA { 
                                                                         operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MAYOR_IGUAL_QUE, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol(">=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux];}

                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA { 
                                                                         operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MENOR_IGUAL_QUE, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol("<=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA {   operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.IGUAL, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol("=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; } 

                |       EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.DIFERENTE_QUE, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol("!=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; }  
                |       EXPRESION_NUMERICA { $$ = $1; }   

                |       ATRIBUTO { $$ = $1; }

                |       tk_asterisco {  expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.ASTERISCO);
                                        nodoaux = new NodoArbol("*","");
                                        $$ = [expresionAux,nodoaux]; }

                |       tk_texto {      expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.TEXT);
                                        nodoaux = new NodoArbol($1,"");
                                        $$ = [expresionAux,nodoaux]; }  

                |       tk_arrobaasterisco { expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.ARROBA);
                                             nodoaux = new NodoArbol("@*","");
                                             $$ = [expresionAux,nodoaux];}

                |       tk_node { expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.NODE);
                                  nodoaux = new NodoArbol($1,"");
                                  $$ = [expresionAux,nodoaux]; }  ;


EXPRESION_CADENA :      CADENA { $$ = $1; }
                |      EXPRESION_NUMERICA { $$ = $1; };

EXPRESION_NUMERICA : tk_menos EXPRESION_NUMERICA %prec UMENOS	{ negativo = new Primitivo(-1, @1.first_line, @1.first_column);
                                                                  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $2[0], negativo, Operador.MULTIPLICACION, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo(new NodoArbol("-1",""));
                                                                  nodoaux.agregarHijo($2[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

	| EXPRESION_NUMERICA tk_mas EXPRESION_NUMERICA		{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.SUMA, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("+","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux];  }

	| EXPRESION_NUMERICA tk_menos EXPRESION_NUMERICA	{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.RESTA, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("-","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux];  }

	| EXPRESION_NUMERICA tk_asterisco EXPRESION_NUMERICA	{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MULTIPLICACION, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux];  }

        | EXPRESION_NUMERICA tk_mod EXPRESION_NUMERICA	        { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MODULO, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("%","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux];   }

	| EXPRESION_NUMERICA tk_division EXPRESION_NUMERICA	{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.DIVISION, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("÷","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

	| tk_parentesisa EXPRESION_NUMERICA tk_parentesisc	{ $$ = $2; }

	| tk_entero						{ primitivoAux = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [primitivoAux,nodoaux]; }

	| tk_decimal						{ primitivoAux = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [primitivoAux,nodoaux]; }

        | tk_last                                               { expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.LAST);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [expresionAux,nodoaux]; }

        | AXES                                                  { $$ = $1; }

        | tk_position                                           {  expresionAux = new ExpresionDefinida(@1.first_line, @1.first_column, TipoExpresionDefinida.POSITION);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [expresionAux,nodoaux]; }

	| tk_identificador	                                { primitivoAux = new Primitivo($1, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [primitivoAux,nodoaux]; };


CADENA :         tk_cadena1 { primitivoAux = new Primitivo($1, @1.first_line, @1.first_column);
                              primitivoAux.setCadena(true);
                              nodoaux = new NodoArbol($1,"");
                              $$ = [primitivoAux,nodoaux]; }

        |        tk_cadena2 { primitivoAux = new Primitivo($1, @1.first_line, @1.first_column);
                              primitivoAux.setCadena(true);
                              nodoaux = new NodoArbol($1,"");
                              $$ = [primitivoAux,nodoaux]; };



FLOWER: tk_for tk_idflower tk_in SETS SENTENCIAS RETURN_FLOWER { 
                $5[0].push($6[0]);
                $5[1].agregarHijo($6[1]);
                instruccionAux = new XPath(@1.first_line, @1.first_column, $4[0]);
                flowerAux = new Flower(@1.first_line, @1.first_column, $2, instruccionAux, $5[0]);
                nodoaux = new NodoArbol("for","");
                nodoaux.agregarHijo(new NodoArbol($2,""));
                nodoaux.agregarHijo($4[1]);
                nodoaux.agregarHijo($5[1]);
                $$ = [flowerAux,nodoaux]; }
                                                
        | tk_for tk_idflower tk_in SETS IF_FLOWER {
                instruccionAux = new XPath(@1.first_line, @1.first_column, $4[0]);
                flowerIfAux = new FlowerIf(@1.first_line, @1.first_column, $2, instruccionAux, $5[0]);
                nodoaux = new NodoArbol("for","");
                nodoaux.agregarHijo(new NodoArbol($2,""));
                nodoaux.agregarHijo($4[1]);
                nodoaux.agregarHijo($5[1]);
                $$ = [flowerIfAux,nodoaux];};

IF_FLOWER: tk_return tk_if CONDICION_IFFLOWER tk_then DATA_RETURN LISTA_ELSEIF tk_else ELSE_DATA {
                XElseIfAux = new XFlowerIfThen($3[0], $5[0], @1.first_line, @1.first_column);
                nodoaux = new NodoArbol("return if","");
                nodoaux.agregarHijo($3[1]);
                nodoaux.agregarHijo($5[1]);
                listadoAux = [XElseIfAux];
                listadoXFlower = listadoAux.concat($6[0]);
                nodoaux.agregarHijo($6[1]);
                nodoelse = new NodoArbol("else","");
                nodoelse.agregarHijo($8[1]);
                nodoaux.agregarHijo(nodoelse);
                IfFlowerAux = new XFlowerIF(listadoXFlower, $8[0], @1.first_line, @1.first_column);
                $$ = [IfFlowerAux,nodoaux];}
        | tk_return tk_if CONDICION_IFFLOWER tk_then DATA_RETURN tk_else ELSE_DATA {
                XElseIfAux = new XFlowerIfThen($3[0], $5[0], @1.first_line, @1.first_column);
                nodoaux = new NodoArbol(" return if","");
                nodoaux.agregarHijo($3[1]);
                nodoaux.agregarHijo($5[1]);
                listadoXFlower = [XElseIfAux];
                nodoelse = new NodoArbol("else","");
                nodoelse.agregarHijo($7[1]);
                nodoaux.agregarHijo(nodoelse);
                IfFlowerAux = new XFlowerIF(listadoXFlower, $7[0], @1.first_line, @1.first_column);
                $$ = [IfFlowerAux,nodoaux];};

ELSE_DATA: DATA_RETURN { $$ = $1; }
        | { nodoaux = new NodoArbol("else()","");
            $$ = [null,nodoaux];};


LISTA_ELSEIF : LISTA_ELSEIF ELSEIF_FLOWER { $1[1].agregarHijo($2[1]);
                                   $1[0].push($2[0]); 
                                   $$ = [$1[0],$1[1]]; }

        |       ELSEIF_FLOWER { $$ = [[$1[0]],$1[1]]; };

ELSEIF_FLOWER: tk_else tk_if CONDICION_IFFLOWER tk_then DATA_RETURN {
                XElseIfAux = new XFlowerIfThen($3[0], $5[0], @1.first_line, @1.first_column);
                nodoaux = new NodoArbol("else if","");
                nodoaux.agregarHijo($3[1]);
                nodoaux.agregarHijo($5[1]);
                $$ = [XElseIfAux,nodoaux];
 };

CONDICION_IFFLOWER : tk_parentesisa tk_idflower tk_slash EXPRESION_LOGICA tk_parentesisc {
                condicionAux = new XFlowerCondicion($2, $4[0], @1.first_line, @1.first_column);
                nodoaux = new NodoArbol($2+"/","");
                nodoaux.agregarHijo($4[1]);
                $$ = [condicionAux,nodoaux];
 };


DATA_RETURN : tk_data tk_parentesisa tk_idflower tk_slash tk_identificador tk_parentesisc { 
                dataReturnAux = new XFlowerData($3, $5, @1.first_line, @1.first_column);
                nodoaux = new NodoArbol($3+"/"+$5,"");
                $$ = [dataReturnAux,nodoaux];
};

SENTENCIAS: SENTENCIAS SENTENCIA {                                   
                                   $1[1].agregarHijo($2[1]);
                                   $1[0].push($2[0]); 
                                   $$ = [$1[0],$1[1]];  }

        | SENTENCIA { $$ = [[$1[0]],$1[1]]; };


SENTENCIA: tk_where  tk_idflower tk_slash EXPRESION_LOGICAX  { 
                                        nodoaux = new NodoArbol("Where","");
                                        nodoaux.agregarHijo($4[1]);
                                        sentenciaAux = new Sentencia(TipoSentencia.WHERE, $4[0], @1.first_line, @1.first_column);
                                        $$ = [sentenciaAux,nodoaux]; }

        | tk_order tk_by tk_idflower tk_slash tk_identificador {    
                                        nodoaux = new NodoArbol("OrderBy","");
                                        nodoaux.agregarHijo(new NodoArbol($5,""));
                                        sentenciaAux = new Sentencia(TipoSentencia.ORDERBY_ELEMENTO, $5, @1.first_line, @1.first_column);
                                        $$ = [sentenciaAux,nodoaux]; }

        | tk_order tk_by tk_idflower tk_slash tk_arroba tk_identificador {  
                                        nodoaux = new NodoArbol("OrderBy","");
                                        nodoaux.agregarHijo(new NodoArbol("@"+$6,""));  
                                        sentenciaAux = new Sentencia(TipoSentencia.ORDERBY_ATRIBUTO, $6, @1.first_line, @1.first_column);
                                        $$ = [sentenciaAux,nodoaux]; }

        | tk_order tk_by tk_idflower  {  
                                        nodoaux = new NodoArbol("OrderBy","");
                                        nodoaux.agregarHijo(new NodoArbol($3,""));  
                                        sentenciaAux = new Sentencia(TipoSentencia.ORDERBY, $3, @1.first_line, @1.first_column);
                                        $$ = [sentenciaAux,nodoaux]; };


RETURN_FLOWER: tk_return tk_idflower  {  
                                nodoaux = new NodoArbol("Return","");
                                nodoaux.agregarHijo(new NodoArbol($2,""));
                                sentenciaAux = new Sentencia(TipoSentencia.RETURN, null, @1.first_line, @1.first_column);
                                $$ = [sentenciaAux,nodoaux];  };

EXPRESION_XQUERY : tk_idflower SETS { expresionAux = new ExpresionXQuery(@1.first_line, @1.first_column, $1, $2[0]);
                                      nodoaux = new NodoArbol($1,"");
                                      nodoaux.agregarHijo($2[1]);
                                      $$ = [expresionAux,nodoaux]; };

EXPRESION_LOGICAX : EXPRESION_LOGICAX tk_and EXPRESION_RELACIONALX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.AND, @1.first_line, @1.first_column);
                                                                     nodoaux = new NodoArbol("and","");
                                                                     nodoaux.agregarHijo($1[1]);
                                                                     nodoaux.agregarHijo($3[1]);
                                                                     $$ = [operacionAux,nodoaux]; }

                |  EXPRESION_LOGICAX tk_or EXPRESION_RELACIONALX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.OR, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol("or","");
                                                                   nodoaux.agregarHijo($1[1]);
                                                                   nodoaux.agregarHijo($3[1]);
                                                                   $$ = [operacionAux,nodoaux]; }     
                |  EXPRESION_RELACIONALX { $$ = $1;};


EXPRESION_RELACIONALX :  EXPRESION_NUMERICAX tk_mayor EXPRESION_NUMERICAX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MAYOR_QUE, @1.first_line, @1.first_column);
                                                                            nodoaux = new NodoArbol(">","");
                                                                            nodoaux.agregarHijo($1[1]);
                                                                            nodoaux.agregarHijo($3[1]);
                                                                            $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_menor EXPRESION_NUMERICAX {  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MENOR_QUE, @1.first_line, @1.first_column);
                                                                            nodoaux = new NodoArbol("<","");
                                                                            nodoaux.agregarHijo($1[1]);
                                                                            nodoaux.agregarHijo($3[1]);
                                                                            $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_mayorigual EXPRESION_NUMERICAX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MAYOR_IGUAL_QUE, @1.first_line, @1.first_column);
                                                                                nodoaux = new NodoArbol(">=","");
                                                                                nodoaux.agregarHijo($1[1]);
                                                                                nodoaux.agregarHijo($3[1]);
                                                                                $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_menorigual EXPRESION_NUMERICAX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MENOR_IGUAL_QUE, @1.first_line, @1.first_column);
                                                                                nodoaux = new NodoArbol("<=","");
                                                                                nodoaux.agregarHijo($1[1]);
                                                                                nodoaux.agregarHijo($3[1]);
                                                                                $$ = [operacionAux,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_igual EXPRESION_CADENAX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.IGUAL, @1.first_line, @1.first_column);
                                                                         nodoaux = new NodoArbol("=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [operacionAux,nodoaux]; }    

                |       EXPRESION_NUMERICAX tk_noigual EXPRESION_CADENAX { operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.DIFERENTE_QUE, @1.first_line, @1.first_column);
                                                                           nodoaux = new NodoArbol("=","");
                                                                           nodoaux.agregarHijo($1[1]);
                                                                           nodoaux.agregarHijo($3[1]);
                                                                           $$ = [operacionAux,nodoaux]; }  

                |       EXPRESION_NUMERICAX { $$ = $1; }  ;     


EXPRESION_CADENAX :      CADENA { $$ = $1; }
                |      EXPRESION_NUMERICAX { $$ = $1; };

EXPRESION_NUMERICAX : tk_menos EXPRESION_NUMERICAX %prec UMENOS	{ negativo = new Primitivo(-1, @1.first_line, @1.first_column);
                                                                  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $2[0], negativo, Operador.MULTIPLICACION, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo(new NodoArbol("-1",""));
                                                                  nodoaux.agregarHijo($2[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

	| EXPRESION_NUMERICAX tk_mas EXPRESION_NUMERICAX	{  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.SUMA, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol("+","");
                                                                   nodoaux.agregarHijo($1[1]);
                                                                   nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

	| EXPRESION_NUMERICAX tk_menos EXPRESION_NUMERICAX	{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.RESTA, @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol("-","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

	| EXPRESION_NUMERICAX tk_asterisco EXPRESION_NUMERICAX	{ operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MULTIPLICACION, @1.first_line, @1.first_column); 
                                                                  nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [operacionAux,nodoaux]; }

        | EXPRESION_NUMERICAX tk_mod EXPRESION_NUMERICAX	{  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.MODULO, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol("%","");
                                                                   nodoaux.agregarHijo($1[1]);
                                                                   nodoaux.agregarHijo($3[1]);
                                                                   $$ = [operacionAux,nodoaux]; }

	| EXPRESION_NUMERICAX tk_division EXPRESION_NUMERICAX	{  operacionAux = new Operacion(TipoOperadores.ELEMENTOS, $1[0], $3[0], Operador.DIVISION, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol("÷","");
                                                                   nodoaux.agregarHijo($1[1]);
                                                                   nodoaux.agregarHijo($3[1]);
                                                                   $$ = [operacionAux,nodoaux]; }

	| tk_parentesisa EXPRESION_NUMERICAX tk_parentesisc	{ $$ = $2; }

	| tk_entero						{ primitivoAux = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [primitivoAux,nodoaux]; }

	| tk_decimal						{ primitivoAux = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                  nodoaux = new NodoArbol($1,"");
                                                                  $$ = [primitivoAux,nodoaux]; } 

        | tk_idflower	                                        {  primitivoAux = new Primitivo($1, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol($1,"");
                                                                   $$ = [primitivoAux, nodoaux]; }

	| tk_identificador	                                {  primitivoAux = new Primitivo($1, @1.first_line, @1.first_column);
                                                                   nodoaux = new NodoArbol($1,"");
                                                                   $$ = [primitivoAux, nodoaux]; };


                