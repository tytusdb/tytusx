 
%{
    const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    const {Relational, RelationalOption} = require('../Expression/Relational');
    const {Logic, LogicOption} = require('../Expression/Logic');
    const {Unary, UnaryOption} = require('../Expression/Unary');
    const {ArrayAccess} = require('../Expression/ArrayAccess');
    const {Access} = require('../Expression/Access');
    const {Literal} = require('../Expression/Literal');
    // Instrucciones
    const {Assignation} = require('../Optimizer/Assignation');
    const {ArrayAssignation} = require('../Optimizer/ArrayAssignation');
    const {Goto} = require('../Optimizer/Goto');
    const {IfGoto} = require('../Optimizer/IfGoto');
    const {Label} = require('../Optimizer/Label');
    const {Print} = require('../Optimizer/Print');
    const {Return} = require('../Optimizer/Return');
%}

%lex
%options case-sensitive
number  [0-9]+
decimal [0-9]+("."[0-9]+)?
string  ([\"][^"]*[\"])
string2  ([\'][^\']*[\'])
template [`]([^`])*[`]
%%
\s+                   /* skip whitespace */
"//".*                                /* IGNORE */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */

{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'
{string}                return 'STRING'

"/"                     return '/'
"*"                     return '*'
":"                     return ':'
";"                     return ';'
","                     return ','
"."                     return '.'
"-"                     return '-'
"+"                     return '+'
"%"                     return '%'
"?"                     return '?'
"#"                     return '#'

"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"=="                  return '=='
"!="                  return '!='
"||"                  return 'OR'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
"null"                return 'NULL'

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'
"if"                    return 'IF'
"else"                  return 'ELSE'
"return"                return 'RETURN'
"include"               return 'INCLUDE'
"float"                 return 'FLOAT'
"int"                 return 'INT'
"char"                 return 'CHAR'
"void"                  return 'VOID'
"goto"                  return 'GOTO'
"printf"                  return 'PRINT'

([a-zA-Z_])[a-zA-Z0-9_ñÑ.]*	return 'ID';
<<EOF>>		                return 'EOF'


/lex

%left '?'
%left 'OR'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
%left '^'


%start Init

%%

Init    
    : Includes Declarations Instructions EOF 
    {
        return $3;
    } 
;

Includes
    : '#' 'INCLUDE' '<' ID '>' 
    | Includes '#' 'INCLUDE' '<' ID '>' 
;

Instructions
    : Instructions Method{
        $1.push($2);
        $$ = $1;
    }
    | Method{ $$ = [$1]; }
;

Method 
    : 'VOID' ID '(' ')' '{' Statements '}' { $$ = $6; }
;

Statements
    : Statements Statement { $1.push($2); $$ = $1; }
    | Statement { $$ = [$1] }
;

Statement 
    : Assignation ';' { $$ = $1 }
    | 'GOTO' ID ';' { $$ = new Goto($2, @1.first_line, @1.first_column) }
    | ID ':' { $$ = new Label($1, @1.first_line, @1.first_column) }
    | PRINT '(' STRING ',' Expr ')' ';' { $$ = new Print($3, $5, @1.first_line, @1.first_column) }
    | PRINT '(' STRING ')' ';' { $$ = new Print($3, null, @1.first_line, @1.first_column) }
    | RETURN ';'  { $$ = new Return(@1.first_line, @1.first_column) }
    | 'IF' '(' Expr ')' 'GOTO' ID ';' { $$ = new IfGoto($3, $6, @1.first_line, @1.first_column) }
;

Assignation
    :  ID '=' Expr { $$ = new Assignation($1, $3, @1.first_line,@1.first_column) }
    | ID '[' F ']' '=' Expr { $$ = new ArrayAssignation($1, $3, $6, @1.first_line,@1.first_column) }
;

Declarations 
    : Declarations Declaration
    | Declaration
;

Declaration 
    : 'FLOAT' DecList ';'
    | 'FLOAT' ID '[' F ']' ';'
;

DecList
    : ID
    | DecList ',' ID
;

Expr
    : Expr '+' Expr
    {
        $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS, @1.first_line,@1.first_column);
    }       
    | Expr '-' Expr
    {
        $$ = new Arithmetic($1, $3, ArithmeticOption.MINUS, @1.first_line,@1.first_column);
    }
    | Expr '*' Expr
    { 
        $$ = new Arithmetic($1, $3, ArithmeticOption.TIMES, @1.first_line,@1.first_column);
    }       
    | Expr '/' Expr
    {
        $$ = new Arithmetic($1, $3, ArithmeticOption.DIV, @1.first_line,@1.first_column);
    }
    | Expr '%' Expr
    {
        $$ = new Arithmetic($1, $3, ArithmeticOption.MOD, @1.first_line,@1.first_column);
    }
    | Expr '<=' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.LESSOREQUAL ,@1.first_line, @1.first_column);
    }
    | Expr '>=' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.GREATEROREQUAL ,@1.first_line, @1.first_column);
    }
    | Expr '==' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.EQUAL ,@1.first_line, @1.first_column);
    }
    | Expr '!=' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.NOTEQUAL ,@1.first_line, @1.first_column);
    }
    | Expr '>' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.GREATER ,@1.first_line, @1.first_column);
    }
    | Expr '<' Expr
    {
        $$ = new Relational($1, $3,RelationalOption.LESS, @1.first_line, @1.first_column);
    }
    | F
    {
        $$ = $1;
    }
    | Cast F
    {
        $$ = $2;
    }
;

F   : DECIMAL
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | NUMBER
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | ID { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 8);
    }
    | ID '[' ID ']'{ 
        $$ = new ArrayAccess($1, null, $3, @1.first_line, @1.first_column);
    }
    | ID '[' Cast ID ']'{ 
        $$ = new ArrayAccess($1, $3, $4, @1.first_line, @1.first_column);
    }
;

Cast : '(' NativeType ')' {$$ = $2}
;

NativeType : 'INT' {$$ = 'int'}
             | 'FLOAT'  {$$ = 'float'}
             | 'CHAR'  {$$ = 'char'}
;