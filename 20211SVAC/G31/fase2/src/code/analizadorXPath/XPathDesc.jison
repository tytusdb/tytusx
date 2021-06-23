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
"div"       return "DIV"
"idiv"      return "IDIV"
"mod"       return "MOD"
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
"@"         return "ARROBA"
"["         return "CORA"
"]"         return "CORB"
"+"         return "MAS"
"-"         return "MENOS"
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
%left ASTERISCO
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
    : ExprSingle P_Expr                                 
    { 
      $$ = $2; $$.push($1);
      grafo.generarPadre(2, "P_Expr");
      grafo.generarPadre(1, "ExprSingle");
      grafo.generarHijos("ExprSingle", "P_Expr");
      grafo.generarTexto(`P_Expr.push(ExprSingle.valor);`);
    }
    | ExprSingle error 
      { 
        $$=[];$$.push($1);
        grafo.generarPadre(1,"ExprSingle");
        grafo.generarHijos("ExprSingle","error") 
        grafo.generarTexto(`Expr.push(ExprSingle.valor); Expr.valor = []; new Error();`); 
        ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
      }
;

P_Expr
    : PIPE ExprSingle P_Expr                            
    { 
      $$ = $3; $$.push($2); 
      grafo.generarPadre(3,"P_Expr"); 
      grafo.generarPadre(2,"ExprSingle"); 
      grafo.generarHijos($1,"ExprSingle","P_Expr");
      grafo.generarTexto(`P_Expr.push(ExprSingle.valor); P_Expr.valor = P_Expr.valor;`);
    }
    |                                                   
    { 
      $$ = []; grafo.generarHijos("ε");
      grafo.generarTexto(`P_Expr.valor = [];`);
    }
    | PIPE ExprSingle error 
    { 
      $$=[];$$.push($2);
      grafo.generarPadre(2,"ExprSingle");
      grafo.generarHijos($1,"ExprSingle","error") 
      grafo.generarTexto(`P_Expr.valor = []; P_Expr.push(ExprSingle.valor); new Error();`);
      ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    }
;

ExprSingle  
  : OrExpr                                              
  { 
    $$ = $1; grafo.generarPadre(1,"OrExpr");
    grafo.generarHijos("OrExpr");
    grafo.generarTexto(`ExprSingle.valor = OrExpr.valor;`);
  }
;

OrExpr
    : AndExpr P_OrExpr                                  
    { 
      if($2==null){$$=$1;}else{$$=new Logical($1,"or",$2);};
      grafo.generarPadre(2,"P_OrExpr"); 
      grafo.generarPadre(1,"AndExpr"); 
      grafo.generarHijos("AndExpr", "P_OrExpr");
      grafo.generarTexto(`if(P_OrExpr.valor == null){OrExpr.valor = AndExpr}else{OrExpr.valor = new Logical(AndExpr,"or",P_OrExpr);}`);
    }
;

P_OrExpr
    : ROR AndExpr P_OrExpr                              
    { 
      if($3==null){$$=$2;}else{$$=new Logical($2,"or",$3);}
      grafo.generarPadre(3, "P_OrExpr"); 
      grafo.generarPadre(2, "AndExpr"); 
      grafo.generarHijos($1, "AndExpr", "P_OrExpr");
      grafo.generarTexto(`if(P_OrExpr.valor == null){P_OrExpr.valor = AndExpr;}else{P_OrExpr.valor = new Logical(AndExpr,"or",P_OrExpr);}`);
    }
    |                                                   
    { 
      $$ = null; grafo.generarHijos("ε"); 
      grafo.generarTexto(`P_OrExpr.valor = null;`);
    }
;

AndExpr
    : ComparisonExpr P_AndExpr                          
    { 
      if($2==null){$$=$1;}else{$$=new Logical($1,"and",$2);};
      grafo.generarPadre(2, "P_AndExpr"); 
      grafo.generarPadre(1, "ComparisonExpr"); 
      grafo.generarHijos("ComparisonExpr", "P_AndExpr");
      grafo.generarTexto(`if(P_AndExpr.valor == null){AndExpr.valor = ComparisonExpr;}else{AndExpr.valor = new Logical(ComparisonExpr,"and",P_AndExpr);}`);
    }
