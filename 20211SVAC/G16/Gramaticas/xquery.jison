%{
  const Padre=require("../app/Clases/Models/Nodo.js");
  const Tipo=require("../app/Clases/Hijos/Tipo.js");
  const Funcion=require("../app/Clases/Hijos/Funciones.js");
  const Parametros=require("../app/Clases/Hijos/Parametros.js");
  const Declaracion=require("../app/Clases/Hijos/Declaracion.js");
  const Operacion=require("../app/Clases/Hijos/Operaciones.js");
  const tipoOperacion=require("../app/Clases/Hijos/TipoOperacion.js");
  const Objeto=require("../app/Clases/Models/Objeto.js");
  const Atributo=require("../app/Clases/Models/Atributo.js");
  const Return=require("../app/Clases/Hijos/Return.js");
  const OrderBy=require("../app/Clases/Hijos/OrderBy.js");
  const Where=require("../app/Clases/Hijos/Where.js");
  const Funcioncita=require("../app/Clases/Hijos/Funcioncitas.js");
  const Loop=require("../app/Clases/Hijos/Loop.js");
  const For=require("../app/Clases/Hijos/For.js");
  const If=require("../app/Clases/Hijos/If.js");
  const Llamado=require("../app/Clases/Hijos/Llamados.js");
  const Contenido=require("../app/Clases/Hijos/Contenido.js");
  const Listado=require("../app/Clases/Hijos/Listado.js");
  const Listita=require("../app/Clases/Hijos/Listita.js");
  const Sentencia=require("../app/Clases/Hijos/Sentencias.js");
  const Operador=require("../app/Clases/Hijos/Operador.js");
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
"lower-case"            return 'rlower';
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
"number"                return 'rnumber';
//HTML
"div"                   return 'rdiv';
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
/*precedencia*/
%left 'or' 'and'

%left 'diferente' 'igual'
%left 'menori' 'mayori' 'menor' 'mayor' 'req' 'rne' 'rlt' 'rle' 'rgt' 'rge'

%left 'mas' 'menos'
%left 'por' 'div' 'mod'

%right 'not'
%right 'UMINUS'
//Gramatica

%start S

%%

S: COMIENZO EOF { return $1; };


COMIENZO
	: XPATH                                                             {$$=$1}
  | XQUERY                                                            {$$=$1}
;

XQUERY
	: XQUERY SENTENCIAS                                                 {
                                                                       // Listita.Listita.add($2);
                                                                        $1.push($2);
                                                                      }
  | XQUERY DECLARACIONES                                              {
                                                                     //   Listita.Listita.add($2);
                                                                        $1.push($2);
                                                                      }
  | SENTENCIAS                                                        {
                                                                       // Listita.Listita.add($1);
                                                                        $$=[$1];
                                                                      }
  | DECLARACIONES                                                     {

                                                                        $$=[$1];

                                                                      }
;
SENTENCIAS
  : SENTENCIAS FORS                                                   {
                                                                         $$=new Sentencia.Sentencia($2,$1,"Instrucción");
                                                                      }
  | SENTENCIAS LETS                                                   {
                                                                         $$=new Sentencia.Sentencia($2,$1,"Instrucción");
                                                                      }
  | SENTENCIAS IFS                                                    {
                                                                         $$=new Sentencia.Sentencia($2,$1,"Instrucción");
                                                                      }
  | SENTENCIAS ETIQUETAS                                              {
                                                                         $$=new Sentencia.Sentencia($2,$1,"Instrucción");
                                                                      }
  | SENTENCIAS RETURN                                                 {
                                                                        $$=new Sentencia.Sentencia($2,$1,"Instrucción");
                                                                      }
  | FORS                                                              {$$=$1}
  | LETS                                                              {$$=$1}
  | IFS                                                               {$$=$1}
  | RETURN                                                            {$$=$1}
  | ETIQUETAS                                                         {$$=$1}
;

FORS
  : rfor variable rin XPATH CONSULTAR                                 {
                                                                        $$=new For.For($2,"",$4,$5,@1.first_line, @1.first_column);
                                                                      }
  | rfor variable rat variable rin XPATH CONSULTAR                    {
                                                                        $$=new For.For($2,$4,$6,$7,@1.first_line, @1.first_column);
                                                                      }
  | rfor LOOP CONSULTAR                                               {
                                                                        $$=new For.For("","",$2,$3,@1.first_line, @1.first_column);
                                                                      }
;

LOOP
  : variable rin parizq ORDENAMIENTO parder coma LOOP                      {
                                                                       $$=new Loop.Loop($1,$4,@1.first_line, @1.first_column,$7);
                                                                      }
  | variable rin parizq ORDENAMIENTO parder                                {
                                                                       $$=new Loop.Loop($1,$4,@1.first_line, @1.first_column,null);

                                                                      }

;



FUNCIONCITAS
  : rdata parizq EXP parder                                           {
                                                                        $$=new Funcioncita.Funcioncita($3,null,null,@1.first_line, @1.first_column);
                                                                      }
  | rupper parizq CONDICION parder                                    {
                                                                        $$=new Funcioncita.Funcioncita($3,null,null,@1.first_line, @1.first_column);
                                                                      }
  | rlower parizq CONDICION parder                                    {
                                                                        $$=new Funcioncita.Funcioncita($3,null,null,@1.first_line, @1.first_column);
                                                                      }
  | rnumber CONDICION                                                 {
                                                                        $$=new Funcioncita.Funcioncita($2,null,null,@1.first_line, @1.first_column);
                                                                      }
  | rstring CONDICION                                                 {
                                                                        $$=new Funcioncita.Funcioncita($2,null,null,@1.first_line, @1.first_column);
                                                                      }
  | rsubstring parizq variable coma CONDICION coma CONDICION parder   {
                                                                        $$=new Funcioncita.Funcioncita($3,$5,$7,@1.first_line, @1.first_column);
                                                                      }

;

CONSULTAR
  : WHERE ORDER RETURN                                          { $$=new Padre.default("INSTRUCCIONES","");
                                                                  $$.AgregarHijo($1);
                                                                  $$.AgregarHijo($2);
                                                                  $$.AgregarHijo($3);
                                                                }
  | WHERE RETURN                                                { $$=new Padre.default("INSTRUCCIONES","");
                                                                  $$.AgregarHijo($1);
                                                                  $$.AgregarHijo($2);
                                                                }
  | ORDER RETURN                                                { $$=new Padre.default("INSTRUCCIONES","");
                                                                  $$.AgregarHijo($1);
                                                                  $$.AgregarHijo($2);
                                                                }
  | RETURN                                                      { $$=$1;}

;
WHERE
  : rwhere CONDICION                                            {
                                                                  $$=new Where.Where($2,@1.first_line, @1.first_column);
                                                                }
;

ORDER
  : rorder rby ORDENAMIENTO                                     {
                                                                  $$=new OrderBy.OrderBy($3,@1.first_line, @1.first_column);
                                                                }
;

ORDENAMIENTO
  : ORDENAMIENTO coma ORDENAMIENTO                               {
                                                                    $1.push($3);
                                                                    $$=$1;
                                                                 }
  | CONDICION rto CONDICION                                       {
                                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.TO,$1,$3)
                                                                  }

  | CONDICION                                                   {
                                                                    $$=[$1]

                                                                }
