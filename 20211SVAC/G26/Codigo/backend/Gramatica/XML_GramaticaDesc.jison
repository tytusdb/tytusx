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
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

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
START : ENCABEZADO EOF         
        { 
            let raiz = new Nodo(cst.cstXmlDesc.getId(), 'START', null, [cst.cstXmlDesc.obtenerUltimoNodo()]); 
            cst.cstXmlDesc.setRaiz(raiz);
            return $1; 
        }
    ;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            { 
                $7.unshift(new Objeto($3, '', @1.first_line, @1.first_column, $4, [], true)); 
                $$ = $7; 
                /* CONSTRUCCION DE CST */
                let listaElem2 = cst.cstXmlDesc.obtenerUltimoNodo();
                let listAtrs3 = cst.cstXmlDesc.obtenerUltimoNodo();
                cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ENCABEZADO', null, 
                                                    [new Nodo(cst.cstXmlDesc.getId(), 'lt', null, 
                                                                [new Nodo(cst.cstXmlDesc.getId(), '<', null, [])]),
                                                    new Nodo(cst.cstXmlDesc.getId(), 'interrog', null, 
                                                                [new Nodo(cst.cstXmlDesc.getId(), '?', null, [])]),
                                                    new Nodo(cst.cstXmlDesc.getId(), 'xml', null, 
                                                                [new Nodo(cst.cstXmlDesc.getId(), $3.toString(), null, [])]),
                                                    listAtrs3, 
                                                    new Nodo(cst.cstXmlDesc.getId(), 'interrog', null, 
                                                                [new Nodo(cst.cstXmlDesc.getId(), '?', null, [])]),
                                                    new Nodo(cst.cstXmlDesc.getId(), 'gt', null, 
                                                                [new Nodo(cst.cstXmlDesc.getId(), '>', null, [])]),
                                                    listaElem2]));
            }
            | error LISTAELEMENTOS
            {
                errores.default.agregarError('sintáctico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column);
                $$ = $2;
                /* CONSTRUCCION DE CST */
                cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ENCABEZADO', null, 
                                                    [new Nodo(cst.cstXmlDesc.getId(), 'error', null, []),
                                                    cst.cstXmlDesc.obtenerUltimoNodo()]));
            }            

;

LISTAELEMENTOS: ELEMENTO LISTAELEMENTOS 
                { 
                    $1 = $1.concat($2);
                    $$ = $1;
                    /* CONSTRUCCION DE CST */
                    let listaElem = cst.cstXmlDesc.obtenerUltimoNodo();
                    let elem2 = cst.cstXmlDesc.obtenerUltimoNodo();
                    cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'LISTAELEMENTOS', null, 
                                                        [elem2, listaElem]));
                }
                |  
                { 
                    $$ = [];
                    /* CONSTRUCCION DE CST */
                    cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'LISTAELEMENTOS', null, 
                                                        [new Nodo(cst.cstXmlDesc.getId(), 'epsilon', null, [])]));
                }
;

ELEMENTO: lt ELEM 
        {
            $$ = [$2];
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ELEMENTO', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '<', null, [])]),
                                                cst.cstXmlDesc.obtenerUltimoNodo()]));
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
            /* CONSTRUCCION DE CST */
            let tElement = cst.cstXmlDesc.obtenerUltimoNodo();
            let listAtrs2 = cst.cstXmlDesc.obtenerUltimoNodo();
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ELEM', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'identifier', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString(), null, [])]),
                                                listAtrs2, tElement]));
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
            /* CONSTRUCCION DE CST */
            let listAtrs = cst.cstXmlDesc.obtenerUltimoNodo();
            let atr = cst.cstXmlDesc.obtenerUltimoNodo();
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'LISTAATRIBUTOS', null, 
                                                [atr, listAtrs]));
        }
        |                               
        { 
            $$ = []; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'LISTAATRIBUTOS', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'epsilon', null, [])]));
        }
;

ATRIBUTO:   
        identifier asig TIPOCADENA { $$ = [new Atributo($1, $3, @1.first_line, @1.first_column)]; }
        | error gt
        {
            console.log('Entra a error sintactico de atributo');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ATRIBUTO', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'identifier', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString(), null, [])]),
                                                new Nodo(cst.cstXmlDesc.getId(), 'asignacion', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '=', null, [])]),
                                                new Nodo(cst.cstXmlDesc.getId(), cst.cstXmlDesc.obtenerUltimoNodo(), null, [])]));
        }
        | error lt
        {
            console.log('Entra a error sintactico de atributo 2');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'ATRIBUTO', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'error', null, []),
                                                new Nodo(cst.cstXmlDesc.getId(), 'lt', null, 
                                                        [new Nodo(cst.cstXmlDesc.getId(), '<', null, [])])]));
        }        
