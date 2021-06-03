/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

/* Espacios en blanco */
[ \r\t]+    {}
\n          {}

[".":]    console.log("Soy un punto o un guion")

"," return "COMA"

[0-9]+    return "digit";

<<EOF>>     return 'EOF';

.   { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%start ini

%% /* Definición de la gramática */

ini : L_INSTRUCTION
;

L_INSTRUCTION : INSTRUCTION (COMA INSTRUCTION)* {console.log($1,$2)}
;

INSTRUCTION : digit {$$=$1; console.log($1)}
;