;

P_AndExpr
    : RAND /*and*/ ComparisonExpr P_AndExpr             
    { 
      if($3==null){$$=$2;}else{$$=new Logical($2,"and",$3);}; 
      grafo.generarPadre(3, "P_AndExpr"); 
      grafo.generarPadre(2, "ComparisonExpr"); 
      grafo.generarHijos($1, "ComparisonExpr", "P_AndExpr");
      grafo.generarTexto(`if(P_AndExpr.valor == null){P_AndExpr.valor = ComparisonExpr;}else{P_AndExpr.valor = new Logical(ComparisonExpr,"and",P_AndExpr);}`);
    }
    |                                                   
    { 
      $$ = null; grafo.generarHijos("ε");
      grafo.generarTexto(`P_AndExpr.valor = null;`);
    }
;

ComparisonExpr
    : AdditiveExpr SUB_AdditiveExpr                     
    { 
      if($2==null){$$=$1;}else{$$=$2; $$.izquierdo = $1;} 
      grafo.generarPadre(2, "SUB_AdditiveExpr"); 
      grafo.generarPadre(1, "AdditiveExpr"); 
      grafo.generarHijos("AdditiveExpr","SUB_AdditiveExpr");
      grafo.generarTexto(`if(SUB_AdditiveExpr.valor == null){ComparisonExpr.valor = AdditiveExpr.valor;}else{SUB_AdditiveExpr.izq = AdditiveExpr.valor}`);
    }
;

SUB_AdditiveExpr
    : GeneralComp AdditiveExpr                          
    { 
      $$ = new ComparisonExp(null,$1,$2);
      grafo.generarPadre(2, "AdditiveExpr");
      grafo.generarPadre(1, "GeneralComp");
      grafo.generarHijos("GeneralComp","AdditiveExpr");
      grafo.generarTexto(`SUB_AdditiveExpr.valor = new ComparisonExp(GeneralComp.valor, AdditiveExpr.valor);`);
    }
    |                                                   
    { 
      $$ = null; grafo.generarHijos("ε");
      grafo.generarTexto(`SUB_AdditiveExpr.valor = null;`);
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

AdditiveExpr
    : MultiplicativeExpr P_AdditiveExpr                 
    { 
      if($2==null){$$=$1;}else{$$=$2; $$.izquierdo = $1;}; 
      grafo.generarPadre(2,"P_AdditiveExpr");
      grafo.generarPadre(1,"MultiplicativeExpr"); 
      grafo.generarHijos("MultiplicativeExpr", "P_AdditiveExpr");
      grafo.generarTexto(`if(P_AdditiveExpr == null){AdditiveExpr.valor = MultiExpr.valor}else{P_AdditiveExpr.izq = P_MultiExpr}`);
    }
;

P_AdditiveExpr
    : MAS MultiplicativeExpr P_AdditiveExpr             
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2;} 
      grafo.generarPadre(3,"P_AdditiveExpr");
      grafo.generarPadre(2, "MultiplicativeExpr"); 
      grafo.generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr");
      grafo.generarTexto(`if(P_AdditiveExpr == null){P_AdditiveExpr.valor = new Arithmetic(${$1},MultiExpr.valor);}else{P_AdditiveExpr.izq = P_MultiExpr}`);
    }
    | MENOS MultiplicativeExpr P_AdditiveExpr           
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2;} 
      grafo.generarPadre(3,"P_AdditiveExpr");
      grafo.generarPadre(2,"MultiplicativeExpr"); 
      grafo.generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr");
      grafo.generarTexto(`if(P_AdditiveExpr == null){P_AdditiveExpr.valor = new Arithmetic(${$1},MultiExpr.valor);}else{P_AdditiveExpr.izq = P_MultiExpr}`);
    }
    |                                                   
    { 
      $$ = null; grafo.generarHijos("ε");
      grafo.generarTexto(`P_AdditiveExpr.valor = null;`);
    }
