%{


%}
%lex
%options case-insensitive
idi ([a-zA-Z_][_a-zA-Z0-9ñÑ]*)
comment ("#"[^\r\n]* [^\r\n])
%%
"var"       return 'tVar';
"heap"      return 'tHeap';
"stack"     return 'tStack';
"goto"      return 'tGoto';
"proc"      return 'tProc';
"begin"     return 'tBegin';
"end"     	return 'tEnd';
"call"      return 'tCall';
"print"     return 'tPrint';
"if"        return 'tIf';
"\"%c\""		return 'tCaracter';
"\"%i\""		return 'tEntero';
"\"%d\""		return 'tDecimal';

";"			return 'tPYC';
":"			return 'tDosPuntos';
","			return 'tComa';
"("			return 'tParA';
")"			return 'tParC';
"["			return 'tCorcheteA';
"]"			return 'tCorcheteC';

"+"			return 'tMas';
"-"			return 'tMenos';
"*"			return 'tMulti';
"/"			return 'tDivision';
"%"			return 'tModulo';

"=="		return 'tIgualdad';
"="			return 'tIgual';

"<>"		return 'tDesigualdad';
"<=" 		return 'tMenorIgual';
"<" 		return 'tMenor';
">="		return 'tMayorIgual';
">"			return 'tMayor';

{idi}		return 'ID';

/* Espacios en blanco */
[ \r\t]+			{}
\n					{}
[0-9]+("."[0-9]+) return 'DECIMAL';
[0-9]+			  return 'ENTERO';
{comment} {} // comentario simple línea
<<EOF>>			  return 'EOF';
.	{ errores.push(new ErrorAnalisis(TIPO_ERROR.LEXICO,yytext,yylloc.first_line, yylloc.first_column)); }
/lex

%left     'tIgualdad' 'tDesigualdad'
%nonassoc 'tMenor' 'tMenorIgual' 'tMayor' 'tMayorIgual'
%left     'tMas' 'tMenos'
%left     'tMulti' 'tDivision' 'tModulo'
%right    UMENOS
%right    'tIgual'

%start ini

%%

ini: inicio EOF {return new Tree($1, errores);}
;

inicio
	: sentencias {$$=$1;}
	| 			 {$$=[];}
;

sentencias
	: sentencias sentencia { $$ = $1; $$.push($2); }
	| sentencia	           { $$ = [$1]; }
;

sentencia
	: declaracion tPYC {$$=$1}
	| asignacion tPYC  {$$=$1;}
	| tPrint tParA tipo_print tComa valor tParC tPYC
	{$$=new Print(@1.first_line, @1.first_column,$1+$2+$3+$4+$5.contenido.toString()+$6);}
	| tGoto ID tPYC
	{$$=new Goto(@1.first_line, @1.first_column,$2);}
	| tIf tParA valor op_rel valor tParC tGoto ID tPYC
	{$$=new If(@1.first_line, @1.first_column,$4,$3,$5,$8);}
	| tCall ID tPYC
	{$$=new LlamadaFuncion(@1.first_line, @1.first_column,$1+' '+$2);}
	| ID tDosPuntos
	{$$=new Etiqueta(@1.first_line, @1.first_column,$1);}
	| tProc ID tBegin
	{$$=new Funcion(@1.first_line, @1.first_column, $2);}
	| tEnd
	{$$=new Funcion(@1.first_line, @1.first_column);}
	/*| error tPYC
	{ 
		errores.push(new ErrorAnalisis(TIPO_ERROR.SINTACTICO,'No se esperaba '+yy.lexer.yytext, yy.lexer.yylineno, yy.lexer.yylloc.first_column));
	}*/
;

tipo_print
	: tCaracter {$$=$1;}
	| tEntero   {$$=$1;}
	| tDecimal  {$$=$1;}
;

op_rel
	: tIgualdad	   {$$=$1;}
	| tDesigualdad {$$=$1;}
	| tMenorIgual  {$$=$1;}
	| tMenor 	   {$$=$1;}
	| tMayorIgual  {$$=$1;}
	| tMayor	   {$$=$1;}
;

declaracion
	: tVar lista_ids
	{$$=new Declaracion(@1.first_line, @1.first_column,$1+' '+$2);}
	| tVar tStack tCorcheteA tCorcheteC
	{$$=new Declaracion(@1.first_line, @1.first_column,$1+' '+$2+' '+$3+$4);}
	| tVar tHeap tCorcheteA tCorcheteC
	{$$=new Declaracion(@1.first_line, @1.first_column,$1+' '+$2+' '+$3+$4);}
	| tVar ID tIgual valor 
	{$$=new Declaracion(@1.first_line, @1.first_column,$1+' '+$2+' '+$3+$4.contenido.toString());}
	// Nunca pasa: | tVar ID tIgual exp (var t5=3+2; )
;
lista_ids
	: lista_ids tComa ID {$$=$1; $$+=$2+$3;}
	| ID {$$=$1;}
;

asignacion
	: ID tIgual exp
	{$$=new Asignacion(@1.first_line, @1.first_column); $$.simple($1,$3);}
	| ID tIgual tHeap tCorcheteA valor tCorcheteC
	{
		$$=new Asignacion(@1.first_line, @1.first_column,$1+' '+$2+' '+$3+$4+$5.contenido.toString()+$6,$5);
		$$.setId($1);
	}
	| ID tIgual tStack tCorcheteA valor tCorcheteC
	{
		$$=new Asignacion(@1.first_line, @1.first_column,$1+' '+$2+' '+$3+$4+$5.contenido.toString()+$6,$5);
		$$.setId($1);
	}
	| tHeap tCorcheteA valor tCorcheteC tIgual valor
	{
		var vt1 = new Operacion(0, 0, TIPO_OPERACION.MAS, $3, $6);
		$$=new Asignacion(@1.first_line, @1.first_column,$1+$2+$3.contenido.toString()+$4+' '+$5+' '+$6.contenido.toString(),vt1);
	}
	| tStack tCorcheteA valor tCorcheteC tIgual valor
	{
		var vt2 = new Operacion(0, 0, TIPO_OPERACION.MAS, $3, $6);
		$$=new Asignacion(@1.first_line, @1.first_column,$1+$2+$3.contenido.toString()+$4+' '+$5+' '+$6.contenido.toString(),vt2);
	}
;

exp
	: valor tMas valor      	{ $$=new Operacion(@1.first_line, @1.first_column, TIPO_OPERACION.MAS,$1,$3); }
	| valor tMenos valor    	{ $$=new Operacion(@1.first_line, @1.first_column, TIPO_OPERACION.MENOS,$1,$3); }
	| valor tMulti valor    	{ $$=new Operacion(@1.first_line, @1.first_column, TIPO_OPERACION.ASTERISCO,$1,$3); }
	| valor tDivision valor 	{ $$=new Operacion(@1.first_line, @1.first_column, TIPO_OPERACION.DIAGONAL,$1,$3); }
	| valor tModulo valor   	{ $$=new Operacion(@1.first_line, @1.first_column, TIPO_OPERACION.MODULO,$1,$3); }
	| valor 					{ $$=$1;}
;

valor
	: ENTERO  {$$=new Valor(@1.first_line, @1.first_column,TIPO.ENTERO,$1);}
	| DECIMAL {$$=new Valor(@1.first_line, @1.first_column,TIPO.DECIMAL,$1);}
	| ID	  {$$=new Valor(@1.first_line, @1.first_column,TIPO.ID,$1);}
	| tMenos valor %prec UMINUS { $$=new Valor(@1.first_line, @1.first_column,TIPO.ENTERO,'-'+$2.contenido.toString()); }
;
