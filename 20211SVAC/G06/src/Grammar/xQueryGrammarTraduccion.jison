

%{
    const {Acceso} = require("../xqueryAST/ExpresionesXpath/Acceso");
    const {Aritmetico, operacionAritmetica} = require("../xqueryAST/ExpresionesXpath/Aritmetico");
    const {Logica, operacionLogica} = require("../xqueryAST/ExpresionesXpath/Logica");
    const {Path} = require("../xqueryAST/ExpresionesXpath/Path");
    const {Primitivo, tipoPrimitivo} = require("../xqueryAST/ExpresionesXpath/Primitivo");
    const {Relacional, operacionRelacional} = require("../xqueryAST/ExpresionesXpath/Relacional");
    const {ClaseError} = require("../xmlAST/ClaseError");

    const {For} = require("../xqueryAST/ExpresionesXqueryTraduccion/For");
    const {If} = require("../xqueryAST/ExpresionesXqueryTraduccion/If");
    const {Let} = require("../xqueryAST/ExpresionesXqueryTraduccion/Let");
    const {MultiXpaths} = require("../xqueryAST/ExpresionesXqueryTraduccion/MultiXpaths");
    const {Return} = require("../xqueryAST/ExpresionesXqueryTraduccion/Return");
    const {XqueryPath} = require("../xqueryAST/ExpresionesXqueryTraduccion/XqueryPath");
    
    
    var listaErrores = [];
    var tmp="";
%}

/* lexical grammar */
%lex 
%options case-insensitive
%s string

%%

(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))             return 'number'

<INITIAL>["]      {this.begin('string'); tmp=""; }           
<string>[^"]      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\]["]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\"]      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'cadena';
                  }

<INITIAL>[']      {this.begin('string'); tmp=""; }           
<string>[^']      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][']   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\']      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'scadena';
                  }


"//"                  return '//'
"/"                   return '/'
'..'                  return '..'
"."                   return '.'
","                   return ','
"@"                   return '@'
"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
"|"                   return '|'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"div"                 return 'div'
"="                   return '='
"!="                  return '!='
"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"or"                  return 'or'
"and"                 return 'and'
"mod"                 return 'mod'

" "                   {}
\n                    {}
"::"                  return '::'
"child"               return 'child'
"attribute"           return 'attribute'
"descendant"          return 'descendant'
"text"                return 'text'
"last"                return 'last' 
"position"            return 'position'


