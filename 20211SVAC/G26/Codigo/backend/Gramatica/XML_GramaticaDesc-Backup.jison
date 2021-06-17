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
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';
"/"                                 return 'diag';
"?"                                 return 'interrog';
[xX][mM][lL]                        return "xml";


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*          return 'identifier';

{stringliteral}                     return 'cadena'
{charliteral}                       return 'cadena2'

{content}                           return 'content'

<<EOF>>                     return 'EOF'
//error lexico
.                                   {
                                        errores.default.agregarError('lexico', 'Simbolo inesperado ' + yytext, yylloc.first_line, yylloc.first_column);
                                    }

/lex

//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : ENCABEZADO EOF         { return $1; }
    ;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            { 
                $7.unshift(new Objeto($3, '', @1.first_line, @1.first_column, $4, [], true)); 
                $$ = $7; 
            }
            | error gt LISTAELEMENTOS
            {
                errores.default.agregarError('sintáctico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column);
                $$ = $3;
            }
;

LISTAELEMENTOS: ELEMENTO LISTAELEMENTOS 
                { 
                    $1 = $1.concat($2);
                    $$ = $1;
                }
                |  { $$ = [];}
;

ELEMENTO: lt ELEM 
        {
            $$ = [$2];
        }
;

ELEM:   identifier LISTAATRIBUTOS TIPOELEM 
        { 
            let newObj = null;
            if ($3 !== null){
                if ($3.idCierre === '' && $3.texto === '' && $3.content === null){ /** Etiqueta unica */
                    newObj = new Objeto($1, '', @1.first_line, @1.first_column, $2, [], true);
                }else if ($3.idCierre !== ''){ /** Etiqueta doble */ 
                    if ($1 === $3.idCierre){   
                        //newObj = new Objeto($1, $3.texto, @1.first_line, @1.first_column, $2, $3.content !=== null?$3.content:[], false);
                        if ($3.content !== null)    /** El contenido es mas objetos */
                            newObj = new Objeto($1, '', @1.first_line, @1.first_column, $2, $3.content, false); 
                        else if ($3.texto !== '') /** El contenido es un texto */
                            newObj = new Objeto($1, $3.texto, @1.first_line, @1.first_column, $2, [], false);
                        else
                            newObj = new Objeto($1, '', @1.first_line, @1.first_column, $2, [], false);
                    }else{
                        console.log('Linea 85: Error semantico: Las etiquetas deben ser iguales');
                        errores.default.agregarError('semantico','Las etiquetas deben ser iguales', @1.first_line, @1.first_column);
                    }
                }
            }
            $$ = newObj;
        }
;

LISTAATRIBUTOS:
        ATRIBUTO LISTAATRIBUTOS         
        { 
            if ($1 !== null){
                $1 = $1.concat($2); 
                $$ = $1 ;
            }else
                $$ = $2; 
        }
        |                               { $$ = []; }
;

ATRIBUTO:   
        identifier asig TIPOCADENA { $$ = [new Atributo($1, $3, @1.first_line, @1.first_column)]; }
        /*| error
        {
            console.log('Entra a error sintactico de atributo');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null;
        }*/
;

TIPOCADENA:     
        cadena          { $$ = $1.toString(); }
        | cadena2       { $$ = $1.toString(); }
;

TIPOELEM: 
        diag gt                               
        { 
            $$ = {'texto':'', 'content': null, 'idCierre': ''}; 
        }
        | gt TEXTCONTENT lt MOREELEMENTS      
        { 
            if ($4.idCierre !== ''){
                if ($2 !== '') /* Etiqueta con texto*/
                    $4.texto = $2;
                $$ = $4;
            }
        }
        | error gt
        {
            console.log('Entra a error sintactico');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null;
        }
        ;

MOREELEMENTS:
        diag identifier gt      { $$ = {'texto':'','content':null,'idCierre':$2};}
        | ELEM lt MOREELEMENTS  
        { 
            if ($3.idCierre !== ''){ /** Se esta cerrando una etiqueta y se comienza a subir **/
                if ($1 instanceof Objeto){
                    if ($3.content === null)
                        $$ = {'texto':'', 'content':[$1], 'idCierre':$3.idCierre};
                    else{
                        $3.content.unshift($1);
                        $$ = {'texto':'', 'content':$3.content, 'idCierre':$3.idCierre};
                    }
                }else if ($1 === null){
                    $$ = $3;
                }else{

                }
            }
        }    
;

TEXTCONTENT:    TEXT TEXTCONTENT { $1 = $1 + $2; $$ = $1; }
                |                { $$ = ''; }
;

TEXT:   identifier          { $$ = $1.toString(); }
        | content           { $$ = $1.toString(); }
        | DoubleLiteral     { $$ = $1.toString(); }
        | IntegerLiteral    { $$ = $1.toString(); }
        | cadena            { $$ = $1.toString(); }
        | cadena2           { $$ = $1.toString(); }
        | xml               { $$ = $1.toString(); }        
;