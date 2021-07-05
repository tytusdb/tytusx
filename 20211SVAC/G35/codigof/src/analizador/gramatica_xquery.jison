/* Definición Léxica */
%lex

%options case-insensitive

%%
\s+											                // espacios en blanco

//PALABRAS RESERVADAS 
"."+ return 'aaa';
'ancestor-or-self' return 'rAncestorOrSelf';
'ancestor' return 'rAncestor';
'attribute' return 'rAttribute';
'child' return 'rChild';
'descendant-or-self' return 'rDescendantOrSelf';
'descendant' return 'rDescendant';
'following-sibling' return 'rFollowingSibling';
'following' return 'rFollowing';
'namespace' return 'rNamespace';
'parent' return 'rParent';
'preceding-sibling' return 'rPrecedingSibling';
'preceding' return 'rPreceding';
'self' return 'rSelf';
'text' return 'rText';
'node' return 'rNode';
'/' return '/';
'@' return '@';
'[' return '[';
']' return ']';
'*' return '*';
'(' return 'parentesisIzquierdo';
')' return 'parentesisDerecho';
':' return ':';
'div' return 'rDiv';
'mod' return 'mod';
'+' return '+';
'-' return '-';
'*' return '*';
'and' return 'rAnd';
'or' return 'rOr';
'<=' return 'menorIgualQue';
'>=' return 'mayorIgualQue';
'!=' return 'diferenteQue';
'<' return 'menorQue';
'>' return 'mayorQue';
'=' return '=';
'last' return 'rLast';
'position' return 'rPosition';
'|' return '|';
'$' return 'dolar';
'for' return 'rFor';
'in' return 'rIn';
'where' return 'rWhere';
'return' return 'rReturn';
'order' return 'rOrder';
'by' return 'rBy';
'ascending' return 'rAscending';
'descending' return 'rDescending';
'let' return 'rLet';
'to' return 'rTo';
';' return 'ptoComa';
',' return 'coma';
'?' return 'interrogacion';
'{' return 'llaveIzq';
'}' return 'llaveDer';
'if' return 'rIf';
'then' return 'rThen';
'else' return 'rElse';
'declare' return 'rDeclare';
'function' return 'rFunction';
'local' return 'rLocal';
'as' return 'rAs';
'true' return 'rTrue';
'false' return 'rFalse';
'decimal' return 'rDecimal';
'integer' return 'rInteger';
'boolean' return 'rBoolean';
'double' return 'rDouble';
'float' return 'rFloat';
'string' return 'rString';
'eq' return 'rEq';
'ne' return 'rNe';
'lt' return 'rLt';
'gt' return 'rGt';
'le' return 'rLe';
'ge' return 'rGe';
'string' return 'rString';
'number' return 'rNumber';
'substring' return 'rSubstring';
'upper-case' return 'rUpper';
'lower-case' return 'rLower'








([a-zñA-ZÑ_])[a-zñA-ZÑ0-9_]* return 'id';
[0-9]+"."[0-9]+\b  	return 'doble';
[0-9]+\b  	return 'entero';
\'[^\']*\'			{ yytext = yytext.substr(0,yyleng-0); return 'rStringComillaSimple'; }
\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'rStringComillaDoble'; }


//Fin del archivo
<<EOF>>				return 'EOF';

//Errores lexicos
.					{
  const er = new error_1.Error({ tipo: 'lexico', linea: `${yylineno + 1}`, descripcion: `El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` });
  errores_1.Errores.getInstance().push(er);
  }
/lex

//Imports
%{
  const { NodoAST } = require('../arbol/nodoAST');
  const error_1 = require("../arbol/error");
  const errores_1 = require("../arbol/errores");
  const regla_1 = require("../arbol/reglaGramatical");
  const reporte_1 = require("../arbol/reporteGramatical");
%}

/* Asociación de operadores y precedencia */
//%LEFT '/'
//%LEFT ':'
%left 'rOr'
%left 'rAnd'
%left '=' 'diferenteQue' 'rEq' 'rNe'
%left 'mayorQue' 'menorQue' 'mayorIgualQue' 'menorIgualQue' 'rLt' 'rLe' 'rGt' 'rGe'
%left '+' '-'
%left '*' 'rDiv' 'mod'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos'

%start INICIO

%%










//INICIO : CONSULTA EOF { return new NodoAST({label: 'INICIO', hijos: [$1], linea: yylineno}); }
INICIO : S EOF { return new NodoAST({label: 'INICIO', hijos: [$1], linea: yylineno}); }
; 

