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
  const er = new errorGram.Error({ tipo: 'Léxico', linea: `${yylineno + 1}`, descripcion: `El lexema "${yytext}" en la columna: ${yylloc.first_column + 1} no es válido.` });
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

    //Req. para el manejo de errores
    const {Objeto} = require("../abstractas/objeto");
    const {Atributo} = require("../abstractas/atributo");
    const {Prologo} = require("../abstractas/prologo");

    //Req. que recopilará los nodos para el ASTs
    const { NodoAST }= require('../arbol/nodoAST');

    //Req. para elaborar el reporte gramatical
    const ValAsc = require("../Reportes/ValAscendente");
    const RepoGram = require("../Reportes/RepGramDescXML");
%}

/*********Asociación de operadores y precedencias*********/

%start INIT

%%
/*********Área de producciones*********/

INIT
    : PROLOGO NODORAICES  EOF       { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'INIT -> PROLOGO NODORAICES EOF',
                                    reglas:'INIT.lista = NODORAICES.lista; return(prologo: PROLOGO.lista, cuerpo: INIT.lista);'}));
                                    return new NodoAST({label: 'INIT', hijos: [$1, $2], linea: yylineno}); }  
;

PROLOGO
    : ETABRE INTERR IDENTIFICADOR IDENTIFICADOR ASIGN CADENA IDENTIFICADOR ASIGN CADENA INTERR ETCIERRE { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'PROLOGO -> ETABRE INTERR IDENTIFICADOR IDENTIFICADOR ASIGN CADENA IDENTIFICADOR ASIGN CADENA INTERR ETCIERRE',
                                                                                                        reglas:'PROLOGO.Prolog = new Prologo(CADENA1.val, CADENA2.val);'})); 
                                                                                                        $$ = new NodoAST({label: 'PROLOGO', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11], linea: yylineno}); }
;  

NODORAICES
    : NODORAIZ NODORAICES_PRIM      { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'NODORAICES -> NODORAIZ NODORAICES_PRIM',
                                    reglas:'NODORAICES.lista = NODORAICES_PRIM.lista; NODORAICES.lista.push(NODORAIZ)'}));
                                    $$ = new NodoAST({label: 'NODORAICES', hijos: [$1, $2], linea: yylineno}); }
;

NODORAICES_PRIM
    : NODORAIZ NODORAICES_PRIM      { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'NODORAICES_PRIM -> NODORAIZ NODORAICES_PRIM',
                                    reglas:'NODORAICES_PRIM.lista = NODORAICES_PRIM1.lista; NODORAICES_PRIM.lista.push(NODORAIZ)'}));
                                    $$ = new NodoAST({label: 'NODORAICES_PRIM', hijos: [$1, $2], linea: yylineno}); }
    |                               { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'NODORAICES_PRIM -> ε',
                                    reglas:'NODORAICES_PRIM.lista = []'}));
                                    $$ = ' '; }
;

NODORAIZ
    : OBJETO        { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'NODORAIZ -> OBJETO',
                    reglas:'NODORAIZ.lista = OBJETO.lista;'}));
                    $$ = new NodoAST({label: 'NODORAIZ', hijos: [$1], linea: yylineno}); }
;

/*OBJETO podría reemplazarse por NUEVAETIQUETA y viceversa*/
OBJETO
    : INICIO_ETI CONTETIQUETA   { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'OBJETO -> INICIO_ETI CONTETI',
                                reglas:'OBJETO.Objeto = new Objeto(INICIO_ETI.IDENTIFICADOR, CONTETIQUETA.Etiqueta);'}));
                                $$ = new NodoAST({label: 'OBJETO', hijos: [$1, $2], linea: yylineno}); }
;

/*INICIO_ETI únicamente guarda el ID*/
INICIO_ETI
    : ETABRE IDENTIFICADOR      { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'INICIO_ETI -> ETABRE IDENTIFICADOR',
                                reglas:'INICIO_ETI.IDENTIFICADOR = IDENTIFICADOR.val;'}));
                                $$ = new NodoAST({label: 'INICIO_ETI', hijos: [$1, $2], linea: yylineno}); }
;

/*CONTETIQUETA almacena los atributos y el contenido*/
CONTETIQUETA
    : ETIQUETA          { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'CONTETIQUETA -> ETIQUETA',
                        reglas:'CONTETIQUETA.Etiqueta = new Etiqueta(ETIQUETA.Atributos, ETIQUETA.Contenido);'}));
                        $$ = new NodoAST({label: 'CONTETIQUETA', hijos: [$1], linea: yylineno}); }
;

ETIQUETA
    : ATRIBUTOS FIN_ETI     { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'ETIQUETA -> ATRIBUTOS FIN_ETI',
                            reglas:'ETIQUETA.Atributos = Atributos.lista; ETIQUETA.Contenido = FIN_ETI.Cntenido'}));
                            $$ = new NodoAST({label: 'ETIQUETA', hijos: [$1, $2], linea: yylineno}); }
    | FIN_ETI               { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'ETIQUETA -> FIN_ETI',
                            reglas:'ETIQUETA.Atributos = []; ETIQUETA.Contenido = FIN_ETI.Contenido'}));
                            $$ = new NodoAST({label: 'ETIQUETA', hijos: [$1], linea: yylineno}); }
