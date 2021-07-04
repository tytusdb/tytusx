# -OCL2-AnalizadorXML
Analizador para XML
# Proyecto
---
## Manual De Usuario
----
#### **Tutorial de manejo de programa:**

+ Se cargan los archivos para el XML:
![abrirXML][Img1]
+ Se analiza la entrada, ya sea descendente o ascendente Para el XML:
![analizarXML][Img2]
+ Se generan los reportes requeridos XML:
![reporteXML][Img3]
+ Se cargan los archivos para el XPATH:
![abrirXPATH][Img4]
+ Se analiza la entrada, ya sea descendente o ascendente Para el XPATH:
![analizarXPATHL][Img5]
+ Se generan los reportes requeridos XPATH:
![reporteXPATH][Img6]
+ La salida del comando de Xpath, a la base de datos del XML se reflejan en la consola de salido:
![consola][Img7]


[Img1]: Imagenes/abrirXML.png "abrirXML"
[Img2]: Imagenes/analizarXML.png "analizarXML"
[Img3]: Imagenes/reporteXML.png "reporteXML"
[Img4]: Imagenes/abrirXPATH.png "abrirXPATH"
[Img5]: Imagenes/analizarXPATHL.png "analizarXPATHL"
[Img6]: Imagenes/reporteXPATH.png "reporteXPATH"
[Img7]: Imagenes/consola.png "consola"

## Manual De Tecnico
----
#### **Teoria **

----
#### **Gramaticas XML**
+ Ascendente:
----
 %{

	var ListaErrores=[];
	var ListaReporteGrl=[];
 %}

/* Definición Léxica */
%lex

%options case-insensitive
%x Comentario
%x Etiqueta

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"<!--"                {this.begin("Comentario"); }
<Comentario>[ \r\t]+  {}
<Comentario>\n        {}
<Comentario>"-->"     {this.popState();}
<Comentario>[^"-->"]+ {console.log("comentario: "+yytext)} 





\s+                                 /* skip whitespace */



"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'por';
"/"                         return 'division';

"<="                        return 'menor_igual';
">="                        return 'mayor_igual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'igual';

";"                         return 'ptcoma';
"."							return 'punto';
","							return 'coma';
"("                         return 'parizq';
")"                         return 'parder';
"?"                         return 'interr_cierra';
"'"							return 'apostofre'		
":"							return 'dos_puntos'
"#"							return 'numeral'

"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

"&lt;"						return'less_than';
"&gt;"						return'greater_than';
"&amp;"						return'ampersand';
"&apos;"					return'apostrophe';
"&quot;"					return'quotation_mark';

/* Number literals */



{stringliteral}                     return 'cadena'
{charliteral}                       return 'caracter'
[a-zA-Z_][a-zA-Z0-9_ñÑá-ü]*            return 'identificador';

//[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1] return 'identificador'

([a-zA-Z0-9_-]){1,16}               return 'alfanumerico'

(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'numero';


//ERROR LEXICO
.                                   {
										ListaErrores.push('Error Lexico,' + yytext + ',' + yylloc.first_line + ',' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//IMPORTS
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
%}

// PRESEDENCIA DE OPERADORES

%left 'lparen' 'rparen'


// PRODUCCIÓN INICIAL
%start INICIO

%%


// DEFINICION GRAMATICA
INICIO : ENCABEZADO RAICES EOF         { $$ = $2; ListaReporteGrl.push("INICIO -> ENCABEZADO RAICES" + "," + "ENCABEZADO.VAL, RAICES.VAL");
										var nodos = $$; var ecod = $1; var listRepor = ListaReporteGrl; var err = ListaErrores; 
										return {objetos:nodos, ecoding:ecod, listaRG:listRepor, errores:err};  }
;


//<?xml version="1.0" encoding="UTF-8"?>
ENCABEZADO: menor interr_cierra xml version igual cadena encoding igual cadena interr_cierra mayor    {$$ = $9; ListaReporteGrl.push("ENCABEZADO -> '<' '?' xml version '=' cadena encoding '=' cadena '?' '>'" + "," + "'<' '?' xml version '=' cadena encoding '=' cadena '?' '>'");}
;
// INICIO : RAICES EOF         { $$ = $1; return $$; }
// ;

RAICES:
	RAICES RAIZ         { $1.push($2); $$ = $1; ListaReporteGrl.push("RAICES -> RAICES RAIZ" + "," + "RAICES'.VAL = RAICES.VAL"); }
	| RAIZ              { $$ = [$1]; ListaReporteGrl.push("RAICES -> RAIZ" + "," + "RAICES.VAL = RAIZ.VAL"); } ;

RAIZ:
	OBJETO              { $$ = $1; ListaReporteGrl.push("RAIZ -> OBJETO" + "," + "RAIZ.VAL = OBJETO.VAL"); }
;

OBJETO:
	menor identificador LISTAATRIBUTOS mayor OBJETOS        menor division identificador mayor         { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); ListaReporteGrl.push("OBJETO -> menor identificador LISTAATRIBUTOS mayor OBJETOS menor division identificador mayor" + "," + "OBJETO.VAL = LISTAOBJETOS.ADD(OBJETO)"); }
    | menor identificador LISTAATRIBUTOS mayor LISTA_TEXTO  menor division identificador mayor         { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); ListaReporteGrl.push("OBJETO -> menor identificador LISTAATRIBUTOS mayor LISTA_TEXTO menor division identificador mayor" + "," + "OBJETO.VAL = LISTAATRIBUTOS.ADD(ATRIBUTO) + LISTA_TEXTO.VAL"); }
    | menor identificador LISTAATRIBUTOS division mayor                                                { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); ListaReporteGrl.push("OBJETO -> menor identificador LISTAATRIBUTOS division mayor" + "," + "OBJETO.VAL = LISTAATRIBUTOS.ADD(ATRIBUTO)"); }
