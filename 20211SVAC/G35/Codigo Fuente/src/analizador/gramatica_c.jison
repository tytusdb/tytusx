/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno


/* Expresiones regulares */
num     [0-9]+

//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+

//--> Char
caracter     (\'({escape} | {aceptacion})*\')

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* Ignoro bloque comentarios */


/* Simbolos del programa */



"("                    { return 'para'}
")"                    {  return 'parc'}
"["                    {  return 'cora'}
"]"                    {  return 'corc'}
"{"                    { return 'lla'}
"}"                    { return 'llc'}
";"                    {  return 'pyc'}
":"                    {  return 'dosp'}
"."                    {  return 'punto'}
","                    { return 'coma'}
"?"                    { return 'signopregunta'}


/* Operadores Aritmeticos */
"+"                    {  return 'mas'}
"-"                   {  return 'menos'}
"*"                   { return 'multi'}
"/"                   {  return 'div'}
"^"                   {  return 'potencia'}
"%"                   {  return 'modular'}



/* Operadores Logicos */



/* Palabras reservadas */
"#include" return 'include';
"<"([a-zñA-ZÑ_])[a-zñA-ZÑ0-9_\-\.]*">" return 'libreria';
"true"               {return 'true'}
"false"               { return 'false'}
"int"               {  return 'int'}
"string"               {  return 'string'}
"boolean"               { return 'boolean'}

"double" return 'double';
"char" return 'char';
"float" return 'float';
"if" return "if";
"else" return 'else';
"short" return 'short';
"long" return 'long';
"int" return 'int';
"return" return 'return';
"void" return 'void';
"printf" return 'printf';
"print" return 'print';
"goto" return 'goto';


/* Operadores Relacionales */
"=="                    {  return 'igualigual'}
"!="                    {  return 'diferente'}
"<="                    {  return 'menorigual'}
">="                    { return 'mayorigual'}
"<"                    { return 'menorque'}
">"                   {  return 'mayorque'}
"!"                   {return 'not'}


/*EXTRAS PALABRAS RESERVADAS*/


/*OTROS*/
"="                    { return 'igual'}








/* SIMBOLOS ER */

[0-9]+("."[0-9]+)?\b        {  return 'decimal'}
"{num}"                { return 'entero'}
\"[^\"]*\"                    {  return 'cadena'}
\'[^\']*\'                    { return 'caracter'}
"{caracter}"                    { return 'char'}
([a-zñA-ZÑ_])[a-zñA-ZÑ0-9_]* { return 'identificador';}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.					{
  const er = new error_1.Error({ tipo: 'lexico', linea: `${yylineno + 1}`, descripcion: `XML> El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` });
  errores_1.Errores.getInstance().push(er);
  }

/lex

/* Area de imports */
%{

  const { NodoAST } = require('../arbol/nodoAST');
  const error_1 = require("../arbol/error");
  const errores_1 = require("../arbol/errores");
  const regla_1 = require("../arbol/reglaGramatical");
  const reporte_1 = require("../arbol/reporteGramatical");

%}

/* Precedencia de operadores de mayor a menor */
%right 'signopregunta'
%right 'not'
%left 'igualigual' 'diferente' 'menorque' 'menorigual' 'mayorque' 'mayorigual'
%left 'mas' 'menos'
%left 'multi' 'div' 'modular'
%right 'unario'
%nonassoc 'potencia' 

%right 'para'


%start INICIO

%% /* Gramatica */


INICIO: INSTRUCCIONES EOF { return new NodoAST({label: '/', hijos: $1, linea: yylineno});  }
      ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   { $$ = $1; $$.push($2); }
            | INSTRUCCION                   {$$= new Array(); $$.push($1); }
            ;

INSTRUCCION : DECLARACION            {$$=$1;}
            | ASIGNACION             {$$=$1;}
            | IPRIM                  {$$=$1;}
            | SENT_IF                {$$=$1;}
            | FUNCION                {$$=$1;}
            | LLAMADA pyc            {$$=$1;}
            | TRANSFERENCIA          {$$=$1;}
            | CREAVECTOR             {$$=$1;}
            | ASIGNAVECTOR           {$$=$1;}
            | LIBRERIAS              {$$=$1;}
            | RETURN                 {$$=$1;}
            | GOTOI                  {$$=$1;}
            | CREAETIQUETA           {$$=$1;}
            | DECLARACION2           {$$=$1;}
            | error{
                var regla = new regla_1.reglaGramatical({ produccion: ` Linea: ${yylineno+1} `, regla: $1 });
                reporte_1.ReporteGramatical.getInstance().push(regla);
            }
            ;
            


GOTOI: goto identificador pyc {$$ = new NodoAST({label:'GOTO', hijos:[$2], linea:yylineno});}
     ;

CREAETIQUETA: identificador dosp {$$=new NodoAST({label:'LABEL', hijos:[$1], linea:yylineno});}
            ;

TIPO : int      {$$=$1;}
    | double    {$$=$1;}
    | string    {$$=$1;}
    | char      {$$=$1;}
    | boolean   {$$=$1;}
    | void      {$$=$1;}
    ;

SENT_IF : if para E parc goto identificador pyc {$$= new NodoAST({label: 'IF', hijos: [$3, $6], linea: yylineno}); }
        ;



FUNCION: TIPO identificador para parc lla INSTRUCCIONES llc {$$=new NodoAST({label: 'CREAR_FUNCION', hijos: [$1, $2, $6], linea: yylineno}); }
       ;



LLAMADA : identificador para parc {$$=new NodoAST({label: 'LLAMAR_FUNCION', hijos: [$1], linea: yylineno}); }
        ;



        

IPRIM : printf para cadena parc pyc {
$3 = $3.slice(1, $3.length-1);  
$$ = new NodoAST({label: 'PRINT', hijos: [$3], linea: yylineno}); 

}
      | printf para cadena coma LISTA_E parc pyc {
        
var ListaE = new NodoAST({label:'LISTA_E', hijos:[...$5], linea:yylineno});
var String3 = $3.slice(1, $3.length-1);
$$ = new NodoAST({label:'PRINT', hijos:[String3, ListaE], linea:yylineno});
}
      ;




DECLARACION : TIPO LISTA_E pyc   {
var ListaS = new NodoAST({label: 'LISTA_E', hijos: [...$2], linea: yylineno}); 
$$ = new NodoAST({label: 'DECLARACION', hijos: [$1, ListaS], linea: yylineno}); 
}
            ;

DECLARACION2 : TIPO identificador igual E  {$$=new NodoAST({label:'DECLARACION2', hijos:[$1, $2, $4], linea:yylineno});}
             ;

LISTA_E : LISTA_E coma E {$$=$1; $$.push($3);}
    | E {$$ = new Array(); $$.push($1);}
    ;

/*LISTA_S : LISTA_S coma identificador {$$ = $1; $$.push(new NodoAST({label:'ID', hijos:[$3], linea:yylineno}));}
    | LISTA_S coma identificador igual E {$$ = $1; $$.push(new NodoAST({label:'ASIGNACION', hijos:[$3, $5], linea:yylineno}));}
    | LISTA_S coma identificador cora E corc igual E {$$=$1; $$.push(new NodoAST({label:'ASIGNACIONV', hijos:[$3, $5, $8], linea:yylineno}));}
    | identificador {$$ = new Array(); $$.push(new NodoAST({label:'ID', hijos:[$1], linea:yylineno}));}
    | identificador igual E {$$ = new Array(); $$.push(new NodoAST({label:'ASIGNACION', hijos:[$1, $3], linea:yylineno}));}
    | identificador cora E corc igual E {$$ = new Array(); $$.push(new NodoAST({label:'ASIGNACIONV', hijos:[$1, $3, $6], linea:yylineno}));}
    ;*/


ASIGNACION : identificador igual E pyc   {$$ = new NodoAST({label: 'ASIGNACION', hijos: [$1, $3], linea: yylineno}); }
           | identificador cora E corc igual E pyc {
$$ = new NodoAST({label:'ASIGNACIONV', hijos:[$1,$3,$6], linea:yylineno});
}
           ; 

RETURN : return E pyc {$$ = new NodoAST({label: 'RETURN', hijos: [$2], linea: yylineno}); }
       | return pyc   {$$ = new NodoAST({label: 'RETURN', hijos: [], linea: yylineno}); }
       ;

LIBRERIAS : include libreria {$$= new NodoAST({label: 'LIBRERIA', hijos: [$2], linea: yylineno}); }
          ;


E : E mas E                 {$$=new NodoAST({label:'E', hijos: [$1, '+', $3], linea: yylineno});}
    | E menos E             {$$=new NodoAST({label:'E', hijos: [$1,'-',$3], linea: yylineno});}
    | E multi E             {$$=new NodoAST({label:'E', hijos: [$1,'*',$3], linea: yylineno});}
    | E div E               {$$=new NodoAST({label:'E', hijos: [$1,'/',$3], linea: yylineno});}
    | E potencia E          {$$=new NodoAST({label:'E', hijos: [$1,'^',$3], linea: yylineno});}
    | E modular E           {$$=new NodoAST({label:'E', hijos: [$1,'%',$3], linea: yylineno});}
    | not E                 {$$=new NodoAST({label:'E', hijos: ['!',$2], linea: yylineno});}//CASO ESPECIAL
    | E mayorque E          {$$=new NodoAST({label:'E', hijos: [$1,'>',$3], linea: yylineno});}
    | E igualigual E        {$$=new NodoAST({label:'E', hijos: [$1,'==',$3], linea: yylineno});}
    | E diferente E         {$$=new NodoAST({label:'E', hijos: [$1,'!=',$3], linea: yylineno});}
    | E menorigual E        {$$=new NodoAST({label:'E', hijos: [$1,'<=',$3], linea: yylineno});}
    | E menorque E          {$$=new NodoAST({label:'E', hijos: [$1,'<',$3], linea: yylineno});}
    | E mayorigual E        {$$=new NodoAST({label:'E', hijos: [$1,'>=',$3], linea: yylineno});}
    | menos E               {$$=new NodoAST({label:'E', hijos: ['-',$2], linea: yylineno});}//CASO ESPECIAL
    | para E parc           {$$ = $2;}
    | decimal               {$$ = new NodoAST({label: 'NUM', hijos: [$1], linea: yylineno}); }
    | entero                {$$ = new NodoAST({label: 'NUM', hijos: [$1], linea: yylineno}); }
    | cadena                {$1 = $1.slice(1, $1.length-1); 
$$=new NodoAST({label: 'CADENA', hijos: [$1], linea: yylineno}); ; 
}
    | caracter              {$1 = $1.slice(1, $1.length-1); 
$$=new NodoAST({label: 'CADENA', hijos: [$1], linea: yylineno});  
}
    | true                  {$$='true';}
    | false                 {$$='false'}
    | identificador         {$$=new NodoAST({label: 'ID', hijos: [$1], linea: yylineno});}
    | identificador cora E corc {$$= new NodoAST({label:'CORCHETE_ID', hijos:[$1, $3], linea:yylineno});}
    | cora E corc {$$ = new NodoAST({label:'CORCHETE', hijos:[$2], linea:yylineno});}
    | para TIPO parc E {$$ = new NodoAST({label: 'CAST', hijos:[$2, $4], linea:yylineno});}
    ;
%%