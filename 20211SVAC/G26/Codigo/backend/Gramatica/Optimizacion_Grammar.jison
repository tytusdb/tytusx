/**
 * Segundo Proyecto OLC2 - Grupo 26
 */

/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const {Include} = require("../Optimizacion/Declaraciones3D/Include");
    const {Main } = require("../Optimizacion/Declaraciones3D/Main");
    const {Metodo} = require("../Optimizacion/Declaraciones3D/Metodo");
    const { Variable } = require("../Optimizacion/Declaraciones3D/Variable");
    const { TipoDeclaracion3D} = require("../Optimizacion/Declaraciones3D/Declaracion3D");
    const {Operacion3D} = require("../Optimizacion/Expresiones3D/Operacion3D");
    const{TipoOperacion3D} = require("../Optimizacion/Expresiones3D/Operacion3D");
    const { Primitiva3D} = require("../Optimizacion/Expresiones3D/Primitiva3D");
    const{TipoPrim3D} = require("../Optimizacion/Expresiones3D/Primitiva3D");
    const{TipoExpresion3D} = require("../Optimizacion/Expresiones3D/Expresion3D");

    const{TipoInstruccion3D} = require("../Optimizacion/Instrucciones3D/Instruccion3D");    
    const {Asignacion3D } = require("../Optimizacion/Instrucciones3D/Asignacion3D");
    const {Llamada3D } = require("../Optimizacion/Instrucciones3D/Llamada3D");
    const {Etiqueta3D } = require("../Optimizacion/Instrucciones3D/Etiqueta3D");
    const {Goto3D } = require("../Optimizacion/Instrucciones3D/Goto3D");
    const {If3D } = require("../Optimizacion/Instrucciones3D/If3D");
    const {Printf3D} = require("../Optimizacion/Instrucciones3D/Printf3D");
    const {Return3D} = require("../Optimizacion/Instrucciones3D/Return3D");

    const errores = require('../Global/ListaError');

    let codigo3D = "";
%}
/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'


%s                                  comment
%%



"//".*                              
\s+                                 /* skip whitespace */
"/*"                              this.begin('comment');
<comment>"*/"                      this.popState();
<comment>.                          /* skip comment content*/

".h"                                return "ext_h";
"["                                 return "corA";
"]"                                 return "corC";
"{"                                 return "llaveA";
"}"                                 return "llaveC";
"("                                 return "parA";
")"                                 return "parC";
":"                                 return "dospuntos";
";"                                 return "puntocoma";
","                                 return "coma";
">="                                return 'gte';
"<="                                return 'lte';
"<"                                 return 'lt';
">"                                 return 'gt';
"=="                                return 'eq';
"="                                 return 'asig';
"!="                                return "neq";
"/"                                 return 'div';
"%"                                 return 'mod';
"*"                                 return 'por';
"+"                                 return "mas";
"-"                                 return "menos";

/* Palabras Reservadas */
"main"                              return "main";
"return"                            return "return";
"void"                              return "void";
"float"                             return "float";
"printf"                            return "printf";
"char"                              return "char";
"int"                               return "int";
"double"                            return "double";
"if"                                return "if";
"goto"                              return "goto";
"#include"                          return "include";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*          return 'identifier';

{stringliteral}                     return 'cadena'
{charliteral}                       return 'cadena2'

[ \t\r\n\f]                         %{ %}

<<EOF>>                             return 'EOF'
//error lexico
.                                   {
                                        console.log("Error Lexico: "+yytext)
                                    }

/lex


%left 'lt' 'lte' 'gt' 'gte' 'eq' 'neq'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left UMINUS

//PRODUCCION INICIAL
%start START
%%

START: DECLARACIONES EOF { $$ = $1; return $$;}
    ;

DECLARACIONES: DECLARACIONES DECLARACION { $1.push($2); $$ = $1;}
            | DECLARACION                 { $$ = [$1];}
            ;

DECLARACION: include lt identifier ext_h gt 
            {   
                codigo3D = $1+$2+$3+$4+$5;
                $$ = new Include(TipoDeclaracion3D.INCLUDE, codigo3D, @1.first_line, @1.first_column)
            }
            | DATATYPE identifier corA IntegerLiteral corC puntocoma 
            {
                codigo3D = $1+" "+$2+$3+$4+$5+$6
                $$ = new Variable(TipoDeclaracion3D.VARIABLE, codigo3D, @1.first_line, @1.first_column)
            }
            | DATATYPE LISTAIDS puntocoma 
            { 
                let firstId = $2[0];
                codigo3D = $1+" "+ firstId
                for(let i = 1; i < $2.length; i++){
                    codigo3D += ", "+$2[i];
                }
                codigo3D += ";"
                $$ = new Variable(TipoDeclaracion3D.VARIABLE,codigo3D, @1.first_line, @1.first_column)                
            }
            | void main parA parC llaveA LISTAINSTRUCCIONES llaveC 
            {
                codigo3D = $1+$2+$3+$4+$5
                $$ = new Main(TipoDeclaracion3D.MAIN, $6, codigo3D, @1.first_line, @1.first_column)            
            }
            | void identifier parA parC llaveA LISTAINSTRUCCIONES llaveC
            {
                $$ = new Metodo(TipoDeclaracion3D.METODO, $6, $2, @1.first_line, @1.first_column)
            }
            ;

