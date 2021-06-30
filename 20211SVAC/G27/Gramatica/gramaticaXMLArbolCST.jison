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

[a-zA-Z_][a-zA-Z0-9_ñÑàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*     return 'identifier';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex






// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : lteq xml  version asig StringLiteral encoding asig StringLiteral gteq RAIZ EOF 
{ 
     var raiz = new Nodo('START','START'); 
    //var Arbol = new Arbol('Arbol',$10);
    raiz.insertHijo('lteq','\\<\\?');
    raiz.insertHijo('xml',$2);
    raiz.insertHijo('version',$3);
    raiz.insertHijo('asig',$4);
    raiz.insertHijo('StringLiteral',$5.replace(/\"/g,''));
    raiz.insertHijo('encoding',$6);
    raiz.insertHijo('asig',$7);
    raiz.insertHijo('StringLiteral',$8.replace(/\"/g,''));
    raiz.insertHijo('gteq','\\?\\>');
    raiz.hijos.push($10);
    $$ = $10;
    return raiz;
}
;

  

RAIZ:
    lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  {
                                                                var raiz = new Nodo('RAIZ',$2);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('identifier',$2);
                                                                raiz.hijos.push($3);
                                                                raiz.insertHijo('gt','\\>');
                                                                raiz.hijos.push($5);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('div','\\/');
                                                                raiz.insertHijo('identifier',$8);
                                                                raiz.insertHijo('gt','\\>');
                                                                $$ = raiz;
                                                                }
    | lt identifier  gt RAICES  lt div identifier gt {
                                                        var raiz = new Nodo('RAIZ',$2);
                                                        raiz.insertHijo('lt','\\<');
                                                        raiz.insertHijo('identifier',$2);
                                                        raiz.insertHijo('gt','\\>');
                                                        raiz.hijos.push($4);
                                                        raiz.insertHijo('lt','\\<');
                                                        raiz.insertHijo('div','\\/');
                                                        raiz.insertHijo('identifier',$7);
                                                        raiz.insertHijo('gt','\\>');
                                                        $$ = raiz;
                                                     }   
             
;

RAICES:
    RAICES OBJETO { 
                    var raiz = new Nodo('RAICES','RAICES');
                    //$1.push($2);
                    raiz.hijos.push($1);
                    raiz.hijos.push($2);
                    $$ = raiz;
                        //$1.push($2);  
                        //alert("Nodo: "+$2.id);
                        //$$= raiz;
                    }//{$1.push($2);  alert("Nodo: "+$2.id);$$= $1;}
	| OBJETO { $$ = $1;}//{$$= [$1];  alert("Nodo: "+$1.id);}
;        

  
OBJETO:
           lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  {
                                                                var raiz = new Nodo('OBJETO',$2);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('identifier',$2);
                                                                raiz.hijos.push($3);
                                                                raiz.insertHijo('gt','\\>');
                                                                raiz.hijos.push($5);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('div','\\/');
                                                                raiz.insertHijo('identifier',$8);
                                                                raiz.insertHijo('gt','\\>');
                                                                $$ = raiz;
                                                                }
        |  lt identifier ATRIBUTOS gt VALOR_ETIQUETA  lt div identifier gt   {
                                                                var raiz = new Nodo('OBJETO',$2);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('identifier',$2);
                                                                raiz.hijos.push($3);
                                                                raiz.insertHijo('gt','\\>');
                                                                raiz.insertHijo('identifier',$5);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('div','\\/');
                                                                raiz.insertHijo('identifier',$8);
                                                                raiz.insertHijo('gt','\\>');
                                                                $$ = raiz;
                                                                }
        |  lt identifier  gt RAICES  lt div identifier gt  {
                                                                var raiz = new Nodo('OBJETO',$2);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('identifier',$2);
                                                                raiz.insertHijo('gt','\\>');
                                                                raiz.hijos.push($4);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('div','\\/');
                                                                raiz.insertHijo('identifier',$7);
                                                                raiz.insertHijo('gt','\\>');
                                                                $$ = raiz;
                                                                }       
        |  lt identifier  gt VALOR_ETIQUETA  lt div identifier gt  {
                                                                var raiz = new Nodo('OBJETO',$2);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('identifier',$2);
                                                                raiz.insertHijo('gt','\\>');
                                                                raiz.insertHijo('identifier',$4);
                                                                raiz.insertHijo('lt','\\<');
                                                                raiz.insertHijo('div','\\/');
                                                                raiz.insertHijo('identifier',$7);
                                                                raiz.insertHijo('gt','\\>');
                                                                $$ = raiz;
                                                                }   
           
;


VALOR_ETIQUETA: VALOR_ETIQUETA VALOR{
                    $$=$1+" "+$2                                        
                    } 
        |VALOR {$$=$1;};

VALOR:DoubleLiteral { $$= $1}
            |IntegerLiteral{ $$= $1}
            |identifier{ $$= $1}
            |StringLiteral{ $$= $1}
            |CharLiteral{ $$= $1}
            |menor{ $$= $1}
            |mayorque{ $$= $1}
            |ampersand{ $$= $1}
            |apostrofe{ $$= $1}
            |quot{ $$= $1}
            |content{ $$= $1}
            |punto{$$= $1}
            |csimple{ $$= $1}
            |fecha{$$= $1}
            |coma{$$= $1}
            |dospuntos{$$= $1}
            |numeral{$$= $1}
            |mas{$$= $1}
            |xml{$$= $1}
            |guion{$$=$1;};

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO { 
                    var raiz = new Nodo('ATRIBUTOS','ATRIBUTOS');
                    //$1.push($2);
                    //$$ = $1;
                    raiz.hijos.push($1);
                    raiz.hijos.push($2);
                    $$ = raiz;
                    }//{$1.push($2); $$=$1;}                           
    | ATRIBUTO {$$=$1;}

;

ATRIBUTO: 
    identifier asig StringLiteral {
                                    var raiz = new Nodo('ATRIBUTO',$1);
                                    raiz.insertHijo('identifier',$1);
                                    raiz.insertHijo('asig',$2);
                                    raiz.insertHijo('StringLiteral',$3.replace(/\"/g,''));
                                    $$ = raiz;
                                   }                 
;