S: L_INS{ 
  var regla = new regla_1.reglaGramatical({ produccion: 'S → L_INS', regla:'crearNodoAST(\'RAIZ\',[n1],yyline)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'S', hijos: [$1], linea:yylineno});
};

/*-GRAMATICA-XPATH CONSULTAS--*/
CONSULTA: CONSULTA '|' INSTRUCCIONES { 
  var regla = new regla_1.reglaGramatical({ produccion: 'CONSULTA → CONSULTA \'|\' INSTRUCCIONES', regla:'crearNodoAST(\'L\',[n1,n2],yyline)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'L', hijos: [...$1.hijos, new NodoAST({label:'CONSULTA', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
  |INSTRUCCIONES { 
    var regla = new regla_1.reglaGramatical({ produccion: 'CONSULTA → INSTRUCCIONES', regla:'crearNodoAST(\'L\',[n1],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'L', hijos: [new NodoAST({label:'CONSULTA', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }
  ;

INSTRUCCIONES : INSTRUCCIONES '/' '/' INSTRUCCION { 
    var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES / / INSTRUCCION', regla:'crearNodoAST(\'DOBLE\',[n1,n4],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'DOBLE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
              |INSTRUCCIONES '/' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES / INSTRUCCION', regla:'crearNodoAST(\'SIMPLE\',[n1,n3],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'SIMPLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
              |INSTRUCCIONES ':' ':' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES \':\' \':\' INSTRUCCION', regla:'crearNodoAST(\'AXE\',[n1,n4],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'AXE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |INSTRUCCIONES INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES INSTRUCCION', regla:'crearNodoAST(\'RUTA\',[n1,n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'X', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }

              |'/' '/' INSTRUCCION {
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \'/\' \'/\' INSTRUCCION', regla:'crearNodoAST(\'DOBLE\',[n1,n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'DOBLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});
                }

              |'/' INSTRUCCION {
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \'/\' INSTRUCCION', regla:'crearNodoAST(\'SIMPLE\',[n1,n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'SIMPLE', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});}

              |':' ':' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \':\' \':\' INSTRUCCION', regla:'crearNodoAST(\'AXE\',[n1,n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'AXE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCION', regla:'crearNodoAST(\'X\',[n1],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'X', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }
              ;





INSTRUCCION:   id { 
  var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → id', regla:'retornar identificador' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'identificador', hijos:[$1], linea:yylineno})], linea: yylineno}); }

              | '@' id { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' id', regla:'crearNodoAST(\'ATRIBUTO\',[n1],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'atributo', hijos:[$2], linea:yylineno})], linea: yylineno}); }

              | '@' '*'{ 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' \'*\'', regla:'crearNodoAST(\'ANY\',[],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any_att', hijos:[], linea:yylineno})], linea: yylineno}); }

              | id '[' E ']'  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → id \'[\' E \']\'', regla:'crearNodoAST(\'PREDICADO\',[n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO', hijos:[$1,$3], linea:yylineno})], linea: yylineno}); }

              |'@' id '[' E ']'  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' id \'[\' E \']\'', regla:'crearNodoAST(\'PREDICADO\',[n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO_A', hijos:[$2,$4], linea:yylineno})], linea: yylineno}); }

              | '*' { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'*\'', regla:'crearNodoAST(\'FRAG\',[],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any', hijos:[], linea:yylineno})], linea: yylineno}); }

              | RESERVADAS_XPATH { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → RESERVADAS_XPATH', regla:'crearNodoAST(\'RESERVADA\',[n1],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'reservada', hijos:[$1], linea:yylineno})], linea: yylineno}); }

             // | id parentesisIzquierdo parentesisDerecho 
              | aaa { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → punto punto', regla:'crearNodoAST(\'PUNTOS\',[n1],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'puntos', hijos:[$1], linea:yylineno})], linea: yylineno}); }

              |rText parentesisIzquierdo parentesisDerecho { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → rText parentesisIzquierdo parentesisDerecho', regla:'crearNodoAST(\'TEXTO\',[n1],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'text', hijos:[], linea:yylineno})], linea: yylineno}); }
              ;



RESERVADAS_XPATH: rAncestor
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAncestor', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
| rAncestorOrSelf
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAncestorOrSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rAttribute
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAttribute', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rChild
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rChild', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rDescendant
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rDescendant', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rDescendantOrSelf
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rDescendantOrSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rFollowing
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rFollowing', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rFollowingSibling
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rFollowingSibling', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rNamespace
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rNamespace', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rParent
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rParent', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rPreceding
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rPreceding', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rPrecedingSibling
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rPrecedingSibling', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
|rSelf 
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
}
;



  E: E '+' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'+\' E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '+', hijos: [$1,$3], linea: yylineno}); }

  |E '-' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'-\' E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '-', hijos: [$1,$3], linea: yylineno}); }

  |E '*' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'*\' E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '*', hijos: [$1,$3], linea: yylineno}); }

  |E rDiv E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rDiv E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'div', hijos: [$1,$3], linea: yylineno}); }

  |'-' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → \'-\'E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'negativo', hijos: [$2], linea: yylineno}); }

  |parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → parentesisIzquierdo E parentesisDerecho', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'E', hijos: [$2], linea: yylineno}); }

  |E rAnd E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rAnd E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'and', hijos: [$1,$3], linea: yylineno}); }

  |E rOr E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rOr E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'or', hijos: [$1,$3], linea: yylineno}); }

  |E mod E {
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mod E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
     $$ = new NodoAST({label: 'mod', hijos: [$1,$3], linea: yylineno}); }

  |E menorIgualQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E menorIgualQue E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '<=', hijos: [$1,$3], linea: yylineno}); }

  |E mayorIgualQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mayorIgualQue E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '>=', hijos: [$1,$3], linea: yylineno}); }

  |E menorQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E menorQue E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '<', hijos: [$1,$3], linea: yylineno}); }

  |E mayorQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mayorQue E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '>', hijos: [$1,$3], linea: yylineno}); }

  |E '=' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'=\' E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '=', hijos: [$1,$3], linea: yylineno}); }

  |E diferenteQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E diferenteQue E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '!=', hijos: [$1,$3], linea: yylineno}); }

  |E rEq E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rEq E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '=', hijos: [$1,$3], linea: yylineno}); }

  |E rNe E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rNe E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '!=', hijos: [$1,$3], linea: yylineno}); }

  |E rLt E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rLt E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '<', hijos: [$1,$3], linea: yylineno}); }

  |E rLe E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rLe E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '<=', hijos: [$1,$3], linea: yylineno}); }

  |E rGt E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rGt E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '>', hijos: [$1,$3], linea: yylineno}); }

  |E rGe E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rGe E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: '>=', hijos: [$1,$3], linea: yylineno}); }

  |parentesisIzquierdo E rTo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rTo E', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'DECLARA_ARREGLO', hijos: [$2,$4], linea: yylineno}); }
  
  |dolar id '[' E '] '{ 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ ID', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'ACCESO_ARREGLO', hijos: [$2,$4], linea: yylineno}); }

  |rString parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ STRING', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'TO_STRING', hijos: [$3], linea: yylineno}); }

  |rUpper parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ UPPER', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'UPPER', hijos: [$3], linea: yylineno}); }

  |rLower parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ LOWER', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'LOWER', hijos: [$3], linea: yylineno}); }

  |rNumber parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ NUMBER', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'TO_NUMBER', hijos: [$3], linea: yylineno}); }

  |rSubstring parentesisIzquierdo E coma E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ SUBSTRING', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'SUBSTRING1', hijos: [$3,$5], linea: yylineno}); }

  |rSubstring parentesisIzquierdo E coma E coma E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → $ SUBSTRING', regla:'resolverExpresion(n2)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'SUBSTRING2', hijos: [$3,$5,$7], linea: yylineno}); }

  |VALOR_INI { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → VALOR_INI', regla:'retornar VALOR' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
    $$ = new NodoAST({label: 'VAL', hijos: [...$1.hijos], linea: yylineno}); }

  ; 

