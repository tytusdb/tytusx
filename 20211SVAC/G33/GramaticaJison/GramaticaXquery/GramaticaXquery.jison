%lex
%%


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

"for"      {console.log(yytext+"--"); return "tk_for";}
"in"       {console.log(yytext+"--"); return "tk_in";}
"where"    {console.log(yytext+"--"); return "tk_where";}
"order"    {console.log(yytext+"--"); return "tk_order";}
"by"       {console.log(yytext+"--"); return "tk_by";}
"return"   {console.log(yytext+"--"); return "tk_return";}

"if"       {console.log(yytext+"--");return "tk_if";}
"else"     {console.log(yytext+"--");return "tk_else";}
"then"     {console.log(yytext+"--");return "tk_then";}

"int"      {console.log(yytext+"--");return "tk_int";}
"integer"  {console.log(yytext+"--");return "tk_integer";}
"string"   {console.log(yytext+"--");return "tk_string";}
"decimal"  {console.log(yytext+"--");return "tk_DECIMAL";}
"double"   {console.log(yytext+"--");return "tk_double";}
"declare"  {console.log(yytext+"--");return "tk_declare";}
"function" {console.log(yytext+"--");return "tk_function";}
"AS"       {console.log(yytext+"--");return "tk_AS"}
"as"       {console.log(yytext+"--");return "tk_as"}
"xs"       {console.log(yytext+"--");return "tk_xs"}
"to"       {console.log(yytext+"--");return "tk_to"}
"at"       {console.log(yytext+"--");return "tk_at"}
"local"    {console.log(yytext+"--");return "tk_local";}
"gt"       {console.log(yytext+"--"); return "tk_gt"}
"lt"       {console.log(yytext+"--"); return "tk_lt"}

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
":=" {console.log(yytext+"--");return "tk_igualXQUERY"}
":"  {return "tk_dosPuntos"}
"="  {return "tk_igual"}
"["  {return "tk_llaveA"}
"]"  {return "tk_llaveC"}
"@"  {return "tk_arroba"}
"{"  {console.log(yytext+"--");return "llaveA"}
"}"  {console.log(yytext+"--");return "llaveC"}
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
. {         
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
    //const {Print} = require('../Instrucciones/Print');
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
    const {DeclaracionMetodo} = require('./Instrucciones/DeclaracionMetodo');
    const {LlamadaMetodo} = require('./Instrucciones/LlamadaMetodo');
    const { If } = require('./Instrucciones/If');
    const { Retorno } = require('./Instrucciones/Retorno');
    const { Aritmetica } = require('./Expresiones/Aritmetica');
    const { Relacional } = require('./Expresiones/Relacional');
    const { NodoX } = require('./Expresiones/NodoX');
    const { EjecucionXpath } = require('./Arbol/Ejecucion');
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
%}


%left tk_mod
%left tk_or
%left tk_and
%left tk_barra
%left tk_igual tk_distinto tk_igualXQUERY
%left tk_mayorIgual tk_menorIgual tk_mayor tk_menor tk_lt tk_gt
%left tk_diagonal
%left tk_llaveA tk_llaveC
%left tk_div tk_asterisco
%left tk_mas tk_menos
%left tk_parA tk_parC

%start INICIO_XQUERY
%%
INICIO_XQUERY : INSTRUCCIONES
| EOF;

FUNCION:
    tk_declare tk_function MENU_LOCAL tk_dosPuntos
    tk_identificador tk_parA LISTA_DECLARACION_FUNCION 
    tk_parC  tk_as  tk_xs     tk_dosPuntos TIPO_DATO MENU_INTERROGA
    llaveA  INSTRUCCIONES llaveC tk_punto_coma
    {$$ = new DeclaracionMetodo($12 ,$5, $7, $15, @1.first_line, @1.first_column);}
    
    
    
    ;


MENU_INTERROGA : 
    tk_Interroga {$$=$1}
    |  {$$=''};

/*
$p as xs:decimal?
*/
LISTA_DECLARACION_FUNCION :  
    LISTA_DECLARACION_FUNCION  tk_coma DECLARACION_FUNCION {$1.push($3); $$=$1;}
    | DECLARACION_FUNCION {$$=$1} ;

DECLARACION_FUNCION:
    tk_identificadorXQUERY tk_as tk_xs  tk_dosPuntos TIPO_DATO 
    MENU_INTERROGA 
    
    {$$ = new Declaracion($4, $1, null,@1.first_line, @1.first_column);}   
     ;


