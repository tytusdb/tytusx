/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
num     [0-9]+
id      [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

%%

/* Operadores Relacionales */
"<="                    { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">="                    { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"="                     { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"<"                     { console.log("Reconocio : "+ yytext); return 'MENORQUE'}
">"                     { console.log("Reconocio : "+ yytext); return 'MAYORQUE'}
"!="                    { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}

/* Simbolos del programa */
"("                     { console.log("Reconocio : "+ yytext); return 'PARA'}
"//"                    { console.log("Reconocio : "+ yytext); return 'BARRABARRA'}
"/"                     { console.log("Reconocio : "+ yytext); return 'BARRA'}
")"                     { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                     { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                     { console.log("Reconocio : "+ yytext); return 'CORC'}
"@"                     { console.log("Reconocio : "+ yytext); return 'ARROBA'}
".."                    { console.log("Reconocio : "+ yytext); return 'PUNTOPUNTO'}
"."                     { console.log("Reconocio : "+ yytext); return 'PUNTO'}
"|"                     { console.log("Reconocio : "+ yytext); return 'SIGNOO'}
"::"                    { console.log("Reconocio : "+ yytext); return 'DOSPUNTOS'}

/* Operadores Aritmeticos */
"+"                     { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                     { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                     { console.log("Reconocio : "+ yytext); return 'ASTERISCO'}
"div"                   { console.log("Reconocio : "+ yytext); return 'DIV'}
"mod"                   { console.log("Reconocio : "+ yytext); return 'MODULO'}


/* Operadores Logicos */
"and"                   { console.log("Reconocio : "+ yytext); return 'AND'}
"or"                    { console.log("Reconocio : "+ yytext); return 'OR'}


/* Palabras reservadas */
"last()"                { console.log("Reconocio : "+ yytext); return 'LAST'}
"position()"            { console.log("Reconocio : "+ yytext); return 'POSITION'}
"ancestor"              { console.log("Reconocio : "+ yytext); return 'ANCESTOR'}
"attribute"             { console.log("Reconocio : "+ yytext); return 'ATTRIBUTE'}
"self"                  { console.log("Reconocio : "+ yytext); return 'SELF'} 
"child"                 { console.log("Reconocio : "+ yytext); return 'CHILD'}
"descendant"            { console.log("Reconocio : "+ yytext); return 'DESCENDANT'}
"following"             { console.log("Reconocio : "+ yytext); return 'FOLLOWING'}
"sibling"               { console.log("Reconocio : "+ yytext); return 'SIBLING'}
"namespace"             { console.log("Reconocio : "+ yytext); return 'NAMESPACE'}
"parent"                { console.log("Reconocio : "+ yytext); return 'PARENT'}
"preceding"             { console.log("Reconocio : "+ yytext); return 'PRECENDING'}
"text()"                { console.log("Reconocio : "+ yytext); return 'TEXT'}
"node()"                { console.log("Reconocio : "+ yytext); return 'NODE'}
"last()"                { console.log("Reconocio : "+ yytext); return 'LAST'}
"position()"            { console.log("Reconocio : "+ yytext); return 'POSITION'}

/* SIMBOLOS ER */
[0-9]+"."([0-9]+)?\b        { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
{num}                       { console.log("Reconocio : "+ yytext); return 'ENTERO'}
{id}                        { console.log("Reconocio id : "+ yytext); return 'ID'}
{cadena}                    { console.log("Reconocio : "+ yytext); return 'CADENA'}

[\s\r\n\t]                  { /* skip whitespace */ }

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));
                                      
                        }

/lex

/* Area de imports */
%{
   
%}

/* Precedencia de operadores */

%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE'  'MAYORIGUAL' 
%left 'MAS' 'MENOS'
%left 'ASTERISCO' 'DIV' 'MODULO'
%nonassoc 'POT'
%right 'UNARIO'
%right 'PARA' 'CORA'

 
%start inicio

%% /* Gramatica */


inicio
    : varias EOF {  $$ = "inicio -> varias \n"+$1;  return $$; };


varias: instrucciones SIGNOO instrucciones {$$='varias -> instrucciones SIGNOO instrucciones \n'+$1+$3;}
        |instrucciones {$$='varias -> instrucciones \n'+$1;}
        ;

instrucciones : instruccion instrucciones     { $$ = 'instrucciones -> instruccion instrucciones \n'+$1+$2; }
            |   instruccion                   { $$= 'instrucciones -> instruccion \n'+$1; }
            ;

instruccion : BARRA e                       {  $$ = 'instruccion -> BARRA e; \n'+$2;}
            | BARRABARRA e                  {  $$ = 'instruccion -> BARRABARRA e; \n'+$2;}
            | RESERV DOSPUNTOS e            {  $$ =  'instruccion -> RESERV DOSPUNTOS e; \n'+$1+$3;}
            | BARRA RESERV DOSPUNTOS e      {  $$ =  'instruccion -> BARRA RESERV DOSPUNTOS e; \n'+$2+$4;}
            | BARRA PUNTOPUNTO              {  $$ =  'instruccion -> BARRA PUNTOPUNTO; \n';}
            | BARRABARRA RESERV DOSPUNTOS e {  $$ =  'instruccion -> BARRABARRA RESERV DOSPUNTOS e; \n'+$2+$4;}              
            | ID                            {  $$ =  'instruccion -> ID; \n';} 

            ;

        RESERV :  LAST                              {$$ = 'RESERV -> LAST; \n';}
        |         POSITION                          {$$ = 'RESERV -> POSITION; \n';}
        |         ANCESTOR RESERVLARGE              {$$ = 'RESERV -> ANCESTOR RESERVLARGE; \n'+$2;}    
        |         ATTRIBUTE                         {$$ = 'RESERV -> ATTRIBUTE; \n';}
        |         ANCESORSELF                       {$$ = 'RESERV -> ANCESORSELF; \n';}
        |         CHILD                             {$$ = 'RESERV -> CHILD; \n';}
        |         DESCENDANT RESERVLARGE            {$$ = 'RESERV -> DESCENDANT RESERVLARGE; \n'+$2;}
        |         DESCENDANT                        {$$ = 'RESERV -> DESCENDANT; \n';}
        |         FOLLOWING  RESERVLARGE            {$$ = 'RESERV -> FOLLOWING RESERVLARGE; \n'+$2;}
        |         FOLLOWING                         {$$ = 'RESERV -> FOLLOWING; \n';}
        |         NAMESPACE                         {$$ = 'RESERV -> NAMESPACE; \n';}    
        |         PARENT                            {$$ = 'RESERV -> PARENT; \n';}
        |         PRECENDING                        {$$ = 'RESERV -> PRECENDING; \n';}
        |         PRECENDING RESERVLARGE            {$$ = 'RESERV -> PRECENDING RESERVLARGE; \n'+$2;}
        |         SELF                              {$$ = 'RESERV -> SELF; \n';}
        |         TEXT                              {$$ = 'RESERV -> TEXT; \n';}
        |         NODE                              {$$ = 'RESERV -> NODE; \n';}
        |         SIBLING                          {$$ = 'RESERV -> SIBLING; \n';}
        ;

RESERVLARGE :   MENOS OR MENOS SELF  {$$= 'RESERVLARGE -> MENOS OR MENOS SELF; \n'; }
            |   MENOS SIBLING        {$$= 'RESERVLARGE -> MENOS SIBLING; \n';}
            ;

e :   ID                         {$$= 'e -> ID; \n';}
    | ARROBA ID                  {$$= 'e -> ARROBA ID; \n';}
    | ARROBA ASTERISCO           {$$= 'e -> ARROBA ASTERISCO; \n';}
    | ASTERISCO                  {$$='e -> ASTERISCO; \n';}
    | ID CORA OPERADORES CORC    {$$='e -> ID CORA OPERADORES CORC; \n'+$3;}
    ;
 
    


OPERADORES :  OPERADORES MAS OPERADORES             {$$ = 'OPERADORES -> OPERADORES MAS OPERADORES; \n'+$1+$3;}
            | OPERADORES MENOS OPERADORES           {$$ = 'OPERADORES -> OPERADORES MENOS OPERADORES; \n'+$1+$3;}
            | OPERADORES ASTERISCO OPERADORES       {$$ = 'OPERADORES -> OPERADORES ASTERISCO OPERADORES; \n'+$1+$3;}
            | OPERADORES DIV OPERADORES             {$$ = 'OPERADORES -> OPERADORES DIV OPERADORES; \n'+$1+$3;}
            | OPERADORES MODULO OPERADORES          {$$ = 'OPERADORES -> OPERADORES MODULO OPERADORES; \n'+$1+$3;}
            | OPERADORES AND OPERADORES             {$$ = 'OPERADORES -> OPERADORES AND OPERADORES; \n'+$1+$3;}
            | OPERADORES OR OPERADORES              {$$ = 'OPERADORES -> OPERADORES OR OPERADORES; \n'+$1+$3;}
            | OPERADORES MAYORQUE OPERADORES        {$$ = 'OPERADORES -> OPERADORES MAYORQUE OPERADORES; \n'+$1+$3;}
            | OPERADORES MAYORIGUAL OPERADORES      {$$ = 'OPERADORES -> OPERADORES MAYORIGUAL OPERADORES; \n'+$1+$3;}
            | OPERADORES MENORQUE OPERADORES        {$$ = 'OPERADORES -> OPERADORES MENORQUE OPERADORES; \n'+$1+$3;}
            | OPERADORES MENORIGUAL OPERADORES      {$$ = 'OPERADORES -> OPERADORES MENORIGUAL OPERADORES; \n'+$1+$3;}
            | OPERADORES DIFERENTE OPERADORES       {$$ = 'OPERADORES -> OPERADORES DIFERENTE OPERADORES; \n'+$1+$3;}
            | OPERADORES IGUAL OPERADORES           {$$ = 'OPERADORES -> OPERADORES IGUAL OPERADORES; \n '+$1+$3;}
            | MENOS OPERADORES %prec UNARIO         {$$ = 'OPERADORES -> MENOS OPERADORES %prec UNARIO; \n '+$2;}
            | DECIMAL                               {$$ = 'OPERADORES -> DECIMAL; \n';}
            | ENTERO                                {$$ = 'OPERADORES -> ENTERO; \n';}
            | ID                                    {$$ = 'OPERADORES -> ID; \n'; }
            | LAST                                  {$$ = 'OPERADORES -> LAST; \n ';}
            | POSITION                              {$$ = 'OPERADORES -> POSITION; \n';}
            | CADENA                                {$$ = 'OPERADORES -> CADENA; \n';}
            | ARROBA ID                             {$$ = 'OPERADORES ->ARROBA ID; \n'; }
            ;
