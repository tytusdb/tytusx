%{
	const TablaSim = require('../app/Clases/XPath/TablaSimbolosXP.js')
	//Para ponerlo sería Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("S -> INIT EOF", "S.val := INIT.val"));
	var DIndice = require("../app/Clases/XPath/DobleIndice.js")
	var Indice =  require("../app/Clases/XPath/Indice.js")
	var Expresion =  require("../app/Clases/XPath/Expresion.js")
	var Axes = require("../app/Clases/XPath/Axes.js")
	var Funcion = require("../app/Clases/XPath/Funciones.js")
	var Predicado = require("../app/Clases/XPath/Predicado.js")
	var Instruccion = require("../app/Clases/XPath/NodoAbs.js")
	//Nodo
	var Nodo=require("../app/Clases/Models/Nodo.js")
%}

%lex

%%

//Simbolos
"//"	return 'dobled';
"/"		return '/';
".."	return 'dosp';
"."		return 'punto';
"@"		return '@';
"|"		return '|';
"+"		return '+';
"-"		return '-';
"*"		return '*';
"div"	return 'div';
"="		return 'igual';
"!="	return 'dif';
"<="	return 'menori';
"<"		return 'menor';
">="	return 'mayori';
">"		return 'mayor';
"or"	return 'or';
"and"	return 'and';
"mon"	return 'mod';
"["		return '[';
"]"		return ']';
"("		return '(';
")"		return ')';
":"		return 'dospuntos';

//Palabras Reservadas
"node"					return 'rnode';
"text"					return 'rtext';
"last"					return 'rlast';
"position"				return 'rposition';
"ancestor-or-self"		return 'rancestros';
"ancestor"				return 'rancestro';
"attribute"				return 'ratributo';
"child"					return 'rchild';
"descendant-or-self"	return 'rdescenos';
"descendant"			return 'rdescen';
"following-sibling"		return 'rseguidorh';
"following"				return 'rseguidor';
"namespace"				return 'rnombres';
"parent"				return 'rparent';
"preceding-sibling"		return 'rprecedings';
"preceding"				return 'rpreceding';
"self"					return 'rself';

