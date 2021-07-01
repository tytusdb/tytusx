%lex
%options case-sensitive

%%
[(][:][^:]*[:]+[)]                        {} //COMENTARIO


[ \r\t]+    {}
\s+          {}   
\n+          {}
"//".* {}  //comentario simple
[/][][^][]+([^/][^][]+)*[/] {} //comentario multiple

"as"        return 'AS';
"xs"        return 'XS';
"for"       return 'RFOR';
"let"       return 'RLET';
"where"     return 'RWHERE';
"order by"  return 'RORDERBY';
"return"    return 'RRETURN';
"in"        return 'RIN';
"doc"       return 'RDOC';
"if"        return 'RIF';
"else"      return 'RELSE';
"then"      return 'RTHEN';
"eq"        return 'REQUALS';
"ne"        return 'RNOTEQUALS';
"lt"        return 'RMENORQUE';
"le"        return 'RMENORIGUAL';
"gt"        return 'RMAYORQUE';
"ge"        return 'RMAYORIGUAL';
"at"        return 'RAT';
"to"        return 'RTO';
"declare"   return 'RDECLARE';
"function"  return 'RFUNCTION';
"div"       return 'RDIV';
"or"        return 'OR';
"and"       return 'AND';
"mod"       return 'MODULO';
"node"      return 'RNODO';
"text"      return 'RTEXT';
"data"      return 'RDATA';
"last"      return 'RLAST';
"local"     return 'LOCAL';

"int"                   return 'INT'
"decimal"                return 'DOUBLE'
"float"                 return 'FLOAT' 
"char"                  return 'CHAR'
          

"upper-case"        return 'FUPPER';
"substring"         return 'FSUBS';


"*"         return 'ASTERISCO';
"("         return 'PARIZQ';
")"         return 'PARDER';    
".."        return 'DOBLEPUNTO';
"."         return 'PUNTO';
"//"        return 'DOBLEBARRA';
"/"         return 'BARRA';
"["         return 'CORIZQ';
"]"         return 'CORDER';
"$"         return 'DOLAR';
">="        return 'MAYORIGUAL';
"</"        return 'MENORQUECIERRE';
"<="        return 'MENORIGUAL';
"<"         return 'MENORQUE';
">"         return 'MAYORQUE';
"{"         return 'LLAVEIZQ';
"}"         return 'LLAVEDER';
"!="        return 'DIFERENCIACION';
"="         return 'IGUAL';
"=="        return 'IGUALACION';
"+"         return 'MAS';
"-"         return 'MENOS';
"*"         return 'MULTIPLICACION';
"^"         return 'POTENCIA';
"%"         return 'MODULO';
"^"         return 'POTENCIA';
"@"         return 'ARROBA';
","         return 'COMA';
":="        return 'LETDOSPUNTOS';
":"         return 'DOSPUNTOS';
";"         return 'PTCOMA';
"?"         return 'QUESTION';

\"[^\"]*\"             { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'             { yytext=yytext.substr(1,yyleng-2); return 'QUOTE'; }


([a-zA-Z_À-ÿ\u00F1\u00D1])[a-zA-Z0-9_^ÑñÀ-ÿ\-\.\u00F1\u00D10-9_]*  return 'IDENTIFICADOR';
[0-9]+("."[0-9]+)?\b                      return 'ENTERO';

<<EOF>>               return 'EOF'
.   console.log("Error Lexico");

/lex

%{
    
%}

%left 'PARIZQ' 'PARDER'
%left 'OR'
%left 'AND'
%left 'IGUALACION' 'DIFERENCIACION' 'RNOTEQUALS'
%left 'MAYORQUE''MENORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'RDIV' 'MODULO'
%left 'UMENOS'

%start INICIO

%%

INICIO
    :FUNCTION EOF      {return $1;}
    ;

FUNCTION
    : FUNCTION METODOS      {$1.push($2); $$=$1;}
    | METODOS               {$$=[$1];}           
    ;

METODOS
    : METODOS RDECLARE RFUNCTION LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ PARAMETROS PARDER AS XS DOSPUNTOS TIPO QUESTION BLOQUE PTCOMA {$$=$1+$2+$3+$4+$5+$6+$7+$8+$9+$10+$11+$12+$13}
    | LLAMADAFUNCION            {$$=$1}
    | LET                       {$$=$1}
    |                           {$$=""}
    ;

PARAMETROS
            : PARAMETROS COMA DECLARACIONES         {$1.push($3); $$=$1;}
            | DECLARACIONES                         {$$=[$1];}
            ;

