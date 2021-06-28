/* Gramatica de C3D */

%{
    const {Asignacion} = require("../Optimizador/Asignacion");
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */

"="                                         return '=';
"+"                                         return '+';
"-"                                         return '-';
"*"                                         return '*';
"/"                                         return '/';
";"                                         return ';';

(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';

([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú"|"'")*            return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';

[^<> ]+                                     return 'random';
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
    :   LISTAOBJETOS EOF    {return $1;}  
    |   EOF
    ;

LISTAOBJETOS
    :   LISTAOBJETOS TEMPORAL   {$1.push($2); $$ = $1;}
    |   TEMPORAL                {$$ = [$1];}
    ;

TEMPORAL
    :   id '=' VALOR '+' VALOR ';'   {$$ = new Asignacion($1.toString(),$3,$4,$5);}
    |   id '=' VALOR '-' VALOR ';'   {$$ = new Asignacion($1.toString(),$3,$4,$5);}
    |   id '=' VALOR '*' VALOR ';'   {$$ = new Asignacion($1.toString(),$3,$4,$5);}
    |   id '=' VALOR '/' VALOR ';'   {$$ = new Asignacion($1.toString(),$3,$4,$5);}
    |   id '=' VALOR ';'             {$$ = new Asignacion($1.toString(),$3,"","");}
    ;

VALOR  
    :   id          {$$ = $1.toString();}
    |   number      {$$ = $1.toString();}
    ;