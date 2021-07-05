
%{
  const {AsignacionOpt} = require('../clases/InstruccionOptimizacion/AsignacionOpt');
  const {Etiqueta} = require('../clases/InstruccionOptimizacion/Etiqueta');
  const {FuncionOpt} = require('../clases/InstruccionOptimizacion/FuncionOpt');
  const {IfOpt} = require('../clases/InstruccionOptimizacion/IfOpt');
  const {Llamada} = require('../clases/InstruccionOptimizacion/Llamada');
  const {PrintOpt} = require('../clases/InstruccionOptimizacion/PrintOpt');
  const {ReturnOpt} = require('../clases/InstruccionOptimizacion/ReturnOpt');
  const {Salto} = require('../clases/InstruccionOptimizacion/Salto');
%}

%lex

%options case-insensitive

%%
\s+                   /* skip whitespace */
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"include"                   return 'INCLUDE';

"double"                    return 'DOUBLE';
"int"                       return 'INT';
"main"                      return 'MAIN';
"char"                      return 'CHAR';
"void"                      return 'VOID';
"printf"                    return 'PRINTF';
"return"                    return 'RETURN';
"if"                        return 'IF';
"goto"                      return 'GOTO';
"fmod"                      return 'FMOD';

"<="                  return 'MEI';
">="                  return 'MAI';
"=="                  return 'II';
"!="                  return 'DIF';

"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"("                   return '(';
")"                   return ')';
"{"                   return '{';
"}"                   return '}';
"["                   return '[';
"]"                   return ']';
";"                   return ';';
":"                   return ':';
"."                   return '.';
","                   return ',';
"="                   return '=';

"<"                   return '<';
">"                   return '>';

"#"                   return '#';


\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_COMILLA'; }
[0-9]+("."[0-9]+)?\b  	return 'NUMBER';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';

<<EOF>>		          return 'EOF';
.   {
        //console.error('Error léxico detectado: ' + yytext + ', en la linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);
}

/lex

%start init

%%

init
    :   l_instr EOF                             { $$ = $1; return $$;}
    |   EOF                                     { $$ = null;}
;

l_instr
    :   encabezado l_funcion                    { $$ = [$1, $2];}
;

encabezado
    :   l_importacion l_declaracion             {$$ = $1 + '\n' + $2 + '\n';}
;

l_importacion
    :   l_importacion '#' INCLUDE '<' IDENTIFICADOR '.' IDENTIFICADOR '>'     {$$ = $1 + '#' + $3 + ' <' + $5 + '.' + $7 + '>\n';}
    |   '#' INCLUDE '<' IDENTIFICADOR '.' IDENTIFICADOR '>'                   {$$ = '#' + $2 + ' <' + $4 + '.' + $6 + '>\n';}
;

l_declaracion
    :   l_declaracion declaracion                                             {$$ = $1 + $2;}
    |   declaracion                                                           {$$ = $1;}
;

declaracion
    :   DOUBLE IDENTIFICADOR '[' NUMBER ']' ';'                               {$$ = $1 + ' ' + $2 + '[' + $4 + '];\n';}
    |   DOUBLE l_dec ';'                                                      {$$ = $1 + ' ' + $2 + ';\n';}
    |  INT l_dec ';'   /*Nueva Produccion*/                                   {$$ = $1 + ' ' + $2 + ';\n';}
;


l_dec
    :   l_dec ',' IDENTIFICADOR                                               {$$ = $1 + ', ' + $3;}
    |   IDENTIFICADOR                                                         {$$ = $1;}
;

l_funcion
    :   l_funcion VOID IDENTIFICADOR '(' ')' '{' l_instruccion '}'            {$$ = $1; $$.push(new FuncionOpt($3, $7, @1.first_line));}
    |   VOID IDENTIFICADOR '(' ')' '{' l_instruccion '}'                      {$$ = [new FuncionOpt($2, $6, @1.first_line)];}
    |   l_funcion INT MAIN '(' ')' '{' l_instruccion '}'                      {$$ = $1; $$.push(new FuncionOpt($3, $7, @1.first_line));}
;

l_instruccion
    :   l_instruccion instruccion           { $$ = $1; $$.push($2);}
    |   instruccion                         { $$ = [$1]; }
;

instruccion
    :   asignacion                                                {$$ = $1;}
    |   if                                                        {$$ = $1;}
    |   salto ';'                                                 {$$ = new Salto($1, @1.first_line);}
    |   IDENTIFICADOR ':'                                         {$$ = new Etiqueta($1, @1.first_line);}
    |   IDENTIFICADOR '(' ')' ';'                                 {$$ = new Llamada($1, @1.first_line);}
    |   PRINTF '(' CADENA ')' ';'                                 {$$ = new PrintOpt($3, null, @1.first_line);}
    |   PRINTF '(' CADENA ',' operando ')' ';'  /*SE MODIFICO*/   {$$ = new PrintOpt($3, $5 , @1.first_line);}
    |   RETURN NUMBER ';'                                         {$$ = new ReturnOpt(@1.first_line);}        
    |   RETURN ';'                                                {$$ = new ReturnOpt(@1.first_line);}
;

asignacion
    :   operando '=' operando opr operando ';'                    {$$ = new AsignacionOpt($1, $3, $4, $5, @1.first_line);}
    |   operando '=' operando ';'                                 {$$ = new AsignacionOpt($1, $3, null, null, @1.first_line);}
;

operando
    :   IDENTIFICADOR                                             {$$ = $1;}
    |   IDENTIFICADOR '[' NUMBER ']'                              {$$ = $1 + '[' + $3 + ']';}
    |   IDENTIFICADOR '[' IDENTIFICADOR ']' /*Nueva producc*/     {$$ = $1 + '[' + $3 + ']';}
    |   IDENTIFICADOR '[' '(' cast ')' IDENTIFICADOR ']'          {$$ = $1 + '[' + '(' + $4 + ')' + $6 + ']';}
    |   '(' cast ')' IDENTIFICADOR                                {$$ = '(' + $2 + ')' + $4;}
    |   FMOD '(' operando ',' operando ')'  /*Se quita casteo*/   {$$ = $1 + '(' + $3 + ', ' + $5 + ')';}
    |   NUMBER                                                    {$$ = $1;}
    |   '-' NUMBER                                                {$$ = '-' + $2;}
;

opr
    :   '+' {$$ = '+';}
    |   '-' {$$ = '-';}
    |   '*' {$$ = '*';}
    |   '/' {$$ = '/';}
;

if
    :   IF '(' operando relacional operando ')' salto ';'         {$$ = new IfOpt($3, $4, $5, $7, @1.first_line);}
;

salto
    :   GOTO IDENTIFICADOR    {$$ = $2;}
;

relacional
    :   '<' {$$ = '<';}
    |   '>' {$$ = '>';}
    |   MEI {$$ = $1;}
    |   MAI {$$ = $1;}
    |   II  {$$ = $1;}
    |   DIF {$$ = $1;}
;

cast
    :   INT     {$$ = $1;}
    |   CHAR    {$$ = $1;}
    |   DOUBLE  {$$ = $1;}
;
