/* Area de imports */

%{
    const nodo_xml = require('../clases/xml/nodo_xml');
    const atr_xml = require('../clases/xml/atr_xml');
    const rep_error = require('../reports/ReportController')
    const gramatic = require('../reports/gramatical');
    const importacion = require('../reports/ASTNodo');
    const ast_nodo = require('../reports/ASTNodo');
    /* Reporte Gramatical */
    let reportG = new Array();
%}


%lex
%options case-insensitive
%option yylineno

/* Definicion lexica */

num         [0-9]+("."[0-9]+)?
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")
//cadena2      (\'([^\'\\])*\')

especiales  (
"!"|
"¡"|
")"|
"("|
"["|
"]"|
"%"|
"?"|
"¿"|
"$"|
"#"|
","|
"-"|
"."|
":"|
";"|
" "|
"="|
"~"|
"."|
"&"|
"+"|
"'"|
[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-]|
[\s\r\n\t])
others      (\n\s*)

%%

/*COMENTARIOS*/


[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/


((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */

/* Simbolos del programa */

"<"                   { return 'INI'}
"/"                   { return 'CIERRE'}
">"                   { return 'FIN'}
"="                   { return 'IGUAL'}
"?"                   { return 'INTERROGAC'}
"xml"                 { return 'XML' }
{num}                 { return 'NUM'}
{id}                  { return 'ID'}
({id}|{especiales}|{others}|{num})*{id} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{num} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{especiales} {console.log("SI ENTRE2"); return 'ID2'}
//({id}|{especiales}|{others}|{num}|{cadena2})*{cadena2} {console.log("SI ENTRE2"); return 'ID2'}
{cadena}              { return 'CADENA'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */

inicio              : encoding etiqueta {
                        reportG.push(new gramatic.default(" inicio : encoding etiqueta ","{ return inicio }"));
                        let auxReportG = reportG;
                        reportG = [];
                        $$ = { "encoding": $1, "etiqueta": $2, "reportG": auxReportG};
                        let start = new ast_nodo.default("inicio","","encoding etiqueta");
                        start.InsertarHijo($1.cst);
                        start.InsertarHijo($2.cst);
                        return $$;
                    }
                    ;

encoding            : INI INTERROGAC XML lista_atributos INTERROGAC FIN {
                        $$ = new nodo_xml.default("encoding",$4,"",[],@1.first_line,@1.first_column,null);
                        $$.nuevo("encoding", "", "INI INTERROGAC XML lista_atributos INTERROGAC FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("INTERROGAC",$2);
                        $$.cst.InsertarUnNodo("XML",$3);
                        $$.cst.InsertarLista($4, "lista_atributos", "lista_atributos atributos ");
                        $$.cst.InsertarUnNodo("INTERROGAC",$5);
                        $$.cst.InsertarUnNodo("FIN",$6);
                        reportG.push(new gramatic.default("encoding : INI INTERROGAC XML lista_atributos INTERROGAC FIN","{ encoding.val = new nodo_xml.defaul('encoding',lista_atributos.val,'',[])}"));
                    }
                    ;

etiqueta            : INI ID FIN lista_nodos INI CIERRE ID FIN EOF  {
                        $$ = new nodo_xml.default($2,[],"",$4,@1.first_line,@1.first_column,$7);
                        $$.nuevo("etiqueta","", "INI ID FIN lista_nodos INI CIERRE ID FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarUnNodo("FIN",$3);
                        $$.cst.InsertarLista($4, "lista_nodos", "lista_nodos nodo");
                        $$.cst.InsertarUnNodo("INI", $5);
                        $$.cst.InsertarUnNodo("CIERRE", $6);
                        $$.cst.InsertarUnNodo("ID", $7);
                        $$.cst.InsertarUnNodo("FIN", $8);
                        reportG.push(new gramatic.default("etiqueta : INI ID FIN lista_nodos INI CIERRE ID FIN","{ etiqueta.val = new nodo_xml.defaul(ID.valLex,[],'',lista_nodos.val)}"));
                    }
                    ;

ERROR_SINTACTIO     : error FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
                    | error CIERRE ID FIN{ rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
                    | error INI { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
                    ;

lista_nodos         : lista_nodos nodo {
                        $$ = $1;
                        $$.push($2);
                        reportG.push(new gramatic.default("lista_nodos : lista_nodos nodo","{ lista_nodos.val = lista_nodosP.val; \n lista_nodos.val.push(nodo.val)}"));
                    }
                    | nodo  {
                        $$ = new Array();
                        $$.push($1);
                        reportG.push(new gramatic.default("lista_nodos : nodo","{ lista_nodos.val = new Array(); \n lista_nodos.val.push(nodo)}"));
                    }
                    ;

nodo                : INI ID FIN lista_valor INI CIERRE ID FIN {
                        $$ = new nodo_xml.default($2,[],$4,[],@1.first_line,@1.first_column,$7);
                        $$.nuevo("nodo","","INI ID FIN lista_valor INI CIERRE ID FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarUnNodo("FIN",$3);
                        $$.cst.InsertarUnNodo("lista_valor",$4);
                        $$.cst.InsertarUnNodo("INI",$5);
                        $$.cst.InsertarUnNodo("CIERRE",$6);
                        $$.cst.InsertarUnNodo("ID",$7);
                        $$.cst.InsertarUnNodo("FIN",$8);
                        reportG.push(new gramatic.default("nodo : INI ID FIN lista_valor INI CIERRE ID FIN","{ nodo.val = new nodo_xml.default(ID.valLex,[],lista_valor.val,[],ID.valLex) }"));
                    }
                    | INI ID FIN lista_nodos INI CIERRE ID FIN {
                        $$ = new nodo_xml.default($2,[],"",$4,@1.first_line,@1.first_column,$7);
                        $$.nuevo("nodo","", "INI ID FIN lista_nodos INI CIERRE ID FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarUnNodo("FIN",$3);
                        $$.cst.InsertarLista($4,"lista_nodos", "lista_nodos nodo");
                        $$.cst.InsertarUnNodo("INI",$5);
                        $$.cst.InsertarUnNodo("CIERRE",$6);
                        $$.cst.InsertarUnNodo("ID",$7);
                        $$.cst.InsertarUnNodo("FIN",$8);
                        reportG.push(new gramatic.default("nodo : INI ID FIN lista_nodos INI CIERRE ID FIN","{ nodo.val = new nodo_xml.default(ID.valLex,[],'',lista_nodos.val,ID.valLex) }"));
                    }
                    | INI ID lista_atributos FIN lista_valor INI CIERRE ID FIN {
                        $$ = new nodo_xml.default($2,$3,$5,[],@1.first_line,@1.first_column,$8);
                        $$.nuevo("nodo","", "INI ID lista_atributos FIN lista_valor INI CIERRE ID FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarLista($3,"lista_atributos", "lista_atributos atributo");
                        $$.cst.InsertarUnNodo("FIN",$4);
                        $$.cst.InsertarUnNodo("lista_valor",$5);
                        $$.cst.InsertarUnNodo("INI",$6);
                        $$.cst.InsertarUnNodo("CIERRE",$7);
                        $$.cst.InsertarUnNodo("ID",$8);
                        $$.cst.InsertarUnNodo("FIN",$9);
                        reportG.push(new gramatic.default("nodo : INI ID lista_atributos FIN lista_valor INI CIERRE ID FIN","{ nodo.val = new nodo_xml.default(ID.valLex,lista_atributos.val,lista_valor.val,[],ID.valLex) }"));
                    }
                    | INI ID lista_atributos FIN lista_nodos INI CIERRE ID FIN {
                        $$ = new nodo_xml.default($2,$3,"",$5,@1.first_line,@1.first_column,$8);
                        $$.nuevo("nodo","", "INI ID lista_atributos FIN lista_nodos INI CIERRE ID FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarLista($3,"lista_atributos", "lista_atributos atributo");
                        $$.cst.InsertarUnNodo("FIN",$4);
                        $$.cst.InsertarLista($5, "lista_nodos", "lista_nodos nodo");
                        $$.cst.InsertarUnNodo("INI",$6);
                        $$.cst.InsertarUnNodo("CIERRE",$7);
                        $$.cst.InsertarUnNodo("ID",$8);
                        $$.cst.InsertarUnNodo("FIN",$9);
                        reportG.push(new gramatic.default("nodo : INI ID lista_atributos FIN lista_nodos INI CIERRE ID FIN","{ nodo.val = new nodo_xml.default(ID.valLex,lista_atributos.val,'',lista_nodos.val,ID.valLex) }"));
                    }
                    //| INI ID CIERRE FIN     { $$ = new nodo_xml.default($2,[],"",[]) }
                    | INI ID lista_atributos CIERRE FIN {
                        $$ = new nodo_xml.default($2,$3,"",[],@1.first_line,@1.first_column,null);
                        $$.nuevo("nodo","", "INI ID CIERRE FIN");
                        $$.cst.InsertarUnNodo("INI",$1);
                        $$.cst.InsertarUnNodo("ID",$2);
                        $$.cst.InsertarLista($3,"lista_atributos", "lista_atributos atributo");
                        $$.cst.InsertarUnNodo("CIRRE",$4);
                        $$.cst.InsertarUnNodo("FIN",$5);
                        reportG.push(new gramatic.default("nodo : INI ID lista_atributos CIERRE FIN","{ nodo.val = new nodo_xml.default(ID.valLex,lista_atributos.val,'',[],null) }"));
                    }
                    | ERROR_SINTACTIO { $$ = new nodo_xml.default("recuparado",[],"",[]); }
                    ;

lista_atributos     : lista_atributos atributos {
                        $$ = $1;
                        $$.push($2);
                        reportG.push(new gramatic.default("lista_atributos : lista_atributos atributos","{ lista_atributos.val = lista_atributosP.val \n lista_atributos.val.push(atributos.val) }"));
                    }
                    | atributos {
                        $$ = new Array();
                        $$.push($1);
                        reportG.push(new gramatic.default("lista_atributos : atributos","{ lista_atributos.val = new Array(); \n lista_atributos.val.push(atributos.val) }"));
                    }
                    ;

atributos           : ID IGUAL valor  {
                        $$ = new atr_xml.default($1,$3,@1.first_line,@1.first_column);
                        $$.nuevo("atributos","", "ID IGUAL valor");
                        $$.cst.InsertarUnNodo("ID",$1);
                        $$.cst.InsertarUnNodo("IGUAL",$2);
                        $$.cst.InsertarUnNodo("VALOR",$3);
                        reportG.push(new gramatic.default("atributos : ID IGUAL valor","{ atributos.val = new atr_xml.default(ID.valLex,valor.val) }"));
                    }
                    ;

valor               : CADENA {
                        $1 = $1.slice(1, $1.length-1);
                        $$ = $1;
                        reportG.push(new gramatic.default("valor : CADENA","{ CADENA.val = CADENA.val.slice(1,CADENA.val.length-1) }"));
                    }
                    | NUM {
                        $$ = $1;
                        reportG.push(new gramatic.default("valor : NUM","{ valor.val = NUM.valLex }"));
                    }
                    ;

lista_valor         : lista_valor ID2 {
                        $$ = $1 + " " + $2;
                        reportG.push(new gramatic.default("lista_valor : lista_valor ID2","{ lista_valor.val = lista_valorP.val + ' ' + ID2.valLex }"));
                    }
                    | lista_valor ID {
                        $$ = $1 + " " + $2;
                        reportG.push(new gramatic.default("lista_valor : lista_valor ID","{ lista_valor.val = lista_valorP.val + ' ' + ID.valLex }"));
                    }
                    | lista_valor NUM {
                        $$ = $1 + " " + $2;
                        reportG.push(new gramatic.default("lista_valor : lista_valor NUM","{ lista_valor.val = lista_valorP.val + ' ' + NUM.valLex }"));
                    }
                    | lista_valor CADENA {
                        $$ = $1 + " " + $2;
                        reportG.push(new gramatic.default("lista_valor : lista_valor CADENA","{ lista_valor.val = lista_valorP.val + ' ' + CADENA.valLex }"));
                    }
                    | lista_valor XML {
                        $$ = $1 + " " + $2;
                        reportG.push(new gramatic.default("lista_valor : lista_valor XML","{ lista_valor.val = lista_valorP.val + ' ' + XML.valLex }"));
                    }
                    | ID  {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : ID","{ lista_valor.val = ID.valLex }"));
                    }
                    | ID2 {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : ID2","{ lista_valor.val = NUM.valLex }"));
                    }
                    | NUM {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : NUM","{ lista_valor.val = NUM.valLex }"));
                    }
                    | CADENA {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : CADENA","{ lista_valor.val = CADENA.valLex }"));
                    }
                    | XML {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : XML","{ lista_valor.val = XML.valLex }"));
                    }
                    ;
