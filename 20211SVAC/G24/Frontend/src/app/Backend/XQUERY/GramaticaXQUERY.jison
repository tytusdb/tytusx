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

"<html>"        return 'AHTML';
"</html>"       return 'CHTML';
"<body>"        return 'ABODY';
"</body>"       return 'CBODY';
"<h1>"          return 'AH1';
"</h1>"         return 'CH1';
"<ul>"          return 'AUL';
"</ul>"         return 'CUL';



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
([a-zA-Z_À-ÿ\u00F1\u00D1])[a-zA-Z0-9_^ÑñÀ-ÿ\-\.\u00F1\u00D10-9_/?]*  return 'IDCONSULTA';

[0-9]+("."[0-9]+)?\b                      return 'ENTERO';

<<EOF>>               return 'EOF'

.                      {inicio.listaErrores.push(new CNodoErrores.default("Lexico","No se esperaba el caracter: "+yytext,yylloc.first_line,yylloc.first_column)); console.log("Lexico, No se esperaba el caracter: "+yytext +" Linea: "+ yylloc.first_line + "Columna: " + yylloc.first_column);}

/lex

%{
    //requires
%}

%start INICIO

%%

INICIO
    :INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES
   //| //html
    :INSTRUCCION    {$$=$1}
;

INSTRUCCION
    :FOR {$$=$1;}
    |LET {$$=$1;}
;

LET
    :RLET VARIABLE LETDOSPUNTOS L_CLAUSULA RRETURN RESULTADO {$$="res "+$2+" := "+$4+" return "+$6}
    ;

FOR
    :RFOR VARIABLE SENTENCIA L_CONDICIONALES  RRETURN RESULTADO {$$="for "+$2+$3+$4+" return "+$6}
    |RFOR VARIABLE SENTENCIA  RRETURN RESULTADO {$$="for "+$2+$3+" return "+$5} 
    ;

L_CONDICIONALES
    :L_CONDICIONALES CONDICIONALES {$1.push($2); $$=$1;}
    |CONDICIONALES  {$$=[$1];}
    ;

CONDICIONALES
    :RWHERE CONDICION {$$="where "+$2;}
    |RORDERBY CONDICION {$$="order by "+$2;}
    ;

CONDICION
    :VARIABLE L_CONSULTAS CONECTOR CONDICION   {$$=$1+$2+" "+$3+$4}
    |VARIABLE L_CONSULTAS                      {$$=$1+$2}
    |VARIABLE                               {$$=$1}
    ;


SENTENCIA
    : RIN FOPEN L_CONSULTAS {$$=" in "+$2+$3}
    | RIN L_CONSULTAS {$$=" in "+$2}
    | RIN L_CLAUSULA {$$=" in "+$2}
    | RAT VARIABLE SENTENCIA {$$= "at "+$2+" in "}
    | VARIABLE SENTENCIA {$$=$1+$2}
    ;

L_CLAUSULA
    :L_CLAUSULA CLAUSULA {$1.push($2); $$=$1;}
    |CLAUSULA {$$=[$1];}
    ;

CLAUSULA
    :PARIZQ ENTERO CONECTOR ENTERO PARDER {$$=$2+" to "+$4}
    |PARIZQ ENTERO CONECTOR ENTERO PARDER CONECTOR {$$=$2+" to "+$4+$6}
    ;

VARIABLE
    :DOLAR IDENTIFICADOR {$$="$"+$2}
;

FOPEN
    :RDOC PARIZQ CADENA PARDER  {$$="doc("+$3+")"}
;


CONECTOR
    :AND    {$$=$1}
    |OR     {$$=$1}
    |COMA   {$$=$1}
    |PUNTO  {$$=$1}
    |RTO    {$$=$1}
    ;    

RESULTADO
    :CONDICION  {$$=$1}
    |ABERTURA L_RESULT  CIERRE {$$=$1+$2+$3}
    |IF         {$$=$1}
    ;

L_RESULT
    :L_RESULT RESULT {$1.push($2); $$=$1;}
    |RESULT  {$$=[$1];}
    ;

RESULT
    :LLAVEIZQ CONDICION LLAVEDER {$$=" {"+$2+"} "}
    |LLAVEIZQ CONDICION LLAVEDER CONECTOR RESULT {$$=" {"+$2+"} "+$4+$5}
    |LLAVEIZQ RDATA PARIZQ CONDICION PARDER LLAVEDER {$$=" {data("+$4+")} "}
    |LLAVEIZQ RDATA PARIZQ CONDICION PARDER LLAVEDER CONECTOR ASIGNACION RESULT {$$=" {data("+$4+")} "+$7+$8+$9}
    |ASIGNACION RESULT  {$$=$1+$2}
    |//IF
    ;    

ASIGNACION
    :IDENTIFICADOR DOSPUNTOS    {$$=$1+" : "}
    |IDENTIFICADOR IGUAL   {$$=$1+" = "}
    ;

IF  
    :RIF PARIZQ VARIABLE CONSULTA PARDER RTHEN RESULTADO RELSE RESULTADO
    |RIF PARIZQ VARIABLE CONSULTA PARDER RTHEN RESULTADO RELSE PARIZQ PARDER
    ;

ABERTURA
    :MENORQUE IDENTIFICADOR ATRIBUTO MAYORQUE {$$="<"+$2+$3+">"}
    |MENORQUE IDENTIFICADOR MAYORQUE    {$$="<"+$2+">"}
    ;    

CIERRE
    :MENORQUECIERRE IDENTIFICADOR MAYORQUE {$$="</"+$2+">"}
    ;

ATRIBUTO
    :IDENTIFICADOR IGUAL CADENA  {$$=$1+"="+$3}
    ;

//XPATH
    
L_CONSULTAS
    :L_CONSULTAS CONSULTA {$1.push($2); $$=$1;}
    |CONSULTA                {$$=[$1];}
    ;    

CONSULTA
    :OPCIONESCONSULT PREDICADO SALIDA            {$$="/"+$2}  //AQUI HAY QUE AGREGAR TODO LO QUE PUEDE VENIR DE XPATH
    |EXPRESION SALIDA                            
;

SALIDA  
    :CONSULTA
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
    |EXPRESION                  {$$=$1}
    ;

EXPRESION
    :ENTERO                     {$$=$1}
    |IDENTIFICADOR              {$$=$1}
    |CADENA                     {$$=$1}
    |ARROBA IDENTIFICADOR       {$$="@ "+$2}
    |RLAST PARIZQ PARDER        {$$=$1+"()"}
    |EXPRESION MAS EXPRESION    {$$=$1+" + "+$3}
    |EXPRESION MENOS EXPRESION  {$$=$1+" - "+$3}
    |EXPRESION RDIV EXPRESION   {$$=$1+" div "+$3}
    |EXPRESION MODULO EXPRESION {$$=$1+" % "+$3}
    |EXPRESION IGUALACION EXPRESION {$$=$1+" == "+$3}
    |EXPRESION DIFERENCIACION EXPRESION {$$=$1+"!="+$3}
    |EXPRESION MENORIGUAL EXPRESION {$$=$1+"<="+$3}
    |EXPRESION MAYORIGUAL EXPRESION {$$=$1+"=>"+$3}
    |EXPRESION MENORQUE EXPRESION {$$=$1+"<"+$3}
    |EXPRESION MAYORQUE EXPRESION {$$=$1+">"+$3}
    ;    