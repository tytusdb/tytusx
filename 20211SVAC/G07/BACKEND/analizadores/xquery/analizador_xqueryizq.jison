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

"where"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_where';%}
"order by"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_order_by';%}
"return"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_return';%}
"data"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_data';%}
"if"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_if';%}
"then"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_then';%}
"else"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_else';%}
"in"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_in';%}
"to"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_to';%}
"at"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_at';%}

"eq"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_eq';%}
"ne"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ne';%}
"lt"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_lt';%}
"le"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_le';%}
"gt"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_gt';%}
"ge"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ge';%}



"<html>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_abre';%}
"</html>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_html_cierra';%}
"<body>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_abre';%}
"</body>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_body_cierra';%}

"<h1>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_abre';%}
"</h1>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_h1_cierra';%}
"<ul>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_abre';%}
"</ul>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_ul_cierra';%}
"<li>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_abre';%}
"</li>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_li_cierra';%}


"$"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_dolar';%}

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
":="                   %{ listaTokens.push(new Token("ComparacionLet", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_let_igual';%}
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
"{"                    %{ listaTokens.push(new Token("Llave_Izq", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_izq";%}
"}"                    %{ listaTokens.push(new Token("Llave_Der", yytext, yylloc.first_line, yylloc.first_column)); return "tk_llave_der";%}
","                    %{ listaTokens.push(new Token("Coma", yytext, yylloc.first_line, yylloc.first_column)); return "tk_coma";%}


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
%left 'tk_menor' 'tk_menor_igual' 'tk_mayor' 'tk_mayor_igual' 'tk_igual'
%left 'tk_mas' 'tk_menos'
%left 'tk_asterisco' 'tk_div' 'tk_mod'
%left unmenos

%start INICIO

%%

/* Definición de la gramática */
INICIO : 
        CONSTRUCCION EOF                {return $CONSTRUCCION;}  
;

CONSTRUCCION:
        ELEMENTO            
        |ESTRUCTURAHTML
        |CONTENIDO     
        ;

ESTRUCTURAHTML:
        tk_html_abre ESTRUCTURAHTMLBD tk_html_cierra
        |
;

ESTRUCTURAHTMLBD:
        tk_body_abre ESTRUCTURAHTMLH1 tk_body_cierra
        |
;

ESTRUCTURAHTMLH1:
        tk_h1_abre LISTAID tk_h1_cierra ESTRUCTURAHTMLUL
        |
;

LISTAID:
        LISTAID tk_identificador
        |tk_identificador
;

ESTRUCTURAHTMLUL:
        CONTENIDO  // COMPLETA 
        | tk_ul_abre tk_llave_izq CONTENIDO tk_llave_der tk_ul_cierra
        {console.log($1);
        console.log($2);
        console.log($4);
        console.log($5);}
;

CONTENIDO:
            ENCABEZADO ELEMENTO ACCIONWHE ACCIONOBY
            |ENCABEZADO ELEMENTO ACCIONRET 
;

ENCABEZADO:
        tk_for EXPRESION tk_at EXPRESION tk_in
        {console.log($1);
        console.log($3);}
        |tk_for EXPRESION tk_in
        |tk_let EXPRESION tk_let_igual 
;

ELEMENTO:
         PRODUCCION XPATHGRA //produccion doc("cadena") expresion xpath
        | LISTAELEMENTO
;  

LISTAELEMENTO:
        LISTAELEMENTO tk_coma EXPRESION tk_in tk_parentesis_izq tk_numero tk_to tk_numero tk_parentesis_der
        | tk_parentesis_izq tk_numero tk_to tk_numero tk_parentesis_der
        |LISTAELEMENTO tk_coma EXPRESION tk_in tk_parentesis_izq tk_numero tk_coma tk_numero tk_parentesis_der
        | tk_parentesis_izq tk_numero tk_coma tk_numero tk_parentesis_der
;

//XPATHGRA -> Aqui deben ir todas las instrucciones de XPATH pueden venir cualesquiera

PRODUCCION:
        tk_doc tk_parentesis_izq tk_hilera tk_parentesis_der 
        {console.log($1);
        console.log($2);
        console.log($3);
        console.log($4);}
;

EXPRESION:
        tk_dolar XPATHGRA
        {console.log($1);}
;
 
ACCIONWHE:
        tk_where LISTAWHE ACCIONRET
        {console.log($1);} 
        |tk_where LISTAWHE     
        |
;

LISTAWHE:
        LISTAWHE ESTIMACIONAND EXPRESION 
        |EXPRESION
;

ESTIMACIONAND:
        tk_and
        |tk_or
        |tk_coma
;

ACCIONOBY:
        tk_order_by LISTAOBY ACCIONRET
        {console.log($1);} 
        |tk_order_by LISTAOBY     
        |
;

LISTAOBY:
        LISTAOBY ESTIMACIONAND EXPRESION 
        |EXPRESION
;

ACCIONRET:
        tk_return VALORRETURN
        {console.log($1);}
;

VALORRETURN:
        EXPRESION
        |tk_li_abre LISTARET tk_li_cierra
        {console.log($1);
        console.log($3);} 
        | ESTRUCTURAIF ESTRUCTURATHEN ESTRUCTURAELSE
        | ETIQUETAABRE LISTAOPHT ETIQUETACIERRA
;

LISTARET:
        LISTARET  LISTAOPHT 
        | LISTAOPHT 
;

LISTAOPHT:
        LISTAOPHT AGREGACION tk_llave_izq OPCIONHTML tk_llave_der
        |LISTAOPHT AGREGACION tk_identificador tk_igual tk_llave_izq OPCIONHTML tk_llave_der
        |tk_llave_izq OPCIONHTML tk_llave_der
        |tk_identificador tk_igual tk_llave_izq OPCIONHTML tk_llave_der
;

AGREGACION:
        tk_punto
        | tk_and
        | tk_or
;

OPCIONHTML:
        tk_llave_izq EXPRESION tk_llave_der
        | EXPRESION
        | tk_llave_izq OPCIONDATA tk_llave_der
        | OPCIONDATA
;

OPCIONDATA:
         tk_data tk_parentesis_izq EXPRESION tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($4);} 
;

ESTRUCTURAIF:
        tk_if tk_parentesis_izq EXPRESION tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($4);} 
;

ESTRUCTURATHEN:
        tk_then ETIQUETAABRE LISTAOPHT ETIQUETACIERRA
        {console.log($1);} 
        |tk_then tk_parentesis_izq EXPRESION tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($4);} 
        |
;

ESTRUCTURAELSE:
        tk_else ETIQUETAABRE LISTAOPHT ETIQUETACIERRA
        {console.log($1);} 
        | tk_else tk_parentesis_izq EXPRESION tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($4);}             
        | tk_else tk_parentesis_izq tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($3);} 
;

ETIQUETAABRE:
        tk_menor tk_identificador tk_mayor
        {console.log($1);
        console.log($2);
        console.log($3);}             
;

ETIQUETACIERRA:
        tk_menor tk_diagonal tk_identificador tk_mayor
        {console.log($1);
        console.log($2);
        console.log($3);
        console.log($4);} 
;

// FINALIZA GRAMATICA DE XQUERY
// INICIA GRAMATICA DE XPATH

XPATHGRA:
     EXPRESIONXPA ELEMENTO_P                                     
;  

ELEMENTO_P:
         tk_barra_or EXPRESIONXPA ELEMENTO_P
                 {console.log($1);}                  
        |                                                       
;

EXPRESIONXPA:
         SIMBOLOS CAJETIN SIMBOLOS_P                            
        | CAJETIN SIMBOLOS_P                                      
;

SIMBOLOS:
          tk_diagonal                             
           {console.log($1);}    
        | tk_diagonal_doble     
         {console.log($1);}                       
        | tk_arroba ARROPROD  
         {console.log($1);}                                 
        | tk_puntos_seguidos PRODUCT 
         {console.log($1);}                 
        | tk_punto PRODUCT    
         {console.log($1);}                        
        | tk_asterisco tk_identificador                            
         {console.log($1);
         console.log($2);}   
;

SIMBOLOS_P:
         EXPRESIONXPA                                                        
        |                                                          
;

CAJETIN:
        tk_corchete_izq DATO tk_corchete_der 
        | DATO                           
;

DATO:
         tk_numero   
         {console.log($1);}                                           
        |tk_identificador   
        {console.log($1);}                                     
        |tk_hilera         
        {console.log($1);}                                      
        |tk_arroba tk_identificador
        {console.log($1);
        console.log($2);}                              
        |tk_last tk_parentesis_izq tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($3);}                              
	|DATO tk_mas DATO
        {console.log($2);}                                       
        |DATO tk_menos DATO
        {console.log($2);}                                    
        |DATO tk_div DATO 
        {console.log($2);}                                  
        |DATO tk_igual DATO
        {console.log($2);}                                    
        |DATO tk_indiferente DATO
        {console.log($2);}                                              
        |DATO tk_menor_igual DATO
        {console.log($2);}                                                           
        |DATO tk_mayor_igual DATO
        {console.log($2);}                                      
        |DATO tk_mayor DATO
        {console.log($2);}                                      
        |DATO tk_mod DATO 
        {console.log($2);}                                             
;


/*
        |tk_menos DATO %prec UMENOS	
        {console.log($1);}
        |DATO tk_asterisco DATO
        {console.log($2);} 
        |DATO tk_menor DATO
        {console.log($2);}
*/