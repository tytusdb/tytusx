%{
  const { ArbolXML } = require('src/app/models/xmlArbol.model')
  const { Objeto } = require('src/app/controllers/xml/objeto.controller');
  const { Atributo } = require('src/app/controllers/xml/atributo.controller');
  const { Excepcion } = require('src/app/models/excepcion.model');
  const { NodoGrafico } = require('src/app/utils/reports/nodoGrafico')
  var errores = []
%}

/* Analisis Lexico */

%lex
%options case-sensitive

comentarios     ("<!--"[^-<]*"-->")
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

/* Analisis Sintactico - Gramatica Descendente */
%start INICIO

%%

INICIO: CONFIG OBJETOS_GLOBALES EOF     {
                                  $$ = {
                                    objetos: $2.objetos,
                                    grafica: new NodoGrafico('RAIZ DESC XML', [$1.grafica, $2.grafica]),
                                    gramatica: `<INICIO> ::= <CONFIG> <OBJETOS> <EOF> \n`
                                  }

                                  $$.gramatica += $1.gramatica;
                                  $$.gramatica += $2.gramatica;
                                  $$.gramatica += `<OBJETOS_GLOBALES> ::= ε\n`

                                  const arbol = new ArbolXML( $$.objetos, $$.grafica, $$.gramatica, errores, $1.encoding);
                                  errores = [];
                                  return arbol;
                               }
| EOF                          {
                                  console.log('Se termino el analisis - Entrada Vacia');
                                  return new ArbolXML([], new NodoGrafico('RAIZ', []), '', [], '')
                               }
;

