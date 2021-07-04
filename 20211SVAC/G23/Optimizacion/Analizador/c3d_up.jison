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
const { Nodo } = require('./Optimizacion/AST/Node');
const { Grafica } = require('./Optimizacion/AST/Grafica');
let num1, tem, labe;
let tkid, lsen, l_et;
var id = 0;
let codigo;
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

ini: HEAD L_FUN EOF {
    $$ = new Nodo(id++, 'Inicio', '');
    $$.NuevoHijo($1);
    let funciones = new Nodo(id++, 'L_FUN', '');
    for(let i=0; i < $2.length; i++){
        funciones.NuevoHijo($2[i]);
    }
    $$.NuevoHijo(funciones);
    //$$.imprimir();
    let g = new Grafica();
    g.Graficar($$);
    codigo = g.conte;
    console.log('fin del archivo');
    return codigo;
    } 
;

HEAD: tk_numeral tk_include tk_menor tk_stdio tk_mayor L_VR G_TMP {
        $$ = new Nodo(id++, 'HEAD', '');
        $1 = new Nodo(id++, 'tk_numeral', '#'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_include', 'include'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_menor', '<'); $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_stdio', 'stdio.h'); $$.NuevoHijo($4);
        $5 = new Nodo(id++, 'tk_mayor', '>'); $$.NuevoHijo($5);
        let lvr = new Nodo(id++, 'L_VR', '');
        for(let i=0; i<$6.length; i++){
            lvr.NuevoHijo($6[i]);
        }
        $$.NuevoHijo(lvr);
        $$.NuevoHijo($7);
    }
;

L_VR: L_VR VR {$1.push($2); $$ = $1;}
    | VR {$$ = [$1];}
;

