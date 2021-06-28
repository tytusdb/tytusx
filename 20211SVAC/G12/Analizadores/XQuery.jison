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
"/"                     { console.log("Reconocio : "+ yytext); return 'BARRA'}
")"                     { console.log("Reconocio : "+ yytext); return 'PARC'}
"$"                     { console.log("Reconocio : "+ yytext); return 'DOLAR'}
"{"                     { console.log("Reconocio : "+ yytext); return 'LLAVEA'}
"}"                     { console.log("Reconocio : "+ yytext); return 'LLAVEC'}
"["                     { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                     { console.log("Reconocio : "+ yytext); return 'CORC'}

/* Operadores Relacionales */
"<="                    { console.log("Reconocio : "+ yytext); return 'MENOR_IGUAL'}
">="                    { console.log("Reconocio : "+ yytext); return 'MAYOR_IGUAL'}
"="                     { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"<"                     { console.log("Reconocio : "+ yytext); return 'MENOR'}
">"                     { console.log("Reconocio : "+ yytext); return 'MAYOR'}
"!="                    { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}
":"                    { console.log("Reconocio : "+ yytext); return 'DOSPUNTOS'}
","                    { console.log("Reconocio : "+ yytext); return 'COMA'}

/* Operadores Aritmeticos */
"+"                     { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                     { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                     { console.log("Reconocio : "+ yytext); return 'POR'}
"div"                   { console.log("Reconocio : "+ yytext); return 'DIV'}
"@"                     { console.log("Reconocio : "+ yytext); return 'ARROBA'}

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
%left 'IGUAL' 'DIFERENTE' 'MENOR' 'MENOR_IGUAL' 'MAYOR'  'MAYOR_IGUAL' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MODULO'
%nonassoc 'POT'
%right 'UNARIO'
%right 'PARA' 'CORA'

%start INICIO

%% /* Gramatica */


INICIO : RAIZ EOF {  $$=$1; return $$ };

RAIZ:  RAIZ  INSTRUCCION
        | INSTRUCCION
        ;

INSTRUCCION: FOR E IN INSTRUCCION
    | LET E DOSPUNTOS IGUAL PARA DECIMAL TO DECIMAL PARC
    | WHERE E
    | ORDER E
    | RETURN E
    | RETURN MENOR ID MAYOR LLAVEA E LLAVEC MENOR BARRA ID MAYOR
    | RETURN SENTECIAS_CONTROL
    | SENTECIAS_CONTROL
    | BARRA E
    | BARRA BARRA E
    ;

SENTECIAS_CONTROL: IF PARA PARAMETROS PARC
    | THEN MENOR ID MAYOR LLAVEA PARAMETROS LLAVEC MENOR BARRA ID MAYOR
    | ELSE MENOR ID MAYOR LLAVEA PARAMETROS LLAVEC MENOR BARRA ID MAYOR
    | DECLARE FUNCTION ID DOSPUNTOS ID PARA  PARAMETROS PARC
    | AS ID DOSPUNTOS ID LLAVEA PARAMETROS LLAVEC
    ;

PARAMETROS: PARAMETROS LISTA_PARAMETROS
    | LISTA_PARAMETROS
    ;

LISTA_PARAMETROS: DOLAR ID
    | BARRA E
    | BARRA BARRA E
    | BARRA ARROBA E
    | ID
    | AS ID DOSPUNTOS ID COMA
    | AS ID DOSPUNTOS ID
    | ID PARA PARAMETROS PARC
    | LET DOLAR ID DOSPUNTOS IGUAL E
    //OTROS
    | RETURN E
    ;

E: E MAS E
    | E MENOS E
    | E POR E
    | E DIV E
    | E MENOR E
    | E MENOR_IGUAL E
    | E MAYOR E
    | E MAYOR_IGUAL E
    | E IGUAL E
    | E DIFERENTE E
    | PARA E PARC
    | CORA E CORC
    | DOLAR ID //RETURN
    | ID PARA E PARC //RETURN
    | ID
    | CADENA
    | ENTERO
    | DECIMAL
    ;