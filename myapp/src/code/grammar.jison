/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

","         return 'COMA'
"$"         return 'DOLAR'
"{"         return 'LLAVEA'
"}"         return 'LLAVEC'
"return"    return 'RRETURN'
"for"       return 'RFOR'
"in"        return 'RIN'
"let"       return 'RLET'
":="        return 'IGUAL'
"some"      return 'RSOME'
"every"     return 'REVERY'
"satisfies" return 'RSATISFIES'
"if"        return 'RIF'
"("         return 'PARA'
")"         return 'PARC'
"["			return "CORA"
"]"			return "CORC"
"then"      return 'RTHEN'
"else"      return 'RELSE'
"or"        return 'ROR'
"and"       return 'RAND'
"||"        return 'SIM_OR'
"to"        return 'RTO'
"+"         return 'MAS'
"-"         return 'MENOS'
"*"         return 'MUL'
"div"       return 'DIV'
"idiv"      return 'IDIV'
"mod"       return 'MOD'
"union"     return 'RUNION'
"|"         return 'PIPE'
"intersect" return 'RINTERSECT'
"except"    return 'REXCEPT'
"instance"  return 'RINSTANCE'
"of"     return 'ROF'
"treat"     return 'RTREAT'
"as"     return 'RAS'
"castable"  return 'RCASTABLE'
"cast"      return 'RCAST'
"=>"        return 'FLECHA'
"-"         return 'MENOS'
"+"         return 'MAS'
"="         return 'IGUALACION'
"!="        return 'DIFERENTE'
"<"         return 'MENORQUE'
"<="        return 'MENORIGUAL'
">"         return 'MAYORQUE'
">="     	return 'MAYORIGUAL'
"eq"        return 'EQ'
"ne"        return 'NE'
"lt"        return 'LT'
"le"        return 'LE'
"gt"        return 'GT'
"ge"        return 'GE'
"is"        return 'IS'
"<<"        return 'RBACKWARD'
">>"        return 'RFORWARD'
"!"         return 'ADMIRACION'
"/"         return 'BARRA'
"/\/"       return 'DOBLEBARRA'
"child"     return 'RCHILD'
"::"        return 'DOBLEDOSPUNTOS'
":"			return 'DOSPUNTOS'
"descendant"    return 'RDESCENDANT'
"attribute"     return 'RDESCENDANT'
"self"          return 'RSELF'
"descendant-or-self"    return 'RDESCENDANT-OR-RSELF'
"following-sibling"     return 'RFOLLOWING-SIBLING'
"following"             return 'RFOLLOWING'
"namespace"             return 'RNAMESPACE'
"@"                     return 'ARROBA'
"parent"                return 'RPARENT'
"ancestor"              return 'RANCESTOR'
"preceding-sibling"     return 'RPRECEDING-SIBLING'
"preceding"             return 'RPRECEDING'
"ancestor-or-self"      return 'RANCESTOR-OR-RSELF'
".."   return 'DOBLEPUNTO'
":*"   return 'DOSPUNTOS_AST'
"*:"    return 'AST_DOSPUNTOS'
"?"     return 'QUESTION'
"."     return 'PUNTO'
"#"     return 'NUMERAL'
'"'     return 'EscapeQuot'
"'"     return 'EscapeApos'
"map"   return 'RMAP'
"array" return 'RARRAY'
"empty-sequence"    return 'REMPTY-SEQUENCE'
"node"             return 'RNODE'
"document-node"     return 'RDOCUMENT-RNODE'
"text"              return 'RTEXT'
"comment"         return 'RCOMMENT'
"namespace-node" return 'RNAMESPACE-RNODE'
"processing-instruction" return 'RPROCESSING-INSTRUCTION'
"attribute"                 return 'RATTRIBUTE'
"schema-attribute"          return 'RSCHEMA-RATTRIBUTE'
"element"                   return 'RELEMENT'
"schema-element"            return 'RSCHEMA-RELEMENT'
"function"					return "RFUNCTION"
"item"						return "RITEM"

