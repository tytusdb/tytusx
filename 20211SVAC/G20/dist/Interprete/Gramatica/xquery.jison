/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".
%%

"for"                           %{ return 'tk_for' %}
"let"                           %{ return 'tk_let' %}
"where"                         %{ return 'tk_where' %}
"order"                         %{ return 'tk_order' %}
"return"                        %{ return 'tk_return' %}
"in"                            %{ return 'tk_in' %}
"by"                            %{ return 'tk_by' %}
"to"                            %{ return 'tk_to' %}
"declare"                       %{ return 'tk_declare' %}
"function"                      %{ return 'tk_function' %}
"as"                            %{ return 'tk_as' %}

"string"                        %{ return 'res_string' %}
"number"                        %{ return 'res_number' %}
"decimal"                       %{ return 'res_decimal' %}
"bool"                          %{ return 'res_bool' %}

"node()"                        %{ return 'tk_node';  %}
"last()"                        %{ return 'tk_last';  %}
"position()"                    %{ return 'tk_position';  %}
"text()"                        %{ return 'tk_texto';  %}
"ancestor-or-self::"            %{ return 'tk_ancestorself';  %}
"ancestor::"                    %{ return 'tk_ancestor';  %}
"attribute::"                   %{ return 'tk_attribute';  %}
"child::"                       %{ return 'tk_child';  %}
"descendant-or-self::"          %{ return 'tk_descendantself';  %}
"descendant::"                  %{ return 'tk_descendant';  %}
"following-sibling::"           %{ return 'tk_followingsibling';  %}
"following::"                   %{ return 'tk_following';  %}
"parent::"                      %{ return 'tk_parent';  %}
"preceding-sibling::"           %{ return 'tk_precedingsibling';  %}
"preceding::"                   %{ return 'tk_preceding';  %}
"self::"                        %{ return 'tk_self';  %}

"@*"                            %{ return 'tk_arrobaasterisco';  %}
"@"                             %{ return 'tk_arroba';  %}

"div"                           %{ return 'tk_division';  %}
"or"                            %{ return 'tk_or';  %}
"and"                           %{ return 'tk_and';  %}
"mod"                           %{ return 'tk_mod';  %}
"|"                             %{ return 'tk_barra';  %}
"+"                             %{ return 'tk_mas';  %}
"-"                             %{ return 'tk_menos';  %}
"*"                             %{ return 'tk_asterisco';  %}
"!="                            %{ return 'tk_noigual'; %}
"<="                            %{ return 'tk_menorigual'; %}
">="                            %{ return 'tk_mayorigual'; %}
"="                             %{ return 'tk_igual'; %}
">"                             %{ return 'tk_mayor'; %}
"<"                             %{ return 'tk_menor'; %}

'eq'                            %{ return 'tk_eq' %}
'ne'                            %{ return 'tk_ne' %}
'lt'                            %{ return 'tk_lt' %}
'le'                            %{ return 'tk_le' %}
'gt'                            %{ return 'tk_gt' %}
'ge'                            %{ return 'tk_ge' %}

"?"                             %{ return 'tk_interrogacion'; %}
":"                             %{ return 'tk_dospts' %}

"..//"                          %{ return 'tk_dpds'; %}
".//"                           %{ return 'tk_pds'; %}
"../"                           %{ return 'tk_dps'; %}
"./"                            %{ return 'tk_ps'; %}
"//"                            %{ return 'tk_dobleslash'; %}
"/"                             %{ return 'tk_slash'; %}
".."                            %{ return 'tk_doblepunto'; %}
"."                             %{ return 'tk_punto'; %}
":="                            %{ return 'tk_assign' %}
","                             %{ return 'tk_coma' %}

([0-9]+["."][0-9]+)\b           %{ return 'tk_decimal';  %}
[0-9]+\b                        %{ return 'tk_entero';  %}
\"[^\"]*\"                      %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'                      %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
'$'?([a-zA-Z])[a-zA-Z0-9_-]*    %{ return 'tk_identificador'; %}

"["                             %{ return 'tk_corchetea'; %}
"]"                             %{ return 'tk_corchetec'; %}
"("                             %{ return 'tk_parentesisa'; %}
")"                             %{ return 'tk_parentesisc'; %}
"{"                             %{ return 'tk_llavea'; %}
"}"                             %{ return 'tk_llavec'; %}
"$"                             %{ return 'tk_dolar' %}

\s+                             /* skip whitespace */
[ \t\r\n\f]                     %{ /*Los Ignoramos*/   %}
<<EOF>>                         %{ return 'EOF';       %}
.                               {  }

/lex

//SECCION DE IMPORTS
%{
  
%}


/* Asociación de operadores y precedencia */
%left tk_identificador tk_slash tk_dobleslash tk_punto tk_doblepunto
%left tk_mas tk_menos
%left tk_asterisco tk_division tk_mod
%left tk_dobleslash tk_slash tk_dpds tk_pds tk_dps tk_ps
%left UMENOS
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : 
        XQUERYS EOF 
;

XQUERYS :
        XQUERYS XQUERY
        | XQUERY
;

XQUERY :
        FLOWER
        | LET
        | FUNCTION
        | LISTA_XPATH
        | RETURN
        | error
;

FLOWER : 
        FOR LET WHERE ORDERBY
;

FOR :
    tk_for tk_identificador tk_in FLOWER_SRCS
