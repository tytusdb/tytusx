/* Definición Léxica */
%lex

%options case-sensitive

BSL                         "\\".
%s                          comment
%%

"(:"                      this.begin('comment');
<comment>":)"              this.popState();
<comment>.                  /* skip commentario content*/

\s+                                         /* skip whitespace */

//Palabras reservadas
'for' return 'for';
'where' return 'where';
'order' return 'order';
'return' return 'return';
'if'  return  'if';
'in'  return 'in';
'by'  return 'by';
'let' return 'let';
'data' return 'data';
'then' return 'then';
'else' return 'else';
'eq' return 'eq';
'ne' return 'ne';
'lt' return 'lt';
'le' return 'le';
'gt' return 'gt';
'ge' return 'ge';
'to' return 'to';
'at' return 'at';
'let' return 'let';
'declare' return 'declare';
'as' return 'as';
'function' return 'function';
'true' return 'true';
'false' return 'false';
'number' return 'number';
/*'string' return 'tk_string';
'double' return 'tk_double';
'integer' return 'tk_integer';
'boolean' return 'tk_boolean';*/
'substring' return 'substring';
'upper' return 'upper';
'case' return 'case';
'lower' return 'lower';
'xs' return 'xs';


//Seleccion de Nodos
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
'=' return 'igual';
'!=' return 'diferencia';
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'<' return 'menor';
'>' return 'mayor';
'$' return 'dolar';
',' return 'coma';
';' return 'pto_coma';
'?' return 'interrogacion';

'[' return 'cor_izq';
"]" return 'cor_der';
'(' return 'par_izq';
')' return 'par_der';
'{' return 'llave_izq';
'}' return 'llave_der';

//Expresiones regulares
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'double';
[0-9]+                              return 'integer';
\"[^\"]*\"                          return 'string';
\'[^\']*\'                          return 'string';
["m"]["o"]["d"]                     return 'mod';
["d"]["i"]["v"]                     return 'div';
["a"]["n"]["d"]                     return 'and';
["o"]["r"]                          return 'or';
[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_]+            return 'id';

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
":"                                 return 'doble_pto';
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
%left 'eq' 'ne' 'lt' 'le' 'gt' 'ge'
%left 'mas' 'menos'
%left 'mul' 'div' 'mod'
%left 'umenos'
%left 'diagonal'
%left 'doble_diagonal'
%left 'cor_izq' 'cor_der'
%left 'dos_pts' 
%left 'diagonal_dos_pts' 'dolar' 'to'  'id' 'integer' 

// Produccion Inicial
%start XQUERY 
%%

//Gramatica 

XQUERY : INSTRUCCIONES EOF //PATH EXPRESSIONS Y PREDICATES
            { return new NodoAST({label: 'XQUERY', hijos: [$1], linea: yylineno}); }
        | FLWOR EOF
            { return new NodoAST({label: 'XQUERY', hijos: [...$1.hijos], linea: yylineno}); }
        ; 

FLWOR : FOR 
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1], linea: yylineno}); }  
        | L_LET
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1], linea: yylineno}); }
        | IF 
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1], linea: yylineno}); }
        | LLAMADA_FUNCION
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1], linea: yylineno}); }
        | FUNCIONES L_LET
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1,$2], linea: yylineno}); } 
        | FUNCIONES LLAMADA_FUNCION
            { $$ = new NodoAST({label: 'FLWOR', hijos: [$1,$2], linea: yylineno}); }
        ;  

FUNCIONES : FUNCIONES FUNCION { $$ = new NodoAST({label: 'FUNCION', hijos: [...$1.hijos,$2], linea: yylineno}); }
          | FUNCION { $$ = new NodoAST({label: 'FUNCION', hijos: [$1], linea: yylineno}); }; 

L_LET: L_LET LET { $$ = new NodoAST({label: 'LET', hijos: [...$1.hijos,$2], linea: yylineno}); }
     | LET { $$ = new NodoAST({label: 'LET', hijos: [$1], linea: yylineno});};

FOR : FOR_1 FOR_2 L_CONDICION RETURN 
        { $$ = new NodoAST({label: 'FOR', hijos: [...$1.hijos,...$2.hijos,...$3.hijos,$4], linea: yylineno}); }
    | FOR_1 FOR_2 RETURN IF
        { $$ = new NodoAST({label: 'FOR', hijos: [...$1.hijos,...$2.hijos,$3,$4], linea: yylineno}); }
    | FOR_1 FOR_2 RETURN  
        { $$ = new NodoAST({label: 'FOR', hijos: [...$1.hijos,...$2.hijos,$3], linea: yylineno}); }
    ;

