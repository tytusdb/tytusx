%{
    
    
%}

// ===================================== ANALISIS LEXICO ==============================================
%lex
%options case-sensitive
%%

// EXPRESIONES A OMITIR
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}

// COMENTARIOS <!-------Your comment----->
[(][:][^:]*[:]+[)]                        {}



//SECCION DE COMENTARIOS

// LOS COMENTARIOS PUEDEN VENIR ASI (: [AQUI PUEDE VENIR LO QUE SEA] :)

/* PALABRAS A TENER EN CUENTA
1. General comparisons: =, !=, <, <=, >, >=

2. Value comparisons: eq, ne, lt, le, gt, ge
*/

//PALABRAS RESERVADAS
"doc"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_doc';%}
"for"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_for';%}

"let"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_let';%}

"where"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_where';%}
"order by"              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_order_by';%}
"return"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_return';%}
"data"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_data';%}
"if"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_if';%}
"then"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_then';%}
"else"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_else';%}
"in"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_in';%}
"to"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_to';%}
"at"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_at';%}

"eq"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_eq';%}
"ne"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ne';%}
"lt"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_lt';%}
"le"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_le';%}
"gt"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_gt';%}
"ge"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ge';%}



"<html>"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_abre';%}
"</html>"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_cierra';%}
"<body>"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_abre';%}
"</body>"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_cierra';%}

"<h1>"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_abre';%}
"</h1>"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_cierra';%}
"<ul>"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_abre';%}
"</ul>"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_cierra';%}
"<li>"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_abre';%}
"</li>"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_cierra';%}


"$"                     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_dolar';%}

"or"                    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_or';%}
"and"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_and';%}
"mod"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mod';%}
"div"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_div';%}
"node"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_node';%}
"text"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}
"namespace-node"        %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace_node';%}
"ancestor-or-self"      %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor_or_self';%}
"ancestor"              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ancestor';%}
"attribute"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"child"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"descendant-or-self"    %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant_or_self';%}
"descendant"            %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_descendant';%}
"following-sibling"     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following_sibling';%}
"following"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_following';%}
"namespace"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_namespace';%}
"parent"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parent';%}
"preceding-sibling"     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding_sibling';%}
"preceding"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_preceding';%}
"self"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_self';%}
"child"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_child';%}
"attribute"             %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_attribute';%}
"last"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_last';%}
"position"              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_position';%}
"text"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_text';%}



