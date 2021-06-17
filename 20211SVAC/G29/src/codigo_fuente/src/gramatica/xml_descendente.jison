/* Area de imports */
%{
    const nodo_xml = require('../clases/xml/nodo_xml');
    const atr_xml = require('../clases/xml/atr_xml');
    const rep_error = require('../reports/ReportController');
    const ast_nodo = require('../reports/ASTNodo');
    const gramatic = require('../reports/gramatical');

    /* Reporte CST */
    let lista_nodos_ = new ast_nodo.default("lista_nodos0","","");
    let nodo_ = new ast_nodo.default("nodo","","");
    let opcion_nodo_ = new ast_nodo.default("opcion_nodo","","");
    let ciere_nodo_ = new ast_nodo.default("cierre_nodo","","");
    let lista_atributos_ = new ast_nodo.default("lista_atributos","","");
    let cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","","");
    let lista_valor_ = new ast_nodo.default("lista_valor","","");
    let atributos_ = new ast_nodo.default("atributos","","");
    let encoding_ = new ast_nodo.default("encoding","","");
    let etiqueta_ = new ast_nodo.default("encoding","","");

    let cabesera1 = null;
    let cabesera2 = null;

    /* Reporte Gramatical */
    let reportG = new Array();
%}

%lex
%options case-insensitive
%option yylineno

/* Definicion lexica */

