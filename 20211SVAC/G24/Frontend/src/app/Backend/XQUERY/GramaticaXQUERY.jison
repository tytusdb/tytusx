%lex
%options case-sensitive

%%
[(][:][^:]*[:]+[)]                        {} //COMENTARIO


[ \r\t]+    {}
\s+          {}   
\n+          {}
"//".* {}  //comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {} //comentario multiple

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

\"[^\"]*\"             { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'             { yytext=yytext.substr(1,yyleng-2); return 'QUOTE'; }


([a-zA-Z_À-ÿ\u00F1\u00D1])[a-zA-Z0-9_^ÑñÀ-ÿ\-\.\u00F1\u00D10-9_]*  return 'IDENTIFICADOR';
[0-9]+("."[0-9]+)?\b                      return 'ENTERO';

<<EOF>>               return 'EOF'
.   console.log("Error Lexico");

/lex

%{
    const thefor = require('./Instrucciones/For');
    const atributosexpresion = require("./Instrucciones/AtributosExpresion")
    const identificadorpredicado = require("../../../XPATH/Analizador/Instrucciones/IdentificadorPredicado")
    const aritmetica= require("./Expresiones/Aritmetica");
    const logica = require ("./Expresiones/Logica");
    cont relacional = require("./Expresiones/Relacional");
    const barrasnodo= require("../../../XPATH/Analizador/Instrucciones/BarrasNodo")
    const identificador= require("./Expresiones/Identificador");
    const nativo= require("./Expresiones/Nativo");
    const asignacion= require("./Instrucciones/Asignacion")

    


%}

%start INICIO

%%

INICIO
    :INSTRUCCIONES EOF      {$$=$1}
    ;

INSTRUCCIONES
    :INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
    |INSTRUCCION    {$$=[$1];}
    ;

INSTRUCCION
    :FOR {$$=$1}        
    |LET {$$=$1}
    ;   

FOR
    :RFOR VARIABLE POSICIONAMIENTO RWHERE CONDICION RORDERBY CONDICION RRETURN RETORNO  {$$=new thefor.default($2,$9,@1.first_line,@1.first_column,$3,$5,$7);}
    |RFOR VARIABLE POSICIONAMIENTO RWHERE CONDICION RRETURN RETORNO  {$$=new thefor.default($2,$7,@1.first_line,@1.first_column,$3,$5,[]);}
    |RFOR VARIABLE POSICIONAMIENTO RORDERBY CONDICION RRETURN RETORNO  {$$=new thefor.default($2,$7,@1.first_line,@1.first_column,$3,[],$7);}
    |RFOR VARIABLE POSICIONAMIENTO RRETURN RETORNO  {$$=new thefor.default($2,$5,@1.first_line,@1.first_column,$3,[],[]);}
    ;

LET 
    :RLET VARIABLE LETDOSPUNTOS L_FTO RRETURN RETORNO {}
    ;    

POSICIONAMIENTO
    :FORCONSULTA    {$$=$1}
    |FORCONTEO      {$$=$1}
    ;

FORCONSULTA
    :RIN FOPEN CONSULTA     {$$=$3}
    |RAT VARIABLE FORCONSULTA {$$=$2}
    |VARIABLE POSICIONAMIENTO {$$=$1}
    ;

FORCONTEO
    :RIN L_FTO                  {$$=$2}
    |RIN L_FTO POSICIONAMIENTO  {$$=$2}
    ;

L_FTO
    :L_FTO FTO      {$1.push($2); $$=$1;}
    |FTO            {$$=[$1];}
    ;

FTO
    :PARIZQ ENTERO CONECTOR ENTERO PARDER               {$$=$2,$3,$4}
    |PARIZQ ENTERO CONECTOR ENTERO PARDER CONECTOR      {$$=$2,$3,$4}
    ;

VARIABLE
    :DOLAR IDENTIFICADOR                                {$$=$2}
    ;    

FOPEN
    :RDOC PARIZQ CADENA PARDER                          {$$=$2}
    ;

