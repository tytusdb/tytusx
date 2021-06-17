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

[A-ZA-Z_][A-ZA-Z0-9_\-Ñ]*           return 'IDENTIFIER';

{STRINGLITERAL}                     return 'STRINGLITERAL';
{CHARLITERAL}                       return 'CHARLITERAL';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                        setConsola('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                        lista_errores.push(new RError(yylloc.first_column, yylloc.first_line, "Léxico", "El carácter "+yytext+" no es válido."));
                                    }

<<EOF>>                     return 'EOF'

/lex

%{

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

S               : consultas EOF                     { $$ = $1; return $$; }
                ;

consultas       : consultas SOR expresion           { $1.push($3); $$ = $1; }
                | expresion                         { $$ = [$1]; }
                ;    

expresion       : DSLASH expresion %prec DSLASH     { var lista = []; lista.push($2.pop()); $$ = lista; }
                | SLASH expresion  %prec SLASH      { var lista = []; lista.push($2.pop()); $$ = lista; }
                | expresion DSLASH expresion        { $1.push($3.pop()); $$ = $1; }
                | expresion SLASH expresion         { $1.push($3.pop()); $$ = $1; }
                | expresion AXE expresion           { $$ = new Operacion($1,$3,Operador.AXE, @1.first_line, @1.first_column); }
                | expresion AND expresion           { $$ = new Operacion($1,$3,Operador.AND, @1.first_line, @1.first_column); }              
                | expresion OR expresion            { $$ = new Operacion($1,$3,Operador.OR, @1.first_line, @1.first_column); }                  
                | NOT expresion %prec NOT           { $$ = new Operacion($2,$2,Operador.NOT, @1.first_line, @1.first_column); }
                | expresion ASIG expresion          { $$ = new Operacion($1,$3,Operador.IGUAL_QUE, @1.first_line, @1.first_column); }
                | expresion NEQUAL expresion        { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }                      
                | expresion GT expresion            { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }          
                | expresion GTE expresion           { $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }        
                | expresion LT expresion            { $$ = new Operacion($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }         
                | expresion LTE expresion           { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }
                | expresion MOD expresion           { $$ = new Operacion($1,$3,Operador.MOD, @1.first_line, @1.first_column); }                           
                | expresion DIV expresion           { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }                           
                | expresion TIMES expresion         { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }                      
                | expresion PLUS expresion          { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }        
                | expresion MINUS expresion         { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }
                | LPAREN expresion RPAREN           { $$ = $2 }                   
                | MINUS expresion %prec UMINUS      { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }
                | expresion TIMES                   { $$ = new Operacion($1,$1,Operador.POR_WILDCARD, @1.first_line, @1.first_column); }       
                | TIMES                             { $$ = new Operacion($1,$1,Operador.POR, @1.first_line, @1.first_column); }              
                | DOUBLELITERAL                     { $$ = new Operacion($1,$1,Operador.DECIMAL, @1.first_line, @1.first_column); }                   
                | INTEGERLITERAL                    { $$ = new Operacion($1,$1,Operador.ENTERO, @1.first_line, @1.first_column); }                    
                | STRINGLITERAL                     { $$ = new Operacion($1,$1,Operador.CADENA, @1.first_line, @1.first_column); }
                | CHARLITERAL                       { $$ = new Operacion($1,$1,Operador.CADENA, @1.first_line, @1.first_column); }
                | nodo                              { var lista = []; lista.push(new Nodo($1, false)); $$ = lista; }       
                | DOT nodo                          { $$ = new Operacion($2,$2,Operador.DOT, @1.first_line, @1.first_column); }
                | DDOT nodo                         { $$ = new Operacion($2,$2,Operador.DOUBLE_DOT, @1.first_line, @1.first_column); }
                | DOT                               { $$ = new Operacion(null,null,Operador.DOT, @1.first_line, @1.first_column); }
                | DDOT                              { $$ = new Operacion(null,null,Operador.DOUBLE_DOT, @1.first_line, @1.first_column); }     
                | error                             { setConsola('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                      lista_errores.push(new RError(this._$.first_column, this._$.first_line, "Sintáctico", "No se esperaba " + yytext));                                               
                                                    }         
                ;

nodo            : AT TIMES
                | AT predicado                      { $$ = $2; }
                | predicado                         { $$ = $1; }                      
                ;

predicado       : IDENTIFIER cors
                | IDENTIFIER func
                | IDENTIFIER                        { $$ = $1; }
                ;

func            : LPAREN args PAREN
                | LPAREN RPAREN
                ;               

args            : args COMA expresion
                | expresion
                ;                 

cors            : cors LCOR expresion RCOR             
                | LCOR expresion RCOR               { $$ = $2; }        
                ;