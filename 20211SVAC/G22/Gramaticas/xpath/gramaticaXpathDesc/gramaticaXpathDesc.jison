
/********************************************************* LEXICO  *****************************************************/

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
"*"                   return 'asterisco'
"-"                   return '-'
"+"                   return '+'

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

%left '+' '-' 
%left 'modulo' 'dividir' 'asterisco' 

%left '^'

%{
	const {Dato} = require("../../../Scripts/ClasesXpath/Dato");
	const {OperacionAritmetica} = require("../../../Scripts/ClasesXpath/OperacionAritmetica");
	const {Operador} = require("../../../Scripts/ClasesXpath/Operador");
	const {OperacionRelacional} = require("../../../Scripts/ClasesXpath/OperacionRelacional");
	const {OperacionLogica} = require("../../../Scripts/ClasesXpath/OperacionLogica");
	const {Predicado} = require("../../../Scripts/ClasesXpath/Predicado");
	const {IdSimple} = require("../../../Scripts/ClasesXpath/IdSimple");
	const {IdCompuesto} = require("../../../Scripts/ClasesXpath/IdCompuesto");
	const {SimbolosXpath} = require("../../../Scripts/ClasesXpath/SimbolosXpath");
	const {TiposXpath} = require("../../../Scripts/ClasesXpath/TiposXpath");
	const {Metodo} = require("../../../Scripts/ClasesXpath/Metodo");
	const {Funcion} = require("../../../Scripts/ClasesXpath/Funcion");
	const {Arroba} = require("../../../Scripts/ClasesXpath/Arroba");
	const {diagonalDobleC} = require("../../../Scripts/ClasesXpath/diagonalDobleC");
	const {diagonalSimpleS} = require("../../../Scripts/ClasesXpath/diagonalSimpleS");

	var aux =0;
%}

/********************************************************* SINTACTICO DESCENDENTE *****************************************************/
%start S

%% /* Definición de la gramática */


S :
	RUTAS EOF
	{	$$ = $1;
		var regla = new Regla("GRAMATICAL","S->  RUTAS EOF",""); ingresarRegla(regla);
		 return $$; 
	}
	|error { 
			console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
			var error =  new Error( this._$.first_line ,  this._$.first_column, 'sintactico','xmldesc', yytext);
			erroresSintacticos.push(error); unirErrores(); 
	}
;

/*RUTAS :
	RUTAS concatenacion CONSULTAS
	| CONSULTAS 
;
*/

RUTAS : 
	CONSULTAS RUTAS_PRIMA
	{
		$$=[$1]; $$= $$.concat($2);
		var regla = new Regla("GRAMATICAL","RUTAS->  CONSULTAS RUTAS_PRIMA","retornar resultado"); ingresarRegla(regla);
	}
;
//----------------revisar
RUTAS_PRIMA : 
	concatenacion CONSULTAS RUTAS_PRIMA	
	{
		$$=[$1]; $$ = $$.concat($2);
		var regla = new Regla("GRAMATICAL","RUTAS_PRIMA-> concatenacion CONSULTAS RUTAS_PRIMA	","$$=[arreglo Consulta];\n retornar$$.concat(arreglo CONSULTAS_PRIMA);"); ingresarRegla(regla);
	}| 
	{
		$$=[];
		var regla = new Regla("GRAMATICAL","RUTAS_PRIMA-> epsilon","retirnar vacio;"); ingresarRegla(regla);
	}
;


CONSULTAS : CONSULTA CONSULTAS_PRIMA
	{
	$$=[$1]; $$= $$.concat($2);
	var regla = new Regla("GRAMATICAL","CONSULTAS->  CONSULTA CONSULTAS_PRIMA","$$=[arreglo Consulta];\n retornar$$.concat(arreglo CONSULTAS_PRIMA);"); ingresarRegla(regla);
	}
;

CONSULTAS_PRIMA : CONSULTA CONSULTAS_PRIMA 
	{$$=[$1]; $$ = $$.concat($2);
		var regla = new Regla("GRAMATICAL","CONSULTAS_PRIMA-> CONSULTA CONSULTAS_PRIMA ",""); ingresarRegla(regla);
	}
