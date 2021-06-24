%{
  const Padre=require("../app/Clases/Models/Nodo.js");
  const Tipo=require("../app/Clases/Hijos/Tipo.js");
  const Funcion=require("../app/Clases/Hijos/Funciones.js");
  const Parametros=require("../app/Clases/Hijos/Parametros.js");
  const Declaracion=require("../app/Clases/Hijos/Declaracion.js");
  const Operacion=require("../app/Clases/Hijos/Operaciones.js");
  const tipoOperacion=require("../app/Clases/Hijos/TipoOperacion.js");
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
	 CONDICION mas CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.SUMA,$1,$3));
                                                   }
	|CONDICION menos CONDICION                       {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.RESTA,$1,$3));
                                                   }
	|CONDICION por CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MULTIPLICACION,$1,$3));
                                                   }
	|CONDICION div CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIVISION,$1,$3));
                                                   }
	|CONDICION mod CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MODAL,$1,$3));
                                                   }
	|CONDICION or CONDICION                          {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.OR,$1,$3));
                                                   }
	|CONDICION and CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.AND,$1,$3));
                                                   }
	|CONDICION igual CONDICION                       {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.IGUAL,$1,$3));
                                                   }
	|CONDICION dif CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIFERENTE,$1,$3));
                                                   }
	|CONDICION menor CONDICION                       {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENOR,$1,$3));
                                                   }
	|CONDICION mayor CONDICION                       {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYOR,$1,$3));
                                                   }
	|CONDICION menori CONDICION                      {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORI,$1,$3));
                                                   }
	|CONDICION mayori CONDICION                      {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORI,$1,$3));
                                                   }
  |CONDICION req CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.IGUALU,$1,$3));
                                                   }
  |CONDICION rne CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIFERENTEU,$1,$3));
                                                   }
  |CONDICION rlt CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORU,$1,$3));
                                                   }
  |CONDICION rle CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORIU,$1,$3));
                                                   }
  |CONDICION rgt CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORU,$1,$3));
                                                   }
  |CONDICION rge CONDICION                         {
                                                    $$=new Padre.default("CONDICION","");
                                                    $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORIU,$1,$3));
                                                   }
	|parizq CONDICION parder                         {
                                                    $$=$2;
                                                   }
	|cadena                                          { $$=new Padre.default($1,""); }
	|rdecimal                                        { $$=new Padre.default($1,""); }
	|rentero                                         { $$=new Padre.default($1,""); }
	|id                                              { $$=new Padre.default($1,""); }
	|cadenas                                         { $$=new Padre.default($1,""); }
  |variable                                        { $$=new Padre.default($1,""); }
	;


IFS
  : rif parizq CONDICION parder rthen SENTENCIAS relse SENTENCIAS   {
                                                                      $$=Padre.default("IF","");
                                                                      $$.AgregarHijo(new Declaracion.Declaracion($3,$6,$8,@1.first_line, @1.first_column));
                                                                    }
  | rif parizq CONDICION parder rthen SENTENCIAS                    {
                                                                      $$=Padre.default("IF","");
                                                                      $$.AgregarHijo(new Declaracion.Declaracion($3,$6,null,@1.first_line, @1.first_column));
                                                                    }
;

LETS
  : rlet variable dospuntos igual ASIGNACIONES  {
                                                 $$=Padre.default("LET","");
                                                 $$.AgregarHijo(new Declaracion.Declaracion($2,$5,@1.first_line, @1.first_column));
                                                }
  | rlet variable                               {
                                                 $$=Padre.default("LET","");
                                                 $$.AgregarHijo(new Declaracion.Declaracion($2,null,@1.first_line, @1.first_column));
                                                }
;

ASIGNACIONES
  : XPATH                                       {
                                                 $$=Padre.default("ASIGNACIONES","");
                                                 $$.AgregarHijo($1);
                                                }
  | parizq NUMEROS parder                       {
                                                 $$=Padre.default("ASIGNACIONES","");
                                                 $$.AgregarHijo(new Padre.default($1,""));
                                                 $$.AgregarHijo($2);
                                                 $$.AgregarHijo(new Padre.default($3,""));
                                                }
  | parizq FUNCIONCITAS parder                  {
                                                 $$=Padre.default("ASIGNACIONES","");
                                                 $$.AgregarHijo(new Padre.default($1,""));
                                                 $$.AgregarHijo($2);
                                                 $$.AgregarHijo(new Padre.default($3,""));
                                                }
  | CONDICION                                   {
                                                 $$=Padre.default("ASIGNACIONES","");
                                                 $$.AgregarHijo($1);
                                                }
  | FUNCIONCITAS                                {
                                                 $$=Padre.default("ASIGNACIONES","");
                                                 $$.AgregarHijo($1);
                                                }

