
/* Importacion */


%{
    /*const { Nodo } = require("../dist/xpath/instrucciones/Nodo");   
    const { Expresion } = require("../dist/xpath/instrucciones/Expresion"); 
    const { Predicado } = require("../dist/xpath/instrucciones/Predicado");    
    const { Wildcard } = require("../dist/xpath/instrucciones/Wildcard");    
    const { Axes } = require("../dist/xpath/instrucciones/Axes");    
    const { AxesPredicado } = require("../dist/xpath/instrucciones/AxesPredicado");    
    const { AST_XPATH } = require("../dist/xpath/ast/AST_XPATH");  
    const { Error } = require("../dist/xpath/reportes/Error");  */

    var list_error = [];
     //REPORTE DE ERRORES
    function addError(tipo, descripcion, line, column) {
        let gramatica = new Error(tipo,descripcion,line,column);
        //list_error.push(error);
    }
    
%}



/* Definición Léxica */
%lex
%%
\s+
 
","                                 return 't_coma';


"for"                               return 't_for';
"let"                               return 't_let';
"some"                              return 't_some';
"every"                             return 't_every';
"if"                                return 't_if';

"or"                                return 't_or';

"and"                               return 't_and';


"eq"                                return 't_eq';
"ne"                                return 't_ne';
"lt"                                return 't_lt';
"le"                                return 't_le';
"gt"                                return 't_gt';
"ge"                                return 't_ge';
"="					                return 't_igual';
"!"                                 return 't_diferente';
"<"					                return 't_menor_que';
">"					                return 't_mayor_que';
"is"                                return 't_is';

"::"                                return 't_doble_dos_puntos';
"||"                                return 't_doble_barra';
"|"                                 return 't_barra';

"to"                                return 't_to';

"+"					                return 't_suma';
"-"					                return 't_resta';

"*"                                 return 't_multiplicacion';
"div"                               return 't_div';
"idiv"                              return 't_idiv';
"mod"                               return 't_mod';

"union"                             return 't_union';


"except"                            return 't_except';

"instance"                          return 't_instance';
"of"                                return 't_of';

"treat"                             return 't_treat';
"as"                                return 't_as';

"castable"                          return 't_castable';

"cast"                              return 't_cast';

"//"				                return 't_doble_diagonal';
"/"					                return 't_diagonal';
":"                                 return 't_dos_puntos';
".."					            return 't_doble_punto';
"."					                return 't_punto';
"@"					                return 't_arroba';
"["					                return 't_corchete_izquierdo';
"]"                                 return 't_corchete_derecho';
"("					                return 't_parentesis_izquierdo';
")"					                return 't_parentesis_derecho';
"{"					                return 't_llave_izquierda';
"}"					                return 't_llave_derecha';


'"'                                 return 't_comillas';
"'"                                 return 't_comilla';
"$"                                 return 't_dolar';

"%"					                return 't_modulo';
"#"					                return 't_numeral';

"return"                            return 't_return';

"in"                                return 't_in';

"satisfies"                         return 't_satisfies';

"then"                              return 't_then';
"else"                              return 't_else';

"child"                             return 't_child';
"descendant"                        return 't_descendant';
"attribute"                         return 't_attribute';
"self"                              return 't_self';
"descendant-or-self"                return 't_descendant-or-self';
"following-sibling"                 return 't_following-sibling';
"following"                         return 't_following';
"namespace"                         return 't_namespace';
"parent"                            return 't_parent';
"ancestor"                          return 't_ancestor';
"preceding-sibling"                 return 't_preceding_sibling';
"preceding-sibling"                 return 't_preceding-sibling';
"preceding"                         return 't_preceding';
"ancestor-or-self"                  return 't_ancestor_or_self';
"function"                          return 't_function';
"map"                               return 't_map';
"array"                             return 't_array';
"empty-sequence"                    return 't_empty-sequence';
"item"                              return 't_item';
"node"                              return 't_node';
"text"                              return 't_text';
"document-node"                     return 't_document-node';
"comment"                           return 't_comment';
"namespace-node"                    return 't_namespace-node';
"processing-instruction"            return 't_processing-instruction';
"schema-attribute"                  return 't_schema-attribute';
"element"                           return 't_element';
"schema-element"                    return 't_schema-element';
"?"                                 return 't_interrogacion';
"Q"                                 return 't_Q';
"x"                                 return 't_doble_comillas';
"y"                                 return 't_doble_comilla';
"not"                               return 't_not';



