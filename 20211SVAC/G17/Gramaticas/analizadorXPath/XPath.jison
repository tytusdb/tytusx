%{
  const { concat } = require("lodash")
  const { Tipo, TipoPath, Comando } = require("./AST/Entorno");
  const { Logical } = require("./Expresion/Logical");
  const { Arithmetic, Unary, RangeExp, Concat } = require("./Expresion/Arithmetics")
  const { Literal, PathExp, Variable, Parentesis } = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo, Camino, Child, Descendant, Attribute, Self, DescSelf, FollowSibling, Follow } = require('./Expresion/axes')
  const { CaminoInverso, Parent, Ancestor, PrecedingSibling, AncestorSelf, Preceding } = require('./Expresion/axes')
  const { ContextItemExpr, CallFunction, CallFunctionPrefix } = require('./Expresion/postfix')
  const { Flower,IfThenElse,CrearFuncion } = require('./Instruccion/Xquery')
  const { grafoCST } = require('../CST')

  var grafo = new grafoCST(); 

  var ListaErrores = []

  parser.trace = function(err)
  {
    ListaErrores.push({Error:err,Linea:0,columna:0});
  }

  function setLineaColumna(linea,columna)
  {
    ListaErrores[ListaErrores.length-1].Linea=linea
    ListaErrores[ListaErrores.length-1].Linea=columna
  }
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
"XS" return "RXS"


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
"||"        return "CONCAT"
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
";"         return "PUNTOCOMA"
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
  : Modulo { 
    grafo.generarPadre(1,"Modulo")
    grafo.generarHijos("Modulo")
    grafo.generarTexto("Xpath.valor = Modulo.valor") 
    grafo.generarPadre(1,"Xpath") 
    grafo.generarHijos("Xpath") 
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    $$=new Comando($1.prologo,$1.expr,retornoGrafo.pilaNodos,retornoGrafo.PilaEdges,retornoGrafo.GrahpvizNodo+retornoGrafo.GrahpvizEdges,retornoErrores,retornoGrafo.TablaGramatica);
    return $$ }
  | error {  
    setLineaColumna(this._$.first_line,this._$.first_column)
    //ListaErrores.push({Error:"Error sintactico :"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column});
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    grafo = new grafoCST(); 
    $$=new Comando([],[],[],[],"",retornoErrores,[]) 
    return $$ }
;

Modulo 
  : Expr { 
    $$ = {prologo:[],expr:$1}
    grafo.generarPadre(1, "Expr");
    grafo.generarHijos("Expr");
    grafo.generarTexto("Modulo.valor = Expr.valor") }
  | Prolog Expr {
    $$ = {prologo:$1,expr:$2}
    grafo.generarPadre(2, "Expr");
    grafo.generarPadre(1, "Prolog")
    grafo.generarHijos("Prolog","Expr");
    grafo.generarTexto("Modulo.valor = Expr.valor,Modulo.funciones = Prolog.valor") }
;

Prolog
  : AnnotatedDecl { 
    $$=[$1] 
    grafo.generarPadre(1,"AnnotatedDecl")
    grafo.generarHijos("AnnotatedDecl")
    grafo.generarTexto(`Prolog.valor = AnnotatedDecl.valor`) }
  | Prolog AnnotatedDecl { 
    $$=$1;
    $$.push($2) 
    grafo.generarPadre(2,"AnnotatedDecl")
    grafo.generarPadre(1,"Prolog")
    grafo.generarHijos("Prolog","AnnotatedDecl")
    grafo.generarTexto(`Prolog.valor = Prolog1.valor; Prolog.valor.push(AnnotatedDecl.valor)`) }
  | Prolog error { 
    $$=$1 
    grafo.generarPadre(1,"Prolog");
    grafo.generarHijos("Prolog","error")
    setLineaColumna(this._$.first_line,this._$.first_column)
    grafo.generarTexto(`Prolog.valor = Prolog1.valor;new Error();`) }
  | error AnnotatedDecl { 
    $$=[$2] 
    grafo.generarPadre(2,"AnnotatedDecl")
    grafo.generarHijos("error","AnnotatedDecl")
    setLineaColumna(this._$.first_line,this._$.first_column)
    grafo.generarTexto(`Prolog.valor = [AnnotatedDecl.valor];new Error();`) }
;

Expr 
  : ExprSingle { 
    $$=[];$$.push($1); 
    grafo.generarPadre(1, "ExprSingle");
    grafo.generarHijos("ExprSingle");
    grafo.generarTexto(`expr = []; expr.push(ExprSingle.valor);`); }
  | Expr Separador ExprSingle { 
    $$=$1;$$.push($3);
    grafo.generarPadre(3, "ExprSingle");
    grafo.generarPadre(1, "Expr");
    grafo.generarHijos("Expr",$2,"ExprSingle");
    grafo.generarTexto(`expr.push(ExprSingle.valor);`); }
  | Expr Separador error { 
    $$=$1;
    grafo.generarPadre(1, "Expr");
    //ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarHijos("Expt",$2,"error");
    setLineaColumna(this._$.first_line,this._$.first_column)
    grafo.generarTexto(`return expr; new Error();`); }
  | error Separador ExprSingle { 
    $$=[];$$.push($3); 
    grafo.generarPadre(3, "ExprSingle");
    grafo.generarHijos("error",$2,"ExprSingle");
    setLineaColumna(this._$.first_line,this._$.first_column)
    //ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarPadre(1, "error"); grafo.generarHijos("error",$2);
    grafo.generarTexto(`expr = []; new Error();`); }
