/* Definición Léxica */
%lex

%options case-insensitive
%options yylineno

%%
\s+                                 /* skip whitespace */
"(:"[\s\S\n]*?":)"                  /* comentario en XQUERY */
"<!--"[\s\S\n]*?"-->"               /* Cometario de múltiples líneas XQUERY */
/* ELEMENTOS RESERVADOS DE XQUERY*/
"or"                        return 'or';
"and"                       return 'and';
"let"                       return 'let';
'for'                       return 'for';
'mod'                       return 'mod';
'doc'                       return 'doc';
'to'                        return 'to';
'in'                        return 'in';
'at'                        return 'at';
'where'                     return 'where';
'order'                     return 'order';
'by'                        return 'by';
'return'                    return 'return';
'data'                      return 'data';

/* PALABRAS RESERVADAS XQUERY */
"div"                      return 'div';
"ancestor-or-self"          return 'ancestor-or-self';
"descendant-or-self"        return 'descendant-or-self';
"following-sibling"         return 'following-sibling';
"preceding-sibling"         return 'preceding-sibling';

/* PALABRAS RESERVADAS XPATH */
"last"                     return  'last';
"position"                 return  'position';
"text"                     return  'text';
"ancestor"                 return  'ancestor'; 
"attribute"                return  'attribute'
"child"                    return  'child';
"descendant"               return  'descendant';
"following"                return  'following';
"namespace"                return  'namespace';
"parent"                   return  'parent';
"preceding"                return  'preceding';
"sibling"                  return  'sibling';
"self"                     return  'self';
"node"                     return  'node';
\"[^"]+\"                   yytext = yytext.slice(1,-1); return 'STRING';

/* SIMBOLOS PARA OPERACIONES ARITMÉTICAS */
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'por';
"%"                         return 'mod';
"div"                       return 'div';

/* SIMBOLOS PARA OPERACIONES RELACIONALES */
"<="                        return 'menorigual';
">="                        return 'mayorigual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'igual';
"=="                        return 'digual';
"!="                        return 'noigual';
":="                        return 'dosPuntosIgual';

"&&"                        return 'and';
"or"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'parentesisa';
")"                         return 'parentesisc'

"/\/"                       return 'barraDoble';
"/"                         return 'barraSimple';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"|"                         return 'union';


"["                         return 'cora';
"]"                         return 'corc';
"."                         return 'punto';
"::"                        return 'ddpuntos';
".."                        return 'puntosDobles';
"@"                         return 'arroba';
"$"                         return 'dolar';
"{"                         return 'llaveAbre';
"}"                         return "llaveCierra";
","                         return 'coma';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'entero';
[a-zA-Z0-9_nÑ]+                       return 'nodoid';
\/\/                                return 'ddoble';
\/                                  return 'dsimple';


//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }


<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
/*%{
       const {Elemento} = require("../Expresiones/Elemento");
%}*/

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or' 'union'
%left 'and'
%left 'not'
//%left 'union'
%left 'igual' 'noigual'
%left 'menor' 'mayor' 'menorigual' 'mayorigual' 
%left 'ddoble' 'dsimple'
%left 'cora' 'corc'
%left 'parentesisa' 'parentesisc'
%left 'por' 'div' 'mod'
%left 'mas' 'menos'
%left 'barraSimple' 'barraDoble'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
/*START : LISTA_NODOS EOF{
       return $1;
};*/
START: XQUERY EOF{
    return $1;
}
;

XQUERY: XQUERY INSTRUCCION
       | INSTRUCCION
;

INSTRUCCION:  FUNCIONES
       |      CICLO_FOR
       |      SENTENCIA
       |      ASIGNACION
;
SENTENCIA: EOF
;

ASIGNACION: let dolar nodoid dosPuntosIgual DECLARACION2
       |    DECLARACION2
;

CICLO_FOR: for DECLARACION1 COMPLEMENTO
;

COMPLEMENTO: COMPLEMENTO INS_FOR
       |     INS_FOR
;

INS_FOR: ORDER_BY_FOR
       | where EXPRESION
       | return XPATH
;

ORDER_BY_FOR: ORDER_BY_FOR coma EXPRESION
       |      order by EXPRESION
;

DECLARACION1: dolar nodoid in DECLARACION2
       |      dolar nodoid at dolar nodoid in DECLARACION2
;

DECLARACION2: parentesisa EXPRESION to EXPRESION parentesisc
       |      parentesisa LISTA_VALORES parentesisc
       |      XPATH
;

LISTA_VALORES: LISTA_VALORES coma EXPRESION
       |       EXPRESION
;

XPATH: LISTA_NODOS
;

LISTA_NODOS : LISTA_NODOS OPERADOR NODO{
                     $1.push($3);
                     $$=$1;
              }
              |NODO{
                     $$=[$1];
              };

OPERADOR : union
              |or
              |;

NODO : ddoble VALOR_NODO{
              $$=new Elemento($2,tipoElemento.DOBLE_DIAGONAL);
       }
      |dsimple VALOR_NODO{
              $$=new Elemento($2,tipoElemento.DIAGONAL);
       }
      |VALOR_NODO;

VALOR_NODO : nodoid NODO_COMPLEMENTO{
              $$ = $1;              
              }
            |FUNCION
            |SELECT
            |EJE
            |arroba nodoid NODO_COMPLEMENTO;

NODO_COMPLEMENTO :cora EXPRESION corc    
                 |punto punto               
                 |;

SELECT : ddoble SELECT_ARGUMENTO
        |dsimple SELECT_ARGUMENTO;

SELECT_ARGUMENTO : arroba por
                  |por
                  |punto
                  |punto punto;

EJE: ancestor OR_SELF
       |attribute ddpuntos EJE_COMPLEMENTO
       |child ddpuntos EJE_COMPLEMENTO
       |descendant OR_SELF
       |following SIBLING
       |namespace ddpuntos EJE_COMPLEMENTO
       |parent ddpuntos EJE_COMPLEMENTO
       |preceding SIBLING 
       |self ddpuntos EJE_COMPLEMENTO;

OR_SELF : menos or menos self ddpuntos EJE_COMPLEMENTO
       | ddpuntos EJE_COMPLEMENTO;

SIBLING : menos sibling ddpuntos EJE_COMPLEMENTO
       | ddpuntos EJE_COMPLEMENTO;

EJE_COMPLEMENTO:  FUNCION
                | nodoid EJE_COMPLEMENTO_2
                | SELECT_ARGUMENTO;

EJE_COMPLEMENTO_2:cora EXPRESION corc
                |;

FUNCION : position parentesisa parentesisc
         |last parentesisa parentesisc
         |text parentesisa parentesisc
         |node parentesisa parentesisc;

EXPRESION : ARITMETICA
            |LOGICA
            |PRIMITIVO
            |FUNCION
            |XPATH
;

ARITMETICA : EXPRESION mas EXPRESION
            |EXPRESION menos EXPRESION
            |EXPRESION por EXPRESION
            |EXPRESION div EXPRESION
            |EXPRESION mod EXPRESION
            |parentesisa EXPRESION parentesisc;
            
PRIMITIVO :  entero
             |decimal
             |nodoid
             |punto
             |STRING
             |arroba nodoid
             |por;

LOGICA : EXPRESION menor  EXPRESION
        |EXPRESION mayor  EXPRESION
        |EXPRESION igual EXPRESION
        |EXPRESION menorigual EXPRESION
        |EXPRESION mayorigual EXPRESION
        |EXPRESION or EXPRESION
        |EXPRESION and 
        |EXPRESION igual EXPRESION
        |EXPRESION noigual EXPRESION