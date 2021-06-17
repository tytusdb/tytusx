 /* segmento de codigo, es equivalente a la seccion parseCode que encontramos en CUP */
 /* aca podemos importar los módulos que vamos a utilizar, crear funciones, etc */
%{

const { GraficarCST_XML } = require('../Graficador/GraficarCST_XML');
const { NodoCST } = require('../Graficador/NodoCST');
var cst = new GraficarCST_XML();
var raiz = new NodoCST;

%}


%lex

%s                                  comment

%%
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* ignora contenido de los comentarios*/
\s+                                 // ignora los espacios en blanco

"<?xml"                             return 'prologo';
"?>"                                return 'prologc';
"</"                                return 'etiqca';
"/>"                                return 'etiqcc';

"version"                           return 'RVERSION';
"encoding"                          return 'RENCODING'

"&lt;"                              return 'less';
"&gt;"                              return 'greater';
"&amp;"                             return 'ampersand';
"&apos;"                            return 'apostrophe';
"&quot;"                            return 'quotation';

"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';

/* Number literals */
\d+([.]\d*)?                        return 'DoubleLiteral';
\"[^\"]*\"                          return 'StringLiteral1'
\'[^\']*\'                          return 'StringLiteral2'
[a-zA-Z][a-zA-Z0-9_]*               return 'identifier';

([\u0021]|[\u0023-\u0025]|[\u0028-\u002F]|[\u003A-\u003B]|[\u003F-\u0040]|[\u005B-\u0060]|[\u007B-\u007E]|[\u00A1-\u00AC]|[\u00AE-\uD7F0])+                  return 'simbolos1';

//error lexico
.       {
            console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
        }

<<EOF>>                             return 'EOF'

/lex

// PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START: ROOTS EOF                                                                    { var padre = new NodoCST('START', '');
                                                                                      padre.agregarHijo($1);
                                                                                      $$ = padre;
                                                                                      return $$; }
     ;

ROOTS: ROOTS ROOT                                                                   { var padre = new NodoCST('ROOTS', '');
                                                                                      padre.agregarHijo($1);
                                                                                      padre.agregarHijo($2);
                                                                                      $$ = padre; 
                                                                                    }
     | ROOT                                                                         { var padre = new NodoCST('ROOTS', '');
                                                                                      padre.agregarHijo($1);
                                                                                      $$ = padre; }
     ;

ROOT: prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc    { var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<?xml', '');
                                                                                      var hijo2 = new NodoCST('version', '');
                                                                                      var hijo3 = new NodoCST('=', '');
                                                                                      var hijo4 = new NodoCST('String', $4);
                                                                                      var hijo5 = new NodoCST('encoding', '');
                                                                                      var hijo6 = new NodoCST('=', '');
                                                                                      var hijo7 = new NodoCST('String', $7);
                                                                                      var hijo8 = new NodoCST('?>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo(hijo3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      $$ = padre;
                                                                                    }
    | lt identifier LIST_ATRIBUTOS gt      ROOTS         etiqca identifier gt       { var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $2);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      //var hijo5 = new NodoCST('encoding', '');
                                                                                      var hijo6 = new NodoCST('</', '');
                                                                                      var hijo7 = new NodoCST('identifier', $7);
                                                                                      var hijo8 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo($5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      $$ = padre;
                                                                                    }
    | lt identifier LIST_ATRIBUTOS gt      CONTENTS      etiqca identifier gt       { var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $2);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      var hijo5 = new NodoCST('CONTENT', $5);
                                                                                      var hijo6 = new NodoCST('</', '');
                                                                                      var hijo7 = new NodoCST('identifier', $7);
                                                                                      var hijo8 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      $$ = padre;
                                                                                    }
    | lt identifier LIST_ATRIBUTOS gt                    etiqca identifier gt       { var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $2);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      var hijo5 = new NodoCST('</', '');
                                                                                      var hijo6 = new NodoCST('identifier', $6);
                                                                                      var hijo7 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      $$ = padre;
                                                                                    }
    | lt identifier LIST_ATRIBUTOS etiqcc                                           { var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $2);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('/>', '');
                                                                                      
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      $$ = padre;
                                                                                    }
    | error                                                                         { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                                                      
                                                                                    }
    ;

LIST_ATRIBUTOS: ATRIBUTOS                           { var padre = new NodoCST('LIST_ATRIBUTOS', '');
                                                      padre.agregarHijo($1);
                                                      $$ = padre;
                                                    }
              |                                     { var padre = new NodoCST('LIST_ATRIBUTOS', '');
                                                      var hijo = new NodoCST('ε','');
                                                      padre.agregarHijo(hijo);
                                                      $$=padre; }
              ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO                       { var padre = new NodoCST('ATRIBUTOS', '');
                                                      padre.agregarHijo($1);
                                                      padre.agregarHijo($2);
                                                      $$ = padre;
                                                    }
         | ATRIBUTO                                 { var padre = new NodoCST('ATRIBUTOS', '');
                                                      padre.agregarHijo($1);
                                                      $$ = padre; }        

         ;

ATRIBUTO: identifier asig StringLiteral1            { var padre = new NodoCST('ATRIBUTO', '');
                                                      var hijo1 = new NodoCST('identifier', $1);
                                                      var hijo2 = new NodoCST('=', '');
                                                      var hijo3 = new NodoCST('String', $3);
                                                      padre.agregarHijo(hijo1);
                                                      padre.agregarHijo(hijo2);
                                                      padre.agregarHijo(hijo3);
                                                      $$ = padre;
                                                    }                                
        | identifier asig StringLiteral2            { var padre = new NodoCST('ATRIBUTO', '');
                                                      var hijo1 = new NodoCST('identifier', $1);
                                                      var hijo2 = new NodoCST('=', '');
                                                      var hijo3 = new NodoCST('String', $3);
                                                      padre.agregarHijo(hijo1);
                                                      padre.agregarHijo(hijo2);
                                                      padre.agregarHijo(hijo3);
                                                      $$ = padre;
                                                    }                              
        | error                                     { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                      
                                                    }
        ;

CONTENTS: CONTENTS BODY                             { $1 = $1 + ' ' + $2; $$ = $1; }
         | BODY                                     { $$ = $1 }                   
         ;

BODY: identifier                                    { $$ = $1 }
    | DoubleLiteral                                 { $$ = $1 }
    /*| StringLiteral1 { $$ = $1; console.log($$); }
    | StringLiteral2 { $$ = $1; console.log($$); }*/
    | less                                          { $$ = '<' }
    | greater                                       { $$ = '>' }
    | ampersand                                     { $$ = '&' }
    | apostrophe                                    { $$ = "'" }
    | quotation                                     { $$ = '"' }
    | simbolos1                                     { $$ = $1 }
    //| gt { $$ = $1; console.log($$); }
    | asig                                          { $$ = $1 }
    ;