"else"                return 'else';
"then"                return 'then';
"if"                  return 'if';
"ascending"           return 'ascending';
"descending"          return 'descending';
"by"                  return 'by';
"order"               return 'order';
"where"               return 'where';
"at"                  return 'at';
"in"                  return 'in';
"for"                 return 'for';
"return"              return 'return';
"$"                   return '$';
"let"                 return 'let';
":="                  return ':=';

        
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                    return 'id'
<<EOF>>                                     return 'EOF'
.             {console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

/* operator associations and precedence */
%left 'or'
%left 'and' 
%left '=' '!='
%left '>=' '<=' '<' '>'
%left '+' '-'
%left '*' 'div'
%left 'mod'

/* definition of grammar */
%start INIT 

%% 

INIT
    : LQUERYS 'EOF'                                         {return $1;}
    | 'EOF'                                                 {return $1;}
    ;
    
LQUERYS
    : LQUERYS ',' QUERY                                     {$1.push($3); $$ = $1;}
    | QUERY                                                 {$$ = [$1];}
    ;    

QUERY                                                     
    : cadena                                                {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | scadena                                               {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | MULTIPATH                                             {$$ = new MultiXpaths(@1.first_line, @1.first_column, $1);}
    | XQUERY                                                {$$ = $1;}
    ;

XQUERY 
    : FOR                                                   {$$ = $1;}
    | LET                                                   {$$ = $1;}
    | RETURN                                                {$$ = $1;}
    ;

FOR 
    : for '$' id in TIPOPATH RETURN                                     {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, null, null, "", $6);}
    | for '$' id in TIPOPATH ORDERBY RETURN                             {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, null, $6, "", $7);}
    | for '$' id in TIPOPATH ORDERBY ascending RETURN                   {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, null, $6, $7, $8);}
    | for '$' id in TIPOPATH ORDERBY descending RETURN                  {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, null, $6, $7, $8);}

    | for '$' id in TIPOPATH WHERE RETURN                               {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, $6, null, "", $7);}
    | for '$' id in TIPOPATH WHERE ORDERBY RETURN                       {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, $6, $7, "", $8);}
    | for '$' id in TIPOPATH WHERE ORDERBY ascending RETURN             {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, $6, $7, $8, $9);}
    | for '$' id in TIPOPATH WHERE ORDERBY descending RETURN            {$$ = new For(@1.first_line, @1.first_column, $3, "", $5, $6, $7, $8, $9);}

    | for '$' id at '$' id in TIPOPATH RETURN                           {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, null, null, "", $9);}
    | for '$' id at '$' id in TIPOPATH ORDERBY RETURN                   {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, null, $9, "", $10);}
    | for '$' id at '$' id in TIPOPATH ORDERBY ascending RETURN         {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, null, $9, $10, $11);}
    | for '$' id at '$' id in TIPOPATH ORDERBY descending RETURN        {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, null, $9, $10, $11);}

    | for '$' id at '$' id in TIPOPATH WHERE RETURN                     {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, $9, null, "", $10);}
    | for '$' id at '$' id in TIPOPATH WHERE ORDERBY RETURN             {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, $9, $10, "", $11);}
    | for '$' id at '$' id in TIPOPATH WHERE ORDERBY ascending RETURN   {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, $9, $10, $11, $12);}
    | for '$' id at '$' id in TIPOPATH WHERE ORDERBY descending RETURN  {$$ = new For(@1.first_line, @1.first_column, $3, $6, $8, $9, $10, $11, $12);}
    ;

TIPOPATH
    : XQUERYPATH                                            {$$ = $1;}
    | PATH                                                  {$$ = $1;}
    ;

WHERE
    : where EXPXQUERY                                       {$$ = $2;}
    ;

ORDERBY 
    : order by XQUERYPATH                                   {$$ = $3;}
    ;

LET 
    : let '$' id ':=' EXPXQUERY                             {$$ = new Let(@1.first_line, @1.first_column, $3, $5, new Return (@1.first_line, @1.first_column, []));}
    | let '$' id ':=' PATH                                  {$$ = new Let(@1.first_line, @1.first_column, $3, $5, new Return (@1.first_line, @1.first_column, []));}
    | let '$' id ':=' EXPXQUERY RETURN                      {$$ = new Let(@1.first_line, @1.first_column, $3, $5, $6);}
    | let '$' id ':=' PATH RETURN                           {$$ = new Let(@1.first_line, @1.first_column, $3, $5, $6);}
    ;

RETURN  
    : return '{' LEXPSRET '}'                               {$$ = new Return (@1.first_line, @1.first_column, $3);}
    | return  EXPRET                                        {$$ = new Return (@1.first_line, @1.first_column, [$2]);}
    ;

LEXPSRET
    : LEXPSRET ',' EXPRET                                   {$1.push($3); $$ = $1;}
    | EXPRET                                                {$$ = [$1];}
    ;

EXPRET                                                    
    : XQUERY                                                {$$ = $1;}
    | EXPXQUERY                                             {$$ = $1;}
    | PATH                                                  {$$ = $1;}
    | IF                                                    {$$ = $1;}
    ; 
    
IF 
    : if '(' EXPXQUERY ')' then EXPXQUERY ElSEst            {$$ = new If(@1.first_line, @1.first_column, $3, $6, $7);}
    ; 

