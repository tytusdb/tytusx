/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
num     [0-9]+
id      [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

%%

/* Simbolos del programa */
"("                     { console.log("Reconocio : "+ yytext); return 'PARA'}
"//"                     { console.log("Reconocio : "+ yytext); return 'BARRABARRA'}
"/"                     { console.log("Reconocio : "+ yytext); return 'BARRA'}
")"                     { console.log("Reconocio : "+ yytext); return 'PARC'}
"$"                     { console.log("Reconocio : "+ yytext); return 'DOLAR'}
"{"                     { console.log("Reconocio : "+ yytext); return 'LLAVEA'}
"}"                     { console.log("Reconocio : "+ yytext); return 'LLAVEC'}
"["                     { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                     { console.log("Reconocio : "+ yytext); return 'CORC'}
".."                    { console.log("Reconocio : "+ yytext); return 'PUNTOPUNTO'}
"."                     { console.log("Reconocio : "+ yytext); return 'PUNTO'}
"|"                     { console.log("Reconocio : "+ yytext); return 'SIGNOO'}
"::"                    { console.log("Reconocio : "+ yytext); return 'DOSPUNTOS'}

/* Operadores Relacionales */
"<="                    { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">="                    { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"="                     { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"<"                     { console.log("Reconocio : "+ yytext); return 'MENORQUE'}
">"                     { console.log("Reconocio : "+ yytext); return 'MAYORQUE'}
"!="                    { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}
":"                    { console.log("Reconocio : "+ yytext); return 'DOSPUNTOS'}
","                    { console.log("Reconocio : "+ yytext); return 'COMA'}
"@"                     { console.log("Reconocio : "+ yytext); return 'ARROBA'}

/* Operadores Aritmeticos */
"+"                     { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                     { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                     { console.log("Reconocio : "+ yytext); return 'POR'}
"div"                   { console.log("Reconocio : "+ yytext); return 'DIV'}
"mod"                   { console.log("Reconocio : "+ yytext); return 'MODULO'}

/* Operadores Logicos */
"and"                   { console.log("Reconocio : "+ yytext); return 'AND'}
"or"                    { console.log("Reconocio : "+ yytext); return 'OR'}

/* Palabras reservadas */
"for"                   { console.log("Reconocio : "+ yytext); return 'FOR'}
"in"                    { console.log("Reconocio : "+ yytext); return 'IN'}
"let"                   { console.log("Reconocio : "+ yytext); return 'LET'}
"where"                 { console.log("Reconocio : "+ yytext); return 'WHERE'}
"order by"              { console.log("Reconocio : "+ yytext); return 'ORDER'}
"return"                { console.log("Reconocio : "+ yytext); return 'RETURN'}
"to"                    { console.log("Reconocio : "+ yytext); return 'TO'}
"if"                    { console.log("Reconocio : "+ yytext); return 'IF'}
"then"                  { console.log("Reconocio : "+ yytext); return 'THEN'}
"else"                  { console.log("Reconocio : "+ yytext); return 'ELSE'}
"declare"               { console.log("Reconocio : "+ yytext); return 'DECLARE'}
"function"              { console.log("Reconocio : "+ yytext); return 'FUNCTION'}
"as"                    { console.log("Reconocio : "+ yytext); return 'AS'}
"let"                   { console.log("Reconocio : "+ yytext); return 'LET'}
"data"                   { console.log("Reconocio : "+ yytext); return 'DATA'}

//XPATH
"last()"                { console.log("Reconocio : "+ yytext); return 'LAST'}
"position()"            { console.log("Reconocio : "+ yytext); return 'POSITION'}
"ancestor"              { console.log("Reconocio : "+ yytext); return 'ANCESTOR'}
"attribute"             { console.log("Reconocio : "+ yytext); return 'ATTRIBUTE'}
"self"                  { console.log("Reconocio : "+ yytext); return 'SELF'} 
"child"                 { console.log("Reconocio : "+ yytext); return 'CHILD'}
"descendant"            { console.log("Reconocio : "+ yytext); return 'DESCENDANT'}
"following"             { console.log("Reconocio : "+ yytext); return 'FOLLOWING'}
"sibling"               { console.log("Reconocio : "+ yytext); return 'SIBLING'}
"namespace"             { console.log("Reconocio : "+ yytext); return 'NAMESPACE'}
"parent"                { console.log("Reconocio : "+ yytext); return 'PARENT'}
"preceding"             { console.log("Reconocio : "+ yytext); return 'PRECENDING'}
"text()"                { console.log("Reconocio : "+ yytext); return 'TEXT'}
"node()"                { console.log("Reconocio : "+ yytext); return 'NODE'}
"last()"                { console.log("Reconocio : "+ yytext); return 'LAST'}
"position()"            { console.log("Reconocio : "+ yytext); return 'POSITION'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b        { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
{num}                       { console.log("Reconocio : "+ yytext); return 'ENTERO'}
{id}                        { console.log("Reconocio id : "+ yytext); return 'ID'}
{cadena}                    { console.log("Reconocio : "+ yytext); return 'CADENA'}

[\s\r\n\t]                  { /* skip whitespace */ }

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));        
                        }
/lex

%{
    const evaluar = require('../Clases/Evaluar');
    const aritmetica= require('../Clases/Expreciones/Operaciones/Aritmetica');
    const relacional = require('../Clases/Expreciones/Operaciones/Relaciones');
    const logica = require('../Clases/Expreciones/Operaciones/Logicas');
    const primitivo = require('../Clases/Expreciones/Primitivo');
    
    const identificador= require('../Clases/Expreciones/Identificador');
    const last= require('../Clases/Expreciones/last');
    const position = require ('../Clases/Expreciones/position');
    const ternario= require('../Clases/Expreciones/Ternario');
    const ast =require('../Clases/AST/Ast');
    const declaracion = require ('../Clases/Instrucciones/Declaracion');
    const asignacion = require ('../Clases/Instrucciones/Asignacion');
    const funcion = require ('../Clases/Instrucciones/Funcion');
    const llamada = require ('../Clases/Instrucciones/Llamada');
    const ejecutar = require ('../Clases/Instrucciones/Ejecutar');
    const Print = require ('../Clases/Instrucciones/Print');
    const Ifs = require ('../Clases/Instrucciones/SentenciaControl/Ifs');
    const While = require ('../Clases/Instrucciones/SentenciaCiclos/While');
    const dowhile =require ('../Clases/Instrucciones/SentenciaCiclos/DoWhile');
    const For =require ('../Clases/Instrucciones/SentenciaCiclos/For');
    const simbolo= require ('../Clases/TablaSimbolos/Simbolos');
    const tipo= require ('../Clases/TablaSimbolos/Tipo');
    const detener = require ('../Clases/Instrucciones/SentenciaTransferencia/Break');
    const continuar = require ('../Clases/Instrucciones/SentenciaTransferencia/continuar');
    const retornar = require ('../Clases/Instrucciones/SentenciaTransferencia/retornar');
    const sw = require ('../Clases/Instrucciones/SentenciaControl/SW');
    const cs = require ('../Clases/Instrucciones/SentenciaControl/CS');
    const acceso= require ('../Clases/xpath/acceso');
    const barrabarra= require ('../Clases/xpath/barrabarra');
    const informacion = require ('../Clases/xpath/informacion');
    const axes = require ('../Clases/xpath/axes');
    const axesbarrabarra = require ('../Clases/xpath/axesbarrabarra');
    const instrucciondoble =require ('../Clases/xpath/intrucciondoble');
    const puntopunto =require ('../Clases/xpath/puntopunto');
%}

/* Precedencia de operadores */


%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE'  'MAYORIGUAL' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MODULO'
%nonassoc 'POT'
%right 'UNARIO'
%right 'PARA' 'CORA'

%start INICIO

%% /* Gramatica */


INICIO
    : VARIAS EOF {  $$=$1; return $$ };


VARIAS: INSTRUCCIONES SIGNOO INSTRUCCIONES {$$=new instrucciondoble.default($1,$3);}
        |INSTRUCCIONES {$$=$1}
        ;

INSTRUCCIONES : SENTENCIAS INSTRUCCIONES
            |   SENTENCIAS
            ;

SENTENCIAS: FOR DOLAR ID IN PARAMETROS
    | WHERE DOLAR ID PARAMETROS
    | ORDER DOLAR ID PARAMETROS
    | RETURN DOLAR ID PARAMETROS
    | RETURN DOLAR ID
    | LET DOLAR ID DOSPUNTOS IGUAL PARAMETROS
    | RETURN IF PARA DOLAR ID PARAMETROS  PARC
    | THEN DATA PARA DOLAR ID PARAMETROS  PARC
    | ELSE DATA PARA DOLAR ID PARAMETROS  PARC
    ;

PARAMETROS: LISTA_PARAMETROS PARAMETROS
    | LISTA_PARAMETROS
    ;

LISTA_PARAMETROS : BARRA e
    | BARRABARRA e
    | RESERV DOSPUNTOS e
    | BARRA RESERV DOSPUNTOS e
    | BARRA PUNTOPUNTO
    | BARRABARRA RESERV DOSPUNTOS e
    | PARA OPERADORES TO OPERADORES PARC
    | LISTA_PARAMETROS MENORQUE LISTA_PARAMETROS
    | LISTA_PARAMETROS MAYORQUE LISTA_PARAMETROS
    | LISTA_PARAMETROS MENORIGUAL LISTA_PARAMETROS
    | LISTA_PARAMETROS MAYORIGUAL LISTA_PARAMETROS
    | LISTA_PARAMETROS MAS LISTA_PARAMETROS
    | LISTA_PARAMETROS MENOS LISTA_PARAMETROS
    | LISTA_PARAMETROS POR LISTA_PARAMETROS
    | LISTA_PARAMETROS DIV LISTA_PARAMETROS
    | LISTA_PARAMETROS MODULO LISTA_PARAMETROS
    | LISTA_PARAMETROS AND LISTA_PARAMETROS
    | LISTA_PARAMETROS OR LISTA_PARAMETROS
    | LISTA_PARAMETROS DIFERENTE LISTA_PARAMETROS
    | LISTA_PARAMETROS IGUAL LISTA_PARAMETROS
    | DATA PARA OPERADORES PARC
    | PARA OPERADORES PARC
    | ENTERO
    | DECIMAL
    | ID
    | CADENA
    ;

RESERV :  LAST
    | POSITION
    | ANCESTOR RESERVLARGE
    | ATTRIBUTE
    | ANCESORSELF
    | CHILD
    | DESCENDANT RESERVLARGE
    | DESCENDANT
    | FOLLOWING  MENOS SIBLING
    | FOLLOWING
    | NAMESPACE
    | PARENT
    | PRECENDING
    | PRECENDING MENOS SIBLING
    | SELF
    | TEXT
    | NODE
    | SIBLING
    ;

RESERVLARGE :   MENOS OR MENOS SELF
    |   MENOS SIBLING
    ;

e :   ID
    | ARROBA ID
    | ARROBA POR
    | POR
    //| ARROBA OPERADORES
    | ID CORA OPERADORES CORC
    | ENTERO
    | DECIMAL
    | CADENA
    ;
 
    
OPERADORES :  OPERADORES MAS OPERADORES
    | OPERADORES MENOS OPERADORES
    | OPERADORES POR OPERADORES
    | OPERADORES DIV OPERADORES
    | OPERADORES MODULO OPERADORES
    | OPERADORES AND OPERADORES
    | OPERADORES OR OPERADORES
    | OPERADORES MAYORQUE OPERADORES
    | OPERADORES MAYORIGUAL OPERADORES
    | OPERADORES MENORQUE OPERADORES
    | OPERADORES MENORIGUAL OPERADORES
    | OPERADORES DIFERENTE OPERADORES
    | OPERADORES IGUAL OPERADORES
    | MENOS OPERADORES %prec UNARIO
    | DATA PARA OPERADORES PARC
    | PARA OPERADORES PARC
    | DECIMAL
    | ENTERO
    | ID 
    | LAST
    | POSITION
    | CADENA
    | ARROBA ID
    ;