| 
	{
		$$=[];
		var regla = new Regla("GRAMATICAL","CONSULTAS_PRIMA-> epsilon",""); ingresarRegla(regla);
	}
;

CONSULTA :
	DIAGONALES  
		{$$=$1;
		var regla = new Regla("GRAMATICAL","CONSULTA-> DIAGONALES","retornar DIAGONALES"); ingresarRegla(regla);
		}
	| TIPO_ID
		{$$=$1;
		var regla = new Regla("GRAMATICAL","CONSULTA-> TIPO_ID","retornar TIPO_ID"); ingresarRegla(regla);
		}
	| punto//antes debe de haber un /id/  //id/ etc, sino error semantico
		{$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","CONSULTA-> punto","regresar nuevo simbolo xpath punto"); ingresarRegla(regla);

		}
	| dosPuntosConsecutivos  //antes debe de haber un /id/ o //id/ etc, sino error semantico 
		{$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","CONSULTA-> FUNCION",""); ingresarRegla(regla);
		}
	| FUNCION 
		{$$=$1;
		var regla = new Regla("GRAMATICAL","CONSULTA-> FUNCION","retornar FUNCION"); ingresarRegla(regla);
		}
;


DIAGONALES:
	diagonalDoble SIMBOLOS   
		{ $$ = new diagonalDobleC($2, @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","DIAGONALES -> diagonalDoble SIMBOLOS  ","retorna nueva diagonalDoble;"); ingresarRegla(regla);
		}
	| diagonal SIMBOLOS 
		{ $$ = new diagonalSimpleS($2, @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","DIAGONALES -> diagonal SIMBOLOS ","retorna nueva DiagonalSimple"); ingresarRegla(regla);
		}
;

SIMBOLOS:  
	arroba SIGUIENTE_ARROBA  
		{ $$ = new Arroba($2, @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS -> arroba SIGUIENTE_ARROBA","retorna nuevo representacion de arroba;"); ingresarRegla(regla);
		 }
	| asterisco //a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones
		{$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> asterisco","retorna nuevo simboloxpath asterisco;"); ingresarRegla(regla);
		}
	| punto//antes debe de haber un /id/  //id/ etc, sino error semantico
		{$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> punto","retorna nuevo simboloxpath punto;"); ingresarRegla(regla);
		}
	| dosPuntosConsecutivos  //antes debe de haber un /id/ o //id/ etc, sino error semantico 
		{$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> dosPuntosConsecutivos","retorna nuevo simboloxpath dosPuntos;"); ingresarRegla(regla);
		}
	| FUNCION
		{$$=$1;
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> FUNCION","retorna arregloGramatica[0];"); ingresarRegla(regla);
		}
	| METODOS
		{$$-0=$1[0];
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> METODOS","retorna arregloGramatica[0];"); ingresarRegla(regla);
		}

	| TIPO_ID
		{$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> TIPO_ID","retorna arregloGramatica[0];"); ingresarRegla(regla);
		}
;


SIGUIENTE_ARROBA :  //selecciona atributos *-> todos, o todos con un id
	identificador   {
		 $$ = new Dato($1, @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","SIGUIENTE_ARROBA-> identificador","retorna nuevo dato"); ingresarRegla(regla);
	}
	| asterisco   {
		$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_ARROBA-> asterisco","retorna nuevo simboloXPATH  asterisco"); ingresarRegla(regla);
	}
;

FUNCION :
	funcionNode{
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionNode",""); ingresarRegla(regla);
		$$ = new Funcion(TiposXpath.FUNCION_NODE,@1.first_line, @1.first_column);
	}
	| funcionText{
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionText",""); ingresarRegla(regla);
		$$ = new Funcion(TiposXpath.FUNCION_TEXT,@1.first_line, @1.first_column);
	}
	|funcionLast{
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionLast",""); ingresarRegla(regla);
		$$ = new Funcion(TiposXpath.FUNCION_LAST,@1.first_line, @1.first_column);
	}
	|funcionPosition{
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionPosition",""); ingresarRegla(regla);
		$$ = new Funcion(TiposXpath.FUNCION_POSITION,@1.first_line, @1.first_column);
	}
;

METODOS: //no puede venir sin antes especificar un nodo , no a la par de un id, puede venir despues de alguna diagonal o dentro del arreglo
	PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO {
		var regla = new Regla("GRAMATICAL","METODOS-> PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO",""); ingresarRegla(regla);
		$$ = new Metodo($1,$4,@1.first_line, @1.first_column);
	}
;

PALABRA_RESERVADA:
	ancestor1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> ancestor1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_ANCESTOR;
	}
	| ancestor_or_self1	{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> ancestor_or_self1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_ANCESTOR_OR_SELF;
	}
	| attribute1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> attribute1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_ATRIBUTE;
	}
	| child1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> child1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_CHILD;
	}
	| descendant1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> descendant1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_DESCENDANT;
	}
	| descendant_or_self1	{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_METODO_DESCENDANT_OR_SELF;
	}
	| following1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_FOLLOWING;
	}
	| following_sibling1	{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following_sibling1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_FOLLOWING_SIGLING;
	}
	| parent1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_PARENT;
	}
	| preceding1{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_PRECEDING;
	}
	| preceding_sibling1	{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding_sibling1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_PRECEDING_SIBLING;
	}
	| self1	{
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> self1",""); ingresarRegla(regla);
		$$=TiposXpath.METODO_SELF;
	}