DECLARACIONES
            :VARIABLE AS XS DOSPUNTOS TIPO QUESTION {$$=$1+$2+$3+$4+$5+$6}
            ;

L_PARAMETROSINTERNOS
            : L_PARAMETROSINTERNOS COMA DOLAR TIPOPARMETRO        {$1.push($4); $$=$1;} 
            | DOLAR TIPOPARMETRO                                  {$$=[$2];}                   
            ;
            
TIPOPARMETRO
            :L_CONSULTAS            {$$=$1}
            |VARIABLE               {$$=$1}
            ;

BLOQUE
            : LLAVEIZQ INSTRUCCIONES LLAVEDER       {$$=$1+$2+$3}
            | LLAVEIZQ LLAVEDER                     {$$=$1+$2}
            ;

TIPO
        : INT                   {$$=$1}
        | FLOAT                 {$$=$1}
        | CHAR                  {$$=$1}
        | DOUBLE                {$$=$1}
        ;

INSTRUCCIONES
    :INSTRUCCIONES INSTRUCCION  {$1.push($2); $$=$1;}
    |INSTRUCCION                {$$=[$1];}              
    ;

INSTRUCCION
    :FORSIMPLE                  {$$=$1}
    |FORCOMPUESTO               {$$=$1}
    |LET                        {$$=$1}
    | LLAMADAFUNCION            {$$=$1}
    ;   

FORCOMPUESTO
    :RFOR CONDICIONCOMPUESTA RWHERE CONDICION RORDERBY CONDICION RRETURN RETORNO    {$$=$1+$2+$3+$4+$5+$6+$7+$8}
    |RFOR CONDICIONCOMPUESTA RWHERE CONDICION RRETURN RETORNO                       {$$=$1+$2+$3+$4+$5+$6}      
    |RFOR CONDICIONCOMPUESTA RORDERBY CONDICION RRETURN RETORNO                     {$$=$1+$2+$3+$4+$5+$6}      
    |RFOR CONDICIONCOMPUESTA RRETURN RETORNO                                        {$$=$1+$2+$3+$4}            
    ;

 FORSIMPLE
    :RFOR CONDICIONSIMPLE RWHERE CONDICION RORDERBY CONDICION RRETURN RETORNO       {$$=$1+$2+$3+$4+$5+$6+$7+$8}
    |RFOR CONDICIONSIMPLE RWHERE CONDICION RRETURN RETORNO                          {$$=$1+$2+$3+$4+$5+$6}      
    |RFOR CONDICIONSIMPLE RORDERBY CONDICION RRETURN RETORNO                        {$$=$1+$2+$3+$4+$5+$6}      
    |RFOR CONDICIONSIMPLE RRETURN RETORNO                                           {$$=$1+$2+$3+$4}            
    ;      

CONDICIONCOMPUESTA
    : CONDICIONCOMPUESTA COMA CONJUNCION        {$$=$1+$2+$3}
    | CONJUNCION                                {$$=$1}
    |                 
    ;

CONDICIONSIMPLE
    :CONDICIONSIMPLE UNION                  {$1.push($2); $$=$1;}
    |UNION                                  {$$=[$1];}               
    ;

UNION
        : L_VARIABLES CONSULTASIMPLE         {$$=$1+$2}
        ;

CONJUNCION
    : L_VARIABLES L_IN                      {$$=$1+$2}
    ;

L_VARIABLES
    : L_VARIABLES RAT VARIABLE              {$1.push($3); $$=$1;}            
    | VARIABLE                              {$$=[$1];}           
    ;

CONSULTASIMPLE
        :RIN FOPEN CONSULTA                 {$$=$1+$2+$3}
        ;
  
LET
    : RLET VARIABLE LETDOSPUNTOS L_IN RRETURN RETORNO            {$$=$1+$2+$3+$4+$5+$6}
    ;

L_IN
    : EXPRESION                                                 {$$=$1}
    | RIN PARIZQ ENTERO CONECTOR ENTERO PARDER                  {$$=$1+$2+$3+$4+$5+$6}
    | PARIZQ ENTERO CONECTOR ENTERO PARDER                      {$$=$1+$2+$3+$4+$5}
    | LLAMADAFUNCION                                            {$$=$1}
    ;

LLAMADAFUNCION
    : LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ L_PARAMETROSINTERNOS PARDER
    ;

VARIABLE
    :DOLAR IDENTIFICADOR                    {$$=$1+$2}
    ;    

FOPEN
    :RDOC PARIZQ CADENA PARDER              {$$=$1+$2+$3+$4}
    |
    ;

