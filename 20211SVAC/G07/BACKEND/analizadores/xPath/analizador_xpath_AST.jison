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
        ELEMENTO EOF                                            {return $ELEMENTO;}          //constructor(tipo, valor,hijos)                         
;                                          

ELEMENTO:
     EXPRESION ELEMENTO_P                                       {$$= new Nodo("Porduccion","ELEMENTO",[ $EXPRESION ,$ELEMENTO_P] );}
;  

ELEMENTO_P:
         tk_barra_or EXPRESION ELEMENTO_P                       {$$= new Nodo("Porduccion","ELEMENTO_P",[ $tk_barra_or ,$EXPRESION,$ELEMENTO_P] );}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

EXPRESION:
          RESERVA RESERVA_P                                      {$$= new Nodo("Porduccion","EXPRESION",[ $RESERVA ,$RESERVA_P] );}
        | SIMBOLOS CAJETIN SIMBOLOS_P                            {$$= new Nodo("Porduccion","EXPRESION",[ $SIMBOLOS, $CAJETIN ,$SIMBOLOS_P] );}
        | tk_identificador CAJETIN  SIMBOLOSSECU SIMBOLOSSECU_P  {$$= new Nodo("Porduccion","EXPRESION",[ $tk_identificador ,$CAJETIN, $SIMBOLOSSECU, $SIMBOLOSSECU_P] );}
        | tk_identificador                                       {$$= new Nodo("Porduccion","EXPRESION",[ $tk_identificador ] );} 
        | tk_asterisco CAJETIN                                   {$$= new Nodo("Porduccion","EXPRESION",[ $tk_asterisco, $CAJETIN ] );} 
;

SIMBOLOS:
          tk_diagonal CONTENIDODOS                              {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_diagonal ,$CONTENIDODOS] );}
        | tk_diagonal_doble CONTENIDODOS                        {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_diagonal_doble ,$CONTENIDODOS] );}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_arroba,$ARROPROD ] );}
        | tk_puntos_seguidos PRODUCT CONTENIDODOS               {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_puntos_seguidos, $PRODUCT ,$CONTENIDODOS] );}
        | tk_punto PRODUCT CONTENIDODOS                         {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_punto,$PRODUCT ,$CONTENIDODOS] );}
        | tk_asterisco CONTENIDO                                {$$= new Nodo("Porduccion","SIMBOLOS",[ $tk_asterisco ,$CONTENIDO] );}
;

SIMBOLOS_P:
         EXPRESION                                              {$$= $EXPRESION;}                             
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}       
;

SIMBOLOSSECU:
          tk_diagonal CONTENIDODOS                              {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_diagonal, $CONTENIDODOS ] );}
        | tk_diagonal_doble CONTENIDODOS                        {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_diagonal_doble, $CONTENIDODOS ] );}
        | tk_arroba ARROPROD                                    {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_arroba, $ARROPROD ] );}
        | tk_puntos_seguidos                                    {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_puntos_seguidos ] );}
        | tk_asterisco CONTENIDO                                {$$= new Nodo("Porduccion","SIMBOLOSSECU",[ $tk_asterisco, $CONTENIDO ] );}
        ;

SIMBOLOSSECU_P:
         EXPRESION                                              {$$= $EXPRESION;}                             
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
        EXPRESION                                                                 {$$= $EXPRESION;}
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

CONTENIDO:
         tk_identificador                                                         {$$= new Nodo("Porduccion","CONTENIDO",[$tk_identificador ] );}
;

CONTENIDODOS:
         tk_arroba ARROPROD                                     {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_arroba, $ARROPROD] );}
         |tk_identificador                                      {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_identificador] );}
         |tk_asterisco                                          {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_asterisco] );}        
         | tk_puntos_seguidos                                   {$$= new Nodo("Porduccion","CONTENIDODOS",[ $tk_puntos_seguidos] );}
         | RESERVA                                              {$$= new Nodo("Porduccion","CONTENIDODOS",[ $RESERVA] );}
;

CONTENIDO_P:
        EXPRESION                                               {$$= $EXPRESION;}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

CAJETIN:
        tk_corchete_izq PREDICADO tk_corchete_der               {$$= new Nodo("Porduccion","CAJETIN",[$tk_corchete_izq, $PREDICADO, $tk_corchete_der ] );}
        |                                                       {$$= new Nodo("Porduccion","ITEMRESERVA",[ "ε" ] );}
;

PREDICADO:
          OPERACIONES                                           {$$= $OPERACIONES;}
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


//gramatica recursiva por la derecha decendete
