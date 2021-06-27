/* lexical grammar */
%{
var attribute = '';
var errors = [];
let grammar_stack = [];
let re = /[^\n\t\r ]+/g
%}
%lex

%options case-insensitive
%x string_doubleq
%x string_singleq
%x content

/*Regular Expressions*/
element_content                     ([^<>&\"{}] | '&lt;' | '&gt;' | '&amp;' | '&apos;' | '&quot;' )+
// injection                           [{][$][\w]+('/' | '//' )*[}]
%%

\s+                   	// Whitespace
"(:"[\s\S\n]*?":)"		// XQUERYComment
"<!--"[\s\S\n]*?"-->"	// MultiLineComment

[0-9]+("."[0-9]+)?\b    return 'num'
"<="					return 'tk_menorigual'
">="                    return 'tk_mayorigual'
"<"                     return 'tk_menor'
">"                     return 'tk_mayor'
"//"                    return 'tk_2bar'
"/"                     return 'tk_bar'
":="                    return 'tk_2puntos_igual'
"="                     return 'tk_equal'
".."                    return 'tk_2puntos'
"."                     return 'tk_punto'
"::"                    return 'tk_4puntos'
"@"                     return 'tk_arroba'
"$"                     return 'tk_dolar'
"["                     return 'tk_corA'
"]"                     return 'tk_corC'
"("                     return 'tk_ParA'
")"                     return 'tk_ParC'
"{"                     return 'tk_labre'
"}"                     return 'tk_lcierra'
"*"                     return 'tk_asterisco'
"div"                   return 'tk_div'
"ancestor-or-self"      return 'tk_ancestor2'
"ancestor"              return 'tk_ancestor'
"attribute"             return 'tk_attribute'
"child"                 return 'tk_child'
"descendant-or-self"    return 'tk_descendant2'
"descendant"            return 'tk_descendant'
"following-sibling"     return 'tk_following2'
"following"             return 'tk_following'
"namespace"             return 'tk_namespace'
"parent"                return 'tk_parent'
"preceding-sibling"     return 'tk_preceding2'
"preceding"             return 'tk_preceding'
"self"                  return 'tk_self'
"node"                  return 'tk_node'
"last"                  return 'tk_last'
"text"                  return 'tk_text'
"position"              return 'tk_position'
"|"                     return 'tk_line'
"+"                     return 'tk_mas'
"-"                     return 'tk_menos'
"!="                    return 'tk_diferent'
"or"                    return 'tk_or'
"and"                   return 'tk_and'
"mod"                   return 'tk_mod'
"doc"                   return 'tk_doc'
"for"                   return 'tk_for'
"at"                    return 'tk_at'
"in"                    return 'tk_in'
"let"                   return 'tk_let'
"where"                 return 'tk_where'
"order"                 return 'tk_order'
"by"                    return 'tk_by'
"return"                return 'tk_return'
"to"                    return 'tk_to'
","                     return 'tk_coma'
"data"                  return 'tk_data'


["]                             { attribute = ''; this.begin("string_doubleq"); }
<string_doubleq>[^"\\]+			{ attribute += yytext; }
<string_doubleq>"\\\""			{ attribute += "\""; }
<string_doubleq>"\\n"           { attribute += "\n"; }
<string_doubleq>\s	            { attribute += " ";  }
<string_doubleq>"\\t"           { attribute += "\t"; }
<string_doubleq>"\\\\"			{ attribute += "\\"; }
<string_doubleq>"\\\'"			{ attribute += "\'"; }
<string_doubleq>"\\r"           { attribute += "\r"; }
<string_doubleq>["]	            { yytext = attribute; this.popState(); return 'tk_string_d'; }

[']                             { attribute = ''; this.begin("string_singleq"); }
<string_singleq>[^'\\]+			{ attribute += yytext; }
<string_singleq>"\\\""			{ attribute += "\""; }
<string_singleq>"\\n"			{ attribute += "\n"; }
<string_singleq>\s				{ attribute += " ";  }
<string_singleq>"\\t"			{ attribute += "\t"; }
<string_singleq>"\\\\"			{ attribute += "\\"; }
<string_singleq>"\\\'"			{ attribute += "\'"; }
<string_singleq>"\\r"           { attribute += "\r"; }
<string_singleq>[']	            { yytext = attribute; this.popState(); return 'tk_string_s'; }

// <content>"<!--"([^-]|\-[^-])*"-->"	    /* MultiLineComment*/
// <content>{element_content}       { if(yytext.match(re)) { return 'tk_content';} }
// <content>"{"                     { this.popState(); return 'tk_labre'; }
// <content>"<"                     { this.popState(); return 'tk_menor'; }
// <content><<EOF>>               	 return 'EOF'
// <content>.                     	 { errors.push({ tipo: "Léxico", error: yytext, origen: "XQuery", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }


[\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]+ return 'tk_id'

<<EOF>>               	return 'EOF'
.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "XQuery", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/lex

%{
	const { Objeto } = require('../model/xpath/Objeto');
	const { Tipos } = require('../model/xpath/Enum');
    const { XQObjeto } = require('../model/xquery/XQObjeto');
    var builder = new Objeto();
    var queryBuilder = new XQObjeto();
    // const getASTTree = require('./ast_xpath');
	function insert_current(_variable, _linea, _columna) {
		return builder.newAxis(builder.newExpression(builder.newCurrent(_variable, _linea, _columna), null, _linea, _columna), _linea, _columna)
	}
%}

/* operator associations and precedence */
%left 'tk_or' 'tk_line'
%left 'tk_and'
%left 'tk_equal' 'tk_diferent' 'tk_menor' 'tk_menorigual' 'tk_mayor' 'tk_mayorigual'
%left 'tk_mas' 'tk_menos'
%left 'tk_div' 'tk_mod' 'tk_asterisco'
%left umenos
%left 'tk_ParA'
%left 'tk_bar' 'tk_2bar'


%start ini

%% // GRAMATICA DE DOCUMENTO XPath ANALISIS ASCENDENTE

ini: XPATH_U EOF{   prod_1 = grammar_stack.pop();
					prod_2 = grammar_stack.pop();
			 		grammar_stack.push({'ini -> XPATH_U EOF': [prod_2, prod_1]});
					// grammar_report =  getGrammarReport(grammar_stack); // cst = getCST(grammar_stack); // let arbol_ast = getASTTree($1);
					ast = { ast: $1, errors: errors, cst: "cst", grammar_report: "grammar_report",  arbolAST : "arbol_ast" }; return ast;
                }
    | XQUERY EOF { ast = { ast: $1, errors: errors, cst: "cst", grammar_report: "grammar_report",  arbolAST : "arbol_ast" }; return ast; }
;

XQUERY: XQUERY INSTR_QUERY  { $1.push($2); $$=$1; }
        | INSTR_QUERY { $$=[$1]; }
		// | LET_CLAUSE
;

INSTR_QUERY: IF_ELSE_IF
            | FOR_LOOP { $$=$1; }
			| LET_CLAUSE
            | FUNCIONES
;

// FLWOR: FOR_LOOP { $$ = $1; }
//         | LET_CLAUSE { $$ = $1; }
//         | WHERE_CONDITION { $$ = $1; }
//         | ORDER_BY { $$ = queryBuilder.nuevoOrderBy($1, this._$.first_line, this._$.first_column+1); }
//         | RETURN_STATEMENT { $$ = $1; }
// ;

FOR_LOOP: tk_for DECLARACION INSTRUCCIONES_FOR { $$ = queryBuilder.nuevoFor($2, $3, this._$.first_line, this._$.first_column+1); }
;

INSTRUCCIONES_FOR: INSTRUCCIONES_FOR INSTR_FOR_P { $1.push($2); $$=$1; }
                | INSTR_FOR_P { $$=[$1]; }
;

INSTR_FOR_P: WHERE_CONDITION { $$ = $1; }
            | ORDER_BY { $$ = queryBuilder.nuevoOrderBy($1, this._$.first_line, this._$.first_column+1); }
            | RETURN_STATEMENT { $$ = $1; }
			// | LET_CLAUSE
;

LET_CLAUSE: tk_let VARIABLE tk_2puntos_igual DECLARACIONPP { $$ = queryBuilder.nuevoLet($2, $4, this._$.first_line, this._$.first_column+1); }
			| tk_let DECLARACIONP
;

WHERE_CONDITION: tk_where E { $$ = queryBuilder.nuevoWhere($2, this._$.first_line, this._$.first_column+1); }
;

ORDER_BY: ORDER_BY tk_coma E { $1.push($3); $$=$1; }
        | tk_order tk_by E { $$=[$3]; }
;

RETURN_STATEMENT: tk_return HTML { $$ = queryBuilder.nuevoReturn($2, this._$.first_line, this._$.first_column+1); }
                | tk_return XPATH { $$ = queryBuilder.nuevoReturn($2, this._$.first_line, this._$.first_column+1); }
;

VARIABLE: tk_dolar tk_id { $$=queryBuilder.nuevaVariable("$"+$2, this._$.first_line, this._$.first_column+1); }
;

DECLARACION: DECLARACION tk_coma DECLARACIONP { $1.push($3); $$=$1; }
            | DECLARACIONP { $$=[$1] }
;

DECLARACIONP: VARIABLE tk_in DECLARACIONPP { $$ = queryBuilder.nuevaDeclaracion($1, null, $3, this._$.first_line, this._$.first_column+1); }
            | VARIABLE tk_at VARIABLE tk_in DECLARACIONPP { $$ = queryBuilder.nuevaDeclaracion($1, $3, $5, this._$.first_line, this._$.first_column+1); }
;

DECLARACIONPP: tk_ParA E tk_to E tk_ParC { $$ = queryBuilder.nuevoIntervalo($2, $4, this._$.first_line, this._$.first_column+1); }
            | tk_ParA VALORES_COMA tk_ParC { $$ = queryBuilder.nuevosValores($2, this._$.first_line, this._$.first_column+1); }
            | XPATH { $$=$1; }
;

VALORES_COMA: VALORES_COMA tk_coma E { $1.push($3); $$=$1; }
            | E { $$=[$1]; }
;

// EXP_HTML: EXP_HTML HTML { $1.push($2); $$=$1; }
//         | HTML { $$=[$1]; }
// ;

HTML: tk_menor tk_id ATTRIBUTE_LIST tk_mayor CONTENT_LL tk_menor tk_bar tk_id tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, $5, $8, this._$.first_line, this._$.first_column+1); }
    | tk_menor tk_id ATTRIBUTE_LIST tk_mayor tk_menor tk_bar tk_id tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, null, $7, this._$.first_line, this._$.first_column+1); }
    | tk_menor tk_id ATTRIBUTE_LIST tk_bar tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, null, null, this._$.first_line, this._$.first_column+1); }
;

CONTENT_LL: CONTENT_LL CONTENT_TAG { $1.push($2); $$=$1; }
        | CONTENT_TAG { $$=[$1]; }
        // | HTML
;

CONTENT_TAG: tk_id { $$ = queryBuilder.nuevoContenido($1, this._$.first_line, this._$.first_column+1); } // era tk_content
            | tk_labre XPATH tk_lcierra { $$ = queryBuilder.nuevaInyeccion($2, false, this._$.first_line, this._$.first_column+1); }
            | tk_labre tk_data tk_ParA XPATH tk_ParC tk_lcierra { $$ = queryBuilder.nuevaInyeccion($4, true, this._$.first_line, this._$.first_column+1); }
;

ATTRIBUTE_LIST: tk_id tk_equal STRING { $$=$3; }
                | tk_id tk_equal CONTENT_LL { $$=$3; }
                | { $$=null; }
;

XPATH_U: XPATH_U tk_line XPATH  { $1.push($3); $$=$1;
								 prod_1 = grammar_stack.pop();
								 prod_2 = grammar_stack.pop();
			 					 grammar_stack.push({'XPATH_U -> XPATH_U tk_line XPATH {S1.push(S3); SS = S1;}': [prod_2, 'token: tk_line\t Lexema: ' + $1, prod_1]}); }
		| XPATH { $$=[$1];
				  prod_1 = grammar_stack.pop();
			 	  grammar_stack.push({'XPATH_U -> XPATH {SS = [S1]}': [prod_1]}); }
;

XPATH: XPATH QUERY  { $1.push($2); $$=$1;
					  prod_1 = grammar_stack.pop();
					  prod_2 = grammar_stack.pop();
			 		  grammar_stack.push({'XPATH -> XPATH QUERY {S1.push(S2); SS = S1;}': [prod_2, prod_1]}); }
	| QUERY  { $$=[$1];
			   prod_1 = grammar_stack.pop();
			   grammar_stack.push({'XPATH -> QUERY {SS = [S1]}': [prod_1]}); }
;

QUERY: tk_2bar QUERY { $$=builder.newDoubleAxis($2, this._$.first_line, this._$.first_column+1);
					   prod_1 = grammar_stack.pop();
			 		   grammar_stack.push({'QUERY -> tk_2bar QUERY SS=builder.newDoubleAxis(Param);': ['token: tk_2bar\t Lexema: ' + $1, prod_1]}); }
	| tk_bar QUERY { $$=builder.newAxis($2, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
			 		 grammar_stack.push({'QUERY -> tk_bar QUERY {SS=builder.newAxis(Param);}': ['token: tk_bar\t Lexema: ' + $1, prod_1]}); }
	| tk_bar tk_asterisco CORCHETP {
			var linea = this._$.first_line;
			var columna = this._$.first_column+1;
			$$=builder.newAxis(builder.newExpression(builder.newValue($2, Tipos.ASTERISCO, linea, columna), $3, linea, columna), linea, columna);
		}
	| tk_2bar tk_asterisco CORCHETP {
			var linea = this._$.first_line;
			var columna = this._$.first_column+1;
			$$=builder.newDoubleAxis(builder.newExpression(builder.newValue($2, Tipos.ASTERISCO, linea, columna), $3, linea, columna), linea, columna);
		}
	| EXP_PR { $$=$1; }
	| AXIS { $$=$1; }
;

CORCHET: CORCHET tk_corA E tk_corC { $1.push(builder.newPredicate($3, this._$.first_line, this._$.first_column+1)); $$=$1;
									 prod_1 = grammar_stack.pop();
									 prod_2 = grammar_stack.pop();
						 			 grammar_stack.push({'CORCHET -> CORCHET tk_ParA E tk_ParC {S1.push(builder.NewPredicate(Param))}': [prod_2, 'token: tk_ParA\t Lexema: ' + $2, prod_1, 'token: tk_ParC\t Lexema: ' + $4]}); }
	| tk_corA E tk_corC{ $$=[builder.newPredicate($2, this._$.first_line, this._$.first_column+1)];
						 prod_1 = grammar_stack.pop();
						 grammar_stack.push({'CORCHET -> tk_corA E tk_corC {SS=builder.newPredicate(Param)}': ['token: tk_corA\t Lexema: ' + $1, prod_1, 'token: tk_corC\t Lexema: ' + $3]}); } // Lista de predicados
;

CORCHETP: CORCHET { $$=$1;
					prod_1 = grammar_stack.pop();
					grammar_stack.push({'CORCHETP -> CORCHET {SS=S1;}': [prod_1]}); }
		| { $$=null;
			grammar_stack.push({'CORCHETP -> Empty {SS=null}': ['EMPTY'] }); }
;

E:	E tk_menorigual E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENORIGUAL, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
				 		prod_2 = grammar_stack.pop();
					    grammar_stack.push({'E -> E tk_menorigual E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_menor E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -> E tk_menor E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayorigual E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYORIGUAL, this._$.first_line, this._$.first_column+1);
						  prod_1 = grammar_stack.pop();
				 		  prod_2 = grammar_stack.pop();
						  grammar_stack.push({'E -> E tk_mayorigual E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mayorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayor E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -> E tk_mayor E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mayor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mas E { $$=builder.newOperation($1, $3, Tipos.OPERACION_SUMA, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_mas E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mas\t Lexema: ' + $2, prod_1]}); }
	| E tk_menos E { $$=builder.newOperation($1, $3, Tipos.OPERACION_RESTA, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				  	 grammar_stack.push({'E -> E tk_menos E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menos\t Lexema: ' + $2, prod_1]}); }
	| E tk_asterisco E { $$=builder.newOperation($1, $3, Tipos.OPERACION_MULTIPLICACION, this._$.first_line, this._$.first_column+1);
						 prod_1 = grammar_stack.pop();
				 		 prod_2 = grammar_stack.pop();
				  		 grammar_stack.push({'E -> E tk_asterisco E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_asterisco\t Lexema: ' + $2, prod_1]}); }
	| E tk_div E { $$=builder.newOperation($1, $3, Tipos.OPERACION_DIVISION, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_div E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_div\t Lexema: ' + $2, prod_1]}); }
	| E tk_mod E { $$=builder.newOperation($1, $3, Tipos.OPERACION_MODULO, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_mod E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mod\t Lexema: ' + $2, prod_1]}); }
	| tk_menos E %prec umenos { $$=builder.newOperation(builder.newValue(0, Tipos.NUMBER, this.$.first_line, this.$.first_column+1), $2, Tipos.OPERACION_RESTA, this.$.first_line, this.$.first_column+1); 
								prod_1 = grammar_stack.pop();
						  		grammar_stack.push({'E -: tk_menos E': ['token: tk_menos\t Lexema: ' + $1, prod_1]});}
	| tk_ParA E tk_ParC { $$=$2;
						  prod_1 = grammar_stack.pop();
						  grammar_stack.push({'E -> tk_ParA E tk_ParC {SS=S2}': ['token: tk_ParA\t Lexema: ' + $1, prod_1, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| E tk_or E { $$=builder.newOperation($1, $3, Tipos.LOGICA_OR, this._$.first_line, this._$.first_column+1);
				  prod_1 = grammar_stack.pop();
				  prod_2 = grammar_stack.pop();
				  grammar_stack.push({'E -> E tk_or E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_or\t Lexema: ' + $2, prod_1]}); }
	| E tk_and E { $$=builder.newOperation($1, $3, Tipos.LOGICA_AND, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_and E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_and\t Lexema: ' + $2, prod_1]}); }
	| E tk_equal E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_IGUAL, this._$.first_line, this._$.first_column+1); 
					 prod_1 = grammar_stack.pop();
					 prod_2 = grammar_stack.pop();
					 grammar_stack.push({'E -> E tk_equal E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_equal\t Lexema: ' + $2, prod_1]}); }
	| E tk_diferent E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_DIFERENTE, this._$.first_line, this._$.first_column+1); 
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'E -> E tk_diferent E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_diferent\t Lexema: ' + $2, prod_1]}); }
    | XPATH { $$=$1; }
;

EXP_PR: FUNC CORCHETP { $$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'EXP_PR -> FUNC CORCHETP {SS=builder.newExpression(Param)}': [prod_2, prod_1]}); } // Predicado puede ser nulo
		| PRIMITIVO CORCHETP { $$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1); 
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'EXP_PR -> PRIMITIVO CORCHETP {SS=builder.newExpression(Param)}': [prod_2, prod_1]}); }
;

