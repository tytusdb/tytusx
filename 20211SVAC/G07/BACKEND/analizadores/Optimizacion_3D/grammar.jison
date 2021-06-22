%{


%}
%lex
%options case-insensitive

comment ("#"[^\r\n]* [^\r\n])                   

%%
\s+                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}
\n					{}
{comment} {} // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */


"var"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_var';%}
"heap"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_heap';%}
"stack"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_stack';%}
"goto"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_goto';%}
"proc"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_proc';%}
"begin"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_begin';%}
"end"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_end';%}
"call"                %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_call';%}
"print"               %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_print';%}
"if"                  %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_if';%}
"\"%c\""              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_caracter';%}
"\"%i\""              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_entero';%}
"\"%d\""              %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_decimal';%}
";"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_punto_coma';%}
":"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_dos_puntos';%}
","                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_coma';%}
"("                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parent_izq';%}
")"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_parent_der';%}
"["                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_corchete_izq';%}
"]"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_corchete_der';%}

"+"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_suma';%}
"-"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_resta';%}
"*"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_asterisco';%}
"/"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_diagonal';%}
"%"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_modulo';%}

"=="                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igualdad';%}
"="                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_igual';%}

"<>"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_desigual';%}
"<="                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor_igual';%}
"<"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_menor';%}
">="                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor_igual';%}
">"                   %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_mayor';%}



/* Espacios en blanco */


[a-zA-Z_À-ÿ\u00F1\u00D1]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*    %{ listaTokens.push(new Token("Identificador", yytext, yylloc.first_line, yylloc.first_column)); return "tk_identificador";%}
[0-9]+("."[0-9]+)?\b   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_decimal";%}
[0-9]+   %{ listaTokens.push(new Token("Numero", yytext, yylloc.first_line, yylloc.first_column)); return "tk_entero";%}

<<EOF>>                                     %{ return "EOF"; %}

.                                            %{ return "error"; %}

/lex

%left     'tk_igualdad' 'tk_desigual'
%nonassoc 'tk_menor' 'tk_menor_igual' 'tk_mayor' 'tk_mayor_igual'
%left     'tk_suma' 'tk_resta'
%left     'tk_asterisco' 'tk_diagonal' 'tk_modulo'
%right    UMENOS
%right    'tk_igual'

%start INI

%%

INI
	: INICIO EOF 
	{return $INICIO;} 
;

INICIO
	: SENTENCIAS 
	{$$= new Nodo("INIC", "INIC" );
	 //console.log($1);
	 $$.agregarHijo($1);
	}
	| 			 
	{
    $$= new Nodo("INIC","INIC");
	console.log("ε");
    $$.agregarHijo(new Nodo("ε","ε"));
    }
;

SENTENCIAS
	: SENTENCIAS SENTENCIA 
	{
    $$= new Nodo("INIC","INIC");
	//console.log($1);
	//console.log($2);
    }
	| SENTENCIA	           
	{
    $$= new Nodo("INIC","INIC");
	//console.log($1);
	}
;

SENTENCIA
	: DECLARACION tk_punto_coma 
	{console.log($2);}
	| ASIGNACION tk_punto_coma  
	{console.log($2);}
	| tk_print tk_parent_izq TIPO_PRINT tk_coma VALOR tk_parent_der tk_punto_coma
	{console.log($1);
	console.log($2);
	console.log($4);
	console.log($6);
	console.log($7);}
	| tk_goto tk_identificador tk_punto_coma
	{console.log($1);
	console.log($2);
	console.log($3);}
	| tk_if tk_parent_izq VALOR OP_REL VALOR tk_parent_der tk_goto tk_identificador tk_punto_coma
	{console.log($1);
	console.log($2);
	console.log($6);
	console.log($7);
	console.log($8);
	console.log($9);}
	| tk_call tk_identificador tk_punto_coma
	{console.log($1);
	console.log($2);
	console.log($3);}
	| tk_identificador tk_dos_puntos
	{console.log($1);
	console.log($2);}
	| tk_proc tk_identificador tk_begin
	{console.log($1);
	console.log($2);
	console.log($3);}
	| tk_end
	{console.log($1);}
	/*| error tk_punto_coma
	{ 
		errores.push(new ErrorAnalisis(TIPO_ERROR.SINTACTICO,'No se esperaba '+yy.lexer.yytext, yy.lexer.yylineno, yy.lexer.yylloc.first_column));
	}*/
;

TIPO_PRINT
	: tk_caracter 
		{console.log($1);}
	| tk_entero   
		{console.log($1);}
	| tk_decimal  
		{console.log($1);}
;

OP_REL
	: tk_igualdad	   	{console.log($1);}
	| tk_desigual 		{console.log($1);}
	| tk_menor_igual  	{console.log($1);}
	| tk_menor 	  		{console.log($1);}
	| tk_mayor_igual  	{console.log($1);}
	| tk_mayor	   		{console.log($1);}
;

DECLARACION
	: tk_var LISTA_IDS
	{console.log($1);}
	| tk_var tk_stack tk_corchete_izq tk_corchete_der
	{console.log($1);
	console.log($2);
	console.log($3);
	console.log($4);}
	| tk_var tk_heap tk_corchete_izq tk_corchete_der
	{console.log($1);
	console.log($2);
	console.log($3);
	console.log($4);}
	| tk_var tk_identificador tk_igual VALOR 
	{console.log($1);
	console.log($2);
	console.log($3);}
	// Nunca pasa: | tk_var tk_identificador tk_igual EXP (var t5=3+2; )
;
LISTA_IDS
	: LISTA_IDS tk_coma tk_identificador 
	{console.log($2);
	console.log($3);}
	| tk_identificador {console.log($1);}
;

ASIGNACION:
//	 tk_identificador tk_igual EXP
	 tk_identificador  EXP
	{console.log($1);
	console.log($2);}
	| tk_identificador tk_igual tk_heap tk_corchete_izq VALOR tk_corchete_der
	{console.log($1);
	console.log($2);
	console.log($3);
	console.log($4);
	console.log($6);}
	| tk_identificador tk_igual tk_stack tk_corchete_izq VALOR tk_corchete_der
	{console.log($1);
	console.log($2);
	console.log($3);
	console.log($4);
	console.log($6);}
	| tk_heap tk_corchete_izq VALOR tk_corchete_der tk_igual VALOR
	{console.log($1);
	console.log($2);
	console.log($4);
	console.log($5);}
	| tk_stack tk_corchete_izq VALOR tk_corchete_der tk_igual VALOR
	{console.log($1);
	console.log($2);
	console.log($4);
	console.log($5);}
;

EXP
	: VALOR tk_suma VALOR      	  {console.log($2);}
	| VALOR tk_resta VALOR        {console.log($2);}
	| VALOR tk_asterisco VALOR    {console.log($2);}
	| VALOR tk_diagonal VALOR     {console.log($2);}
	| VALOR tk_modulo VALOR       {console.log($2);}
	| VALOR 			
;

VALOR
	: tk_entero  {console.log($1);}
	| tk_decimal {console.log($1);}
	| tk_identificador	  {console.log($1);}
	| tk_resta VALOR %prec UMINUS {console.log($1);}
;
