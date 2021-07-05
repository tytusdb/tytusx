%lex

%options case-insensitive

%%

\s+											                // espacios en blanco
"//".*										              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//Palabras reservadas
'double' return 'double';
'int'  return 'int';
'char' return 'char';
'double' return 'double';
'void' return 'void';
'return' return 'return';
'stack' return 'stack';
'heap' return 'heap';
'goto' return 'goto';
'printf' return 'printf';
'include' return 'include';
'if' return 'if';
'fmod' return 'fmod';

//Signos
';' return 'punto_coma';
'.' return 'punto';
',' return 'coma';
':' return 'dos_puntos';
'{' return 'llave_izq';
'}' return 'llave_der';
'(' return 'par_izq';
')' return 'par_der';
'[' return 'cor_izq';
']' return 'cor_der';
'+' return 'mas';
'-' return 'menos';
'*' return 'por';
'/' return 'div';
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'>' return 'mayor';
'<' return 'menor';
'==' return 'igual_que';
'=' return 'igual';
'!=' return 'dif_que';
'#' return 'numeral';

//Patrones (Expresiones regulares)
\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
[0-9]+("."[0-9]+)?\b  	return 'number';
([a-zA-Z])[a-zA-Z0-9_]* return 'id';

//Fin del archivo
<<EOF>>				return 'EOF';
//Errores lexicos
.             {/*Nada*/}
/lex

//Imports
%{
  const InstruccionSinOptimizacion = require('../Code/Optimizer/instruccion_sin_optimizacion').InstruccionSinOptimizacion;
  const Funcion = require('../Code/Optimizer/funcion').Funcion;
  const AsignacionDosDirecciones = require('../Code/Optimizer/asignacion_dos_direcciones').AsignacionDosDirecciones;
  const AsignacionTresDirecciones = require('../Code/Optimizer/asignacion_tres_direcciones').AsignacionTresDirecciones;
  const Goto = require('../Code/Optimizer/goto').Goto;
  const InstIf = require('../Code/Optimizer/inst_if').InstIf;
%}

%start S

%%

S
  : INICIO EOF { return $1; }
;

INICIO
  : ENCABEZADO FUNCIONES { $$ = $1.concat($2); }
;

ENCABEZADO
  : IMPORTS GLOBALES { $$ = $1.concat($2); }
;

IMPORTS
  : IMPORTS IMPORT { $1.push($2); $$ = $1; }
  | IMPORT { $$ = [$1]; }
;

IMPORT
  : numeral include menor id punto id mayor { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2} ${$3}${$4}${$5}${$6}${$7}\n`); }
;

GLOBALES
  : GLOBALES GLOBAL { $1.push($2); $$ = $1; }
  | GLOBAL { $$ = [$1]; }
;

GLOBAL
  : double heap cor_izq number cor_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1} ${$2}${$3}${$4}${$5}${$6}\n`); }
  | double stack cor_izq number cor_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1} ${$2}${$3}${$4}${$5}${$6}\n`); }
  | double LISTA_DECLARACIONES punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1} ${$2}${$3}\n`); }
;

LISTA_DECLARACIONES
  : LISTA_DECLARACIONES coma id { $$ = `${$1}${$2} ${$3}`; }
  | id { $$ = $1; }
;

FUNCIONES
  : FUNCIONES FUNCION { $1.push($2); $$ = $1; }
  | FUNCION { $$ = [$1]; }
;

FUNCION
  : void id par_izq par_der llave_izq INSTRUCCIONES llave_der { $$ = new Funcion(yylineno, null, $2, $6); }
;

INSTRUCCIONES
  : INSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1; }
  | INSTRUCCION { $$ = [$1]; }
;

INSTRUCCION
  : ASIGNACION { $$ = $1; }
  | ETIQUETA { $$ = $1; }
  | GOTO { $$ = $1; }
  | IF { $$ = $1; }
  | RETURN { $$ = $1; }
  | PRINTF { $$ = $1; }
  | LLAMADA_FUNCION { $$ = $1; }
;

ASIGNACION
  : id igual EXP punto_coma { $$ = new AsignacionDosDirecciones(yylineno, `${$1}${$2}${$3}${$4}\n`, $1, $3); }
  | id igual par_izq int par_der EXP punto_coma { $$ = new AsignacionDosDirecciones(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}\n`, $1, $6); }
  | id igual ACCESO punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}\n`); }
  | id igual EXP OP_ARITMETICO EXP punto_coma { $$ = new AsignacionTresDirecciones(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}\n`, $1, $3, $4, $5); }
  | id igual fmod par_izq EXP coma EXP par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}${$8}${$9}\n`); }
  | ACCESO igual EXP punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}\n`); }
;

ETIQUETA
  : id dos_puntos { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}\n`); }
;

GOTO
  : goto id punto_coma { $$ = new Goto(yylineno, `${$1} ${$2}${$3}\n`); }
;

IF
  : if par_izq EXP OP_RELACIONAL EXP par_der goto id punto_coma { $$ = new InstIf(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7} ${$8}${$9}\n`, $3, $4, $5); }
;

RETURN
  : return punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}\n`); }
;

PRINTF
  : printf par_izq string coma EXP par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}\n`); }
  | printf par_izq string coma par_izq int par_der EXP par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}${$8}${$9}${$10}\n`); }
  | printf par_izq string coma par_izq char par_der EXP par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}${$8}${$9}${$10}\n`); }
   | printf par_izq string coma par_izq double par_der EXP par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}${$6}${$7}${$8}${$9}${$10}\n`); }
  | printf par_izq string par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}${$5}\n`); }
;

LLAMADA_FUNCION
  : id par_izq par_der punto_coma { $$ = new InstruccionSinOptimizacion(yylineno, `${$1}${$2}${$3}${$4}\n`); }
;

OP_ARITMETICO
  : mas { $$ = $1; }
  | menos { $$ = $1; }
  | por { $$ = $1; }
  | div { $$ = $1; }
;

OP_RELACIONAL
  : menor { $$ = $1; }
  | mayor { $$ = $1; }
  | menor_igual { $$ = $1; }
  | mayor_igual { $$ = $1; }
  | igual_que { $$ = $1; }
  | dif_que { $$ = $1; }
;

EXP
  : id { $$ = $1; }
  | number { $$ = $1; }
  | menos number { $$ = `${$1}${$2}`; }
;

ACCESO
  : heap cor_izq par_izq int par_der EXP cor_der { $$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`; }
  | stack cor_izq par_izq int par_der EXP cor_der { $$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`; }
;
