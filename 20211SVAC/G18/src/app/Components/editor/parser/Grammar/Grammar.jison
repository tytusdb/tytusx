 
%{
   // const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    
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
{string2}               return 'STRING'
{template}              return 'TEMPLATE'
"true"                  return 'BOOL'
"false"                 return 'BOOL'
"**"                    return '^'
"*"                     return '*'
"/"                     return '/'
":"                     return ':'
";"                     return ';'
","                     return ','
"."                     return '.'
"-"                     return '-'
"+"                     return '+'
"%"                     return '%'
"?"                     return '?'

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
"new"                 return 'NEW'
"Array"               return 'ARRAY'

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'
"in"                    return 'IN'
"of"                    return 'OF'
"if"                    return 'IF'
"else"                  return 'ELSE'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"while"                 return 'WHILE'
"do"                    return 'DO'
"for"                   return 'FOR'
"console.log"           return 'PRINT'
"break"                 return 'BREAK'
"return"                return 'RETURN'
"continue"              return 'CONTINUE'
"function"              return 'FUNCTION'

"string"                return 'STYPE'
"number"                return 'NTYPE'
"boolean"               return 'BTYPE'
"void"                  return 'VTYPE'
"type"                 return 'TTYPE'
"let"                   return 'LET'
"const"                 return 'CONST'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		                return 'EOF'
.                           errores.push(new Error_(yylloc.first_line, yylloc.first_column, 'Lexico','Valor inesperado ' + yytext));  


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
    : Instructions EOF 
    {
        return $1;
    } 
;

Instructions
    : Instructions Instruction{
        $1.push($2);
        $$ = $1;
    }
    | Instruction{
        $$ = [$1];
    }
;

Instruction
    : IfSt {
        $$ = $1;
    }
    | WhileSt {
        $$ = $1;
    }
    | DoWhileSt {
        $$ = $1;
    }
    | ForSt {
        $$ = $1;
    }
    | SwitchSt {
        $$ = $1;
    }
    | Statement {
        $$ = $1;
    }
    | PrintSt {
        $$ = $1;
    }
    | Declaration ';' {
        $$ = $1;
    } 
    | Assignation ';' {
        $$ = $1;
    } 
    | Operation ';' {
        $$ = $1;
    }
    | 'BREAK' ';'{
        $$ = new Break(@1.first_line, @1.first_column);
    }
    | 'CONTINUE' ';'{
        $$ = new Continue(@1.first_line, @1.first_column);
    }
    // TODO Agregar return vacio
    | 'RETURN' Expr ';'{
        $$ = new Return($2 ,@1.first_line, @1.first_column);
    }
    | 'RETURN' ';'{
        $$ = new Return($1 ,@1.first_line, @1.first_column);
    }
    | FunctionSt {
        $$ = $1;
    }
    | Call ';' {
        $$ = $1;
    }
    | error ';' {
        errores.push(new Error_( @1.first_line, @1.first_column, 'Sintactico', yytext));
    }
;

Call
    : Access '(' ')' {
        $$ = new Call($1, [], @1.first_line, @1.first_column);
    }
    | Access '(' ListaExpr ')' {
        $$ = new Call($1, $3, @1.first_line, @1.first_column);
    }
;

ListaExpr 
    : ListaExpr ',' Expr{
        $1.push($3);
        $$ = $1;
    }
    | Expr{
        $$ = [$1];
    }
;    

FunctionSt 
    : 'FUNCTION' ID '(' ')' Type Statement  {
        $$ = new Function($2, $6, [], $5, @1.first_line, @1.first_column);
    }
    | 'FUNCTION' ID '(' Parametros ')' Type Statement {
        $$ = new Function($2, $7, $4, $6, @1.first_line, @1.first_column);
    }
    | 'FUNCTION' ID '(' Parametros ')' Statement{
        $$ = new Function($2, $6, $4, null, @1.first_line, @1.first_column);
    }
    | 'FUNCTION' ID '(' ')' Statement{
        $$ = new Function($2, $5, [], null, @1.first_line, @1.first_column);
    }
;

Parametros
    : Parametros ',' ID Type {
        $1.push(new Param($3,$4, @1.first_line, @1.first_column) );
        $$ = $1;
    }
    | ID Type{
        $$ = [ new Param($1,$2, @1.first_line, @1.first_column) ];
    }
;

Declaration 
    : Reserved ID Type '=' '{' StructAssign '}' {
        $$ = new Declaration($1, $3, $2, $6, @1.first_line, @1.first_column);
    }
    | Reserved ID Type '=' Expr {
        $$ = new Declaration($1, $3, $2, $5, @1.first_line, @1.first_column);
    }
    | Reserved ID Type '=' 'NEW' 'ARRAY' '(' Expr ')' {
        $$ = new ArrayDeclaration($1, $3, $2, $8, @1.first_line, @1.first_column);
    }
    | Reserved ID Type {
        $$ = new Declaration($1, $3, $2, null, @1.first_line, @1.first_column);
    }
    | Reserved ID '=' Expr {
        $$ = new Declaration($1, null, $2, $4, @1.first_line, @1.first_column);
    }
    | TTYPE ID '=' '{' Struct '}' {
        $$ = new TypeDeclaration($2, $5, @1.first_line, @1.first_column);
    }
;

Struct
    : Struct ',' ID Type {
        $1.push({id:$3,type:$4});
        $$ = $1;
    }
    | ID Type {
        $$ = [{id:$1,type:$2}]
    }
;


Assignation 
    : Access '=' Expr {
        $$ = new Assignation($1, $3, @1.first_line, @1.first_column);
    }
    | Access '=' '{' StructAssign '}' {
        $$ = new Assignation($1, $4, @1.first_line, @1.first_column);
    }
;

StructAssign
    : StructAssign ',' ID ':' Expr {
        $1.push({id:$3,value:$5});
        $$ = $1;
    }
    | ID ':' Expr {
        $$ = [{id:$1,value:$3}]
    }
;

Reserved
    : LET { $$ = new Literal($1, @1.first_line, @1.first_column, 5); }
    | CONST { $$ = new Literal($1, @1.first_line, @1.first_column, 5); }
;

Type 
    : NativeType ArrayDimensions { $$ = new ArrayType($1, $2, @1.first_line, @1.first_column) }
    | NativeType { $$ = $1; }
;

ArrayDimensions
    : ArrayDimensions '[' ']' { $1++; $$ = $1; }
    | '[' ']' { $$ = 1 }
;

NativeType 
    :':' STYPE { $$ = new _Type($2, 1, @1.first_line, @1.first_column); }
    |':' NTYPE { $$ = new _Type($2, 0, @1.first_line, @1.first_column); }
    |':' BTYPE { $$ = new _Type($2, 2, @1.first_line, @1.first_column); }
    |':' VTYPE { $$ = new _Type($2, 3, @1.first_line, @1.first_column); }
    |':' ID    { $$ = new _Type($2, 5, @1.first_line, @1.first_column); }
;

IfSt
    : 'IF' '(' Expr ')' Statement ElseSt{
        $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
    }
;

ElseSt
    : 'ELSE' Statement {
        $$ = $2;
    }
    | 'ELSE' IfSt {
        $$ = $2;
    }
    | /* epsilon */
    {
        $$ = null;
    }
;


SwitchSt
    : 'SWITCH' '(' Expr ')' '{' Cases DefaultSt '}' {
        $$ = new Switch($3, $6, $7, @1.first_line, @1.first_column);
    }
    | 'SWITCH' '(' Expr ')' '{' DefaultSt '}' {
        $$ = new Switch($3, null, $6, @1.first_line, @1.first_column);
    }
;

Cases
    : Cases CaseSt
    {
        $1.push($2);
        $$ = $1;
    }
    | CaseSt
    {
        $$ = [$1];
    }
;

CaseSt 
    : 'CASE' Expr SwitchCode
    {
        $$ = new Case($2, $3, @1.first_line, @1.first_column);
    }
;

DefaultSt
    : 'DEFAULT' SwitchCode {
        $$ = new Case(null, $2, @1.first_line, @1.first_column);
    }
    | /* epsilon */
    {
        $$ = null;
    }
;

SwitchCode
    : ':' Instructions {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
;

ForSt
    : 'FOR' '(' Declaration ';' Expr ';' Operation ')' Statement {
        $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column);
    }
    | 'FOR' '(' ID ';' Expr ';' Operation ')' Statement {
        $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column);
    }
    | 'FOR' '(' Reserved ID 'IN' ID ')' Statement {
        $$ = new ForIn($3, $4, $6, $8, @1.first_line, @1.first_column);
    }
    | 'FOR' '(' Reserved ID 'OF' ID ')' Statement {
        $$ = new ForOf($3, $4, $6, $8, @1.first_line, @1.first_column);
    }
