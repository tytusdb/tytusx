

%{
	
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
	const {Error} = require('../../Scripts/Errores/Error.js');
    const {Primitivo} = require("../../Scripts/Arboles/Primitivo");
    const {Operacion, Operador} = require("../../Scripts/Arboles/Operacion");
    const {ObjetoNodo} = require("../../Scripts/Arboles/ObjetoNodo");
    const {Atributo} = require("../../Scripts/clasesXML/Atributo");
	//const {Nodo} = require("../../Scripts/clasesXML/Nodo");

	var AUX=0;
	var etiquetas=[];
	function escribirLista(primitivos) {
		var texto = '';
		primitivos.forEach(function (element) {
			texto = texto + " " + element.valor;
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
			const errorSEM = Error( linea, columna, 'semantico','xmldesc', nombre);
			errorSemantico.push(errorSEM);
			console.log(error);
			return false;
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
	ENCABEZADO ABRIR_ELEMENTO ETIQUETA EOF	 {return $1;}
	//< id ETIQUETA
	|ABRIR_ELEMENTO ETIQUETA EOF	 {return $1;}
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

/*    <?xml version="1.0" encoding="UTF-8"?>    */
ENCABEZADO : 
	menosque c_interroga xml version igual QUOTES TIPO_DATO QUOTES encoding igual QUOTES FORMAT QUOTES c_interroga masque 
;

FORMAT : 
	UTF 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| ASCII {$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| ISO 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
;



ABRIR_ELEMENTO : 
	//< identificador 
	menosque identificador 				{$$=$1; etiquetas.push($2);}
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
																	 }
																	}
	// </id>
	| masque CONTENIDO_INTERNO  div identificador masque			{ if(validarEtiqueta($4, @1.first_line, @1.first_column)){	
																		if($3[1]=='texto'){
																			$$ = new ObjetoNodo($4 ,$2, @1.first_line, @1.first_column, [], []);
																		}else{
																			$$ = new ObjetoNodo($4 ,'', @1.first_line, @1.first_column, [], $2);
																		}  
																		etiquetas.pop();
																	 }
																	}

	| ATRIBUTOS div masque 											{$$ = []; etiquetas.pop();}

	| div masque 													{$$ = []; etiquetas.pop();}
;

ATRIBUTOS : 
	ATRIBUTO A_PRIMA  	{$$=[$1]; $$= $$.concat($2);}
;

A_PRIMA : 
	ATRIBUTO A_PRIMA 	{$$=[$1]; $$ = $$.concat($2);}
	| 					{$$=[];}
;

 
ATRIBUTO : 
	//identificador = "ATRIBUTO"
	identificador igual QUOTES C_ATRIBUTO QUOTES {$$= new Atributo( $1, $4, @1.first_line, @1.first_column);}
;

C_ATRIBUTO : 
	TIPOCONTENIDO C_A_PRIMA {$$=[$1]; $$=$$.concat($2);}
;


C_A_PRIMA :
	TIPOCONTENIDO C_A_PRIMA {$$=[$1]; $$= $$.concat($2);}
	| 						{$$=[];}
;

L_ELEMENTOS :
	//< identificador ETIQUETA
	ELEMENTO L_E_PRIMA {$$=[$1]; $$=$$.concat($2);}
;

L_E_PRIMA : 
	//< identificador ETIQUETA L_E_PRIMA 
	ELEMENTO L_E_PRIMA  {$$=[$1]; $$=$$.concat($2);}
	//
	| menosque 			{$$=[];}
; 

ELEMENTO : 
	//< identificador ETIQUETA
	ABRIR_ELEMENTO 	ETIQUETA 	{$$=$2;}
;

CONTENIDO_INTERNO : 
	 CONTENIDO_ETIQUETA  	{$$ = [$1, 'texto'];}
	|  L_ELEMENTOS 			{$$ = [$1,'objetos'];}
;


CONTENIDO_ETIQUETA : 
	// id id id id id  $$ = new Objeto($2,contenido, $3,[], @1.first_line, @1.first_column);
	TIPOCONTENIDO C_E_PRIMA		{$$=[$1]; $$=  $$.concat($2);var contenido =  escribirLista($$); $$= contenido} 
;

C_E_PRIMA : 
	TIPOCONTENIDO C_E_PRIMA  	{$$=[$1]; $$= $$.concat($2);  }
	|  menosque					{$$=[]; }
;


TIPOCONTENIDO :
	TIPO_DATO 		{$$ = $1;}
	| SIGNOS 		{$$ = $1;}
	| SPECIALCHARS 	{$$ = $1;}
;

C_TEXTO : 
	TIPO_DATO C_T_PRIMA	{$$=[$1];  $$ = $$+$2; } 
;

C_T_PRIMA : 
	TIPO_DATO C_T_PRIMA {$$ = $1+' '+ $2;}
	| 					{$$ = [];}		
;

SPECIALCHARS : 
	lessthan		{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|graterthan		{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|ampersand		{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|simplequote	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|doublequote	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|colon		    {$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|underscore		{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
;

TIPO_DATO : 
	identificador	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|decimal		{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	|entero			{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
;

SIGNOS : 
	mas 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| menos {$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| por 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| div 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
;

QUOTES : 
	comilla 	{$$ = new Primitivo($1, @1.first_line, @1.first_column); }
	| apostrofe {$$ = new Primitivo($1, @1.first_line, @1.first_column); };

