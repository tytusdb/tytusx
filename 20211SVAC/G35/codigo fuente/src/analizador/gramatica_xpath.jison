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







([a-zñA-ZÑ_])[a-zñA-ZÑ0-9_]* return 'id';
[0-9]+\b  	return 'entero';
[0-9]+("."[0-9]+)?\b  	return 'doble';
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
%left '=' 'diferenteQue'
%left 'mayorQue' 'menorQue' 'mayorIgualQue' 'menorIgualQue'
%left '+' '-'
%left '*' 'rDiv' 'mod'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos'

%start INICIO

%%










INICIO : S EOF { return new NodoAST({label: 'INICIO', hijos: [$1], linea: yylineno}); }
; 

S: S '|' INSTRUCCIONES { 
  var regla = new regla_1.reglaGramatical({ produccion: 'S → S \'|\' INSTRUCCIONES EOF', regla:'$$ = new NodoAST({label: \'L\', hijos: [...$1.hijos, new NodoAST({label:\'CONSULTA\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
  $$ = new NodoAST({label: 'L', hijos: [...$1.hijos, new NodoAST({label:'CONSULTA', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
  |INSTRUCCIONES { 
    var regla = new regla_1.reglaGramatical({ produccion: 'S → INSTRUCCIONES', regla:'$$ = new NodoAST({label: \'L\', hijos: [new NodoAST({label:\'CONSULTA\', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'L', hijos: [new NodoAST({label:'CONSULTA', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }
  ;

INSTRUCCIONES : INSTRUCCIONES '/' '/' INSTRUCCION { 
    var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES / / INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'DOBLE\', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
  $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'DOBLE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
              |INSTRUCCIONES '/' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES / INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'SIMPLE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'SIMPLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
              |INSTRUCCIONES ':' ':' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES \':\' \':\' INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'AXE\', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'AXE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |INSTRUCCIONES INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'X\', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'X', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }

              |'/' '/' INSTRUCCION {
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \'/\' \'/\' INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'DOBLE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'DOBLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});
                }

              |'/' INSTRUCCION {
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \'/\' INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'SIMPLE\', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'SIMPLE', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});}

              |':' ':' INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → \':\' \':\' INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'AXE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'AXE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |INSTRUCCION { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCION', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'X\', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'X', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }
              ;



INSTRUCCION:   id { 
  var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → id', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'identificador\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
  $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'identificador', hijos:[$1], linea:yylineno})], linea: yylineno}); }

              | '@' id { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' id', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'atributo\', hijos:[$2], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'atributo', hijos:[$2], linea:yylineno})], linea: yylineno}); }

              | '@' '*'{ 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' \'*\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'any_att\', hijos:[], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any_att', hijos:[], linea:yylineno})], linea: yylineno}); }

              | id '[' E ']'  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → id \'[\' E \']\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'PREDICADO\', hijos:[$1,$3], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO', hijos:[$1,$3], linea:yylineno})], linea: yylineno}); }

              |'@' id '[' E ']'  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'@\' id \'[\' E \']\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'PREDICADO_A\', hijos:[$2,$4], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO_A', hijos:[$2,$4], linea:yylineno})], linea: yylineno}); }

              | '*' { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → \'*\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'any\', hijos:[], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any', hijos:[], linea:yylineno})], linea: yylineno}); }

              | RESERVADAS_XPATH { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → RESERVADAS_XPATH', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'reservada\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'reservada', hijos:[$1], linea:yylineno})], linea: yylineno}); }

             // | id parentesisIzquierdo parentesisDerecho 
              | aaa { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → punto punto', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'doble_punto\', hijos:[], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'puntos', hijos:[$1], linea:yylineno})], linea: yylineno}); }

              |rText parentesisIzquierdo parentesisDerecho { 
                var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → rText parentesisIzquierdo parentesisDerecho', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'text\', hijos:[], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'text', hijos:[], linea:yylineno})], linea: yylineno}); }
              ;

RESERVADAS_XPATH: rAncestor
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAncestor', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
| rAncestorOrSelf
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAncestorOrSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rAttribute
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rAttribute', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rChild
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rChild', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rDescendant
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rDescendant', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rDescendantOrSelf
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rDescendantOrSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rFollowing
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rFollowing', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rFollowingSibling
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rFollowingSibling', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rNamespace
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rNamespace', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rParent
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rParent', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rPreceding
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rPreceding', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rPrecedingSibling
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rPrecedingSibling', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
|rSelf 
{
  var regla = new regla_1.reglaGramatical({ produccion: 'RESERVADAS_XPATH → rSelf', regla:' ' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
}
;



  E: E '+' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'+\' E', regla:'$$ = new NodoAST({label: \'+\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '+', hijos: [$1,$3], linea: yylineno}); }

  |E '-' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'-\' E', regla:'$$ = new NodoAST({label: \'-\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '-', hijos: [$1,$3], linea: yylineno}); }

  |E '*' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'*\' E', regla:'$$ = new NodoAST({label: \'*\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '*', hijos: [$1,$3], linea: yylineno}); }

  |E rDiv E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rDiv E', regla:'$$ = new NodoAST({label: \'div\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'div', hijos: [$1,$3], linea: yylineno}); }

  |'-' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → \'-\'E', regla:'$$ = new NodoAST({label: \'negativo\', hijos: [$2], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'negativo', hijos: [$2], linea: yylineno}); }

  |parentesisIzquierdo E parentesisDerecho { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → parentesisIzquierdo E parentesisDerecho', regla:'$$ = new NodoAST({label: \'E\', hijos: [$2], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'E', hijos: [$2], linea: yylineno}); }

  |E rAnd E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rAnd E', regla:'$$ = new NodoAST({label: \'and\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'and', hijos: [$1,$3], linea: yylineno}); }

  |E rOr E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E rOr E', regla:'$$ = new NodoAST({label: \'or\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'or', hijos: [$1,$3], linea: yylineno}); }

  |E mod E {
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mod E', regla:'$$ = new NodoAST({label: \'mod\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
     $$ = new NodoAST({label: 'mod', hijos: [$1,$3], linea: yylineno}); }

  |E menorIgualQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E menorIgualQue E', regla:'$$ = new NodoAST({label: \'<=\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '<=', hijos: [$1,$3], linea: yylineno}); }

  |E mayorIgualQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mayorIgualQue E', regla:'$$ = new NodoAST({label: \'>=\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '>=', hijos: [$1,$3], linea: yylineno}); }

  |E menorQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E menorQue E', regla:'$$ = new NodoAST({label: \'<\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '<', hijos: [$1,$3], linea: yylineno}); }

  |E mayorQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E mayorQue E', regla:'$$ = new NodoAST({label: \'>\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '>', hijos: [$1,$3], linea: yylineno}); }

  |E '=' E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E \'=\' E', regla:'$$ = new NodoAST({label: \'=\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '=', hijos: [$1,$3], linea: yylineno}); }

  |E diferenteQue E { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → E diferenteQue E', regla:'$$ = new NodoAST({label: \'!=\', hijos: [$1,$3], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: '!=', hijos: [$1,$3], linea: yylineno}); }

  |VALOR_INI { 
    var regla = new regla_1.reglaGramatical({ produccion: 'E → VALOR_INI', regla:'$$ = new NodoAST({label: \'VAL\', hijos: [...$1.hijos], linea: yylineno});' });
    reporte_1.ReporteGramatical.getInstance().push2(regla);
    $$ = new NodoAST({label: 'VAL', hijos: [...$1.hijos], linea: yylineno}); }
  ; 

VALOR_INI :   VALOR_INI '/' '/' VALOR { 
  var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \'/\' \'/\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'DOBLE\', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
  $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'DOBLE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI '/' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \'/\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'SIMPLE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'SIMPLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI ':' ':' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI \':\' \':\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'AXE\', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'AXE', hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR_INI VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR_INI VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [...$1.hijos, new NodoAST({label:\'X\', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [...$1.hijos, new NodoAST({label:'X', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }

              |'/' '/' VALOR {
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \'/\' \'/\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'DOBLE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'DOBLE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});}

              |'/' VALOR {
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \'/\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'SIMPLE\', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'SIMPLE', hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});}

              |':' ':' VALOR { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → \':\' \':\' VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'AXE\', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'AXE', hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }

              |VALOR  { 
                var regla = new regla_1.reglaGramatical({ produccion: 'VALOR_INI → VALOR', regla:'$$ = new NodoAST({label: \'RUTA\', hijos: [new NodoAST({label:\'X\', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno});' });
                reporte_1.ReporteGramatical.getInstance().push2(regla);
                $$ = new NodoAST({label: 'RUTA', hijos: [new NodoAST({label:'X', hijos:[...$1.hijos], linea:yylineno})], linea: yylineno}); }

              ;

VALOR: rLast parentesisIzquierdo parentesisDerecho { 
  var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rLast parentesisIzquierdo parentesisDerecho', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'last\', hijos:[], linea:yylineno})], linea: yylineno});' });
  reporte_1.ReporteGramatical.getInstance().push2(regla);
  $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'last', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rPosition parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rPosition parentesisIzquierdo parentesisDerecho', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'position\', hijos:[], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'position', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rText parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rText parentesisIzquierdo parentesisDerecho', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'text\', hijos:[], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'text', hijos:[], linea:yylineno})], linea: yylineno}); }

       |rNode parentesisIzquierdo parentesisDerecho { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rNode parentesisIzquierdo parentesisDerecho', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'node\', hijos:[], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
         $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'node', hijos:[], linea:yylineno})], linea: yylineno}); }

      |id { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → id', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'identificador\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'identificador', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |entero { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → entero', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'entero\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'entero', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |doble { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → doble', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'doble\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'doble', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |'@' '*' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' \'*\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'any_att\', hijos:[], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'any_att', hijos:[], linea:yylineno})], linea: yylineno}); }

      |rStringComillaSimple { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rStringComillaSimple', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'string_s\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'string_s', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      |rStringComillaDoble { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → rStringComillaDoble', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'string_d\', hijos:[$1], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'string_d', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      | '@' id { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' id', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'atributo\', hijos:[$2], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'atributo', hijos:[$2], linea:yylineno})], linea: yylineno}); }

      |aaa { 
        
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → punto', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'punto\', hijos:[], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'puntos', hijos:[$1], linea:yylineno})], linea: yylineno}); }

      | id '[' E ']' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → id \'[\' E \']\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'PREDICADO\', hijos:[$3], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO', hijos:[$3], linea:yylineno})], linea: yylineno}); }

      |'@' id '[' E ']' { 
        var regla = new regla_1.reglaGramatical({ produccion: 'VALOR → \'@\' id \'[\' E \']\'', regla:'$$ = new NodoAST({label: \'FRAG\', hijos: [new NodoAST({label:\'PREDICADO_A\', hijos:[$4], linea:yylineno})], linea: yylineno});' });
        reporte_1.ReporteGramatical.getInstance().push2(regla);
        $$ = new NodoAST({label: 'FRAG', hijos: [new NodoAST({label:'PREDICADO_A', hijos:[$4], linea:yylineno})], linea: yylineno}); }
    
;