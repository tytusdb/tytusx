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
"and"       return 'RAND';
"declare"   return 'RDECLARE';
"function"  return 'RFUNCTION';
"div"       return 'RDIV';
"or"        return 'OR';
"and"       return 'AND';
"mod"       return 'MODULO';
"node"      return 'RNODO';
"text"      return 'RTEXT';
"data"      return 'RDATA';

          

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
"<li>"          return 'ALI';
"</li>"         return 'CLI';



"("         return 'PARIZQ';
")"         return 'PARDER';    
"."         return 'PUNTO';
"/"         return 'BARRA';
"["         return 'CORIZQ';
"]"         return 'CORDER';
"$"         return 'DOLAR';
">="        return 'MAYORIGUAL';
"<="        return 'MENORIGUAL';
"<"         return 'MENORQUE';
">"         return 'MAYORQUE';
"{"         return 'LLAVEIZQ';
"}"         return 'LLAVEDER';
"!="        return 'DIFERENCIACION';
"=="        return 'IGUALACION';
"+"         return 'MAS';
"-"         return 'MENOS';
"*"         return 'MULTIPLICACION';
"^"         return 'POTENCIA';
"%"         return 'MODULO';
"^"         return 'POTENCIA';
"@"         return 'ARROBA';
","         return 'COMA';
":="        return 'CLAUSE';

\"[^\"]*\"             { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'             { yytext=yytext.substr(1,yyleng-2); return 'QUOTE'; }


([a-zA-Z_À-ÿ\u00F1\u00D1])[a-zA-Z0-9_^ÑñÀ-ÿ\-\.\u00F1\u00D10-9_]*  return 'IDENTIFICADOR';
([a-zA-Z_À-ÿ\u00F1\u00D1])[a-zA-Z0-9_^ÑñÀ-ÿ\-\.\u00F1\u00D10-9_/?]*  return 'IDCONSULTA';

//([/]*.^\n+)*  return 'ERCONSULTA';
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
    :INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
    |INSTRUCCION    {$$=[$1];}
;

INSTRUCCION
    :FOR {$$=$1;}
;

FOR
    :RFOR VARIABLE SENTENCIA L_CONDICIONALES  RRETURN CONDICION {$$="for "+$2+$3+$4+" return "+$6}
    |RFOR VARIABLE SENTENCIA  RRETURN CONDICION {$$="for "+$2+$3+" return "+$5} //CONDICION SE DEBE CAMBIAR 
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
    :VARIABLE CONSULTA CONECTOR CONDICION   {$$=$1+$2+" "+$3+$4}
    |VARIABLE CONSULTA                      {$$=$1+$2}
    |VARIABLE                               {$$=$1}
    ;


SENTENCIA
    : RIN FOPEN CONSULTA {$$=" in "+$2+$3}
    | RIN CONSULTA {$$=" in "+$2}
    | RIN L_CLAUSULA {$$=" in "+$2}
    | RAT VARIABLE RIN {$$= "at "+$2+" in "}
    ;

L_CLAUSULA
    :L_CLAUSULA CLAUSULA {$1.push($2); $$=$1;}
    |CLAUSULA {$$=[$1];}
    ;

CLAUSULA
    :PARDER ENTERO RTO ENTERO PARIZQ {$$=$2+" to "+$4}
    |PARDER ENTERO RTO ENTERO PARIZQ CONECTOR {$$=$2+" to "+$4+$6}
    ;

VARIABLE
    :DOLAR IDENTIFICADOR {$$="$"+$2}
;

FOPEN
    :RDOC PARIZQ CADENA PARDER  {$$="doc("+$3+")"}
;

CONSULTA
    :BARRA IDENTIFICADOR            {$$="/"+$2}  //AQUI HAY QUE AGREGAR TODO LO QUE PUEDE VENIR DE XPATH
;

CONECTOR
    :AND    {$$=$1}
    |OR     {$$=$1}
    |COMA   {$$=$1}
    ;    

