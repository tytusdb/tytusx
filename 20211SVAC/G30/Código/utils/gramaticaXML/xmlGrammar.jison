%{
    const { Excepcion } = require('src/app/models/excepcion.model');
    var listaErroresJison = Array();
%}

/****************************** Definición Léxica ***********************************/
%lex

%options case-sensitive

%% 

\s+                                                   /* Ignora los espacios en blanco */
"<!--".*"-->"                                         //Ignora los comentarios

"<"                                                   {return 'tk_<';         }
">"                                                   {return 'tk_>';         }
"="                                                   {return 'tk_=';         }
"/"                                                   {return 'tk_/';         }
"?"                                                   {return 'tk_?';         }
"xml"                                                 {return 'pr_xml';       }
"version"                                             {return 'pr_version';   }
"encoding"                                            {return 'pr_encoding';  }
"&lt;"                                                {return '&lt';          }
"&gt;"                                                {return '&gt';          }
"&amp;"                                               {return '&amp';         }
"&apos;"                                              {return '&apos';        }
"&quot;"                                              {return '&quot';        }

\"[^\"]*\"	                                          {return 'cadena';             } 
(((\&\w+\;)|[^&<>])*\<\/)                             {yytext = yytext.substring(0, yyleng-2); return 'contenidoEtiqueta';  }
([a-zA-Z_])[a-zA-Z0-9_]*                              {return 'identificador';      }
[0-9]+                                                {return 'entero';             }
[0-9]+("."[0-9]+)\b                                   {return 'decimal';            }


<<EOF>>                                               return 'EOF';

.                 {
                        listaErroresJison.push(new Excepcion('Léxico', yylloc.first_line, yylloc.first_column, yytext));
                  }
/lex


/**************************** Analisis Sintactico *********************************/

%{
    const { Paquete } = require('src/app/models/CST/paquete.model');
    const { NodoCST } = require('src/app/models/CST/nodoCST.model');

%}

%start INICIO

%%  /* Gramatica Ascendente */

INICIO 
      : PROBJ EOF                                     { const raiz = new NodoCST('INICIO', [$1.nodos]);
                                                        const prod = "<INICIO>\t::= PROBJ EOF\n"+$1.producciones;
                                                        const paquete = new Paquete(listaErroresJison, raiz, prod, $1.version, $1.encoding);
                                                            console.log("Analisis Completo"); 
                                                            listaErroresJison = [];
                                                            return paquete; 
                                                      }
      | EOF                                           { const info = new Paquete([], new NodoCST('INICIO', []), "", "", "");
                                                            console.log("EmptyFile"); 
                                                            return info; 
                                                      }
;

PROBJ 
      : PROLOG OBJETO                                 {$$ = {
                                                            version: $1.version,
                                                            encoding: $1.encoding,
                                                            nodos: new NodoCST('PROBJ', [$1.nodos, $2.nodos]),
                                                            producciones: "<PROBJ>\t\t::= PROLOG OBJETO\n" + $1.producciones + $2.producciones
                                                      };
                                                      }
      | OBJETO                                        {$$ = {
                                                            prolog: { version: "", encoding: "" },
                                                            nodos: new NodoCST('PROBJ', [$1.nodos]),
                                                            producciones: "<PROBJ>\t\t::= <OBJETOS>\n" + $1.producciones
                                                      };
                                                      }
;

PROLOG
      : 'tk_<' 'tk_?' 'pr_xml' 'pr_version' 'tk_=' 'cadena' 'pr_encoding' 'tk_=' 'cadena' 'tk_?' 'tk_>' { $$ = {
            version: ($6!=null)?$6.substring(1, $6.length - 1):"",
            encoding: ($9!=null)?$9.substring(1, $9.length - 1):"",
            nodos: new NodoCST('PROLOG', [
                  new NodoCST('tk_<', []),           new NodoCST('tk_?', []), new NodoCST('pr_xml', []),
                  new NodoCST('pr_version', []),     new NodoCST('tk_=', []), new NodoCST('cadena', [new NodoCST($6, [])]),
                  new NodoCST('pr_encoding', []),    new NodoCST('tk_=', []), new NodoCST('cadena', [new NodoCST($9, [])]),
                  new NodoCST('tk_?', []),           new NodoCST('tk_>', []),
            ]),
            producciones: "<PROLOG>\t\t::= 'tk_<' 'tk_?' 'pr_xml' 'pr_version' 'tk_=' 'cadena' 'pr_encoding' 'tk_=' 'cadena' 'tk_?' 'tk_>'\n"
      };}
;

