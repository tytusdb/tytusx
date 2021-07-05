%lex
%s comment
%%

"//".*        /* skip comments */
"(:"          this.begin('comment');
<comment>":)" this.popState();
<comment>.    /* skip comment content*/
\s+           /* skip whitespace */

//Expresiones regulares para la aceptacion de numeros enteros y decimales
[0-9]+("."[0-9]+)\b {return "tk_decimal";}
[0-9]+\b            {return "tk_entero";}

//Palabras reservadas
"node"               {return "tk_node";}
"child"              {return "tk_child";}
"let"                {return "tk_let";}
"descendant"         {return "tk_descendant";}
"descendant-or-self" {return "tk_descendatOr"}
"ancestor"           {return "tk_ancestor";}
"ancestor-or-self"   {return "tk_ancestorOr";}
"attribute"          {return "tk_attribute";}
"following"          {return "tk_following";}
"following-sibling"  {return "tk_followingSi"}
"parent"             {return "tk_parent"}
"preceding"          {return "tk_preceding"}
"preceding-sibling"  {return "tk_precedingSi"}
"self"               {return "tk_self"}
"text"               {return "tk_text"}
"position"           {return "tk_position"}
"last"               {return "tk_last"}
"div"                {return "tk_div"}
"and"                {return "tk_and"}
"or"                 {return "tk_or"}
"mod"                {return "tk_mod"}

"for"      {return "tk_for";}
"in"       { return "tk_in";}
"where"    { return "tk_where";}
"order"    { return "tk_order";}
"by"       { return "tk_by";}
"return"   { return "tk_return";}

"if"       {return "tk_if";}
"else"     {return "tk_else";}
"then"     {return "tk_then";} 

"int"       {return "tk_int";}
"integer"   {return "tk_integer";}
"string"    {return "tk_string";}
"decimal"   {return "tk_DECIMAL";}
"double"    {return "tk_double";}
"declare"   {return "tk_declare";}
"function"  {return "tk_function";}
"AS"        {return "tk_AS"}
"as"        {return "tk_as"}
"xs"        {return "tk_xs"}
"to"        {return "tk_to"}
"at"        {return "tk_at"}
"local"     {return "tk_local";}
"gt"        {return "tk_mayor"}
"lt"        {return "tk_menor"}
"eq"        {return "tk_igual"}
"ne"        {return "tk_distinto"}
"le"        {return "tk_menorIgual"}
"ge"        {return "tk_mayorIgual"}
"upper"     {return "tk_upper"}
"case"      {return "tk_case"}
"lower"     {return "tk_lower"}
"substring" {return "tk_subString"}

//conjunto de simbolos aceptados
"|"  {return "tk_barra"}
"."  {return "tk_punto"}
";"  {return "tk_punto_coma"}
","  {return "tk_coma"}
"/"  {return "tk_diagonal"}
"*"  {return "tk_asterisco"}
"?"  {return "tk_Interroga"}
"+"  {return "tk_mas"}
"-"  {return "tk_menos"}

"<=" {return "tk_menorIgual"}
">=" {return "tk_mayorIgual"}
"<"  {return "tk_menor"}
">"  {return "tk_mayor"}
"!=" {return "tk_distinto"}
":=" {return "tk_igualXQUERY"}
":"  {return "tk_dosPuntos"}
"="  {return "tk_igual"}
"["  {return "tk_llaveA"}
"]"  {return "tk_llaveC"}
"@"  {return "tk_arroba"}
"{"  {return "llaveA"}
"}"  {return "llaveC"}
"("  {return "tk_parA"}
")"  {return "tk_parC"}

//Expresiones para validar los strings
\"[^\"]*\"  {return "tk_stringTexto";}
\“[^\“]*\“  {return "tk_stringTexto";}
\'[^\']*\'  {return "tk_stringTexto";}
\‘[^\‘]*\‘  {return "tk_stringTexto";}

//Expresion para un identificador
[a-zA-Z]([a-zA-Z0-9_])* {return "tk_identificador";}

