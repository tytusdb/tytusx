%{
    
    
%}

// ===================================== ANALISIS LEXICO ==============================================
%lex
%options case-sensitive
%%

// EXPRESIONES A OMITIR
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}

// COMENTARIOS
// ---- AQUI

// PALABRAS RESERVADAS

"or"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_or';%}
"and"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_and';%}
"mod"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mod';%}
"div"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_div';%}
"node"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_node';%}
"text"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}
"namespace-node"       %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace_node';%}
"ancestor-or-self"     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor_or_self';%}
"ancestor"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor';%}
"attribute"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"child"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"descendant-or-self"   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant_or_self';%}
"descendant"           %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant';%}
"following-sibling"    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following_sibling';%}
"following"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following';%}
"namespace"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace';%}
"parent"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parent';%}
"preceding-sibling"    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding_sibling';%}
"preceding"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding';%}
"self"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_self';%}
"child"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"attribute"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"last"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_last';%}
"position"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_position';%}
"text"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}



// SIMBOLOS
"|"                    %{ listaTokens.push(new Token("Barra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_barra_or';%}
"+"                    %{ listaTokens.push(new Token("Suma", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mas';%}
"-"                    %{ listaTokens.push(new Token("Resta", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menos';%} 
"*"                    %{ listaTokens.push(new Token("Asterisco", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_asterisco';%} 
"!="                   %{ listaTokens.push(new Token("Indiferente", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_indiferente';%}
"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}
"<="                   %{ listaTokens.push(new Token("Menor_igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor_igual';%}
"<"                    %{ listaTokens.push(new Token("Menor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor';%}
">="                   %{ listaTokens.push(new Token("Mayor_Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor_igual';%}
">"                    %{ listaTokens.push(new Token("Mayor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor';%}
"::"                    %{ listaTokens.push(new Token("Cuatro_Puntos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cuatro_puntos';%}
"//"                   %{ listaTokens.push(new Token("Diagonal_doble", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal_doble';%} 
"/"                    %{ listaTokens.push(new Token("Division", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal';%} 
"@"                    %{ listaTokens.push(new Token("Arroba", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_arroba';%}
".."                   %{ listaTokens.push(new Token("Puntos_Seguidos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_puntos_seguidos';%}
"("                    %{ listaTokens.push(new Token("Parentesis_Izq", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_izq';%}
")"                    %{ listaTokens.push(new Token("Parentesis_Der", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_der';%}
"["                    %{ listaTokens.push(new Token("Corchete_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_izq";%}
"]"                    %{ listaTokens.push(new Token("Corchete_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_der";%}
"."                    %{ listaTokens.push(new Token("Punto", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_punto';%}

\'[^\']*\' %{ listaTokens.push(new Token("Caracter", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_caracter";%}
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
[a-zA-Z_À-ÿ\u00F1\u00D1]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*    %{ listaTokens.push(new Token("Identificador", yytext, yylloc.first_line, yylloc.first_column)); return "tk_identificador";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_numero";%}
[^/\+=*!><@|_\[\]-]+                 %{ listaTokens.push(new Token("Restriccion", yytext, yylloc.first_line, yylloc.first_column)); return "tk_restriccion";%}

// FIN DEL ARCHIVO
<<EOF>>                                     %{ return "EOF"; %}
// ERRORES LEXICOS
.                                           %{ listaErrores.push(new Token("ERROR LEXICO", yytext, yylloc.first_line, yylloc.first_column )); %}


/lex

//aqui no coloco la precedencia porque la resulevo con la gramatica
//de menor precedencia a mayor precedencia

%left 'tk_or'
%left 'tk_and'
%left 'tk_indiferente'
%left 'tk_menor' 'tk_menor_igual' 'tk_mayor' 'tk_mayor_igual'
%left 'tk_mas' 'tk_menos'
%left 'tk_asterisco' 'tk_div' 'tk_mod'


%start INICIO

%% /* language grammar */

INICIO: 
        ELEMENTO EOF                            {return $ELEMENTO;}                                 
;                                         

ELEMENTO:
        ELEMENTO ELEMENTO_P {
			$$ = $1;
			$1.agregarHijo($2);
		}
        |ELEMENTO_P {
			$$= $1;
		} 
;

ELEMENTO_P:
        tk_barra_or EXPRESION {
            $$ = new Nodo("BARRA OR",$1 );
			$$.agregarHijo($2);
        }
        |EXPRESION {
			$$ = $1;
		}
;

EXPRESION:
        EXPRESION CONTENIDO                     {
                $$ = $1;
                $$.agregarHijo($2);
        }
        |SIMBOLOS                               {
                $$ = $1;
        }
;

SIMBOLOS
        : tk_diagonal {
                  $$= new Nodo("DIAGONAL", $1 );
        }
        | tk_diagonal_doble{
                  $$= new Nodo("DIAGONAL DOBLE", $1 );
        }       
        | tk_arroba ARROPROD{
                  $$= new Nodo("DIAGONAL", $1 );
                  $$.agregarHijo($2);
        }
        | tk_puntos_seguidos{
                  $$= new Nodo("PUNTOS SEGUIDOS", $1 );
        }
        | tk_punto{
                  $$= new Nodo("PUNTO", $1 );
        }
        | tk_asterisco{
                  $$= new Nodo("ASTERISCO", $1 );
        }
        | tk_identificador{
                  $$= new Nodo("ID", $1 );
        }
        | tk_numero{
                  $$= new Nodo("NUMERO", $1 );
        }
        | RESERVA{
                  $$= $1;
        }
;

ARROPROD:
        tk_asterisco {
                $$= new Nodo("ASTERISCO",$1);
        }
        |tk_identificador{
                $$= new Nodo("ID",$1);
        }
;

CONTENIDO:
        tk_corchete_izq COMPLEMENTO tk_corchete_der  {
            $$ = $2;
			$$.agregarHijo(new Nodo($1,$1));
			$$.agregarHijo(new Nodo($3,$3));
        }
        |tk_corchete_izq EXPRESION  tk_corchete_der  {
			$$ = $2;
			$$.agregarHijo(new Nodo($1,$1));
			$$.agregarHijo(new Nodo($3,$3));
		}
        |tk_corchete_izq tk_corchete_der {
			$$ = new Nodo("","");
			$$.agregarHijo(new Nodo($1,$1));
			$$.agregarHijo(new Nodo($3,$3));
		}
;

COMPLEMENTO:
        EXPRESION PREDICADO {
			$$ = $1;
			$$.hijos = $2.hijos;
		}
;

PREDICADO:
          OPERACIONES {
			$$ = $1;
		}
;

OPERACIONES:
         OPERADOR MASSENTENCIA{
			$$ = $1;
			$$.agregarHijo($2);
		}
        | OPERADOR{
			$$ = $1;
		}
;

OPERADOR:
          tk_mas{
			$$ = new Nodo($1, $1);
		}
        | tk_menos{
			$$ = new Nodo($1, $1);
		}
        | tk_asterisco{
			$$ = new Nodo($1, $1);
		}
        | tk_div {
			$$ = new Nodo($1, $1);
		}
        | tk_igual{
			$$ = new Nodo($1, $1);
		}
        | tk_indiferente {
			$$ = new Nodo($1, $1);
		}
        | tk_menor_igual {
			$$ = new Nodo($1, $1);
		}
        | tk_menor{
			$$ = new Nodo($1, $1);
		}
        | tk_mayor_igual {
			$$ = new Nodo($1, $1);
		}
        | tk_mayor {
			$$ = new Nodo($1, $1);
		}
        | tk_mod{
			$$ = new Nodo($1, $1);
		}
;

MASSENTENCIA:
         ITEMFINAL tk_or COMPLEMENTO {
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}
        | ITEMFINAL tk_and COMPLEMENTO{
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}
        | ITEMFINAL{
			$$ = $1;
		}
;

ITEMFINAL:
          RESERVA{
			$$ = $1;
		}
        | tk_caracter {
			$$ = new Nodo($1, $1);
		}
        | tk_hilera{
			$$ = new Nodo($1, $1);
		}
        | tk_identificador{
			$$ = new Nodo($1, $1);
		}
        | tk_arroba ARROPROD{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}     
        | tk_numero{
			$$ = new Nodo($1, $1);
		}       
        | tk_diagonal{
			$$ = new Nodo($1, $1);
		}
        | tk_diagonal_doble{
			$$ = new Nodo($1, $1);
		}       
        | tk_puntos_seguidos{
			$$ = new Nodo($1, $1);
		}      
        | tk_punto {
			$$ = new Nodo($1, $1);
		}
        | tk_asterisco{
			$$ = new Nodo($1, $1);
		}
;

RESERVA:
          tk_ancestor             ITEMRESERVA {
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}         
        | tk_ancestor_or_self   ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}       
        | tk_attribute          ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_child              ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_descendant         ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_descendant_or_self ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_following          ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_following_sibling  ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_namespace          ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_parent             ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_preceding          ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_preceding_sibling  ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_self               ITEMRESERVA{
			$$ = new Nodo($1, $1);
			$$.agregarHijo($1);
		}
        | tk_node tk_parentesis_izq tk_parentesis_der{
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}
        | tk_last tk_parentesis_izq tk_parentesis_der{
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}
        | tk_position tk_parentesis_izq tk_parentesis_der{
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}     
        | tk_text tk_parentesis_izq tk_parentesis_der{
			$$ = new Nodo($2, $2);
			$$.agregarHijo($1);
			$$.agregarHijo($3);
		}
;

ITEMRESERVA:
        tk_cuatro_puntos SIMBOLOS = {
			$$ = new Nodo($1);
			$$.agregarHijo($2);
		}
        | {
            $$ = new Nodo("ε","ε");
        }
;

//gramatica recursiva por la izquierda
