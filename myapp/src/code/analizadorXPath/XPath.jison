
%{
  var XML= {
    tipo: "/",
    texto: "",
    atributos: [],
    hijos: [
      {
        tipo: "biblioteca",
        texto: "",
        atributos: [],
        hijos: [
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "La vida está en otra parte",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Milan Kundera",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1973"
                    }
                ],
                hijos:[]
              }
            ]
          },
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "Pantaleón y las visitadoras",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Mario Vargas Llosa",
                atributos:[
                    {
                        nombre:"fechaNacimiento",
                        valor:"28/03/1936"
                    }
                ],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1973"
                    }
                ],
                hijos:[]
              }
            ]
          },
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "Conversación en la catedral",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Mario Vargas Llosa",
                atributos:[
                    {
                        nombre:"fechaNacimiento",
                        valor:"28/03/1936"
                    }
                ],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1969"
                    }
                ],
                hijos:[]
              }
            ]
          }
        ]
      }
    ]
  }
%}

/* Definición Léxica */
%lex

      %options case-insensitive

%%

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
"||"        return "OR_EXP"
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

/* Espacios en blanco */
[ \r\t]+{}
\n{}

('"'[^"]*'"')|("'"[^']*"'")          return "CADENA"
([a-zA-ZñÑ_-]|".")([a-zA-ZñÑ0-9_-]|".")* return "NOMBRE"
[0-9]+      return "INTEGER"
("."[0-9]+)|([0-9]+"."[0-9]+) return "DECIMAL"

.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS

%start XPath

%%

XPath 
  : Expr  {}
;

Expr 
  : ExprSingle            {}
	| Expr COMA ExprSingle  {}
; 

ExprSingle  
  : OrExpr  {}
	| ForExpr {}
;

ForExpr 
  : SimpleForClause RRETURN ExprSingle  {}
;

SimpleForClause   
  : RFOR SimpleForBinding {}
	| SimpleForClause COMA SimpleForBinding {}
;

SimpleForBinding  
  : DOLAR NOMBRE RIN ExprSingle {}
;

OrExpr      
  : AndExpr                 {}
	| OrExpr ROR AndExpr      {}
;

AndExpr     
  : ComparisonExpr                {}
	| AndExpr RAND ComparisonExpr   {}
;

ComparisonExpr    
  : StringConcatExpr                              {}
	| StringConcatExpr ValueComp StringConcatExpr   {}
	| StringConcatExpr GeneralComp StringConcatExpr {}
;

ValueComp         
  : EQ  {}
	| NE  {}
	| LT  {}
	| LE  {}
	| GT  {}
	| GE  {}
;

GeneralComp       
  : IGUAL     {}
	| DIFERENTE {}
	| MENOR     {}
	| MENORIG   {}
	| MAYOR     {}
	| MAYORIG   {}
;



StringConcatExpr  
  : RangeExpr                         {}
	| StringConcatExpr OR_EXP RangeExpr {}
;

RangeExpr   
  : AdditiveExpr                    {}
	| AdditiveExpr RTO AdditiveExpr   {}
;

AdditiveExpr      
  : MultiplicativeExpr                    {}
	| AdditiveExpr MAS MultiplicativeExpr   {}
	| AdditiveExpr MENOS MultiplicativeExpr {}
;

//Aca se intercambio UnoinExpr por Unary Expresion cambiar en el futuro
MultiplicativeExpr      
  : UnaryExpr                         {}
	| MultiplicativeExpr POR UnaryExpr  {}
	| MultiplicativeExpr DIV UnaryExpr  {}
	| MultiplicativeExpr IDIV UnaryExpr {}
	| MultiplicativeExpr MOD UnaryExpr  {}
;

UnaryExpr   
  : ValueExpr                         {}
	| MAS UnaryExpr                     {}
	| MENOS UnaryExpr                   {}
;

ValueExpr   
  : SimpleMapExpr                     {}
;

SimpleMapExpr     
  : PathExpr                            {}
	| SimpleLetClause ADMIRACION PathExpr {}
;

PathExpr    
  : BARRA RelativePathExpr              {}
	| DOBLEBARRA RelativePathExpr         {}
	| RelativePathExpr                    {}
	| BARRA                               {}
;

RelativePathExpr  
  : StepExpr                              {}
	| RelativePathExpr BARRA StepExpr       {}
	| RelativePathExpr DOBLEBARRA StepExpr  {}
;

StepExpr    
  : PostfixExpr {}
	| AxisStep    {}
;

AxisStep    
  : ReverseStep               {}
	| ForwardStep               {}
	| ReverseStep PredicateList {}
	| ForwardStep PredicateList {}
;

PredicateList     
  : Predicate                 {}
	| PredicateList Predicate   {}
;

//Faltan las formas no abreviadas
ForwardStep 
  : AbbrevForwardStep {}
;

AbbrevForwardStep 
  : ARROBA NameTest {}
	| NameTest        {}
;

//KindText no implementado todavia
NodeTest    
  : NameTest    {}
  //| KindTest
;

NameTest    
  : NOMBRE    {}
	| Wildcard  {}
;

//
Wildcard    
  : ASTERISCO {}
;

//Faltan las formas no abrevidas
ReverseStep 
  :  AbbrevReverseStep  {}
;

AbbrevReverseStep 
  : DOBLEPUNTO  {}
;

PostfixExpr   
  : PrimaryExpr               {}
	| PrimaryExpr PostfixExprL  {}
;

//Falta crear los demas metodos de argumentos para las primaryEXpr
PostfixExprL      
  : Predicate                 {}
  //| ArgumentList
  //| Lookup
	| StepExprL Predicate       {}
  //| StepExprL ArgumentList
  //| StepExprL Lookup
;

Predicate   
  : CORA Expr CORB            {}
;

PrimaryExpr 
  : Literal                   {}
	| VarRef                    {}
	| FunctionCall              {}
	| ContextItemExpr           {}
	| ParenthesizedExpr         {}
;

Literal     
  : INTEGER                   {}
	| DECIMAL                   {}
	| CADENA                    {}
;

VarRef      
  : DOLAR NOMBRE              {}
;

FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC              {}
	| NOMBRE PARENTESISA ArgumentList PARENTESISC {}
;

ArgumentList      
  : Argument                      {}
	| ArgumentList COMA Argument    {}
;

Argument    
  : ExprSingle      {}
	| INTERROGACIONC  {}
;

ContextItemExpr   
  : PUNTO  {}
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC       {}
	| PARENTESISA Expr PARENTESISC  {}
;