;
// LISTA DE VARIABLES
FLOWER_SRCS :
            FLOWER_SRCS FLOWER_SRC
            | FLOWER_SRC 
;

FLOWER_SRC :
            LISTA_XPATH
            | tk_parentesisa FLOWER_ARGS tk_parentesisc
;

FLOWER_ARGS :
        FLOWER_ARGS tk_coma FLOWER_ARG
        | FLOWER_ARG
;

FLOWER_ARG :
        tk_entero
        | tk_decimal
;
// TODO: AÚN FALTA ACEPTAR UN RANGO DE NÚMEROS EN FLOWER_ARGS

LET :
    tk_let tk_assign LISTA_XPATH
    | tk_let tk_assign FLOWER_ARGS
    | 
;

WHERE :
    tk_where FLOWER_CONDS
    | 
;

// LISTA DE CONDICIONES
FLOWER_CONDS :
            FLOWER_CONDS tk_coma FLOWER_COND
            | FLOWER_COND
;

FLOWER_COND :
            EXPRESION_FILTRO
;

ORDERBY :
        tk_order tk_by SETS
        | 
;
// TODO: FLOWER_ORDERS

RETURN :
        tk_return SETS
;
// TODO: SETS | IF

FUNCTION :
        tk_declare tk_function tk_identificador tk_dospts tk_identificador tk_parentesisa FUN_ARGS tk_parentesisc tk_as tk_identificador tk_dospts DATA_TYPE tk_interrogacion tk_llavea STATEMENTS tk_llavec
;

FUN_ARGS :
            FUN_ARGS tk_coma FUN_ARG
            | FUN_ARG
;

FUN_ARG :
    tk_identificador tk_as tk_identificador tk_dospts DATA_TYPE tk_interrogacion
;

DATA_TYPE :
            res_string
            | res_number
            | res_decimal
            | res_bool
;

STATEMENTS :
            STATEMENTS STATEMENT
            | STATEMENT
;

// VARIABLES
// ASIGNACIONES
// LLAMDAS
// RETURN
STATEMENT :
            LET
            | RETURN
;

LISTA_XPATH :
            SETS tk_barra SETS
            | SETS
;
        
SETS : 
    SETS SET
    | SET
;

SET : 
    SELECTORES EXPRESION PREDICADO
    | EXPRESION PREDICADO
    | AXES
    | SELECTORES AXES
    | error
;

SELECTORES : 
            tk_dobleslash OTRO_SELECTOR
            |  tk_dobleslash
            |  tk_slash
            |  tk_slash OTRO_SELECTOR
            |  OTRO_SELECTOR
;

OTRO_SELECTOR : 
                tk_dpds AGREGAR_SELECTOR
                | tk_pds AGREGAR_SELECTOR
                | tk_dps AGREGAR_SELECTOR
                | tk_ps AGREGAR_SELECTOR
;

AGREGAR_SELECTOR :
                    OTRO_SELECTOR
                    | 
;

EXPRESION : 
            tk_identificador
            | tk_asterisco
            | tk_punto
            | tk_doblepunto
            | tk_arrobaasterisco
            | tk_arroba tk_identificador
            | tk_texto
            | tk_node
;

PREDICADO : 
            tk_corchetea EXPRESION_FILTRO tk_corchetec
            |  
;


EXPRESION_FILTRO : 
                EXPRESION_LOGICA
;

AXES :
        tk_ancestorself EXPRESION
        | tk_ancestor EXPRESION
        | tk_child EXPRESION
        | tk_descendantself EXPRESION
        | tk_descendant EXPRESION
        | tk_followingsibling EXPRESION
        | tk_following EXPRESION
        | tk_self EXPRESION
        | tk_parent EXPRESION
        | tk_precedingsibling EXPRESION
        | tk_preceding EXPRESION
;

ATRIBUTO : 
            tk_arroba tk_identificador tk_igual CADENA
            | tk_attribute tk_identificador tk_igual CADENA
;

EXPRESION_LOGICA : 
                    EXPRESION_LOGICA tk_and EXPRESION_RELACIONAL
                    | EXPRESION_LOGICA tk_or EXPRESION_RELACIONAL
                    | EXPRESION_RELACIONAL
;

EXPRESION_RELACIONAL :
                        EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA
                        | EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA
                        | EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA
                        | EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA
                        | EXPRESION_NUMERICA tk_igual EXPRESION_CADENA
                        | EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA
                        | EXPRESION_NUMERICA
                        | ATRIBUTO
                        | tk_asterisco
                        | tk_arrobaasterisco
                        | tk_texto
                        | tk_node
;

EXPRESION_CADENA :
                    CADENA
                    | EXPRESION_NUMERICA
;

EXPRESION_NUMERICA : 
                    tk_menos EXPRESION_NUMERICA %prec UMENOS
	                | EXPRESION_NUMERICA tk_mas EXPRESION_NUMERICA
	                | EXPRESION_NUMERICA tk_menos EXPRESION_NUMERICA
	                | EXPRESION_NUMERICA tk_asterisco EXPRESION_NUMERICA
                    | EXPRESION_NUMERICA tk_mod EXPRESION_NUMERICA
	                | EXPRESION_NUMERICA tk_division EXPRESION_NUMERICA
	                | tk_parentesisa EXPRESION_NUMERICA tk_parentesisc
	                | tk_entero
	                | tk_decimal
                    | tk_last
                    | AXES
                    | tk_position
	                | SETS
;

CADENA : 
        tk_cadena1
        | tk_cadena2
;