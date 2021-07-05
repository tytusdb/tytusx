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

"integer"                return 'INT'
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
    const theforcompuesto = require('./Instrucciones/ForCompuesto');
    const theforsimple = require('./Instrucciones/ForSimple');
    const atributosexpresion = require("../../XPATH/Analizador/Instrucciones/AtributosExpresion")
    const identificadorpredicado = require("../../XPATH/Analizador/Instrucciones/IdentificadorPredicado")
    const aritmetica= require("./Expresiones/Aritmetica");
    const logica = require ("./Expresiones/Logica");
    const relacional = require("./Expresiones/Relacional");
    const barrasnodo= require("./Instrucciones/BarrasNodo")
    const identificador= require("./Expresiones/Identificador");
    const nativo= require("./Expresiones/Nativo");
    const asignacion= require("./Instrucciones/Asignacion")
    const funciones= require("./Instrucciones/Funciones")
    const declaracion= require("./Instrucciones/Declaracion")
    const llamada= require("./Instrucciones/Llamada")
    const theif = require('./Instrucciones/If')
    const thelet=require('./Instrucciones/Let')
    const Tipo= require("./Simbolos/Tipo");
    const condicionsimple= require("./Instrucciones/CondicionSimple");
    const condicion= require("./Instrucciones/Condicion");
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
    : METODOS RDECLARE RFUNCTION LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ PARAMETROS PARDER TIPO BLOQUE PTCOMA {$$=new funciones.default($6,$8,$10,$11,@1.first_line,@1.first_column);}
    | METODOS RDECLARE RFUNCTION LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ PARDER TIPO BLOQUE PTCOMA {$$=new funciones.default($6,null,$9,$10,@1.first_line,@1.first_column);}
    | LLAMADAFUNCION            {$$=$1}
    | LET                       {$$=$1}
    | INSTRUCCION               {$$=$1}
    |                           {$$=""}
    ;


PARAMETROS
            : PARAMETROS COMA DECLARACIONES     {$1.push($3); $$=$1;}
            | DECLARACIONES                       {$$=[$1];}
            ;

DECLARACIONES
            :VARIABLE AS XS DOSPUNTOS TIPO  {$$=new declaracion.default($1,$5,@1.first_line,@1.first_column);}
            ;

L_PARAMETROSINTERNOS
            : L_PARAMETROSINTERNOS COMA  TIPOPARAMETRO        {$1.push($3); $$=$1;} 
            | TIPOPARAMETRO                                  {$$=[$1];}                   
            ;
TIPOPARAMETRO
            :L_CONSULTAS            {$$=$1}
            |VARIABLE               {$$=$1}
            ;

BLOQUE
            : LLAVEIZQ INSTRUCCIONES LLAVEDER       {$$=$2}
            | LLAVEIZQ LLAVEDER                     {$$=null}
            ;

TIPO
        : AS XS DOSPUNTOS INT                           {$$=$4}
        | AS XS DOSPUNTOS FLOAT                         {$$=$4}
        | AS XS DOSPUNTOS CHAR                          {$$=$4}
        | AS XS DOSPUNTOS DOUBLE                        {$$=$4}
        | INT                                           {$$=$1}
        | FLOAT                                         {$$=$1}
        | CHAR                                          {$$=$1}
        | DOUBLE                                        {$$=$1}
        | %empty                                        {$$=null}
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
    :RFOR CONDICIONSIMPLE RWHERE CONDICION RORDERBY CONDICION RRETURN RETORNO       {$$=new theforsimple.default($2,$8,@1.first_line,@1.first_column,$4,$6);}
    |RFOR CONDICIONSIMPLE RWHERE CONDICION RRETURN RETORNO                          {$$=new theforsimple.default($2,$6,@1.first_line,@1.first_column,$4,null);}     
    |RFOR CONDICIONSIMPLE RORDERBY CONDICION RRETURN RETORNO                        {$$=new theforsimple.default($2,$6,@1.first_line,@1.first_column,null,$4);}    
    |RFOR CONDICIONSIMPLE RRETURN RETORNO                                           {$$=new theforsimple.default($2,$4,@1.first_line,@1.first_column,null,null);}      
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
        : VARIABLE RIN L_CONSULTAS          {$$=new condicionsimple.default($1,$3,@1.first_line,@1.first_column);}
        | VARIABLE L_IN                              {$$=$1}
        ;

CONJUNCION
    : L_VARIABLES L_IN                      {$$=$1+$2}
    ;

L_VARIABLES
    : L_VARIABLES RAT VARIABLE              {$1.push($3); $$=$1;}            
    | VARIABLE                              {$$=[$1];}           
    ;


LET
    : RLET VARIABLE LETDOSPUNTOS L_IN RRETURN RETORNO            {$$=new thelet.default($2,$4,$6,@1.first_line,@1.first_column)}
    ;

L_IN
    : EXPRESION                                                 {$$=$1}
    | RIN PARIZQ ENTERO CONECTOR ENTERO PARDER                  {$$=$1+$2+$3+$4+$5+$6}
    | PARIZQ ENTERO CONECTOR ENTERO PARDER                      {$$=$1+$2+$3+$4+$5}
    | LLAMADAFUNCION                                            {$$=$1}
    | L_CONSULTAS                                               {$$=$1}
    ;

