/************************************************  Aqui los imports ************************************************/
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {Encoding} = require("../Expresiones/Encoding");
    let tokenArray = new Array();
    module.exports.tokenArray = tokenArray;

    let gramaticalArray = new Array();
    module.exports.gramaticalArray = gramaticalArray;

%}

/************************************************ Aqui va el lenguaje lexico ***************************************/

%lex
%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

%%

//ESPACIOS, ENTER Y RETORNOS
[ \t\r\n\f]                                     /*skip*/

"<!--".*"-->"    //Comentario

//PALABRAS RESERVADAS
"xml"       return 'tk_xml'
"version"   return 'tk_version'
"encoding"  return 'tk_encoding'
"&lt"       return 'res_menor'
"&gt"       return 'res_mayor'
"&amp"      return 'res_amp'
"&quot"     return 'res_comillaDoble'
"&apos"     return 'res_comillaSimple'


//SIMBOLOS
"<"                 return '<'
">"                 return '>'
"/"                 return '/'
"="                 return '='
"?"                 return '?'
"&"                 return '&'
"!"                 return '!'
"#"                 return '#'
"$"                 return '$'
"%"                 return '%'
"("                 return '('
")"                 return ')'
"["                 return '['
"]"                 return ']'
"@"                 return '@'
"¡"                 return '¡'
"¿"                 return '¿'
","                 return 'tk_coma'
";"                 return 'tk_ptcoma'
"."                 return 'tk_pt'
":"                 return 'tk_dospts'
"_"                 return 'tk_guionbajo'


//NUMERO Y ID
[0-9]+("."[0-9]+)*          %{ return 'tk_numero'; %}
[a-zA-Z_]([a-zA-Z0-9_ñÑ])*  %{ return 'tk_id'; %}

{stringliteral}             %{ return 'StringLiteral'; %}
{charliteral}               %{ return 'CharLiteral'; %}



//error lexico
.	{return 'otro'}


<<EOF>>             %{ return 'EOF'; %}
/lex





/************************************************ Aqui va el lenguaje sintactico ***********************************************/

%left  '<' '>'
%left  '/'
%left  '?'
%left   res_menor, res_mayor
%left   res_amp
%left   res_comillaDoble, res_comillaSimple


%start RAIZ 
%%

RAIZ: L_RAIZ EOF         { $$ = $1; return $$; } 
    ;

L_RAIZ: L_RAIZ ENCODING       { $1.push($2); $$ = $1; }
    | ENCODING                { $$ = [$1]; }             
    ;

ENCODING: '<''?' XML tk_version "=" StringLiteral tk_encoding "=" StringLiteral '?''>' HIJOS         { $$ = new Encoding("almacenamiento", $6, $9, @1.first_line, @1.first_column, $12); 
                                                                                                        let newSymg1 = "<tr> <td>ENCODING-> '<''?' XML tk_version '=' StringLiteral tk_encoding '=' StringLiteral '?''>' HIJOS</td>   <td>ENCODING = concat('<''?' + XML.val + tk_version + '=' + StringLiteral.lexVal + tk_encoding.lexVal + '=' + StringLiteral.lexVal + '?''>' + HIJOS.val)</td> </tr>"
                                                                                                        gramaticalArray.push(newSymg1);
                                                                                                     }
        | HIJOS                                                                                      { $$ = new Encoding("almacenamiento", "", "", @1.first_line, @1.first_column, $1); 
                                                                                                        let newSymg2 = "<tr> <td>ENCODING-> HIJOS.val</td>   <td>ENCODING = HIJOS.val</td> </tr>"
                                                                                                        gramaticalArray.push(newSymg2);
                                                                                                     }
        ;

XML: tk_xml     { $$ = $1;  
                    let newSymg3 = "<tr> <td>XML-> tk_xml</td> <td>XML.val = tk_xml.lexVal</td> </tr>"
                    gramaticalArray.push(newSymg3);
                }
    |           { $$ = []; 
                    let newSymg4 = "<tr> <td>XML-> epsilon</td> <td>XML.val = epsilon</td> </tr>"
                    gramaticalArray.push(newSymg4);
                }
    ;

