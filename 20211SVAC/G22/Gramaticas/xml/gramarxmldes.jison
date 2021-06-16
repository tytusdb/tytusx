

%{
	//const {Error} = require('../../Scripts/Errores/Error.js');
	var erroresLexicos = [];
	var variables=[];
	var erroresSintacticos = [];
	var errorSemantico=[];
	
%}


/* DefINIción Léxica */
%lex

%options case-insensitive

%s                                  comment
%%

"<!--"                                this.begin('comment');
<comment>"-->"                       this.popState(); console.log('comentario');
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

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
[a-zA-Z_][a-zA-Z0-9_ñÑóáéíúÁÉÍÓÚ]*  return 'identificador';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

//SECCION DE IMPORTS
%{
	
	define(function () {
    return {
        getParser: function () {
            return gramarxmldes;
        }
    };
});
    //const {Primitivo} = require("../../Scripts/Arboles/Primitivo");
    //const {ObjetoNodo} = require("../../Scripts/Arboles/ObjetoNodo");
    //const {Atributo} = require("../../Scripts/clasesXML/Atributo");
	//const {Nodo} = require("../../Scripts/clasesXML/Nodo");\
	var AUXid=0;
	var etiquetas=[];
	function escribirLista(primitivos) {
		var texto = '';
		primitivos.forEach(function (element) {
			texto = texto + " " + element;
		});
		console.log(texto);
		return texto;
	}

	function validarEtiqueta(nombre, linea, columna){
		if(etiquetas[etiquetas.length - 1] == nombre){
			//console.log(nombre +' == '+ etiquetas[etiquetas.length - 1]);
			//console.log("iguales");
			return true;
		}else{
			//console.log(nombre +' == '+ etiquetas[etiquetas.length - 1]);
			console.log("error semantico"+linea + columna);
			var errorSEM = new Error( linea, columna, 'semantico','xmldesc', nombre);
			errorSemantico.push( errorSEM) ;
			console.log(errorSEM);
			return false;
		}
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

	function ingresarRegla(regla){
		if(reglas.length>0){
			var reglas2=[];
			reglas2.push(regla);
			reglas= reglas2.concat(reglas);
			console.log('agregando regla'+reglas.length);
		}else{
			reglas.push(regla);
			console.log('agregando regla'+reglas.length);
		}
	}
%}

/* Asociación de operadores y precedencia */

%left 'mas' 'menos'
%left 'por' 'div'
%left Umenos

%start XML_GRAMAR

%% /* Definición de la gramática */
XML_GRAMAR :  
	ENCABEZADO ABRIR_ELEMENTO ETIQUETA EOF	 { unirErrores();$$[0]=$3; $$[2]=$2; ; 
											var regla = new Regla("XML_GRAMAR","XML_GRAMAR-> ENCABEZADO ABRIR_ELEMENTO ETIQUETA EOF","return [ETIQUETA][ENCABEZADO];");ingresarRegla(regla);
	}
	//< id ETIQUETA
	|ABRIR_ELEMENTO ETIQUETA EOF	 		 { unirErrores(); 
											var regla = new Regla("XML_GRAMAR","XML_GRAMAR-> ABRIR_ELEMENTO ETIQUETA EOF","return ETIQUETA;");ingresarRegla(regla);
											$$=$2;
							}
	| error { 
			console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
			var error =  new Error( this._$.first_line ,  this._$.first_column, 'sintactico','xmldesc', yytext);
			erroresSintacticos.push(error); unirErrores(); 
			}
;

/*    <?xml version="1.0" encoding="UTF-8"?>    */
ENCABEZADO : 
	menosque c_interroga xml version igual QUOTES TIPO_DATO QUOTES encoding igual QUOTES FORMAT QUOTES c_interroga masque {
		$$=$12;
		var regla = new Regla("GRAMATICAL","ENCABEZADO-> menosque c_interroga xml version igual QUOTES TIPO_DATO QUOTES encoding igual QUOTES FORMAT QUOTES c_interroga masque","return FORMAT;");ingresarRegla(regla);
	}
;

FORMAT : 
	UTF 	{$$ = $1; 
			var regla = new Regla("GRAMATICAL","FORMAT-> UTF","return UTF;");ingresarRegla(regla);}
	| ASCII {$$ = $1; 
			var regla = new Regla("GRAMATICAL","FORMAT-> ASCII","return ASCII;");ingresarRegla(regla);}
	| ISO 	{$$ = $1;
			var regla = new Regla("GRAMATICAL","FORMAT-> ISO","return ISO;");ingresarRegla(regla);}

;



ABRIR_ELEMENTO : 
	//< identificador 
	menosque identificador 				{$$=$2; etiquetas.push($2);
										var regla = new Regla("GRAMATICAL","ABRIR_ELEMENTO-> menosque identificador","return identificador;");ingresarRegla(regla);}

; 


ETIQUETA : 
	// ATRIBUTOS >  </id>
	ATRIBUTOS masque CONTENIDO_INTERNO  div identificador masque	{ if(validarEtiqueta($5, @1.first_line, @1.first_column)){	
		
																		if($3[1]=='texto'){
																						//     id, text,   linea,        columna,  atributo, objeto
																		 	$$ = new ObjetoNodo($5 ,$3, @1.first_line, @1.first_column, $1, []);
																		}else{
																			$$ = new ObjetoNodo($5,'', @1.first_line, @1.first_column, $1, $3);
																		} 
																		 etiquetas.pop();
																		var regla = new Regla("GRAMATICAL","ETIQUETA-> ATRIBUTOS masque CONTENIDO_INTERNO  div identificador masque"," validarEtiqueta(); si(CONTENIDO_INTERNO[0]=texto){\n	 nuevo objetoNodo(etiquetaNombre, texto, ATRIBUTOS)\n}else{		nuevo objetoNodo(etiquetaNombre, ATRIBUTOS, CONTENIDO_INTERNO)\n};\n etquetas.pop();");
																		 
																	 }else{
																		var regla = new Regla("GRAMATICAL","ETIQUETA-> ATRIBUTOS masque CONTENIDO_INTERNO  div identificador masque"," validarEtiqueta(); ERROR SEMANTICO");
																	 }
																	 ingresarRegla(regla);
																	}
	// </id>
	| masque CONTENIDO_INTERNO  div identificador masque			{ if(validarEtiqueta($4, @1.first_line, @1.first_column)){	
																		if($2[1]=='texto'){
																			$$ = new ObjetoNodo($4 ,$2, @1.first_line, @1.first_column, [], []);
																		}else{
																			$$ = new ObjetoNodo($4 ,'', @1.first_line, @1.first_column, [], $2);
																		}  
																		etiquetas.pop();
																		var regla = new Regla("GRAMATICAL","ETIQUETA-> masque CONTENIDO_INTERNO  div identificador masque"," validarEtiqueta(); si(CONTENIDO_INTERNO[0]=texto){\n	 nuevo objetoNodo(etiquetaNombre, texto)\n}else{		nuevo objetoNodo(etiquetaNombre, arreglo atributos)\n};\n etquetas.pop();");
																	 }else{
																		var regla = new Regla("GRAMATICAL","ETIQUETA-> masque CONTENIDO_INTERNO  div identificador masque"," validarEtiqueta(); ERROR SEMANTICO");
																	 }
																		ingresarRegla(regla);
																	}

	| ATRIBUTOS div masque 	{ var etiquetaN= etiquetas.pop(); $$ = new ObjetoNodo(etiquetaN ,'', @1.first_line, @1.first_column, $1, []); 
							var regla = new Regla("GRAMATICAL","ETIQUETA-> ATRIBUTOS div masque","etiquetaNombre=etquetas.pop(); nuevo objetoNodo(etiquetaNombre, arreglo atributos);\n");ingresarRegla(regla);}
							

	| div masque 			{$$ = [];  var etiquetaN= etiquetas.pop();$$ = new ObjetoNodo(etiquetaN ,'', @1.first_line, @1.first_column, [], []);
							var regla = new Regla("GRAMATICAL","ETIQUETA-> div masque","etiquetaNombre=etquetas.pop(); \n return new ObjetoNodo(etiquetaNombre);\n agregarRegla());");ingresarRegla(regla);}

;

ATRIBUTOS : 
	ATRIBUTO A_PRIMA  	{$$=[$1]; $$= $$.concat($2);
						var regla = new Regla("GRAMATICAL","ATRIBUTOS-> ATRIBUTO A_PRIMA ","ATRIBUTOS=[ATRIBUTO];\n ATRIBUTOS= ATRIBUTOS.agregar(A_PRIMA);\nreturn C_ATRIBUTO;");ingresarRegla(regla);}

;

A_PRIMA : 
	ATRIBUTO A_PRIMA 	{$$=[$1]; $$ = $$.concat($2);
						var regla = new Regla("GRAMATICAL","A_PRIMA-> ATRIBUTO A_PRIMA ","A_PRIMA=[TIPOCONTENIDO];\n A_PRIMA= C_A_PRIMA.agregar(C_A_PRIMA);\nreturn C_A_PRIMA;");ingresarRegla(regla);}
	| 					{$$=[];
						var regla = new Regla("GRAMATICAL","A_PRIMA-> ATRIBUTO A_PRIMA","return [];");ingresarRegla(regla);}
;

 
ATRIBUTO : 
	//identificador = "ATRIBUTO"
	identificador igual QUOTES C_ATRIBUTO QUOTES {$$= new Atributo( $1, $4, @1.first_line, @1.first_column);
						var regla = new Regla("GRAMATICAL","ATRIBUTO-> identificador igual QUOTES C_ATRIBUTO QUOTES","return nuevoAtributo(identificador, C_ATRIBUTO);");ingresarRegla(regla);}

;

C_ATRIBUTO : 
	TIPOCONTENIDO C_A_PRIMA {$$=[$1]; $$=$$.concat($2);
						var regla = new Regla("GRAMATICAL","C_ATRIBUTO-> ELEMENTO L_E_PRIMA ","C_ATRIBUTO=[ELEMENTO];\n C_ATRIBUTO= C_ATRIBUTO.agregar(C_A_PRIMA);\nreturn C_ATRIBUTO;");ingresarRegla(regla);}
;


C_A_PRIMA :
	TIPOCONTENIDO C_A_PRIMA {$$=[$1]; $$= $$.concat($2);
						var regla = new Regla("GRAMATICAL","C_A_PRIMA-> TIPOCONTENIDO C_A_PRIMA","C_A_PRIMA=[TIPOCONTENIDO];\n C_A_PRIMA= C_A_PRIMA.agregar(C_A_PRIMA);\nreturn C_A_PRIMA;");ingresarRegla(regla);}

	| {$$=[];
						var regla = new Regla("GRAMATICAL","C_A_PRIMA-> epsilon ","return [];");ingresarRegla(regla);}

;

L_ELEMENTOS :
	//< identificador ETIQUETA
	ELEMENTO L_E_PRIMA {$$=[$1]; $$=$$.concat($2);
						var regla = new Regla("GRAMATICAL","L_ELEMENTOS-> ELEMENTO L_E_PRIMA ","L_ELEMENTOS=[ELEMENTO];\n L_ELEMENTOS= L_ELEMENTOS.agregar(L_E_PRIMA);\nreturn L_ELEMENTOS;");ingresarRegla(regla);}
	
;

L_E_PRIMA : 
	//< identificador ETIQUETA L_E_PRIMA 
	ELEMENTO L_E_PRIMA  {$$=[$1]; $$=$$.concat($2);
						var regla = new Regla("GRAMATICAL","L_E_PRIMA-> ELEMENTO L_E_PRIMA ","L_E_PRIMA=[ELEMENTO];\n L_E_PRIMA= L_E_PRIMA.agregar(L_E_PRIMA);\nreturn L_E_PRIMA;");ingresarRegla(regla);}
	//
	| menosque 			{$$=[];
						var regla = new Regla("GRAMATICAL","L_E_PRIMA-> menosque ","return [];");ingresarRegla(regla);}

; 

ELEMENTO : 
	//< identificador ETIQUETA
	ABRIR_ELEMENTO 	ETIQUETA 	{$$=$2;
							var regla = new Regla("GRAMATICAL","ELEMENTO-> ABRIR_ELEMENTO 	ETIQUETA","return ETIQUETA;");ingresarRegla(regla);}
	
;

CONTENIDO_INTERNO : 
	 CONTENIDO_ETIQUETA  	{$$ = [$1, 'texto'];
							var regla = new Regla("GRAMATICAL","CONTENIDO_INTERNO-> CONTENIDO_ETIQUETA","return CONTENIDO_ETIQUETA;");ingresarRegla(regla);}

	|  L_ELEMENTOS 			{$$ = [$1,'objetos'];
							var regla = new Regla("GRAMATICAL","CONTENIDO_INTERNO-> L_ELEMENTOS","return L_ELEMENTOS;");ingresarRegla(regla);}

;


CONTENIDO_ETIQUETA : 
	// id id id id id  $$ = new Objeto($2,contenido, $3,[], @1.first_line, @1.first_column);
	TIPOCONTENIDO C_E_PRIMA		{$$=[$1]; $$=  $$.concat($2);var contenido =  escribirLista($$); $$= contenido; console.log($$);} 
;

C_E_PRIMA : 
	TIPOCONTENIDO C_E_PRIMA  	{$$=[$1]; $$= $$.concat($2);  
								var regla = new Regla("GRAMATICAL","C_E_PRIMA-> TIPOCONTENIDO C_E_PRIMA","C_E_PRIMA=[TIPOCONTENIDO];C_E_PRIMA= C_E_PRIMA.agregar(C_E_PRIMA);\nreturn C_E_PRIMA;");ingresarRegla(regla);}
	|  menosque					{$$=[]; 
								var regla = new Regla("GRAMATICAL","C_E_PRIMA-> menosque","return []];");ingresarRegla(regla);}
	
;


TIPOCONTENIDO :
	TIPO_DATO 		{$$ = $1;
					var regla = new Regla("GRAMATICAL","TIPOCONTENIDO-> TIPO_DATO","return TIPO_DATO;");ingresarRegla(regla);}
	| SIGNOS 		{$$ = $1;
					var regla = new Regla("GRAMATICAL","TIPOCONTENIDO-> SIGNOS","return SIGNOS;");ingresarRegla(regla);}
	| SPECIALCHARS 	{$$ = $1;
					var regla = new Regla("GRAMATICAL","TIPOCONTENIDO-> SPECIALCHARS","return  SPECIALCHARS;");ingresarRegla(regla);}
;

C_TEXTO : 
	TIPO_DATO C_T_PRIMA	{$$=[$1];  $$ = $$+$2; 
						var regla = new Regla("GRAMATICAL","C_T_PRIMA-> TIPO_DATO C_T_PRIMA","C_T_PRIMA=[TIPO_DATO];\n C_T_PRIMA= C_T_PRIMA.agregar(C_T_PRIMA); \n return C_T_PRIMA;");ingresarRegla(regla);}
	 
;

C_T_PRIMA : 
	TIPO_DATO C_T_PRIMA {$$ = $1+' '+ $2;
						var regla = new Regla("GRAMATICAL","C_T_PRIMA-> TIPO_DATO C_T_PRIMA","return  concat(TIPO_DATO, C_T_PRIMA)");ingresarRegla(regla);}
	| 					{$$ = [];
						var regla = new Regla("GRAMATICAL","C_T_PRIMA-> epsilon","return  lessthan");ingresarRegla(regla);}		
;

SPECIALCHARS : 
	lessthan		{$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> lessthan","return  lessthan");ingresarRegla(regla);}
	|graterthan		{$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> ampersand","return  ampersand");ingresarRegla(regla);}
	|ampersand		{$$= $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> simplequote","return  simplequote");ingresarRegla(regla);}
	|simplequote	{$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> underscore","return  identificador");ingresarRegla(regla);}
	|doublequote	{$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> doublequote","return  doublequote");ingresarRegla(regla);}
	|colon		    {$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> colon","return  colon");ingresarRegla(regla);}
	|underscore		{$$ = $1; 
					var regla = new Regla("GRAMATICAL","SPECIALCHARS-> underscore","return  identificador");ingresarRegla(regla);}
;

TIPO_DATO : 
	identificador	{$$ = $1; 
					var regla = new Regla("GRAMATICAL","TIPO_DATO-> identificador","return  identificador");ingresarRegla(regla);}
	|decimal		{$$= $1; 
					var regla = new Regla("GRAMATICAL","TIPO_DATO-> decimal","return  decimal");ingresarRegla(regla);}
	|entero			{$$ = $1; 
					var regla = new Regla("GRAMATICAL","TIPO_DATO->  entero","return  entero");ingresarRegla(regla);}
;

SIGNOS : 
	mas 	{$$ =  $1; 
			var regla = new Regla("GRAMATICAL","SIGNOS-> mas","return  mas;"); ingresarRegla(regla);}
	| menos {$$ =  $1; 
			var regla = new Regla("GRAMATICAL","SIGNOS-> menos","return  menos;"); ingresarRegla(regla);}
	| por 	{$$ =  $1; 
			var regla = new Regla("GRAMATICAL","SIGNOS-> por","return  por;"); ingresarRegla(regla);}
	| div 	{$$ =$1; 
			var regla = new Regla("GRAMATICAL","SIGNOS-> div","return  div;");ingresarRegla(regla);}
;

QUOTES : 
	comilla 	{$$ = $1; 
					var regla = new Regla("GRAMATICAL","QUOTES->comilla","return comilla;"); ingresarRegla(regla);
				}
	| apostrofe {$$= $1.toString(); 
				var regla = new Regla("GRAMATICAL","QUOTES-> apostrofe","return apostrofe;"); ingresarRegla(regla);
				};