VR: tk_float tk_heap tk_corA num tk_corC tk_ptcoma {$$ = new Nodo(id++, 'VR', '');
        $1 = new Nodo(id++, 'tk_float', 'float'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_heap', 'Heap'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4); $$.NuevoHijo(num1);
        $5 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($6);
    }
    | tk_float tk_stack tk_corA num tk_corC tk_ptcoma {$$ = new Nodo(id++, 'VR', '');
        $1 = new Nodo(id++, 'tk_float', 'float'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_stack', 'Stack'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4); $$.NuevoHijo(num1);
        $5 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($6);
    }
    | tk_float tk_sp tk_ptcoma { $$ = new Nodo(id++, 'VR', '');
        $1 = new Nodo(id++, 'tk_float', 'float'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_sp', 'SP'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($3);
    }
    | tk_float tk_hp tk_ptcoma { $$ = new Nodo(id++, 'VR', '');
        $1 = new Nodo(id++, 'tk_float', 'float'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_hp', 'HP'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($3);
    }
;

G_TMP: tk_float L_TMP tk_ptcoma{ $$ = new Nodo(id++, 'G_TMP', ''); 
        $1 = new Nodo(id++, 'tk_float', 'float'); $$.NuevoHijo($1);
        let ltmp = new Nodo(id++, 'L_TMP', '');
        for(let i=0; i<$2.length; i++){
            ltmp.NuevoHijo($2[i]);
        }
        $$.NuevoHijo(ltmp);
        $3 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($3);
    }
;

L_TMP: L_TMP tk_coma temporal {
            tem = new Nodo(id++, 'temporal', $3); $1.push(tem); $$ = $1;
        }
    | temporal { tem = new Nodo(id++, 'temporal', $1); $$ = [tem];}
;

L_FUN: L_FUN FUN {$1.push($2); $$ = $1;}
    | FUN {$$ = [$1]}
;

FUN: tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN L_ET tk_LlaveC {$$ = new Nodo(id++, 'FUN', '');
            $1 = new Nodo(id++, 'tk_void', 'void'); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{'); $$.NuevoHijo($5);
            lsen = new Nodo(id++, 'L_SEN', '');
            for(let i=0; i<$6.length; i++){
                lsen.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(lsen);
            l_et = new Nodo(id++, 'L_ET', '');
            for(let i=0; i<$7.length; i++){
                l_et.NuevoHijo($7[i]);
            }
            $$.NuevoHijo(l_et);
            $8 = new Nodo(id++, 'tk_LlaveC', '}'); $$.NuevoHijo($8);
        }
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_ET tk_LlaveC {$$ = new Nodo(id++, 'FUN', '');
            $1 = new Nodo(id++, 'tk_void', 'void'); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{'); $$.NuevoHijo($5);
            l_et = new Nodo(id++, 'L_ET', '');
            for(let i=0; i<$6.length; i++){
                l_et.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(l_et);
            $7 = new Nodo(id++, 'tk_LlaveC', '}'); $$.NuevoHijo($7);
        }
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN tk_LlaveC {$$ = new Nodo(id++, 'FUN', '');
            $1 = new Nodo(id++, 'tk_void', 'void'); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{'); $$.NuevoHijo($5);
            lsen = new Nodo(id++, 'L_SEN', '');
            for(let i=0; i<$6.length; i++){
                lsen.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(lsen);
            $7 = new Nodo(id++, 'tk_LlaveC', '}'); $$.NuevoHijo($7);
        }
;

L_ET: L_ET ET {$1.push($2); $$ = $1;}
    | ET {$$ = [$1]}
;

ET: label tk_2puntos L_SEN {$$ = new Nodo(id++, 'ET', '');
            labe = new Nodo(id++, 'label', $1); $$.NuevoHijo(labe);
            $2 = new Nodo(id++, 'tk_2puntos', ':'); $$.NuevoHijo($2);
            lsen = new Nodo(id++, 'L_SEN', '');
            for(let i=0; i<$3.length; i++){
                lsen.NuevoHijo($3[i]);
            }
            $$.NuevoHijo(lsen);
        }
    | label tk_2puntos {$$ = new Nodo(id++, 'ET', '');
            labe = new Nodo(id++, 'label', $1); $$.NuevoHijo(labe);
            $2 = new Nodo(id++, 'tk_2puntos', ':'); $$.NuevoHijo($2);
        }
;

L_SEN: L_SEN SEN {$1.push($2); $$ = $1;}
    | SEN {$$ = [$1]}
;

SEN: ASIG {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
    | IF {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
    | GO {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
    | PRT {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
    | RET {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
    | CALL {$$ = new Nodo(id++, 'SEN', ''); $$.NuevoHijo($1);}
;

RET: tk_return tk_ptcoma {$$ = new Nodo(id++, 'RET', '');
        $1 = new Nodo(id++, 'tk_return', 'return'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($2);
    }
;

CALL: tk_id tk_ParA tk_ParC tk_ptcoma { $$ = new Nodo(id++, 'CALL', '');
        tkid = new Nodo(id++, 'tk_id', $1); $$.NuevoHijo(tkid);
        $2 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($4);
    }
;

GO: tk_goto label tk_ptcoma {$$ = new Nodo(id++, 'GO', '');
        $1 = new Nodo(id++, 'tk_goto', 'goto'); $$.NuevoHijo($1);
        labe = new Nodo(id++, 'label', $2); $$.NuevoHijo(labe);
        $3 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($3);
    }
;

PRT: tk_printf tk_ParA tk_attribute_d tk_coma VALP tk_ParC tk_ptcoma {$$ = new Nodo(id++, 'PRT', '');
        $1 = new Nodo(id++, 'tk_printf', 'printf'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($2);
        let attriD = new Nodo(id++, 'tk_attribute_d', $3); $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_coma', ','); $$.NuevoHijo($4);
        $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($6);
        $7 = new Nodo(id++, 'tk_ParA', ';'); $$.NuevoHijo($7);

    }
;

VALP: temporal {$$ = new Nodo(id++, 'VALP', '');
        tem = new Nodo(id++, 'temporal', $1); $$.NuevoHijo(tem);
    }
    | tk_ParA tk_int tk_ParC temporal {$$ = new Nodo(id++, 'VALP', '');
        $1 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($3);
        tem = new Nodo(id++, 'temporal', $4); $$.NuevoHijo(tem);
    }
    | num {$$ = new Nodo(id++, 'VALP', '');
        num1 = new Nodo(id++, 'num', $1); $$.NuevoHijo(num1);
    }
    | tk_menos num{$$ = new Nodo(id++, 'VALP', '');
        $1 = new Nodo(id++, 'tk_menos', '-'); $$.NuevoHijo($1);
        num1 = new Nodo(id++, 'num', $2); $$.NuevoHijo(num1);
    }
;

IF: tk_if tk_ParA COND tk_ParC tk_goto label tk_ptcoma {$$ = new Nodo(id++, 'IF', '');
        $1 = new Nodo(id++, 'tk_if', 'if'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($4);
        $5 = new Nodo(id++, 'tk_goto', 'goto'); $$.NuevoHijo($5);
        labe = new Nodo(id++, 'label', $6); $$.NuevoHijo(labe);
        $7 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($7);
    }
;

COND: VALI RELA VALI {$$ = new Nodo(id++, 'COND', '');
        $$.NuevoHijo($1);
        $$.NuevoHijo($2);
        $$.NuevoHijo($3);
    }
;

VALI: TEMP {$$ = new Nodo(id++, 'VALI', '');
        $$.NuevoHijo($1);
    }
    | PRIMI {$$ = new Nodo(id++, 'VALI', '');
        $$.NuevoHijo($1);
    }
;

RELA: tk_igual2 {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_igual2', '=='); $$.NuevoHijo($1);
    }
    | tk_diferent {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_diferent', '!='); $$.NuevoHijo($1);
    }
    | tk_mayorigual {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_mayorigual', '>='); $$.NuevoHijo($1);
    }
    | tk_menorigual {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_menorigual', '<='); $$.NuevoHijo($1);
    }
    | tk_mayor {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_mayor', '>'); $$.NuevoHijo($1);
    }
    | tk_menor {$$ = new Nodo(id++, 'RELA', '');
        $1 = new Nodo(id++, 'tk_menor', '<'); $$.NuevoHijo($1);
    }
;

ASIG: TG tk_equal EXP tk_ptcoma {$$ = new Nodo(id++, 'ASIG', '');
        $$.NuevoHijo($1); 
        $2 = new Nodo(id++, 'tk_equal', '='); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ptcoma', ';'); $$.NuevoHijo($4);
    }
;

TG: temporal {$$ = new Nodo(id++, 'TG', '');
        tem = new Nodo(id++, 'temporal', $1); $$.NuevoHijo(tem);
    }
    | tk_sp {$$ = new Nodo(id++, 'TG', '');
        $1 = new Nodo(id++, 'tk_sp', 'SP'); $$.NuevoHijo($1);
    }
    | tk_hp {$$ = new Nodo(id++, 'TG', '');
        $1 = new Nodo(id++, 'tk_hp', 'HP'); $$.NuevoHijo($1);
    }
    | tk_stack tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'TG', '');
        $1 = new Nodo(id++, 'tk_stack', 'Stack'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($4);
    }
    | tk_heap tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'TG', '');
        $1 = new Nodo(id++, 'tk_heap', 'HEAP'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($4);
    }
;

INDEX: tk_sp {$$ = new Nodo(id++, 'INDEX', '');
        $1 = new Nodo(id++, 'tk_sp', 'SP'); $$.NuevoHijo($1);
    }
    | tk_hp {$$ = new Nodo(id++, 'INDEX', '');
        $1 = new Nodo(id++, 'tk_hp', 'HP'); $$.NuevoHijo($1);
    }
    | tk_ParA tk_int tk_ParC temporal {$$ = new Nodo(id++, 'INDEX', '');
        $1 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($3);
        tem = new Nodo(id++, 'temporal', $4); $$.NuevoHijo(tem);
    }
    | tk_ParA tk_int tk_ParC num {$$ = new Nodo(id++, 'INDEX', '');
        $1 = new Nodo(id++, 'tk_ParA', '('); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int'); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')'); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4); $$.NuevoHijo(num1);
    }
    | num {$$ = new Nodo(id++, 'INDEX', '');
        num1 = new Nodo(id++, 'num', $1); $$.NuevoHijo(num1);
    }
;

EXP: EXPNUM {$$ = new Nodo(id++, 'EXP', '');
        $$.NuevoHijo($1);
    }
    | VALO {$$ = new Nodo(id++, 'EXP', '');
        $$.NuevoHijo($1);
    }
;

EXPNUM: VALO ARI VALO {$$ = new Nodo(id++, 'EXPNUM', '');
        $$.NuevoHijo($1);
        $$.NuevoHijo($2);
        $$.NuevoHijo($3);
    }
;

ARI: tk_mas {$$ = new Nodo(id++, 'ARI', '');
        $1 = new Nodo(id++, 'tk_mas', '+'); $$.NuevoHijo($1);
    }
    | tk_menos {$$ = new Nodo(id++, 'ARI', '');
        $1 = new Nodo(id++, 'tk_menos', '-'); $$.NuevoHijo($1);
    }
    | tk_por {$$ = new Nodo(id++, 'ARI', '');
        $1 = new Nodo(id++, 'tk_por', '*'); $$.NuevoHijo($1);
    }
    | tk_div {$$ = new Nodo(id++, 'ARI', '');
        $1 = new Nodo(id++, 'tk_div', '/'); $$.NuevoHijo($1);
    }
    | tk_mod {$$ = new Nodo(id++, 'ARI', '');
        $1 = new Nodo(id++, 'tk_mod', '%'); $$.NuevoHijo($1);
    }
;

VALO: PUN {$$ = new Nodo(id++, 'VALO', '');
        $$.NuevoHijo($1);
    }
    | PRIMI {$$ = new Nodo(id++, 'VALO', '');
        $$.NuevoHijo($1);
    }
    | TEMP {$$ = new Nodo(id++, 'VALO', '');
        $$.NuevoHijo($1);
    }
    | STR {$$ = new Nodo(id++, 'VALO', '');
        $$.NuevoHijo($1);
    }
;

PUN: tk_sp {$$ = new Nodo(id++, 'PUN', '');
            $1 = new Nodo(id++, 'tk_sp', 'SP'); $$.NuevoHijo($1);
        }
    | tk_hp {$$ = new Nodo(id++, 'PUN', '');
        $1 = new Nodo(id++, 'tk_hp', 'HP'); $$.NuevoHijo($1);
    }
;

PRIMI: num {$$ = new Nodo(id++, 'PRIMI', '');
        num1 = new Nodo(id++, 'num', $1); $$.NuevoHijo(num1);
    }
    | tk_menos num %prec umenos { $$ = new Nodo(id++, 'PRIMI', '');
        $1 = new Nodo(id++, 'tk_menos', '-');
        num1 = new Nodo(id++, 'num', $2); $$.NuevoHijo(num1);
    }
;

TEMP: temporal { $$ = new Nodo(id++, 'TEMP', '');
        tem = new Nodo(id++, 'temporal', $1); $$.NuevoHijo(tem);
    }
;

STR: tk_stack tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'STR', '');
        $1 = new Nodo(id++, 'tk_stack', 'Stack'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($4);
    }
    | tk_heap tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'STR', '');
        $1 = new Nodo(id++, 'tk_heap', 'Heap'); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '['); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']'); $$.NuevoHijo($4);
    }
;