HIJOS:  '<' tk_id ATRIBUTOS '>' L_HIJOS '<''/' tk_id '>'            { $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, $5); 
                                                                        let newSym = "<tr><td>"+$2+"</td> <td>Objeto</td> <td>"+$2+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                                        tokenArray.push(newSym);
                                                                        let newSymg5 = "<tr> <td>HIJOS->  '<' tk_id ATRIBUTOS '>' L_HIJOS '<''/' tk_id '>'</td> <td>HIJOS.val =  concat('<' + tk_id.lexVal + ATRIBUTOS.val + '>' + L_HIJOS.val + '<''/' + tk_id.lexVal '>')</td> </tr>"
                                                                        gramaticalArray.push(newSymg5);
                                                                    }
      | '<' tk_id ATRIBUTOS '>' L_ID_HIJOS '<''/' tk_id '>'         { $$ = new Objeto($2, $5, @1.first_line, @1.first_column, $3, []); 
                                                                        let newSym1 = "<tr><td>"+$2+"</td> <td>Objeto</td> <td>"+$2+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                                        tokenArray.push(newSym1);
                                                                        let newSym7 = "<tr><td> String </td> <td>Cadena</td> <td>"+$2+"</td> <td>"+$5+"</td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                                        tokenArray.push(newSym7);
                                                                        let newSymg6 = "<tr> <td>HIJOS->  '<' tk_id ATRIBUTOS '>' L_ID_HIJOS '<''/' tk_id '>' </td> <td>HIJOS.val =  concat('<' + tk_id.lexVal + ATRIBUTOS.val + '>' + L_ID_HIJOS.val + '<''/' + tk_id.lexVal '>')</td> </tr>"
                                                                        gramaticalArray.push(newSymg6);
                                                                    }
      | '<' tk_id ATRIBUTOS '/''>'                                  { $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, []); 
                                                                        let newSym2 = "<tr><td>"+$2+"</td> <td>Objeto</td> <td>"+$2+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                                        tokenArray.push(newSym2);
                                                                        let newSymg7 = "<tr> <td>HIJOS->  '<' tk_id ATRIBUTOS '/''>'</td> <td>HIJOS.val =  concat('<' + tk_id.lexVal + ATRIBUTOS.val + '/''>') </td> </tr>"
                                                                        gramaticalArray.push(newSymg7);
                                                                    }
      ;

ATRIBUTOS: L_ATRIBUTOS              { $$ = $1; 
                                        let newSymg8 = "<tr> <td>ATRIBUTO-> L_ATRIBUTOS</td> <td>ATRIBUTO.val = L_ATRIBUTOS.val</td> </tr>"
                                        gramaticalArray.push(newSymg8);
                                    }
          |                         { $$ = []; 
                                        let newSymg9 = "<tr> <td>ATRIBUTO-> epsilon </td> <td>ATRIBUTO.val = epsilon </td> </tr>"
                                        gramaticalArray.push(newSymg9);
                                    }
          ;

L_ATRIBUTOS: L_ATRIBUTOS ATRIBUTO   { $1.push($2); $$ = $1; 
                                        let newSymg10 = "<tr> <td>L_ATRIBUTOS-> L_ATRIBUTOS ATRIBUTO</td> <td>L_ATRIBUTOS.val = concat(L_ATRIBUTOS1.val + ATRIBUTO.val)</td> </tr>"
                                        gramaticalArray.push(newSymg10);
                                    }
	     | ATRIBUTO                 { $$ = [$1]; 
                                        let newSymg11 = "<tr> <td>L_ATRIBUTOS-> ATRIBUTO</td> <td>L_ATRIBUTOS.val = ATRIBUTO.val    </td> </tr>"
                                        gramaticalArray.push(newSymg11);
                                    }
         ;

ATRIBUTO: tk_id "=" StringLiteral   { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
                                        let newSym3 = "<tr><td>"+$1+"</td> <td>Atributo</td> <td>"+$1+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                        tokenArray.push(newSym3);
                                        let newSym4 = "<tr><td> String </td> <td>Atributo</td> <td>"+$1+"</td> <td>"+$3+"</td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                        tokenArray.push(newSym4);
                                        let newSymg12 = "<tr> <td>ATRIBUTO-> tk_id '=' StringLiteral</td> <td>ATRIBUTO.val = concat(tk_id.lexVal + '=' + StringLiteral.lexVal)</td> </tr>"
                                        gramaticalArray.push(newSymg12);
                                    }
        | tk_id "="  CharLiteral     { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
                                        let newSym5 = "<tr><td>"+$1+"</td> <td>Atributo</td> <td>"+$1+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                        tokenArray.push(newSym5);
                                        let newSym6 = "<tr><td> String </td> <td>Atributo</td> <td>"+$1+"</td> <td>"+$3+"</td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                        tokenArray.push(newSym6);
                                        let newSymg13 = "<tr> <td>ATRIBUTO-> tk_id '='  CharLiteral</td> <td>ATRIBUTO.val = concat(tk_id.lexVal + '=' + CharLiteral.lexVal) </td> </tr>"
                                        gramaticalArray.push(newSymg13);
                                    }
        ;
  

