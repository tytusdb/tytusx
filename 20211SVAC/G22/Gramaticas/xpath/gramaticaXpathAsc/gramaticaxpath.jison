
%{
	const {Error} = require('../../Scripts/Errores/Error.js');
	var erroresLexicos = [];
	var variables=[];
	var erroresSintacticos = [];
	var errorSemantico=[];
	
%}

/********************************************************* LEXICO *****************************************************/
%{
	var erroresLexicos = [];
	var variables=[];
	var erroresSintacticos = [];
	var errorSemantico=[];
	var reglas=[];
	var erroresGramar = [];
%}
 
%lex
%{

	if (!('idCST' in yy)) {
		yy.idCST = 0;
		yy.dotCST = 'graph{'+'\n';
	}
	if (!('idAST' in yy)) {
		yy.idAST = 0;
		yy.dotAST = 'graph{'+'\n';
	}
	
%}
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

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
						erroresLexicos.push(new Error( yylloc._$.first_line ,  yylloc._$.first_column, 'sintactico','xmldesc', yytext));
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
	const {Error} = require('../../../Scripts/Errores/Error.js');
    const {Regla} = require("../../../Scripts/Arboles/Regla");
    //const {ObjetoNodo} = require("../../Scripts/Arboles/ObjetoNodo");
    //const {Atributo} = require("../../Scripts/clasesXML/Atributo");
	//const {Nodo} = require("../../Scripts/clasesXML/Nodo");\
	var AUXid=0;
	
	/*
	define('grammarXPATH',function () {
        return {
            getParser: function () {
                return gramaticaxpath;
            }
        };
    });*/
	const {Error} = require('../../../Scripts/Errores/Error.js');
    const {Regla} = require("../../../Scripts/Arboles/Regla");
    //const {ObjetoNodo} = require("../../Scripts/Arboles/ObjetoNodo");
    //const {Atributo} = require("../../Scripts/clasesXML/Atributo");
	//const {Nodo} = require("../../Scripts/clasesXML/Nodo");\
	var AUXid=0;
		
	function unirErrores(){
		erroresGramar[0]= erroresLexicos ;
		erroresGramar[1]= erroresSintacticos;
		erroresGramar[2]=errorSemantico;
		
		console.log(erroresGramar.length);
		console.log(erroresGramar[0].length+'errores lexicos');
		console.log(erroresGramar[1].length+'errores sintacticos');
		console.log(erroresGramar[2].length +'errores semanticos');
	}

	function ingresarRegla(regla){
		if(reglas.length>0){
			var reglas2=[];
			reglas2.push(regla);
			reglas= reglas2.concat(reglas);
			console.log('agregando regla'+reglas.length+' --- '+regla.getProduccion());
		}else{
			reglas.push(regla);
			console.log('agregando regla'+reglas.length);
		}
	}
%}

/********************************************************* SINTACTICO ASCENDENTE *****************************************************/
%start S

%% /* Definición de la gramática */

S :
	RUTAS EOF
	{ 
			//AST
		$$[1]=$1[1];

		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'S'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n}';
		//reglas semanticas
		//$$[0] = $1[0]; 
		var regla = new Regla("GRAMATICAL","S-> RUTAS EOF",""); ingresarRegla(regla);
		console.log("DOT:",yy.dotAST+'}');
		console.log('-------------------------');
		console.log("DOT:",yy.dotAST+'}');
		unirErrores();
		$$ = $1[0]; 
		return $$; 
	}
	|error { 
			console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
			var error =  new Error( this._$.first_line ,  this._$.first_column, 'sintactico','xmldesc', yytext);
			erroresSintacticos.push(error); unirErrores(); 
	}
;


RUTAS :
	RUTAS concatenacion CONSULTAS
	 	{ 	
		//AST
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+$2.yytext+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;
		//CST
		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'RUTAS'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'concatenacion'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo2+' [label="'+$2.yy.text+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;
		//REGLAS SEMANTICAS	 
		//$1[0].push($3[0]); 
		//$$[0] = $1[0];
		$1[0].push($3[0]); 
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","RUTAS-> RUTAS concatenacion CONSULTAS",""); ingresarRegla(regla);
		}
	| CONSULTAS 
		{
			//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'RUTAS'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = [$1[0]];
		var regla = new Regla("GRAMATICAL","RUTAS-> CONSULTAS",""); ingresarRegla(regla);
		}
