/* Gramatica de C3D */

%{
    const {Asignacion} = require("../Optimizador/Asignacion");
    const {Condicional} = require("../Optimizador/Condicional");
    const {OptimizadorMirilla} = require("../Optimizador/OptimizadorMirilla");
    var texto = "";
    var textoaux = "";
    var Optim = new OptimizadorMirilla();
    var textrep = "";
%}

/* lexical grammar */
%lex
%options case-insensitive


%%

[/][/][^\n]*                                /*skip single line comments*/
\s+                                         /*skip whitespace*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         /*skip multi line comments*/

":"                                         return ':';
"="                                         return '=';
"+"                                         return '+';
"-"                                         return '-';
"*"                                         return '*';
"/"                                         return '/';
";"                                         return ';';
"#"                                         return '#';
"<"                                         return '<';
">"                                         return '>';
"."                                         return '.';
"["                                         return '[';
"]"                                         return ']';
","                                         return ',';
"("                                         return '(';
")"                                         return ')';
"{"                                         return '{';
"}"                                         return '}';
"!"                                         return '!';
"%"                                         return '%';

"double"                                    return 'double';
"void"                                      return 'void';
"return"                                    return 'return';
"int"                                       return 'int';
"if"                                        return 'if';
"goto"                                      return 'goto';
"printf"                                    return 'printf';
"char"                                      return 'char';

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
//**********GENERALES************************************************************

SIGNO
    :   '+'     {$$ = $1}
    |   '-'     {$$ = $1}
    |   '*'     {$$ = $1}
    |   '/'     {$$ = $1}
    |   '=''='  {$$ = $1+$2}
    |   '!''='  {$$ = $1+$2}
    |   '<'     {$$ = $1}
    |   '<''='  {$$ = $1+$2}
    |   '>'     {$$ = $1}
    |   '>''='  {$$ = $1+$2}
    ;

VALOR  
    :   id                              {$$ = $1}
    |   number                          {$$ = $1}
    |   '-' number                      {$$ = $1+$2}
    |   id '[' '(' int ')' VALOR ']'    {$$ = $1+$2+$3+$4+$5+$6+$7}
    |   id'[' VALOR ']'                 {$$ = $1+$2+$3+$4}
    |   dstring                         {$$ = $1}
    |   sstring                         {$$ = $1}
    ;

COMPARACION
    :   '=' '=' {$$ = $1+$2}
    |   '!' '=' {$$ = $1+$2}
    |   '>' '=' {$$ = $1+$2}
    |   '<' '=' {$$ = $1+$2}
    |   '<'     {$$ = $1}
    |   '>'     {$$ = $1}
    ;

ASIGNACION
    :   id '[' '(' int ')' VALOR ']'    {$$ = $1+$2+$3+$4+$5+$6+$7}
    |   id'[' VALOR ']'                 {$$ = $1+$2+$3+$4}
    |   id                              {$$ = $1}
    ;

//*******************************************************************************

INIT
    :   HEADER CONTENIDO EOF    
    {
        textoaux = texto;
        texto = "";
        Optim.GenerarGraphviz();
        textrep = Optim.textGraphviz;
        Optim.Reset();
        return {Optimizado: textoaux, TextGraphviz: textrep};
    }  
    |   EOF {}
    ;

HEADER
    :   IMPORTS VARDEC {}
    ;

IMPORTS
    :   IMPORTS '#' id '<' id '>'           {texto += "#" + $3 + " <" + $5 + ">\n";}
    |   IMPORTS '#' id '<' id '.' id '>'    {texto += "#" + $3 + " <" + $5 + "." + $7 + ">\n";}
    |   '#' id '<' id '>'                   {texto += "#" + $2 + " <" + $4 + ">\n";}
    |   '#' id '<' id '.' id '>'            {texto += "#" + $2 + " <" + $4 + "." + $6 + ">\n";}
    ;

VARDEC 
    :   VARDEC double TEMPDEC ';'       
    {
        texto += "double ";
        for(const key in $3) {
            texto += $3[key];
        }
        texto += ";\n";
    }
    |   double TEMPDEC ';'              
    {
        texto += "\ndouble ";
        for(const key in $2) {
            texto += $2[key];
        }
        texto += ";\n";
    }
    ;

TEMPDEC
    :   TEMPDEC ',' id                  {$1.push(", "+$3);$$=$1;}
    |   TEMPDEC ',' id '[' number ']'   {$1.push(", "+$3+"["+$5+"]");$$=$1;}
    |   id                              {$$=[$1]}
    |   id '[' number ']'               {$$=[$1+"["+$3+"]"];}
    ;

