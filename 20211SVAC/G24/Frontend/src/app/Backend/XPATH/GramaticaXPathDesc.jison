%lex
%options case-insensitive

entero [0-9]+("."[0-9]+)?

caracterliteral (\'[^']*\')
stringliteral (\"(\\\"|[^"]|\n)*\")
comentario_linea  ("//".*\r\n)|("//".*\n)|("//".*\r)
comentario_multiple (/*[^"]**/)
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
%%

\s+                                 /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas


{entero}	      return 'entero'
{stringliteral}       return 'STRING_LITERAL'
{caracterliteral}     return 'CARACTER_LITERAL'
"ancestor"            return 'ANCESTOR'
"ancestor-or-self"    return 'ANCESTORSELF' 
"attribute"           return 'ATTRIBUTE'        
"child"               return 'CHILD'
"descendant"          return 'DESCENDENT'
"descendant-or-self"  return 'DESCENDENTSELF'
"following"           return 'FOLLOWING'
"following-sibling"   return 'FOLLOWINGSIBLI'
"namespace"           return 'NAMESPACE'
"parent"              return 'PARENT'
"preceding"           return 'PRECEDING'
"preceding-sibling"   return 'PRECEDINGSIBLI'
"self"                return 'SELF'
"last"                return 'LAST'
"position"            return 'POSITION'
"node"                return 'NODE'
"text"                return 'TEXT'
"or"                  return 'OR'
"and"                 return 'AND'
"mod"                 return 'MODULO'
"div"                 return 'DIVISION'
"@"                   return 'ATRIBUTOS'
([a-zA-Z])[a-zA-Z0-9_!#$%&(),.\*\^Ññáéíúó]*	  return 'IDENTIFICADOR';
\"[^\"]*\"        return 'CADENA';
[0-9]+("."[0-9]+)\b      return 'DECIMAL';

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"/"                   return 'BARRA'

"<="                  return 'MENORIGUAL'
">="                  return 'MAYORIGUAL'
"<"                   return 'MENORQUE'
">"                   return 'MAYORQUE'
"?"                   return 'INTERROGACION'
"="                   return 'IGUAL'
"("                   return 'PARIZQ'
")"                   return 'PARDER'
"["                   return 'CORCHETEIZQ'
"]"                   return 'CORCHETEDER'
","                   return 'COMA'




"|"                   return 'OPTION'         
"+"                   return 'MAS'
"-"                   return 'MENOS'
"*"                   return 'MULTIPLICACION' /* SELECTALL TAMBIEN*/

"="                   return 'IGUAL'
"!="                  return 'NOIGUAL'
":"                   return 'DOSPUNTOS'



"."                   return 'SELECT'

<<EOF>>               return 'EOF'
.                     return 'INVALID'
/lex

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'lparen' 'rparen'
%left 'OR'
%left 'AND'
%left 'IGUAL' 'NOIGUAL'
%left 'MAYORQUE''MENORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%
/* Definición de la gramática */


START 
        : INSTRUCCIONES  EOF                   {return $1;}
        ;

INSTRUCCIONES
        :  INSTRUCCION INSTRUCCIONES          {if($2!=false)$1.push($2);$$=$1;}
        | INSTRUCCION                           {$$=($1!=false) ?[$1]:[];}
        ;

INSTRUCCION 
        :  NODO OPTION INSTRUCCION     {$$=$1+"|"+ $3;}
        | AXES                          {$$=$1}
        | NODO                          {$$=$1}
        | %empty
        ;

NODO
        :BARRA  L_NODO                  {$$="/"+$2}
        | BARRA BARRA L_NODO            {$$="//"+$3}
        | L_NODO                        {$$=$1} 
        | ASIGNACION                                            {$$=$1}
        ;

L_NODO
        : FUNCION                       {$$=$1}
        | MULTIPLICACION                {$$=$1}/*    * /    */
        | ATRIBUTOS                     {$$=$1}
        | ATRIBUTOS EXPRESION           {$$=$2}
        | ATRIBUTOS MULTIPLICACION      {$$=$1+$2}
        | EXPRESION                     {$$=$1}
        | L_CORCHETES                   {$=$1}
        ;

FUNCION 
        :  IDENTIFICADOR PARIZQ PARDER                           {$$=$1}
        | IDENTIFICADOR L_CORCHETES                             {$$=$1+ $2}
        | IDENTIFICADOR CORCHETEIZQ  CORCHETEDER                {$$=$1}
        
        
        ;
L_CORCHETES
        : CORCHETEIZQ INSTRUCCIONES CORCHETEDER  L_CORCHETES   {$$= $2+$4}
        | CORCHETEIZQ INSTRUCCIONES CORCHETEDER                 {$$="["+$2+"]"}
        | PARIZQ INSTRUCCIONES PARDER COMA              {$$= $2}
        | PARIZQ INSTRUCCIONES PARDER                           {$$=$2}
        | %empty                                                
        ;

ASIGNACION 
        :IDENTIFICADOR IGUAL EXPRESION                       {$$=$1+"="+$3} 
        | SELECT IGUAL EXPRESION                             {$$=$1+"="+$3} 
        ;


/**********************************CAMBIO****************************************/
EXPRESION
        : TERMINO OPLOGICAS TERMINO                         {$$=$1+$2+$3}
        | TERMINO OPARITMETICAS TERMINO                     {$$=$1+$2+$3}
        | TERMINO OPRELACIONAL TERMINO                      {$$=$1+$2+$3}
        | UNARIO TERMINO                                    {$$=$1+$2}
        | TERMINO                                           {$$=$1}
        ;

TERMINO 
        : CADENA                                                 {$$=$1}
        | NUMBER                                                {$$=$1}
        | entero                                                {$$=$1}
        | CARACTER_LITERAL                                      {$$=$1}
        | STRING_LITERAL                                        {$$=$1}
        | SELECT                                                {$$=$1}
        | IDENTIFICADOR  BARRA BARRA  L_NODO                    {$$=$1+$4}
        | IDENTIFICADOR  BARRA  L_NODO                          {$$=$1+$3}
        | IDENTIFICADOR                                         {$$=$1}
        | SELECT IGUAL EXPRESION                                {$$=$1+"="+$3} 
        | LAST PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | POSITION PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | NODE PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | TEXT PARIZQ PARDER                                    {$$=$1+ $2+ $3}
        | L_NODO                                                {$$=$1}
        | FUNCION                                               {$$=$1}
        ;

OPLOGICAS
        : IGUAL                              {$$=$1}
        | NOIGUAL                            {$$=$1}
        | MENORQUE                           {$$=$1}
        | MENORIGUAL                         {$$=$1}
        | MAYORQUE                           {$$=$1}
        | MAYORIGUAL                         {$$=$1}
        ;
OPARITMETICAS
        :  MENOS                   {$$=$1}
        |  MAS                     {$$=$1}
        |  MENOS                   {$$=$1}
        |  MULTIPLICACION          {$$=$1}
        |  DIVISION                {$$=$1}
        |  MODULO                  {$$=$1}
        ;
OPRELACIONAL
        : OR                                {$$=$1}
        | AND                               {$$=$1}
        ;
UNARIO
        : MENOS                   {$$=$1}
        | COMA                   {$$=$1}
        ;



AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS L_NODO                   {$$=$1+"::"+$4}
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS L_NODO               {$$=$1+"::"+$4}
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS L_NODO                   {$$=$1+"::"+$4}
        |CHILD DOSPUNTOS DOSPUNTOS L_NODO                       {$$=$1+"::"+$4}
        |DESCENDENT DOSPUNTOS DOSPUNTOS L_NODO                  {$$=$1+"::"+$4} 
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS L_NODO              {$$=$1+"::"+$4}
        |FOLLOWING DOSPUNTOS DOSPUNTOS L_NODO                   {$$=$1+"::"+$4}
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO              {$$=$1+"::"+$4}
        |NAMESPACE DOSPUNTOS DOSPUNTOS L_NODO                   {$$=$1+"::"+$4}
        |PARENT DOSPUNTOS DOSPUNTOS L_NODO                      {$$=$1+"::"+$4}
        |PRECEDING DOSPUNTOS DOSPUNTOS L_NODO                   {$$=$1+"::"+$4}
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO              {$$=$1+"::"+$4}
        |SELF DOSPUNTOS DOSPUNTOS L_NODO                        {$$=$1+"::"+$4}
        ;