;

RETURN
  : rreturn                                                     {
                                                                  $$=new Return.Return("nothing",@1.first_line, @1.first_column);
                                                                }
  | rreturn ETIQUETAS                                           {
                                                                  $$=new Return.Return($2,@1.first_line, @1.first_column);
                                                                }
  | rreturn IFS                                                 {
                                                                  $$=new Return.Return($2,@1.first_line, @1.first_column);
                                                                }
  | rreturn CONDICION                                           {
                                                                  $$=new Return.Return($2,@1.first_line, @1.first_column);
                                                                }
;

ETIQUETAS
  : menor id mayor CONTENT menor diagonal id mayor              {
                                                                  $$=new Objeto.default($2,$7,"",null,$4,false,@1.first_line, @1.first_column);
                                                                }
  | menor id ATRIBUTOS mayor CONTENT menor diagonal id mayor    {
                                                                  $$=new Objeto.default($2,$8,"",$3,$5,false,@1.first_line, @1.first_column);
                                                                }

;

CONTENT
  : CONTENT llaveizq EXP llaveder                  {
                                                     $$=new Contenido.Contenido("",$3,$1);
                                                   }
  | CONTENT TEXTO                                  {
                                                     $$=new Contenido.Contenido($2,null,$1);
                                                   }
  | llaveizq EXP llaveder                          {
                                                     $$=new Contenido.Contenido("",$2,null);
                                                   }
  | TEXTO                                          {
                                                     $$=new Contenido.Contenido($1,null,null);
                                                   }

