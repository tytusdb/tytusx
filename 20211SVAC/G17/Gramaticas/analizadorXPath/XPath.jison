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

"or"    return "ROR"
"and"   return "RAND"
"idiv"  return "IDIV"
"div"   return "DIV"
"mod"   return "MOD"
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

"//"        return "DOBLEBARRA"
"/"         return "BARRA"
"@"         return "ARROBA"
"["         return "CORA"
"]"         return "CORB"
"+"         return "MAS"
"-"         return "MENOS"
"**"        return "DobleAsterisco"
"*"         return "POR"
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
    grafo.generarPadre(1, "INICIO");grafo.generarHijos("Expr");
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    $$=new Comando($1,retornoGrafo.pilaNodos,retornoGrafo.PilaEdges,retornoGrafo.GrahpvizNodo+retornoGrafo.GrahpvizEdges,retornoErrores,retornoGrafo.TablaGramatica);
    return $$ 
  }
  | error 
    {  
      ListaErrores.push({Error:"Error sintactico :"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column});
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      grafo = new grafoCST(); 
      return new Comando([],[],[],"",retornoErrores,[])
    }
;

Expr 
  : ExprSingle            
  { 
    $$=[];$$.push($1); 
    grafo.generarPadre(1, "ExprSingle");
    grafo.generarHijos("ExprSingle");
    grafo.generarTexto(`expr = []; expr.push(ExprSingle.valor);`);
  }
  | Expr PIPE ExprSingle  
  { 
    $$=$1;$$.push($3);
    grafo.generarPadre(3, "ExprSingle");
    grafo.generarPadre(1, "Expr");
    grafo.generarHijos("Expr",$2,"ExprSingle");
    grafo.generarTexto(`expr.push(ExprSingle.valor);`);
  }
  | Expr PIPE error       
  { 
    $$=$1;grafo.generarPadre(1, "Expr");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarHijos("Expt",$2,"error");
    grafo.generarTexto(`return expr; new Error();`); 
  }
  | error PIPE ExprSingle    
  { 
    $$=[];$$.push($3); grafo.generarPadre(3, "ExprSingle");
    grafo.generarHijos("error",$2,"ExprSingle");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarPadre(1, "error"); grafo.generarHijos("error",$2);
    grafo.generarTexto(`expr = []; new Error();`);
  }
; 

ExprSingle  
  : OrExpr  
  { 
    $$=$1; grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr");
    grafo.generarTexto(`ExprSingle.valor = OrExpr.valor`);
  }
;

OrExpr      
  : AndExpr                 
  { 
    $$ = $1; grafo.generarPadre(1,"AndExpr");
    grafo.generarHijos("AndExpr");
    grafo.generarTexto(`OrExpr.valor = AndExpr.valor`);
  }
  | OrExpr ROR AndExpr      
  { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "AndExpr");
    grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr",$2,"AndExpr");
    grafo.generarTexto(`OrExpr.valor = new Logical(OrExpr.valor,${$2},AndExpr.valor);`);
  }
;

AndExpr     
  : ComparisonExpr                
  { 
    $$ = $1; grafo.generarPadre(1, "ComparisonExpr");
    grafo.generarHijos("ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = ComparisonExpr.valor`);
  }
	| AndExpr RAND ComparisonExpr   
  { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "ComparisonExpr");
    grafo.generarPadre(1, "AndExpr");
    grafo.generarHijos("AndExpr",$2,"ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = new Logical(AndExpr.valor,${$2},ComparisonExpr.valor);`);
  }
;

ComparisonExpr    
  : AdditiveExpr                              
  { 
    $$=$1; grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = AdditiveExpr.valor`);
  }
  | AdditiveExpr GeneralComp AdditiveExpr 
  { 
    $$ = new ComparisonExp($1,$2,$3); grafo.generarPadre(3, "AdditiveExpr");
    grafo.generarPadre(2, "GeneralComp");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("StringConcatExpr","GeneralComp","StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = new ComparisonExp(AdditiveExpr.valor, GeneralComp.valor, AdditiveExpr.valor)`);
  } 
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
  : IGUAL     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); } // 5 = 5 | nodo = nodo
	| DIFERENTE { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
;



// StringConcatExpr  
//   : AdditiveExpr                         { $$=$1; grafo.generarPadre(1);grafo.generarHijos("AdditiveExpr") }
// 	| StringConcatExpr OR_EXP AdditiveExpr { }
// ;

AdditiveExpr      
  : MultiplicativeExpr                    
  { 
    $$=$1; grafo.generarPadre(1, "MultiplicativeExpr"); grafo.generarHijos("MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = MultiplicativeExpr.valor`);
  }
	| AdditiveExpr MAS MultiplicativeExpr   
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`);
  }
	| AdditiveExpr MENOS MultiplicativeExpr 
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`);
  }
