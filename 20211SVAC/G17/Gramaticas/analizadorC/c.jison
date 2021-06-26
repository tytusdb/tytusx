  
%{
    const cDeclaracion  = require('./AST/instrucciones/declaracion') 
    const cAsignacion   = require('./AST/instrucciones/asignacion') 
    const cSi           = require('./AST/instrucciones/si') 
    const cBloque       = require('./AST/instrucciones/bloque') 
    const cExpresion    = require('./AST/expresiones/expresion') 
    
%}
/* Definición Léxica */
%lex

%options case-insensitive

%%
/* Espacios en blanco */
"//".*            	{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {}
[ \r\t]+            {}
\n                  {}

"printf"			return "rprintf";
"return"            return "rreturn";
"if"				return "rif"; 
"goto"				return "rgoto"; 

"int"				return "rint";
"double"            return "rdouble";
"float"             return "rfloat"
"char"				return "rchar";
"void"              return "rvoid";

";"                 return 'ptcoma';
":"                 return 'dospuntos';
","                 return 'coma';
"("                 return 'parizq';
")"                 return 'parder';
"["                 return 'corizq';
"]"                 return 'corder';
"{"                 return 'llaveizq';
"}"                 return 'llaveder';
"#"                 return 'almohadita';


">="                return 'mayori';
"<="                return 'menori';
"=="                return 'igualdad';
"!="                return 'diferente';
"="                 return 'igual';
"+"                 return 'mas';
"-"                 return 'menos';
"*"                 return 'por';
"/"                 return 'div';
"%"                 return 'mod';
">"                 return 'mayor';
"<"                 return 'menor';
"&&"                return 'and';
"||"                return 'or';
"!"                 return 'not';

[a-zA-Z][a-zA-Z0-9_]*   return 'id'
[0-9]+("."[0-9]+)?\b    return 'numero';
\"((\\\")|[^\n\"])*\"   { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\'((\\\')|[^\n\'])*\'	{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

/* Asociación de operadores y precedencia */
%left JError
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALADAD' 'DIFERENTE'
%left 'MENOR' 'MAYOR' 'MAYORI' 'MENORI'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%right UMENOS

%start INI

%% /* Definición de la gramática */

INI
    : ARCHIVO  EOF                  {$$=$1; return $1}
;

ARCHIVO                             
    : DECLARACIONES                 {$$=$1}
;


DECLARACIONES
    : DECLARACIONES DECLARACION     {$$=$1; $$.push($2)}
    | DECLARACION                   {$$=[]; $$.push($1)}
;

DECLARACION 
    : DECLARACIONVARIABLE   {$$=$1}
    | DECLARACIONFUNCION    {$$=$1}
;

DECLARACIONVARIABLE
    : TIPO LIDS ptcoma                      {$$=new cDeclaracion.DeclaracionVariable($1, $2)}
    | TIPO id corizq numero corder ptcoma   {$$=new cDeclaracion.DeclaracionArray($1,$2,$4) }
;

LDECLARACIONVARIABLE
    : LDECLARACIONVARIABLE coma DECLARACIONVARIABLE      {$$=$1; $$.push($2)}
    | DECLARACIONVARIABLE                           {$$=[]; $$.push($1)}
;

TIPO
    : rint                  {$$=$1}
    | rfloat                {$$=$1}
    | rdouble               {$$=$1}
    | rchar                 {$$=$1}
    | rvoid                 {$$=$1}
;

DECLARACIONFUNCION
    : TIPO id parizq parder BLOQUE  
        {$$=new cDeclaracion.DeclaracionFuncion($1,$2,[],$5)}
;

LIDS 
    : LIDS coma id                      {$$=$1; $$.push($3)}
    | id                                {$$=[]; $$.push($1)}
;

BLOQUE
    : llaveizq llaveder                 {$$=new cBloque.Bloque([])}
    | llaveizq LINSTRUCCION llaveder    {$$=new cBloque.Bloque($2)}
    
;

LINSTRUCCION
    : LINSTRUCCION INSTRUCCION      {$$=$1;$$.push($2)}
    | INSTRUCCION                   {$$=[];$$.push($1)}
;

INSTRUCCION
    : ASIGNACION ptcoma             {$$=$1}
    | SI         ptcoma             {$$=$1}
    | IRA        ptcoma             {$$=$1}
    | ETIQUETA                      {$$=$1}
;

ASIGNACION
    : id igual EXP                  {$$=new cAsignacion.Asignacion($1, $3)}
    | EXPARRAY igual EXPBASICO      {$$=new cAsignacion.AsignacionArray($1, $3)}
;

SI
    : rif parizq EXPCOMPARACION parder IRA  {$$=new cSi.Si($3,$5)}
;

IRA
    : rgoto id                      {$$=new cSi.Ira($2)}
;

ETIQUETA
    :  id dospuntos                 {$$=new cSi.Etiqueta($1)}
;

// expresiones
EXPCOMPARACION
    : EXPBASICO COMPARADOR EXPBASICO    {$$=new cExpresion.Comparacion($1, $2, $3)}
;

COMPARADOR
    : mayor                         {$$=$1}
    | menor                         {$$=$1}
    | mayori                        {$$=$1}
    | menori                        {$$=$1}
    | igualdad                      {$$=$1}
    | diferente                     {$$=$1}
;

EXP
    : EXPBASICO                     {$$=$1}
    | EXPARRAY                      {$$=$1}
;

EXPARRAY
    : id corizq EXPBASICONUMERO corder      {$$= new cExpresion.Arreglo($1,$3)}
;

EXPBASICO
    : EXPBASICONUMERO                       {$$=$1}
    | cadena                                {$$= new cExpresion.Literal('',$1)} 
;

EXPBASICONUMERO
    : id                                    {$$= new cExpresion.Id($1)}
    | numero                                {$$= new cExpresion.Literal('',$1)}
    | parizq TIPO parder  EXP               {$$= new cExpresion.Casteo('', $4)}
;



