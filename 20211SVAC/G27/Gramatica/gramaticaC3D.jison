/* Definición Léxica */
%lex
%options case-insensitive
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"
acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'
%s                                  comment
%%
\s+                                 /* skip whitespace */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/

/* SIMBOLOS PARA OPERACIONES RELACIONALES */
"="                         return 'igual';
"#"                         return 'numeral';
"<"                         return 'menorq';
">"                         return 'mayorq';
";"                         return 'puntoycoma';
"+"                         return 'mas';
"-"                         return 'menos';
"void"                      return 'void';
"main"                      return 'main';
"["                         return 'cora';
"]"                         return 'corc';
"{"                         return 'llavea';
"}"                         return 'llavec';
"("                         return 'para';
")"                         return 'parc';
"Double"                    return 'MayusDouble';
"double"                    return 'MinusDouble';
"return"                    return 'return';
"include"                   return 'include';
"."                         return 'punto';



/* Number literals */
[0-9]+"."[0-9]*                     return 'decimal';
[0-9]+                              return 'entero';
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identificador';
{stringliteral}                     return 'cadena'
{charliteral}                       return 'caracter'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'
/lex
// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'cora' 'corc'
%left 'parentesisa' 'parentesisc'
%left 'mas' 'menos'
// DEFINIMOS PRODUCCIÓN INICIAL
%start START
%%

/* Definición de la gramática */
START : INCLUDES void main para parc llavea INSTRUCCIONES llavec EOF ;

INCLUDES : INCLUDES INCLUDE
            |INCLUDE;

INCLUDE:numeral include menorq identificador punto identificador mayorq 
          |identificador cora EXPRESION corc puntoycoma          
          |identificador cora EXPRESION corc igual EXPRESION puntoycoma
          |TIPO identificador cora EXPRESION corc puntoycoma
          |TIPO identificador puntoycoma;


INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
                |INSTRUCCION;

INSTRUCCION: identificador cora identificador corc igual EXPRESION puntoycoma
            |identificador igual EXPRESION puntoycoma
            |TIPO identificador puntoycoma
            |return puntoycoma;

TIPO : MayusDouble
        |MinusDouble;

EXPRESION : ARITMETICA            
            |PRIMITIVO;

ARITMETICA : EXPRESION mas EXPRESION;
            
PRIMITIVO :  entero
             |decimal                          
             |cadena
             |caracter
             |identificador
             |menos entero
             |menos decimal;