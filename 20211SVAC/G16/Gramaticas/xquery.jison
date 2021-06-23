%{

%}

%lex

%options case-sensitive
%%

//Simbolos

"//"    return 'dobled';
"/"     return 'diagonal';
".."    return 'dosp'
"("     return 'parizq';
")"     return 'parder';
"["     return 'corizq';
"]"     return 'corder';
"{"     return 'llaveizq';
"}"     return 'llaveder';
"="     return 'igual';
"!="    return 'difer';
"<="    return 'menori';
"<"     return 'menor';
">="    return 'mayori';
">"     return 'mayor';
":"     return 'dospuntos';
"."     return 'punto';
","     return 'coma';
";"     return 'puntocoma';
"|"     return 'barra';
"+"     return 'mas';
"-"     return 'menos';
"*"     return 'por';
"?"     return 'inter';


//Palabras Reservadas
"div"                   return 'div';
"or"                    return 'or';
"and"                   return 'and';
"mod"                   return 'mod';
//FUNCIONES XQUERY
"for"                   return 'rfor';
"in"                    return 'rin';
"where"                 return 'rwhere';
"order"                 return 'rorder';
"by"                    return 'rby';
"return"                return 'rreturn';
"if"                    return 'rif';
"then"                  return 'rthen';
"else"                  return 'relse';
"data"                  return 'rdata';
"upper-case"            return 'rupper';
"substring"             return 'rsubstring';
"to"                    return 'rto';
"declare"               return 'rdeclare';
"function"              return 'rfunction';

