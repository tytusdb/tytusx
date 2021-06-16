/**
 * Primer Proyecto OLC2 - Grupo 26
 */

/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const {Objeto} = require("../XML/Objeto");
    const {Atributo} = require("../XML/Atributo");
    const errores = require('../Global/ListaError');
    //import errores from '../Global/ListaError';
%}
/* Definición Léxica */
%lex

escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'

//CUALQUIER CARACTER EXCEPT <
content                             [^<]

%s                                  comment
%%

//CONTENIDO DE TEXTO PARA LAS ETIQUETAS
//COMENTARIOS <!-- asd -->
\s+                                 /* skip whitespace */
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/

"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';
"/"                                 return 'diag';
"?"                                 return 'interrog';
"'"                                return 'apos';
[xX][mM][lL]                        return "xml";

'&lt;'                              return 'less';
'&gt;'                              return 'greater';
'&amp;'                             return 'ampersand';
'&apos;'                            return "apostrophe";
'&quot;'                            return "quot";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*          return 'identifier';

{stringliteral}                     return 'cadena'
{charliteral}                       return 'cadena2'

{content}                           return 'content'

<<EOF>>                             return 'EOF'
//error lexico
.                                   {
                                        console.log(errores.default);
                                        errores.default.agregarError('lexico', 'Simbolo inesperado ' + yytext , yylloc.first_line, yylloc.first_column);
                                    }

/lex

//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : ENCABEZADO EOF              { return $1; }
;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            { 
                $7.unshift(new Objeto($3, '', @1.first_line, @1.first_column, $4, [], true)); 
                $$ = $7; 
            }
            | error LISTAELEMENTOS
            {
                errores.default.agregarError('sintáctico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column);
                $$ = $2;
            }
;

LISTAELEMENTOS: LISTAELEMENTOS ELEMENTO 
            { 
                if ($1 !== null){
                    if ($2 !== null)
                        $1.push($2); 
                    $$ = $1;
                }else if ($2 !== null)
                    $$ = [$1]; 
                else 
                    $$ = [];
            }
            | ELEMENTO                  
            { 
                if ($1 !== null)
                    $$ = [$1]; 
                else 
                    $$ = [];
            }
;

ELEMENTO: lt identifier LISTAATRIBUTOS diag gt                                  
        { 
            $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, [], true); 
        }
        | lt identifier LISTAATRIBUTOS gt TEXTCONTENT lt diag identifier gt     
        { 
            console.log(Objeto);
            if ($2 === $8){
                $$ = new Objeto($2, $5.toString(), @1.first_line, @1.first_column, $3, [], false); 
            }else{
                console.log(errores.default);
                console.log('Linea 111: Error semantico: Las etiquetas deben ser iguales:\n'+$2+"!="+$8+" \natributos: "+$3+"\ntexto: \n"+$5);
                errores.default.agregarError('semantico', 'Las etiquetas deben ser iguales', @1.first_line, @1.first_column);
                $$ = null;
            }
        }
        | lt identifier LISTAATRIBUTOS gt LISTAELEMENTOS lt diag identifier gt  
        { 
            if ($2 === $8){
                $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, $5, false); 
            }else{
                console.log(errores.default);
                console.log('Linea 120: Error semantico: Las etiquetas deben ser iguales');
                errores.default.agregarError('semantico', 'Las etiquetas deben ser iguales', @1.first_line, @1.first_column);
                $$ = null;
            }
        }
        | lt identifier LISTAATRIBUTOS gt lt diag identifier gt                 
        { 
            if ($2 === $7){
                $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, [], false); 
            }else{
                console.log(errores.default);
                console.log('Linea 129: Error semantico: Las etiquetas deben ser iguales');
                errores.default.agregarError('semantico', 'Las etiquetas deben ser iguales', @1.first_line, @1.first_column);
                $$ = null;
            }
        }
        | error gt
        {
            console.log('Entra a error sintactico');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null;
        }
;

LISTAATRIBUTOS: ATRIBUTOS   { $$= $1; }
            |               { $$ = [];}
             ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO   { $1.push($2); $$= $1; }
            | ATRIBUTO          { $$ = [$1]; }
            ;

ATRIBUTO:   identifier asig cadena      { $$ = new Atributo($1.toString(), $3, @1.first_line, @1.first_column); }
            | identifier asig cadena2   { $$ = new Atributo($1.toString(), $3, @1.first_line, @1.first_column); }
            | error             { 
                                    console.log('Entra a error Atribut sintactico');
                                    errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
                                    $$ = new Atributo("", "", @1.first_line, @1.first_column);
                }
            
;

TEXTCONTENT: TEXTCONTENT TEXT   { $1 = $1 +" "+ $2; $$ = $1;}
            | TEXT              { $$ = $1;}
;

TEXT: identifier            {  $$ = $1.toString(); }
        | content           {  $$ = $1.toString(); }
        | DoubleLiteral     { $$ = $1.toString(); }
        | IntegerLiteral    {  $$ = $1.toString(); }
        | xml               {  $$ = $1.toString(); }
        | apos              {  $$ = $1.toString(); }
        | less              { $$ = "<";}
        | greater           { $$ = ">";}
        | ampersand         {  $$ = "&"; }
        | apostrophe        { $$ = "'";}
        | quot              { $$ = "\""; }
        | error             { $$ = $1.toString();}
;
