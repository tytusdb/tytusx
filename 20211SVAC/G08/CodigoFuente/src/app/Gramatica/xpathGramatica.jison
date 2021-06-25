%lex
%options case-insensitive

entero [0-9]+("."[0-9]+)?
caracterliteral (\'[^']*\')
stringliteral (\"(\\\"|[^"]|\n)*\")
comentario_linea  ("//".*\r\n)|("//".*\n)|("//".*\r)
comentario_multiple (/*[^"]**/)
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
%%

\s+                                 /* skip whitespace */
"//"                        return 'BARRAS';
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

{entero}	      return 'entero'
{stringliteral}       return 'STRING_LITERAL'
{caracterliteral}     return 'CARACTER_LITERAL'
"ancestor-or-self"          return 'ancestor-or-self';
"ancestor"                  return 'ancestor';
"attribute"                 return 'attribute';
"child"                     return 'child';
"descendant-or-self"        return 'descendant-or-self';
"descendant"                return 'descendant';
"following-sibling"         return 'following-sibling';
"following"                 return 'following';
"namespace"                 return 'namespace';
"parent"                    return 'parent';
"preceding-sibling"         return 'preceding-sibling';
"preceding"                 return 'preceding';
"self"                      return 'self';
"last"                      return 'last';
"position"                  return 'position';
"text"                      return 'text';
"node"                      return 'node';
"div"                       return 'div';
"mod"                       return 'mod';
"+"                         return '+';
"-"                         return '-';
"*"                         return '*';
"$"                         return '$';
"&"                         return '&';
"\""                        return 'comillas';

"</"                        return '</';
"<="                        return '<=';
">="                        return '>=';
"<"                         return '<';
">"                         return '>';
"="                         return '=';
"=="                        return 'equal';
"!="                        return '!=';
":="                        return ':=';
"and"                       return 'and';
"or"                        return 'or';
"!"                         return 'not';
"for"                       return 'for';
"in"                        return 'in';
"where"                     return 'where';
"return"                    return 'return';
"order"                     return 'order';
"by"                        return 'by';
"eq"                        return 'eq'
"ne"                        return 'ne'
"lt"                        return 'lt'
"le"                        return 'le'
"gt"                        return 'gt'
"ge"                        return 'ge'
"let"                       return 'let'
"to"                        return 'to'
"ascending"                 return 'ascending'
"descending"                return 'descending'
"amp"                       return 'amp'
"quot"                      return 'quot'
"apos"                      return 'apos'

":"                         return ':';
","                         return ',';
";"                         return 'semicolon';
"then"                      return 'then';
"else"                      return 'else';
"["                         return '[';
"]"                         return ']';
"{"                         return '{';
"}"                         return '}';
"@"                         return 'arroba';
"&&"                        return 'and';
"|"                         return '|';
"("                         return 'lparen';
")"                         return 'rparen';

(([0-9]+"."[0-9]*)|("."[0-9]+))         return 'DoubleLiteral';
[0-9]+                                  return 'IntegerLiteral';
\"[^\"]*\"                              return 'string';
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                return 'nodename';




"/"                         return 'BARRASIMPLE';

