/******************************EXPORTACIONES*******************************/
%{
    //const {Print} = require("../Instrucciones/Primitivas/Print");
    //const {Primitivo} = require("../Expresiones/Primitivo");
    //const { Operacion, Operador } = require("../Expresiones/Operacion");
    //const { Consulta } = require("../Instrucciones/Consulta");
    errores = [];
%}

/******************************LEXICO***************************************/ 

%lex 
%options case-sensitive


%options case-sensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"
entero                              [0-9]+("."[0-9]+)?


%%
\s+                             /* skip white space */

// KEYWORDS 
"child"                     return 'child'  

"descendant-or-self"        return 'descendantorself'
"following-sibling"         return 'followingsibling'
"preceding-sibling"     return 'precedingsibling'
"ancestor-or-self"      return 'ancestororself'

"descendant"                return 'descendant'
"following"             return 'following'
"preceding"             return 'preceding'
"ancestor"              return 'ancestor'

"attribute"                 return 'attribute'
"self"                      return 'self'
"namespace"             return 'namespace'
"parent"                return 'parent'
"text"                 return 'text'
"node"                 return 'node'
"position"             return 'position'
"last"                 return 'last'

/* LOGIC OPERATOR */

"and"                   return 'land'
"or"                    return 'lor'

/* RELATIONAL OPERATOR */
"="                    return 'igual'
"!="                   return 'diferente'
"<="                   return 'menorigual'
"<"                    return 'menorque'
">="                   return 'mayorigual'
">"                    return 'mayorque'

/* ARITHMETIC OPERATOR */
"+"                     return 'mas'
"-"                     return 'menos'
"*"                     return 'por'
"div"                   return 'div' 
"mod"                   return 'mod'

/* SYMBOL */
"["                     return 'c_abre'
"]"                     return 'c_cierra'
"("                     return 'p_abre'
")"                     return 'p_cierra'
"::"                    return 'cpuntos'
":"                     return 'dpuntos'
".."                    return 'ppunto'
"."                     return 'punto'
"@"                     return 'at'
"|"                     return 'or'
"//"                    return 'd_axis'
"/"                     return 'axis'

// OTHER
{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+    return 'numero';
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*             return 'identificador';  

//errores
. {  
    console.error('Error léxico: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);
    errores.push({'Error Type': 'Lexico', 'Row': yylloc.first_line, 'Column': yylloc.first_column, 'Description': 'El caracter: '+yytext+' no pertenece al lenguaje' });
}


<<EOF>>                         return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'lor' 
%left 'land'
%left 'manorque' 'menorigual' 'mayorque' 'mayorigual' 'igual' 'diferente'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'land' 'lor'
%left 'c_abre' 'c_cierra'
%left 'p_abre' 'p_cierra'

/* operator associations and precedence */


%start BEGIN

%%

/******************************SINTACTICO***************************************/ 

BEGIN: INSTRUCCIONES EOF                        { 

                                                    //return $1;
                                                
                                                }
;

INSTRUCCIONES: INSTRUCCIONES or INSTRUCCION     { $$ = []; $1.push($3); $$ = $1; }
                | INSTRUCCION                   { $$ = []; $$.push($1); }//{ $$ = $1; console.log($1); }
                | error { return false }
;

INSTRUCCION: axis AXISNAME NODO INSTRUCCION      { $$ = []; $$.push([$1,$3[0],$3[1]]); $$ = $$.concat($4); }         
    | d_axis AXISNAME NODO INSTRUCCION           { $$ = []; $$.push([$1,$3[0],$3[1]]); $$ = $$.concat($4); }
    |                                            { $$ = []; }          
;

AXISNAME: ancestor cpuntos              { $$ = $1; }
        | ancestororself cpuntos        { $$ = $1; }
        | attribute cpuntos             { $$ = $1; }
        | child cpuntos                 { $$ = $1; }
        | descendant cpuntos            { $$ = $1; }
        | descendantorself cpuntos      { $$ = $1; }
        | following cpuntos             { $$ = $1; }
        | followingsibling cpuntos      { $$ = $1; }
        | namespace cpuntos             { $$ = $1; }
        | parent cpuntos                { $$ = $1; }
        | preceding cpuntos             { $$ = $1; }
        | precedingsibling cpuntos      { $$ = $1; }
        | self cpuntos                  { $$ = $1; }
        |                               { $$ = ''; }
;

NODO: identificador PREDICADOS          { $$ = []; $$.push($1,$2); }
    | punto PREDICADOS                  { $$ = []; $$.push($1,$2); }
    | ppunto PREDICADOS                 { $$ = []; $$.push($1,$2); }
    | por PREDICADOS                    { $$ = []; $$.push($1,$2); }
    | at identificador PREDICADOS       { $$ = []; $$.push($1+$2,$3); }
    | at por PREDICADOS                 { $$ = []; $$.push($1+$2,$3); }
    | text p_abre p_cierra              { $$ = []; $$.push($1,''); }
    | node p_abre p_cierra              { $$ = []; $$.push($1,''); }
;

PREDICADOS: PREDICADO PREDICADOS        { $$ = $1; }
        |                               { $$=''; }
;

PREDICADO: c_abre CONTENIDO c_cierra    { $$ = $2.getValorImplicito({}); }
;

CONTENIDO: EXPRESION CONTENIDO              { $$ = $1 }
        | at EXPRESION CONTENIDO            { $$ = $1+$2 }
        | text p_abre p_cierra CONTENIDO    { $$ = $1 }
        | node p_abre p_cierra CONTENIDO    { $$ = $1 }
        | axis CONTENIDO                    { $$ = $2 } 
        |                                   { $$ = '' }
;

EXPRESION: EXPRESION mas T          { $$ = new Operacion($1,$3,'suma', @1.first_line, @1.first_column); }
        | EXPRESION menos T         { $$ = new Operacion($1,$3,'resta', @1.first_line, @1.first_column); }
        | EXPRESION por T           { $$ = new Operacion($1,$3,'mult', @1.first_line, @1.first_column); }
        | EXPRESION div T           { $$ = new Operacion($1,$3,'div', @1.first_line, @1.first_column); }
        | EXPRESION mod T           { $$ = new Operacion($1,$3,'mod', @1.first_line, @1.first_column); }
        | T                         { $$ = $1; }
;

T: T menorque F                     { $$ = $1+$2+$3; }
    | T menorigual F                { $$ = $1+$2+$3; }
    | T mayorque F                  { $$ = $1+$2+$3; }
    | T mayorigual F                { $$ = $1+$2+$3; }
    | T igual F                      { $$ = $1+$2+$3; }
    | T diferente F                  { $$ = $1+$2+$3; }
    | F                              { $$ = $1; }
;

F: F land G                          { $$ = new Operacion($1,$3,'and', @1.first_line, @1.first_column); }
    |F lor G                         { $$ = new Operacion($1,$3,'or', @1.first_line, @1.first_column); }
    |G                               { $$ = $1 }
;

G: p_abre EXPRESION p_cierra           { $$ = $3; }
    | numero                           { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | identificador                    { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | StringLiteral                    { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | punto                            { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | last p_abre p_cierra             { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | position p_abre p_cierra         { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
;