;

EXP
  : CONDICION                                       {
                                                      $$=$1
                                                   }
  | FUNCIONCITAS                                   {
                                                      $$=$1
                                                   }
  | LLAMADOS                                       {
                                                      $$=$1
                                                   }
;

LLAMADOS
  : id dospuntos id parizq ORDENAMIENTO  parder            {
                                                              $$=new Llamado.Llamado($1,$3,$5);
                                                            }
;

//local:minPrice($book/price,$book/discount)}
CONDICION:
	 CONDICION mas CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.SUMA,$1,$3);
                                                   }
	|CONDICION menos CONDICION                       {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.RESTA,$1,$3);
                                                   }
	|CONDICION por CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MULTIPLICACION,$1,$3);
                                                   }
	|CONDICION div CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.DIVISION,$1,$3);
                                                   }
	|CONDICION mod CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MODAL,$1,$3);
                                                   }
	|CONDICION or CONDICION                          {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.OR,$1,$3);
                                                   }
	|CONDICION and CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.AND,$1,$3);
                                                   }
	|CONDICION igual CONDICION                       {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.IGUAL,$1,$3);
                                                   }
	|CONDICION dif CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.DIFERENTE,$1,$3);
                                                   }
	|CONDICION menor CONDICION                       {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MENOR,$1,$3);
                                                   }
	|CONDICION mayor CONDICION                       {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MAYOR,$1,$3);
                                                   }
	|CONDICION menori CONDICION                      {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MENORI,$1,$3);
                                                   }
	|CONDICION mayori CONDICION                      {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MAYORI,$1,$3);
                                                   }
  |CONDICION req CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.IGUALU,$1,$3);
                                                   }
  |CONDICION rne CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.DIFERENTEU,$1,$3);
                                                   }
  |CONDICION rlt CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MENORU,$1,$3);
                                                   }
  |CONDICION rle CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MENORIU,$1,$3);
                                                   }
  |CONDICION rgt CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MAYORU,$1,$3);
                                                   }
  |CONDICION rge CONDICION                         {
                                                    $$=new Operacion.Operacion(tipoOperacion.Operador.MAYORIU,$1,$3);
                                                   }
  | resta rdecimal                                 {
                                                    $$=new Operador.Operador(Tipo.Tipo.DECIMAL,$1+$2,null);
                                                   }
  | resta rentero                                  {
                                                    $$=new Operador.Operador(Tipo.Tipo.INTEGER,$1+$2,null);
                                                   }
	|parizq CONDICION parder                         {
                                                    $$=$2;
                                                   }
	|cadena                                          { $$=new Operador.Operador(Tipo.Tipo.STRING,$1,null); }
	|rdecimal                                        { $$=new Operador.Operador(Tipo.Tipo.DECIMAL,$1,null); }
	|rentero                                         { $$=new Operador.Operador(Tipo.Tipo.INTEGER,$1,null);}
	|id                                              { $$=new Operador.Operador(Tipo.Tipo.ID,$1,null); }
	|cadenas                                         { $$=new Operador.Operador(Tipo.Tipo.STRING,$1,null); }
  |variable diagonal id                            {
                                                     $$=new Operador.Operador(Tipo.Tipo.VARIABLE,$1,$3);
                                                   }
  |variable                                        { $$=new Operador.Operador(Tipo.Tipo.VARIABLE,$1,null); }
	;


IFS
  : rif parizq CONDICION parder rthen SENTENCIAS relse SENTENCIAS   {
                                                                      $$=new If.If($3,$6,$8,@1.first_line, @1.first_column);
                                                                    }
  | rif parizq CONDICION parder rthen SENTENCIAS                    {
                                                                      $$=new If.If($3,$6,null,@1.first_line, @1.first_column);
                                                                    }
;

LETS
  : rlet variable dospuntos igual ASIGNACIONES  {
                                                 $$=new Declaracion.Declaracion($2,$5,@1.first_line, @1.first_column,"Instrucción");
                                                }
  | rlet variable                               {
                                                 $$=new Declaracion.Declaracion($2,null,@1.first_line, @1.first_column,"Instrucción");
                                                }
;

ASIGNACIONES
  : XPATH                                       {
                                                  $$=$1;
                                                }
  | parizq ORDENAMIENTO parder                  {
                                                  $$=$2;
                                                }
  | parizq FUNCIONCITAS parder                  {
                                                  $$=$2;
                                                }
  | CONDICION                                   {
                                                  $$=$1;
                                                }
  | FUNCIONCITAS                                {
                                                  $$=$1;
                                                }

