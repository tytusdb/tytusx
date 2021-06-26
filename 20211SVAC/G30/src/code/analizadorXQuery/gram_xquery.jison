/******************************EXPORTACIONES*******************************/
%{
    const { parse } = require ('../analizadorXPath/Xpath')
    var errores = [];
    var parserXPath = {}
    var Entornos = []
%}
 
/******************************LEXICO***************************************/ 

%lex 

%options case-sensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"
entero                              [0-9]+("."[0-9]+)?


%%
\s+                             /* skip white space */

// XPATH 
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

//XQUERY
"for"   return 'for'
"let"   return 'let'
"where" return 'where'
"order by" return 'order'
"return"    return 'return'
"to"    return 'to'
"in"    return 'in'
"doc" return 'doc'
"eq"    return 'eq' // =
"ne"    return 'ne' // !=
"it"    return 'it' // <
"le"    return 'le' // <=
"gt"    return 'gt' // >
"ge"    return 'ge' // >=
","     return 'coma'
"as"    return 'as'
"if"    return 'rif'
"then"  return 'rthen'
"else"  return 'relse'

//TYPES
"string" return 'string'
"normalizedString"   return 'norm_str'
"token"  return 'token'
"date" return 'date'
"dateTime" return 'date_time'
"duration" return 'duration'
"time" return 'time'
"decimal" return 'dec'
"integer" return 'integer'
"byte" return 'byte'
"int" return 'int'
"long" return 'long'
"short" return 'short'
"boolean" return 'boolean'
"double" return 'double'
"float" return 'float'



//FUNCTIONS
"declare" return 'dec'
"function" return 'fun'
"number" return 'number'
"substring" return 'substring'
"upper-case" return 'up_case'
"lower-case" return 'low_case'

//PREFIX
"fn" return 'fn'
"xs" return 'xs'
"?" return  'quest'

/* LOGIC OPERATOR */

"and"                   return 'land'
"or"                    return 'lor'

/* RELATIONAL OPERATOR */
"="                    return 'igual'
"eq"                   return 'eq'
"!="                   return 'diferente'
"ne"                    return 'ne'
"<="                   return 'menorigual'
"le"                    return 'le'
"<"                    return 'menorque'
"lt"                    return 'lt'
">="                   return 'mayorigual'
"ge"                    return 'ge'
">"                    return 'mayorque'
"gt"                    return 'gt'

/* ARITHMETIC OPERATOR */
"+"                     return 'mas'
"-"                     return 'menos'
"*"                     return 'por'
"div"                   return 'div' 
"mod"                   return 'mod'

/* SYMBOL */
"["                     return 'c_abre'
"]"                     return 'c_cierra'
"{"                     return 'l_abre'
"}"                     return 'l_cierra'
"("                     return 'p_abre'
")"                     return 'p_cierra'
"::"                    return 'cpuntos'
":"                     return 'dpuntos'
".."                    return 'ppunto'
"."                     return 'punto'
";"                     return 'pyc'
"$"                     return 'dollasign'
"@"                     return 'at'
"|"                     return 'or'
"//"                    return 'd_axis'
"/"                     return 'axis'

