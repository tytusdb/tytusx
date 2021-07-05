%lex

%%

//Expresiones regulares para la aceptacion de numeros enteros y decimales
[0-9]+("."[0-9]+)\b {return "tk_decimal";}
[0-9]+\b            {return "tk_entero";}

//Palabras reservadas
"node"               {return "tk_node";}
"child"              {return "tk_child";}
"let"      {console.log(yytext+"--");return "tk_let";}
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
"gt" {console.log(yytext+"--"); return "tk_gt"}
"lt" {console.log(yytext+"--"); return "tk_lt"}
//conjunto de simbolos aceptados
"|"  {return "tk_barra"}
"."  {return "tk_punto"}
";"  {return "tk_punto_coma"}
","  {return "tk_coma"}
"/"  {return "tk_diagonal"}
"*"  {return "tk_asterisco"}
"?" {return "tk_Interroga"}
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

INICIO_XQUERY : INSTRUCCIONES EOF;

FUNCION:
    tk_declare tk_function MENU_LOCAL tk_dosPuntos
    tk_identificador tk_parA LISTA_DECLARACION_FUNCION 
    tk_parC  tk_as  tk_xs     tk_dosPuntos TIPO_DATO MENU_INTERROGA
    llaveA  INSTRUCCIONES llaveC tk_punto_coma;


MENU_INTERROGA : 
    tk_Interroga 
    | ;

/*
$p as xs:decimal?
*/
LISTA_DECLARACION_FUNCION :  
    LISTA_DECLARACION_FUNCION  tk_coma DECLARACION_FUNCION
    | DECLARACION_FUNCION ;

DECLARACION_FUNCION:
    tk_identificadorXQUERY tk_as tk_xs  tk_dosPuntos TIPO_DATO
    MENU_INTERROGA;


MENU_LOCAL: tk_local
//aqui voy a meter mas pero no se si solo se pueden declarar funciones localres 
;

TIPO_DATO:
    tk_int
    | tk_string
    | tk_double
    | tk_DECIMAL
    | tk_integer;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION 
    | INSTRUCCION;

INSTRUCCION :
    DECLARACION_GLOBAL{console.log($1)}
    | FUNCION
    | IF
    |WHERE
    |FOR
    |LLAMADA_FUNCION
    |RETURN_CICLO



;


FOR :
    tk_for  DECLARACIONES_FOR OPCIONES_FOR;

DECLARACIONES_FOR:
    DECLARACIONES_FOR tk_coma DECLARACION_FOR
    | DECLARACION_FOR;

DECLARACION_FOR:
    tk_identificadorXQUERY OPCION_AT tk_in FOR_REC;

OPCION_AT:
    tk_at  tk_identificadorXQUERY
    | ;

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
    |ComentarioM ;

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
    tk_return tk_identificadorXQUERY XPATH
    | tk_return INSTRUCCIONES
    | tk_return EXP_XQUERY ;

LISTA_ASIGNACION:
    LISTA_ASIGNACION tk_and ASIGNACION_SIMPLE
    | ASIGNACION_SIMPLE ;

ASIGNACION_SIMPLE :
    tk_identificador tk_igual  valores_if
    | TK tk_identificadorXQUERY tk_igual valores_if ;

IF: 
    tk_if tk_parA EXP_XQUERY tk_parC  tk_then valores_if  ELSE ;

ELSE:
    tk_else valor_if
    | tk_else IF
    | ;

valores_if:
valores_if valor_if
|valor_if

;    

valor_if:
    EXP_XQUERY {console.log($1+"*****")}
    | INSTRUCCIONES
 

    |ComentarioM
   
     ;


LLAMADA_FUNCION:
    tk_local tk_dosPuntos tk_identificador tk_parA  EXP_XQUERY tk_parC {  $$ = $1+$2+$3+$4} ;

CONDICION : 
    tk_parA OPCIONES_CONDICION tk_parC ;

OPCIONES_CONDICION:
    EXP_XQUERY
    | tk_identificadorXQUERY XPATH ;

/*
$p as xs:decimal?
*/






DECLARACION_GLOBAL :
    tk_let LISTA_ID  tk_igualXQUERY EXP_XQUERY {$$=$1+$2+$3+$4 } ;


LISTA_ID : 
    LISTA_ID tk_coma tk_identificadorXQUERY {$$=$1+$2+$3}
    | tk_identificadorXQUERY {$$=$1}
    ;









