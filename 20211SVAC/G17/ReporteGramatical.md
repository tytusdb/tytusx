# XPath

**<XPath>** ::= <Expr>

**<Expr>** ::= <ExprSingle> 
| <Expr> "|" <ExprSingle>

**<ExprSingle>** :: <OrExpr>

**<OrExpr>** ::= <AndExpr> 
| <OrExpr> "or" <AndExpr>

**<AndExpr>** ::= <ComparisonExpr>
| <AndExpr> "and" <ComparisonExpr>

**<ComparisonExpr>** ::= <AdditiveExpr>
| <AdditiveExpr> <GeneralComp> <AdditiveExpr> 

**<GeneralComp>** ::= "=" 
| "!=" 
| "<"
| "<="
| ">"
| ">="

**<AdditiveExpr>** ::= <MultiplicativeExpr>
| <AdditiveExpr> "+" <MultiplicativeExpr>
| <AdditiveExpr> "-" <MultiplicativeExpr>

**<MultiplicativeExpr>** ::= <UnaryExpr>
| <MultiplicativeExpr> "*"   <UnaryExpr>
| <MultiplicativeExpr> "div" <UnaryExpr>
| <MultiplicativeExpr> "idiv"<UnaryExpr>
| <MultiplicativeExpr> "mod" <UnaryExpr>

<UnaryExpr>
  : <PathExpr>
| "+" <UnaryExpr>
| "-" <UnaryExpr>
 
**<PathExpr>** ::= "/" <RelativePathExpr>
| "//" <RelativePathExpr>
| <RelativePathExpr>
| "/"

**<RelativePathExpr>** ::= <StepExpr>
| <RelativePathExpr> "/" <StepExpr>
| <RelativePathExpr> "//" <StepExpr>
 
**<StepExpr>** ::= <PostfixExpr>
| <AxisStep>

**<AxisStep>** ::= <ReverseStep>
| <ForwardStep>     
| <ReverseStep> <PredicateList>
  

**<PredicateList>** ::= <Predicate>
| <PredicateList> <Predicate>
 

**<ForwardStep>** ::= <AbbrevForwardStep>
| <ForwardAxis> <NameTest> 
  

**<AbbrevForwardStep>** ::= "@" <NameTest>
| <NameTest>        
  

**<ForwardAxis>** ::= "child" "::"
| "descendant" "::"            
| "attribute" "::"
| "self" "::"
| "descendant-or-self" "::"
| "following-sibling" :: 
| "following" "::"       
| "namespace" "::"


**<NodeTest>** ::= <NameTest>

**<NameTest>** ::= NOMBRE
| "*"       

**<ReverseStep>** ::= <AbbrevReverseStep>
| <ReverseAxis> <NameTest>
  

**<AbbrevReverseStep>** ::= ".."

**<ReverseAxis>** ::= "parent" "::" 
  | "ancestor" "::"
  | "preceding-sebling" "::"
  | "preceding" "::"
  | "ancestor-or-self" "::"

**<PostfixExpr>** ::= <PrimaryExpr>

**<Predicate>** ::= "[" <ExprSingle> "]"

**<PrimaryExpr>** ::= <Literal>                  
| <FunctionCall>          
| <ContextItemExpr>       
| <ParenthesizedExpr>         
    
**<Literal>** ::= <INTEGER>

**<FunctionCall>** ::= NOMBRE "(" ")"

**<ContextItemExpr>** ::= "."

**<ParenthesizedExpr>** ::= "(" ")"
| "(" <ExprSingle> ")"


# XML

**<ini>** ::= <CUERPO>	

**<CUERPO>** ::= <LISTA_OBJETO> <EOF>	
| <ETIQUETACONFIGURACION> <LISTA_OBJETO> <EOF>			
		
**<LISTA_OBJETO>** ::= <LISTA_OBJETO> <OBJETO>			| <OBJETO>											  
  
**<OBJETO>** ::= <OBJETODOBLE>
  	| <OBJETOSIMPLE>
 	| Texto 											  
  
**<OBJETODOBLE>** ::= <ETIQUETAABRE> <ETIQUETACIERRE>				| <ETIQUETAABRE> <LISTA_OBJETO> <ETIQUETACIERRE> 			

**<ETIQUETACONFIGURACION>** ::= InicioEtiquetaConf 

**<LISTA_ATRIBUTOSCONF>** "?>" 	
    | InicioEtiquetaConf "?>"  
  
**<LISTA_ATRIBUTOSCONF>** ::= <LISTA_ATRIBUTOSCONF> <ATRIBUTOCONF>       	
     | <ATRIBUTOCONF>            
    
**<ATRIBUTOCONF>** ::= AtributoConf "=" ValorAtributoConf  
    

**<ETIQUETAABRE>** ::= InicioEtiquetaI ">"
| InicioEtiquetaI <LISTA_ATRIBUTOS> ">"  
    
**<ETIQUETACIERRE>** ::= InicioEtiquetaC ">"					
    
**<OBJETOSIMPLE>** ::= InicioEtiquetaI ">"
| InicioEtiquetaI <LISTA_ATRIBUTOS> "/>" 
    
**<LISTA_ATRIBUTOS>** ::= <LISTA_ATRIBUTOS> <ATRIBUTO>
| <ATRIBUTO>
    
**<ATRIBUTO>** ::= AtributoEtiqueta "=" ValorAtributo

