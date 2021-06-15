/* Definición Léxica */
%lex

%options case-insensitive

%%


\"[^\"]*\"               return 'todo1';
\'[^\']*\'              return 'todo2';

"."                      return '.';
".."                      return '..';
"::"                      return '::';
"/"                      return '/';
"["                      return '[';
"]"                      return ']';
"@"                      return '@';
"|"                      return '|';
"+"                      return '+';
"-"                      return '-';
"div"                    return 'div';
"*"                      return '*';
">="                     return '>=';
"<="                     return '<=';
"!="                      return '!=';
"="                      return '=';
">"                      return '>';
"<"                      return '<';
"or"                     return 'or';
"and"                    return 'and';
"mod"                    return 'mod';
"node()"                 return 'node()';
"text()"                 return 'text()';
"last()"                 return 'last()';
"position()"             return 'position()';
"parent"                 return 'parent';
"ancestor-or-self"       return 'ancestor-or-self';
"ancestor"               return 'ancestor';
"attribute"              return 'attribute';
"child"                  return 'child';
"descendant-or-self"     return 'descendant-or-self';
"descendant"             return 'descendant';
"following-sibling"      return 'following-sibling';
"following"              return 'following';
"namespace"              return 'namespace';
"preceding-sibling"      return 'preceding-sibling';
"preceding"              return 'preceding';
"self"                   return 'self';


[0-9]+("."[0-9]+)?\b       return 'digito';
([a-zA-Z])[a-zA-Z0-9_]*\b	 return 'nodename';



/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}
/*-------------------*/




<<EOF>>                 return 'EOF';
.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%start XPATH

%% /* Definición de la gramática */

XPATH
	: EXPR EOF
;


EXPR
	: EXPRSINGLE
;

EXPRSINGLE
    : OREXPR
;

OREXPR
    : ANDEXPR or OREXPR 
    | ANDEXPR
;

ANDEXPR
    : COMPARISONXPR and ANDEXPR
    | COMPARISONXPR
;

COMPARISONXPR
    : STRINGCONCATXPR GENERALCOMP STRINGCONCATXPR
    | STRINGCONCATXPR
;

GENERALCOMP
    : '='
    | '!='
    | '<'
    | '>'
    | '<='
    | '>='
;

STRINGCONCATXPR
    : RANGEXPR 
;

RANGEXPR
    : ADDITIVEEXPR
;

ADDITIVEEXPR
    : MULTIPLICATIVEEXPR '+' ADDITIVEEXPR 
    | MULTIPLICATIVEEXPR '-' ADDITIVEEXPR 
    | MULTIPLICATIVEEXPR
;

MULTIPLICATIVEEXPR
    : UNIONEXPR
    | UNIONEXPR '*' MULTIPLICATIVEEXPR 
    | UNIONEXPR 'div' MULTIPLICATIVEEXPR 
    | UNIONEXPR 'mod' MULTIPLICATIVEEXPR 
;

UNIONEXPR
    : INTERSECTEXCEPTEXPR '|' UNIONEXPR 
    | INTERSECTEXCEPTEXPR
;

INTERSECTEXCEPTEXPR
    : INSTANCEOFEXPR
;

INSTANCEOFEXPR
    : TREATEXPR
;

TREATEXPR
    : CASTABLEEXPR
;

CASTABLEEXPR
    : CASTEXPR
;

CASTEXPR
    : ARROWEXPR
;

ARROWEXPR
    : UNARYEXPR
;

UNARYEXPR
    : '-' VAlUEEXPR
    | '+' VAlUEEXPR
    | VAlUEEXPR
;

VAlUEEXPR
    : SIMPLEMAPEXPR
;

SIMPLEMAPEXPR
    : PATHEXPR
;

PATHEXPR
    : '/' '/' RELATIVEPATHEXPR 
    | '/' RELATIVEPATHEXPR 
    | RELATIVEPATHEXPR 
;

RELATIVEPATHEXPR
    : STEPEXPR
    | STEPEXPR '/' RELATIVEPATHEXPR 
    | STEPEXPR '/' '/' RELATIVEPATHEXPR 
;

STEPEXPR
    : POSTFIXEXPR
    | AXISTEP
;

AXISTEP
    : REVERSESTEP PREDICATELIST
    | FORDWARDSTEP PREDICATELIST
    | REVERSESTEP
    | FORDWARDSTEP
;


PREDICATELIST
    : '[' EXPR ']' PREDICATELIST 
    | '[' EXPR ']' 
;

FORDWARDSTEP
    : FORDWARDAXIS NODETEST
    | ABBREVFORDWARDSTEP
;

FORDWARDAXIS
    : child '::'
    | 'descendant-or-self' '::'
    | descendant '::'
    | attribute '::'
    | self '::'
    | 'following-sibling' '::'
    | following '::'
    | namespace '::'
;

ABBREVFORDWARDSTEP
    : '@' NODETEST
    | NODETEST
;

REVERSESTEP
    : REVERSEAXIS NODETEST
    | ABBREVREVERSESTEP
;

REVERSEAXIS
    : parent '::'
    | ancestor '::'
    | 'preceding-sibling' '::'
    | preceding '::'
    | 'ancestor-or-self' '::' 
;

ABBREVREVERSESTEP
    : '..'
;

NODETEST
    : KINDTEST
    | '*'
    | nodename
;

KINDTEST
    : 'text()'
    | 'node()'
;

POSTFIXEXPR
    : PRIMARYEXPR
    | POSTFIXEXPR '[' EXPR ']' 
;

PRIMARYEXPR
    : LITERAL
    | '.'
    | ARRAYCONSTRUCTOR
;

ARRAYCONSTRUCTOR
    : '[' ']'
    | '[' EXPRSINGLE ']'
;

LITERAL
    : digito
    | todo1 {{console.log($1);}}
    | todo2 
    | 'last()'
    | 'position()'
;