VALOR_INI :   VALOR_INI '/' '/' VALOR { 
  var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \'/\' \'/\' VALOR', regla:'crearNodoAST(\'RUTA\',[n1,n4],yyline)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'DOBLE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI '/' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \'/\' VALOR', regla:'crearNodoAST(\'RUTA\',[n1,n3],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'SIMPLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI ':' ':' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \':\' \':\' VALOR', regla:'crearNodoAST(\'RUTA\',[n1,n4],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'AXE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI VALOR', regla:'crearNodoAST(\'RUTA\',[n1,n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'X', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }

              |'/' '/' VALOR {
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \'/\' \'/\' VALOR', regla:'crearNodoAST(\'RUTA\',[n3],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'DOBLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});}

              |'/' VALOR {
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \'/\' VALOR', regla:'crearNodoAST(\'RUTA\',[n2],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'SIMPLE', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});}

              |':' ':' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \':\' \':\' VALOR', regla:'crearNodoAST(\'RUTA\',[$3],yyline)' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'AXE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR', regla:'retornar VALOR' });
                reporte_1.ReporteGramatical.getInstance().push3(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'X', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }

              ;

VALOR: rLast parentesisIzquierdo parentesisDerecho { 
  var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rLast parentesisIzquierdo parentesisDerecho', regla:'retornar \'last\'' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'last', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rPosition parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rPosition parentesisIzquierdo parentesisDerecho', regla:'crearNodoAST(\'position\',[],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'position', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rText parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rText parentesisIzquierdo parentesisDerecho', regla:'crearNodoAST(\'text\',[],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'text', hijos:[], linea:yylineno})], linea: yylineno}); }

       |rNode parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rNode parentesisIzquierdo parentesisDerecho', regla:'crearNodoAST(\'node\',[],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
         $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'node', hijos:[], linea:yylineno})], linea: yylineno}); }

      |id { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → id', regla:'retornar \'id\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'identificador', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |entero { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → entero', regla:'retornar \'entero\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'entero', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |doble { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → doble', regla:'retornar \'doble\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'doble', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |dolar id { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → doble', regla:'retornar \'dolar id\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'identificador2', hijos:[$2], linea:yylineno})], linea: yylineno}); }

      |rTrue { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → doble', regla:'retornar \'true\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'booleano', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |rFalse { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → doble', regla:'retornar \'false\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'booleano', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |'@' '*' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' \'*\'', regla:'crearNodoAST(\'FRAG\', [], yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any_att', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rStringComillaSimple { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rStringComillaSimple', regla:'retornar \'string_1\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'string_s', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |rStringComillaDoble { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rStringComillaDoble', regla:'retornar \'string_2\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'string_d', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      | '@' id { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' id', regla:'retornar \'ID2\'' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'atributo', hijos:[$2], linea:yylineno})], linea: yylineno}); }

      |aaa { 
        
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → punto', regla:'crearNodoAST(\'puntos\',[],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'puntos', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      | id '[' E ']' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → id \'[\' E \']\'', regla:'crearNodoAST(\'ID\',[n3],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO', hijos:[$3], linea:yylineno})], linea: yylineno}); }

      |'@' id '[' E ']' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' id \'[\' E \']\'', regla:'crearNodoAST(\'ID\',[n4],yyline)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO_A', hijos:[$4], linea:yylineno})], linea: yylineno}); }

       |LLAMADA_FUNCION {
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → LLAMADA_FUNCION', regla:'llamadaFuncion(n1,entorno)' });
        reporte_1.ReporteGramatical.getInstance().push3(regla); 
        //$$ = $1; 
        $$=new NodoAST({label: 'FRAG', hijos: [$1], linea: yylineno});
        }
    