;

TIPOS :
   rinteger inter     {
                        $$=Tipo.Tipo.INTEGER;
                      }
  |decimal inter      {
                        $$=Tipo.Tipo.DECIMAL;
                      }
  |rstring inter      {

                        $$=Tipo.Tipo.STRING;
                      }
  |rboolean inter     {

                        $$=Tipo.Tipo.BOOLEAN;
                      }
  |rdata inter        {

                        $$=Tipo.Tipo.DATA;
                      }
  |rfloat inter       {

                        $$=Tipo.Tipo.FLOAT;
                      }
;

DECLARACIONES
  :rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma {
                                                                                                                                $$=new Funcion.default($3,$5,$7,$12,$14,@1.first_line, @1.first_column,"Instrucción");
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq parder ras rxs dospuntos TIPOS llaveizq SENTENCIAS llaveder puntocoma            {
                                                                                                                                $$=new Funcion.default($3,$5,null,$11,$13,@1.first_line, @1.first_column,"Instrucción");
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq PARAMETROS parder ras rxs dospuntos TIPOS parder  llaveder puntocoma             {
                                                                                                                                $$=new Funcion.default($3,$5,$7,$12,null,@1.first_line, @1.first_column,"Instrucción");
                                                                                                                              }
  |rdeclare rfunction id dospuntos id parizq  parder ras rxs dospuntos TIPOS llaveizq  parder puntocoma                       {
                                                                                                                                $$=new Funcion.default($3,$5,null,$11,null,@1.first_line, @1.first_column,"Instrucción");
                                                                                                                              }
;

PARAMETROS
  : variable ras rxs dospuntos TIPOS coma PARAMETROS  {
                                                        $$=new Parametros.Parametros($1,$5,@1.first_line, @1.first_column,$7);
                                                      }
  | variable ras rxs dospuntos TIPOS                  {
                                                        $$=new Parametros.Parametros($1,$5,@1.first_line, @1.first_column,null);
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
	 EXPRESION mas EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.SUMA,$1,$3));
                                                              }
	|EXPRESION menos EXPRESION                                  { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.RESTA,$1,$3));
                                                              }
	|EXPRESION por EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MULTIPLICACION,$1,$3));
                                                              }
	|EXPRESION div EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIVISION,$1,$3));
                                                              }
	|EXPRESION mod EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MODAL,$1,$3));
                                                              }
	|EXPRESION or EXPRESION                                     { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.OR,$1,$3));
                                                              }
	|EXPRESION and EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.AND,$1,$3));
                                                              }
	|EXPRESION igual EXPRESION                                  { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.IGUAL,$1,$3));
                                                              }
	|EXPRESION dif EXPRESION                                    { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIFERENTE,$1,$3));
                                                              }
	|EXPRESION menor EXPRESION                                  { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENOR,$1,$3));
                                                              }
	|EXPRESION mayor EXPRESION                                  { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYOR,$1,$3));
                                                              }
	|EXPRESION menori EXPRESION                                 { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORI,$1,$3));
                                                              }
	|EXPRESION mayori EXPRESION                                 { $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORI,$1,$3));
                                                              }
  |EXPRESION req EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.IGUALU,$1,$3));
                                                              }
  |EXPRESION rne EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIFERENTEU,$1,$3));
                                                              }
  |EXPRESION rlt EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORU,$1,$3));
                                                              }
  |EXPRESION rle EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MENORIU,$1,$3));
                                                              }
  |EXPRESION rgt EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORU,$1,$3));
                                                              }
  |EXPRESION rge EXPRESION                                    {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.MAYORIU,$1,$3));
                                                              }
	|parizq EXPRESION parder                                    {
                                                                $$=$2;
                                                              }
	|EXPRESION diagonal EXPRESION                               {
                                                                $$=new Padre.default("EXPRESION","");
                                                                $$.AgregarHijo(new Operacion.Operacion(tipoOperacion.Operador.DIVISION,$1,$3));
                                                              }
  |rsubstring parizq id coma EXPRESION coma EXPRESION  parder {
                                                                $$=new Padre.default("FUNCIONCITAS",$1);
                                                                $$.AgregarHijo(new Funcioncita.Funcioncita($3,$5,$7));
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
