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

"void"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_void';%}
"main"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_main';%}

"var"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_var';%}

"double"                 %{ listaTokens.push(new Token("Palabra_Reservada", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_double';%}
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
"{"                   %{ listaTokens.push(new Token("LLave_izquierda", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_llave_izq';%}
"}"                   %{ listaTokens.push(new Token("LLave_derecha", yytext, yylloc.first_line, yylloc.first_column)); return 'tk_llave_der';%}



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

\"([^\\\"]|\\.)*\"                          %{ listaTokens.push(new Token("Cadena", yytext.substr(1, yyleng-2), yylloc.first_line, yylloc.first_column)); return "tk_hilera";%}
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
	//console.log("ε");
    $$.agregarHijo(new Nodo("ε","ε"));
    }
;

SENTENCIAS
	: SENTENCIAS SENTENCIA 
	{
    $$= new Nodo("SENS","SENS");
	$$.agregarHijo($1);
    $$.agregarHijo($2);
    }
	| SENTENCIA	           
	{
    $$= new Nodo("SENS","SENS");
	$$.agregarHijo($1);
	}
;

SENTENCIA
	: DECLARACION tk_punto_coma 
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	}
	| ASIGNACION tk_punto_coma  
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	}
	| tk_void tk_main tk_parent_izq tk_parent_der tk_llave_izq SENTENCIAS tk_llave_der
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo(new Nodo($4,$4));
	$$.agregarHijo(new Nodo($5,$5));
	$$.agregarHijo($6);
	$$.agregarHijo(new Nodo($7,$7));
	}
	| tk_print tk_parent_izq TIPO_PRINT tk_parent_der tk_punto_coma
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	$$.agregarHijo(new Nodo($4,$4));
	$$.agregarHijo(new Nodo($5,$5));
	}
	| tk_print tk_parent_izq TIPO_PRINT tk_coma VALOR tk_parent_der tk_punto_coma
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	$$.agregarHijo(new Nodo($4,$4));
	$$.agregarHijo($5);
	$$.agregarHijo(new Nodo($6,$6));
	$$.agregarHijo(new Nodo($7,$7));
	}
	| tk_goto tk_identificador tk_punto_coma
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	}
	| tk_if tk_parent_izq VALOR OP_REL VALOR tk_parent_der tk_goto tk_identificador tk_punto_coma
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	$$.agregarHijo($4);
	$$.agregarHijo($5);
	$$.agregarHijo(new Nodo($6,$6));
	$$.agregarHijo(new Nodo($7,$7));
	$$.agregarHijo(new Nodo($8,$8));
	$$.agregarHijo(new Nodo($9,$9));
	}
	| tk_call tk_identificador tk_punto_coma
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	}
	| tk_identificador tk_dos_puntos
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	}
	| tk_proc tk_identificador tk_begin
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	}
	| tk_end
	{
    $$= new Nodo("SEN","SEN");
	$$.agregarHijo(new Nodo($1,$1));
	}
	/*| error tk_punto_coma
	{ 
		errores.push(new ErrorAnalisis(TIPO_ERROR.SINTACTICO,'No se esperaba '+yy.lexer.yytext, yy.lexer.yylineno, yy.lexer.yylloc.first_column));
	}*/
;

TIPO_PRINT
	: tk_caracter 
	{
    $$= new Nodo("TPR","TPR");
	$$.agregarHijo(new Nodo($1,$1));
	}
	| tk_entero   
	{
    $$= new Nodo("TPR","TPR");
	$$.agregarHijo(new Nodo($1,$1));
	}
	| tk_decimal  
	{
    $$= new Nodo("TPR","TPR");
	$$.agregarHijo(new Nodo($1,$1));
	}
	| tk_hilera  
	{
    $$= new Nodo("TPR","TPR");
	$$.agregarHijo(new Nodo($1,$1));
	}		
;

OP_REL
	: tk_igualdad	   
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}
	| tk_desigual 		
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_menor_igual  	
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_menor 	  		
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_mayor_igual  	
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}
	| tk_mayor	   		
	{
    $$= new Nodo("OPR","OPR");
	$$.agregarHijo(new Nodo($1,$1));
	}	
;

