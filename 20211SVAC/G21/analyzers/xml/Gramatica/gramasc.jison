/******************************EXPORTACIONES*******************************/
%{
    //const {Print} = require("../Instrucciones/Primitivas/Print");
    //const {Primitivo} = require("../Expresiones/Primitivo");
    //const {Operacion, Operador} = require("../Expresiones/Operacion");

    // const {Objeto} = require("../Expresiones/Objeto");
    // const {Atributo} = require("../Expresiones/Atributo");
    // const {Raiz} = require("../Entornos/Raiz");
    errores = []
    encoding = []
%}

/******************************LEXICO***************************************/ 
%lex

%options case-sensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"<"                         return 'menor';
">"                         return 'mayor';
"/"                         return 'div';
"?"                         return 'quest';
"="                         return 'asig';
"xml"                       return 'xml';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+    return 'numero';
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*             return 'identificador';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'
(.)                                       return 'any'
//error lexico
. {  
    console.error('Error léxico: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);
    errores.push({'Error Type': 'Lexico', 'Row': yylloc.first_line, 'Column': yylloc.first_column, 'Description': 'El caracter: '+yytext+' no pertenece al lenguaje' });
}

<<EOF>>                     return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'menor' 'mayor'
%left 'div'

// %left 'lparen' 'rparen'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/******************************SINTACTICO***************************************/ 

START : RAIZ EOF         { $$ = new Raiz($1,encoding, errores ); 
                            errores = [];
                            encoding = [];
                            return $$;}
    ;

RAIZ : ENC OBJETO        { $$ = $2 }
    | OBJETO             { $$ = $1 }
    | error              { 
                            errores.push({'Error Type': 'Sintactico', 'Row': @1.first_line, 'Column': @1.first_column, 'Description': 'No se esperaba el caracter: '+yytext });
                            $$ = new Raiz({},encoding, errores ); 
                            errores = [];
                            encoding = [];
                            return $$;
                          }   
;
 
ENC : menor quest xml LATRIBUTOS quest mayor { encoding = $4; }
;

OBJETO : menor identificador LATRIBUTOS mayor OBJETOS menor div identificador mayor       { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5);
                                                                                                if($2 != $8) {
                                                                                                    //errores.push({error: 'Las etiquetas '+$2+' y '+$8+' no coinciden', tipo: 'Semantico', linea: this._$.first_line, columna: this._$.first_column});
                                                                                                    errores.push({'Error Type': 'Semantico', 'Row': this._$.first_line, 'Column': this._$.first_column, 'Description': 'Las etiquetas '+$2+' y '+$8+' no coinciden' });
                                                                                                };
                                                                                            }
    | menor identificador LATRIBUTOS mayor LISTA_ID_OBJETO   menor div identificador mayor  { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); 
                                                                                                if($2 != $8) {
                                                                                                    //errores.push({error: 'Las etiquetas '+$2+' y '+$8+' no coinciden', tipo: 'Semantico', linea: this._$.first_line, columna: this._$.first_column})
                                                                                                    errores.push({'Error Type': 'Semantico', 'Row': this._$.first_line, 'Column': this._$.first_column, 'Description': 'Las etiquetas '+$2+' y '+$8+' no coinciden' });
                                                                                                };
                                                                                            }
    | menor identificador LATRIBUTOS div mayor                                              { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); }
;

LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; }
;

ATRIBUTOS: ATRIBUTOS ATRIBUTO                       { $1.push($2); $$ = $1;}
    | ATRIBUTO                                      { $$ = [$1]; } 
;

ATRIBUTO: identificador asig StringLiteral          { $$ = new Atributo($1, $3.replace(/['"]+/g, ''), @1.first_line, @1.first_column);}
;

LISTA_ID_OBJETO: LISTA_ID_OBJETO any          { $1=$1 + ' ' +$2 ; $$ = $1;}
        | LISTA_ID_OBJETO identificador       { $1=$1 + ' ' +$2 ; $$ = $1;}
        | LISTA_ID_OBJETO numero              { $1=$1 + ' ' +$2 ; $$ = $1;}
        | identificador                       { $$ = $1 }
        | numero                              { $$ = $1 }
        | any                                 { $$ = $1 }
;

OBJETOS: OBJETOS OBJETO        { $1.push($2); $$ = $1;}
	| OBJETO                   { $$ = [$1]; }
    ;


