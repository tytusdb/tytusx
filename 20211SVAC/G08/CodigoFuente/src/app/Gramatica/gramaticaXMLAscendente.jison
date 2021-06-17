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

charLiteralMulti                    \'{stringsingle}*\'

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"<!--"                               this.begin('comment');
<comment>"-->"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"print"                     return 'print';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"=="                        return 'equal';
"!="                        return 'nequal';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'lparen';
")"                         return 'rparen';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"xml"                       return 'rxml';
"version"                   return 'rversion';
"encoding"                  return 'rencoding';
"?"                         return 'interrogacion';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';

{charLiteralMulti}                  return 'charLiteralMulti';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Primitivas/Print");
    const {Primitivo} = require("../Expresiones/Primitivo");
    const {Operacion, Operador} = require("../Expresiones/Operacion");
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : INICIO RAICES EOF         { $$ = $2; return $$; }   
        | RAICES EOF                { $$ = $1; return $$; }
        
    ;

INICIO : lt interrogacion rxml rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt {console.log('version' + $6);}
        
;

/*
RAICES:
    RAICES RAIZ           { $1.push($2); $$ = $1;}
	| RAIZ                { $$ = [$1]; } ;
*/
RAICES:
    RAIZ RAICESP           { $2.push($1); $$ = $2;}
	;

RAICESP:
     RAIZ RAICESP          { $2.push($1); $$ = $2;}
    |                      { $$ = []; }
    ;
 
RAIZ:
    PRINT semicolon       { $$ = $1 }
    | OBJETO              { $$ = $1 }
;

OBJETO:
      lt identifier LATRIBUTOS gt OBJETOS           lt div identifier gt       { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); }
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); }
    | lt identifier LATRIBUTOS div gt                                          { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); }
;

/*
OBJETO:
      lt identifier LATRIBUTOS OBJ 
;
OBJ: gt OBJ2 lt div identifier gt 
    |div gt
;

OBJ2:
     OBJETOS
    |LISTA_ID_OBJETO 

;*/
LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1;}
    | ATRIBUTO                                      { $$ = [$1]; } 
;


/*

ATRIBUTOS:
    ATRIBUTO ATRIBUTOSP           { $2.push($1); $$ = $2;}
;
ATRIBUTOP:
     ATRIBUTO ATRIBUTOP          { $2.push($1); $$ = $2;}
    |                            { $$ = []; }
;
*/
ATRIBUTO: 
    identifier asig STR_CHR                   { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
;

STR_CHR:   StringLiteral               { $$ = $1 }
        |  charLiteralMulti            { $$ = $1 };

/*
LISTA_ID_OBJETO: LISTA_ID_OBJETO identifier          { $1=$1 + ' ' +$2 ; $$ = $1;}
        | identifier                                 { $$ = $1 }
;
*/

LISTA_ID_OBJETO:  ID LISTA_ID_OBJETOP         { $2=$1 + ' '+ $2 ; $$ = $2;}
        
;

LISTA_ID_OBJETOP:  ID LISTA_ID_OBJETOP          { $2=$1 + ' ' + $2 ; $$ = $2;}
                |                               { $$ = ''; }
; 

ID:           identifier      { $$ = $1 }
            | DoubleLiteral   { $$ = $1 }
            | IntegerLiteral  { $$ = $1 }
;


OBJETOS:
      OBJETOS OBJETO        { $1.push($2); $$ = $1;}
	| OBJETO                { $$ = [$1]; } ;
/*
OBJETOS:
    RAIZ OBJETOSP           //{ $$ = $2; $2.push($1);}
;

OBJETOSP:
     RAIZ OBJETOSP         // { $$ = $2; $2.push($1);}
    |                         //{ $$ = []; }
;

*/

PRINT:
    print lparen EXPR rparen            { $$ = new Print($3, @1.first_line, @1.first_column); } ;

EXPR:
    PRIMITIVA                           { $$ = $1 }
    | OP_ARITMETICAS                    { $$ = $1 };


OP_ARITMETICAS:
    EXPR plus EXPR                      { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }
    | EXPR minus EXPR                   { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }
    | EXPR times EXPR                   { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }
    | EXPR div EXPR                     { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }
    | EXPR mod EXPR                     { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }
    | minus EXPR %prec UMINUS           { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }
    | lparen EXPR rparen                { $$ = $2 }
;

PRIMITIVA:
    IntegerLiteral                      { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | DoubleLiteral                     { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | StringLiteral                     { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | charliteral                       { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | null                              { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
    | true                              { $$ = new Primitivo(true, @1.first_line, @1.first_column); }
    | false                             { $$ = new Primitivo(false, @1.first_line, @1.first_column); } ;