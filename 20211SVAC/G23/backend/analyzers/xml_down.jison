/* lexical grammar */
%{
	var attribute = '';
	var errors = [];
%}
%lex

%options case-insensitive
%x string_doubleq
%x string_singleq

%%

\s+                   	// Whitespace
"<!--"[\s\S\n]*?"-->"	// MultiLineComment
"<?xml"[\s\S\n]*?"?>"	return 'tk_declaration_xml'

"<"						return 'tk_open'
">"						return 'tk_close'
"/"						return 'tk_bar'
"="						return 'tk_equal'
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
[^><]+					return 'anything'
.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "XML", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/lex
%{
	const { Atributo } = require('../model/xml/Atributo');
	const { Element } = require('../model/xml/Element');
	const { Encoding } = require('../model/xml/Encoding/Encoding');
%}

/* operator associations and precedence */

%start ini

%% // GRAMATICA DE DOCUMENTO XML ANALISIS DESCENDENTE

ini: tk_declaration_xml ROOT EOF {
		encoding = new Encoding($1);
		if (encoding.encoding === encoding.codes.INVALID ) {
			errors.push({ tipo: "Léxico", error: "La codificación del XML no es válida.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); return { ast: null, errors: errors };
		}
		ast = { ast: $2, encoding: encoding,  errors: errors };
		errors = [];
		return ast;
	}
	| error EOF { errors.push({ tipo: "Sintáctico", error: "Sintaxis errónea del documento XML.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); return { ast: null, errors: errors }; }
;

ROOT: XML ROOT { if ($1!==null) { $2.push($1); $$=$2; } else { $$=null; } }
	| XML { if ($1!==null) { $$=[$1]; } else { $$=[]; } }
;

XML: tk_open tk_id ATTR tk_close CHILD tk_open tk_bar tk_id tk_close {
			tag = new Element($2, $3, null, $5, this._$.first_line, this._$.first_column+1, $8);
            hasConflict = tag.verificateNames();
			if (hasConflict === "") {
				tag.childs.forEach(child => {
					child.father = $2;
            	});
				$$ = tag;
			}
			else {
				errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @8.first_line, columna: @8.first_column+1 });
				$$ = null;
			}
		}
	| tk_open tk_id ATTR tk_close CONTENT tk_open tk_bar tk_id tk_close {
			tag = new Element($2, $3, $5.val, null, this._$.first_line, this._$.first_column+1, $8);
            hasConflict = tag.verificateNames();
			if (hasConflict === "") {
				$$ = tag;
			}
			else {
				errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @8.first_line, columna: @8.first_column+1 });
				$$ = null;
			}
		}
	| tk_open tk_id ATTR tk_bar tk_close {
			tag = new Element($2, $3, null, null, this._$.first_line, this._$.first_column+1, null);
            hasConflict = tag.verificateNames();
			if (hasConflict === "") {
				$$ = tag;
			}
			else {
				errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @2.first_line, columna: @2.first_column+1 });
				$$ = null;
			}
		}
	| tk_open tk_id ATTR tk_close tk_open tk_bar tk_id tk_close {
			tag = new Element($2, $3, null, null, this._$.first_line, this._$.first_column+1, $7);
            hasConflict = tag.verificateNames();
			if (hasConflict === "") {
				$$ = tag;
			}
			else {
				errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @7.first_line, columna: @7.first_column+1 });
				$$ = null;
			}
		}
	| error tk_close { errors.push({ tipo: "Sintáctico", error: "La etiqueta no fue declarada correctamente.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); $$ = null; }
	| error tk_open { errors.push({ tipo: "Sintáctico", error: "La etiqueta no fue declarada correctamente.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); $$ = null; }
;

ATTR: ATTR_P { $$=$1; }
	| { $$=null; }
;

ATTR_P: tk_id tk_equal TK_ATTR ATTR_P {
		attr = new Atributo($1, $3, this._$.first_line, this._$.first_column+1);
		$4.push(attr);
		$$=$4;
	}
	| tk_id tk_equal TK_ATTR {
		attr = new Atributo($1, $3, this._$.first_line, this._$.first_column+1);
		$$=[attr];
	}
;

TK_ATTR: tk_attribute_d { $$=$1; }
	| tk_attribute_s { $$=$1; }
;

CHILD: CHILD XML { if ($2!==null) { $1.push($2); } $$=$1; }
	| XML { if ($1!==null) { $$=[$1]; } else { $$=[]; } }
;

CONTENT: PROP CONTENT {
		if ($1.tipo !== $2.tipo) {
			$2.val=$1.val+$2.val;
		}
		else {
			$2.val=$1.val+' '+$2.val;
		}
		$$={tipo:$1.tipo, val:$2.val};
	}
	| PROP {
		$$={tipo:$1.tipo, val:$1.val};
	}
;

PROP: tk_id { $$={tipo:1, val:$1}; }
	| anything { $$={tipo:2, val:$1}; }
	| tk_bar { $$={tipo:3, val:$1}; }
	| tk_attribute_d { $$={tipo:4, val:$1}; }
	| tk_attribute_s { $$={tipo:5, val:$1}; }
;