;

//Aca se intercambio UnoinExpr por Unary Expresion cambiar en el futuro
MultiplicativeExpr      
  : UnaryExpr                         
  { 
    $$=$1; grafo.generarPadre(1, "UnaryExpr");
    grafo.generarHijos("UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = UnaryExpr.valor;`);
  }
	| MultiplicativeExpr POR UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3);
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr DIV UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr IDIV UnaryExpr 
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr MOD UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
;

UnaryExpr   
  : PathExpr                         
  { 
    $$=$1; grafo.generarPadre(1, "PathExpr");
    grafo.generarHijos("PathExpr");
    grafo.generarTexto(`UnaryExpr.valor = PathExpr.valor;`);
  }
	| MAS UnaryExpr                    
  { 
    $$=new Unary($1, $2); grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`);
  }
	| MENOS UnaryExpr                  
  { 
    $$=new Unary($1, $2);
    grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`);
  }
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
  : BARRA RelativePathExpr              
  { 
    $2[0].tipo=TipoPath.ABS;
    $$=new PathExp($2); 
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Absoluto; PathExpr.valor = new PathExp(path.valor);`);
  }
	| DOBLEBARRA RelativePathExpr         
  { 
    $2[0].tipo=TipoPath.REL;
    $$=new PathExp($2);
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Relativo; PathExpr.valor = new PathExp(path.valor);`);
  }
	| RelativePathExpr                    
  { 
    $$=new PathExp($1); 
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr");
    grafo.generarTexto(`PathExpr.valor = new PathExp(path.valor);`);
  }
	| BARRA                               
  { 
    $$=new PathExp([]);
    grafo.generarHijos($1);
    grafo.generarTexto(`PathExpr.valor = new PathExp();`);
  }
;