;

MultiplicativeExpr
    : UnaryExpr P_MultiplicativeExpr                    
    { 
      if($2==null){$$=$1;}else{$$=$2; $$.izquierdo = $1;}; 
      grafo.generarPadre(2,"P_MultiplicativeExpr");
      grafo.generarPadre(1,"UnaryExpr"); 
      grafo.generarHijos("UnaryExpr", "P_MultiplicativeExpr");
      grafo.generarTexto(`if(P_MultiExpr == null){MultiExpr.valor = UnaryExpr}else{P_MultiExpr.izq = UnaryExpr};`);
    }
;

P_MultiplicativeExpr
    : POR /* * */ UnaryExpr P_MultiplicativeExpr        
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2; };
      grafo.generarPadre(3,"P_MultiplicativeExpr");
      grafo.generarPadre(2,"UnaryExpr"); 
      grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr");
      grafo.generarTexto(`if(P_MultiExpr.valor == null){P_MultiExpr.valor = new Arithmetic(${$1}, UnaryExpr);}else{P_MultiExpr.izq = UnaryExpr}`);
    }
    | DIV /* div */ UnaryExpr P_MultiplicativeExpr      
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2; };
      grafo.generarPadre(3,"P_MultiplicativeExpr");
      grafo.generarPadre(2,"UnaryExpr");  
      grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr");
      grafo.generarTexto(`if(P_MultiExpr.valor == null){P_MultiExpr.valor = new Arithmetic(${$1}, UnaryExpr);}else{P_MultiExpr.izq = UnaryExpr}`);
    }
    | IDIV /* idiv */ UnaryExpr P_MultiplicativeExpr    
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2; }; 
      grafo.generarPadre(3, "P_MultiplicativeExpr");
      grafo.generarPadre(2, "UnaryExpr");
      grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr");
      grafo.generarTexto(`if(P_MultiExpr.valor == null){P_MultiExpr.valor = new Arithmetic(${$1}, UnaryExpr);}else{P_MultiExpr.izq = UnaryExpr}`);
    }
    | MOD /* mod */ UnaryExpr P_MultiplicativeExpr      
    { 
      if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izquierdo = $2; }; 
      grafo.generarPadre(3, "P_MultiplicativeExpr");
      grafo.generarPadre(2, "UnaryExpr"); 
      grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr");
      grafo.generarTexto(`if(P_MultiExpr.valor == null){P_MultiExpr.valor = new Arithmetic(${$1}, UnaryExpr);}else{P_MultiExpr.izq = UnaryExpr}`);
    }
    |                                                   
    { 
      $$ = null; grafo.generarHijos("ε");
      grafo.generarTexto(`P_MultiplicativeExpr.valor = null;`);
    }
;

UnaryExpr   
    : PathExpr                                          
    { 
      $$ = $1; grafo.generarPadre(1, "PathExpr");
      grafo.generarHijos("PathExpr");
      grafo.generarTexto(`UnaryExpr.valor = PathExpr.valor;`);
    }
	  | MAS /*+*/ UnaryExpr                               
    { 
      $$=new Unary($1, $2); grafo.generarPadre(2, "UnaryExpr");
      grafo.generarHijos($1,"UnaryExp");
      grafo.generarTexto(`UnaryExpr.valor = new Unary(${$1}, UnaryExpr.valor);`);
    }
	  | MENOS /*-*/ UnaryExpr                             
    { 
      $$=new Unary($1, $2); 
      grafo.generarPadre(2, "UnaryExpr");
      grafo.generarHijos($1,"UnaryExp");
      grafo.generarTexto(`UnaryExpr.valor = new Unary(${$1}, UnaryExpr.valor);`);
    }
;

