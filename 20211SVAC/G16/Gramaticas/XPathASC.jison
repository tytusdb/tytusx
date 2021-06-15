%{
	var NodoAST = require("../app/Clases/Models/NodoAST.js");
	var nodoError=require("../app/Clases/Models/Errores.js");
  	var ErrorL=require("../app/Clases/Models/ListaError.js");
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

. { ErrorL.Errores.add(new nodoError.Error("Léxico","Caracter "+yytext+
" no reconocido",yylineno,yylloc.first_column,"XPath")) } //errores lexicos

/lex

/*Precedencia de operadores*/
%left 'or' 'and'
%left 'dif' 'igual'
%left 'menor' 'mayor' 'menori' 'mayori'
%left 'mas' 'menos'
%left 'por' 'div'
%left 'mod'
%left UMINUS

%start S

%%

S: INICIO EOF { $$=new NodoAST.default("Path"); $$.AgregarHijo($1); return $$; };

INICIO:
	 INICIO diagonal id PREDICADO	{ $$=new NodoAST.default("/");
	 								  let nodo1=new NodoAST.default($3); nodo1.AgregarHijo($4);
	 								  $$.AgregarHijo($1); $$.AgregarHijo(nodo1); }
	|diagonal id PREDICADO 			{ $$=new NodoAST.default("/"); 
									  let nodo2=new NodoAST.default($2); nodo2.AgregarHijo($3);
									  $$.AgregarHijo(nodo2); }
	|INICIO diagonal id 			{ $$=new NodoAST.default("/"); 
									  let nodo3=new NodoAST.default($3);
									  $$.AgregarHijo($1); $$.AgregarHijo(nodo3); }
	|diagonal id 					{ $$=new NodoAST.default("/");
									  let nodo4=new NodoAST.default($2);
									  $$.AgregarHijo(nodo4); }
	|INICIO diagonal EXPRESION 		{ $$=new NodoAST.default("/"); 
									  $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|diagonal EXPRESION PREDICADO 	{ $$=new NodoAST.default("/");
									  $2.AgregarHijo($3); $$.AgregarHijo($2); }
	|diagonal EXPRESION 		 	{ $$=new NodoAST.default("/"); 
									  $$.AgregarHijo($2); }
	|INICIO diagonal EJES 			{ $$=new NodoAST.default("/"); 
									  $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|diagonal EJES					{ $$=new NodoAST.default("/"); 
									  $$.AgregarHijo($2); }
	|INICIO dobled id PREDICADO 	{ $$=new NodoAST.default("//"); 
									  let nodo5=new NodoAST.default($3); nodo5.AgregarHijo($4);
									  $$.AgregarHijo($1); $$.AgregarHijo(nodo5); }
	|dobled id PREDICADO 			{ $$=new NodoAST.default("//"); 
									  let nodo6=new NodoAST.default($2); nodo6.AgregarHijo($3);
									  $$.AgregarHijo(nodo6); }
	|INICIO dobled id 				{ $$=new NodoAST.default("//"); 
									  let nodo7=new NodoAST.default($3);
									  $$.AgregarHijo($1); $$.AgregarHijo(nodo7); }
	|dobled id 						{ $$=new NodoAST.default("//");
									  let nodo8=new NodoAST.default($2);
									  $$.AgregarHijo(nodo8); }
	|INICIO dobled EXPRESION 		{ $$=new NodoAST.default("//"); 
									  $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|dobled EXPRESION PREDICADO		{ $$=new NodoAST.default("//"); 
									  $2.AgregarHijo($3); $$.AgregarHijo($2); }
	|dobled EXPRESION 				{ $$=new NodoAST.default("//"); 
									  $$.AgregarHijo($2); }
	|INICIO dobled EJES 			{ $$=new NodoAST.default("//"); 
									  $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|dobled EJES 					{ $$=new NodoAST.default("//"); 
									  $$.AgregarHijo($2); }
	|INICIO barra INICIO 			{ $$=new NodoAST.default("|"); 
									  $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|id								{ $$=new NodoAST.default($1); }
	|id PREDICADO					{ $$=new NodoAST.default($1); $$.AgregarHijo($1); }
	|punto 							{ $$=new NodoAST.default($1); }
	|doblep 						{ $$=new NodoAST.default($1); }
	|error EOF 						{ ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba el inicio de una instrucción "+yytext,@1.first_line,@1.first_column,"XPath")); }
;

PREDICADO:
	 PREDICADO corizq EXPRESION corder 	{ $$=$1; $$.AgregarHijo($3); }
	|corizq EXPRESION corder 			{ $$=new NodoAST.default("Predicado"); $$.AgregarHijo($2); }
;

EXPRESION:
	 EXPRESION mas EXPRESION 		{ $$=new NodoAST.default("+"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION menos EXPRESION 		{ $$=new NodoAST.default("-"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION por EXPRESION 		{ $$=new NodoAST.default("*"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION div EXPRESION 		{ $$=new NodoAST.default("div"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION mod EXPRESION 		{ $$=new NodoAST.default("mod"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION or EXPRESION 		{ $$=new NodoAST.default("or"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION and EXPRESION 		{ $$=new NodoAST.default("and"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION igual EXPRESION 		{ $$=new NodoAST.default("="); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION dif EXPRESION 		{ $$=new NodoAST.default("!="); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION menor EXPRESION 		{ $$=new NodoAST.default("<"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION mayor EXPRESION 		{ $$=new NodoAST.default(">"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION menori EXPRESION 	{ $$=new NodoAST.default("<="); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION mayori EXPRESION 	{ $$=new NodoAST.default(">="); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION diagonal EXPRESION 	{ $$=new NodoAST.default("/"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|EXPRESION dobled EXPRESION 	{ $$=new NodoAST.default("//"); $$.AgregarHijo($1); $$.AgregarHijo($3); }
	|parizq EXPRESION parder 		{ $$=$2; }
	|arroba EXPRESION 				{ $$=new NodoAST.default("@"); $$.AgregarHijo($2); }
	|por 							{ $$=new NodoAST.default($1); }
	|FUNCIONES 						{ $$=$1; }
	|cadena 						{ $$=new NodoAST.default($1); }
	|decimal 						{ $$=new NodoAST.default($1); }
	|entero 						{ $$=new NodoAST.default($1); }
	|punto 							{ $$=new NodoAST.default($1); }
	|doblep 						{ $$=new NodoAST.default($1); }
	|id 							{ $$=new NodoAST.default($1); }
	|cadenas 						{ $$=new NodoAST.default($1); }
	|INICIO 						{ $$=new NodoAST.default("Path"); $$.AgregarHijo($1); }
  	|error diagonal 				{ ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba una expresión en el predicado "+yytext,@1.first_line,@1.first_column,"XPath")); }
;

FUNCIONES:
	 FUNCION parizq parder 	{ $$=new NodoAST.default("Funcion"); 
	 						  let nodof=new NodoAST.default($1); $$.AgregarHijo(nodof); }
;

FUNCION:
	 rlast				{ $$=$1; }
	|rposition			{ $$=$1; }
	|rnode				{ $$=$1; }
	|rtext				{ $$=$1; }
  	|error diagonal 	{ ErrorL.Errores.add(new nodoError.Error("Sintáctico","Error en la función "+yytext,@1.first_line,@1.first_column,"XPath")); }
;

EJES:
	 EJE dospuntos dospuntos CONTENIDO 			{ $$=new NodoAST.default("Eje"); 
	 											  let nodoe=new NodoAST.default($1); nodoe.AgregarHijo($4);
												  $$.AgregarHijo(nodoe); }
	|EJES EJE dospuntos dospuntos CONTENIDO 	{ $$=new NodoAST.default($2); $$.AgregarHijo($1); $$.AgregarHijo($5); }
;

EJE:
	 rancestros 		{ $$=$1; }
	|rancestro 			{ $$=$1; }
	|ratributo 			{ $$=$1; }
	|rchild 			{ $$=$1; }
	|rdescenos 			{ $$=$1; }
	|rdescen 			{ $$=$1; }
	|rseguidorh 		{ $$=$1; }
	|rseguidor 			{ $$=$1; }
	|rnombres 			{ $$=$1; }
	|rparent 			{ $$=$1; }
	|rprecedings 		{ $$=$1; }
	|rpreceding 		{ $$=$1; }
	|rself 				{ $$=$1; }
  	|error diagonal 	{ ErrorL.Errores.add(new nodoError.Error("Sintáctico","No se ha reconocido el AXES "+yytext,@1.first_line,@1.first_column,"XPath")); }
;

CONTENIDO:
	 id 				{ $$=new NodoAST.default("Contenido");
	 					  let nodoc1=new NodoAST.default($1); $$.AgregarHijo(nodoc1); }
	|id parizq parder 	{ $$=new NodoAST.default("Contenido");
	 					  let nodoc2=new NodoAST.default($1); $$.AgregarHijo(nodoc2); }
	|por 				{ $$=new NodoAST.default("Contenido");
	 					  let nodoc3=new NodoAST.default($1); $$.AgregarHijo(nodoc3); }
	|por diagonal	 	{ $$=new NodoAST.default("Contenido");
	 					  let nodoc4=new NodoAST.default($1+$2); $$.AgregarHijo(nodoc4); }
	|por dobled 		{ $$=new NodoAST.default("Contenido");
	 					  let nodoc5=new NodoAST.default($1+$2); $$.AgregarHijo(nodoc5); }
	|FUNCIONES    		{ $$=new NodoAST.default("Contenido"); $$.AgregarHijo($1); }
	|EXPRESION 			{ $$=new NodoAST.default("Contenido"); $$.AgregarHijo($1); }
;