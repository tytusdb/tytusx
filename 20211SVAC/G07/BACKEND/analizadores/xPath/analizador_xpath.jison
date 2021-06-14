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


// FIN DEL ARCHIVO
<<EOF>>                                     %{ return "EOF"; %}
// ERRORES LEXICOS
.                                           %{ listaErrores.push(new TokenError("xPATH","ERROR LEXICO","Caracter no reconocido "+ yytext, yylloc.first_line, yylloc.first_column )); %}


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
        ELEMENTO EOF  {return $ELEMENTO;}         //constructor(tipo, valor,hijos)                         
;                                          

ELEMENTO:
     EXPRESION ELEMENTO_P                                       
     {
        $$= new Nodo("ELE","ELE");
        $$.agregarHijo($1);
        $$.agregarHijo($2);
        }
;  

ELEMENTO_P:
         tk_barra_or EXPRESION ELEMENTO_P                       
             {
        $$= new Nodo("ELEP","ELEP");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        $$.agregarHijo($3);
        }
        
        |  
         {
        $$= new Nodo("ELEP","ELEP");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
        | error tk_barra_or 
        {
            listaErrores.push(new TokenError("XML",'Este es un error sintáctico: ' + yytext, "No se esperaba " + yytext , @1.first_line, @2.first_column ));
        }
;



EXPRESION:
          RESERVA RESERVA_P                                      
        {
	$$= new Nodo("EXP", "EXP" );
	$$.agregarHijo($1);
        $$.agregarHijo($2);
	}
        | SIMBOLOS CAJETIN SIMBOLOS_P       
        {
	$$= new Nodo("EXP", "EXP" );
	$$.agregarHijo($1);
        $$.agregarHijo($2);
        $$.agregarHijo($2);
	}
        | tk_identificador CAJETIN  SIMBOLOSSECU SIMBOLOSSECU_P 
        {
	$$= new Nodo("EXP", "EXP" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        $$.agregarHijo($3);
        $$.agregarHijo($4);                
	}
        | tk_identificador                                       
        {
	$$= new Nodo("EXP", "EXP" );
        $$.agregarHijo(new Nodo($1,$1));
	}
        | tk_asterisco CAJETIN                                   
        {
	$$= new Nodo("EXP", "EXP" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
;

SIMBOLOS:
          tk_diagonal CONTENIDODOS                              
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
        | tk_diagonal_doble CONTENIDODOS                        
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
        | tk_arroba ARROPROD                                    
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_puntos_seguidos PRODUCT CONTENIDODOS               
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        $$.agregarHijo($3);        
	}
        | tk_punto PRODUCT CONTENIDODOS                         
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        $$.agregarHijo($3);        
	}
        | tk_asterisco CONTENIDO                                
        {
	$$= new Nodo("SIM", "SIM" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
;

SIMBOLOS_P:
         EXPRESION                                              
        {
	$$= new Nodo("SIMP", "SIMP" );
        $$.agregarHijo($1);
	}
        |                                                       
        {
        $$= new Nodo("SIMP","SIMP");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

SIMBOLOSSECU:
          tk_diagonal CONTENIDODOS                              
        {
	$$= new Nodo("SIMS", "SIMS" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
        | tk_diagonal_doble CONTENIDODOS                        
        {
	$$= new Nodo("SIMS", "SIMS" );
        $$.agregarHijo(new Nodo($1,$1));        
        $$.agregarHijo($2);
	}
        | tk_arroba ARROPROD                                    
        {
	$$= new Nodo("SIMS", "SIMS" );
        $$.agregarHijo(new Nodo($1,$1));        
        $$.agregarHijo($2);
	}
        | tk_puntos_seguidos                                    
        {
	$$= new Nodo("SIMS", "SIMS" );
        $$.agregarHijo(new Nodo($1,$1));
	}
        | tk_asterisco CONTENIDO                                
        {
	$$= new Nodo("SIMS", "SIMS" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
        ;

SIMBOLOSSECU_P:
         EXPRESION                                              
        {
	$$= new Nodo("SIMSP", "SIMSP" );
        $$.agregarHijo($1);
	}
        |                                                       
        {
        $$= new Nodo("SIMSP","SIMSP");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

RESERVA:
        tk_ancestor           ITEMRESERVA    
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}
        | tk_ancestor_or_self ITEMRESERVA    
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_attribute        ITEMRESERVA    
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_child            ITEMRESERVA    
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_descendant       ITEMRESERVA    
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_descendant_or_self ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_following          ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_following_sibling  ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_namespace          ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_parent             ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_preceding          ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_preceding_sibling  ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_self               ITEMRESERVA  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}        
        | tk_node tk_parentesis_izq tk_parentesis_der  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo(new Nodo($2,$2));
        $$.agregarHijo(new Nodo($3,$3));        
	}        
        | tk_last tk_parentesis_izq tk_parentesis_der  
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo(new Nodo($2,$2));
        $$.agregarHijo(new Nodo($3,$3));        
	}         
        | tk_position tk_parentesis_izq tk_parentesis_der 
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo(new Nodo($2,$2));
        $$.agregarHijo(new Nodo($3,$3));        
	}         
        | tk_text tk_parentesis_izq tk_parentesis_der 
        {
	$$= new Nodo("RES", "RES" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo(new Nodo($2,$2));
        $$.agregarHijo(new Nodo($3,$3));        
	}         
        ;

RESERVA_P:
        EXPRESION  
        {
	$$= new Nodo("RESP", "RESP" );
        $$.agregarHijo($1);
	}         
        |                                                       
        {
        $$= new Nodo("RESP","RESP");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

PRODUCT:
        tk_diagonal                                    
        {
        $$= new Nodo("PRO","PRO");
        $$.agregarHijo(new Nodo($1,$1));
        }        
        |tk_diagonal_doble                                         
        {
        $$= new Nodo("PRO","PRO");
        $$.agregarHijo(new Nodo($1,$1));
        }
;

ARROPROD:
        tk_asterisco                                        
        {
        $$= new Nodo("ARO","ARO");
        $$.agregarHijo(new Nodo($1,$1));
        }
        |tk_identificador                                           
        {
        $$= new Nodo("ARO","ARO");
        $$.agregarHijo(new Nodo($1,$1));
        }
;

CONTENIDO:
         tk_identificador  
        {
	$$= new Nodo("CON", "CON" );
        $$.agregarHijo(new Nodo($1,$1));
	}
;

CONTENIDODOS:
         tk_arroba ARROPROD                         
        {
	$$= new Nodo("COND", "COND" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
	}         
         |tk_identificador                                   
        {
	$$= new Nodo("COND", "COND" );
        $$.agregarHijo(new Nodo($1,$1));
	}         
         |tk_asterisco                                          
        {
	$$= new Nodo("COND", "COND" );
        $$.agregarHijo(new Nodo($1,$1));
	}         
         | tk_puntos_seguidos                                   
        {
	$$= new Nodo("COND", "COND" );
        $$.agregarHijo(new Nodo($1,$1));
	}         
         | RESERVA                                              
        {
	$$= new Nodo("COND", "COND" );
        $$.agregarHijo($1);
	}
;

CONTENIDO_P:
        EXPRESION                                              
        {
	$$= new Nodo("CONDP", "CONDP" );
        $$.agregarHijo($1);
	}        
        |                                                       
        {
        $$= new Nodo("CONDP","CONDP");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

CAJETIN:
        tk_corchete_izq PREDICADO tk_corchete_der               
        {
        $$= new Nodo("CAJ","CAJ");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);        
        $$.agregarHijo(new Nodo($3,$3));
        }        
        |                                                       
        {
        $$= new Nodo("CAJ","CAJ");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

PREDICADO:
          OPERACIONES                                           
        {
	$$= new Nodo("PRE", "PRE" );
        $$.agregarHijo($1);
	} 
;

OPERACIONES:
        ITEMINICIO OPERADOR ITEMFINAL OPERACIONES_L             
        {
	$$= new Nodo("OPE", "OPE" );
        $$.agregarHijo($1);
        $$.agregarHijo($2);
        $$.agregarHijo($3);
        $$.agregarHijo($4);                        
	}         
        | ITEMINICIO                                            
        {
	$$= new Nodo("OPE", "OPE" );
        $$.agregarHijo($1);
	}
;

ITEMINICIO:
          RESERVA                                               
        {
	$$= new Nodo("ITEI", "ITEI" );
        $$.agregarHijo($1);
	}        
        | tk_identificador                                      
        {
	$$= new Nodo("ITEI", "ITEI" );
        $$.agregarHijo(new Nodo($1,$1));
        }        
        | tk_arroba ARROPROD                                    
        {
	$$= new Nodo("ITEI", "ITEI" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        }         
        | tk_numero                                             
        {
	$$= new Nodo("ITEI", "ITEI" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_punto                                              
        {
	$$= new Nodo("ITEI", "ITEI" );
        $$.agregarHijo(new Nodo($1,$1));
        } 
;

OPERADOR:
        tk_mas                                                  
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }        
        | tk_menos                                              
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_asterisco                                          
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_div                                                
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_igual                                              
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_indiferente                                        
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_menor_igual                                        
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_menor                                              
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_mayor_igual                                        
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_mayor                                             
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_mod                                               
        {
	$$= new Nodo("OPERA", "OPERA" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        ;

ITEMFINAL:
          RESERVA                                               
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo($1);
        }        
        | tk_caracter                                           
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo(new Nodo($1,$1));
        }         
        | tk_hilera                                             
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo(new Nodo($1,$1));
        }                 
        | tk_identificador                                      
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo(new Nodo($1,$1));
        }                 
        | tk_arroba ARROPROD                                    
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);        
        }        
        | tk_numero                                             
        {
	$$= new Nodo("ITEF", "ITEF" );
        $$.agregarHijo(new Nodo($1,$1));
        } 
;

OPERACIONES_L:
          tk_or OPERACIONES                                     
        {
        $$= new Nodo("OPEL","OPEL");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        }
        | tk_and OPERACIONES                                    
        {
        $$= new Nodo("OPEL","OPEL");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);
        }        
        |                                                       
        {
        $$= new Nodo("OPEL","OPEL");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;

ITEMRESERVA:
        tk_cuatro_puntos SIMBOLOSTERC                          
        {
        $$= new Nodo("ITER","ITER");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);        
        }        
        |                                                      
        {
        $$= new Nodo("ITER","ITER");
        $$.agregarHijo(new Nodo("ε","ε"));
        }
;       

SIMBOLOSTERC:
          tk_identificador                                      
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));        
        }         
        | tk_asterisco                                          
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));        
        } 
        | RESERVA                                               
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo($1); 
        } 
        | tk_diagonal CONTENIDODOS                              
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));
        $$.agregarHijo($2);                 
        } 
        | tk_diagonal_doble CONTENIDODOS                        
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));        
        $$.agregarHijo($2);         
        } 
        | tk_arroba ARROPROD                                    
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));        
        $$.agregarHijo($2);         
        } 
        | tk_puntos_seguidos                                    
        {
        $$= new Nodo("SIMBT","SIMBT");
        $$.agregarHijo(new Nodo($1,$1));        
        } 
;


//gramatica recursiva por la derecha decendete
