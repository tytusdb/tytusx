%{
  
  const {Tipo,TipoPath,Comando} = require("../analizadorXPath/AST/Entorno");
  const {Logical} = require("../analizadorXPath/Expresion/Logical");
  const {Arithmetic} = require("../analizadorXPath/Expresion/Arithmetics")
  const {Literal,PathExp,AbsoluthePath,RelativePath,PathExpElement,AxisStepExp} = require("../analizadorXPath/Expresion/Expresiones");
  const { ComparisonExp } = require('../analizadorXPath/Expresion/Comparison')
  const { Atributo,Camino,Child,Descendant,Attribute,Self,DescSelf,FollowSibling,Follow } = require('../analizadorXPath/Expresion/axes')
  const { CaminoInverso,Parent,Ancestor,PrecedingSibling,AncestorSelf } = require('../analizadorXPath/Expresion/axes')
  const { ContextItemExpr } = require('../analizadorXPath/Expresion/postfix')
  

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


.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS

%start XPath

%%

XPath 
    : Expr                                              { $$ = $1; }
;

Expr
    : ExprSingle P_Expr                                 { $$ = $2; $$.push($1); }
;

P_Expr
    : PIPE /*|*/ ExprSingle P_Expr                      { $$ = $3; $$,push($2); }
    |                                                   { $$ = []; }
;

ExprSingle  
  : OrExpr                                              { $$ = $1; }
;

OrExpr
    : AndExpr P_OrExpr                                  { if($2==null){$$=$1;}else{$$=new Logical($1,"or",$2);} }
;

P_OrExpr
    : ROR AndExpr P_OrExpr                              { if($3==null){$$=$2;}else{$$=new Logical($2,"or",$3);} }
    |                                                   { $$ = null; }
;

AndExpr
    : ComparisonExpr P_AndExpr                          { if($2==null){$$=$1;}else{$$=new Logical($1,"and",$2);} }
;

P_AndExpr
    : RAND /*and*/ ComparisonExpr P_AndExpr             { if($3==null){$$=$2;}else{$$=new Logical($2,"and",$3);} }
    |                                                   { $$ = null }
;

ComparisonExpr
    : AdditiveExpr SUB_AdditiveExpr                     { if($3==null){$$=$1;}else{$$=$2; $$.izq = $1;} }
;

SUB_AdditiveExpr
    : GeneralComp AdditiveExpr                          { $$ = new ComparisonExp(null,$2,$3); }
    |                                                   { $$ = null; }
;

GeneralComp       
    : IGUAL       /*"="*/                               { $$ = $1; }
	  | DIFERENTE   /*"!="*/                              { $$ = $1; }
	  | MENOR       /*"<"*/                               { $$ = $1; }
	  | MENORIG     /*"<="*/                              { $$ = $1; }
	  | MAYOR       /*">"*/                               { $$ = $1; }
	  | MAYORIG     /*">="*/                              { $$ = $1; }
;

AdditiveExpr
    : MultiplicativeExpr P_AdditiveExpr                 { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;} }
;

P_AdditiveExpr
    : MAS MultiplicativeExpr P_AdditiveExpr             { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; } }
    | MENOS MultiplicativeExpr P_AdditiveExpr           { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2;} }
    |                                                   { $$ = null; }
;

MultiplicativeExpr
    : UnaryExpr P_MultiplicativeExpr                    { if($2==null){$$=$1;}else{$$=$2; $$.izq = $1;} }
;

P_MultiplicativeExpr
    : POR /* * */ UnaryExpr P_MultiplicativeExpr        { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; } }
    | DIV /* div */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; } }
    | IDIV /* idiv */ UnaryExpr P_MultiplicativeExpr    { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; } }
    | MOD /* mod */ UnaryExpr P_MultiplicativeExpr      { if($3==null){$$=new Arithmetic(null,$1,$2);}else{$$ = $3; $$.izq = $2; } }
    |                                                   { $$ = null; }
;

UnaryExpr   
    : PathExpr                                          { $$ = $1; }
	  | MAS /*+*/ UnaryExpr                               {  }
	  | MENOS /*-*/ UnaryExpr                             {  }
;

PathExpr
    : BARRA SUB_BARRA                                   { $$ = $2; }
    | DOBLEBARRA RelativePathExpr                       { $2[0].tipo=TipoPath.REL;$$=new PathExp($2); }
    | RelativePathExpr                                  { $$=new PathExp($1); }
