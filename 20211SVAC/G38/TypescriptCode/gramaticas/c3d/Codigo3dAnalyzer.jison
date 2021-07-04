
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%s                                  comment
%%
"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                   /* skip whitespace */

/*WORD RESERVED*/
'#include'                  return 'include'
'stdio.h'                   return 'stdio_t'
'math.h'                    return 'math_t'
'goto'                      return 'goto';
'Printf'                    return 'Printf';
'printf'                    return 'Printf';
'void'                      return 'void';
'float'                     return 'float_t';
'double'                    return 'double_t';
'int'                       return 'int_t';
'Return'                    return 'Return_t';
'if'                        return 'if_t';

":"                         return 'colon';
";"                         return 'semicolon';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"!="                        return 'nequal';
"=="                        return 'equal_equal';
"="                         return 'equal';

"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchetes';
"]"                         return 'rcorchetes';
"{"                         return 'lllave';
"}"                         return 'rllave';

","                         return 'coma';

"\"%c\""                        return 'print_char';
"\"%d\""                        return 'print_int';
"\"%f\""                        return 'print_decimal';


/*REGULAR EXPRESSIONS*/
"“"[^\"\n]*"”" 				return 'str'
"\""[^\"\n]*"\"" 			return 'str'
"'"[^''\n]*"'" 				return 'str'
"‘"[^''\n]*"’" 				return 'str'
"`"[^''\n]*"`" 				return 'str'

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';
"T"[0-9]+               			return 'temporal'
"t"[0-9]+			                return 'temporal'
[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]|"_"|"-")*			return 'identifier'

.                                   {
                                        ListaErrores.AgregarErrorC3D(new TokenError(TipoError.Lexico,"No se reconocio el token "+yytext,yylloc.first_line,yylloc.first_column));
                                    }
<<EOF>>               return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'lparen' 'rparen'
%left LISTA_NUM

%start S

%% /* language grammar */

S   :  SENTENCIAS EOF { $$ = new Optimizador($1); return $$; }
    ;

SENTENCIAS : SENTENCIAS SENTENCIA { $$ = $1; $$.push($2); }
           | SENTENCIA {  $$ = []; $$.push($1); }
           ;

SENTENCIA  :  ASIGNACION { $$ = $1; }
            | DECLARACION { $$ = $1; }
            | IMPRESION { $$ = $1; }
            | DECLARACION_METODO { $$ = $1; }
            | DECLARAR_ESQUELETO_METODO { $$ = $1; }
            | ETIQUETA { $$ = $1; }
            | SALTO_CONDICIONAL { $$ = $1; }
            | SALTO_INCONDICIONAL { $$ = $1; }
            | IMPORT { $$ = $1; }
            | error
            {
                  ListaErrores.AgregarErrorC3D(new TokenError(TipoError.Sintactico,"No se esperaba: "+yytext,@1.first_line,@1.first_column));
            }
            ;

IMPORT :  include lt stdio_t gt { $$ = new NodoComplemento($1+" "+$2+$3+$4,@1.first_line,@1.first_column); }
        |  include lt math_t gt { $$ = new NodoComplemento($1+" "+$2+$3+$4,@1.first_line,@1.first_column); }
        ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1; $$.push($2); }
              | INSTRUCCION { $$ = []; $$.push($1); }
              ;

INSTRUCCION :  ASIGNACION { $$ = $1; }
            |  IMPRESION { $$ = $1; }
            |  LLAMADA_METODO { $$ = $1; }
            |  RETORNO { $$ = $1; }
            |  ETIQUETA { $$ = $1; }
            |  SALTO_CONDICIONAL { $$ = $1; }
            |  SALTO_INCONDICIONAL { $$ = $1; }
            |  error
            {
                  ListaErrores.AgregarErrorC3D(new TokenError(TipoError.Sintactico,"No se esperaba: "+yytext,@1.first_line,@1.first_column));
            }
            ;

ETIQUETA : identifier colon { $$ = new EtiquetaC3D($1,@1.first_line,@1.first_column); }
        ;

SALTO_CONDICIONAL : if_t lparen EXPRESION_RELACIONAL rparen goto identifier semicolon { $$ = new  SaltoCondicionalC3D($3,$6,@1.first_line,@1.first_column);}
                    ;

SALTO_INCONDICIONAL : goto identifier semicolon  { $$ = new  SaltoC3D($2,@1.first_line,@1.first_column);}
                    ;

DECLARACION_METODO : void identifier lparen rparen lllave INSTRUCCIONES rllave
                    { $$ =  new DeclaracionMetodoC3D($2, $6, @1.first_line, @1.first_column); }
                    ;

LLAMADA_METODO: identifier lparen rparen semicolon { $$ = new NodoComplemento($1+$2+$3+$4,@1.first_line,@1.first_column); }
                ;

DECLARAR_ESQUELETO_METODO : void identifier lparen rparen semicolon { $$ = new NodoComplemento($1+" "+$2+$3+$4+$5,@1.first_line,@1.first_column); }
                          ;

IMPRESION: Printf lparen TIPO_IMPRESION coma CAST_VALUE PRIMITIVA rparen semicolon { $$ = new NodoComplemento($1+$2+$3+$4+"("+$5+")"+$6.toString()+$7+$8,@1.first_line,@1.first_column); }
         | Printf lparen TIPO_IMPRESION coma PRIMITIVA rparen semicolon { $$ = new NodoComplemento($1+$2+$3+$4+$5.toString()+$6+$7,@1.first_line,@1.first_column); }
         | Printf lparen str rparen semicolon { $$ = new NodoComplemento($1+$2+$3+$4+$5,@1.first_line,@1.first_column); }
          ;

