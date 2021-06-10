/* Definición Léxica */
%lex
//%x COMMENTMULTILINE
//%x ETIQUETA_ABRE
//%x ETIQUETA_CIERRA
%options case-insensitive

%%
\s+											// se ignoran espacios en blanco
[<][!][^-]*[-]+([^<!][^-]*[-]+)*[>]			// comentario multiple líneas

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
//"<!--"                      { this.pushState("COMMENTMULTILINE"); }
//<COMMENTMULTILINE>"-->"     { this.popState(); }
//<COMMENTMULTILINE><<EOF>>   { this.popState(); }
//<COMMENTMULTILINE>[^]       { /* Ignore anything */ }


<<EOF>>				return 'EOF';

.					{ //console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        let errores = new NodoError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', 'XML', yylloc.first_line, yylloc.first_column);
                        erroreslexicos.setError(errores);
                    }
/lex



/* Asociación de operadores y precedencia */

//%left 'or'
//%left 'and'
//%left 'menorque' 'menorigual' 'mayorque' 'mayorigual' 'equal' 'nequal'
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
        $$ = $2; //console.log($$); 
        rg_xml.setValor('inicio -> EXML LISTA_PRINCIPAL;\n');
        return $$; 
    }
;

EXML : menorque  interroga tck_xml tck_version igual cadena tck_encoding igual cadena interroga mayorque{
            rg_xml.setValor('EXML -> <?xml version="CADENA" encoding="CADENA"?>;\n');
            codificacion = $9;
            codificacionversion = $6;
     };

LISTA_PRINCIPAL : LISTA_PRINCIPAL LISTA     { 
                    rg_xml.setValor('LISTA_PRINCIPAL -> LISTA_PRINCIPAL LISTA;\n');
                    $1.push($2); 
                    $$ = $1;
                }
   				| LISTA                     { 
                    rg_xml.setValor('LISTA_PRINCIPAL -> LISTA;\n');
                    $$ = [$1]; 
                }
 ;


LISTA: /*menorque  interroga tck_xml tck_version igual cadena tck_encoding igual cadena interroga mayorque{
            rg_xml.setValor('LISTA -> <?xml version="CADENA" encoding="CADENA"?>;\n');
            codificacion = $9;
            codificacionversion = $6;
            $$ = [];
     }
    |*/ menorque identificador LATRIBUTOS mayorque OBJETOS menorque diagonal identificador mayorque { 
            rg_xml.setValor('LISTA -> <ID [LATRIBUTOS]> OBJETOS </ID>;\n');
            $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5,$8, true); 
        }
    | menorque identificador LATRIBUTOS mayorque PARRAFO menorque diagonal identificador mayorque { 
            rg_xml.setValor('LISTA -> <ID [LATRIBUTOS]> PARRAFO </ID>;\n');
            $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[],$8, true); 
        }
    | menorque identificador LATRIBUTOS diagonal mayorque      { 
            rg_xml.setValor('LISTA -> <ID [LATRIBUTOS] />;\n');
            $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[],$2, false); 
        }
    | error { 
        //console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
        let errores = new NodoError(yytext, 'Sintactico', 'Token no esperado.', 'XML', this._$.first_line, this._$.first_column);
        erroressintacticos.setError(errores);
    };

LATRIBUTOS: ATRIBUTOS        { 
                rg_xml.setValor('LATRIBUTOS -> ATRIBUTOS;\n');
                $$ = $1; }
           |                 { 
               rg_xml.setValor('LATRIBUTOS -> EPSILON;\n');
               $$ = []; 
               };

ATRIBUTOS : ATRIBUTOS ATRIBUTO   { 
                rg_xml.setValor('ATRIBUTOS -> ATRIBUTOS ATRIBUTO;\n');
                $1.push($2); $$ = $1;
            }
          | ATRIBUTO             { 
                rg_xml.setValor('ATRIBUTOS -> ATRIBUTO;\n');
                $$ = [$1]; 
            };

ATRIBUTO :  identificador igual cadena { 
                rg_xml.setValor('ATRIBUTO -> ID = CADENA;\n');
                $$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
            };


OBJETOS: OBJETOS LISTA       { 
            rg_xml.setValor('OBJETOS -> OBJETOS LISTA;\n');
            $1.push($2); $$ = $1;
        }
	   | LISTA                { 
            rg_xml.setValor('OBJETOS -> LISTA;\n');
            $$ = [$1]; 
        } ;

PARRAFO : PARRAFO VALORES { 
            rg_xml.setValor('PARRAFO -> PARRAFO VALORES;\n');
            $1=$1 + ' ' +$2 ; $$ = $1;
        }
		| VALORES           { 
            rg_xml.setValor('PARRAFO -> VALORES;\n');
            $$ = $1; 
        } ;

VALORES : identificador { 
            rg_xml.setValor('VALORES -> ID;\n');
            $$ = $1; 
        }
        | decimal { 
            rg_xml.setValor('VALORES -> DECIMAL;\n');
            $$ = $1; 
        }
        | entero { 
            rg_xml.setValor('VALORES -> ENTERO;\n');
            $$ = $1; 
        }
        | lg {
            rg_xml.setValor('VALORES -> LG;\n');
            $$ = '<';
        }
        | gt {
            rg_xml.setValor('VALORES -> GT;\n');
            $$ = '>';
        }
        | amp {
            rg_xml.setValor('VALORES -> AMP;\n');
            $$ = '&';
        }
        | apos {
            rg_xml.setValor('VALORES -> APOS;\n');
            $$ = '\'';
        }
        | quot {
            rg_xml.setValor('VALORES -> QUOT;\n');
            $$ = '\"';
        };