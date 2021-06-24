/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"/*"                               this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip commentario content*/
".h"                    %{ return 'tk_extension';  %}   
"#include"                    %{ return 'tk_include';  %}   
"goto"                      %{ return 'tk_goto';  %}    
"if"                        %{ return 'tk_if';  %}
"double"                    %{ return 'tk_double';  %}
"int"                       %{ return 'tk_int';  %} 
"char"                       %{ return 'tk_char';  %}   
"void"                      %{ return 'tk_void';  %}   
"float"                     %{ return 'tk_float';  %}  
"main"                      %{ return 'tk_main';  %}
"printf"                    %{ return 'tk_printf';  %}  
"return"                    %{ return 'tk_return';  %} 
([0-9]+["."][0-9]+)\b        %{ return 'tk_decimal';  %}
[0-9]+\b                    %{ return 'tk_entero';  %}
\"[^\"]*\"                  %{ /*yytext = yytext.substr(1, yyleng-2);*/ return 'tk_cadena1'; %}
\'[^\']*\'                  %{ /*yytext = yytext.substr(1, yyleng-2);*/ return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
"+"                         %{ return 'tk_mas';  %}
"-"                         %{ return 'tk_menos';  %}
"*"                         %{ return 'tk_multiplicacion';  %}
"/"                         %{ return 'tk_division';  %}
"%"                         %{ return 'tk_modulo';  %}
"!="                        %{ return 'tk_noigual'; %}
"<="                        %{ return 'tk_menorigual'; %}
">="                        %{ return 'tk_mayorigual'; %}
"=="                        %{ return 'tk_igualigual'; %}
"="                         %{ return 'tk_igual'; %}
">"                         %{ return 'tk_mayor'; %}
"<"                         %{ return 'tk_menor'; %}
"{"                         %{ return 'tk_llavea'; %}
"}"                         %{ return 'tk_llavec'; %}
"["                         %{ return 'tk_corchetea'; %}
"]"                         %{ return 'tk_corchetec'; %}
"("                         %{ return 'tk_parentesisa'; %}
")"                         %{ return 'tk_parentesisc'; %}
":"                         %{ return 'tk_dospuntos'; %}
";"                         %{ return 'tk_puntoycoma'; %}
","                         %{ return 'tk_coma'; %}
\s+                         /* skip whitespace */
[ \t\r\n\f]                 %{ /*Los Ignoramos*/   %}
<<EOF>>                     %{ return 'EOF';       %}
.                           {  console.log("ERROR: "+yytext); }

/lex

//SECCION DE IMPORTS
%{

%}


/* Asociación de operadores y precedencia */
%left tk_mas tk_menos
%left tk_asterisco tk_division tk_modulo
%left UMENOS
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */

INICIO : BLOQUES EOF   {        console.log("TODO CORRECTO :D OPTIMIZADOR VERSION");
                                $$ = $1;
                                return $$; } ;


BLOQUES: BLOQUES BLOQUE { $1.push($2); $$ = $1; }
        | BLOQUE { $$ = [$1]; };

TIPO_DATO:      tk_double { $$ = $1; }
        |       tk_float { $$ = $1; }
        |       tk_char { $$ = $1; }
        |       tk_int { $$ = $1; };


BLOQUE:         tk_include tk_menor tk_identificador tk_extension tk_mayor {  
                      $$ = new Include(@1.first_line, @1.first_column, "#include <"+ $3 + ".h>\n", TipoBloque.INCLUDE);
                }
        |       TIPO_DATO  tk_identificador tk_corchetea tk_entero tk_corchetec tk_puntoycoma { 
                $$ = new DeclaracionArreglo(@1.first_line, @1.first_column, $1+" "+$2+"["+$4+"];\n", TipoBloque.DECLARACION_ARREGLO);
                }
        |       TIPO_DATO IDS  tk_puntoycoma {
                $$ = new Declaracion(@1.first_line, @1.first_column, TipoBloque.DECLARACION, $2, $1);
                } 
        |       tk_void tk_identificador tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec {
                $$ = new Void($2, @1.first_line, @1.first_column, TipoBloque.VOID, $6);
         }
        |       tk_void tk_main tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec {
                $$ = new Void($2, @1.first_line, @1.first_column, TipoBloque.VOID, $6);
         }
        |       tk_int tk_main tk_parentesisa tk_parentesisc tk_llavea INSTRUCCIONES tk_llavec {
                $$ = new Main(@1.first_line, @1.first_column, TipoBloque.MAIN, $6);
         };

IDS: IDS tk_coma tk_identificador { $1.push($3); $$ = $1; }
        |       tk_identificador { $$ = [$1] };


