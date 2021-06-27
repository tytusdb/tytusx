%{


const CErrores= require("./Excepciones/Errores")
const CNodoErrores= require("./Excepciones/NodoErrores")
const inicio = require("../../../componentes/contenido-inicio/contenido-inicio.component")
const Tipo= require("./Simbolo/Tipo");
const aritmetica= require("./Expresion/Aritmetica");
const logica= require("./Expresion/Logica");
const bit= require("./Expresion/Bit");
const concatenacion= require("./Expresion/Concatenar");
const relacional= require("./Expresion/Relacional");
const conversion= require("./Expresion/Conversion");
const unario= require("./Expresion/Unario");
const Sentencia= require("./Expresion/Sentencia");
const termino= require("./Expresion/Termino");
const identificador= require("./Expresion/Identificador");
//instrucciones
const Llamada= require("./Instrucciones/Llamada");
const Asignacion= require("./Instrucciones/Asignacion");
const Declaracion= require("./Instrucciones/Declaracion");
const Funcion= require("./Instrucciones/Funcion");
const AsignacionEstructura= require("./Instrucciones/AsignacionEstructura");
const Estructura= require("./Instrucciones/Estructura");
const Etiqueta= require("./Instrucciones/Etiqueta");
const Exit= require("./Instrucciones/Exit");
const Print= require("./Instrucciones/Print");
const SaltoCondicional= require("./Instrucciones/SaltoCondicional");
const SaltoIncondicional= require("./Instrucciones/SaltoIncondicional");
const Unset= require("./Instrucciones/Unset");
%}
%lex
%options case-insensitive

entero [0-9]+("."[0-9]+)?


escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
%%

\s+                                 /* skip whitespace */

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {}             // comentario multiple líneas
"//".*                                  {}           // comentario simple línea

{entero}                return 'ENTERO'
"int"                   return 'INT'
"double"                return 'DOUBLE'
"float"                 return 'FLOAT' 
"char"                  return 'CHAR'        
"goto"                  return 'GOTO'
"exit"                  return 'EXIT'
"abs"                   return 'ABS'
"print"                 return 'IMPRIMIR'
"printf"                return 'IMPRIMIRF'
"snprintf"              return 'SNPRINT'
"unset"                 return 'UNSET'
"if"                    return 'IF'
"xor"                   return 'XOR'
"read"                  return 'READ'
"array"                 return 'ARRAY'
"heap"                  return 'HEAP'
"stack"                 return "STACK"
"void"                  return 'VOID'
"main"                  return 'MAIN'
"return"                return "RETURN_INS"



[0-9]+("."[0-9]+)?\b            return 'NUMBER'
[$][t]([a-zA-Z_0-9])+              return 'TEMPORAL'
[$][v]([0-9]+)?                    return 'VALOR_RET'
[$][s]([0-9]+)?                    return 'PILA'
[$][r][a]([0-9]+)?                 return 'RA'
[$][p]                             return 'PUNTERO'
[<]([a-zA-Z"."]+)[>]                return 'LIBRERIA'
"#include"                      return 'INCLUDE'

([a-zA-Z])[a-zA-Z0-9_Ññáéíúó]*       return 'IDENTIFICADOR';
\"[^\"]*\"                          { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'                          { yytext=yytext.substr(1,yyleng-2); return 'CARACTER'; }
[0-9]+("."[0-9]+)\b                  return 'DECIMAL';


"+"                   return 'MAS'
"-"                   return 'MENOS'
"*"                   return 'MULTIPLICACION'
"/"                   return 'DIVISION'
"%"                   return 'MODULO'
"=="                  return 'IGUALQUE'
"="                   return 'IGUAL'

"<="                  return 'MENORIGUAL'
">="                  return 'MAYORIGUAL'
"<"                   return 'MENORQUE'
">"                   return 'MAYORQUE'
"!="                  return 'NOIGUAL'
"!"                   return 'NOT'
"xor"                 return 'XOR'
"\^"                  return 'XOR_BIT'

"~"                   return 'NOT_BIT'

"("                   return 'PARIZQ'
")"                   return 'PARDER'
"["                   return 'CORCHETEIZQ'
"]"                   return 'CORCHETEDER'
"{"                   return 'LLAVEIZQ'
"}"                   return 'LLAVEDER'
","                   return 'COMA'

"%c"                  return 'VALCHAR';
"%e"                  return 'VALNUM';
"%d"                  return 'VALDEC';

"&"                   return 'AND_BIT'  
"|"                   return 'OR_BIT'     
"&&"                  return 'AND'  
"||"                  return 'OR'  


";"                   return 'PTCOMA'
":"                   return 'DOSPUNTOS'
">>"                  return 'SHIFTDER'
"<<"                  return 'SHIFTIZQ'