;

TIPOCADENA:     
        cadena          
        { 
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TIPOCADENA', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'cadena', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | cadena2       
        { 
            $$ = $1.toString().replaceAll("'",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TIPOCADENA', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'cadena', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("'",""), null, [])])]));
        }
;

TIPOELEM: 
        diag gt                               
        { 
            $$ = {'texto':'', 'content': null, 'idCierre': ''}; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TIPOELEM', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '/', null, [])]), 
                                                new Nodo(cst.cstXmlDesc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '>', null, [])])]));
        }
        | gt TEXTCONTENT lt MOREELEMENTS      
        { 
            if ($4.idCierre !== ''){
                if ($2 !== '') /* Etiqueta con texto*/
                    $4.texto = $2;
                $$ = $4;
            }
            /* CONSTRUCCION DE CST */
            let mElem2 = cst.cstXmlDesc.obtenerUltimoNodo();
            let textContent2 = cst.cstXmlDesc.obtenerUltimoNodo();
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TIPOELEM', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '>', null, [])]),
                                                textContent2,
                                                new Nodo(cst.cstXmlDesc.getId(), 'lt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '<', null, [])]),
                                                mElem2]));
        }
        | diag error gt
        {
            console.log('Entra a error sintactico de TIPOELEM');
            errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = null;
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TIPOELEM', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '/', null, [])]), 
                                                new Nodo(cst.cstXmlDesc.getId(), 'error', null, []), 
                                                new Nodo(cst.cstXmlDesc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '>', null, [])])]));
        }   
        ;

MOREELEMENTS:
        diag identifier gt      
        { 
            $$ = {'texto':'','content':null,'idCierre':$2};
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'MOREELEMENTS', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'diag', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '/', null, [])]), 
                                                new Nodo(cst.cstXmlDesc.getId(), 'identifier', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $2.toString().replaceAll("\"",""), null, [])]), 
                                                new Nodo(cst.cstXmlDesc.getId(), 'gt', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '>', null, [])])]));
        }
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
            /* CONSTRUCCION DE CST */
            let mElem1 = cst.cstXmlDesc.obtenerUltimoNodo();
            let elem1 = cst.cstXmlDesc.obtenerUltimoNodo();
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'MOREELEMENTS', null, 
                                                [elem1, 
                                                new Nodo(cst.cstXmlDesc.getId(), 'lt', null, [new Nodo(cst.cstXmlDesc.getId(), '<', null, [])]),
                                                mElem1]));
        }
       
;

TEXTCONTENT:    TEXT TEXTCONTENT 
                { 
                    $1 = $1 + $2; 
                    $$ = $1; 
                    /* CONSTRUCCION DE CST */
                    let textContent = cst.cstXmlDesc.obtenerUltimoNodo();
                    let t1 = cst.cstXmlDesc.obtenerUltimoNodo();
                    cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXTCONTENT', null, [t1, textContent]));
                }
                |                
                { 
                    $$ = '';
                    /* CONSTRUCCION DE CST */
                    cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXTCONTENT', null, 
                                                        [new Nodo(cst.cstXmlDesc.getId(), 'epsilon', null, [])])); 
                }
;

TEXT:   identifier          
        { 
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])])); 
        }
        | content           
        { 
            $$ = $1.toString(); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'content', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | DoubleLiteral     
        { 
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'double', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | IntegerLiteral    
        { 
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'integer', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])])); 
        }
        | xml               
        { 
            $$ = $1.toString(); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'identificador', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])]));
        }
        | apos              
        {  
            $$ = $1.toString().replaceAll("\"",""); 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'comilla simple', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), $1.toString().replaceAll("\"",""), null, [])])])); 
        }
        | less              
        { 
            $$ = "<";
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'menor que', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), "<", null, [])])]));
        }
        | greater           
        { 
            $$ = ">";
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'mayor que', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), ">", null, [])])]));
        }
        | ampersand         
        {  
            $$ = "&"; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'ampersand', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), "&", null, [])])]));
        }
        | apostrophe        
        { 
            $$ = "'";
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'apostrofe', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), "'", null, [])])]));
        }
        | quot              
        { 
            $$ = "\""; 
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, 
                                                [new Nodo(cst.cstXmlDesc.getId(), 'comilla doble', null, 
                                                            [new Nodo(cst.cstXmlDesc.getId(), '"', null, [])])]));
        }
        | error             
        { 
            $$ = $1.toString().replaceAll("\"","");
            /* CONSTRUCCION DE CST */
            cst.cstXmlDesc.agregarPila(new Nodo(cst.cstXmlDesc.getId(), 'TEXT', null, []));
        }
;