[$]([a-zA-Z0-9_])* {return "tk_identificadorXQUERY";
console.log("indentificador papa")
}
//Final del archivo
<<EOF>> return "EOF";

/*Espacios en blanco, tabulados, saltos de linea, salto de carro, el otro no se que es equis de
pero todo esto se ignora*/
[ \t\r\n\f] {}

//Estado sumidero donde van a caer todos los errores
. 
    {         
        console.log('Léxico',yytext,yylloc.first_line,yylloc.first_column );
    }

/lex

%{
    const { Tree } = require('./Simbolos/Tree');
    const { Tipo, tipos, esEntero } = require('./Varios/Tipo');
    const { Primitivo }  = require('./Expresiones/Primitivo');
    const { Error } = require('./Varios/Error');
    const { Identificador } = require('./Expresiones/identificador');
    //const {Vector} = require('../Expresiones/Vector');
    //const {Lista} = require('../Expresiones/Lista');
    //Instrucciones
    const {Print} = require('./Instrucciones/Print');
    const {Declaracion} = require('./Instrucciones/Declaracion');
  // // const {DeclaracionArray} = require('../Instrucciones/DeclaracionArray');
    //const {DeclaracionLista} = require('../Instrucciones/DeclaracionLista');
    //const {Asignacion} = require('../Instrucciones/Asignacion');
    //const {AsignacionVector} = require('../Instrucciones/AsignacionVector');
   // const {AsignacionLista} = require('../Instrucciones/AsignacionLista');
    /*const {AddLista} = require('../Instrucciones/AddLista');
    
    const {Switch} = require('../Instrucciones/Switch');
    const {Case} = require('../Instrucciones/Case');
    const {While} = require('../Instrucciones/While');
    const {DoWhile} = require('../Instrucciones/DoWhile');
    const {For} = require('../Instrucciones/For');
    const {DeclaracionMetodo} = require('../Instrucciones/DeclaracionMetodo');
    const {LlamadaMetodo} = require('../Instrucciones/LlamadaMetodo');
    const {Continue} = require('../Expresiones/Continue');
    const {Break} = require('../Expresiones/Break');
    const {Retorno} = require('../Instrucciones/Retorno');
    *///Expresion
    const { DeclaracionMetodo } = require('./Instrucciones/DeclaracionMetodo');
    const { LlamadaMetodo } = require('./Instrucciones/LlamadaMetodo');
    const { If } = require('./Instrucciones/If');
    const { Retorno } = require('./Instrucciones/Retorno');
    const { Aritmetica } = require('./Expresiones/Aritmetica');
    const { Relacional } = require('./Expresiones/Relacional');
    const { Logico } = require('./Expresiones/Logico');
    const { NodoX } = require('./Expresiones/NodoX');
    const { EjecucionXpath } = require('./Arbol/Ejecucion');

    const {ToUpper} = require('./Expresiones/uppercase');
    const {ToLower} = require('./Expresiones/ToLower');
    const {ToString} = require('./Expresiones/ToString');
    const {Substrings} = require('./Expresiones/Substring');
    const{ToNumber} = require('./Expresiones/ToNumber');

    /*const {Logico} = require('../Expresiones/Logico');
    const {Ternario} = require('../Expresiones/Ternario');
    const {Casteo} = require('../Expresiones/Casteo');
    const {InDecrement} = require('../Expresiones/InDecrement');
    const {Length} = require('../Expresiones/Length');
    const {ToLower} = require('../Expresiones/ToLower');
    const {ToUpper} = require('../Expresiones/ToUpper');
    const {Truncate} = require('../Expresiones/Truncate');
    const {Round} = require('../Expresiones/Round');
    const {TypeOf} = require('../Expresiones/TypeOf');
    const {ToString} = require('../Expresiones/ToString');
    const {ToCharArray} = require('../Expresiones/ToCharArray');*/
    const { AnalizadorASCXML } = require('../analizadorXML/index');
    const { xpathBusqueda } = require('../analizadorXML/Instrucciones/Busqueda/xpathBusqueda');
    const { xml3D } = require('../analizadorXML/Codigo3D/xml3D')
    var produccion = [];
    var accion = [];
    var codigo3Dxpath = [];
%}

