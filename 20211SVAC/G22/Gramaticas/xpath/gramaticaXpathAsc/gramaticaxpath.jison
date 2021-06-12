
/********************************************************* LEXICO *****************************************************/

%lex

%options case-insensitive

%%

"XML"               return 'xml1'; 
"UTF8"				return 'utf';
"ASCII"			    return 'ascii1';
"version"			return 'version';
"encoding"			return 'encoding';
"mod"				return 'modulo';
"or"				return 'or1';
"and"				return 'and1';

//metodos
"node()" 			return 'funcionNode';
"text()"			return 'funcionText';
"last()"			return 'funcionLast';
"position()"		return 'funcionPosition';

//axes
"ancestor_or_self"	return 'ancestor_or_self1';
"ancestor"			return 'ancestor1';
"attribute"			return 'attribute1';
"child"				return 'child1';
"descendant_or_self" return 'descendant_or_self1';	
"descendant"		return 'descendant1';
"following_sibling"	return 'following_sibling1';
"following"			return 'following1';
//	| namespace -> no se toma en cuenta
"parent"			return 'parent1';
"preceding_sibling"	return 'preceding_sibling1';
"preceding"			return 'preceding1';
"self"				return 'self1';

//simbolos
";"                 return 'ptcoma';
":"                 return 'dosPuntos';
"("                 return 'parizq';
")"                 return 'parder';
"["                 return 'corcheteAbierto';
"]"                 return 'corcheteCerrado';
"<""="                 return 'menorIgual';
">""="                return 'mayorIgual';
"<"                 return 'menorque';
">"                 return 'mayorque';
"="                 return 'igual';
"!""="                 return 'diferenteQue';
".""." 				return 'dosPuntosConsecutivos';
"." 				return 'punto';
"+"                 return 'mas';
"-"                 return 'menos';
"*"                 return 'asterisco';
"/""/"               return 'diagonalDoble';
"/"                 return 'diagonal';

"div"				return 'dividir';
"?"                 return 'interrogacionC';
"@"                 return 'arroba';
"|"                 return 'concatenacion';


/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)\b    return 'decimal';
[0-9]+\b                return 'entero';
([a-zA-Z])[a-zA-Z0-9_]* return 'identificador';
\"[^\"]*\"				return 'cadena';
"\""				return 'comilla';




<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex



/********************************************************* SINTACTICO ASCENDENTE *****************************************************/
%start S

%% /* Definición de la gramática */

S :
	CONSULTAS EOF
;


CONSULTAS : 
	CONSULTAS CONSULTA
	| CONSULTA
;

CONSULTA :
	DIAGONALES  
	| TIPO_ID
	| concatenacion
	| punto
	| dosPuntos
	| FUNCION
;


DIAGONALES:
	diagonalDoble SIMBOLOS   
	| diagonal SIMBOLOS 
;

SIMBOLOS:  
	arroba SIGUIENTE_ARROBA   
	| asterisco   
	| dosPuntosConsecutivos //antes debe de haber un /id/ o //id/ etc, sino error semantico
	| punto //antes debe de haber un /id/  //id/ etc, sino error semantico
	| FUNCION
	| METODOS
	| TIPO_ID
;

SIGUIENTE_ARROBA :  //selecciona atributos *-> todos, o todos con un id
	identificador   
	| asterisco   
;

FUNCION :
	funcionNode
	| funcionText
	|funcionLast
	|funcionPosition
;

METODOS: //no puede venir sin antes especificar un nodo , no a la par de un id, puede venir despues de alguna diagonal o dentro del arreglo
	PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO
;

PALABRA_RESERVADA:
	ancestor1
	| ancestor_or_self1	
	| attribute1
	| child1
	| descendant1
	| descendant_or_self1	
	| following1
	| following_sibling1	
//	| namespace -> no se toma en cuenta
	| parent1
	| preceding1
	| preceding_sibling1	
	| self1	
;
SIGUIENTE_METODO:
	FUNCION
	| TIPO_ID
	| asterisco //a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones
	| punto
	| dosPuntos
;

TIPO_ID :
	identificador  //bookstore
	| identificador ARREGLOS_ID   // booksotre[ operaciones ]
;

ARREGLOS_ID : ARREGLOS_ID ARREGLO_ID
	| ARREGLO_ID 
;

ARREGLO_ID:
	corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado
;

OPERACIONES_ARREGLO:
	OPERACION_LOGICA
	| OPERACION_RELACIONAL
;

OPERACION_LOGICA:
	OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL
;
SIMBOLOS_LOGICOS:
	and1
	| or1
;


OPERACION_RELACIONAL :
		OPERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA
		|OPERACION_ARITMETICA
;

SIMBOLOS_RELACIONALES:
	mayorque
	| menorque
	| mayorIgual
	| menorIgual
	| igual
	| diferenteQue
;


OPERACION_ARITMETICA :
	OPERACION_ARITMETICA mas T1
	| OPERACION_ARITMETICA menos T1
	| T1 
;

T1 : 
	T1 modulo T 
	| T
;

T : 
	T asterisco F 
	| T dividir F
	| F 
;

F : 
	TIPOIGUALAR
	| parizq OPERACION_ARITMETICA parder
;

TIPOIGUALAR:
	entero
	| decimal 
	| arroba SIGUIENTE_ARROBA
	| cadena
	| CONSULTAS
	| METODOS
;
