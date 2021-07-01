%lex
 
%options case-insensitive

%%
"//".*                              /* skip comments */
".h"        return 'puntoH';
"*"         return 'asterisk';
"/"         return 'div';
"("         return 'parIzq';
")"         return 'parDer';
"{"         return 'llaIzq';
"}"         return 'llaDer';
"["         return 'corcheteIzq';
"]"         return 'corcheteDer';
"%"         return 'mod';
";"         return 'ptcoma';
":"         return 'dospuntos';
"+"         return 'add';
","         return 'comma';
"-"         return 'minus';
"=="        return 'equalequal'
"="         return 'equal';
"!="        return 'diferent';
"<"         return 'menor';
"<="        return 'menorIgual';
">"         return 'mayor';
">="        return 'mayorIgual';
"#include"  return 'include';
"goto"      return 'goto';
"if"        return 'if';
"float"     return 'float';
"int"       return 'int';
"char"      return 'char';
"double"    return 'double';
"main"      return 'main';
"printf"    return 'printf';
"return"    return 'return';
"void"      return 'void';
[ \r\t]+     {}       
\n           {}   
[0-9]+                  return  'digits';
[0-9]+("."[0-9]+)?      return  'decimal';
[A-Za-z_][A-Za-z_0-9]*	return 'id';
(\"({EscapeQuot}|[^"])*\")|("'""({EscapeApos}|[^'])*""'") return 'cadena';

<<EOF>>                 return 'EOF';
.       {
        console.error('Error');
}
/lex

%right 'equal'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual', 'diferent'

%left 'add', 'minus' /*binary*/
%left 'asterisk', 'div', 'mod'

%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer'


%start ini
%% /*definicion de gramática*/


ini
    :BMAIN BLOQUES EOF                                                          {$$=[$1];  $$=arr($$,$2);console.log("1", $1);/*$$= unir1($1,$2); */ return $$}
    |BLOQUES BMAIN BLOQUES EOF                                                  {$1.push($2);  $$= arr($1,$3); console.log("2",$1); /*$$= unir2($1,$2,$3);*/return $$} 
    |BLOQUES BMAIN EOF                                                          { $1.push($2); $$=$1; console.log("3**",$1);/*$$ =unir3($1,$2);*/ return $$}
    |BMAIN EOF                                                                  { $$=[$1];console.log("4",$1);/*$$ =$1.get3D();*/ return $$}
;
BMAIN
    :TIPO_FUNCTION main parIzq parDer llaIzq llaDer                             {$$ = new main(@1.first_line, @1.first_column, TipoBloque.MAIN, [],[], $1)}
    |TIPO_FUNCTION main parIzq PARAMETROS parDer llaIzq llaDer                  {$$ = new main(@1.first_line, @1.first_column, TipoBloque.MAIN, [],new parametro(@1.first_line, @1.first_column,TipoBloque.PARAM, $4),$1)}
    |TIPO_FUNCTION main parIzq parDer llaIzq INSTRUCCIONES llaDer               {$$ = new main(@1.first_line, @1.first_column, TipoBloque.MAIN, $6,[],$1)}
    |TIPO_FUNCTION main parIzq PARAMETROS parDer llaIzq INSTRUCCIONES llaDer    {$$ = new main(@1.first_line, @1.first_column, TipoBloque.MAIN, $7,new parametro(@1.first_line, @1.first_column,TipoBloque.PARAM, $4),$1)}
;

TIPO_FUNCTION
    :void                                                                       {$$=$1}
    |TIPO_DATO                                                                  {$$=$1}
;
TIPO_DATO
    :double                                                                     {$$=$1}
    |float                                                                      {$$=$1}
    |char                                                                       {$$=$1}
    |int                                                                        {$$=$1}
    
;

BLOQUES
    :BLOQUES BLOQUE                                                             {$1.push($2); $$=$1}
    |BLOQUE                                                                     {$$=[$1]}
;

BLOQUE
    :TIPO_FUNCTION id parIzq parDer llaIzq llaDer                               {$$ = new funcion(@1.first_line, @1.first_column, TipoBloque.FUNCTION, [],[],$2, $1)}
    |TIPO_FUNCTION id parIzq PARAMETROS parDer llaIzq llaDer                    {$$ = new funcion(@1.first_line, @1.first_column, TipoBloque.FUNCTION, [],new parametro(@1.first_line, @1.first_column,TipoBloque.PARAM, $4),$2, $1)}
    |TIPO_FUNCTION id parIzq parDer llaIzq INSTRUCCIONES llaDer                 {$$ = new funcion(@1.first_line, @1.first_column, TipoBloque.FUNCTION, $6,[],$2,$1)}
    |TIPO_FUNCTION id parIzq PARAMETROS parDer llaIzq INSTRUCCIONES llaDer      {$$ = new funcion(@1.first_line, @1.first_column, TipoBloque.FUNCTION, $7,new parametro(@1.first_line, @1.first_column,TipoBloque.PARAM, $4),$2, $1)}
    |include menor id puntoH mayor                                              {$$= new include(@1.first_line, @1.first_column, $1 +"<"+$3+".h>\n", TipoBloque.INCLUDE)}
    |TIPO_FUNCTION IDS equal EXPR ptcoma                                        {$$ = new declaracionAsig(@1.first_line, @1.first_column,$4,$2,TipoBloque.DECLARACION_ASIG, $1)}
    |TIPO_FUNCTION IDS ptcoma                                                   {$$ = new declaracionS(@1.first_line, @1.first_column, TipoBloque.DECLARACION_S, $1, $2)}
    |TIPO_FUNCTION id corcheteIzq digits corcheteDer ptcoma                     {$$ = new declaracionArray(@1.first_line, @1.first_column, TipoBloque.DECLARACION_ARREGLO, $2, $1,$4)}
    
