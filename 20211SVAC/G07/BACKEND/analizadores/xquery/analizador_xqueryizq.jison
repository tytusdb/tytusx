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
.                                           %{ listaErrores.push(new TokenError("xPATH","ERROR LEXICO","Caracter no reconocido "+ yytext, yylloc.first_line, yylloc.first_column )); %}


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
INICIO : 
        XQUERYGRA EOF                                                                   {return $1;}  
;
XQUERYGRA
        :FOR_IN WHERE ORDEN RETURN                                                      {$$={instr:"FOR_IN",iterador:$FOR_IN,retorno:$RETURN,where:$WHERE,order:$ORDEN};}
        |LLAMADA                                                                        {$$={instr:"LLAMADA",valor:$1};}
        |HTML                                                                           {$$={instr:"HTML",valor:$1};}
;
FOR_IN
        :tk_for VARIABLE tk_in LLAMADA                                                  {$$={variable:$2,consulta:$4}}
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
;
RETURN
        :tk_return VARIABLE                                                             {$$={variable:$VARIABLE,consulta:null}}
        |tk_return VARIABLE XPATHGRA                                                    {$$={variable:$VARIABLE,consulta:$XPATHGRA}}
;
LLAMADA
        :tk_doc tk_parentesis_izq tk_hilera tk_parentesis_der XPATHGRA                  {$$=$XPATHGRA;}
        |XPATHGRA                                                                       {$$=$1;}
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
        |tk_identificador                                                               {$$= {tipo:"ID",valor:$1}}                                                         
        |tk_hilera                                                                      {$$= {tipo:"CADENA",valor:$1}}                                                                   
        |tk_arroba tk_identificador                                                     {$$= {tipo:"ATRIBUTO",valor:$2}}                                                
        |tk_last tk_parentesis_izq tk_parentesis_der                                    {$$= {tipo:"LAST"}} 
//Operaciones aritmeticas                      
        |DATO tk_mas DATO                                                               {$$= {tipo:"OP_MAS",valor1:$1,valor2:$3}}                                                  
        |DATO tk_menos DATO                                                             {$$= {tipo:"OP_MENOS",valor1:$1,valor2:$3}}    
        |DATO tk_asterisco DATO                                                         {$$= {tipo:"OP_MUL",valor1:$1,valor2:$3}}                                                 
        |DATO tk_div DATO                                                               {$$= {tipo:"OP_DIV",valor1:$1,valor2:$3}}  
        |DATO tk_mod DATO                                                               {$$= {tipo:"OP_MOD",valor1:$1,valor2:$3}}                                                                                                          
        |tk_menos DATO %prec UMENOS	                                                {$$= {tipo:"OP_NEG",valor1:$1}}
//Operaciones Logicas
        |DATO tk_igual DATO       	                                                {$$= {tipo:"OP_IGUAL",valor1:$1,valor2:$3}}                                   
        |DATO tk_indiferente DATO                                                       {$$= {tipo:"OP_DIFERENTE",valor1:$1,valor2:$3}}                   
        |DATO tk_menor_igual DATO                                                       {$$= {tipo:"OP_MENOR_IGUAL",valor1:$1,valor2:$3}}
        |DATO tk_mayor_igual DATO                                                       {$$= {tipo:"OP_MAYOR_IGUAL",valor1:$1,valor2:$3}}
        |DATO tk_mayor DATO                                                             {$$= {tipo:"OP_MAYOR",valor1:$1,valor2:$3}}
        |DATO tk_menor DATO                                                             {$$= {tipo:"OP_MENOR",valor1:$1,valor2:$3}}                  
;

HTML
    :CONTENIDO                                                                          {$$=$1;}
;
CONTENIDO
        :CONTENIDO L_CONTENIDO
        |L_CONTENIDO
;
L_CONTENIDO
        :tk_menor tk_identificador tk_mayor                                             {$$=$1+$2;}
        |tk_menor tk_diagonal tk_identificador tk_mayor                                 {$$=$1;}
        |tk_identificador                                                               {$$=$1;}
;