/* Espacios en blanco */
[ \r\t]+{}
\n{}


[0-9]+                                                                      	return 'Digits'
("."[0-9]+)|([0-9]+"."[0-9]*)                                        			return 'DecimalLiteral'
(("."[0-9]+)|([0-9]+("."[0-9]*)?))[eE][+-]?[0-9]+               				return 'DoubleLiteral'
(('"'('""'|[^"])*'"')|("'"("''"|[^'])*"'"))                     				return 'StringLiteral'		
"(:"(([a-zA-Z]+-([a-zA-Z]*('(:'|':)')[a-zA-Z]*)))*":)"              			{}
([a-zA-Z]+-([a-zA-Z]*('(:'|':)')[a-zA-Z]*))                         			{}
[:A-Z_a-z]([:a-zA-Z0-9"."-])*([:][:A-Z_a-z]([:a-zA-Z0-9"."-])*)?            			return 'QName' /* xgc: xml-version */	
("Q""{"[^{}]*"}")[:A-Z_a-z]([:a-zA-Z0-9"."-])*([:][:A-Z_a-z]([:a-zA-Z0-9"."-])*)?	return 'URIQualifiedName'			

<<EOF>>return 'EOF';

.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left 'COMA'
%nonassoc 'RFOR' 'RLET' 'RSOME' 'REVERY' 'RIF'
%left 'ROR'
%left 'RAND'
%nonassoc 'EQ' 'NE' 'LT' 'LE' 'GT' 'GE' 'IGUALACION' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL' 'IS' 'RFORWARD' 'RBACKWARD'
%left 'SIM_OR'
%nonassoc 'RTO'
%left 'MAS' 'MENOS'
%left 'MUL' 'DIV' 'IDIV' 'MOD'
%left 'RUNION' 'PIPE'
%left 'RINTERSECT' 'REXCEPT'
%nonassoc 'RINSTANCE'
%nonassoc 'RTREAT'
%nonassoc 'RCASTABLE'
%nonassoc 'RCAST'
%left 'FLECHA'
%left 'MENOS'
%right UMENOS UMAS
%left 'ADMIRACION'
%left 'BARRA' 'DOBLEBARRA'
%left 'CORA' 'CORC' 'QUESTION'
%nonassoc UQUESTION


%start XPath

%% /* Definición de la gramática */

XPath	   		: Expr
;	

ParamList		: Param	
				| ParamList COMA Param 
;



Param	   		: DOLAR EQName TypeDeclaration	
				| DOLAR EQName 
;

FunctionBody	: EnclosedExpr	
;

EnclosedExpr	: LLAVEA Expr LLAVEC	
				| LLAVEA LLAVEC
;

Expr			: ExprSingle	
				| Expr COMA ExprSingle
;

ExprSingle	   	: ForExpr
				| OrExpr	
;

ForExpr	   		: SimpleForClause RRETURN ExprSingle	
;

SimpleForClause		: RFOR SimpleForBinding 
					| SimpleForClause COMA SimpleForBinding
;

SimpleForBinding	: DOLAR VarName RIN ExprSingle	
;

SimpleLetClause	   	: RLET SimpleLetBinding 
					| SimpleLetClause COMA SimpleLetBinding
;

SimpleLetBinding	: DOLAR VarName IGUAL ExprSingle	
;

QuantifiedExpr		: RSOME QuantifiedExprL RSATISFIES ExprSingle
					| REVERY QuantifiedExprL RSATISFIES ExprSingle
;

QuantifiedExprL		: DOLAR VarName RIN ExprSingle 
					| QuantifiedExprL DOLAR VarName RIN ExprSingle
;

IfExpr	   			: RIF PARA Expr PARC RTHEN ExprSingle RELSE ExprSingle	
;

OrExpr	   			: AndExpr 
					| OrExpr ROR AndExpr
;

AndExpr	   			: ComparisonExpr
					| AndExpr RAND ComparisonExpr
;

ComparisonExpr	   	: StringConcatExpr ComparisonExprA StringConcatExpr
					| StringConcatExpr	
;

ComparisonExprA		: ValueComp
					| GeneralComp
					| NodeComp
;

StringConcatExpr	: RangeExpr 
					| StringConcatExpr SIM_OR RangeExpr
;

RangeExpr	   		: AdditiveExpr 	
					| AdditiveExpr RTO AdditiveExpr
;

AdditiveExpr	   	: MultiplicativeExpr 
					| AdditiveExpr MAS MultiplicativeExpr
					| AdditiveExpr MENOS MultiplicativeExpr 	
;

MultiplicativeExpr	: UnionExpr 
					| MultiplicativeExpr MUL UnionExpr
					| MultiplicativeExpr IDIV UnionExpr
					| MultiplicativeExpr DIV UnionExpr
					| MultiplicativeExpr MOD UnionExpr
;

UnionExpr	   		: IntersectExceptExpr 	
					| UnionExpr RUNION IntersectExceptExpr
					| UnionExpr PIPE IntersectExceptExpr
;

IntersectExceptExpr	: InstanceofExpr	
					| IntersectExceptExpr RINTERSECT InstanceofExpr
					| IntersectExceptExpr REXCEPT InstanceofExpr
;

InstanceofExpr	   	: TreatExpr 
					| TreatExpr RINSTANCE ROF SequenceType
;

TreatExpr	   		: CastableExpr
					| CastableExpr RTREAT RAS SequenceType  	
;

CastableExpr	   	: CastExpr 
					| CastExpr RCASTABLE RAS SingleType
;

CastExpr	   		: ArrowExpr 	
					| ArrowExpr RCAST RAS SingleType
;

ArrowExpr	   		: UnaryExpr 
					| ArrowExpr FLECHA ArrowFunctionSpecifier ArgumentList	
;

UnaryExpr	   		: ValueExpr
					| MENOS ValueExpr %proc UMENOS
					| MAS ValueExpr %proc UMAS
					| MENOS UnaryExpr %proc UMENOS
					| MAS UnaryExpr	%proc UMAS
;

ValueExpr	   		: SimpleMapExpr	
;

GeneralComp	   		: IGUALACION 		
					| DIFERENTE 		
					| MENORQUE 		
					| MENORIGUAL 		
					| MAYORQUE 		
					| MAYORIGUAL	
;

ValueComp	   		: EQ 		
					| NE 		
					| LT 		
					| LE 		
					| GT 		
					| GE	
;

NodeComp	   		: IS 		
					| RBACKWARD 		
					| RFORWARD	
;

SimpleMapExpr	   	: PathExpr	
					| SimpleMapExpr ADMIRACION PathExpr
;

PathExpr	   		: BARRA
					| BARRA RelativePathExpr
					| DOBLEBARRA RelativePathExpr
					| RelativePathExpr	/* xgc: leading-lone-slash */
;

RelativePathExpr	: StepExpr 
					| RelativePathExpr BARRA StepExpr
					| RelativePathExpr DOBLEBARRA StepExpr
;

StepExpr	   		: PostfixExpr 		
					| AxisStep	
;

AxisStep	   		: ReverseStep PredicateList
					| ForwardStep PredicateList
;

ForwardStep	   		: ForwardAxis NodeTest 		
					| AbbrevForwardStep	
;

ForwardAxis	   		: RCHILD DOBLEDOSPUNTOS
					| RDESCENDANT DOBLEDOSPUNTOS
					| RATTRIBUTE DOBLEDOSPUNTOS
					| RSELF DOBLEDOSPUNTOS
					| RDESCENDANT-OR-RSELF DOBLEDOSPUNTOS
					| RFOLLOWING-SIBLING DOBLEDOSPUNTOS
					| RFOLLOWING DOBLEDOSPUNTOS
					| RNAMESPACE DOBLEDOSPUNTOS	
;

AbbrevForwardStep	: ARROBA NodeTest	
					| NodeTest
;

ReverseStep	   		: ReverseAxis NodeTest 		
					| AbbrevReverseStep	
;

ReverseAxis	   		: RPARENT DOBLEDOSPUNTOS
					| RANCESTOR DOBLEDOSPUNTOS
					| RPRECEDING-SIBLING DOBLEDOSPUNTOS
					| RPRECEDING DOBLEDOSPUNTOS
					| RANCESTOR-OR-RSELF DOBLEDOSPUNTOS	
;

AbbrevReverseStep	: DOBLEPUNTO	
;

NodeTest	   		: KindTest 		
					| NameTest
;

NameTest	  		: EQName 		
					| Wildcard	
;

Wildcard	   		: MUL
					| NCName DOSPUNTOS_AST
					| AST_DOSPUNTOS NCName
					| BracedURILiteral MUL	/* ws: explicit */
;

PostfixExpr	   		: PrimaryExpr
					| PostfixExpr Predicate
					| PostfixExpr ArgumentList
					| PostfixExpr Lookup
;

ArgumentList	   	: PARA ArgumentList_L PARC	
					| PARA PARC
;

ArgumentList_L		: Argument
					| ArgumentList_L COMA Argument
;

PredicateList	   	: Predicate
					| PredicateList Predicate	
;

Predicate	   		: CORA Expr CORC	
;

Lookup	   			: QUESTION KeySpecifier	
;

KeySpecifier	   	: NCName 		
					| IntegerLiteral 		
					| ParenthesizedExpr 		
					| MUL	
;

ArrowFunctionSpecifier	: EQName 		
						| VarRef 		
						| ParenthesizedExpr	
;

PrimaryExpr	   		: Literal
					| VarRef
					| ParenthesizedExpr
					| ContextItemExpr
					| FunctionCall
					| FunctionItemExpr
					| MapConstructor
					| ArrayConstructor
					| UnaryLookup	
;

Literal	   				: NumericLiteral 		
						| StringLiteral	
;

NumericLiteral	   		: IntegerLiteral 		
						| DecimalLiteral 		
						| DoubleLiteral	
;

VarRef	   				: DOLAR VarName	
;

VarName	   				: EQName	
;

ParenthesizedExpr		: PARA Expr PARC	
						| PARA PARC
;

ContextItemExpr	   		: PUNTO	
;

FunctionCall	   		: EQName ArgumentList	/* xgc: reserved-function-names */
;

/* gn: parens */
Argument	   			: ExprSingle 		
						| ArgumentPlaceholder	
;

ArgumentPlaceholder		: QUESTION	
;

FunctionItemExpr		: NamedFunctionRef 		
						| InlineFunctionExpr	
;

NamedFunctionRef		: EQName NUMERAL IntegerLiteral	/* xgc: reserved-function-names */
;

InlineFunctionExpr		: RFUNCTION PARA ParamList PARC RAS SequenceType FunctionBody
						| RFUNCTION PARA ParamList PARC FunctionBody	
						| RFUNCTION PARA PARC RAS SequenceType FunctionBody
						| RFUNCTION PARA PARC FunctionBody
;

MapConstructor	   		: RMAP LLAVEA MapConstructorL LLAVEC	
						| RMAP LLAVEA LLAVEC
;

MapConstructorL   		: MapConstructorEntry
						| MapConstructorL COMA MapConstructorEntry
;

MapConstructorEntry		: MapKeyExpr DOSPUNTOS MapValueExpr	
;

MapKeyExpr				: ExprSingle	
;

MapValueExpr			: ExprSingle	
;

ArrayConstructor		: SquareArrayConstructor 		
						| CurlyArrayConstructor	
;

SquareArrayConstructor	: CORA ExprSingleL CORC	
						| CORA CORC
;

ExprSingleL				: ExprSingle
						| ExprSingleL COMA ExprSingle
;

CurlyArrayConstructor	: RARRAY EnclosedExpr	
;

UnaryLookup	   			: QUESTION KeySpecifier	%proc UQUESTION
;

SingleType	   			: SimpleTypeName QUESTION
						| SimpleTypeName 	
;

TypeDeclaration	  		: RAS SequenceType	
;

SequenceType	   		: REMPTY-SEQUENCE PARA PARC
						| ItemType OccurrenceIndicator
						| ItemType 	
;

OccurrenceIndicator	   	: QUESTION 		
						| MUL 		
						| MAS	/* xgc: occurrence-indicators */
;

ItemType	   			: KindTest 		
						| RITEM PARA PARC 		
						| FunctionTest 		
						| MapTest 		
						| ArrayTest 		
						| AtomicOrUnionType 		
						| ParenthesizedItemType	
;

AtomicOrUnionType	   	: EQName	
;

KindTest	  			: DocumentTest
						| ElementTest
						| AttributeTest
						| SchemaElementTest
						| SchemaAttributeTest
						| PITest
						| CommentTest
						| TextTest
						| NamespaceNodeTest
						| AnyKindTest	
;

AnyKindTest	  	 	: RNODE PARA PARC	
;

DocumentTest	   	: RDOCUMENT-RNODE PARA SchemaElementTest PARC	
					| RDOCUMENT-RNODE PARA ElementTest  PARC
					| RDOCUMENT-RNODE PARA PARC
;

TextTest	   		: RTEXT PARA PARC	
;

CommentTest	   		: RCOMMENT PARA PARC	
;

NamespaceNodeTest	: RNAMESPACE-RNODE PARA PARC	
;

PITest	   			: RPROCESSING-INSTRUCTION PARA NCName PARC	
					| RPROCESSING-INSTRUCTION PARA StringLiteral PARC
					| RPROCESSING-INSTRUCTION PARA PARC
;

AttributeTest	   	: RATTRIBUTE PARA AttribNameOrWildcard COMA TypeName PARC
					| RATTRIBUTE PARA AttribNameOrWildcard PARC
					| RATTRIBUTE PARA PARC
;

AttribNameOrWildcard	: AttributeName 		
						| MUL	
;

SchemaAttributeTest	   	: RSCHEMA-RATTRIBUTE PARA AttributeDeclaration PARC	
;

AttributeDeclaration	: AttributeName	
;

ElementTest	   			: RELEMENT PARA ElementNameOrWildcard COMA TypeName QUESTION PARC
						| RELEMENT PARA ElementNameOrWildcard COMA TypeName PARC
						| RELEMENT PARA ElementNameOrWildcard PARC
						| RELEMENT PARA PARC
;

ElementNameOrWildcard	: ElementName 		
						| MUL	
;

SchemaElementTest	   	: RSCHEMA-RELEMENT PARA ElementDeclaration PARC	
;

ElementDeclaration	   	: ElementName	
;

AttributeName	   		: EQName	
;

ElementName	   		: EQName	
;

SimpleTypeName	   	: TypeName	
;

TypeName	   		: EQName	
;

FunctionTest	   	: AnyFunctionTest
					| TypedFunctionTest	
;

AnyFunctionTest	   	: RFUNCTION PARA MUL PARC	
;

TypedFunctionTest	: RFUNCTION PARA SequenceTypeL PARC RAS SequenceType	
					| RFUNCTION PARA PARC RAS SequenceType	
;

SequenceTypeL		: SequenceType
					| SequenceTypeL COMA SequenceType
;

MapTest	   			: AnyMapTest 		
					| TypedMapTest
;
	
AnyMapTest	   		: RMAP PARA MUL PARC	
;

TypedMapTest	   	: RMAP PARA AtomicOrUnionType COMA SequenceType PARC	
;

ArrayTest	   		: AnyArrayTest 		
					| TypedArrayTest	
;

AnyArrayTest	   	: RARRAY PARA MUL PARC	
;

TypedArrayTest	   	: RARRAY PARA SequenceType PARC	
;

ParenthesizedItemType	: PARA ItemType PARC	
;

EQName	   			: QName 	
					| URIQualifiedName
;