MENU_LOCAL: tk_local {$$=$1;}
//aqui voy a meter mas pero no se si solo se pueden declarar funciones localres 
;

TIPO_DATO:
    tk_int 
        {$$ = new Tipo(tipos.ENTERO);}
    | tk_string  
        {$$ = new Tipo(tipos.STRING);}
    | tk_double  
        {$$ = new Tipo(tipos.DECIMAL);}
    | tk_DECIMAL 
        {$$ = new Tipo(tipos.DECIMAL);}
    | tk_integer 
        {$$ = new Tipo(tipos.ENTERO);}
    ;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION 
        { $1.push($2); $$ = $2; }
    | INSTRUCCION  
        { $$ = $1 }
    ;

INSTRUCCION :
    DECLARACION_GLOBAL{$$=$1}
    | FUNCION {$$=$1}
    | IF {$$=$1}
    | WHERE {$$=$1}
    | FOR {$$=$1}
    | LLAMADA_FUNCION {$$=$1}
    | RETURN_CICLO {$$=$1}
    |EOF
    ;

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
    XPATH
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


RETURN_CICLO:
    tk_return Lista_Ciclo 
        {
            $$ = new Retorno($2, @1.first_line, @1.first_column)
        }
    ;

Lista_Ciclo:
    Lista_Ciclo tk_and valor_if { $1.push($3); $$ = $1;}
    |valor_if { $$ = $1;}
    ;

LISTA_ASIGNACION:
    LISTA_ASIGNACION tk_and ASIGNACION_SIMPLE
    | ASIGNACION_SIMPLE ;

ASIGNACION_SIMPLE :
    tk_identificador tk_igual  valores_if
    | TK tk_identificadorXQUERY tk_igual valores_if ;

IF: 
    tk_if tk_parA EXP_XQUERY tk_parC tk_then valores_if
        {
            $$ = new If($3, $6, [], @1.first_line, @1.first_column);
        }
    | tk_if tk_parA EXP_XQUERY tk_parC tk_then valores_if tk_else valores_if 
        {
            $$ = new If($3,$6,$8, @1.first_line, @1.first_column);
        }
    | tk_if tk_parA EXP_XQUERY tk_parC tk_then valores_if tk_else IF
        {
            $$ = new If($3, $6, [$8], @1.first_line, @1.first_column);
        } 
    ;


valores_if:
valores_if valor_if {$1.push($2); $$=$1;}
|valor_if {$$=$1};


valor_if:
    EXP_XQUERY { $$ = $1}
    | INSTRUCCIONES { $$ = $1}
    |EOF;
    



LLAMADA_FUNCION:
    tk_local tk_dosPuntos tk_identificador tk_parA  Parametros_llamada tk_parC
   {$$ = new LlamadaMetodo($3, $5, @1.first_line, @1.first_column);}
   ;


/*
$p as xs:decimal?
*/


Parametros_llamada:
Parametros_llamada EXP_XQUERY { $1.push($2)  ;  $$=$1;  } 
|EXP_XQUERY {$$=$1}


;




DECLARACION_GLOBAL :
    tk_let LISTA_ID  tk_igualXQUERY EXP_XQUERY 
        {
         //   console.log($1, $2, $3, $4);
            $$ = new Declaracion(new Tipo(tipos.VARIABLE), $2, $4, @1.first_line, @1.first_column);
        };


LISTA_ID : 
    LISTA_ID tk_coma tk_identificadorXQUERY {$1.push($3); $$=$1;  }
    | tk_identificadorXQUERY {$$ = $1}
    ;

