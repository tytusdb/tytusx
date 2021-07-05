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

"main"                              return 'main';
"return"                            return 'return';
"void"                              return 'void';
"float"                             return 'float';
"printf"                            return 'printf';
"char"                              return 'char';
"int"                               return 'int';
"double"                            return 'double';
"if"                                return 'if';
"goto"                              return 'goto';
"#include"                          return 'include';
".h"                                return 'ext_h';
"{"                                 return '{';
"}"                                 return '}';
"("                                 return '(';
")"                                 return ')';
"["                                 return '[';
"]"                                 return ']';
";"                                 return 'semicolon';
","                                 return ',';
":"                                 return ':';
"<="                                return '<=';
">="                                return '>=';
">"                                 return '>';
"<"                                 return '<';
"=="                                return 'igualigual';
"="                                 return 'igual';
"!="                                return "!=";
"%"                                 return 'mod';
"*"                                 return 'por';
"/"                                 return 'div';
"+"                                 return 'mas';
"-"                                 return 'menos';


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

//SECCION DE IMPORTS
%{
    const { TipoInstruccion, TipoOperador, TipoParametro, TipoDato } = require("../Estructuras/tipificacion.js");
    const { Declaracion3D } = require("../Estructuras/C3D/Declaracion3D.js");
    const { OperacionC3D, Simbolo } = require("../Estructuras/C3D/Operacion3D.js");   
    const { Instruccion3D, Asignacion, AsignacionArray, Etiqueta } = require("../Estructuras/C3D/Instruccion3D.js");  
%}

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left  '>=' '<=' '>' '<'  'igualigual' '!='
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left UMINUS

//PRODUCCION INICIAL
%start expressions
%%

expressions: LDECLARACION EOF { $$ = $1; return $$;}
    ;
LDECLARACION: LDECLARACION DECLARACION { $1.push($2); $$ = $1;}
            | DECLARACION                 { $$ = [$1];}
            ;

DECLARACION: include '<' identifier ext_h '>' 
            {   
                $$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + $2 + $3 + $4 + $5)
            }
            | TIPO_DATO identifier '[' IntegerLiteral ']' semicolon 
            {
                $$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + ' ' + $2 + $3 + $4 + $5 + $6)
            }
            | TIPO_DATO L_IDS semicolon 
            { 
                var codigo = $1 + ' ';
                for(var i = 0; i<$2.length;i++){
                    if(i == 0){
                        codigo += $2[i];
                    }else{
                        codigo += ',' + $2[i];
                    }
                }
                $$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, codigo + ';')              
            }
            | void main '(' ')' '{' L_INSTRUCCION '}' 
            {
                $$ = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1 + ' ' + $2 + $3 + $4 + $5)   
            }
            | void identifier '(' ')' '{' L_INSTRUCCION '}'
            {
                 $$ = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1+ ' ' + $2 + $3 + $4 + $5)   
            }
            ;

L_IDS: L_IDS ',' identifier { $1.push($3); $$ = $1;}
        | identifier            { $$ = [$1];}
;

TIPO_DATO: int           { $$ = $1;}
        | double        { $$ = $1;}
        | float         { $$ = $1;}
        | char          { $$ = $1;}
;

L_INSTRUCCION: L_INSTRUCCION INSTRUCCION { $1.push($2); $$ = $1;}
                    | INSTRUCCION               { $$ = [$1];}
;


