
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
const arreglos = require("./Instrucciones/Arreglos")
const parentesis= require("./Expresiones/ParentesisExpresion");
const axes=require("./Funciones/Axes")
const especiales= require("./Funciones/Especiales")
const nativo= require("./Expresiones/Nativo");
const Tipo= require("./Simbolos/Tipo");
const aritmetica= require("./Expresiones/Aritmetica");
const logica= require("./Expresiones/Logica");
const relacional= require("./Expresiones/Relacional");

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
.                     return 'INVALID'
/lex

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'lparen' 'rparen'
%left 'OR'
%left 'AND'
%left 'IGUAL' 'NOIGUAL'
%left 'MAYORQUE''MENORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%
/* Definición de la gramática */


START 
        : INSTRUCCIONES  EOF                   {return $1;}
        ;

INSTRUCCIONES
        :  INSTRUCCION INSTRUCCIONES          {if($1!=false)$2.push($1);$$=$2;}
        | INSTRUCCION                           {$$=($1!=false) ?[$1]:[];}
        | INSTRUCCION OPTION INSTRUCCIONES          {if($1!=false)$3.push($1);$$=$3;}
        ;

INSTRUCCION 
        :BARRA BARRA  EXPRESION               {$$ = new barrasnodo.default($1,$3,@1.first_line,@1.first_column, $2);}
        | BARRA    EXPRESION                  {$$ = new barrasnodo.default($1,$2,@1.first_line,@1.first_column, null);}
        | ATRIBUTO                            {$$=$1}
        | AXES                                {$$=$1}
        | ALL                                 {$$=$1}
        | %empty
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

PREDICADOS
        :INSTRUCCION                                    {$$=($1!=false) ?[$1]:[];}
        | IDENTIFICADOR  L_CORCHETES                    {$$ = new predicado.default($1,$2,@1.first_line,@1.first_column);}
        ;



L_CORCHETES
        : CORCHETEIZQ EXPRESION CORCHETEDER L_CORCHETES    {$$ = new arreglos.default($4,@1.first_line,@1.first_column, $2);}
        | CORCHETEIZQ EXPRESION CORCHETEDER                 {$$ = new arreglos.default(null,@1.first_line,@1.first_column, $2);}
        | PARIZQ EXPRESION PARDER COMA                      {$$ = new parentesis.default($2,@1.first_line,@1.first_column, $4);}
        | PARIZQ EXPRESION PARDER                           {$$ = new parentesis.default($2,@1.first_line,@1.first_column, null);}
        ;




/**********************************CAMBIO****************************************/
EXPRESION
        : TERMINO OPLOGICAS TERMINO                         {$$=new logica.default($2,@1.first_line,@1.first_column,$1,$3);}
        | TERMINO OPARITMETICAS TERMINO                     {$$=new aritmetica.default($2,@1.first_line,@1.first_column,$1,$3);}
        | TERMINO OPRELACIONAL TERMINO                      {new relacional.default($2,@1.first_line,@1.first_column,$1,$3);}
        | UNARIO TERMINO  %prec UMENOS                      {$$=new aritmetica.default($1,@1.first_line,@1.first_column,$2,null);}
        | TERMINO                                           {$$=$1}
        | L_CORCHETES                                       {$$=$1}
        | ALL                                               {$$=$1}
        | AXES                                              {$$=$1}
        | ATRIBUTO                                          {$$=$1}
        | PREDICADOS                                        {$$=$1}
        ;

TERMINO 
        : CADENA                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
        | entero                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
        | NUMBER                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
        | CARACTER_LITERAL                                      {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
        | STRING_LITERAL                                        {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
        | IDENTIFICADOR                                         {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
        | LAST PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | POSITION PARIZQ PARDER                                {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | NODE PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | TEXT PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | EXPRESION                                             {$$=$1}
        ;

OPLOGICAS
        : IGUAL                              {$$=relacional.Relacionales.IGUAL}
        | NOIGUAL                            {$$=relacional.Relacionales.NOIGUAL}
        | MENORQUE                           {$$=relacional.Relacionales.MENOR}
        | MENORIGUAL                         {$$=relacional.Relacionales.MENORIGUAL}
        | MAYORQUE                           {$$=relacional.Relacionales.MAYOR}
        | MAYORIGUAL                         {$$=relacional.Relacionales.MAYORIGUAL}
        ;
OPARITMETICAS
        :  MENOS                   {$$=aritmetica.Operadores.RESTA}
        |  MAS                     {$$=aritmetica.Operadores.SUMA}
        |  MULTIPLICACION          {$$=aritmetica.Operadores.MULTIPLICACION}
        |  DIVISION                {$$=aritmetica.Operadores.DIVISION}
        |  MODULO                  {$$=aritmetica.Operadores.MODULADOR}
        ;
OPRELACIONAL
        : OR                                {$$=logica.Logicas.OR}
        | AND                               {$$=logica.Logicas.AND}
        ;
UNARIO
        : MENOS                   {$$=aritmetica.Operadores.MENOSNUM}
        ;



AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS EXPRESION                    {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS EXPRESION                {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS EXPRESION                   {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);} 
        |CHILD DOSPUNTOS DOSPUNTOS EXPRESION                       {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |DESCENDENT DOSPUNTOS DOSPUNTOS EXPRESION                  {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);} 
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS EXPRESION              {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |FOLLOWING DOSPUNTOS DOSPUNTOS EXPRESION                   {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION              {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |NAMESPACE DOSPUNTOS DOSPUNTOS EXPRESION                   {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |PARENT DOSPUNTOS DOSPUNTOS EXPRESION                      {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |PRECEDING DOSPUNTOS DOSPUNTOS EXPRESION                   {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION              {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        |SELF DOSPUNTOS DOSPUNTOS EXPRESION                        {$$ = new axes.default($1,$4,@1.first_line,@1.first_column);}
        ;