// SIMBOLOS
":="                    %{ listaTokens.push(new Token("ComparacionLet", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_let_igual';%}
"|"                     %{ listaTokens.push(new Token("Barra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_barra_or';%}
"+"                     %{ listaTokens.push(new Token("Suma", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mas';%}
"-"                     %{ listaTokens.push(new Token("Resta", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menos';%} 
"*"                     %{ listaTokens.push(new Token("Asterisco", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_asterisco';%} 
"!="                    %{ listaTokens.push(new Token("Indiferente", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_indiferente';%}
"="                     %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}
"<="                    %{ listaTokens.push(new Token("Menor_igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor_igual';%}
"<"                     %{ listaTokens.push(new Token("Menor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor';%}
">="                    %{ listaTokens.push(new Token("Mayor_Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor_igual';%}
">"                     %{ listaTokens.push(new Token("Mayor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor';%}
"::"                    %{ listaTokens.push(new Token("Cuatro_Puntos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cuatro_puntos';%}
"//"                    %{ listaTokens.push(new Token("Diagonal_doble", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal_doble';%} 
"/"                     %{ listaTokens.push(new Token("Division", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal';%} 
"@"                     %{ listaTokens.push(new Token("Arroba", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_arroba';%}
".."                    %{ listaTokens.push(new Token("Puntos_Seguidos", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_puntos_seguidos';%}
"("                     %{ listaTokens.push(new Token("Parentesis_Izq", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_izq';%}
")"                     %{ listaTokens.push(new Token("Parentesis_Der", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parentesis_der';%}
"["                     %{ listaTokens.push(new Token("Corchete_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_izq";%}
"]"                     %{ listaTokens.push(new Token("Corchete_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_corchete_der";%}
"{"                     %{ listaTokens.push(new Token("Llave_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_izq";%}
"}"                     %{ listaTokens.push(new Token("Llave_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_der";%}
","                     %{ listaTokens.push(new Token("Coma", yytext, yylloc.first_line, yylloc.first_column)); return "tk_coma";%}


"."                     %{ listaTokens.push(new Token("Punto", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_punto';%}

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
%left 'tk_menor' 'tk_menor_igual' 'tk_mayor' 'tk_mayor_igual' 'tk_igual'
%left 'tk_mas' 'tk_menos'
%left 'tk_asterisco' 'tk_div' 'tk_mod'
%left unmenos

%start INICIO

%%

/* Definición de la gramática */
INICIO : 
        XQUERYGRA EOF                                                                   
        {return $XQUERYGRA;}  
;
XQUERYGRA
        :FOR_IN RETURN                                                                  
        {$$= new Nodo("Porduccion","XQUERYGRA",[ $FOR_IN ,$RETURN] );}
        |LLAMADA                                                                        
        {$$= new Nodo("Porduccion","XQUERYGRA",[ $LLAMADA] );}
;
FOR_IN
        :tk_for VARIABLE tk_in LLAMADA                                                  
        {$$= new Nodo("Porduccion","FOR_IN",[$tk_for, $VARIABLE, $tk_in, $LLAMADA ] );}
;
RETURN
        :tk_return VARIABLE                                                             
        {$$= new Nodo("Porduccion","RETURN",[ $tk_return, $VARIABLE] );}
        |tk_return VARIABLE XPATHGRA                                                    
        {$$= new Nodo("Porduccion","RETURN",[ $tk_return, $VARIABLE, $XPATHGRA] );}
;
LLAMADA
        :tk_doc tk_parentesis_izq tk_hilera tk_parentesis_der XPATHGRA                 
         {$$= new Nodo("Porduccion","LLAMADA",[ $tk_doc, $tk_parentesis_izq, $tk_hilera , $tk_parentesis_der ,$XPATHGRA] );}
        |XPATHGRA                                                                       
        {$$= new Nodo("Porduccion","LLAMADA",[ $XPATHGRA] );}
;
VARIABLE
        :tk_dolar tk_identificador                                                      
        {$$= new Nodo("Porduccion","VARIABLE",[ $tk_dolar, $tk_identificador] );}
;
// FINALIZA GRAMATICA DE XQUERY
// INICIA GRAMATICA DE XPATH

XPATHGRA:
     CONSULTA_                                                                          
     {$$= new Nodo("Porduccion","XPATHGRA",[ $CONSULTA_] );}            
;  
CONSULTA_
        :tk_identificador CONSULTA                                                      
        {$$= new Nodo("Porduccion","CONSULTA_",[ $tk_identificador, $CONSULTA] );} 
        |CONSULTA                                                                       
        {$$= new Nodo("Porduccion","CONSULTA_",[ $CONSULTA] );} 
;
CONSULTA
        :CONSULTA NODO                                                                  
        {$$= new Nodo("Porduccion","CONSULTA",[ $CONSULTA, $NODO] );}
        |NODO                                                                           
        {$$= new Nodo("Porduccion","CONSULTA",[ $NODO] );}
;  
NODO
        :tk_diagonal tk_identificador PREDICADO                                         
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_identificador, $PREDICADO] );}
        |tk_diagonal_doble tk_identificador  PREDICADO                                  
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal_doble, $tk_identificador, $PREDICADO] );}
        |tk_diagonal tk_puntos_seguidos                                                
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_puntos_seguidos] );}
        |tk_diagonal tk_arroba tk_identificador                                         
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_arroba, $tk_identificador] );}
        |tk_diagonal tk_punto                                                          
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_punto] );}

        |tk_diagonal tk_asterisco PREDICADO                                             
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_asterisco, $PREDICADO] );}
        |tk_diagonal_doble tk_asterisco  PREDICADO                                      
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal_doble, $tk_asterisco, $PREDICADO] );}

        |tk_diagonal tk_arroba tk_asterisco                                             
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_arroba, $tk_asterisco] );}

        |tk_diagonal tk_node tk_parentesis_izq tk_parentesis_der PREDICADO              
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal, $tk_node, $tk_parentesis_izq, $tk_parentesis_der, $PREDICADO] );}
        |tk_diagonal_doble tk_node tk_parentesis_izq tk_parentesis_der  PREDICADO       
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal_doble, $tk_node, $tk_parentesis_izq, $tk_parentesis_der, $PREDICADO] );}

        |tk_diagonal_doble tk_arroba tk_identificador                                   
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal_doble, $tk_arroba, $tk_identificador] );}
        |tk_diagonal_doble tk_arroba tk_asterisco                                       
        {$$= new Nodo("Porduccion","NODO",[ $tk_diagonal_doble, $tk_arroba, $tk_asterisco] );}

;

PREDICADO
        :tk_corchete_izq DATO  tk_corchete_der                                          
        {$$= new Nodo("Porduccion","PREDICADO",[ $tk_corchete_izq, $DATO, $tk_corchete_der] );}
        |                                                                               
        {$$= new Nodo("Porduccion","PREDICADO",[ "ε" ] );}
;

DATO
//Tipos de datos
        :tk_numero                                                                      
        {$$= new Nodo("Porduccion","DATO",[ $tk_numero] );} 
        |tk_identificador                                                               
        {$$= new Nodo("Porduccion","DATO",[ $tk_identificador] );}                                                        
        |tk_hilera                                                                      
        {$$= new Nodo("Porduccion","DATO",[ $tk_hilera] );}                                                                   
        |tk_arroba tk_identificador                                                     
        {$$= new Nodo("Porduccion","DATO",[ $tk_arroba, $tk_identificador] );}                                                
        |tk_last tk_parentesis_izq tk_parentesis_der                                    
        {$$= new Nodo("Porduccion","DATO",[ $tk_last, $tk_parentesis_izq, $tk_parentesis_der] );} 

//Operaciones aritmeticas                      
        |DATO tk_mas DATO                                                               
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_mas, $DATO] );}                                                  
        |DATO tk_menos DATO                                                             
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_menos, $DATO] );}    
        |DATO tk_asterisco DATO                                                         
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_asterisco, $DATO] );}                                                
        |DATO tk_div DATO                                                               
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_div, $DATO] );} 
        |DATO tk_mod DATO                                                               
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_mod, $DATO] );}                                                                                                           
        |tk_menos DATO %prec UMENOS	                                                    
        {$$= new Nodo("Porduccion","DATO",[ $tk_menos, $DATO] );} 

//Operaciones Logicas
        |DATO tk_igual DATO           	                                                
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_igual, $DATO] );}                                   
        |DATO tk_indiferente DATO                                                       
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_indiferente, $DATO] );}                   
        |DATO tk_menor_igual DATO                                                       
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_menor_igual, $DATO] );} 
        |DATO tk_mayor_igual DATO                                                      
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_mayor_igual, $DATO] );} 
        |DATO tk_mayor DATO                                                            
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_mayor, $DATO] );} 
        |DATO tk_menor DATO                                                            
        {$$= new Nodo("Porduccion","DATO",[ $DATO, $tk_menor, $DATO] );}                  
;
