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
content                                [^<]
%s                                  comment
%%
\s+                                 /* skip whitespace */
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/




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
"."                         return 'punto';
"'"                         return 'csimple';
","                         return 'coma';
":"                         return 'dospuntos';
"#"                         return 'numeral';
"+"                         return 'mas';
"-"                         return 'guion';

'&lt;'                              return 'menor';
'&gt;'                              return 'mayorque';
'&amp;'                             return 'ampersand';
'&apos;'                            return "apostrofe";
'&quot;'                            return "quot";

/* Number literals */
[0-9]+"."[0-9]*                      return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';
[0-9]{2}-[0-9]{2}-[0-9]{4}          return 'fecha'

[a-zA-Z_][a-zA-Z0-9_ñÑàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*            return 'identifier';

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
    RAICES OBJETO {$$= $1;  $$.push($2);  }
	| OBJETO  {$$= [];  $$.push($1); }
;        

  
OBJETO:
           lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { 
               if ($2 != $8){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$8+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
                }
               $$= new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
               } 
        |  lt identifier ATRIBUTOS gt VALORES  lt div identifier gt   { 
            if ($2 != $8){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$8+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            }
            if ($5 == null){
                var error = new Error('Sintáctico','Se esperaba esperaba valor de etiqueta.', @1.first_line, @1.first_column);
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
        |  lt identifier  gt VALORES  lt div identifier gt  {
            if ($2 != $7){
                var error = new Error('Sintáctico','Se esperaba la etiqueta &lt;/' + $2 + '&gt; y se obtuvo la etiqueta &lt;/'+$7+'&gt;.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            } 
            if ($4 == null){
                var error = new Error('Sintáctico','Se esperaba esperaba valor de etiqueta.', @1.first_line, @1.first_column);
                insertarErrorXML(error);
            } 
            $$= new Objeto($2,$4,@1.first_line, @1.first_column,null,null);
        }    
           
;

VALORES: VALORES VALOR{$$=$1; $$.push($2);} 
        |VALOR {$$=[]; $$.push($1);};

VALOR:DoubleLiteral{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |IntegerLiteral{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |identifier{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |StringLiteral{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |CharLiteral{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |menor{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |mayorque{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |ampersand{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |apostrofe{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |quot{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |content{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |punto{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |csimple{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |fecha{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |coma{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |dospuntos{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |numeral{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |mas{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |xml{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            }
            |guion{
                if($1 == null){var error = new Error('Sintáctico', 'Se esperaba un valor de etiqueta.'); insertarErrorXML(error);}
                new Objeto($1,$1,@1.first_line, @1.first_column,null,null);
            };


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