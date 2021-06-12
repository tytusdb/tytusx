%{
    
   
%}

// ===================================== ANALISIS LEXICO ==============================================
%lex
%options case-sensitive
%%

// EXPRESIONES A OMITIR
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\n\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}

// COMENTARIOS
// ---- AQUI

[<][!][-][-]+[^-]*([-][-])+[>]              //comentario
// PALABRAS RESERVADAS

// SIMBOLOS

"<?xml version"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return "tk_inicio_prologo";%}
"?>"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_fin_prologo';%}
"encoding"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_encoding';%}
"standalone"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_standalone';%}

"</"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_abre_dos';%}
"/>"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cierra_dos';%}
"<"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_abre';%}
">"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cierra';%}

"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}

// EXP.REGULARES
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
<<EOF>>                                     %{ return "EOF"; %}
[a-zA-Z_\u00F1\u00D1]([a-zA-Z\-\.\u00F1\u00D10-9_])*                     %{ listaTokens.push(new Token("Etiqueta", yytext, yylloc.first_line, yylloc.first_column)); return "tk_etiqueta";%}
[a-zA-Z_\u00F1\u00D1]([a-zA-Z\-\.\u00F1\u00D10-9_])*                     %{ listaTokens.push(new Token("Atributo", yytext, yylloc.first_line, yylloc.first_column)); return "tk_atributo";%}
[^\<\>\=\/\&\t]*                                 %{ listaTokens.push(new Token("Datos", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_datos";%}


// FIN DEL ARCHIVO


// ERRORES LEXICOS
.                                           %{ listaErrores.push(new Token("ERROR LEXICO", yytext, yylloc.first_line, yylloc.first_column )); %}

/lex

// ===================================== ANALISIS SINTACTICO ==============================================


// DEFINIMOS PRODUCCIÓN INICIAL
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO
%%
//GRAMATICA RECURSIVA POR LA DERECHA
/* Definición de la gramática */
INICIO: PROLOGO EOF;

PROLOGO
    :tk_inicio_prologo VERSION CODIFICACION DEPENDENCIA tk_fin_prologo RAIZ
    |RAIZ                                                                                               {return $RAIZ}
;

VERSION
    :tk_igual tk_hilera;

CODIFICACION
    :tk_encoding tk_igual tk_hilera
    |;

DEPENDENCIA
    :tk_standalone tk_igual tk_hilera
    |;

RAIZ
    :tk_abre tk_etiqueta ATRIBUTO tk_cierra EXPRESION DATA tk_abre_dos tk_etiqueta tk_cierra               {$EXPRESION.unshift(new Nodo(Expresion.Etiqueta, $tk_etiqueta,$DATA)); $$ = $EXPRESION;}     
;

EXPRESION
    :tk_abre tk_etiqueta ATRIBUTO tk_cierra EXPRESION DATA tk_abre_dos tk_etiqueta tk_cierra EXPREDOS       {$EXPRESION.unshift(new Nodo(Expresion.Etiqueta, $tk_etiqueta,$DATA)); $$ = $EXPRESION;}//tipo, valor,hijos
    |tk_abre tk_etiqueta ATRIBUTO tk_cierra_dos EXPRESION
    |                                                                                                       {$$=[]}
;

DATA
    :tk_datos DATA      {$2.unshift(new Token(Dato.ID, $tk_datos,this._$.first_line-1,this._$.first_column)); $$ = $2;}
    |tk_etiqueta DATA   {$2.unshift(new Token(Dato.ID, $tk_etiqueta,this._$.first_line-1,this._$.first_column)); $$ = $2;}
    |                   {$$=[]}
;

ATRIBUTO
    :tk_atributo tk_igual tk_hilera ATRIBUTO
    |;

EXPREDOS
    : tk_abre tk_etiqueta ATRIBUTO tk_cierra EXPRESION DATA tk_abre_dos tk_etiqueta tk_cierra EXPREDOS
    | tk_abre tk_etiqueta ATRIBUTO tk_cierra_dos EXPRESION
    |;

