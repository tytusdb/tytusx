  /* Definición Léxica */
%lex

%options case-insensitive

%%

//[<][!][-][-][^-<]*[-][-][>] {}
\s+											                // espacios en blanco

"//".*{}

/*[>][^</]*[<][/] return 'string';*/
[>][^<]+[<]|[>][^<]+[<][/] return 'string1';
//Palabras reservadas
[xX][mM][Ll] return 'xml';
[vV][eE][Rr][Ss][Ii][Oo][Nn] return 'version';
[eE][Nn][Cc][oO][Dd][Ii][Nn][Gg] return 'encoding';

'>' return 'mayor';
'<' return 'menor';
'?' return 'interrogacion';
'=' return '=';
'/' return 'div';
'!' return 'admiracion';



'&lt;' return '<';
'&gt;' return '>';
/*'&quot;' return '"';*/


//Patrones (Expresiones regulares)
\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
\'[^\']*\'			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
\`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }


[0-9]+("."[0-9]+)?\b  	return 'number';
([a-zñA-ZÑ_])[a-zñA-ZÑ0-9_-]* return 'id';

[-][-][^-]*[-][-] return 'comentario';
[\s\r\n\t]                  {/* skip whitespace */}
//Fin del archivo
<<EOF>>				return 'EOF';
//Errores lexicos
.					{
  const er = new error_1.Error({ tipo: 'lexico', linea: `${yylineno + 1}`, descripcion: `XML> El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` });
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


%start S

%%

//Definición de la Grámatica

S
  :  INSTRUCCIONES  EOF { 
var regla = new regla_1.reglaGramatical({ produccion: 'S → INSTRUCCIONES EOF', regla:'crearNodoAST(\'RAIZ\',[n1],yyline)' });
reporte_1.ReporteGramatical.getInstance().push(regla);
    return new NodoAST({label: '/', hijos: [$1], linea: yylineno}); 
    }
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCIONES INSTRUCCION', regla:'crearNodoAST(\'L_INS\',[n2],yyline)' });
reporte_1.ReporteGramatical.getInstance().push(regla);  
  $$ = new NodoAST({label: 'OBJETOS', hijos: [...$1.hijos,$2], linea: yylineno});
  }
             | INSTRUCCION {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCIONES → INSTRUCCION', regla:'crearNodoAST(\'L_INS\',[n1],yyline)' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETOS', hijos: [$1], linea: yylineno});
               }
             ;


             /*           PARTE 1                     */
INSTRUCCION  : menor id ATRIBUTOS mayor INSTRUCCIONES menor div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION → menor id ATRIBUTOS mayor INSTRUCCIONES menor div id mayor', regla:'crearNodoAST(\'OBJETO\',[n2],yyline)' });
reporte_1.ReporteGramatical.getInstance().push(regla);
              if(!($2.toLowerCase() === $8.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@8.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | menor id ATRIBUTOS mayor INSTRUCCIONES  div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS mayor INSTRUCCIONES  div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | menor id ATRIBUTOS INSTRUCCIONES menor div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id ATRIBUTOS INSTRUCCIONES  div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS INSTRUCCIONES  div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}                            
             
             | menor id mayor INSTRUCCIONES menor div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id mayor INSTRUCCIONES div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor INSTRUCCIONES div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id INSTRUCCIONES menor div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id INSTRUCCIONES div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id INSTRUCCIONES div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             
             /*           PARTE 2                     */
             | menor id ATRIBUTOS mayor menor div id mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS mayor menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno}); }
}
             | menor id mayor menor div id mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno}); }
}
             /*           PARTE 3                     */
             | menor id ATRIBUTOS div mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS div mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);               
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});
               }
             | menor id div mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id div mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});
               }
             


             /*           PARTE 4                     */
             | id ATRIBUTOS mayor INSTRUCCIONES menor div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | id ATRIBUTOS mayor INSTRUCCIONES  div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor INSTRUCCIONES  div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | id ATRIBUTOS INSTRUCCIONES menor div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id ATRIBUTOS INSTRUCCIONES  div id mayor     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS INSTRUCCIONES  div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno}); }
}                            
             
             | id mayor INSTRUCCIONES menor div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id mayor INSTRUCCIONES div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor INSTRUCCIONES div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id INSTRUCCIONES menor div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id INSTRUCCIONES menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id INSTRUCCIONES div id mayor{
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id INSTRUCCIONES div id mayor', regla:'{$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
              if(!($1.toLowerCase() === $4.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@4.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }
}
             /*           PARTE 5                     */
             | id ATRIBUTOS mayor menor div id mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno}); }
}
             | id mayor menor div id mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor menor div id mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno}); }
}
             /*           PARTE 6                     */
             | id ATRIBUTOS div mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS div mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);               
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});
               }
             | id div mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id div mayor', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});
               }
             
             /*           PARTE 7                     */
             | menor id ATRIBUTOS mayor INSTRUCCIONES menor div id      {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS mayor INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | menor id ATRIBUTOS mayor INSTRUCCIONES  div id      {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS mayor INSTRUCCIONES  div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$5.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | menor id ATRIBUTOS INSTRUCCIONES menor div id     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id ATRIBUTOS INSTRUCCIONES  div id     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS INSTRUCCIONES  div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}                            
             
             | menor id mayor INSTRUCCIONES menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id mayor INSTRUCCIONES div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor INSTRUCCIONES div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$4.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id INSTRUCCIONES menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | menor id INSTRUCCIONES div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id INSTRUCCIONES div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             
             /*           PARTE 8                     */
             | menor id ATRIBUTOS mayor menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS mayor menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno}); }
}
             | menor id mayor menor div id  {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id mayor menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($2.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno}); }
}
             /*           PARTE 9                     */
             | menor id ATRIBUTOS div {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id ATRIBUTOS div', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[$3], linea:yylineno})], linea: yylineno});
               }
             | menor id div {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor id div', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$2, hijos:[], linea:yylineno})], linea: yylineno});
               }


             /*           PARTE 10                     */
             | id ATRIBUTOS mayor INSTRUCCIONES menor div id      {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $7.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@7.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | id ATRIBUTOS mayor INSTRUCCIONES  div id      {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor INSTRUCCIONES  div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$4.hijos], linea:yylineno})], linea: yylineno}); }
}              
             | id ATRIBUTOS INSTRUCCIONES menor div id     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id ATRIBUTOS INSTRUCCIONES  div id     {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS INSTRUCCIONES  div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2,...$3.hijos], linea:yylineno})], linea: yylineno}); }
}                            
             
             | id mayor INSTRUCCIONES menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id mayor INSTRUCCIONES div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor INSTRUCCIONES div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$3.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id INSTRUCCIONES menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id INSTRUCCIONES menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }
}
             | id INSTRUCCIONES div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id INSTRUCCIONES div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $4.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@4.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[...$2.hijos], linea:yylineno})], linea: yylineno}); }
}
             
             /*           PARTE 11                     */
             | id ATRIBUTOS mayor menor div id {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS mayor menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $6.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@6.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno}); }
}
             | id mayor menor div id  {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id mayor menor div id', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               if(!($1.toLowerCase() === $5.toLowerCase())){
                const ere = new error_1.Error({ tipo: 'semantico', linea: @1.first_line, descripcion: `XML> las etiquetas no son iguales, linea cierre etiqueta: `+@5.first_line });
                errores_1.Errores.getInstance().push(ere);
                $$ = new NodoAST({label: 'ERROR', hijos: [], linea: yylineno});
              }else{$$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno}); }
}
             /*           PARTE 12                    */
             | id ATRIBUTOS div {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id ATRIBUTOS div', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[$2], linea:yylineno})], linea: yylineno});
               }
             | id div {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  id div', regla:'$$ = new NodoAST({label: \'OBJETO\', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
               $$ = new NodoAST({label: 'OBJETO', hijos: [new NodoAST({label:$1, hijos:[], linea:yylineno})], linea: yylineno});
               }
             
             | menor interrogacion xml version '=' string encoding '=' string interrogacion {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor interrogacion xml version igual string encoding igual string interrogacion mayor', regla:'$$ = new NodoAST({label: \'COD\', hijos: [$9], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
              $9 = $9.slice(1, $9.length-1);
               
               $$ = new NodoAST({label: 'COD', hijos: [$9], linea: yylineno});
               }
             | menor interrogacion xml version '=' string encoding '=' string interrogacion mayor {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  menor interrogacion xml version igual string encoding igual string interrogacion mayor', regla:'$$ = new NodoAST({label: \'COD\', hijos: [$9], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
              $9 = $9.slice(1, $9.length-1);
               
               $$ = new NodoAST({label: 'COD', hijos: [$9], linea: yylineno});
               }
             
             | string1 {
var regla = new regla_1.reglaGramatical({ produccion: 'INSTRUCCION →  string', regla:'$$= new NodoAST({label:"TEXTO", hijos:[new NodoAST({label:"TEXTO", hijos:[$1], linea:yylineno})], linea:yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
              const rex=/[\ ]{2,}/g;
              const rex2=/[\n]{2,}/g;
              $1=$1.replaceAll(/[\t]+/g,"").replaceAll(rex, "").replaceAll(rex2,"");
              $1 = $1.replaceAll(">", "").replaceAll("<", "").replaceAll("</", "");
              if($1.length>=1){
                if ($1.replace(/[\n]/g, "")!="" && $1!="!" && $1.replace(/[\n]/g, "")!="><"){
                  $$= new NodoAST({label:"TEXTO", hijos:[new NodoAST({label:"TEXTO", hijos:[$1], linea:yylineno})], linea:yylineno});}
                }
                
}
             /*| menor admiracion comentario {$$ = "";}*/
             | menor admiracion comentario mayor {$$ = "";}
             | error
             ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO {
var regla = new regla_1.reglaGramatical({ produccion: 'ATRIBUTOS →  ATRIBUTOS ATRIBUTO', regla:'$$ = new NodoAST({label: $1.label, hijos: [...$1.hijos, ...$2.hijos], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
  $$ = new NodoAST({label: $1.label, hijos: [...$1.hijos, ...$2.hijos], linea: yylineno});
  }
         | ATRIBUTO {
var regla = new regla_1.reglaGramatical({ produccion: 'ATRIBUTOS →  ATRIBUTO', regla:'$$ = new NodoAST({label: $1.label, hijos: [...$1.hijos], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
           $$ = new NodoAST({label: $1.label, hijos: [...$1.hijos], linea: yylineno});}
         ;

ATRIBUTO: id '=' string {
var regla = new regla_1.reglaGramatical({ produccion: 'ATRIBUTO →  id igual string', regla:'$3 = $3.slice(1, $3.length-1); \n $$ = new NodoAST({label: \'ATRIBUTO\', hijos: [$1, $3], linea: yylineno});' });
reporte_1.ReporteGramatical.getInstance().push(regla);
                          $3 = $3.slice(1, $3.length-1); 
                          $$ = new NodoAST({label: 'ATRIBUTO', hijos: [$1, $3], linea: yylineno});}
        ;

        /*
        
        
        
        --PARTE 1
<ID ATRIBUTOS>INSTRUCCIONES</ID>
<ID ATRIBUTOS>INSTRUCCIONES /ID>
<ID ATRIBUTOS INSTRUCCIONES </ID>
<ID ATRIBUTOS INSTRUCCIONES /ID>
<ID >INSTRUCCIONES</ID>
<ID >INSTRUCCIONES /ID>
<ID INSTRUCCIONES</ID>
<ID INSTRUCCIONES /ID>
--PARTE 2
<ID ATRIBUTOS></ID>
<ID></ID>
--PARTE 3
<ID ATRIBUTOS />
<ID />
--PARTE 4
ID ATRIBUTOS>INSTRUCCIONES</ID>
ID ATRIBUTOS>INSTRUCCIONES /ID>
ID ATRIBUTOS INSTRUCCIONES </ID>
ID ATRIBUTOS INSTRUCCIONES /ID>
ID >INSTRUCCIONES</ID>
ID >INSTRUCCIONES /ID>
ID INSTRUCCIONES</ID>
ID INSTRUCCIONES /ID>
--PARTE 5
ID ATRIBUTOS></ID>
ID></ID>
--PARTE 6
ID ATRIBUTOS />
ID />
--PARTE 7
<ID ATRIBUTOS>INSTRUCCIONES</ID
<ID ATRIBUTOS>INSTRUCCIONES /ID
<ID ATRIBUTOS INSTRUCCIONES </ID
<ID ATRIBUTOS INSTRUCCIONES /ID
<ID >INSTRUCCIONES</ID
<ID >INSTRUCCIONES /ID
<ID INSTRUCCIONES</ID
<ID INSTRUCCIONES /ID
--PARTE 8
<ID ATRIBUTOS></ID
<ID></ID
--PARTE 9
<ID ATRIBUTOS /
<ID /
--PARTE 10
ID ATRIBUTOS>INSTRUCCIONES</ID
ID ATRIBUTOS>INSTRUCCIONES /ID
ID ATRIBUTOS INSTRUCCIONES </ID
ID ATRIBUTOS INSTRUCCIONES /ID
ID >INSTRUCCIONES</ID
ID >INSTRUCCIONES /ID
ID INSTRUCCIONES</ID
ID INSTRUCCIONES /ID
--PARTE 11
ID ATRIBUTOS></ID
ID></ID
--PARTE 12
ID ATRIBUTOS /
ID /
        
        
        */