; 

Separador
  : PIPE  {
    $$=$1}
  | COMA  {
    $$=$1}
;

AnnotatedDecl	   
  : RDECLARE FunctionDecl PUNTOCOMA{ 
    $$=$2 
    grafo.generarPadre(2,"FunctionDecl")
    grafo.generarHijos($1,"FunctionDecl",$3)
    grafo.generarTexto(`AnnotatedDecl.valor = FunctionDecl.valor`) }
;

TypeDeclaration
  : RAS RXS DOSPUNTOS NOMBRE    { 
    switch($4)
    {
      case 'decimal':
        $$=Tipo.DECIMAL;
        break;
      case 'integer':
        $$=Tipo.INTEGER;
        break;
      case 'string':
        $$=Tipo.STRING;
        break;
      case 'attribute':
        $$=Tipo.ATRIB;
        break;
      case 'element':
        $$=Tipo.NODO;
        break;
      default:
        $$=Tipo.ERROR;
        break
    }
    grafo.generarHijos($1,$2,$3,$4)
    grafo.generarTexto(`TypeDeclaration.tipo = Decimal`) }
;

FunctionDecl
  : RFUNCTION NOMBRE DOSPUNTOS NOMBRE PARENTESISA ParamList PARENTESISC TypeDeclaration FunctionBody { 
    $$=CrearFuncion($4,$6,$8,$9)
    grafo.generarPadre(9,"FunctionBody")
    grafo.generarPadre(8,"TypeDeclaration") 
    grafo.generarPadre(6,"ParamList")
    grafo.generarHijos($1,$2,$3,$4,$5,"ParamList",$7,"TypeDeclaration","FunctionBody") 
    grafo.generarTexto(`FunctionDecl.valor = new Function(${$4},ParamList.valor,TypeDeclaration.tipo,FunctionBody.valor)`) }
  | RFUNCTION NOMBRE DOSPUNTOS NOMBRE PARENTESISA PARENTESISC TypeDeclaration FunctionBody { 
    $$=CrearFuncion($4,[],$7,$8)
    grafo.generarPadre(8,"FunctionBody")
    grafo.generarPadre(7,"TypeDeclaration")
    grafo.generarHijos($1,$2,$3,$4,$5,$6,"TypeDeclaration","FunctionBody")
    grafo.generarTexto(`FunctionDecl.valor = new Function(${$4},[],TypeDeclaration.tipo,FunctionBody.valor)`) }
  | RFUNCTION NOMBRE DOSPUNTOS NOMBRE PARENTESISA ParamList PARENTESISC FunctionBody { 
    $$=CrearFuncion($4,$6,null,$8)
    grafo.generarPadre(8,"FunctionBody")
    grafo.generarPadre(6,"ParamList")
    grafo.generarHijos($1,$2,$3,$4,$5,"ParamList",$7,"FunctionBody")
    grafo.generarTexto(`FunctionDecl.valor = new Function(${$4},ParamList.valor,null,FunctionBody.valor)`) }
  | RFUNCTION NOMBRE DOSPUNTOS NOMBRE PARENTESISA PARENTESISC FunctionBody { 
    $$=CrearFuncion($4,[],null,$7)
    grafo.generarPadre(7,"FunctionBody")
    grafo.generarHijos($1,$2,$3,$4,$5,$6,"FunctionBody")
    grafo.generarTexto(`FunctionDecl.valor = new Function(${$4},[],null,FunctionBody.valor)`) } 
;


ParamList
  : ParamList COMA Param  { 
    $$=$1;
    $$.push($3)
    grafo.generarPadre(3,"Param")
    grafo.generarPadre(1,"ParamList")
    grafo.generarHijos("ParamList",$1,"Param")
    grafo.generarTexto(`ParamList.valor = ParamList1.valor; ParamList.valor.push(Param.valor)`) }
  | Param  	              { 
    $$=[$1]
    grafo.generarPadre(1,"Param")
    grafo.generarHijos("Param")
    grafo.generarTexto(`ParamList.valor = [Param.valor];`)  }
;

Param
  : DOLAR NOMBRE TypeDeclaration  { 
    $$={nombre:$1+$2, type:$3}
    grafo.generarPadre(3,"TypeDeclaration")
    grafo.generarHijos($1,$2,"TypeDeclaration")
    grafo.generarTexto(`Param.Valor = new Declaracion(${$1},TypeDeclaration.tipo`) }
  | DOLAR NOMBRE { 
    $$={nombre:$1+$2, type:null} 
    grafo.generarHijos($1,$2)
    grafo.generarTexto(`Param.Valor = new Declaracion(${$1},null`) }
;