CONFIG: '<' '?' 'xml' 'version' '=' 'cadena' 'encoding' '=' 'cadena' '?' '>'  {
                                                                                  $$ = {
                                                                                    version: $6,
                                                                                    encoding: $9,
                                                                                    grafica:  new NodoGrafico('CONFIG ', [
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
                                                                                    gramatica: `<CONFIG> ::= "<" "?" "xml" "version" "=" "${$6}" "encoding" "=" "${$9}" "?" ">" \n`
                                                                                  }
                                                                              }
;

OBJETOS_GLOBALES: OBJETOS_GLOBALES OBJETO          {

                                    $1.objetos.push($2.objetos);
                                    $$ = {
                                      objetos: $1.objetos,
                                      grafica: new NodoGrafico('OBJETOS', [$2.grafica, $1.grafica]),
                                      gramatica: `<OBJETOS_GLOBALES> ::= <OBJETO> <OBJETOS> \n`,
                                      valorObj: `${S1.valorObj} ${$2.valorObj}`
                                    }

                                    $$.gramatica += $2.gramatica;
                                    $$.gramatica += $1.gramatica;
                                 }
| OBJETO                         {
                                    $$ = {
                                      objetos: [$1.objetos],
                                      grafica: new NodoGrafico('OBJETOS', [$1.grafica]),
                                      gramatica: `<OBJETOS_GLOBALES> ::= <OBJETO>  \n`,
                                      valorObj: `${$1.valorObj}`
                                    }

                                    $$.gramatica += $1.gramatica;
                                 }
| error ERROR   {
                  errores.push(new Excepcion('Semántico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                  console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                }
;



OBJETOS: OBJETOS OBJETO          {
                                    $1.objetos.push($2.objetos)
                                    $$ = {
                                      objetos: $1.objetos,
                                      grafica: new NodoGrafico('OBJETOS', [$2.grafica, $1.grafica]),
                                      gramatica: `<OBJETOS> ::= <OBJETO> <OBJETOS> \n`,
                                      valorObj: `${$1.valorObj} ${$2.valorObj}`
                                    }

                                    $$.gramatica += $2.gramatica;
                                    $$.gramatica += $1.gramatica;
                                 }
| OBJETO                         {
                                    $$ = {
                                      objetos: [$1.objetos],
                                      grafica: new NodoGrafico('OBJETOS', [$1.grafica]),
                                      gramatica: `<OBJETOS> ::= <OBJETO>  \n`,
                                      valorObj: `${$1.valorObj}`
                                    }

                                    $$.gramatica += $1.gramatica;
                                 }
| error  ERROR  {
                    errores.push(new Excepcion('Semántico', `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, this._$.first_line, this._$.first_column));
                    console.log(`Error Sintáctico: ${yytext} Se esperaba ${yy.parser.hash.expected} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                }
;

OBJETO: INICIO_ETIQUETA  DENTRO_OBJETO       {
                                                if($1.id != $2.id){
                                                  errores.push(new Excepcion('Sintáctico', this._$.first_line, this._$.first_column, `Etiqueta Erronea`));
                                                  console.log('Etiquetas diferentes')
                                                }

                                                  $$ = {
                                                    objetos: new Objeto($1.id, $2.valor,this._$.first_line, this._$.first_column, $1.objetos, $2.objetos, ''),
                                                    grafica: new NodoGrafico('OBJETO', [
                                                      $1.grafica, $2.grafica
                                                    ]),
                                                    gramatica: `<OBJETO> ::= <INICIO_ETIQUETA> <DENTRO_OBJETO> \n`,
                                                    valorObj: `${$1.valorObj} ${$2.valorObj}\n`
                                                  }
                                                  $$.objetos.valorObj = $$.valorObj;
                                                  $$.gramatica += $1.gramatica;
                                                  $$.gramatica += $2.gramatica;

                                              }
;

DENTRO_OBJETO:  OBJETOS FIN_ETIQUETA1         {
                                                  $$ = {
                                                    objetos: $1.objetos,
                                                    grafica: new NodoGrafico('DENTRO_OBJETO', [$1.grafica, $2.grafica]),
                                                    gramatica: `<DENTRO_OBJETO> ::= <OBJETOS> <FIN_ETIQUETA> \n`,
                                                    id: $2.id,
                                                    valor: '',
                                                    valorObj: `\n${$1.valorObj} ${$2.valorObj}`
                                                  }

                                                  $$.gramatica += $1.gramatica;
                                                  $$.gramatica += $2.gramatica;
                                              }
| TEXTO FIN_ETIQUETA2                      {
                                                  $$ = {
                                                    objetos: [],
                                                    grafica: new NodoGrafico('DENTRO_OBJETO', [$1.grafica, $2.grafica]),
                                                    gramatica: `<DENTRO_OBJETO> ::= <TEXTO> <FIN_ETIQUETA> \n`,
                                                    id: $2.id,
                                                    valor: $1.valor,
                                                    valorObj: `${$1.valor} ${$2.valorObj}`
                                                  }

                                                  $$.gramatica += $1.gramatica;
                                                  $$.gramatica += $2.gramatica;
                                              }
| 'id' FIN_ETIQUETA1                          {
                                                  $$ = {
                                                    objetos: [],
                                                    grafica: new NodoGrafico('DENTRO_OBJETO', [
                                                      new NodoGrafico('ID', [new NodoGrafico($1, [])]), $2.grafica]),
                                                    gramatica: `<DENTRO_OBJETO> ::= "${$1}" <FIN_ETIQUETA> \n`,
                                                    id: $2.id,
                                                    valor: $1,
                                                    valorObj: `${$1} ${$2.valorObj}`
                                                  }

                                                  $$.gramatica += $2.gramatica;
                                              }
| 'decimal' FIN_ETIQUETA1                     {
                                                  $$ = {
                                                    objetos: [],
                                                    grafica: new NodoGrafico('DENTRO_OBJETO', [
                                                      new NodoGrafico('DECIMAL', [new NodoGrafico($1, [])]), $2.grafica]),
                                                    gramatica: `<DENTRO_OBJETO> ::= "${$1}" <FIN_ETIQUETA> \n`,
                                                    id: $2.id,
                                                    valor: $1,
                                                    valorObj: `${$1} ${$2.valorObj}`
                                                  }

                                                  $$.gramatica += $2.gramatica;
                                              }
| 'digito'  FIN_ETIQUETA1                     {
                                                  $$ = {
                                                    objetos:[],
                                                    grafica: new NodoGrafico('DENTRO_OBJETO', [
                                                      new NodoGrafico('DIGITO', [new NodoGrafico($1, [])]), $2.grafica]),
                                                    gramatica: `<DENTRO_OBJETO> ::= "${$1}" <FIN_ETIQUETA> \n`,
                                                    id: $2.id,
                                                    valor: $1,
                                                    valorObj: `${$1} ${$2.valorObj}`
                                                  }

                                                  $$.gramatica += $2.gramatica;
                                              }
;

FIN_ETIQUETA1: '<' '/' 'id' '>' {
                                  $$ = {
                                    objetos: [],
                                    grafica: new NodoGrafico('FIN_ETIQUETA', [new NodoGrafico('FIN_ETIQUETA', [
                                      new NodoGrafico('<', []),
                                      new NodoGrafico('/', []),
                                      new NodoGrafico('ID', [new NodoGrafico($3, [])]),
                                      new NodoGrafico('>', [])
                                    ])]),
                                    gramatica:`<FIN_ETIQUETA> ::= "<" "/" "${$3}" ">"\n`,
                                    id: $3,
                                    valorObj: `</${$3}>`
                                  }
                                }
;

FIN_ETIQUETA2: 'id' '>' {
                          $$ = {
                            objetos: [],
                            grafica: new NodoGrafico('FIN_ETIQUETA', [new NodoGrafico('FIN_ETIQUETA', [
                              new NodoGrafico('<', []),
                              new NodoGrafico('/', []),
                              new NodoGrafico('ID', [new NodoGrafico($1, [])]),
                              new NodoGrafico('>', [])
                            ])]),
                            gramatica:`<FIN_ETIQUETA> ::= "<" "/" "${$1}" ">"\n`,
                            id: $1,
                            valorObj: `</${$1}>`
                          }
                        }
;


INICIO_ETIQUETA:'<' 'id' ATRIBUTOS '>'  {
                                          $$ = {
                                            objetos: $3.objetos,
                                            grafica: new NodoGrafico('INICIO_ETIQUETA', [
                                              new NodoGrafico('<', []),
                                              new NodoGrafico('ID', [new NodoGrafico($2, [])]),
                                              $3.grafica,
                                              new NodoGrafico('>', [])
                                            ]),
                                            gramatica: `<INICIO_ETIQUETA> ::= "<" "${$2}" <ATRIBUTOS> ">" \n`,
                                            id: $2,
                                            valorObj: `<${$2} ${$3.valorObj}>`
                                          }
                                          $$.gramatica += $3.gramatica
}
;


ATRIBUTOS: ATRIBUTO ATRIBUTOS   {
                                    $2.objetos.push($1.objetos)
                                    $$ = {
                                      objetos: $2.objetos,
                                      grafica: new NodoGrafico('ATRIBUTOS', [$1.grafica, $2.grafica]),
                                      gramatica: `<ATRIBUTOS> ::= <ATRIBUTO> <ATRIBUTOS>\n`,
                                      valorObj: `${$1.valorObj} ${$2.valorObj}`
                                    }

                                    $$.gramatica += $1.gramatica + $2.gramatica;
                                }
|                               {
                                    $$ = {
                                      objetos: [],
                                      grafica: new NodoGrafico('ATRIBUTOS', [
                                      new NodoGrafico('ε', [])]),
                                      gramatica: `<ATRIBUTOS> ::= ε \n`,
                                      valorObj: ``
                                    }

                                }
;


ATRIBUTO: 'id' '=' 'cadena'   {
                                  $$ = {
                                    objetos: new Atributo($1, $3, this._$.first_line, this._$.first_column),
                                    grafica: new NodoGrafico('ATRIBUTO', [
                                      new NodoGrafico('ID', [new NodoGrafico($1, [])]),
                                      new NodoGrafico('=', []),
                                      new NodoGrafico('CADENA', [new NodoGrafico($3, [])])
                                    ]),
                                    gramatica: `<ATRIBUTO> ::= "${$1}" "=" "${$3}"\n`,
                                    valorObj: `${$1} = "${$3}"`
                                  }
                              }
;

TEXTO: 'dentro'               {
                                $$ = {
                                  grafica: new NodoGrafico('TEXTO', [
                                    new NodoGrafico($1, [])
                                  ]),
                                  gramatica: `<TEXTO> ::= "${$1}"\n`,
                                  valor: $1
                                }
                              }
;


ERROR:  '/'
| '<'
| 'id'
| '>'
| 'dentro'
;
