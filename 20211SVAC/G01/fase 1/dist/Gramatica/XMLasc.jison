%{
    
    let listaTokens = [];
    
    let nodoPadre;
    let g1 = ' ';
    
    let g2 = ' ';

    let encoding = ' ';    

    let checktag = [];
    let listaErrores = [];
%}

// lexico
%lex
%options case-sensitive
%%

// ignorar
\s+                                         %{ /* blankspace */ %}
[\t\r]+                                     %{ /* saltos de línea*/ %}

// comentarios
[<][!][-][-][^>]*[-][-]+[>]                        {}


// reservadas

"<?xml version"                     %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return "token_iniciocomienzo";%}
"?>"                                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'token_ifincomienzo';%}
"encoding"                          %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'token_encoding';%}
"standalone"                        %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'token_standalone';%}


// SIMBOLOS
"</"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'token_abrir_dos';%}
"/>"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'token_cerrar_dos';%}
"<"                    %{ listaTokens.push(new Token("Abre", yytext, yylloc.first_line, yylloc.first_column)); return 'token_abrir';%}
">"                    %{ listaTokens.push(new Token("Cierra", yytext, yylloc.first_line, yylloc.first_column)); return 'token_cerrar';%}
"&lt;"                    %{ listaTokens.push(new Token("PPmenor", yytext, yylloc.first_line, yylloc.first_column)); return 'token_menorq';%}
"&gt;"                    %{ listaTokens.push(new Token("PPmayor", yytext, yylloc.first_line, yylloc.first_column)); return 'token_mayorq';%}
"&amp;"                    %{ listaTokens.push(new Token("PPampersand", yytext, yylloc.first_line, yylloc.first_column)); return 'token_amperson';%}
"&apos;"                    %{ listaTokens.push(new Token("PPapostrofe", yytext, yylloc.first_line, yylloc.first_column)); return 'token_apostro';%}
"&quot;"                    %{ listaTokens.push(new Token("PPcomillas", yytext, yylloc.first_line, yylloc.first_column)); return 'token_comilla';%}

"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'token_igual';%}


// regexp
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "token_enlista";%}
<<EOF>>                                     %{ return "EOF"; %}
[a-zA-Z_À-ÿ\u00F1\u00D1]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*                     %{ listaTokens.push(new Token("Etiqueta", yytext, yylloc.first_line, yylloc.first_column)); return "token_etiqueta";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "token_numero";%}


<<EOF>>                                     %{ return "EOF"; %}

//errores lexicos
.                                           %{ listaErrores.push(new TokenError("XML",'Error Lexico ' , "Caracter desconocido " + yytext ,  yylloc.first_line, yylloc.first_column )); %}


/lex

// sintac

%start START 
%%


START: COMIENZO EOF {


    g2 = `Iniciado\n Start   -> P EOF \n` + g2;
    g1 = `Producción: \n<START> := <COMIENZO> <EOF> \n` + g1;
 
    return {
        "json": $1,
        "g2": g2,
        "g1": g1,
        "listaErrores": listaErrores,
        "encoding": encoding
    };
};

COMIENZO
    : token_iniciocomienzo VERSION CODING DEPENDENCIA token_ifincomienzo RAIZ {
        $$ = $6;
        g2 = `COMIENZO.VAL -> prologo.lexval VERSION.VAL CODING.VAL DEPENDENCIA.VAL prologof.lexval RAIZ.VAL \n` + g2;
        g1 = `<COMIENZO> := ${$1} <VERSION> <CODING> <DEPENDENCIA> ${$5} <RAIZ> \n` + g1;
    }
    | RAIZ {
        $$ = $1;
        g2 = `COMIENZO.VAL -> RAIZ.VAL \n` + g2;
        g1 = `<COMIENZO> := <RAIZ> \n` + g1;
    }
;

VERSION
    :token_igual token_enlista {
        g2 = `VERSION.VAL -> igual.lexval cadena.lexval \n` + g2;
        g1 = `<VERSION> := ${$1} ${$2} \n` + g1;
    }
;

CODING
    :token_encoding token_igual token_enlista {
        g2 = `CODING.VAL -> encoding.lexval igual.lexval cadena.lexval \n` + g2;
        g1 = `<CODING> := ${$1} ${$2} ${$3} \n` + g1;
        encoding = `${$3}`.replaceAll("\"", ' ');
    }
    | {
        g2 = `CODING.VAL -> ε \n` + g2;
        g1 = `<CODING> := ε \n` + g1;
    };

DEPENDENCIA
    :token_standalone token_igual token_enlista {
        g2 = `DEPENDENCIA.VAL -> standalone.lexval igual.lexval cadena.lexval\n` + g2;
        g1 = `<DEPENDENCIA> := ${$1} ${$2} ${$3} \n` + g1;
    }
    |{
        g2 = `DEPENDENCIA.VAL -> ε \n` + g2;
        g1 = `<DEPENDENCIA> := ε \n` + g1;
    };

