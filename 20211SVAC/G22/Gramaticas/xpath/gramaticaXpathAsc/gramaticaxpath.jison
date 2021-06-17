
%{
	const {Error} = require('../../Scripts/Errores/Error.js');
	var erroresLexicos = [];
	var variables=[];
	var erroresSintacticos = [];
	var errorSemantico=[];
	
%}

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

.                       { //en caso de que sea otro caracter no listado anteriormente, marcar error. 
							console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
							var errorLex = new Error( linea, columna, 'Lexico','XpathAscendente', " ");
							erroresLexicos.push( errorLex) ;	
						}
/lex

//Importaciones 
%{

	const {Dato} = require("./Scripts/ClasesXpath/Dato");
	const {OperacionAritmetica} = require("./Scripts/ClasesXpath/OperacionAritmetica");
	const {Operador} = require("./Scripts/ClasesXpath/Operador");
	const {OperacionRelacional} = require("./Scripts/ClasesXpath/OperacionRelacional");
	const {OperacionLogica} = require("./Scripts/ClasesXpath/OperacionLogica");
	const {Predicado} = require("./Scripts/ClasesXpath/Predicado");
	const {IdSimple} = require("./Scripts/ClasesXpath/IdSimple");
	const {IdCompuesto} = require("./Scripts/ClasesXpath/IdCompuesto");
	const {SimbolosXpath} = require("./Scripts/ClasesXpath/SimbolosXpath");
	const {TiposXpath} = require("./Scripts/ClasesXpath/TiposXpath");
	const {Metodo} = require("./Scripts/ClasesXpath/Metodo");
	const {Funcion} = require("./Scripts/ClasesXpath/Funcion");
	const {Arroba} = require("./Scripts/ClasesXpath/Arroba");
	const {diagonalDobleC} = require("./Scripts/ClasesXpath/diagonalDobleC");
	const {diagonalSimpleS} = require("./Scripts/ClasesXpath/diagonalSimpleS");


if (!('id1' in yy)) {
	yy.id1 = 0;
	yy.dot1 = 'graph{'+'\n';
}

if (!('id2' in yy)) {
	yy.id2 = 0;
	yy.dot1 = 'graph{'+'\n';
}


	function unirErrores(){
			erroresGramar[0]= erroresLexicos ;
			erroresGramar[1]= erroresSintacticos;
			erroresGramar[2]=errorSemantico;
		
		console.log(erroresGramar.length);
		console.log(erroresGramar[0].length);
		console.log(erroresGramar[1].length);
		console.log(erroresGramar[2].length);
	}

%}


/********************************************************* SINTACTICO ASCENDENTE *****************************************************/
%start S

%% /* Definición de la gramática */

S :
	RUTAS EOF
	{ 
		$$ = $1; 
		//return $$; 
	    prompt("DOT:",yy.dot1+'}');
	    prompt("DOT:",yy.dot2+'}');
	}

;


RUTAS :
	RUTAS concatenacion CONSULTAS
	 	{ 	$1.push($3); 
			$$ = $1;
		}
	| CONSULTAS 
		{$$ = [$1];}
	
;

CONSULTAS:
	 CONSULTAS CONSULTA
	 	{ 	$1.push($2); 
			$$ = $1;
		}
	| CONSULTA
		{$$ = [$1];}
	|
	error CONSULTA
		{
			console.error('Este es un error Sintactico: ' + yytext + ', en la linea: ' + @1.first_line + ', en la columna: ' + @1.first_column); 
			var erroresSint = new Error(@1.first_line, @1.first_column , 'Lexico','XpathAscendente', " ");
			erroresSintacticos.push( erroresSint) ;
		}
	
;

CONSULTA :
	DIAGONALES  
		{$$=$1;}
	| TIPO_ID
		{$$=$1;}
	| punto//antes debe de haber un /id/  //id/ etc, sino error semantico
		{$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);}
	| dosPuntosConsecutivos  //antes debe de haber un /id/ o //id/ etc, sino error semantico 
		{$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);}
	| FUNCION 
		{$$=$1;}
	
;


DIAGONALES:
	diagonalDoble SIMBOLOS   
		{ $$ = new diagonalDobleC($2, @1.first_line, @1.first_column); }
	| diagonal SIMBOLOS 
		{ $$ = new diagonalSimpleS($2, @1.first_line, @1.first_column); }
;

SIMBOLOS:  
	arroba SIGUIENTE_ARROBA  
		{ $$ = new Arroba($2, @1.first_line, @1.first_column); }
	| asterisco //a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones
		{$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);}
	| punto//antes debe de haber un /id/  //id/ etc, sino error semantico
		{$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);}
	| dosPuntosConsecutivos  //antes debe de haber un /id/ o //id/ etc, sino error semantico 
		{$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);}
	| FUNCION
		{$$=$1}
	| METODOS
		{$$=$1}
	| TIPO_ID
		{$$=$1}

;

SIGUIENTE_ARROBA :  //selecciona atributos *-> todos, o todos con un id
	identificador   
		{ $$ = new Dato($1, @1.first_line, @1.first_column); }
	| asterisco   
		{$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);}

;

FUNCION :
	funcionNode
		{$$ = new Funcion(TiposXpath.FUNCION_NODE,@1.first_line, @1.first_column);}	
	| funcionText
		{$$ = new Funcion(TiposXpath.FUNCION_TEXT,@1.first_line, @1.first_column);}	
	|funcionLast
		{$$ = new Funcion(TiposXpath.FUNCION_LAST,@1.first_line, @1.first_column);}	
	|funcionPosition
		{$$ = new Funcion(TiposXpath.FUNCION_POSITION,@1.first_line, @1.first_column);}	
