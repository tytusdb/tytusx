/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/*%{
	const Error = require('./Error.js');
	var erroresLexicos = [];
	var variables=[];
	var erroresSintacticos = [];
%}
*/

/* DefINIción Léxica */
%lex

%options case-insensitive

%%

"Evaluar"           return 'REVALUAR';
"Aceptar"           return 'ACEPTAR';
";"                 return 'ptcoma';
"("                 return 'parizq';
")"                 return 'parder';
"["                 return 'corizq';
"]"                 return 'corder';
"<"                 return 'menosque';
">"                 return 'masque';
"="                 return 'igual';
"\""			return 'comilla';
"'"				return 'apostrofe';
"!"				return 'inicoment';
"?"				return 'c_interroga';
"xml" 			return 'xml';
"version"		return 'version';
"encoding"		return 'encoding';
"UTF-8"			return 'UTF'
"ASCII"			return 'ASCII';
"ISO859-1"		return 'ISO';
"&lt;"			return 'lessthan';
"&gt;"			return 'graterthan';
"&amp;"			return 'ampersand';
"&apos;"		return 'simplequote';
"&quot;"		return 'doublequote';
":"				return 'colon';
"_"				return 'underscore';

"+"                 return 'mas';
"-"                 return 'menos';
"*"                 return 'por';
"/"                 return 'div';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)?\b    return 'decimal';
[0-9]+\b                return 'entero';
([a-zA-Z0-9])[a-zA-Z0-9_]* return 'identificador';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'mas' 'menos'
%left 'por' 'div'
%left Umenos

%start XML_GRAMAR

%% /* Definición de la gramática */
XML_GRAMAR :  
	ENCABEZADO ABRIR_ELEMENTO CONTENIDO_ELEMENTO EOF	 {return $1;}
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

/*    <?xml version="1.0" encoding="UTF-8"?>    */
ENCABEZADO : 
	menosque c_interroga xml version igual QUOTES TIPO_DATO QUOTES encoding igual QUOTES FORMAT QUOTES c_interroga masque 
;

FORMAT : UTF | ASCII | ISO ;

ABRIR_ELEMENTO : 
	menosque identificador 
	| menosque inicoment menos menos 
; 

CONTENIDO_ELEMENTO: ETIQUETA | COMENTARIO ;

ETIQUETA : 
	ATRIBUTOS  CIERRE_ELEMENTO
	| CIERRE_ELEMENTO
;

ATRIBUTOS : ATRIBUTO A_PRIMA ;
A_PRIMA : ATRIBUTO A_PRIMA | ;


ATRIBUTO : identificador igual QUOTES C_ATRIBUTO QUOTES
;

C_ATRIBUTO : TIPOCONTENIDO C_A_PRIMA ;
C_A_PRIMA :TIPOCONTENIDO C_A_PRIMA | ;


CIERRE_ELEMENTO : 
	masque CONTENIDO_ETIQUETA menosque div identificador masque 
	| masque L_ELEMENTOS div identificador masque 
	| masque menosque div identificador masque
	| div masque 
;

L_ELEMENTOS : ELEMENTO L_E_PRIMA ;
L_E_PRIMA : ELEMENTO L_E_PRIMA | menosque ; 


ELEMENTO :  
	ABRIR_ELEMENTO 	CONTENIDO_ELEMENTO 
;

CONTENIDO_ETIQUETA : TIPOCONTENIDO C_E_PRIMA;
C_E_PRIMA : TIPOCONTENIDO C_E_PRIMA  |  ;


TIPOCONTENIDO :
	TIPO_DATO | SIGNOS | SPECIALCHARS;

SPECIALCHARS : 
	lessthan|graterthan|ampersand|simplequote|doublequote|colon|underscore;

TIPO_DATO : identificador|decimal|entero;

SIGNOS : mas | menos | por | div ;

QUOTES : comilla | apostrofe ;


COMENTARIO : C_TEXTO menos menos masque
	| menos menos masque
;

C_TEXTO : TIPO_DATO C_T_PRIMA ;
C_T_PRIMA : TIPO_DATO C_T_PRIMA | ;