%left tk_local
%left tk_mod
%left tk_or
%left tk_and
%left tk_barra
%left tk_igual tk_distinto
%left tk_mayorIgual tk_menorIgual tk_mayor tk_menor
%left tk_llaveA tk_llaveC
%left tk_div tk_asterisco
%left tk_mas tk_menos
%left tk_parA tk_parC

%start INICIO_XQUERY
%%

INICIO_XQUERY : INSTRUCCIONES EOF  
    {
        produccion.push(`<INICIO_XQUERY> ::= <INSTRUCCIONES> EOF`);
        accion.push(`INICIO_XQUERY.Val ::= new Tree()`);
        let arbol = new Tree($1);
        arbol.accion = accion;
        arbol.produccion = produccion;
        arbol.salida3d = codigo3Dxpath
        return arbol;
    }
    ;

FUNCION:
    tk_declare tk_function MENU_LOCAL tk_dosPuntos
    tk_identificador tk_parA LISTA_DECLARACION_FUNCION 
    tk_parC  tk_as  tk_xs     tk_dosPuntos TIPO_DATO MENU_INTERROGA
    llaveA  INSTRUCCIONES llaveC tk_punto_coma
        {
            produccion.push(`<FUNCION> ::= declare function <MENU_LOCAL> : identificador ( <LISTA_DECLARACION_FUNCION> ) as xs : <TIPO_DATO> <MENU_INTERROGA> { <INSTRUCCIONES>  } ;`);
            accion.push(`FUNCION.Val ::= new Declaracion()`);
            $$ = new DeclaracionMetodo($12, $5, $7, $15, @1.first_line, @1.first_column);
        }
    ;


MENU_INTERROGA : 
    tk_Interroga 
        {
            produccion.push(`<MENU_INTERROGA> ::= ?`);
            accion.push(`MENU_INTERROGA.Val ::= ?`);
            $$ = $1
        }
    |  
        {
            produccion.push(`<MENU_INTERROGA> ::= epsilon`);
            accion.push(`MENU_INTERROGA.Val ::= vacio`);
            $$ = ''
        }
    ;

/*
$p as xs:decimal?
*/
LISTA_DECLARACION_FUNCION :  
    LISTA_DECLARACION_FUNCION tk_coma DECLARACION_FUNCION 
        {
            produccion.push(`<LISTA_DECLARACION_FUNCION> ::= <LISTA_DECLARACION_FUNCION> , <DECLARACION_FUNCION>`);
            accion.push(`LISTA_DECLARACION_FUNCION.Val.push(DECLARACION_FUNCION.Val)`);
            $$.push($3);
        }
    | DECLARACION_FUNCION 
        {
            produccion.push(`<LISTA_DECLARACION_FUNCION> ::= <DECLARACION_FUNCION>`);
            accion.push(`LISTA_DECLARACION_FUNCION.Val = [DECLARACION_FUNCION.Val]`);
            $$ = [$1]
        } 
    ;

DECLARACION_FUNCION:
    tk_identificadorXQUERY tk_as tk_xs tk_dosPuntos TIPO_DATO MENU_INTERROGA
        {
            produccion.push(`<DECLARACION_FUNCION> ::= identificador as xs : <TIPO_DATO> <MENU_INTERROGA>`);
            accion.push(`DECLARACION_FUNCION.Val = new Declaracion()`);
            $$ = new Declaracion($5, $1, null, @1.first_line, @1.first_column);
        }   
    ;


MENU_LOCAL: tk_local 
    {
        produccion.push(`<LMENU_LOCAL> ::= local`);
        accion.push(`MENU_LOCAL.Val = local`);
        $$ = $1;
    }
//aqui voy a meter mas pero no se si solo se pueden declarar funciones localres 
;