L_ID_HIJOS: L_ID_HIJOS SUPERPRODUCCION        { $1.push($2); $$ = $1; 
                                                    let newSymg14 = "<tr> <td>L_ID_HIJOS-> L_ID_HIJOS SUPERPRODUCCION </td> <td>L_ID_HIJOS.val = concat(L_ID_HIJOS1.val + SUPERPRODUCCION.val)</td> </tr>"
                                                    gramaticalArray.push(newSymg14);
                                              }
        | SUPERPRODUCCION                     { $$ = [$1];
                                                    let newSymg15 = "<tr> <td>L_ID_HIJOS-> SUPERPRODUCCION </td> <td>L_ID_HIJOS.val = SUPERPRODUCCION.val</td> </tr>"
                                                    gramaticalArray.push(newSymg15);
                                              }
        ;
/*
L_ID_HIJOS: L_ID_HIJOS tk_id        { $1=$1 + ' ' +$2 ; $$ = $1;}
        | tk_id                     { $$ = $1 }
        ;
*/

L_HIJOS: L_HIJOS HIJOS      { $1.push($2); $$ = $1;
                                let newSymg16 = "<tr> <td>L_HIJOS-> L_HIJOS HIJOS</td> <td>L_HIJOS.val = concat(L_HIJOS1.val + HIJOS.val)</td> </tr>"
                                gramaticalArray.push(newSymg16);
                            }
  	 | HIJOS                { $$ = [$1]; 
                                let newSymg17 = "<tr> <td>L_HIJOS-> HIJOS</td> <td>L_HIJOS.val = HIJOS.val</td> </tr>"
                                gramaticalArray.push(newSymg17);
                            }
    ;


