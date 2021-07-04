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
    const {Nodo} = require('../Reporte/Nodo');
    const cst = require('../Reporte/CST');
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
START : ENCABEZADO EOF              
        {
            /* CONSTRUCCION DE CST */
            let raiz = new Nodo(cst.cstXmlAsc.getId(), 'START', null, [cst.cstXmlAsc.obtenerUltimoNodo()]); 
            cst.cstXmlAsc.setRaiz(raiz);
            return $1; 
        }
;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            { 
                $7.unshift(new Objeto($3, '', @1.first_line, @1.first_column, $4, [], true)); 
                $$ = $7; 
                /* CONSTRUCCION DE CST */
                let elementos = cst.cstXmlAsc.obtenerUltimoNodo();
                let atributosE = cst.cstXmlAsc.obtenerUltimoNodo();
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ENCABEZADO', null, 
                                                    [new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), '<', null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'interrog', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), '?', null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'xml', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $3.toString().replaceAll("\"",""), null, [])]), 
                                                    atributosE,
                                                    new Nodo(cst.cstXmlAsc.getId(), 'interrog', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), '?', null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), '>', null, [])]), 
                                                    elementos]));
            }
            | error LISTAELEMENTOS
            {
                errores.default.agregarError('sintáctico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column);
                $$ = $2;
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ENCABEZADO', null, 
                                                    [cst.cstXmlAsc.obtenerUltimoNodo()]));
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
                /* CONSTRUCCION DE CST */
                let elem = cst.cstXmlAsc.obtenerUltimoNodo();
                let listaElem = cst.cstXmlAsc.obtenerUltimoNodo();
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'LISTAELEMENTOS', null, 
                                                    [listaElem, elem]));
            }
            | ELEMENTO                  
            { 
                if ($1 !== null)
                    $$ = [$1]; 
                else 
                    $$ = [];
                /* CONSTRUCCION DE CST */
                let padreLE = new Nodo(cst.cstXmlAsc.getId(), 'LISTAELEMENTOS', null, [cst.cstXmlAsc.obtenerUltimoNodo()]);
                cst.cstXmlAsc.agregarPila(padreLE);
            }
;

ELEMENTO: lt identifier LISTAATRIBUTOS diag gt                                  
        { 
            $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, [], true); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ELEMENTO', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]),
                                                cst.cstXmlAsc.obtenerUltimoNodo(), 
                                                new Nodo(cst.cstXmlAsc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $4.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $5.toString().replaceAll("\"",""), null, [])])]));
        }
        | lt identifier LISTAATRIBUTOS gt TEXTCONTENT lt diag identifier gt     
        { 
            console.log(Objeto);
            if ($2 === $8){
                $$ = new Objeto($2, $5.toString().replaceAll("\"",""), @1.first_line, @1.first_column, $3, [], false); 
            }else{
                console.log(errores.default);
                console.log('Linea 111: Error semantico: Las etiquetas deben ser iguales:\n'+$2+"!="+$8+" \natributos: "+$3+"\ntexto: \n"+$5);
                errores.default.agregarError('semantico', 'Las etiquetas deben ser iguales', @1.first_line, @1.first_column);
                $$ = null;
            }
            /* CONSTRUCCION DE CST */
            var elemText = cst.cstXmlAsc.obtenerUltimoNodo();
            var elemAtr = cst.cstXmlAsc.obtenerUltimoNodo();
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ELEMENTO', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]),
                                                elemAtr, 
                                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $4.toString().replaceAll("\"",""), null, [])]),
                                                elemText,
                                                new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $6.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $7.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $8.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $9.toString().replaceAll("\"",""), null, [])])]));
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
            /* CONSTRUCCION DE CST */
            let elem1 = cst.cstXmlAsc.obtenerUltimoNodo();
            let atr1 = cst.cstXmlAsc.obtenerUltimoNodo();
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ELEMENTO', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]),
                                                atr1, 
                                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $4.toString().replaceAll("\"",""), null, [])]),
                                                elem1,
                                                new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $6.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $7.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $8.toString().replaceAll("\"",""), null, [])]),
                                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $9.toString().replaceAll("\"",""), null, [])])]));
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
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ELEMENTO', null, 
                                [new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]),
                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]),
                                cst.cstXmlAsc.obtenerUltimoNodo(), 
                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $4.toString().replaceAll("\"",""), null, [])]),
                                new Nodo(cst.cstXmlAsc.getId(), 'lt', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $5.toString().replaceAll("\"",""), null, [])]),
                                new Nodo(cst.cstXmlAsc.getId(), 'diag', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $6.toString().replaceAll("\"",""), null, [])]),
                                new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $7.toString().replaceAll("\"",""), null, [])]),
                                new Nodo(cst.cstXmlAsc.getId(), 'gt', null, 
                                            [new Nodo(cst.cstXmlAsc.getId(), $8.toString().replaceAll("\"",""), null, [])])]));
        }
        | error gt
        {
            console.log('Entra a error sintactico');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null;
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ELEMENTO', null, []));
        }