TIPO_DATO:
    tk_int 
        {
            produccion.push(`<TIPO_DATO> ::= int`);
            accion.push(`TIPO_DATO.Val = new Tipo()`);
            $$ = new Tipo(tipos.ENTERO);
        }
    | tk_string  
        {
            produccion.push(`<TIPO_DATO> ::= string`);
            accion.push(`TIPO_DATO.Val = new Tipo()`);
            $$ = new Tipo(tipos.STRING);
        }
    | tk_double  
        {
            produccion.push(`<TIPO_DATO> ::= double`);
            accion.push(`TIPO_DATO.Val = new Tipo()`);
            $$ = new Tipo(tipos.DECIMAL);
        }
    | tk_DECIMAL 
        {
            produccion.push(`<TIPO_DATO> ::= decimal`);
            accion.push(`TIPO_DATO.Val = new Tipo()`);
            $$ = new Tipo(tipos.DECIMAL);
        }
    | tk_integer 
        {
            produccion.push(`<TIPO_DATO> ::= integer`);
            accion.push(`TIPO_DATO.Val = new Tipo()`);
            $$ = new Tipo(tipos.ENTERO);
        }
    ;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION 
        { 
            produccion.push(`<INSTRUCCIONES> ::= <INSTRUCCIONES> <INSTRUCCION>`);
            accion.push(`INSTRUCCIONES.Val.push(INSTRUCCION.Val)`);
            $$.push(...$2); 
        }
    | INSTRUCCION  
        { 
            produccion.push(`<INSTRUCCIONES> ::= <INSTRUCCION>`);
            accion.push(`INSTRUCCIONES.Val = [INSRUCCION.Val]`);
            $$ = [...$1] 
        }
    ;

INSTRUCCION :
    DECLARACION_GLOBAL
        {
            produccion.push(`<INSTRUCCION> ::= <DECLARACION_GLOBAL>`);
            accion.push(`INSTRUCCION.Val = DECLARACION_GLOBAL.Val`);
            $$ = $1
        }
    | FUNCION 
        {
            produccion.push(`<INSTRUCCION> ::= <FUNCION>`);
            accion.push(`INSTRUCCION.Val = Funcion.Val`);
            $$ = [$1]
        }
    | IF 
        {
            produccion.push(`<INSTRUCCION> ::= <IF>`);
            accion.push(`INSTRUCCION.Val = IF.Val`);
            $$ = [$1]
        }
    //| WHERE { $$=$1 }
    //| FOR {$$=$1}
    | LLAMADA_FUNCION 
        {
            produccion.push(`<INSTRUCCION> ::= <LLAMDA_FUNCION>`);
            accion.push(`INSTRUCCION.Val = LLAMDA_FUNCION.Val`);
            $$ = [$1]
        }
    | RETURN_CICLO 
        {
            produccion.push(`<INSTRUCCION> ::= <RETURN_CICLO>`);
            accion.push(`INSTRUCCION.Val = RETURN_CICLO.Val`);
            $$ = [$1]
        }
    ;
/*
FOR :
    tk_for DECLARACIONES_FOR OPCIONES_FOR;

DECLARACIONES_FOR:
    DECLARACIONES_FOR tk_coma DECLARACION_FOR
    | DECLARACION_FOR;

DECLARACION_FOR:
    tk_identificadorXQUERY OPCION_AT tk_in FOR_REC;

OPCION_AT:
    tk_at  tk_identificadorXQUERY
    | ;

CORDERNADA:
    tk_parA EXP_XQUERY tk_coma EXP_XQUERY tk_parC ;

FOR_REC:
    f
    | EXP_XQUERY 
    | CORDERNADA;
//111111111+1111

OPCIONES_FOR:
    OPCIONES_FOR OPCION_FOR 
    | OPCION_FOR ;

OPCION_FOR:
    WHERE
    | ORDER
    | RETURN_CICLO 
    ;

WHERE :
    tk_where EXP_XQUERY ;

CONDITIONES_WHERE:
    CONDITIONES_WHERE tk_and EXP_XQUERY
    | EXP_XQUERY ;

ORDER : 
    tk_order  tk_by LISTA_ORDER ;

LISTA_ORDER:
    LISTA_ORDER tk_coma ORDER_ 
    | ORDER_ ;

ORDER_ :  
    tk_identificadorXQUERY XPATH
    | tk_identificadorXQUERY ;
*/