OBJETO
      : 'tk_<' 'identificador' 'tk_>' 'tk_<' 'tk_/' 'identificador' 'tk_>'          {     if($2 != $6){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),                           new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('>', []),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),   new NodoCST('id', [new NodoCST($6, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' 'tk_>' 'tk_<' 'tk_/' 'identificador' 'tk_>'\n"
                                                                                          };
                                                                                    }
                                                                                    
      | 'tk_<' 'identificador' 'tk_>' 'contenidoEtiqueta' 'identificador' 'tk_>'    {     if($2 != $5){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),                           new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('>', []),
                                                                                                      new NodoCST('contenidoE', [new NodoCST($4, [])]),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),   new NodoCST('id', [new NodoCST($5, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' 'tk_>' 'contenidoEtiqueta' 'identificador' 'tk_>'\n"
                                                                                          };
                                                                                    }

      /*| 'tk_<' 'identificador' LATRIBUTOS 'tk_/' 'tk_>'                        {     $$ = {
                                                                                          nodos: new NodoCST('OBJETO', [
                                                                                                new NodoCST('<', []),   new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('/', []),   new NodoCST('>', [])
                                                                                          ]),
                                                                                          producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' LATRIBUTOS 'tk_/' 'tk_>'"
                                                                                    };
                                                                              }*/

      | 'tk_<' 'identificador' LATRIBUTOS 'tk_>' 'tk_<' 'tk_/' 'identificador' 'tk_>'{    if($2 != $7){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),   new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('LATRIBUTOS', [$3.nodos]),    new NodoCST('>', []),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),                     new NodoCST('id', [new NodoCST($7, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' LATRIBUTOS 'tk_>' 'tk_<' 'tk_/' 'identificador' 'tk_>'\n" + $3.producciones
                                                                                          };
                                                                                    }

      | 'tk_<' 'identificador' LATRIBUTOS 'tk_>' 'contenidoEtiqueta' 'identificador' 'tk_>' 
                                                                                    {     if($2 != $6){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),   new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('LATRIBUTOS', [$3.nodos]),    new NodoCST('>', []),
                                                                                                      new NodoCST('contenidoE', [new NodoCST($5, [])]),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),                     new NodoCST('id', [new NodoCST($6, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' LATRIBUTOS 'tk_>' 'contenidoEtiqueta' 'identificador' 'tk_>'\n" + $3.producciones
                                                                                          };
                                                                                    }
      | 'tk_<' 'identificador' LATRIBUTOS 'tk_>' OBJETOS 'tk_<' 'tk_/' 'identificador' 'tk_>'  
                                                                                    {     if($2 != $8){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),   new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('LATRIBUTOS', [$3.nodos]),    new NodoCST('>', []),
                                                                                                      new NodoCST('OBJETOS', [$5.nodos]),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),                     new NodoCST('id', [new NodoCST($8, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' LATRIBUTOS 'tk_>' OBJETOS 'tk_<' 'tk_/' 'identificador' 'tk_>'\n" + $3.producciones + $5.producciones
                                                                                          };
                                                                                    }
      | 'tk_<' 'identificador' 'tk_>' OBJETOS 'tk_<' 'tk_/' 'identificador' 'tk_>'  {     if($2 != $7){
                                                                                                listaErroresJison.push( new Excepcion('Semántico', this._$.first_line, this._$.first_column, `Etiqueta no correspondiente`));
                                                                                          }
                                                                                          $$ = {
                                                                                                nodos: new NodoCST('OBJETO', [
                                                                                                      new NodoCST('<', []),                                             new NodoCST('id', [new NodoCST($2, [])]), new NodoCST('>', []),
                                                                                                      new NodoCST('OBJETOS', [$4.nodos]),
                                                                                                      new NodoCST('<', []),   new NodoCST('/', []),                     new NodoCST('id', [new NodoCST($7, [])]), new NodoCST('>', [])
                                                                                                ]),
                                                                                                producciones: "<OBJETO>\t\t::= 'tk_<' 'identificador' 'tk_>' OBJETOS 'tk_<' 'tk_/' 'identificador' 'tk_>'\n" + $4.producciones
                                                                                          };
                                                                                    }
      /*| error RECUPERACION                            {
                                                      listaErroresJison.push(new Excepcion('Sintáctico', this._$.first_line, this._$.first_column, `No se esperaba: ${yytext}`));
                                                      console.log(`Sintáctico,Recuperacion: ${yytext} No corresponde en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                                                      }*/
;

OBJETOS 
      : OBJETOS OBJETO                          {     $$ = {
                                                            nodos: new NodoCST('OBJETOS', [$1.nodos, $2.nodos]),
                                                            producciones: "<OBJETOS>\t::= OBJETOS OBJETO\n" + $1.producciones + $2.producciones
                                                      };
                                                }
      | OBJETO                                  {$$ = $1;}
;

LATRIBUTOS
      :  LATRIBUTOS ATRIBUTO                    {     $$ = {
                                                            nodos: new NodoCST('LATRIBUTOS', [$1.nodos, $2.nodos]),
                                                            producciones: "<LATRIBUTOS>\t::= LATRIBUTOS ATRIBUTO\n" + $1.producciones + $2.producciones
                                                      };
                                                }
      | ATRIBUTO                                {$$ = $1;}
;

ATRIBUTO
      : 'identificador' 'tk_=' 'cadena'         {     $$ = {
                                                            nodos: new NodoCST('ATRIBUTO', [
                                                                  new NodoCST('id', [new NodoCST($1, [])]), new NodoCST('=', []), new NodoCST('cadena', [new NodoCST($3, [])])
                                                            ]),
                                                            producciones: "<ATRIBUTO>\t\t::= 'identificador' 'tk_=' 'cadena'"
                                                      };
                                                }
      /*| error RECUPERACION                            {
                                                      listaErroresJison.push(new Excepcion('Sintáctico', this._$.first_line, this._$.first_column, `No se esperaba: ${yytext}`));
                                                      console.log(`Sintáctico,Recuperacion: ${yytext} No corresponde en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                                                      }*/
;

CONTENIDO
      : 'contenidoEtiqueta' { $$ = $1 }
      | '&lt'               { $$ = $1 }
      | '&gt'               { $$ = $1 }
      | '&amp'              { $$ = $1 }
      | '&apos'             { $$ = $1 }
      | '&quot'             { $$ = $1 }
;


RECUPERACION
      : 'tk_<'          {$$ = $1;}
      | 'tk_/'          {$$ = $1;}
      | 'tk_>'          {$$ = $1;}
      | 'cadena'        {$$ = $1;}
;



