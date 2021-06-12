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
    : ExprSingle P_Expr                                 { $$ = $2; $$.push($1); grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("ExprSingle", "P_Expr"); }
    | ExprSingle error 
      { 
        $$=[];$$.push($1);grafo.generarPadre(1);grafo.generarHijos("ExprSingle","error") 
        ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
        grafo.generarPadre(1); grafo.generarHijos("error",$2) 
      }
;

P_Expr
    : PIPE ExprSingle P_Expr                            { $$ = $3; $$.push($2); grafo.generarPadre(3); grafo.generarPadre(2); grafo.generarHijos($1,"ExprSingle","P_Expr"); }
    |                                                   { $$ = []; grafo.generarHijos("ε");}
    | PIPE ExprSingle error 
      { 
        $$=[];$$.push($2);grafo.generarPadre(2);grafo.generarHijos($1,"ExprSingle","error") 
        ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
        grafo.generarPadre(1); grafo.generarHijos("error",$2) 
      }
;

ExprSingle  
  : OrExpr                                              { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("OrExpr");}
;

OrExpr
    : AndExpr P_OrExpr                                  { if($2==null){$$=$1;}else{$$=new Logical($1,"or",$2);};
                                        grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("AndExpr", "P_OrExpr"); }
;

P_OrExpr
    : ROR AndExpr P_OrExpr                              { if($3==null){$$=$2;}else{$$=new Logical($2,"or",$3);};
                                        grafo.generarPadre(3); grafo.generarPadre(2); grafo.generarHijos($1, "AndExpr", "P_OrExpr"); }
    |                                                   { $$ = null; grafo.generarHijos("ε"); }
;

AndExpr
    : ComparisonExpr P_AndExpr                          { if($2==null){$$=$1;}else{$$=new Logical($1,"and",$2);}; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("ComparisonExpr", "P_AndExpr"); }
;

P_AndExpr
    : RAND /*and*/ ComparisonExpr P_AndExpr             { if($3==null){$$=$2;}else{$$=new Logical($2,"and",$3);}; grafo.generarPadre(3); grafo.generarPadre(2); grafo.generarHijos($1, "ComparisonExpr", "P_AndExpr"); }
    |                                                   { $$ = null; grafo.generarHijos("ε"); }
;

ComparisonExpr
    : AdditiveExpr SUB_AdditiveExpr                     { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;} grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("AdditiveExpr","SUB_AdditiveExpr"); }
;

SUB_AdditiveExpr
    : GeneralComp AdditiveExpr                          { $$ = new ComparisonExp(null,$1,$2); grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("GeneralComp","AdditiveExpr"); }
    |                                                   { $$ = null; grafo.generarHijos("ε"); }
;

GeneralComp       
    : IGUAL       /*"="*/                               { $$ = $1; grafo.generarHijos($1); } 
	  | DIFERENTE   /*"!="*/                              { $$ = $1; grafo.generarHijos($1); }
	  | MENOR       /*"<"*/                               { $$ = $1; grafo.generarHijos($1); }
	  | MENORIG     /*"<="*/                              { $$ = $1; grafo.generarHijos($1); }
	  | MAYOR       /*">"*/                               { $$ = $1; grafo.generarHijos($1); }
	  | MAYORIG     /*">="*/                              { $$ = $1; grafo.generarHijos($1); }
;

AdditiveExpr
    : MultiplicativeExpr P_AdditiveExpr                 { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;}; grafo.generarPadre(2);grafo.generarPadre(1); grafo.generarHijos("MultiplicativeExpr", "P_AdditiveExpr"); }
;

P_AdditiveExpr
    : MAS MultiplicativeExpr P_AdditiveExpr             { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2;} grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr"); }
    | MENOS MultiplicativeExpr P_AdditiveExpr           { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2;} grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "MultiplicativeExpr", "P_AdditiveExpr");}
    |                                                   { $$ = null; grafo.generarHijos("ε"); }
;

MultiplicativeExpr
    : UnaryExpr P_MultiplicativeExpr                    { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;}; grafo.generarPadre(2);grafo.generarPadre(1); grafo.generarHijos("UnaryExpr", "P_MultiplicativeExpr"); }
;

P_MultiplicativeExpr
    : POR /* * */ UnaryExpr P_MultiplicativeExpr        { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | DIV /* div */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | IDIV /* idiv */ UnaryExpr P_MultiplicativeExpr    { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    | MOD /* mod */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; }; grafo.generarPadre(3);grafo.generarPadre(2); grafo.generarHijos($1, "UnaryExpr", "P_MultiplicativeExpr"); }
    |                                                   { $$ = null; grafo.generarHijos("ε"); }
;

UnaryExpr   
    : PathExpr                                          { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("PathExpr"); }
	  | MAS /*+*/ UnaryExpr                               { $$=new Unary($1, $2); grafo.generarPadre(2);grafo.generarHijos($1,"UnaryExp") }
	  | MENOS /*-*/ UnaryExpr                             { $$=new Unary($1, $2); grafo.generarPadre(2);grafo.generarHijos($1,"UnaryExp") }
;

PathExpr
    : BARRA SUB_BARRA                                   { $$ = $2; grafo.generarPadre(2); grafo.generarHijos($1, "SUB_BARRA"); }
    | DOBLEBARRA RelativePathExpr                       { $2[0].tipo=TipoPath.REL;$$=new PathExp($2); grafo.generarPadre(2); grafo.generarHijos($1, "RelativePathExpr");}
    | RelativePathExpr                                  { $$=new PathExp($1); grafo.generarPadre(1); grafo.generarHijos("RelativePathExpr"); }