FOR_1 : for dolar id  in 
            { $$ = new NodoAST({label: 'FOR_1', hijos: [($2+$3),$4], linea: yylineno}); }
       | for dolar id  at dolar id in 
            { $$ = new NodoAST({label: 'FOR_1', hijos: [($2+$3),$4,($5+$6),$7], linea: yylineno}); }
      ;

FOR_P : dolar id in par_izq L_PARAM par_der
            { $$ = new NodoAST({label: 'FOR_P', hijos: [($1+$2),...$5.hijos], linea: yylineno}); }
;

FOR_2 : { $$ = new NodoAST({label: 'FOR_2', hijos: [], linea: yylineno}); }
        | INSTRUCCIONES 
            { $$ = new NodoAST({label: 'FOR_2', hijos: [$1], linea: yylineno}); }
        | par_izq integer to integer par_der
            { $$ = new NodoAST({label: 'FOR', hijos: [$2,$3,$4], linea: yylineno}); }
        | par_izq L_PARAM par_der coma FOR_P
            { $$ = new NodoAST({label: 'FOR_2', hijos: [$2,$5], linea: yylineno}); }
        ;

L_CONDICION : L_CONDICION CONDICION 
                { $$ = new NodoAST({label: 'LCONDICION', hijos: [...$1.hijos,...$2.hijos], linea: yylineno}); }
            | CONDICION
                { $$ = new NodoAST({label: 'L_CONDICION', hijos: [...$1.hijos], linea: yylineno}); }
            ;

CONDICION: WHERE 
                { $$ = new NodoAST({label: 'WHERE', hijos: [$1], linea: yylineno}); }
         | ORDER 
                { $$ = new NodoAST({label: 'ORDER', hijos: [$1], linea: yylineno}); }
         ; 

WHERE : where dolar id diagonal EXPR  // diagonal EXPR (operaciones)
            { $$ = new NodoAST({label: 'WHERE', hijos: [($2+$3),$4,...$5.hijos], linea: yylineno}); }
        ; 

ORDER: order by L_VALOR   //diagonal EXPR (id)
            { $$ = new NodoAST({label: 'ORDER BY', hijos: [...$3.hijos], linea: yylineno}); }
       | order by dolar id   //order by $x
            { $$ = new NodoAST({label: 'ORDER BY', hijos: [($3+$4)], linea: yylineno}); }
       ;

RETURN : return L_VALOR 
            { $$ = new NodoAST({label: 'RETURN', hijos: [...$2.hijos], linea: yylineno}); }
        | return dolar id 
            { $$ = new NodoAST({label: 'RETURN', hijos: [($2+$3)], linea: yylineno}); }
        | return IF
            { $$ = new NodoAST({label: 'RETURN', hijos: [$2], linea: yylineno}); }
        ; 