RETURN_CICLO:
    tk_return EXP_XQUERY//Lista_Ciclo 
        {
            produccion.push(`<RETURN_CICLO> ::= return <EXP_QUERY>`);
            accion.push(`RETURN_CICLO.Val = new Retorno()`);
            $$ = new Retorno($2, @1.first_line, @1.first_column)
        }
    ;
/*
Lista_Ciclo:
    Lista_Ciclo tk_and valor_if { $1.push($3); $$ = $1;}
    |valor_if { $$ = $1;}
    ;

valor_if:
    EXP_XQUERY { $$ = $1}
    | INSTRUCCIONES { $$ = $1}
;*/
/*
LISTA_ASIGNACION:
    LISTA_ASIGNACION tk_and ASIGNACION_SIMPLE
    | ASIGNACION_SIMPLE ;

ASIGNACION_SIMPLE :
    tk_identificador tk_igual  valores_if
    | TK tk_identificadorXQUERY tk_igual valores_if ;*/

IF: 
    tk_if tk_parA EXP_XQUERY tk_parC tk_then EXP_XQUERY
        {
            produccion.push(`<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY>`);
            accion.push(`IF.Val = new If()`);
            $$ = new If($3, 
                    [new Retorno($6, @1.first_line, @1.first_column)], 
                    [], @1.first_line, @1.first_column);
        }
    | tk_if tk_parA EXP_XQUERY tk_parC tk_then EXP_XQUERY tk_else EXP_XQUERY 
        {
            produccion.push(`<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY> else <EXP_QUERY>`);
            accion.push(`IF.Val = new If()`);
            $$ = new If($3, 
                    [new Retorno($6, @1.first_line, @1.first_column)], 
                    [new Retorno($8, @1.first_line, @1.first_column)], 
                    @1.first_line, @1.first_column);
        }
    | tk_if tk_parA EXP_XQUERY tk_parC tk_then EXP_XQUERY tk_else IF
        {
            produccion.push(`<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY> else <If>`);
            accion.push(`IF.Val = new If()`);
            $$ = new If($3, 
                [new Retorno($6, @1.first_line, @1.first_column)], 
                [$8], 
                @1.first_line, @1.first_column);
        } 
    ;

/*
valores_if:
    valores_if EXP_XQUERY 
        {
            $$.push($2);
        }
    |EXP_XQUERY 
        { 
            $$ = [$1]
        }
    ;*/

LLAMADA_FUNCION:
    tk_local tk_dosPuntos tk_identificador tk_parA  Parametros_llamada tk_parC
        {
            produccion.push(`<LLAMADA_FUNCION> ::= local : identificador ( <PARAMETROS_LLAMADA> )`);
            accion.push(`LLAMADA_FUNCION.Val = new LlamadaMetodo()`);
            $$ = new Print(new LlamadaMetodo($3, $5, @1.first_line, @1.first_column), @1.first_line, @1.first_column)
        }
    | NATIVAS
        {
            $$ = new Print($1);
        }
    ;

DUALIDAD:
    XPATH {
        $$  = $1
    }
    |EXP_XQUERY {
        $$ = $1
    }
    ;

NATIVAS: 
    tk_upper tk_menos tk_case tk_parA DUALIDAD tk_parC 
        {
            $$ = new ToUpper($5, @1.first_line, @1.first_column)
        }
    | tk_lower tk_menos tk_case tk_parA DUALIDAD tk_parC 
        {
            $$ = new ToLower($5, @1.first_line, @1.first_column)
        }
    | tk_string tk_parA DUALIDAD tk_parC 
        {     
            $$ = new ToString($3, @1.first_line, @1.first_column)
        }
    | tk_tonumber tk_parA DUALIDAD tk_parC 
        {
            $$ = new ToNumber($3, @1.first_line, @1.first_column)
        }
    | tk_subString tk_parA DUALIDAD tk_coma DUALIDAD tk_parC 
        {
            $$ = new Substrings($3, $5, new Primitivo(new Tipo(esEntero(Number(-1))), Number(-1), @1.first_line, @1.first_column), @1.first_line, @1.first_column)
        }
    | tk_subString tk_parA DUALIDAD tk_coma DUALIDAD tk_coma DUALIDAD tk_parC 
        {
            $$ = new Substrings($3, $5, $7, @1.first_line, @1.first_column)
        }
    ;

