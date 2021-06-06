
%{
  const {Tipo,TipoPath,Comando} = require("./AST/Entorno");
  const {ExpOr,ExpAnd} = require("./Expresion/Logical");
  const {Literal,PathExp,AbsoluthePath,RelativePath,PathExpElement,AxisStepExp,CaminoInverso} = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo,Camino,Child,Descendant,Attribute,Self,DescSelf,FollowSibling } = require('./Expresion/axes')
%}

/* Definición Léxica */
%lex

      %options case-insensitive

%%

"or"  return "ROR"
"and" return "RAND"
"return" return "RRETURN"
"for" return "RFOR"
"in"  return "RIN"
"to"  return "RTO"
"eq"  return "EQ"
"ne"  return "NE"
"lt"  return "LT"
"le"  return "LE"
"gt"  return "GT"
"ge"  return "GE"
"child" return "RCHILD"
"descendant-or-self" return "RDESSELF"
"descendant" return "RDESCENDANT"
"attribute" return "RATTRIBUTE"
"self" return "RSELF"
"following-sibling" return "RFOLLOWSIBLING"
"following" return "RFOLLOW"
"namespace" return "RNAMESPACE"

("."[0-9]+)|([0-9]+"."[0-9]+) 				    return "DECIMAL"
[0-9]+      								              return "INTEGER"
('"'[^"]*'"')|("'"[^']*"'")         		  { yytext = yytext.substr(1,yyleng-2); return "CADENA" }
([a-zA-ZñÑ_])([a-zA-ZñÑ0-9_-]|".")* 	    return "NOMBRE"

"//" return "DOBLEBARRA"
"/"         return "BARRA"
"*"         return "ASTERISCO"
"@"         return "ARROBA"
"["         return "CORA"
"]"         return "CORB"
"+"         return "MAS"
"-"         return "MENOS"
"*"         return "POR"
"div"       return "DIV"
"idiv"      return "IDIV"
"mod"       return "MOD"
">="        return "MAYORIG"
"<="        return "MENORIG"
"!="        return "DIFERENTE"
"<"         return "MENOR"
">"         return "MAYOR"
"="         return "IGUAL"
"|"         return "PIPE"
","         return "COMA"
"$"         return "DOLAR"
"!"         return "ADMIRACION"
"@"         return "ARROBA"
".."        return "DOBLEPUNTO"
"("         return "PARENTESISA"
")"         return "PARENTESISC"
"?"         return "INTERROGACIONC"
"."         return "PUNTO"
"::"        return "DOBLEDOSPUNTOS"
":"         return "DOSPUNTOS"

/* Espacios en blanco */
[ \r\t]+{}
\n{}


.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS

%start XPath

%%

XPath 
  : Expr  { $$=new Comando($1);return $$ }
;

Expr 
  : ExprSingle            { $$=[];$$.push($1) }
  | Expr COMA ExprSingle  { $$=$1;$$.push($3) }
; 

ExprSingle  
  : OrExpr  { $$=$1 }
;

OrExpr      
  : AndExpr                 { $$ = $1 }
  | OrExpr ROR AndExpr      { $$ = new ExpOr($1,$3) }
;

AndExpr     
  : ComparisonExpr                { $$ = $1 }
	| AndExpr RAND ComparisonExpr   { $$ = new ExpAnd($1,$3) }
;

ComparisonExpr    
  : StringConcatExpr                              { $$=$1 }
  | StringConcatExpr GeneralComp StringConcatExpr { $$ = new ComparisonExp($1,$2,$3) } 
//| StringConcatExpr ValueComp StringConcatExpr   {} 
// falta el que es deeeee el que tiene el (is) y las funciones de doble mayor y menor
;

/*
ValueComp    // palabras reservadas     
    : EQ  {}  // 5 EQ 5
	| NE  {}  
	| LT  {}
	| LE  {}
	| GT  {}
	| GE  {}  
;
*/

GeneralComp       // signo
  : IGUAL     { $$ = $1 } // 5 = 5 | nodo = nodo
	| DIFERENTE { $$ = $1 }
	| MENOR     { $$ = $1	}
	| MENORIG   { $$ = $1 }
	| MAYOR     { $$ = $1	}
	| MAYORIG   { $$ = $1 }
;



StringConcatExpr  
  : RangeExpr                         { $$=$1 }
	| StringConcatExpr OR_EXP RangeExpr {}
;

RangeExpr   
  : AdditiveExpr                    { $$=$1 }
	| AdditiveExpr RTO AdditiveExpr   {}
;

AdditiveExpr      
  : MultiplicativeExpr                    { $$=$1 }
	| AdditiveExpr MAS MultiplicativeExpr   {}
	| AdditiveExpr MENOS MultiplicativeExpr {}
;

//Aca se intercambio UnoinExpr por Unary Expresion cambiar en el futuro
MultiplicativeExpr      
  : UnaryExpr                         { $$=$1 }
	| MultiplicativeExpr POR UnaryExpr  {}
	| MultiplicativeExpr DIV UnaryExpr  {}
	| MultiplicativeExpr IDIV UnaryExpr {}
	| MultiplicativeExpr MOD UnaryExpr  {}
;

UnaryExpr   
  : ValueExpr                         { $$=$1 }
	| MAS UnaryExpr                     {}
	| MENOS UnaryExpr                   {}
;

ValueExpr   
  : SimpleMapExpr                     { $$=$1 }
;

SimpleMapExpr     
  : PathExpr                            { $$=$1 }
	| SimpleLetClause ADMIRACION PathExpr {}
;

 //  /emplyee/name//id
PathExpr    
  : BARRA RelativePathExpr              { $2[0].tipo=TipoPath.ABS;$$=new PathExp($2) }
	| DOBLEBARRA RelativePathExpr         { $2[0].tipo=TipoPath.REL;$$=new PathExp($2) }
	| RelativePathExpr                    { $$=new PathExp($1) }
	| BARRA                               { $$=new PathExp([]) }
;

RelativePathExpr  
  : StepExpr                              { $$ = []; $$.push($1); }
	| RelativePathExpr BARRA StepExpr       { $$ = $1; $3.tipo=TipoPath.ABS; $$.push($3) }
	| RelativePathExpr DOBLEBARRA StepExpr  { $$ = $1; $3.tipo=TipoPath.REL; $$.push($3) }
;

StepExpr    
  : PostfixExpr { $$=$1 }
	| AxisStep    { $$=$1 }
;

AxisStep    
  : ReverseStep               { $$=$1 }
	| ForwardStep               { $$=$1 }
	| ReverseStep PredicateList { $$=$1; $$.predicado=$2 }
	| ForwardStep PredicateList { $$=$1; $$.predicado=$2 }
;

PredicateList     
  : Predicate                 { $$=[];$$.push($1) }
  | PredicateList Predicate   { $$=$1;$$.push($2) }
;

//Faltan las formas no abreviadas
ForwardStep 
  : AbbrevForwardStep    { $$=$1 }
  | ForwardAxis NameTest { $$=$1; $$.nombre=$2 }
;

AbbrevForwardStep 
  : ARROBA NameTest { $$=new Atributo($2) }
  | NameTest        { $$=new Camino($1) }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child() }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant() }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute() }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self() }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf() }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling() }
  | RFOLLOW DOBLEDOSPUNTOS        {}
  | RNAMESPACE DOBLEDOSPUNTOS     {}
