/* Gramatica Ascendente de XQUERY */

%{
    
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */
"("                                         return 'parea';
")"                                         return 'parec';
"$"                                         return 'dolar';
","                                         return 'coma';
"/"                                         return 'barra';
"{"                                         return 'corchetea';
"}"                                         return 'corchetec';
"@"                                         return 'arroba';

"<"

"!""="                                      return 'diferente';
"="                                         return 'igual';
"<""="                                      return 'meigual';
"<"                                         return 'menor';
">""="                                      return 'maigual';
">"                                         return 'mayor';

"f""o""r"                                   return 'for';
"i""n"                                      return 'in';
"d""o""c"                                   return 'doc';
"f""o""r"                                   return 'for';
"w""h""e""r""e"                             return 'where';
"o""r""d""e""r"                             return 'order';
"b""y"                                      return 'by';
"r""e""t""u""r""n"                          return 'return';
"l""e""t"                                   return 'let';
"i""f"                                      return 'if';
"t""h""e""n"                                return 'then';
"e""l""s""e"                                return 'else';
"d""a""t""a"                                return 'data';
"a""t"                                      return 'at';

"a""n""d"                                   return 'and';
"o""r"                                      return 'or';

(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';

([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú"|"'")*            return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';
[^ ]+                                     return 'random';
<<EOF>>               return 'EOF';

//error lexico
.                                   {
                                        console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

/lex

/* Precedencia de operadores */
/*%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS*/

%start INIT

%% /* language grammar */

INIT
    :   FOR LET WHERE ORDERBY RETURN EOF    {}
    |   EOF                                 {}
    ;

FOR 
    :   for RETVAR in doc parea dstring parec PATH                {} 
    |   for RETVAR at RETVAR in doc parea dstring parec PATH    {}
    ;

PATH 
    :   PATH barra              {$$ = $1+$2}
    |   PATH id                 {$$ = $1+$2}
    |   barra                   {$$ = $1}
    |   id                      {$$ = $1}
    ;

LET 
    :   let           {}
    |
    ;

WHERE 
    :   where WHERE2            {}
    |                           {}
    ;

WHERE2
    :   WHERE2 and WHERE3               {}
    |   WHERE2 or WHERE3                {}
    |   WHERE3                          {}
    ;

WHERE3
    :   RETVAR COMPARISON id         {}
    |   RETVAR COMPARISON number     {}
    |   RETVAR COMPARISON sstring    {}
    |   RETVAR COMPARISON dstring    {}
    ;

COMPARISON
    :   igual       {$$=$1}
    |   diferente   {$$=$1}
    |   menor       {$$=$1}
    |   meigual     {$$=$1}
    |   mayor       {$$=$1}
    |   maigual     {$$=$1}
    ;

ORDERBY 
    :   order by ORDERBY2               {}
    |                                   {}
    ;

ORDERBY2
    :   ORDERBY2 coma RETVAR        {}
    |   RETVAR                      {}
    ;

RETURN 
    :   return RETURN2          {}
    ;

RETURN2
    :   RETURN3            {}
    |   IFTHENELSE         {}
    |   HTML               {}
    ;

RETURN3
    :   RETURN3 coma RETVAR   {}
    |   RETVAR                {}
    ;

HTML
    : menor id mayor CONTENIDOHTML menor barra id mayor  {}
    | menor id LISTAATRIBUTOSHTML mayor CONTENIDOHTML  menor barra id mayor  {}  
    ;

LISTAATRIBUTOSHTML
    : LISTAATRIBUTOSHTML ATRIBUTOHTML       {}
    | ATRIBUTOHTML                          {}
    ;

ATRIBUTOHTML
    : id '=' sstring                {}
    | id '=' dstring                {}
    ;

CONTENIDOHTML
    :   corchetea RETVAR corchetec  {}
    ;

IFTHENELSE
    :   IF THEN ELSE    {}
    ;

IF
    :   if  parea RETVAR COMPARISON dstring parec  {}
    |   if  parea RETVAR COMPARISON sstring parec  {}
    ;

THEN
    :   then HTML   {}
    ;

ELSE
    :   else HTML   {}
    ;

RETVAR
    :   dolar id barra id           {}
    |   dolar id                    {}
    |   dolar id barra arroba id    {}
    |   data parea RETVAR parec     {}
    ;