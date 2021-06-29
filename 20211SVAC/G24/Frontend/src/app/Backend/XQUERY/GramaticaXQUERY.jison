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
    const identificadorpredicado = require("./Instrucciones/IdentificadorPredicado")
    const aritmetica= require("./Expresiones/Aritmetica");


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
    :RFOR POSICIONAMIENTO RWHERE CONDICION RORDERBY CONDICION RRETURN RETORNO  
    |RFOR POSICIONAMIENTO RWHERE CONDICION RRETURN RETORNO
    |RFOR POSICIONAMIENTO RORDERBY CONDICION RRETURN RETORNO
    |RFOR POSICIONAMIENTO RRETURN RETORNO
    ;

POSICIONAMIENTO
    :VARIABLE LISTAPOSICION
    ;

LISTAPOSICION
    :RIN FOPEN CONSULTA
    |RIN L_FTO
    |RAT VARIABLE LISTAPOSICION
    |RIN L_FTO  POSICIONAMIENTO 
    ;

L_FTO
    :L_FTO FTO
    |FTO
    ;

FTO
    :PARIZQ ENTERO CONECTOR ENTERO PARDER
    |PARIZQ ENTERO CONECTOR ENTERO PARDER CONECTOR 
    ;

VARIABLE
    :DOLAR IDENTIFICADOR
    ;    

FOPEN
    :RDOC PARIZQ CADENA PARDER 
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
    :IDENTIFICADOR IGUAL VARIABLE
    |IDENTIFICADOR IGUAL VARIABLE CONECTOR ASIGNACION
    ;

CONDICION
    :VARIABLE L_CONSULTAS
    |VARIABLE L_CONSULTAS CONECTOR CONDICION
    |VARIABLE
    ;

L_CONSULTAS
    :L_CONSULTAS CONSULTA
    |CONSULTA
    ;

CONSULTA
    :OPCIONESCONSULT EXPRESION SALIDA
    |OPCIONESCONSULT PREDICADO SALIDA
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
    :CORIZQ EXPRESION CORDER    {$$=$2}
    ;



EXPRESION
    :ENTERO                     {$$=new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    |IDENTIFICADOR              {$$=new Identificador.default($1,@1.first_line,@1.first_column);}
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