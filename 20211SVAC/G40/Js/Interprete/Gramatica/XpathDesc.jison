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
"text()"                      %{ return 'tk_texto';  %}
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
"..//"                        %{ return 'tk_dpds'; %}
".//"                        %{ return 'tk_pds'; %}
"../"                        %{ return 'tk_dps'; %}
"./"                        %{ return 'tk_ps'; %}
"//"                        %{ return 'tk_dobleslash'; %}
"/"                        %{ return 'tk_slash'; %}
".."                        %{ return 'tk_doblepunto'; %}
"."                         %{ return 'tk_punto'; %}
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
%left tk_asterisco tk_divisionb tk_mod
%left tk_dobleslash tk_slash tk_dpds tk_pds tk_dps tk_ps
%left UMENOS


// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : SETS EOF     {  $$ = "TODO CORRECTO :D XPATH DESC VERSION";
                                return $$; } ;

SETS: SET OS { };

OS: SET OS { }
    | { };

SET:    SELECTORES EXPRESION { }
   |    EXPRESION
   |    AXES
   |    SELECTORES AXES { };

SELECTORES: tk_dobleslash OTRO_SELECTOR { }
         |  tk_dobleslash { }
         |  tk_slash { }
         |  tk_slash OTRO_SELECTOR { }
         |  OTRO_SELECTOR { };

OTRO_SELECTOR: tk_dpds AGREGAR_SELECTOR { }
            |  tk_pds  AGREGAR_SELECTOR { }
            |  tk_dps  AGREGAR_SELECTOR { }
            |  tk_ps   AGREGAR_SELECTOR { };

AGREGAR_SELECTOR:  OTRO_SELECTOR { }
                | { };

EXPRESION : tk_identificador PREDICADO { }
        |  tk_asterisco PREDICADO { }
        |  tk_texto PREDICADO { }
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
        |       tk_preceding  EXPRESION          { };

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA { } 
        |  tk_attribute tk_identificador tk_igual CADENA { } ;


EXPRESION_LOGICA : EXPRESION_RELACIONAL tk_and EXPRESION_LOGICA { }
                |  EXPRESION_RELACIONAL tk_or EXPRESION_LOGICA { }     
                |  EXPRESION_RELACIONAL {};


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA { }
                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA { }     
                |       EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA { }  
                |       EXPRESION_NUMERICA { }       
                |       ATRIBUTO { }
                |       tk_asterisco { }
                |       tk_arrobaasterisco { }
                |       tk_texto { }
                |       tk_node { }  ;

EXPRESION_CADENA :  CADENA { }
                |   EXPRESION_NUMERICA { };

CADENA :         tk_cadena1 { }
        |        tk_cadena2 { };

EXPRESION_NUMERICA: tk_menos EXPRESION_NUMERICA %prec  UMENOS  {  } 
                |  tk_entero EXPRESION_PRIMA	         {  }
	        | tk_decimal EXPRESION_PRIMA             {  }
                | tk_last EXPRESION_PRIMA                {  }          
                | AXES EXPRESION_PRIMA                                 {  }
                | tk_position EXPRESION_PRIMA            {  }
	        | tk_identificador EXPRESION_PRIMA	 {  };


EXPRESION_PRIMA:            tk_mas EXPRESION_NUMERICA                            {  }
                    |       tk_menos EXPRESION_NUMERICA 	                 {  }
                    |       tk_asterisco EXPRESION_NUMERICA                      {  }
                    |       tk_mod EXPRESION_NUMERICA                       {  } 
                    |       tk_division EXPRESION_NUMERICA                       {  }               
                    |       tk_parentesisa EXPRESION_NUMERICA tk_parentesisc 	 {  }
                    |       { };                       
