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

"<?"                         return 'minquest';
"?>"                         return 'maxquest';
"<"                         return 'menor';
">"                         return 'mayor';
"/"                         return 'div';

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

// %left 'menor' 'any'
// %left 'identificador' 'any'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/******************************SINTACTICO***************************************/ 

START : RAIZ EOF   { $$ = new Raiz($1,encoding, errores ); 
                            errores = []
                            encoding = []
                            return $$;}      
    ;

RAIZ : ENC OBJETO { $$ = $2 }
    | OBJETO      { $$ = $1 }
    | error              { 
                            errores.push({'Error Type': 'Sintactico', 'Row': @1.first_line, 'Column': @1.first_column, 'Description': 'No se esperaba el caracter: '+yytext });
                            $$ = new Raiz({},encoding, errores ); 
                            errores = [];
                            encoding = [];
                            return $$;
                          } 
;

ENC : minquest  xml LATRIBUTOS maxquest { encoding = $3; }
;
                                                                 //id texto linea col atri obj
OBJETO : menor identificador LATRIBUTOS NEXT_OBJ { $$ = new Objeto($2,$4[0],@1.first_line, @1.first_column,$3,$4[1]);
                                                    if ($4[2] != ''){
                                                        if($2 != $4[2]) {
                                                            errores.push({'Error Type': 'Semantico', 'Row': this._$.first_line, 'Column': this._$.first_column, 'Description': 'Las etiquetas '+$2+' y '+$4[2]+' no coinciden' });
                                                            //errores.push({error: 'Las etiquetas '+$2+' y '+$4[2]+' no coinciden', tipo: 'Semantico', linea: this._$.first_line, columna: this._$.first_column})
                                                        };
                                                    };
                                                    
                                                }
;

NEXT_OBJ : mayor CONT_OBJ           { $$ = $2; }
    | div mayor                     { $$ = ['', [], '']; }
;

CONT_OBJ : OBJETOS div identificador mayor              { $$ = ['',$1, $3];}
    | LISTA_ID_OBJETO menor div identificador mayor     { $$ = [$1, [], $4];}
;

LATRIBUTOS: ATRIBUTO LATRIBUTOS         { $$ = [$1].concat($2); }                   
           |                            { $$ = []; }             
;

ATRIBUTO: identificador asig StringLiteral       { $$ = new Atributo($1, $3.replace(/['"]+/g, ''), @1.first_line, @1.first_column);}   
;

LISTA_ID_OBJETO: identificador LIOP     { $$ = $1+' '+$2; }
                | numero LIOP           { $$ = $1+' '+$2; }
                | any LIOP              { $$ = $1+' '+$2; } 
;

LIOP : identificador LIOP               { $$ = $1+' '+$2; }
    | numero LIOP                       { $$ = $1+' '+$2; }
    | any LIOP                          { $$ = $1+' '+$2; }
    |                                   { $$ = ''; }
;

OBJETOS: OBJETO OBJETOS                 { $$ = [$1].concat($2); }
    | menor                             { $$ = []; }
	|                                   { $$ = []; }
;


