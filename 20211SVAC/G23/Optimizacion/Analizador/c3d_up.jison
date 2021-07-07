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
"//"[\s\S]*?    		// 1LineComment
"/\*([^*]|\*+[^/*])*\*+/"  	// MultiLineComment
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

const { Nodo } = require('../AST/Node');
const { Grafica } = require('../AST/Grafica');
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
    $$ = new Nodo(id++, 'Inicio', '', 0, 0);
    $$.NuevoHijo($1);
    let funciones = new Nodo(id++, 'L_FUN', '', 0, 0);
    for(let i=0; i < $2.length; i++){
        funciones.NuevoHijo($2[i]);
    }
    $$.NuevoHijo(funciones);
    //$$.imprimir();
    let g = new Grafica();
    g.Graficar($$);
    codigo = g.conte;
    console.log('fin del archivo');
    var arreg = new Array(2);
    arreg[0] = codigo;
    arreg[1] = $$;
    return arreg;
    } 
;

HEAD: tk_numeral tk_include tk_menor tk_stdio tk_mayor L_VR G_TMP {
        $$ = new Nodo(id++, 'HEAD', '', 0, 0);
        $1 = new Nodo(id++, 'tk_numeral', '#', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_include', 'include', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_menor', '<', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_stdio', 'stdio.h', @4.first_line, @4.first_column); $$.NuevoHijo($4);
        $5 = new Nodo(id++, 'tk_mayor', '>', @5.first_line, @5.first_column); $$.NuevoHijo($5);
        let lvr = new Nodo(id++, 'L_VR', '', 0, 0);
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

VR: tk_float tk_heap tk_corA num tk_corC tk_ptcoma {$$ = new Nodo(id++, 'VR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_float', 'float', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_heap', 'Heap', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_corA', '[', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4, @4.first_line, @4.first_column); $$.NuevoHijo(num1);
        $5 = new Nodo(id++, 'tk_corC', ']', @5.first_line, @5.first_column); $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ptcoma', ';', @6.first_line, @6.first_column); $$.NuevoHijo($6);
    }
    | tk_float tk_stack tk_corA num tk_corC tk_ptcoma {$$ = new Nodo(id++, 'VR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_float', 'float', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_stack', 'Stack', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_corA', '[', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4, @4.first_line, @4.first_column); $$.NuevoHijo(num1);
        $5 = new Nodo(id++, 'tk_corC', ']', @5.first_line, @5.first_column); $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ptcoma', ';', @6.first_line, @6.first_column); $$.NuevoHijo($6);
    }
    | tk_float tk_sp tk_ptcoma { $$ = new Nodo(id++, 'VR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_float', 'float', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_sp', 'SP', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ptcoma', ';', @3.first_line, @3.first_column); $$.NuevoHijo($3);
    }
    | tk_float tk_hp tk_ptcoma { $$ = new Nodo(id++, 'VR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_float', 'float', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_hp', 'HP', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ptcoma', ';', @3.first_line, @3.first_column); $$.NuevoHijo($3);
    }
;

G_TMP: tk_float L_TMP tk_ptcoma{ $$ = new Nodo(id++, 'G_TMP', '', 0, 0); 
        $1 = new Nodo(id++, 'tk_float', 'float', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        let ltmp = new Nodo(id++, 'L_TMP', '', 0, 0);
        for(let i=0; i<$2.length; i++){
            ltmp.NuevoHijo($2[i]);
        }
        $$.NuevoHijo(ltmp);
        $3 = new Nodo(id++, 'tk_ptcoma', ';', @3.first_line, @3.first_column); $$.NuevoHijo($3);
    }
;

L_TMP: L_TMP tk_coma temporal {
            tem = new Nodo(id++, 'temporal', $3, @3.first_line, @3.first_column); $1.push(tem); $$ = $1;
        }
    | temporal { tem = new Nodo(id++, 'temporal', $1, @1.first_line, @1.first_column); $$ = [tem];}
;

L_FUN: L_FUN FUN {$1.push($2); $$ = $1;}
    | FUN {$$ = [$1]}
;

FUN: tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN L_ET tk_LlaveC {$$ = new Nodo(id++, 'FUN', '', 0, 0);
            $1 = new Nodo(id++, 'tk_void', 'void', @1.first_line, @1.first_column); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2, @2.first_line, @2.first_column); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '(', @3.first_line, @3.first_column); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')', @4.first_line, @4.first_column); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{', @5.first_line, @5.first_column); $$.NuevoHijo($5);
            lsen = new Nodo(id++, 'L_SEN', '', 0, 0);
            for(let i=0; i<$6.length; i++){
                lsen.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(lsen);
            l_et = new Nodo(id++, 'L_ET', '', 0, 0);
            for(let i=0; i<$7.length; i++){
                l_et.NuevoHijo($7[i]);
            }
            $$.NuevoHijo(l_et);
            $8 = new Nodo(id++, 'tk_LlaveC', '}', @8.first_line, @8.first_column); $$.NuevoHijo($8);
        }
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_ET tk_LlaveC {$$ = new Nodo(id++, 'FUN', '', 0, 0);
            $1 = new Nodo(id++, 'tk_void', 'void', @1.first_line, @1.first_column); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2, @2.first_line, @2.first_column); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '(', @3.first_line, @3.first_column); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')', @4.first_line, @4.first_column); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{', @5.first_line, @5.first_column); $$.NuevoHijo($5);
            l_et = new Nodo(id++, 'L_ET', '', 0, 0);
            for(let i=0; i<$6.length; i++){
                l_et.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(l_et);
            $7 = new Nodo(id++, 'tk_LlaveC', '}', @7.first_line, @7.first_column); $$.NuevoHijo($7);
        }
    | tk_void tk_id tk_ParA tk_ParC tk_LlaveA L_SEN tk_LlaveC {$$ = new Nodo(id++, 'FUN', '', 0, 0);
            $1 = new Nodo(id++, 'tk_void', 'void', @1.first_line, @1.first_column); $$.NuevoHijo($1);
            tkid = new Nodo(id++, 'tk_id', $2, @2.first_line, @2.first_column); $$.NuevoHijo(tkid);
            $3 = new Nodo(id++, 'tk_ParA', '(', @3.first_line, @3.first_column); $$.NuevoHijo($3);
            $4 = new Nodo(id++, 'tk_ParC', ')', @4.first_line, @4.first_column); $$.NuevoHijo($4);
            $5 = new Nodo(id++, 'tk_LlaveA', '{', @5.first_line, @5.first_column); $$.NuevoHijo($5);
            lsen = new Nodo(id++, 'L_SEN', '', 0, 0);
            for(let i=0; i<$6.length; i++){
                lsen.NuevoHijo($6[i]);
            }
            $$.NuevoHijo(lsen);
            $7 = new Nodo(id++, 'tk_LlaveC', '}', @7.first_line, @7.first_column); $$.NuevoHijo($7);
        }
;

L_ET: L_ET ET {$1.push($2); $$ = $1;}
    | ET {$$ = [$1]}
;

ET: label tk_2puntos L_SEN {$$ = new Nodo(id++, 'ET', '', 0, 0);
            labe = new Nodo(id++, 'label', $1, @1.first_line, @1.first_column); $$.NuevoHijo(labe);
            $2 = new Nodo(id++, 'tk_2puntos', ':', @2.first_line, @2.first_column); $$.NuevoHijo($2);
            lsen = new Nodo(id++, 'L_SEN', '', 0, 0);
            for(let i=0; i<$3.length; i++){
                lsen.NuevoHijo($3[i]);
            }
            $$.NuevoHijo(lsen);
        }
    | label tk_2puntos {$$ = new Nodo(id++, 'ET', '', 0, 0);
            labe = new Nodo(id++, 'label', $1, @1.first_line, @1.first_column); $$.NuevoHijo(labe);
            $2 = new Nodo(id++, 'tk_2puntos', ':', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        }
;

L_SEN: L_SEN SEN {$1.push($2); $$ = $1;}
    | SEN {$$ = [$1]}
;

SEN: ASIG {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
    | IF {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
    | GO {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
    | PRT {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
    | RET {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
    | CALL {$$ = new Nodo(id++, 'SEN', '', 0, 0); $$.NuevoHijo($1);}
;

RET: tk_return tk_ptcoma {$$ = new Nodo(id++, 'RET', '', 0, 0);
        $1 = new Nodo(id++, 'tk_return', 'return', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ptcoma', ';', @2.first_line, @2.first_column); $$.NuevoHijo($2);
    }
;

CALL: tk_id tk_ParA tk_ParC tk_ptcoma { $$ = new Nodo(id++, 'CALL', '', 0, 0);
        tkid = new Nodo(id++, 'tk_id', $1, @1.first_line, @1.first_column); $$.NuevoHijo(tkid);
        $2 = new Nodo(id++, 'tk_ParA', '(', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ptcoma', ';', @4.first_line, @4.first_column); $$.NuevoHijo($4);
    }
;

GO: tk_goto label tk_ptcoma {$$ = new Nodo(id++, 'GO', '', 0, 0);
        $1 = new Nodo(id++, 'tk_goto', 'goto', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        labe = new Nodo(id++, 'label', $2, @2.first_line, @2.first_column); $$.NuevoHijo(labe);
        $3 = new Nodo(id++, 'tk_ptcoma', ';', @3.first_line, @3.first_column); $$.NuevoHijo($3);
    }
;

PRT: tk_printf tk_ParA tk_attribute_d tk_coma VALP tk_ParC tk_ptcoma {$$ = new Nodo(id++, 'PRT', '', 0, 0);
        $1 = new Nodo(id++, 'tk_printf', 'printf', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ParA', '(', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        let attriD = new Nodo(id++, 'tk_attribute_d', $3, @3.first_line, @3.first_column); $$.NuevoHijo(attriD);
        $4 = new Nodo(id++, 'tk_coma', ',', @4.first_line, @4.first_column); $$.NuevoHijo($4);
        $$.NuevoHijo($5);
        $6 = new Nodo(id++, 'tk_ParC', ')', @6.first_line, @6.first_column); $$.NuevoHijo($6);
        $7 = new Nodo(id++, 'tk_ParA', ';', @7.first_line, @7.first_column); $$.NuevoHijo($7);
    }
;

VALP: temporal {$$ = new Nodo(id++, 'VALP', '', 0, 0);
        tem = new Nodo(id++, 'temporal', $1, @1.first_line, @1.first_column); $$.NuevoHijo(tem);
    }
    | tk_ParA tk_int tk_ParC temporal {$$ = new Nodo(id++, 'VALP', '', 0, 0);
        $1 = new Nodo(id++, 'tk_ParA', '(', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        tem = new Nodo(id++, 'temporal', $4, @4.first_line, @4.first_column); $$.NuevoHijo(tem);
    }
    | num {$$ = new Nodo(id++, 'VALP', '' , 0, 0);
        num1 = new Nodo(id++, 'num', $1, @1.first_line, @1.first_column); $$.NuevoHijo(num1);
    }
    | tk_menos num{$$ = new Nodo(id++, 'VALP', '', 0, 0);
        $1 = new Nodo(id++, 'tk_menos', '-', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        num1 = new Nodo(id++, 'num', $2, @2.first_line, @2.first_column); $$.NuevoHijo(num1);
    }
;

IF: tk_if tk_ParA COND tk_ParC tk_goto label tk_ptcoma {$$ = new Nodo(id++, 'IF', '', 0, 0);
        $1 = new Nodo(id++, 'tk_if', 'if', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_ParA', '(', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ParC', ')', @4.first_line, @4.first_column); $$.NuevoHijo($4);
        $5 = new Nodo(id++, 'tk_goto', 'goto', @5.first_line, @5.first_column); $$.NuevoHijo($5);
        labe = new Nodo(id++, 'label', $6, @6.first_line, @6.first_column); $$.NuevoHijo(labe);
        $7 = new Nodo(id++, 'tk_ptcoma', ';', @7.first_line, @7.first_column); $$.NuevoHijo($7);
    }
;

COND: VALI RELA VALI {$$ = new Nodo(id++, 'COND', '', 0, 0);
        $$.NuevoHijo($1);
        $$.NuevoHijo($2);
        $$.NuevoHijo($3);
    }
;

VALI: TEMP {$$ = new Nodo(id++, 'VALI', '', 0, 0);
        $$.NuevoHijo($1);
    }
    | PRIMI {$$ = new Nodo(id++, 'VALI', '', 0, 0);
        $$.NuevoHijo($1);
    }
;

RELA: tk_igual2 {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_igual2', '==', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_diferent {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_diferent', '!=', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_mayorigual {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_mayorigual', '>=', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_menorigual {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_menorigual', '<=', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_mayor {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_mayor', '>', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_menor {$$ = new Nodo(id++, 'RELA', '', 0, 0);
        $1 = new Nodo(id++, 'tk_menor', '<', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
;

ASIG: TG tk_equal EXP tk_ptcoma {$$ = new Nodo(id++, 'ASIG', '', 0, 0);
        $$.NuevoHijo($1); 
        $2 = new Nodo(id++, 'tk_equal', '=', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_ptcoma', ';', @4.first_line, @4.first_column); $$.NuevoHijo($4);
    }
;

TG: temporal {$$ = new Nodo(id++, 'TG', '', 0, 0);
        tem = new Nodo(id++, 'temporal', $1, @1.first_line, @1.first_column); $$.NuevoHijo(tem);
    }
    | tk_sp {$$ = new Nodo(id++, 'TG', '', 0, 0);
        $1 = new Nodo(id++, 'tk_sp', 'SP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_hp {$$ = new Nodo(id++, 'TG', '', 0, 0);
        $1 = new Nodo(id++, 'tk_hp', 'HP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_stack tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'TG', '', 0, 0);
        $1 = new Nodo(id++, 'tk_stack', 'Stack', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '[', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']', @4.first_line, @4.first_column); $$.NuevoHijo($4);
    }
    | tk_heap tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'TG', '', 0, 0);
        $1 = new Nodo(id++, 'tk_heap', 'HEAP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '[', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']', @4.first_line, @4.first_column); $$.NuevoHijo($4);
    }
;

INDEX: tk_sp {$$ = new Nodo(id++, 'INDEX', '', 0, 0);
        $1 = new Nodo(id++, 'tk_sp', 'SP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_hp {$$ = new Nodo(id++, 'INDEX', '', 0, 0);
        $1 = new Nodo(id++, 'tk_hp', 'HP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_ParA tk_int tk_ParC temporal {$$ = new Nodo(id++, 'INDEX', '', 0, 0);
        $1 = new Nodo(id++, 'tk_ParA', '(', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        tem = new Nodo(id++, 'temporal', $4, @4.first_line, @4.first_column); $$.NuevoHijo(tem);
    }
    | tk_ParA tk_int tk_ParC num {$$ = new Nodo(id++, 'INDEX', '', 0, 0);
        $1 = new Nodo(id++, 'tk_ParA', '(', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_int', 'int', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $3 = new Nodo(id++, 'tk_ParC', ')', @3.first_line, @3.first_column); $$.NuevoHijo($3);
        num1 = new Nodo(id++, 'num', $4, @4.first_line, @4.first_column); $$.NuevoHijo(num1);
    }
    | num {$$ = new Nodo(id++, 'INDEX', '', 0, 0);
        num1 = new Nodo(id++, 'num', $1, @1.first_line, @1.first_column); $$.NuevoHijo(num1);
    }
;

EXP: EXPNUM {$$ = new Nodo(id++, 'EXP', '', 0, 0);
        $$.NuevoHijo($1);
    }
    | VALO {$$ = new Nodo(id++, 'EXP', '', 0, 0);
        $$.NuevoHijo($1);
    }
;

EXPNUM: VALO ARI VALO {$$ = new Nodo(id++, 'EXPNUM', '', 0, 0);
        $$.NuevoHijo($1);
        $$.NuevoHijo($2);
        $$.NuevoHijo($3);
    }
;

ARI: tk_mas {$$ = new Nodo(id++, 'ARI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_mas', '+', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_menos {$$ = new Nodo(id++, 'ARI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_menos', '-', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_por {$$ = new Nodo(id++, 'ARI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_por', '*', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_div {$$ = new Nodo(id++, 'ARI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_div', '/', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
    | tk_mod {$$ = new Nodo(id++, 'ARI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_mod', '%', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
;

VALO: PUN {$$ = new Nodo(id++, 'VALO', '', 0, 0);
        $$.NuevoHijo($1);
    }
    | PRIMI {$$ = new Nodo(id++, 'VALO', '', 0, 0);
        $$.NuevoHijo($1);
    }
    | TEMP {$$ = new Nodo(id++, 'VALO', '', 0, 0);
        $$.NuevoHijo($1);
    }
    | STR {$$ = new Nodo(id++, 'VALO', '', 0, 0);
        $$.NuevoHijo($1);
    }
;

PUN: tk_sp {$$ = new Nodo(id++, 'PUN', '', 0, 0);
            $1 = new Nodo(id++, 'tk_sp', 'SP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        }
    | tk_hp {$$ = new Nodo(id++, 'PUN', '', 0, 0);
        $1 = new Nodo(id++, 'tk_hp', 'HP', @1.first_line, @1.first_column); $$.NuevoHijo($1);
    }
;

PRIMI: num {$$ = new Nodo(id++, 'PRIMI', '', 0, 0);
        num1 = new Nodo(id++, 'num', $1, @1.first_line, @1.first_column); $$.NuevoHijo(num1);
    }
    | tk_menos num %prec umenos { $$ = new Nodo(id++, 'PRIMI', '', 0, 0);
        $1 = new Nodo(id++, 'tk_menos', '-', @1.first_line, @1.first_column);
        num1 = new Nodo(id++, 'num', $2, @2.first_line, @2.first_column); $$.NuevoHijo(num1);
    }
;

TEMP: temporal { $$ = new Nodo(id++, 'TEMP', '', 0, 0);
        tem = new Nodo(id++, 'temporal', $1, @1.first_line, @1.first_column); $$.NuevoHijo(tem);
    }
;

STR: tk_stack tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'STR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_stack', 'Stack', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '[', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']', @4.first_line, @4.first_column); $$.NuevoHijo($4);
    }
    | tk_heap tk_corA INDEX tk_corC {$$ = new Nodo(id++, 'STR', '', 0, 0);
        $1 = new Nodo(id++, 'tk_heap', 'Heap', @1.first_line, @1.first_column); $$.NuevoHijo($1);
        $2 = new Nodo(id++, 'tk_corA', '[', @2.first_line, @2.first_column); $$.NuevoHijo($2);
        $$.NuevoHijo($3);
        $4 = new Nodo(id++, 'tk_corC', ']', @3.first_line, @3.first_column); $$.NuevoHijo($4);
    }
;