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
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")

%%

/* Comentarios */

"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}

/* Simbolos del programa */

/* Caracteres */
'|'                    { return 'SEVERAL' }

"("                    { return 'PARA' }
")"                    { return 'PARC' }
"["                    { return 'CORA' }
"]"                    { return 'CORC' }
"."                    { return 'PTN' }
":"                    { return 'DPTN' }

/* Palabras reservadas */
"last"                 { return 'LAST' }
"position"             { return 'POSITION' }

/* Operadores Aritmeticos */
"+"                    { return 'MAS'}
"-"                    { return 'MENOS'}
"*"                    { return 'MULTI'}
"/"                    { return 'DIV'}
"div"                    { return 'DIVS'}
"^"                    { return 'POTENCIA'}
"mod"                  { return 'MODULO'}

/* Operaciones Relacionales */
"<="                   { return 'MENORIGUAL'}
">="                   { return 'MAYORIGUAL'}
"<"                    { return 'MENORQUE'}
">"                    { return 'MAYORQUE'}
"!="                   { return 'DIFERENTE'}
"=="                   { return 'IGUALIGUAL'}
"="                    { return 'IGUAL'}

/* Operaciones Logicas */
"or"                   { return 'OR'}
"and"                  { return 'AND'}
"!"                    { return 'NOT'}

/* Selecting nodes */
"@"                    { return 'ATR' }

"true"                 { return 'TRUE'}
"false"                { return 'FALSE'}

"print"                { return 'PRINT' }

{num}                  { return 'NUM'}
{id}                   { return 'ID'}
{cadena}               { return 'CADENA'}

/* Espacios */
[\s\r\n\t]             {/* skip whitespace */}

<<EOF>>                return 'EOF'

/* Errores lexicos */
.                      { rep_error.InsertarError("lexico", yytext, "xpath", yylloc.first_line, yylloc.first_column); }

/lex

/* Precedencia de operadores */
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVS' 'MODULO'
//%nonassoc 'POTENCIA'
%right 'UNARIO'

%start inicio

%% /* Gramatica */

/*inicio : lista_instrucciones EOF { console.log($1); $$ = new ast_xpath.default($1); return $$; }
    ;
lista_instrucciones : lista_instrucciones instruccion    { $$ = $1; $1.push($2) }
    | instruccion                                        { $$ = new Array(); $$.push($1) }
    ;*/

inicio          : lista_several EOF  {
                    reportG.push(new gramatic.default("inicio : lista_several EOF","{ inicio.val = new ast_xpath.default(lista_several.val); }"));
                    let auxReportG = reportG;
                    reportG = [];
                    $$ = { "xpath": new ast_xpath.default($1), "reportG": auxReportG};
                    return $$;
                }
                ;

lista_several   : lista_several SEVERAL lista_select {
                    $$ = $1;
                    $$.push($3);
                    reportG.push(new gramatic.default("lista_several : lista_several SEVERAL lista_select","{ lista_several.val = lista_severalP.val;\n lista_several.val.push(lista_select.val); }"));
                }
                | lista_select {
                    $$ = new Array; 
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_several : lista_select","{ lista_several.val = new Array();\n lista_several.val.push(lista_select.val); }"));
                }
                ;

lista_select    : lista_select select { 
                    $$ = $1;
                    $$.push($2);
                    reportG.push(new gramatic.default("lista_select : lista_select select","{ lista_select.val = lista_selectP.val;\n lista_select.val.push(select.val); }"));
                }
                | select { 
                    $$ = new Array();
                    $$.push($1);
                    reportG.push(new gramatic.default("lista_select : select","{ lista_select.val = new Array();\n lista_select.val.push(select.val); }"));
                }
                ;