;

WhileSt
    : 'WHILE' '(' Expr ')' Statement{
        $$ = new While($3, $5, @1.first_line, @1.first_column);
    }
;

DoWhileSt
    : 'DO' Statement 'WHILE' '(' Expr ')' ';' {
        $$ = new DoWhile($2, $5, @1.first_line, @1.first_column);
    }
;

Statement
    : '{' Instructions '}' {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    | '{' '}' {
        $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
;

PrintSt 
    : 'PRINT' '(' ExprList ')' ';' {
        $$ = new Print($3, @1.first_line, @1.first_column);
    }
;

ExprList
    : ExprList ',' Expr {$1.push($3); $$ = $1;}
    | Expr { $$ = [$1] }
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
    | Expr '^' Expr
    {
        $$ = new Arithmetic($1, $3, ArithmeticOption.POWER, @1.first_line,@1.first_column);
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
    | Expr '&&' Expr
    {
        $$ = new Logic($1, $3,LogicOption.AND ,@1.first_line, @1.first_column);
    }
    | Expr 'OR' Expr
    {
        $$ = new Logic($1, $3,LogicOption.OR ,@1.first_line, @1.first_column);
    }
    | Expr '?' Expr ':' Expr
    {
        $$ = new Ternary($1, $3, $5, @1.first_line, @1.first_column);
    }
    | Unary
    {
        $$ = $1;
    }
    | 'NULL'
    {
        $$ = null;
    }
    | '[' ']'
    {
        $$ = [];
    }
    | '[' ExprList ']'
    {
        $$ = $2;
    }
;

Operation 
        : ID '+' '+' 
        {
            $$ = new Operation($1, OperationOption.INCREMENT, @1.first_line,@1.first_column);
        }
        | ID '-' '-' 
        {
            $$ = new Operation($1, OperationOption.DECREMENT, @1.first_line,@1.first_column);
        }
;

Unary
    : '!' Unary
    {
        $$ = new Unary($2, UnaryOption.NEGATION, @1.first_line, @1.first_column,0);
    }
    | '-' F
    {
        $$ = new Unary($2, UnaryOption.MINUS, @1.first_line, @1.first_column,0);
    }
    | F
    {
        $$ = $1;
    }
;

F   : '(' Expr ')'
    { 
        $$ = $2;
    }
    | DECIMAL
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | NUMBER
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    | STRING
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, 1);
    }
    | TEMPLATE
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, 6);
    }
    | BOOL
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, 2);
    }
    | Call
    {
        $$ = $1;
    }
    | Access { 
        $$ = $1;
    }
;

ArrayAccess
    : ArrayAccess '[' Expr ']' { $1.push($3); $$ = $1; }
    | '[' Expr ']' { $$ = [$2] }
;

Access 
    : Access '.' ID {
        $$ = new Property($1, $3, @1.first_line, @1.first_column);
    }
    | Access '.' ID ArrayAccess {
        $$ = new Property($1, $3, @1.first_line, @1.first_column);
    }
    | ID
    {
        $$ = new Access($1, @1.first_line, @1.first_column);
    }
    | ID ArrayAccess
    {
        $$ = new Access([$1,$2], @1.first_line, @1.first_column);
    }
;