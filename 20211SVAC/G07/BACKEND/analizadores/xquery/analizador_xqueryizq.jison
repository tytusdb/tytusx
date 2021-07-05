%{
    
    
%}

// ===================================== ANALISIS LEXICO ==============================================
%lex
%options case-sensitive
%%

// EXPRESIONES A OMITIR
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}

// COMENTARIOS <!-------Your comment----->
[(][:][^:]*[:]+[)]                        {}



//SECCION DE COMENTARIOS

// LOS COMENTARIOS PUEDEN VENIR ASI (: [AQUI PUEDE VENIR LO QUE SEA] :)

/* PALABRAS A TENER EN CUENTA
1. General comparisons: =, !=, <, <=, >, >=

2. Value comparisons: eq, ne, lt, le, gt, ge
*/

//PALABRAS RESERVADAS
"doc"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_doc';%}
"for"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_for';%}

"let"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_let';%}

"where"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_where';%}
"order by"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_order_by';%}
"return"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_return';%}
"data"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_data';%}
"if"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_if';%}
"then"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_then';%}
"else"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_else';%}
"in"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_in';%}
"to"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_to';%}
"at"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_at';%}

"eq"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_eq';%}
"ne"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ne';%}
"lt"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_lt';%}
"le"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_le';%}
"gt"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_gt';%}
"ge"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ge';%}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//palabras reservadas para las funciones en XQUERY 
"declare"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_declare';%}
"function"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_function';%}
"local:"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_local';%}
"as"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_as';%}
"xs:"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_xs';%}
";"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_punto_coma';%}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
"<html>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_abre';%}
"</html>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_cierra';%}
"<body>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_abre';%}
"</body>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_cierra';%}

"<h1>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_abre';%}
"</h1>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_cierra';%}
"<ul>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_abre';%}
"</ul>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_cierra';%}
"<li>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_abre';%}
"</li>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_cierra';%}
*/

"$"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_dolar';%}

"or"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_or';%}
"and"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_and';%}
"mod"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mod';%}
"div"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_div';%}
"node"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_node';%}
"text"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}
"namespace-node"       %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace_node';%}
"ancestor-or-self"     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor_or_self';%}
"ancestor"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor';%}
"attribute"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"child"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"descendant-or-self"   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant_or_self';%}
"descendant"           %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant';%}
"following-sibling"    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following_sibling';%}
"following"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following';%}
"namespace"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace';%}
"parent"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parent';%}
"preceding-sibling"    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding_sibling';%}
"preceding"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding';%}
"self"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_self';%}
"child"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"attribute"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"last"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_last';%}
"position"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_position';%}
"text"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}
"upper-case"           %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_upper';%}
"lower-case"           %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_lower';%}
"substring"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_substring';%}

