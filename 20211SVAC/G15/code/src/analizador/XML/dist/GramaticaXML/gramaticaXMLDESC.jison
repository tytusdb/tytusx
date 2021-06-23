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
