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
[t]([a-zA-Z_0-9])+              return 'TEMPORAL'
[v]([0-9]+)?                    return 'VALOR_RET'
[s]([0-9]+)?                    return 'PILA'
[r][a]([0-9]+)?                 return 'RA'
[p]                             return 'PUNTERO'
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
.                     console.log("ERROR LEXICO")
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
        : FUNCION VOIDS                 {$$=$1+$2}
        | VOIDS                         {$$=$1}
        ;

VOIDS
        : VOID MAIN PARIZQ PARDER LLAVEIZQ INSTRUCCIONES LLAVEDER               {$$=$6;}
        | VOID IDENTIFICADOR PARIZQ PARDER LLAVEIZQ INSTRUCCIONES LLAVEDER      {$$=$6;}
        | INCLUDE LIBRERIA                                                      {$$=$1+$2}
        | DECLARACION_MULTIPLE                                                  {$$=$1}
        | DECLARACION                                                           {$$=$1}
        ;

DECLARACION_MULTIPLE
        : TIPO TERMINO COMA                                                     {$$=$1+$2+$3}
        | TIPO TERMINO PTCOMA                                                   {$$=$1+$2+$3}
        | DECLARACION_MULTIPLE                                                  {$$=$1}
        | TERMINO COMA                                                          {$$=$1+$2}
        | TERMINO PTCOMA                                                        {$$=$1+$2}
        ;

DECLARACION
        : TIPO IDENTIFICADOR L_CORCHETES PTCOMA                 {$$=$1+$2+$3}
        | DOUBLE STACK L_CORCHETES PTCOMA                       {$$=$1+$2+$3}
        | DOUBLE HEAP L_CORCHETES PTCOMA                        {$$=$1+$2+$3}
        ;



INSTRUCCIONES 
        : INSTRUCCIONES INSTRUCCION                     {$1.push($2); $$ = $1;}
        | INSTRUCCION                                   {$$ = [$1];}
        ;

INSTRUCCION 
        : ASIGNACION                                            {$$=$1}
        | ASIGNACION PTCOMA                                     {$$=$1+$2}
        | EXIT PTCOMA                                           {$$=$1+$2}
        | EXIT                                                  {$$=$1}
        | GOTO IDENTIFICADOR PTCOMA                             {$$=$1+$2+$3}
        | GOTO IDENTIFICADOR                                    {$$=$1+$2}
        | IF PARIZQ EXPRESION PARDER GOTO IDENTIFICADOR PTCOMA  {$$=$1+$2+$3+$4+$5+$6+$7}
        | IF PARIZQ EXPRESION PARDER GOTO IDENTIFICADOR         {$$=$1+$2+$3+$4+$5+$6}
        | IDENTIFICADOR DOSPUNTOS PTCOMA                        {$$=$1+$2+$3}
        | IDENTIFICADOR DOSPUNTOS                               {$$=$1+$2}
        | TIPO_PRINT PARIZQ EXPRESION PARDER PTCOMA             {$$=$1+$2+$3+$4+$5}
        | TIPO_PRINT PARIZQ EXPRESION PARDER                    {$$=$1+$2+$3+$4}
        | UNSET PARIZQ TERMINO PARDER PTCOMA                    {$$=$1+$2+$3+$4+$5}
        | UNSET PARIZQ TERMINO PARDER                           {$$=$1+$2+$3+$4}
        | RETURN_INS PTCOMA                                     {$$=$1}
        ;
TIPO_PRINT
        : IMPRIMIR              {$$=$1}
        | IMPRIMIRF             {$$=$1}
        ;

ASIGNACION
        : TEMPORALES IGUAL EXPRESION                      {$$=$1+"="+$3}
        | TEMPORALES L_CORCHETES IGUAL EXPRESION          {$$=$1+$2+$3+$4}
        | IDENTIFICADOR PARIZQ PARDER                     {$$=$1+$2+$3}
        ;

L_CORCHETES
        : L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER   {$$=$1+$2+$3+$4}
        | CORCHETEIZQ EXPRESION CORCHETEDER               {$$=$1+$2+$3}
        ;


EXPRESION
        : TERMINO                                       {$$=$1}
        | TERMINO OPLOGICA TERMINO                      {$$=$1+$2+$3}
        | TERMINO OPBIT TERMINO                         {$$=$1+$2+$3}
        | TERMINO OPRELACIONAL TERMINO                  {$$=$1+$2+$3}
        | MENOS TERMINO %prec UMENOS                    {$$=$1+$2}
        | NOT_BIT TERMINO %prec NOT                     {$$=$1+$2}
        | NOT TERMINO %prec NOTR                        {$$=$1+$2}
        | TERMINO OPARITMETICA TERMINO                  {$$=$1+$2+$3}
        | READ PARIZQ PARDER                            {$$=$1+$2+$3}
        | ABS PARIZQ TERMINO PARDER                     {$$=$1+$2+$3}
        | ARRAY PARIZQ PARDER                           {$$=$1}
        | PARIZQ TIPO PARDER TERMINO                    {$$=$1+$2+$3+$4}
        | CADENA COMA PARIZQ TIPO PARDER TERMINO        {$$=$1+$2+$4+$6}
        ;

TERMINO
        : TEMPORAL                              {$$=$1}
        | RA                                    {$$=$1}
        | PILA                                  {$$=$1}
        | ENTERO                                {$$=$1}
        | IDENTIFICADOR                         {$$=$1}
        | DECIMAL                               {$$=$1}
        | CADENA                                {$$=$1}
        | PUNTERO                               {$$=$1}
        | VALOR_RET                             {$$=$1}
        | AND_BIT  TEMPORAL                     {$$=$1}
        | TEMPORALES L_CORCHETES                {$$=$1+$2}
        | EXPRESION                             {$$=$1}
        ;

TEMPORALES
        : TEMPORAL                              {$$=$1}
        | VALOR_RET                             {$$=$1}
        | RA                                    {$$=$1}
        | PILA                                  {$$=$1}
        | PUNTERO                               {$$=$1}
        | STACK                                 {$$=$1}
        | HEAP                               {$$=$1}
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
        ;

