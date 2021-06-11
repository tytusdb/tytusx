%{
  
  const {Tipo,TipoPath,Comando} = require("./AST/Entorno");
  const {Logical} = require("./Expresion/Logical");
  const {Arithmetic} = require("./Expresion/Arithmetics")
  const {Literal,PathExp} = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo,Camino,Child,Descendant,Attribute,Self,DescSelf,FollowSibling,Follow,Preceding } = require('./Expresion/axes')
  const { CaminoInverso,Parent,Ancestor,PrecedingSibling,AncestorSelf } = require('./Expresion/axes')
  const { ContextItemExpr,CallFunction } = require('./Expresion/postfix')
  

  // Datos { id:contador,label:'Nombre' }
  var pilaHijos = []
  var GrahpvizNodo = ""
  var pilaNodos= []
  // DAtos { from:idActual, to: idHijos }
  var PilaEdges= []
  var GrahpvizEdges = ""
  var contador = 0
  //Genera los padres en funcion de los ultimos datos en la pila de Hijos
  function generarPadre (posicion)
  {
    posicion--
    var Edges = pilaHijos.pop()  
    for(const temp of Edges)
    {
      PilaEdges.push({from:contador+posicion, to:temp.id})
      GrahpvizEdges += `${contador+posicion} -> ${temp.id}\n`
    }
  }
  //Funcion que recive X parametros 
  function generarHijos()
  {
    var Hijos=[]
    for(var i=0;i < arguments.length; i++)
    {
      var hijo = {id:contador,label:arguments[i]}
      Hijos.push(hijo)
      pilaNodos.push(hijo)
      GrahpvizNodo += `${contador}[label="${arguments[i]}"]\n`
      contador++
    }
    pilaHijos.push(Hijos)
  }

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


.	{ ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", linea: yylloc.first_line , columna:yylloc.first_column}) }

/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS

%start XPath

%%

XPath 
    : Expr
    {
      generarPadre(1);generarHijos("Expr");
      $1.reverse();
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      var Nodes = Object.assign([], pilaNodos);
      pilaNodos = [];
      var Edges = Object.assign([], PilaEdges);
      PilaEdges = [];
      pilaHijos = [];
      contador = 0;
      $$=new Comando($1,Nodes,Edges,GrahpvizNodo+GrahpvizEdges,retornoErrores);
      GrahpvizEdges = "";
      GrahpvizNodo = "";
      return $$ 
   }
    | error                                              
    {  
      ListaErrores.push({Error:"Error irrecuperable :"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column});
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      pilaNodos = [];
      PilaEdges = [];
      pilaHijos = [];
      contador = 0;
      GrahpvizNodo = "";
      GrahpvizEdges = "";
      return new Comando([],[],[],"",retornoErrores)
    }
;

Expr
    : ExprSingle P_Expr                                 { $$ = $2; $$.push($1); generarPadre(2); generarPadre(1); generarHijos("ExprSingle", "P_Expr"); }
    | ExprSingle error 
      { 
        $$=[];$$.push($1);generarPadre(1);generarHijos("ExprSingle","error") 
        ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
        generarPadre(1); generarHijos("error",$2) 
      }
;

P_Expr
    : PIPE ExprSingle P_Expr                            { $$ = $3; $$.push($2); generarPadre(3); generarPadre(2); generarHijos($1,"ExprSingle","P_Expr"); }
    |                                                   { $$ = []; generarHijos("ε");}
    | PIPE ExprSingle error 
      { 
        $$=[];$$.push($2);generarPadre(2);generarHijos($1,"ExprSingle","error") 
        ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
        generarPadre(1); generarHijos("error",$2) 
      }
;

ExprSingle  
  : OrExpr                                              { $$ = $1; generarPadre(1); generarHijos("OrExpr");}
;

OrExpr
    : AndExpr P_OrExpr                                  { if($2==null){$$=$1;}else{$$=new Logical($1,"or",$2);};
                                        generarPadre(2); generarPadre(1); generarHijos("AndExpr", "P_OrExpr"); }
;

P_OrExpr
    : ROR AndExpr P_OrExpr                              { if($3==null){$$=$2;}else{$$=new Logical($2,"or",$3);};
                                        generarPadre(3); generarPadre(2); generarHijos($1, "AndExpr", "P_OrExpr"); }
    |                                                   { $$ = null; generarHijos("ε"); }
;

AndExpr
    : ComparisonExpr P_AndExpr                          { if($2==null){$$=$1;}else{$$=new Logical($1,"and",$2);}; generarPadre(2); generarPadre(1); generarHijos("ComparisonExpr", "P_AndExpr"); }
;

P_AndExpr
    : RAND /*and*/ ComparisonExpr P_AndExpr             { if($3==null){$$=$2;}else{$$=new Logical($2,"and",$3);}; generarPadre(3); generarPadre(2); generarHijos($1, "ComparisonExpr", "P_AndExpr"); }
    |                                                   { $$ = null; generarHijos("ε"); }
;

ComparisonExpr
    : AdditiveExpr SUB_AdditiveExpr                     { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;} generarPadre(2); generarPadre(1); generarHijos("AdditiveExpr","SUB_AdditiveExpr"); }