;

/*FIN_ETI almacena lo que puede tener, ya sea una lista de ID's u otra lista de etiquetas*/
FIN_ETI
    : ETCIERRE LISTA_IDS ETABRE BARRA IDENTIFICADOR ETCIERRE    { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'FIN_ETI -> ETCIERRE LISTA_IDS ETABRE BARRA IDENTIFICADOR ETCIERRE',
                                                                reglas:'FIN_ETI.Contenido = LISTA_IDS.lista;'}));
                                                                $$ = new NodoAST({label: 'FIN_ETI', hijos: [$1, $2, $3, $4, $5, $6], linea: yylineno}); }
    | ETCIERRE L_ETIQUETAS BARRA IDENTIFICADOR ETCIERRE         { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'FIN_ETI -> ETCIERRE L_ETIQUETAS ETABRE BARRA IDENTIFICADOR ETCIERRE',
                                                                reglas:'FIN_ETI.Contenido = L_ETIQUETAS.lista;'}));
                                                                $$ = new NodoAST({label: 'FIN_ETI', hijos: [$1, $2, $3, $4, $5], linea: yylineno}); }
    /*AQUÍ VA FINETIQUETA EN VEZ DE ETABRE BARRA IDENTIFICADOR ETCIERRE*/
    | ETCIERRE ETABRE BARRA IDENTIFICADOR ETCIERRE              { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'FIN_ETI -> ETCIERRE ETABRE BARRA IDENTIFICADOR ETCIERRE',
                                                                reglas:'FIN_ETI.Contenido = [];'}));
                                                                $$ = new NodoAST({label: 'FIN_ETI', hijos: [$1, $2, $3, $4, $5], linea: yylineno}); }
    | BARRA ETCIERRE                                            { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'FIN_ETI -> BARRA ETCIERRE',
                                                                reglas:'FIN_ETI.Contenido = [];'}));
                                                                $$ = new NodoAST({label: 'FIN_ETI', hijos: [$1, $2], linea: yylineno}); }
;

L_ETIQUETAS
    : OBJETO L_ETIQUETAS_PRIM    { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'L_ETIQUETAS -> NUEVAETIQUETA L_ETIQUETAS_PRIM',
                                        reglas:'L_ETIQUETAS.lista = L_ETIQUETAS_PRIM.lista; L_ETIQUETAS.lista.push(NUEVAETIQUETA);'}));
                                        $$ = new NodoAST({label: 'L_ETIQUETAS', hijos: [$1, $2], linea: yylineno}); }
;

/*Si lo que viene es <ID entra a nueva etiqueta, si viene solo < es porque ya no vienen más etiquetas*/
/*Por ello se parten las etiquetas en:
ET_INICIO_APERTURA
ET_INICIO_CIERRE,
CONT_ETIQUETA,
ET_FINAL_CIERRE

CONT_ETIQUETA guarda una nueva lista y a su vez otra produción equivalente a ET_FINAL_APERTURA (<)*/

L_ETIQUETAS_PRIM
    : OBJETO L_ETIQUETAS_PRIM    { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'L_ETIQUETAS_PRIM -> OBJETO L_ETIQUETAS_PRIM',
                                        reglas:'L_ETIQUETAS_PRIM.lista = L_ETIQUETAS_PRIM1.lista; L_ETIQUETAS_PRIM.lista.push(OBJETO);'}));
                                        $$ = new NodoAST({label: 'L_ETIQUETAS_PRIM', hijos: [$1, $2], linea: yylineno}); }
    | ETABRE                            { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'L_ETIQUETAS_PRIM -> ETABRE',
                                        reglas:'L_ETIQUETAS_PRIM.lista = [];'}));
                                        $$ = new NodoAST({label: 'L_ETIQUETAS_PRIM', hijos: [$1], linea: yylineno}); }
    /*| FINETIQUETA L_ETIQUETAS_PRIM*/
    /*| error { }*/
;

/*NUEVAETIQUETA podría reemplazarse por OBJETO y viceversa*/
/*NUEVAETIQUETA
    : INICIO_ETI CONTETIQUETA   { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'NUEVAETIQUETA -> INICIO_ETI CONTETI',
                                reglas:'NUEVAETIQUETA.Objeto = new Objeto(INICIO_ETI.IDENTIFICADOR, CONTETIQUETA.Etiqueta);'}));
                                $$ = new NodoAST({label: 'NUEVAETIQUETA', hijos: [$1, $2], linea: yylineno}); }
;*/

/*FINETIQUETA
    : ETABRE BARRA IDENTIFICADOR ETCIERRE
;*/

