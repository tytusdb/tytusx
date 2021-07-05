
/* description: Parses end executes mathematical expressions. */
%{
    const {Tipo, tipos} = require('./AST/Tipo');
    const {Arbol} = require('./AST/Arbol');
    const {Errror} = require('./AST/Errror');
    const {Primitivo} = require('./Expresiones/Primitivo');
    const {Aritmetica} = require('./Expresiones/Aritmetica');
    const {Relacional} = require('./Expresiones/Relacional');
    const {Logica} = require('./Expresiones/Logica');
    const {Return} = require('./Expresiones/Return');
    const {Continue} = require('./Expresiones/Continue');
    const {Break} = require('./Expresiones/Break');

    const {Identificador} = require('./Instrucciones/Identificador');
    const {Imprimir} = require('./Instrucciones/Imprimir');
    const {Declaracion} = require('./Instrucciones/Declaracion');
    const {Asignacion} = require('./Instrucciones/Asignacion');
    const {If} = require('./Instrucciones/If');
    const {While} = require('./Instrucciones/While');
    const {Do_while} = require('./Instrucciones/Do_while');
    const {Funcion} = require('./Instrucciones/Funcion');
    const {Llamada_funcion} = require('./Instrucciones/Llamada_funcion');
    const {Ternario} = require('./Instrucciones/Ternario');
    const {For} = require('./Instrucciones/For');
    const {Case} = require('./Instrucciones/Case');
    const {Default} = require('./Instrucciones/Default');
    const {Switch} = require('./Instrucciones/Switch');
    const {For_1} = require('./Instrucciones/For_1');
    const {Typo} = require('./Instrucciones/Typo');
    const {Type_object , Set_type} = require('./Instrucciones/Type_object');
    const {Llamada_type} = require('./Instrucciones/Llamada_type');
    const {Arreglo, Pop, Push, SD_Arreglo, GD_Arreglo} = require('./Instrucciones/Arreglo');
    const {Length} = require('./Instrucciones/Length');
    const {To_Upper_Case} = require('./Instrucciones/To_Upper_Case');
    const {To_Lower_Case} = require('./Instrucciones/To_Lower_Case');
    const {Char_At} = require('./Instrucciones/Char_At');
    const {Concat} = require('./Instrucciones/Concat');
    let tipo_dec = "";
    let errores = [];
    let token_error = "";
    let fila_error = 0;
    let columna_error = 0;
    function limpiar_lista(){
            errores = [];
    }
    function unir_listas(lista1, lista2){
        lista1.forEach(element => {
                lista2.push(element);
        });
        return lista2;
    }
%}

/* lexical grammar */
%lex
 %options ranges

D                 [0-9]
NZ                [1-9]
Ds                ("0"|{NZ}{D}*)
BSL               "\\".
%s                comment

%%


((\/\*)[^\*\/]*(\*\/))          /* */
[ \\\t\r\n\f]              /* */
\s+                   /* skip whitespace */
(\/\/[^\n]*)            /* */


"string"                return 'TK_STRING';
"integer"               return 'TK_NUMBER';
"number"                return 'TK_NUMBER';
"boolean"               return 'TK_BOOLEAN';
"void"                  return 'TK_VOID';
"var"                   return 'TK_VAR';
"let"                   return 'TK_LET';
"const"                 return 'TK_CONST';
"any"                   return 'TK_ANY';
"type"                  return 'TK_TYPE';
"then"                  return 'TK_THEN';

"Array"                 return 'TK_ARRAY';
"push"                  return 'TK_PUSH';
"pop"                   return 'TK_POP';
".length"               return 'TK_LENGTH';
"new"                   return 'TK_NEW';

".charAt"                return 'TK_CHARAT';
".toLowerCase"           return 'TK_TOLOWERCASE';
".toUpperCase"           return 'TK_TOUPPERCASE';
".concat"                return 'TK_CONCAT';

"if"                    return 'TK_IF';
"else"                  return 'TK_ELSE';