/*
$p as xs:decimal?
*/

Parametros_llamada:
    Parametros_llamada tk_coma XPATH 
        {
            produccion.push(`<PARAMETROS_LLAMADA> ::= <PARAMETROS_LLAMADA> , <XPATH>`);
            accion.push(`PARAMETROS_LLAMDA.Val.push(XPATH.Val)`);
            $$.push($3); 
        } 
    | XPATH 
        {
            produccion.push(`<PARAMETROS_LLAMADA> ::= <XPATH>`);
            accion.push(`PARAMETROS_LLAMADA.Val = [XPATH.Val]`);
            $$ = [$1]
        }
    ;

Parametros_funcion:
    Parametros_funcion tk_coma EXP_XQUERY
        {
            produccion.push(`<PARAMETROS_FUNCION> ::= <PARAMETROS_FUNCION> , <EXP_QUERY>`);
            accion.push(`PARAMETROS_FUNCION.Val.push(EXP_QUERY.Val)`);
            $$.push($3)
        }
    | EXP_XQUERY
        {
            produccion.push(`<PARAMETROS_FUNCION> ::= <EXP_QUERY>`);
            accion.push(`PARAMETROS_FUNCION.Val = [EXP_QUERY.Val]`);
            $$ = [$1]
        }
    ;

DECLARACION_GLOBAL :
    tk_let LISTA_ID
        {
            produccion.push(`<DECLARACION_GLOBAL> ::= let <LISTA_ID>`);
            accion.push(`DECLARACION_GLOBAL.Val = LISTA_ID.Val`);
            $$ = $2
        };


LISTA_ID : 
    LISTA_ID tk_coma DECLARACION_INDIVIDUAL 
        {
            produccion.push(`<LISTA_ID> ::= <LISTA_ID> , <DECLARACION_INDIVIDUAL>`);
            accion.push(`LISTA_ID.Val.push(DECLARACION_INDIVIDUAL.Val)`);
            $$.push($3); 
        }
    | DECLARACION_INDIVIDUAL 
        {
            produccion.push(`<LISTA_ID> ::= <DECLARACION_INDIVIDUAL>`);
            accion.push(`LISTA_ID.Val = [DECLARACION_INDIVIDUAL.Val]`);
            $$ = [$1]
        }
    ;

DECLARACION_INDIVIDUAL:
    tk_identificadorXQUERY tk_igualXQUERY EXP_XQUERY 
        {
            produccion.push(`<DECLARACION_INDIVIDUAL> ::= identificador igual <EXP_QUERY>`);
            accion.push(`DECLARACION_INDIVIDUAL.Val = new Declaracion()`);
            $$ = new Declaracion($3.tipo, $1, $3, @1.first_line, @1.first_column);
        }
    ;