PathExpr
    : BARRA SUB_BARRA                                   
    { 
      $$ = $2; grafo.generarPadre(2, "SUB_BARRA");
      grafo.generarHijos($1, "SUB_BARRA");
      grafo.generarTexto(`PathExpr.valor = SUB_BARRA.valor`);
    }
    | DOBLEBARRA RelativePathExpr                       
    { 
      $2[0].tipo=TipoPath.REL;$$=new PathExp($2);
      grafo.generarPadre(2, "RelativePathExpr");
      grafo.generarHijos($1, "RelativePathExpr");
      grafo.generarTexto(`RelativePathExpr[0].tipo = Relativo; PathExpr.valor = new PathExp(RelativePathExpr.valor);`);
    }
    | RelativePathExpr                                  
    { 
      $$=new PathExp($1); grafo.generarPadre(1, "RelativePathExpr");
      grafo.generarHijos("RelativePathExpr");
      grafo.generarTexto(`PathExpr.valor = new PathExp(RelativePathExpr.valor);`);
    }
;

SUB_BARRA
    : RelativePathExpr                                  
    { 
      $1[0].tipo=TipoPath.ABS;$$=new PathExp($1);
      grafo.generarPadre(1, "RelativePathExpr");
      grafo.generarHijos("RelativePathExpr");
      grafo.generarTexto(`RelativePathExpr[0].tipo = Absoluto; SUB_BARRA.valor = new PathExp(RelativePathExpr.valor);`);
    }
    |                                                   
    { 
      $$=new PathExp([]); grafo.generarHijos("ε");
      grafo.generarTexto(`SUB_BARRA.valor = new Path(new Array[]);`);
    }
;

RelativePathExpr
    : StepExpr P_RelativePathExpr                       
    { 
      $2.push($1); $2.reverse(); $$ = $2;
      grafo.generarPadre(2, "P_RelativePathExpr");
      grafo.generarPadre(1, "StepExpr"); 
      grafo.generarHijos("StepExpr", "P_RelativePathExpr");
      grafo.generarTexto(`P_RelativePathExpr.push(StepExpr.valor); RelativePathExpr.valor = P_RelativePathExpr.valor;`);
    }
;

P_RelativePathExpr
    : BARRA StepExpr P_RelativePathExpr                 
    { 
      $$ = $3; $2.tipo = TipoPath.ABS; $$.push($2);
      grafo.generarPadre(3, "P_RelativePathExpr");
      grafo.generarPadre(2, "StepExpr");
      grafo.generarHijos($1, "StepExpr", "P_RelativePathExpr");
      grafo.generarTexto(`StepExpr.tipo = Absoluto; P_RelativePathExpr.push(StepExpr.valor);`);
    }
    | DOBLEBARRA StepExpr P_RelativePathExpr            
    { 
      $$ = $3; $2.tipo = TipoPath.REL; $$.push($2);
      grafo.generarPadre(3, "P_RelativePathExpr");
      grafo.generarPadre(2, "StepExpr");
      grafo.generarHijos($1, "StepExpr", "P_RelativePathExpr");
      grafo.generarTexto(`StepExpr.tipo = Relativo; P_RelativePathExpr.push(StepExpr.valor);`);
    }
    |                                                   
    { 
      $$ = []; grafo.generarHijos("ε");
      grafo.generarTexto(`P_RelativePathExpr = [];`);
    }
;

StepExpr    
    : PostfixExpr                                       
    { 
      $$ = $1; grafo.generarPadre(1, "PostfixExpr");
      grafo.generarHijos("PostfixExpr");
      grafo.generarTexto(`StepExpr.valor = PostfixExpr.valor`);
    }
    | AxisStep                                          
    { 
      $$ = $1; grafo.generarPadre(1, "AxisStep");
      grafo.generarHijos("AxisStep");
      grafo.generarTexto(`StepExpr.valor = AxisStep.valor`);
    }
;

