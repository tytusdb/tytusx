
%{

const barrasnodo= require("./Instrucciones/BarrasNodo")
const identificador= require("./Expresiones/Identificador");
const CErrores= require("./Excepciones/Errores")
const CNodoErrores= require("./Excepciones/NodoErrores")
const inicio = require("../../../componentes/contenido-inicio/contenido-inicio.component")
const selectroot= require("./Instrucciones/SelectRoot")
const todo = require("./Instrucciones/todo")
const atributosimple = require("./Instrucciones/AtributosSimples")
const atributosexpresion = require("./Instrucciones/AtributosExpresion")
const atributospredicado = require("./Instrucciones/AtributosPredicado")
const predicado = require("./Instrucciones/Predicados")


%}
%lex
%options case-insensitive

entero [0-9]+("."[0-9]+)?

caracterliteral (\'[^']*\')
stringliteral (\"(\\\"|[^"]|\n)*\")
comentario_linea  ("//".*\r\n)|("//".*\n)|("//".*\r)
comentario_multiple (/*[^"]**/)
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
%%

\s+                                 /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

"ancestor-or-self"    return 'ANCESTORSELF'
"descendant-or-self"  return 'DESCENDENTSELF'
"following-sibling"   return 'FOLLOWINGSIBLI'
"preceding-sibling"   return 'PRECEDINGSIBLI'
{entero}	      return 'entero'
{stringliteral}       return 'STRING_LITERAL'
{caracterliteral}     return 'CARACTER_LITERAL'
"ancestor"            return 'ANCESTOR'
"attribute"           return 'ATTRIBUTE'        
"child"               return 'CHILD'
"descendant"          return 'DESCENDENT'
"following"           return 'FOLLOWING'
"namespace"           return 'NAMESPACE'
"parent"              return 'PARENT'
"preceding"           return 'PRECEDING'
"self"                return 'SELF'
"last"                return 'LAST'
"position"            return 'POSITION'
"node"                return 'NODE'
"text"                return 'TEXT'
"or"                  return 'OR'
"and"                 return 'AND'
"mod"                 return 'MODULO'
"div"                 return 'DIVISION'
"@"                   return 'ATRIBUTOS'
([a-zA-Z])[a-zA-Z0-9_!#$%&(),.\*\^Ññáéíúó]*	  return 'IDENTIFICADOR';
\"[^\"]*\"        return 'CADENA';
[0-9]+("."[0-9]+)\b      return 'DECIMAL';

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"/"                   return 'BARRA'

"<="                  return 'MENORIGUAL'
">="                  return 'MAYORIGUAL'
"<"                   return 'MENORQUE'
">"                   return 'MAYORQUE'
"?"                   return 'INTERROGACION'
"="                   return 'IGUAL'
"("                   return 'PARIZQ'
")"                   return 'PARDER'
"["                   return 'CORCHETEIZQ'
"]"                   return 'CORCHETEDER'
","                   return 'COMA'




"|"                   return 'OPTION'         
"+"                   return 'MAS'
"-"                   return 'MENOS'
"*"                   return 'MULTIPLICACION' /* SELECTALL TAMBIEN*/

"="                   return 'IGUAL'
"!="                  return 'NOIGUAL'
":"                   return 'DOSPUNTOS'



"."                   return 'SELECT'

<<EOF>>               return 'EOF'
.                      {inicio.listaErrores.push(new CNodoErrores.default("Lexico","No se esperaba el caracter: "+yytext,yylloc.first_line,yylloc.first_column)); console.log("Lexico, No se esperaba el caracter: "+yytext +" Linea: "+ yylloc.first_line + "Columna: " + yylloc.first_column);}
/lex

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'lparen' 'rparen'
%left 'OR'
%left 'AND'
%left 'IGUAL' 'NOIGUAL'
%left 'MAYORQUE''MENORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'
%left UMENOS
// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%
/* Definición de la gramática */


START 
        : INSTRUCCIONES  EOF                   {return $1;}
        ;

INSTRUCCIONES
        : INSTRUCCIONES INSTRUCCION             {if($2!=false)$1.push($2);$$=$1;}
        | INSTRUCCION                           {$$=($1!=false) ?[$1]:[];}
        | INSTRUCCIONES OPTION INSTRUCCION      {if($3!=false)$1.push($3);$$=$1;}

        ;

INSTRUCCION 
        
        : BARRA BARRA  EXPRESION                        {$$ = new barrasnodo.default($1,$3,@1.first_line,@1.first_column, $2);}
        | BARRA    EXPRESION                            {$$ = new barrasnodo.default($1,$2,@1.first_line,@1.first_column, null);}
        | ATRIBUTO                                      {$$=$1}
        | AXES                                          {$$=$1}
        | ALL                                           {$$=$1}

        ;
PREDICADOS
        :INSTRUCCION                                    {$$=($1!=false) ?[$1]:[];}
        | IDENTIFICADOR  L_CORCHETES                    {$$ = new predicado.default($1,$2,@1.first_line,@1.first_column);}
        ;
ALL 
        : SELECT  SELECT                        {$$ = new selectroot.default($1,@1.first_line,@1.first_column, $2);}
        | SELECT                                {$$ = new selectroot.default($1,@1.first_line,@1.first_column, null);}
        | MULTIPLICACION                        {$$ = new todo.default($1,@1.first_line,@1.first_column);}
        ;
ATRIBUTO 
        : ATRIBUTOS EXPRESION                           {$$ = new atributosexpresion.default($1,$2,@1.first_line,@1.first_column);}
        | ATRIBUTOS SELECT                              {$$ = new atributosimple.default($1,$2,@1.first_line,@1.first_column);}
        | ATRIBUTOS MULTIPLICACION                      {$$ = new atributosimple.default($1,$2,@1.first_line,@1.first_column);}
        | ATRIBUTOS IDENTIFICADOR  L_CORCHETES          {$$ = new atributospredicado.default($2,$3,@1.first_line,@1.first_column);}
        ; 

L_CORCHETES
        : L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER     {$$= $1+$3}
        | CORCHETEIZQ EXPRESION CORCHETEDER                 {$$=$2}
        | PARIZQ EXPRESION PARDER COMA                      {$$= $2}
        | PARIZQ EXPRESION PARDER                           {$$=$2}
        ;

EXPRESION
        : CADENA                                                {$$=$1}
        | NUMBER                                                {$$=$1}
        | entero                                                {$$=$1}
        | CARACTER_LITERAL                                      {$$=$1}
        | STRING_LITERAL                                        {$$=$1}
        | ALL                                                   {$$=$1}
        | ATRIBUTO                                              {$$=$1}
        | IDENTIFICADOR                                         {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
        | PREDICADOS                                            {$$=$1}
        | EXPRESION COMA EXPRESION                              {$$=$1+$3}
        | EXPRESION MENOS EXPRESION                             {$$=$1+$3}
        | EXPRESION MAS EXPRESION                               {$$=$1+$3}
        | EXPRESION MENOS EXPRESION                             {$$=$1+$3}
        | EXPRESION MULTIPLICACION EXPRESION                    {$$=$1+$3}
        | EXPRESION DIVISION EXPRESION                          {$$=$1+$3}
        | EXPRESION IGUAL EXPRESION                             {$$=$1+$3}
        | EXPRESION NOIGUAL EXPRESION                           {$$=$1+$3}
        | EXPRESION MENORQUE EXPRESION                          {$$=$1+$3}
        | EXPRESION MENORIGUAL EXPRESION                        {$$=$1+$3}
        | EXPRESION MAYORQUE EXPRESION                          {$$=$1+$3}
        | EXPRESION MAYORIGUAL EXPRESION                        {$$=$1+$3}
        | EXPRESION OR EXPRESION                                {$$=$1+$3}
        | EXPRESION AND EXPRESION                               {$$=$1+$3}
        | EXPRESION MODULO EXPRESION                            {$$=$1+$3}
        | MENOS EXPRESION %prec UMENOS	                        { $$=$1+$2; }
        | LAST PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | POSITION PARIZQ PARDER                                {$$=$1+ $2+ $3}
        | NODE PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | TEXT PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        ;
        

AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS EXPRESION                    {$$=$1+"::"+$4}
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS EXPRESION                {$$=$1+"::"+$4}
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS EXPRESION                   {$$=$1+"::"+$4}
        |CHILD DOSPUNTOS DOSPUNTOS EXPRESION                       {$$=$1+"::"+$4}
        |DESCENDENT DOSPUNTOS DOSPUNTOS EXPRESION                  {$$=$1+"::"+$4} 
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS EXPRESION              {$$=$1+"::"+$4}
        |FOLLOWING DOSPUNTOS DOSPUNTOS EXPRESION                  {$$=$1+"::"+$4}
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION             {$$=$1+"::"+$4}
        |NAMESPACE DOSPUNTOS DOSPUNTOS EXPRESION                  {$$=$1+"::"+$4}
        |PARENT DOSPUNTOS DOSPUNTOS EXPRESION                     {$$=$1+"::"+$4}
        |PRECEDING DOSPUNTOS DOSPUNTOS EXPRESION                  {$$=$1+"::"+$4}
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION             {$$=$1+"::"+$4}
        |SELF DOSPUNTOS DOSPUNTOS EXPRESION                       {$$=$1+"::"+$4}
        ;