;

TIPOS :
   rinteger inter     {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.INTEGER)
                      }
  |decimal inter      {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.DECIMAL)
                      }
  |rstring inter      {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.STRING)
                      }
  |rboolean inter     {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.BOOLEAN)
                      }
  |rdata inter        {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.DATA)
                      }
  |rfloat inter       {
                        $$=new Padre.default("TIPOS","");
                        $$.AgregarHijo(Tipo.Tipo.FLOAT)
                      }
;

DECLARACIONES
  :rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma {
                                                                                                                                $$=new Padre.default("FUNCIONES_XQUERY","");
                                                                                                                                $$.AgregarHijo(new Funcion.default($3,$5,$7,$12,$14,@1.first_line, @1.first_column));
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma            {
                                                                                                                                $$=new Padre.default("FUNCIONES_XQUERY","");
                                                                                                                                $$.AgregarHijo(new Funcion.default($3,$5,null,$11,$13,@1.first_line, @1.first_column));
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS parder  llaveder puntocoma             {
                                                                                                                                $$=new Padre.default("FUNCIONES_XQUERY","");
                                                                                                                                $$.AgregarHijo(new Funcion.default($3,$5,$7,$12,null,@1.first_line, @1.first_column));
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq  parder ras rxs dospuntos TIPOS llaveizq  parder puntocoma                       {
                                                                                                                                $$=new Padre.default("FUNCIONES_XQUERY","");
                                                                                                                                $$.AgregarHijo(new Funcion.default($3,$5,null,$11,null,@1.first_line, @1.first_column));
                                                                                                                              }
;

PARAMETROS
  : variable ras rxs dospuntos TIPOS coma PARAMETROS  {
                                                        $$=new Padre.default("PARAMETROS","");
                                                        $$.AgregarHijo(new Parametros.Parametros($1,$5));
                                                        $$.AgregarHijo($7);
                                                      }
  | variable ras rxs dospuntos TIPOS                  {
                                                        $$=new Padre.default("PARAMETROS","")
                                                        $$.AgregarHijo(new Parametros.Parametros($1,$5));
                                                      }
;


TEXTO
  : TEXTO id                 {$$=$1+" "+$2}
  | TEXTO rentero            {$$=$1+" "+$2}
  | TEXTO rdecimal           {$$=$1+" "+$2}
  | TEXTO rentero            {$$=$1+" "+$2}
  | TEXTO integer            {$$=$1+" "+$2}
  | TEXTO decimal            {$$=$1+" "+$2}
  | TEXTO float              {$$=$1+" "+$2}
  | TEXTO double             {$$=$1+" "+$2}
  | TEXTO cadena             {$$=$1+" "+$2}
  | TEXTO cadenas            {$$=$1+" "+$2}
  | TEXTO barra              {$$=$1+" "+$2}
  | TEXTO dolar              {$$=$1+" "+$2}
  | TEXTO corder             {$$=$1+" "+$2}
  | TEXTO corizq             {$$=$1+" "+$2}
  | TEXTO parder             {$$=$1+" "+$2}
  | TEXTO parizq             {$$=$1+" "+$2}
  | TEXTO mayor              {$$=$1+" "+$2}
  | TEXTO menor              {$$=$1+" "+$2}
  | TEXTO mayori             {$$=$1+" "+$2}
  | TEXTO menori             {$$=$1+" "+$2}
  | TEXTO igual              {$$=$1+" "+$2}
  | TEXTO CARACTER           {$$=$1+" "+$2}
  | TEXTO punto              {$$=$1+" "+$2}
  | TEXTO puntocoma          {$$=$1+" "+$2}
  | TEXTO dospuntos          {$$=$1+" "+$2}
  | TEXTO mas                {$$=$1+" "+$2}
  | TEXTO menos              {$$=$1+" "+$2}
  | TEXTO por                {$$=$1+" "+$2}
  | TEXTO diagonal           {$$=$1+" "+$2}
  | TEXTO inter              {$$=$1+" "+$2}
  | TEXTO dosp               {$$=$1+" "+$2}
  | TEXTO div                {$$=$1+" "+$2}
  | TEXTO and                {$$=$1+" "+$2}
  | TEXTO or                 {$$=$1+" "+$2}
  | TEXTO mod                {$$=$1+" "+$2}
  | TEXTO difer              {$$=$1+" "+$2}
  | TEXTO for                {$$=$1+" "+$2}
  | TEXTO in                 {$$=$1+" "+$2}
  | TEXTO where              {$$=$1+" "+$2}
  | TEXTO order              {$$=$1+" "+$2}
  | TEXTO by                 {$$=$1+" "+$2}
  | TEXTO 'return'           {$$=$1+" "+$2}
  | TEXTO 'if'               {$$=$1+" "+$2}
  | TEXTO then               {$$=$1+" "+$2}
  | TEXTO 'else'             {$$=$1+" "+$2}
  | id                       {$$=$1}
  | rentero                  {$$=$1}
  | rdecimal                 {$$=$1}
  | rentero                  {$$=$1}
  | integer                  {$$=$1}
  | decimal                  {$$=$1}
  | float                    {$$=$1}
  | double                   {$$=$1}
  | cadena                   {$$=$1}
  | cadenas                  {$$=$1}
  | barra                    {$$=$1}
  | dolar                    {$$=$1}
  | corder                   {$$=$1}
  | corizq                   {$$=$1}
  | parder                   {$$=$1}
  | parizq                   {$$=$1}
  | mayor                    {$$=$1}
  | menor                    {$$=$1}
  | mayori                   {$$=$1}
  | menori                   {$$=$1}
  | igual                    {$$=$1}
  | CARACTER                 {$$=$1}
  | punto                    {$$=$1}
  | puntocoma                {$$=$1}
  | dospuntos                {$$=$1}
  | mas                      {$$=$1}
  | menos                    {$$=$1}
  | por                      {$$=$1}
  | diagonal                 {$$=$1}
  | inter                    {$$=$1}
  | dosp                     {$$=$1}
  | div                      {$$=$1}
  | and                      {$$=$1}
  | or                       {$$=$1}
  | mod                      {$$=$1}
  | difer                    {$$=$1}
  | for                      {$$=$1}
  | in                       {$$=$1}
  | where                    {$$=$1}
  | order                    {$$=$1}
  | by                       {$$=$1}
  | 'return'                 {$$=$1}
  | 'if'                     {$$=$1}
  | then                     {$$=$1}
  | 'else'                   {$$=$1}
;

XPATH
	: XPATH L_CONTENIDO                                          {
                                                                  $$=new Padre.default("XPATH","");
                                                                  $$.AgregarHijo($1);
                                                                  $$.AgregarHijo($2);
                                                               }
	| L_CONTENIDO                                                {
                                                                  $$=new Padre.default("XPATH","");
                                                                  $$.AgregarHijo($1);
                                                               }
;

L_CONTENIDO:
	diagonal CONTENIDO                                           {
                                                                 $$=new Padre.default("L_CONTENIDO",$1);
                                                                 $$.AgregarHijo($2);
                                                               }
	|dobled  CONTENIDO                                           {
                                                                 $$=new Padre.default("L_CONTENIDO",$1);
                                                                 $$.AgregarHijo($2);
                                                               }
;

CONTENIDO:
	id                                                           {
                                                                 $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);

                                                               }
	|id PREDICADO                                                { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                                 $$.AgregarHijo($2);
                                                               }
	|FUNCIONES                                                   { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|EXPRESION                                                   { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|EJES                                                        { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|dosp                                                        { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|punto                                                       { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|por                                                         { $$=new Padre.default("CONTENIDO","");
                                                                 $$.AgregarHijo($1);
                                                               }
	|arroba por                                                  {
                                                                  $$=new Padre.default("CONTENIDO","");
                                                                  $$.AgregarHijo($1+$2)
                                                                }
;

PREDICADO:
	 PREDICADO corizq EXPRESION corder                          {
                                                                $$=new Padre.default("PREDICADO","");
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|corizq EXPRESION corder                                    {
                                                                $$=new Padre.default("PREDICADO","");
                                                                $$.AgregarHijo($2);
                                                              }
;

EXPRESION:
	 EXPRESION mas EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION menos EXPRESION                                  { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION por EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION div EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION mod EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION or EXPRESION                                     { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION and EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION igual EXPRESION                                  { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION dif EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION menor EXPRESION                                  { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION mayor EXPRESION                                  { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION menori EXPRESION                                 { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|EXPRESION mayori EXPRESION                                 { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION req EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION rne EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION rlt EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION rle EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION rgt EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |EXPRESION rge EXPRESION                                    { $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
	|parizq EXPRESION parder                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Padre.default($1,""));
                                                                $$.AgregarHijo($2);
                                                                $$.AgregarHijo(new Padre.default($3,""));
                                                              }
	|EXPRESION diagonal EXPRESION                               {
                                                                $$=new Padre.default("EXPRESION",$2);
                                                                $$.AgregarHijo($1);
                                                                $$.AgregarHijo($3);
                                                              }
  |rsubstring parizq id coma EXPRESION coma EXPRESION  parder {
                                                                 $$=new Padre.default("EXPRESION",$1);
                                                                 $$.AgregarHijo($3);
                                                                 $$.AgregarHijo($5);
                                                                 $$.AgregarHijo($7);
                                                              }
	|arroba id                               { $$=new Padre.default("EXPRESION",$1+$2); }
	|arroba por                              { $$=new Padre.default("EXPRESION",$1+$2); }
	|FUNCIONES                               { $$=new Padre.default("EXPRESION",$1); }
	|cadena                                  { $$=new Padre.default("EXPRESION",$1); }
	|rdecimal                                { $$=new Padre.default("EXPRESION",$1); }
	|rentero                                 { $$=new Padre.default("EXPRESION",$1); }
	|punto                                   { $$=new Padre.default("EXPRESION",$1); }
	|dosp                                    { $$=new Padre.default("EXPRESION",$1); }
	|id                                      { $$=new Padre.default("EXPRESION",$1); }
	|cadenas                                 { $$=new Padre.default("EXPRESION",$1); }
	;

FUNCIONES:
	 FUNCION parizq parder                   { $$=$1 }
;

FUNCION:
	 rlast                                   { $$=new Padre.default("FUNCION",$1); }
	|rposition                               { $$=new Padre.default("FUNCION",$1); }
	|rnode                                   { $$=new Padre.default("FUNCION",$1); }
	|rtext                                   { $$=new Padre.default("FUNCION",$1); }
;

EJES:
	 EJES EJE dospuntos dospuntos CONTEJES  {
                                            $$=new Padre.default("EJES",null)
                                            $$.AgregarHijo($1);
                                            $$.AgregarHijo($2);
                                            $$.AgregarHijo($5);
                                          }
  | EJE dospuntos dospuntos CONTEJES      {
                                            $$=new Padre.default("EJE","");
                                            $$=AgregarHijo($1);
                                            $$.AgregarHijo($4);
                                          }
;

CONTEJES:
	 id                       { $$=new Padre.default($1,""); }

	|id PREDICADO             { $$=new Padre.default($1,"");
                              $$.AgregarHijo($2);
                            }
	|CONTEJES L_CONTENIDO     {
                              $$ = new Padre.default("CONT_EJES","")
                              $$.AgregarHijo($1);
                              $$.AgregarHijo($2);
                            }
	|L_CONTENIDO              { $$=$1 }
;

EJE:
	 rancestros       {
                      $$=new Padre.default("EJE",$1);
                    }
	|rancestro        {
                      $$=new Padre.default("EJE",$1);
                    }
	|ratributo        {
                      $$=new Padre.default("EJE",$1);
                    }
	|rchild           {
                      $$=new Padre.default("EJE",$1);
                    }
	|rdescenos        {
                      $$=new Padre.default("EJE",$1);
                    }
	|rdescen          {
                      $$=new Padre.default("EJE",$1);
                    }
	|rseguidorh       {
                      $$=new Padre.default("EJE",$1);
                    }
	|rseguidor        {
                      $$=new Padre.default("EJE",$1);
                    }
	|rnombres         {
                      $$=new Padre.default("EJE",$1);
                    }
	|rparent          {
                      $$=new Padre.default("EJE",$1);
                    }
	|rprecedings      {
                      $$=new Padre.default("EJE",$1);
                    }
	|rpreceding       {
                      $$=new Padre.default("EJE",$1);
                    }
	|rself            {
                      $$=new Padre.default("EJE",$1);
                    }
;