PRIMITIVO: tk_id { $$=builder.newNodename($1, this._$.first_line, this._$.first_column+1);
				   grammar_stack.push({'PRIMITIVO -> tk_id {SS=builder.newNodename(Param)}':['token: tk_text\t Lexema: ' + $1]}); }
        | VARIABLE	{ $$=builder.newAxis(builder.newCurrent($1.variable, this._$.first_line, this._$.first_column+1), this._$.first_line, this._$.first_column+1); }
        | STRING { $$ = $1; }
		| num { $$=builder.newValue(Number($1), Tipos.NUMBER, this._$.first_line, this._$.first_column+1);
				grammar_stack.push({'PRIMITIVO -> num {SS=builder.newValue(Param)}':['token: num\t Lexema: ' + $1]}); }
		// | tk_asterisco { $$=builder.newValue($1, Tipos.ASTERISCO, this._$.first_line, this._$.first_column+1); grammar_stack.push({'PRIMITIVO -> tk_asterisco {SS=builder.newValue(Param)}':['token: tk_asterisco\t Lexema: ' + $1]}); }
		| tk_punto { $$=builder.newCurrent($1, this._$.first_line, this._$.first_column+1); 
					 grammar_stack.push({'PRIMITIVO -> tk_punto {SS=builder.newCurrent(Param)}':['token: tk_punto\t Lexema: ' + $1]}); }
		| tk_2puntos { $$=builder.newParent($1, this._$.first_line, this._$.first_column+1);
					   grammar_stack.push({'PRIMITIVO -> tk_2puntos {SS=builder.newParent(Param)}':['token: tk_2puntos\t Lexema: ' + $1]}); }
		| tk_arroba tk_id { $$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1);
							grammar_stack.push({'PRIMITIVO -> tk_arroba tk_id {SS=builder.newAttribute(Param)}':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_id\t Lexema: ' + $2]}); }
		| tk_arroba tk_asterisco { $$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1); 
							 grammar_stack.push({'PRIMITIVO -> tk_arroba tk_asterisco {SS=builder.newAttribute(Param)}':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_asterisco\t Lexema: ' + $2]});}
        // | tk_content
;

STRING: tk_string_d { $$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1);
						   grammar_stack.push({'PRIMITIVO -> tk_attribute_d {SS=builder.newValue(Param)}':['token: tk_attribute_d\t Lexema: ' + $1]}); }
		| tk_string_s { $$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1); 
						   grammar_stack.push({'PRIMITIVO -> tk_attribute_s {SS=builder.newValue(Param)}':['token: tk_attribute_s\t Lexema: ' + $1]}); }
;

FUNC: tk_text tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_TEXT, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -> tk_text tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_text\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_last tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_LAST, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -> tk_last tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_last\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_position tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_POSITION, this._$.first_line, this._$.first_column+1); 
									grammar_stack.push({'FUNC -> tk_position tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_position\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
	| tk_node tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_NODE, this._$.first_line, this._$.first_column+1); 
								grammar_stack.push({'FUNC -> tk_node tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_node\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
;

AXIS: AXISNAME tk_4puntos QUERY { $$=builder.newAxisObject($1, $3, this._$.first_line, this._$.first_column+1);
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'AXIS -> AXISNAME tk_4puntos QUERY {SS=builder.newAxisObject(Param)}':[prod_2, 'token: tk_4puntos\t Lexema: ' + $2, prod_1]}); }
;

AXISNAME: tk_ancestor { $$ = Tipos.AXIS_ANCESTOR;
						grammar_stack.push({'AXISNAME -> tk_ancestor {SS = Tipos.AxisTipo}':['token: tk_ancestor\t Lexema: ' + $1]}); }
		| tk_ancestor2 { $$ = Tipos.AXIS_ANCESTOR_OR_SELF;
						grammar_stack.push({'AXISNAME -> tk_ancestor2 {SS = Tipos.AxisTipo}':['token: tk_ancestor2\t Lexema: ' + $1]}); }
		| tk_attribute { $$ = Tipos.AXIS_ATTRIBUTE;
						grammar_stack.push({'AXISNAME -> tk_attribute {SS = Tipos.AxisTipo}':['token: tk_attribute\t Lexema: ' + $1]}); }
		| tk_child { $$ = Tipos.AXIS_CHILD;
						grammar_stack.push({'AXISNAME -> tk_child {SS = Tipos.AxisTipo}':['token: tk_child\t Lexema: ' + $1]}); }
		| tk_descendant { $$ = Tipos.AXIS_DESCENDANT;
						grammar_stack.push({'AXISNAME -> tk_descendant {SS = Tipos.AxisTipo}':['token: tk_descendant\t Lexema: ' + $1]}); }
		| tk_descendant2 { $$ = Tipos.AXIS_DESCENDANT_OR_SELF;
						grammar_stack.push({'AXISNAME -> tk_descendant2 {SS = Tipos.AxisTipo}':['token: tk_descendant2\t Lexema: ' + $1]}); }
		| tk_following { $$ = Tipos.AXIS_FOLLOWING;
						grammar_stack.push({'AXISNAME -> tk_following {SS = Tipos.AxisTipo}':['token: tk_following\t Lexema: ' + $1]}); }
		| tk_following2 { $$ = Tipos.AXIS_FOLLOWING_SIBLING;
						grammar_stack.push({'AXISNAME -> tk_following2 {SS = Tipos.AxisTipo}':['token: tk_follownig2\t Lexema: ' + $1]}); }
		| tk_namespace { $$ = Tipos.AXIS_NAMESPACE;
						grammar_stack.push({'AXISNAME -> tk_namespace {SS = Tipos.AxisTipo}':['token: tk_namespace\t Lexema: ' + $1]}); }
		| tk_parent { $$ = Tipos.AXIS_PARENT;
						grammar_stack.push({'AXISNAME -> tk_parent {SS = Tipos.AxisTipo}':['token: tk_parent\t Lexema: ' + $1]}); }
		| tk_preceding { $$ = Tipos.AXIS_PRECEDING;
						grammar_stack.push({'AXISNAME -> tk_preceding {SS = Tipos.AxisTipo}':['token: tk_preceding\t Lexema: ' + $1]}); }
		| tk_preceding2 { $$ = Tipos.AXIS_PRECEDING_SIBLING;
						grammar_stack.push({'AXISNAME -> tk_preceding2 {SS = Tipos.AxisTipo}':['token: tk_preceding2\t Lexema: ' + $1]}); }
		| tk_self { $$ = Tipos.AXIS_SELF;
						grammar_stack.push({'AXISNAME -> tk_self {SS = Tipos.AxisTipo}':['token: tk_self\t Lexema: ' + $1]}); }
;
