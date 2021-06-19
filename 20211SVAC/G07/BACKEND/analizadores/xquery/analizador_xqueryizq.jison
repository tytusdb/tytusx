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
        ;

ESTRUCTURAHTML:
        CONTENIDO  // COMPLETA 
        | tk_ul_abre tk_llave_izq CONTENIDO tk_llave_der tk_ul_cierra
        {console.log($1);
        console.log($2);
        console.log($4);
        console.log($5);}
;

CONTENIDO:
            ENCABEZADO ELEMENTO ACCIONWHE ACCIONOBY 
;

ENCABEZADO:
        tk_for EXPRESION tk_in
        {console.log($1);
        console.log($3);}
;

ELEMENTO:
         PRODUCCION XPATHGRA //produccion doc("cadena") expresion xpath
        | tk_parentesis_izq tk_numero tk_to tk_numero tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($3);
        console.log($4);
        console.log($5);}
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
        tk_where EXPRESION ACCIONRET
        {console.log($1);}
        |tk_where EXPRESION 
        {console.log($1);}
        | 
;  

ACCIONOBY:
        tk_order_by EXPRESION ACCIONRET
        {console.log($1);}
        |tk_order_by EXPRESION 
        {console.log($1);}        
        |
;

ACCIONRET:
        tk_return VALORRETURN
        {console.log($1);}
;

VALORRETURN:
        EXPRESION
        |tk_li_abre tk_llave_izq OPCIONHTML tk_llave_der tk_li_cierra
        {console.log($1);
        console.log($2);
        console.log($4);
        console.log($5);} 
        | ESTRUCTURAIF ESTRUCTURATHEN ESTRUCTURAELSE
;

OPCIONHTML:
        EXPRESION
        | tk_data tk_parentesis_izq EXPRESION tk_parentesis_der
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
        tk_then ETIQUETAABRE OPCIONHTML ETIQUETACIERRA
        {console.log($1);} 
        |tk_then tk_parentesis_izq EXPRESION tk_parentesis_der
        {console.log($1);
        console.log($2);
        console.log($4);} 
        |
;

ESTRUCTURAELSE:
        tk_else ETIQUETAABRE OPCIONHTML ETIQUETACIERRA
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
     EXPRESIONXPA ELEMENTO_P                                       {$$= new Nodo("Porduccion","ELEMENTO",[ $EXPRESIONXPA ,$ELEMENTO_P] );}
;  

ELEMENTO_P:
         tk_barra_or EXPRESIONXPA ELEMENTO_P                       {$$= new Nodo("Porduccion","ELEMENTO_P",[ $tk_barra_or ,$EXPRESIONXPA,$ELEMENTO_P] );}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

EXPRESIONXPA:
          RESERVA RESERVA_P                                      {$$= new Nodo("Porduccion","EXPRESIONXPA",[ $RESERVA ,$RESERVA_P] );}
        | SIMBOLOS CAJETIN SIMBOLOS_P                            {$$= new Nodo("Porduccion","EXPRESIONXPA",[ $SIMBOLOS, $CAJETIN ,$SIMBOLOS_P] );}
        | tk_identificador CAJETIN  SIMBOLOSSECU SIMBOLOSSECU_P  {$$= new Nodo("Porduccion","EXPRESIONXPA",[ $tk_identificador ,$CAJETIN, $SIMBOLOSSECU, $SIMBOLOSSECU_P] );}
        | tk_identificador                                       {$$= new Nodo("Porduccion","EXPRESIONXPA",[ $tk_identificador ] );} 
        | tk_asterisco CAJETIN                                   {$$= new Nodo("Porduccion","EXPRESIONXPA",[ $tk_asterisco, $CAJETIN ] );} 
;

SIMBOLOS:
          tk_diagonal CONTENIDODOS                              {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_diagonal ,$CONTENIDODOS] );}
        | tk_diagonal_doble CONTENIDODOS                        {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_diagonal_doble ,$CONTENIDODOS] );}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_arroba,$ARROPROD ] );}
        | tk_puntos_seguidos PRODUCT CONTENIDODOS               {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_puntos_seguidos, $PRODUCT ,$CONTENIDODOS] );}
        | tk_punto PRODUCT CONTENIDODOS                         {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_punto,$PRODUCT ,$CONTENIDODOS] );}
        | tk_asterisco CONTENIDOXPA                                {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_asterisco ,$CONTENIDOXPA] );}
;

SIMBOLOS_P:
         EXPRESIONXPA                                              {$$= $EXPRESIONXPA;}                             
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}       
;

SIMBOLOSSECU:
          tk_diagonal CONTENIDODOS                              {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_diagonal, $CONTENIDODOS ] );}
        | tk_diagonal_doble CONTENIDODOS                        {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_diagonal_doble, $CONTENIDODOS ] );}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_arroba, $ARROPROD ] );}
        | tk_puntos_seguidos                                    {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_puntos_seguidos ] );}
        | tk_asterisco CONTENIDOXPA                                {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_asterisco, $CONTENIDOXPA ] );}
        ;