(([0-9]+"."[0-9]+)|(".[0-9]+"))     return 'DecimalLiteral';
[0-9]+                              return 'IntegerLiteral';
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'StringLiteral';

<<EOF>>				                return 'EOF';

.					                {  addError(`Error léxico`,`No se esperaba ${yytext}`,yylloc.first_line, yylloc.first_column); }

/lex



/* Asociación de operadores y precedencia */


%left 't_coma'
%left 't_or'
%left 't_and'
%left 't_doble_barra'
%left 't_doble_diagonal'
%left 't_diagonal'
%left 't_barra'
%left 't_or'
%left 't_suma' 't_resta'
%left 't_multiplicacion' 't_div' 't_idiv' 't_mod'
%left 't_union' t_barra
%left 't_intersect' 't_except' 
%left 't_interrogacion'
%left 't_diagonal'
%left 't_corchete_izquierdo' 't_corchete_derecho' 't_interrogacion'

%left 'UMINUS'

%start INICIO

%% /* Definición de la gramática */



INICIO :
XPath EOF                    
    { 
        var root = new AST_XPATH($1);
        return root; 
    }
    ;


XPath	   :   	Expr	  {$$ = new Expresion($1, @1.first_line, @1.first_column);}
;


FunctionBody	   :   	EnclosedExpr	{ $$ = $1; }
;

EnclosedExpr	   :   	t_llave_izquierda Expr t_llave_derecha	 { $$ = $2; }
    |t_llave_izquierda t_llave_derecha	
;


Expr	   :  Expr_recursivo 	ExprSingle    
;

Expr_recursivo :
    Expr_recursivo 
    |t_coma ExprSingle          
    |
    ;

ExprSingle	   :
 IfExpr
 |OrExpr             
;

IfExpr	   :   	t_if t_parentesis_izquierdo Expr t_parentesis_derecho t_then ExprSingle t_else ExprSingle 
;

OrExpr	   :   	AndExpr OrExpr_recursivo             
;

OrExpr_recursivo : 
    OrExpr_recursivo 
    |t_or AndExpr                          
    |
    ;

AndExpr	   :   	ComparisonExpr AndExpr_recursivo       
;

AndExpr_recursivo: 
    AndExpr_recursivo 
    |t_and ComparisonExpr
    |
    ;


ComparisonExpr	   : 
    StringConcatExpr ValueComp StringConcatExpr 
    |StringConcatExpr GeneralComp StringConcatExpr 
    |StringConcatExpr NodeComp StringConcatExpr  	
    |StringConcatExpr                                    
;



StringConcatExpr	   :   	RangeExpr StringConcatExpr_recursivo        { $$ = $1 + $2 ;}
;

StringConcatExpr_recursivo : 
    StringConcatExpr_recursivo 
    |t_doble_barra RangeExpr          
    |t_barra RangeExpr
    |
    ;


 
RangeExpr	   :   	AdditiveExpr t_to AdditiveExpr              
    |AdditiveExpr                                              
;



AdditiveExpr	   :   	MultiplicativeExpr AdditiveExpr_recursivo         
;

AdditiveExpr_recursivo : 
    AdditiveExpr_recursivo  
    |t_suma MultiplicativeExpr
    |t_resta MultiplicativeExpr
    |
    ;


MultiplicativeExpr	   :   	UnionExpr MultiplicativeExpr_recursivo   
;

MultiplicativeExpr_recursivo :
    MultiplicativeExpr_recursivo 
    |t_multiplicacion  UnionExpr
    |t_div UnionExpr
    |t_idiv UnionExpr
    | t_mod UnionExpr
    |
    ;

UnionExpr	   :   	IntersectExceptExpr 
;

IntersectExceptExpr	   :   	InstanceofExpr   
;

InstanceofExpr	   :   	TreatExpr t_instance t_of SequenceType    
    |TreatExpr                                                  
;

TreatExpr	   :   	CastableExpr t_treat t_as SequenceType   
    |CastableExpr 	                                          
;

CastableExpr	   :   CastExpr     
    ;

CastExpr	   :   	ArrowExpr 
;

ArrowExpr	   :   	UnaryExpr ArrowExpr_recursivo  
;

