/******************************EXPORTACIONES*******************************/
%{
    
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
%left 'mas' 'menos' 'por' 'div' 'mod'
%left 'land' 'lor'
%left 'c_abre' 'c_cierra'
%left 'p_abre' 'p_cierra'

/* operator associations and precedence */


%start BEGIN

%%

/******************************SINTACTICO***************************************/ 

BEGIN: INSTRUCCIONES EOF                                
;

INSTRUCCIONES: INSTRUCCION or INSTRUCCIONES
                | INSTRUCCION  
                | error { return false }
;

INSTRUCCION: axis AXISNAME NODO INSTRUCCION               
    | d_axis AXISNAME NODO INSTRUCCION  
    |                                                     
;

AXISNAME: ancestor cpuntos
        | ancestororself cpuntos
        | attribute cpuntos
        | child cpuntos
        | descendant cpuntos
        | descendantorself cpuntos
        | following cpuntos
        | followingsibling cpuntos
        | namespace cpuntos
        | parent cpuntos
        | preceding cpuntos
        | precedingsibling cpuntos
        | self cpuntos
        |
;

NODO: identificador PREDICADOS
    | punto PREDICADOS
    | ppunto PREDICADOS
    | por PREDICADOS
    | at identificador PREDICADOS
    | at por PREDICADOS
    | text p_abre p_cierra
    | node p_abre p_cierra
;

PREDICADOS: PREDICADO PREDICADOS
        |
;

PREDICADO: c_abre CONTENIDO c_cierra  
;

CONTENIDO: EXPRESION CONTENIDO
        | at EXPRESION CONTENIDO
        | text p_abre p_cierra CONTENIDO
        | node p_abre p_cierra CONTENIDO
        | axis CONTENIDO
        |
;

EXPRESION: T EXPP
;

EXPP: mas T EXPP
    | menos T EXPP
    | por T EXPP
    | div T EXPP
    | mod T EXPP
    |
;

T: F TP
;

TP: menorque F TP
    | menorigual F TP
    | mayorque F TP
    | mayorigual F TP
    | igual F TP
    | diferente F TP
    |
;

F: G FP
;

FP: land G FP
    | lor G FP
    | 
;

G: p_abre EXPRESION p_cierra
    | numero
    | identificador
    | StringLiteral
    | punto
    | last p_abre p_cierra
    | position p_abre p_cierra
;


