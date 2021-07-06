  /* Definición Léxica */
%lex

%options case-sensitive

%%
//Palabras reservadas
'last' return 'last';
'position' return 'position';
'node()' return 'node';
'text()' return 'text';
'comment' return 'comment';

//Axes
'ancestor' return 'ancestor';
'attribute' return 'attribute';
'child' return 'child';
'descendant' return 'descendant';
'following' return 'following';
'namespace' return 'namespace';
'parent' return 'parent';
'preceding' return 'preceding';
'sibling' return 'sibling';
'self' return 'self';

//Signos
'|' return 'o';
'+' return 'mas';
'-' return 'menos';
'*' return 'mul';
'div' return 'div';
'=' return 'igual';
'!=' return 'diferencia';
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'<' return 'menor';
'>' return 'mayor';
'or' return 'or';
'and' return 'and';
'mod' return 'mod';

'[' return 'cor_izq';
"]" return 'cor_der';
'(' return 'par_izq';
')' return 'par_der';

//Expresiones regulares
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'double';
[0-9]+                              return 'integer';
\"[^\"]*\"                          return 'string';
\'[^\']*\'                          return 'string';
[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+            return 'id';

[.][.]                              return 'dos_pts';
["/"]["/"]["@"]["*"]                return 'diagonal_diagonal_arroba_ast';
["/"]["/"]["*"]                     return 'diagonal_diagonal_ast';
["/"]["/"]                          return 'doble_diagonal';
["/"]["."]["."]                     return 'diagonal_dos_pts';
["/"]["@"]["*"]                     return 'diagonal_arroba_ast';
["/"]["*"]                          return 'diagonal_ast';
"/"                                 return 'diagonal';
"."                                 return 'punto';
[":"][":"]                          return 'bi_pto';
["@"]["*"]                          return 'any_atributo';
"@"                                 return 'arroba';    

//error lexico
. {
  const er = new errorGram.Error({ tipo: 'léxico', linea: `${yylineno + 1}`, descripcion: `El lexema "${yytext}" en la columna: ${yylloc.first_column + 1} no es válido.` });
  tablaErrores.Errores.getInstance().push(er);
}

//Fin del archivo
<<EOF>>				return 'EOF';

/lex

//seccion de Imports
%{
    const { NodoAST }= require('../arbol/nodoAST');
    const errorGram = require("../arbol/error");
    const tablaErrores = require("../arbol/errores");
    
%}

//Definir precedencia
%left 'or'
%left 'and'
%left 'igual' 'diferencia'
%left 'mayor_igual' 'menor_igual' 'mayor' 'menor' 
%left 'mas' 'menos'
%left 'mul' 'div' 'mod'
%left 'umenos'
%left 'diagonal'
%left 'doble_diagonal'
%left 'cor_izq' 'cor_der'
%left 'dos_pts'
%left 'diagonal_dos_pts'

// Produccion Inicial
%start S

%%

//Gramatica 

S : INSTRUCCIONES EOF  
        {   return new NodoAST({label: 'S', hijos: [$1], linea: yylineno}); }
       | error {                                                                                                        
                tablaErrores.Errores.getInstance().push(new errorGram.Error({ tipo: 'Semántico', linea: `${yylineno + 1}`, descripcion: `No coinciden ${yytext}, se recupero del error con el simbolo /`}));
      }     
        ;

INSTRUCCIONES : INSTRUCCION INSTRUCCIONES 
        { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); } ;

INSTRUCCIONES: { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [], linea: yylineno}); } ;

INSTRUCCION : INSTRUCCION o RUTA FILTROS
                { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [...$1.hijos, $2, ...$3.hijos, ...$4.hijos], linea: yylineno}); }
            | RUTA FILTROS
                { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); }
            ; 

RUTA :    ATRIBUTO_DESCENDIENTES
               { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | DESCENDIENTES_NODO
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | DESCENDIENTE 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | PADRE
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | ATRIBUTO_NODO
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | HIJOS 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | RAIZ 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | NODO_ACTUAL
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | PADRE_NODO
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | ANY 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | id 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1], linea: yylineno}); }
            | EJES OPC_EJES 
                { $$ = new NodoAST({label: 'RUTA', hijos: [$1, ...$2.hijos], linea: yylineno}); }
            ; 

ATRIBUTO_DESCENDIENTES : diagonal_diagonal_arroba_ast OPC
                        { $$ = new NodoAST({label: 'ATRIBUTO_DESCENDIENTES', hijos: [$1, ...$2.hijos], linea: yylineno}); }
                        ;