CONTENIDO
    :   CONTENIDO FUNCION   {}
    |   FUNCION             {}
    ;

FUNCION
    :   void id '(' ')' '{' CONTFUNC '}'    
    {
        texto += "\n"+$1+" "+$2+$3+$4+" "+$5+"\n";
        for (const key in $6) {
            texto += $6[key];
        }
        texto += $7+"\n";
    }
    ;

CONTFUNC
    :   CONTFUNC ETIQUETA               {$1.push($2);$$=$1;}
    |   CONTFUNC ETIQUETA2              {$1.push($2);$$=$1;}
    |   CONTFUNC TEMPORAL               {$1.push($2);$$=$1;}
    |   CONTFUNC IF                     {$1.push($2);$$=$1;}
    |   CONTFUNC return ';'             {$1.push($2+$3+"\n");$$=$1;}
    |   CONTFUNC PRINTF                 {$1.push($2);$$=$1;}
    |   CONTFUNC id '(' ')' ';'         {$1.push($2+"();\n");$$=$1;}
    |   ETIQUETA                        {$$ = [$1];}
    |   TEMPORAL                        {$$ = [$1];}
    |   IF                              {$$ = [$1];}
    |   return ';'                      {$$=[$1+$2+"\n"];}
    |   PRINTF                          {$$ = [$1];}
    |   id '(' ')' ';'                  {$$=[$1+"();\n"];}
    |   ETIQUETA2                       {$$ = [$1];}
    ;

TEMPORAL
    :   ASIGNACION '=' VALOR SIGNO VALOR ';'                
    {
        $$ = Optim.Optimizar(new Asignacion($1,$3,$4,$5));
    }
    |   ASIGNACION '=' VALOR ';'                            {$$=$1+" "+$2+" "+$3+$4+"\n";}
    ;

ETIQUETA
    :   id ':'               {$$=$1+$2+"\n";}
    ;

ETIQUETA2
    :   goto id ';' CODMUERTO id ':'   
    {
        $$=$1+" "+$2+$3+"\n"+$5+$6+"\n";
        for (const key in $4) {
            texto += Optim.Optimizar($4[key]);
        }
    }
    |   goto id ';' id ':'    {$$=$1+" "+$2+$3+"\n"+$4+$5+"\n";}
    ;

CODMUERTO
    :   CODMUERTO ETIQUETA3                 {$1.push($2);$$=$1;}
    |   CODMUERTO TEMPORAL2                 {$1.push($2);$$=$1;}
    |   CODMUERTO IF2                        {$1.push($2);$$=$1;}
    |   CODMUERTO return ';'                {$1.push($2+$3+"\n");$$=$1;}
    |   CODMUERTO PRINTF                    {$1.push($2);$$=$1;}
    |   CODMUERTO id '(' ')' ';'            {$1.push($2+"();\n");$$=$1;}
    |   TEMPORAL2                           {$$ = [$1];}
    |   IF2                                  {$$ = [$1];}
    |   return ';'                          {$$=[$1+$2+"\n"];}
    |   PRINTF                              {$$ = [$1];}
    |   id '(' ')' ';'                      {$$=[$1+"();\n"];}
    |   ETIQUETA3                           {$$ = [$1];}
    ;

ETIQUETA3
    :   goto id ';'    {$$=$1+" "+$2+$3+"\n";}
    ;

TEMPORAL2
    :   ASIGNACION '=' VALOR SIGNO VALOR ';'                {$$=$1+" "+$2+" "+$3+" "+$4+" "+$5+$6+"\n";}
    |   ASIGNACION '=' VALOR ';'                            {$$=$1+" "+$2+" "+$3+$4+"\n";}
    ;

IF
    :   if '(' VALOR COMPARACION VALOR ')' goto id ';'              {$$= Optim.Optimizar(new Condicional($3,$4,$5,$7+" "+$8+$9));}
    ;

IF2
    :   if '(' VALOR COMPARACION VALOR ')' goto id ';'              {$$=$1+$2+$3+$4+$5+$6+" "+$7+" "+$8+$9+"\n";}
    ;

PRINTF
    :   printf '(' dstring ',' '(' char ')' VALOR ')' ';'  {$$=$1+$2+$3+$4+" "+$5+$6+$7+$8+$9+$10+"\n";}
    |   printf '(' sstring ',' '(' char ')' VALOR ')' ';'  {$$=$1+$2+$3+$4+" "+$5+$6+$7+$8+$9+$10+"\n";}
    ;