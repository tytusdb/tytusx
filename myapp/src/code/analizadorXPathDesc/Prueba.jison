%lex

      %options case-insensitive

%%

[0-9]+      								              return "INTEGER"
"+"         return "MAS"
"-"         return "MENOS"
"*"         return "POR"

.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex



%start ini

%%

ini
    :E  { console.log($1); }
;

E
    : T EP { $$ = $2; }
;

EP
    : MAS T EP  { $$ = $0 + $2; }
    |           { $$ = $0 }
;

T 
    : F TP  { $$ = $2; }
;

TP
    : POR F TP   { $$ = $0 * $2; }
    |            { $$ = $0; }
;

F
    : INTEGER   { $$ = Number($1); }
;



