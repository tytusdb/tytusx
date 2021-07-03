/* 
XPATH
Definición Léxica 
*/

%lex

%options case-insensitive

%%


"/"                     return 'slash';
"@"                     return 'atr';
"."                     return 'point';
":"                     return 'dpoint';
"|"                     return 'concat';
"("                     return 'lpar';
")"                     return 'rpar';
"["                     return 'lcor';
"]"                     return 'rcor';
"+"                     return 'plus';
"-"                     return 'min';
"*"                     return 'aster';
"div"                   return 'div';
"mod"                   return 'mod';
"="                     return 'eq';
"!="                    return 'dif';
">"                     return 'may';
"<"                     return 'men';
">="                    return 'mayeq';
"<="                    return 'meneq';
"and"                   return 'and';  
"or"                    return 'or';


//PALABRAS RESERVADAS XPATH

"text"                  return 'rtext';
"last"                  return 'rlast';
"node"                  return 'rnode';
'position'              return 'rposition';
'comment'               return 'rcomment';


/* Espacios en blanco */
[ \r\t]+                {}
\n                      {}

(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'entero';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'id';

\"[^\"]*\"                          { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\'[^\']*\'                          { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }


.                                  { console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

<<EOF>>                             return 'EOF';

/lex

//imports
%{

%}


//precedencia
%left 'or'
%left 'and'
%left 'menque' 'mayque' 'may' 'men' 'eq' 'dif'
%left 'plus' 'min'
%left 'aster' 'div' 'mod'
%left UMINUS

%left 'lpar' 'rpar'



%start INICIO

%% 
/* Definición de la gramática */

INICIO : 
        BASE EOF
;

BASE :
          BASE concat INST
        | INST

;

INST :
          AXIS LIST_PREDICATE SELECTION
        | AXIS LIST_PREDICATE
        | AXIS SELECTION
        | AXIS
;

AXIS :
            AXIS slash slash ELEMENT          
          | AXIS slash point point
          | AXIS slash ELEMENT     
          | slash slash ELEMENT
          | slash ELEMENT
          | slash point point   
          | ELEMENT       
;
 
ELEMENT :
          ATRIBUTO
        | id   
;

ATRIBUTO :
        atr id
;

LIST_PREDICATE :
          LIST_PREDICATE PREDICATE
        | PREDICATE
;


PREDICATE : 
        lcor EXPRESION rcor
;

SELECTION :
          slash slash SELECTOR lpar rpar
        | slash SELECTOR lpar rpar
;

SELECTOR :
          rnode
        | rtext
        | atr aster
        | aster
;

EXPRESION : 
          EXPRESION plus EXPRESION
        | EXPRESION min EXPRESION
        | EXPRESION aster EXPRESION
        | EXPRESION div EXPRESION
        | EXPRESION mod EXPRESION
        | minus EXPRESION %prec UMINUS
        | EXPRESION may EXPRESION
        | EXPRESION men EXPRESION
        | EXPRESION mayque EXPRESION
        | EXPRESION menque EXPRESION
        | EXPRESION eq EXPRESION
        | EXPRESION dif EXPRESION
        | EXPRESION and EXPRESION
        | EXPRESION or EXPRESION
        | lpar EXPRESION rpar
        | AXIS        
        | entero
        | cadena
        | rlast lpar rpar
        
;
