/* Area de imports */

%{
    const rep_error = require('../reports/ReportController');

    const primitivo = require('../clases/expresiones/primitivo')
    const print = require('../clases/instrucciones/print')
    const ast_xpath = require('../clases/ast/ast_xpath')

    const aritmetica = require('../clases/expresiones/operaciones/aritmetica')
    const relacional = require('../clases/expresiones/operaciones/relacional')
    const logica = require('../clases/expresiones/operaciones/logica')

    const select = require('../clases/expresiones/select')
    const predicate = require('../clases/expresiones/predicates/predicate')
    const last = require('../clases/expresiones/predicates/last')
    const position = require('../clases/expresiones/predicates/position')
    const filtro = require('../clases/expresiones/predicates/filtro')

    const axes = require('../clases/expresiones/axes/axes')

    /* Reporte Gramatical */
    const gramatic = require('../reports/gramatical');
    let reportG = new Array();
%}

/* Definicion lexica */

%lex
%options case-insensitive
%option yylineno

num         [0-9]+("."[0-9]+)?
id          [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")

%%

/* Comentarios */

"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}

/* Simbolos del programa */

/* Caracteres */
'|'                     { return 'SEVERAL' }

"("                     { return 'PARA' }
")"                     { return 'PARC' }
"["                     { return 'CORA' }
"]"                     { return 'CORC' }
"."                     { return 'PTN'  }
":"                     { return 'DPTN' }

/* Palabras reservadas */
"last"                  { return 'LAST' }
"position"              { return 'POSITION' }

/* Operadores Aritmeticos */
"+"                     { return 'MAS'}
"-"                     { return 'MENOS'}
"*"                     { return 'MULTI'}
"/"                     { return 'DIV'}
"div"                   { return 'DIVS'}
"^"                     { return 'POTENCIA'}
"mod"                   { return 'MODULO'}

/* Operaciones Relacionales */
"<="                    { return 'MENORIGUAL'}
">="                    { return 'MAYORIGUAL'}
"<"                     { return 'MENORQUE'}
">"                     { return 'MAYORQUE'}
"!="                    { return 'DIFERENTE'}
"=="                    { return 'IGUALIGUAL'}
"="                     { return 'IGUAL'}

/* Operaciones Logicas */
"or"                    { return 'OR'}
"and"                   { return 'AND'}
"!"                     { return 'NOT'}

/* Selecting nodes */
"@"                     { return 'ATR' }

"true"                  { return 'TRUE'}
"false"                 { return 'FALSE'}

"print"                 { return 'PRINT' }

{num}                   { return 'NUM'}
{id}                    { return 'ID'}
{cadena}                { return 'CADENA'}

/* Espacios */
[\s\r\n\t]              {/* skip whitespace */}

<<EOF>>                 return 'EOF'

/* Errores lexicos */
.                       { rep_error.InsertarError("lexico", yytext, "xpath", yylloc.first_line, yylloc.first_column); }

/lex
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVS' 'MODULO'
%right 'UNARIO'

%start inicio

%% /* Gramatica */

inicio          : lista_several EOF {
                    reportG.push(new gramatic.default("inicio : lista_several EOF","{ inicio.val = new ast_xpath.default(lista_several.val); }"));
                    let auxReportG = reportG;
                    reportG = [];
                    $$ = { "xpath": new ast_xpath.default($1), "reportG": auxReportG};
                    return $$     
                }
                ;

lista_several   : lista_select SEVERAL lista_several {
                    $$ = $3;
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_several : lista_select SEVERAL lista_several","{ lista_several.val = lista_severalP.val;\n lista_several.val.push(lista_select.val); }"));
                }
                | lista_select {
                    $$ = new Array();
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_several : lista_select","{ lista_several.val = new Array();\n lista_several.val.push(lista_select.val); }"));
                }
                ;

lista_select    : select lista_select{
                    $$ = $2;
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_select : select lista_select","{ lista_select.val = lista_selectP.val;\n lista_select.val.push(select.val); }"));
                }
                | select {
                    $$ = new Array();
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_select : select","{ lista_select.val = new Array();\n lista_select.val.push(select.val); }"));
                }
                ;

select          : DIV list_op_select{
                    $$ = $2
                    reportG.push(new gramatic.default("select : DIV list_op_select","{ select.val = list_op_select.val }"));
                }
                ;

list_op_select  : DIV opcion_select {
                    if ($2.slc){
                        $2.slc.tipe = "//";
                        $$ = $2;
                        reportG.push(new gramatic.default("list_op_select : DIV opcion_select","{ opcion_select.slc.val.tipe = '//';\n list_op_select.val = opcion_select.val }"));
                    }else{
                        $2.tipe = "//";
                        if ($2.hasOwnProperty("axe")){
                            if ($2.axe === "^"){
                                $2.axe = ".."
                            }
                        }
                        $$ = $2;
                        reportG.push(new gramatic.default("list_op_select : DIV opcion_select","{ opcion_select.val.tipe = '//';\n list_op_select.val = opcion_select.val }"));
                    }
                }
                | opcion_select {
                    if ($1.slc){
                        $1.slc.tipe = "/";
                        $$ = $1;
                        reportG.push(new gramatic.default("list_op_select : opcion_select","{ opcion_select.slc.val.tipe = '/';\n list_op_select.val = opcion_select.val }"));
                    }else{
                        $1.tipe = "/";
                        if ($1.hasOwnProperty("axe")){
                            if ($1.axe === "^"){
                                $1.axe = "parent"
                            }
                        }
                        $$ = $1;
                        reportG.push(new gramatic.default("list_op_select : opcion_select","{ opcion_select.val.tipe = '/';\n list_op_select.val = opcion_select.val }"));
                    }
                }
                ;

opcion_select   : ID otra_opcion_s {
                    if ($2.hasOwnProperty("axe")){
                        if ($2.axe === "@"){
                            $2.axe = $1 + "()";
                        }else if ($2.axe !== "^" && $2.axe !== "self"){
                            $2.axe = $1;
                        }
                        $$ = $2;
                        reportG.push(new gramatic.default("opcion_select : ID otra_opcion_s","{ otra_opcion_s.val.axe = ID.valLex;\n opcion_select.val = otra_opcion_s.val }"));
                    }else if ($2.slc){
                        if ($2.slc.hasOwnProperty("axe")){
                            $2.slc.axe = $1;
                            $$ = $2;
                            reportG.push(new gramatic.default("opcion_select : ID otra_opcion_s","{ otra_opcion_s.val.slc.axe = ID.valLex;\n opcion_select.val = otra_opcion_s.val }"));
                        }else{
                            $2.slc.id = $1;
                            $$ = $2;
                            reportG.push(new gramatic.default("opcion_select : ID otra_opcion_s","{ otra_opcion_s.val.slc.id = ID.valLex;\n opcion_select.val = otra_opcion_s.val }"));
                        }
                    }else{
                        $2.id = $1;
                        $$ = $2;
                        reportG.push(new gramatic.default("opcion_select : ID otra_opcion_s","{ otra_opcion_s.val.id = ID.valLex;\n opcion_select.val = otra_opcion_s.val }"));
                    }
                }
                | ATR fin_opcion_s {
                    $$ = $2;
                    reportG.push(new gramatic.default("opcion_select : ATR fin_opcion_s","{ opcion_select.val = fin_opcion_s.val}"));
                }
                | MULTI {
                    $$ = new select.default("","*",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_select : MULTI","{ opcion_select.val = new select.default('','*',false) }"));
                }
                | PTN opcion_padre_s {
                    $$ = $2;
                    reportG.push(new gramatic.default("opcion_select : PTN opcion_padre_S","{ opcion_select.val = opcion_padre_s.val }"));
                }
                ;

opcion_padre_s  : PTN {
                    $$ = new axes.default("","^","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_padre_s : PTN","{ opcion_padre_s.val = new axes.default('','','*') }")); 
                }
                | {
                    $$ = new axes.default("","self","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_padre_s : epsilon","{ opcion_padre_s.val = new axes.default('','self','*') }"));
                }
                ;