<<EOF>>               return 'EOF'
.                     {inicio.listaErrores.push(new CNodoErrores.default("Lexico","No se esperaba el caracter: "+yytext,yylloc.first_line,yylloc.first_column)); console.log("Lexico, No se esperaba el caracter: "+yytext +" Linea: "+ yylloc.first_line + "Columna: " + yylloc.first_column);}
/lex

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'lparen' 'rparen'
%left 'OR'
%left 'AND'
%left 'IGUAL' 'NOIGUAL'
%left 'MAYORQUE''MENORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'
%left 'UMENOS''NOT''NOTR'
// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%
/* Definición de la gramática */


START 
        : FUNCION  EOF                   {return $1;}
        ;
FUNCION
        : FUNCION VOIDS                 {$1.push($2); $$ = $1;}
        | VOIDS                         {$$ = [$1];}
        ;

VOIDS
        : TIPO MAIN PARIZQ PARDER LLAVEIZQ INSTRUCCIONES LLAVEDER               {$$= new Funcion.default($1+" "+$2+" "+$3+" "+$4+" "+$5+"\n",$6,@1.first_line,@1.first_column);}
        | TIPO IDENTIFICADOR PARIZQ PARDER LLAVEIZQ INSTRUCCIONES LLAVEDER      {$$= new Funcion.default($1+" "+$2+" "+$3+" "+$4+" "+$5+"\n",$6,@1.first_line,@1.first_column);}
        | INCLUDE LIBRERIA                                                      {$$=$1+$2}
        | DECLARACION_MULTIPLE                                                  {$$=$1}
        | DECLARACION                                                           {$$=$1}
        ;

DECLARACION_MULTIPLE
        : TIPO TERMINO COMA                                                     {$$=$1+" "+$2+$3+" "}
        | TIPO TERMINO PTCOMA                                                   {$$=$1+" "+$2+$3}
        | TERMINO COMA                                                          {$$=$1+$2+" "}
        | TERMINO PTCOMA                                                        {$$=$1+$2}
        ;

DECLARACION
        : TIPO IDENTIFICADOR L_CORCHETES PTCOMA                 {$$= new Declaracion.default($1+" "+$2,$3,@1.first_line,@1.first_column);}
        | DOUBLE STACK L_CORCHETES PTCOMA                       {$$= new Declaracion.default($1+" "+$2,$3,@1.first_line,@1.first_column);}
        | DOUBLE HEAP L_CORCHETES PTCOMA                        {$$= new Declaracion.default($1+" "+$2,$3,@1.first_line,@1.first_column);}
        ;



INSTRUCCIONES 
        : INSTRUCCIONES INSTRUCCION                     {$1.push($2); $$ = $1;}
        | INSTRUCCION                                   {$$ = [$1];}
        ;

INSTRUCCION 
        : ASIGNACION                                            {$$=$1}
        | ASIGNACION PTCOMA                                     {$$=$1}
        | EXIT PTCOMA                                           {$$= new Exit.default(@1.first_line,@1.first_column);}
        | EXIT                                                  {$$= new Exit.default(@1.first_line,@1.first_column);}
        | GOTO IDENTIFICADOR PTCOMA                             {$$= new SaltoIncondicional.default($1,@1.first_line,@1.first_column);}
        | GOTO IDENTIFICADOR                                    {$$= new SaltoIncondicional.default($1,@1.first_line,@1.first_column);}
        | IF PARIZQ EXPRESION PARDER GOTO IDENTIFICADOR PTCOMA  {$$= new SaltoCondicional.default($3,$6,@1.first_line,@1.first_column);}
        | IF PARIZQ EXPRESION PARDER GOTO IDENTIFICADOR         {$$= new SaltoCondicional.default($3,$6,@1.first_line,@1.first_column);}
        | IDENTIFICADOR DOSPUNTOS PTCOMA                        {$$= new Etiqueta.default($1,@1.first_line,@1.first_column);}
        | IDENTIFICADOR DOSPUNTOS                               {$$= new Etiqueta.default($1,@1.first_line,@1.first_column);}
        | TIPO_PRINT PARIZQ EXPRESION PARDER PTCOMA             {$$= new Print.default($3,@1.first_line,@1.first_column);}
        | TIPO_PRINT PARIZQ EXPRESION PARDER                    {$$= new Print.default($3,@1.first_line,@1.first_column);}
        | UNSET PARIZQ TERMINO PARDER PTCOMA                    {$$= new Unset.default($3,@1.first_line,@1.first_column);}
        | UNSET PARIZQ TERMINO PARDER                           {$$= new Unset.default($3,@1.first_line,@1.first_column);}
        | RETURN_INS PTCOMA                                     {$$= new Sentencia.default(null,@1.first_line,@1.first_column);}
        | RETURN_INS EXPRESION PTCOMA                           {$$= new Sentencia.default($2,@1.first_line,@1.first_column);}
        ;

TIPO_PRINT
        : IMPRIMIR              {$$=$1}
        | IMPRIMIRF             {$$=$1}
        | SNPRINT               {$$=$1}
        ;