ArrowExpr_recursivo :
    ArrowExpr_recursivo 
    |t_igual t_mayor_que ArrowFunctionSpecifier ArgumentList	
    |
    ;
    
UnaryExpr	   :   	UnaryExpr_recursivo ValueExpr	 { $$ = $2; }
;

UnaryExpr_recursivo : 
    UnaryExpr_recursivo 
    | t_suma
    | t_resta
    |
    ;

ValueExpr	   :   	SimpleMapExpr	
;


GeneralComp	   :   	
    t_igual 
    | t_diferente t_igual 
    | t_menor_que 
    | t_menor_que t_igual 
    | t_mayor_que 
    | t_mayor_que t_igual
    
;


ValueComp	   :   	
    t_eq 
    | t_ne 
    | t_lt 
    | t_le 
    | t_gt 
    | t_ge	
;




NodeComp	   :   	
    t_is 
    | t_menor_que t_menor_que 
    | t_mayor_que t_mayor_que	
;


SimpleMapExpr	   :   	PathExpr SimpleMapExpr_recursivo   //  {$$ = new Expresion($1, @1.first_line, @1.first_column);}
;

SimpleMapExpr_recursivo :
    SimpleMapExpr_recursivo 
    |t_diferente PathExpr
    |
    ;

PathExpr	   :   	
    t_diagonal                           /*X*/ {$$=$1;}   //{ $$ = new Nodo($1, @1.first_line, @1.first_column); }    
    |t_doble_diagonal                    /*X*/ {$$=$1;}   //{ $$ = new Nodo($1, @1.first_line, @1.first_column); }                      
    |RelativePathExpr_recursivo          /*X*/ {$$=$1;}
    ;


RelativePathExpr_recursivo : 
    RelativePathExpr_recursivo RelativePathExpr           { $1.push($2); $$ = $1; }
    |RelativePathExpr                                     { $$ = [$1]; }
;


RelativePathExpr :
    |t_diagonal StepExpr                        { $$ = $1 + $2; }
    |t_doble_diagonal StepExpr                { $$ = $1 + $2; }
    |StepExpr                                   { $$ = $1; }
    ;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

StepExpr	   :  
    PostfixExpr 
   |AxisStep    
;

AxisStep	   :   	
    ReverseStep PredicateList	 { $$ = $1 + $2; }
    |ForwardStep PredicateList	{ $$ = $1 + $2; }
;


ForwardStep	   :   	
    ForwardAxis NodeTest   {$$ =  $1 + $2  ;}
    | AbbrevForwardStep	
;



ForwardAxis	   :   	
    t_child t_doble_dos_puntos                       {$$ =  $1 + $2  ;} //    { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column)
    | t_descendant t_doble_dos_puntos                 {$$ =  $1 + $2 ;} //  { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_attribute t_doble_dos_puntos                 {$$ =  $1 + $2  ;}    //{ $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_self t_doble_dos_puntos                      {$$ =  $1 + $2  ;} //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_descendant-or-self t_doble_dos_puntos         {$$ =  $1 + $2  ;}   // { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_following-sibling t_doble_dos_puntos           {$$ =  $1 + $2  ;}//   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_following t_doble_dos_puntos                  {$$ =  $1 + $2  ;}//    { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_namespace t_doble_dos_puntos	               {$$ =  $1 + $2  ;}   //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
;

AbbrevForwardStep	   :   	t_arroba NodeTest	 {$$ =  $1 + $2  ;}
    |NodeTest	
;

ReverseStep	   :   	
    ReverseAxis NodeTest     {$$ =  $1 + $2  ;}
   |AbbrevReverseStep        
;

ReverseAxis	   :   	
    t_parent t_doble_dos_puntos                 {$$ =  $1 + $2  ;} //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_ancestor t_doble_dos_puntos              {$$ =  $1 + $2  ;}   // { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}   
    | t_preceding_sibling t_doble_dos_puntos    {$$ =  $1 + $2  ;}  //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_preceding t_doble_dos_puntos            {$$ =  $1 + $2  ;}  //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
    | t_ancestor_or_self t_doble_dos_puntos    {$$ =  $1 + $2  ;} //   { $$ = new Axes($1+$2+$3, @1.first_line, @1.first_column);}
;

AbbrevReverseStep	   :   	t_doble_punto	 //   { $$ = new Nodo($1, @1.first_line, @1.first_column);}
|t_arroba                                     //  { $$ = new Nodo($1, @1.first_line, @1.first_column);}
;