"switch"                return 'TK_SWITCH';
"case"                  return 'TK_CASE';
"default"               return 'TK_DEFAULT';

"for"                   return 'TK_FOR';
"of"                    return 'TK_OF';
"in"                    return 'TK_IN';

"while"                 return 'TK_WHILE';
"do"                    return 'TK_DO';

"break"                 return 'TK_BREAK';
"continue"              return 'TK_CONTINUE';
"return"                return 'TK_RETURN';
"@"                     return 'TK_RETURN';

"function"              return 'TK_FUNCTION';
"declare"               return 'TK_DECLARE';
"local"                 return 'TK_LOCAL';

"console"               return 'TK_CONSOLE';
"log"                   return 'TK_LOG';

"true"                  return 'TK_TRUE';
"false"                 return 'TK_FALSE';
"and"                   return 'TK_AND';
"or"                    return 'TK_OR';
"eq"                    return 'TK_IGUAL_IGUAL';

"{"                   return 'TK_LL_ABRE';
"}"                   return 'TK_LL_CIERRA';
"("                   return 'TK_P_ABRE';
")"                   return 'TK_P_CIERRA';
"["                   return 'TK_C_ABRE';
"]"                   return 'TK_C_CIERRA';
","                   return 'TK_COMA';
"?"                   return 'TK_INTERROGACION';
":="                  return 'TK_IGUAL';
":"                   return 'TK_DOS_PUNTOS';
";"                   return 'TK_P_COMA';

"<="                  return 'TK_MENOR_IGUAL';
"<"                   return 'TK_MENOR';
"=="                  return 'TK_IGUAL_IGUAL';
">="                  return 'TK_MAYOR_IGUAL';
">"                   return 'TK_MAYOR';
"!="                  return 'TK_DISTINTO';

"||"                  return 'TK_OR';
"&&"                  return 'TK_AND';
"!"                   return 'TK_NOT';

"="                   return 'TK_IGUAL';
"+="                  return 'TK_MAS_IGUAL';
"-="                  return 'TK_MENOS_IGUAL';
"*="                  return 'TK_MULTI_IGUAL';
"/="                  return 'TK_DIV_IGUAL';
"%="                  return 'TK_MOD_IGUAL';

"++"                  return 'TK_MAS_MAS';
"+"                   return 'TK_MAS';
"--"                  return 'TK_MENOS_MENOS';
"-"                   return 'TK_MENOS';
"**"                  return 'TK_ELEVADO';
"*"                   return 'TK_MULTI';
"/"                   return 'TK_DIV';
"%"                   return 'TK_MOD';

"."                   return 'TK_PUNTO';

"null"                return 'TK_NULO';

