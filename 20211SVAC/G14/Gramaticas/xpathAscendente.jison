%{
    var Tokens = [];   
    var Auxi = []; 
%}
%lex

%options case-insensitive

%%
\s+                                         /* skip whitespace */
"text"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_TEXT'; }
"node"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_NODE'; }
"last"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_LAST'; }
"position"                      { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_POSITION'; }
"or"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_OR'; }
"and"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_AND'; }
"div"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DIV'; }
"mod"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_MOD'; }
"child"                         { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_CHILD'; }
"descendant-or-self"            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DESCENDANT_OR_SELF'; }
"descendant"                    { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DESCENDANT'; }
"attribute"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ATTRIBUTE'; }
"self"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_SELF'; }
"following-sibling"             { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_FOLLOWING_SIBLING'; }
"namespace"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_NAMESPACE'; }
"following"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_FOLLOWING'; }
"parent"                        { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PARENT'; }
"ancestor-or-self"              { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ANCESTOR_OR_SELF'; }
"ancestor"                      { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ANCESTOR'; }
"preceding-sibling"             { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PRECEDING_SIBLING'; }
"preceding"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PRECEDING'; }
"("                             { Tokens.push(['paren. a.',     yytext, (yylineno + 1).toString()]); return 'PARENTESIS_ABRE'; }
")"                             { Tokens.push(['paren. c.',     yytext, (yylineno + 1).toString()]); return 'PARENTESIS_CIERRA'; }
"["                             { Tokens.push(['corch. a.',     yytext, (yylineno + 1).toString()]); return 'CORCHETE_ABRE'; }
"]"                             { Tokens.push(['corch. c.',     yytext, (yylineno + 1).toString()]); return 'CORCHETE_CIERRA'; }        
"<="                            { Tokens.push(['menor igual',   yytext, (yylineno + 1).toString()]); return 'LE'; }
">="                            { Tokens.push(['mayor igual',   yytext, (yylineno + 1).toString()]); return 'GE'; }
"<"                             { Tokens.push(['menor',         yytext, (yylineno + 1).toString()]); return 'LT'; }
">"                             { Tokens.push(['mayor',         yytext, (yylineno + 1).toString()]); return 'GT'; }
"="                             { Tokens.push(['igual',         yytext, (yylineno + 1).toString()]); return 'E'; }
"!="                            { Tokens.push(['distinto',      yytext, (yylineno + 1).toString()]); return 'NE'; }
"::"                            { Tokens.push(['acceso',        yytext, (yylineno + 1).toString()]); return 'ACCESO'; }
":"                             { Tokens.push(['acceso',         yytext, (yylineno + 1).toString()]); return 'SEPARADOR'; }
"@"                             { Tokens.push(['arroba',        yytext, (yylineno + 1).toString()]); return 'ARROBA'; }
".."                            { Tokens.push(['doble_punto',   yytext, (yylineno + 1).toString()]); return 'DPUNTO'; }
"."                             { Tokens.push(['punto',         yytext, (yylineno + 1).toString()]); return 'PUNTO'; }
"|"                             { Tokens.push(['union',         yytext, (yylineno + 1).toString()]); return 'UNION'; }
"*"                             { Tokens.push(['multi',         yytext, (yylineno + 1).toString()]); return 'MULTIPLICACION'; }
"//"                            { Tokens.push(['doble barra',   yytext, (yylineno + 1).toString()]); return 'DBARRA'; }
"/"                             { Tokens.push(['barra',         yytext, (yylineno + 1).toString()]); return 'BARRA'; }
"-"                             { Tokens.push(['menos',         yytext, (yylineno + 1).toString()]); return 'RESTA'; }
"+"                             { Tokens.push(['mas',           yytext, (yylineno + 1).toString()]); return 'SUMA'; }
(\"[^"]*\")                     { Tokens.push(['cadena',        yytext, (yylineno + 1).toString()]); return 'CADENA'; }
[\'][^\'\n][\']                 { Tokens.push(['caracter',      yytext, (yylineno + 1).toString()]); return 'CARACTER'; }
[0-9]+("."[0-9]+)               { Tokens.push(['decimal',       yytext, (yylineno + 1).toString()]); return 'DECIMAL'; }
[0-9]+                          { Tokens.push(['entero',        yytext, (yylineno + 1).toString()]); return 'ENTERO'; }
[A-Za-z][A-Za-z0-9_]*           { Tokens.push(['identificador', yytext, (yylineno + 1).toString()]); return 'IDENTIFICADOR'; }

<<EOF>>			    	return 'EOF';

/lex


%start INICIO
%%

INICIO:                 EXPRESION_SIMPLE EOF                           { Auxi = []; Auxi = Tokens; Tokens = []; return Auxi; }
;       

EXPRESION_SIMPLE:       EXPRESION_AND
        |               EXPRESION_SIMPLE R_OR EXPRESION_AND
;

EXPRESION_AND:          EXPRESION_COMPARAC
        |               EXPRESION_AND R_AND EXPRESION_COMPARAC
;

EXPRESION_COMPARAC:     EXPRESION_ADICION
        |               EXPRESION_ADICION OPERADORES_LOGICOS EXPRESION_ADICION
;

OPERADORES_LOGICOS:     E
        |               NE
        |               LT
        |               LE
        |               GT
        |               GE
;

EXPRESION_ADICION:      EXPRESION_MULTI
        |               EXPRESION_ADICION RESTA EXPRESION_MULTI
        |               EXPRESION_ADICION SUMA EXPRESION_MULTI
;

EXPRESION_MULTI:        EXPRESION_UNION
        |               EXPRESION_MULTI MULTIPLICACION EXPRESION_UNION
        |               EXPRESION_MULTI R_DIV EXPRESION_UNION
        |               EXPRESION_MULTI R_MOD EXPRESION_UNION
;

EXPRESION_UNION:        EXPRESION_UNARIA
        |               EXPRESION_UNION UNION EXPRESION_UNARIA
;

EXPRESION_UNARIA:       RUTA_RELATIVA
        |               SIMBOLO RUTA_RELATIVA
;
SIMBOLO:                SUMA
        |               RESTA
        |               SIMBOLO SUMA
        |               SIMBOLO RESTA
;

RUTA_RELATIVA:          DBARRA PASO 
        |               BARRA PASO
        |               PASO
        |               RUTA_RELATIVA BARRA PASO 
        |               RUTA_RELATIVA DBARRA PASO
;               

PASO:                   PASO_EJE
        |               POSTFIX
;       


PASO_EJE:               PASO_ADELANTE LISTA_PREDICADOS_AUX
        |               PASO_ATRAS LISTA_PREDICADOS_AUX
;
LISTA_PREDICADOS_AUX:   LISTA_PREDICADOS
        |               
;
LISTA_PREDICADOS:       PREDICADO
        |               LISTA_PREDICADOS PREDICADO
;

PREDICADO:              CORCHETE_ABRE EXPRESION_SIMPLE CORCHETE_CIERRA        
;

PASO_ADELANTE:          EJE_ADELANTE PRUEBA_NODO
        |               PASO_ADELANTE_ABREV
;

EJE_ADELANTE:           R_CHILD ACCESO
        |               R_DESCENDANT ACCESO
        |               R_ATTRIBUTE ACCESO
        |               R_SELF ACCESO
        |               R_DESCENDANT_OR_SELF ACCESO
        |               R_FOLLOWING_SIBLING ACCESO
        |               R_FOLLOWING ACCESO
        |               R_NAMESPACE ACCESO
;

PASO_ADELANTE_ABREV:    ARROBA PRUEBA_NODO                                                           
        |               PRUEBA_NODO                                                             
;

PASO_ATRAS:             EJE_ATRAS PRUEBA_NODO                                                                                                       
        |               PASO_ATRAS_ABREV                                                        
;

EJE_ATRAS:              R_PARENT ACCESO                                                     
        |               R_ANCESTOR ACCESO                                                   
        |               R_PRECEDING_SIBLING ACCESO                                                 
        |               R_PRECEDING ACCESO                                                  
        |               R_ANCESTOR_OR_SELF ACCESO                                                   
;

PASO_ATRAS_ABREV:       DPUNTO
;

PRUEBA_NODO:            NOMBRE_PRUEBA
        |               TIPO_PRUEBA
;

NOMBRE_PRUEBA:          Q_NAME
        |               WILDCARD
;

WILDCARD:               MULTIPLICACION
;       

Q_NAME:                 NOMBRE_PREFIJO 
        |               NOMBRE_SIN_PREFIJO
;
NOMBRE_PREFIJO:         NCNAME SEPARADOR NCNAME
;

NOMBRE_SIN_PREFIJO:     NCNAME
;

NCNAME:                 IDENTIFICADOR
;


TIPO_PRUEBA:            PRUEBA_TEXTO
        |               PRUEBA_NODE
        |               PRUEBA_POSICION
        |               PRUEBA_ULTIMO
;

PRUEBA_ULTIMO:          R_LAST PARENTESIS_ABRE PARENTESIS_CIERRA
;

PRUEBA_TEXTO:           R_TEXT PARENTESIS_ABRE PARENTESIS_CIERRA
;

PRUEBA_POSICION:        R_POSITION PARENTESIS_ABRE PARENTESIS_CIERRA
;

PRUEBA_NODE:            R_NODE PARENTESIS_ABRE PARENTESIS_CIERRA
;

POSTFIX:                EXPRESION_PRIMARIA 
        |               EXPRESION_PRIMARIA LISTA_PREDICADOS
;
EXPRESION_PRIMARIA:     LITERAL
        |               EXPRESION_PARENTESIS
;

EXPRESION_PARENTESIS:   PARENTESIS_ABRE PARENTESIS_CIERRA
        |               PARENTESIS_ABRE EXPRESION_SIMPLE PARENTESIS_CIERRA
;
LITERAL:                LITERAL_NUMERO 
        |               CADENA
;

LITERAL_NUMERO:        ENTERO   
	|               DECIMAL 
; 
