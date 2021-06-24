/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"/*"                               this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip commentario content*/
".h"                    %{ return 'tk_extension';  %}   
"#include"                    %{ return 'tk_include';  %}   
"goto"                      %{ return 'tk_goto';  %}    
"if"                        %{ return 'tk_if';  %}
"double"                    %{ return 'tk_double';  %}
"int"                       %{ return 'tk_int';  %} 
"char"                       %{ return 'tk_char';  %}   
"void"                      %{ return 'tk_void';  %}   
"float"                     %{ return 'tk_float';  %}  
"main"                      %{ return 'tk_main';  %}
"printf"                    %{ return 'tk_printf';  %}  
"return"                    %{ return 'tk_return';  %} 
[-]?([0-9]+["."][0-9]+)\b        %{ return 'tk_decimal';  %}
[-]?[0-9]+\b                    %{ return 'tk_entero';  %}
\"[^\"]*\"                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
"+"                         %{ return 'tk_mas';  %}
"-"                         %{ return 'tk_menos';  %}
"*"                         %{ return 'tk_multiplicacion';  %}
"/"                         %{ return 'tk_division';  %}
"%"                         %{ return 'tk_modulo';  %}
"!="                        %{ return 'tk_noigual'; %}
"<="                        %{ return 'tk_menorigual'; %}
">="                        %{ return 'tk_mayorigual'; %}
"=="                        %{ return 'tk_igualigual'; %}
"="                         %{ return 'tk_igual'; %}
">"                         %{ return 'tk_mayor'; %}
"<"                         %{ return 'tk_menor'; %}
"{"                         %{ return 'tk_llavea'; %}
"}"                         %{ return 'tk_llavec'; %}
"["                         %{ return 'tk_corchetea'; %}
"]"                         %{ return 'tk_corchetec'; %}
"("                         %{ return 'tk_parentesisa'; %}
")"                         %{ return 'tk_parentesisc'; %}
":"                         %{ return 'tk_dospuntos'; %}
";"                         %{ return 'tk_puntoycoma'; %}
","                         %{ return 'tk_coma'; %}
\s+                         /* skip whitespace */
[ \t\r\n\f]                 %{ /*Los Ignoramos*/   %}
<<EOF>>                     %{ return 'EOF';       %}
.                           {  console.log("ERROR: "+yytext); }

/lex

//SECCION DE IMPORTS
%{

%}


/* Asociación de operadores y precedencia */
%left tk_mas tk_menos
%left tk_asterisco tk_division tk_modulo
%left UMENOS
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */

INICIO : BLOQUES EOF     {  $$ = "TODO CORRECTO :D OPTIMIZADOR VERSION";
                                return $$; } ;


BLOQUES: BLOQUES BLOQUE { }
        | BLOQUE {};

TIPO_DATO:      tk_double { }
        |       tk_float { }
        |       tk_char { }
        |       tk_int { };


BLOQUE:         tk_include tk_menor tk_identificador tk_extension tk_mayor { }
        |       TIPO_DATO  tk_identificador tk_corchetea tk_entero tk_corchetec tk_puntoycoma { }
        |       TIPO_DATO IDS  tk_puntoycoma { } 
        |       tk_void tk_identificador tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec { }
        |       tk_void tk_main tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec { }
        |       tk_int tk_main tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec { };

IDS: IDS tk_coma tk_identificador { }
        |       tk_identificador { };


EXPRESION:      tk_identificador { }
        |       tk_decimal { }
        |       tk_entero { };

OPERADOR:       tk_mas { }
        |       tk_menos { }
        |       tk_division { }
        |       tk_multiplicacion { }
        |       tk_modulo { };

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { }
        |       INSTRUCCION { };

COMPARADOR:     tk_igualigual { }
        |       tk_noigual { }
        |       tk_mayorigual { }
        |       tk_menorigual { }
        |       tk_mayor { }
        |       tk_menor { };


INSTRUCCION:    tk_identificador tk_igual EXPRESION OPERADOR EXPRESION tk_puntoycoma { }
        |       tk_identificador tk_igual EXPRESION tk_puntoycoma { }
        |       tk_identificador tk_igual tk_identificador tk_corchetea tk_parentesisa TIPO_DATO tk_parentesisc tk_identificador tk_corchetec tk_puntoycoma  { }
        |       tk_identificador tk_corchetea tk_parentesisa TIPO_DATO tk_parentesisc tk_identificador tk_corchetec tk_igual EXPRESION tk_puntoycoma { }
        |       tk_identificador tk_dospuntos { }
        |       tk_goto tk_identificador tk_puntoycoma { }
        |       tk_return tk_puntoycoma { }
        |       tk_return tk_entero tk_puntoycoma { }
        |       tk_identificador tk_parentesisa tk_parentesisc tk_puntoycoma { }
        |       tk_printf tk_parentesisa tk_cadena1 tk_coma tk_parentesisa TIPO_DATO tk_parentesisc EXPRESION tk_parentesisc tk_puntoycoma { }
        |       tk_if tk_parentesisa EXPRESION COMPARADOR EXPRESION tk_parentesisc tk_goto tk_identificador tk_puntoycoma { };