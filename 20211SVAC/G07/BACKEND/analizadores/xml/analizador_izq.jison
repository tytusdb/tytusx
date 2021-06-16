//GRAMATICA QUITADA LA RECURSIVIDAD POR LA DERECHA SIN CONTENIDO

%{
    
    let listaTokens = [];
    let listaErrores = [];
    let nodoPadre;
    let gramatical = ' ';
    let gramaticapp = ' ';
    let tipoencoding = ' ';

    let verificarEtiquetas = [];


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
"&lt;"                    %{ listaTokens.push(new Token("PPmenor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_less';%}
"&gt;"                    %{ listaTokens.push(new Token("PPmayor", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_great';%}
"&amp;"                    %{ listaTokens.push(new Token("PPampersand", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_amper';%}
"&apos;"                    %{ listaTokens.push(new Token("PPapostrofe", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_apostro';%}
"&quot;"                    %{ listaTokens.push(new Token("PPcomillas", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_quota';%}

"="                    %{ listaTokens.push(new Token("Igual", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}


// EXP.REGULARES
\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
<<EOF>>                                     %{ return "EOF"; %}
[a-zA-Z_À-ÿ\u00F1\u00D1]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*                     %{ listaTokens.push(new Token("Etiqueta", yytext, yylloc.first_line, yylloc.first_column)); return "tk_etiqueta";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_numero";%}


// FIN DEL ARCHIVO
<<EOF>>                                     %{ return "EOF"; %}

// ERRORES LEXICOS
.                                           %{ listaErrores.push(new TokenError("XML",'Error Lexico ' , "Caracter desconocido " + yytext ,  yylloc.first_line, yylloc.first_column )); %}

/lex

// ===================================== ANALISIS SINTACTICO ==============================================


//GRAMATICA RECURSIVA POR LA IZQUIERDA

// DEFINIMOS PRODUCCIÓN INICIAL
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO 
%%


/* Definición de la gramática */
INICIO: PROLOGO EOF {
    // REPORTE GRAMATICA
    gramaticapp = `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nI   -> P EOF \n` + gramaticapp;
    gramatical = `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n<INICIO> := <PROLOGO> <EOF>\n` + gramatical;
   

    return {
        "json": $1,
        "gramaticapp": gramaticapp,
        "gramatical": gramatical,
        "listaErrores": listaErrores,
        "tipoencoding": tipoencoding
    };
};

PROLOGO
    : tk_inicio_prologo VERSION CODIFICACION DEPENDENCIA tk_fin_prologo RAIZ {
        $$ = $6;

        // REPORTE GRAMATICA
        gramaticapp = `P   -> tk_inicio V C D tk_fin R \n` + gramaticapp;
        gramatical = `<PROLOGO> := ${$1} <VERSION> <CODIFICACION> ${$5} <DEPENDENCIA> <RAIZ>\n` + gramatical;

    }
    | RAIZ {
        $$ = $1;
        gramaticapp = `P   -> R \n` + gramaticapp;
        gramatical = `<PROLOGO> := <RAIZ>\n` + gramatical;
    }
    }
;

VERSION
    :tk_igual tk_hilera {
        gramaticapp += `V   -> tk_igual tk_cadena\n` + gramaticapp;
        gramatical += `<VERSION> := ${$1} ${$2}\n` + gramatical;
    }
    
;

CODIFICACION
    :tk_encoding tk_igual tk_hilera {
        gramaticapp = `C   -> tk_encoding tk_igual tk_cadena \n` + gramaticapp;
        gramatical = `<CODIFICACION> := ${$1} ${$2} ${$3}\n` + gramatical;
        tipoencoding = `${$3}`.replaceAll("\"", ' ');
    }
    | {
        gramaticapp = `C   -> ε \n` + gramaticapp;
        gramatical = `<CODIFCACION> :=  epsilon\n` + gramatical;
    }
;

DEPENDENCIA
    :tk_standalone tk_igual tk_hilera {
        gramaticapp = `D   -> tk_standalone tk_igual tk_cadena \n` + gramaticapp;
        gramatical = `<DEPENDENCIA> := ${$1} ${$2} ${$3}\n` + gramatical;
    }
    | { 
        gramaticapp = `D   -> ε \n` + gramaticapp;
        gramatical = `<DEPENDENCIA> := epsilon\n` + gramatical;
    }
;

RAIZ
    :ETIQUETA {
        $$ = $1;
        // CST
        nodoPadre = new Nodo("RAIZ","RAIZ");
        nodoPadre.agregarHijo($1['nodo']);
        
        $$['nodo'] = nodoPadre;


        //REPORTE GRAMATICA
        gramaticapp = `R   -> E \n` + gramaticapp;
        gramatical = `<RAIZ> := <ETIQUETA>\n` + gramatical;
    }
       | error  tk_cierra
        {
            listaErrores.push(new TokenError("XML",'Este es un error sintáctico: ', "Me recupero con:  " + yytext , @1.first_line, @2.first_column ));
        }

;

ETIQUETA
    : ETIQUETA_UNICA {
        $$ = $1;

        // CST
        nodoPadre = new Nodo("ETIQUETA","ETIQUETA");
        nodoPadre.agregarHijo($1['nodo']);

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `E   -> EU \n` + gramaticapp;
        gramatical = `<ETIQUETA> :=  <ETIQUETA_UNICA>\n` + gramatical;
    }
    | APERTURA CONTENIDO CIERRE {
        

        $$ = $1;
        $$["hijos"] = $2['hijos'];
        $$['texto'] = $2['texto'];
        
        // CST
        nodoPadre = new Nodo("ETIQUETA","ETIQUETA");
        nodoPadre.agregarHijo($1['nodo']);

        if($2) {
            nodoPadre.agregarHijo($2['nodo']);
        }

        nodoPadre.agregarHijo($3['nodo']);

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `E   -> AP CO CI \n` + gramaticapp;
        gramatical = `<ETIQUETA> := <APERTURA> <CONTENIDO> <CIERRE>\n` + gramatical;


    }
    | APERTURA CIERRE {


        $$ = $1;
        // CST
        nodoPadre = new Nodo("ETIQUETA","ETIQUETA");
        nodoPadre.agregarHijo($1['nodo']);
        nodoPadre.agregarHijo($2['nodo']);

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `E   -> AP CI \n` + gramaticapp;
        gramatical = `<ETIQUETA> := <APERTURA> <CIERRE>\n` + gramatical;
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

        // CST
        nodoPadre = new Nodo("ETIQUETA UNICA","ETIQUETA UNICA");
        nodoPadre.agregarHijo(new Nodo("APERTURA", $1));
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $2));
        if ($3) {
            nodoPadre.agregarHijo($3['nodo']);
        }
        nodoPadre.agregarHijo(new Nodo("CIERRE", $4));

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `EU  -> tk_abre tk_etiqueta ATS tk_cierra_dos \n` + gramaticapp;
        gramatical = `<ETIQUETA_UNICA> := ${$1} ${$2} <ATRIBUTOS> ${$4} \n` + gramatical;

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

        // CST
        nodoPadre = new Nodo('ETIQUETA COMPLETA', 'ETIQUETA COMPLETA');
        nodoPadre.agregarHijo(new Nodo("APERTURA",$1));
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $2));

        if($3) {
            nodoPadre.agregarHijo($3['nodo']);
        } 
        nodoPadre.agregarHijo(new Nodo("CIERRE",$4));

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `AP  -> tk_abre tk_etiqueta ATS tk_cierra\n` + gramaticapp;
        gramatical = `<APERTURA> := ${$1} ${$2} <ATRIBUTOS> ${$3} \n` + gramatical;


        // Verificar Etiqueta
        verificarEtiquetas.push(new Token("ETIQUETA",$2 , @2.first_line, @2.first_column ));

    }
    |tk_abre tk_etiqueta tk_cierra {
        $$ = {}
        $$["etiqueta"] = $2;
        $$["tipo"] = "completa";
        $$["linea"] = @2.first_line;
        $$["columna"] = @2.first_column;

        // CST
        nodoPadre = new Nodo('ETIQUETA COMPLETA', 'ETIQUETA COMPLETA');
        nodoPadre.agregarHijo(new Nodo("APERTURA",$1));
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $2));
        nodoPadre.agregarHijo(new Nodo("CIERRE",$3));

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `AP  -> tk_abre tk_etiqueta tk_cierra \n` + gramaticapp;
        gramatical = `<APERTURA> := ${$1} ${$2} ${$3}\n` + gramatical;

        // Verificar Etiqueta
        verificarEtiquetas.push(new Token("ETIQUETA",$2 , @2.first_line, @2.first_column ));

    }
;

ATRIBUTOS
    : ATRIBUTOS ATRIBUTO {
        // CST
        nodoPadre = new Nodo("ATRIBUTOS", "ATRIBUTOS");
        nodoPadre.agregarHijo($2['nodo']);
        if ($1 && $1['nodo']) {
            nodoPadre.agregarHijo($1['nodo']);
        }

        // GUARDAR LOS DATOS
        if ($1) {
            for(let key in $1) {
                $2[key] = $1[key];
            }
        }
        $$ = $2;
        // ALMACENANDO EL NODO
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `ATS -> ATS AT \n` + gramaticapp;
        gramatical = `<ATRIBUTOS> := <ATRIBUTOS> <ATRIBUTO>\n` + gramatical;

    }
    | ATRIBUTO {
        // CST
        nodoPadre = new Nodo("ATRIBUTOS", "ATRIBUTOS");
        nodoPadre.agregarHijo($1['nodo']);

        // GUARDAR LOS DATOS
        $$ = $1;
        // ALMACENANDO EL NODO
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `ATS -> AT \n` + gramaticapp;
        gramatical = `<ATRIBUTOS> := <ATRIBUTO>\n` + gramatical;
    }
;

ATRIBUTO
    : tk_etiqueta tk_igual tk_hilera {
        // CST
        nodoPadre = new Nodo("ATRIBUTO", "ATRIBUTO");
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $1));    
        nodoPadre.agregarHijo(new Nodo("IGUAL", $2));    
        nodoPadre.agregarHijo(new Nodo("VALOR", $3.replaceAll('"','')));
    
        // GUARDAR LOS DATOS
        $$ = {};
        $$[$1] = $3.replaceAll('"','');
        $$["tipo"] = "atributo";
        $$["linea"] = @1.first_line;
        $$["columna"] = @1.first_column;
        // ALMACENANDO EL CST
        $$["nodo"] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `AT  -> tk_etiqueta tk_igual tk_cadena \n` + gramaticapp;
        gramatical = `<ATRIBUTO> := ${$1} ${$2} ${$3} \n` + gramatical;
    }
;

CONTENIDO
    :  CONTENIDO LISTACONT {
        $$ = $1;

        if ($2['texto']) {
            $$['texto'] += " " + $2['texto'];
        }

        if ($2['hijos'] && $2['hijos'].length > 0) {
            $2['hijos'].forEach(hijo => {
                $$['hijos'].push(hijo);
            })
        }


        // CST
        nodoPadre = new Nodo("CONTENIDO", "CONTENIDO");
        nodoPadre.agregarHijo($1['nodo']);
        nodoPadre.agregarHijo($2['nodo']);    

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `CO  -> CO LCO \n` + gramaticapp;
        gramatical = `<CONTENIDO> := <CONTENIDO> <LISTACONT>\n` + gramatical;


    }
    |  LISTACONT  {

        // CST
        nodoPadre = new Nodo('CONTENIDO', 'CONTENIDO');
        nodoPadre.agregarHijo($1['nodo']);
        
        // GUARDAR LOS DATOS
        $$ = $1;
        // ALMACENANDO EL NODO
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `CO  -> LCO \n` + gramaticapp;
        gramatical = `<CONTENIDO> := <LISTACONT>\n` + gramatical;

    } 
;

LISTACONT
    : tk_etiqueta  {       
        // CST
        nodoPadre = new Nodo("LISTACONT", "LISTACONT");
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $1));

        $$ = {}
        $$['texto'] = $1;
        $$['hijos'] = [];
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `LCO -> tk_etiqueta \n` + gramaticapp;
        gramatical = `<LISTACONT> :=  ${$1}\n` + gramatical;
    }   
    | tk_numero {
        // CST
        nodoPadre = new Nodo("LISTACONT", "LISTACONT");
        nodoPadre.agregarHijo(new Nodo("NUMERO", $1));

        $$ = {}
        $$['texto'] = $1;
        $$['hijos'] = [];
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `LCO -> tk_numero\n` + gramaticapp;
        gramatical = `<LISTACONT> :=  ${$1}\n` + gramatical;
    }
    | ETIQUETA {
        // CST
        nodoPadre = new Nodo("LISTACONT", "LISTACONT");
        nodoPadre.agregarHijo($1['nodo']);

        // GUARDAR LOS DATOS
        $$ = {};
        $$['texto'] = "";
        $$['hijos']  = [$1];
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `LCO -> E \n` + gramaticapp;
        gramatical = `<LISTACONT> := <ETIQUETA>\n` + gramatical;

    } 
    | CARACESPECIAL{
        
        // CST
        nodoPadre = new Nodo("LISTACONT", "LISTACONT");
        nodoPadre.agregarHijo(new Nodo("CARACTERES ESP", $1));

        // GUARDAR LOS DATOS
        $$ = {};
        $$['hijos'] = [];
        $$['texto'] = $1;
        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `LCO -> CS \n` + gramaticapp;
        gramatical = `<LISTACONT> := <CARACESPECIAL>\n` + gramatical;

    } 
;


CARACESPECIAL
        : tk_less {
            $$ = "<";

            //REPORTE GRAMATICA
            gramaticapp = `CS  -> tk_less \n` + gramaticapp;
            gramatical = `<CARACESPECIAL> := ${$1}\n` + gramatical;
        }
        | tk_great {
            $$ = ">";

            //REPORTE GRAMATICA
            gramaticapp = `CS  -> tk_great \n` + gramaticapp;
            gramatical = `<CARACESPECIAL> := ${$1}\n` + gramatical;
        }
        | tk_amper {
            $$ = "&";

            //REPORTE GRAMATICA
            gramaticapp = `CS  -> tk_amper \n` + gramaticapp;
            gramatical = `<CARACESPECIAL> := ${$1}\n` + gramatical;
        }
        | tk_apostro {
            $$ = "'";

            //REPORTE GRAMATICA
            gramaticapp = `CS  -> tk_apostro \n` + gramaticapp;
            gramatical = `<CARACESPECIAL> := ${$1}\n` + gramatical;
        }
        | tk_quota {
            $$ = '"';

            //REPORTE GRAMATICA
            gramaticapp = `CS  -> tk_quota \n` + gramaticapp;
            gramatical = `<CARACESPECIAL> := ${$1}\n` + gramatical;
        }
        ;

CIERRE
    : tk_abre_dos tk_etiqueta tk_cierra {
        $$ = {}

        // CST
        nodoPadre = new Nodo("CIERRE", "CIERRE");
        nodoPadre.agregarHijo(new Nodo("APERTURA", $1));
        nodoPadre.agregarHijo(new Nodo("ETIQUETA", $2));
        nodoPadre.agregarHijo(new Nodo("CIERRE", $3));

        $$['nodo'] = nodoPadre;

        //REPORTE GRAMATICA
        gramaticapp = `CI  -> tk_abre_dos tk_etiqueta tk_cierra \n` + gramaticapp;
        gramatical = `<CIERRE> := ${$1} ${$2} ${$3}\n` + gramatical;

        //VERIFICAR ETIQUETA
        let etiqueta = verificarEtiquetas.pop();
        if (etiqueta.lexema === $2) {
            // Etiqueta correcta
        } else {
            listaErrores.push(new TokenError("XML", "Semantico", `Se abrio la etiqueta ${etiqueta.lexema} en la linea ${etiqueta.linea} y se esta cerrando con ${$2} en la linea ${@2.first_line}` , @2.first_line, @2.first_column ));
        }
    }
;