;

LISTAATRIBUTOS: ATRIBUTOS   
            { 
                $$= $1; 
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'LISTAATRIBUTOS', null, 
                                                    [cst.cstXmlAsc.obtenerUltimoNodo()]));
            }
            |               
            { 
                $$ = [];
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'LISTAATRIBUTOS', null, 
                                                    [new Nodo(cst.cstXmlAsc.getId(), 'epsilon', null, [])]));
            }
             ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO   
            { 
                $1.push($2); 
                $$= $1; 
                /* CONSTRUCCION DE CST */
                let atr2 = cst.cstXmlAsc.obtenerUltimoNodo();
                let atrs2 = cst.cstXmlAsc.obtenerUltimoNodo();
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ATRIBUTOS', null, [atrs2, atr2]));
            }
            | ATRIBUTO          
            { 
                $$ = [$1]; 
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ATRIBUTOS', null, [cst.cstXmlAsc.obtenerUltimoNodo()]));
            }
            ;

ATRIBUTO:   identifier asig cadena      
            { 
                $$ = new Atributo($1.toString().replaceAll("\"",""), $3, @1.first_line, @1.first_column); 
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ATRIBUTO', null, 
                                                    [new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'asignacion', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'cadena', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $3.toString().replaceAll("\"",""), null, [])])]));
            }
            | identifier asig cadena2   
            { 
                $$ = new Atributo($1.toString().replaceAll("\"",""), $3, @1.first_line, @1.first_column); 
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ATRIBUTO', null, 
                                                    [new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'asignacion', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $2.toString().replaceAll("\"",""), null, [])]), 
                                                    new Nodo(cst.cstXmlAsc.getId(), 'cadena', null, 
                                                                [new Nodo(cst.cstXmlAsc.getId(), $3.toString().replaceAll("\"",""), null, [])])]));
            }
            | error             
            { 
                console.log('Entra a error Atribut sintactico');
                errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
                $$ = new Atributo("", "", @1.first_line, @1.first_column);
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'ATRIBUTO', null, []));
            }
            
;

TEXTCONTENT: TEXTCONTENT TEXT   
            { 
                $1 = $1 +" "+ $2; 
                $$ = $1;
                /* CONSTRUCCION DE CST */
                let text2 = cst.cstXmlAsc.obtenerUltimoNodo();
                let textContent2 = cst.cstXmlAsc.obtenerUltimoNodo();
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXTCONTENT', null, [textContent2, text2]));
            }
            | TEXT              
            { 
                $$ = $1;
                /* CONSTRUCCION DE CST */
                cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXTCONTENT', null, [cst.cstXmlAsc.obtenerUltimoNodo()]));
            }
;

TEXT: identifier            
        {  
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | content           
        {  
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'content', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | DoubleLiteral     
        { 
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'double', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | IntegerLiteral    
        {  
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'integer', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | xml               
        {  
            $$ = $1.toString(); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | apos              
        {  
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'comilla simple', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | less              
        { 
            $$ = "<";
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'menor que', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | greater           
        { 
            $$ = ">";
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'mayor que', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | ampersand         
        {  
            $$ = "&"; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'ampersand', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | apostrophe        
        { 
            $$ = "'";
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'apostrofe', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | quot              
        { 
            $$ = "''"; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlAsc.getId(), 'comilla doble', null, 
                                                            [new Nodo(cst.cstXmlAsc.getId(), '"', null, [])])]));
        }
        | error             
        { 
            $$ = $1.toString().replaceAll("\"","");
            /* CONSTRUCCION DE CST */
            cst.cstXmlAsc.agregarPila(new Nodo(cst.cstXmlAsc.getId(), 'TEXT', null, []));
        }
;
