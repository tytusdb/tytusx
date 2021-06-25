// IMPORTS
%{
    const { ObjetoXPath } = require('./ObjetoXPath');
    const { Suma } = require('./Suma');
    const { Resta } = require('./Resta');
    const { Multiplicacion } = require('./Multiplicacion');
    const { Division } = require('./Division');
    const { Modulo } = require('./Modulo');
    const { Literal } = require('./Literal');
    const { Id } = require('./Id');

    const { Error } = require('./Error');
    //var {erroresXPath} = require('./indexXPath').erroresXPath;
    var erroresXPath = [];
%}

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
        //console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
        erroresXPath.push(new Error('Lexico'), yytext, yylloc.first_line, yylloc.first_column, `${yytext} no pertenece al lengaje XPath`);
    }

<<EOF>>                     return 'EOF'

/lex

/* ANALIZADOR LEXICO */

// PRECEDENCIA DE OPERADORES ??
%left 'or'
%left 'and'
%left 'igual' 'noigual' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left UMINUS

// PRODUCCIÓN INICIAL
%start START
%%

/* GRAMATICA */
START:
    LCONSULTAS EOF          { 
                                console.log('Analisis XPath Descendente Finalizado'); 
                                $$ = $1; return $$;
                            }
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
                                    var aux = new ObjetoXPath($1.toString());
                                    aux.setExpresion($3);
                                    $$ = aux;
                                }
    | TKid                      { $$ = new ObjetoXPath($1); }
    | Rnode lparen rparen       { $$ = new ObjetoXPath($1+'()'); }
    | por                       { $$ = new ObjetoXPath($1); }
    | dot                       { $$ = new ObjetoXPath($1); }
    | dobledot                  { $$ = new ObjetoXPath($1); }
;
/*
E: T EP                 {};
EP: or T EP             {}
    |                   {};
T: F TP                 {};
TP: and F TP            {}
    |                   {};
F: G FP                 {};
FP: igual G FP          {}
    | noigual G FP      {}
    | menor G FP        {}
    | menorigual G FP   {}
    | mayor G FP        {}
    | mayorigual G FP   {}
    |                   {};
G: H GP                 {};
GP: mas H GP            {}
    | menos H GP        {}
    |                   {};
H: I HP                 {};
HP: por I HP            {}
    | div I HP          {}
    | mod I HP          {}
    |                   {};
I: menos E              { var men = new Literal(0,'0');
                          $$ = new Resta(men,$2,@1.first_line,@1.first_column);}
    | lparen E rparen   { $$ = $2; }
    | PRIMITIVO         { $$ = $1; };
PRIMITIVO: TKinteger    { $$ = new Literal(0,$1.toString()); }
	| TKdouble          { $$ = new Literal(1,$1.toString()); }
    | TKchar            { $$ = new Literal(2,$1.toString()); }
	| TKstring          { $$ = new Literal(3,$1.toString()); }
    | Rlast lparen rparen { $$ = new Literal(6,$1.toString()+'()'); }
    | Rposition lparen rparen   { $$ = new Literal(6,$1.toString()+'()'); } //Pendiente de ver el position :v
    | TKid               { $$ = new Id(5,$1.toString()); } //Pendiente de ver la busqueda de nodos;
*/
E: 
    E mas E                     { $$ = new Suma($1,$3,@2.first_line,@2.first_column); }
	| E menos E                 { $$ = new Resta($1,$3,@2.first_line,@2.first_column); }
	| E por E                   { $$ = new Multiplicacion($1,$3,@2.first_line,@2.first_column); }
	| E div E                   { $$ = new Division($1,$3,@2.first_line,@2.first_column); }
	| E mod E                   { $$ = new Modulo($1,$3,@2.first_line,@2.first_column); }
    | E menor E                 {}
	| E menorigual E            {}
	| E mayor E                 {}
	| E mayorigual E            {}
	| E igual E                 {}
	| E noigual E               {}
    | E and E                   {}
    | E or E                    {}
	| menos E %prec UMINUS      { 
                                    var men = new Literal(0,'0');
                                    $$ = new Resta(men,$2,@1.first_line,@1.first_column);
                                }
	| lparen E rparen           { $$ = $2; }
    | PRIMITIVO                 { $$ = $1; }
;

PRIMITIVO:
    TKinteger                   { $$ = new Literal(0,$1.toString()); }
	| TKdouble                  { $$ = new Literal(1,$1.toString()); }
    | TKchar                    { $$ = new Literal(2,$1.toString()); }
	| TKstring                  { $$ = new Literal(3,$1.toString()); }
    | Rlast lparen rparen       { $$ = new Literal(6,$1.toString()+'()'); }
    | Rposition lparen rparen   { $$ = new Literal(6,$1.toString()+'()'); } //Pendiente de ver el position :v
;