FunctionBody
  : LLAVEA Expr LLAVEC  { 
    $$=$2 
    grafo.generarPadre(2,"Expr")
    grafo.generarHijos($1,"Expr",$3) 
    grafo.generarTexto(`FunctionBody.valor = Expr.valor`) }
  | LLAVEA LLAVEC	{ 
    $$=[]
    grafo.generarHijos($1,$2) 
    grafo.generarTexto(`FunctionBody.valor = []`) }
;

ExprSingle  
  : OrExpr  { 
    $$=$1; 
    grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr");
    grafo.generarTexto(`ExprSingle.valor = OrExpr.valor`); }
  | FLWORExpr { 
      $$=$1;
      grafo.generarPadre(1,"FLWORExpr");
      grafo.generarHijos("FLWORExpr");
      grafo.generarTexto(`ExprSingle.valor=FLWORExpr.valor`) 
    }
  | IfExpr  {
    $$=$1;
    grafo.generarPadre(1,"IfExpr")
    grafo.generarHijos("IfExpr")
    grafo.generarTexto(`ExprSingle.valor=IfExpr.valor`)}
;

FLWORExpr
	: InitialClause IntermediateClauseR ReturnClause  {
    // $$=$1.exp;
    // $$.expReturn=$3;
    // $$.intermediate=$2;
    $$ = new Flower(concat($1,$2),$3)
    grafo.generarPadre(3,"ReturnClause")
    grafo.generarPadre(2,"IntermediateClauseR")
    grafo.generarPadre(1,"InitialClause")
    grafo.generarHijos("InitialClause","IntermediateClauseR","ReturnClause");
    grafo.generarTexto(`FLWORExpr.valor=InitialClause.valor;FLWORExpr.retorno=ReturnClause.valor;FLWORExpr.intermediate=IntermediateClauseR.valor`) }  
  | InitialClause ReturnClause {
    // $$=$1.exp;
    // $$.expReturn=$2;
    $$ = new Flower([$1],$2)
    grafo.generarPadre(2,"ReturnClause");
    grafo.generarPadre(1,"InitialClause");
    grafo.generarHijos("InitialClause","ReturnClause");
    grafo.generarTexto(`FLWORExpr.valor=InitialClause.valor;FLWORExpr.retorno=ReturnClause.valor`) }
;

IntermediateClauseR
  : IntermediateClause                        { 
    $$=[$1]
    grafo.generarPadre(1,"IntermediateClause");
    grafo.generarHijos("IntermediateClause");
    grafo.generarTexto("IntermediateClauseR.valor = [IntermediateClause.valor]") }
  | IntermediateClauseR IntermediateClause    { 
    $$=$1; 
    $$.push($2);
    grafo.generarPadre(2,"IntermediateClause")
    grafo.generarPadre(1,"IntermediateClauseR")
    grafo.generarHijos("IntermediateClauseR.valor=IntermediateClauseR1.valor;IntermediateClauseR.valor.push(IntermediateClause.valor)")
    grafo.generarTexto("IntermediateClauseR.valor = IntermediateClauseR1.valor; IntermediateClauseR.valor.push(IntermediateClause.valor)") }
;

InitialClause
	: ForClause {  
    $$=$1
    grafo.generarPadre(1,"ForClause")
    grafo.generarHijos("ForClause")
    grafo.generarTexto(`InitialClouse.valor=ForClause.valor`) }
  | LetClause { 
    $$=$1;
    grafo.generarPadre(1,"LetClause");
    grafo.generarHijos("LetClause");
    grafo.generarTexto(`InitialClouse.valor=LetClause.valor`) }
;

IntermediateClause
  : InitialClause   {
    $$=$1;
    grafo.generarPadre(1,"InitialClause");
    grafo.generarHijos("InitialClause")
    grafo.generarTexto("IntermediateClause.valor=InitialClause.valor") }
  | WhereClause     {
    $$=$1;
    grafo.generarPadre(1,"WhereClause");
    grafo.generarHijos("WhereClause")
    grafo.generarTexto("IntermediateClause.valor=WhereClause.valor") }
  | GroupByClause   {
    $$=$1;
    grafo.generarPadre(1,"GroupByClause");
    grafo.generarHijos("GroupByClause")
    grafo.generarTexto("IntermediateClause.valor=GroupByClause.valor") }
  | OrderByClause {
    $$=$1;
    grafo.generarPadre(1,"OrderByClause");
    grafo.generarHijos("OrderByClause")
    grafo.generarTexto("IntermediateClause.valor=OrderByClause.valor") }
;

ForClause
	: RFOR ForBinding           {
    $$={name:'For',exp:[$2] }
    grafo.generarPadre(2,"ForBinding")
    grafo.generarHijos($1,"ForBinding")
    grafo.generarTexto(`ForClause.valor = new For();ForClouse.valor.declaraciones.push(ForBinding.valor)`) }
  | ForClause COMA ForBinding {
    $$ = $1
    $$.exp.push($3)
    grafo.generarPadre(3,"ForBinding")
    grafo.generarPadre(1,"ForClouse")
    grafo.generarHijos("ForClause",$2,"ForBinding")
    grafo.generarTexto("ForClause.valor.declaraciones.push(ForBiding.valor)") }
