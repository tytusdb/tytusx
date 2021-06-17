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




"+"                         return 'plus';
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
"version"                   return 'rversion';
"encoding"                  return 'rencoding';
"&amp"                      return 'amp'
"&lt"                      return  'rlt'
"&gt"                      return  'rgt'
"&apos"                      return 'apos'
"&quot"                      return 'quot'
"?"                         return 'interrogacion';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';



{stringliteral}                     return 'StringLiteral';
[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_!@#$%+^'`"*()/¡:;.,~-¤Ã-]+            return 'identifier';
{charliteral}                       return 'CharLiteral';
{charLiteralMulti}                  return 'charLiteralMulti';

"-"                         return 'minus';
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
START : INICIO RAICES EOF         { $1.listaObjetos = $2; $$ = $1; return $$; }
        | RAICES EOF         { $$ = $1; return $$; }
    ;

INICIO : lt interrogacion identifier rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt 
{   var atr = [];
    atr.push(new Atributo('encoding', $9, @9.first_line, @9.first_column));
    $$ = new Objeto('Encabezado','',@1.first_line, @1.first_column,atr,[],0,null);
}
        
;

RAICES:
    RAICES RAIZ           { $1.push($2); $$ = $1;}
	| RAIZ                { $$ = [$1]; } ;

RAIZ:
    PRINT semicolon       { $$ = $1 }
    | OBJETO              { $$ = $1 }
;

OBJETO:
      lt identifier LATRIBUTOS gt OBJETOS           lt div identifier gt       { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5,0,null); $5.forEach(element => {element.padre = $$;}); }
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[],0,null); }
    | lt identifier LATRIBUTOS div gt                                          { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[],1,null); }
;

LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1;}
    | ATRIBUTO                                      { $$ = [$1]; } 
;

ATRIBUTO: 
    identifier asig STR_CHR                   { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
;

STR_CHR:   StringLiteral               { $$ = $1 }
        |  charLiteralMulti            { $$ = $1 };

LISTA_ID_OBJETO: LISTA_ID_OBJETO ID          { $1=$1 + ' ' +$2 ; $$ = $1;}
        | ID                                 { $$ = $1 }
;

ID:           identifier      { $$ = $1 }
            | RESERVED_WORD   { $$ = $1 }
            | DoubleLiteral   { $$ = $1 }
            | IntegerLiteral  { $$ = $1 }
;

RESERVED_WORD : amp semicolon   { $$ = '&' }
        | rlt semicolon         { $$ = '<' }
        | rgt semicolon         { $$ = '>' }
        | apos semicolon        { $$ = '\'' }
        | quot semicolon        { $$ = '"' }
        ;
OBJETOS:
      OBJETOS OBJETO        { $1.push($2); $$ = $1;}
	| OBJETO                { $$ = [$1]; } ;

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
     ;