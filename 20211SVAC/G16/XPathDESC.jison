%{
	var NodoAST = require("../app/Clases/Models/NodoAST.js");
%}

%lex

%%

//Simbolos
"//"	return 'dobled';
"/"		return 'diagonal';
".."	return 'doblep';
"."		return 'punto';
"@"		return 'arroba';
"|"		return 'barra';
"+"		return 'mas';
"-"		return 'menos';
"*"		return 'por';
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
"["		return 'corizq';
"]"		return 'corder';
"("		return 'parizq';
")"		return 'parder';
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

. { console.log("Error léxico") } //errores lexicos

/lex

/*Precedencia de operadores*/
%left 'or'
%left 'and'
%left 'dif' 'igual'
%left 'menor' 'mayor' 'menori' 'mayori'
%left 'mas' 'menos'
%left 'por' 'div'
%left 'mod'
%left UMINUS

%start S

%%

S: INICIO EOF { $$=$1; return $$; };

INICIO:
	 diagonal LDIAGONAL 	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|dobled LDIAGONAL 		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
;

INICIOP:
	 diagonal LDIAGONAL 	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|dobled LDIAGONAL 		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|barra INICIO INICIOP 	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|						{  }
;

LDIAGONAL:
	 id LID 				{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|EXPRESION LEXPRESION 	{ $$=$1; $$.AgregarHijo($2); }
	|EJES INICIOP			{ $$=$1; $$.AgregarHijo($2); }
;

LID:
	 PREDICADO INICIOP 	{ $$=$1; $$.AgregarHijo($2); }
	|INICIOP 			{ $$=$1; }
;

LEXPRESION:
	 PREDICADO INICIOP 	{ $$=$1; $$.AgregarHijo($2); }
	|INICIOP 		 	{ $$=$1; }
;

PREDICADO:
	 corizq EXPRESION corder LPREDICADO 	{ $$=$2; $$.AgregarHijo($4); }
;

LPREDICADO:
	 corizq EXPRESION corder LPREDICADO 	{ $$=$2; $$.AgregarHijo($4); }
	|									    {  }
;

EXPRESION:
	 parizq EXPRESION parder EXPRESIONP 	{ $$=$2; $$.AgregarHijo($4); }
	|arroba EXPRESION EXPRESIONP 			{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|por EXPRESIONP 						{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|FUNCIONES EXPRESIONP 					{ $$=$1; $$.AgregarHijo($2); }
	|cadena EXPRESIONP 						{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|decimal EXPRESIONP 					{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|entero EXPRESIONP 						{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|punto EXPRESIONP 						{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|doblep EXPRESIONP 						{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|id EXPRESIONP 							{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|cadenas EXPRESIONP 					{ $$=new NodoAST.default($1); $$.AgregarHijo($2); }
	|INICIO EXPRESIONP 						{ $$=$1; $$.AgregarHijo($2); }
;

EXPRESIONP:
	 mas EXPRESION 	EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|menos EXPRESION EXPRESIONP 	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|por EXPRESION EXPRESIONP 		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|div EXPRESION EXPRESIONP 		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|mod EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|or EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|and EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|igual EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|dif EXPRESION EXPRESIONP 		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|menor EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|mayor EXPRESION EXPRESIONP		{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|menori EXPRESION EXPRESIONP	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|mayori EXPRESION EXPRESIONP	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|diagonal EXPRESION EXPRESIONP	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|dobled EXPRESION EXPRESIONP	{ $$=new NodoAST.default($1); $$.AgregarHijo($2); $$.AgregarHijo($3); }
	|								{  }
;

FUNCIONES:
	 FUNCION parizq parder	{ $$=new NodoAST.default($1); }
;

FUNCION:
	 rlast		{ $$=$1; }
	|rposition	{ $$=$1; }
	|rnode		{ $$=$1; }
	|rtext		{ $$=$1; }
;

EJES:
	 EJE dospuntos dospuntos CONTENIDO EJESP 	{ $$=new NodoAST.default($1); $$.AgregarHijo($4); $$.AgregarHijo($5); }
;

EJESP:
	 EJE dospuntos dospuntos CONTENIDO EJESP 	{ $$=new NodoAST.default($1); $$.AgregarHijo($4); $$.AgregarHijo($5); }
	|											{  }
;

EJE:
	 rancestros 	{ $$=$1; }
	|rancestro 		{ $$=$1; }
	|ratributo 		{ $$=$1; }
	|rchild 		{ $$=$1; }
	|rdescenos 		{ $$=$1; }
	|rdescen 		{ $$=$1; }
	|rseguidorh 	{ $$=$1; }
	|rseguidor 		{ $$=$1; }
	|rnombres 		{ $$=$1; }
	|rparent 		{ $$=$1; }
	|rprecedings 	{ $$=$1; }
	|rpreceding 	{ $$=$1; }
	|rself 			{ $$=$1; }
;

CONTENIDO:
	 id LIDCONTENIDO 	{ $$=new NodoAST.default($1); }
	|por LPORCONTENIDO 	{ $$=new NodoAST.default($1+$2); }
	|FUNCIONES    		{ $$=$1; }
	|EXPRESION 			{ $$=$1; }
	|					{  }
;

LIDCONTENIDO:
	 parizq parder 	{  }
	|				{  }
;

LPORCONTENIDO:
	 diagonal 	{ $$=$1; }
	|dobled 	{ $$=$1; }
	|			{  }
;