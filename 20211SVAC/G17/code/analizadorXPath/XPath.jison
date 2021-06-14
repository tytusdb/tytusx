%{
  const {Tipo,TipoPath,Comando} = require("./AST/Entorno");
  const {Logical} = require("./Expresion/Logical");
  const {Arithmetic, Unary} = require("./Expresion/Arithmetics")
  const {Literal,PathExp} = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo,Camino,Child,Descendant,Attribute,Self,DescSelf,FollowSibling,Follow } = require('./Expresion/axes')
  const { CaminoInverso,Parent,Ancestor,PrecedingSibling,AncestorSelf,Preceding } = require('./Expresion/axes')
  const { ContextItemExpr,CallFunction } = require('./Expresion/postfix')
  const { grafoCST } = require('../CST')
  
  var grafo = new grafoCST(); 

  var ListaErrores = []
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
"parent" return "RPARENT"
"ancestor-or-self" return "RANCESTORORSELF"
"ancestor" return "RANCESTOR"
"preceding-sibling" return "RPRECEDSIBLING"
"preceding" return "RPRECED"

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


.	{ ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }

/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS

%start XPath

%%

XPath 
  : Expr  
  { 
    grafo.generarPadre(1);grafo.generarHijos("Expr");
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    $$=new Comando($1,retornoGrafo.pilaNodos,retornoGrafo.PilaEdges,retornoGrafo.GrahpvizNodo+retornoGrafo.GrahpvizEdges,retornoErrores);
    return $$ 
  }
  | error 
    {  
      ListaErrores.push({Error:"Error sintactico :"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column});
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      grafo = new grafoCST(); 
      return new Comando([],[],[],"",retornoErrores)
    }
;

