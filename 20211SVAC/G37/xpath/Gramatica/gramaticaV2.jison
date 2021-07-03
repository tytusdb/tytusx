/* Definición Léxica */
%lex

%options case-insensitive

ESCAPECHAR                          [\'\"\\bfnrtv]
ESCAPE                              \\{ESCAPECHAR}
ACCEPTEDCHARSDOUBLE                 [^\"\\]+
STRINGDOUBLE                        {ESCAPE}|{ACCEPTEDCHARSDOUBLE}
STRINGLITERAL                       \"{STRINGDOUBLE}*\"

ACCEPTEDCHARSSINGLE                 [^\'\\]
STRINGSINGLE                        {ESCAPE}|{ACCEPTEDCHARSSINGLE}
CHARLITERAL                         \'{STRINGSINGLE}\'

BSL                                 "\\".
%s                                  comment
%%


\s+                                 /* skip whitespace */

"print"                     return 'PRINT';
"null"                      return 'NULL';
"true"                      return 'TRUE';
"false"                     return 'FALSE';

"+"                         return 'PLUS';
"-"                         return 'MINUS';
"*"                         return 'TIMES';
"//"                        return 'DSLASH';
"/"                         return 'SLASH';
"div"                       return 'DIV';
".."                        return 'DDOT';
"."                         return 'DOT';
"@"                         return 'AT';
"mod"                       return 'MOD';

"<="                        return 'LTE';
">="                        return 'GTE';
"<"                         return 'LT';
">"                         return 'GT';
"="                         return 'ASIG';
"=="                        return 'EQUAL';
"!="                        return 'NEQUAL';

"and"                       return 'AND';
"|"                         return 'SOR';
"or"                        return 'OR';
"not"                       return 'NOT';

","                         return 'COMA';
";"                         return 'SEMICOLON';
"::"                        return 'AXE'
"("                         return 'LPAREN';
")"                         return 'RPAREN';
"["                         return 'LCOR';
"]"                         return 'RCOR';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DOUBLELITERAL';
[0-9]+                              return 'INTEGERLITERAL';

[A-ZA-Z_][A-ZA-Z0-9_\-Ñ]*            return 'IDENTIFIER';

{STRINGLITERAL}                     return 'STRINGLITERAL';
{CHARLITERAL}                       return 'CHARLITERAL';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

%{
   function nodo_ast(tipo, valor, fila, columna, regla) {

    this.Tipo = tipo;
    this.Valor = valor;
    this.Fila = fila;
    this.Columna = columna;
    this.Regla = regla;
    this.hijos = new Array();

}
%}

%left 'DSLASH', 'SLASH'
%left 'AXE'
%left 'OR'
%left 'AND'
%left 'EQUAL' 'ASIG' 'NEQUAL'
%nonassoc 'LT' 'GT' 'LTE' 'GTE'
%left 'PLUS' 'MINUS' 'TIMES' 'MOD'
%left 'MUL' 'DIV'
%left UMINUS 'NOT'
%left 'LCOR' 'RCOR'

%start S

%%

S               : consultas EOF
                {
                    var padre = new nodo_ast("CST","",this._$.first_line, this._$.first_column, `S.list = consultas.list;`);
                    padre.hijos = $1;
                    var resultado = {cst: padre};
                        return resultado;
                    }
                }
                ;
consultas       : consultas SOR expresion
                {
                    $1.push(new nodo_ast("SOR",$2,this._$.first_line, @1.last_column, `consultas.list = consultas1.list; consultas.list.add(nodos);`));
                    $1.push($3);
                    $$= $1;
                }
                | expresion
                {
                    var l_exp = new Array();
                    l_exp.push($1);
                    $$ = l_exp;
                }
                ;

expresion       : DSLASH expresion %prec DSLASH
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `nodos.list.add(expresion1); nodos.doble = true; `);
                    padre.hijos.push(new nodo_ast("DSLASH",$1,this._$.first_line, @1.last_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | SLASH expresion  %prec SLASH
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `nodos.list.add(expresion1); nodos.doble = false;`);
                    padre.hijos.push(new nodo_ast("SLASH",$1,this._$.first_line, @1.last_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | expresion DSLASH expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `nodos.list.add(expresion1); nodos.list.add(expresion2); nodos.doble = true;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("DSLASH",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion SLASH expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `nodos.list.add(expresion1); nodos.list.add(expresion2); nodos.doble = false;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("SLASH",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion AXE expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val :: expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("AXE",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion AND expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val && expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("AND",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion OR expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val || expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("OR",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | NOT expresion %prec NOT
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = !expresion2.val;`);
                    padre.hijos.push(new nodo_ast("NOT",$1,this._$.first_line, @1.last_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | expresion ASIG expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val == expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("ASIG",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion NEQUAL expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val != expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("NEQUAL",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion GT expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val > expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("GT",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion GTE expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column,`expresion.val = expresion1.val >= expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("GTE",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion LT expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val < expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("LT",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion LTE expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val <= expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("LTE",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion MOD expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val % expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("MOD",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion DIV expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val / expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("DIV",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion TIMES expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val * expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("TIMES",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion PLUS expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val + expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("PLUS",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | expresion MINUS expresion
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val - expresion2.val;`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("MINUS",$2,this._$.first_line, this._$.first_column));
                    padre.hijos.push($3);
                    $$ = padre;
                }
                | LPAREN expresion RPAREN
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion1.val;`);
                    padre.hijos.push(new nodo_ast("LPAREN",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    padre.hijos.push(new nodo_ast("RPAREN",$3,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                | MINUS expresion %prec UMINUS
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion.val * -1;`);
                    padre.hijos.push(new nodo_ast("MINUS",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | expresion TIMES
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = expresion.val + "*";`);
                    padre.hijos.push($1);
                    padre.hijos.push(new nodo_ast("TIMES",$2,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                | TIMES
                {
                    $$ = new nodo_ast("TIMES",$1,this._$.first_line, this._$.first_column, `expresion.val = "*";`);
                }
                | DOUBLELITERAL
                {
                    $$ = new nodo_ast("DOUBLELITERAL",$1,this._$.first_line, this._$.first_column, `expresion.val = DOUBLELITERAL.lexval;`);
                }
                | INTEGERLITERAL
                {
                    $$ = new nodo_ast("INTEGERLITERAL",$1,this._$.first_line, this._$.first_column, `expresion.val = INTEGERLITERAL.lexval;`);
                }
                | STRINGLITERAL
                {
                    $$ = new nodo_ast("STRINGLITERAL",$1,this._$.first_line, this._$.first_column, `expresion.val = STRINGLITERAL.lexval;`);
                }
                | CHARLITERAL
                {
                    $$ = new nodo_ast("CHARLITERAL",$1,this._$.first_line, this._$.first_column, `expresion.val = CHARLITERAL.lexval;`);
                }
                | nodo
                {
                    $$ = $1;
                }
                | DOT nodo
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = ".." + nodo.val;`);
                    padre.hijos.push(new nodo_ast("DOT",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | DDOT nodo
                {
                    var padre = new nodo_ast("EXP","",this._$.first_line, this._$.first_column, `expresion.val = ".." + nodo.val;`);
                    padre.hijos.push(new nodo_ast("DDOT",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | DOT
                {
                    $$ = new nodo_ast("DOT",$1,this._$.first_line, this._$.first_column, `expresion.val = ".";`);
                }
                | DDOT
                {
                    $$ = new nodo_ast("DDOT",$1,this._$.first_line, this._$.first_column, `expresion.val = "..";`);
                }
                ;
nodo            : AT TIMES
                {
                    var padre = new nodo_ast("NODO","",this._$.first_line, this._$.first_column, `nodo.args = "*";`);
                    padre.hijos.push(new nodo_ast("AT",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push(new nodo_ast("TIMES",$2,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                | AT predicado
                {
                    var padre = new nodo_ast("NODO","",this._$.first_line, this._$.first_column, `if(predicado.func == null){
						             nodo.val = predicado.val;
						             nodo.args = predicado.args;
						             nodo.arr = true;
						  	}else{
						             ejecutarFuncion(predicado.func);
						  	} `);
                    padre.hijos.push(new nodo_ast("AT",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre
                }
                | predicado
                {
                    $$ = $1;
                }
                ;

predicado       : IDENTIFIER cors
                {
                    var padre = new nodo_ast("PREDICADO","",this._$.first_line, this._$.first_column, `predicado.cors = cors.list; predicado.val = IDENTIFIER.lexval;`);
                    padre.hijos.push(new nodo_ast("IDENTIFIER",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | IDENTIFIER func
                {
                    var padre = new nodo_ast("PREDICADO","",this._$.first_line, this._$.first_column, `predicado.args = func.val; predicado.val = IDENTIFIER.lexval;`);
                    padre.hijos.push(new nodo_ast("IDENTIFIER",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    $$ = padre;
                }
                | IDENTIFIER
                {
                    $$ = new nodo_ast("IDENTIFIER",$1,this._$.first_line, this._$.first_column, `predicado.val = IDENTIFIER.lexval;`);
                }
                ;
func            : LPAREN args PAREN
                {
                    var padre = new nodo_ast("FUNC","",this._$.first_line, this._$.first_column, `func.val = args.list;`);
                    padre.hijos.push(new nodo_ast("LPAREN",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    padre.hijos.push(new nodo_ast("RPAREN",$3,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                | LPAREN RPAREN
                {
                    var padre = new nodo_ast("FUNC","",this._$.first_line, this._$.first_column, `func.val = null;`);
                    padre.hijos.push(new nodo_ast("LPAREN",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push(new nodo_ast("RPAREN",$2,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                ;
args            : args COMA expresion
                {
                    $1.push(new nodo_ast("COMA",$2,this._$.first_line, this._$.first_column, `args.list.add(args1.list); args.list.add(expresion.val);`)); 
                    $1.push($3);
                    $$= $1;
                }
                | expresion
                {
                    var a = new Array();
                    a.push($1);
                    $$ = a;
                }
                ;

cors            : cors LCOR expresion RCOR
                {
                    var padre = new nodo_ast("CORS","",this._$.first_line, this._$.first_column, `cors.list.add(cors1.list); cors.list.add(expresion.val);`);
                    padre.hijos.push(new nodo_ast("LCORS",$2,this._$.first_line, this._$.first_column));
                    var l_exp = new Array();
                    l_exp.push($3)
                    padre.hijos.push(new nodo_ast("RORS",$4,this._$.first_line, this._$.first_column));
                    $1.push(padre);
                    $$ = $1;
                }
                | LCOR expresion RCOR
                {
                    var padre = new nodo_ast("CORS","",this._$.first_line, this._$.first_column, `cors.list = new list(); cors.list.add(expresion.val);`);
                    padre.hijos.push(new nodo_ast("LCORS",$1,this._$.first_line, this._$.first_column));
                    padre.hijos.push($2);
                    padre.hijos.push(new nodo_ast("RORS",$3,this._$.first_line, this._$.first_column));
                    $$ = padre;
                }
                ;