INSTRUCCION: identifier igual EXPRESION semicolon 
            {   
                $$ = new Instruccion3D(TipoInstruccion.Asignacion, new Asignacion(@1.first_line, @1.first_column,$1,$3, $1 + ' = ' + $3.C3D + $4));
            }
            | identifier igual identifier '[' '(' TIPO_DATO ')' PRIMITIVA ']' semicolon 
            { 
                $$ = new Instruccion3D(TipoInstruccion.AsignacionArray, new AsignacionArray(@1.first_line, @1.first_column,$1,$8, $1 + ' = ' + $3+ '[(' + $6 + ')' + $8.C3D + '];'));
            }
            | identifier '[' '(' TIPO_DATO ')' PRIMITIVA ']' igual EXPRESION semicolon 
            { 
                $$ = new Instruccion3D(TipoInstruccion.ArrayAsignacion, 
                new Asignacion(@1.first_line, @1.first_column,$1,$9, $1 + '[(' + $4 + ')' + $6.C3D + '] = ' + $9.C3D + $10));
            }
            | identifier ':'
            { 
                $$ = new Instruccion3D(TipoInstruccion.Etiqueta, new Etiqueta(@1.first_line, @1.first_column,$1, $1 + $2));
            }
            | goto identifier semicolon 
            {   
                $$ = new Instruccion3D(TipoInstruccion.GoTo, new Etiqueta(@1.first_line, @1.first_column, $2, 'goto ' + $2 + $3));
            }
            | identifier '(' ')' semicolon 
            { 
                $$ = new Instruccion3D(TipoInstruccion.Llamada, new Etiqueta(@1.first_line, @1.first_column, $1,$1 + '();'));
            }
            | printf '(' cadena ',' '(' TIPO_DATO ')' PRIMITIVA ')' semicolon 
            { 
                $$ = new Instruccion3D(TipoInstruccion.Print, new Etiqueta(@1.first_line, @1.first_column, '', $1 + $2 + $3 + $4 + ' ' + $5 + $6 + $7 + $8.C3D + $9 + $10));
            }
            | if '(' EXPRESION ')' goto identifier semicolon 
            {   
                $$ = new Instruccion3D(TipoInstruccion.If, new Asignacion(@1.first_line, @1.first_column,$6,$3, 'if( ' + $3.C3D + ') goto ' + $6 + $7));
            }
            | return semicolon { 
                $$ = new Instruccion3D(TipoInstruccion.Return, new Etiqueta(@1.first_line, @1.first_column, '','return;'));
            }
;

EXPRESION: PRIMITIVA { $$ = $1;}
        | OPERACION { $$ = $1;}
;

OPERACION: EXPRESION mas EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mas, $1, $3,  $1.C3D + ' + ' + $3.C3D);}
        | EXPRESION menos EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menos, $1, $3,  $1.C3D + ' - ' + $3.C3D);}  
        | EXPRESION mod EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mod, $1, $3,  $1.C3D + ' % ' + $3.C3D);}   
        | EXPRESION por EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Por, $1, $3,  $1.C3D + ' * ' + $3.C3D);}
        | EXPRESION div EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Div, $1, $3,  $1.C3D + ' / ' + $3.C3D);}    
        | EXPRESION igualigual EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Igual, $1, $3,  $1.C3D + ' == ' + $3.C3D);}  
        | EXPRESION '!=' EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $1, $3,  $1.C3D + ' != ' + $3.C3D);}   
        | EXPRESION '<=' EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MenorIgual, $1, $3,  $1.C3D + ' <= ' + $3.C3D);} 
        | EXPRESION '>=' EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MayorIgual, $1, $3,  $1.C3D + ' >= ' + $3.C3D);} 
        | EXPRESION '<' EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menor, $1, $3,  $1.C3D + ' < ' + $3.C3D);}    
        | EXPRESION '>' EXPRESION { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mayor, $1, $3,  $1.C3D + ' > ' + $3.C3D);}         
        | menos EXPRESION %prec UMINUS { $$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $2, null, '- ' + $2.C3D);} 
;

PRIMITIVA: '(' TIPO_DATO ')' identifier { $$ = new Simbolo(@1.first_line, @1.first_column, $4, $1+$2+$3+$4, TipoDato.Primitivo, TipoParametro.Variable );}
        |  identifier { $$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Variable );}
        | IntegerLiteral { $$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Entero );}
        | DoubleLiteral { $$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Decimal );}
;
