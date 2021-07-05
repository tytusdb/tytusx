%{
  var salida = {};
  var optimizaciones = [];
%}

/* Análisis Lexico */
%lex
%options case-insensitive
comentarios       (\/\*[\s\S]*?\*\/|\/\/.*)
identificador     (([a-zA-Z_])[a-zA-Z0-9_]*)
digito            ([0-9]+)
decimal           ({digito}"."{digito}+)
comillaSimple     ("'")
comillaDoble      ("\"")
comillas          ({comillaDoble}|{comillaSimple})
cadena            ({comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas})

temporal          (("t"|"T")[0-9]+)
etiqueta          (("l"|"L")[0-9]+)

%%
\s+               /* ignorar espacios en blanco */
{comentarios}     /* ignorar comentarios */

"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
"."                     return '.'
","                     return ','
":"                     return ':'
";"                     return ';'
"#"                     return '#'

/* TEMPORALES / ETIQUETAS */
{temporal}              return 'temporal'
{etiqueta}              return 'etiqueta'

/* TIPOS */
"int"                   return 'int'
"float"                 return 'float'
"double"                return 'double'
"char"                  return 'char'
"void"                  return 'void'

/* ESTRUCTURAS Y PUNTEROS */
"stack"                 return 'stack'
"P"                     return 'P'          // TODO PUNTERO STACK
"heap"                  return 'heap'
"H"                     return 'H'          // TODO PUNTERO HEAP

/* IMPORTS / LIBRERIAS */
"include"               return 'include'
"stdio.h"               return 'stdio.h'
"math.h"                return 'math.h'

/* PALABRAS RESERVADAS */
"goto"                  return 'goto'
"print"                 return 'print'
"printf"                return 'printf'
"if"                    return 'if'
"return"                return 'return'

/* OPERADORES */
"<="                    return '<='
"<"                     return '<'
"=="                    return '=='
">="                    return '>='
">"                     return '>'
"!="                    return '!='
"!"                     return '!'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
{identificador}         return 'identificador'
{decimal}               return 'decimal'
{digito}                return 'digito'
{cadena}                { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<<EOF>>                 return 'EOF';

.                       {
                          console.error(`[C3D] Error Léxico: ${yytext} en la linea ${yylloc.first_line} y columna ${yylloc.first_column}`);
                        }
/lex

/* Asociación y precedencia de operadores */
%right '='
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
%right '!'
%left UMINUS UPLUS

%start START
%% /* Gramática */

START : CODIGO EOF  {
                      salida = {
                        instruccion: `${$1.instruccion}`,
                        reporte: optimizaciones
                      };
                      optimizaciones = [];
                      return salida;
                    }
      | EOF         {
                      salida = {
                        instruccion: '',
                        reporte: optimizaciones
                      };
                      optimizaciones = [];
                      return salida;
                    }
      ;

CODIGO : LIST_LIBRERIAS DEFINICIONES METODOS  {
                                                $$ = {
                                                  instruccion: `${$1.instruccion}${$2.instruccion}${$3.instruccion}`,
                                                  valor: undefined,
                                                  tipo: 'CODIGO'
                                                };
                                              }
       | DEFINICIONES METODOS                 {
                                                $$ = {
                                                  instruccion: `${$1.instruccion}${$2.instruccion}`,
                                                  valor: undefined,
                                                  tipo: 'CODIGO'
                                                };
                                              }
       ;

LIST_LIBRERIAS : LIST_LIBRERIAS LIBRERIAS   {
                                              $$ = {
                                                instruccion: `${$1.instruccion}${$2.instruccion}`,
                                                valor: undefined,
                                                tipo: 'LIST_LIBRERIAS'
                                              };
                                            }
               | LIBRERIAS                  {
                                              $$ = {
                                                instruccion: `${$1.instruccion}`,
                                                valor: undefined,
                                                tipo: 'LIST_LIBRERIAS'
                                              };
                                            }
               ;

LIBRERIAS : '#' 'include' '<' LIBRERIA '>'  {
                                              $$ = {
                                                instruccion: `#include <${$4.instruccion}>\n\r`,
                                                valor: undefined,
                                                tipo: 'LIBRERIAS'
                                              };
                                            }
          ;

LIBRERIA : 'stdio.h'  {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'LIBRERIA'
                        };
                      }
         | 'math.h'   {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'LIBRERIA'
                        };
                      }
         ;