//OPERADORES
"eq"                    return 'req'; //=
"ne"                    return 'rne'; //!=
"lt"                    return 'rlt'; //<
"le"                    return 'rle'; //<=
"gt"                    return 'rgt'; //>
"ge"                    return 'rge'; //>=
//ASIGNACION
"at"                    return 'rat';
"let"                   return 'rlet';
"as"                    return 'ras';
"xs"                    return 'rxs';
//TIPOS DE DATO
"integer"               return 'rinteger';
"decimal"               return 'decimal';
"float"                 return 'rfloat';
"double"                return 'rdouble';
"string"                return 'rstring';
"boolean"               return 'rboolean';
"date"                  return 'rdate';
//HTML
"html"                  return 'rhtml';
"body"                  return 'rbody';
"div"                   return 'rdiv';
"ul"                    return 'rul';
"ol"                    return 'rol'
"li"                    return 'rli'
"class"                 return 'rclass';
"h1"                    return 'rh1';
//FUNCIONES XPATH
"node"					return 'rnode';
"text"					return 'rtext';
"last"					return 'rlast';
"position"				return 'rposition';
//AXES
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
[ \n\r\t]+ 		                /*Se ignoran*/
["(:"][^][":)"]                 /*Comentarios se ignoran*/
[\']([^\n\'])*[\']    																			return 'cadena';
[\"]([^\n\"])*[\"]    																			return 'cadenas';
[-]?[0-9]+[.][0-9]+             																return 'rdecimal';
[-]?[0-9]+                      																return 'rentero';
"$"([a-zA-Z]|"_"|"ñ"|"Ñ")+("_"|"ñ"|"Ñ"|[0-9A-Za-z])*	return 'variable';
("@")?([a-zA-Z]|"_")+("_"|"."|"-"|"Á"|"É"|"Í"|"Ó"|"Ú"|"á"|"é"|"í"|"ó"|"ú"|"ñ"|"Ñ"|[0-9A-Za-z])*	return 'id';
"@"     return 'arroba';
[^<>&]+                                                                                   		return 'CARACTER';
<<EOF>>			                                                                                return 'EOF';


/lex

//Precedencia de operadores

%left mas
%left por
//Gramatica
%start S

%%

S: INICIO EOF { $$=$1; return $$; };

INICIO
    : COMIENZO
;

COMIENZO
	: XPATH
	| HTML
  | XQUERY
;


HTML
	: menor rhtml ATRIBUTOS mayor	HTMLP menor diagonal rhtml mayor
	| menor rhtml ATRIBUTOS mayor menor diagonal rhtml mayor
	| menor rbody ATRIBUTOS mayor HIJOS menor diagonal rbody mayor
	| menor rbody ATRIBUTOS mayor menor diagonal rbody mayor
	| menor rhtml mayor	HTMLP menor diagonal rhtml mayor
	| menor rhtml mayor	 menor diagonal rhtml mayor
	| menor rbody mayor HIJOS menor diagonal rbody mayor
	| menor rbody mayor menor diagonal rbody mayor
  | HIJOS
;

HTMLP
  : menor rbody ATRIBUTOS mayor HIJOS menor diagonal rbody mayor
	| menor rbody ATRIBUTOS mayor menor diagonal rbody mayor
	| menor rbody mayor HIJOS menor diagonal rbody mayor
	| menor rbody mayor menor diagonal rbody mayor
	| HIJOS
;

HIJOS
  : HIJOS HIJO
  | HIJO
;
HIJO
	: menor rh1 ATRIBUTOS mayor TEXTO menor diagonal rh1 mayor
	| menor rh1 ATRIBUTOS mayor menor diagonal rh1 mayor
	| menor rul ATRIBUTOS mayor LISTAS menor diagonal  rul mayor
	| menor rul ATRIBUTOS mayor menor diagonal rul mayor
	| menor rh1 mayor TEXTO menor diagonal rh1 mayor
	| menor rh1 mayor menor diagonal rh1 mayor
	| menor rul mayor LISTAS menor diagonal rul mayor
	| menor rul mayor menor diagonal rul mayor
;

ATRIBUTOS
	: rclass igual '\"' CONTENT '\"'
  | rclass igual cadena
	| rclass igual cadenas
;
LISTAS
  : LISTAS LISTA
  | LISTA
;
LISTA
	: menor rli ATRIBUTOS mayor menor diagonal rli mayor
	| menor rli  mayor menor diagonal rli mayor
	| menor rli ATRIBUTOS mayor XQUERY menor diagonal rli mayor
	| menor rli  mayor XQUERY menor diagonal rli mayor
  | menor rol ATRIBUTOS mayor menor diagonal rol mayor
	| menor rol  mayor menor diagonal rol mayor
	| menor rol ATRIBUTOS mayor XQUERY menor diagonal rol mayor
	| menor rol  mayor XQUERY menor diagonal rol mayor
  | llaveizq XQUERY llaveder

;

XQUERY
	: XQUERY SENTENCIAS
  | XQUERY DECLARACIONES
  | SENTENCIAS
  | DECLARACIONES
;
SENTENCIAS
  : SENTENCIAS FORS 
  | SENTENCIAS LETS 
  | SENTENCIAS IFS
  | SENTENCIAS ETIQUETAS
  | SENTENCIAS RETURN
  | FORS
  | LETS
  | IFS
  | RETURN
  | ETIQUETAS
;

FORS
  : rfor OPTION
;

OPTION
  : variable rin XPATH CONSULTAR  
  | variable rat variable rin XPATH CONSULTAR
  | LOOP  
;

LOOP 
  : variable rin parizq NUMEROS parder coma LOOP 
  | variable rin parizq NUMEROS parder CONSULTAR
;

NUMEROS
  : rentero coma NUMEROS 
  | rentero             
  | rdecimal coma NUMEROS 
  | rdecimal              
  | rentero rto rentero 

;

FUNCIONCITAS
  : rdata parizq EXP parder 
  | rupper parizq variable parder
  | rupper parizq variable diagonal id parder
  | rsubstring parizq variable coma CONDICION coma CONDICION parder
;

CONSULTAR
  : WHERE ORDER RETURN
  | WHERE RETURN
  | ORDER RETURN
  | RETURN

;
WHERE 
  : rwhere CUERPO
;

CUERPO
  : CUERPO variable diagonal CONDICION and 
  | CUERPO variable diagonal CONDICION or 
  | variable diagonal CONDICION
;
ORDER 
  : rorder rby ORDENAMIENTO
;

ORDENAMIENTO
  : variable coma ORDENAMIENTO
  | variable diagonal id coma ORDENAMIENTO
  | variable
  | variable diagonal id
;

RETURN 
  : rreturn 
  | rreturn variable
  | rreturn variable diagonal id
  | rreturn ETIQUETAS
  | rreturn IFS
  | rreturn CONDICION
;

ETIQUETAS
  : menor id mayor CONTENT menor diagonal id mayor
  | menor rli mayor CONTENT menor diagonal rli mayor
  | menor rlo mayor CONTENT menor diagonal rlo mayor
  | menor rchild mayor CONTENT menor diagonal rchild mayor
  | menor id ATRIBUTOS mayor CONTENT menor diagonal id mayor
  | menor rli ATRIBUTOS mayor CONTENT menor diagonal rli mayor
  | menor rlo ATRIBUTOS mayor CONTENT menor diagonal rlo mayor
  | menor rchild ATRIBUTOS mayor CONTENT menor diagonal rchild mayor
;

CONTENT
  : CONTENT llaveizq EXP llaveder
  | CONTENT TEXTO
  | llaveizq EXP llaveder
  | TEXTO

;

EXP
  : variable
  | variable diagonal id
  | FUNCIONCITAS
  | LLAMADOS
;

LLAMADOS
  : id dospuntos id parizq VARS  parder
;

VARS
  : variable coma VARS
  | variable diagonal id coma VARS
  | variable
  | variable diagonal id
;

//local:minPrice($book/price,$book/discount)}
CONDICION:
	 CONDICION mas CONDICION
	|CONDICION menos CONDICION
	|CONDICION por CONDICION
	|CONDICION div CONDICION
	|CONDICION mod CONDICION
	|CONDICION or CONDICION
	|CONDICION and CONDICION
	|CONDICION igual CONDICION
	|CONDICION dif CONDICION
	|CONDICION menor CONDICION
	|CONDICION mayor CONDICION
	|CONDICION menori CONDICION
	|CONDICION mayori CONDICION
  |CONDICION req CONDICION
  |CONDICION rne CONDICION
  |CONDICION rlt CONDICION
  |CONDICION rle CONDICION
  |CONDICION rgt CONDICION
  |CONDICION rge CONDICION
	|parizq CONDICION parder
	|CONDICION diagonal CONDICION
	|cadena
	|rdecimal
	|rentero
	|id
	|cadenas
  |variable
	;


IFS
  : rif parizq CONDICION parder rthen SENTENCIAS relse SENTENCIAS
  | rif parizq CONDICION parder rthen SENTENCIAS  
;

LETS
  : rlet variable dospuntos igual ASIGNACIONES
  | rlet variable
;

ASIGNACIONES
  : XPATH
  | parizq NUMEROS parder
  | parizq FUNCIONCITAS parder
  | CONDICION
  | FUNCIONCITAS

;

TIPOS :
   rinteger inter
  |decimal inter
  |rstring inter
  |rboolean inter
  |rdata inter
  |rboolean inter
  |rfloat inter
;

DECLARACIONES
  : rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma
  |rdeclare rfunction id dospuntos id parizq parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma
  |rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS parder  llaveder puntocoma
  |rdeclare rfunction id dospuntos id parizq  parder ras rxs dospuntos TIPOS llaveizq  parder puntocoma
;

PARAMETROS
  : variable ras rxs dospuntos TIPOS coma PARAMETROS
  | variable ras rxs dospuntos TIPOS 
;


TEXTO
  : TEXTO id                 {
                              }
  | TEXTO rentero             {
                              }
  | TEXTO rdecimal
  | TEXTO rentero
  | TEXTO integer
  | TEXTO decimal
  | TEXTO float
  | TEXTO double

  | TEXTO cadena              {
                              }
  | TEXTO cadenas               {
                              }
  | TEXTO barra               {
                              }
  | TEXTO dolar               {
                              }
  | TEXTO corder                 {
                              }
  | TEXTO corizq             {
                              }
  | TEXTO parder            {
                              }
  | TEXTO parizq            {
                              }
  | TEXTO mayor            {
                              }
  | TEXTO menor            {
                              }
  | TEXTO mayori           {
                              }
  | TEXTO menori              {
                              }
  | TEXTO igual           {
                              }
  | TEXTO CARACTER
  | TEXTO punto
  | TEXTO puntocoma
  | TEXTO dospuntos
  | TEXTO mas
  | TEXTO menos
  | TEXTO por
  | TEXTO diagonal
  | TEXTO inter
  | TEXTO dosp
  | TEXTO div
  | TEXTO and
  | TEXTO or
  | TEXTO mod
  | TEXTO difer
  | TEXTO for
  | TEXTO in
  | TEXTO where
  | TEXTO order
  | TEXTO by
  | TEXTO 'return'
  | TEXTO 'if'
  | TEXTO then
  | TEXTO 'else'
  | id                 {
                              }
  | rentero             {
                              }
  | rdecimal
  | rentero
  | integer
  | decimal
  | float
  | double

  | cadena              {
                              }
  | cadenas               {
                              }
  | barra               {
                              }
  | dolar               {
                              }
  | corder                 {
                              }
  | corizq             {
                              }
  | parder            {
                              }
  | parizq            {
                              }
  | mayor            {
                              }
  | menor            {
                              }
  | mayori           {
                              }
  | menori              {
                              }
  | igual           {
                              }
  | CARACTER
  | punto
  | puntocoma
  | dospuntos
  | mas
  | menos
  | por
  | diagonal
  | inter
  | dosp
  | div
  | and
  | or
  | mod
  | difer
  | for
  | in
  | where
  | order
  | by
  | 'return'
  | 'if'
  | then
  | 'else'
;

XPATH
	: XPATH L_CONTENIDO
	| L_CONTENIDO
;

L_CONTENIDO:
	diagonal CONTENIDO
	|dobled  CONTENIDO
;

CONTENIDO:
	id
	|id PREDICADO
	|FUNCIONES
	|EXPRESION
	|EJES
	|dosp
	|punto
	|por
	|arroba por
;

PREDICADO:
	 PREDICADO corizq EXPRESION corder
	|corizq EXPRESION corder
;

EXPRESION:
	 EXPRESION mas EXPRESION
	|EXPRESION menos EXPRESION
	|EXPRESION por EXPRESION
	|EXPRESION div EXPRESION
	|EXPRESION mod EXPRESION
	|EXPRESION or EXPRESION
	|EXPRESION and EXPRESION
	|EXPRESION igual EXPRESION
	|EXPRESION dif EXPRESION
	|EXPRESION menor EXPRESION
	|EXPRESION mayor EXPRESION
	|EXPRESION menori EXPRESION
	|EXPRESION mayori EXPRESION
  |EXPRESION req EXPRESION
  |EXPRESION rne EXPRESION
  |EXPRESION rlt EXPRESION
  |EXPRESION rle EXPRESION
  |EXPRESION rgt EXPRESION
  |EXPRESION rge EXPRESION
	|parizq EXPRESION parder
	|EXPRESION diagonal EXPRESION
  |rsubstring parizq id coma EXPRESION coma EXPRESION  parder
	|arroba id
	|arroba por
	|FUNCIONES
	|cadena
	|rdecimal
	|rentero
	|punto
	|dosp
	|id
	|cadenas
	;

FUNCIONES:
	 FUNCION parizq parder
;

FUNCION:
	 rlast
	|rposition
	|rnode
	|rtext
;

EJES:
	 EJE dospuntos dospuntos CONTEJES
	|EJES EJE dospuntos dospuntos CONTEJES
;

CONTEJES:
	id
	|id PREDICADO
	|CONTEJES L_CONTENIDO
	|L_CONTENIDO
;

EJE:
	 rancestros
	|rancestro
	|ratributo
	|rchild
	|rdescenos
	|rdescen
	|rseguidorh
	|rseguidor
	|rnombres
	|rparent
	|rprecedings
	|rpreceding
	|rself
;