ElSEst
    : else EXPXQUERY                                        {$$ = $2;}
    | else IF                                               {$$ = $2;}
    | /* epsilon */                                         {$$ = null;}
    ;


EXPXQUERY
    : EXPXQUERY  '+'  EXPXQUERY                             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.SUMA, $2);}
    | EXPXQUERY  '-'  EXPXQUERY                             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.RESTA, $2);}
    | EXPXQUERY  '*'  EXPXQUERY                             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MULT, $2);}
    | EXPXQUERY 'div' EXPXQUERY                             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.DIV, $2);}
    | EXPXQUERY 'mod' EXPXQUERY                             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MOD, $2);}
    | EXPXQUERY  '='  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.IGUAL, $2);}
    | EXPXQUERY '!='  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.DIFERENCIACION, $2);}
    | EXPXQUERY  '<'  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENOR, $2);}
    | EXPXQUERY '<='  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENORIGUAL, $2);}
    | EXPXQUERY  '>'  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYOR, $2);}
    | EXPXQUERY '>='  EXPXQUERY                             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYORIGUAL, $2);}
    | EXPXQUERY 'and' EXPXQUERY                             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.AND, $2);}
    | EXPXQUERY 'or'  EXPXQUERY                             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.OR, $2);}
    | VALOREXPXQUERY                                        {$$ = $1;}
    ;
 
