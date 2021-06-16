%{
	var attribute = '';
	var errors = [];
	let grammar_stack = [];
	function printstrack(obj, lines){
        if(Array.isArray(obj)){ //IS ARRAY
            str = ""
            for(let i = 0; i < lines; i++){str = str + "- ";}
            obj.forEach((value)=>{
                if(typeof value === 'string' ){
                     str = ""
                     for(let i = 0; i < lines; i++){str = str + "- ";}
                     console.log(str + value);
                }else if(Array.isArray(value)){console.log("ERROR 5");}else{
                    str = ""
                    for(let i = 0; i < lines; i++){ str = str + "- ";}
                    for(let key in value){
                       console.log(`${str}${key}`);
                       printstrack(value[key], lines + 1);
                    }
                }

                //printstrack(value, lines +1);
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            str = ""
            for(let i = 0; i < lines; i++){str = str + "- ";}
            console.log(str + obj);
        }else{// IS OBJECT
            str = ""
            for(let i = 0; i < lines; i++){ str = str + "- ";}
            for(let key in obj){
                console.log(`${str}Key: ${key}`);
                //console.log(obj[key]);
                printstrack(obj[key], lines + 1);
            }
        }
	}
%}
%lex

%options case-insensitive
%x string_doubleq
%x string_singleq

%%

\s+                   	// Whitespace
"(:"[\s\S\n]*?":)"		// XPATHComment
"<!--"[\s\S\n]*?"-->"	// MultiLineComment
"<?xml"[\s\S\n]*?"?>"	// Declaration XML

"div"                   return 'tk_div'
[0-9]+("."[0-9]+)?\b    return 'num'
"<="					return 'tk_menorigual'
">="					return 'tk_mayorigual'
"<"		        		return 'tk_menor'
">"						return 'tk_mayor'
"//"                    return 'tk_2bar'
"/"						return 'tk_bar'
"="						return 'tk_equal'
".."                    return 'tk_2puntos'
"."                     return 'tk_punto'
"::"                    return 'tk_4puntos'
"@"                     return 'tk_arroba'
"["                     return 'tk_corA'
"]"                     return 'tk_corC'
"("                     return 'tk_ParA'
")"                     return 'tk_ParC'
"*"                     return 'tk_asterisco'
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
"or"					return 'tk_or'
"and"					return 'tk_and'
"mod"					return 'tk_mod'

[\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]+ return 'tk_id'

["]								{ attribute = ''; this.begin("string_doubleq"); }
<string_doubleq>[^"\\]+			{ attribute += yytext; }
<string_doubleq>"\\\""			{ attribute += "\""; }
<string_doubleq>"\\n"			{ attribute += "\n"; }
<string_doubleq>\s				{ attribute += " ";  }
<string_doubleq>"\\t"			{ attribute += "\t"; }
<string_doubleq>"\\\\"			{ attribute += "\\"; }
<string_doubleq>"\\\'"			{ attribute += "\'"; }
<string_doubleq>"\\r"			{ attribute += "\r"; }
<string_doubleq>["]				{ yytext = attribute; this.popState(); return 'tk_attribute_d'; }

[']								{ attribute = ''; this.begin("string_singleq"); }
<string_singleq>[^'\\]+			{ attribute += yytext; }
<string_singleq>"\\\""			{ attribute += "\""; }
<string_singleq>"\\n"			{ attribute += "\n"; }
<string_singleq>\s				{ attribute += " ";  }
<string_singleq>"\\t"			{ attribute += "\t"; }
<string_singleq>"\\\\"			{ attribute += "\\"; }
<string_singleq>"\\\'"			{ attribute += "\'"; }
<string_singleq>"\\r"			{ attribute += "\r"; }
<string_singleq>[']				{ yytext = attribute; this.popState(); return 'tk_attribute_s'; }


<<EOF>>               	return 'EOF'
[^></]+					return 'anything'
.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "XPath", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/* operator associations and precedence */
/lex
%left 'tk_or' 'tk_line'
%left 'tk_and'
%left 'tk_equal' 'tk_diferent' 'tk_menor' 'tk_menorigual' 'tk_mayor' 'tk_mayorigual'
%left 'tk_mas' 'tk_menos'
%left 'tk_div' 'tk_mod' 'tk_asterisco'
%left umenos
%left 'tk_ParA'
%start ini

%% // GRAMATICA DE DOCUMENTO XPath ANALISIS ASCENDENTE

ini: XPATH_U EOF {
	prod_1 = grammar_stack.pop();
	prod_2 = grammar_stack.pop();
	grammar_stack.push({'ini -: XPATH_U EOF ':[prod_2, prod_1]});
	printstrack(grammar_stack, 0);
	console.log('gramatica descendente');
	}
;

XPATH_U: XPATH XPATH_Up {
		prod_1 = grammar_stack.pop();
		prod_2 = grammar_stack.pop();
		grammar_stack.push({'XPATH_U -: XPATH XPATH_Up ':[prod_2, prod_1]});
}
;

XPATH_Up: tk_line XPATH XPATH_Up {
		prod_1 = grammar_stack.pop();
		prod_2 = grammar_stack.pop();
		grammar_stack.push({'XPATH_Up -: tk_line XPATH XPATH_Up ':['token: tk_line\t Lexema: ' + $1, prod_2, prod_1]});
}
		| { grammar_stack.push({'XPATH_Up -: Empty': ['EMPTY']}); }
;

XPATH: QUERY XPATHp {
		prod_1 = grammar_stack.pop();
		prod_2 = grammar_stack.pop();
		grammar_stack.push({'XPATH -: QUERY XPATHp ':[prod_2, prod_1]});
}
;

XPATHp: QUERY XPATHp {
		prod_1 = grammar_stack.pop();
		prod_2 = grammar_stack.pop();
		grammar_stack.push({'XPATHp -: QUERY XPATHp ':[prod_2, prod_1]});
}
		| { grammar_stack.push({'XPATHp -: Empty': ['EMPTY']}); }
; 

QUERY: tk_2bar QUERY { //$$=builder.newDoubleAxis($2, this._$.first_line, this._$.first_column+1);
					   prod_1 = grammar_stack.pop();
			 		   grammar_stack.push({'QUERY -: tk_2bar QUERY': ['token: tk_2bar\t Lexema: ' + $1, prod_1]}); }
	| tk_bar QUERY { //$$=builder.newAxis($2, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
			 		 grammar_stack.push({'QUERY -: tk_bar QUERY': ['token: tk_bar\t Lexema: ' + $1, prod_1]}); }
	| EXP_PR { //$$=$1;
			   prod_1 = grammar_stack.pop();
			   grammar_stack.push({'QUERY -: EXP_PR': [prod_1]}); }
	| AXIS { //$$=$1;
			 prod_1 = grammar_stack.pop();
			 grammar_stack.push({'QUERY -: AXIS': [prod_1]}); }
;

CORCHET: tk_corA E tk_corC CORCHETpp {
			prod_1 = grammar_stack.pop();
			prod_2 = grammar_stack.pop();
			grammar_stack.push({'CORCHET -: tk_corA E tk_corC CORCHETpp': ['token: tk_menorigual\t Lexema: ' + $1, prod_2, 'token: tk_menorigual\t Lexema: ' + $3, prod_1]});	
}
;

CORCHETpp: tk_corA E tk_corC CORCHETpp {
										prod_1 = grammar_stack.pop();
										prod_2 = grammar_stack.pop();
										grammar_stack.push({'CORCHETpp -: tk_corA E tk_corC CORCHETpp ':['token: tk_menorigual\t Lexema: ' + $1, prod_2, 'token: tk_menorigual\t Lexema: ' + $3, prod_1]});	
}//jison es case sensitive cuando se trata de terminales?
		| { grammar_stack.push({'CORCHETpp -: Empty': ['EMPTY']}); }
;

CORCHETP: CORCHET { prod_1 = grammar_stack.pop();
					grammar_stack.push({'CORCHETP -: CORCHET': [prod_1]}) }
		| { grammar_stack.push({'CORCHETP -: Empty': ['EMPTY']}); }
;

E:	E tk_menorigual E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENORIGUAL, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
				 		prod_2 = grammar_stack.pop();
					    grammar_stack.push({'E -: E tk_menorigual E': [prod_2, 'token: tk_menorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_menor E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -: E tk_menor E': [prod_2, 'token: tk_menor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayorigual E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYORIGUAL, this._$.first_line, this._$.first_column+1);
						  prod_1 = grammar_stack.pop();
				 		  prod_2 = grammar_stack.pop();
						  grammar_stack.push({'E -: E tk_mayorigual E': [prod_2, 'token: tk_mayorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayor E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -: E tk_mayor E': [prod_2, 'token: tk_mayor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mas E { //$$=builder.newOperation($1, $3, Tipos.OPERACION_SUMA, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -: E tk_mas E': [prod_2, 'token: tk_mas\t Lexema: ' + $2, prod_1]}); }
	| E tk_menos E { //$$=builder.newOperation($1, $3, Tipos.OPERACION_RESTA, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				  	 grammar_stack.push({'E -: E tk_menos E': [prod_2, 'token: tk_menos\t Lexema: ' + $2, prod_1]}); }
	| E tk_asterisco E { //$$=builder.newOperation($1, $3, Tipos.OPERACION_MULTIPLICACION, this._$.first_line, this._$.first_column+1);
						 prod_1 = grammar_stack.pop();
				 		 prod_2 = grammar_stack.pop();
				  		 grammar_stack.push({'E -: E tk_asterisco E': [prod_2, 'token: tk_asterisco\t Lexema: ' + $2, prod_1]}); }
	| E tk_div E { //$$=builder.newOperation($1, $3, Tipos.OPERACION_DIVISION, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -: E tk_div E': [prod_2, 'token: tk_div\t Lexema: ' + $2, prod_1]}); }
	| E tk_mod E { //$$=builder.newOperation($1, $3, Tipos.OPERACION_MODULO, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -: E tk_mod E': [prod_2, 'token: tk_mod\t Lexema: ' + $2, prod_1]}); }
	| tk_menos E %prec umenos { //$$=builder.newOperation($2, null, Tipos.OPERACION_NEGACION_UNARIA, this._$.first_line, this._$.first_column+1); 
								prod_1 = grammar_stack.pop();
						  		grammar_stack.push({'E -: tk_menos E': ['token: tk_menos\t Lexema: ' + $1, prod_1]});}
	| tk_ParA E tk_ParC { //$$=$2;
						  prod_1 = grammar_stack.pop();
						  grammar_stack.push({'E -: tk_ParA E tk_ParC': ['token: tk_ParA\t Lexema: ' + $1, prod_1, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| E tk_or E { //$$=builder.newOperation($1, $3, Tipos.LOGICA_OR, this._$.first_line, this._$.first_column+1);
				  prod_1 = grammar_stack.pop();
				  prod_2 = grammar_stack.pop();
				  grammar_stack.push({'E -: E tk_or E': [prod_2, 'token: tk_or\t Lexema: ' + $2, prod_1]}); }
	| E tk_and E { //$$=builder.newOperation($1, $3, Tipos.LOGICA_AND, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -: E tk_and E': [prod_2, 'token: tk_and\t Lexema: ' + $2, prod_1]}); }
	| E tk_equal E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_IGUAL, this._$.first_line, this._$.first_column+1); 
					 prod_1 = grammar_stack.pop();
					 prod_2 = grammar_stack.pop();
					 grammar_stack.push({'E -: E tk_equal E': [prod_2, 'token: tk_equal\t Lexema: ' + $2, prod_1]}); }
	| E tk_diferent E { //$$=builder.newOperation($1, $3, Tipos.RELACIONAL_DIFERENTE, this._$.first_line, this._$.first_column+1); 
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'E -: E tk_diferent E': [prod_2, 'token: tk_diferent\t Lexema: ' + $2, prod_1]}); }	
	| QUERY { //$$=$1;
			  prod_1 = grammar_stack.pop();
			  grammar_stack.push({'E -: QUERY': [prod_1]}); }
;

EXP_PR: FUNC CORCHETP { //$$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'EXP_PR -: FUNC CORCHETP': [prod_2, prod_1]}); } // Predicado puede ser nulo
		| PRIMITIVO CORCHETP { //$$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1); 
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'EXP_PR -: PRIMITIVO CORCHETP': [prod_2, prod_1]}); }
;

PRIMITIVO: tk_id { //$$=builder.newNodename($1, this._$.first_line, this._$.first_column+1);
				   grammar_stack.push({'PRIMITIVO -: tk_id':['token: tk_text\t Lexema: ' + $1]}); }
		| tk_attribute_d { //$$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1);
						   grammar_stack.push({'PRIMITIVO -: tk_attribute_d':['token: tk_attribute_d\t Lexema: ' + $1]}); }
		| tk_attribute_s { //$$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1); 
						   grammar_stack.push({'PRIMITIVO -: tk_attribute_s':['token: tk_attribute_s\t Lexema: ' + $1]}); }
		| num { //$$=builder.newValue($1, Tipos.NUMBER, this._$.first_line, this._$.first_column+1);
				grammar_stack.push({'PRIMITIVO -: num':['token: num\t Lexema: ' + $1]}); }
		| tk_asterisco { //$$=builder.newValue($1, Tipos.ASTERISCO, this._$.first_line, this._$.first_column+1);
				   grammar_stack.push({'PRIMITIVO -: tk_asterisco':['token: tk_asterisco\t Lexema: ' + $1]}); }
		| tk_punto { //$$=builder.newCurrent($1, this._$.first_line, this._$.first_column+1); 
					 grammar_stack.push({'PRIMITIVO -: tk_punto':['token: tk_punto\t Lexema: ' + $1]}); }
		| tk_2puntos { //$$=builder.newParent($1, this._$.first_line, this._$.first_column+1);
					   grammar_stack.push({'PRIMITIVO -: tk_2puntos':['token: tk_2puntos\t Lexema: ' + $1]}); }
		| tk_arroba tk_id { //$$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1);
							grammar_stack.push({'PRIMITIVO -: tk_arroba tk_id':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_id\t Lexema: ' + $2]}); }
		| tk_arroba tk_asterisco { //$$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1); 
							 grammar_stack.push({'PRIMITIVO -: tk_arroba tk_asterisco':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_asterisco\t Lexema: ' + $2]});}
;

FUNC: tk_text tk_ParA tk_ParC { //$$=builder.newValue($1, Tipos.FUNCION_TEXT, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -: tk_text tk_ParA tk_ParC':['token: tk_text\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_last tk_ParA tk_ParC { //$$=builder.newValue($1, Tipos.FUNCION_LAST, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -: tk_last tk_ParA tk_ParC':['token: tk_last\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_position tk_ParA tk_ParC { //$$=builder.newValue($1, Tipos.FUNCION_POSITION, this._$.first_line, this._$.first_column+1); 
									grammar_stack.push({'FUNC -: tk_position tk_ParA tk_ParC':['token: tk_position\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
	| tk_node tk_ParA tk_ParC { //$$=builder.newValue($1, Tipos.FUNCION_NODE, this._$.first_line, this._$.first_column+1); 
								grammar_stack.push({'FUNC -: tk_node tk_ParA tk_ParC':['token: tk_node\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
;

AXIS: AXISNAME tk_4puntos QUERY { //$$=builder.newAxisObject($1, $3, this._$.first_line, this._$.first_column+1);
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'AXIS -: AXISNAME tk_4puntos QUERY':[prod_2, 'token: tk_4puntos\t Lexema: ' + $2, prod_1]}); }
;

AXISNAME: tk_ancestor { //$$ = Tipos.AXIS_ANCESTOR;
						grammar_stack.push({'AXISNAME -: tk_ancestor':['token: tk_ancestor\t Lexema: ' + $1]}); }
		| tk_ancestor2 { //$$ = Tipos.AXIS_ANCESTOR_OR_SELF;
						grammar_stack.push({'AXISNAME -: tk_ancestor2':['token: tk_ancestor2\t Lexema: ' + $1]}); }
		| tk_attribute { //$$ = Tipos.AXIS_ATTRIBUTE;
						grammar_stack.push({'AXISNAME -: tk_attribute':['token: tk_attribute\t Lexema: ' + $1]}); }
		| tk_child { //$$ = Tipos.AXIS_CHILD;
						grammar_stack.push({'AXISNAME -: tk_child':['token: tk_child\t Lexema: ' + $1]}); }
		| tk_descendant { //$$ = Tipos.AXIS_DESCENDANT;
						grammar_stack.push({'AXISNAME -: tk_descendant':['token: tk_descendant\t Lexema: ' + $1]}); }
		| tk_descendant2 { //$$ = Tipos.AXIS_DESCENDANT_OR_SELF;
						grammar_stack.push({'AXISNAME -: tk_descendant2':['token: tk_descendant2\t Lexema: ' + $1]}); }
		| tk_following { //$$ = Tipos.AXIS_FOLLOWING;
						grammar_stack.push({'AXISNAME -: tk_following':['token: tk_following\t Lexema: ' + $1]}); }
		| tk_following2 { //$$ = Tipos.AXIS_FOLLOWING_SIBLING;
						grammar_stack.push({'AXISNAME -: tk_following2':['token: tk_follownig2\t Lexema: ' + $1]}); }
		| tk_namespace { //$$ = Tipos.AXIS_NAMESPACE;
						grammar_stack.push({'AXISNAME -: tk_namespace':['token: tk_namespace\t Lexema: ' + $1]}); }
		| tk_parent { //$$ = Tipos.AXIS_PARENT;
						grammar_stack.push({'AXISNAME -: tk_parent':['token: tk_parent\t Lexema: ' + $1]}); }
		| tk_preceding { //$$ = Tipos.AXIS_PRECEDING;
						grammar_stack.push({'AXISNAME -: tk_preceding':['token: tk_preceding\t Lexema: ' + $1]}); }
		| tk_preceding2 { //$$ = Tipos.AXIS_PRECEDING_SIBLING;
						grammar_stack.push({'AXISNAME -: tk_preceding2':['token: tk_preceding2\t Lexema: ' + $1]}); }
		| tk_self { //$$ = Tipos.AXIS_SELF;
						grammar_stack.push({'AXISNAME -: tk_self':['token: tk_self\t Lexema: ' + $1]}); }
;