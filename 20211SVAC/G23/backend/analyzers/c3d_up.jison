/* lexical grammar */
%{
	var attribute = '';
	var errors = [];
	let re = /[^\n\t\r ]+/g
	//let ast = null;
	let grammar_stack = [];

%}
%lex

%options case-insensitive
%x string_doubleq
%x string_singleq

%%

\s+                   	// Whitespace
"//"[\s\S]*?    		// XPATHComment
"/*"[\s\S\n]*?"*/"  	// MultiLineComment
"<?xml"[\s\S\n]*?"?>"	// Declaration XML


[0-9]+("."[0-9]+)?\b    return 'num'
"T"[0-9]+               return 'temporal'
"L"[0-9]+               return 'label'
"#"                     return 'tk_numeral'
"<="					return 'tk_menorigual'
">="					return 'tk_mayorigual'
";"                     return 'tk_ptcoma'
","                     return 'tk_coma'
":"                     return 'tk_2puntos'
"["                     return 'tk_corA'
"]"                     return 'tk_corC'
"("                     return 'tk_ParA'
")"                     return 'tk_ParC'
"{"                     return 'tk_LlaveA'
"}"                     return 'tk_LlaveC'
"*"                     return 'tk_por'
"+"                     return 'tk_mas'
"-"                     return 'tk_menos'
"/"                     return 'tk_div'
"=="                    return 'tk_igual2'
"!="                    return 'tk_diferent'
"%"					    return 'tk_mod'
"<"		        		return 'tk_menor'
">"						return 'tk_mayor'
"="					    return 'tk_equal'

"include"               return 'tk_include'
"stdio.h"               return 'tk_stdio'
"float"                 return 'tk_float'
"void"                  return 'tk_void'
"int"                   return 'tk_int'
"if"                    return 'tk_if'
"goto"                  return 'tk_goto'
"printf"                return 'tk_printf'
"Heap"                  return 'tk_heap'
"Stack"                 return 'tk_stack'
"SP"                    return 'tk_sp'
"HP"                    return 'tk_hp'
"return"                return 'tk_return'

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
.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "C3D", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/lex

%{
//	const { Objeto } = require('../model/xpath/Objeto');
//	const { Tipos } = require('../model/xpath/Enum');
//	var builder = new Objeto();
%}

/* operator associations and precedence */
// %left 'tk_por'
%left 'tk_or' 'tk_line' 'tk_2line'
%left 'tk_and'
%left 'tk_equal' 'tk_diferent' 'tk_menor' 'tk_menorigual' 'tk_mayor' 'tk_mayorigual'
%left 'tk_mas' 'tk_menos'
%left 'tk_div' 'tk_mod' 'tk_asterisco'
%left umenos
%left 'tk_ParA'

%start ini

%% // GRAMATICA DE DOCUMENTO XPath ANALISIS ASCENDENTE

ini: HEAD L_FUN EOF
;

HEAD: tk_numeral tk_include tk_menor tk_stdio tk_mayor L_VR G_TMP
;

L_VR: L_VR VR
    | VR
;

VR: tk_float tk_heap tk_corA num tk_corC tk_ptcoma
    | tk_float tk_stack tk_corA num tk_corC tk_ptcoma
    | tk_float tk_sp tk_ptcoma
    | tk_float tk_hp tk_ptcoma
;

G_TMP: tk_float L_TMP tk_ptcoma
;

L_TMP: L_TMP tk_coma temporal
    | temporal
;

L_FUN: L_FUN FUN
    | FUN
;

FUN: tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN L_ET tk_LlaveC
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_ET tk_LlaveC
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN tk_LlaveC
;

L_ET: L_ET ET
    | ET
;

ET: label tk_2puntos L_SEN
    | label tk_2puntos
;

L_SEN: L_SEN SEN
    | SEN
;

SEN: ASIG
    | IF
    | GO
    | PRT
    | RET
    | CALL
;

RET: tk_return tk_ptcoma
;

CALL: tk_id tk_ParA tk_ParC tk_ptcoma
;

GO: tk_goto label tk_ptcoma 
;

PRT: tk_printf tk_ParA tk_attribute_d tk_coma VALP tk_ParC tk_ptcoma
;

VALP: temporal
    | tk_ParA tk_int tk_ParC temporal
    | num
    | tk_menos num
;

IF: tk_if tk_ParA COND tk_ParC tk_goto label tk_ptcoma
;

COND: VALI RELA VALI 
;

VALI: temporal
    | PRIMI
;

RELA: tk_igual2
    | tk_diferent
    | tk_mayorigual
    | tk_menorigual
    | tk_mayor
    | tk_menor
;

ASIG: TG tk_equal EXP tk_ptcoma 
;

TG: temporal
    | tk_sp
    | tk_hp
    | tk_stack tk_corA INDEX tk_corC
    | tk_heap tk_corA INDEX tk_corC
;

INDEX: tk_sp
    | tk_hp
    | tk_ParA tk_int tk_ParC temporal
    | tk_ParA tk_int tk_ParC num
    | num
;

EXP: EXPNUM
    | VALO
;

EXPNUM: VALO ARI VALO
;

ARI: tk_mas
    | tk_menos
    | tk_por
    | tk_div
    | tk_mod
;

VALO: PUN
    | PRIMI
    | temporal
    | STR
;

PUN: tk_sp
    | tk_hp
;

PRIMI: num {console.log('PRIMI1');}
    | tk_menos num %prec umenos {console.log('PRIMI2');}
;

STR: tk_stack tk_corA INDEX tk_corC
    | tk_heap tk_corA INDEX tk_corC
;