;

SUB_BARRA
    : RelativePathExpr                                  { $1[0].tipo=TipoPath.ABS;$$=new PathExp($1); grafo.generarPadre(1); grafo.generarHijos("RelativePathExpr"); }
    |                                                   { $$=new PathExp([]); grafo.generarHijos("ε"); }
;

RelativePathExpr
    : StepExpr P_RelativePathExpr                       { $2.push($1); $2.reverse();  $$ = $2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("StepExpr", "P_RelativePathExpr"); }
;

P_RelativePathExpr
    : BARRA StepExpr P_RelativePathExpr                 { $$ = $3; $2.tipo = TipoPath.ABS; $$.push($2); 
                        grafo.generarPadre(3); grafo.generarPadre(2); grafo.generarHijos($1, "StepExpr", "P_RelativePathExpr"); }
    | DOBLEBARRA StepExpr P_RelativePathExpr            { $$ = $3; $2.tipo = TipoPath.REL; $$.push($2); 
                        grafo.generarPadre(3); grafo.generarPadre(2); grafo.generarHijos($1, "StepExpr", "P_RelativePathExpr"); }
    |                                                   { $$ = []; grafo.generarHijos("ε"); }
;

StepExpr    
    : PostfixExpr                                       { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("PostfixExpr"); }
    | AxisStep                                          { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("AxisStep"); }
;

AxisStep
    : ForwardStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("ForwardStep", "SUB_PredicateList"); }
    | ReverseStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("ReverseStep", "SUB_PredicateList");}
;

SUB_PredicateList
    : PredicateList                                     { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("PredicateList");}
    |                                                   { $$ = []; grafo.generarHijos("ε"); }
;


PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); $$.reverse(); grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("Predicate", "P_PredicateList"); }
;

P_PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("Predicate", "P_PredicateList"); }
    |                                                   { $$ = []; grafo.generarHijos("ε");}
;

ForwardStep 
  : AbbrevForwardStep    { $$=$1; grafo.generarPadre(1); grafo.generarHijos("AbbrevForwardStep"); }
  | ForwardAxis NameTest { $$=$1; $$.nombre=$2; grafo.generarPadre(2); grafo.generarPadre(1); grafo.generarHijos("ForwardAxis", "NameTest"); }
;

AbbrevForwardStep 
  : ARROBA NameTest { $$=new Atributo($2,[],TipoPath.ABS); grafo.generarPadre(2); grafo.generarHijos($1, "NameTest"); }
  | NameTest        { $$=new Camino($1,[],TipoPath.ABS); grafo.generarPadre(1); grafo.generarHijos("NameTest"); }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); }
  | RNAMESPACE DOBLEDOSPUNTOS     {  }
;

NodeTest    
  : NameTest                                { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("NameTest"); }
;

NameTest    
    : NOMBRE                                 { $$ = $1; grafo.generarHijos($1); }
	|  Wildcard                                { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("Wildcard"); }
;

Wildcard    
  : ASTERISCO                               { $$ = $1; grafo.generarHijos($1); }
;

ReverseStep 
  :  AbbrevReverseStep                      { $$=$1; grafo.generarPadre(1); grafo.generarHijos("AbbrevReverseStep"); }
  |  ReverseAxis NameTest                   { $$=$1; $$.nombre=$2; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ReverseAxis","NameTest") }
;

AbbrevReverseStep 
  : DOBLEPUNTO                              { $$=new CaminoInverso("*",[],TipoPath.ABS); grafo.generarHijos($1); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],Tipo.ABS); grafo.generarHijos($1,$2); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],Tipo.ABS); grafo.generarHijos($1,$2); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],Tipo.ABS); grafo.generarHijos($1,$2); }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],Tipo.ABS); grafo.generarHijos($1,$2)}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],Tipo,Tipo.ABS); grafo.generarHijos($1,$2); }
;

PostfixExpr   
  : PrimaryExpr SUB_PredicateList            { $$ = $1; $$.predicado = $2; 
        grafo.generarPadre(1); grafo.generarPadre(2); grafo.generarHijos("PrimaryExpr","SUB_PredicateList");}
;


Predicate   
  : CORA ExprSingle CORB                    { $$ = $2; grafo.generarPadre(2); grafo.generarHijos($1,"ExprSingle",$3);}
;

PrimaryExpr 
  : Literal                                 { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("Literal");}
	| FunctionCall                            { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("FunctionCall");}
	| ContextItemExpr                         { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("ContextItemExpr");}
	| ParenthesizedExpr                       { $$ = $1; grafo.generarPadre(1); grafo.generarHijos("ParenthesizedExpr");}
;

Literal     
  : INTEGER                                 { $$=new Literal(Tipo.INTEGER,$1); grafo.generarHijos($1); }
	| DECIMAL                                 { $$=new Literal(Tipo.DECIMAL,$1); grafo.generarHijos($1); }
	| CADENA                                  { $$=new Literal(Tipo.STRING,$1); grafo.generarHijos($1); }
;

FunctionCall
    : NOMBRE PARENTESISA PARENTESISC        { $$ = new CallFunction([],TipoPath.ABS,$1); grafo.generarHijos($1,$2,$3)}
;


ContextItemExpr   
    : PUNTO                                 { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); }
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=[]; grafo.generarHijos($1,$2) }
	| PARENTESISA ExprSingle PARENTESISC  { $$=$2; grafo.generarHijos($1,$2,$3) }
;	