;
SIGUIENTE_METODO:
	FUNCION {
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> FUNCION",""); ingresarRegla(regla);
		$$=$1;
	}
	| TIPO_ID {
		$$=$1;
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto",""); ingresarRegla(regla);
	}
	| asterisco {//a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones{
		$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto",""); ingresarRegla(regla);
	}
	| punto {
		$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto",""); ingresarRegla(regla);
	}
	| dosPuntos {
		$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> dosPuntos",""); ingresarRegla(regla);
	}
;

TIPO_ID :
	identificador  {//bookstore{
		var regla = new Regla("GRAMATICAL","ARREGLO_ID-> identificador",""); ingresarRegla(regla);
		$$ = new IdSimple($1,@1.first_line, @1.first_column);
	}
	| identificador ARREGLOS_ID  { // booksotre[ operaciones ]{
		$$ = new IdCompuesto($1,$2,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","ARREGLO_ID-> identificador ARREGLOS_ID",""); ingresarRegla(regla);
	}
;


ARREGLOS_ID : 
	ARREGLO_ID ARREGLOS_ID_PRIMA{
		var regla = new Regla("GRAMATICAL","ARREGLOS_ID-> ARREGLO_ID ARREGLOS_ID_PRIMA",""); ingresarRegla(regla);
		$$=[$1]; $$= $$.concat($2);
	}
;

ARREGLOS_ID_PRIMA : 
	ARREGLO_ID ARREGLOS_ID_PRIMA {
		$$=[$1]; $$ = $$.concat($2);
		var regla = new Regla("GRAMATICAL","ARREGLOS_ID_PRIMA-> ARREGLO_ID ARREGLOS_ID_PRIMA",""); ingresarRegla(regla);
	}
	|  {
		$$=[];
		var regla = new Regla("GRAMATICAL","ARREGLOS_ID_PRIMA-> ARREGLO_ID ARREGLOS_ID_PRIMA",""); ingresarRegla(regla);
	}
;

ARREGLO_ID:
	corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado{
		$$ = new Predicado($2,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","ARREGLO_ID->  corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado",""); ingresarRegla(regla);
	}
;

OPERACIONES_ARREGLO:
	OPERACION_LOGICA{
		$$ = $1;
		var regla = new Regla("GRAMATICAL","OPERACIONES_ARREGLO->  OPERACION_LOGICA ",""); ingresarRegla(regla);
	}
	| OPERACION_RELACIONAL{
		$$ = $1;
		var regla = new Regla("GRAMATICAL","OPERACIONES_ARREGLO->  OPERACION_RELACIONAL ",""); ingresarRegla(regla);
	}
;


OPERACION_LOGICA:
	OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL{
		var regla = new Regla("GRAMATICAL","OPERACION_LOGICA->  OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL",""); ingresarRegla(regla);
		$$ = new OperacionLogica($1,$3,$2,@1.first_line, @1.first_column);
	}
;

SIMBOLOS_LOGICOS:
	and1{
		$$ = Operador.AND;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_LOGICOS->  and1",""); ingresarRegla(regla);
	}
	| or1{
		$$ = Operador.OR;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_LOGICOS->  or1",""); ingresarRegla(regla);
	}
;



OPERACION_RELACIONAL :
		OPERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA{
		$$ = new OperacionRelacional($1,$3,$2,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_RELACIONAL->  OPERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA",""); ingresarRegla(regla);
		}
		|OPERACION_ARITMETICA{
		$$ = $1;
		var regla = new Regla("GRAMATICAL","OPERACION_RELACIONAL->  OPERACION_ARITMETICA",""); ingresarRegla(regla);
		}
;

SIMBOLOS_RELACIONALES:
	mayorque{
		$$ = Operador.MAYOR_QUE;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  mayorque",""); ingresarRegla(regla);
	}
	| menorque{
		$$ = Operador.MENOR_QUE;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  menorque",""); ingresarRegla(regla);
	}
	| mayorIgual{
		$$ = Operador.MAYOR_IGUAL;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  mayorIgual",""); ingresarRegla(regla);
	}
	| menorIgual{
		$$ = Operador.MENOR_IGUAL;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  menorIgual",""); ingresarRegla(regla);
	}
	| igual{
		$$ = Operador.IGUAL;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  igual",""); ingresarRegla(regla);
	}
	| diferenteQue{
		$$ = Operador.DIFERENTE_QUE;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  diferenteQue",""); ingresarRegla(regla);
	}
;


OPERACION_ARITMETICA: 
	OPERACION_ARITMETICA '+' OPERACION_ARITMETICA
		{$$ = new OperacionAritmetica($1,$3,Operador.SUMA,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA mas OPERACION_ARITMETICA","retorna nueva operacion aritmetica suma; "); ingresarRegla(regla);
		}
    | OPERACION_ARITMETICA '-' OPERACION_ARITMETICA
		{$$ = new OperacionAritmetica($1,$3,Operador.RESTA,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA menos OPERACION_ARITMETICA","retorna nueva operacion aritmetica resta; "); ingresarRegla(regla);
		}
    | OPERACION_ARITMETICA asterisco OPERACION_ARITMETICA
		{$$ = new OperacionAritmetica($1,$3,Operador.MULTIPLICACION,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA dividir OPERACION_ARITMETICA","retorna nueva operacion aritmetica division; "); ingresarRegla(regla);
		}
    | OPERACION_ARITMETICA dividir OPERACION_ARITMETICA
		{$$ = new OperacionAritmetica($1,$3,Operador.DIVISION,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> parizq OPERACION_ARITMETICA parder","retorna operacionAritmetica;"); ingresarRegla(regla);
		}
    | OPERACION_ARITMETICA modulo OPERACION_ARITMETICA
		{$$ = new OperacionAritmetica($1,$3,Operador.MODULO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA modulo OPERACION_ARITMETICA","retorna nueva operacion\n aritmetica modulo"); ingresarRegla(regla);
		}
    | parizq OPERACION_ARITMETICA parder
		{$$ = $2; 
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> parizq OPERACION_ARITMETICA parder","retorna operacionAritmetica;"); ingresarRegla(regla);
		}
    | TIPOIGUALAR
		{$$ = $1; 
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> TIPOIGUALAR","retorna tipoIgualar; "); ingresarRegla(regla);
		}
;



TIPOIGUALAR:
	entero{
		$$ = new Dato(Number($1), @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> entero","retorna nevo dato entero;"); ingresarRegla(regla);
	}
	| decimal {
		$$ = new Dato(Number($1), @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> decimal","retorna nuevo dato decimal;"); ingresarRegla(regla);

	}
	| arroba SIGUIENTE_ARROBA{
		$$ = new Arroba($2, @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> SIGUIENTE_ARROBA","retira nueva arroba;"); ingresarRegla(regla);

	}
	| cadena{
		$$ = new Dato($1, @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> cadena",""); ingresarRegla(regla);

	}
	| CONSULTAS{
		 $$ = $1;
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> CONSULTAS",""); ingresarRegla(regla);

	}
	| METODOS{
		$$ = $1; 
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> METODOS",""); ingresarRegla(regla);
	}
;