DESCENDIENTES_NODO : diagonal_diagonal_ast OPC
                { $$ = new NodoAST({label: 'DESCENDIENTES_NODO', hijos: [$1, ...$2.hijos], linea: yylineno}); }
;

DESCENDIENTE : doble_diagonal OPC
                 { $$ = new NodoAST({label: 'DESCENDIENTES_NODO', hijos: [$1, ...$2.hijos], linea: yylineno}); }
;

PADRE : diagonal_dos_pts OPC
        { $$ = new NodoAST({label: 'PADRE', hijos: [$1, ...$2.hijos], linea: yylineno}); }
;

ATRIBUTO_NODO : diagonal_arroba_ast OPC
        { $$ = new NodoAST({label: 'ATRIBUTO_NODO', hijos: [$1, ...$2.hijos], linea: yylineno}); }
; 

HIJOS : diagonal_ast OPC
        { $$ = new NodoAST({label: 'HIJOS', hijos: [$1, ...$2.hijos], linea: yylineno}); }
; 

RAIZ : diagonal OPC
        { $$ = new NodoAST({label: 'RAIZ', hijos: [$1, ...$2.hijos], linea: yylineno}); }
; 

NODO_ACTUAL : punto
         { $$ = new NodoAST({label: 'NODO_ACTUAL', hijos: [$1], linea: yylineno}); }
; 

PADRE_NODO : dos_pts 
         { $$ = new NodoAST({label: 'PADRE_NODO', hijos: [$1], linea: yylineno}); }
;

ANY : mul 
                { $$ = new NodoAST({label: 'ANY', hijos: [$1], linea: yylineno}); }
; 

EJES : ancestor bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | ancestor menos or menos self bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | attribute bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | child bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | descendant bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | descendant menos or self bi_pto 
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | following bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | following menos sibling bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | namespace bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | parent bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | preceding bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | preceding menos sibling bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      | self bi_pto
                { $$ = new NodoAST({label: 'EJES', hijos: [$1, $2], linea: yylineno}); }
      ;

OPC_EJES : id
                 { $$ = new NodoAST({label: 'OPC_EJES', hijos: [$1], linea: yylineno}); }
         |  mul         
                { $$ = new NodoAST({label: 'OPC_EJES', hijos: [$1], linea: yylineno}); }
         |  NODO_FUNCION 
                { $$ = new NodoAST({label: 'OPC_EJES', hijos: [$1], linea: yylineno}); }
        ;

NODO_FUNCION : node 
                { $$ = new NodoAST({label: 'NODO_FUNCION', hijos: [$1], linea: yylineno}); }
         | text 
                { $$ = new NodoAST({label: 'NODO_FUNCION', hijos: [$1], linea: yylineno}); }
         ;

OPC:            { $$ = new NodoAST({label: 'OPC', hijos: [], linea: yylineno}); }
    | NODO_FUNCION
                { $$ = new NodoAST({label: 'OPC', hijos: [...$1.hijos], linea: yylineno}); }
    | PASOS
                { $$ = new NodoAST({label: 'OPC', hijos: [...$1.hijos], linea: yylineno}); }
    ; 

PASOS : ANY_ATRIBUTO
                { $$ = new NodoAST({label: 'PASOS', hijos: [...$1.hijos], linea: yylineno}); }
        | ATRIBUTO 
                { $$ = new NodoAST({label: 'PASOS', hijos: [...$1.hijos], linea: yylineno}); }
        ;

ANY_ATRIBUTO : any_atributo 
                { $$ = new NodoAST({label: 'ANY_ATRIBUTO', hijos: [$1], linea: yylineno}); }
; 

ATRIBUTO : arroba id
                { $$ = new NodoAST({label: 'ATRIBUTO', hijos: [$1, $2], linea: yylineno}); }
;

FILTROS : LISTA_PREDICADO 
          { $$ = new NodoAST({label: 'FILTROS', hijos: [...$1.hijos], linea: yylineno}); }        
        | error {                                                                                                        
                    tablaErrores.Errores.getInstance().push(new errorGram.Error({ tipo: 'Semántico', linea: `${yylineno + 1}`, descripcion: `No coinciden ${yytext}, se recupero del error con el simbolo [`}));
                }  
; 

