%{
  const { Tipo, TipoPath, Comando } = require("./AST/Entorno");
  const { Logical } = require("./Expresion/Logical");
  const { Arithmetic, Unary, RangeExp } = require("./Expresion/Arithmetics")
  const { Literal, PathExp, Variable, Parentesis } = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo, Camino, Child, Descendant, Attribute, Self, DescSelf, FollowSibling, Follow } = require('./Expresion/axes')
  const { CaminoInverso, Parent, Ancestor, PrecedingSibling, AncestorSelf, Preceding } = require('./Expresion/axes')
  const { ContextItemExpr, CallFunction } = require('./Expresion/postfix')
  const { Declaracion, Let, Return } = require('./Instruccion/Xquery')
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
"in"  return "RIN"
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

/* Lexico XQuery */
"return"    return "RRETURN"
"function"   return "RFUNCTION"
"let"        return "RLET"
"declare"    return "RDECLARE"
"variable"   return "RVARIABLE"
"doc"        return "RDOC"
"for"        return "RFOR"
"where"      return "RWHERE"
"stable"     return "RSTABLE"
"order"      return "RORDER"
"by"         return "RBY"
"to"         return "RTO"
"at"         return "RAT"
"{"          return "LLAVEA"
"}"          return "LLAVEC"
"%"          return "PERCENTAGE"
"external"   return "REXTERNAL"
"as"         return "RAS"
"ascending"  return "RASCENDING"
"descending" return "RDESCENDING"
"if"         return "RIF"
"then"       return "RTHEN"
"else"       return "RELSE"
"empty"      return "REMPTY" 
"greatest"   return "RGREATEST"
"least"      return "RLEAST"

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
":="        return "DOSPUNTOSIGUAL"
"="         return "IGUAL"
"|"         return "PIPE"
","         return "COMA"
"!"         return "ADMIRACION"
"@"         return "ARROBA"
".."        return "DOBLEPUNTO"
"("         return "PARENTESISA"
")"         return "PARENTESISC"
"?"         return "INTERROGACIONC"
"."         return "PUNTO"
"::"        return "DOBLEDOSPUNTOS"
":"         return "DOSPUNTOS"
"$"         return "DOLAR"

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
  | AnnotatedDecl 
  {
    return new Comando([],[],[],"",retornoErrores,[])
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
  | Expr Separador ExprSingle  
  { 
    $$=$1;$$.push($3);
    grafo.generarPadre(3, "ExprSingle");
    grafo.generarPadre(1, "Expr");
    grafo.generarHijos("Expr",$2,"ExprSingle");
    grafo.generarTexto(`expr.push(ExprSingle.valor);`);
  }
  | Expr Separador error       
  { 
    $$=$1;grafo.generarPadre(1, "Expr");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarHijos("Expt",$2,"error");
    grafo.generarTexto(`return expr; new Error();`); 
  }
  | error Separador ExprSingle    
  { 
    $$=[];$$.push($3); grafo.generarPadre(3, "ExprSingle");
    grafo.generarHijos("error",$2,"ExprSingle");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarPadre(1, "error"); grafo.generarHijos("error",$2);
    grafo.generarTexto(`expr = []; new Error();`);
  }
; 

Separador
  : PIPE  {$$=$1}
  | COMA  {$$=$1}
;

AnnotatedDecl	   
  : RDECLARE FunctionDecl
;

TypeDeclaration
	: RAS //I don't know  -> Datatype
;

VarValue 
  : ExprSingle	
;

FunctionDecl
  : RFUNCTION NOMBRE PARENTESISA ParamList PARENTESISC TypeDeclaration FunctionBody
  | RFUNCTION NOMBRE PARENTESISA PARENTESISC TypeDeclaration FunctionBody
  | RFUNCTION NOMBRE PARENTESISA ParamList PARENTESISC FunctionBody
  | RFUNCTION NOMBRE PARENTESISA PARENTESISC FunctionBody 
;

ParamList
  : ParamList COMA Param
  | Param  	
;

Param
  : DOLAR NOMBRE TypeDeclaration
  | DOLAR NOMBRE 	
;

FunctionBody
  : LLAVEA Expr LLAVEC
  | LLAVEA LLAVEC	
;

ExprSingle  
  : OrExpr  { 
    $$=$1; grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr");
    grafo.generarTexto(`ExprSingle.valor = OrExpr.valor`); }
  | FLWORExpr { 
      $$=$1;
      grafo.generarPadre(1,"FLWORExpr");
      grafo.generarHijos("FLWORExpr");
      grafo.generarTexto(`ExprSingle.valor=FLWORExpr.valor`) 
    }
  | IfExpr
;

FLWORExpr
	: InitialClause IntermediateClauseR ReturnClause    
  | InitialClause ReturnClause {
    $$=$1;$$.return=$2;
    grafo.generarPadre(2,"ReturnClause");
    grafo.generarPadre(1,"InitialClause");
    grafo.generarHijos("InitialClause","ReturnClause");
    grafo.generarTexto(`FLWORExpr.valor=InitialClause.valor;FLWORExpr.retorno=ReturnClause.valor`)
  }
;

IntermediateClauseR
  : IntermediateClause
  | IntermediateClauseR IntermediateClause
;

InitialClause
	: ForClause 
  | LetClause { 
    $$=$1;
    grafo.generarPadre(1,"LetClause");
    grafo.generarHijos("LetClause");
    grafo.generarTexto(`InitialClouse.valor=LetClause.valor`) }
;

IntermediateClause
  : InitialClause 
  | WhereClause 
  | GroupByClause 
  | OrderByClause 
  | CountClause
;

ForClause
	: RFOR ForBinding
  | ForClause COMA ForBinding
;

ForBinding
	: DOLAR NOMBRE PositionalVar RIN ExprSingle
  | DOLAR NOMBRE RIN ExprSingle
;

PositionalVar	   
  : RAT DOLAR NOMBRE
;

LetClause
  : RLET LetBinding               { 
    $$=new Let($2);
    grafo.generarPadre(2,"LetBinding");
    grafo.generarHijos($1,"LetBinding");
    grafo.generarTexto(`LetClouse.valor=[];LetClouse.valor.push(LetBinding.valor)`) }
  | LetClause COMA LetBinding     { 
    $$=$1;$$.declaraciones.push($3);
    grafo.generarPadre(3,"LetBinding");
    grafo.generarPadre(1,"LetClause");
    grafo.generarHijos("LetClause",$2,"LetBinding");
    grafo.generarTexto(`LetClause1.valor.push(LetBinding.valor);LetClouse.valor=LetClause1.valor`) }
;

LetBinding	   
  : DOLAR NOMBRE DOSPUNTOSIGUAL ExprSingle    { 
    $$=new Declaracion($1+$2,$4);
    grafo.generarPadre(4,"ExprSingle");
    grafo.generarHijos($1,$2,$3,"ExprSingle");
    grafo.generarTexto(`LetBinding.nombre=${$1};LetBinding.valor=ExptrSingle.valor`); }
;

WhereClause
	: RWHERE ExprSingle
;

OrderByClause
	: RORDER RBY OrderSpecList
  | RSTABLE RORDER RBY OrderSpecList
;

OrderSpecList
  : OrderSpecList COMA OrderSpec
	| OrderSpec
;	

OrderSpec
	: ExprSingle OrderModifier
;

OrderModifier
	: OrderOrder OrderEmpty
  | OrderEmpty	
  | OrderOrder	
;

OrderEmpty
  : REMPTY RGREATEST
  | REMPTY RLEAST
;

OrderOrder
  : RASCENDING
  | RDESCENDING
;

ReturnClause	   
  : RRETURN ExprSingle  { 
    $$=new Return($2); 
    grafo.generarPadre(2,"ExprSingle")
    grafo.generarHijos($1,"ExprSingle")
    grafo.generarTexto("ReturnClause.valor=ExprSingle.valor")}
;

IfExpr	   
  : RIF PARENTESISA Expr PARENTESISC RTHEN ExprSingle RELSE ExprSingle
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
  : RangeExpr                              
  { 
    $$=$1; 
    grafo.generarPadre(1, "RangeExpr");
    grafo.generarHijos("RangeExpr");
    grafo.generarTexto(`ComparisonExpr.valor = RangeExpr.valor`);
  }
  | RangeExpr GeneralComp RangeExpr 
  { 
    $$ = new ComparisonExp($1,$2,$3); 
    grafo.generarPadre(3, "RangeExpr");
    grafo.generarPadre(2, "GeneralComp");
    grafo.generarPadre(1, "RangeExpr");
    grafo.generarHijos("RangeExpr","GeneralComp","RangeExpr");
    grafo.generarTexto(`ComparisonExpr.valor = new ComparisonExp(RangeExpr.valor, GeneralComp.valor, RangeExpr.valor)`);
  } 
;

GeneralComp       // signo
  : IGUAL     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); } // 5 = 5 | nodo = nodo
	| DIFERENTE { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
;

RangeExpr
  : AdditiveExpr { 
    $$=$1; 
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr");
    grafo.generarTexto(`ComparisonExpr.valor = AdditiveExpr.valor`);
    }
  | AdditiveExpr RTO AdditiveExpr {
    $$=new RangeExp($1,$3);
    grafo.generarPadre(3,"AdditiveExpr")
    grafo.generarPadre(1,"AdditiveExpr")
    grafo.generarHijos("AdditiveExpr",$1,"AdditiveExpr")
    grafo.generarTexto(`RangeExp.Valor = new Range(AdditiveExpr.valor,AdditiveExpr1.valor`)} 
;

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
  | Variable                  { $$=$1; grafo.generarPadre(1, "Variable"); grafo.generarHijos("Variable"); grafo.generarTexto("PrimaryExpr.valor = Variable.valor");}
;

Variable 
  : DOLAR NOMBRE { $$=new Variable(null,$1+$2); grafo.generarHijos($1,$2); grafo.generarTexto(`Variable.valor = ${$1+$2}`) }
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

	| NOMBRE PARENTESISA CADENA PARENTESISC {  }
;

ContextItemExpr   
  : PUNTO  { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`contextItemExpr =  new ContextItemExpr(); contextItemExpr.tipo = Absoluto;`);}
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=new Parentesis([]); grafo.generarHijos($1,$2); grafo.generarTexto(`ParenthesizedExpr.valor = [];`);}
	| PARENTESISA Expr PARENTESISC  { $$=new Parentesis($2); grafo.generarHijos($1,$2,$3); grafo.generarTexto(`ParenthesizedExpr.valor = ExprSingle.valor;`); }
;	