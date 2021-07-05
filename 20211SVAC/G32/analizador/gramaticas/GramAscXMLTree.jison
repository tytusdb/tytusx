/********************************************* PARTE LÉXICA *********************************************/
/*********Área de definiciones*********/
%lex

%options case-sensitive

%s                          comment
%%
/*********Área de reglas léxicas*********/

/***ER***/ 
//<!--(([^-])|(-([^-])))*-->      return 'COMENTARIO';
//<!--(.*?)-->                    return 'COMENTARIO';
<comment>[<]!--[\s\S\n]*?-->      return 'COMENTARIO';


/***Palabras reservadas***/ 
/*  < > & ' "  */
"&lt;"                      return 'LT'
"&gt;"                      return 'GT'
"&amp;"                     return 'AMP'
"&apos;"                    return 'APOS'
"&quot;"                    return 'QUOT'

/***Caracteres del lenguaje***/
"="                         return 'ASIGN';
"/"                         return 'BARRA';
"<"                         return 'ETABRE';
">"                         return 'ETCIERRE';
"?"                         return 'INTERR';

/***Otras ER***/ 
([a-zA-ZñÑáéíóúÁÉÍÓÚ_])[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_-]*	    return 'IDENTIFICADOR';
["][^\"]*["]                                            return 'CADENA';
([^ \r\t\na-zA-ZñÑáéíóúÁÉÍÓÚ0-9_><\"\'&])               return 'TEXTO';
[0-9]                                                   return 'DIGITO';

[ \r\t]+                    {/*Ignorar espacios en blanco*/}
\n                          {/*Ignorar espacios en blanco*/}


. {
  const er = new errorGram.Error({ tipo: 'léxico', linea: `${yylineno + 1}`, descripcion: `El lexema "${yytext}" en la columna: ${yylloc.first_column + 1} no es válido.` });
  tablaErrores.Errores.getInstance().push(er);
}

<<EOF>>				        return 'EOF';

/lex

/********************************************* PARTE SINTÁCTICA *********************************************/
/*********Área declaraciones*********/
%{
    //Req. para recopilación de errores
    const errorGram = require("../arbol/error");
    const tablaErrores = require("../arbol/errores");

    //Req. que recopilará los nodos para elaborar el CST
    const { NodoAST }= require('../arbol/nodoAST');
%}

/*********Asociación de operadores y precedencias*********/

/*No*/

%start INIT

%%
/*********Área de producciones*********/

INIT
    : PROLOGO NODORAICES EOF            { return new NodoAST({label: 'INIT', hijos: [$1, $2], linea: yylineno}); }  
;

PROLOGO
    : ETABRE INTERR IDENTIFICADOR IDENTIFICADOR ASIGN CADENA IDENTIFICADOR ASIGN CADENA INTERR ETCIERRE     { $$ = new NodoAST({label: 'PROLOGO', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11], linea: yylineno}); }
;  

NODORAICES
    : NODORAICES NODORAIZ       { $$ = new NodoAST({label: 'NODORAICES', hijos: [$1, $2], linea: yylineno}); }
    | NODORAIZ                  { $$ = new NodoAST({label: 'NODORAICES', hijos: [$1], linea: yylineno}); }
;

NODORAIZ
    : OBJETO            { $$ = new NodoAST({label: 'NODORAIZ', hijos: [$1], linea: yylineno}); }
;

OBJETO
    : ETABRE IDENTIFICADOR LISTAATRIBUTOS ETCIERRE OBJETOS ETABRE BARRA IDENTIFICADOR ETCIERRE      { $$ = new NodoAST({label: 'OBJETO', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
    | ETABRE IDENTIFICADOR LISTAATRIBUTOS ETCIERRE LISTA_IDS ETABRE BARRA IDENTIFICADOR ETCIERRE    { $$ = new NodoAST({label: 'OBJETO', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
    | ETABRE IDENTIFICADOR LISTAATRIBUTOS BARRA ETCIERRE                                            { $$ = new NodoAST({label: 'OBJETO', hijos: [$1, $2, $3, $4, $5], linea: yylineno}); }
;

OBJETOS
    : OBJETOS OBJETO        { $$ = new NodoAST({label: 'OBJETOS', hijos: [$1, $2], linea: yylineno}); }
    | OBJETO                { $$ = new NodoAST({label: 'OBJETOS', hijos: [$1], linea: yylineno}); }
;

LISTAATRIBUTOS
    : ATRIBUTOS                 { $$ = new NodoAST({label: 'LISTA_ATRIBUTOS', hijos: [$1], linea: yylineno}); }
    | /*ε*/                     { $$ = ' ';
                                /*Se coloca vacío, de lo contrario retorna 'undefined' al concatenar un string y crea error*/
                                /*$$ = new NodoAST({label: ' ', hijos: [], linea: yylineno});*/ }
;

ATRIBUTOS
    : ATRIBUTOS ATRIBUTO        { $$ = new NodoAST({label: 'ATRIBUTOS', hijos: [$1, $2], linea: yylineno}); }
    | ATRIBUTO                  { $$ = new NodoAST({label: 'ATRIBUTOS', hijos: [$1], linea: yylineno}); }
;

ATRIBUTO
    : IDENTIFICADOR ASIGN CADENA    { $$ = new NodoAST({label: 'ATRIBUTO', hijos: [$1, $2, $3], linea: yylineno}); }
;

LISTA_IDS
    : LISTA_IDS IDENTIFICADOR   { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | LISTA_IDS TEXTO           { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | LISTA_IDS HREF            { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | LISTA_IDS DIGITO          { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | LISTA_IDS INTERR          { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | LISTA_IDS BARRA           { $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
    | IDENTIFICADOR             { $$ = new NodoAST({label: 'IDENTIFICADOR', hijos: [$1], linea: yylineno}); }
    | TEXTO                     { $$ = new NodoAST({label: 'TEXTO', hijos: [$1], linea: yylineno}); }
    | HREF                      { $$ = new NodoAST({label: 'HREF', hijos: [$1], linea: yylineno}); }
    | DIGITO                    { $$ = new NodoAST({label: 'DIGITO', hijos: [$1], linea: yylineno}); }
    | INTERR                    { $$ = new NodoAST({label: 'INTERR', hijos: [$1], linea: yylineno}); }
    | BARRA                     { $$ = new NodoAST({label: 'BARRA', hijos: [$1], linea: yylineno}); }
;

HREF
    : LT        { $$ = new NodoAST({label: 'LT', hijos: [$1], linea: yylineno}); }
    | GT        { $$ = new NodoAST({label: 'GT', hijos: [$1], linea: yylineno}); }
    | AMP       { $$ = new NodoAST({label: 'AMP', hijos: [$1], linea: yylineno}); }
    | APOS      { $$ = new NodoAST({label: 'APOS', hijos: [$1], linea: yylineno}); }
    | QUOT      { $$ = new NodoAST({label: 'QUOT', hijos: [$1], linea: yylineno}); }
;