SIMBOLOSSECU_P:
         EXPRESIONXPA                                              {$$= $EXPRESIONXPA;}                             
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}       
;

RESERVA:
        tk_ancestor           ITEMRESERVA    {$$= new Nodo("Porduccion","RESERVA",[$tk_ancestor, $ITEMRESERVA ] );} 
        | tk_ancestor_or_self ITEMRESERVA    {$$= new Nodo("Porduccion","RESERVA",[$tk_ancestor_or_self, $ITEMRESERVA ] );}
        | tk_attribute        ITEMRESERVA    {$$= new Nodo("Porduccion","RESERVA",[$tk_attribute, $ITEMRESERVA ] );}
        | tk_child            ITEMRESERVA    {$$= new Nodo("Porduccion","RESERVA",[$tk_child, $ITEMRESERVA ] );}
        | tk_descendant       ITEMRESERVA    {$$= new Nodo("Porduccion","RESERVA",[$tk_descendant, $ITEMRESERVA ] );}
        | tk_descendant_or_self ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_descendant_or_self, $ITEMRESERVA ] );}
        | tk_following          ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_following, $ITEMRESERVA ] );}
        | tk_following_sibling  ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_following_sibling, $ITEMRESERVA ] );}
        | tk_namespace          ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_namespace, $ITEMRESERVA ] );}
        | tk_parent             ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_parent, $ITEMRESERVA ] );}
        | tk_preceding          ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_preceding, $ITEMRESERVA ] );}
        | tk_preceding_sibling  ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_preceding_sibling, $ITEMRESERVA ] );}
        | tk_self               ITEMRESERVA  {$$= new Nodo("Porduccion","RESERVA",[$tk_self, $ITEMRESERVA ] );}
        | tk_node tk_parentesis_izq tk_parentesis_der  {$$= new Nodo("Porduccion","RESERVA",[$tk_node, $tk_parentesis_izq, $tk_parentesis_der ] );}
        | tk_last tk_parentesis_izq tk_parentesis_der  {$$= new Nodo("Porduccion","RESERVA",[$tk_last, $tk_parentesis_izq, $tk_parentesis_der ] );}
        | tk_position tk_parentesis_izq tk_parentesis_der {$$= new Nodo("Porduccion","RESERVA",[$tk_position, $tk_parentesis_izq, $tk_parentesis_der ] );}
        | tk_text tk_parentesis_izq tk_parentesis_der {$$= new Nodo("Porduccion","RESERVA",[$tk_text, $tk_parentesis_izq, $tk_parentesis_der ] );}
        ;

RESERVA_P:
        EXPRESIONXPA                                                                 {$$= $EXPRESIONXPA;}
        |                                                                         {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );} 
;

PRODUCT:
        tk_diagonal                                                               {$$= new Nodo("Porduccion","PRODUCT",[$tk_diagonal ] );}       
        |tk_diagonal_doble                                                        {$$= new Nodo("Porduccion","PRODUCT",[$tk_diagonal_doble ] );}
;

ARROPROD:
        tk_asterisco                                                              {$$= new Nodo("Porduccion","ARROPROD",[$tk_asterisco ] );}
        |tk_identificador                                                         {$$= new Nodo("Porduccion","ARROPROD",[$tk_identificador ] );}
;

CONTENIDOXPA:
         tk_identificador                                                         {$$= new Nodo("Porduccion","CONTENIDOXPA",[$tk_identificador ] );}
;

CONTENIDODOS:
         tk_arroba ARROPROD                                     {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_arroba, $ARROPROD] );}
         |tk_identificador                                      {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_identificador] );}
         |tk_asterisco                                          {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_asterisco] );}        
         | tk_puntos_seguidos                                   {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_puntos_seguidos] );}
         | RESERVA                                              {$$= new Nodo("Porduccion","CONTENIDODOS",[ $RESERVA] );}
;

CONTENIDO_P:
        EXPRESIONXPA                                               {$$= $EXPRESIONXPA;}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

CAJETIN:
        tk_corchete_izq PREDICADO tk_corchete_der               {$$= new Nodo("Porduccion","CAJETIN",[$tk_corchete_izq, $PREDICADO, $tk_corchete_der ] );}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

PREDICADO:
        DATO                                                  {$$= $DATO;}
;

DATO:
         tk_numero                                               {$$= $tk_numero;}   
        |tk_identificador                                        {$$= new Nodo("Porduccion","ID",[$tk_identificador]);}
        |tk_hilera                                               {$$= new Nodo("Porduccion","CADENA",[$tk_hilera.slice(1,-1)]);}
        |tk_arroba tk_identificador                              {$$= new Nodo("Porduccion","ATRIBUTO",[$tk_identificador]);}
        |tk_last tk_parentesis_izq tk_parentesis_der             {$$= new Nodo("Porduccion","LAST",[]);} 
        |DATO tk_mas DATO                                        {$$= new Nodo("Porduccion","SUM",[$1,$tk_mas,$3]);}  
        |DATO tk_menos DATO                                      {$$= new Nodo("Porduccion","RES",[ $1,$2,$3]);} 
        |DATO tk_asterisco DATO                                  {$$= new Nodo("Porduccion","MUL",[ $1,$2,$3]);} 
        |DATO tk_div DATO                                        {$$= new Nodo("Porduccion","DIV",[ $1,$2,$3]);}
        |DATO tk_igual DATO                                      {$$= new Nodo("Porduccion","IGUAL",[ $1,$2,$3]);}
        |tk_menos DATO %prec UMENOS		                 {$$= new Nodo("Porduccion","NEG",[ $1,$2]); }