;

CONSULTAS:
	 CONSULTAS CONSULTA
	 	{ 	
		//AST
		var padre=  yy.idAST+' [label="'+'CONSULTAS'+'"];'+'\n'; 
		yy.dotAST+= padre+' [label="'+$1[1]+'"];'+'\n'; 
		yy.dotAST+= padre+' [label="'+$2[1]+'"];'+'\n'; 
		$$[1]=padre;
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTAS'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		yy.dotCST += yy.idCST+'--'+$2[2]+';'+'\n';
		//reglas gram
		$1[0].push($2[0]); 
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","CONSULTA-> CONSULTAS CONSULTA",""); ingresarRegla(regla);
		}
	| CONSULTA
		{
			//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTAS'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = [$1[0]];
		var regla = new Regla("GRAMATICAL","CONSULTA-> CONSULTA",""); ingresarRegla(regla);
		}
	|
	error diagonales
		{
			console.error('Este es un error Sintactico: ' + yytext + ', en la linea: ' + @1.first_line + ', en la columna: ' + @1.first_column); 
			var erroresSint = new Error(@1.first_line, @1.first_column , 'Lexico','XpathAscendente', " ");
			erroresSintacticos.push( erroresSint) ;
		}
;

CONSULTA :
	DIAGONALES  
	{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTA'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		
		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","CONSULTA-> DIAGONALES",""); ingresarRegla(regla);
	}
	| TIPO_ID
	{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTA'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","CONSULTA-> TIPO_ID",""); ingresarRegla(regla);
	}
	| punto
	{
		//AST
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 
		//CST
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'punto'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","CONSULTA-> punto",""); ingresarRegla(regla);
	}
	| dosPuntos
	{
		//AST
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 
		//CST
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'dosPuntos'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","CONSULTA-> dosPuntos",""); ingresarRegla(regla);
	}
	| FUNCION
	{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'CONSULTA'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","CONSULTA-> FUNCION",""); ingresarRegla(regla);
	}
;