AxisStep
    : ForwardStep SUB_PredicateList                       
    { 
      $$ = $1; $$.predicado = $2; 
      grafo.generarPadre(2, "SUB_PredicateList");
      grafo.generarPadre(1, "ForwardStep");
      grafo.generarHijos("ForwardStep", "SUB_PredicateList");
      grafo.generarTexto(`ForwardStep.predicado = SUB_PredicateList.valor; AxisStep.valor = ForwardStep.valor;`);
    }
    | ReverseStep SUB_PredicateList                       
    { 
      $$ = $1; $$.predicado = $2; grafo.generarPadre(2, "SUB_PredicateList");
      grafo.generarPadre(1, "ReverseStep");
      grafo.generarHijos("ReverseStep", "SUB_PredicateList");
      grafo.generarTexto(`ReverseStep.predicado = SUB_PredicateList.valor; AxisStep.valor = ReverseStep.valor;`);
    }
;

SUB_PredicateList
    : PredicateList                                     
    { 
      $$ = $1; grafo.generarPadre(1,"PredicateList");
      grafo.generarHijos("PredicateList");
      grafo.generarTexto(`SUB_PredicateList.valor = PredicateList.valor`);
    }
    |                                                   
    { 
      $$ = []; grafo.generarHijos("ε");
      grafo.generarTexto(`SUB_PredicateList.valor = [];`);
    }
;


PredicateList
    : Predicate P_PredicateList                         
    { 
      $$ = $2; $$.push($1); $$.reverse(); 
      grafo.generarPadre(2, "P_PredicateList");
      grafo.generarPadre(1, "Predicate");
      grafo.generarHijos("Predicate", "P_PredicateList");
      grafo.generarTexto(`P_PredicateList.push(Predicate); PredicateList.valor = P_PredicateList.valor`);
    }
;

P_PredicateList
    : Predicate P_PredicateList                         
    { 
      $$ = $2; $$.push($1);
      grafo.generarPadre(2, "P_PredicateList");
      grafo.generarPadre(1, "Predicate");
      grafo.generarHijos("Predicate", "P_PredicateList");
      grafo.generarTexto(`P_PredicateList.push(Predicate);`);
    }
    |                                                   
    { 
      $$ = []; grafo.generarHijos("ε");
      grafo.generarTexto(`P_PredicateList = [];`);
    }
;

ForwardStep 
  : AbbrevForwardStep    
  { 
    $$=$1; 
    grafo.generarPadre(1, "AbbrevForwardStep");
    grafo.generarHijos("AbbrevForwardStep");
    grafo.generarTexto(`ForwardStep.valor = AbbrevForwardStep.valor`);
  }
  | ForwardAxis NameTest 
  { 
    $$=$1; $$.nombre=$2; 
    grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ForwardAxis");
    grafo.generarHijos("ForwardAxis", "NameTest");
    grafo.generarTexto(`ForwardAxis.nombre = NameTest.valor; ForwardStep.valor = ForwardAxis.valor`);
  }
;