RAIZ
    :ETIQUETA {
        $$ = $1;
        nodoPadre = new Nodo("RAIZ","RAIZ");
        nodoPadre.addHoja($1['nodo']);

        $$['nodo'] = nodoPadre;

        g2 = `RIAZ.VAL -> ETIQUETA.VAL \n` + g2;
        g1 = `<RAIZ> := <ETIQUETA> \n` + g1;
    }
;

ETIQUETA
    : ETIQUETA_UNICA {
        $$ = $1;

        nodoPadre = new Nodo("ETIQUETA","ETIQUETA");
        nodoPadre.addHoja($1['nodo']);

        $$['nodo'] = nodoPadre;

        g2 = `ETIQUETA.VAL -> ETIQUETA_UNICA.VAL\n` + g2;
        g1 = `<ETIQUETA> := <ETIQUETA_UNICA> \n` + g1;
    }
    | APERTURA CONTENIDO CIERRE {
        $$ = $1;
        $$["texto"] = $2["texto"];
        $$["hijos"] = $2["hijos"];

        nodoPadre = new Nodo("ETIQUETA","ETIQUETA");
        nodoPadre.addHoja($1['nodo']);

        if($2) {
            nodoPadre.addHoja($2['nodo']);
        }

        nodoPadre.addHoja($3['nodo']);

        $$['nodo'] = nodoPadre;
        g2 = `ETIQUETA.VAL -> APERTURA.VAL CONTENIDO.VAL CIERRE.VAL\n` + g2;
        g1 = `<ETIQUETA> := <APERTURA> <CONTENIDO> <CIERRE> \n` + g1;
    }
        | error token_cerrar
        {
            listaErrores.push(new TokenError("XML",'Este es un error sintáctico: ' , "Me recupero con: " + yytext , @1.first_line, @2.first_column ));
            
        }
;


ETIQUETA_UNICA
    : token_abrir token_etiqueta ATRIBUTOS token_cerrar_dos {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "unica";
        $$["atributos"] = [];
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;    

        nodoPadre = new Nodo("ETIQUETA UNICA","ETIQUETA UNICA");
        nodoPadre.addHoja(new Nodo("APERTURA", $1));
        nodoPadre.addHoja(new Nodo("ETIQUETA", $2));
        if ($3) {
            $$['atributos'] = $3['atributos'];
            nodoPadre.addHoja($3['nodo']);
        }
        nodoPadre.addHoja(new Nodo("CIERRE", $4));

        $$['nodo'] = nodoPadre;
        g2 = `ETIQUETA_UNICA.VAL -> abre.lexval etiqueta.lexval ATRIBUTOS.VAL cierra_dos.lexval\n` + g2;
        g1 = `<ETIQUETA_UNICA> := ${$1} ${$2} <ATRIBUTOS> ${$4} \n` + g1;
    }
;

APERTURA
    : token_abrir token_etiqueta ATRIBUTOS token_cerrar {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "completa";
        $$["atributos"] = [];
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

        nodoPadre = new Nodo('ETIQUETA COMPLETA', 'ETIQUETA COMPLETA');
        nodoPadre.addHoja(new Nodo("APERTURA",$1));
        nodoPadre.addHoja(new Nodo("ETIQUETA", $2));

        if($3) {
            $$['atributos'] = $3['atributos'];
            nodoPadre.addHoja($3['nodo']);
        } 

        nodoPadre.addHoja(new Nodo("CIERRE",$4));

        $$['nodo'] = nodoPadre;

        g2 = `APERTURA.VAL -> abre.lexval etiqueta.lexval ATRIBUTOS.VAL cierra.lexval\n` + g2;
        g1 = `<APERTURA> := ${$1} ${$2} <ATRIBUTOS> ${$4} \n` + g1;

        checktag.push(new Token("ETIQUETA",$2 , @2.first_line, @2.first_column ));
    }
;

ATRIBUTOS
    : ATRIBUTO ATRIBUTOS {
        nodoPadre = new Nodo("ATRIBUTOS", "ATRIBUTOS");
        nodoPadre.addHoja($1['nodo']);
        if ($2 && $2['nodo']) {
            nodoPadre.addHoja($2['nodo']);
        }

        $$ = {
            'atributos': [$1]
        }

        if ($2) {
            $2['atributos'].forEach(atributo => {
                $$['atributos'].push(atributo);
            });
        }

        $$['nodo'] = nodoPadre;
        g2 = `ATRIBUTOS.VAL -> ATRIBUTO.VAL ATRIBUTOS.VAL \n` + g2;
        g1 = `<ATRIBUTOS> := <ATRIBUTO> <ATRIBUTOS> \n` + g1;
    }
    | {
        g2 = `ATRIBUTOS.VAL -> ε \n` + g2;
        g1 = `<ATRIBUTOS> := ε \n` + g1;
    }
;