".."                   return 'DOBLEDOT'
"."                   return 'DOT'
[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_!@#$%+^'`"*()/¡:;.,~-¤Ã-]            return 'CharRef';
<<EOF>>               return 'EOF'
.                     return 'INVALID'
/lex


//SECCION DE IMPORTS
%{
        const {sentenciaXpath} = require("../Estructuras/sentenciaXpath.js");
        const {parametroXpath} = require("../Estructuras/parametroXpath.js");
        const {ParametroOperacionXpath} = require("../Estructuras/ParametroOperacionXpath.js");
        const {OperacionXpath} = require("../Estructuras/OperacionXpath.js");
        const {NodoXpath} = require("../Estructuras/NodoXpath.js");
        const {TipoParametro, TipoOperador, TipoNodo} = require("../Estructuras/tipificacion.js");
        let salida = [];
%}

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'or'
%left 'and'
%left '<' '>' '>=' '<=' '=' '!='
%left '+' '-'
%left 'div' '*' 'mod'

%left 'lparen' 'rparen'

// DEFINIMOS PRODUCCIÓN INICIAL
%start expressions

%%
/* Definición de la gramática */

expressions
    : XPath EOF 
        { salida = []; typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    | XQUERY EOF;

XQUERY : FLWORExpr
        |DirectConstructor;

//*************
DirectConstructor : DirElemConstructor;

DirElemConstructor: '<' nodename DirAttributeList BARRASIMPLE '>'
	| '<' nodename DirAttributeList '>' EDirElemContent '</' nodename '>';
			
EDirElemContent : LDirElemContent
	|;
			
LDirElemContent : LDirElemContent DirElemContent
	|DirElemContent;
	
DirElemContent : DirectConstructor
| CommonContent;

CommonContent : PredefinedEntityRef  | nodename | EnclosedExpr| CharRef | DOT| ':';

 EnclosedExpr: '{' Expr '}';
 
 PredefinedEntityRef: '&' REF semicolon;
 
 REF: 'lt' | 'gt' | 'amp' | 'quot' | 'apos';
 
 DirAttributeList : LAtr
	|;
LAtr: LAtr Atr
	| Atr;
Atr: nodename '=' STRING_LITERAL;

//******************* INICIO
ForClause: for LForBinding;

LForBinding: LForBinding ',' ForBinding
	|ForBinding;

ForBinding: '$'nodename in SENTENCIA;

ExprSingle: FLWORExpr
	| IfExpr
        |StringConcatExpr
        | lparen entero to entero rparen
        | DirectConstructor;
	
FLWORExpr : InitialClause ELIntermediateClause ReturnClause;

QuantifiedExpr: '$' nodename;

InitialClause: ForClause 
| LetClause;

LetClause: let LLetBinding;

LLetBinding: LLetBinding ',' LetBinding
	|LetBinding;
			
LetBinding: '$' nodename ':=' ExprSingle;

ELIntermediateClause : LIntermediateClause
        |;

LIntermediateClause : LIntermediateClause IntermediateClause
                |IntermediateClause;

IntermediateClause: InitialClause | WhereClause | OrderByClause;

WhereClause: where LComparisonExpr;

OrderByClause: order by OrderSpecList;

OrderSpecList:OrderSpecList ',' OrderSpec
	| OrderSpec;
OrderSpec : ExprSingle OrderModifier;

OrderModifier: ascending
	| descending
        | ;
			
ReturnClause: return ExprSingle;

IfExpr: if lparen Expr rparen then ExprSingle else ExprSingle;

Expr: 	Expr ExprSingle
        |ExprSingle;

LComparisonExpr : LComparisonExpr and  ComparisonExpr
        | LComparisonExpr or  ComparisonExpr
        | ComparisonExpr;

ComparisonExpr : StringConcatExpr ComparisonValue XPARAM;

XPARAM : numberLiteral
|  XOPERACION ;

XOPERACION: XPARAM '+' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mas);}
        |XPARAM '-' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Menos);}
        |XPARAM '*' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Por);}
        |XPARAM mod XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mod);}
        |XPARAM 'div' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Div);};



StringConcatExpr : '$' nodename SENTENCIA
		| '$' nodename;

ComparisonValue : GeneralComp | ValueComp;

ValueComp : 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge';

GeneralComp : '=' | '!=' | '<' | '<=' | '>' | '>=';

//******************* FIN
XCOMPARISON : $ SENTENCIA ComparisonValue PARAMETRO;

        
IF : if lparen xvar BARRASIMPLE  OPERACION rparen SIMPLE_EXPRESION then else SIMPLE_EXPRESION;


XPath : LSENTENCIA {$$ = salida; salida = []; return $$;};

LSENTENCIA: LSENTENCIA '|' SENTENCIA { salida.push($3);}
        | SENTENCIA {  salida.push($1);};

SENTENCIA : SENTENCIA NODO_NO_PREDICABLE  {$$ = new sentenciaXpath($2,null,$1);}
        | SENTENCIA NODO_PREDICABLE predicate  {$$ = new sentenciaXpath($2,$3,$1);}
        | NODO predicate 
                        {      
                                if($1 != TipoNodo.ID && $2 != null) {console.log("Error toquen no debe llever predicado");}
                                else{
                                        $$ = new sentenciaXpath($1,$2,null);
                                }
                        }
        ;


NODO : BARRAS {$$ = new NodoXpath(TipoNodo.Descendiente,$1,null);}
        | BARRASIMPLE {$$ = new NodoXpath(TipoNodo.Raiz,$1,null);}
        | '*' {$$ = new NodoXpath(TipoNodo.Asterisco,$1,null);}
        | nodename {$$ = new NodoXpath(TipoNodo.ID,$1,null);}
        | DOBLEDOT {$$ = new NodoXpath(TipoNodo.NodoPadre,$1,null); }
        | DOT {$$ = new NodoXpath(TipoNodo.AutoReferencia,$1,null);}
        | AXIS {$$ = $1;}
        ;

