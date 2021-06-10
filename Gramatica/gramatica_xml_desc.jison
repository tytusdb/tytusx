/* Definición Léxica */
%lex
%x COMMENTMULTILINE
%options case-insensitive



%%


"<"					return 'menorque';
">"					return 'mayorque';
"/"					return 'diagonal';
"="					return 'igual';
"("					return 'para';
")"					return 'parc';
"&lt"               return 'lg';
"&gt"               return 'gt';
"&amp"              return 'amp';
"&apos"             return 'apos';
"&quot"             return 'quot';
"?"                 return 'interroga';    
"xml"               return 'tck_xml';
"version"               return 'tck_version';
"encoding"               return 'tck_encoding';

/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b				return 'entero';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';


/* Estado Comentarios */
"!--"                      { this.pushState("COMMENTMULTILINE"); }
<COMMENTMULTILINE>"-->"     { this.popState(); }
<COMMENTMULTILINE><<EOF>>   { this.popState(); }
<COMMENTMULTILINE>[^]       { /* Ignore anything */ }

<<EOF>>				return 'EOF';

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        //let errores = new NodoError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', 'XML', yylloc.first_line, yylloc.first_column);
                        //erroreslexicos.setError(errores);
                    }
/lex



/* Asociación de operadores y precedencia */

//%left 'or'
//%left 'and'
%left 'menorque' 'mayorque'
//%left 'plus' 'minus'
//%left 'times' 'div' 'mod'
//%left 'pow'
//%left 'not'
//%left UMINUS
//%right 'interroga'
//%left 'para' 'parc'

%start ini

%% /* Definición de la gramática */

ini
	: EXML LISTA_PRINCIPAL EOF { 
        //$$ = $2;
        console.log('Fin de Analisis');
        //rg_xml.setValor('inicio -> EXML LISTA_PRINCIPAL;\n');
        //return $$; 
    }
;

EXML : menorque  interroga tck_xml tck_version igual cadena tck_encoding igual cadena interroga mayorque{};

LISTA_PRINCIPAL : LISTA LISTA_PRINCIPAL
|;

LISTA:ETIQUETA_ABRE
    | VALORES
    | ETIQUETA_CIERRA
    | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); };

ETIQUETA_ABRE : menorque identificador LATRIBUTOS mayorque
              | menorque identificador LATRIBUTOS diagonal mayorque ;

ETIQUETA_CIERRA : menorque diagonal identificador mayorque;

LATRIBUTOS : ATRIBUTO LATRIBUTOS
|;
ATRIBUTO :  identificador igual cadena { };

VALORES : identificador { 
            //rg_xml.setValor('VALORES -> ID;\n');
            $$ = $1; 
        }
        | decimal { 
            //rg_xml.setValor('VALORES -> DECIMAL;\n');
            $$ = $1; 
        }
        | entero { 
            //rg_xml.setValor('VALORES -> ENTERO;\n');
            $$ = $1; 
        }
        | lg {
            $$ = '<';
        }
        | gt {
            $$ = '>';
        }
        | amp {
            $$ = '&';
        }
        | apos {
            $$ = '\'';
        }
        | quot {
            $$ = '\"';
        };