DEFINICIONES : DEFINICIONES DEFINICION    {
                                            $$ = {
                                              instruccion: `${$1.instruccion}${$2.instruccion}`,
                                              valor: undefined,
                                              tipo: 'DEFINICIONES'
                                            };
                                          }
             | DEFINICION                 {
                                            $$ = {
                                              instruccion: `${$1.instruccion}`,
                                              valor: undefined,
                                              tipo: 'DEFINICIONES'
                                            };
                                          }
             ;

DEFINICION : TIPO_DATO ESTRUCTURAS '[' digito ']' ';'   {
                                                          $$ = {
                                                            instruccion: `${$1.instruccion} ${$2.instruccion}[${$4}];\n\r`,
                                                            valor: undefined,
                                                            tipo: 'TIPO_DATO'
                                                          };
                                                        }
           | TIPO_DATO PUNTEROS ';'                     {
                                                          $$ = {
                                                            instruccion: `${$1.instruccion} ${$2.instruccion};\n\r`,
                                                            valor: undefined,
                                                            tipo: 'TIPO_DATO'
                                                          };
                                                        }
           | TIPO_DATO TEMPORALES ';'                   {
                                                          $$ = {
                                                            instruccion: `${$1.instruccion} ${$2.instruccion};\n\r`,
                                                            valor: undefined,
                                                            tipo: 'TIPO_DATO'
                                                          };
                                                        }
           ;

TIPO_DATO : 'int'     {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'TIPO_DATO'
                        };
                      }
          | 'float'   {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'TIPO_DATO'
                        };
                      }
          | 'double'  {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'TIPO_DATO'
                        };
                      }
          | 'char'    {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'TIPO_DATO'
                        };
                      }
          ;

TEMPORALES : TEMPORALES ',' 'temporal'  {
                                          $$ = {
                                            instruccion: `${$1.instruccion}, ${$3}`,
                                            valor: undefined,
                                            tipo: 'TEMPORALES'
                                          };
                                        }
           | 'temporal'                 {
                                          $$ = {
                                            instruccion: `${$1}`,
                                            valor: undefined,
                                            tipo: 'TEMPORALES'
                                          };
                                        }
           ;

ESTRUCTURAS : 'heap'  {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'ESTRUCTURAS'
                        };
                      }
            | 'stack' {
                        $$ = {
                          instruccion: `${$1}`,
                          valor: undefined,
                          tipo: 'ESTRUCTURAS'
                        };
                      }
            ;

PUNTEROS : 'P'  {
                  $$ = {
                    instruccion: `${$1}`,
                    valor: undefined,
                    tipo: 'PUNTEROS'
                  };
                }
         | 'H'  {
                  $$ = {
                    instruccion: `${$1}`,
                    valor: undefined,
                    tipo: 'PUNTEROS'
                  };
                }
         ;

METODOS : METODOS METODO  {
                            $$ = {
                              instruccion: `${$1.instruccion}${$2.instruccion}`,
                              valor: undefined,
                              tipo: 'METODOS'
                            };
                          }
        | METODO          {
                            $$ = {
                              instruccion: `${$1.instruccion}`,
                              valor: undefined,
                              tipo: 'METODOS'
                            };
                          }
        ;

