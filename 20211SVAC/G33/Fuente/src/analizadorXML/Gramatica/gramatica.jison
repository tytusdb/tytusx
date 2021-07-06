/* Definición Léxica */
%lex

/*%options case-sensitive*/
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
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"&lt;"                      return 'lesst'
"&gt;"                      return 'greatert'
"&amp;"                     return 'ampersand'
"&apos;"                    return 'apostro'
"&quot;"                    return 'quotation'

"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

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
"?"                         return 'interC';

";"                         return 'semicolon';
","                         return 'coma';
"."                         return 'period';
// "'"                         return 'apost';

"("                         return 'lparen';
")"                         return 'rparen';
"{"                         return 'lcurly';
"}"                         return 'rcurly';
"["                         return 'lbracket';
"]"                         return 'rbracket';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

/* Identifier literals */
[a-zA-Z_ñÑáÁéÉíÍóÓ][a-zA-Z0-9_ñÑáÁéÉíÍóÓ]*   return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';

//error lexico
.   
    {
        listaErrores.push(new tError('Léxico',`Simbolo inesperado: ${yytext}`,yylloc.first_line,yylloc.first_column ));
        //console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {SalidaGramatica} = require("../AST/SalidaGramatica");
    const {tError} = require("../Expresiones/tError");
    var listaErrores = [];
    var reportBNF = [];
    var reportBNF2 = [];
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
START : 
        ENCODING RAICES EOF         {   
                                        reportBNF.push(`<START> ::= <RAICES> EOF`);
                                        reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
                                        $$ = $2;
                                        return new SalidaGramatica($$, reportBNF, reportBNF2, $1, listaErrores);
                                    }
    ;

ENCODING: 
        lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt      {   $$ = $9; }
    |   error gt                                                                            
        {
            listaErrores.push(new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column));
        }
    ;

RAICES: 
        RAICES RAIZ         {   
                                reportBNF.push('<RAICES> ::= <RAICES> <RAIZ>');
                                reportBNF2.push('Raices.val = Raices.push(Raiz)');
                                $1.push($2);
                                $$ = $1;
                            }
	|   RAIZ                { 
                                reportBNF.push('<RAICES> ::= <RAIZ>');
                                reportBNF2.push('Raices.val = Raiz.val');
                                $$ = [$1];
                            } ;

RAIZ: 
        OBJETO              { 
                                reportBNF.push('<RAIZ> ::= <OBJETO>');
                                reportBNF2.push('Raiz.val = Objeto.val');
                                $$ = $1;
                            }
    ;

OBJETO:
        lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt                { 
                                                                                    reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> gt <OBJETOS> lt div identifier gt');
                                                                                    reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna, atributos, objetos)');
                                                                                    $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5,1,$8);
                                                                                }
    |   lt identifier LATRIBUTOS gt LISTA_ID_OBJETO lt div identifier gt        { 
                                                                                    reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> gt <LISTA_ID_OBJETO> lt div identifier gt');
                                                                                    reportBNF2.push('Objeto = new Objeto(id,texto,linea, columna,atributos,[])');
                                                                                    $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[],1,$8);
                                                                                }
    |   lt identifier LATRIBUTOS div gt                                         { 
                                                                                    reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> div gt');
                                                                                    reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna,atributos,[])');
                                                                                    $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[],0,'');
                                                                                }
    |   error gt                                                                {   listaErrores.push(
                                                                                        new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column )
                                                                                    );
                                                                                }
    ;

LATRIBUTOS: 
        ATRIBUTOS                               { 
                                                    reportBNF.push('<LATRIBUTOS> ::= <ATRIBUTOS>');
                                                    reportBNF2.push('Lista_Atributos.val = Atributos.val');
                                                    $$ = $1;
                                                }
    |   /* vacio */                             { 
                                                    reportBNF.push('<LATRIBUTOS> ::= /*vacio*/');
                                                    reportBNF2.push('Lista_Atributos.val = [] ');
                                                    $$ = [];
                                                }
    ;