EXP_XQUERY:
    EXP_XQUERY tk_menos EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> - <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Aritmetica()`);
            $$ = new Aritmetica($1, $3, '-', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mas EXP_XQUERY  
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> + <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Aritmetica()`);
            $$ = new Aritmetica($1, $3, '+', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_div EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> div <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Aritmetica()`);
            $$ = new Aritmetica($1, $3, '/', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mod EXP_XQUERY 
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> mod <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Aritmetica()`);
            $$ = new Aritmetica($1, $3, '%', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_asterisco EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> * <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Aritmetica()`);
            $$ = new Aritmetica($1, $3, '*', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_menor EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> < <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '<', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mayor EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> > <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '>', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_menorIgual EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> <= <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '<=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mayorIgual EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> >= <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '>=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_igual EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> = <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '==', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_distinto EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> != <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Relacional()`);
            $$ = new Relacional($1, $3, '!=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_or EXP_XQUERY 
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> or <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Logico()`);
            $$ = new Logico($1, $3, '||', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_and EXP_XQUERY
        {
            produccion.push(`<EXP_QUERY> ::= <EXP_QUERY> and <EXP_QUERY>`);
            accion.push(`EXP_QUERY.Val = new Logico()`);
            $$ = new Logico($1, $3, '&&', @1.first_line, @1.first_column);
        }
    | tk_entero 
        {
            produccion.push(`<EXP_QUERY> ::= entero`);
            accion.push(`EXP_QUERY.Val = new Primitivo()`);
            $$ = new Primitivo(new Tipo(tipos.ENTERO), Number($1), @1.first_line, @1.first_column);
        }         
    | tk_decimal
        {
            produccion.push(`<EXP_QUERY> ::= decimal`);
            accion.push(`EXP_QUERY.Val = new Primitivo()`);
            $$ = new Primitivo(new Tipo(tipos.DECIMAL), Number($1), @1.first_line, @1.first_column);
        }
    | tk_stringTexto
        {
            produccion.push(`<EXP_QUERY> ::= string`);
            accion.push(`EXP_QUERY.Val = new Primitivo()`);
            $$ = new Primitivo(new Tipo(tipos.STRING), $1, @1.first_line, @1.first_column);
        }          
    | tk_identificadorXQUERY //OPCION_IDQ
        {
            produccion.push(`<EXP_QUERY> ::= identificador`);
            accion.push(`EXP_QUERY.Val = new Identificador()`);
            $$ = new Identificador($1, @1.first_line, @1.first_column);
        }
    | tk_parA EXP_XQUERY tk_parC
        {
            produccion.push(`<EXP_QUERY> ::= ( <EXP_QUERY> )`);
            accion.push(`EXP_QUERY.Val = EXP_QUERY.Val`);
            $$ = $2
        }
    | tk_local tk_dosPuntos tk_identificador tk_parA Parametros_funcion tk_parC 
        {
            produccion.push(`<EXP_QUERY> ::= local : identificador ( <Parametros_funcion> )`);
            accion.push(`EXP_QUERY.Val = new LlamdaMetodo()`);
            $$ = new LlamadaMetodo($3, $5, @1.first_line, @1.first_column);
        } 
    | NATIVAS 
        {
            $$ = $1
        }
    ;

XPATH :
    INICIO
        {
            produccion.push('<XPATH> ::= <INICIO>');
            accion.push('XPATH.Val = INICIO.val');
            let analizador = new AnalizadorASCXML();
            let buscador = new xpathBusqueda();
            let ejecu = new EjecucionXpath($1, "");

            let ret = analizador.ejecutarCodigo(localStorage.getItem("xml"));
            let tabla = ret.objetos;
            let query = ejecu.ejecutarArbol();

            if(query.includes("|")) {
                buscador.getNodesByFilters("3", query, tabla);
            }else if(query[0] !== "/" && query[0] !== "//"){
                buscador.getNodesByFilters("1", query, tabla)
            }else{
                buscador.getNodesByFilters("2", query, tabla)
            }

            let retorno = buscador.returnListObjects()
            
            let dir = new xml3D();
            let salida3D = dir.getNodesByFilters(tabla, 0, buscador.returnListValues());
            salida3D = "// 3D de consulta: " + query + salida3D
            codigo3Dxpath.push(salida3D)

            let valor = retorno[0].texto;
            let tipoR;

            if (valor.match(/^[0-9]+$/)){
                tipoR = new Tipo(esEntero(valor))
                valor = parseInt(valor)
            }else if (valor.match(/^[0-9]+[.][0-9]+$/)){
                tipoR = new Tipo(esEntero(valor))
                valor = parseInt(valor)
            }else{
                tipoR = new Tipo(tipos.STRING)
            }

            $$ = new Primitivo(tipoR, valor, @1.first_line, @1.first_column);
        }
    ;

INICIO:
    INICIO tk_barra INICIALES
        {
            produccion.push('<INICIO> ::= <INICIO> | <INICIALES>');
            accion.push('INICIO.Val = INICIO.push(INICIALES)');
            $$.push($3)
        }
    | INICIALES
        {
            produccion.push('<INICIO> ::= <INICIALES>');
            accion.push('INICIO.Val = INICIALES.Val');
            $$ = [$1]
        }
    ;

INICIALES : 
    tk_punto DIAGONALES DERIVADOSLIMITADO DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX("", ".", [new NodoX($2, $3.val, [...$4])]);
        }
    | tk_identificador DERIVACIONDIAGONAL 
        {
            produccion.push(`<INICIALES> ::= identificador <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX("", $1, [...$2]);
        }
    | tk_diagonal DERIVADOS DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= diagonal <DERIVADOS> <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX($1, $2.val, [...$3]);
        }
    | tk_diagonal tk_diagonal DERIVADOS DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= diagonal diagonal <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX("//", $3.val, [...$4]);
        }
    | tk_asterisco DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= asterisco <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX("", $1, [...$2]);
        }
    | tk_node tk_parA tk_parC DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= node() <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = new NodoX();'); 
            $$ = new NodoX("", "node()", [...$4]);
        }
    ;

