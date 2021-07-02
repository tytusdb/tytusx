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

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Primitivas/Print");
    const {Primitivo} = require("../Expresiones/Primitivo");
    const {Operacion, Operador} = require("../Expresiones/Operacion");
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {Nodo} =require("../ArbolST/Nodo");
%}

/lex

%start START

%%
/*
START : 
    INICIO  EOF                     { $$ = $1; return $$; }     //la cadena si tiene raiz
    | INICIONODO EOF                { $$ = $1; return $$; }     //la cadena no tiene / de raiz
    | INICIOAXIS EOF                { $$ = $1; return $$; }     //la expresión es una consulta de axis
    ;

INICIO: 
    raiz CONTENIDO                  { $$ = $1; return ">> " + $$ + " "; }
    | raiz                          { $$ = $1; return ">> " + $$ + " "; }
    ;

CONTENIDO:
    identifier                      { $$ = $1; return ">> " + $$ + " "; }
    | identifier CONTENIDO          { $$ = $1; return ">> " + $$ + " "; }
    | identifier raiz CONTENIDO     { $$ = $1; return ">> " + $$ + " "; }
    ;

*/

START : 
    INICIO  EOF                             { $$ = $1; return $$; }     //la cadena si tiene raiz
    | INICIONODO EOF                        { $$ = $1; return $$; }     //la cadena no tiene / de raiz
    | INICIOAXIS EOF                        { $$ = $1; return $$; }     //la expresión es una consulta de axis
    ;

INICIO:
    INICIO INICIORAIZ                       { $1.push($2); $$ = $1; return $$; }
    | INICIORAIZ                            { $$ = $1; return $$; }
    ;
/*
INICIORAIZ:
    raiz IDEN                               { $$ = $1; return $$; }
    | raiz IDEN                             { $$ = $1; return $$; }
    ;
*/
IDEN:
    identifier INICIO                       { $$ = $1; return $$; }
    | identifier                            { $$ = $1; return $$; }
    ;

INICIORAIZ: 
    identifier { $$ = [new Nodo($1, Tipo.STRING, @1.first_line, @1.first_column)]}
    | identifier INICIO {$$ = [new Nodo($1, Tipo.STRING, @1.first_line, @1.first_column)]; $$ = $$.concat($2); }
    | POSIBLES INICIO{ $$ = [$1]; $$ = $$.concat($2)}
;

POSIBLES: 
    attribute identifier PREDICADO { $$ = new Nodo($2, Tipo.ATRIBUTO, @1.first_line, @1.first_column);}
    | attribute todos PREDICADO { $$ = new Nodo($2, Tipo.ATRIBUTO, @1.first_line, @1.first_column);} 
    | todos PREDICADO {  $$ = new Nodo($1, Tipo.TODOS, @1.first_line, @1.first_column);}
    | METODOS { $$ = new Nodo($1, Tipo.METODO, @1.first_line, @1.first_column);}
    ;

PREDICADO: 
    llaveabierta VAL llavecerrada  { $$ = new Nodo($2, @1.first_line, @1.first_column); }
    | llaveabierta INICIOAXIS llavecerrada { $$ = new Nodo($2, @1.first_line, @1.first_column);}
    |{ $$ = [];}
    ;

INICIOAXIS:
    RESERVADA axis AXISRESTO { $$ = new Nodo($2, @1.first_line, @1.first_column);}
    ;

AXISRESTO:
    | todos raiz INICIOAXIS         { $1.push($2); $$ = $1; return $$; }
    | todos                         { $$ = $1; return $$; }
    | identifier                    { $$ = $1; return $$; }
    | fnodo                         { $$ = $1; return $$; }
    | ftexto                        { $$ = $1; return $$; }
    ;

RESERVADA:
    ancestor 
    | ancestororself                { $$ = $1; return $$; }
    | attribute                     { $$ = $1; return $$; }
    | child                         { $$ = $1; return $$; }
    | descendant                    { $$ = $1; return $$; }
    | descendantorself              { $$ = $1; return $$; }
    | following                     { $$ = $1; return $$; }
    | followingsibling              { $$ = $1; return $$; }
    | namespace                     { $$ = $1; return $$; }
    | parent                        { $$ = $1; return $$; }
    | preceding                     { $$ = $1; return $$; }
    | precedingsibling              { $$ = $1; return $$; }
    | self                          { $$ = $1; return $$; }
    ;

VAL:
    Number_Literal                  { $$ = Number($1); }
    ;