//Expresiones Regulares
[ \n\r\t]+ 																						/*Se ignoran*/
[\']([^\n])*[\']    																			return 'cadena';
[\"]([^\n\"])*[\"]    																			return 'cadenas';
[-]?[0-9]+[.][0-9]+             																return 'decimal';
[-]?[0-9]+                      																return 'entero';
([a-zA-Z]|"_")+("_"|"."|"-"|":"|"Á"|"É"|"Í"|"Ó"|"Ú"|"á"|"é"|"í"|"ó"|"ú"|"ñ"|"Ñ"|[0-9A-Za-z])*	return 'id';
<<EOF>>																							return 'EOF';

. { ErrorL.Errores.add(new nodoError.Error("Léxico","Caracter "+yytext+
" no reconocido",yylineno,yylloc.first_column,"XPath")) } //errores lexicos

/lex

/*Precedencia de operadores*/

%left 'or' 'and'
%left 'dif' 'igual'
%left 'menor' 'mayor' 'menori' 'mayori'
%left '+' '-'
%left '*' 'div'
%left 'mod'
%left UMINUS

%start S

%%

S
: 
	MULTIPLE EOF	{ return "OK" }
;

MULTIPLE
:	
	MULTIPLE '|' INICIO { $$ = $3 }
	|INICIO { $$ = $1 }
;

INICIO
: 
	INICIO L_CONTENIDO		{ $$=$1 }
	|L_CONTENIDO			{ $$=$1 }
;

L_CONTENIDO:
	'/' CONTENIDO			{ $$ = new Indice.Indice($2); TablaSim.TablaSimbolosXP.add($$)}
	|'dobled' CONTENIDO		{ $$ = new DIndice.DobleIndice($2); TablaSim.TablaSimbolosXP.add($$)}
;

CONTENIDO:
	id					{ $$ = new Expresion.Expresion($1, 'nan', 'id');}
	|id PREDICADO		{ $$ = new Expresion.Expresion($1, $2, 'IdPredicado') }
	|FUNCIONES			{ $$ = $1 }
	|EXPRESION			{ $$ = $1 }
	|EJES				{ $$ = $1 }
	|dosp				{ $$ = new Expresion.Expresion($1, 'nan', 'dospuntos') }
	|punto				{ $$ = new Expresion.Expresion($1, 'nan', 'punto') }
	|'*'				{ $$ = new Expresion.Expresion($1, 'nan', 'aterisco') }
	|'@' '*'			{ $$ = new Expresion.Expresion($1, $2, 'atributoT') }
;

PREDICADO:
	'[' EXPRESION ']'				{$$ = new Predicado.Predicado($2)}
;

EXPRESION:
	 EXPRESION '+' EXPRESION 		{$$= new Expresion.Expresion($1, $3, '+')}
	|EXPRESION '-' EXPRESION 		{$$= new Expresion.Expresion($1, $3, '-')}		
	|EXPRESION '*' EXPRESION 		{$$= new Expresion.Expresion($1, $3, '*')}	
	|EXPRESION div EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'div')}
	|EXPRESION mod EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'mod')}
	|EXPRESION or EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'or')}
	|EXPRESION and EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'and')}
	|EXPRESION igual EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'igual')}
	|EXPRESION dif EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'noigual')}
	|EXPRESION menor EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'menor')}
	|EXPRESION mayor EXPRESION 		{$$= new Expresion.Expresion($1, $3, 'mayor')}
	|EXPRESION menori EXPRESION 	{$$= new Expresion.Expresion($1, $3, 'menori')}
	|EXPRESION mayori EXPRESION		{$$= new Expresion.Expresion($1, $3, 'mayori')}
	|EXPRESION '/' EXPRESION		{$$= new Expresion.Expresion($1, $3, 'otro')}
	|'(' EXPRESION ')'				{$$= new Expresion.Expresion($2, "nan", 'expresion')}
	|'@' id							{$$= new Expresion.Expresion($1, $2, 'atributoid')}
	|'@' '*'						{$$= new Expresion.Expresion($1, $2, 'atributoat')}
	|FUNCIONES						{$$= $1}
	|cadena 						{$$= new Expresion.Expresion($1, 'nan', 'cadena')}
	|decimal 						{$$= new Expresion.Expresion($1, 'nan', 'decimal')}
	|entero 						{$$= new Expresion.Expresion($1, 'nan', 'entero')}
	|punto 							{$$= new Expresion.Expresion($1, 'nan', 'punto')}
	|dosp							{$$= new Expresion.Expresion($1, 'nan', 'dosp')}
	|id 							{$$= new Expresion.Expresion($1, 'nan', 'id');}
	|cadenas 						{$$= new Expresion.Expresion($1, 'nan', 'cadenas')}
	;

FUNCIONES:
	 FUNCION '(' ')' 				{$$=$1}
;

FUNCION:
	 rlast							{$$= new Funcion.Funciones("last");}
	|rposition						{$$= new Funcion.Funciones("position");}
	|rnode							{$$= new Funcion.Funciones("node");}
	|rtext							{$$= new Funcion.Funciones("text");}
;

EJES:
	EJES EJE dospuntos dospuntos CONTEJES
	| EJE dospuntos dospuntos CONTEJES
;

CONTEJES:
	id						
	|id PREDICADO
	|CONTEJES L_CONTENIDO
	|L_CONTENIDO
;

EJE:
	 rancestros 	{$$="ancestros"}
	|rancestro 		{$$="ancestro"}
	|ratributo 		{$$="atributo"}
	|rchild 		{$$="child"}
	|rdescenos 		{$$="descenos"}
	|rdescen 		{$$="descen"}
	|rseguidorh 	{$$="seguidorh"}
	|rseguidor 		{$$="seguidor"}
	|rnombres 		{$$="nombre"}
	|rparent 		{$$="parent"}
	|rprecedings 	{$$="precedencias"}
	|rpreceding 	{$$="precedencia"}	
	|rself			{$$="self"}
;