otra_opcion_s   : CORA e CORC {
                    $$ = new predicate.default(new select.default("","",false,@1.first_line,@1.first_column,null),$2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("otra_opcion_s : CORA e CORC","{ otra_opcion_s.val = new predicate.default(new select.default('','',false,null),e.val) }"));
                }
                | DPTN DPTN axes_select {
                    $$ = $3;
                    reportG.push(new gramatic.default("otra_opcion_s : DPTN DPTN axes_select","{ otra_opcion_s.val = axes_select.val }"));
                }
                | PARA PARC {
                    $$ = new axes.default("","@","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("otra_opcion_s : PARA PARC","{ otra_opcion_s.val = new axes.default('','','*') }"));
                }
                | {
                    $$ = new select.default("","",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("otra_opcion_s : epsilon","{ otra_opcion_s.val = new select.default('','',false) }"));
                }
                ;

axes_select     : ID axes_predi_slc {
                    if ($2.hasOwnProperty("axe")){
                        $2.id = $1;
                        $$ = $2;
                        reportG.push(new gramatic.default("axes_select : ID axes_predi_slc","{ axes_predi_slc.val.axe = ID.valLex;\n axes_select.val = axes_predi_slc.val }"));
                    }else{
                        $2.slc.id = $1;
                        $$ = $2;
                        reportG.push(new gramatic.default("axes_select : ID axes_predi_slc","{ axes_select.val = axes_predi_slc.val }"));
                    }
                }
                | MULTI {
                    $$ = new axes.default("","","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("axes_select : MULTI","{ axes_select.val = new axes.default('','','*') }"));
                }
                ;

axes_predi_slc  : CORA e CORC {
                    $$ = new predicate.default(new axes.default("","","",@1.first_line,@1.first_column),$2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("otra_opcion_s : CORA e CORC","{ otra_opcion_s.val = new predicate.default(new axes.default('','','*'),e.val) }"));
                }
                | {
                    $$ = new axes.default("","","",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("axes_predi_slc : epsilon","{ axes_predi_slc.val = new axes.default('','','') }"));
                }
                ;

fin_opcion_s    : ID {
                    $$ = new select.default("",$1,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("fin_opcion_s : ID","{ fin_opcion_s.val = new select.default('',ID.valLex,true) }"));
                }
                | MULTI {
                    $$ = new select.default("",null,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("fin_opcion_s : MULTI","{ fin_opcion_s.val = new select.default('',null,true) }"));
                }
                ;

e               : e MAS e {
                    $$ = new aritmetica.default($1,"+",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAS e","{ e.val = new aritmetica.default(e.val,'+',e.val,false) }"));
                }
                | e MENOS e {
                    $$ = new aritmetica.default($1,"-",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENOS e","{ e.val = new aritmetica.default(e.val,'-',e.val,false) }"));
                }
                | e MULTI e {
                    $$ = new aritmetica.default($1,"*",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MULTI e","{ e.val = new aritmetica.default(e.val,'*',e.val,false) }"));
                }
                | e DIVS e {
                    $$ = new aritmetica.default($1,"/",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e DIV e","{ e.val = new aritmetica.default(e.val,'/',e.val,false) }"));
                }
                | e MODULO e {
                    $$ = new aritmetica.default($1,"%",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MODULO e","{ e.val = new aritmetica.default(e.val,'%',e.val,false) }"));
                }
                | MENOS e %prec UNARIO {
                    $$ = new aritmetica.default($2,"UNARIO",null,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : MENOS e","{ e.val = new aritmetica.default(e.val,'-',null,true) }"));
                }
                | e MENORQUE e {
                    $$ = new relacional.default($1,"<",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORQUE e","{ e.val = new relacional.default(e.val,'<',e.val,false) }"));
                }
                | e MAYORQUE e {
                    $$ = new relacional.default($1,">",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAYORQUE e","{ e.val = new relacional.default(e.val,'>',e.val,false) }"));
                }
                | e MENORIGUAL e {
                    $$ = new relacional.default($1,"<=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORIGUAL e","{ e.val = new relacional.default(e.val,'<=',e.val,false) }"));
                }
                | e MAYORIGUAL e {
                    $$ = new relacional.default($1,">=",$3,@1.first_line,@1.first_column,false);
                    eportG.push(new gramatic.default("e : e MAYORIGUAL e","{ e.val = new relacional.default(e.val,'>=',e.val,false) }"));
                }
                | e IGUAL e {
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e IGUAL e","{ e.val = new relacional.default(e.val,'=',e.val,false) }"));
                }
                | e IGUALIGUAL e {
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e IGUALIGUAL e","{ e.val = new relacional.default(e.val,'=',e.val,false) }"));
                }
                | e DIFERENTE e {
                    $$ = new relacional.default($1,"!=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e DIFERENTE e","{ e.val = new relacional.default(e.val,'!=',e.val,false) }"));
                }
                | e OR e {
                    $$ = new logica.default($1,"||",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e OR e","{ e.val = new logica.default(e.val,'&&',e.val,false) }"));
                }
                | e AND e {
                    $$ = new logica.default($1,"&&",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e AND e","{ e.val = new logica.default(e.val,'&&',e.val,false) }"));
                }
                | NOT e { 
                    $$ = new logica.default($2,"!",null,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : NOT e","{ e.val = new logica.default(e.val,'!',null,true) }"));
                }
                | PARA e PARC {
                    $$ = $2;
                    reportG.push(new gramatic.default("e : PARA e PARC","{ e.val = NUM.valLex }"));
                }
                | LAST PARA PARC {
                    $$ = new last.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : LAST PARA PARC","{ e.val = new last.default() }"));
                }
                | POSITION PARA PARC {
                    $$ = new position.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : POSITION PARA PARC","{ e.val = new position.default() }"));
                }
                | ATR ID {
                    $$ = new filtro.default($2,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : ATR ID","{ e.val = new filtro.default(ID.valLex,true) }"));
                }
                | NUM {
                    $$ = new primitivo.default(Number($1),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : NUM","{ e.val = new primitivo.default(Number(NUM.valLex)) }"));
                }
                | CADENA {
                    $1 = $1.slice(1, $1.length-1);
                    $$ = new primitivo.default($1,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : CADENA","{ e.val = new primitivo.default(CADENA.valLex) }"));
                }
                | ID{
                    $$ = new filtro.default($1,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : ID","{ e.val = new filtro.default(ID.valLex,false) }"));
                }
                | TRUE {
                    $$ = new primitivo.default(true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : TRUE","{ e.val = new primitivo.default(true) }"));
                }
                | FALSE {
                    $$ = new primitivo.default(false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : FALSE","{ e.val = new primitivo.default(false) }"));
                }
                ;