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
        |  lt identifier ATRIBUTOS gt identifier  lt div identifier gt   {
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
        |  lt identifier  gt identifier  lt div identifier gt  {
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