DIAGONALES : 
    tk_diagonal
        {
            produccion.push(`<DIAGONALES> ::= diagoanl`);
            accion.push('DIAGONALES.Val = /;'); 
            $$ = $1
        }
    | tk_diagonal tk_diagonal
        {
            produccion.push(`<DIAGONALES> ::= diagonal diagonal`);
            accion.push('DIAGONALES.Val = //'); 
            $$ = "//"
        }
    ;

DERIVACIONDIAGONAL : 
    DIAGONALES DERIVADOS DERIVACIONDIAGONAL
        {
            produccion.push(`<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>`);
            accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)'); 
            $$ = new Array();
            $$.push(new NodoX($1, $2.val, [...$3])); 
        }
    |  
        {
            produccion.push(`<DERIVACIONDIAGONAL> ::= epsilon`);
            accion.push('DERIVACIONDIAGONAL.Val = [/*Vacio*/]');
            $$ = [];
        }
    ;

DERIVADOSLIMITADO :
    tk_identificador
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= identificador <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = identificador + PREDICATE.Val'); 
            $$ = {val: $1, pre: null};
        }
    | tk_asterisco
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= asterisco <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = \"*\" + PREDICATE.Val'); 
            $$ = {val: $1, pre: null};
        }
    | tk_node tk_parA tk_parC
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= node() <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val'); 
            $$ = {val: "node()", pre: null}
        }
    | tk_arroba ATRIBUTO
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= arroba <ATRIBUTO>`);
            accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val'); 
            $$ = {val: $1 + "" + $2, pre: null};
        }
    ;

DERIVADOS : 
    tk_punto
        {
            produccion.push(`<DERIVADOS> ::= punto`);
            accion.push("DERIVADOS.Val = \".\" ");
            $$ = {val: $1, pre: null}; 
        }
    | tk_punto tk_punto
        {
            produccion.push(`<DERIVADOS> ::= doblePunto`);
            accion.push('DERIVADOS.Val = \"..\"');
            $$ = {val: "..", pre: null}; 
        }
    | DERIVADOSLIMITADO 
        {
            produccion.push(`<DERIVADOS> ::= <DERIVADOSLIMITADO>`);
            accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val'); 
            $$ = $1; 
        }
    ;

ATRIBUTO :
    tk_asterisco 
        {
            produccion.push(`<ATRIBUTO> ::= asterisco`);
            accion.push('ATRIBUTO.Val = \"*\"'); 
            $$ = $1;
        }
    | tk_identificador
        {
            produccion.push(`<ATRIBUTO> ::= identificador`);
            accion.push('ATRIBUTO.Val = identificador');  
            $$ = $1;
        }
    | tk_node tk_parA tk_ParC
        {
            produccion.push(`<ATRIBUTO> ::= node`);
            accion.push('ATRIBUTO.Val = \"node()\"'); 
            $$ = "node()"
        }
    ;