DIAGONALES:
	diagonalDoble SIMBOLOS  
	{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'DIAGONALES'+'"];'+'\n'; 
		var hijo =++yy.idAST;
		yy.dotCST+= hijo+' [label="'+'//'+'"];'+'\n'; 

		yy.dotAST += padre+'--'+hijo+';'+'\n';
		yy.dotAST += padre+'--'+$2[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'DIAGONALES'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'diagonalDoble'+'"];'+'\n'; 
		var hijo1 =++yy.idCST;
		yy.dotCST+= hijo1+' [label="'+$1.yytext+'"];'+'\n'; 
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo1+';'+'\n';
		$$[2]=padre;

		 $$[0] = new diagonalDobleC($2[0], @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","DIAGONALES-> diagonalDoble SIMBOLOS","crear nodos AST;\n Crear nodos CST;\n Return newDiagonalDoble;"); ingresarRegla(regla);
	} 
	| diagonal SIMBOLOS 
	{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'DIAGONALES'+'"];'+'\n'; 
		var hijo =++yy.idAST;
		yy.dotCST+= hijo+' [label="'+'/'+'"];'+'\n'; 

		yy.dotAST += padre+'--'+hijo+';'+'\n';
		yy.dotAST += padre+'--'+$2[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'DIAGONALES'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'diagonal'+'"];'+'\n'; 
		var hijo1 =++yy.idCST;
		yy.dotCST+= hijo1+' [label="'+$1.yytext+'"];'+'\n'; 
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo1+';'+'\n';
		$$[2]=padre;

		 $$[0] = new diagonalSimpleS($2[0], @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","DIAGONALES-> diagonal SIMBOLOS","crear nodos AST, crear nodos AST, retornar diagramas"); ingresarRegla(regla);
	}
;



SIMBOLOS:  
	arroba SIGUIENTE_ARROBA  {
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'SIMBOLOS'+'"];'+'\n'; 
		var hijo =++yy.idAST;
		yy.dotCST+= hijo+' [label="'+'arroba'+'"];'+'\n'; 

		yy.dotAST += padre+'--'+hijo+';'+'\n';
		yy.dotAST += padre+'--'+$2[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'arroba'+'"];'+'\n'; 
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';
		$$[2]=padre;

		 $$[0] = new Arroba($2[0], @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> arroba SIGUIENTE_ARROBA",""); ingresarRegla(regla);
	} 
	| asterisco   {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.padre+' [label="'+'SIMBOLOS'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'asterisco'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> asterisco",""); ingresarRegla(regla);
	}
	| dosPuntosConsecutivos {//antes debe de haber un /id/ o //id/ etc, sino error semantico{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.padre+' [label="'+'SIMBOLOS'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'dosPuntosConsecutivos'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> dosPuntosConsecutivos",""); ingresarRegla(regla);
	}
	| punto {//antes debe de haber un /id/  //id/ etc, sino error semantico{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> punto",""); ingresarRegla(regla);
	}
	| FUNCION{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> FUNCION",""); ingresarRegla(regla);
	}
	| METODOS{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> TIPO_ID",""); ingresarRegla(regla);
	}
	| TIPO_ID{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","SIMBOLOS-> TIPO_ID",""); ingresarRegla(regla);
	}
;


SIGUIENTE_ARROBA :  //selecciona atributos *-> todos, o todos con un id
	identificador   {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 
		
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIGUIENTE_ARROBA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'identificador'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		
		$$[0] = new Dato(yytext, @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","SIGUIENTE_ARROBA-> identificador",""); ingresarRegla(regla);
	}
	| asterisco   {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIGUIENTE_ARROBA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'asterisco'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_ARROBA-> asterisco",""); ingresarRegla(regla);
	}
;

FUNCION :
	funcionNode{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'FUNCION'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'funcionNode'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Funcion(TiposXpath.FUNCION_NODE,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionNode",""); ingresarRegla(regla);
	}
	| funcionText{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'FUNCION'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'funcionText'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Funcion(TiposXpath.FUNCION_TEXT,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionText",""); ingresarRegla(regla);
	}
	|funcionLast{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'FUNCION'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'funcionLast'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Funcion(TiposXpath.FUNCION_LAST,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionLast",""); ingresarRegla(regla);
	}
	|funcionPosition{
		var regla = new Regla("GRAMATICAL","FUNCION-> funcionPosition",""); ingresarRegla(regla);
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'FUNCION'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'funcionPosition'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Funcion(TiposXpath.FUNCION_POSITION,@1.first_line, @1.first_column);
	}
;

METODOS: //no puede venir sin antes especificar un nodo , no a la par de un id, puede venir despues de alguna diagonal o dentro del arreglo
	PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO {
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'::'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'METODOS'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'mas'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'::'+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;

		$$[0] = new Metodo($1[0],$4[0],@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","METODOS-> PALABRA_RESERVADA  dosPuntos dosPuntos SIGUIENTE_METODO",""); ingresarRegla(regla);
	}
;

PALABRA_RESERVADA:
	ancestor1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'ancestor1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]=TiposXpath.METODO_ANCESTOR;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> ancestor1",""); ingresarRegla(regla);
	}
	| ancestor_or_self1	{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'ancestor_or_self1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0] =TiposXpath.METODO_ANCESTOR_OR_SELF;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> ancestor_or_self1",""); ingresarRegla(regla);
	}
	| attribute1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'attribute1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]=TiposXpath.METODO_ATRIBUTE;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> attribute1",""); ingresarRegla(regla);
	}
	| child1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'child1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0]=TiposXpath.METODO_CHILD;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> child1",""); ingresarRegla(regla);
	}
	| descendant1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'descendant1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0]=TiposXpath.METODO_DESCENDANT;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> descendant1",""); ingresarRegla(regla);
	}
	| descendant_or_self1	{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'descendant_or_self1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0] =TiposXpath.METODO_METODO_DESCENDANT_OR_SELF;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following1",""); ingresarRegla(regla);
	}
	| following1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'following1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0]=TiposXpath.METODO_FOLLOWING;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following1",""); ingresarRegla(regla);
	}
	| following_sibling1	{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'following_sibling1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0]=TiposXpath.METODO_FOLLOWING_SIGLING;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> following_sibling1",""); ingresarRegla(regla);
	}
	| parent1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'parent1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0]=TiposXpath.METODO_PARENT;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding1",""); ingresarRegla(regla);
	}
	| preceding1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'preceding1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]=TiposXpath.METODO_PRECEDING;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding1",""); ingresarRegla(regla);
	}
	| preceding_sibling1	{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'preceding_sibling1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]=TiposXpath.METODO_PRECEDING_SIBLING;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> preceding_sibling1",""); ingresarRegla(regla);
	}
	| self1	{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'self1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]=TiposXpath.METODO_SELF;
		var regla = new Regla("GRAMATICAL","PALABRA_RESERVADA-> self1",""); ingresarRegla(regla);
	}
;

	
SIGUIENTE_METODO:
	FUNCION {
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'FUNCION'+'"];'+'\n'; 
		
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> FUNCION",""); ingresarRegla(regla);
	}
	| TIPO_ID {
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'SIGUIENTE_METODO'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0]=$1[0];
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto",""); ingresarRegla(regla);
	}
	| asterisco {//a partir de aqui verificar que sea logico para ver si se toma o no estas 3 producciones{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIGUIENTE_METODO'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'asterisco'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.ASTERISCO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto",""); ingresarRegla(regla);
	}
	| punto {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIGUIENTE_METODO'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'punto'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		
		$$[0] = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> punto","return nuevo tipoSImboloXPATH"); ingresarRegla(regla);
	}
	| dosPuntos {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'$$ = new SimbolosXpath(TiposXpath.PUNTO,@1.first_line, @1.first_column);SIGUIENTE_METODO'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'dosPuntos'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new SimbolosXpath(TiposXpath.DOSPUNTOSCONSECUTIVOS,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","SIGUIENTE_METODO-> dosPuntos",""); ingresarRegla(regla);
	}
;

TIPO_ID :
	identificador  {//bookstore{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'PALABRA_RESERVADA'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'identificador'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0] = new IdSimple($1[0],@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","ARREGLO_ID-> identificador","return idSimple"); ingresarRegla(regla);
	}
	| identificador ARREGLOS_ID  { // booksotre[ operaciones ]{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		var hijo =++yy.idAST;
		yy.dotCST+= hijo+' [label="'+$1.yytext+'"];'+'\n'; 

		yy.dotAST += padre+'--'+hijo+';'+'\n';
		yy.dotAST += padre+'--'+$2[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'TIPO_ID'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'identificador'+'"];'+'\n'; 
		var hijo1 =++yy.idCST;
		yy.dotCST+= hijo1+' [label="'+$2.yytext+'"];'+'\n'; 
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo1+';'+'\n';
		$$[2]=padre;

		$$[0] = new IdCompuesto($1[0],$2[0],@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","ARREGLO_ID-> identificador ARREGLOS_ID",""); ingresarRegla(regla);
	}
;

ARREGLOS_ID : 
	ARREGLOS_ID ARREGLO_ID{
		//AST
		$$[1]=$1[1];
		//CST
		var padre=++yy.idCST;
		yy.dotCST+= padre+' [label="'+'ARREGLOS_ID'+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';
		
		$1[0].push($2[0]); 
		$$[0] = $1[0]
		var regla = new Regla("GRAMATICAL","ARREGLO_ID-> ARREGLOS_ID ARREGLO_ID","agregar Arreglo_ID a arreglos,\n return arrreglos;"); ingresarRegla(regla);
	}
	| ARREGLO_ID {
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'ARREGLOS_ID'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		var regla = new Regla("GRAMATICAL","ARREGLO_ID->  corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado",""); ingresarRegla(regla);
		$$[0] = [$1[0]];
	}
;

ARREGLO_ID:
	corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado{
		//AST
		$$[1]=$2[1];
		//CST
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'F'+'"];'+'\n';  
		var hijo1 =++yy.idCST;										
		yy.dotCST+= hijo1+' [label="'+'corcheteAbierto'+'"];'+'\n';			 
		var hijo12 =++yy.idCST;										
		yy.dotCST+= hijo12+' [label="'+'['+'"];'+'\n';				
		var hijo2 =++yy.idCST;										
		yy.dotCST+= hijo2+' [label="'+'corcheteCerrado'+'"];'+'\n';			
		var hijo22 =++yy.idCST;										
		yy.dotCST+= hijo22+' [label="'+']'+'"];'+'\n';				

		yy.dotCST +=padre+'--'+hijo1+';'+'\n';						
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';	
		yy.dotCST += padre+'--'+hijo2+';'+'\n';						
		yy.dotCST += hijo1+'--'+hijo12+';'+'\n';			
		yy.dotCST += hijo2+'--'+hijo22+';'+'\n';						
		$$[2]=padre;

		$[0] = new Predicado($2[0],@1.first_line, @1.first_column);	
		var regla = new Regla("GRAMATICAL","ARREGLO_ID->  corcheteAbierto OPERACIONES_ARREGLO corcheteCerrado","return new Predicado"); ingresarRegla(regla);
	}
;

OPERACIONES_ARREGLO:
	OPERACION_LOGICA{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'OPERACIONES_ARREGLO'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","OPERACIONES_ARREGLO->  OPERACION_LOGICA ","return OPERACION_LOGICA"); ingresarRegla(regla);
	}
	| OPERACION_RELACIONAL{
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'OPERACIONES_ARREGLO'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","OPERACIONES_ARREGLO->  OPERACION_RELACIONAL ","return OPERACION_RELACIONAL"); ingresarRegla(regla);
	}
;

OPERACION_LOGICA:
	OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL{
		//AST=
		yy.dotAST += $2[1]+'--'+$1[1]+';'+'\n';
		yy.dotAST += $2[1]+'--'+$3[1]+';'+'\n';
		//CST
		$$[2]=++yy.idCST;OPERACION_LOGICA
		yy.dotCST+= yy.idCST+' [label="'+'OPERACION_LOGICA'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		yy.dotCST += yy.idCST+'--'+$2[2]+';'+'\n';
		yy.dotCST += yy.idCST+'--'+$3[2]+';'+'\n';

		$$[0] = new OperacionLogica($1[0],$3[0],$2[2],@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_LOGICA->  OPERACION_RELACIONAL SIMBOLOS_LOGICOS OPERACION_RELACIONAL",""); ingresarRegla(regla);
	}
;

SIMBOLOS_LOGICOS:
	and1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_LOGICOS'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'and1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		$$[0] = Operador.AND;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_LOGICOS->  and1",""); ingresarRegla(regla);
	}
	| or1{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_LOGICOS'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'or1'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0]= Operador.OR;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_LOGICOS->  or1",""); ingresarRegla(regla);
	}
;




SIMBOLOS_RELACIONALES:
	mayorque{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'mayorIgual'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  mayorque",""); ingresarRegla(regla);
	}
	| menorque{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'mayorIgual'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  menorque",""); ingresarRegla(regla);
	}
	| mayorIgual{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'mayorIgual'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  mayorIgual",""); ingresarRegla(regla);
	}
	| menorIgual{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'menorIgual'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  menorIgual",""); ingresarRegla(regla);
	}
	| igual{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'igual'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  igual",""); ingresarRegla(regla);
	}
	| diferenteQue{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'SIMBOLOS_RELACIONALES'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'diferenteQue'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;
		var regla = new Regla("GRAMATICAL","SIMBOLOS_RELACIONALES->  diferenteQue",""); ingresarRegla(regla);
	}
;


OPERACION_ARITMETICA :
	OPERACION_ARITMETICA mas T1{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'-'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'OPERACION_ARITMETICA'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'mas'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo2+' [label="'+$2.yy.text+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;

		$$[0] = new OperacionAritmetica($1[0],$3[0],Operador.SUMA,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA mas T1","crear nodos AST; crear nodos CST; Return nuevaOperacion Aritmetica SUMA;"); ingresarRegla(regla);
	}
	| OPERACION_ARITMETICA menos T1{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'-'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'OPERACION_ARITMETICA'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'menos'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo2+' [label="'+$2.yy.text+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;
		$$[0] = new OperacionAritmetica($1[0],$3[0],Operador.RESTA,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> OPERACION_ARITMETICA menos T1","crear nodos AST; crear nodos CST; Return nuevaOperacion Aritmetica RESTA;"); ingresarRegla(regla);
	}
	| T1 {
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'OPERACION_ARITMETICA'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","OPERACION_ARITMETICA-> T1 ","crear nodos AST; crear nodos CST; Return T1"); ingresarRegla(regla);
	}
;

T1 : 
	T1 modulo T {
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'modulo'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'T1'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'modulo'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+$2.yytext+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;
		$$[0] = new OperacionAritmetica($1[0],$3[0],Operador.MODULO,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","T1-> T1 modulo T",""); ingresarRegla(regla);
	}
	| T{
		$$[1]=$1[1];
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'T1'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		var regla = new Regla("GRAMATICAL","T1-> T",""); ingresarRegla(regla);
		$[0] = $1[0];
	}
;

T : 
	T asterisco F {
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'asterisco'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'T'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'asterisco'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+$2.yy.text+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;
		var regla = new Regla("GRAMATICAL","T-> T asterisco F ",""); ingresarRegla(regla);
	}
	| T dividir F{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'dividir'+'"];'+'\n'; 
		yy.dotAST += padre+'--'+$1[1]+';'+'\n';
		yy.dotAST += padre+'--'+$3[1]+';'+'\n';
		$$[1]=padre;

		var padre =++yy.idCST;
		yy.dotCST+= padre+' [label="'+'T'+'"];'+'\n'; 
		var hijo =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+'dividir'+'"];'+'\n'; 
		var hijo2 =++yy.idCST;
		yy.dotCST+= hijo+' [label="'+$2.yy.text+'"];'+'\n'; 
		yy.dotCST += padre+'--'+$1[2]+';'+'\n';
		yy.dotCST += padre+'--'+hijo+';'+'\n';
		yy.dotCST += padre+'--'+$3[2]+';'+'\n';
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';
		$$[2]=padre;

		$$[0] = new OperacionAritmetica($1[0],$3[0],Operador.DIVISION,@1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","T-> T dividir F",""); ingresarRegla(regla);
	}
	| F {
		$$[1]=$1[1];

		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'T'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","T-> F","devolver nodoAAST, crear NodoCST, devolver F;"); ingresarRegla(regla);
	}
;

F : 
	TIPOIGUALAR {
		
		$$[1]=$1[1];

		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'F'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
	
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","F-> TIPOIGUALAR",""); ingresarRegla(regla);
	}
	| parizq OPERACION_ARITMETICA parder {
		//AST
		$$[1]=$2[1];
		//CST
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'F'+'"];'+'\n';  
		var hijo1 =++yy.idCST;										
		yy.dotCST+= hijo1+' [label="'+'parizq'+'"];'+'\n';			 
		var hijo12 =++yy.idCST;										
		yy.dotCST+= hijo12+' [label="'+'('+'"];'+'\n';				
		var hijo2 =++yy.idCST;										
		yy.dotCST+= hijo2+' [label="'+'parder'+'"];'+'\n';			
		var hijo22 =++yy.idCST;										
		yy.dotCST+= hijo22+' [label="'+')'+'"];'+'\n';				

		yy.dotCST +=padre+'--'+hijo1+';'+'\n';						
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';	
		yy.dotCST += padre+'--'+hijo2+';'+'\n';						
		yy.dotCST += hijo1+'--'+hijo12+';'+'\n';			
		yy.dotCST += hijo2+'--'+hijo22+';'+'\n';						
		$$[2]=padre;		
		$$[0] = $2[0];
		var regla = new Regla("GRAMATICAL","F-> parizq OPERACION_ARITMETICA parder",""); ingresarRegla(regla);
	}
;

TIPOIGUALAR:
	entero{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= padre+' [label="'+'TIPO_IGUALAR'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'entero'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Dato(Number($1[0]), @1.first_line, @1.first_column);
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> entero",""); ingresarRegla(regla);
	}
	| decimal {
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.padre+' [label="'+'TIPO_IGUALAR'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'decimal'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Dato(Number($1[0]), @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> decimal",""); ingresarRegla(regla);
	}
	| arroba SIGUIENTE_ARROBA{
		var padre =++yy.idAST;
		yy.dotAST+= padre+' [label="'+'SIMBOLOS'+'"];'+'\n'; 
		var hijo =++yy.idAST;
		yy.dotCST+= hijo+' [label="'+'arroba'+'"];'+'\n'; 

		yy.dotAST += padre+'--'+hijo+';'+'\n';
		yy.dotAST += padre+'--'+$2[1]+';'+'\n';
		$$[1]=padre;
		
		
		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'TIPOIGUALAR'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'arroba'+'"];'+'\n';			// yydotCST += 6 [label='arroba'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+'@'+'"];'+'\n';				// yydotCST += 7 [label='@'];

		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += padre+'--'+$2[2]+';'+'\n';						//	yydotCST+= 5 -- 4
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotcst+= 6 -- 7
		$$[2]=padre;

		$$[0] = new Arroba($2[0], @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> SIGUIENTE_ARROBA",""); ingresarRegla(regla);												//return 5;
	}
	| cadena{
		$$[1]=++yy.idAST;
		yy.dotAST+= yy.idAST+' [label="'+yytext+'"];'+'\n'; 

		var padre=++yy.idCST;//padre = 5;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_IGUALAR'+'"];'+'\n';  // yydotCST += 5 [label='TIPOIGUALAR'];
		var hijo =++yy.idCST;										// hijo = 6; 
		yy.dotCST+= hijo+' [label="'+'cadena'+'"];'+'\n';			// yydotCST += 6 [label='cadena'];
		var hijo2 =++yy.idCST;										// hijo2 = 7; 
		yy.dotCST+= hijo2+' [label="'+yy.text+'"];'+'\n';				// yydotCST += 7 [label='@'];
		yy.dotCST +=padre+'--'+hijo+';'+'\n';						//	yydotCST+= 5 -- 6
		yy.dotCST += hijo+'--'+hijo2+';'+'\n';						//	yydotCST+= 6 -- 7
		$$[2]= padre;

		$$[0] = new Dato($1[0], @1.first_line, @1.first_column); 
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> cadena",""); ingresarRegla(regla);
	}
	| CONSULTAS{
		$$[1]=$1[1];

		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_IGUALAR'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> CONSULTAS",""); ingresarRegla(regla);
	}
	| METODOS{
		$$[1]=$1[1];

		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'TIPO_IGUALAR'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';

		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","TIPOIGUALAR-> METODOS",""); ingresarRegla(regla);
	}
;

OPERACION_RELACIONAL :
		OPERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA{
			yy.dotAST += $2[1]+'--'+$1[1]+';'+'\n';
			yy.dotAST += $2[1]+'--'+$3[1]+';'+'\n';
			$$[1]=padre;
			var padre =++yy.idCST;
			yy.dotCST+= padre+' [label="'+'OPERACION_ARITMETICA'+'"];'+'\n'; 
			var hijo =++yy.idCST;
			yy.dotCST+= hijo+' [label="'+'mas'+'"];'+'\n'; 
			var hijo2 =++yy.idCST;
			yy.dotCST+= hijo2+' [label="'+$2.yy.text+'"];'+'\n'; 
			yy.dotCST += padre+'--'+$1[2]+';'+'\n';
			yy.dotCST += padre+'--'+hijo+';'+'\n';
			yy.dotCST += padre+'--'+$3[2]+';'+'\n';
			yy.dotCST += hijo+'--'+hijo2+';'+'\n';
			$$[2]=padre;

			$$[0] = new OperacionRelacional($1[0],$3[0],$2[0],@1.first_line, @1.first_column);
			var regla = new Regla("GRAMATICAL","OPERACION_RELACIONAL->  PERACION_ARITMETICA SIMBOLOS_RELACIONALES OPERACION_ARITMETICA","");
			ingresarRegla(regla);
		}
		| OPERACION_ARITMETICA {
		//AST
		$$[1]=$1[1];
		//CST
		$$[2]=++yy.idCST;
		yy.dotCST+= yy.idCST+' [label="'+'OPERACION_RELACIONAL'+'"];'+'\n'; 
		yy.dotCST += yy.idCST+'--'+$1[2]+';'+'\n';
		$$[0] = $1[0];
		var regla = new Regla("GRAMATICAL","OPERACION_RELACIONAL->  OPERACION_ARITMETICA",""); ingresarRegla(regla);
		}
;
