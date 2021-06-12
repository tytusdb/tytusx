/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".
%s                          comment
%%

"<!--"                      this.begin('comment');
<comment>"-->"              this.popState();
<comment>.                  /* skip commentario content*/
"node()"                      %{ return 'tk_node';  %}
"last()"                      %{ return 'tk_last';  %}
"position()"                  %{ return 'tk_position';  %}
"ancestor-or-self::"          %{ return 'tk_ancestorself';  %}
"ancestor::"                  %{ return 'tk_ancestor';  %}
"attribute::"                 %{ return 'tk_attribute';  %}
"child::"                     %{ return 'tk_child';  %}
"descendant-or-self::"        %{ return 'tk_descendantself';  %}
"descendant::"                %{ return 'tk_descendant';  %}
"following-sibling::"         %{ return 'tk_followingsibling';  %}
"following::"                  %{ return 'tk_following';  %}
"parent::"                    %{ return 'tk_parent';  %}
"preceding-sibling::"         %{ return 'tk_precedingsibling';  %}
"preceding::"                 %{ return 'tk_preceding';  %}
"self::"                      %{ return 'tk_self';  %}
"div"                       %{ return 'tk_division';  %}
"or"                        %{ return 'tk_or';  %}
"and"                       %{ return 'tk_and';  %}
"mod"                       %{ return 'tk_mod';  %}
"@*"                         %{ return 'tk_arrobaasterisco';  %}
"@"                         %{ return 'tk_arroba';  %}
"|"                         %{ return 'tk_barra';  %}
"+"                         %{ return 'tk_mas';  %}
"-"                         %{ return 'tk_menos';  %}
"*"                         %{ return 'tk_asterisco';  %}
"!="                        %{ return 'tk_noigual'; %}
"<="                        %{ return 'tk_menorigual'; %}
">="                        %{ return 'tk_mayorigual'; %}
"="                         %{ return 'tk_igual'; %}
">"                         %{ return 'tk_mayor'; %}
"<"                         %{ return 'tk_menor'; %}
"?"                         %{ return 'tk_interrogacion'; %}
".."                        %{ return 'tk_doblepunto'; %}
"."                         %{ return 'tk_punto'; %}
"//"                        %{ return 'tk_dobleslash'; %}
"/"                        %{ return 'tk_slash'; %}
([0-9]+["."][0-9]+)\b        %{ return 'tk_decimal';  %}
[0-9]+\b                    %{ return 'tk_entero';  %}
\"[^\"]*\"                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
[']                         %{ return 'tk_squote'; %}
["]                         %{ return 'tk_dquote'; %}
"["                         %{ return 'tk_corchetea'; %}
"]"                         %{ return 'tk_corchetec'; %}
"{"                         %{ return 'tk_llavea'; %}
"}"                         %{ return 'tk_llavec'; %}
"("                         %{ return 'tk_parentesisa'; %}
")"                         %{ return 'tk_parentesisc'; %}

\s+                         /* skip whitespace */
[ \t\r\n\f]                 %{ /*Los Ignoramos*/   %}
<<EOF>>                     %{ return 'EOF';       %}
.                           { }

/lex

//SECCION DE IMPORTS
%{

%}


/* Asociación de operadores y precedencia */
%left tk_identificador tk_slash tk_dobleslash tk_punto tk_doblepunto
%left tk_mas tk_menos
%left tk_asterisco tk_division
%left UMENOS

// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : SETS EOF     {  $$ = "TODO CORRECTO :D XPATH ASC VERSION";
                                return $$; } ;

SETS: SETS SET { }
    | SET { } ;

SET:    SELECTOR EXPRESION { }
   |    AXES SELECTOR AXES { }
   |    EXPRESION SELECTOR EXPRESION { }
   |    EXPRESION SELECTOR AXES { }
   |    SELECTOR AXES { }
   |    AXES SELECTOR EXPRESION { };

SELECTOR : tk_slash {} 
        |  tk_dobleslash { }
        |  tk_punto { }
        |  tk_doblepunto { } ;

EXPRESION : tk_identificador PREDICADO { }
        |  tk_asterisco PREDICADO { }
        |  tk_node PREDICADO { };

PREDICADO : tk_corchetea EXPRESION_FILTRO tk_corchetec { } 
        |  { };


EXPRESION_FILTRO : EXPRESION_LOGICA { };

AXES :          tk_ancestorself   EXPRESION      { }
        |       tk_ancestor   EXPRESION          { }
        |       tk_child      EXPRESION          { }
        |       tk_descendantself EXPRESION      { }
        |       tk_descendant  EXPRESION         { }
        |       tk_followingsibling EXPRESION    { }
        |       tk_following  EXPRESION          { }
        |       tk_self  EXPRESION               { }
        |       tk_parent  EXPRESION             { }
        |       tk_precedingsibling EXPRESION    { }
        |       tk_attribute  EXPRESION          { }
        |       tk_preceding  EXPRESION          { };

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA { } ;


EXPRESION_LOGICA : EXPRESION_LOGICA tk_and EXPRESION_RELACIONAL { }
                |  EXPRESION_LOGICA tk_or EXPRESION_RELACIONAL { }     
                |  EXPRESION_RELACIONAL {};


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA { }     
                |       EXPRESION_NUMERICA { }       
                |       ATRIBUTO { }
                |       tk_asterisco { }
                |       tk_arrobaasterisco { }
                |       AXES { }
                |       tk_node { }  ;

EXPRESION_CADENA :      CADENA { }
                |      EXPRESION_NUMERICA { };

EXPRESION_NUMERICA : tk_menos EXPRESION_NUMERICA %prec UMENOS	{  }
	| EXPRESION_NUMERICA tk_mas EXPRESION_NUMERICA		{  }
	| EXPRESION_NUMERICA tk_menos EXPRESION_NUMERICA	{  }
	| EXPRESION_NUMERICA tk_asterisco EXPRESION_NUMERICA	{  }
	| EXPRESION_NUMERICA tk_division EXPRESION_NUMERICA	{  }
	| tk_parentesisa expresion_numerica tk_parentesisc	{  }
	| tk_entero						{  }
	| tk_decimal						{  }
        | tk_last                                               {  }
        | tk_position                                           {  }
	| tk_identificador	                                {  };

CADENA :         tk_cadena1 { }
        |        tk_cadena2 { };