TIPO_IMPRESION: print_char { $$ = $1; }
              | print_int  { $$ = $1; }
              | print_decimal { $$=$1; }
              ;

CAST_VALUE : lparen TIPO_DATO rparen { $$ = $2; }
           ;

TIPO_DATO : int_t { $$ = $1; }
          | float_t { $$ = $1; }
          | double_t { $$ = $1; }
          ;

DECLARACION : TIPO_DATO LISTA_IDS  equal EXPRESION semicolon  { $$ = new NodoComplemento($1+" "+$2+$3+$4.toString()+$5,@1.first_line,@1.first_column); }
            | TIPO_DATO LISTA_IDS semicolon  { $$ = new NodoComplemento($1+" "+$2+$3,@1.first_line,@1.first_column); }
            | TIPO_DATO identifier lcorchetes PRIMITIVA rcorchetes semicolon  { $$ = new NodoComplemento($1+" "+$2+$3+$4.toString()+$5+$6,@1.first_line,@1.first_column); }
          ;

LISTA_IDS : LISTA_IDS coma temporal { $$ = $1 + $2 + $3; }
          | LISTA_IDS coma identifier { $$ = $1 + $2 + $3; }
          | temporal { $$ = $1; }
          | identifier { $$ = $1; }
          ;

ASIGNACION  : temporal  equal EXPRESION semicolon
              { $$ = new AsignacionC3D(TipoValor.temporal,$1,$3,@1.first_line,@1.first_column); }
            | identifier  equal EXPRESION semicolon
              { $$ = new AsignacionC3D(TipoValor.identifier,$1,$3,@1.first_line,@1.first_column); }
            | identifier lcorchetes PRIMITIVA rcorchetes  equal EXPRESION semicolon
              { $$ = new AsignacionC3D(TipoValor.arreglo,$1,$6,@1.first_line,@1.first_column);
                $$.valorAcceso = $3;
              }
            | identifier lcorchetes CAST_VALUE PRIMITIVA rcorchetes  equal EXPRESION semicolon
              { $$ = new AsignacionC3D(TipoValor.arreglo,$1,$7,@1.first_line,@1.first_column);
                $$.valorCasteo = $3;
                $$.valorAcceso = $4;
              }
            ;

RETORNO : Return_t semicolon  { $$ = new NodoComplemento($1+$2,@1.first_line,@1.first_column); }
         ;


EXPRESION:  EXPRESION_NUMERICA { $$ = $1; }
          | PRIMITIVA_WITH_MINUS {  $$ = $1; }
          | lparen EXPRESION rparen { $$ = $2; }
          | identifier lcorchetes PRIMITIVA rcorchetes
          { $$ = new Primitiva(TipoValor.arreglo,$1);
            $$.valorAcceso = $3;
          }
          | identifier lcorchetes CAST_VALUE  PRIMITIVA rcorchetes
          { $$ = new Primitiva(TipoValor.arreglo,$1);
            $$.valorCasteo = $3;
            $$.valorAcceso = $4;
          }
          ;

EXPRESION_RELACIONAL: PRIMITIVA_WITH_MINUS lt PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.lt,$1,$3,@2.first_line,@2.first_column); }
                    | PRIMITIVA_WITH_MINUS lte PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.lte,$1,$3,@2.first_line,@2.first_column); }
                    | PRIMITIVA_WITH_MINUS gt PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.gt,$1,$3,@2.first_line,@2.first_column); }
                    | PRIMITIVA_WITH_MINUS gte PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.gte,$1,$3,@2.first_line,@2.first_column); }
                    | PRIMITIVA_WITH_MINUS equal_equal PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.equal_equal,$1,$3,@2.first_line,@2.first_column); }
                    | PRIMITIVA_WITH_MINUS nequal PRIMITIVA_WITH_MINUS { $$ = new ExpresionRelacional(TipoRelacional.nequal,$1,$3,@2.first_line,@2.first_column); }
                    ;


EXPRESION_NUMERICA: PRIMITIVA_WITH_MINUS plus PRIMITIVA_WITH_MINUS
                    {  $$ = new ExpresionNumerica(TipoNumerico.suma,$1,$3,@2.first_line,@2.first_column); }
                  | PRIMITIVA_WITH_MINUS minus PRIMITIVA_WITH_MINUS
                    {  $$ = new ExpresionNumerica(TipoNumerico.resta,$1,$3,@2.first_line,@2.first_column); }
                  | PRIMITIVA_WITH_MINUS times PRIMITIVA_WITH_MINUS
                    {  $$ = new ExpresionNumerica(TipoNumerico.multiplicacion,$1,$3,@2.first_line,@2.first_column); }
                  | PRIMITIVA_WITH_MINUS div PRIMITIVA_WITH_MINUS
                    {  $$ = new ExpresionNumerica(TipoNumerico.division,$1,$3,@2.first_line,@2.first_column); }
                  | PRIMITIVA_WITH_MINUS mod PRIMITIVA_WITH_MINUS
                    {  $$ = new ExpresionNumerica(TipoNumerico.modulo,$1,$3,@2.first_line,@2.first_column); }
                  ;

PRIMITIVA_WITH_MINUS: PRIMITIVA { $$ = $1;  }
                    | minus PRIMITIVA { $$ = $2; $$.negativo = true; }
                    ;

PRIMITIVA: temporal { $$ = new Primitiva(TipoValor.temporal,$1,@1.first_line,@1.first_column); }
         | identifier { $$ = new Primitiva(TipoValor.identifier,$1,@1.first_line,@1.first_column); }
         | DoubleLiteral { $$ = new Primitiva(TipoValor.double,Number($1),@1.first_line,@1.first_column); }
         | IntegerLiteral { $$ = new Primitiva(TipoValor.integer,Number($1),@1.first_line,@1.first_column); }
         ;