;

PARAMETROS
    :PARAMETROS comma TIPO_DATO id                                              {$1.push($3); $1.push($4); $$ =$1}
    |TIPO_DATO id                                                               {$$=[$1,$2]}                                                            
;

IDS
    :IDS comma id                                                               {$1.push($3); $$=$1}
    |id                                                                         {$$=[$1]}
;
EXPR    
    :EXPR add EXPR                                                              {$$=$1+" + "+$3}
    |EXPR minus EXPR                                                            {$$=$1+" - "+$3}
    |EXPR asterisk EXPR                                                         {$$=$1+" * "+$3}
    |EXPR div EXPR                                                              {$$=$1+" / "+$3}
    |EXPR mod EXPR                                                              {$$=$1+" % "+$3}
    |minus id                                                                   {$$="-"+$2}
    |minus decimal                                                              {$$="-"+$2}
    |minus digits                                                               {$$="-"+$2}
    |id                                                                         {$$=$1}
    |decimal                                                                    {$$=$1}
    |digits                                                                     {$$=$1}
    |cadena                                                                     {$$=$1}                                                            
;

INSTRUCCIONES 
    :INSTRUCCIONES INSTRUCCION                                                  {$1.push($2); $$=$1}
    |INSTRUCCION                                                                {$$=[$1]}

;
INSTRUCCION
    :id equal EXPR ptcoma                                                       {$$= new asignacionOp(@1.first_line, @1.first_column,$1, $3, tipoInstr.ASIGNACION_OPERACION) }
    |id corcheteIzq parIzq TIPO_DATO parDer EXPR corcheteDer equal EXPR ptcoma  {$$ = new asignacionArray(@1.first_line, @1.first_column, tipoInstr.ASIGNACION_ARREGLO,$1,$4, $6, $9)}
    |id equal id corcheteIzq parIzq TIPO_DATO parDer EXPR corcheteDer ptcoma    {$$=  new asignarIdArray(@1.first_line, @1.first_column,tipoInstr.ASIGNACION_ID_ARRAY, $1, $3, $6,$8)}
    |id dospuntos                                                               {$$ = new etiqueta(@1.first_line, @1.first_column,tipoInstr.ETIQUETA, $1)}
    |goto id ptcoma                                                             {$$= new goto(@1.first_line, @1.first_column, tipoInstr.GOTO, $2)}
    |return ptcoma                                                              {$$= new Return(@1.first_line, @1.first_column, "return;\n", tipoInstr.RETURN)}
    |return EXPR ptcoma                                                         {$$= new Return(@1.first_line, @1.first_column, "return "+ $2+";\n", tipoInstr.RETURN)}
    |id parIzq parDer ptcomaa                                                   {$$ = new call(@1.first_line, @1.first_column, tipoInstr.CALL, [], $1)}
    |id parIzq IDS parDer ptcoma                                                {$$ = new call(@1.first_line, @1.first_column, tipoInstr.CALL, $3, $1)}
    |printf parIzq EXPR parDer ptcoma                                           {$$ = new print(@1.first_line, @1.first_column, tipoInstr.PRINT, $3)}
    |if parIzq EXPR COMPARADOR EXPR parDer goto id ptcoma                       {$$= new _if(@1.first_line, @1.first_column, $3, $4,$5,$8, tipoInstr.IF)}
    |TIPO_FUNCTION IDS equal EXPR ptcoma                                        {$$ = new declaracionAsig(@1.first_line, @1.first_column,$4,$2,TipoBloque.DECLARACION_ASIG, $1)}
    |TIPO_FUNCTION IDS ptcoma                                                   {$$ = new declaracionS(@1.first_line, @1.first_column, TipoBloque.DECLARACION_S, $1, $2)}
    |TIPO_FUNCTION id corcheteIzq digits corcheteDer ptcoma                     {$$ = new declaracionArray(@1.first_line, @1.first_column, TipoBloque.DECLARACION_ARREGLO, $2, $1,$4)}
;
OPERADOR
    :add                                                                        {$$=$1}
    |minus                                                                      {$$=$1}
    |div                                                                        {$$=$1}
    |asterisk                                                                   {$$=$1}
    |mod                                                                        {$$=$1}
;
COMPARADOR
    :equalequal                                                                 {$$=$1}
    |diferent                                                                   {$$=$1}
    |mayorIgual                                                                 {$$=$1}
    |menorIgual                                                                 {$$=$1}
    |mayor                                                                      {$$=$1}
    |menor                                                                      {$$=$1}
;

