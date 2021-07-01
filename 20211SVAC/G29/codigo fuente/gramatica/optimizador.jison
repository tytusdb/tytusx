/* Area de imports */

%{
      const clase_declaraciones = require('../clases/optimizador/declaraciones');
      const clase_declaracion = require('../clases/optimizador/declaracion');
      const clase_metodo = require('../clases/optimizador/metodo');
      const clase_asignacion = require('../clases/optimizador/asignacion');
      const clase_llamada_funcion = require('../clases/optimizador/call_funcion');
      const clase_if = require('../clases/optimizador/if_expresion');
      const clase_goto = require('../clases/optimizador/goto_expresion');
      const clase_etiqueta = require('../clases/optimizador/etiqueta');
      const clase_return = require('../clases/optimizador/return_expresion');
%}


%lex
%options case-insensitive
%option yylineno

/* Definicion lexica */
num     ([-])?[0-9]+("."[0-9]+)?
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena  (\"([^\"\\])*\")

%%

/*COMENTARIOS*/
((\/\*)[^\*\/]*(\*\/))  /* skip */
[#][^\n]*               /* skip */
[<][!][-][-][^-<]*[-][-][>] /*skip comments*/
((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */

/* Simbolos del programa */
{num}                 return 'NUM';
";"                   return 'PUNTOCOMA'
":"                   return 'DOS_PUNTOS'
"{"                   return 'LLAVE_ABRE';
"}"                   return 'LLAVE_CIERRA';
"("                   return 'PAR_ABRE';
")"                   return 'PAR_CIERRA';
"["                   return 'COR_ABRE';
"]"                   return 'COR_CIERRA';
","                   return 'COMA';

"<="                  return 'LOGICA';
"<"                   return 'LOGICA';
"=="                  return 'LOGICA';
">="                  return 'LOGICA';
">"                   return 'LOGICA';
"!="                  return 'LOGICA';
"!"                   return 'LOGICA';
"="                   return 'IGUAL';

"+"                   return 'OPERACION';
"-"                   return 'OPERACION';
"/"                   return 'OPERACION';
"*"                   return 'OPERACION';
"%"                   return 'OPERACION';

"void"                return 'VOID';
"goto"                return 'GOTO';
"int"                 return 'TIPO';
"float"               return 'TIPO';
"double"              return 'TIPO';
"char"                return 'TIPO';
"if"                  return 'IF';
"return"              return 'RETURN'

{id}                  return 'ID';
(\"[^"]*\")           return 'CADENA';
{cadena}              return 'CADENA';
{TIPO}({ID}{COMA})+   return 'LD';

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */

inicio              : declaraciones metodos EOF { $$ = new clase_declaraciones.default($1); console.log($$.getText());
                      for(let x of $2){
                         console.log(x.getText());
                      }
                      return $$;}
                    ;

declaraciones       : declaraciones declaracion { $$ = $1; $$.push($2);}
                    | declaracion { $$ = []; $$.push($1); }
                    ;

declaracion         : TIPO ID COR_ABRE NUM COR_CIERRA PUNTOCOMA { $$ = new clase_declaracion.default($1, $2 + "[" + $4 + "]"); }
                    | TIPO ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2); }
                    | TIPO ID COMA lista_comas ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2 + " ," + $4 + $5);  }
                    | TIPO ID COMA ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2+$3+$4);}
                    | TIPO ID IGUAL NUM PUNTOCOMA { $$ = new clase_declaracion.default($1, $2+$3+$4);}
                    | VOID ID PAR_ABRE PAR_CIERRA PUNTOCOMA { $$ = new clase_declaracion.default($1, $2+$3+$4);}
                    ;

lista_comas         : lista_comas ID COMA  { $$ = $1; $$+= $2+' '+$3 }
                    | ID COMA { $$=''; $$ += $1+' '+$2 }
                    ;

metodos             : metodos metodo { $$ = $1 ; $$.push($2); }
                    | metodo { $$ = []; $$.push($1); console.log($1.getText()); }
                    ;

metodo              : VOID ID PAR_ABRE PAR_CIERRA LLAVE_ABRE lista_intrucciones LLAVE_CIERRA
                      { $$ = new clase_metodo.default($2); $$.insertar_lista($6); }
                    ;