NODO_PREDICABLE: '*' {$$ = new NodoXpath(TipoNodo.Asterisco,$1,null);}
        | nodename {$$ = new NodoXpath(TipoNodo.ID,$1,null);}
        | AXIS  {$$ = $1;}
        | ATRIBUTO  {$$ = new NodoXpath(TipoNodo.Atributo,$1,null);}
        | DOBLEDOT {$$ = new NodoXpath(TipoNodo.NodoPadre,$1,null);}
        | DOT {$$ = new NodoXpath(TipoNodo.AutoReferencia,$1,null);}
        ;

NODO_NO_PREDICABLE: FUNCION_NO_OPERABLE {$$ = $1;}
        | BARRAS {$$ = new NodoXpath(TipoNodo.Descendiente,$1,null);}
        | BARRASIMPLE  {$$ = new NodoXpath(TipoNodo.Raiz,$1,null);};

FUNCION_NO_OPERABLE : node lparen rparen {$$ = new NodoXpath(TipoNodo.Funcion_Node,$1,null);}
                | text lparen rparen {$$ = new NodoXpath(TipoNodo.Funcion_Text,$1,null);};


predicate : '[' PARAMETRO ']' {$$ = $2;}
        | {$$ = null;}
        ;



ATRIBUTO : arroba nodename {$$ = $2;}
        |  arroba '*'  {$$ = $2;};

FUNCION_OPERABLE :'last' lparen rparen {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Funtion_Last); console.log($1);}
        | 'position'  lparen rparen {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Funtion_Position);}
        ;



PARAMETRO :FUNCION_OPERABLE  {$$ = $1;} 
        | numberLiteral {$$ = $1;}
        | OPERACION {$$ = new ParametroOperacionXpath($1,'',TipoParametro.Operacion);}
        | DOBLEDOT {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.DosPuntos);}
        | DOT   {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Punto);}
        | nodename BARRASIMPLE  ATRIBUTO {$$ = new ParametroOperacionXpath(null,$1 + '@' + $3,TipoParametro.Nodo);}
        | ATRIBUTO {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Atributo);}
        | STRING_LITERAL {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Cadena);}
        | nodename {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Nodo);}
;

OPERACION: PARAMETRO '+' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Mas);}
        |PARAMETRO '-' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Menos);}
        |PARAMETRO '*' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Por);}
        |PARAMETRO mod PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Mod);}
        |PARAMETRO 'div' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Div);}
        |PARAMETRO '<=' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.MenorIgual);}
        |PARAMETRO '>=' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.MayorIgual);}
        |PARAMETRO '>' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Mayor);}
        |PARAMETRO '<' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Menor);}
        |PARAMETRO '=' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Igual);}
        |PARAMETRO '!=' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Diferente);}
        |PARAMETRO 'and' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.And);}
        |PARAMETRO 'or' PARAMETRO {$$ = new OperacionXpath($1,$3,TipoOperador.Or);}
        |lparen PARAMETRO  rparen {$$ = $2.Operacion;}
        ;


    
numberLiteral : DoubleLiteral {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Decimal);}
        | entero {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Entero);}
        ;


AXIS: NOMBRE_AXIS  ':'':' PARAMETRO_AXIS {$$ = new NodoXpath(TipoNodo.Axis,$1,$4); }
;


NOMBRE_AXIS : 'ancestor' {$$ = $1;} 
        |'ancestor-or-self'  {$$ = $1;} 
        |'attribute' {$$ = $1;} 
        |'child' {$$ = $1;} 
        |'descendant' {$$ = $1;} 
        |'descendant-or-self'{$$ = $1;} 
        |'following' {$$ = $1;} 
        |'following-sibling' {$$ = $1;} 
        |'namespace'  {$$ = $1;} 
        |'parent' {$$ = $1;} 
        |'preceding' {$$ = $1;} 
        |'preceding-sibling'{$$ = $1;} 
        |'self'{$$ = $1;}  ;

PARAMETRO_AXIS : nodename {$$ = new NodoXpath(TipoNodo.ID,$1,null);}
        | FUNCION_NO_OPERABLE  {$$ = $1;}
        | '*'  {$$ = new NodoXpath(TipoNodo.Asterisco,$1,null);}
        ;