METODO : 'void' 'identificador' '(' ')' '{' 'return' ';' '}'                {
                                                                              $$ = {
                                                                                instruccion: `void ${$2}()\{\n\rreturn;\n\r\}\n\r`,
                                                                                valor: undefined,
                                                                                tipo: 'INSTRUCCIONES'
                                                                              };
                                                                            }
       | 'void' 'identificador' '(' ')' '{' INSTRUCCIONES 'return' ';' '}'  {
                                                                              $$ = {
                                                                                instruccion: `void ${$2}()\{\n\r${$6.instruccion}return;\n\r\}\n\r`,
                                                                                valor: undefined,
                                                                                tipo: 'INSTRUCCIONES'
                                                                              };
                                                                            }

       | 'void' 'identificador' '(' ')' '{' '}'                             {
                                                                              $$ = {
                                                                                instruccion: `void ${$2}()\{\n\r\}\n\r`,
                                                                                valor: undefined,
                                                                                tipo: 'INSTRUCCIONES'
                                                                              };
                                                                            }
       | 'void' 'identificador' '(' ')' '{' INSTRUCCIONES '}'               {
                                                                              $$ = {
                                                                                instruccion: `void ${$2}()\{\n\r${$6.instruccion}\}\n\r`,
                                                                                valor: undefined,
                                                                                tipo: 'INSTRUCCIONES'
                                                                              };
                                                                            }
       ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   {
                                              $$ = {
                                                instruccion: `${$1.instruccion}${$2.instruccion}`,
                                                valor: undefined,
                                                tipo: 'INSTRUCCIONES'
                                              };
                                            }
              | INSTRUCCION                 {
                                              $$ = {
                                                instruccion: `${$1.instruccion}`,
                                                valor: undefined,
                                                tipo: 'INSTRUCCIONES'
                                              };
                                            }
              ;