;

SUB_AdditiveExpr
    : GeneralComp AdditiveExpr                          { $$ = new ComparisonExp(null,$1,$2); generarPadre(2); generarPadre(1); generarHijos("GeneralComp","AdditiveExpr"); }
    |                                                   { $$ = null; generarHijos("ε"); }
;

GeneralComp       
    : IGUAL       /*"="*/                               { $$ = $1; generarHijos($1); } 
	  | DIFERENTE   /*"!="*/                              { $$ = $1; generarHijos($1); }
	  | MENOR       /*"<"*/                               { $$ = $1; generarHijos($1); }
	  | MENORIG     /*"<="*/                              { $$ = $1; generarHijos($1); }
	  | MAYOR       /*">"*/                               { $$ = $1; generarHijos($1); }
	  | MAYORIG     /*">="*/                              { $$ = $1; generarHijos($1); }
;

AdditiveExpr
    : MultiplicativeExpr P_AdditiveExpr                 { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;}; generarPadre(2);generarPadre(1); generarHijos("MultiplicativeExpr", "P_AdditiveExpr"); }
;

P_AdditiveExpr
    : MAS MultiplicativeExpr P_AdditiveExpr             { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2;} generarPadre(3);generarPadre(2); generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr"); }
    | MENOS MultiplicativeExpr P_AdditiveExpr           { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2;} generarPadre(3);generarPadre(2); generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr");}
    |                                                   { $$ = null; generarHijos("ε"); }
;

MultiplicativeExpr
    : UnaryExpr P_MultiplicativeExpr                    { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;}; generarPadre(2);generarPadre(1); generarHijos("UnaryExpr", "P_MultiplicativeExpr"); }
;

P_MultiplicativeExpr
    : POR /* * */ UnaryExpr P_MultiplicativeExpr        { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; generarPadre(3);generarPadre(2); generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | DIV /* div */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; generarPadre(3);generarPadre(2); generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | IDIV /* idiv */ UnaryExpr P_MultiplicativeExpr    { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; generarPadre(3);generarPadre(2); generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | MOD /* mod */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; generarPadre(3);generarPadre(2); generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    |                                                   { $$ = null; generarHijos("ε"); }
;

UnaryExpr   
    : PathExpr                                          { $$ = $1; generarPadre(1); generarHijos("PathExpr"); }
	  | MAS /*+*/ UnaryExpr                               {  }
	  | MENOS /*-*/ UnaryExpr                             {  }
;

PathExpr
    : BARRA SUB_BARRA                                   { $$ = $2; generarPadre(2); generarHijos($1, "SUB_BARRA"); }
    | DOBLEBARRA RelativePathExpr                       { $2[0].tipo=TipoPath.REL;$$=new PathExp($2); generarPadre(2); generarHijos($1, "RelativePathExpr");}
    | RelativePathExpr                                  { $$=new PathExp($1); generarPadre(1); generarHijos("RelativePathExpr"); }
;

SUB_BARRA
    : RelativePathExpr                                  { $1[0].tipo=TipoPath.ABS;$$=new PathExp($1); generarPadre(1); generarHijos("RelativePathExpr"); }
    |                                                   { $$=new PathExp([]); generarHijos("ε"); }
;

RelativePathExpr
    : StepExpr P_RelativePathExpr                       { $2.push($1); $2.reverse();  $$ = $2; generarPadre(2); generarPadre(1); generarHijos("StepExpr", "P_RelativePathExpr"); }
;

P_RelativePathExpr
    : BARRA StepExpr P_RelativePathExpr                 { $$ = $3; $2.tipo = TipoPath.ABS; $$.push($2); 
                        generarPadre(3); generarPadre(2); generarHijos($1, "StepExpr", "P_RelativePathExpr"); }
    | DOBLEBARRA StepExpr P_RelativePathExpr            { $$ = $3; $2.tipo = TipoPath.REL; $$.push($2); 
                        generarPadre(3); generarPadre(2); generarHijos($1, "StepExpr", "P_RelativePathExpr"); }
    |                                                   { $$ = []; generarHijos("ε"); }
;

StepExpr    
    : PostfixExpr                                       { $$ = $1; generarPadre(1); generarHijos("PostfixExpr"); }
    | AxisStep                                          { $$ = $1; generarPadre(1); generarHijos("AxisStep"); }
;

AxisStep
    : ForwardStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; generarPadre(2); generarPadre(1); generarHijos("ForwardStep", "SUB_PredicateList"); }
    | ReverseStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; generarPadre(2); generarPadre(1); generarHijos("ReverseStep", "SUB_PredicateList");}