LLAMADAFUNCION
    : LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ L_PARAMETROSINTERNOS PARDER  {$$=new llamada.default($3,$5,@1.first_line,@1.first_column);}
    | LOCAL DOSPUNTOS IDENTIFICADOR PARIZQ PARDER                       {$$=new llamada.default($3,null,@1.first_line,@1.first_column);}
    ;

VARIABLE
    :DOLAR IDENTIFICADOR                    {$$=$1+$2}
    ;    


CONECTOR
    :AND    {$$=$1}
    |OR     {$$=$1}
    |COMA   {$$=$1}
    |PUNTO  {$$=$1}
    |RTO    {$$=$1}
    ;    

RETORNO
    : CONDICION          {$$=$1}
    | FUNCIONES          {$$=$1}
    | IF                 {$$=$1}
    | ASIGNACION         {$$=$1}
    | EXPRESION          {$$=$1}
    ;


IF
    :RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE RETORNO            {$$=new theif.default($3,@1.first_line,@1.first_column,$6,$8)}
    |RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE PARIZQ PARDER      {$$=new theif.default($3,@1.first_line,@1.first_column,$6,[])}
    ;


FUNCIONES
    :RDATA PARIZQ CONDICION PARDER              {$$=$1+$2+$3+$4}
    ;

ASIGNACION
    :IDENTIFICADOR IGUAL VARIABLE                           {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    |IDENTIFICADOR IGUAL VARIABLE CONECTOR ASIGNACION       {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    ;

CONDICION
    :VARIABLE L_CONSULTAS                           {$$=new condicionsimple.default($1,$2,@1.first_line,@1.first_column);}
    |CONDICION CONECTOR CONDICION                   {$$=new condicion.default($2,@1.first_line,@1.first_column,$1,$3);}
    |VARIABLE                                       {$$=$1}
    ;

L_CONSULTAS
    :L_CONSULTAS CONSULTA                            {$1.push($2); $$=$1;}
    |CONSULTA                                        {$$=[$1];}             
    ;

CONSULTA
    :BARRA BARRA EXPRESION              {$$ = new barrasnodo.default($1,$3,@1.first_line,@1.first_column, $2);}
    |BARRA EXPRESION                    {$$ = new barrasnodo.default($1,$2,@1.first_line,@1.first_column, null);}
    |OPCIONESCONSULT EXPRESION          {$$=$1+$2}
    |OPCIONESCONSULT PREDICADO          {$$=$1+$2}
    |EXPRESION                          {$$=$1}
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
    :CORIZQ EXPRESION CORDER    {$$=$2}
    ;

EXPRESION
    :ENTERO                                 {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    |PARIZQ EXPRESION PARDER                {$$=$2}
    |IDENTIFICADOR                          {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
    |CADENA                                 {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    |VARIABLE                               {$$=$1}
    |ARROBA EXPRESION                       {$$ = new atributosexpresion.default($1,$2,@1.first_line,@1.first_column);}
    |IDENTIFICADOR PREDICADO                {$$ = new identificadorpredicado.default($1,$2,@1.first_line,@1.first_column);}
    |RLAST PARIZQ PARDER                    {$$=$1+"()"}
    |EXPRESION MAS EXPRESION                {$$=new aritmetica.default(aritmetica.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}}
    |EXPRESION MENOS EXPRESION              {$$=new aritmetica.default(aritmetica.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RDIV EXPRESION               {$$=new aritmetica.default(aritmetica.Operadores.DIVISION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MODULO EXPRESION             {$$=new aritmetica.default(aritmetica.Operadores.MODULADOR,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION IGUALACION EXPRESION         {$$=new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION DIFERENCIACION EXPRESION     {$$=new relacional.default(relacional.Relacionales.DIFERENTE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENORIGUAL EXPRESION         {$$=new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYORIGUAL EXPRESION         {$$=new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENORQUE EXPRESION           {$$=new relacional.default(relacional.Relacionales.MENORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYORQUE EXPRESION           {$$=new relacional.default(relacional.Relacionales.MAYORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION ASTERISCO EXPRESION          {$$=new aritmetica.default(aritmetica.Operadores.MULTIPLICACION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION IGUAL EXPRESION              {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    |EXPRESION REQUALS EXPRESION            {$$=new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RNOTEQUALS EXPRESION         {$$=new relacional.default(relacional.Relacionales.DIFERENTE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMENORIGUAL EXPRESION        {$$=new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMAYORIGUAL EXPRESION        {$$=new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMENORQUE EXPRESION          {$$=new relacional.default(relacional.Relacionales.MENORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMAYORQUE EXPRESION          {$$=new relacional.default(relacional.Relacionales.MAYORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION OR EXPRESION                 {$$=new logica.default(logica.Logicas.OR,@1.first_line,@1.first_column,$1,$3);}   
    |EXPRESION AND EXPRESION                {$$=new logica.default(logica.Logicas.AND,@1.first_line,@1.first_column,$1,$3);}
    ;