SUPERPRODUCCION:  res_menor                 { $$ = $1 
                                                let newSymg18 = "<tr> <td>SUPERPRODUCCION-> res_menor </td> <td>SUPERPRODUCCION.val = res_menor.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg18);
                                            }
                | res_mayor                 { $$ = $1 
                                                let newSymg19 = "<tr> <td>SUPERPRODUCCION-> res_mayor</td> <td>SUPERPRODUCCION.val = res_mayor.lexVal </td> </tr>"
                                                gramaticalArray.push(newSymg19);
                                            }
                | res_amp                   { $$ = $1 
                                                let newSymg20 = "<tr> <td>SUPERPRODUCCION-> res_amp </td> <td>SUPERPRODUCCION.val = res_amp.lexVal </td> </tr>"
                                                gramaticalArray.push(newSymg20);
                                            }
                | res_comillaDoble          { $$ = $1 
                                                let newSymg21 = "<tr> <td>SUPERPRODUCCION-> res_comillaDoble</td> <td>SUPERPRODUCCION.val = res_comillaDoble.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg21);
                                            }
                | res_comillaSimple         { $$ = $1 
                                                let newSymg22 = "<tr> <td>SUPERPRODUCCION-> res_comillaSimple</td> <td>SUPERPRODUCCION.val = res_comillaSimple.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg22);
                                            }
                | '&'                       { $$ = $1 
                                                let newSymg23 = "<tr> <td>SUPERPRODUCCION-> '&'</td> <td>SUPERPRODUCCION.val = '&'</td> </tr>"
                                                gramaticalArray.push(newSymg23);
                                            }
                | '!'                       { $$ = $1 
                                                let newSymg24 = "<tr> <td>SUPERPRODUCCION-> '!'</td> <td>SUPERPRODUCCION.val = '!'</td> </tr>"
                                                gramaticalArray.push(newSymg24);
                                            }
                | '#'                       { $$ = $1 
                                                let newSymg25 = "<tr> <td>SUPERPRODUCCION-> '#'</td> <td>SUPERPRODUCCION.val = '#'</td> </tr>"
                                                gramaticalArray.push(newSymg25);
                                            }
                | '$'                       { $$ = $1 
                                                let newSymg26 = "<tr> <td>SUPERPRODUCCION-> '$'</td> <td>SUPERPRODUCCION.val = '$'</td> </tr>"
                                                gramaticalArray.push(newSymg26);
                                            }
                | '%'                       { $$ = $1 
                                                let newSymg27 = "<tr> <td>SUPERPRODUCCION-> '%'</td> <td>SUPERPRODUCCION.val = '%'</td> </tr>"
                                                gramaticalArray.push(newSymg27);
                                            }
                | '('                       { $$ = $1 
                                                let newSymg28 = "<tr> <td>SUPERPRODUCCION-> '(' </td> <td>SUPERPRODUCCION.val = '('</td> </tr>"
                                                gramaticalArray.push(newSymg28);
                                            }
                | ')'                       { $$ = $1 
                                                let newSymg29 = "<tr> <td>SUPERPRODUCCION-> ')'</td> <td>SUPERPRODUCCION.val = ')'</td> </tr>"
                                                gramaticalArray.push(newSymg29);
                                            }
                | '['                       { $$ = $1 
                                                let newSymg30 = "<tr> <td>SUPERPRODUCCION-> '['</td> <td>SUPERPRODUCCION.val = '['</td> </tr>"
                                                gramaticalArray.push(newSymg30);
                                            }
                | ']'                       { $$ = $1 
                                                let newSymg31 = "<tr> <td>SUPERPRODUCCION-> ']'</td> <td>SUPERPRODUCCION.val = ']'</td> </tr>"
                                                gramaticalArray.push(newSymg31);
                                            }
                | '@'                       { $$ = $1 
                                                let newSymg32 = "<tr> <td>SUPERPRODUCCION-> '@'</td> <td>SUPERPRODUCCION.val = '@'</td> </tr>"
                                                gramaticalArray.push(newSymg32);
                                            }
                | '¡'                       { $$ = $1 
                                                let newSymg33 = "<tr> <td>SUPERPRODUCCION-> '¡'</td> <td>SUPERPRODUCCION.val = '¡'</td> </tr>"
                                                gramaticalArray.push(newSymg33);
                                            }
                | '¿'                       { $$ = $1 
                                                let newSymg34 = "<tr> <td>SUPERPRODUCCION-> '¿'</td> <td>SUPERPRODUCCION.val = '¿'</td> </tr>"
                                                gramaticalArray.push(newSymg34);
                                            }
                | tk_coma                   { $$ = $1 
                                                let newSymg35 = "<tr> <td>SUPERPRODUCCION-> tk_coma </td> <td>SUPERPRODUCCION.val = tk_coma.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg35);
                                            }
                | tk_ptcoma                 { $$ = $1 
                                                let newSymg36 = "<tr> <td>SUPERPRODUCCION-> tk_ptcoma</td> <td>SUPERPRODUCCION.val = tk_ptcoma.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg36);
                                            }
                | tk_pt                     { $$ = $1 
                                                let newSymg37 = "<tr> <td>SUPERPRODUCCION-> tk_pt</td> <td>SUPERPRODUCCION.val = tk_pt.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg37);
                                            }
                | tk_dospts                 { $$ = $1 
                                                let newSymg38 = "<tr> <td>SUPERPRODUCCION-> tk_dospts</td> <td>SUPERPRODUCCION.val = tk_dospts.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg38);
                                            }
                | tk_guionbajo              { $$ = $1 
                                                let newSymg39 = "<tr> <td>SUPERPRODUCCION-> tk_guionbajo</td> <td>SUPERPRODUCCION.val = tk_guionbajo.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg39);
                                            }
                | tk_numero                 { $$ = $1 
                                                let newSymg40 = "<tr> <td>SUPERPRODUCCION-> tk_numero</td> <td>SUPERPRODUCCION.val = tk_numero.val </td> </tr>"
                                                gramaticalArray.push(newSymg40);
                                            }
                | tk_id                     { $$ = $1 
                                                let newSymg41 = "<tr> <td>SUPERPRODUCCION-> tk_id </td> <td>SUPERPRODUCCION.val = tk_id.lexVal</td> </tr>"
                                                gramaticalArray.push(newSymg41);
                                            }
                | '='                       { $$ = $1 
                                                let newSymg42 = "<tr> <td>SUPERPRODUCCION-> '='  </td> <td>SUPERPRODUCCION.val = '='</td> </tr>"
                                                gramaticalArray.push(newSymg42);
                                            }
	            | otro                      { $$ = $1 
                                                let newSymg43 = "<tr> <td>SUPERPRODUCCION-> 'otro'</td> <td>SUPERPRODUCCION.val = 'otro.lexVal'</td> </tr>"
                                                gramaticalArray.push(newSymg43);
                                            }
                ;






                