EXP_XQUERY:
  
     EXP_XQUERY tk_menos EXP_XQUERY{$$=$1+$2+$3}
     | EXP_XQUERY tk_mas EXP_XQUERY  {$$=$1+$2+$3}
    | EXP_XQUERY tk_div EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_mod EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_menor EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_gt EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_lt EXP_XQUERY{$$=$1+$2+$3}

    | EXP_XQUERY tk_mayor EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_menorIgual EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_mayorIgual EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_igual EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_distinto EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_or EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_to EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_and EXP_XQUERY{$$=$1+$2+$3}
    | EXP_XQUERY tk_asterisco EXP_XQUERY{$$=$1+$2+$3}
    | tk_entero {$$=$1}
    | tk_decimal{$$=$1}
  
    | tk_identificador{$$=$1}
    | tk_stringTexto{$$=$1}
    | tk_identificadorXQUERY OPCION_IDQ{$$=$1+$2}
    | tk_parA EXP_XQUERY tk_parC{$$=$1+$2+$3}
   |   tk_local tk_dosPuntos tk_identificador tk_parA  EXP_XQUERY tk_parC {  $$ = $1+$2+$3+$4+$5+$6} 
    //| EXP_XQUERY tk_parA EXP_XQUERY tk_parC



;
       OPCION_IDQ:
    XPATH
    |;       

CORDERNADA:
    tk_parA EXP_XQUERY tk_coma EXP_XQUERY tk_parC ;







XPATH :
    INICIO
        | EOF 
       ;

INICIO : 
    INICIO tk_barra INICIALES 
        
    | INICIALES 
      ;

INICIALES : 
    tk_punto DIAGONALES DERIVADOSLIMITADO DERIVACIONDIAGONAL
     
    | tk_identificador PREDICATE DERIVACIONDIAGONAL
       
    | tk_diagonal DERIVADOS DERIVACIONDIAGONAL 
        
    | tk_diagonal tk_diagonal DERIVADOS DERIVACIONDIAGONAL 
                
    | tk_asterisco PREDICATE DERIVACIONDIAGONAL
       
    | tk_node tk_parA tk_parC PREDICATE DERIVACIONDIAGONAL
       ;

DIAGONALES : 
    tk_diagonal 
      
    | tk_diagonal tk_diagonal 
        
    |   error tk_diagonal                                                                            
       
        ;

DERIVACIONDIAGONAL : 
    DIAGONALES DERIVADOS DERIVACIONDIAGONAL 
      
    |  ;

DERIVADOSLIMITADO :
    tk_identificador PREDICATE 
       
    | tk_asterisco PREDICATE 
      
    | tk_node tk_parA tk_parC PREDICATE 
        
    | tk_arroba ATRIBUTO
      
    
    | AXES 
       ;

DERIVADOS : 
    tk_punto 
       
    | tk_punto tk_punto 
      
    | DERIVADOSLIMITADO 
       ;

AXES :
    tk_child tk_dosPuntos tk_dosPuntos NODETEST
    | tk_descendant tk_dosPuntos tk_dosPuntos NODETEST
    | tk_descendatOr tk_dosPuntos tk_dosPuntos NODETEST
    | tk_ancestor tk_dosPuntos tk_dosPuntos NODETEST
    | tk_ancestorOr tk_dosPuntos tk_dosPuntos NODETEST
    | tk_attribute tk_dosPuntos tk_dosPuntos NODETEST
    | tk_following tk_dosPuntos tk_dosPuntos NODETEST
    | tk_followingSi tk_dosPuntos tk_dosPuntos NODETEST
    | tk_parent tk_dosPuntos tk_dosPuntos NODETEST
    | tk_preceding tk_dosPuntos tk_dosPuntos NODETEST
    | tk_precedingSi tk_dosPuntos tk_dosPuntos NODETEST
    | tk_self tk_dosPuntos tk_dosPuntos NODETEST;

NODETEST :
    tk_asterisco PREDICATE
    | tk_node tk_parA tk_parC PREDICATE
    | tk_identificador PREDICATE
    | tk_text tk_parA tk_parC;

PREDICATE : 
    tk_llaveA EXPRESION tk_llaveC
       
    | 
       ;

EXPRESION :
    EXPRESION tk_mas EXPRESION
    | EXPRESION tk_menos EXPRESION
    | EXPRESION tk_div EXPRESION
    | EXPRESION tk_mod EXPRESION
    | EXPRESION tk_menor EXPRESION

    | EXPRESION tk_mayor EXPRESION
    | EXPRESION tk_menorIgual EXPRESION
    | EXPRESION tk_mayorIgual EXPRESION
    | EXPRESION tk_igual EXPRESION
    | EXPRESION tk_distinto EXPRESION
    | EXPRESION tk_or EXPRESION
    | EXPRESION tk_to EXPRESION
    | EXPRESION tk_and EXPRESION
    | EXPRESION tk_asterisco EXPRESION
    | tk_entero 
    | tk_decimal
    | tk_arroba ATRIBUTO
    | tk_identificador
    | tk_position tk_parA tk_parC
    | tk_last tk_parA tk_parC
    | tk_stringTexto

    | tk_parA EXPRESION tk_parC
    //| EXPRESION tk_parA EXPRESION tk_parC

    ;
       

ATRIBUTO :
    tk_asterisco 
        
    | tk_identificador 
       
    | tk_node tk_parA tk_ParC 
        ;

 