;

ForBinding
	: DOLAR NOMBRE PositionalVar RIN ExprSingle {
    $$={name:$1+$2,posicion:$3,exp:$5};
    grafo.generarPadre(5,"ExprSingle")
    grafo.generarPadre(3,"PositionalVar")
    grafo.generarHijos($1,$2,"PositionalVar",$4,"ExprSingle")
    grafo.generarTexto(`ForBinding.valor = new Declaracion(${$1+$2,$3,$5})`)}
  | DOLAR NOMBRE RIN ExprSingle {
    $$={name:$1+$2,posicion:'',exp:$4};
    grafo.generarPadre(4,"ExprSingle")
    grafo.generarHijos($1,$2,$3,"ExprSingle")
    grafo.generarTexto(`ForBinding.valor = new Declaracion(${$1+$2,'',$4})`)}
;

PositionalVar	   
  : RAT DOLAR NOMBRE {
    $$ = ($2+$3);
    grafo.generarHijos($1,$2,$3);
    grafo.generarTexto(`PositionalVar.varlor=$+NOMBRE.val`)}
;

LetClause 
  : RLET LetBinding               { 
    $$={ name:'Let', exp:[$2] };
    grafo.generarPadre(2,"LetBinding");
    grafo.generarHijos($1,"LetBinding");
    grafo.generarTexto(`LetClouse.valor=[];LetClouse.valor.push(LetBinding.valor)`) }
  | LetClause COMA LetBinding     { 
    $$=$1;
    $$.exp.push($3);
    grafo.generarPadre(3,"LetBinding");
    grafo.generarPadre(1,"LetClause");
    grafo.generarHijos("LetClause",$2,"LetBinding");
    grafo.generarTexto(`LetClause1.valor.push(LetBinding.valor);LetClouse.valor=LetClause1.valor`) }
;

LetBinding	   
  : DOLAR NOMBRE DOSPUNTOSIGUAL ExprSingle    { 
    $$={name:$1+$2,exp:$4};
    grafo.generarPadre(4,"ExprSingle");
    grafo.generarHijos($1,$2,$3,"ExprSingle");
    grafo.generarTexto(`LetBinding.nombre=${$1};LetBinding.valor=ExptrSingle.valor`); }
;

WhereClause
	: RWHERE ExprSingle { 
    $$={name:'Where',exp:$2} 
    grafo.generarPadre(2,"ExprSingle")
    grafo.generarHijos($1,"ExprSingle")
    grafo.generarTexto(`WhereClause.valor = ExprSingle.valor`)}
;

OrderByClause
	: RORDER RBY OrderSpecList           { 
    $$={name:'Order',exp:$3} 
    grafo.generarPadre(3,"OrderSpecList")
    grafo.generarHijos($1,$2,"OrderSpecList") 
    grafo.generarTexto(`OrderByClause.valor = OrderSpecList.valor`)} 
;

OrderSpecList
  : OrderSpecList COMA OrderSpec  {
    $$=$1;$$.push($3)
    grafo.generarPadre(3,"OrderSpec")
    grafo.generarPadre(1,"OrderSpecList")
    grafo.generarHijos("OrderSpecList",$1,"OrderSpec")
    grafo.generarTexto("OrderSpecList.valor=OrderSpecList1.valor;OrderSpecList.valor.push(OrderSpec.valor)")}
	| OrderSpec                     {
    $$=[$1]
    grafo.generarPadre(1,"OrderSpec")
    grafo.generarHijos("OrderSpec")
    grafo.generarTexto("OrderSpecList.valor=[OrderSpec.valor];")}
;	

OrderSpec
	: ExprSingle OrderModifier      { 
    $$={exp:$1,mode:$2} 
    grafo.generarPadre(2,"OrderModifier")
    grafo.generarPadre(1,"ExprSingle")
    grafo.generarHijos("ExprSingle","OrderModifier")
    grafo.generarTexto("OrderSpec.valor=OrderModifier.valor;")}
  | ExprSingle                    { 
    $$={exp:$1,mode:{order:'asc',empty:'g'}} 
    grafo.generarPadre(1,"ExprSingle")
    grafo.generarHijos("ExprSingle")
    grafo.generarTexto("OrderSpec.valor = ExprSingle.valor;")}
;

OrderModifier
	: OrderOrder OrderEmpty         { 
    $$={order:$1.order,empty:$2.empty} 
    grafo.generarPadre(2,"OrderEmpty")
    grafo.generarPadre(1,"OrderOrder")
    grafo.generarHijos("OrderOrder","OrderEmpty")
    grafo.generarTexto("OrderModifier.order=OrderOrder.valor;OrderModifier.empty=OrderEmpty.valor;") }
  | OrderEmpty	                  { 
    $$=$1
    grafo.generarPadre(1,"OrderEmpty")
    grafo.generarHijos("OrderEmpty")
    grafo.generarTexto("OrderModifier.order='asc';OrderModifier.empty=OrderEmpty.valor;") }
  | OrderOrder	                  { 
    $$=$1
    grafo.generarPadre(1,"OrderOrder")
    grafo.generarHijos("OrderOrder")
    grafo.generarTexto("OrderModifier.order=OrderOrder.valor;OrderModifier.empty='g';") }