NodeTest	   :   	KindTest 
    |NameTest
;

NameTest : 
    StringLiteral /*X*/ {$$=$1;}  // { $$ = new AxesPredicado($1, @1.first_line, @1.first_column);}
    | Wildcard    /*X*/ {$$=$1;}  // { $$ = new AxesPredicado($1, @1.first_line, @1.first_column);}
;

Wildcard : t_multiplicacion                                  //   { $$ = new Wildcard($1, @1.first_line, @1.first_column); } 
    |NCName  t_dos_puntos t_multiplicacion              { $$ = $1 + $2 + $3 ;}     //   { $$ = new Wildcard($1 + $2 + $3, @1.first_line, @1.first_column); } 
    |t_multiplicacion t_dos_puntos NCName                 { $$ = $1 + $2 + $3 ;}   //   { $$ = new Wildcard($1 + $2 , @1.first_line, @1.first_column); } 
    |t_arroba t_multiplicacion                           { $$ = $1 + $2 ;}    //   { $$ = new Wildcard($1 + $2 , @1.first_line, @1.first_column); } 
    | t_node t_parentesis_izquierdo t_parentesis_derecho     { $$ = $1 + $2 + $3 ;}//   { $$ = new Wildcard($1 + $2 + $3, @1.first_line, @1.first_column); } 
    ;


PostfixExpr	   :   	PrimaryExpr PostfixExpr_recursivo   { $$ = $1 + $2; } //{ $$ = $1; }
;

PostfixExpr_recursivo: 
    PostfixExpr_recursivo /*X*/ {$$=$1;}
    | Predicate        /*X*/ {$$=$1;}
    | ArgumentList     /*X*/ {$$=$1;}
    | Lookup           /*X*/ {$$=$1;}
    |
    ;

ArgumentList	   :   	t_parentesis_izquierdo Argument ArgumentList_recursivo t_parentesis_derecho	  { $$ = $1 + $2 + $3 + $4; }
    |t_parentesis_izquierdo t_parentesis_derecho	 { $1 + $2; }
;

ArgumentList_recursivo : 
    ArgumentList_recursivo     
    |t_coma Argument           
    |
    ;


PredicateList	   :   	
    PredicateList Predicate       { $$ = $1 + $2; }
    |
;

Predicate	   :   	
    t_corchete_izquierdo StringLiteral t_igual t_comilla Expr t_comilla t_corchete_derecho                          { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 ; }            
    |t_corchete_izquierdo StringLiteral t_igual t_comillas Expr t_comillas t_corchete_derecho                       { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 ; }            
    |t_corchete_izquierdo Expr t_igual t_comilla Expr t_comilla t_corchete_derecho                                  { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 ; }            
    |t_corchete_izquierdo Expr t_igual t_comillas Expr t_comillas t_corchete_derecho                                { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 ; }            
    |t_corchete_izquierdo Expr t_corchete_derecho                                                                   { $$ = $1 + $2 + $3 ; }            
    |t_corchete_izquierdo t_arroba Expr t_corchete_derecho                                                          { $$ = $1 + $2 + $3 + $4 ; }            
    |t_corchete_izquierdo t_arroba StringLiteral t_igual t_comilla StringLiteral t_comilla  t_corchete_derecho      { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }            
    |t_corchete_izquierdo t_arroba StringLiteral t_igual t_comillas Expr t_comillas  t_corchete_derecho              { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }            
    |t_corchete_izquierdo t_arroba StringLiteral t_igual t_comilla Expr t_comilla  t_corchete_derecho                { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }           
    |t_corchete_izquierdo t_arroba StringLiteral t_igual t_comillas StringLiteral t_comillas  t_corchete_derecho     { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }           
    |t_corchete_izquierdo t_arroba Expr t_igual t_comilla StringLiteral t_comilla  t_corchete_derecho                { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }           
    |t_corchete_izquierdo t_arroba Expr t_igual t_comillas Expr t_comillas  t_corchete_derecho                       { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }           
    |t_corchete_izquierdo t_arroba Expr t_igual t_comilla Expr t_comilla  t_corchete_derecho                         { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }            
    |t_corchete_izquierdo t_arroba Expr t_igual t_comillas StringLiteral t_comillas  t_corchete_derecho              { $$ = $1 + $2 + $3 + $4 +$5 + $6 +$7 +$8 ; }            