AbbrevForwardStep 
  : ARROBA NameTest 
  { 
    $$=new Atributo($2,[],TipoPath.ABS);
    grafo.generarPadre(2, "NameTest");
    grafo.generarHijos($1, "NameTest");
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
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Follow();`); }
  | RNAMESPACE DOBLEDOSPUNTOS     {  }
;

NodeTest    
  : NameTest                                
  { 
    $$ = $1; grafo.generarPadre(1, "NameTest");
    grafo.generarHijos("NameTest");
    grafo.generarTexto(`NodeTest.valor = NameTest.valor;`);
  }
;

NameTest    
  : NOMBRE      { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
	| POR         { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
;

ReverseStep 
  :  AbbrevReverseStep                      
  { 
    $$=$1; grafo.generarPadre(1, "AbbrevReverseStep");
    grafo.generarHijos("AbbrevReverseStep");
    grafo.generarTexto(`ReverseStep.valor = AbbrevReverseStep.valor`);
  }
  |  ReverseAxis NameTest                   
  { 
    $$=$1; $$.nombre=$2; 
    grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ReverseAxis");
    grafo.generarHijos("ReverseAxis","NameTest");
    grafo.generarTexto(`ReverseAxis.nombre = NameTest; ReverseStep.valor = ReverseAxis;`);
  }
;

AbbrevReverseStep 
  : DOBLEPUNTO                              { $$=new CaminoInverso("*",[],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`caminoInverso = new CaminoInverso(); caminoInverso.tipo = Absoluto; AbbrevReverseStep.valor = caminoInverso;`); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`parent = new Parent(); parent.tipo = Absoluto; ReverseAxis.valor = parent;`); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestor = new Ancestor(); ancestor.tipo = Absoluto; ReverseAxis.valor = ancestor;`); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`precedingS = new PrecedingSibling(); precedingS.tipo = Absoluto; ReverseAxis.valor = precedingS;`); }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`preceding = new Preceding(); preceding.tipo = Absoluto; ReverseAxis.valor = preceding;`); }
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestorS = new AncestorSelf(); ancestorS.tipo = Absoluto; ReverseAxis.valor = ancestorS;`); }
;

PostfixExpr   
  : PrimaryExpr SUB_PredicateList            
  { 
    $$ = $1; $$.predicado = $2; 
    grafo.generarPadre(2, "SUB_PredicateList");
    grafo.generarPadre(1, "PrimaryExpr");
    grafo.generarHijos("PrimaryExpr","SUB_PredicateList");
    grafo.generarTexto(`PrimaryExpr.predicado = SUB_PredicateList.valor; PostfixExpr.valor = PrimaryExpr.valor`);
  }
;


Predicate   
  : CORA ExprSingle CORB                    { $$ = $2; grafo.generarPadre(2, "ExprSingle"); grafo.generarHijos($1,"ExprSingle",$3); grafo.generarTexto(`Predicate.valor = ExprSingle.valor;`); }
;

PrimaryExpr 
  : Literal                                 { $$ = $1; grafo.generarPadre(1, "Literal");grafo.generarHijos("Literal"); grafo.generarTexto("PrimaryExpr.valor = literal.valor"); }
	| FunctionCall                            { $$ = $1; grafo.generarPadre(1, "FunctionCall");grafo.generarHijos("FunctionCall"); grafo.generarTexto("PrimaryExpr.valor = functionCall.valor"); }
	| ContextItemExpr                         { $$ = $1; grafo.generarPadre(1, "ContextItemExpr");grafo.generarHijos("ContextItemExpr"); grafo.generarTexto("PrimaryExpr.valor = contextItemExpr.valor"); }
	| ParenthesizedExpr                       { $$ = $1; grafo.generarPadre(1, "ParenthesizedExpr");grafo.generarHijos("ParenthesizedExpr"); grafo.generarTexto("PrimaryExpr.valor = ParenthesizedExpr.valor"); }
;

Literal     
  : INTEGER                                 { $$=new Literal(Tipo.INTEGER,Number($1)); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = INTEGER;`); }
	| DECIMAL                                 { $$=new Literal(Tipo.DECIMAL,Number($1)); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = DECIMAL;`); }
	| CADENA                                  { $$=new Literal(Tipo.STRING,$1); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = STRING;`); }
;

FunctionCall
    : NOMBRE PARENTESISA PARENTESISC        { $$ = new CallFunction([],TipoPath.ABS,$1); grafo.generarHijos($1,$2,$3); grafo.generarTexto(`functionCall = new CallFunction(); functionCall.tipo = Absoluto;`);}
;


ContextItemExpr   
    : PUNTO                                 { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`contextItemExpr =  new ContextItemExpr(); contextItemExpr.tipo = Absoluto;`); }
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=[]; grafo.generarHijos($1,$2); grafo.generarTexto(`ParenthesizedExpr.valor = [];`); }
	| PARENTESISA ExprSingle PARENTESISC  { $$=$2; grafo.generarHijos($1,$2,$3); grafo.generarTexto(`ParenthesizedExpr.valor = ExprSingle.valor;`); }
;	