;

OrderEmpty
  : REMPTY RGREATEST              { 
    $$={order:'asc',empty:'g'}
    grafo.generarHijos($1,$2) 
    grafo.generarTexto(`OrderEmpty.empty=${$2}`)}
  | REMPTY RLEAST                 { 
    $$={order:'asc',empty:'l'} 
    grafo.generarHijos($1,$2) 
    grafo.generarTexto(`OrderEmpty.empty=${$2}`)}
;

OrderOrder
  : RASCENDING                    { 
    $$={order:'asc',empty:'g'}
    grafo.generarHijos($1)
    grafo.generarTexto(`OrderOrder.order = ${$1}`) }
  | RDESCENDING                   { 
    $$={order:'desc',empty:'g'} 
    grafo.generarHijos($1)
    grafo.generarTexto(`OrderOrder.order = ${$1}`) }
;

ReturnClause	   
  : RRETURN ExprSingle  { 
    $$=$2; 
    grafo.generarPadre(2,"ExprSingle")
    grafo.generarHijos($1,"ExprSingle")
    grafo.generarTexto("ReturnClause.valor=ExprSingle.valor")}
;

IfExpr	   
  : RIF PARENTESISA Expr PARENTESISC RTHEN ExprSingle RELSE ExprSingle  {
    $$=new IfThenElse($3,$6,$8) 
    grafo.generarPadre(8,"ExprSingle")
    grafo.generarPadre(6,"ExprSingle")
    grafo.generarPadre(3,"Expr")
    grafo.generarHijos($1,$2,"Expr",$4,$5,"ExprSingle",$7,"ExprSingle")
    grafo.generarTexto(`IfExpr.valor = new IF(Expr.valor,ExprSingle1.valor,ExprSingle2.valor)`)}
;

OrExpr      
  : AndExpr { 
    $$ = $1; grafo.generarPadre(1,"AndExpr");
    grafo.generarHijos("AndExpr");
    grafo.generarTexto(`OrExpr.valor = AndExpr.valor`); }
  | OrExpr ROR AndExpr { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "AndExpr");
    grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr",$2,"AndExpr");
    grafo.generarTexto(`OrExpr.valor = new Logical(OrExpr.valor,${$2},AndExpr.valor);`); }
;