ATRIBUTO
    : token_etiqueta token_igual token_enlista {
        nodoPadre = new Nodo("ATRIBUTO", "ATRIBUTO");
        nodoPadre.addHoja(new Nodo("ETIQUETA", $1));    
        nodoPadre.addHoja(new Nodo("IGUAL", $2));    
        nodoPadre.addHoja(new Nodo("VALOR", $3.replaceAll('"','')));
        
        $$ = {};
        $$["valorAtributo"] = $3.replaceAll('"','');
        $$["nombreAtributo"]=$1;
        $$["tipo"] = "atributo";
        $$["linea"] = @1.first_line;
        $$["columna"] = @1.first_column;

        $$["nodo"] = nodoPadre;
         
        g2 = `ATRIBUTO.VAL -> etiqueta.lexval igual.lexval cadena.lexval \n` + g2;
        g1 = `<ATRIBUTO> := ${$1} ${$2} ${$3} \n` + g1;

    }
;

CONTENIDO
    : token_etiqueta CONTENIDO  {
        nodoPadre = new Nodo("CONTENIDO", "CONTENIDO");
        nodoPadre.addHoja(new Nodo('ETIQUETA', $1));
        if ($2 && $2['nodo']) {
            nodoPadre.addHoja($2['nodo']);
        }

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

        $$['nodo'] = nodoPadre
        g2 = `CONTENIDO.VAL -> etiqueta.lexval CONTENIDO.VAL \n` + g2;
        g1 = ` <CONTENIDO> := ${$1} <CONTENIDO> \n` + g1;
    }
    | token_numero CONTENIDO {
        nodoPadre = new Nodo("CONTENIDO", "CONTENIDO");
        nodoPadre.addHoja(new Nodo('NUMERO', $1));
        if ($2 && $2['nodo']) {
            nodoPadre.addHoja($2['nodo']);
        }
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

        $$['nodo'] = nodoPadre;

        g2 = `CONTENIDO.VAL -> numero.lexval CONTENIDO.VAL \n` + g2;
        g1 = `<CONTENIDO> := ${$1} <CONTENIDO> \n` + g1;

    }
    | ETIQUETA CONTENIDO {
        nodoPadre = new Nodo("CONTENIDO", "CONTENIDO");
        nodoPadre.addHoja($1['nodo']);
        if ($2 && $2['nodo']) {
            nodoPadre.addHoja($2['nodo']);
        }
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

        $$['nodo'] = nodoPadre

        g2 = `CONTENIDO.VAL -> ETIQUETA.VAL CONTENIDO.VAL \n` + g2;
        g1 = `<CONTENIDO> := <ETIQUETA> <CONTENIDO> \n` + g1;
    }
    | CHAR_DISTINTO CONTENIDO {
        nodoPadre = new Nodo("CONTENIDO", "CONTENIDO");
        nodoPadre.addHoja(new Nodo('CARACTER', $1));
        if ($2 && $2['nodo']) {
            nodoPadre.addHoja($2['nodo']);
        }

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

        $$['nodo'] = nodoPadre;

        g2 = `CONTENIDO.VAL  -> CHAR_DISTINTO.VAL CONTENIDO.VAL \n` + g2;
        g1 = `<CONTENIDO> := ${$1} <CONTENIDO> \n` + g1;

    } 
    | 
;

CHAR_DISTINTO
        : token_menorq {
            $$ = "<";
            g2 = `CHAR_DISTINTO.VAL -> less.lexval \n` + g2;
            g1 = `<CARAESPECIAL> := ${$1} \n` + g1;
        }
        | token_mayorq {
            $$ = ">";
            g2 = `CHAR_DISTINTO.VAL -> great.lexval\n` + g2;
            g1 = `<CARAESPECIAL> := ${$1} \n` + g1;
        }
        | token_amperson {
            $$ = "&";
            g2 = `CHAR_DISTINTO.VAL -> amper.lexval \n` + g2;
            g1 = `<CARAESPECIAL> := ${$1} \n` + g1;
        }
        | token_apostro {
            $$ = "'";
            g2 = `CHAR_DISTINTO.VAL -> apostro.lexval\n` + g2;
            g1 = `<CARAESPECIAL> := ${$1} \n` + g1;
        }
        | token_comilla {
            $$ = '"';
            g2 = `CHAR_DISTINTO.VAL -> quota.lexval\n` + g2;
            g1 = `<CARAESPECIAL> := ${$1} \n` + g1;
        }
        ;

CIERRE
    : token_abrir_dos token_etiqueta token_cerrar {
        $$ = {}
        nodoPadre = new Nodo("CIERRE", "CIERRE");
        nodoPadre.addHoja(new Nodo("APERTURA", $1));
        nodoPadre.addHoja(new Nodo("ETIQUETA", $2));
        nodoPadre.addHoja(new Nodo("CIERRE", $3));

        $$['nodo'] = nodoPadre;

        g2 = `CIERRE.VAL -> abre.lexval etiqueta.lexval cierra.lexval \n` + g2;
        g1 = `<CIERRE> := ${$1} ${$2} ${$3} \n` + g1;

        let etiqueta = checktag.pop();
        if (etiqueta.lexema === $2) {
        } else {
            listaErrores.push(new TokenError("XML", "Semantico", `Se abrio la etiqueta ${etiqueta.lexema} en la linea ${etiqueta.linea} y se esta cerrando con ${$2} en la linea ${@2.first_line}` , @2.first_line, @2.first_column ));
        }
    }
;