select          : DIV ID {
                    $$ = new select.default("/",$2,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID","{ select.val = new select.default('/',ID.valLex,false) }"));
                }
                | DIV DIV ID {
                    $$ = new select.default("//",$3,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID","{ select.val = new select.default('//',ID.valLex,false) }"));
                }
                | DIV ATR ID {
                    $$ = new select.default("/",$3,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ATR ID","{ select.val = new select.default('/',ID.valLex,true) }"));
                }
                | DIV DIV ATR ID {
                    $$ = new select.default("//",$4,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR ID","{ select.val = new select.default('//',ID.valLex,true) }"));
                }
                | DIV MULTI {
                    $$ = new select.default("/","*",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV MULTI","{ select.val = new select.default('/',*,false) }"));
                }
                | DIV DIV MULTI {
                    $$ = new select.default("//","*",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR MULTI","{ select.val = new select.default('//','*',false) }"));
                }
                | DIV ATR MULTI {
                    $$ = new select.default("/",null,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ATR MULTI","{ select.val = new select.default('/',null,true) }"));
                }
                | DIV DIV ATR MULTI {
                    $$ = new select.default("//",null,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR MULTI","{ select.val = new select.default('//',null,true) }"));
                }//SELECT + FILTRO
                | DIV ID CORA e CORC {
                    $$ = new predicate.default(new select.default("/",$2,false,@1.first_line,@1.first_column,null),$4,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID CORA e CORC","{ select.val = new predicate.default(new select.default('/',ID.valLex,false,null),e.val) }"));
                }
                | DIV DIV ID CORA e CORC {
                    $$ = new predicate.default(new select.default("//",$3,false,@1.first_line,@1.first_column,null),$5,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID CORA e CORC","{ select.val = new predicate.default(new select.default('//',ID.valLex,false,null),e.val) }"));
                }//SELECT AXES
                | DIV ID DPTN DPTN ID {
                    $$ = new axes.default("/",$2,$5,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN ID","{ select.val = new axes.default('/',ID.valLex,'ID.valLex') }"));
                }
                | DIV ID DPTN DPTN MULTI {
                    $$ = new axes.default("/",$2,"*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN MULTI","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV ID DPTN DPTN ID {
                    $$ = new axes.default("//",$3,$6,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN ID","{ select.val = new axes.default('//',ID.valLex,ID.valLex) }"));
                }
                | DIV DIV ID DPTN DPTN MULTI {
                    $$ = new axes.default("//",$3,"*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN MULTI","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }//SELECT AXES + FILTRO
                | DIV ID DPTN DPTN ID CORA e CORC {
                    $$ = new predicate.default(new axes.default("/",$2,$5,@1.first_line,@1.first_column),$7,@1.first_line,@1.first_column)
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN ID CORA e CORC","{ select.val = new axes.default('/',ID.valLex,'ID.valLex') }"));
                }
                | DIV DIV ID DPTN DPTN ID CORA e CORC {
                    $$ = new predicate.default(new axes.default("//",$3,$6,@1.first_line,@1.first_column),$8,@1.first_line,@1.first_column)
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN ID CORA e CORC","{ select.val = new axes.default('//',ID.valLex,ID.valLex) }"));
                }//SELECTING . OR ..
                | DIV PTN {
                    $$ = new axes.default("/","self","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV PTN","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV PTN {
                    $$ = new axes.default("//","self","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV PTN","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }
                | DIV PTN PTN {
                    $$ = new axes.default("/","parent","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV PTN","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV PTN PTN {
                    $$ = new axes.default("//","..","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV PTN","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }//NODE
                | DIV ID PARA PARC {
                    $$ = new axes.default("/",$2+"()","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID PARA PARC","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV ID PARA PARC {
                    $$ = new axes.default("//",$3+"()","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID PARA PARC","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }
                ;

instruccion     : PRINT PARA e PARC     { $$ = new print.default($3,@1.first_line,@1.first_column) }
                ;

e               :  NUM {
                    $$ = new primitivo.default(Number($1),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : NUM","{ e.val = new primitivo.default(Number(NUM.valLex)) }"));
                }
                | CADENA {
                    $1 = $1.slice(1, $1.length-1);
                    $$ = new primitivo.default($1,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : CADENA","{ e.val = new primitivo.default(CADENA.valLex) }"));
                }
                | LAST PARA PARC {
                    $$ = new last.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : LAST PARA PARC","{ e.val = new last.default() }"));
                }
                | POSITION PARA PARC {
                    $$ = new position.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : POSITION PARA PARC","{ e.val = new position.default() }"));
                }
                | ID {
                    $$ = new filtro.default($1,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : ID","{ e.val = new filtro.default(ID.valLex,false) }"));
                }
                | ATR ID {
                    $$ = new filtro.default($2,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : ATR ID","{ e.val = new filtro.default(ID.valLex,true) }"));
                }
                | TRUE {
                    $$ = new primitivo.default(true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : TRUE","{ e.val = new primitivo.default(true) }"));
                }
                | FALSE {
                    $$ = new primitivo.default(false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : FALSE","{ e.val = new primitivo.default(false) }"));
                }
                | e MAS e {
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
                    reportG.push(new gramatic.default("e : e MAYORIGUAL e","{ e.val = new relacional.default(e.val,'>=',e.val,false) }"));
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
                ;