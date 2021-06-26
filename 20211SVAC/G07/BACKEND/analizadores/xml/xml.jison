%{  
    let contador = 0;
    let tablaSimbolos = []
    let entorno = "global";
%}

// ===================================== ANALISIS LEXICO ==============================================
%lex
%options case-sensitive
%%

// EXPRESIONES A OMITIR
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}

// COMENTARIOS <!-------Your comment----->
[<][!][-][-][^>]*[-][-]+[>]                        {}


// PALABRAS RESERVADAS

"<?xml version"                     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return "tk_inicio_prologo";%}
"?>"                                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_fin_prologo';%}
"encoding"                          %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_encoding';%}
"standalone"                        %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_standalone';%}


// SIMBOLOS
"</"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_abre_dos';%}
"/>"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cierra_dos';%}
"<"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_abre';%}
">"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_cierra';%}

"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}


// EXP.REGULARES
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
<<EOF>>                                     %{ return "EOF"; %}
[a-zA-Z_\u00F1\u00D1]([a-zA-Z\-\.\u00F1\u00D10-9_])*                     %{ listaTokens.push(new Token("Etiqueta", yytext, yylloc.first_line, yylloc.first_column)); return "tk_etiqueta";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_numero";%}


// FIN DEL ARCHIVO
<<EOF>>                                     %{ return "EOF"; %}

// ERRORES LEXICOS
.                                           %{ listaErrores.push(new Token("ERROR LEXICO", yytext, yylloc.first_line, yylloc.first_column )); %}

/lex

// ===================================== ANALISIS SINTACTICO ==============================================


//GRAMATICA RECURSIVA POR LA IZQUIERDA

// DEFINIMOS PRODUCCIÓN INICIAL
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO 
%%


/* Definición de la gramática */
INICIO: ETIQUETA EOF {
    console.log("TOMA");
    console.log($1);
    console.log(JSON.stringify($1));

    return $1;

};

ETIQUETA
    : ETIQUETA_UNICA {
        $$ = $1;
    }
    | APERTURA CONTENIDO CIERRE {
        $$ = $1;
        $$["texto"] = $2["texto"];
        $$["hijos"] = $2["hijos"];
    }
;

ETIQUETA_UNICA
    : tk_abre tk_etiqueta ATRIBUTOS tk_cierra_dos {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "unica";
        $$["atributos"] = $3;
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

    }
    |tk_abre tk_numero ATRIBUTOS tk_cierra_dos {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "unica";
        $$["atributos"] = $3;
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

    }
;

APERTURA
    : tk_abre tk_etiqueta ATRIBUTOS tk_cierra {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "completa";
        $$["atributos"] = $3;
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

    }
    |tk_abre tk_numero ATRIBUTOS tk_cierra {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "completa";
        $$["atributos"] = $3;
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

    }
;

ATRIBUTOS
    : ATRIBUTO ATRIBUTOS {
        if ($2) {
            for(let key in $2) {
                $1[key] = $2[key];
            }
        }
        $$ = $1;
    }
    | 
;

ATRIBUTO
    : tk_etiqueta tk_igual tk_hilera {
        $$ = {};
        $$[$1] = $3.replaceAll('"','');
        $$["tipo"] = "atributo";
        $$["linea"] = @1.first_line;
        $$["columna"] = @1.first_column;

    }
    | tk_numero tk_igual tk_hilera {
        $$ = {};
        $$[$1] = $3.replaceAll('"','');
        $$["tipo"] = "atributo";
        $$["linea"] = @1.first_line;
        $$["columna"] = @1.first_column;

    }
;

CONTENIDO
    : tk_etiqueta CONTENIDO {
        $$ = {}
        $$["hijos"] = [];
        $$["texto"] = $1;


        if ($2) {           
            if ($2["hijos"].length > 0) {
                $2["hijos"].forEach(hijo => {
                    $$["hijos"].push(hijo);
                });
            }

            if ($2["texto"] !== "" || $2["texto"] !== " ") {
                $$["texto"] += " " + $2["texto"];
            }
        }
    }
    |tk_numero CONTENIDO {
        $$ = {}
        $$["hijos"] = [];
        $$["texto"] = $1;


        if ($2) {           
            if ($2["hijos"].length > 0) {
                $2["hijos"].forEach(hijo => {
                    $$["hijos"].push(hijo);
                });
            }

            if ($2["texto"] !== "" || $2["texto"] !== " ") {
                $$["texto"] += " " + $2["texto"];
            }
        }
    }
    | ETIQUETA CONTENIDO {
        
        $$ = {};
        $$["texto"] = "";
        $$["hijos"] = [$1];

        if ($2) {           
            if ($2["hijos"].length > 0) {
                $2["hijos"].forEach(hijo => {
                    $$["hijos"].push(hijo);
                });
            }

            if ($2["texto"] !== "" || $2["texto"] !== " ") {
                $$["texto"] += " " + $2["texto"];
            }
        }

    }
    | 
;


CIERRE
    : tk_abre_dos tk_etiqueta tk_cierra
    | tk_abre_dos tk_numero tk_cierra
;






//Gramatica por la derecha Decendente


//Acendente tiene que ser lo la izquierda