ATRIBUTOS:
        ATRIBUTOS ATRIBUTO                      {   
                                                    reportBNF.push('<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>');
                                                    reportBNF2.push('Atributos.val = Atributos.push(Atributo)');
                                                    $1.push($2);
                                                    $$ = $1;/*revisar*/
                                                }
    |   ATRIBUTO                                { 
                                                    reportBNF.push('<ATRIBUTOS> ::= <ATRIBUTO>');
                                                    reportBNF2.push('Atributos.val = Atributo.val');
                                                    $$ = [$1];
                                                } 
    ;

ATRIBUTO: 
        identifier asig StringLiteral           {   
                                                    reportBNF.push('<ATRIBUTO> ::= identifier asig StringLiteral');
                                                    reportBNF2.push('Atributo = new Atributo(id, valor, fila, columna)');
                                                    $$ = new Atributo($1, $3, @1.first_line, @1.first_column);
                                                }
    |   error gt                                {   listaErrores.push(
                                                        new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column )
                                                    );
                                                }
    |   error lt                                {   listaErrores.push(
                                                        new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column )
                                                    );
                                                }
    ;

OBJETOS:
        OBJETOS OBJETO      {   reportBNF.push('<OBJETOS> ::= <OBJETOS> <OBJETO>');
                                reportBNF2.push('Objetos.val = Objetos.push(Objeto)');
                                $1.push($2);
                                $$ = $1;
                            }
	|   OBJETO              { 
                                reportBNF.push('<OBJETOS> ::= <OBJETO>');
                                reportBNF2.push('Objetos.val = Objeto.val');
                                $$ = [$1];
                            } 
    ;

LISTA_ID_OBJETO: 
        LISTA_ID_OBJETO LISTA_VALORES               { 
                                                        reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_ID_OBJETO> <LISTA_VALORES>');
                                                        reportBNF2.push('Lista_Id_Objeto.val = Lista_Id_Objeto.val + \' \' + Lista_Id_Objeto.val');
                                                        $$ = $1 + ' ' + $2;
                                                    }
    |   LISTA_VALORES                               {   
                                                        reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_VALORES>');
                                                        reportBNF2.push('Lista_Id_Objeto.val = Lista_valores.val');
                                                        $$ = $1;
                                                    }
    ;

LISTA_VALORES : 
        IntegerLiteral          {
                                    $$ = $1;
                                }
    |   DoubleLiteral           {
                                    $$ = $1;
                                }
    |   identifier              {
                                    $$ = $1;
                                }
    |   StringLiteral           {
                                    $$ = $1;
                                }
    |   CharLiteral             {
                                    $$ = $1;
                                }
    |   xml                     {
                                    $$ = $1;
                                }
    |   CARACTERES              {
                                    $$ = $1;
                                }
    |   error                   {   listaErrores.push(
                                        new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column )
                                    );
                                }                              
    ;

CARACTERES :
        plus        { $$ = $1;}
    |   minus       { $$ = $1;}
    |   times       { $$ = $1;}
    |   div         { $$ = $1;}
    |   mod         { $$ = $1;}
    |   asig        { $$ = $1;}
    |   equal       { $$ = $1;}
    |   nequal      { $$ = $1;}
    |   and         { $$ = $1;}
    |   or          { $$ = $1;}
    |   not         { $$ = $1;}
    |   semicolon   { $$ = $1;}
    |   lparen      { $$ = $1;}
    |   rparen      { $$ = $1;}
    |   lcurly      { $$ = $1;}
    |   rcurly      { $$ = $1;}
    |   lbracket    { $$ = $1;}
    |   rbracket    { $$ = $1;}
    |   period      { $$ = $1;}
    |   coma        { $$ = $1;}
    |   lesst       { $$ = '<';}
    |   greatert    { $$ = '>';}
    |   ampersand   { $$ = '&';}
    |   apostro     { $$ = '\'';}
    |   quotation   { $$ = '"';}
    ;