VALOREXPXQUERY
    
    : '(' EXPXQUERY ')'                                     {$$ = $2;}
    | cadena                                                {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | scadena                                               {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | number                                                {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.NUMBER);}
    | XQUERYPATH                                            {$$ = $1}
    ;

XQUERYPATH
    : '$' id '/' LACCESOSXQUERY                             {$4[0].tipoQuery = 'relativa';
                                                             $$ = new XqueryPath(@2.first_line, @2.first_column, $2, new Path(@2.first_line, @2.first_column, $4, 'sub'));}
    | '$' id '//' LACCESOSXQUERY                            {$4[0].tipoQuery = 'absoluta';
                                                             $$ = new XqueryPath(@2.first_line, @2.first_column, $2, new Path(@2.first_line, @2.first_column, $4, 'sub'));}
    | '$' id                                                {$$ = new XqueryPath(@2.first_line, @2.first_column, $2, new Path(@2.first_line, @2.first_column, [], 'sub'));}
    ;

LACCESOSXQUERY
    : LACCESOSXQUERY '/' ACCESOXQUERY                       {$3.tipoQuery = 'relativa'; $1.push($3); $$ = $1;}
    | LACCESOSXQUERY '//' ACCESOXQUERY                      {$3.tipoQuery = 'relativa'; $1.push($3); $$ = $1;}
    | ACCESOXQUERY                                          {$$ = [$1];}
    ;

ACCESOXQUERY 
    : id                                                    {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', []);}
    | '*'                                                   {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | '@' id                                                {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', []);}
    | '@' '*'                                               {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', []);}
    ;

// ---------------------------------------------------------xpath------------------------------------------------------------------------------------------

MULTIPATH
    : MULTIPATH '|' PATH                            {$1.push($3); $$ = $1;}
    | PATH                                          {$$ = [$1];}
    ;

PATH
    : '/' LACCESOS                                  {if($2[0].tipoQuery === undefined){$2[0].tipoQuery = 'relativa';}
                                                     $$ = new Path(@1.first_line, @1.first_column, $2);}
    | '//' LACCESOS                                 {if($2[0].tipoQuery === undefined){$2[0].tipoQuery = 'absoluta';}  
                                                     $$ = new Path(@1.first_line, @1.first_column, $2);}
    ;

LACCESOS
    : LACCESOS '/' ACCESO                           {if($3.tipoQuery === undefined){$3.tipoQuery = 'relativa'} $1.push($3); $$ = $1;}
    | LACCESOS '//' ACCESO                          {if($3.tipoQuery === undefined){$3.tipoQuery = 'absoluta'} $1.push($3); $$ = $1;}
    | ACCESO                                        {$$ = [$1];}
    ;

ACCESO 
//nodos
    : id                                            {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', []);}
    | '*'                                           {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | '.'                                           {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'actual', []);}
    | '..'                                          {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'padre', []);}
    | text '(' ')'                                  {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'texto', []);}
    | node '(' ')'                                  {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | child '::' id                                 {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', []);}
    | child '::' '*'                                {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', []);}
    | descendant '::' id                            {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', [], 'absoluta');}
    | descendant '::' '*'                           {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', [], 'absoluta');}
//nodos con predicados
    | id PREDICADOS                                 {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', $2);}
    | '*' PREDICADOS                                {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', $2);}
    | child '::' id PREDICADOS                      {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', $4);}
    | child '::' '*' PREDICADOS                     {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', $4);}
    | descendant '::' id PREDICADOS                 {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'nodo', $4, 'absoluta');}
    | descendant '::' '*' PREDICADOS                {$$ = new Acceso(@1.first_line, @1.first_column, $3, 'todosNodos', $4, 'absoluta');}
//atributos
    | '@' id                                        {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', []);}
    | '@' '*'                                       {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', []);}
    |  attribute '::' id                            {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'atributo', []);}
    |  attribute '::' '*'                           {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'todosAtributos', []);}
//atributos con predicados
    | '@' id PREDICADOS                             {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', $3);}
    | '@' '*' PREDICADOS                            {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', $3);}
    |  attribute '::' id PREDICADOS                 {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'atributo', $4);}
    |  attribute '::' '*' PREDICADOS                {$$ = new Acceso(@2.first_line, @2.first_column, $3, 'todosAtributos', $4);}
    |  error                                        {listaErrores.push(new ClaseError('Sintactico','Se esperaba la definicion de una etiqueta',@1.first_line, @1.first_column))}
    ;

PREDICADOS
    : PREDICADOS PREDI                              {$1.push($2); $$ = $1;}
    | PREDI                                         {$$ = [$1];}
    ;

PREDI
    : '[' EXP ']'                                   {$$ = $2;}
    ;
    
EXP 
    : EXP  '+'  EXP                                 {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.SUMA, $2);}
    | EXP  '-'  EXP                                 {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.RESTA, $2);}
    | EXP  '*'  EXP                                 {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MULT, $2);}
    | EXP 'div' EXP                                 {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.DIV, $2);}
    | EXP 'mod' EXP                                 {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MOD, $2);}
    | EXP  '='  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.IGUAL, $2);}
    | EXP '!='  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.DIFERENCIACION, $2);}
    | EXP  '<'  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENOR, $2);}
    | EXP '<='  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENORIGUAL, $2);}
    | EXP  '>'  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYOR, $2);}
    | EXP '>='  EXP                                 {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYORIGUAL, $2);}
    | EXP 'and' EXP                                 {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.AND, $2);}
    | EXP 'or'  EXP                                 {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.OR, $2);}
    | VALOR                                         {$$ = $1;}
    ;
 
VALOR 
    : '(' EXP ')'                                   {$$ = $2;}
    | cadena                                        {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | scadena                                       {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | number                                        {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.NUMBER);}
    | 'position' '(' ')'                            {$$ = new Primitivo(@1.first_line, @1.first_column, $1);}
    | 'last' '(' ')'                                {$$ = new Primitivo(@1.first_line, @1.first_column, $1);}
//sub consultas
    | LACCESOS                                      {if($1[0].tipoQuery === undefined){$1[0].tipoQuery = 'relativa';}
                                                     $$ = new Path(@1.first_line, @1.first_column, $1, 'sub');}
    | '//' LACCESOS                                 {if($2[0].tipoQuery === undefined){$2[0].tipoQuery ='relativa';}
                                                     $$ = new Path(@1.first_line, @1.first_column, $2, 'sub');}
    ;











