/* description: Parsea c3d y lo mete en una lista de instrucciones donde 
    clasifica el tipo de instrucción.
    
    TIPOS DE INSTRUCCION = asignación,  */

%{
     /*Acá importo mis cosas errores, tokens para la tabla de símbolos y eso*/
%}

%lex

%options case-insensitive
number  [0-9]+("."[0-9]+)?\b 


%%

\s+                 /* skip whitespace */
"//".*										/* skip */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			/* skip */
[ \r\t]+  			                            /* skip */
\n                                    /* skip */

// agrupadores 
"["                   return '[';
"]"                   return ']';
"("                   return '(';
")"                   return ')';

// operaciones artiméticas
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
"%"                   return '%';
"="                   return '=';

// operaciones condicionales

"<="                   return '<=';
"<"                    return '<';
">="                   return '>=';
">"                    return '>';
"=="                   return '==';
"!="                   return '!=';

// encabezado
"#include <stdio.h>"				          return '#include <stdio.h>';
"Float Heap[100000]"				          return 'enc1';
"Float Stack[100000]"				          return 'enc2';
"Float SP"				                    return 'enc3';
"Float HP"				                    return 'enc4';
"Float "[("t"\d+(", ")?)+";"]             return 'enc5';

// Palabras reservadas
"goto"                return 'goto';
"if"				          return 'if';
"return"				      return 'return';

// printf
"print"               return 'print';
"printf"               return 'printf';
"%c"				          return '%c';
"%d"				          return '%d';
"%f"				          return '%f';

// tiempo de ejecución
"Heap"|"heap"			          return 'Heap';
"Stack"|"stack"		          return 'Stack';
"SP"                    return 'SP';
"HP"                    return 'HP';

// funciones
"void"				          return 'void';
"main"				          return 'main';

// variables y sus nombres
("T"|"t")[0-9]+                   return 'temporal';
("L"|"l")[0-9]+                   return 'etiqueta';
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*\b      return 'id';
{number}                          return 'number';

// Otros cosos
";"                   return ';';
":"                   return ':';

// 

/lex

/* Asociación de operadores y precedencia */
%start ini

%%

ini
	: instrucciones EOF {
		// retorno la lista de tokens
	}
;

instrucciones
	: instrucciones instruccion 	{ }
	| instruccion					        { }
;

instruccion
  : etiqueta ':'                { /*etiqueta pal salto*/ }
  | goto etiqueta ';'           { /*salto*/}
  | if '(' condition ')' goto etiqueta ';'    { /*if*/ }
  | ids '=' exp ';'      { /*asignación*/}

;


exp
  : ids '+' ids
  | ids '-' ids
  | ids '*' ids
  | ids '/' ids
  | ids '%' ids
  | ids
;

condition
  : ids '<' ids
  | ids '>' ids
  | ids '<=' ids
  | ids '>=' ids
  | ids '==' ids
  | ids '!=' ids
;

estructuras
  : Stack
  | Heap
;

ids
  : temporal
  | SP
  | HP
  | number
  | id
;




