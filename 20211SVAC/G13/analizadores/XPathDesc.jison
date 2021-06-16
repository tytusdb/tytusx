/* ANALIZADOR LEXICO */
%lex

%options case-sensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

%%

\s+                                 /* skip whitespace */

"last"                              {return 'Rlast';}
"position"                          {return 'Rposition';}
"node"                              {return 'Rnode';}
"ancestor"                          {return 'Rancestor';}
"ancestor-or-self"                  {return 'RancestorOS';}
"attribute"                         {return 'Rattribute';}
"child"                             {return 'Rchild';}
"descendant"                        {return 'Rdescendant';}
"descendant-or-self"                {return 'RdescendantOS';}
"following"                         {return 'Rfollowing';}
"following-sibling"                 {return 'RfollowingSibling';}
"namespace"                         {return 'Rnamespace';}
"parent"                            {return 'Rparent';}
"preceding"                         {return 'Rpreceding';}
"preceding-sibling"                 {return 'RprecedingSibling';}
"self"                              {return 'Rself';}
"or"                                {return 'or';}
"and"                               {return 'and';}
"mod"                               {return 'mod';}
"div"                               {return "div";}

//
"//"                                {return 'dobleslash';}
"/"                                 {return 'slash';}
".."                                {return 'dobledot';}
"."                                 {return 'dot';}
"@"                                 {return "arroba";}
"["                                 {return "lcorchete";}
"]"                                 {return "rcorchete";}
"::"                                {return "dobleBiDot";}
":"                                 {return "singleBiDot";}
//
"|"                                 {return "vertical";}
"+"                                 {return 'mas';}
"-"                                 {return 'menos';}
"*"                                 {return "por";}
"="                                 {return 'igual';}
"!="                                {return 'noigual';}
"<="                                {return 'menorigual';}
"<"                                 {return 'menor';}
">="                                {return 'mayorigual';}
">"                                 {return 'mayor';}
"("                         {return 'lparen';}
")"                         {return 'rparen';}

//TOKENS
(([0-9]+"."[0-9]*)|("."[0-9]+))     {return 'TKdouble';}
[0-9]+                              {return 'TKinteger';}
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            {return 'TKid';}
{stringliteral}                     {return 'TKstring';}
{charliteral}                       {return 'TKchar';}

//ERROR LEXICO
.   {
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    }

<<EOF>>                     return 'EOF'

/lex

/* ANALIZADOR LEXICO */

// IMPORTS
%{
    const { ObjetoXPath } = require('./ObjetoXPath');
%}

// PRECEDENCIA DE OPERADORES
%left 'vertical'
%left 'or'
%left 'and'
%left 'igual' 'noigual' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'mas' 'menos'
%left UPOR 'div' 'mod'
%left UMINUS
%left 'lparen' 'rparen'

// PRODUCCIÓN INICIAL
%start START
%%

/* GRAMATICA */
START:
    LCONSULTAS EOF          { console.log('Todo bien todo correcto'); $$ = $1; return $$; }
;

LCONSULTAS:
    CONSULTA LCP                        { $$ = [$1]; $$ = $$.concat($2); }                        
;

LCP:
    vertical CONSULTA LCP               { $$ = [$2]; $$ = $$.concat($3); }
    | /*vacio*/                         { $$ = []; }
;

OPPATH:
    dobleslash          { $$ = 'full'; }
    | slash             { $$ = 'local'; }
;

/*VERIFY*/
CONSULTA:
    OPPATH RUTA                 { $2[0].ambito = $1; $$ = $2; }
    | RUTA                      { $$ = $1; }
;

RUTA:
    ENODO RP                    { $$ = [$1]; $$ = $$.concat($2); }
;

RP:
    OPPATH ENODO RP             { $2.ambito = $1; $$ = [$2]; $$ = $$.concat($3); }
    | /*vacio*/                 { $$ = [] }
;


ENODO:
    arroba NODO                 { $2.atributo = true; $$ = $2; }
    | NODO                      { $$ = $1; }
;

NODO:
    TKid lcorchete E rcorchete  { 
                                    console.log($3); 
                                    $$ = new ObjetoXPath($1);
                                }
    | TKid                      { $$ = new ObjetoXPath($1); }
    | Rnode lparen rparen       { $$ = new ObjetoXPath($1+'()'); }
    | por                       { $$ = new ObjetoXPath($1); }
    | dot                       { $$ = new ObjetoXPath($1); }
    | dobledot                  { $$ = new ObjetoXPath($1); }
;

E: 
    E mas E                     { $$ =  $1 + $3; }
	| E menos E                 { $$ =  $1 - $3; }
	| E por E %prec UPOR        { $$ =  $1 * $3; }
	| E div E                   { $$ =  $1 / $3; }
	| E mod E                   { $$ =  $1 % $3; }
	| E menor E                 {  }
	| E menorigual E            {  }
	| E mayor E                 {  }
	| E mayorigual E            {  }
	| E igual E                 {  }
	| E noigual E               {  }
	| menos E %prec UMINUS      { $$ = $2 * -1; }
	| lparen E rparen           { $$ = $2; }
	| TKid lparen rparen        {  }
    | PRIMITIVO                 { $$ = $1; }
;

PRIMITIVO:
    TKinteger                   { $$ = parseInt($1); }
	| TKdouble                  { $$ = parseFloat($1); }
    | TKchar                    { $$ = $1 }
	| TKstring                  { $$ = $1 }
    | TKid                      { $$ = $1 }
;