;

SUB_PredicateList
    : PredicateList                                     { $$ = $1; generarPadre(1); generarHijos("PredicateList");}
    |                                                   { $$ = []; generarHijos("ε"); }
;


PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); $$.reverse(); generarPadre(2); generarPadre(1); generarHijos("Predicate", "P_PredicateList"); }
;

P_PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); generarPadre(2); generarPadre(1); generarHijos("Predicate", "P_PredicateList"); }
    |                                                   { $$ = []; generarHijos("ε");}
;

ForwardStep 
  : AbbrevForwardStep    { $$=$1; generarPadre(1); generarHijos("AbbrevForwardStep"); }
  | ForwardAxis NameTest { $$=$1; $$.nombre=$2; generarPadre(2); generarPadre(1); generarHijos("ForwardAxis", "NameTest"); }
;

AbbrevForwardStep 
  : ARROBA NameTest { $$=new Atributo($2,[],TipoPath.ABS); generarPadre(2); generarHijos($1, "NameTest"); }
  | NameTest        { $$=new Camino($1,[],TipoPath.ABS); generarPadre(1); generarHijos("NameTest"); }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); generarHijos($1,$2); }
  | RNAMESPACE DOBLEDOSPUNTOS     {  }
;

NodeTest    
  : NameTest                                { $$ = $1; generarPadre(1); generarHijos("NameTest"); }
;

NameTest    
    : NOMBRE                                 { $$ = $1; generarHijos($1); }
	|  Wildcard                                { $$ = $1; generarPadre(1); generarHijos("Wildcard"); }
;

Wildcard    
  : ASTERISCO                               { $$ = $1; generarHijos($1); }
;

ReverseStep 
  :  AbbrevReverseStep                      { $$=$1; generarPadre(1); generarHijos("AbbrevReverseStep"); }
  |  ReverseAxis NameTest                   { $$=$1; $$.nombre=$2; generarPadre(2);generarPadre(1);generarHijos("ReverseAxis","NameTest") }
;

AbbrevReverseStep 
  : DOBLEPUNTO                              { $$=new CaminoInverso("*",[],TipoPath.ABS); generarHijos($1); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],Tipo.ABS); generarHijos($1,$2); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],Tipo.ABS); generarHijos($1,$2); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],Tipo.ABS); generarHijos($1,$2); }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],Tipo.ABS); generarHijos($1,$2)}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],Tipo,Tipo.ABS); generarHijos($1,$2); }
;

PostfixExpr   
  : PrimaryExpr SUB_PredicateList            { $$ = $1; $$.predicado = $2; 
        generarPadre(1); generarPadre(2); generarHijos("PrimaryExpr","SUB_PredicateList");}
;


Predicate   
  : CORA ExprSingle CORB                    { $$ = $2; generarPadre(2); generarHijos($1,"ExprSingle",$3);}
;

PrimaryExpr 
  : Literal                                 { $$ = $1; generarHijos("Literal");}
	| FunctionCall                            { $$ = $1; generarHijos("FunctionCall");}
	| ContextItemExpr                         { $$ = $1; generarHijos("ContextItemExpr");}
	| ParenthesizedExpr                       { $$ = $1; generarHijos("ParenthesizedExpr");}
;

Literal     
  : INTEGER                                 { $$=new Literal(Tipo.INTEGER,$1); generarHijos($1); }
	| DECIMAL                                 { $$=new Literal(Tipo.DECIMAL,$1); generarHijos($1); }
	| CADENA                                  { $$=new Literal(Tipo.STRING,$1); generarHijos($1); }
;

FunctionCall
    : NOMBRE PARENTESISA PARENTESISC        { $$ = new CallFunction([],TipoPath.ABS,$1); generarHijos($1,$2,$3)}
;


ContextItemExpr   
    : PUNTO                                 { $$=new ContextItemExpr([],TipoPath.ABS); generarHijos($1); }
;