RelativePathExpr  
  : StepExpr                              
  { 
    $$ = []; $$.push($1); grafo.generarPadre(1, "StepExpr");
    grafo.generarHijos("StepExpr");
    grafo.generarTexto(`path = []; path.push(StepExpr.valor);`);
  }
	| RelativePathExpr BARRA StepExpr       
  { 
    $$ = $1; $3.tipo=TipoPath.ABS; $$.push($3); 
    grafo.generarPadre(3, "StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Absoluto; path.push(StepExpr.valor); `);
  }
	| RelativePathExpr DOBLEBARRA StepExpr  
  { 
    $$ = $1; $3.tipo=TipoPath.REL; $$.push($3);
    grafo.generarPadre(3,"StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Relativo; path.push(StepExpr.valor);`);
  }
;

StepExpr    
  : PostfixExpr { $$=$1; grafo.generarPadre(1, "PostfixExpr"); grafo.generarHijos("PostfixExpr"); grafo.generarTexto(`StepExpr.valor = PostfixExpr.valor;`); }
	| AxisStep    { $$=$1; grafo.generarPadre(1, "AxisStep"); grafo.generarHijos("AxisStep"); grafo.generarTexto(`StepExpr.valor = AxisStep.valor`);  }
;

AxisStep    
  : ReverseStep               { $$=$1; grafo.generarPadre(1, "ReverseStep");grafo.generarHijos("ReverseStep"); grafo.generarTexto(`AxisStep.valor = ReverseStep.valor;`); }
	| ForwardStep               { $$=$1; grafo.generarPadre(1, "ForwardStep");grafo.generarHijos("ForwardStep"); grafo.generarTexto(`AxisStep.valor = ForwardStep.valor;`);}
	| ReverseStep PredicateList 
  { 
    $$=$1; $$.predicado=$2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ReverseStep"); 
    grafo.generarHijos("ReverseStep","PredicateList");
    grafo.generarTexto(`ReverseStep.predicado = PredicateList.valor; AxisStep.valor = ReverseStep;`);
  }
	| ForwardStep PredicateList 
  { 
    $$=$1; $$.predicado=$2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ForwardStep"); 
    grafo.generarHijos("ForwardStep","PredicateList");
    grafo.generarTexto(`ForwardStep.predicado = PredicateList.valor; AxisStep.valor = ForwardStep;`);
  }
;

PredicateList     
  : Predicate                 
  { 
    $$=[];$$.push($1);
    grafo.generarPadre(1, "Predicate");
    grafo.generarHijos("Predicate");
    grafo.generarTexto(`predicateList = []; predicateList.push(Predicate.valor);`);  
  }
  | PredicateList Predicate   
  { 
    $$=$1;$$.push($2); grafo.generarPadre(2, "Predicate");
    grafo.generarPadre(1, "PredicateList");
    grafo.generarHijos("PredicateList","Predicate");
    grafo.generarTexto(`predicateList.push(Predicate.valor);`);
  }
;

//Faltan las formas no abreviadas
ForwardStep 
  : AbbrevForwardStep    
  { 
    $$=$1; grafo.generarPadre(1, "AbbrevForwardStep");
    grafo.generarHijos("AbbrevForwardStep");
    grafo.generarTexto(`ForwardStep.valor = AbbrevForwardStep.valor`);
  }
  | ForwardAxis NameTest 
  { 
    $$=$1; $$.nombre=$2; grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ForwardAxis");
    grafo.generarHijos("ForwardAxis","NameTest");
    grafo.generarTexto(`ForwardAxis.nombre = NameTest.valor; ForwardStep.valor = ForwardAxis.valor`);
  }
;

AbbrevForwardStep 
  : ARROBA NameTest 
  { 
    $$=new Atributo($2,[],TipoPath.ABS);
    grafo.generarPadre(2, "NameTest");
    grafo.generarHijos($1,"NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Atributo(NameTest.valor);`);
  }
  | NameTest        
  { 
    $$=new Camino($1,[],TipoPath.ABS);
    grafo.generarPadre(1, "NameTest");
    grafo.generarHijos("NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Camino(NameTest.valor);`);
  }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Child();`); }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Descendant();`); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Attribute();`); }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Self();`); }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new DescSelf();`); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new FollowSibling();`); }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Follow();`);  }
  | RNAMESPACE DOBLEDOSPUNTOS     {}
;

//KindText no implementado todavia
NodeTest    
  : NameTest    { $$=$1; grafo.generarPadre(1, "NameTest"); grafo.generarHijos("NameTest"); grafo.generarTexto(`NodeTest.valor = NameTest.valor;`); }
  //| KindTest
;

NameTest    
  : NOMBRE    { $$=$1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
	| POR       { $$=$1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
;

//Faltan las formas no abrevidas
ReverseStep 
  :  AbbrevReverseStep    
  { 
    $$=$1; grafo.generarPadre(1, "AbbrevReverseStep");
    grafo.generarHijos("AbbrevReverseStep");
    grafo.generarTexto(`ReverseStep.valor = AbbrevReverseStep.valor`);
 }
  |  ReverseAxis NameTest 
  { $$=$1; $$.nombre=$2;
    grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ReverseAxis");
    grafo.generarHijos("ReverseAxis","NameTest");
    grafo.generarTexto(`ReverseAxis.nombre = NameTest; ReverseStep.valor = ReverseAxis;`);
  }
;

AbbrevReverseStep 
  : DOBLEPUNTO  { $$=new CaminoInverso("*",[],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`caminoInverso = new CaminoInverso(); caminoInverso.tipo = Absoluto; AbbrevReverseStep.valor = caminoInverso;`); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`parent = new Parent(); parent.tipo = Absoluto; ReverseAxis.valor = parent;`); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestor = new Ancestor(); ancestor.tipo = Absoluto; ReverseAxis.valor = ancestor;`); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`precedingS = new PrecedingSibling(); precedingS.tipo = Absoluto; ReverseAxis.valor = precedingS;`); }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`preceding = new Preceding(); preceding.tipo = Absoluto; ReverseAxis.valor = preceding;`);}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestorS = new AncestorSelf(); ancestorS.tipo = Absoluto; ReverseAxis.valor = ancestorS;`); }
;

PostfixExpr   
  : PrimaryExpr               
  { 
    $$=$1; grafo.generarPadre(1, "PrimaryExpr"); 
    grafo.generarHijos("PrimaryExpr");
    grafo.generarTexto(`PostfixExpr.valor = PrimaryExpr.valor;`);
  }
	| PrimaryExpr PredicateList 
  { $$=$1; $$.predicado = $2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "PrimaryExpr");
    grafo.generarHijos("PrimaryExpr","PostfixExprL");
    grafo.generarTexto(`PrimaryExpr.predicado = predicateList.valor; PostfixExpr.valor = PrimaryExpr.valor`);
  }
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
  : CORA ExprSingle CORB            
  { 
    $$=$2; grafo.generarPadre(2, "ExprSingle");
    grafo.generarHijos($1,"ExprSingle",$3);
    grafo.generarTexto(`Predicate.valor = ExprSingle.valor;`);
  }
;

PrimaryExpr 
  : Literal                   { $$=$1; grafo.generarPadre(1, "Literal"); grafo.generarHijos("Literal"); grafo.generarTexto("PrimaryExpr.valor = literal.valor"); }
	| FunctionCall              { $$=$1; grafo.generarPadre(1, "FunctionCall"); grafo.generarHijos("FunctionCall"); grafo.generarTexto("PrimaryExpr.valor = functionCall.valor");}
	| ContextItemExpr           { $$=$1; grafo.generarPadre(1, "ContextItemExpr"); grafo.generarHijos("ContextItemExpr"); grafo.generarTexto("PrimaryExpr.valor = contextItemExpr.valor");}
	| ParenthesizedExpr         { $$=$1; grafo.generarPadre(1, "ParenthesizedExpr"); grafo.generarHijos("ParenthesizedExpr"); grafo.generarTexto("PrimaryExpr.valor = ParenthesizedExpr.valor"); }
;

Literal     
  : INTEGER                   { $$=new Literal(Tipo.INTEGER,$1); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = INTEGER;`); }
	| DECIMAL                   { $$=new Literal(Tipo.DECIMAL,$1); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = DECIMAL;`); }
	| CADENA                    { $$=new Literal(Tipo.STRING,$1);  grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = STRING;`); }
;


FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC              
  {
    $$ = new CallFunction([],TipoPath.ABS,$1);
    grafo.generarHijos($1,$2,$3);
    grafo.generarTexto(`functionCall = new CallFunction(); functionCall.tipo = Absoluto;`);
  }  //NODE() TEXT() POSITION() LAST() FIST()

	//| NOMBRE PARENTESISA ArgumentList PARENTESISC { $$=$1+$2+$3+$4 }
;

ContextItemExpr   
  : PUNTO  { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`contextItemExpr =  new ContextItemExpr(); contextItemExpr.tipo = Absoluto;`);}
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=[]; grafo.generarHijos($1,$2); grafo.generarTexto(`ParenthesizedExpr.valor = [];`);}
	| PARENTESISA ExprSingle PARENTESISC  { $$=$2; grafo.generarHijos($1,$2,$3); grafo.generarTexto(`ParenthesizedExpr.valor = ExprSingle.valor;`); }
;	