ATRIBUTOS
    : ATRIBUTO ATRIBUTOS_PRIM   { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'ATRIBUTOS -> ATRIBUTO ATRIBUTOS_PRIM',
                                reglas:'ATRIBUTOS.lista = ATRIBUTOS_PRIM.lista; ATRIBUTOS.lista.push(NODORAIZ)'}));
                                $$ = new NodoAST({label: 'ATRIBUTOS', hijos: [$1, $2], linea: yylineno}); }
;

ATRIBUTOS_PRIM
    : ATRIBUTO ATRIBUTOS_PRIM   { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'ATRIBUTOS_PRIM -> ATRIBUTO ATRIBUTOS_PRIM',
                                reglas:'ATRIBUTOS_PRIM.lista = ATRIBUTOS_PRIM1.lista; ATRIBUTOS_PRIM.lista.push(ATRIBUTO)'}));
                                $$ = new NodoAST({label: 'ATRIBUTOS_PRIM', hijos: [$1, $2], linea: yylineno}); }
    |                           { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'ATRIBUTOS_PRIM -> ε',
                                reglas:'ATRIBUTOS_PRIM.lista = []'}));
                                $$ = ' '; }
;

ATRIBUTO
    : IDENTIFICADOR ASIGN CADENA    { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'ATRIBUTO -> IDENTIFICADOR ASIGN CADENA', 
                                    reglas:'ATRIBUTO.Atributo = new Atributo(IDENTIFICADOR.val, CADENA.val, linea.val, columna.val);'}));
                                    $$ = new NodoAST({label: 'ATRIBUTO', hijos: [$1, $2, $3], linea: yylineno}); }
;

LISTA_IDS
    : L_CONT LISTA_IDS_PRIM     { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'LISTA_IDS -> L_CONT LISTA_IDS_PRIM',
                                reglas:'LISTA_IDS.lista = LISTA_IDS_PRIM.lista; LISTA_IDS.lista.push(L_CONT)'}));
                                $$ = new NodoAST({label: 'LISTA_IDS', hijos: [$1, $2], linea: yylineno}); }
;

LISTA_IDS_PRIM
    : L_CONT LISTA_IDS_PRIM { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion: 'LISTA_IDS_PRIM -> L_CONT LISTA_IDS_PRIM',
                            reglas:'LISTA_IDS_PRIM.lista = LISTA_IDS_PRIM1.lista; LISTA_IDS_PRIM.lista.push(L_CONT)'}));
                            $$ = new NodoAST({label: 'LISTA_IDS_PRIM', hijos: [$1, $2], linea: yylineno}); }
    |                       { $$ = ' '; }
;

L_CONT
    : IDENTIFICADOR     { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> IDENTIFICADOR', 
                        reglas:'L_CONT.lista = [IDENTIFICADOR.val]'}));
                        $$ = new NodoAST({label: 'IDENTIFICADOR', hijos: [$1], linea: yylineno}); }
    | TEXTO             { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> TEXTO', 
                        reglas:'L_CONT.lista = [TEXTO.val]'}));
                        $$ = new NodoAST({label: 'TEXTO', hijos: [$1], linea: yylineno}); }
    | HREF              { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> HREF', 
                        reglas:'L_CONT.lista = [HREF.val]'}));
                        $$ = new NodoAST({label: 'HREF', hijos: [$1], linea: yylineno}); }
    | DIGITO            { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> DIGITO', 
                        reglas:'L_CONT.lista = [DIGITO.val]'}));
                        $$ = new NodoAST({label: 'DIGITO', hijos: [$1], linea: yylineno}); }
    | INTERR            { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> INTERR', 
                        reglas:'L_CONT.lista = [INTERR.val]'}));
                        $$ = new NodoAST({label: 'INTERR', hijos: [$1], linea: yylineno}); }
    | BARRA             { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'L_CONT -> BARRA', 
                        reglas:'L_CONT.lista = [BARRA.val]'}));
                        $$ = new NodoAST({label: 'BARRA', hijos: [$1], linea: yylineno}); }
;

HREF
    : LT        { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'HREF -> LT', reglas:' HREF.val = LT;'}));
                $$ = new NodoAST({label: 'LT', hijos: [$1], linea: yylineno});  }
    | GT        { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'HREF -> GT', reglas:' HREF.val = GT;'})); 
                $$ = new NodoAST({label: 'GT', hijos: [$1], linea: yylineno}); }
    | AMP       { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'HREF -> AMP', reglas:' HREF.val = AMP;'})); 
                $$ = new NodoAST({label: 'AMP', hijos: [$1], linea: yylineno}); }
    | APOS      { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'HREF -> APOS', reglas:' HREF.val = APOS;'})); 
                $$ = new NodoAST({label: 'APOS', hijos: [$1], linea: yylineno}); }
    | QUOT      { RepoGram.RepGramDescXML.getInstance().push(new ValAsc.ValAscendente({produccion:'HREF -> QUOT', reglas:' HREF.val = QUOT;'}));
                $$ = new NodoAST({label: 'QUOT', hijos: [$1], linea: yylineno}); }
;