;

Lookup	   :   	t_interrogacion KeySpecifier	                                                 
;

KeySpecifier	   :   NCName       /*X*/ {$$=$1;}
    | IntegerLiteral                /*X*/ {$$=$1;}
    | ParenthesizedExpr             /*X*/ {$$=$1;}
    | t_multiplicacion	            /*X*/ {$$=$1;}
;

ArrowFunctionSpecifier	   :   	    
    StringLiteral                   /*X*/ {$$=$1;}
    |ParenthesizedExpr              /*X*/ {$$=$1;}
    |VarRef	                        /*X*/ {$$=$1;}                           
;

PrimaryExpr	   :   	Literal { $$ = $1; }
|VarRef             { $$ = $1; }
| ParenthesizedExpr { $$ = $1; }
| ContextItemExpr   { $$ = "."; }
| FunctionItemExpr  { $$ = $1; }
| MapConstructor    { $$ = $1; }
| ArrayConstructor  { $$ = $1; }
| UnaryLookup	    { $$ = $1; }
;

Literal	   :   	NumericLiteral      /*X*/ {$$=$1;}
	| StringLiteral				    /*X*/ {$$=$1;}
;


NumericLiteral	   :   	IntegerLiteral          /*X*/ {$$=$1;}
    | DecimalLiteral        /*X*/ {$$=$1;}
;

VarRef : t_dolar VarName       { $$ = $1 + $2 ; }
;

VarName : StringLiteral        /*X*/ {$$=$1;}
;

ParenthesizedExpr	   :   	t_parentesis_izquierdo Expr t_parentesis_derecho    { $$ = $1 + $2 + $3 ; }
    |	t_parentesis_izquierdo t_parentesis_derecho                             { $$ = $1 + $2 ; }
;

ContextItemExpr	   :   	t_punto	        /*X*/ {$$=$1;}   // {$$ = new Nodo($1, @1.first_line, @1.first_column);}
;

Argument	   :   	
    ExprSingle              /*X*/ {$$=$1;}
    | ArgumentPlaceholder	/*X*/ {$$=$1;}
;

ArgumentPlaceholder	   :   	t_interrogacion	        /*X*/ {$$=$1;}
;

FunctionItemExpr	   :   	 InlineFunctionExpr	    /*X*/ {$$=$1;}
;

InlineFunctionExpr	   :   	
    t_function t_parentesis_izquierdo  t_parentesis_derecho t_as SequenceType FunctionBody   
    |t_function t_parentesis_izquierdo t_parentesis_derecho FunctionBody              
;

MapConstructor	   :   	t_map t_llave_izquierda MapConstructorEntry MapConstructor_recursivo t_llave_derecha
    |t_map t_llave_izquierda t_llave_derecha
;

MapConstructor_recursivo :
    MapConstructor_recursivo    /*X*/ {$$=$1;}
    |t_coma MapConstructorEntry /*X*/ {$$=$1;}
    |
    ;


MapConstructorEntry	   :   	ExprSingle t_dos_puntos ExprSingle	
;

ArrayConstructor	   :   	SquareArrayConstructor  /*X*/ {$$=$1;}
    | CurlyArrayConstructor	                        /*X*/ {$$=$1;}
;

SquareArrayConstructor	   :   	t_corchete_izquierdo ExprSingle SquareArrayConstructor_recursivo t_corchete_derecho
    |t_corchete_izquierdo t_corchete_derecho
;
SquareArrayConstructor_recursivo :
    SquareArrayConstructor_recursivo 
    |t_coma ExprSingle
    |
    ;

CurlyArrayConstructor	   :   	t_array EnclosedExpr	
;

UnaryLookup	   :   	t_interrogacion KeySpecifier	
;

SequenceType	   :   	t_empty-sequence t_parentesis_izquierdo t_parentesis_derecho
| ItemType OccurrenceIndicator  //{ $$ = $2; }
| ItemType	                    { $$ = $1; }
;

OccurrenceIndicator	   :   	t_interrogacion | t_multiplicacion | t_suma	
;

ItemType	   :   	KindTest { $$ = $1; }
    | t_item t_parentesis_izquierdo t_parentesis_derecho | FunctionTest | MapTest | ArrayTest | ParenthesizedItemType	