EXPRESION:      tk_identificador { $$ = $1; }
        |       tk_decimal { $$ = $1; }
        |       tk_entero { $$ = $1; }
        |       tk_menos tk_identificador { $$ = "-" + $2; }
        |       tk_menos tk_decimal { $$ = "-" + $2; }
        |       tk_menos tk_entero { $$ = "-" + $2; };

OPERADOR:       tk_mas { $$ = [Operador.SUMA,"+"]; }
        |       tk_menos { $$ = [Operador.RESTA,"-"];  }
        |       tk_division { $$ = [Operador.DIVISION,"/"]; }
        |       tk_multiplicacion { $$ = [Operador.MULTIPLICACION,"*"]; }
        |       tk_modulo { $$ = [Operador.MODULO,"%"]; };

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1;  }
        |       INSTRUCCION {  $$ = [$1]; };

COMPARADOR:     tk_igualigual { $$ = [Operador.IGUAL,"=="]; }
        |       tk_noigual { $$ = [Operador.DIFERENTE_QUE,"!="]; }
        |       tk_mayorigual { $$ = [Operador.MAYOR_IGUAL_QUE,">="]; }
        |       tk_menorigual { $$ = [Operador.MENOR_IGUAL_QUE,"<="]; }
        |       tk_mayor { $$ = [Operador.MAYOR_QUE,">"]; }
        |       tk_menor { $$ = [Operador.MENOR_QUE,"<"];};


INSTRUCCION:    tk_identificador tk_igual EXPRESION OPERADOR EXPRESION tk_puntoycoma {
                codigoAux = $1 + " = " + $3 + " " + $4[1] + " " + $5 + ";\n";
                $$ = new AsignacionOperacion($1, $3, $5, $4[0], @1.first_line, @1.first_column, codigoAux, TipoInstruccion3D.ASIGNACION_OPERACION);
                }
        |       tk_identificador tk_igual EXPRESION tk_puntoycoma {
                codigoAux = $1 + " = " + $3 + ";\n";
                $$ = new AsignacionSimple($1, $3, @1.first_line, @1.first_column, codigoAux, TipoInstruccion3D.ASIGNACION_SIMPLE);
                }
        |       tk_identificador tk_igual tk_identificador tk_corchetea tk_parentesisa TIPO_DATO tk_parentesisc EXPRESION tk_corchetec tk_puntoycoma  {
                codigoAux = $1 + " = " + $3 + "[(" + $6 + ")" + $8 + "];\n";
                $$ = new AsignacionArreglo($1, codigoAux, @1.first_line, @1.first_column, TipoInstruccion3D.ASIGNACION_ARREGLO);
                }
        |       tk_identificador tk_corchetea tk_parentesisa TIPO_DATO tk_parentesisc EXPRESION tk_corchetec tk_igual EXPRESION tk_puntoycoma {
                codigoAux = $1 + "[(" + $4 + ")" + $6 + "] = " + $9 + ";\n";
                $$ = new  ArregloAsignaciono($1, codigoAux, @1.first_line, @1.first_column, TipoInstruccion3D.ARREGLO_ASIGNACION);
                }
        |       tk_identificador tk_dospuntos { 
                $$ = new Etiqueta($1, @1.first_line, @1.first_column, $1 + ":\n", TipoInstruccion3D.ETIQUETA);
                }
        |       tk_goto tk_identificador tk_puntoycoma {
                $$ = new Goto($2, @1.first_line, @1.first_column, "goto " + $2 + ";\n", TipoInstruccion3D.GOTO);
                }
        |       tk_return tk_puntoycoma { 
                $$ = new Return(null, @1.first_line, @1.first_column, "return;\n", TipoInstruccion3D.RETURN);
                }
        |       tk_return tk_entero tk_puntoycoma {
                $$ = new Return($2, @1.first_line, @1.first_column, "return " + $2 + ";\n", TipoInstruccion3D.RETURN);
                }
        |       tk_identificador tk_parentesisa tk_parentesisc tk_puntoycoma {
                $$ = new Llamada($1, @1.first_line, @1.first_column, $1 + "();\n", TipoInstruccion3D.LLAMADA);
                }
        |       tk_printf tk_parentesisa tk_cadena1 tk_coma tk_parentesisa TIPO_DATO tk_parentesisc EXPRESION tk_parentesisc tk_puntoycoma {
                codigoAux = "printf(" + $3 + ", (" + $6 + ")" + $8 + ");\n";
                $$ = new Print(@1.first_line, @1.first_column, codigoAux, TipoInstruccion3D.PRINT);
                }
        |       tk_if tk_parentesisa EXPRESION COMPARADOR EXPRESION tk_parentesisc tk_goto tk_identificador tk_puntoycoma {
                codigoAux = "if (" + $3 + " " + $4[1] + " " + $5 + ") goto " + $8 + ";\n";
                $$ = new If($3, $5, $4[0], $8, @1.first_line, @1.first_column, codigoAux, TipoInstruccion3D.IF);
         };