L_VALOR : L_VALOR coma VALOR
            { $$ = new NodoAST({label: 'L_VALOR', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
        | VALOR 
            { $$ = new NodoAST({label: 'L_VALOR', hijos: [...$1.hijos], linea: yylineno}); }
        ; 

VALOR : dolar id diagonal id
            { $$ = new NodoAST({label: 'VALOR', hijos: [($1+$2),$3,$4], linea: yylineno}); }
        | dolar id diagonal arroba id
            { $$ = new NodoAST({label: 'VALOR', hijos: [($1+$2),$3,$4,$5], linea: yylineno}); }
        | par_izq EXPR par_der
            { $$ = new NodoAST({label: 'VALOR', hijos: [$2], linea: yylineno}); }
        ;

IF : if par_izq dolar id diagonal EXPR par_der THEN ELSE
    { $$ = new NodoAST({label: 'IF', hijos: [($3+$4),$5,...$6.hijos,$8,$9], linea: yylineno}); }
   | if par_izq dolar id diagonal EXPR par_der THEN ELSE_IF ELSE
    { $$ = new NodoAST({label: 'IF', hijos: [($3+$4),$5,...$6.hijos,$8,$9,$10], linea: yylineno}); }
   | if EXPR THEN ELSE
    { $$ = new NodoAST({label: 'IF', hijos: [...$2.hijos,$3,$4], linea: yylineno}); }
   | if EXPR THEN ELSE_IF ELSE
    { $$ = new NodoAST({label: 'IF', hijos: [...$2.hijos,$3,$4,$5], linea: yylineno}); }
;

ELSE_IF : else if EXPR THEN
        { $$ = new NodoAST({label: 'ELSE_IF', hijos: [...$3.hijos,$4], linea: yylineno}); }
;


THEN : then EXPR
        { $$ = new NodoAST({label: 'THEN', hijos: [...$2.hijos,], linea: yylineno}); }
; 

ELSE :  else EXPR 
        { $$ = new NodoAST({label: 'ELSE', hijos: [...$2.hijos], linea: yylineno}); }  
    ;

COMPARACION_XQUERY : EXPR eq EXPR
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR ne EXPR
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR lt EXPR 
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR le EXPR 
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR gt EXPR 
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR ge EXPR 
                        { $$ = new NodoAST({label: 'RELACIONALES', hijos: [...$1.hijos,$2,...$3.hijos], linea: yylineno}); }
                    | EXPR to EXPR 
                        { $$ = new NodoAST({label: 'to', hijos: [...$1.hijos,...$3.hijos], linea: yylineno}); }
                    ;

LLAMADA_FUNCION : id par_izq L_PARAM par_der 
                    { 
                        if ($1 == 'string'){
                              $$ = new NodoAST({label: 'F_STRING', hijos: [...$3.hijos], linea: yylineno}); 
                        }
                        else {
                            $$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$1,$3], linea: yylineno}); 
                        }   
                    }
                | number par_izq VALOR_LLAMADA par_der 
                    { $$ = new NodoAST({label: 'F_NUMBER', hijos: [...$3.hijos], linea: yylineno}); } 
                | substring par_izq VALOR_LLAMADA coma integer par_der
                    { $$ = new NodoAST({label: 'F_SUBSTRING', hijos: [$3,$5], linea: yylineno}); }
                | substring par_izq VALOR_LLAMADA coma integer coma integer par_der
                    { $$ = new NodoAST({label: 'F_SUBSTRING1', hijos: [$3,$5,$7], linea: yylineno}); }
                | lower menos case par_izq VALOR_LLAMADA par_der
                    { $$ = new NodoAST({label: 'F_LOWERCASE', hijos: [$5], linea: yylineno}); }
                | upper menos case par_izq VALOR_LLAMADA par_der
                    { $$ = new NodoAST({label: 'F_UPPERCASE', hijos: [$5], linea: yylineno}); }
                | id doble_pto id par_izq L_PARAM par_der  
                    { $$ = new NodoAST({label: 'F_LLAMADA', hijos: [$1,$3,$5], linea: yylineno}); }
                ; 

VALOR_LLAMADA : dolar id 
                     { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [($1+$2)], linea: yylineno}); }
                | integer 
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }
                | double
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }
                | string 
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }
                | true 
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }
                | false 
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }
                | INSTRUCCIONES
                    { $$ = new NodoAST({label: 'VALOR_LLAMADA', hijos: [$1], linea: yylineno}); }    
                ; 

L_PARAM : L_PARAM coma EXPR
            { $$ = new NodoAST({label: 'PARAMETROS', hijos: [...$1.hijos,...$3.hijos], linea: yylineno}); }  
        | EXPR
            { $$ = new NodoAST({label: 'PARAMETROS', hijos: [...$1.hijos], linea: yylineno}); }  
        ; 

LET :  let dolar id doble_pto igual EXPR RETURN
         { $$ = new NodoAST({label: 'LET', hijos: [($2+$3),$5,$6,$7], linea: yylineno}); } 
     | let dolar id doble_pto igual EXPR
         { $$ = new NodoAST({label: 'LET', hijos: [($2+$3),$5,$6], linea: yylineno}); } 
     | let dolar id  igual EXPR
        { $$ = new NodoAST({label: 'LET', hijos: [($2+$3),$4,$5], linea: yylineno}); } 
    ;

