%{

%}
%lex
%options case-insensitive

idi ([a-zA-Z_][_a-zA-Z0-9ñÑ]*)
comment ("#"[^\r\n]* [^\r\n])
%%

"var"           return 'tVar';
"heap"          return 'tHeap';
"stack"         return 'tStack';
"goto"          return 'tGoto';
"proc"          return 'tProc';
"begin"         return 'tBegin';
"end"     	    return 'tEnd';
"call"          return 'tCall';
"print"         return 'tPrint';
"if"            return 'tIf';
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

ini: inicio EOF 
;

inicio
	: sentencias 
	| 			
;

sentencias
	: sentencias sentencia 
	| sentencia	           
;

sentencia
	: declaracion tPYC 
	| asignacion tPYC  
	| tPrint tParA tipo_print tComa valor tParC tPYC
	
	| tGoto ID tPYC
	
	| tIf tParA valor op_rel valor tParC tGoto ID tPYC
	
	| tCall ID tPYC
	
	| ID tDosPuntos
	
	| tProc ID tBegin
	
	| tEnd
	
	/*| error tPYC
	{ 
		errores.push(new ErrorAnalisis(TIPO_ERROR.SINTACTICO,'No se esperaba '+yy.lexer.yytext, yy.lexer.yylineno, yy.lexer.yylloc.first_column));
	}*/
;

tipo_print
	: tCaracter 
	| tEntero   
	| tDecimal  
;

op_rel
	: tIgualdad	   
	| tDesigualdad 
	| tMenorIgual  
	| tMenor 	   
	| tMayorIgual  
	| tMayor	   
;

declaracion
	: tVar lista_ids
	
    | tVar tStack tCorcheteA tCorcheteC
	
    | tVar tHeap tCorcheteA tCorcheteC
	
    | tVar ID tIgual valor 
	
	// Nunca pasa: | tVar ID tIgual exp (var t5=3+2; )
;
lista_ids
	: lista_ids tComa ID 
	| ID 
;

asignacion
	: ID tIgual exp
	
	| ID tIgual tHeap tCorcheteA valor tCorcheteC
	
    | ID tIgual tStack tCorcheteA valor tCorcheteC
	
    | tHeap tCorcheteA valor tCorcheteC tIgual valor
	
	| tStack tCorcheteA valor tCorcheteC tIgual valor
;

exp
	: valor tMas valor      	 
	| valor tMenos valor    	 
	| valor tMulti valor    	 
	| valor tDivision valor 	 
	| valor tModulo valor   	 
	| valor 					 
;

valor
	: ENTERO   
	| DECIMAL  
	| ID	  
	| tMenos valor %prec UMINUS  
;