INSTRUCCION : ASIGNACION_TEMPORAL ';'               {
                                                      $$ = {
                                                        instruccion: `${$1.instruccion};\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | ASIGNACION_PUNTERO ';'                {
                                                      $$ = {
                                                        instruccion: `${$1.instruccion};\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | ACCESO_ESTRUCTURAS '=' 'VALOR' ';'    {
                                                      $$ = {
                                                        instruccion: `${$1.instruccion} = ${$3.instruccion};\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | 'etiqueta' ':'                        {
                                                      $$ = {
                                                        instruccion: `${$1}:\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | 'goto' 'etiqueta' ';'                 {
                                                      $$ = {
                                                        instruccion: `${$1} ${$2};\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | 'identificador' '(' ')' ';'           {
                                                      $$ = {
                                                        instruccion: `${$1}();\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | SENTENCIA_PRINT                       {
                                                      $$ = {
                                                        instruccion: `${$1.instruccion};\n\r`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            | SENTENCIA_IF                          {
                                                      $$ = {
                                                        instruccion: `${$1.instruccion}`,
                                                        valor: undefined,
                                                        tipo: 'INSTRUCCION'
                                                      };
                                                    }
            ;

ASIGNACION_TEMPORAL : 'temporal' '=' VALOR '+' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion} + ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 0) {
                                                              if ($1 == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 6', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 6 en '${$1} = ${$3.instruccion} + ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 10', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 10 en '${$1} = ${$3.instruccion} + ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$3.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | 'temporal' '=' VALOR '-' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion} - ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 0) {
                                                              if ($1 == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 7', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 7 en '${$1} = ${$3.instruccion} - ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 11', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 11 en '${$1} = ${$3.instruccion} - ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$3.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | 'temporal' '=' VALOR '*' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion} * ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE') {
                                                              if ($5.valor == 1) {
                                                                if ($1 == $3.instruccion) {
                                                                  optimizaciones.push({regla:'REGLA 8', descripcion: $$.instruccion,
                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                  $$.instruccion = `// Se aplicó la REGLA 8 en '${$1} = ${$3.instruccion} * ${$5.instruccion}'`;
                                                                } else {
                                                                  optimizaciones.push({regla:'REGLA 12', descripcion: $$.instruccion,
                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                  $$.instruccion = `// Se aplicó la REGLA 12 en '${$1} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                  $$.instruccion += `${$1} = ${$3.instruccion}`;
                                                                }
                                                              } else if ($5.valor == 2) {
                                                                optimizaciones.push({regla:'REGLA 14', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 14 en '${$1} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$3.instruccion} +  ${$3.instruccion}`;
                                                              } else if ($5.valor == 0) {
                                                                optimizaciones.push({regla:'REGLA 15', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 15 en '${$1} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$5.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | 'temporal' '=' VALOR '/' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion} / ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 1) {
                                                              if ($1 == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 9', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 9 en '${$1} = ${$3.instruccion} / ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 13', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 13 en '${$1} = ${$3.instruccion} / ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$3.instruccion}`;
                                                              }
                                                            }

                                                            if ($3.tipo == 'CONSTANTE' && $3.valor == 0) {
                                                                optimizaciones.push({regla:'REGLA 16', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 16 en '${$1} = ${$3.instruccion} / ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1} = ${$3.instruccion}`;
                                                            }
                                                          }
                    | 'temporal' '=' VALOR '%' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion} % ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };
                                                          }
                    | 'temporal' '=' VALOR                {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };
                                                          }
                    | 'temporal' '=' ACCESO_ESTRUCTURAS   {
                                                            $$ = {
                                                              instruccion: `${$1} = ${$3.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_TEMPORAL'
                                                            };
                                                          }
                    ;

ASIGNACION_PUNTERO  : PUNTEROS '=' VALOR '+' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1.instruccion} = ${$3.instruccion} + ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_PUNTERO'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 0) {
                                                              if ($1.instruccion == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 6', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 6 en '${$1.instruccion} = ${$3.instruccion} + ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 10', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 10 en '${$1.instruccion} = ${$3.instruccion} + ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1.instruccion} = ${$3.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | PUNTEROS '=' VALOR '-' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1.instruccion} = ${$3.instruccion} - ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_PUNTERO'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 0) {
                                                              if ($1.instruccion == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 7', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 7 en '${$1.instruccion} = ${$3.instruccion} - ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 11', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 11 en '${$1.instruccion} = ${$3.instruccion} - ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1.instruccion} = ${$3.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | PUNTEROS '=' VALOR '*' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1.instruccion} = ${$3.instruccion} * ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_PUNTERO'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE') {
                                                              if ($5.valor == 1) {
                                                                if ($1.instruccion == $3.instruccion) {
                                                                  optimizaciones.push({regla:'REGLA 8', descripcion: $$.instruccion,
                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                  $$.instruccion = `// Se aplicó la REGLA 8 en '${$1.instruccion} = ${$3.instruccion} * ${$5.instruccion}'`;
                                                                } else {
                                                                  optimizaciones.push({regla:'REGLA 12', descripcion: $$.instruccion,
                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                  $$.instruccion = `// Se aplicó la REGLA 12 en '${$1.instruccion} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                  $$.instruccion += `${$1.instruccion} = ${$3.instruccion}`;
                                                                }
                                                              } else if ($5.valor == 2) {
                                                                optimizaciones.push({regla:'REGLA 14', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 14 en '${$1.instruccion} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                $$.instruccion = `${$1.instruccion} = ${$3.instruccion} +  ${$3.instruccion}`;
                                                              } else if ($5.valor == 0) {
                                                                optimizaciones.push({regla:'REGLA 15', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 15 en '${$1.instruccion} = ${$3.instruccion} * ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1.instruccion} = ${$5.instruccion}`;
                                                              }
                                                            }
                                                          }
                    | PUNTEROS '=' VALOR '/' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1.instruccion} = ${$3.instruccion} / ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_PUNTERO'
                                                            };

                                                            if ($5.tipo == 'CONSTANTE' && $5.valor == 1) {
                                                              if ($1.instruccion == $3.instruccion) {
                                                                optimizaciones.push({regla:'REGLA 9', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 9 en '${$1.instruccion} = ${$3.instruccion} / ${$5.instruccion}'`;
                                                              } else {
                                                                optimizaciones.push({regla:'REGLA 13', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 13 en '${$1.instruccion} = ${$3.instruccion} / ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1.instruccion} = ${$3.instruccion}`;
                                                              }
                                                            }

                                                            if ($3.tipo == 'CONSTANTE' && $3.valor == 0) {
                                                                optimizaciones.push({regla:'REGLA 16', descripcion: $$.instruccion,
                                                                  linea: this._$.first_line, columna: this._$.first_column});
                                                                $$.instruccion = `// Se aplicó la REGLA 16 en '${$1.instruccion} = ${$3.instruccion} / ${$5.instruccion}';\n\r`;
                                                                $$.instruccion += `${$1.instruccion} = ${$3.instruccion}`;
                                                            }
                                                          }
                    | PUNTEROS '=' VALOR '%' VALOR      {
                                                            $$ = {
                                                              instruccion: `${$1.instruccion} = ${$3.instruccion} % ${$5.instruccion}`,
                                                              valor: undefined,
                                                              tipo: 'ASIGNACION_PUNTERO'
                                                            };
                                                          }
                    | PUNTEROS '=' VALOR                {
                                                          $$ = {
                                                            instruccion: `${$1.instruccion} = ${$3.instruccion}`,
                                                            valor: undefined,
                                                            tipo: 'ASIGNACION_PUNTERO'
                                                          };
                                                        }
                    ;

VALOR : 'temporal'                {
                                    $$ = {
                                      instruccion: $1,
                                      valor: Number($1),
                                      tipo: 'TEMPORAL'
                                    };
                                  }
      | 'digito'                  {
                                    $$ = {
                                      instruccion: $1,
                                      valor: Number($1),
                                      tipo: 'CONSTANTE'
                                    };
                                  }
      | 'decimal'                 {
                                    $$ = {
                                      instruccion: $1,
                                      valor: Number($1),
                                      tipo: 'CONSTANTE'
                                    };
                                  }
      | PUNTEROS                  {
                                    $$ = {
                                      instruccion: $1.instruccion,
                                      valor: undefined,
                                      tipo: 'PUNTERO'
                                    };
                                  }
      | '-' VALOR %prec UMINUS    {
                                    $$ = {
                                      instruccion: `-${$2.instruccion}`,
                                      valor: Number($2.valor) * -1,
                                      tipo: 'CONSTANTE'
                                    };
                                  }
      | '+' VALOR %prec UPLUS     {
                                    $$ = {
                                      instruccion: `+${$2.instruccion}`,
                                      valor: $2.valor,
                                      tipo: 'CONSTANTE'
                                    };
                                  }
      ;

ACCESO_ESTRUCTURAS : ESTRUCTURAS '[' VALOR ']'                    {
                                                                    $$ = {
                                                                      instruccion: `${$1.instruccion}[${$3.instruccion}]`,
                                                                      valor: undefined,
                                                                      tipo: 'ACCESO_ESTRUCTURAS'
                                                                    };
                                                                  }
                   | ESTRUCTURAS '[' '(' TIPO_DATO ')' VALOR ']'  {
                                                                    $$ = {
                                                                      instruccion: `${$1.instruccion}[(${$4.instruccion})${$6.instruccion}]`,
                                                                      valor: undefined,
                                                                      tipo: 'ACCESO_ESTRUCTURAS'
                                                                    };
                                                                  }
                   ;

SENTENCIA_PRINT : 'printf' '(' 'cadena' ',' VALOR ')' ';'                       {
                                                                                  $$ = {
                                                                                    instruccion: `printf("${$3}", ${$5.instruccion})`,
                                                                                    valor: undefined,
                                                                                    tipo: 'SENTENCIA_PRINT'
                                                                                  };
                                                                                }
                | 'printf' '(' 'cadena' ',' '(' TIPO_DATO ')' VALOR ')' ';'     {
                                                                                  $$ = {
                                                                                    instruccion: `printf("${$3}", (${$6.instruccion})${$8.instruccion})`,
                                                                                    valor: undefined,
                                                                                    tipo: 'SENTENCIA_PRINT'
                                                                                  };
                                                                                }
                | 'print' '(' 'cadena' ',' VALOR ')' ';'                        {
                                                                                  $$ = {
                                                                                    instruccion: `print("${$3}", ${$5.instruccion})`,
                                                                                    valor: undefined,
                                                                                    tipo: 'SENTENCIA_PRINT'
                                                                                  };
                                                                                }
                | 'print' '(' 'cadena' ',' '(' TIPO_DATO ')' VALOR ')' ';'      {
                                                                                  $$ = {
                                                                                    instruccion: `print("${$3}", (${$6.instruccion})${$8.instruccion})`,
                                                                                    valor: undefined,
                                                                                    tipo: 'SENTENCIA_PRINT'
                                                                                  };
                                                                                }
                ;

SENTENCIA_IF : 'if' '(' VALOR '<' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'     {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} < ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };
                                                                                            }
             | 'if' '(' VALOR '>' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'     {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} > ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };
                                                                                            }
             | 'if' '(' VALOR '<=' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'    {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} <= ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };
                                                                                            }
             | 'if' '(' VALOR '>=' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'    {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} >= ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };
                                                                                            }
             | 'if' '(' VALOR '==' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'    {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} == ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };

                                                                                              if ($3.tipo == 'CONSTANTE' && $5.tipo == 'CONSTANTE') {
                                                                                                if ($3.valor == $5.valor) {
                                                                                                  optimizaciones.push({regla:'REGLA 3', descripcion: $$.instruccion,
                                                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                                                  $$.instruccion = `// Se aplicó la REGLA 3 en 'if(${$3.instruccion} == ${$5.instruccion}) goto ${$8}; goto ${$11};'\n\r`;
                                                                                                  $$.instruccion += `if(${$3.instruccion} == ${$5.instruccion}) goto ${$8};\n\r`;
                                                                                                }

                                                                                                if ($3.valor != $5.valor) {
                                                                                                  optimizaciones.push({regla:'REGLA 4', descripcion: $$.instruccion,
                                                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                                                  $$.instruccion = `// Se aplicó la REGLA 4 en 'if(${$3.instruccion} == ${$5.instruccion}) goto ${$8}; goto ${$11};'\n\r`;
                                                                                                  $$.instruccion += `if(${$3.instruccion} == ${$5.instruccion}) goto ${$11};\n\r`;
                                                                                                }
                                                                                              }
                                                                                            }
             | 'if' '(' VALOR '!=' VALOR ')' 'goto' 'etiqueta' ';' 'goto' 'etiqueta' ';'    {
                                                                                              $$ = {
                                                                                                instruccion: `if(${$3.instruccion} != ${$5.instruccion}) goto ${$8};\n\rgoto ${$11};\n\r`,
                                                                                                valor: undefined,
                                                                                                tipo: 'SENTENCIA_PRINT'
                                                                                              };

                                                                                              if ($3.tipo == 'CONSTANTE' && $5.tipo == 'CONSTANTE') {
                                                                                                if ($3.valor != $5.valor) {
                                                                                                  optimizaciones.push({regla:'REGLA 3', descripcion: $$.instruccion,
                                                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                                                  $$.instruccion = `// Se aplicó la REGLA 3 en 'if(${$3.instruccion} != ${$5.instruccion}) goto ${$8}; goto ${$11};'\n\r`;
                                                                                                  $$.instruccion += `if(${$3.instruccion} != ${$5.instruccion}) goto ${$8};\n\r`;
                                                                                                }

                                                                                                if ($3.valor == $5.valor) {
                                                                                                  optimizaciones.push({regla:'REGLA 4', descripcion: $$.instruccion,
                                                                                                    linea: this._$.first_line, columna: this._$.first_column});
                                                                                                  $$.instruccion = `// Se aplicó la REGLA 4 en 'if(${$3.instruccion} != ${$5.instruccion}) goto ${$8}; goto ${$11};'\n\r`;
                                                                                                  $$.instruccion += `if(${$3.instruccion} != ${$5.instruccion}) goto ${$11};\n\r`;
                                                                                                }
                                                                                              }
                                                                                            }
             ;