AndExpr     
  : ComparisonExpr { 
    $$ = $1; grafo.generarPadre(1, "ComparisonExpr");
    grafo.generarHijos("ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = ComparisonExpr.valor`); }
	| AndExpr RAND ComparisonExpr { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "ComparisonExpr");
    grafo.generarPadre(1, "AndExpr");
    grafo.generarHijos("AndExpr",$2,"ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = new Logical(AndExpr.valor,${$2},ComparisonExpr.valor);`); }
;

ComparisonExpr    
  : StringConcatExpr { 
    $$=$1; 
    grafo.generarPadre(1, "StringConcatExpr");
    grafo.generarHijos("StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = StringConcatExpr.valor`); }
  | StringConcatExpr GeneralComp StringConcatExpr { 
    $$ = new ComparisonExp($1,$2,$3); 
    grafo.generarPadre(3, "StringConcatExpr");
    grafo.generarPadre(2, "GeneralComp");
    grafo.generarPadre(1, "StringConcatExpr");
    grafo.generarHijos("StringConcatExpr","GeneralComp","StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = new ComparisonExp(StringConcatExpr.valor, GeneralComp.valor, StringConcatExpr.valor)`); } 
;

GeneralComp       // signo
  : IGUAL     { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); } // 5 = 5 | nodo = nodo
	| DIFERENTE { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENOR     { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENORIG   { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYOR     { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYORIG   { 
    $$ = $1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
;

StringConcatExpr
  :RangeExpr {
    $$=$1;
    grafo.generarPadre(1, "RangeExpr");
    grafo.generarHijos("RangeExpr");
    grafo.generarTexto(`StringConcatExpr.valor = RangeExpr.valor`); }
  |StringConcatExpr CONCAT RangeExpr {
    $$=new Concat($1,$3);
    grafo.generarPadre(3,"RangeExpr")
    grafo.generarPadre(1,"StringConcatExpr")
    grafo.generarHijos("StringConcatExpr",$1,"RangeExpr")
    grafo.generarTexto(`StringConcatExpr.Valor = new CONCAT(StringConcatExpr1.valor,RangeExpr.valor`) }
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
  : MultiplicativeExpr { 
    $$=$1; grafo.generarPadre(1, "MultiplicativeExpr"); grafo.generarHijos("MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = MultiplicativeExpr.valor`); }
	| AdditiveExpr MAS MultiplicativeExpr { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`); }
	| AdditiveExpr MENOS MultiplicativeExpr { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`); }
;

//Aca se intercambio UnoinExpr por Unary Expresion cambiar en el futuro
MultiplicativeExpr      
  : UnaryExpr { 
    $$=$1; 
    grafo.generarPadre(1, "UnaryExpr");
    grafo.generarHijos("UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = UnaryExpr.valor;`); }
	| MultiplicativeExpr POR UnaryExpr { 
    $$= new Arithmetic($1,$2,$3);
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`); }
	| MultiplicativeExpr DIV UnaryExpr { 
    $$= new Arithmetic($1,$2,$3); 
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`); }
	| MultiplicativeExpr IDIV UnaryExpr { 
    $$= new Arithmetic($1,$2,$3); 
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`); }
	| MultiplicativeExpr MOD UnaryExpr { 
    $$= new Arithmetic($1,$2,$3); 
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`); }
;

UnaryExpr   
  : PathExpr { 
    $$=$1; grafo.generarPadre(1, "PathExpr");
    grafo.generarHijos("PathExpr");
    grafo.generarTexto(`UnaryExpr.valor = PathExpr.valor;`); }
	| MAS UnaryExpr { 
    $$=new Unary($1, $2); grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`); }
	| MENOS UnaryExpr { 
    $$=new Unary($1, $2);
    grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`); }
;

 //  /emplyee/name//id
PathExpr    
  : BARRA RelativePathExpr { 
    $2[0].tipo=TipoPath.ABS;
    $$=new PathExp($2); 
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Absoluto; PathExpr.valor = new PathExp(path.valor);`); }
	| DOBLEBARRA RelativePathExpr { 
    $2[0].tipo=TipoPath.REL;
    $$=new PathExp($2);
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Relativo; PathExpr.valor = new PathExp(path.valor);`); }
	| RelativePathExpr { 
    $$=new PathExp($1); 
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr");
    grafo.generarTexto(`PathExpr.valor = new PathExp(path.valor);`); }
	| BARRA { 
    $$=new PathExp([]);
    grafo.generarHijos($1);
    grafo.generarTexto(`PathExpr.valor = new PathExp();`); }
;

RelativePathExpr  
  : StepExpr { 
    $$ = []; $$.push($1); grafo.generarPadre(1, "StepExpr");
    grafo.generarHijos("StepExpr");
    grafo.generarTexto(`path = []; path.push(StepExpr.valor);`); }
	| RelativePathExpr BARRA StepExpr { 
    $$ = $1; $3.tipo=TipoPath.ABS; $$.push($3); 
    grafo.generarPadre(3, "StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Absoluto; path.push(StepExpr.valor); `); }
	| RelativePathExpr DOBLEBARRA StepExpr { 
    $$ = $1; $3.tipo=TipoPath.REL; $$.push($3);
    grafo.generarPadre(3,"StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Relativo; path.push(StepExpr.valor);`); }
;

StepExpr    
  : PostfixExpr { 
    $$=$1; 
    grafo.generarPadre(1, "PostfixExpr"); 
    grafo.generarHijos("PostfixExpr"); 
    grafo.generarTexto(`StepExpr.valor = PostfixExpr.valor;`); }
	| AxisStep    { 
    $$=$1; 
    grafo.generarPadre(1, "AxisStep"); 
    grafo.generarHijos("AxisStep"); 
    grafo.generarTexto(`StepExpr.valor = AxisStep.valor`);  }
;

AxisStep    
  : ReverseStep               { 
    $$=$1; 
    grafo.generarPadre(1, "ReverseStep");
    grafo.generarHijos("ReverseStep"); 
    grafo.generarTexto(`AxisStep.valor = ReverseStep.valor;`); }
	| ForwardStep               { 
    $$=$1; 
    grafo.generarPadre(1, "ForwardStep");
    grafo.generarHijos("ForwardStep"); 
    grafo.generarTexto(`AxisStep.valor = ForwardStep.valor;`);}
	| ReverseStep PredicateList { 
    $$=$1; 
    $$.predicado=$2; 
    grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ReverseStep"); 
    grafo.generarHijos("ReverseStep","PredicateList");
    grafo.generarTexto(`ReverseStep.predicado = PredicateList.valor; AxisStep.valor = ReverseStep;`); }
	| ForwardStep PredicateList { 
    $$=$1; 
    $$.predicado=$2; 
    grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ForwardStep"); 
    grafo.generarHijos("ForwardStep","PredicateList");
    grafo.generarTexto(`ForwardStep.predicado = PredicateList.valor; AxisStep.valor = ForwardStep;`); }
;

PredicateList     
  : Predicate { 
    $$=[];$$.push($1);
    grafo.generarPadre(1, "Predicate");
    grafo.generarHijos("Predicate");
    grafo.generarTexto(`predicateList = []; predicateList.push(Predicate.valor);`); }
  | PredicateList Predicate { 
    $$=$1;$$.push($2); grafo.generarPadre(2, "Predicate");
    grafo.generarPadre(1, "PredicateList");
    grafo.generarHijos("PredicateList","Predicate");
    grafo.generarTexto(`predicateList.push(Predicate.valor);`); }
;

//Faltan las formas no abreviadas
ForwardStep 
  : AbbrevForwardStep { 
    $$=$1; grafo.generarPadre(1, "AbbrevForwardStep");
    grafo.generarHijos("AbbrevForwardStep");
    grafo.generarTexto(`ForwardStep.valor = AbbrevForwardStep.valor`); }
  | ForwardAxis NameTest { 
    $$=$1; $$.nombre=$2; grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ForwardAxis");
    grafo.generarHijos("ForwardAxis","NameTest");
    grafo.generarTexto(`ForwardAxis.nombre = NameTest.valor; ForwardStep.valor = ForwardAxis.valor`); }
;

AbbrevForwardStep 
  : ARROBA NameTest { 
    $$=new Atributo($2,[],TipoPath.ABS);
    grafo.generarPadre(2, "NameTest");
    grafo.generarHijos($1,"NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Atributo(NameTest.valor);`); }
  | NameTest { 
    $$=new Camino($1,[],TipoPath.ABS);
    grafo.generarPadre(1, "NameTest");
    grafo.generarHijos("NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Camino(NameTest.valor);`); }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { 
    $$=new Child(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new Child();`); }
  | RDESCENDANT DOBLEDOSPUNTOS    { 
    $$=new Descendant(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new Descendant();`); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { 
    $$=new Attribute(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new Attribute();`); }
  | RSELF DOBLEDOSPUNTOS          { 
    $$=new Self(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new Self();`); }
  | RDESSELF DOBLEDOSPUNTOS       { 
    $$=new DescSelf(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new DescSelf();`); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { 
    $$=new FollowSibling(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new FollowSibling();`); }
  | RFOLLOW DOBLEDOSPUNTOS        { 
    $$=new Follow(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ForwardAxis.valor = new Follow();`);  }
  | RNAMESPACE DOBLEDOSPUNTOS     {}
;

//KindText no implementado todavia
NodeTest    
  : NameTest    { 
    $$=$1; grafo.generarPadre(1, "NameTest"); 
    grafo.generarHijos("NameTest"); 
    grafo.generarTexto(`NodeTest.valor = NameTest.valor;`); }
;

NameTest    
  : NOMBRE    { 
    $$=$1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`NameTest.valor = ${$1};`); }
	| POR       { 
    $$=$1; 
    grafo.generarHijos($1); 
    grafo.generarTexto(`NameTest.valor = ${$1};`); }
;

//Faltan las formas no abrevidas
ReverseStep 
  :  AbbrevReverseStep { 
    $$=$1; grafo.generarPadre(1, "AbbrevReverseStep");
    grafo.generarHijos("AbbrevReverseStep");
    grafo.generarTexto(`ReverseStep.valor = AbbrevReverseStep.valor`); }
  |  ReverseAxis NameTest { 
    $$=$1; 
    $$.nombre=$2;
    grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ReverseAxis");
    grafo.generarHijos("ReverseAxis","NameTest");
    grafo.generarTexto(`ReverseAxis.nombre = NameTest; ReverseStep.valor = ReverseAxis;`); }
;

AbbrevReverseStep 
  : DOBLEPUNTO  { 
    $$=new CaminoInverso("*",[],TipoPath.ABS); 
    grafo.generarHijos($1); 
    grafo.generarTexto(`caminoInverso = new CaminoInverso(); caminoInverso.tipo = Absoluto; AbbrevReverseStep.valor = caminoInverso;`); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { 
    $$=new Parent(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`parent = new Parent(); parent.tipo = Absoluto; ReverseAxis.valor = parent;`); }
  | RANCESTOR DOBLEDOSPUNTOS          { 
    $$=new Ancestor(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ancestor = new Ancestor(); ancestor.tipo = Absoluto; ReverseAxis.valor = ancestor;`); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { 
    $$=new PrecedingSibling(null,[],TipoPath.ABS);
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`precedingS = new PrecedingSibling(); precedingS.tipo = Absoluto; ReverseAxis.valor = precedingS;`); }
  | RPRECED DOBLEDOSPUNTOS            { 
    $$=new Preceding(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`preceding = new Preceding(); preceding.tipo = Absoluto; ReverseAxis.valor = preceding;`);}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { 
    $$=new AncestorSelf(null,[],TipoPath.ABS); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ancestorS = new AncestorSelf(); ancestorS.tipo = Absoluto; ReverseAxis.valor = ancestorS;`); }
;

PostfixExpr   
  : PrimaryExpr { 
    $$=$1; grafo.generarPadre(1, "PrimaryExpr"); 
    grafo.generarHijos("PrimaryExpr");
    grafo.generarTexto(`PostfixExpr.valor = PrimaryExpr.valor;`); }
	| PrimaryExpr PredicateList { 
    $$=$1; 
    $$.predicado = $2; 
    grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "PrimaryExpr");
    grafo.generarHijos("PrimaryExpr","PostfixExprL");
    grafo.generarTexto(`PrimaryExpr.predicado = predicateList.valor; PostfixExpr.valor = PrimaryExpr.valor`); }
;

Predicate   
  : CORA ExprSingle CORB { 
    $$=$2; grafo.generarPadre(2, "ExprSingle");
    grafo.generarHijos($1,"ExprSingle",$3);
    grafo.generarTexto(`Predicate.valor = ExprSingle.valor;`); }
;

PrimaryExpr 
  : Literal                   { 
    $$=$1; grafo.generarPadre(1, "Literal"); 
    grafo.generarHijos("Literal"); 
    grafo.generarTexto("PrimaryExpr.valor = literal.valor"); }
	| FunctionCall              { 
    $$=$1; grafo.generarPadre(1, "FunctionCall"); 
    grafo.generarHijos("FunctionCall"); 
    grafo.generarTexto("PrimaryExpr.valor = functionCall.valor");}
	| ContextItemExpr           { 
    $$=$1; grafo.generarPadre(1, "ContextItemExpr"); 
    grafo.generarHijos("ContextItemExpr"); 
    grafo.generarTexto("PrimaryExpr.valor = contextItemExpr.valor");}
	| ParenthesizedExpr         { 
    $$=$1; grafo.generarPadre(1, "ParenthesizedExpr"); 
    grafo.generarHijos("ParenthesizedExpr"); 
    grafo.generarTexto("PrimaryExpr.valor = ParenthesizedExpr.valor"); }
  | Variable                  { 
    $$=$1; grafo.generarPadre(1, "Variable"); 
    grafo.generarHijos("Variable"); 
    grafo.generarTexto("PrimaryExpr.valor = Variable.valor");}
;

Variable 
  : DOLAR NOMBRE { 
    $$=new Variable(null,$1+$2); 
    grafo.generarHijos($1,$2);
    grafo.generarTexto(`Variable.valor = ${$1+$2}`) }
;

Literal     
  : INTEGER                   { 
    $$=new Literal(Tipo.INTEGER,$1); 
    grafo.generarHijos($1); 
    grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = INTEGER;`); }
	| DECIMAL                   { 
    $$=new Literal(Tipo.DECIMAL,$1); 
    grafo.generarHijos($1); 
    grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = DECIMAL;`); }
	| CADENA                    { 
    $$=new Literal(Tipo.STRING,$1);  
    grafo.generarHijos($1); 
    grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = STRING;`); }
;

FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC {
    $$ = new CallFunction([],TipoPath.ABS,$1,[]);
    grafo.generarHijos($1,$2,$3);
    grafo.generarTexto(`FunctionCall = new CallFunction(); functionCall.tipo = Absoluto;`); }  //NODE() TEXT() POSITION() LAST() FIST()
	| NOMBRE PARENTESISA ArgumentList PARENTESISC {  
    $$ = new CallFunction([],TipoPath.ABS,$1,$3) 
    grafo.generarPadre(3,"ArgumentList")
    grafo.generarHijos($1,$2,"ArgumentList",$4)
    grafo.generarTexto(`FunctionCall = new CallFunction(ArgumentList.Valor)`)}
  | NOMBRE DOSPUNTOS NOMBRE PARENTESISA PARENTESISC { 
     $$ = new CallFunctionPrefix([],TipoPath.ABS,$1,$3,[]);
    grafo.generarHijos($1,$2,$3,$4,$5);
    grafo.generarTexto(`FunctionCall = new CallFunction(); functionCall.tipo = Absoluto;`); }  //NODE() TEXT() POSITION() LAST() FIST()
  | NOMBRE DOSPUNTOS NOMBRE PARENTESISA ArgumentList PARENTESISC  {  
    $$ = new CallFunctionPrefix([],TipoPath.ABS,$1,$3,$5) 
    grafo.generarPadre(5,"ArgumentList")
    grafo.generarHijos($1,$2,$3,$4,"ArgumentList",$6)
    grafo.generarTexto(`FunctionCall = new CallFunction(ArgumentList.Valor)`)}
;

ArgumentList
  : ExprSingle  { 
    $$=[$1] 
    grafo.generarPadre(1,"ExprSingle")
    grafo.generarHijos("ExprSingle")
    grafo.generarTexto("ArgumentList.valor = [];ArgumentList.valor.push(ExprSingle.valor)") }
  | ArgumentList COMA ExprSingle { 
    $$=$1;$$.push($3) 
    grafo.generarPadre(3,"ExprSingle")
    grafo.generarPadre(1,"ArgumentList")
    grafo.generarHijos("ArgumentList",$2,"ExprSingle")
    grafo.generarTexto("ArgumentList.valor = ArgumentList1.valor;ArgumentList.valor.push(ExprSingle.valor)") }
;

ContextItemExpr   
  : PUNTO  { 
    $$=new ContextItemExpr([],TipoPath.ABS); 
    grafo.generarHijos($1); 
    grafo.generarTexto(`contextItemExpr =  new ContextItemExpr(); contextItemExpr.tipo = Absoluto;`);}
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC { 
    $$=new Parentesis([]); 
    grafo.generarHijos($1,$2); 
    grafo.generarTexto(`ParenthesizedExpr.valor = [];`); }
	| PARENTESISA Expr PARENTESISC { 
    $$=new Parentesis($2); 
    grafo.generarPadre(2,"Expr")
    grafo.generarHijos($1,"Expr",$3); 
    grafo.generarTexto(`ParenthesizedExpr.valor = ExprSingle.valor;`); }
;	