Expr 
  : ExprSingle            { $$=[];$$.push($1); grafo.generarPadre(1);grafo.generarHijos("ExprSingle") }
  | Expr PIPE ExprSingle  { $$=$1;$$.push($3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("Expr",$2,"ExprSingle") }
  | Expr PIPE error       
    { 
      $$=$1;grafo.generarPadre(1);
      ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
      grafo.generarHijos("Expt",$2,"error") 
    }
  | error PIPE ExprSingle    
  { 
    $$=[];$$.push($3); grafo.generarPadre(3);grafo.generarHijos("error",$2,"ExprSingle") 
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarPadre(1); grafo.generarHijos("error",$2) 
  }
; 

ExprSingle  
  : OrExpr  { $$=$1; grafo.generarPadre(1);grafo.generarHijos("OrExpr") }
;

OrExpr      
  : AndExpr                 { $$ = $1; grafo.generarPadre(1);grafo.generarHijos("AndExpr")  }
  | OrExpr ROR AndExpr      { $$ = new Logical($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("OrExpr",$2,"AndExpr") }
;

AndExpr     
  : ComparisonExpr                { $$ = $1; grafo.generarPadre(1);grafo.generarHijos("ComparisonExpr") }
	| AndExpr RAND ComparisonExpr   { $$ = new Logical($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("AndExpr",$2,"ComparisonExpr") }
;

ComparisonExpr    
  : AdditiveExpr                              { $$=$1; grafo.generarPadre(1);grafo.generarHijos("StringConcatExpr") }
  | AdditiveExpr GeneralComp AdditiveExpr { $$ = new ComparisonExp($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("StringConcatExpr","GeneralComp","StringConcatExpr") } 
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
  : IGUAL     { $$ = $1; grafo.generarHijos($1) } // 5 = 5 | nodo = nodo
	| DIFERENTE { $$ = $1; grafo.generarHijos($1) }
	| MENOR     { $$ = $1; grafo.generarHijos($1)	}
	| MENORIG   { $$ = $1; grafo.generarHijos($1) }
	| MAYOR     { $$ = $1; grafo.generarHijos($1)	}
	| MAYORIG   { $$ = $1; grafo.generarHijos($1) }
;



// StringConcatExpr  
//   : AdditiveExpr                         { $$=$1; grafo.generarPadre(1);grafo.generarHijos("AdditiveExpr") }
// 	| StringConcatExpr OR_EXP AdditiveExpr { }
// ;

AdditiveExpr      
  : MultiplicativeExpr                    { $$=$1; grafo.generarPadre(1);grafo.generarHijos("MultiplicativeExpr") }
	| AdditiveExpr MAS MultiplicativeExpr   { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr") }
	| AdditiveExpr MENOS MultiplicativeExpr { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr")  }
;

//Aca se intercambio UnoinExpr por Unary Expresion cambiar en el futuro
MultiplicativeExpr      
  : UnaryExpr                         { $$=$1; grafo.generarPadre(1);grafo.generarHijos("UnaryExpr") }
	| MultiplicativeExpr POR UnaryExpr  { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr")  }
	| MultiplicativeExpr DIV UnaryExpr  { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr") }
	| MultiplicativeExpr IDIV UnaryExpr { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr") }
	| MultiplicativeExpr MOD UnaryExpr  { $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr") }
;

UnaryExpr   
  : PathExpr                         { $$=$1; grafo.generarPadre(1);grafo.generarHijos("PathExpr") }
	| MAS UnaryExpr                    { $$=new Unary($1, $2); grafo.generarPadre(2);grafo.generarHijos($1,"UnaryExp")}
	| MENOS UnaryExpr                  { $$=new Unary($1, $2); grafo.generarPadre(2);grafo.generarHijos($1,"UnaryExp")}
;

// ValueExpr   
//   : SimpleMapExpr                     { $$=$1 }
// ;

// SimpleMapExpr     
//   : PathExpr                            { $$=$1 }
// 	| SimpleLetClause ADMIRACION PathExpr {}
// ;

 //  /emplyee/name//id
PathExpr    
  : BARRA RelativePathExpr              { $2[0].tipo=TipoPath.ABS;$$=new PathExp($2); grafo.generarPadre(2);grafo.generarHijos($1,"RelativePathExpr") }
	| DOBLEBARRA RelativePathExpr         { $2[0].tipo=TipoPath.REL;$$=new PathExp($2); grafo.generarPadre(2);grafo.generarHijos($1,"RelativePathExpr") }
	| RelativePathExpr                    { $$=new PathExp($1); grafo.generarPadre(1);grafo.generarHijos("RelativePathExpr") }
	| BARRA                               { $$=new PathExp([]); grafo.generarHijos($1) }
;

RelativePathExpr  
  : StepExpr                              { $$ = []; $$.push($1); grafo.generarPadre(1);grafo.generarHijos("StepExpr")  }
	| RelativePathExpr BARRA StepExpr       { $$ = $1; $3.tipo=TipoPath.ABS; $$.push($3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("RelativePathExpr",$2,"StepExpr") }
	| RelativePathExpr DOBLEBARRA StepExpr  { $$ = $1; $3.tipo=TipoPath.REL; $$.push($3); grafo.generarPadre(3);grafo.generarPadre(1);grafo.generarHijos("RelativePathExpr",$2,"StepExpr") }
;

StepExpr    
  : PostfixExpr { $$=$1; grafo.generarPadre(1); grafo.generarHijos("PostfixExpr") }
	| AxisStep    { $$=$1; grafo.generarPadre(1); grafo.generarHijos("AxisStep") }
;

AxisStep    
  : ReverseStep               { $$=$1; grafo.generarPadre(1);grafo.generarHijos("ReverseStep") }
	| ForwardStep               { $$=$1; grafo.generarPadre(1);grafo.generarHijos("ForwardStep") }
	| ReverseStep PredicateList { $$=$1; $$.predicado=$2; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ReverseStep","PredicateList") }
	| ForwardStep PredicateList { $$=$1; $$.predicado=$2; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ForwardStep","PredicateList") }
;

PredicateList     
  : Predicate                 { $$=[];$$.push($1); grafo.generarPadre(1);grafo.generarHijos("Predicate") }
  | PredicateList Predicate   { $$=$1;$$.push($2); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("PredicateList","Predicate") }
;

//Faltan las formas no abreviadas
ForwardStep 
  : AbbrevForwardStep    { $$=$1; grafo.generarPadre(1); grafo.generarHijos("AbbrevForwardStep") }
  | ForwardAxis NameTest { $$=$1; $$.nombre=$2; grafo.generarPadre(2);grafo.generarPadre(1); grafo.generarHijos("ForwardAxis","NameTest") }
;

AbbrevForwardStep 
  : ARROBA NameTest { $$=new Atributo($2,[],TipoPath.ABS); grafo.generarPadre(2);grafo.generarHijos($1,"NameTest") }
  | NameTest        { $$=new Camino($1,[],TipoPath.ABS); grafo.generarPadre(1);grafo.generarHijos("NameTest") }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2) }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); grafo.generarHijos($1,$2)  }
  | RNAMESPACE DOBLEDOSPUNTOS     {}
;

//KindText no implementado todavia
NodeTest    
  : NameTest    { $$=$1; grafo.generarPadre(1); grafo.generarHijos("NameTest") }
  //| KindTest
;

NameTest    
  : NOMBRE    { $$=$1; grafo.generarHijos($1) }
	| Wildcard  { $$=$1; grafo.generarHijos($1) }
;

//
Wildcard    
  : ASTERISCO { $$=$1; grafo.generarHijos($1) }
;

//Faltan las formas no abrevidas
ReverseStep 
  :  AbbrevReverseStep    { $$=$1; grafo.generarPadre(1);grafo.generarHijos("AbbrevReverseStep") }
  |  ReverseAxis NameTest { $$=$1; $$.nombre=$2; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ReverseAxis","NameTest")  }
;

AbbrevReverseStep 
  : DOBLEPUNTO  { $$=new CaminoInverso("*",[],TipoPath.ABS); grafo.generarHijos($1) }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],Tipo.ABS); grafo.generarHijos($1,$2) }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],Tipo.ABS); grafo.generarHijos($1,$2) }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],Tipo.ABS); grafo.generarHijos($1,$2) }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],Tipo.ABS); grafo.generarHijos($1,$2)}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],Tipo,Tipo.ABS); grafo.generarHijos($1,$2) }