CONECTOR
    :AND    {$$=$1}
    |OR     {$$=$1}
    |COMA   {$$=$1}
    |PUNTO  {$$=$1}
    |RTO    {$$=$1}
    ;    

RETORNO
    :CONDICION          {$$=$1}
    |FUNCIONES          {$$=$1}
    |IF                 {$$=$1}
    |ASIGNACION         {$$=$1}
    | EXPRESION         {$$=$1}
    ;

IF
    :RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE RETORNO            {$$=$1+$2+$3+$4+$5+$6+$7+$8}
    |RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE PARIZQ PARDER      {$$=$1+$2+$3+$4+$5+$6+$7+$8+$9}
    ;

FUNCIONES
    :RDATA PARIZQ CONDICION PARDER              {$$=$1+$2+$3+$4}
    ;

ASIGNACION
    :IDENTIFICADOR IGUAL VARIABLE                           {$$=$1+$2+$3}
    |IDENTIFICADOR IGUAL VARIABLE CONECTOR ASIGNACION       {$$=$1+$2+$3+$4+$5}
    ;

CONDICION
    :VARIABLE L_CONSULTAS                           {$$=$1+$2}
    |VARIABLE L_CONSULTAS CONECTOR CONDICION        {$$=$1+$2+$3+$4}
    |VARIABLE                                       {$$=$1}
    ;

L_CONSULTAS
    :L_CONSULTAS CONSULTA                           {$$=$1+$2}
    |CONSULTA                                       {$$=$1}
    ;

CONSULTA
    :OPCIONESCONSULT EXPRESION SALIDA           {$$=$1+$2+$3}
    |OPCIONESCONSULT PREDICADO SALIDA           {$$=$1+$2+$3}
    |EXPRESION SALIDA                           {$$=$1+$2}
    ;


SALIDA  
    :CONSULTA                           {$$=$1}
    |
    ;

OPCIONESCONSULT
    :BARRA                  {$$=$1}
    |DOBLEBARRA             {$$=$1}
    |ARROBA                 {$$=$1}
    |DOBLEPUNTO             {$$=$1}
    |PUNTO                  {$$=$1}
    |ASTERISCO              {$$=$1}
    ;

PREDICADO
    :CORIZQ EXPRESION CORDER    {$$="["+$2+"]"}
    ;

EXPRESION
    :ENTERO                                 {$$=$1}
    |PARIZQ EXPRESION PARDER                {$$=$2}
    |IDENTIFICADOR                          {$$=$1}
    |CADENA                                 {$$=$1}
    |VARIABLE                               {$$=$1}
    |ARROBA EXPRESION                       {$$="@ "+$2}
    |IDENTIFICADOR PREDICADO                {$$=$1+"["+$2+"]"}
    |RLAST PARIZQ PARDER                    {$$=$1+"()"}
    |EXPRESION MAS EXPRESION                {$$=$1+" + "+$3}
    |EXPRESION MENOS EXPRESION              {$$=$1+" - "+$3}
    |EXPRESION RDIV EXPRESION               {$$=$1+" div "+$3}
    |EXPRESION MODULO EXPRESION             {$$=$1+" % "+$3}
    |EXPRESION IGUALACION EXPRESION         {$$=$1+" == "+$3}
    |EXPRESION DIFERENCIACION EXPRESION     {$$=$1+"!="+$3}
    |EXPRESION MENORIGUAL EXPRESION         {$$=$1+"<="+$3}
    |EXPRESION MAYORIGUAL EXPRESION         {$$=$1+"=>"+$3}
    |EXPRESION MENORQUE EXPRESION           {$$=$1+"<"+$3}
    |EXPRESION MAYORQUE EXPRESION           {$$=$1+">"+$3}
    |EXPRESION ASTERISCO EXPRESION          {$$=$1+">"+$3}
    |EXPRESION IGUAL EXPRESION              {$$=$1+"="+$3}
    |EXPRESION REQUALS EXPRESION            {$$=$1+"eq"+$3}
    |EXPRESION RNOTEQUALS EXPRESION         {$$=$1+"ne"+$3}
    |EXPRESION RMENORIGUAL EXPRESION        {$$=$1+"le"+$3}
    |EXPRESION RMAYORIGUAL EXPRESION        {$$=$1+"ge"+$3}
    |EXPRESION RMENORQUE EXPRESION          {$$=$1+"lt"+$3}
    |EXPRESION RMAYORQUE EXPRESION          {$$=$1+"gt"+$3}
    ;