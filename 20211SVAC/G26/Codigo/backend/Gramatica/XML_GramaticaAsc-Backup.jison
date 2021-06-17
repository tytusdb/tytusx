/**
 * Primer Proyecto OLC2 - Grupo 26
 */

/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const {Objeto} = require("../XML/Objeto");
    const {Atributo} = require("../XML/Atributo");
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
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
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

ELEMENTO:   lt identifier LISTAATRIBUTOS diag gt
            { 
                $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, [], true); 
            }
            | lt identifier LISTAATRIBUTOS gt LISTAOBJETOS lt diag identifier gt 
            { 
                let texto = '';
                for(let index = 0; index < $5.length; index++){
                    if (!($5[index] instanceof Objeto)){
                        texto = texto + $5.splice(index, 1);
                        index = index - 1;
                    }
                }
                if ($2 == $8){
                    $$ = new Objeto($2, texto, @1.first_line, @1.first_column, $3, $5, false); 
                }else{
                    console.log('Linea 105: Error semantico: Las etiquetas deben ser iguales');
                    $$ = null;
                } 
            }
;

LISTAOBJETOS: LISTAOBJETOS OBJETO   { $1.push($2); $$ = $1; }
            |                       { $$ = [];}
;

OBJETO: TEXT        { $$ = [$1]; }
        | ELEMENTO  { $$ = [$1]; }
;

LISTAATRIBUTOS: ATRIBUTOS   { $$= $1; }
            |               { $$ = []; }
;

ATRIBUTOS: ATRIBUTOS ATRIBUTO   { $1.push($2); $$= $1; }
            | ATRIBUTO          { $$ = [$1]; }
;

ATRIBUTO:   identifier asig cadena      
            { 
                //console.log(Atributo); 
                $$ = new Atributo($1.toString(), $3, @1.first_line, @1.first_column); 
            }
            | identifier asig cadena2   
            { 
                //console.log(Atributo); 
                $$ = new Atributo($1.toString(), $3, @1.first_line, @1.first_column); 
            }
;

TEXT: identifier            { $$ = $1.toString(); }
        | content           { $$ = $1.toString(); }
        | DoubleLiteral     { $$ = $1.toString(); }
        | IntegerLiteral    { $$ = $1.toString(); }
        | cadena            { $$ = $1.toString(); }
        | cadena2           { $$ = $1.toString(); }
        | xml               { $$ = $1.toString(); }
;