;

//KindText no implementado todavia
NodeTest    
  : NameTest    { $$=$1 }
  //| KindTest
;

NameTest    
  : NOMBRE    { $$=$1 }
	| Wildcard  { $$=$1 }
;

//
Wildcard    
  : ASTERISCO { $$=$1 }
;

//Faltan las formas no abrevidas
ReverseStep 
  :  AbbrevReverseStep  { $$=$1 }
;

AbbrevReverseStep 
  : DOBLEPUNTO  { $$=new CaminoInverso($1) }
;

PostfixExpr   
    : PrimaryExpr               { $$=$1 }
	| PrimaryExpr PostfixExprL  { $$=$1 }
;

//Falta crear los demas metodos de argumentos para las primaryEXpr
PostfixExprL      
    : Predicate                 { $$=$1 }
  //| ArgumentList
  //| Lookup
	| PostfixExprL Predicate       { $$=$1+$2 }
  //| PostfixExprL ArgumentList
  //| PostfixExprL Lookup
;

Predicate   
  : CORA ExprSingle CORB            { $$=$2 }
;

PrimaryExpr 
  : Literal                   { $$=$1 }
	| FunctionCall              { $$=$1 }
	| ContextItemExpr           { $$=$1 }
	| ParenthesizedExpr         { $$=$1 }
;

Literal     
    : INTEGER                   { $$=new Literal(Tipo.INTEGER,$1) }
	| DECIMAL                   { $$=new Literal(Tipo.DECIMAL,$1) }
	| CADENA                    { $$=new Literal(Tipo.STRING,$1) }
;


FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC              { $$=$1+$2+$3 }
	| NOMBRE PARENTESISA ArgumentList PARENTESISC { $$=$1+$2+$3+$4 }
;

ArgumentList      
  : Argument                      { $$=$1 }
	| ArgumentList COMA Argument    { $$=$1+$2+$3 }
;

Argument    
  : ExprSingle      { $$=$1 }
	| INTERROGACIONC  { $$=$1 }
;

ContextItemExpr   
  : PUNTO  { $$=$1 }
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC       { $$=$1+$2 }
	| PARENTESISA Expr PARENTESISC  { $$=$1+$3 }
;	