;

LISTAATRIBUTOS: 
		ATRIBUTOS         { $$ = $1; ListaReporteGrl.push("LISTAATRIBUTOS -> ATRIBUTOS" + "," + "LISTAATRIBUTOS.VAL = ATRIBUTOS.VAL"); }
        |                 { $$ = []; ListaReporteGrl.push("LISTAATRIBUTOS -> e" + "," + "e"); }
;

ATRIBUTOS:
		ATRIBUTOS ATRIBUTO         { $1.push($2); $$ = $1; ListaReporteGrl.push("ATRIBUTOS -> ATRIBUTOS ATRIBUTO" + "," + "ATRIBUTOS'.VAL = ATRIBUTOS.VAL"); }
    	| ATRIBUTO                 { $$ = [$1]; ListaReporteGrl.push("ATRIBUTOS -> ATRIBUTO" + "," + "ATRIBUTOS.VAL = ATRIBUTOS.VAL"); } 
;

ATRIBUTO: 
		identificador igual cadena         { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); ListaReporteGrl.push("ATRIBUTO -> identificador igual cadena" + "," + "ATRIBUTO.VAL = cadena.lexval"); }
;

LISTA_TEXTO: 
			LISTA_TEXTO IDENTIFICADOR         { $1=$1 + ' ' +$2 ; $$ = $1; ListaReporteGrl.push("LISTA_TEXTO -> LISTA_TEXTO IDENTIFICADOR" + "," + "LISTA_TEXTO'.VAL = LISTA_TEXTO.VAL"); }
        	| IDENTIFICADOR                   { $$ = $1; ListaReporteGrl.push("LISTA_TEXTO -> IDENTIFICADOR" + "," + "LISTA_TEXTO.VAL = IDENTIFICADOR.VAL"); }
;

