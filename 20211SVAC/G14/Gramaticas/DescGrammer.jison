%{
    const { Objeto }    = require('../Expresion/Objeto');
    const { Atributo }  = require('../Expresion/Atributo');
    const { Etiqueta }  = require('../../InterpreteXPath/AST/Etiqueta');
%}

%lex

%options case-insensitive

%%
\s+                                         /* skip whitespace */
\<\!--.*?--\>                               /* skip whitespace */
"<?xml"                                     return 'xml_open';
\>([^<]|\n)*\<                              { const re = /[\s\t\n]+/
                                              var aux = yytext.replace('<', ''); 
                                              aux = aux.replace('>', '');
                                              aux = aux.replace(re, '');
                                              if(aux.length > 0) {
                                                  return 'text'
                                              } else {
                                                  return 'open_close'
                                              }
                                            }

"?>"                                        return 'special_close';
"/>"                                        return 'slash_close';
">"                                         return 'close';
"<"                                         return 'open';
"/"                                         return 'slash';
"="                                         return 'equal';

(\"[^"]*\")                                 return 'string';

[a-zA-Zá-úÁ-Úä-üÄ-Ü_][a-zA-Z0-9_\-ñÑá-úÁ-Úä-üÄ-Ü]*                    return 'identifier';


<<EOF>>			    	                    return 'EOF'
.   { 
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    }
/lex

%start S

%%

S 
    : START EOF                                                                     { $$ = $1; return $$; }
;

START
    : PROLOG RAIZ                                                                 { $2.unshift($1); $$ = $2; }
;

RAIZ
    : open OBJETO                                                                   { $$ = [$2]; }
;

PROLOG
    : xml_open LATRIBUTOS special_close                                             { $$ = new Objeto('xml', '', @1.first_line, @1.first_column, $2, []); }
;

OBJETO
    : identifier LATRIBUTOS open_close OBJETOS slash identifier CERRAR          { if($1 === $6) {
                                                                                            $$ = new Objeto($1, '', @1.first_line, @1.first_column, $2, $4,$7);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            $$ = null;
                                                                                        }
                                                                                    }
    | identifier LATRIBUTOS text slash identifier CERRAR                        { if($1 === $5){
                                                                                            $3 = $3.replace("<", ""); 
                                                                                            $3 = $3.replace(">", "");
                                                                                            $$ = new Objeto($1, $3, @1.first_line, @1.first_column, $2, null,$6);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            $$ = null;
                                                                                        }
                                                                                    }
    | identifier LATRIBUTOS slash_close                                         { $$ = new Objeto($1, '', @1.first_line, @1.first_column, $2, null,$3); }
;

CERRAR
    : close                                                                         {$$ = $1}
    | open_close                                                                       {$$ = $1}
;

LATRIBUTOS
    : ATRIBUTOS                                                                     { $$ = $1; }
    |                                                                               { $$ = null; }
;

ATRIBUTOS
    : ATRIBUTO ATRIBUTOS_P                                                          { $$ = new Etiqueta("atributo",0,0,$1,$2); }
;

ATRIBUTOS_P
    : ATRIBUTO ATRIBUTOS_P                                                          { $$ = new Etiqueta("atributo",0,0,$1,$2); }
    |                                                                               { $$ = null; }
;

ATRIBUTO
    : identifier equal string                                                       { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
;

OBJETOS
    : OBJETO OBJETOS_P                                                              { if($1 !== null ){
                                                                                             $$ = new Etiqueta("objeto",0,0,$1,$2);
                                                                                        } else { 
                                                                                           $$ = new Etiqueta("objeto",0,0,$1,$2);
                                                                                        } 
                                                                                    }
;

OBJETOS_P
    : OBJETO OBJETOS_P                                                              { if($1 !== null ){
                                                                                            $$ = new Etiqueta("objeto",0,0,$1,$2);
                                                                                        } else { 
                                                                                             $$ = new Etiqueta("objeto",0,0,$1,$2);
                                                                                        }
                                                                                    }
    |                                                                               { $$ = null; }
;