lista_intrucciones  : lista_intrucciones instruccion { $$ = $1 ; $$.push($2); console.log($2.getText()); }
                    | instruccion { $$ = []; $$.push($1); console.log($1.getText()); }
                    ;

instruccion : asignacion { $$ = $1; }
            | llamada_funcion { $$ = $1; }
            | if_estado { $$ = $1; }
            | salto_etiqueta { $$ = $1; }
            | declaracion_etiquita { $$ = $1; }
            | retorno { $$ = $1; }
            ;

asignacion : ID IGUAL stack PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, "","" ); }
           | ID IGUAL ID NUM PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, "-", $4.replace("-",""));}
           | ID IGUAL NUM NUM PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, "-", $4.replace("-",""));}
           | ID IGUAL ID OPERACION ID PUNTOCOMA  { $$ = new clase_asignacion.default( $1, $3, $4, $5); }
           | ID IGUAL ID OPERACION NUM PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, $4, $5); }
           | ID IGUAL NUM OPERACION ID PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, $4, $5); }
           | ID IGUAL NUM OPERACION NUM PUNTOCOMA  { $$ = new clase_asignacion.default( $1, $3, $4, $5);}
           | stack IGUAL NUM PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3,"","" ); }
           | stack IGUAL ID PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3,"","" ); }
           | stack IGUAL stack PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3,"","" ); }
           | ID IGUAL NUM PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, "","" ); }
           | ID IGUAL ID PUNTOCOMA { $$ = new clase_asignacion.default( $1, $3, "","" ); }
           ;

stack : ID COR_ABRE PAR_ABRE TIPO PAR_CIERRA ID COR_CIERRA { $$ =  $1+$2+$3+$4+$5+$6+$7; }
      ;

llamada_funcion : ID PAR_ABRE PAR_CIERRA PUNTOCOMA { $$ = new clase_llamada_funcion.default($1+$2+$3); }
                | ID PAR_ABRE CADENA COMA PAR_ABRE TIPO PAR_CIERRA NUM PAR_CIERRA PUNTOCOMA
                { $$ = new clase_llamada_funcion.default($1+$2+$3+$4+$5+$6+$7+$8+$9);  }
                | ID PAR_ABRE CADENA COMA PAR_ABRE TIPO PAR_CIERRA ID PAR_CIERRA PUNTOCOMA
                { $$ = new clase_llamada_funcion.default($1+$2+$3+$4+$5+$6+$7+$8+$9);  }
                | ID PAR_ABRE ID COMA NUM COMA CADENA COMA ID PAR_CIERRA PUNTOCOMA
                { $$ = new clase_llamada_funcion.default($1+$2+$3+$4+$5+$6+$7+$8+$9+$10+$11);}
                | ID PAR_ABRE CADENA PAR_CIERRA PUNTOCOMA
                { $$ = new clase_llamada_funcion.default($1+$2+$3+$4);}
                | ID PAR_ABRE CADENA COMA ID PAR_CIERRA PUNTOCOMA
                { $$ = new clase_llamada_funcion.default($1+$2+$3+$4+$5+$6);}
                ;

if_estado : IF PAR_ABRE ID LOGICA ID PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default($3, $4, $5, $8); }
           | IF PAR_ABRE ID LOGICA NUM PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default($3, $4, $5, $8); }
           | IF PAR_ABRE NUM LOGICA ID PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default($3, $4, $5, $8); }
           | IF PAR_ABRE NUM LOGICA NUM PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default($3, $4, $5, $8); }
           | IF PAR_ABRE LOGICA NUM PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default("", $3, $4, $7); }
           | IF PAR_ABRE LOGICA ID PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default("", $3, $4, $7); }
           | IF PAR_ABRE ID PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default("", "", $3, $6); }
           | IF PAR_ABRE NUM PAR_CIERRA GOTO ID PUNTOCOMA { $$ = new clase_if.default("", "", $3, $6); }
           ;

salto_etiqueta : GOTO ID PUNTOCOMA { $$ = new clase_goto.default($2); }
               ;

instruccion : ID DOS_PUNTOS { $$ = new clase_etiqueta.default($2); }
            ;

retorno : RETURN ID PUNTCOMA { $$ = new clase_return.default($2); }
        | RETURN NUM PUNTOCOMA { $$ = new clase_return.default($2); }
        | RETURN PUNTOCOMA { $$ = new clase_return.default(""); }
        ;

