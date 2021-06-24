%{
  const { ArbolXML } = require('src/app/models/xmlArbol.model')
  const { Objeto } = require('src/app/controllers/xml/objeto.controller');
  const { Atributo } = require('src/app/controllers/xml/atributo.controller');
  const { Excepcion } = require('src/app/models/excepcion.model');
  const { NodoGrafico } = require('src/app/utils/reports/nodoGrafico');
  const { Buffer } = require('buffer')
  var errores = []
  var encodingGeneral = ''
%}

/* Analisis Lexico */

%lex
%options case-sensitive

comentarios     ("<!--"[^->]*"-->")
id              (([a-zA-Z_])[a-zA-Z0-9_-]*)
digito          ([0-9]+)
decimal         ({digito}"."{digito}+)
comillaDoble    ("\"")s
comillaSimple   ("'")
comillas        ({comillaDoble}|{comillaSimple})
cadena          ({comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas})
dentro          (((\&\w+\;)|[^&<>])*\<\/)

%%
\s+    /* Ignora los espacios en blanco */
{comentarios}    /* { console.log(`Esto es un comentario ${yytext}`); } /* Ignora los comentarios */

"<"               { return '<';}
">"               { return '>';}
"="               { return '=';}
"/"               { return '/';}
"?"               { return '?';}
"xml"             { return 'xml';}
"version"         { return 'version';}
"encoding"        { return 'encoding';}
{cadena}          { yytext = yytext.substr(1, yyleng-2);  return 'cadena'; }
{dentro}          { yytext = yytext.substr(0, yyleng-2);  return 'dentro'; }
{id}              { return 'id';}
{digito}          { return 'digito'; }
{decimal}         { return 'decimal'; }
<<EOF>>           { return 'EOF';}
.                 {
                    errores.push(new Excepcion('Léxico', `Patrón desconocido -> ${yytext}`, yylloc.first_line, yylloc.first_column));
                    console.log(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y en la columna ${yylloc.first_column} `);
                  }
/lex


/* Analisis Sintactico */
%start INICIO

%%  // Gramatica Ascendente

  INICIO : CONFIG OBJETOS_GLOBALES EOF  {
                                        $$ = {
                                          objetos: $2.objetos,
                                          grafica: new NodoGrafico('RAIZ ASC XML', [
                                            $1.grafica,
                                            $2.grafica
                                          ]),
                                          gramatica: `<INICIO> ::= <CONFIG> <OBJETOS_GLOBALES> <EOF> \t\t\t\t\t\t\t\t\t\t\t\t { INICIO.objetos = OBJETOS_GLOBALES.objetos; }\n`
                                        }

                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $2.gramatica;

                                         const arbol = new ArbolXML($$.objetos, $$.grafica, $$.gramatica, errores, $1.encoding);
                                         errores = []
                                         return arbol

                                        }
  | EOF { console.log('Se termino el analisis - Entrada Vacia');
         return new ArbolXML([], new NodoGrafico('RAIZ', []), '', [], '')
        }
  | error               {
                          errores.push(new Excepcion('Sintáctico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                          console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                        }
  ;

  CONFIG: '<' '?' 'xml' 'version' '=' 'cadena' 'encoding' '=' 'cadena' '?' '>'  {
                                                                                  $$ = {
                                                                                    version: $6,
                                                                                    encoding: $9,
                                                                                    grafica: new NodoGrafico('CONFIG ', [
                                                                                      new NodoGrafico('<', []),
                                                                                      new NodoGrafico('?', []),
                                                                                      new NodoGrafico('xml', []),
                                                                                      new NodoGrafico('version', []),
                                                                                      new NodoGrafico('=', []),
                                                                                      new NodoGrafico('CADENA', [new NodoGrafico($6, [])]),
                                                                                      new NodoGrafico('encoding', []),
                                                                                      new NodoGrafico('=', []),
                                                                                      new NodoGrafico('CADENA', [new NodoGrafico($9, [])]),
                                                                                      new NodoGrafico('?', []),
                                                                                      new NodoGrafico('>', [])
                                                                                    ]),
                                                                                    gramatica: `<CONFIG> ::= "<" "?" "xml" "version" "=" "${$6}" "encoding" "=" "${$9}" "?" ">"      { version = cadena1.lexvalor; encoding = cadena2.lexvalor;  } \n`
                                                                                  }

                                                                                  encodingGeneral = $9;

                                                                                }
  ;

  OBJETOS_GLOBALES: OBJETOS_GLOBALES OBJETO {
                                              $1.objetos.push($2.objetos);
                                              $$ = {
                                                objetos: $1.objetos,
                                                grafica: new NodoGrafico('OBJETOS GLOBALES', [
                                                  $1.grafica,
                                                  $2.grafica
                                                ]),
                                                gramatica: `<OBJETOS_GLOBALES> ::= <OBJETOS_GLOBALES> <OBJETO> \t\t\t\t\t\t\t\t\t\t\t\t { OBJETOS_GLOBALES1.objetos.push(OBJETO.objetos);   objetos = OBJETOS_GLOBLES1.objetos; }\n`,
                                                valorObj: `${$1.valorObj}\n${$2.valorObj}\n`
                                              }

                                              $$.gramatica += $1.gramatica;
                                              $$.gramatica += $2.gramatica;
                                            }
  | OBJETO                                  {
                                              $$ = {
                                                objetos: [$1.objetos],
                                                grafica: new NodoGrafico('OBJETOS GLOBALES', [$1.grafica]),
                                                gramatica: `<OBJETOS_GLOBALES> ::= <OBJETO> \t\t\t\t\t\t\t\t\t\t\t\t\t { objetos = OBJETO.objetos; }\n`,
                                                valorObj: `${$1.valorObj}\n`
                                              }
                                              $$.gramatica += $1.gramatica;
                                            }
  | error               {
                          errores.push(new Excepcion('Sintáctico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                          console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                        }
  ;


  OBJETOS : OBJETOS OBJETO          {
                                        $1.objetos.push($2.objetos);
                                        $$ = {
                                          objetos: $1.objetos,
                                          grafica: new NodoGrafico('OBJETOS', [$1.grafica, $2.grafica]),
                                          gramatica: `<OBJETOS> ::= <OBJETOS> <OBJETO> \t\t\t\t\t\t\t\t\t\t\t\t { OBJETOS1.objetos.push(OBJETO.objetos); objetos = OBJETOS1.objetos; }  \n`,
                                          valorObj: `${$1.valorObj}${$2.valorObj}`
                                        }

                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $2.gramatica;
                                    }
  | OBJETO                          {
                                        $$ = {
                                          objetos: [$1.objetos],
                                          grafica: new NodoGrafico('OBJETOS', [$1.grafica]),
                                          gramatica: `<OBJETOS> ::= <OBJETO> \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t { objetos = OBJETO.objetos; } \n`,
                                          valorObj:  `${$1.valorObj}`
                                        }

                                        $$.gramatica += $1.gramatica;
                                      }
  ;

  OBJETO:  '<' 'id' ATRIBUTOS '>' OBJETOS '<' '/' 'id' '>'      {
                                                                  if($2 != $8) {
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));
                                                                    console.log('Error en las etiquetas');
                                                                  }
                                                                    $$ = {
                                                                      objetos: new Objeto($2, '', this._$.first_line, this._$.first_column, $3.objetos, $5.objetos, ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      $3.grafica,
                                                                      new NodoGrafico('>',[]),
                                                                      $5.grafica,
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($8, [])]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" <ATRIBUTOS> ">" <OBJETOS> "<" "/" "${$8}" ">" \t\t\t\t { objetos = new Objeto(id.valor, '', ATRIBUTOS.objetos, OBJETOS.objeto); } \n`,
                                                                      valorObj: `<${$2} ${$3.valorObj}>\n${$5.valorObj}</${$8}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;
                                                                    $$.gramatica += $3.gramatica;
                                                                    $$.gramatica += $5.gramatica;
                                                                }
  | '<' 'id' '>' OBJETOS '<' '/' 'id' '>'                       {
                                                                  if($2 != $7){
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));
                                                                    console.log('Error en las etiquetas 2')
                                                                  }

                                                                  $$ = {
                                                                      objetos: new Objeto($2, '', this._$.first_line, this._$.first_column, [], $4.objetos, ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      new NodoGrafico('>',[]),
                                                                      $4.grafica,
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($7), []]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" ">" <OBJETOS> "<" "/" "${$7}" "> \t\t\t\t\t\t\t { objetos = new Objeto(id.valor, '', [], OBJETOS.objeto); }"\n`,
                                                                      valorObj: `<${$2}>\n${$4.valorObj}</${$7}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;
                                                                    $$.gramatica += $4.gramatica;

                                                                }
  | '<' 'id' ATRIBUTOS '>' TEXTO /*'<' */ /*'/'*/ 'id' '>'      {
                                                                  if($2 != $6){
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));
                                                                    console.log('Error en las etiquetas 3')
                                                                  }

                                                                  $$ = {
                                                                      objetos: new Objeto($2, $5.texto, this._$.first_line, this._$.first_column, $3.objetos,[], ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      $3.grafica,
                                                                      new NodoGrafico('>',[]),
                                                                      new NodoGrafico('TEXTO', [new NodoGrafico($5.texto, [])]),
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($6, [])]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" <ATRIBUTOS> ">" <TEXTO> "<" "/" "${$6}" ">" \t\t\t\t { objetos = new Objeto(id.valor, TEXTO.valor, ATRIBUTOS.objetos, []); }\n`,
                                                                      valorObj: `<${$2} ${$3.valorObj} > ${$5.texto} </${$6}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;
                                                                    $$.gramatica += $3.gramatica;
                                                                    $$.gramatica += $5.gramatica;
                                                                }
  | '<' 'id' '>' TEXTO /*'<' */  /* '/'*/ 'id' '>'              {
                                                                  if($2 != $5){
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));
                                                                    console.log('Error en las etiquetas 4');
                                                                  }
                                                                  $$ = {
                                                                      objetos: new Objeto($2, $4.texto, this._$.first_line, this._$.first_column, [], [], ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      new NodoGrafico('>', []),
                                                                      new NodoGrafico('TEXTO', [new NodoGrafico($4.texto, [])]),
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($5, [])]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" ">" <TEXTO> "<" "/" "${$5}" ">" \t\t\t\t\t\t\t\t\t\t  { objetos = new Objeto(id.valor, TEXTO.valor, [], []); }\n`,
                                                                      valorObj: `<${$2}> ${$4.texto} </${$5}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;
                                                                    $$.gramatica += $4.gramatica;
                                                                  }

 // Aqui
   | '<' 'id' ATRIBUTOS '>' TEXTO '<'  '/' 'id' '>'      {
                                                                  if($2 != $8){
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));
                                                                    console.log('Error en las etiquetas 3')
                                                                  }

                                                                  $$ = {
                                                                      objetos: new Objeto($2, $5.texto, this._$.first_line, this._$.first_column, $3.objetos,[], ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      $3.grafica,
                                                                      new NodoGrafico('>',[]),
                                                                      new NodoGrafico('TEXTO', [new NodoGrafico($5.texto, [])]),
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($8, [])]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" <ATRIBUTOS> ">" <TEXTO> "<" "/" "${$8}" ">" \t\t\t\t\t\t\t\t\t\t\t\t   { objetos = new Objeto(id.valor, TEXTO.valor, [], []); }\n`,
                                                                      valorObj: `<${$2} ${$3.valorObj} > ${$5.texto} </${$8}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;

                                                                    $$.gramatica += $3.gramatica;
                                                                    $$.gramatica += $5.gramatica;
                                                                }
  | '<' 'id' '>' TEXTO '<'   '/' 'id' '>'              {
                                                                  if($2 != $7){
                                                                    errores.push(new Excepcion('Semántico', this._$.first_line, this._$.first_column, 'Etiqueta erronea'));

                                                                  }
                                                                  $$ = {
                                                                      objetos: new Objeto($2, $4.texto, this._$.first_line, this._$.first_column, [], [], ''),
                                                                      grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      new NodoGrafico('>', []),
                                                                      new NodoGrafico('TEXTO', [new NodoGrafico($4.texto, [])]),
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($7, [])]),
                                                                      new NodoGrafico('>', [])
                                                                      ]),
                                                                      gramatica: `<OBJETO> ::= "<" "${$2}" ">" <TEXTO> "<" "/" "${$7}" ">"  \t\t\t\t\t\t\t\t\t\t\t\t    { objetos = new Objeto(id.valor, TEXTO.valor, [], []); }\n`,
                                                                      valorObj: `<${$2}> ${$4.texto} </${$7}>\n`
                                                                    }
                                                                    $$.objetos.valorObj = $$.valorObj;
                                                                    $$.gramatica += $4.gramatica;
                                                                  }
  | '<' 'id' ATRIBUTOS '/' '>'                                  {
                                                                  $$ = {
                                                                    objetos: new Objeto($2, '', this._$.first_line, this._$.first_column,$3.objetos, [], ''),
                                                                    grafica: new NodoGrafico('OBJETO', [
                                                                      new NodoGrafico('<', []),
                                                                      new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                                                      $3.grafica,
                                                                      new NodoGrafico('/', []),
                                                                      new NodoGrafico('>', [])
                                                                    ]),
                                                                    gramatica: `<OBJETO> ::= "<" "${$2}" <ATRIBUTOS> "/" ">"  \t\t\t\t\t\t\t\t\t\t\t\t    { objetos = new Objeto(id.valor, '', ATRIBUTOS.objetos, []); } \n`,
                                                                    valorObj: `<${$2} ${$3.valorObj} /> \n`
                                                                  }
                                                                  $$.objetos.valorObj = $$.valorObj;
                                                                  $$.gramatica += $3.gramatica;
                                                                }
  ;

  ATRIBUTOS :  ATRIBUTOS ATRIBUTO     {
                                        $1.objetos.push($2.objetos);
                                        $$ = {
                                          objetos: $1.objetos,
                                          grafica: new NodoGrafico('ATRIBUTOS', [$1.grafica, $2.grafica]),
                                          gramatica: `<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO> \t\t\t\t\t\t\t\t\t\t\t\t\t\t     { ATRIBUTOS1.objetos.push(ATRIBUTO.objetos); objetos = ATRIBUTOS1.objetos; }\n`,
                                          valorObj: `${$1.valorObj} ${$2.valorObj}`
                                        }

                                        $$.gramatica += $1.gramatica;
                                        $$.gramatica += $2.gramatica;
                                      }
  | ATRIBUTO                          {
                                        $$ = {
                                          objetos: [$1.objetos],
                                          grafica: new NodoGrafico('ATRIBUTOS', [$1.grafica]),
                                          gramatica: `<ATRIBUTOS> ::= <ATRIBUTO>  \t\t\t\t\t\t\t\t\t\t\t\t\t\t    { objetos = ATRIBUTO.objetos ; }  \n`,
                                          valorObj: $1.valorObj
                                        }
                                        $$.gramatica += $1.gramatica;
                                      }
  ;

  ATRIBUTO: 'id' '=' 'cadena'        { $$ = {
                                              objetos: new Atributo($1, $3, this._$.first_line, this._$.first_column),
                                              grafica: new NodoGrafico('ATRIBUTO', [
                                                new NodoGrafico('ID', [new NodoGrafico($1, [])]),
                                                new NodoGrafico('=', []),
                                                new NodoGrafico('CADENA', [new NodoGrafico($3, [])])
                                              ]),
                                              gramatica:  `<ATRIBUTO> ::= "${$1}" "=" "${$3}" \t\t\t\t\t\t\t\t\t\t\t\t\t { objetos = new Atributo(id.valor, cadena.valor); }\n`,
                                              valorObj: `${$1} = "${$3}"`
                                            }
                                      }
  ;

  TEXTO: TEXTO CONTENIDO  { $$ = {
                            texto: `${$1} ${$2}`,
                            gramatica: `<TEXTO > ::= "${$1} ${$2}" \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t { valor = TEXTO.lexvalor }\n`
                            }
                            $$.texto = $$.texto.replaceAll('&amp;', '&');
                            $$.texto = $$.texto.replaceAll('&quot;', "'");
                            $$.texto = $$.texto.replaceAll('&apos;', '"');
                            $$.texto = $$.texto.replaceAll('&lt;', '<');
                            $$.texto = $$.texto.replaceAll('&gt;', '>');

                            if(encodingGeneral.toLowerCase() == 'iso-8859-1'){
                              $$.texto = buffer.toString('Latin1');
                            }else if (encodingGeneral.toLowerCase() == 'ascii'){
                              $$.texto = buffer.toString('ASCII');
                            }else{
                               $$.texto = buffer.toString('UTF-8');
                            }

                            $$.gramatica =  `<TEXTO > ::= "${$$.texto}" \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t { valor = TEXTO.lexvalor }\n`

                          }
  | CONTENIDO             {
                            $$ = {
                              texto: $1,
                              gramatica: `<TEXTO> ::= "${$1}" \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t { valor = TEXTO.lexvalor }\n`
                            }
                            $$.texto = $$.texto.replaceAll('&amp;', '&');
                            $$.texto = $$.texto.replaceAll('&quot;', "'");
                            $$.texto = $$.texto.replaceAll('&apos;', '"');
                            $$.texto = $$.texto.replaceAll('&lt;', '<');
                            $$.texto = $$.texto.replaceAll('&gt;', '>');
                            let buffer = new Buffer($$.texto);

                            if(encodingGeneral.toLowerCase() == 'iso-8859-1'){
                              $$.texto = buffer.toString('Latin1');
                            }else if (encodingGeneral.toLowerCase() == 'ascii'){
                              $$.texto = buffer.toString('ASCII');
                            }else{
                               $$.texto = buffer.toString('UTF-8');
                            }

                            $$.gramatica =  `<TEXTO> ::= "${$$.texto}" \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t { valor = TEXTO.lexvalor }\n`
                          }
  ;

  CONTENIDO: 'dentro' { $$ = $1; }
  | 'id'              { $$ = $1; }
  | 'digito'          { $$ = $1; }
  | 'decimal'         { $$ = $1; }
  ;


  ERROR:  '/'
  | '<'
  | 'id'
  | '>'
  | 'dentro'
  ;