DECLARACION
	: tk_double LISTA_IDS
	{
    $$= new Nodo("DEC","DEC");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo($2);
	}
	| tk_var tk_stack tk_corchete_izq tk_corchete_der
	{
    $$= new Nodo("DEC","DEC");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo(new Nodo($4,$4));
	}
	| tk_var tk_heap tk_corchete_izq tk_corchete_der
	{
    $$= new Nodo("DEC","DEC");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo(new Nodo($4,$4));
	}
	| tk_var tk_identificador tk_igual VALOR 
	{
    $$= new Nodo("DEC","DEC");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo($4);
	}

	// Nunca pasa: | tk_double tk_identificador tk_igual EXP (var t5=3+2; )
;
LISTA_IDS
	: LISTA_IDS tk_coma tk_identificador 
	{
    $$= new Nodo("LID","LID");
	$$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo(new Nodo($3,$3));
	}
	| tk_identificador 
	{
    $$= new Nodo("LID","LID");
	$$.agregarHijo(new Nodo($1,$1));
	}	
;

ASIGNACION:
//	 tk_identificador tk_igual EXP
	 tk_identificador ASIGNACIONSIGNO  EXP
	{
    $$= new Nodo("ASIG","ASIG");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo($2);
	$$.agregarHijo($3);
	}
	| tk_double ASIGNACIONSIGNO tk_heap tk_corchete_izq VALOR tk_corchete_der
	{
    $$= new Nodo("ASIG","ASIG");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo($2);
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo(new Nodo($4,$4));
	$$.agregarHijo($5);
	$$.agregarHijo(new Nodo($6,$6));
	}
	| tk_double ASIGNACIONSIGNO tk_stack tk_corchete_izq VALOR tk_corchete_der
	{
    $$= new Nodo("ASIG","ASIG");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo($2);
	$$.agregarHijo(new Nodo($3,$3));
	$$.agregarHijo(new Nodo($4,$4));
	$$.agregarHijo($5);
	$$.agregarHijo(new Nodo($6,$6));
	}
	| tk_heap tk_corchete_izq COMPLEMENTO VALOR tk_corchete_der tk_igual VALOR
	{
    $$= new Nodo("ASIG","ASIG");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	$$.agregarHijo($4);
	$$.agregarHijo(new Nodo($5,$5));
	$$.agregarHijo(new Nodo($6,$6));
	$$.agregarHijo($7);
	}
	| tk_stack tk_corchete_izq COMPLEMENTO VALOR tk_corchete_der tk_igual VALOR
	{
    $$= new Nodo("ASIG","ASIG");
	$$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	$$.agregarHijo($4);
	$$.agregarHijo(new Nodo($5,$5));
	$$.agregarHijo(new Nodo($6,$6));
	$$.agregarHijo($7);
	}
;
ASIGNACIONSIGNO:
			tk_igual
        	{$$= new Nodo("ASIGS", "ASIGS" );
        	$$.agregarHijo(new Nodo($1,$1));
			}			
			|
        	{$$= new Nodo("ASIGS", "ASIGS" );
        	$$.agregarHijo(new Nodo("ε","ε"));
			}			
			
;

COMPLEMENTO:
		 tk_parent_izq VALOR tk_parent_der
        {$$= new Nodo("COMP", "COMP" );
        $$.agregarHijo(new Nodo($1,$1));
		$$.agregarHijo($2);
		$$.agregarHijo(new Nodo($3,$3));
		}		 
		|
        {$$= new Nodo("COMP", "COMP" );
        $$.agregarHijo(new Nodo("ε","ε"));
		}		
;

EXP
	: VALOR tk_suma VALOR      	  
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	}
	| VALOR tk_resta VALOR        
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	}
	| VALOR tk_asterisco VALOR    
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	}	
	| VALOR tk_diagonal VALOR    
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	}	
	| VALOR tk_modulo VALOR       
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	$$.agregarHijo(new Nodo($2,$2));
	$$.agregarHijo($3);
	}	
	| VALOR 			
    {$$= new Nodo("EXP", "EXP" );
    $$.agregarHijo($1);
	}
;

VALOR
	: tk_entero  
    {$$= new Nodo("VAL", "VAL" );
    $$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_decimal 
    {$$= new Nodo("VAL", "VAL" );
    $$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_identificador	  
    {$$= new Nodo("VAL", "VAL" );
    $$.agregarHijo(new Nodo($1,$1));
	}	
	| tk_resta VALOR %prec UMINUS 
	{$$= new Nodo("VAL", "VAL" );
    $$.agregarHijo(new Nodo($1,$1));
	$$.agregarHijo($2);
	}
;