;

OPERACIONES:
        ITEMINICIO OPERADOR ITEMFINAL OPERACIONES_L             {$$= new Nodo("Porduccion","OPERACIONES",[$ITEMINICIO, $OPERADOR, $ITEMFINAL, $OPERACIONES_L ] );}
        | ITEMINICIO                                            {$$= new Nodo("Porduccion","OPERACIONES",[$ITEMINICIO ] );}
;

ITEMINICIO:
          RESERVA                                               {$$= $RESERVA;}
        | tk_identificador                                      {$$= new Nodo("Porduccion","ITEMINICIO",[$tk_identificador ] );}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","ITEMINICIO",[$tk_arroba, $ARROPROD ] );}
        | tk_numero                                             {$$= new Nodo("Porduccion","ITEMINICIO",[$tk_numero ] );}
        | tk_punto                                              {$$= new Nodo("Porduccion","ITEMINICIO",[$tk_punto ] );}
;

OPERADOR:
        tk_mas                                                  {$$= new Nodo("Porduccion","OPERADOR",[$tk_mas ] );}
        | tk_menos                                              {$$= new Nodo("Porduccion","OPERADOR",[$tk_menos ] );}        
        | tk_asterisco                                          {$$= new Nodo("Porduccion","OPERADOR",[$tk_asterisco ] );}
        | tk_div                                                {$$= new Nodo("Porduccion","OPERADOR",[$tk_div ] );}        
        | tk_igual                                              {$$= new Nodo("Porduccion","OPERADOR",[$tk_igual ] );}
        | tk_indiferente                                        {$$= new Nodo("Porduccion","OPERADOR",[$tk_indiferente ] );}
        | tk_menor_igual                                        {$$= new Nodo("Porduccion","OPERADOR",[$tk_menor_igual ] );}
        | tk_menor                                              {$$= new Nodo("Porduccion","OPERADOR",[$tk_menor ] );}
        | tk_mayor_igual                                        {$$= new Nodo("Porduccion","OPERADOR",[$tk_mayor_igual ] );}
        | tk_mayor                                              {$$= new Nodo("Porduccion","OPERADOR",[$tk_mayor ] );}
        | tk_mod                                                {$$= new Nodo("Porduccion","OPERADOR",[$tk_mod ] );}
        ;

ITEMFINAL:
          RESERVA                                               {$$= $RESERVA;}
        | tk_caracter                                           {$$= new Nodo("Porduccion","ITEMFINAL",[ $tk_caracter] );}}
        | tk_hilera                                             {$$= new Nodo("Porduccion","ITEMFINAL",[ $tk_hilera.slice(1,-1)] );}}
        | tk_identificador                                      {$$= new Nodo("Porduccion","ITEMFINAL",[ $tk_identificador] );}}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","ITEMFINAL",[ $tk_arroba, $ARROPROD] );}}
        | tk_numero                                             {$$= new Nodo("Porduccion","ITEMFINAL",[ $tk_numero] );}}
;

OPERACIONES_L:
          tk_or OPERACIONES                                     {$$= new Nodo("Porduccion","OPERACIONES_L",[ $tk_or, $OPERACIONES] );}
        | tk_and OPERACIONES                                    {$$= new Nodo("Porduccion","OPERACIONES_L",[ $tk_and, $OPERACIONES] );}
        | OPERADOR ITEMFINAL   OPERACIONES_L                    {$$= new Nodo("Porduccion","OPERACIONES_L",[ $OPERADOR, $ITEMFINAL, $OPERACIONES_L] );}        
        |                                                       {$$= new Nodo("Porduccion","OPERACIONES_L",[ "ε" ] );}
;

ITEMRESERVA:
        tk_cuatro_puntos SIMBOLOSTERC                           {$$= new Nodo("Porduccion","ITEMRESERVA",[ $tk_cuatro_puntos, $SIMBOLOSTERC] );}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;       

SIMBOLOSTERC:
          tk_identificador                                      {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_identificador] );}
        | tk_asterisco                                          {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_asterisco] );}
        | RESERVA                                               {$$= $RESERVA;}
        | tk_diagonal CONTENIDODOS                              {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_diagonal, $CONTENIDODOS] );}
        | tk_diagonal_doble CONTENIDODOS                        {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_diagonal_doble, $CONTENIDODOS]);}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_arroba, $ARROPROD] );}
        | tk_puntos_seguidos                                    {$$= new Nodo("Porduccion","SIMBOLOSTERC",[ $tk_puntos_seguidos] );}
;