// OTHER
{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+    return 'numero';
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*             return 'identificador';  

//any
(.)                                       return 'any'


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
%left 'menorque' 'menorigual' 'mayorque' 'mayorigual' 'igual' 'diferente'
%left 'lt' 'le' 'gt' 'ge' 'eq' 'ne'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'land' 'lor'
%left 'c_abre' 'c_cierra'
%left 'p_abre' 'p_cierra'
%left 'l_abre' 'l_cierra'

/* operator associations and precedence */


%start BEGIN

%%

/******************************SINTACTICO***************************************/ 

BEGIN: INSTRUCCIONES EOF { parserXPath = {} }                    
;

INSTRUCCIONES: INSTRUCCIONES XQUERY
            | XQUERY
;

XQUERY: FLWOR
    | CALL
    | FUNCTION
;

FLWOR: FOR LET WHERE ORDER RETURN
;
 
FOR: for DEFINITION             { 
                                    
                                }
    |                           { $$ = '' }
;
 
DEFINITION: dollasign identificador in SOURCE DEFINITION        { $$ = $5; }
        | coma dollasign identificador in SOURCE DEFINITION     { $$ = $6; }
        |                                                       { $$ = '' }
;

SOURCE: doc p_abre StringLiteral p_cierra PATH  {
                                                    parserXPath = new parse($5);
                                                    var data = JSON.parse(localStorage.getItem('XML'));
                                                    var resultado = parserXPath.Ejecutar(data);
                                                    console.log(resultado);
                                                }
    | PATH                                      { 
                                                    parserXPath = new parse($1);
                                                    var data = JSON.parse(localStorage.getItem('XML'));
                                                    var resultado = parserXPath.Ejecutar(data);
                                                    console.log(resultado);
                                                }
    | RANK                                      {  }
;

PATH: PATH axis AXISNAME NODO                   { $$ = $1+$2+$3+$4; }       
    | PATH d_axis AXISNAME NODO                 { $$ = $1+$2+$3+$4; }
    |                                           { $$ = '' }
;

LET: let dollasign identificador dpuntos igual EXPRESION
    |    
;

WHERE: where CONTENIDO 
    |
;

ORDER: order CONT_ORDER
    |
;

CONT_ORDER: CONTENIDO CONT_ORDER
        | coma CONTENIDO CONT_ORDER
        |
;


RETURN: return CONTENIDO
    | return CONDITION
;

CONDITION: rif CONTENIDO rthen CONTENIDO relse CONTENIDO
;

CALL: identificador dpuntos identificador p_abre VARIABLES p_cierra
;

CALL_PRIM: substring p_abre VARIABLES p_cierra
        | up_case p_abre VARIABLES p_cierra
        | low_case p_abre VARIABLES p_cierra
        | string p_abre VARIABLES p_cierra
        | number p_abre VARIABLES p_cierra
;

RANK: p_abre numero to numero p_cierra
    | p_abre numero coma numero p_cierra
;

VARIABLES: CONTENIDO VARIABLES
        | coma CONTENIDO VARIABLES
        |
;

FUNCTION: dec fun identificador dpuntos identificador p_abre VAR_FUNC p_cierra as PREFIX dpuntos TYPE quest l_abre XQUERY l_cierra pyc
;

VAR_FUNC: dollasign identificador as PREFIX dpuntos TYPE quest VAR_FUNC
        | coma dollasign identificador as PREFIX dpuntos TYPE quest VAR_FUNC
        |
;

PREFIX: xs                  { $$ = $1; }
        | fn                { $$ = $1; }
        | quest             { $$ = $1; }
;

TYPE: string                { $$ = $1; }
    | date                  { $$ = $1; }
    | dec                   { $$ = $1; }
    | integer               { $$ = $1; }
    | int                   { $$ = $1; }
    | long                  { $$ = $1; }
    | short                 { $$ = $1; }
    | boolean               { $$ = $1; }
    | double                { $$ = $1; }
    | float                 { $$ = $1; }
;

AXISNAME: ancestor cpuntos              { $$ = $1+$2; }
        | ancestororself cpuntos        { $$ = $1+$2; }
        | attribute cpuntos             { $$ = $1+$2; }
        | child cpuntos                 { $$ = $1+$2; }
        | descendant cpuntos            { $$ = $1+$2; }
        | descendantorself cpuntos      { $$ = $1+$2; }
        | following cpuntos             { $$ = $1+$2; }
        | followingsibling cpuntos      { $$ = $1+$2; }
        | namespace cpuntos             { $$ = $1+$2; }
        | parent cpuntos                { $$ = $1+$2; }
        | preceding cpuntos             { $$ = $1+$2; }
        | precedingsibling cpuntos      { $$ = $1+$2; }
        | self cpuntos                  { $$ = $1+$2; }
        |                               { $$ = '' }
;

NODO: identificador PREDICADOS          { $$ = $1+$2; }
    | punto PREDICADOS                  { $$ = $1+$2; }
    | ppunto PREDICADOS                 { $$ = $1+$2; }
    | por PREDICADOS                    { $$ = $1+$2; }
    | at identificador PREDICADOS       { $$ = $1+$2+$3; }
    | at por PREDICADOS                 { $$ = $1+$2+$3; }
    | text p_abre p_cierra              { $$ = $1+$2+$3; }
    | node p_abre p_cierra              { $$ = $1+$2+$3; }
;

PREDICADOS: PREDICADO PREDICADOS        { $$ = $1+$2; }
        |                               { $$ = '' }
;

PREDICADO: c_abre CONTENIDO c_cierra    { $$ = $1+$2+$3; }
;
 
CONTENIDO: EXPRESION               { $$ = $1 }
        | at EXPRESION             { $$ = $1+$2 }
        | text p_abre p_cierra     { $$ = $1+$2+$3; }
        | node p_abre p_cierra     { $$ = $1+$2+$3; }
        //| axis                     { $$ = $2 }                                 
;

EXPRESION: EXPRESION mas T          { $$ = $1+$2+$3; }
        | EXPRESION menos T         { $$ = $1+$2+$3; }
        | EXPRESION por T           { $$ = $1+$2+$3; }
        | EXPRESION div T           { $$ = $1+$2+$3; }
        | EXPRESION mod T           { $$ = $1+$2+$3; }
        | T                         { $$ = $1; }
; 
 
T: T menorque F                 { $$ = $1+$2+$3; }
    | T lt F                    { $$ = $1+$2+$3; }
    | T menorigual F            { $$ = $1+$2+$3; }
    | T le F                    { $$ = $1+$2+$3; }
    | T mayorque F              { $$ = $1+$2+$3; }
    | T gt F                    { $$ = $1+$2+$3; }
    | T mayorigual F            { $$ = $1+$2+$3; }
    | T ge F                    { $$ = $1+$2+$3; }
    | T igual F                 { $$ = $1+$2+$3; }
    | T eq F                    { $$ = $1+$2+$3; }
    | T ne F                    { $$ = $1+$2+$3; }
    | F                         { $$ = $1; }
;
 
F: F land G                          { $$ = $1+$2+$3 }
    |F lor G                         { $$ = $1+$2+$3 }
    |G                               { $$ = $1 }
;
  
G: p_abre EXPRESION p_cierra           { $$ = $1+$2+$3; }
    | numero                           { $$ = $1 }
    | identificador                    { $$ = $1 }
    | StringLiteral                    { $$ = $1 }
    | punto                            { $$ = $1 }
    | last p_abre p_cierra             { $$ = $1+$2+$3 }
    | position p_abre p_cierra         { $$ = $1+$2+$3 }
    | dollasign identificador PATH     { $$ = $1+$2+$3 }
    | CALL_PRIM                        { $$ = $1 }
    | RANK                             { $$ = $1 }
;
  