%{
%}
%lex
%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

integer [0-9]+
double {integer}"."{integer}

%%
\s+                         /* skip whitespace */

{double}                    return 'Number_Literal'
{integer}                   return 'Number_Literal'
"*"                         return 'todos'
"/"                         return 'raiz'
"+"                         return 'mas'
"/\/"                       return 'all_nodos'
"-"                         return 'menos'
"("                         return '('
")"                         return ')'
"<"                         return 'lt'
">"                         return 'gt'
"|"                         return 'and_nodos'      //funciona como and entre dos nodos definidos
"div"                       return 'div'
"="                         return 'igual'
"!="                        return 'noigual'
"<="                        return 'menorque'
">="                        return 'mayorque'
"or"                        return 'or'
"and"                       return 'and'            //funciona como and entre una sola expresion (entre llaves)
"mod"                       return 'mod'
"@"                         return 'arroba'
"["                         return 'llaveabierta'
"]"                         return 'llavecerrada'
"::"                        return 'axis'
"."                         return 'nodoactual'
".."                        return 'nodopadre'

//palabras reservadas para axis

"ancestor"                  return 'ancestor'
"ancestor-or-self"          return 'ancestororself'
"attribute"                 return 'attribute'
"child"                     return 'child'
"descendant"                return 'descendant'
"descendant-or-self"        return 'descendantorself'
"following"                 return 'following'
"following-sibling"         return 'followingsibling'
"namespace"                 return 'namespace'
"parent"                    return 'parent'
"preceding"                 return 'preceding'
"preceding-sibling"         return 'precedingsibling'
"self"                      return 'self'
"text()"                    return 'ftexto'
"node()"                    return 'fnodo'

//cadenas
[a-zA-Z_][a-zA-Z0-9_ñÑ]*    return 'identifier';
{stringliteral}             return 'StringLiteral'
{charliteral}               return 'CharLiteral'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Primitivas/Print");
    const {Primitivo} = require("../Expresiones/Primitivo");
    const {Operacion, Operador} = require("../Expresiones/Operacion");
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {Nodo} =require("../ArbolST/Nodo");
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'

%start START

%%

START : 
    INICIO  EOF                     { $$ = $1; return $$; }     //la cadena si tiene raiz
    | INICIONODO EOF                { $$ = $1; return $$; }     //la cadena no tiene / de raiz
    | INICIOAXIS EOF                { $$ = $1; return $$; }     //la expresión es una consulta de axis
    ;

INICIO : 
    all_nodos CONTENIDO             { $$ = $2; }                //cadena empieza con //             
    | raiz CONTENIDO                { $$ = $2; }                //cadena empieza con /
    ;

INICIONODO :
    identifier CONTENIDORAIZ        { $$ = $1; }                //pasa a reconocer el nodo de raiz
    | identifier                    { $$ = $1; }                //solo encuentra el nodo raiz
    ;

INICIOAXIS:
    RESERVADA axis AXISRESTO        { $$ = $1; }
    ;

CONTENIDORAIZ :
    raiz CONTENIDO                  { $$ = new Nodo($2, @1.first_line, @1.first_column); }
    | all_nodos CONTENIDO           { $$ = new Nodo($2, @1.first_line, @1.first_column); }
    | raiz todos                    { $$ = new Nodo($2, @1.first_line, @1.first_column); }
    | identifier                    { $$ = $1; }
    ;

CONTENIDO:
    identifier CONTENIDO                { $$ = $1; }
    | identifier INDICE CONTENIDO       { $$ = new Nodo($2, Tipo.RAIZ, @1.first_line, @1.first_column);}
    | identifier INDICE                 { $$ = new Nodo($2, @1.first_line, @1.first_column); }
    | ATRIBUTO                          { $$ = new Nodo($2, Tipo.ATRIBUTO, @1.first_line, @1.first_column);}
    | identifier raiz CONTENIDO         { $$ = new Nodo($2, Tipo.RAIZ, @1.first_line, @1.first_column);}
    | identifier                        { $$ = $1; }
    | todos                             { $$ = new Nodo($2, Tipo.RAIZ, @1.first_line, @1.first_column);}
    ;

INDICE:
    llaveabierta VAL llavecerrada       { $$ = new Nodo($2, Tipo.INDICE, @1.first_line, @1.first_column);}
    ;

ATRIBUTO:
    llaveabierta arroba identifier       { $$ = new Nodo($3, Tipo.ATRIBUTONUEVO, @1.first_line, @1.first_column);}
    | llaveabierta arroba identifier igual CharLiteral llavecerrada     { $$ = new Nodo($3, Tipo.SRTING, @1.first_line, @1.first_column);}
    | llaveabierta arroba todos llavecerrada    { $$ = new Nodo($3, Tipo.TODOS, @1.first_line, @1.first_column);}
    ;

RESERVADA:
    ancestor                    { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | ancestororself            { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | attribute                 { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | child                     { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | descendant                { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | descendantorself          { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | following                 { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | followingsibling          { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | namespace                 { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | parent                    { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | preceding                 { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | precedingsibling          { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    | self                      { $$ = new Nodo($1, Tipo.RESERVADA, @1.first_line, @1.first_column);}
    ;

AXISRESTO:                      
    | todos raiz INICIOAXIS     { $$ = new Nodo($1, Tipo.AXIS, @1.first_line, @1.first_column);}
    | todos                     { $$ = new Nodo($1, Tipo.TODOS, @1.first_line, @1.first_column);}
    | identifier                { $$ = new Nodo($1, Tipo.SRTING, @1.first_line, @1.first_column);}
    | fnodo                     { $$ = new Nodo($1, Tipo.FUNCION, @1.first_line, @1.first_column);}
    | ftexto                    { $$ = new Nodo($1, Tipo.FUNCION, @1.first_line, @1.first_column);}
    ;

VAL:
    Number_Literal                  { $$ = Number($1); }
    ;

PALABRA : 
    identifier    { $$ = $1; }
    ;


/*
SUM : SUM '+' SUM       { $$ = $1 + $3; }
    | SUM '-' SUM       { $$ = $1 - $3; }
    | MULT              { $$ = $1; }
    ;

MULT : MULT '*' MULT    { $$ = $1 * $3; }
    |  MULT '/' MULT    { $$ = $1 / $3; }
    | VAL
    ;

VAL : '(' SUM ')'       { $$ = $2; }
    | Number_Literal    { $$ = Number($1); }
    ;

/*
START : SUM EOF         { $$ = $1; return $$; }
    | PALABRA EOF       { $$ = $1; return $$; }
    | diagonal PALABRA EOF { $$ = $1 + $2; return $$ }
    ;

    Para utilizarlo hay que compilarlo con el comando "jison nombreArchivo.jison".
    Usando una función que genera.
*/