LISTA_PREDICADO : PREDICADO LISTA_PREDICADO 
                { $$ = new NodoAST({label: 'LISTA_PREDICADO', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); } ;

LISTA_PREDICADO : { $$ = new NodoAST({label: 'LISTA_PREDICADO', hijos: [], linea: yylineno}); };

PREDICADO: cor_izq  EXPR  cor_der
                 { $$ = new NodoAST({label: 'PREDICADO', hijos: [$1, ...$2.hijos, $3], linea: yylineno}); } 
;

EXPR : ATRIBUTO_PREDICADO
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | ARITMETICAS
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | RELACIONALES
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | LOGICAS
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | ORDEN 
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | VALORES
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | EJES OPC_EJES
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1,...$2.hijos], linea: yylineno}); }
     | PATH
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | PREDICADO
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | NODO_FUNCION
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
     | par_izq EXPR par_der
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1,...$2.hijos,$3], linea: yylineno}); } 
     ;

PATH : EXPR doble_diagonal EXPR
                { $$ = new NodoAST({label: 'PATH', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
        | EXPR diagonal EXPR
                { $$ = new NodoAST({label: 'PATH', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
        | doble_diagonal OPC_PATH EXPR
                { $$ = new NodoAST({label: 'PATH', hijos: [$1,...$2.hijos,...$3.hijos], linea: yylineno}); }
        | diagonal OPC_PATH EXPR
                { $$ = new NodoAST({label: 'PATH', hijos: [$1,...$2.hijos,...$3.hijos], linea: yylineno}); }
        | EXPR diagonal_dos_pts 
                { $$ = new NodoAST({label: 'PATH', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
        | diagonal_dos_pts
                { $$ = new NodoAST({label: 'PATH', hijos: [$1], linea: yylineno}); }
    
        ;

OPC_PATH : id 
                { $$ = new NodoAST({label: 'OPC_PATH', hijos: [$1], linea: yylineno}); }
        | arroba id
                { $$ = new NodoAST({label: 'OPC_PATH', hijos: [$1,$2], linea: yylineno}); }
        ;

ORDEN : last par_izq par_der 
                { $$ = new NodoAST({label: 'ORDEN', hijos: [$1,$2,$3], linea: yylineno}); }
         | position par_izq par_der 
                { $$ = new NodoAST({label: 'ORDEN', hijos: [$1,$2,$3], linea: yylineno}); }
         ;

ARITMETICAS: EXPR mas EXPR
                { $$ = new NodoAST({label: 'ARITMETICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }    
            | EXPR menos EXPR
                { $$ = new NodoAST({label: 'ARITMETICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); } 
            | EXPR mul EXPR
                { $$ = new NodoAST({label: 'ARITMETICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); } 
            | EXPR div EXPR 
                { $$ = new NodoAST({label: 'ARITMETICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); } 
            | EXPR mod EXPR 
                { $$ = new NodoAST({label: 'ARITMETICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); } 
            ;

RELACIONALES: EXPR mayor EXPR
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            | EXPR menor EXPR
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            | EXPR mayor_igual EXPR
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            | EXPR menor_igual EXPR 
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            | EXPR igual EXPR
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            | EXPR diferencia EXPR 
                { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
            ;

LOGICAS : EXPR or EXPR
                { $$ = new NodoAST({label: 'LOGICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
         | EXPR and EXPR 
                { $$ = new NodoAST({label: 'LOGICAS', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
         ;

ATRIBUTO_PREDICADO : arroba OPC
                        { $$ = new NodoAST({label: 'ATRIBUTO_PREDICADO', hijos: [$1,...$2.hijos], linea: yylineno}); }
                   | any_atributo
                        { $$ = new NodoAST({label: 'ATRIBUTO_PREDICADO', hijos: [$1], linea: yylineno}); }
                   | arroba id
                        { $$ = new NodoAST({label: 'ATRIBUTO_PREDICADO', hijos: [$1,$2], linea: yylineno}); }
                   ;

VALORES : integer 
                 { $$ = new NodoAST({label: 'integer', hijos: [$1], linea: yylineno}); }
        | double
                { $$ = new NodoAST({label: 'double', hijos: [$1], linea: yylineno}); }
        | string 
                { $$ = new NodoAST({label: 'string', hijos: [$1], linea: yylineno}); }
        | id
                { $$ = new NodoAST({label: 'id', hijos: [$1], linea: yylineno}); }
        | punto
                { $$ = new NodoAST({label: 'punto', hijos: [$1], linea: yylineno}); }
        | dos_pts
                { $$ = new NodoAST({label: 'dos_pts', hijos: [$1], linea: yylineno}); }
        ; 