IDENTIFICADOR:
			identificador    { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> identificador" + "," + "IDENTIFICADOR.val = identificador.lexval"); }
			|alfanumerico    { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> alfanumerico" + "," + "IDENTIFICADOR.val = alfanumerico.lexval"); }
			|numero          { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> numero" + "," + "IDENTIFICADOR.val = numero.lexval"); }
			|decimal         { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> decimal" + "," + "IDENTIFICADOR.val = decimal.lexval"); }
			|cadena          { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> cadena" + "," + "IDENTIFICADOR.val = cadena.lexval"); }
			|caracter        { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> caracter" + "," + "IDENTIFICADOR.val = caracter.lexval"); }
			|less_than		 { $1 = "<"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> less_than" + "," + "IDENTIFICADOR.val = less_than.val, less_than.lexval = &lt;"); }
			|greater_than    { $1 = ">"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> greater_than" + "," + "IDENTIFICADOR.val = greater_than.val, greater_than.lexval = &gt;"); }
			|ampersand       { $1 = "&"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> ampersand" + "," + "IDENTIFICADOR.val = ampersand.val, ampersand.lexval = &amp;"); }
			|apostrophe      { $1 = "\'"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> apostrophe" + "," + "IDENTIFICADOR.val = apostrophe.val, apostrophe.lexval = &apos;"); }
			|quotation_mark  { $1 = "\""; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> quotation_mark" + "," + "IDENTIFICADOR.val = quotation_mark.val, quotation_mark.lexval = &quot;");}
			|mas			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|menos			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|coma 			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|ptcoma			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|punto			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|parizq			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|parder			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|apostofre		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|dos_puntos		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|numeral		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|xml 			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|version		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|ecoding		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
;



OBJETOS:
	OBJETOS OBJETO         { $1.push($2); $$ = $1; ListaReporteGrl.push("OBJETOS -> OBJETOS OBJETO" + "," + "OBJETOS'.VAL = OBJETOS.VAL"); }
	| OBJETO               { $$ = [$1]; ListaReporteGrl.push("OBJETOS -> OBJETO" + "," + "OBJETOS.VAL = OBJETO.VAL"); }
;
----
+ Descendente:
----
 %{

	var ListaErrores=[];
	var ListaReporteGrl=[];
	var LObjetos=[];
	var LTexto="";
 %}

/* Definición Léxica */
%lex

%options case-insensitive
%x Comentario
%x Etiqueta

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"<!--"                {this.begin("Comentario"); }
<Comentario>[ \r\t]+  {}
<Comentario>\n        {}
<Comentario>"-->"     {this.popState();}
<Comentario>[^"-->"]+ {console.log("comentario: "+yytext)} 





\s+                                 /* skip whitespace */



"</"						return 'menorDIV';

"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'por';
"/"                         return 'division';

"<="                        return 'menor_igual';
">="                        return 'mayor_igual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'igual';

";"                         return 'ptcoma';
"."							return 'punto';
","							return 'coma';
"("                         return 'parizq';
")"                         return 'parder';
"?"                         return 'interr_cierra';
"'"							return 'apostofre'		
":"							return 'dos_puntos'
"#"							return 'numeral'

"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

"&lt;"						return'less_than';
"&gt;"						return'greater_than';
"&amp;"						return'ampersand';
"&apos;"					return'apostrophe';
"&quot;"					return'quotation_mark';



/* Number literals */


{stringliteral}                     return 'cadena'
{charliteral}                       return 'caracter'
[a-zA-Z_][a-zA-Z0-9_ñÑá-ü]*            return 'identificador';

//[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1] return 'identificador'

([a-zA-Z0-9_-]){1,16}               return 'alfanumerico'

(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'numero';



//ERROR LEXICO
.                                   {
										ListaErrores.push('Error Lexico,' + yytext + ',' + yylloc.first_line + ',' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//IMPORTS
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
%}

// PRESEDENCIA DE OPERADORES

%left 'lparen' 'rparen'


// PRODUCCIÓN INICIAL
%start INICIO

%%


// DEFINICION GRAMATICA

INICIO : ENCABEZADO RAICES EOF     	{$$ = $2; ListaReporteGrl.push("INICIO -> ENCABEZADO RAICES" + "," + "ENCABEZADO.VAL, RAICES.VAL");
									var nodos = $$; var ecod = $1; var listRepor = ListaReporteGrl; var err = ListaErrores; 
									return {objetos:nodos, ecoding:ecod, listaRG:listRepor, errores:err};  }
;

ENCABEZADO: menor interr_cierra xml version igual cadena encoding igual cadena interr_cierra mayor		{$$ = $9; ListaReporteGrl.push("ENCABEZADO -> '<' '?' xml version '=' cadena encoding '=' cadena '?' '>'" + "," + "'<' '?' xml version '=' cadena encoding '=' cadena '?' '>'");}
;

RAICES:		
	RAIZ RAICESP		{$2.push($1); $$ = $2; ListaReporteGrl.push("RAICES -> RAIZ RACESP" + "," + "RAICESP.ADD(RAIZ.VAL), RAICES.VAL=RAICESP.VAL"); }
;

RAICESP:
	RAIZ RAICESP		{$2.push($1); $$ = $2; ListaReporteGrl.push("RAICESP -> RAIZ RACESP" + "," + "RAICESP.ADD(RAIZ.VAL), RAICESP.VAL=RAICESP.VAL"); }
	|					{$$ = []; ListaReporteGrl.push("RAICESP -> e" + "," + "e"); }
;

RAIZ:
	OBJETO  			{$$ = $1; ListaReporteGrl.push("RAIZ -> OBJETO" + "," + "RAIZ.VAL = OBJETO.VAL"); }
;


OBJETO:
	menor identificador LISTAATRIBUTOS OBJETOP	 {$$ = new Objeto($2,LTexto,@1.first_line, @1.first_column,$3,$4); LTexto="";
	ListaReporteGrl.push("OBJETO -> menor identificador LISTAATRIBUTOS OBJETOSP" + "," + "OBJETO.VAL = LISTAOBJETOS[].VAL, OBJETO.VAL = OBJETOP[].VAL"); }
;

OBJETOP:
	mayor OBJETOPP menorDIV identificador mayor		{$$=$2; ListaReporteGrl.push("OBJETO -> mayor OBJETOPP menorDIv identificador mayor" + "," + "OBJETOP.VAL = OBJETOPP[].VAL"); }
	|division mayor									{$$=[]; ListaReporteGrl.push("OBJETO -> division mayor" + "," + "OBJETOP.VAL = []"); }
;

OBJETOPP:
	OBJETOS 		{$$=$1; ListaReporteGrl.push("OBJETOPP -> OBJETOS" + "," + "OBJETOPP.VAL = OBJETOS[].VAL"); }
	|LISTA_TEXTO	{LTexto = $1; $$=[]; ListaReporteGrl.push("OBJETO -> LISTA_TEXTO" + "," + "OBJETOPP.VAL = [], LTexto.val = LISTA_TEXTO.VAL"); }
;



LISTAATRIBUTOS: 
		ATRIBUTOS       {$$ = $1; ListaReporteGrl.push("LISTAATRIBUTOS -> ATRIBUTOS" + "," + "LISTAATRIBUTOS.VAL = ATRIBUTOS[].VAL"); }
        |				{$$ = []; $$ = []; ListaReporteGrl.push("LISTAATRIBUTOS -> e" + "," + "e"); }
;


ATRIBUTOS:
		ATRIBUTO ATRIBUTOSP		{$2.push($1); $$ = $2; $2.push($1); $$ = $2; ListaReporteGrl.push("ATRIBUTOS -> ATRIBUTO ATRIBUTOSP" + "," + "ATRIBUTOSP.ADD(ATRIBUTO.VAL), ATRIBUTOS.VAL=ATRIBUTOSP.VAL"); }
;

ATRIBUTOSP:
		ATRIBUTO ATRIBUTOSP		{$2.push($1); $$ = $2; ListaReporteGrl.push("ATRIBUTOS -> ATRIBUTO ATRIBUTOSP" + "," + "ATRIBUTOSP.ADD(ATRIBUTO.VAL), ATRIBUTOS.VAL=ATRIBUTOSP.VAL"); }
		|						{$$ = []; ListaReporteGrl.push("ATRIBUTOSP -> e" + "," + "e"); }
;

ATRIBUTO: 
		identificador igual cadena 		{$$ = new Atributo($1, $3, @1.first_line, @1.first_column); ListaReporteGrl.push("ATRIBUTO -> identificador igual cadena" + "," + "ATRIBUTO.VAL = cadena.lexval"); }
;

LISTA_TEXTO:
		IDENTIFICADOR LISTA_TEXTOP		{$2 = $1 + ' ' + $2; $$ = $2; ListaReporteGrl.push("LISTA_TEXTO -> IDENTIFICADOR LISTA_TEXTOP" + "," + "LISTA_TEXTO.VAL"); }
;

LISTA_TEXTOP:
		IDENTIFICADOR LISTA_TEXTOP		{$2 = $1 + ' ' + $2; $$ = $2; ListaReporteGrl.push("LISTA_TEXTO -> IDENTIFICADOR LISTA_TEXTOP" + "," + "LISTA_TEXTO.VAL"); }
		|								{$$ = []; ListaReporteGrl.push("LISTA_TEXTOP -> e" + "," + "e"); }
;


IDENTIFICADOR:
			identificador    { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> identificador" + "," + "IDENTIFICADOR.val = identificador.lexval"); }
			|alfanumerico    { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> alfanumerico" + "," + "IDENTIFICADOR.val = alfanumerico.lexval"); }
			|numero          { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> numero" + "," + "IDENTIFICADOR.val = numero.lexval"); }
			|decimal         { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> decimal" + "," + "IDENTIFICADOR.val = decimal.lexval"); }
			|cadena          { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> cadena" + "," + "IDENTIFICADOR.val = cadena.lexval"); }
			|caracter        { $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> caracter" + "," + "IDENTIFICADOR.val = caracter.lexval"); }
			|less_than		 { $1 = "<"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> less_than" + "," + "IDENTIFICADOR.val = less_than.val, less_than.lexval = &lt;"); }
			|greater_than    { $1 = ">"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> greater_than" + "," + "IDENTIFICADOR.val = greater_than.val, greater_than.lexval = &gt;"); }
			|ampersand       { $1 = "&"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> ampersand" + "," + "IDENTIFICADOR.val = ampersand.val, ampersand.lexval = &amp;"); }
			|apostrophe      { $1 = "\'"; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> apostrophe" + "," + "IDENTIFICADOR.val = apostrophe.val, apostrophe.lexval = &apos;"); }
			|quotation_mark  { $1 = "\""; $$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> quotation_mark" + "," + "IDENTIFICADOR.val = quotation_mark.val, quotation_mark.lexval = &quot;");}
			|mas			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|menos			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|coma 			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|ptcoma			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|punto			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|parizq			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|parder			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|apostofre		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|dos_puntos		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|numeral		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}	
			|xml 			 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|version		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
			|ecoding		 {$$ = $1; ListaReporteGrl.push("IDENTIFICADOR -> simbolo" + "," + "IDENTIFICADOR.val = simbolo.lexval");}
;


OBJETOS:
	OBJETO OBJETOSP			{$2.push($1); $$ = $2; ListaReporteGrl.push("OBJETOS -> OBJETO OBJETOSP" + "," + "OBJETOSP.ADD(OBJETO.VAL), OBJETOS.VAL=OBJETOSP.VAL"); }
;

OBJETOSP:
	OBJETO OBJETOSP		{$2.push($1); $$ = $2; ListaReporteGrl.push("OBJETOS -> OBJETO OBJETOSP" + "," + "OBJETOSP.ADD(OBJETO.VAL), OBJETOS.VAL=OBJETOSP.VAL");}
	|					{$$ = []; ListaReporteGrl.push("OBJETOSP -> e" + "," + "e"); }
;

----

#### **Gramaticas XPATH**
+ Ascendente:
----
%{
    const Nodo = require('./Nodo');
    var arreglolexico = "Codigo:";

%}


%lex

%options case-insensitive

//----------------------Palabras Reservadas-------------

//escape principal
escapechar                          [\'\"\\bfnrtv]

//Componentes del String
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
//----String Formal
stringliteral                       \"{stringdouble}*\"

//Componentes del Char
acceptedcharssingle                 [^\'\\]+
stringsingle                        {escape}|{acceptedcharssingle}
//CharFormal
charliteral                         \'{stringsingle}*\'
//Digito
digit                               [0-9]+ 

//Comentario
acceptedcomment                      [^\:)\\]+
commentdouble                        {escape}|{acceptedcomment}
commentliteral                        \(\: {commentdouble} \:\)

%%


//----------------Palabras Reservadas
"ancestor-or-self"          return 'ancestor_or_self';
"descendant-or-self"        return 'descendant_or_self';
"following-sibling"         return 'following_sibling';
"namespace-node"            return 'namespace_node';
"preceding-sibling"         return 'preceding_sibling';
"ancestor"                  return 'ancestor';
"attribute"                 return 'attribute';
"child"                     return 'child';
"descendant"                return 'descendant';
"following"                 return 'following';
"parent"                    return 'parent';
"preceding"                 return 'preceding';
"self"                      return 'self';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"node"                      return 'node';
"text"                      return 'text';
"last"                      return 'last';
"position"                  return 'position';

//-------- Operadores Palabras
"div"                       return 'div_';
"or"                        return 'or_';
"and"                       return 'and_';
"mod"                       return 'mod_';
//-------- Operadores Simbolos-----------
"|"                         return 'simpleor';
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'mul';
"="                         return 'igual';
"!="                        return 'diferente';
"<"                         return 'menorq';
"<="                        return 'menorigual';
">"                         return 'mayorq';
">="                        return 'mayorigual';
"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchete';
"]"                         return 'rcorchete';
//----------Selectores-----------------
"//"                         return 'ddiagonal'; //Probar Esto
"/"                         return 'sdiagonal';
".."                         return 'dpunto';
"."                         return 'spunto';
"@"                         return 'arroba';
"::"                        return 'ddospuntos';

//----------Expresiones Regulares------------

{commentliteral}                     /*skip comment */
\s+                                 /* skip whitespace */
//Numeros Decimales
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DecimalLiteral';
//Numeros Enteros
{digit}                             return 'IntegerLiteral';

//Double
//( ({digit}"."[0-9]*)|("."{digit})  (e|E)(+|-)? {digit} )    return 'DoubleLiteral';


//String
{stringliteral}                     return 'StringLiteral';
//Char
{charliteral}                       return 'CharLiteral';
//Identificador
[a-zA-Z_][a-zA-Z0-9_ñÑá-ü]*            return 'identifier';

//error lexico
.                                   {
                                       console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                   }

<<EOF>>                     return 'EOF';

/lex

//SECCION DE IMPORTS
%{
       
   
%}


// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'sdiagonal','ddiagonal'
%left 'simpleor'
%left 'or_'
%left 'and_'
%left 'menorq' 'menorigual' 'mayorq' 'mayorigual' 'igual' 'diferente'
%left 'mas' 'menos'
%left 'div_' 'mul' 'mod_'
%left umenos

// DEFINIMOS PRODUCCIÓN INICIAL
%start XPATH
%%


/* Definición de la gramática de Alejandro */

XPATH: OPERACIONOR EOF    {   
                                   $$= new Nodo("INICIO","Xpath");
		                     $$.addHijos($1);
                                   return { ErrorLexico:arreglolexico,msj:"Analisis XPath Ascendenete Finalizado.\n.",diagramaAST:$$};
                     };




//                                          
//Bookstore/book/titulo | //Bookstore/book/titulo/pagina 

OPERACIONOR: OPERACIONOR simpleor OPERACIONOR            { 
                                                         $$ = new Nodo($2,"OPERACIONOR:simpleor");
                                                         $$.addHijos($1);
                                                         $$.addHijos($3);  
                                                         } 
              |PATHRELL1           { 
                                   $$ =$1; 
                                   } 
       ;


//                            //path1 //path2 //path3

PATHRELL1: PATHRELL1  sdiagonal PATHRELL1     { 
                                                 $$ = new Nodo($2,"PATHRELL1:sdiagonal");
                                                 $$.addHijos($1); 
                                                 $$.addHijos($3); 
                                              } 
       |PATHRELL1 ddiagonal  PATHRELL1           { 
                                                 $$ = new Nodo($2,"PATHRELL1:ddiagonal");
                                                 $$.addHijos($1); 
                                                 $$.addHijos($3); 
                                              } 
       
       |PATHRELL2                         { 
                                          $$ = $1;   
                                          }
       ; 

PATHRELL2:sdiagonal EXPRESION       {  
                                          $$ = new Nodo($1,"PATHRELL2:sdiagonal");   
                                          $$.addHijos($2);    
                                   }        
       |ddiagonal EXPRESION        {  
                                          $$ = new Nodo($1,"PATHRELL2:ddiagonal");  
                                          $$.addHijos($2); 
                                   }
       |EXPRESION                  {  
                                          $$ = $1;    
                                   }
       ;



// EXPRESION : RETONA UN VALOR    ---- INSTRUCCION : EJECUTA (REALIZA EL CALCULO)      	
EXPRESION:AXISNAME          {  
                            $$ = $1;   
                            }                                   
       |METODO              {  
                            $$ =$1;   
                            }
       |ACCES               {  
                            $$ = $1;   
                            }
       ;

ACCES:   identifier         {  
                            $$ = new Nodo($1,"ACCES:identificador");
                            }                                       // PRIMITIVO new primitivo expresion
       |arroba identifier   {  
                            $$ = new Nodo($1+$2,"ACCES:arrobaidentificador");
                              
                            }    // PRIMITIVOESP                              //ATRIBUTOE                     // INSTRUCCION retorna todos los atributos con el mismo nombre dentod de su padre
       |arroba mul          {  
                            $$ = new Nodo($1+$2,"ACCES:arrobamul");
                            }                                  //mul                     // INSTRUCCION retorna todos los atributos de la etiqueta padre
       //|mul {$$=$1;}
       |spunto              {  
                            $$ = new Nodo($1,"ACCES:spunto");    
                            }// retonos                                        // INSTRUCCION  .  retorna todos los nodos con el mismo nombre
       |dpunto              {  
                            $$ = new Nodo($1,"ACCES:dpunto");     
                            }// retonos                                       // INSTRUCCION   .. retorna el padre del nodo actual

       ;

//pendiente----------------------------------------
AXISNAME: NAMEAXIS ddospuntos  EXPRESION  {  
                                          $$ = new Nodo("Axis","AXISNAME:UNICO");
                                          $$.addHijos($1);
                                          $$.addHijos(new Nodo($2,"AXISNAME:dospuntos"));  
                                          $$.addHijos($3);    
                                          };


//TIPO NAMEAXIS enum   
NAMEAXIS:ancestor           {    
                             $$ = new Nodo($1,"NAMEAXIS:ancestor");
                            }                     
   |ancestor_or_self        {    
                             $$ = new Nodo($1,"NAMEAXIS:ancestor_or_self");
                            }            
   |attribute               {    
                             $$ = new Nodo($1,"NAMEAXIS:attribute");
                            }
   |child                   {    
                             $$ = new Nodo($1,"NAMEAXIS:child");
                            }
   |descendant              {    
                             $$ = new Nodo($1,"NAMEAXIS:descendant");
                            }
   |descendant_or_self      {    
                             $$ = new Nodo($1,"NAMEAXIS:descendant_or_self");
                            }
   |following               {    
                             $$ = new Nodo($1,"NAMEAXIS:following");
                            }
   |following_sibling       {    
                             $$ = new Nodo($1,"NAMEAXIS:following_sibling");
                            }
   |namespace_node          {    
                             $$ = new Nodo($1,"NAMEAXIS:namespace_node");
                            }
   |parent                  {    
                             $$ = new Nodo($1,"NAMEAXIS:parent");
                            }
   |preceding               {    
                             $$ = new Nodo($1,"NAMEAXIS:preceding");
                            }
   |preceding_sibling       {    
                             $$ = new Nodo($1,"NAMEAXIS:preceding_sibling");
                            }
   |self                    {    
                            $$ = new Nodo($1,"NAMEAXIS:self");
                            }
   ;

OPERACION:OPERACION mas OPERACION                {    
                                                 $$ = new Nodo($2,"OPERACION:mas");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION menos OPERACION                      {    
                                                 $$ = new Nodo($2,"OPERACION:menos");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);     
                                                 }
 |OPERACION mul OPERACION                        {    
                                                 $$ = new Nodo($2,"OPERACION:mul");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION div_ OPERACION                       {    
                                                 $$ = new Nodo($2,"OPERACION:div");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION igual OPERACION                      {    
                                                 $$ = new Nodo($2,"OPERACION:igual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION diferente OPERACION                  {    
                                                 $$ = new Nodo($2,"OPERACION:diferente");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION menorq OPERACION                     {    
                                                 $$ = new Nodo($2,"OPERACION:menorque");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION menorigual OPERACION                 {    
                                                 $$ = new Nodo($2,"OPERACION:menorigual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);       
                                                 }
 |OPERACION mayorq OPERACION                     {    
                                                  $$ = new Nodo($2,"OPERACION:mayorque");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION mayorigual OPERACION                 {    
                                                 $$ = new Nodo($2,"OPERACION:mayorigual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION or_ OPERACION                        {    
                                                 $$ = new Nodo($2,"OPERACION:or");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);   
                                                 }
 |OPERACION and_ OPERACION                       {    
                                                 $$ = new Nodo($2,"OPERACION:and");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION mod_ OPERACION                       {    
                                                  $$ = new Nodo($2,"OPERACION:mod");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERAD                                         {    
                                                 $$ = $1  
                                                 }
 |PATHRELL1                                      {    
                                                 $$ = $1   
                                                 }
 ;

OPERAD: //Primitivo
       DecimalLiteral       {    
                            $$ = new Nodo($1,"OPERAD:decimal");
                            }
       |IntegerLiteral      {    
                            $$ = new Nodo($1,"OPERAD:entero");
                            }
       |StringLiteral       {    
                            $$ = new Nodo($1,"OPERAD:cadenaS"); 
                            }
       |CharLiteral         {    
                            $$ = new Nodo($1,"OPERAD:cadenaC");
                            }
       
       ;

//INSTRUCCION
METODO: text lparen rparen  {$$ = new Nodo($1,"METODO:text");  
                            }
       |node lparen rparen  {$$ = new Nodo($1,"METODO:node");  
                            }
       |last lparen rparen{$$ = new Nodo($1,"METODO:last");  
                            }
       |position lparen rparen{$$ = new Nodo($1,"METODO:posicion");  
                            }
       |arroba identifier lcorchete OPERACION rcorchete {      
                                                               $$ = new Nodo($1+$2,"METODO:atributo");
                                                               $$.addHijos(new Nodo($2,"METODO:lcorchete"));
                                                               $$.addHijos($3);
                                                               $$.addHijos(new Nodo($4,"METODO:rcorchete"));
                                                        }   
                            
       |identifier lcorchete OPERACION rcorchete        {
                                                        $$ = new Nodo($1,"METODO:etiqueta");
                                                        $$.addHijos(new Nodo($2,"METODO:lcorchete"));
                                                        $$.addHijos($3);
                                                        $$.addHijos(new Nodo($4,"METODO:rcorchete"));
                                                        }   
       ;


----
+ Descendente:
----
%{

    const Nodito= require('./Nodito');
    var arreglolexico = "Codigo:";

 %}


%lex

//escape principal
escapechar                          [\'\"\\bfnrtv]

//Componentes del String
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
//----String Formal
stringliteral                       \"{stringdouble}*\"

//Componentes del Char
acceptedcharssingle                 [^\'\\]+
stringsingle                        {escape}|{acceptedcharssingle}
//CharFormal
charliteral                         \'{stringsingle}*\'
//Digito
digit                               [0-9]+ 

//Comentario
acceptedcomment                      [^\:)\\]+
commentdouble                        {escape}|{acceptedcomment}
commentliteral                        \(\: {commentdouble} \:\)

%%


//----------------Palabras Reservadas
"ancestor"                  return 'ancestor';
"ancestor-or-self"          return 'ancestor_or_self';
"attribute"                 return 'attribute';
"child"                     return 'child';
"descendant"                return 'descendant';
"descendant-or-self"        return 'descendant_or_self';
"following"                 return 'following';
"following-sibling"         return 'following_sibling';
"namespace-node"            return 'namespace_node';
"parent"                    return 'parent';
"preceding"                 return 'preceding';
"preceding-sibling"         return 'preceding_sibling';
"self"                      return 'self';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"node"                      return 'node';
"text"                      return 'text';
"last"                      return 'last';
"position"                  return 'position';

//-------- Operadores Palabras
"div"                       return 'div_';
"or"                        return 'or_';
"and"                       return 'and_';
"mod"                       return 'mod_';
//-------- Operadores Simbolos-----------
"|"                         return 'simpleor';
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'mul';
"="                         return 'igual';
"!="                        return 'diferente';
"<"                         return 'menorq';
"<="                        return 'menorigual';
">"                         return 'mayorq';
">="                        return 'mayorigual';
"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchete';
"]"                         return 'rcorchete';
//----------Selectores-----------------
"//"                         return 'ddiagonal'; //Probar Esto
"/"                         return 'sdiagonal';
".."                         return 'dpunto';
"."                         return 'spunto';

"@"                         return 'arroba';
"::"                        return 'ddospuntos';

//----------Expresiones Regulares------------

{commentliteral}                     /*skip comment */
\s+                                 /* skip whitespace */
//Numeros Decimales
(({digit}"."[0-9]*)|("."{digit}))  return 'DecimalLiteral';
//Numeros Enteros
{digit}                             return 'IntegerLiteral';


//Double
//( ({digit}"."[0-9]*)|("."{digit})  (e|E)(+|-)? {digit} )    return 'DoubleLiteral';

//Identificador
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';
//String
{stringliteral}                     return 'StringLiteral';
//Char
{charliteral}                       return 'CharLiteral';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF';

/lex

//SECCION DE IMPORTS
%{
       
        
    
%}


%left umul
 

// DEFINIMOS PRESEDENCIA DE OPERADORES

// DEFINIMOS PRODUCCIÓN INICIAL
%start XPATH
%%


/* Definición de la gramática de Alejandro */

XPATH: EXPR EOF{
                        $$= new Nodito("INICIO","Xpath");
		       //$$.addHijos($1);
                     return { ErrorLexico:arreglolexico,msj:"Analisis XPath Ascendenete Finalizado.\n.",diagramaAST:$$};
       
        };

EXPR: EXPRESIONSIMPLE   {    
                          
                        };

EXPRESIONSIMPLE: OREXPRESION;
//---------OR
OREXPRESION: ANDEXPRESION OREXPRESIONL1
        |ANDEXPRESION;


OREXPRESIONL1:OREXPRESIONL1 OREXPRESIONL2
                |OREXPRESIONL2;

OREXPRESIONL2: or_ ANDEXPRESION;
//--------AND
ANDEXPRESION:COMPARACIONEXPRESION ANDEXPRESIONL1
        |COMPARACIONEXPRESION
        ;
ANDEXPRESIONL1: ANDEXPRESIONL1 ANDEXPRESIONL2
        |ANDEXPRESIONL2;

ANDEXPRESIONL2:and_ COMPARACIONEXPRESION;

//COMPARACIONEXPRESION
COMPARACIONEXPRESION: STRINGCONCATENA COMPARACIONGENERAL STRINGCONCATENA
                     |STRINGCONCATENA  ;

//COMPARACION GENERAL

COMPARACIONGENERAL:igual
                |diferente
                |menorq
                |menorigual
                |mayorq
                |mayorigual
                ;

//STRINGCONCATENA

STRINGCONCATENA:SUMAEXPRESION;
//SUMAEXPRESION
SUMAEXPRESION:MULTIPLICACIONEXPRESION SUMAEXPRESIONL1
        |MULTIPLICACIONEXPRESION;

SUMAEXPRESIONL1:SUMAEXPRESIONL1 SUMAEXPRESIONL2
        |SUMAEXPRESIONL2
        ;
SUMAEXPRESIONL2:mas MULTIPLICACIONEXPRESION
                |menos MULTIPLICACIONEXPRESION
                ;

//MULTIPLICACION
MULTIPLICACIONEXPRESION:UNIONEXPRESION MULTIPLICACIONEXPRESIONL1
                        |UNIONEXPRESION
                        ;

MULTIPLICACIONEXPRESIONL1:MULTIPLICACIONEXPRESIONL1 MULTIPLICACIONEXPRESIONL2
                        |MULTIPLICACIONEXPRESIONL2;

MULTIPLICACIONEXPRESIONL2: mul UNIONEXPRESION 
                        |div_ UNIONEXPRESION
                        |mod_ UNIONEXPRESION
                        ;
//UNION EXPRESION

UNIONEXPRESION:INTERSECCINEXPRESION UNIONEXPRESIONL1
                |INTERSECCINEXPRESION
                |;

UNIONEXPRESIONL1: UNIONEXPRESIONL1 UNIONEXPRESIONL2
                |UNIONEXPRESIONL2;

UNIONEXPRESIONL2: simpleor INTERSECCINEXPRESION;

//INTERSECCION
INTERSECCINEXPRESION:INSTACIAEXPRESION;

//INSTACIAEXPRESION
INSTACIAEXPRESION:EXPRESIONUNARIA;
//EXPRESION UNARIA FALTA SIGNO MAS Y MENOS
EXPRESIONUNARIA: PATHEXPRESION;

PATHEXPRESION:ddiagonal RUTARELATIVA 
        |sdiagonal RUTARELATIVA
        |ddiagonal
        |sdiagonal
        |RUTARELATIVA
        ;

//RUTA RELATIVA
RUTARELATIVA:PASOEXPRESION RUTARELATIVAL1
        |PASOEXPRESION
        ;

RUTARELATIVAL1:RUTARELATIVAL1 RUTARELATIVAL2
        |RUTARELATIVAL2;

RUTARELATIVAL2:sdiagonal PASOEXPRESION
                |ddiagonal PASOEXPRESION
                ;

//PASO EXPRESION

PASOEXPRESION:POSTEXPRESION
        |AXISEXPRESION
        ;

//AXISEXPRESION

AXISEXPRESION:REVERSOPASO PREDICADO //LISTADOPREDICADO
        |DELANTEPASO PREDICADO // LISTADOPREDICADO
        |REVERSOPASO //LISTADOPREDICADO
        |DELANTEPASO  // LISTADOPREDICADO
        ;
//DELANTEPASO
DELANTEPASO:ABREVIATURADESPUESPASO
        |DELANTEAXIS NODOPRUEBA
        ;
//ABREVIATURADEPUES
ABREVIATURADESPUESPASO:arroba NODOPRUEBA
                |NODOPRUEBA
                ;


DELANTEAXIS: child ddospuntos
        |descendant ddospuntos
        |attribute ddospuntos
        |self ddospuntos
        |descendant_or_self ddospuntos
        |following ddospuntos
        |following_sibling ddospuntos
        |namespace ddospuntos
        ;

NODOPRUEBA:NOMBRETEST   
        |PRIMERTEST
        ;


PRIMERTEST:METODONODO
        |METODOTEXTO
        |METODOLAST
        |METODOPOSITION
                ;

METODONODO: node lparen rparen;
METODOTEXTO: text lparen rparen;
METODOLAST: last lparen rparen;
METODOPOSITION: position lparen rparen;

//REVERSOPASO
REVERSOPASO:REVERSOAXIS NODOPRUEBA
        |ABREVIATURAREVERSEPASO
        ;

//REVERSOAXIS
REVERSOAXIS: parent ddospuntos
        |ancestor_or_self ddospuntos
        |ancestor ddospuntos
        |preceding_sibling ddospuntos
        |preceding ddospuntos
        ;
//ABREVIATURAPASO
ABREVIATURAREVERSEPASO:dpunto;

//POSTEXPRESION
POSTEXPRESION: EXPRESIONPRIMARIA PREDICADO
        |EXPRESIONPRIMARIA
        ;
PREDICADO:lcorchete EXPR rcorchete;

EXPRESIONPRIMARIA:LITERAL
                |ITEMEXPRESION;

LITERAL:EXPRESIONSTRING
        |EXPRESIONNUMERICA
        |EXPRESIONARROBA 
        ;

EXPRESIONARROBA:arroba identifier
                |arroba mul
                ;

EXPRESIONNUMERICA:DecimalLiteral
                |IntegerLiteral
                ;
EXPRESIONSTRING:StringLiteral
                |CharLiteral {    
                               // $$ = new Nodo($1,"EXPRESIONSTRING:charliteral");
                             }
                |identifier {    
                               // $$ = new Nodo($1,"EXPRESIONSTRING:identificador");
                            }
                ;
ITEMEXPRESION:spunto
        ;

/* Definición de la gramática de Horacio */


/*
book/price// 



XPATH:INSTRUCCIONES {console.log('1');};//

INSTRUCCIONES:SENTENCIABARRA
             |OTHER
             ;
SENTENCIABARRA:ddiagonal
               |sdiagonal

EXPR:ancestor;
*/

//-------------2
----



[Img1]: Imagenes/abrirXML.png "abrirXML"
[Img2]: Imagenes/analizarXML.png "analizarXML"
[Img3]: Imagenes/reporteXML.png "reporteXML"
[Img4]: Imagenes/abrirXPATH.png "abrirXPATH"
[Img5]: Imagenes/analizarXPATHL.png "analizarXPATHL"
[Img6]: Imagenes/reporteXPATH.png "reporteXPATH"
[Img7]: Imagenes/consola.png "consola"
