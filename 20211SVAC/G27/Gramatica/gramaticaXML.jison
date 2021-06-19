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
    var nodo = new Objeto('RAIZ','',0, 0,null,null); 
    nodo.agregarObjeto($10);
    var arreglo =[nodo];
    return arreglo;
}
;

  

RAIZ:
    lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { $$= new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); }
    | lt identifier  gt RAICES  lt div identifier gt {$$= new Objeto($2,'',@1.first_line, @1.first_column,null,$4);}    
             
;

RAICES:
    RAICES OBJETO {$$= $1;  $$.push($2);}
	| OBJETO  {$$= [];  $$.push($1);}
;        

  
OBJETO:
           lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { $$= new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); } 
        |  lt identifier ATRIBUTOS gt identifier  lt div identifier gt   { $$= new Objeto($2,$5,@1.first_line, @1.first_column,$3,null); } 
        |  lt identifier  gt RAICES  lt div identifier gt  {$$= new Objeto($2,'',@1.first_line, @1.first_column,null,$4);}       
        |  lt identifier  gt identifier  lt div identifier gt  { $$= new Objeto($2,$4,@1.first_line, @1.first_column,null,null);}    
           
;


ATRIBUTOS:
    ATRIBUTOS ATRIBUTO   {$$=$1; $$.push($2);}                           
    | ATRIBUTO {$$=[]; $$.push($1);}

;

ATRIBUTO: 
    identifier asig StringLiteral {$$= new Atributo($1,$3,@1.first_line, @1.first_column);}                 
;