FUNCION : declare function id doble_pto id par_izq PARAMETROS par_der  as xs doble_pto TIPO llave_izq SENTENCIAS llave_der pto_coma 
         { $$ = new NodoAST({label: 'FUNCION', hijos: [$3,$5,$7,$12,$14], linea: yylineno}); } 
         | declare function id doble_pto id par_izq PARAMETROS par_der llave_izq SENTENCIAS llave_der pto_coma 
         { $$ = new NodoAST({label: 'FUNCION_SIN_TIPO', hijos: [$3,$5,$7,$10], linea: yylineno}); }
         | declare function id doble_pto id par_izq PARAMETROS par_der  as xs doble_pto TIPO interrogacion llave_izq SENTENCIAS llave_der pto_coma 
         { $$ = new NodoAST({label: 'FUNCION', hijos: [$3,$5,$7,$12,$15], linea: yylineno}); } 
;

SENTENCIAS : FLWOR { $$ = new NodoAST({label: 'FLWOR', hijos: [...$1.hijos], linea: yylineno}); }
            | L_LET IF { $$ = new NodoAST({label: 'FLWOR', hijos: [...$1.hijos,$2], linea: yylineno}); }
            | L_LET FOR { $$ = new NodoAST({label: 'FLWOR', hijos: [...$1.hijos,$2], linea: yylineno}); }
            | L_LET IF RETURN{ $$ = new NodoAST({label: 'FLWOR', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
            | L_LET FOR RETURN { $$ = new NodoAST({label: 'FLWOR', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }; 

PARAMETROS: PARAMETROS coma PARAM
            { $$ = new NodoAST({label: 'PARAMETROS', hijos: [...$1.hijos,...$3.hijos], linea: yylineno}); }
        | PARAM
            { $$ = new NodoAST({label: 'PARAMETROS', hijos: [...$1.hijos], linea: yylineno}); }   
        ;

PARAM : dolar id as xs doble_pto TIPO 
        { $$ = new NodoAST({label: 'PARAMETRO', hijos: [($1+$2),$4,...$6.hijos], linea: yylineno}); }   
        | dolar id as xs doble_pto TIPO interrogacion 
        { $$ = new NodoAST({label: 'PARAMETRO', hijos: [($1+$2),$4,...$6.hijos], linea: yylineno}); }    ;

TIPO : id
         {
             if ($1 == 'string'){
                 $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }  
             else if ($1 == 'boolean'){
                 $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }  
            else if ($1 == 'integer'){
                 $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }  
            else if ($1 == 'double'){
                 $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }  
            else if ($1 == 'decimal'){
                 $$ = new NodoAST({label: 'TIPO', hijos: ['integer'], linea: yylineno}); } 
            else{
                 tablaErrores.Errores.getInstance().push(new errorGram.Error({ tipo: 'Semántico', linea: `${yylineno + 1}`, descripcion: `No es un tipo valido "${$1}"  Columna: ${this._$.first_column + 1}.`}));
             }
        }; 

//XPATH 

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION 
                    { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); }
              | INSTRUCCION  
                    { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos], linea: yylineno}); }
              ;

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

FILTROS :    { $$ = new NodoAST({label: 'FILTROS', hijos: [], linea: yylineno}); } 
        | LISTA_PREDICADO 
              { $$ = new NodoAST({label: 'FILTROS', hijos: [...$1.hijos], linea: yylineno}); }    
; 

LISTA_PREDICADO : LISTA_PREDICADO PREDICADO
                     { $$ = new NodoAST({label: 'LISTA_PREDICADO', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); } 
                | PREDICADO
                     { $$ = new NodoAST({label: 'LISTA_PREDICADO', hijos: [...$1.hijos], linea: yylineno}); }
                ;

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
       { $$ = new NodoAST({label: 'EXPR', hijos: [...$2.hijos], linea: yylineno}); } 
     | COMPARACION_XQUERY
       { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
    | LLAMADA_FUNCION 
        { $$ = new NodoAST({label: 'EXPR', hijos: [$1], linea: yylineno}); }
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
        | diagonal OPC_PATH 
               { $$ = new NodoAST({label: 'PATH', hijos: [$1,...$2.hijos], linea: yylineno}); }
    
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
        | true
             { $$ = new NodoAST({label: 'boolean', hijos: [$1], linea: yylineno}); }
        | false
             { $$ = new NodoAST({label: 'boolean', hijos: [$1], linea: yylineno}); }
        | dolar INSTRUCCIONES
            { $$ = new NodoAST({label: 'xquery', hijos: [$1,...$2.hijos], linea: yylineno}); }
        ;