[_a-zA-Z][a-zA-Z0-9_]*    return 'TK_ID'; /* Varying form */
[$][_a-zA-Z][a-zA-Z0-9_]* return 'TK_ID'; /* Varying form */
({Ds}"."{Ds}+)   			    return 'TK_NUMERO';
{Ds}          				    return 'TK_NUMERO';
"\"\""                    return 'TK_CADENA';
"\""([^"]|{BSL})*"\""     return 'TK_CADENA';
'\'\''                    return 'TK_CADENA';
'\''([^']|{BSL})*'\''     return 'TK_CADENA';

<<EOF>>               return 'EOF';
.  {errores.push(new Errror("lexico", "No se reconoce el caracter: " + yytext, yylloc.first_line, yylloc.first_column))};
/lex
/* operator associations and precedence */

%right TK_INTERROGACION
%left TK_ELSE
%left TK_OR
%left TK_AND
%left TK_IGUAL_IGUAL, TK_DISTINTO
%left TK_MAYOR_IGUAL, TK_MENOR_IGUAL, TK_MENOR, TK_MAYOR
%left TK_MAS TK_MENOS TK_MAS_MAS TK_MENOS_MENOS
%left TK_MULTI TK_DIV TK_MOD
%left TK_ELEVADO


%left TK_NOT
%left P_NEG

%start INIT

%% /* language grammar */

/*INICIO DE GRAMATICA*/
INIT    :   SENTENCIAS EOF {$$ = new Arbol($1, errores); return $$;}
        |   EOF{$$ = new Arbol([],errores); return $$;}
;

FUNCION   :  TK_DECLARE FUNCTION TK_LOCAL TK_DOS_PUNTOS ID PARAMETROS CONT_FUNCION {$$ = new Funcion($5,$6,$7,null,this._$.first_line,this._$.first_column);}
          |  TK_DECLARE FUNCTION TK_LOCAL TK_DOS_PUNTOS ID PARAMETROS DOS_PUNTOS TIPO CONT_FUNCION {$$ = new Funcion($5,$6,$9,$8,this._$.first_line,this._$.first_column);}
;

ERROR_SINTACTIO    :    error TK_P_COMA {
                        errores.push(new Errror("Sintactico", "Se encontro un error cerca del token: "
                        + token_error ,f_error, c_error));}
;

CONT_FUNCION    :    LL_ABRE LISTA_CONT_FUNCION LL_CIERRA {$$ = $2;}
                |    LL_ABRE LL_CIERRA {$$ = [];}
;

LISTA_CONT_FUNCION    :    LISTA_CONT_FUNCION  CONT_BLOQUE_FUNCION { $$ = $1; $$ = unir_listas($2, $$);}
                      |    CONT_BLOQUE_FUNCION  {$$ = []; $$ = unir_listas($1, $$);}
;

CONT_BLOQUE_FUNCION     :     SENTENCIAS {$$ = $1;}
                        |     FUNCION  {$$ = [$1];}
;

PARAMETROS   :   P_ABRE LISTA_PARAMETROS P_CIERRA {$$ = $2;}
             |   P_ABRE P_CIERRA {$$ = [];}
;

LISTA_PARAMETROS    :    LISTA_PARAMETROS COMA PARAMETRO { $$ = $1; $$.push($3);}
                    |    PARAMETRO  {$$ = [$1];}
;

PARAMETRO    :    ID { $$ = new Declaracion("let",null, $1, null, this._$.first_line,this._$.first_column);}
             |    ID DOS_PUNTOS TIPO { $$ = new Declaracion("let",$3, $1, null,this._$.first_line,this._$.first_column);}
;

/******************************************* RAIZ *********************************************************/
SENTENCIAS    :   SENTENCIAS CONT_SENTENCIAS { $$ = $1; $$ = unir_listas($2,$$);}
              |   CONT_SENTENCIAS {$$ = []; $$ = unir_listas($1,$$);}
;

/******************************************* CONTENIDO RAIZ **********************************************/
CONT_SENTENCIAS   :   IMPRIMIR {$$ = [$1];}
                  |   DECLARACION_VARIABLE {$$ = $1;}
                  |   ASiGNACION_VARIABLE {$$ = [$1];}
                  |   SENTENCIA_IF {$$ = [$1];}
                  |   SENTENCIA_WHILE {$$ = [$1];}
                  |   SENTENCIA_DO_WHILE {$$ = [$1];}
                  |   FUNCION {$$ = [$1];}
                  |   LLAMADA_FUNCION{$$ = [$1];}
                  |   RETURN {  $$ = [$1];}
                  |   SENTENCIA_FOR{$$ = [$1];}
                  |   SENTENCIA_FOR_1 {$$ = [$1];}
                  |   SENT_INC_DEC {$$ = [$1];}
                  |   SENTENCIA_SWITCH {$$ = [$1];}
                  |   BREAK {$$ = [$1];}
                  |   CONTINUE {$$ = [$1];}
                  |   ARREGLO_PUSH {$$ = [$1];}
                  |   ARREGLO_POP {$$ = [$1];}
                  |   SD_ARREGLO {$$ = [$1];}
                  |   DECLARACION_TYPE {$$ = [$1];}

 ;
/******************************************* FIN RAIZ ****************************************************/

RETURN    :    RETURN {$$ = new Return(null, this._$.first_line,this._$.first_column);}
          |    RETURN EXPRESION {$$ = new Return($2, this._$.first_line,this._$.first_column);}
;

BREAK   :   BREAK P_COMA{$$ = new Break(this._$.first_line,this._$.first_column);}
;

CONTINUE   :   CONTINUE P_COMA {$$ = new Continue(this._$.first_line,this._$.first_column);}
;

/******************************************* DECLARACION VAR *********************************************/
DECLARACION_VARIABLE    :     TIPO_DECLARACION LISTA_DECLARACION {$$ = $2;}
;

LISTA_DECLARACION     :     LISTA_DECLARACION COMA DECLARACION { $$ = $1; $$.push($3);}
                      |     DECLARACION {$$ = [$1];}
;

DECLARACION     :     ID {$$ = new Declaracion(tipo_dec,null, $1, null, this._$.first_line,this._$.first_column);}
                |     ID IGUAL EXPRESION { $$ = new Declaracion(tipo_dec,null, $1, $3, this._$.first_line,this._$.first_column);}
                |     ID DOS_PUNTOS TIPO { $$ = new Declaracion(tipo_dec,$3, $1, null,this._$.first_line,this._$.first_column);}
                |     ID DOS_PUNTOS TIPO IGUAL EXPRESION { $$ = new Declaracion(tipo_dec,$3, $1, $5,this._$.first_line,this._$.first_column);}
                |     ID DOS_PUNTOS ID IGUAL LL_ABRE LISTA_ASIG_TYPE LL_CIERRA
                            {$$ = new Type_object($1, $3, $6,0,0);}
                |     ID IGUAL CONT_ARREGLO  {$$ = new Arreglo($1,null, $3, 0,0,0);}
                |     ID DOS_PUNTOS TIPO IGUAL CONT_ARREGLO  {$$ = new Arreglo($1,$3, $5, 0,0,0);}
                |     ID DOS_PUNTOS TIPO TIPO_ARREGLO IGUAL CONT_ARREGLO  {$$ = new Arreglo($1,$3, $6, $4,0,0);}
                |     ID DOS_PUNTOS TIPO TIPO_ARREGLO {$$ = new Arreglo($1,$3, [], $4,0,0);}
;

TIPO_DECLARACION    :   LET  {$$ = $1; tipo_dec = $1;}
                    |   CONST {$$ = $1;tipo_dec = $1;}
;
/******************************************* FIN DECLARACION VAR *****************************************/

/******************************************* ASGNACION VAR ***********************************************/
ASiGNACION_VARIABLE     :    ASIGNACION  {$$ = $1;}
                        |    ASIGNACION  {$$ =$1;}

;

ASIGNACION    :    ID IGUAL EXPRESION {$$ = new Asignacion($1,$3,this._$.first_line,this._$.first_column);}
              |    SENT_INC_DEC {$$ = $1;}
              |    LISTA_ID IGUAL EXPRESION {$$ = new Set_type($1, $3, 0, 0);}
;
/******************************************* FIN ASIGNACION VAR ******************************************/

/******************************************* DECLARACION ARREGLO *****************************************/

CONT_ARREGLO   :   C_ABRE LISTA_CONT_ARREGLO C_CIERRA {$$ = $2;}
               |   C_ABRE C_CIERRA {$$ = [];}
               |   EXPRESION {$$ = $1;}

;

LISTA_CONT_ARREGLO   :   LISTA_CONT_ARREGLO COMA CONT_ARREGLO {$$ = $1; $$.push($3);}
                     |   CONT_ARREGLO{$$= [$1];}
;

TIPO_ARREGLO   :   TIPO_ARREGLO CONT_TIPO_ARREGLO {$$ = $1; $$ += $2;}
               |   CONT_TIPO_ARREGLO {$$ = $1;}
;
CONT_TIPO_ARREGLO   :   C_ABRE C_CIERRA {$$ = 1;}
;

ARREGLO_PUSH   :   ID PUNTO PUSH P_ABRE EXPRESION P_CIERRA P_COMA {$$ = new Push($1, $5, 0,0);}
               |   ID PUNTO PUSH P_ABRE CONT_ARREGLO P_CIERRA P_COMA {$$ = new Push($1, $5, 0,0);}
;

ARREGLO_POP    :   ID PUNTO POP P_ABRE P_CIERRA  {$$ = new Pop($1, 0,0);}
;

GD_ARREGLO    :   ID LIST_D_ARREGLO {$$ = new GD_Arreglo($1, $2,0,0);}
;
SD_ARREGLO    :   ID LIST_D_ARREGLO IGUAL EXPRESION P_COMA {$$ = new SD_Arreglo($1, $2, $4,0,0);}
              |   ID LIST_D_ARREGLO IGUAL CONT_ARREGLO P_COMA {$$ = new SD_Arreglo($1, $2, $4,0,0);}
;
LIST_D_ARREGLO  :   LIST_D_ARREGLO C_ABRE EXPRESION C_CIERRA {$$ = $1; $$.push($3);}
                |   C_ABRE EXPRESION C_CIERRA{$$ = [$2];}
;
/*************************************** FIN DECLARACION ARREGLO *****************************************/


/******************************************* DECLARACION TYPE ********************************************/
DECLARACION_TYPE    :    TYPE ID IGUAL LL_ABRE LISTA_CONT_TYPE LL_CIERRA
        {$$ = new Typo($2,$5,0,0);}
;

LISTA_CONT_TYPE   :   LISTA_CONT_TYPE COMA CONT_TYPE{$$ = $1; $$.push($3);}
                  |   CONT_TYPE {$$ = [$1];}
;


CONT_TYPE   :   ID DOS_PUNTOS TIPO {$$ = [$1, $3];}
;


LISTA_ID    :  LISTA_ID PUNTO ID{$$ = $1; $$.push($3);}
            |  ID PUNTO ID {$$ = [$1,$3];}
;
/*************************************** FIN DECLARACION TYPE ********************************************/

LISTA_ID_TYPE   :   LISTA_ID_TYPE PUNTO ID {$$ = $1; $$.push($3);}
                |   ID {$$ = [$1];}
;

LISTA_ASIG_TYPE    :   LISTA_ASIG_TYPE COMA CONT_ASIG_TIPE {$$ = $1; $$.push($3);}
                   |   CONT_ASIG_TIPE {$$ = [$1];}
;

CONT_ASIG_TIPE   :   ID DOS_PUNTOS EXPRESION {$$ = [$1, $3];}
;


/******************************************* SENTENCIA SWITCH  *******************************************/
SENTENCIA_SWITCH   :   SWITCH CONDICIONAL CONT_SWITCH {$$ = new Switch($2, $3,this._$.first_line,this._$.first_column);}
;

CONT_SWITCH    :   LL_ABRE LISTA_CASES LL_CIERRA {$$ = $2;}
               |   LL_ABRE LL_CIERRA {$$ = [];}
;

LISTA_CASES    :    LISTA_CASES CASES {$$ = $1; $$.push($2);}
              |    CASES {$$ = [$1];}
;

CASES    :    CASE EXPRESION DOS_PUNTOS CONT_CASE {$$ = new Case($2, $4,this._$.first_line,this._$.first_column);}
         |    CASE EXPRESION DOS_PUNTOS {$$ = new Case($2, [],this._$.first_line,this._$.first_column);}
         |    DEFAULT DOS_PUNTOS CONT_CASE {$$ = new Default($3,this._$.first_line,this._$.first_column);}
         |    DEFAULT DOS_PUNTOS {$$ = new Default([],this._$.first_line,this._$.first_column);}
;

CONT_CASE     :    CONT_CONTROL { $$ = $1;}
              |    SENTENCIAS {$$ = $1;}
;
/******************************************* FIN SENTENCIA SWITCH  ****************************************/

/******************************************* SENTENCIA IF   ***********************************************/
SENTENCIA_IF    :    IF CONDICIONAL CONT_CONTROL{ $$ = new If($2, $3, [],this._$.first_line,this._$.first_column);}
                |    IF CONDICIONAL CONT_CONTROL ELSE CONT_CONTROL {$$ = new If($2, $3, $5,this._$.first_line,this._$.first_column);}
                |    IF CONDICIONAL CONT_CONTROL ELSE SENTENCIA_IF{ $$ = new If($2, $3, [$5],this._$.first_line,this._$.first_column);}
;
/******************************************* FIN SENTENCIA IF  ********************************************/


/******************************************* SENTENCIA WHILE  *********************************************/
SENTENCIA_WHILE   :   WHILE CONDICIONAL CONT_CONTROL {$$ = new While($2, $3,this._$.first_line,this._$.first_column);}
;
/******************************************* FIN SENTENCIA WHILE  *****************************************/

SENTENCIA_DO_WHILE  :  DO CONT_CONTROL WHILE CONDICIONAL P_COMA{$$ = new Do_while($4, $2, this._$.first_line,this._$.first_column);}
;

/************************ CONDICIONAL PARA DIVERSAS SENTENCIAS  *******************************************/
CONDICIONAL   :   P_ABRE EXPRESION P_CIERRA {$$ = $2;}
;


/************************** CONTENIDO PARA DIVERSAS SENTENCIAS  *******************************************/
CONT_CONTROL   :   LL_ABRE SENTENCIAS LL_CIERRA {$$ = $2;}
               |   TK_THEN SENTENCIAS {$$ = $2;}
               |   SENTENCIAS { $$ = $1; }
               |   LL_ABRE LL_CIERRA {$$ = [];}
;

/*******************************************  SENTENCIA FOR  **********************************************/
SENTENCIA_FOR   :   FOR P_ABRE ASING_DEC_FOR
                    P_COMA EXPRESION P_COMA
                    ASIGNACION P_CIERRA CONT_FOR
                    {$$ = new For($3,$5,$7,$9, this._$.first_line,this._$.first_column);}
;

CONT_FOR    :    LL_ABRE LL_CIERRA{$$ = [];}
            |    LL_ABRE SENTENCIAS LL_CIERRA{$$ = $2;}
;

ASING_DEC_FOR   :    LET DECLARACION {$2.tipo_declaracion = $1; $$ = $2;}
                |    ASiGNACION_VARIABLE {$$ = $1;}
;
/*******************************************  SENTENCIA FOR  **********************************************/

SENTENCIA_FOR_1   :   FOR P_ABRE LET ID TIPO_FOR_1 ID P_CIERRA CONT_FOR
                   {$$ = new For_1($4, $5, $6, $8, this._$.first_line,this._$.first_column);}
;
TIPO_FOR_1   :   IN {$$ = $1;}
             |   OF {$$ = $1;}
;

/*******************************************  SENTENCIA IMPRIMIR  *****************************************/
IMPRIMIR    :   CONSOLE PUNTO LOG CONT_IMPRIMIR P_COMA {$$ = new Imprimir($4, this._$.first_line, this._$.first_column);}
            |   CONT_IMPRIMIR {$$ = new Imprimir($1, this._$.first_line, this._$.first_column);}
;

CONT_IMPRIMIR   :    P_ABRE EXPRESION P_CIERRA {$$ = $2;}
                |    P_ABRE P_CIERRA{$$ = null;}
;
/*******************************************  FIN SENTENCIA IMPRIMIR  *************************************/

TIPO    :   NUMBER   { $$ = new Tipo(tipos.NUMBER);}
        |   STRING   { $$ = new Tipo(tipos.STRING);}
        |   VOID     { $$ = new Tipo(tipos.VOID);}
        |   BOOLEAN  { $$ = new Tipo(tipos.BOOLEAN);}
        |   ANY      { $$ = new Tipo(tipos.ANY);}
        |   ID       { $$ = $1;}
;

LLAMADA_FUNCION    :   LLAMADA_FUNCION_EXP {$$ = $1;}
;

LLAMADA_FUNCION_EXP    : TK_LOCAL TK_DOS_PUNTOS ID CONT_LLAMADA  {$$ = new Llamada_funcion($3,$4, this._$.first_line,this._$.first_column);}
;

CONT_LLAMADA    :    P_ABRE P_CIERRA {$$ = [];}
                |    P_ABRE LISTA_CONT_LLAMADA P_CIERRA {$$ = $2}
;
LISTA_CONT_LLAMADA   :   LISTA_CONT_LLAMADA COMA EXPRESION {$$ = $1; $$.push($3);}
                     |   EXPRESION { $$ = [$1];}
;

INC_DEC    :    ID MAS_MAS {$$ = new Aritmetica(new Identificador($1,this._$.first_line, this._$.first_column),
                        new Primitivo(new Tipo(tipos.NUMBER), 1,this._$.first_line,this._$.first_column),"+",this._$.first_line,this._$.first_column);}
                |    ID MENOS_MENOS  {$$ = new Aritmetica(new Identificador($1,this._$.first_line, this._$.first_column),
                        new Primitivo(new Tipo(tipos.NUMBER), 1,this._$.first_line,this._$.first_column),"-",this._$.first_line,this._$.first_column);}
;

SENT_INC_DEC    :  INC_DEC {$$ = new Asignacion($1.nodo_izquierdo.id,$1,this._$.first_line,this._$.first_column);}
;

EXPRESION   :   TK_MENOS EXPRESION  %prec P_NEG {$$ = new Aritmetica($2,null,$1, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_MAS EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_MENOS EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_MULTI EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_DIV EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_ELEVADO EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_MOD EXPRESION {$$ = new Aritmetica($1,$3,$2, this._$.first_line, this._$.first_column);}
            |   EXPRESION TK_MAYOR EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_MENOR EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_MAYOR_IGUAL EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_MENOR_IGUAL EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_IGUAL_IGUAL EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_DISTINTO EXPRESION {$$ = new Relacional($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_AND EXPRESION {$$ = new Logica($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_OR EXPRESION {$$ = new Logica($1,$3,$2,this._$.first_line,this._$.first_column);}
            |   TK_NOT EXPRESION {$$ = new Logica($2,null,$1,this._$.first_line,this._$.first_column);}
            |   EXPRESION TK_INTERROGACION EXPRESION DOS_PUNTOS EXPRESION
                        { $$ = new Ternario(new Tipo(tipos.BOOLEAN),$1,$3,$5,this._$.first_line,this._$.first_column);}
            |   CADENA   {$$ = new Primitivo(new Tipo(tipos.STRING), $1.replace(/\"/g,"").replace(/\'/g,""),this._$.first_line, this._$.first_column);}
            |   NUMERO   {$$ = new Primitivo(new Tipo(tipos.NUMBER), Number($1),this._$.first_line, this._$.first_column);}
            |   TRUE   {$$ = new Primitivo(new Tipo(tipos.BOOLEAN), true,this._$.first_line, this._$.first_column);}
            |   FALSE   {$$ = new Primitivo(new Tipo(tipos.BOOLEAN), false,this._$.first_line, this._$.first_column);}
            |   LLAMADA_FUNCION_EXP {$$  = $1;}
            |   INC_DEC {$$ = $1;}
            |   LISTA_ID {$$ = new Llamada_type($1,0,0);}
            |   ARREGLO_POP {$$ = $1;}
            |   GD_ARREGLO {$$ = $1;}
            |   EXPRESION LENGTH {$$ = new Length($1, 0,0);}
            |   EXPRESION TK_TOUPPERCASE P_ABRE P_CIERRA {$$ = new To_Upper_Case($1, 0,0);}
            |   EXPRESION TK_TOLOWERCASE P_ABRE P_CIERRA {$$ = new To_Lower_Case($1, 0,0);}
            |   EXPRESION TK_CHARAT P_ABRE EXPRESION P_CIERRA {$$ = new Char_At($1, $4, 0,0);}
            |   EXPRESION TK_CONCAT P_ABRE EXPRESION P_CIERRA {$$ = new Concat($1, $4, 0,0);}
            |   ID       { $$ = new Identificador($1, this._$.first_line, this._$.first_column); }
            |   P_ABRE EXPRESION P_CIERRA {$$ = $2;}
;

/*SIMBOLS*/
CONSOLE   : TK_CONSOLE  {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
PUNTO     : TK_PUNTO    {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
LOG       : TK_LOG      {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
P_ABRE    : TK_P_ABRE   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
P_CIERRA  : TK_P_CIERRA {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
STRING    : TK_STRING   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
NUMBER    : TK_NUMBER   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
BOOLEAN   : TK_BOOLEAN  {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
VOID      : TK_VOID     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
LET       : TK_LET      {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
CONST     : TK_CONST    {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
ANY       : TK_ANY      {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
TYPE      : TK_TYPE     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
ARRAY     : TK_ARRAY    {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
PUSH      : TK_PUSH     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
POP       : TK_POP      {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
LENGTH    : TK_LENGTH   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
IF        : TK_IF       {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
ELSE      : TK_ELSE     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
SWITCH    : TK_SWITCH   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
CASE      : TK_CASE     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
DEFAULT   : TK_DEFAULT  {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};

FOR       : TK_FOR	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
OF	  : TK_OF	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
IN        : TK_IN	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
WHILE	  : TK_WHILE	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
DO	  : TK_DO	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
BREAK     : TK_BREAK	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
CONTINUE  : TK_CONTINUE {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
RETURN    : TK_RETURN	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
FUNCTION  : TK_FUNCTION {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
TRUE      : TK_TRUE	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
FALSE     : TK_FALSE    {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};

LL_ABRE   : TK_LL_ABRE	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
LL_CIERRA : TK_LL_CIERRA{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
C_ABRE    : TK_C_ABRE	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
C_CIERRA  : TK_C_CIERRA {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
COMA      : TK_COMA     {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MENOR     : TK_MENOR   	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
P_COMA    : TK_P_COMA	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MAYOR     : TK_MAYOR	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
DISTINTO  : TK_DISTINTO	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
OR	  : TK_OR	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
AND	  : TK_AND      {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
NOT       : TK_NOT	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
IGUAL     : TK_IGUAL	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MENOS     : TK_MENOS	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
ELEVADO	  : TK_ELEVADO  {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MULTI	  : TK_MULTI	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
DIV	  : TK_DIV	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MOD       : TK_MOD	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MAS 	  : TK_MAS	{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
CADENA 	  : TK_CADENA   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
NUMERO 	  : TK_NUMERO   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
ID 	  : TK_ID       {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
INTERROGACION	: TK_INTERROGACION {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
DOS_PUNTOS      : TK_DOS_PUNTOS    {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MENOR_IGUAL	: TK_MENOR_IGUAL   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
IGUAL_IGUAL	: TK_IGUAL_IGUAL   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MAYOR_IGUAL     : TK_MAYOR_IGUAL   {$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MAS_MAS	        : TK_MAS_MAS{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MENOS_MENOS 	:TK_MENOS_MENOS{$$ = $1; token_error = $1;f_error = this._$.first_line; c_error = this._$.first_column;};
MENOS_MENOS 	:TK_MENOS_MENOS{$$ = $1; token_error = $1; f_error = this._$.first_line; c_error = this._$.first_column;};