// SIMBOLOS
":="                   %{ listaTokens.push(new Token("ComparacionLet", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_let_igual';%}
"|"                    %{ listaTokens.push(new Token("Barra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_barra_or';%}
"+"                    %{ listaTokens.push(new Token("Suma", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mas';%}
"-"                    %{ listaTokens.push(new Token("Resta", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menos';%} 
"*"                    %{ listaTokens.push(new Token("Asterisco", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_asterisco';%} 
"!="                   %{ listaTokens.push(new Token("Indiferente", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_indiferente';%}
"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}
"<="                   %{ listaTokens.push(new Token("Menor_igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor_igual';%}
"<"                    %{ listaTokens.push(new Token("Menor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor';%}
">="                   %{ listaTokens.push(new Token("Mayor_Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor_igual';%}
">"                    %{ listaTokens.push(new Token("Mayor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor';%}
"::"                    %{ listaTokens.push(new Token("Cuatro_Puntos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cuatro_puntos';%}
"//"                   %{ listaTokens.push(new Token("Diagonal_doble", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal_doble';%} 
"/"                    %{ listaTokens.push(new Token("Division", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal';%} 
"@"                    %{ listaTokens.push(new Token("Arroba", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_arroba';%}
".."                   %{ listaTokens.push(new Token("Puntos_Seguidos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_puntos_seguidos';%}
"("                    %{ listaTokens.push(new Token("Parentesis_Izq", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_izq';%}
")"                    %{ listaTokens.push(new Token("Parentesis_Der", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_der';%}
"["                    %{ listaTokens.push(new Token("Corchete_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_izq";%}
"]"                    %{ listaTokens.push(new Token("Corchete_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_der";%}
"{"                    %{ listaTokens.push(new Token("Llave_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_izq";%}
"}"                    %{ listaTokens.push(new Token("Llave_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_der";%}
","                    %{ listaTokens.push(new Token("Coma", yytext, yylloc.first_line, yylloc.first_column)); return "tk_coma";%}


"."                    %{ listaTokens.push(new Token("Punto", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_punto';%}

\'[^\']*\' %{ listaTokens.push(new Token("Caracter", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_caracter";%}
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
[a-zA-Z_À-ÿ\u00F1\u00D1]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*    %{ listaTokens.push(new Token("Identificador", yytext, yylloc.first_line, yylloc.first_column)); return "tk_identificador";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_numero";%}



// FIN DEL ARCHIVO
<<EOF>>                                     %{ return "EOF"; %}
// ERRORES LEXICOS
.                                           %{ listaErrores.push(new TokenError("xQuery","ERROR LEXICO","Caracter no reconocido: "+ yytext, yylloc.first_line, yylloc.first_column )); %}


/lex

//aqui no coloco la precedencia porque la resulevo con la gramatica
//de menor precedencia a mayor precedencia

%left 'tk_or'
%left 'tk_and'
%left 'tk_indiferente'
%left 'tk_menor' 'tk_menor_igual' 'tk_mayor' 'tk_mayor_igual' 'tk_igual' 'tk_gt' 'tk_lt' 'tk_ge' 'tk_le' 'tk_eq' 'tk_ne'
%left 'tk_mas' 'tk_menos'
%left 'tk_asterisco' 'tk_div' 'tk_mod'
%left unmenos

%start INICIO

%%

/* Definición de la gramática */
INICIO  
        :XQUERYGRA EOF                                                                   {return $1;}  
        |HTML  EOF                                                                       {return {instr:"HTML",valor:$1};}
        |INSTRUCCIONES EOF                                                               {return {instr:"MULTIPLES",valor:$1};}
;
INSTRUCCIONES
        :INSTRUCCIONES INSTRUCCION                                                      {$1.push($2); $$=$1;}
        |INSTRUCCION                                                                    {$$=[$1];}
;
XQUERYGRA
        :FOR_IN WHERE ORDEN RETURN                                                      {$$={instr:"FOR_IN",iterador:$FOR_IN,retorno:$RETURN,where:$WHERE,order:$ORDEN};}
        |LLAMADA                                                                        {$$={instr:"LLAMADA",valor:$1};}
        |F_DATA                                                                         {$$={instr:"F_DATA",valor:$1};}
        |F_UPPER                                                                        {$$={instr:"F_UPPER",valor:$1};}
        |F_LOWER                                                                        {$$={instr:"F_LOWER",valor:$1};}   
        |F_SUBSTRING                                                                    {$$={instr:"F_SUBSTRING",valor:$1};} 
        
;
INSTRUCCION
        :CREAR_V                                                                        {$$={instr:"CREAR",valor:$1};}  
        |ASIGNAR_V                                                                      {$$={instr:"ASIGNAR",valor:$1};}
        |IF_                                                                            {$$={instr:"IF_",valor:$1};}
        |CREAR_F tk_punto_coma                                                          {$$={instr:"CREAR_F",valor:$1};}
        |LLAMADA_F                                                                      {$$={instr:"LLAMADA_F",valor:$1};}
        |RETURN                                                                         {$$={instr:"RETURN",valor:$1};}
        
;
CREAR_F  //declare      function local    ID                    (                PARAM            )      tipoReturn   {             instr                    }
        :tk_declare tk_function tk_local tk_identificador tk_parentesis_izq PARAMETROS tk_parentesis_der RETURNFUNC tk_llave_izq  INSTRUCCIONES tk_llave_der     {$$={id:$tk_identificador,parametros:$PARAMETROS,instr:$INSTRUCCIONES};}
        |tk_declare tk_function tk_local tk_identificador tk_parentesis_izq            tk_parentesis_der RETURNFUNC tk_llave_izq  INSTRUCCIONES tk_llave_der     {$$={id:$tk_identificador,parametros:null,instr:$INSTRUCCIONES};}
;
LLAMADA_F
        :tk_local tk_identificador tk_parentesis_izq  PARAMETROS_ENTRADA tk_parentesis_der {$$={id:$tk_identificador,parametros:$PARAMETROS_ENTRADA};}
;
PARAMETROS_ENTRADA
        :PARAMETROS_ENTRADA tk_coma DATO                                                {$1.push($3); $$=$1;}
        |DATO                                                                           {$$=[$1];}
;
PARAMETROS
        :PARAMETROS tk_coma PARAMETRO                                                   {$1.push($3); $$=$1;}
        |PARAMETRO                                                                      {$$=[$1];}
;
PARAMETRO       
        :tk_dolar tk_identificador tk_as tk_xs tk_identificador                         {$$={id:$2,valor:null};}
;
IF_
        :tk_if tk_parentesis_izq DATO tk_parentesis_der THEN_                           {$$={condicion:$DATO,accion:$THEN_,siguiente:null};}
        |tk_if tk_parentesis_izq DATO tk_parentesis_der THEN_ ELSE_                     {$$={condicion:$DATO,accion:$THEN_,siguiente:$ELSE_};}
;
THEN_
        :tk_then DATO                                                                   {$$={regreso:"DATA",data:$DATO};}
;
ELSE_
        :tk_else DATO                                                                   {$$={regreso:"DATA",data:$DATO};}
        |tk_else IF_                                                                    {$$={regreso:"ELSEIF",data:$IF_};}
;

CREAR_V
        :tk_let VARIABLE                                                                {$$={id:$2,valor:null};}
        |tk_let VARIABLE tk_let_igual DATO                                              {$$={id:$2,valor:$4};}
;
ASIGNAR_V
        :VARIABLE tk_let_igual DATO                                                     {$$={id:$1,valor:$3};}
;
FOR_IN
        :tk_for VARIABLE tk_in LLAMADA                                                  {$$={variable:$2,consulta:$4,contador:null}}
        |tk_for VARIABLE tk_at VARIABLE tk_in LLAMADA                                   {$$={variable:$2,consulta:$6,contador:$4}}
;
ORDEN
        :                                                                               {$$=null;}  
        |tk_order_by VARIABLE                                                           {$$={tipo:"VARIABLE",variable:$VARIABLE,consulta:null}}
        |tk_order_by VARIABLE XPATHGRA                                                  {$$={tipo:"VARIABLE",variable:$VARIABLE,consulta:$XPATHGRA}}        
;
WHERE
        :tk_where CONDICIONAL                                                           {$$={instr:"WHERE",condicion:$CONDICIONAL};}       
        |                                                                               {$$=null;}
;
CONDICIONAL
        :VARIABLE XPATHGRA                                                              {$$={tipo:"VARIABLE",variable:$VARIABLE,consulta:$XPATHGRA}}
        |VARIABLE                                                                       {$$={tipo:"VARIABLE",variable:$VARIABLE,consulta:null}}
        |tk_numero                                                                      {$$={tipo:"NUMERO",valor:$tk_numero}}
        |tk_hilera                                                                      {$$={tipo:"CADENA",valor:$1.slice(1,-1)}}
        //
        |CONDICIONAL tk_mas CONDICIONAL                                                               {$$= {tipo:"OP_MAS",valor1:$1,valor2:$3}}                                                  
        |CONDICIONAL tk_menos CONDICIONAL                                                             {$$= {tipo:"OP_MENOS",valor1:$1,valor2:$3}}    
        |CONDICIONAL tk_asterisco CONDICIONAL                                                         {$$= {tipo:"OP_MUL",valor1:$1,valor2:$3}}                                                 
        |CONDICIONAL tk_div CONDICIONAL                                                               {$$= {tipo:"OP_DIV",valor1:$1,valor2:$3}}  
        |CONDICIONAL tk_mod CONDICIONAL                                                               {$$= {tipo:"OP_MOD",valor1:$1,valor2:$3}}                                                                                                          
        |tk_menos DATO %prec UMENOS	                                                {$$= {tipo:"OP_NEG",valor1:$2}}
        |CONDICIONAL tk_mayor CONDICIONAL                                               {$$={tipo:"MAYOR",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_menor CONDICIONAL                                               {$$={tipo:"MENOR",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_mayor_igual CONDICIONAL                                         {$$={tipo:"MAYOR_IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_menor_igual CONDICIONAL                                         {$$={tipo:"MENOR_IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_igual CONDICIONAL                                               {$$={tipo:"IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_indiferente CONDICIONAL                                         {$$={tipo:"DIFERENTE",valor1:$1,valor2:$3};}
        //
        |CONDICIONAL tk_gt CONDICIONAL                                                  {$$={tipo:"MAYOR",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_lt CONDICIONAL                                                  {$$={tipo:"MENOR",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_ge CONDICIONAL                                                  {$$={tipo:"MAYOR_IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_le CONDICIONAL                                                  {$$={tipo:"MENOR_IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_eq CONDICIONAL                                                  {$$={tipo:"IGUAL",valor1:$1,valor2:$3};}
        |CONDICIONAL tk_ne CONDICIONAL                                                  {$$={tipo:"DIFERENTE",valor1:$1,valor2:$3};}
        //
        |CONDICIONAL tk_or CONDICIONAL                                                                {$$={tipo:"OR",valor1:$1,valor2:$3};}  

;
RETURN
        :tk_return VARIABLE                                                             {$$={tipo:"VAR",variable:$VARIABLE,consulta:null}}
        |tk_return VARIABLE XPATHGRA                                                    {$$={tipo:"VAR",variable:$VARIABLE,consulta:$XPATHGRA}}
        |tk_return HTML                                                                 {$$={tipo:"HTML",valor:$HTML}}
        |tk_return IF                                                                   {$$={tipo:"IF",valor:$IF}}
;

LLAMADA
        :tk_doc tk_parentesis_izq tk_hilera tk_parentesis_der XPATHGRA                  {$$=$XPATHGRA;}
        |XPATHGRA                                                                       {$$=$1;}
        |VARIABLE XPATHGRA                                                              {$$={variable:$VARIABLE,consulta:$XPATHGRA}}
        |VARIABLE                                                                       {$$={variable:$VARIABLE,consulta:null}}
        |tk_parentesis_izq tk_numero tk_to tk_numero tk_parentesis_der                  {$$={tipo:"TO",inicio:$2,fin:$4}}
;
VARIABLE
        :tk_dolar tk_identificador                                                      {$$=$tk_identificador;}
;
// FINALIZA GRAMATICA DE XQUERY
// INICIA GRAMATICA DE XPATH

XPATHGRA:
     CONSULTA_                                                                          {$$=$1;}             
;  
CONSULTA_
        :tk_identificador CONSULTA                                                      {$2.unshift({instr:"NODO",valor:$1}); $$=$2;}
        |CONSULTA                                                                       {$$=$1;}
;
CONSULTA
        :CONSULTA NODO                                                                  {$1.push($2); $$=$1;}
        |NODO                                                                           {$$=[$1];}
;  
NODO
        :tk_diagonal tk_identificador PREDICADO                                         {$$= {instr:"ACCESO",valor:$2,index:$3};}
        |tk_diagonal_doble tk_identificador  PREDICADO                                  {$$= {instr:"ACCESODOBLE",valor:$2,index:$3};}
        |tk_diagonal tk_puntos_seguidos                                                 {$$= {instr:"RETROCESO"};}
        |tk_diagonal tk_arroba tk_identificador                                         {$$= {instr:"ATRIBUTO",valor:$3};}
        |tk_diagonal tk_punto                                                           {$$= {instr:"ACTUAL"};}

        |tk_diagonal tk_asterisco PREDICADO                                             {$$= {instr:"ACCESO",valor:$2,index:$3};}
        |tk_diagonal_doble tk_asterisco  PREDICADO                                      {$$= {instr:"ACCESODOBLE",valor:$2,index:$3};}

        |tk_diagonal tk_arroba tk_asterisco                                             {$$= {instr:"ATRIBUTO",valor:$3};}

        |tk_diagonal tk_node tk_parentesis_izq tk_parentesis_der PREDICADO              {$$= {instr:"ACCESO",valor:"*",index:$5};}
        |tk_diagonal_doble tk_node tk_parentesis_izq tk_parentesis_der  PREDICADO       {$$= {instr:"ACCESODOBLE",valor:"*",index:$5};}

        |tk_diagonal_doble tk_arroba tk_identificador                                   {$$= {instr:"ATRIBUTODOBLE",valor:$3};}
        |tk_diagonal_doble tk_arroba tk_asterisco                                       {$$= {instr:"ATRIBUTODOBLE",valor:$3};}

;

PREDICADO
        :tk_corchete_izq DATO  tk_corchete_der                                          {$$= $DATO;}
        |                                                                               {$$= null;}
;

DATO
//Tipos de datos
        :tk_numero                                                                      {$$= {tipo:"NUMERO",valor:$1}}  
        |tk_identificador F_NATIVAS                                                     {$$= {tipo:"ID",valor:$1}}                                                         
        |tk_hilera                                                                      {$$= {tipo:"CADENA",valor:$1}}                                                                   
        |tk_arroba tk_identificador                                                     {$$= {tipo:"ATRIBUTO",valor:$2}}                                                
        |tk_last tk_parentesis_izq tk_parentesis_der                                    {$$= {tipo:"LAST"}} 
        |VARIABLE F_NATIVAS                                                             {$$= {tipo:"VARIABLE",valor:$1}} 
        |LLAMADA_F                                                                      {$$= {tipo:"LLAMADA_F",valor:$1}} 
        |XPATHGRA                                                                       {$$= {tipo:"xPath",valor:$1}} 
//Operaciones aritmeticas                      
        |DATO tk_mas DATO                                                               {$$= {tipo:"OP_MAS",valor1:$1,valor2:$3}}                                                  
        |DATO tk_menos DATO                                                             {$$= {tipo:"OP_MENOS",valor1:$1,valor2:$3}}    
        |DATO tk_asterisco DATO                                                         {$$= {tipo:"OP_MUL",valor1:$1,valor2:$3}}                                                 
        |DATO tk_div DATO                                                               {$$= {tipo:"OP_DIV",valor1:$1,valor2:$3}}  
        |DATO tk_mod DATO                                                               {$$= {tipo:"OP_MOD",valor1:$1,valor2:$3}}                                                                                                          
        |tk_menos DATO %prec UMENOS	                                                {$$= {tipo:"OP_NEG",valor1:$2}}
//Operaciones Logicas
        |DATO tk_igual DATO       	                                                {$$= {tipo:"OP_IGUAL",valor1:$1,valor2:$3}}                                   
        |DATO tk_indiferente DATO                                                       {$$= {tipo:"OP_DIFERENTE",valor1:$1,valor2:$3}}                   
        |DATO tk_menor_igual DATO                                                       {$$= {tipo:"OP_MENOR_IGUAL",valor1:$1,valor2:$3}}
        |DATO tk_mayor_igual DATO                                                       {$$= {tipo:"OP_MAYOR_IGUAL",valor1:$1,valor2:$3}}
        |DATO tk_mayor DATO                                                             {$$= {tipo:"OP_MAYOR",valor1:$1,valor2:$3}}
        |DATO tk_menor DATO                                                             {$$= {tipo:"OP_MENOR",valor1:$1,valor2:$3}}    
        //
        |DATO tk_gt DATO                                                                {$$={tipo:"MAYOR",valor1:$1,valor2:$3};}
        |DATO tk_lt DATO                                                                {$$={tipo:"MENOR",valor1:$1,valor2:$3};}
        |DATO tk_ge DATO                                                                {$$={tipo:"MAYOR_IGUAL",valor1:$1,valor2:$3};}
        |DATO tk_le DATO                                                                {$$={tipo:"MENOR_IGUAL",valor1:$1,valor2:$3};}
        |DATO tk_eq DATO                                                                {$$={tipo:"IGUAL",valor1:$1,valor2:$3};}
        |DATO tk_ne DATO                                                                {$$={tipo:"DIFERENTE",valor1:$1,valor2:$3};}  
        |DATO tk_and DATO                                                               {$$={tipo:"AND",valor1:$1,valor2:$3};}  
        |DATO tk_or DATO                                                                {$$={tipo:"OR",valor1:$1,valor2:$3};}  
        |tk_parentesis_izq DATO tk_parentesis_der                                       {$$=$DATO;}
;
F_NATIVAS
        :tk_punto tk_to tk_identificador tk_parentesis_izq tk_parentesis_der
        |
;
F_DATA
        :tk_data tk_parentesis_izq CONS tk_parentesis_der                               {$$=$3;}
;
F_UPPER
        :tk_upper tk_parentesis_izq CONS tk_parentesis_der                              {$$=$3;}
;
F_LOWER
        :tk_lower tk_parentesis_izq CONS tk_parentesis_der                              {$$=$3;}
;
F_SUBSTRING
        :tk_substring tk_parentesis_izq CONS tk_coma tk_numero tk_parentesis_der                          {$$={valor:$3,inicio:$5,fin:null};}
        |tk_substring tk_parentesis_izq CONS tk_coma tk_numero tk_coma tk_numero tk_parentesis_der        {$$={valor:$3,inicio:$5,fin:$7};}
;
CONS
        :VARIABLE XPATHGRA                                                              {$$={variable:$VARIABLE,consulta:$XPATHGRA}}
        |VARIABLE                                                                       {$$={variable:$VARIABLE,consulta:null}}
;

HTML
    :CONTENIDO                                                                          {$$=$1;}
;
CONTENIDO
        :CONTENIDO L_CONTENIDO                                                          {$1.push($2);$$=$1;} 
        |L_CONTENIDO                                                                    {$$=[$1];} 
        |CONTENIDO COD                                                                  {$1.push($2);$$=$1;} 
        |COD                                                                            {$$=[$1];}
;
L_CONTENIDO
        :tk_menor tk_identificador tk_mayor                                             {$$={tipo:"TXT",valor:$1.toString()+$2.toString()+$3.toString()};}
        |tk_menor tk_diagonal tk_identificador tk_mayor                                 {$$={tipo:"TXT",valor:$1.toString()+$2.toString()+$3.toString()+$4.toString()};}
        |tk_identificador                                                               {$$={tipo:"TXT",valor:$1.toString()};}
;
COD
        :tk_llave_izq XQUERYGRA tk_llave_der                                            {$$={tipo:"COD",valor:$2};}  
;
IF
        :tk_if tk_parentesis_izq CONDICIONAL tk_parentesis_der THEN ELSE                {$$={condicion:$CONDICIONAL,else:$ELSE,then:$THEN};}
        |tk_if tk_parentesis_izq CONDICIONAL tk_parentesis_der THEN                     {$$={condicion:$CONDICIONAL,else:null,then:$THEN};}
;
THEN
        :tk_then HTML                                                                   {$$={tipo:"HTML",valor:$2}}                                                                   
        |tk_then LLAMADA                                                                {$$={tipo:"LLAMADA",valor:$2}} 
;
ELSE
        :tk_else HTML                                                                   {$$={tipo:"HTML",valor:$2}}                                                                   
        |tk_else LLAMADA                                                                {$$={tipo:"LLAMADA",valor:$2}} 
;
















FUNCACKERMAN
        : CABEZAFUNC tk_parentesis_izq LISTAFUNC tk_parentesis_der RETURNFUNC FUNCOPERACION tk_punto_coma LLAMADAFUNCION
;

CABEZAFUNC
        : tk_declare tk_function tk_local tk_identificador
;

LISTAFUNC
        : LISTAFUNC tk_coma LISTACONF
        |LISTACONF
;

LISTACONF
        : tk_dolar tk_identificador tk_as tk_xs tk_identificador
;

RETURNFUNC
        :tk_as tk_xs tk_identificador
;

FUNCOPERACION
        :tk_llave_izq CODIGOFUNCION tk_llave_der
;

CODIGOFUNCION
        :XQUERYGRA
        |
;
LLAMADAFUNCION
        :LLAFCONT
;

LLAFCONT
        :LLAFCONT L_LLAFCONT
        |L_LLAFCONT
        |LLAFCONT LLAD
        |LLAD
;



L_LLAFCONT
        :tk_menor tk_identificador tk_mayor                                             {$$={tipo:"TXT",valor:$1.toString()+$2.toString()+$3.toString()};}
        |tk_menor tk_diagonal tk_identificador tk_mayor                                 {$$={tipo:"TXT",valor:$1.toString()+$2.toString()+$3.toString()+$4.toString()};}
        |tk_identificador                                                               {$$={tipo:"TXT",valor:$1.toString()};}
;
LLAD
        :tk_llave_izq tk_local tk_identificador tk_parentesis_izq FF tk_parentesis_der tk_llave_der                                            {$$={tipo:"COD",valor:$2};}  
;
FF
        :XQUERYGRA
        |tk_identificador tk_coma tk_identificador
        |tk_numero tk_coma tk_numero
; 