;

SUB_BARRA
    : RelativePathExpr                                  { $1[0].tipo=TipoPath.ABS;$$=new PathExp($1); }
    |                                                   { $$=new PathExp([]); }
;

RelativePathExpr
    : StepExpr P_RelativePathExpr                       { $2.push($1); $$ = $2; }
;

P_RelativePathExpr
    : BARRA StepExpr P_RelativePathExpr                 { $$ = $3; $2.tipo = TipoPath.ABS; $$.push($2); }
    | DOBLEBARRA StepExpr P_RelativePathExpr            { $$ = $3; $2.tipo = TipoPath.REL; $$.push($2);}
    |                                                   { $$ = []; }
;

StepExpr    
    : PostfixExpr                                       { $$ = $1; }
    | AxisStep                                          { $$ = $1; }
;

AxisStep
    : ForwardStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; }
    | ReverseStep SUB_PredicateList                       { $$ = $1; $$.predicado = $2; }
;

SUB_PredicateList
    : PredicateList                                     { $$ = $1; }
    |                                                   { $$ = []; }
;


PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); }
;

P_PredicateList
    : Predicate P_PredicateList                         { $$ = $2; $$.push($1); }
    |                                                   { $$ = []; }
;

ForwardStep 
  : AbbrevForwardStep    { $$=$1; }
  | ForwardAxis NameTest { $$=$1; $$.nombre=$2; }
;

AbbrevForwardStep 
  : ARROBA NameTest { $$=new Atributo($2,[],TipoPath.ABS); }
  | NameTest        { $$=new Camino($1,[],TipoPath.ABS); }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); }
  | RNAMESPACE DOBLEDOSPUNTOS     {  }
;

NodeTest    
  : NameTest                                { $$ = $1; }
;

NameTest    
    : NOMBRE                                { $$ = $1; }
	| Wildcard                                { $$ = $1; }
;

Wildcard    
  : ASTERISCO                               { $$ = $1; }
;

ReverseStep 
  :  AbbrevReverseStep                      { $$=$1; }
  |  ReverseAxis NameTest                   { $$=$1; $$.nombre=$2;  }
;

AbbrevReverseStep 
  : DOBLEPUNTO                              { $$=new CaminoInverso("*",[],TipoPath.ABS); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],Tipo.ABS); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],Tipo.ABS); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],Tipo.ABS); }
  | RPRECED DOBLEDOSPUNTOS            {  }
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],Tipo,Tipo.ABS); }
;

PostfixExpr   
  : PrimaryExpr SUB_PredicateList            { $$ = $1; $$.predicado = $2; }
;


Predicate   
  : CORA ExprSingle CORB                    { $$ = $2; }
;

PrimaryExpr 
  : Literal                                 { $$ = $1; }
	| FunctionCall                            { $$ = $1; }
	| ContextItemExpr                         { $$ = $1; }
	| ParenthesizedExpr                       { $$ = $1; }
;

Literal     
  : INTEGER                                 { $$=new Literal(Tipo.INTEGER,$1); }
	| DECIMAL                                 { $$=new Literal(Tipo.DECIMAL,$1);) }
	| CADENA                                  { $$=new Literal(Tipo.STRING,$1); }
;

FunctionCall
    : NOMBRE PARENTESISA SUB_FunctionCall   { $$ = $1+$2+$3; }
;

SUB_FunctionCall
    : PARENTESISC                           { $$ = $1; }
    | ArgumentList PARENTESISC              { $$ = $1+$2; }
;

ArgumentList
    : Argument P_ArgumentList               { $$ = $1 + $2; }
;

P_ArgumentList
    : COMA Argument P_ArgumentList          { $$ = $1+$2+$3 }
    |                                       {  }
;

Argument    
    : ExprSingle                            { $$ = $1; }
	  | INTERROGACIONC                        { $$ = $1; }
;

ContextItemExpr   
    : PUNTO                                 { $$=new ContextItemExpr([],TipoPath.ABS); }
;

ParenthesizedExpr 
    : PARENTESISA SUB_ParenthesizedExpr     { $$ = $1+$2;  }
;

SUB_ParenthesizedExpr
    : PARENTESISC                           { $$ = $1; }
    | Expr PARENTESISC                      { $$ = $3; }
;