ASIGNACION
        : TEMPORALES IGUAL EXPRESION                      {$$= new Asignacion.default($1,$3,@1.first_line,@1.first_column);}
        | TEMPORALES L_CORCHETES IGUAL EXPRESION          {$$= new AsignacionEstructura.default($1,$3,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARIZQ PARDER                     {$$= new Llamada.default($1,@1.first_line,@1.first_column);}
        ;

L_CORCHETES
        : L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER   {$1.push($3); $$ = $1;}
        | CORCHETEIZQ EXPRESION CORCHETEDER               {$$ = [$2];}
        ;


EXPRESION
        : TERMINO                                       {$$=$1}
        | TERMINO COMA TERMINO                          {$$=$1+$2+$3}
        | TERMINO OPLOGICA TERMINO                      {$$= new logica.default($1,$2,$3,@1.first_line,@1.first_column);}
        | TERMINO OPBIT TERMINO                         {$$= new bit.default($1,$2,$3,@1.first_line,@1.first_column);}
        | TERMINO OPRELACIONAL TERMINO                  {$$= new relacional.default($1,$2,$3,@1.first_line,@1.first_column);}
        | MENOS TERMINO %prec UMENOS                    {$$= new unario.default($1,$2,@1.first_line,@1.first_column);}
        | NOT_BIT TERMINO %prec NOT                     {$$= new unario.default($1,$2,@1.first_line,@1.first_column);}
        | NOT TERMINO %prec NOTR                        {$$= new unario.default($1,$2,@1.first_line,@1.first_column);}
        | TERMINO OPARITMETICA TERMINO                  {$$= new aritmetica.default($1,$2,$3,@1.first_line,@1.first_column);}
        | PARIZQ TIPO PARDER TERMINO                    {$$= new conversion.default($1,$2,$3,@1.first_line,@1.first_column);}
        ;




TERMINO
        : TEMPORAL                              {$$=new termino.default(new Tipo.default(Tipo.tipoDato.TEMPORAL),$1,@1.first_line,@1.first_column);}
        | RA                                    {$$=$1}
        | PILA                                  {$$=$1}
        | ENTERO                                {$$=new termino.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
        | IDENTIFICADOR L_CORCHETES             {$$= new Estructura.default($1,$2,@1.first_line,@1.first_column);}
        | IDENTIFICADOR                         {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
        | DECIMAL                               {$$=new termino.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
        | CADENA                                {$$=new termino.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);} 
        | PUNTERO                               {$$=new termino.default(new Tipo.default(Tipo.tipoDato.PUNTERO),$1,@1.first_line,@1.first_column);}
        | VALOR_RET                             {$$=$1}
        | AND_BIT  TEMPORAL                     {$$=$1}
        | TEMPORALES L_CORCHETES                {$$= new Estructura.default($1,$2,@1.first_line,@1.first_column);}
        | EXPRESION                             {$$=$1}
        ;

TEMPORALES
        : TEMPORAL                              {$$=new termino.default(new Tipo.default(Tipo.tipoDato.TEMPORAL),$1,@1.first_line,@1.first_column);}
        | VALOR_RET                             {$$=$1}
        | RA                                    {$$=$1}
        | PILA                                  {$$=$1}
        | PUNTERO                               {$$=new termino.default(new Tipo.default(Tipo.tipoDato.PUNTERO),$1,@1.first_line,@1.first_column);}
        | STACK                                 {$$=new termino.default(new Tipo.default(Tipo.tipoDato.STACK),$1,@1.first_line,@1.first_column);}
        | HEAP                                  {$$=new termino.default(new Tipo.default(Tipo.tipoDato.HEAP),$1,@1.first_line,@1.first_column);}
        ;


UNARIO
        : NOT_BIT               {$$=$1}
        | NOT                   {$$=$1}
        | MENOS                 {$$=$1}
        ;

OPRELACIONAL
        : AND                   {$$=$1}
        | OR                    {$$=$1}
        | XOR                   {$$=$1}
        ;
OPLOGICA
        : MENORQUE              {$$=$1}
        | MAYORQUE              {$$=$1}
        | MENORIGUAL            {$$=$1}
        | MAYORIGUAL            {$$=$1}
        | IGUALQUE              {$$=$1}
        | NOIGUAL               {$$=$1}
        ;

OPARITMETICA
        : MAS                   {$$=$1}
        | MENOS                 {$$=$1}
        | MULTIPLICACION        {$$=$1}
        | DIVISION              {$$=$1}
        | MODULO                {$$=$1}
        ;

OPBIT
        : SHIFTDER              {$$=$1}
        | SHIFTDER              {$$=$1}
        | AND_BIT               {$$=$1}
        | OR_BIT                {$$=$1}
        | XOR_BIT               {$$=$1}
        ;


TIPO
        : INT                   {$$=$1}
        | FLOAT                 {$$=$1}
        | CHAR                  {$$=$1}
        | DOUBLE                {$$=$1}
        | VOID                  {$$=$1}
        ;