;


KindTest	   :   	DocumentTest        /*X*/ {$$=$1;}
| ElementTest                           /*X*/ {$$=$1;}
| AttributeTest                         /*X*/ {$$=$1;}
| PITest                                /*X*/ {$$=$1;}
| CommentTest                           /*X*/ {$$=$1;}
| TextTest                              /*X*/ {$$=$1;}
| NamespaceNodeTest                     /*X*/ {$$=$1;}
| AnyKindTest	                        /*X*/ {$$=$1;}
;

AnyKindTest	   :   	t_node t_parentesis_izquierdo t_parentesis_derecho	    { $$ = $1 + $2 + $3 ; }
;

DocumentTest	   :   	t_document-node t_parentesis_izquierdo ElementTest t_parentesis_derecho	     { $$ = $1 + $2 + $3 ; }
    |t_document-node t_parentesis_izquierdo t_parentesis_derecho	                          { $$ = $1 + $2 + $3 ; }
;

TextTest	   :   	t_text t_parentesis_izquierdo t_parentesis_derecho	  { $$ = $1 + $2 + $3 ; }
;


CommentTest	   :   	t_comment t_parentesis_izquierdo t_parentesis_derecho	 { $$ = $1 + $2 + $3 ; }
;

NamespaceNodeTest	   :   	t_namespace-node t_parentesis_izquierdo t_parentesis_derecho	{ $$ = $1 + $2 + $3 ; }
;

PITest	   :   	
    t_processing-instruction t_parentesis_izquierdo StringLiteral t_parentesis_derecho          { $$ = $1 + $2 + $3 + $4; }
    |t_processing-instruction t_parentesis_izquierdo t_parentesis_derecho                        { $$ = $1 + $2 + $3 ; }
;


AttributeTest	   :   	    
    t_attribute t_parentesis_izquierdo AttribNameOrWildcard t_parentesis_derecho           { $$ = $1 + $2 + $3 +$4; }
    |t_attribute t_parentesis_izquierdo t_parentesis_derecho                                { $$ = $1 + $2 + $3 ; }
;

AttribNameOrWildcard	   :   	t_multiplicacion	    /*X*/ {$$=$1;}
;



ElementTest	   :                             
    t_element t_parentesis_izquierdo  t_parentesis_derecho    { $$ = $1 + $2 + $3 ; }
;


FunctionTest	   :   	AnyFunctionTest         /*X*/ {$$=$1;}
| TypedFunctionTest	                            /*X*/ {$$=$1;}
;

AnyFunctionTest	   :   	t_function t_parentesis_izquierdo t_multiplicacion t_parentesis_derecho	 { $$ = $1 + $2 + $3 + $4; }
;

TypedFunctionTest	   :   	t_function t_parentesis_izquierdo SequenceType TypedFunctionTest_recursivo t_parentesis_derecho t_as SequenceType
    |t_function t_parentesis_izquierdo t_parentesis_derecho t_as SequenceType	
;

TypedFunctionTest_recursivo :   
    TypedFunctionTest_recursivo     /*X*/ {$$=$1;}
    |t_coma SequenceType    /*X*/ {$$=$1;}
    |
    ;


MapTest	   :   	t_map t_parentesis_izquierdo t_multiplicacion t_parentesis_derecho	
;


ArrayTest	   :   	AnyArrayTest        /*X*/ {$$=$1;}
| TypedArrayTest	                    /*X*/ {$$=$1;}
;

AnyArrayTest	   :   	t_array t_parentesis_izquierdo t_multiplicacion t_parentesis_derecho	
;

TypedArrayTest	   :   	t_array t_parentesis_izquierdo SequenceType t_parentesis_derecho
;

ParenthesizedItemType	   :   	t_parentesis_izquierdo ItemType t_parentesis_derecho	
;


QName	   :
   	PrefixedName        /*X*/ {$$=$1;}
    | UnprefixedName    /*X*/ {$$=$1;}
    | StringLiteral     /*X*/ {$$=$1;}
    ;

PrefixedName	   :   	Prefix t_dos_puntos LocalPart
;

UnprefixedName	   :   	LocalPart { $$ = $1; }
;

Prefix	   :   	NCName { $$ = $1; }
;

LocalPart	   :   	NCName { $$ = $1; }
;


NCName	   :   	StringLiteral { $$ = $1; } 
;