;

PostfixExpr   
  : PrimaryExpr               { $$=$1; grafo.generarPadre(1); grafo.generarHijos("PrimaryExpr") }
	| PrimaryExpr PredicateList { $$=$1; $$.predicado = $2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("PrimaryExpr","PostfixExprL") }
;

//Falta crear los demas metodos de argumentos para las primaryEXpr
// PostfixExprL      
//     : Predicate                 { $$=$1; grafo.generarPadre(1); grafo.generarHijos("Predicate") }
//   //| ArgumentList
//   //| Lookup
// 	  | PostfixExprL        { $$=$1+$2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("PostfixExprL","Predicate") }
//   //| PostfixExprL ArgumentList
//   //| PostfixExprL Lookup
// ;

Predicate   
  : CORA ExprSingle CORB            { $$=$2; grafo.generarPadre(2); grafo.generarHijos($1,"ExprSingle",$3) }
;

PrimaryExpr 
  : Literal                   { $$=$1; grafo.generarPadre(1); grafo.generarHijos("Literal") }
	| FunctionCall              { $$=$1; grafo.generarPadre(1); grafo.generarHijos("FunctionCall")}
	| ContextItemExpr           { $$=$1; grafo.generarPadre(1); grafo.generarHijos("ContextItemExpr")}
	| ParenthesizedExpr         { $$=$1; grafo.generarPadre(1); grafo.generarHijos("ParenthesizedExpr") }
;

Literal     
  : INTEGER                   { $$=new Literal(Tipo.INTEGER,$1); grafo.generarHijos($1) }
	| DECIMAL                   { $$=new Literal(Tipo.DECIMAL,$1); grafo.generarHijos($1) }
	| CADENA                    { $$=new Literal(Tipo.STRING,$1);  grafo.generarHijos($1) }
;


FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC              { $$ = new CallFunction([],TipoPath.ABS,$1); grafo.generarHijos($1,$2,$3)  }  //NODE() TEXT() POSITION() LAST() FIST()
	//| NOMBRE PARENTESISA ArgumentList PARENTESISC { $$=$1+$2+$3+$4 }
;

// ArgumentList      
//   : Argument                      { $$=$1 }
// 	| ArgumentList COMA Argument    { $$=$1+$2+$3 }
// ;

// Argument    
//   : ExprSingle      { $$=$1 }
// 	| INTERROGACIONC  { $$=$1 }
// ;

ContextItemExpr   
  : PUNTO  { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); }
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=[]; grafo.generarHijos($1,$2) }
	| PARENTESISA ExprSingle PARENTESISC  { $$=$2; grafo.generarHijos($1,$2,$3) }
;	