EXP_XQUERY:
    EXP_XQUERY tk_menos EXP_XQUERY
        {
            $$ = new Aritmetica($1, $3, '-', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mas EXP_XQUERY  
        {
            $$ = new Aritmetica($1, $3, '+', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_div EXP_XQUERY
        {
            $$ = new Aritmetica($1, $3, '/', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mod EXP_XQUERY 
        {
            $$ = new Aritmetica($1, $3, '%', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_asterisco EXP_XQUERY
        {
            $$ = new Aritmetica($1, $3, '*', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_menor EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '<', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_gt EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '>', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_lt EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '<', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mayor EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '>', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_menorIgual EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '<=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_mayorIgual EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '>=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_igual EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '==', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_distinto EXP_XQUERY
        {
            $$ = new Relacional($1, $3, '!=', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_or EXP_XQUERY 
        {
            $$ = new Logico($1, $3, '||', @1.first_line, @1.first_column);
        }
    | EXP_XQUERY tk_to EXP_XQUERY{$$=$1+$2+$3}

    |  EXP_XQUERY tk_coma EXP_XQUERY{$$=$1+$2+$3}
    |XPATH
    | EXP_XQUERY tk_and EXP_XQUERY
        {
            $$ = new Logico($1, $3, '&&', @1.first_line, @1.first_column);
        }
    | tk_entero 
        {
            $$ = new Primitivo(new Tipo(esEntero(Number($1))), Number($1), @1.first_line, @1.first_column);
        }         
    | tk_decimal
        {
            $$ = new Primitivo(new Tipo(esEntero(Number($1))), Number($1), @1.first_line, @1.first_column);
        }
    | tk_stringTexto
        {
            $$ = new Primitivo(new Tipo(tipos.STRING), $1, @1.first_line, @1.first_column);
        }          
    | tk_identificador 
        {
            $$ = new Identificador($1, @1.first_line, @1.first_column);
        }
    | tk_identificadorXQUERY OPCION_IDQ{
          $$ = new Identificador($1, @1.first_line, @1.first_column);


    }
    | tk_parA EXP_XQUERY tk_parC
        {
            $$ = $2
        }
    | tk_local tk_dosPuntos tk_identificador tk_parA  EXP_XQUERY tk_parC {  $$ = $1+$2+$3+$4+$5+$6} 
    | EXP_XQUERY tk_parA EXP_XQUERY tk_parC  
    |
    ;

OPCION_IDQ:
    XPATH { $$ = $1}
    | {$$ = []};       

XPATH :
    INICIO 
        {
            let query = new EjecucionXpath($1, "");
            console.log(query.ejecutarArbol())
            $$ = query.ejecutarArbol();
        }
    ;

INICIO : 
    INICIO tk_barra INICIALES
        { 
            $$.push($3)
        }
    | INICIALES 
        { 
            $$ = [$1]
        }
    ;

INICIALES : 
    tk_punto DIAGONALES DERIVADOSLIMITADO DERIVACIONDIAGONAL
        {
            $$ = new NodoX("", ".", [new NodoX($2, $3.val, [...$4])]);
        }
    | tk_identificador DERIVACIONDIAGONAL 
        {
            $$ = new NodoX("", $1, [...$2]);
        }
    | tk_diagonal DERIVADOS DERIVACIONDIAGONAL
        {
           $$ = new NodoX($1, $2.val, [...$3]);
        }
    | tk_diagonal tk_diagonal DERIVADOS DERIVACIONDIAGONAL
        {
            $$ = new NodoX("//", $3.val, [...$4]);
        }
    | tk_asterisco DERIVACIONDIAGONAL
        {
            $$ = new NodoX("", $1, [...$2]);
        }
    | tk_node tk_parA tk_parC DERIVACIONDIAGONAL
        {
            $$ = new NodoX("", "node()", [...$4]);
        }
    ;

DIAGONALES : 
    tk_diagonal
        {
            $$ = $1
        }
    | tk_diagonal tk_diagonal
        {
            $$ = "//"
        }
    | error tk_diagonal
    ;

DERIVACIONDIAGONAL : 
    DIAGONALES DERIVADOS DERIVACIONDIAGONAL
        {
            $$ = new Array();
            $$.push(new NodoX($1, $2.val, [...$3])); 
        }
    |  
        {
            $$ = [];
        }
    ;

DERIVADOSLIMITADO :
    tk_identificador
        {
            $$ = {val: $1, pre: null};
        }
    | tk_asterisco
        {
            $$ = {val: $1, pre: null};
        }
    | tk_node tk_parA tk_parC
        {
            $$ = {val: "node()", pre: null}
        }
    | tk_arroba ATRIBUTO
        {
            $$ = {val: $1 + "" + $2, pre: null};
        }
    ;

DERIVADOS : 
    tk_punto
        {
            $$ = {val: $1, pre: null}; 
        }
    | tk_punto tk_punto
        {
            $$ = {val: "..", pre: null}; 
        }
    | DERIVADOSLIMITADO 
        {
            $$ = $1; 
        }
    ;

ATRIBUTO :
    tk_asterisco 
        {
            $$ = $1;
        }
    | tk_identificador
        {
            $$ = $1;
        }
    | tk_node tk_parA tk_ParC
        {
            $$ = "node()"
        } 
    ;