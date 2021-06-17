%{
        //const {entregable}=  require("../Expresiones/entregable");
        //const {Error}=  require("../AST/ErrorA");
        var entreg= new entregable;  
%}

/* Definición Léxica */
%lex

%options case-sensitive


numero                             [0-9]


BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"<!--"                                this.begin('comment');
<comment>"-->"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"<?xml"                     return 'inicio';
"version"                   return 'versi';
"?>"                        return 'fin';

"xml"                       return 'Pal_xml';
"encoding"                  return 'encoding';
"standalone"                return 'standalone';
"&lt;"                       return 'lt';
"&gt;"                       return 'gt';
"&amp;"                       return 'amp';
"&apos;"                       return 'apos';
"&quot;"                       return 'quot';


"<"                         return 'abre';
"/"                         return 'diagonal';
">"                         return 'cierra';

"="                         return 'igual';

/* Number literals */

[a-zA-Z_][a-zA-Z0-9_ñÑ\-\.]*                                    return 'etiqueta';
[^\r\t\na-zA-ZñÑ0-9_><\"\'&]                                    return 'etiqueta2'

(\"[^\"]*\")|(\'[^\']*\')                                       return 'string';      


[\r|\t|\n]+                             {/**/}

//error lexico
.                                   {
                                        
                                        var error_lex= new ErrorA('lexico','Este es un error léxico: ' + yytext,yylloc.first_line,yylloc.first_column);
                                        entreg.tabla_errores.agregar(error_lex);                                        
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{    
    //const {Objeto} = require("../Expresiones/Objeto");
    //const {Atributo} = require("../Expresiones/Atributo");
        
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : XML_INI EOF                      { 
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n START : XML_INI EOF { S = S1; return S; }";
                                                entreg.arbol=$1;
                                                entreg.CrearTabla();
                                                $$ = entreg; return $$; 
                                         }
;

XML_INI : inicio ATIS fin OBJ            {      $$=$4;
                                                entreg.confi_xml=$2;
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n inicio ATIS fin OBJ entreg.arbol=S4;entreg.confi_xml=S2;S=entreg;}";
                                         }
    |OBJ                                 {      $$ = $1
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n XML_INI->OBJ {S = S1}";
                                         }
    |error                              {      
                                                var error_sin= new ErrorA('sintactico','Este es un error sintactico: ' + yytext,yylloc.first_line,yylloc.first_column);
                                                entreg.tabla_errores.agregar(error_sin); 
                                        }
;

ATIS : VERSION CODI DEPEN               {$1.push($2);$1.push($3); $$ = $1;
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n ATIS->VERSION CODI DEPEN {S1.push(S2);S1.push(S3); S = S1;}";
                                        }
;

VERSION : versi igual string            {$$ = [new Atributo($1, $3, @1.first_line, @1.first_column)];
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n VERSION->versi igual string {S = [new Atributo(S1, S3, a1.first_line, a1.first_column)];}";
                                        }
;
CODI : encoding igual string            {$$ = new Atributo($1, $3, @1.first_line, @1.first_column);
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n CODI->encoding igual string {S = new Atributo(S1, S3, a1.first_line, a1.first_column);}";
                                        }
    |                                   {
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n CODI->Epsilon {}";
                                        }
;
DEPEN : standalone igual string         {$$ = new Atributo($1, $3, @1.first_line, @1.first_column);
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DEPEN->standalone igual string {S = new Atributo(S1, S3, a1.first_line, a1.first_column);}";
                                        }
        |                               {       
                                                entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DEPEN->Epsilon {}";
                                        }
;

OBJ : abre etiqueta LATRIS cierra OBJS abre diagonal etiqueta cierra             {

                                                                                       if($2!=$8)
                                                                                        {
                                                                                          
                                                                                          var error_seman= new ErrorA('semantico','Este es un error semantico: La etiqueta que abre es diferente a la que cierra',$1.first_line,$1.first_column);
                                                                                          entreg.tabla_errores.agregar(error_seman); 
                                                                                        }
                                                                                       
                                                                                        $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5);
                                                                                        entreg.reporte_gramatical=entreg.reporte_gramatical+"\n OBJ->abre etiqueta LATRIS cierra OBJS abre diagonal etiqueta cierra {S = new Objeto(S2,'',a1.first_line, a1.first_column,S3,S5);}";                    

                                                                                  //PADRES DE ROJO
                                                                                  //dotData += contadorNodo+'[label=\"'+$2+'\";color=\"red\"];';
                                                                                  //contadorNodo++;

                                                                                 }
        |abre etiqueta LATRIS cierra DATS abre diagonal etiqueta cierra          {
                                                                                        if($2!=$8)
                                                                                        {
                                                                                          var error_seman= new ErrorA('semantico','Este es un error semantico: la etiqueta que abre es diferente a la que cierra',$1.first_line,$1.first_column);
                                                                                          entreg.tabla_errores.agregar(error_seman); 
                                                                                        }                                                                                        
                                                                                        $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]);
                                                                                        entreg.reporte_gramatical=entreg.reporte_gramatical+"\n OBJ->abre etiqueta LATRIS cierra DATS abre diagonal etiqueta cierra {S = new Objeto(S2,S5,a1.first_line, a1.first_column,S3,[]);}";                                                                                                                                                                   
                                                                                 
                                                                                  
                                                                                  //GRAFICANDO ETIQUETAS CON CONTENIDO
                                                                                  //CONTENIDO DE AZUL
                                                                                  //crear la etiqueta con su numero de contador
                                                                                  //dotData += contadorNodo+'[label=\"'+$5+'\";color=\"blue\"];';
                                                                                  //contadorNodo++;
                                                                                  //HIJOS DE VERDE
                                                                                  //dotData += contadorNodo+'[label=\"'+$2+'\";color=\"green\"];';
                                                                                  //let nodoaux = contadorNodo-1;
                                                                                  //dotData += contadorNodo+'->'+nodoaux+';';
                                                                                  //contadorNodo++;
                                                                                 
                                                                                 }
        |abre etiqueta LATRIS diagonal cierra                                    {$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]);
                                                                                        entreg.reporte_gramatical=entreg.reporte_gramatical+"\n OBJ->abre etiqueta LATRIS diagonal cierra {S = new Objeto(S2,'',a1.first_line, a1.first_column,S3,[]);}";
                                                                                  
                                                                                  //ETIQUETAS SIN CONTENIDO Y SOLO ATRIBUTOS
                                                                                  //crear la etiqueta con su numero de contador
                                                                                  //dotData += contadorNodo+'[label=\"'+$2+'\"];';
                                                                                  //contadorNodo++;
                                                                                 }       