LISTAIDS: LISTAIDS coma identifier { $1.push($3); $$ = $1;}
        | identifier            { $$ = [$1];}
;

DATATYPE: int           { $$ = $1;}
        | double        { $$ = $1;}
        | float         { $$ = $1;}
        | char          { $$ = $1;}
;

LISTAINSTRUCCIONES: LISTAINSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1;}
                    | INSTRUCCION               { $$ = [$1];}
;

INSTRUCCION: identifier asig EXPRESION puntocoma 
            {   
                codigo3D = $1+" "+$2+" "+$3.codigo3D+$4;
                $$ = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, $1, $3, codigo3D, @1.first_line, @1.first_column);
            }
            | identifier asig identifier corA parA DATATYPE parC PRIMITIVA corC puntocoma 
            { 
                codigo3D = $1+" "+$2+" "+$3+$4+$5+$6+$7+$8.codigo3D+$9+$10;
                $$ = new Asignacion3D(TipoInstruccion3D.ASIGARREGLO, $1, $8, codigo3D, @1.first_line, @1.first_column);
            }
            | identifier corA parA DATATYPE parC PRIMITIVA corC asig EXPRESION puntocoma 
            { 
                    codigo3D = $1+$2+$3+$4+$5+$6.codigo3D+$7+" "+$8+" "+$9.codigo3D+$10;
                $$ = new Asignacion3D(TipoInstruccion3D.ARREGLOASIG, $1, $9, codigo3D, @1.first_line, @1.first_column);
            }
            | identifier dospuntos
            { 
                $$ = new Etiqueta3D(TipoInstruccion3D.ETIQUETA, $1, $1+$2, @1.first_line, @1.first_column);
            }
            | goto identifier puntocoma 
            {   
                 $$ = new Goto3D(TipoInstruccion3D.GOTO, $2, $1+" "+$2+$3, @1.first_line, @1.first_column);
            }
            | identifier parA parC puntocoma 
            { 
                codigo3D = $1+$2+$3+$4;
                $$ = new Llamada3D(TipoInstruccion3D.LLAMADA, $1, codigo3D, @1.first_line, @1.first_column);
            }
            | printf parA cadena coma parA DATATYPE parC PRIMITIVA parC puntocoma 
            { 
                codigo3D = $1+$2+$3+$4+" "+$5+$6+$7+$8.codigo3D+$9+$10;
                $$ = new Printf3D(TipoInstruccion3D.PRINTF, codigo3D, @1.first_line, @1.first_column);
            }
            | if parA EXPRESION parC goto identifier puntocoma 
            {   
                codigo3D = $1+$2+$3.codigo3D+$4+" "+$5+" "+$6+$7;
            $$ = new If3D(TipoInstruccion3D.IF, $3, new Goto3D(TipoInstruccion3D.GOTO, $6,$5+" "+$6+$7),codigo3D, @1.first_line, @1.first_column);
            }
            | return puntocoma { $$ = new Return3D(TipoInstruccion3D.RETURN, $1+$2, @1.first_line, @1.first_column);}
;

EXPRESION: PRIMITIVA { $$ = $1;}
        | OPERACION { $$ = $1;}
;

OPERACION: EXPRESION mas EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.SUMA, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }
        | EXPRESION menos EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.RESTA, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION por EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MULTIPLICACION, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }                
        | EXPRESION div EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.DIVISION, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION mod EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MOD, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION lt EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MENORQUE, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION gt EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MAYORQUE, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION lte EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MENORIGUALQUE, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION gte EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MAYORIGUALQUE, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }        
        | EXPRESION eq EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.IGUALIGUAL, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }       
        | EXPRESION neq EXPRESION
        { 
        $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.DIFERENTEQUE, $1, $3, $1.codigo3D+" "+$2+" "+$3.codigo3D, @1.first_line, @1.first_column)
        }                   
        | menos EXPRESION %prec UMINUS 
                { 
                $$ = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.MENOSUNARIO, $2, null,  "-"+$2.codigo3D, @1.first_line, @1.first_column);
                }        
;

PRIMITIVA: identifier
                { 
                $$ = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.IDENTIFIER, $1, $1, @1.first_line, @1.first_column);
                }
        | IntegerLiteral 
                { 
                $$ = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.INTEGER, +$1, $1, @1.first_line, @1.first_column);
                }
        | DoubleLiteral 
                { 
                $$ = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.DOUBLE, +$1, $1, @1.first_line, @1.first_column);
                }
;
