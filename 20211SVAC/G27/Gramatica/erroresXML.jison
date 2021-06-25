/* Definición Léxica */
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

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */




/* SIMBOLOS PARA OPERACIONES RELACIONALES */

"<?"                        return 'lteq';
"?>"                        return 'gteq';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding'
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"/"                         return 'div';
"!"                         return 'not';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                        var error1 = new Error('Léxico', 'Este es un error léxico: ' + yytext, yylloc.first_line,yylloc.first_column);
                                        insertarErrorXML(error1);
                                        return 'error';
                                    }

<<EOF>>                     return 'EOF'

/lex






// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : lteq xml  version asig StringLiteral encoding asig StringLiteral gteq RAIZ EOF 
{ 
    var nodo = new Objeto('RAIZ','',0, 0,null,null); 
    nodo.agregarObjeto($10);
    var arreglo =[nodo];
    if($5 == null){var error = new Error('Sintáctico','Se debe indicar el valor de versión.', @1.first_line, @1.first_column);insertarErrorXML(error);}
    if($8 == null){var error = new Error('Sintáctico','Se esperaba StringLiteral y se obtuvo vacío.', @1.first_line, @1.first_column);insertarErrorXML(error);}
    return arreglo;
}
;

  

RAIZ:
    lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { 
        if ($2 != $8){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$8+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
        }
        $$= new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
        }
    | lt identifier  gt RAICES  lt div identifier gt {
        if ($2 != $7){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$7+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            }
        $$= new Objeto($2,'',@1.first_line, @1.first_column,null,$4);
        }    
             
;

RAICES:
    RAICES OBJETO {$$= $1;  $$.push($2);  alert($2.texto);}
	| OBJETO  {$$= [];  $$.push($1); alert($1.texto);}
;        

  
OBJETO:
           lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { 
               if ($2 != $8){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$8+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
                }
               $$= new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
               } 
        |  lt identifier ATRIBUTOS gt identifier  lt div identifier gt   { 
            if ($2 != $8){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$8+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            }
            $$= new Objeto($2,$5,@1.first_line, @1.first_column,$3,null); 
            } 
        |  lt identifier  gt RAICES  lt div identifier gt  {
            if ($2 != $7){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta lt;/'+$7+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            }
            $$= new Objeto($2,'',@1.first_line, @1.first_column,null,$4);
            }       
        |  lt identifier  gt identifier  lt div identifier gt  {
            if ($2 != $7){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$7+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            } 
            $$= new Objeto($2,$4,@1.first_line, @1.first_column,null,null);
        }    
           
;


ATRIBUTOS:
    ATRIBUTOS ATRIBUTO   {$$=$1; $$.push($2);}                           
    | ATRIBUTO {$$=[]; $$.push($1);}

;

ATRIBUTO: 
    identifier asig StringLiteral {
        if($3 == null){var error = new Error('Sintáctico', 'Se esperaba un StringLiteral y se obtuvo vacío.'); insertarErrorXML(error);}
        if($2 == null){var error = new Error('Sintáctico', 'se esperaba signo = y se obtuvo vacío.'); insertarErrorXML(error);}
        $$= new Atributo($1,$3,@1.first_line, @1.first_column);
        }                 
;