 /* segmento de codigo, es equivalente a la seccion parseCode que encontramos en CUP */
 /* aca podemos importar los módulos que vamos a utilizar, crear funciones, etc */
%{

const { Objeto } = require('../Interprete/Expresion/Objeto');
const { Atributo } = require('../Interprete/Expresion/Atributo');
const {ELexico, ESintactico} = require('../Interprete/Util/TError')
const {Gramatical} = require('../Simbolo/Gramatical')
 var gramatical = new Gramatical(); 

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
             new ELexico("Lexico", "Caracter inesperado \'"+yytext+"\'", 'XML Asc', yylloc.first_line, yylloc.first_column)
        }

<<EOF>>                             return 'EOF'

/lex

// PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START: ROOTS EOF         { $$ = $1; 
                         gramatical.agregar('Start->Roots','$$=$1');
                         return {
                              result: $$,
                              reporteGram: gramatical
                         }; }                                 
     ;

ROOTS: ROOTS ROOT        { $1.push($2);
                         gramatical.agregar('Roots->Roots Root','$1.push($2)');
                         $$ = $1; }         

     | ROOT             { $$ = [$1]; 
                          gramatical.agregar('Roots->Root','$$=Array($1)');
                         }
     ;

ROOT: prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc    { $$ = new Objeto($1,'',@1.first_line,@1.first_column,[],[],$7); 
                                                                                      gramatical.agregar('ROOT -> prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc','$$ = new Objeto()');
                                                                                     } 
    | lt identifier LIST_ATRIBUTOS gt      ROOTS         etiqca identifier gt       { $$ = new Objeto($2,'',@1.first_line,@1.first_column,$3,$5,$7); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt ROOTS etiqca identifier gt','$$= new Objeto()');
                                                                                     }
    | lt identifier LIST_ATRIBUTOS gt      CONTENTS      etiqca identifier gt       { $$ = new Objeto($2,$5,@1.first_line,@1.first_column,$3,[],$7); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt CONTENTS etiqca identifier gt','$$ = new Objeto()');
                                                                                     } 
    | lt identifier LIST_ATRIBUTOS gt                    etiqca identifier gt       { $$ = new Objeto($2,'',@1.first_line,@1.first_column,$3,[],$7); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt etiqca identifier gt','$$ = new Objeto();');
                                                                                     }
    | lt identifier LIST_ATRIBUTOS etiqcc                                           { $$ = new Objeto($2,'',@1.first_line,@1.first_column,$3,[],''); 
                                                                                      gramatical.agregar('ROOT ->  lt identifier LIST_ATRIBUTOS etiqcc ','$$ = new Objeto()');
                                                                                     }                                    
    | error                                                                         { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                                                      new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
                                                                                    }
    ;

LIST_ATRIBUTOS: ATRIBUTOS                           { $$ = $1;
                                                        gramatical.agregar('LIST_ATRIBUTOS -> ATRIBUTOS','$$=$1');
                                                        }                               
              |                                     { $$ = []; 
                                                        gramatical.agregar('LIST_ATRIBUTOS -> ','$$ = [];');
                                                       }                               
              ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO                       { $1.push($2); $$ = $1; 
                                                             gramatical.agregar('ATRIBUTOS -> ATRIBUTOS ATRIBUTO','$1.push($2); $$ = $1');
                                                       }                               
         | ATRIBUTO                                 { $$ = [$1]; 
                                                        gramatical.agregar('ATRIBUTOS -> ATRIBUTO','$$=Array($1)');
                                                       }        

         ;
                         
ATRIBUTO: identifier asig StringLiteral1          { $$ = new Atributo($1,$3,@1.first_line,@1.first_column); 
                                                       gramatical.agregar('ATRIBUTO -> id asig StringLiteral1','$$ = new Atributo()');
                                                  }

        | identifier asig StringLiteral2          { $$ = new Atributo($1,$3,@1.first_line,@1.first_column); 
                                                        gramatical.agregar('ATRIBUTO -> id asig StringLiteral2','$$ = new Atributo()');
                                                  }                              
        | error                                     { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                      new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
                                                    }
        ;

CONTENTS: CONTENTS BODY                           { $1 = $1 + ' ' + $2; $$ = $1;
                                                       gramatical.agregar('Contents -> Contents Body','ConcatenarCaracteres()');
                                                  }                               
         | BODY                                   { $$ = $1; 
                                                       gramatical.agregar('Contents -> Body','$$=$1');        
                                                  }                                                         
         ;

BODY: identifier                                  { $$ = $1;  
                                                       gramatical.agregar('Body -> Id','$$=$1');        
                                                  }
    | DoubleLiteral                               { $$ = $1; 
                                                       gramatical.agregar('Body -> DoubleLiteral','$$=$1');}        
                                                  }
    /*| StringLiteral1 { $$ = $1; console.log($$); }
    | StringLiteral2 { $$ = $1; console.log($$); }*/
    | less                                        { $$ = '<'; 
                                                       gramatical.agregar('Body -> <','$$=$1');}        
                                                  }
    | greater                                     { $$ = '>'; 
                                                       gramatical.agregar('Body -> >','$$=$1');}             
                                                  }
    | ampersand                                   { $$ = '&'; 
                                                       gramatical.agregar('Body -> &','$$=$1');}             
                                                  }
    | apostrophe                                  { $$ = "'"; 
                                                       gramatical.agregar("Body -> '",'$$=$1');}             
                                                  }
    | quotation                                   { $$ = '"'; 
                                                       gramatical.agregar('Body -> "','$$=$1');}             
                                                  }
    | simbolos1                                   { $$ = $1; 
                                                       gramatical.agregar('Body -> simbolos1','$$=$1');}             
                                                  }
    //| gt { $$ = $1; console.log($$); }
    | asig                                        { $$ = $1; 
                                                       gramatical.agregar('Body -> asig','$$=$1');}             
                                                  }
    ;