CONECTOR
    :AND    {$$=$1}
    |OR     {$$=$1}
    |COMA   {$$=$1}
    |PUNTO  {$$=$1}
    |RTO    {$$=$1}
    ;    

RETORNO
    :CONDICION
    |FUNCIONES
    |IF
    |ASIGNACION
    ;

IF
    :RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE RETORNO
    |RIF PARIZQ CONDICION PARDER RTHEN RETORNO RELSE PARIZQ PARDER
    ;

FUNCIONES
    :RDATA PARIZQ CONDICION PARDER
    ;

ASIGNACION
    :IDENTIFICADOR IGUAL VARIABLE {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    |IDENTIFICADOR IGUAL VARIABLE CONECTOR ASIGNACION {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    ;

CONDICION
    :VARIABLE L_CONSULTAS    {$$=$2}                   
    |VARIABLE L_CONSULTAS CONECTOR CONDICION  {$$=$2}    
    |VARIABLE               {$$=$1}
    ;

L_CONSULTAS
    :L_CONSULTAS CONSULTA   {$1.push($2); $$=$1;}
    |CONSULTA               {$$=[$1];}
    ;

CONSULTA
    :DOBLEBARRA EXPRESION   {$$ = new barrasnodo.default($1,$3,@1.first_line,@1.first_column, $2);}
    |BARRA EXPRESION        {$$ = new barrasnodo.default($1,$2,@1.first_line,@1.first_column, null);}
    |OPCIONESCONSULT EXPRESION SALIDA   {$$=$1+$2}
    |OPCIONESCONSULT PREDICADO SALIDA   {$$=$1+$2}
    |EXPRESION SALIDA                   {$$=$1}
    ;


SALIDA      
    :CONSULTA               {$$=$1}
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
    :CORIZQ EXPRESION CORDER    {$$=$2}
    ;



EXPRESION
    :ENTERO                     {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    |IDENTIFICADOR              {$$ = new identificador.default($1,@1.first_line,@1.first_column);}
    |CADENA                     {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    |ARROBA EXPRESION           {$$ = new atributosexpresion.default($1,$2,@1.first_line,@1.first_column);}
    |IDENTIFICADOR PREDICADO    {$$ = new identificadorpredicado.default($1,$2,@1.first_line,@1.first_column);}
    |RLAST PARIZQ PARDER        {$$=$1+"()"}
    |EXPRESION MAS EXPRESION    {$$=new aritmetica.default(aritmetica.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENOS EXPRESION  {$$=new aritmetica.default(aritmetica.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RDIV EXPRESION   {$$=new aritmetica.default(aritmetica.Operadores.DIVISION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION ASTERISCO EXPRESION {$$=new aritmetica.default(aritmetica.Operadores.MULTIPLICACION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MODULO EXPRESION {   $$=new aritmetica.default(aritmetica.Operadores.MODULADOR,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION IGUAL EXPRESION {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
    |EXPRESION DIFERENCIACION EXPRESION {$$=new relacional.default(relacional.Relacionales.DIFERENTE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENORIGUAL EXPRESION {$$=new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYORIGUAL EXPRESION {$$=new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENORQUE EXPRESION   {$$=new relacional.default(relacional.Relacionales.MENORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYORQUE EXPRESION   {$$=new relacional.default(relacional.Relacionales.MAYORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION IGUALACION EXPRESION {$$=new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION REQUALS EXPRESION    {$$=new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RNOTEQUALS EXPRESION {$$=new relacional.default(relacional.Relacionales.DIFERENTE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMENORIGUAL EXPRESION {$$=new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMAYORIGUAL EXPRESION {{$$=new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}}
    |EXPRESION RMENORQUE EXPRESION {$$=new relacional.default(relacional.Relacionales.MENORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION RMAYORQUE EXPRESION {$$=new relacional.default(relacional.Relacionales.MAYORQUE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION OR EXPRESION     {$$=new logica.default(logica.Logicas.OR,@1.first_line,@1.first_column,$1,$3);}   
    |EXPRESION AND EXPRESION    {$$=new logica.default(logica.Logicas.AND,@1.first_line,@1.first_column,$1,$3);}
    ;    