num         [0-9]+("."[0-9]+)?
id          [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
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

"<"                                             { return 'INI'}
"/"                                             { return 'CIERRE'}
">"                                             { return 'FIN'}
"="                                             { return 'IGUAL'}
"?"                                             { return 'INTERROGAC'}
"xml"                                           { return 'XML' }
{num}                                           { return 'NUM'}
{id}                                            { return 'ID'}
({id}|{especiales}|{others}|{num})*{id} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{num} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{especiales} {console.log("SI ENTRE2"); return 'ID2'}
//({id}|{especiales}|{others}|{num}|{cadena2})*{cadena2} {console.log("SI ENTRE2"); return 'ID2'}
{cadena}                                        { return 'CADENA'}

/* Espacios */
[\s\r\n\t]                                      {/* skip whitespace */}

<<EOF>>                                         return 'EOF'

/* Errores lexicos */
.                                               { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */
inicio          : encoding etiqueta {
                  reportG.push(new gramatic.default(" inicio : encoding etiqueta ","{ return inicio }"));
                  let auxReportG = reportG;
                  inicio_ = new ast_nodo.default("inicio","", "encoding etiqueta");
                  inicio_.InsertarHijo(encoding_);
                  inicio_.InsertarHijo(etiqueta_);
                  reportG = [];
                  $$ = { "encoding": $1, "etiqueta": $2, "reportG": auxReportG};
                  return $$
                }
                ;

encoding        : INI INTERROGAC XML lista_atributos INTERROGAC FIN {
                  $$ = new nodo_xml.default("encoding",$4,"",[],@1.first_line,@1.first_column,null);
                  encoding_ = new ast_nodo.default("encoding","", "INI INTERROGAC XML lista_atributos INTERROGAC FIN");
                  encoding_.InsertarHijo(lista_atributos_);
                  lista_atributos_ = new ast_nodo.default("lista_atributos_","","");
                  reportG.push(new gramatic.default("encoding : INI INTERROGAC XML lista_atributos INTERROGAC FIN","{ encoding.val = new nodo_xml.defaul('encoding',lista_atributos.val,'',[])}"));
                }
                ;

etiqueta        : INI ID FIN lista_nodos INI CIERRE ID FIN EOF {
                  $$ = new nodo_xml.default($2,[],"",$4,@1.first_line,@1.first_column,$7);
                  etiqueta_ = new ast_nodo.default("etiqueta","", "INI ID FIN lista_nodos INI CIERRE ID FIN");
                  etiqueta_.InsertarUnNodo("INI", $1);
                  etiqueta_.InsertarUnNodo("ID", $2);
                  etiqueta_.InsertarUnNodo("FIN", $3);
                  etiqueta_.InsertarHijo(lista_nodos_);
                  // lista_nodos_ = new ast_nodo.default("lista_nodos","","");
                  etiqueta_.InsertarUnNodo("INI", $5);
                  etiqueta_.InsertarUnNodo("CIERRE", $6);
                  etiqueta_.InsertarUnNodo("ID", $7);
                  reportG.push(new gramatic.default("etiqueta : INI ID FIN lista_nodos INI CIERRE ID FIN","{ etiqueta.val = new nodo_xml.defaul(ID.valLex,[],'',lista_nodos.val)}"));
                }
                ;

error_sintactio : error tipo_error_sinc
                ;

tipo_error_sinc : FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | CIERRE ID FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | INI { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                ;

lista_nodos     : lista_nodos nodo {
                    $$ = $1;
                    $$.push($2);
                    let tempA = new ast_nodo.default("lista_nodos","", "lista_nodos nodo");
                    tempA.InsertarHijo(nodo_);
                    lista_nodos_.InsertarHijo(tempA);
                    reportG.push(new gramatic.default("lista_nodos : nodo lista_nodos","{ lista_nodos.val = lista_nodosP.val; \n lista_nodos.val.push(nodo.val)}"));
                }
                | nodo {
                  $$ = new Array();
                  $$.push($1);
                  lista_nodos_.InsertarHijo(nodo_)
                  let tempB = new ast_nodo.default("lista_nodos","", "lista_nodos nodo");
                  tempB.InsertarHijo(lista_nodos_);
                  lista_nodos_ = tempB;
                  reportG.push(new gramatic.default("lista_nodos : nodo","{ lista_nodos.val = new Array(); \n lista_nodos.val.push(nodo)}"));
                }
                ;

nodo            : INI ID opcion_nodo {
                  $3.id = $2;
                  $$ = $3;
                  nodo_ = new ast_nodo.default("nodo","", "INI ID opcion_nodo");
                  nodo_.InsertarUnNodo("INI", $1);
                  nodo_.InsertarUnNodo("ID", $2);
                  nodo_.InsertarHijo(opcion_nodo_);

                  reportG.push(new gramatic.default("nodo : INI ID opcion_nodo","{ opcion_nodo.val.id = ID.valLex \n nodo.val = opcion_nodo.val}"));
                }
                ;

opcion_nodo     : cierre_nodo {
                  $$ = $1;
                  opcion_nodo_ = new ast_nodo.default("opcion_nodo","", "cierre_nodo");
                  opcion_nodo_.InsertarHijo(cierre_nodo_);
                  reportG.push(new gramatic.default("opcion_nodo : cierre_nodo","{ opcion_nodo.val = cierre_nodo.val }"));
                }
                | lista_atributos cierre_nodo {
                  $2.atributos = $1;
                  $$ = $2;
                  opcion_nodo_ = new ast_nodo.default("opcion_nodo","", "lista_atributos cierre_nodo");
                  opcion_nodo_.InsertarHijo(lista_atributos_);
                  opcion_nodo_.InsertarHijo(cierre_nodo_);
                  reportG.push(new gramatic.default("opcion_nodo : lista_atributos cierre_nodo","{ cierre_nodo.val.atributos = lista_atributos.val \n opcion_nodo.val = cierre_nodo.val }"));
                }
                ;

cierre_nodo     : FIN cuerpo_nodo {
                  $$ = $2;
                  cierre_nodo_ = new ast_nodo.default("cierre_nodo","", "FIN cuerpo_nodo");
                  cierre_nodo_.InsertarUnNodo("FIN", $1);
                  cierre_nodo_.InsertarHijo(cuerpo_nodo_);

                  reportG.push(new gramatic.default("cierre_nodo : FIN cuerpo_nodo","{ cierre_nodo.val = cuerpo_nodo.val }"));
                }
                | CIERRE FIN     {
                  $$ = new nodo_xml.default("",[],"",[],@1.first_line,@1.first_column,null);
                  cierre_nodo_.InsertarUnNodo("CIERRE", $1);
                  cierre_nodo_ = new ast_nodo.default("cierre_nodo","", "CIERRE FIN");
                  reportG.push(new gramatic.default("cierre_nodo : CIERRE FIN","{ cierre_nodo.val = new nodo_xml.default('',[],'',[]) }"));
                }
                ;

cuerpo_nodo     : lista_valor INI CIERRE ID FIN {
                  $$ = new nodo_xml.default("",[],$1,[],@1.first_line,@1.first_column,$4)
                  cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","", "lista_valor INI CIERRE ID FIN ");
                  cuerpo_nodo_.InsertarUnNodo("Valor", $1);
                  cuerpo_nodo_.InsertarUnNodo("INI", $2);
                  cuerpo_nodo_.InsertarUnNodo("CIERRE", $3);
                  cuerpo_nodo_.InsertarUnNodo("ID", $4);
                  cuerpo_nodo_.InsertarUnNodo("FIN", $5);
                  reportG.push(new gramatic.default("cuerpo_nodo : Lista_valor INI CIERRE ID FIN","{ cuerpo_nodo.val = new nodo_xml.default('',[],lista_valor.valLex,[]) }"));
                }
                | lista_nodos INI CIERRE ID FIN {
                  $$ = new nodo_xml.default("",[],"",$1,@1.first_line,@1.first_column,$4)
                  cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","", "lista_nodos INI CIERRE ID FIN");
                  cuerpo_nodo_.InsertarHijo(lista_nodos_);
                  cuerpo_nodo_.InsertarUnNodo("INI", $2);
                  cuerpo_nodo_.InsertarUnNodo("CIERRE", $3);
                  cuerpo_nodo_.InsertarUnNodo("ID", $4);
                  cuerpo_nodo_.InsertarUnNodo("FIN", $5);
                  reportG.push(new gramatic.default("cuerpo_nodo : lista_nodos INI CIERRE ID FIN","{ cuerpo_nodo.val = new nodo_xml.default('',[],'',lista_nodos.val) }"));
                }
                | error_sintactio { $$ = new nodo_xml.default("recuparado",[],"",[])  }
                ;

lista_atributos : atributos lista_atributos {
                  $$ = $2;
                  $$.push($1);
                  reportG.push(new gramatic.default("lista_atributos : atributos lista_atributos","{ lista_atributos.val = lista_atributosP.val \n lista_atributos.val.push(atributos.val) }"));
                }
                | atributos {
                  $$ = new Array();
                  $$.push($1);
                  lista_atributos_ = cabesera1;
                  cabesera1 = null;
                  reportG.push(new gramatic.default("lista_atributos : atributos","{ lista_atributos.val = new Array(); \n lista_atributos.val.push(atributos.val) }"));
                }
                ;

atributos       : ID IGUAL valor {
                  $$ = new atr_xml.default($1,$3,@1.first_line,@1.first_column);
                  atributos_ = new ast_nodo.default("atributo", "", "ID IGUAL valor ");
                  atributos_.InsertarUnNodo("ID", $1);
                  atributos_.InsertarUnNodo("IGUAL", $2);
                  atributos_.InsertarUnNodo("VALOR", $3);

                  if(cabesera1 == null){
                   cabesera1 = lista_atributos_;
                  }
                  let tempX = new ast_nodo.default("lista_atributos","", "atributos lista_atributos");
                  lista_atributos_.InsertarHijo(atributos_);
                  lista_atributos_.InsertarHijo(tempX);
                  lista_atributos_ = tempX;

                  reportG.push(new gramatic.default("atributos : ID IGUAL valor","{ atributos.val = new atr_xml.default(ID.valLex,valor.val) }"));
                }
                ;

valor           : CADENA {
                  $1 = $1.slice(1, $1.length-1);
                  $$ = $1;
                  reportG.push(new gramatic.default("valor : CADENA","{ CADENA.val = CADENA.val.slice(1,CADENA.val.length-1) }"));
                }
                | NUM {
                  $$ = $1;
                  reportG.push(new gramatic.default("valor : NUM","{ valor.val = NUM.valLex }"));
                }
                ;

lista_valor     : tipo_valor lista_valor {
                  $$ = $1 + " " + $2;
                  reportG.push(new gramatic.default("lista_valor : tipo_valor lista_valor","{ lista_valor.val = tipo_valor.val + ' ' + lista_valorP.val }"));
                }
                | tipo_valor {
                  $$ = $1;
                  reportG.push(new gramatic.default("lista_valor : tipo_valor","{ lista_valor.val = tipo_valor.val }"));
                }
                ;

tipo_valor      : ID  {
                  $$ = $1;
                  reportG.push(new gramatic.default("tipo_valor : ID","{ tipo_valor.val = ID.valLex }"));
                }
                | ID2 {
                  $$ = $1;
                  reportG.push(new gramatic.default("tipo_valor : ID2","{ tipo_valor.val = ID2.valLex }"));
                }
                | NUM {
                  $$ = $1;
                  reportG.push(new gramatic.default("tipo_valor : NUM","{ tipo_valor.val = NUM.valLex }"));
                }
                | CADENA {
                  $$ = $1;
                  reportG.push(new gramatic.default("tipo_valor : CADENA","{ tipo_valor.val = CADENA.valLex }"));
                }
                | XML {
                        $$ = $1;
                        reportG.push(new gramatic.default("lista_valor : XML","{ lista_valor.val = XML.valLex }"));
                    }
                ;