;
DATS : DATS DAT                                                                  {$1=$1+' '+$2;$$ =$1 ;
                                                                                        entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DATS->DATS DAT {S1=S1+' '+S2;S =S1 ;}";
                                                                                 }
        |DAT                                                                     {$$ = $1;
                                                                                        entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DATS->DAT {S = S1;}";
                                                                                 }
;
DAT :
        etiqueta                        {$$ = $1;
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->etiqueta {S = S1;}";
                                        }                
        |etiqueta2                      {$$ = $1;
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->etiqueta2 {S = S1;}";
                                        }                
        |lt                             {$$ = "<";
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->lt {S = <;}";
                                        }        
        |amp                            {$$ = "&";
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->amp {S = &;}";
                                        }
        |quot                           {$$ = '"';
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+'\n DAT->quot {S = ";}';
                                        }
        |apos                           {$$ = "'";
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->apos {S = ';}";
                                        }
        |gt                             {$$ = ">";
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n DAT->gt {S = >;}";
                                        }        
;

LATRIS : ATRIS                          {$$ = [$1];
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n LATRIS->ATRIS {S = [S1];}";
                                        }
        |                               {$$ = [];
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n LATRIS->Epsilon{S = [];";
                                        }
;
ATRIS : ATRIS ATRI                      {$1.push($2); $$ = $1;
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n ATRIS->ATRIS ATRI {S.push(S2); S = S1;}";
                                        }
        |ATRI                           {$$ = [$1];
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n ATRIS->ATRI {S = [S1];}";
                                        }
;

ATRI : etiqueta igual string            {$$ = new Atributo($1, $3, @1.first_line, @1.first_column);
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n ATRI->etiqueta igual string {S = new Atributo(S1, S3, a1.first_line, a1.first_column);}";
                                        }
;

OBJS : OBJS OBJ                         { $1.push($2); $$ = $1;
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n OBJS->OBJS OBJ{ S1.push(S2); S = S1;}";      
                                        }
        |OBJ                            { $$ = [$1];
                                          entreg.reporte_gramatical=entreg.reporte_gramatical+"\n OBJS->OBJ{}";
                                        }
;




