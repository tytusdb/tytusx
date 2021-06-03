/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex
%options case-insensitive



%%




"<"					return 'menorque';
">"					return 'mayorque';
"/"					return 'diagonal';
"="					return 'igual';


/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b				return 'entero';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';

<<EOF>>				return 'EOF';

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex



/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: LISTA_PRINCIPAL EOF
;

LISTA_PRINCIPAL : LISTA_PRINCIPAL LISTA
   				| LISTA
 ;

LISTA : ABRE LISTA_PRINCIPAL CIERRA
	  | ABRE LISTA_DATOS  CIERRA
	  | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

ABRE : menorque identificador mayorque 
	 | menorque identificador ETIQUETAS mayorque ;

CIERRA : menorque diagonal identificador mayorque;

ETIQUETAS : ETIQUETAS ETIQUETA
		  | ETIQUETA;
		  
ETIQUETA : identificador igual cadena;

LISTA_DATOS : LISTA_DATOS  DATO
            | DATO;

DATO :  ABRE PARRAFOS CIERRA;

PARRAFOS : PARRAFOS PARRAFO 
		| PARRAFO;

PARRAFO : entero | identificador | decimal | cadena;
