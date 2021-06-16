
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
        : L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER     {$$ = new arreglos.default($1,@1.first_line,@1.first_column, $3);}
        | CORCHETEIZQ EXPRESION CORCHETEDER                 {$$ = new arreglos.default(null,@1.first_line,@1.first_column, $2);}
        | PARIZQ EXPRESION PARDER COMA                      {$$ = new parentesis.default($2,@1.first_line,@1.first_column, $4);}
        | PARIZQ EXPRESION PARDER                           {$$ = new parentesis.default($2,@1.first_line,@1.first_column, null);}
        ;

EXPRESION
        : CADENA                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
        | entero                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
        | NUMBER                                                {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
        | L_CORCHETES                                           {$$=$1}
        | CARACTER_LITERAL                                      {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
        | STRING_LITERAL                                        {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
        | ALL                                                   {$$=$1}
        | AXES                                                  {$$=$1}
        | ATRIBUTO                                              {$$=$1}
        | IDENTIFICADOR                                         {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
        | PREDICADOS                                            {$$=$1}
        | EXPRESION MENOS EXPRESION                             {$$=new aritmetica.default(aritmetica.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MAS EXPRESION                               {$$=new aritmetica.default(aritmetica.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MULTIPLICACION EXPRESION                    {$$=new aritmetica.default(aritmetica.Operadores.MULTIPLICACION,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION DIVISION EXPRESION                          {$$=new aritmetica.default(aritmetica.Operadores.DIVISION,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION IGUAL EXPRESION                             {$$=new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION NOIGUAL EXPRESION                           {$$=new relacional.default(relacional.Relacionales.NOIGUAL,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MENORQUE EXPRESION                          {$$=new relacional.default(relacional.Relacionales.MENOR,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MENORIGUAL EXPRESION                        {$$=new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MAYORQUE EXPRESION                          {$$=new relacional.default(relacional.Relacionales.MAYOR,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MAYORIGUAL EXPRESION                        {$$=new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION OR EXPRESION                                {$$=new logica.default(logica.Logicas.OR,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION AND EXPRESION                               {$$=new logica.default(logica.Logicas.AND,@1.first_line,@1.first_column,$1,$3);}
        | EXPRESION MODULO EXPRESION                            {$$=new aritmetica.default(aritmetica.Operadores.MODULADOR,@1.first_line,@1.first_column,$1,$3);}
        | MENOS EXPRESION %prec UMENOS	                        { $$=$1+$2; }
        | LAST PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | POSITION PARIZQ PARDER                                {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | NODE PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
        | TEXT PARIZQ PARDER                                    {$$ = new especiales.default($1,@1.first_line,@1.first_column);}
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