;

METODOS: //no puede venir sin antes especificar un nodo , no a la par de un id, puede venir despues de alguna diagonal o dentro del arreglo
	PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO
		{$$ = new Metodo($1,$4,@1.first_line, @1.first_column);}
;

PALABRA_RESERVADA:
	ancestor1
		{$$=TiposXpath.METODO_ANCESTOR;}
	| ancestor_or_self1	
		{$$=TiposXpath.METODO_ANCESTOR_OR_SELF;}
	| attribute1
		{$$=TiposXpath.METODO_ATRIBUTE;}
	| child1
		{$$=TiposXpath.METODO_CHILD;}
	| descendant1
		{$$=TiposXpath.METODO_DESCENDANT;}
	| descendant_or_self1	
		{$$=TiposXpath.METODO_METODO_DESCENDANT_OR_SELF;}
	| following1
		{$$=TiposXpath.METODO_FOLLOWING;}
	| following_sibling1	
		{$$=TiposXpath.METODO_FOLLOWING_SIGLING;}
//	| namespace -> no se toma en cuenta
	| parent1
		{$$=TiposXpath.METODO_PARENT;}
	| preceding1
		{$$=TiposXpath.METODO_PRECEDING;}
	| preceding_sibling1	
		{$$=TiposXpath.METODO_PRECEDING_SIBLING;}
	| self1	
		{$$=TiposXpath.METODO_SELF;}
;

	
SIGUIENTE_METODO:
	FUNCION
		{$$=$1}
	| TIPO_ID 
		{$$=$1}
	| asterisco //a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones
		{$$ = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);}
	| punto
		{$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);}
	| dosPuntosConsecutivos 
		{$$ = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);}

;

TIPO_ID :
	identificador  //bookstore
		{$$ = new IdSimple($1,@1.first_line, @1.first_column);}
	| identificador ARREGLOS_ID   // booksotre[ operaciones ]
		{$$ = new IdCompuesto($1,$2,@1.first_line, @1.first_column);}

;

ARREGLOS_ID : 
	ARREGLOS_ID ARREGLO_ID
		{ 	$1.push($2); 
			$$ = $1;
		}
	| ARREGLO_ID 
		{$$ = [$1];}

;

ARREGLO_ID:
	corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado
		{$$ = new Predicado($2,@1.first_line, @1.first_column);}
;

OPERACIONES_ARREGLO:
	OPERACION_LOGICA
		{$$ = $1;}

	| OPERACION_RELACIONAL
		{$$ = $1;}

;

OPERACION_LOGICA:
	OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL
		{$$ = new OperacionLogica($1,$3,$2,@1.first_line, @1.first_column);}
;

SIMBOLOS_LOGICOS:
	and1
		{$$ = Operador.AND;}
	| or1
		{$$ = Operador.OR;}
;


OPERACION_RELACIONAL :
	OPERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA
		{$$ = new OperacionRelacional($1,$3,$2,@1.first_line, @1.first_column);}
	|OPERACION_ARITMETICA
		{$$ = $1;}
;

SIMBOLOS_RELACIONALES:
	mayorque
		{$$ = Operador.MAYOR_QUE;}
	| menorque
		{$$ = Operador.MENOR_QUE;}
	| mayorIgual
		{$$ = Operador.MAYOR_IGUAL;}
	| menorIgual
		{$$ = Operador.MENOR_IGUAL;}
	| igual
		{$$ = Operador.IGUAL;}
	| diferenteQue
		{$$ = Operador.DIFERENTE_QUE;}
;


OPERACION_ARITMETICA :
	OPERACION_ARITMETICA mas T1
		{$$ = new OperacionAritmetica($1,$3,Operador.SUMA,@1.first_line, @1.first_column);}
	| OPERACION_ARITMETICA menos T1
		{$$ = new OperacionAritmetica($1,$3,Operador.RESTA,@1.first_line, @1.first_column);}
	| T1 
		{$$ = $1;}
;

T1 : 
	T1 modulo T 
		{$$ = new OperacionAritmetica($1,$3,Operador.MODULO,@1.first_line, @1.first_column);}
	| T
		{$$ = $1;}
;

T : 
	T asterisco F 
		{$$ = new OperacionAritmetica($1,$3,Operador.MULTIPLICACION,@1.first_line, @1.first_column);}
	| T dividir F
		{$$ = new OperacionAritmetica($1,$3,Operador.DIVISION,@1.first_line, @1.first_column);}
	| F 
		{$$ = $1;}

;

F : 
	TIPOIGUALAR
		{$$ = $1;}
	| parizq OPERACION_ARITMETICA parder
		{$$ = $2;}
;

TIPOIGUALAR:
	entero
		{ $$ = new Dato(Number($1), @1.first_line, @1.first_column); }
	| decimal 
		{ $$ = new Dato(Number($1), @1.first_line, @1.first_column); }
	| cadena
		{ $$ = new Dato($1, @1.first_line, @1.first_column); }
	| CONSULTAS
		{ $$ = $1; }
	| arroba SIGUIENTE_ARROBA 
		{ $$ = new Arroba($2, @1.first_line, @1.first_column); }
	| METODOS 
		{ $$ = $1; }


;