;

LLAMADA_FUNCION:
rLocal ':' id PARAMETROS2{
  var regla = new regla_1.reglaGramatical({ produccion: 'LLAMADA_FUNCION → rLocal \':\' id PARAMETROS2', regla:'crearNodoAST(\'LLAMADAF\',[n1,n3,n4],yyline)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
$$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$3,$4], linea:yylineno});
};

PARAMETROS2:
parentesisIzquierdo parentesisDerecho{
    var regla = new regla_1.reglaGramatical({ produccion: 'PARAMETROS2 → ( )', regla:'sin parametros' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
$$ = new NodoAST({label: 'SIN_PARAMETROS', hijos: [], linea:yylineno});
}
|parentesisIzquierdo L_PARAMETROS2 parentesisDerecho{
    var regla = new regla_1.reglaGramatical({ produccion: 'PARAMETROS2 → ( L_P )', regla:'crearNodoAST(\'L_P\',[n2],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
$$ = $2;
};

L_PARAMETROS2:
L_PARAMETROS2 coma E{
    var regla = new regla_1.reglaGramatical({ produccion: 'L_PARAMETROS2 → L_PARAMETROS2 , E', regla:'crearNodoAST(\'L_P\',[n1,n2],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  $1.hijos.push($3);
  $$=$1;
}
|E{
    var regla = new regla_1.reglaGramatical({ produccion: 'L_PARAMETROS2 → E', regla:'crearNodoAST(\'L_P\',[n1],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'L_PARAMETROS', hijos: [$1], linea:yylineno});
};

BLOQUE:
llaveIzq L_INS llaveDer{
  var regla = new regla_1.reglaGramatical({ produccion: 'BLOQUE → ( L_INS  )', regla:'crearNodoAST(\'BLOQUE\',[n2],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'BLOQUE', hijos: [$2], linea:yylineno});
}
| llaveIzq llaveDer{
    var regla = new regla_1.reglaGramatical({ produccion: 'BLOQUE → ( )', regla:'sin parametros' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  
  $$ = new NodoAST({label: 'BLOQUE', hijos: [], linea:yylineno});
}
;

L_INS: L_INS INS 
{
      var regla = new regla_1.reglaGramatical({ produccion: 'L_INS → L_INS INS', regla:'crearNodoAST(\'L INS\',[n1,n2],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);

  $1.hijos.push($2);
  $$=$1;
}
| INS
{ 
      var regla = new regla_1.reglaGramatical({ produccion: 'L_INS → INS', regla:'crearNodoAST(\'L INS\',[n1],yyline)' });
    reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'L_INS', hijos: [$1], linea:yylineno}); }
;

INS: 
IMPRIMIR {$$ = $1; }
| INS_IF { $$=$1;}
| DECLARACION { $$=$1;}
| REASIGNACION { $$=$1;}
| DECLARA_FUNCION { $$=$1;}
| INS_FOR {$$=$1;}
| RETORNO {$$=$1;}
;

IMPRIMIR:
llaveIzq L_EXP llaveDer{
      var regla = new regla_1.reglaGramatical({ produccion: 'INS → SALIDA', regla:'ejecutarSalida(n1)' });
      reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'SALIDA', hijos: [$2], linea:yylineno});
};

L_EXP:
L_EXP coma E{
  $1.hijos.push($3);
  $$=$1;
}
|E{
  $$ = new NodoAST({label: 'L_EXP', hijos: [$1], linea:yylineno});
}
;

DECLARACION:
rLet dolar id ':' '=' E{
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → DECLARACION', regla:'ejecutarDeclaracion(n3,n6)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'DECLARACION', hijos: [$3,$6], linea:yylineno}); 
}
;

DECLARA_FUNCION:
rDeclare rFunction PREFIJO ':' id PARAMETROS rAs id ':' TIPO BLOQUE ptoComa{
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → DECLARACION_FUNCION', regla:'declararFuncion(n5,n6,n8,n10)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);


  $$ = new NodoAST({label: 'DECLARAR_FUNCION', hijos: [
    new NodoAST({label: 'PREFIJO', hijos: [$3], linea:yylineno}),
    $5,
    $6,
    new NodoAST({label: 'AS_', hijos: [$8], linea:yylineno}),
    new NodoAST({label: 'TIPO', hijos: [$10], linea:yylineno}),
    $11
  ], linea:yylineno});
}
;

PREFIJO:
rLocal{$$=$1;}
;

PARAMETROS:
parentesisIzquierdo parentesisDerecho{
  $$ = new NodoAST({label: 'SIN_PARAMETROS', hijos: [], linea:yylineno});
}
|parentesisIzquierdo L_PARAMETROS parentesisDerecho{
  $$ = $2;
}
;

L_PARAMETROS:
L_PARAMETROS coma DECLARACION2{
  $1.hijos.push($3);
  $$=$1;
}
|DECLARACION2{
  $$ = new NodoAST({label: 'L_PARAMETROS', hijos: [$1], linea:yylineno});
};

DECLARACION2:
dolar id rAs id ':' TIPO{
  $$ = new NodoAST({label: 'DECLARACION2', hijos: [$2,$4,$6], linea:yylineno});
};

TIPO:
rDecimal{$$=$1}
|rInteger{$$=$1}
|rBoolean{$$=$1}
|rString{$$=$1}
|rDecimal interrogacion{$$=$1}
|rInteger interrogacion{$$=$1}
|rBoolean interrogacion{$$=$1}
|rString interrogacion{$$=$1}
;

INS_IF:
INS_IF2{
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → S_IF', regla:'ejecutarIf(n1)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);

  $$ = new NodoAST({label: 'S_IF', hijos: [$1], linea:yylineno});
};

INS_IF2: 
L_COND rElse BLOQUE2{
  $1.hijos.push(new NodoAST({label: 'ELSE', hijos: [$3], linea:yylineno}));
  $$=$1;
}
| L_COND{
  $$ = $1;
}
;

L_COND:
L_COND rElse rIf parentesisIzquierdo E parentesisDerecho rThen BLOQUE2{
    $1.hijos.push(new NodoAST({label: 'ELSE_IF', hijos: [$5,$8], linea:yylineno}));
    $$ = $1;
}
| rIf parentesisIzquierdo E parentesisDerecho rThen BLOQUE2{
  $$ = new NodoAST({label: 'L_CONDICIONES', hijos: [new NodoAST({label: 'IF', hijos: [$3,$6], linea:yylineno})], linea:yylineno});
}
;

BLOQUE2:
rReturn E{
  $$ = new NodoAST({label: 'RETURN', hijos: [$2], linea:yylineno});
}
| E{
  $$ = new NodoAST({label: 'RETURN', hijos: [$1], linea:yylineno});
}
;

RETORNO:
rReturn E{
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → RETORNO', regla:'ejecutarRetorno(n2)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'RETURN', hijos: [$2], linea:yylineno});
}
;

REASIGNACION:
coma dolar id ':' '=' E{
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → , REASGINACION', regla:'ejecutarReasignacion(n2,n4)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);
  $$ = new NodoAST({label: 'REASIGNACION', hijos: [$3,$6], linea:yylineno}); 
}
;

INS_FOR: rFor dolar id rIn E RETORNO_FOR {
  var regla = new regla_1.reglaGramatical({ produccion: 'INS → FOR', regla:'ejecutarFOR(n3,n4,n5)' });
  reporte_1.ReporteGramatical.getInstance().push3(regla);

  $$ = new NodoAST({label: 'FOR1', hijos: [
    new NodoAST({label:'Identificador', hijos:[$3], linea:yylineno}),
    new NodoAST({label:'In', hijos:[$5], linea:yylineno}),
    $6], linea: yylineno}); }
}
|rFor dolar id rIn E rWhere E RETORNO_FOR {

  $$ = new NodoAST({label: 'FOR2', hijos: [
    new NodoAST({label:'Identificador', hijos:[$3], linea:yylineno}),
    new NodoAST({label:'In', hijos:[$5], linea:yylineno}),
    new NodoAST({label:'Where', hijos:[$7], linea:yylineno}),
    $8], linea: yylineno}); }
}
|rFor dolar id rIn E ORDER_BY RETORNO_FOR {

  $$ = new NodoAST({label: 'FOR3', hijos: [
    new NodoAST({label:'Identificador', hijos:[$3], linea:yylineno}),
    new NodoAST({label:'In', hijos:[$5], linea:yylineno}),
    $6,$7], linea: yylineno}); }
}
|rFor dolar id rIn E rWhere E ORDER_BY RETORNO_FOR {
  $$ = new NodoAST({label: 'FOR4', hijos: [
    new NodoAST({label:'Identificador', hijos:[$3], linea:yylineno}),
    new NodoAST({label:'In', hijos:[$5], linea:yylineno}),
    new NodoAST({label:'Where', hijos:[$7], linea:yylineno}),
    $8,$9], linea: yylineno}); }
}
;

ORDER_BY:
rOrder rBy E{
  $$ =new NodoAST({label:'Order', hijos:[$3,new NodoAST({label:'ASC', hijos:[], linea:yylineno})], linea:yylineno});
}
|rOrder rBy E rAscending{
  $$ =new NodoAST({label:'Order', hijos:[$3,new NodoAST({label:'ASC', hijos:[], linea:yylineno})], linea:yylineno});
}
|rOrder rBy E rDescending{
  $$ =new NodoAST({label:'Order', hijos:[$3,new NodoAST({label:'DESC', hijos:[], linea:yylineno})], linea:yylineno});
}
;


RETORNO_FOR:
rReturn E{
  $$ = new NodoAST({label: 'RETURN', hijos: [$2], linea: yylineno}); }
}
| rReturn IF_FOR
{ $$=$2;}
;

IF_FOR:
INS_IF2{
  $$ = new NodoAST({label: 'RETURN_IF', hijos: [$1], linea: yylineno}); }
};


/*---------------*/

