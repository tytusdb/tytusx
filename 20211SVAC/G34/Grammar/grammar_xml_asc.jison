/* Definición Léxica */
%lex
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
"version"           return 'tck_version';
"encoding"          return 'tck_encoding';
"?xml"             return 'cabeceraxml';
"?>"                return 'cierrexml'; 
/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b				return 'entero';

//[,.:;ñÑ-äáéíóúÁÉÍÓÚëïöüÄËÏÖÜ@¿?¡!_] return 'especial';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zñA-ZÑ])[a-zñA-ZÑ0-9_]*	    return 'identificador';
[^<]                    {return 'Texto' };
<<EOF>>				return 'EOF';

.					{ 
                        yy.errorsXML.push(new yy.NodeError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', yylloc.first_line, yylloc.first_column, 'XML'));
                    }
/lex



/* Asociación de operadores y precedencia */
%start ini

%% /* Definición de la gramática */

ini
	: EXML LISTA_PRINCIPAL EOF { 
        //$$ = $2;
        yy.rg.setValue('inicio -> EXML LISTA_PRINCIPAL;\n');
        return new yy.AstXml($2); 
    }
;
  //  < XML ¿
EXML :menorque cabeceraxml tck_version igual cadena tck_encoding igual cadena cierrexml{
            yy.rg.setValue('EXML -> <?xml version="CADENA" encoding="CADENA"?>;\n');
            encodingxml = $8;
            versionxml = $5;
     }
     | error 
     {
        yy.errorsXML.push(new yy.NodeError(yytext, 'Sintactico', 'Falta encabezado XML', this._$.first_line, this._$.first_column, 'XML'));
     };

LISTA_PRINCIPAL : LISTA_PRINCIPAL LISTA     { 
                    yy.rg.setValue('LISTA_PRINCIPAL -> LISTA_PRINCIPAL LISTA;\n');
                    $1.push($2); 
                    $$ = $1;
                }
   				| LISTA                     { 
                    yy.rg.setValue('LISTA_PRINCIPAL -> LISTA;\n');
                    $$ = [$1]; 
                }
 ;


LISTA: menorque identificador LATRIBUTOS mayorque OBJETOS menorque diagonal identificador mayorque { 
            yy.rg.setValue('LISTA -> <ID [LATRIBUTOS]> OBJETOS </ID>;\n');
            //constructor(id_open, id_close, value, lstAttribute, lstLabel, typeLabel , row , column)
            $$ = new yy.Label($2, $8, $2, false, $5, $3, undefined, @1.first_line, @1.first_column);//($2, $8, '', $3, $5, true, @1.first_line, @1.first_column); 
        }
    | menorque identificador LATRIBUTOS mayorque PARRAFO menorque diagonal identificador mayorque { 
            yy.rg.setValue('LISTA -> <ID [LATRIBUTOS]> PARRAFO </ID>;\n');
            //$$ = new Label($2,$5,@1.first_line, @1.first_column,$3,[],$8, true); 
            //$$ = new Label($2, $8, $5, $3, [], true, @1.first_line, @1.first_column); 
            $$ = new yy.Label($2, $8, $2, false, [], $3, $5.trim(), @1.first_line, @1.first_column);
        }
    | menorque identificador LATRIBUTOS diagonal mayorque      { 
            yy.rg.setValue('LISTA -> <ID [LATRIBUTOS] />;\n');
            //$$ = new Label($2,'',@1.first_line, @1.first_column,$3,[],$2, false); 
            $$ = new yy.Label($2, $2, $2, true, [], $3, undefined, @1.first_line, @1.first_column);
            //$$ = new Label($2, $2, '', $3, [], false, @1.first_line, @1.first_column); 
        }
    | error { 
        //constructor(lexeme , typeerror , description, row , column, language)
        //let errores = new NodeError(yytext, 'Sintactico', 'Token no esperado.', this._$.first_line, this._$.first_column, 'XML');
        yy.errorsXML.push(new yy.NodeError(yytext, 'Sintactico', 'Token no esperado.', this._$.first_line, this._$.first_column, 'XML'));
    };

LATRIBUTOS: ATRIBUTOS        { 
                yy.rg.setValue('LATRIBUTOS -> ATRIBUTOS;\n');
                $$ = $1; }
           |                 { 
               yy.rg.setValue('LATRIBUTOS -> EPSILON;\n');
               $$ = []; 
               };

ATRIBUTOS : ATRIBUTOS ATRIBUTO   { 
                yy.rg.setValue('ATRIBUTOS -> ATRIBUTOS ATRIBUTO;\n');
                $1.push($2); $$ = $1;
            }
          | ATRIBUTO             { 
                yy.rg.setValue('ATRIBUTOS -> ATRIBUTO;\n');
                $$ = [$1]; 
            };

ATRIBUTO :  identificador igual cadena { 
                yy.rg.setValue('ATRIBUTO -> ID = CADENA;\n');
                //(id, value, row, column)
                $$ = new yy.Attribute($1, $3, @1.first_line, @1.first_column); 
            };


OBJETOS: OBJETOS LISTA       { 
            yy.rg.setValue('OBJETOS -> OBJETOS LISTA;\n');
            $1.push($2); $$ = $1;
        }
	   | LISTA                { 
            yy.rg.setValue('OBJETOS -> LISTA;\n');
            $$ = [$1]; 
        } ;

PARRAFO : PARRAFO VALORES { 
            yy.rg.setValue('PARRAFO -> PARRAFO VALORES;\n');
            $1=$1 + ' ' +$2 ; 
            $$ = $1;
        }
		| VALORES           { 
            yy.rg.setValue('PARRAFO -> VALORES;\n');
            $$ = $1; 
        } ;

VALORES : identificador { 
            yy.rg.setValue('VALORES -> ID;\n');
            $$ = $1; 
        }
        | decimal { 
            yy.rg.setValue('VALORES -> DECIMAL;\n');
            $$ = $1; 
        }
        | entero { 
            yy.rg.setValue('VALORES -> ENTERO;\n');
            $$ = $1; 
        }
        | lg {
            yy.rg.setValue('VALORES -> LG;\n');
            $$ = '<';
        }
        | gt {
            yy.rg.setValue('VALORES -> GT;\n');
            $$ = '>';
        }
        | amp {
            yy.rg.setValue('VALORES -> AMP;\n');
            $$ = '&';
        }
        | apos {
            yy.rg.setValue('VALORES -> APOS;\n');
            $$ = '\'';
        }
        | quot {
            yy.rg.setValue('VALORES -> QUOT;\n');
            $$ = '\"';
        }
        | Texto {
            yy.rg.setValue('VALORES -> Texto;\n');
            $$ = $1;
        };