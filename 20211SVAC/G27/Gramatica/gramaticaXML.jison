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
        |  lt identifier ATRIBUTOS gt VALORES  lt div identifier gt   { $$= new Objeto($2,$5,@1.first_line, @1.first_column,$3,null); } 
        |  lt identifier  gt RAICES  lt div identifier gt  {$$= new Objeto($2,'',@1.first_line, @1.first_column,null,$4);}       
        |  lt identifier  gt VALORES  lt div identifier gt  { $$= new Objeto($2,$4,@1.first_line, @1.first_column,null,null);}    
           
;

VALORES: VALORES VALOR{$$=$1+" "+$2} 
        |VALOR {$$=$1;};

VALOR:DoubleLiteral{$$= $1;}
            |IntegerLiteral{$$= $1;}
            |identifier{$$= $1;}
            |StringLiteral{$$= $1;}
            |CharLiteral{$$= $1;}
            |menor{$$= $1;}
            |mayorque{$$= $1;}
            |ampersand{$$= $1;}
            |apostrofe{$$= $1;}
            |quot{$$= $1;}
            |content{$$= $1;}
            |punto{$$= $1;}
            |csimple{$$= $1;}
            |fecha{$$= $1;}
            |coma{$$= $1;}
            |dospuntos{$$= $1;}
            |numeral{$$= $1;}
            |mas{$$= $1;}
            |xml{$$= $1;}
            |guion{$$=$1;};
ATRIBUTOS:
    ATRIBUTOS ATRIBUTO   {$$=$1; $$.push($2);}                           
    | ATRIBUTO {$$=[]; $$.push($1);}

;

ATRIBUTO: 
    identifier asig StringLiteral {$$= new Atributo($1,$3,@1.first_line, @1.first_column);}                 
;