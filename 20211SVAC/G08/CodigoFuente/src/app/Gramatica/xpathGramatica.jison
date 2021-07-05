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
"then"                      return 'Then';
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

"$"                         return '$';
"+"                         return '+';
"-"                         return '-';
"*"                         return '*';
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
"if"                        return 'if'
"let"                       return 'let'
"to"                        return 'to'
"ascending"                 return 'ascending'
"descending"                return 'descending'
"amp"                       return 'amp'
"quot"                      return 'quot'
"apos"                      return 'apos'
"lower-case"                return 'lowercase'
"upper-case"                return 'uppercase'
"string"                    return 'tostring'
"number"                    return 'tonumber'
"substring"                 return 'substring'
"declare"                   return 'declare'
"variable"                  return 'variable'
"function"                  return 'function'
'xs:string'                 return 'xsString'
'xs:date'                   return 'xsDate'
'xs:decimal'                return 'xsDecimal'
'xs:boolean'                return 'xsBoolean'
'xs:integer'                return 'xsInteger'
'as'                        return 'as'
":"                         return ':';
","                         return ',';
"?"                         return '?';
";"                         return 'semicolon';
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
        const {Entrada} = require("../Estructuras/Entrada.js");
        const {NodoXpath} = require("../Estructuras/NodoXpath.js");
        const {DeclaracionXquery,FuncionXquery,VariableXquery,FunctionName,ParametroXquery,TypeDeclaration} = require("../Estructuras/Xquery/DeclaracionXquery.js");
        const {FLWORExpr,FLWORVariables,FLWORBinding,IntermediteClause,OrderSpec} = require("../Estructuras/Xquery/FLWORExpr.js");
        const {IfExpresion} = require("../Estructuras/Xquery/IfExpresion.js");
        const {NativeFunctionExpresion,Funcion} = require("../Estructuras/Xquery/NativeFunctionExpresion.js");
        const {PathExpresion} = require("../Estructuras/Xquery/PathExpresion.js");
        const {SentenciaXquery,LlamadoFuncion} = require("../Estructuras/Xquery/SentenciaXquery.js");
        const {SingleExpresion} = require("../Estructuras/Xquery/SingleExpresion.js");
        const {TipoParametro, TipoOperador, TipoNodo, SingleExpresionType, FLWORTipo, TipoBinding, OrderModifierType, TipoClausulaIntermedia, TipoFuncion, TipoDeclaracionXquery, ParamType} = require("../Estructuras/tipificacion.js");
        let salida = [];
%}

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left 'or'
%left 'and'
%left '<' '>' '>=' '<=' '=' '!=' 'eq' 'ne' 'lt' 'le' 'gt' 'ge'
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
          return new Entrada(null,$1,0); }
    | XQUERY EOF {return new Entrada($1,null,1); };

XQUERY : XQUERY SENTENCIA_XQUERY {$1.push($2); $$ = $1;}
        |  SENTENCIA_XQUERY {$$ = []; $$.push($1);};

SENTENCIA_XQUERY : FLWORExpr {$$ = new SentenciaXquery($1,null,null);}
        //|DirectConstructor //{$$ = new SentenciaXquery(null,$1);}
        |AnnotatedDecl {$$ = new SentenciaXquery(null,$1,null);}
        |LlamadoFuncion {$$ = new SentenciaXquery(null,null,$1);};

LlamadoFuncion: FunctionName lparen Expr rparen {$$ = new LlamadoFuncion($3,$1);};

//*************** User defined functions

AnnotatedDecl : declare  VarDecl {$$ = new DeclaracionXquery(TipoDeclaracionXquery.Varible, $2);}
	|declare FunctionDecl {$$ = new DeclaracionXquery(TipoDeclaracionXquery.FuncionDefinida, $2);};

VarDecl: variable '$' nodename  ':=' VarValue {$$ = new VariableXquery('$' + $3,$5);};

VarValue: ExprSingle {$$ = $1};

FunctionDecl: function FunctionName lparen EParamList rparen TypeDeclaration FunctionBody 
{$$ = new FuncionXquery($2,$4,$6,$7);};

FunctionName : nodename ':' nodename {$$ = new FunctionName($3,$1);}
        | nodename {$$ = new FunctionName($1, '');};

EParamList: ParamList {$$ = $1;}
	| {$$ = null;};

ParamList: ParamList ',' Param {$1.push($3); $$ = $1;}
		|Param {$$ = []; $$.push($1);};
		
Param: '$' nodename TypeDeclaration {$$ = new ParametroXquery('$' + $2, $3);};

TypeDeclaration: 'as' SequenceType {$$ = $2;}
	| {$$ = null;};

SequenceType: ItemType OccurrenceIndicator {$$ = new TypeDeclaration($1,$2);};

OccurrenceIndicator: '?' {$$ = '?';}| '*' {$$ = '*';}| '+' {$$ = '+';}|{$$ = '';};

ItemType: xsString {$$ = ParamType.xsString;}
|xsDate {$$ = ParamType.xsDate;}
|xsDecimal {$$ = ParamType.xsDecimal;}
|xsInteger {$$ = ParamType.xsInteger;}
|xsBoolean {$$ = ParamType.xsBoolean;};

FunctionBody: EnclosedExpr semicolon {$$ = $1;};

//************* HTML Clause
DirectConstructor : DirElemConstructor;

DirElemConstructor: '<' nodename DirAttributeList BARRASIMPLE '>'
	| '<' nodename DirAttributeList '>' EDirElemContent '</' nodename '>';
			
EDirElemContent : LDirElemContent
	|;
			
LDirElemContent : LDirElemContent DirElemContent
	|DirElemContent;
	
DirElemContent : DirectConstructor
| CommonContent;

CommonContent : PredefinedEntityRef  | nodename | EnclosedExpr {$$ = $1;}| CharRef | DOT| ':';

 EnclosedExpr: '{' Expr '}' {$$ = $2;};
 
 PredefinedEntityRef: '&' REF semicolon;
 
 REF: 'lt' | 'gt' | 'amp' | 'quot' | 'apos';
 
 DirAttributeList : LAtr
	|;
LAtr: LAtr Atr
	| Atr;
Atr: nodename '=' STRING_LITERAL;

//******************* INICIO
ForClause: for LForBinding {$$ = $2;};

LForBinding: LForBinding ',' ForBinding {$1.Variables.push($3); $$ = $1;}
	|ForBinding {$$ = new FLWORBinding(FLWORTipo.For,$1); }
        ;

ForBinding: '$'nodename in SENTENCIA {$$ = new FLWORVariables('$' + $2, $4, null);}
           |'$'nodename in ExprSingle {$$ = new FLWORVariables('$' + $2, null, $4);};

ExprSingle: 
         NativeFuntion {$$ = new SingleExpresion (SingleExpresionType.FuncionDefinida, $1,0,0);}
         |XPARAM {$$ = new SingleExpresion (SingleExpresionType.XPARAM, $1,0,0);}
        | IfExpr {$$ = new SingleExpresion (SingleExpresionType.IfExpr, $1,0,0);}
	| FLWORExpr {$$ = new SingleExpresion (SingleExpresionType.FLWORExpr, $1,0,0);}
        | lparen entero to entero rparen {$$ = new SingleExpresion (SingleExpresionType.Contador, null,Number($2),Number($4));}
        //| DirectConstructor {$$ = new SingleExpresion (SingleExpresionType.HtmlSequence, $1,0,0);}
        | LPathExpresion {$$ = new SingleExpresion (SingleExpresionType.Path, $1,0,0);}
        //| LlamadoFuncion {$$ = new SingleExpresion (SingleExpresionType.LlamadaFuncion, $1,0,0);}
        | SENTENCIA {$$ = new SingleExpresion (SingleExpresionType.Sentencia, $1,0,0);}
        ;

LPathExpresion : LPathExpresion ',' PathExpresion {$1.push($3); $$ = $1;}
|PathExpresion {$$ = []; $$.push($1);};

PathExpresion : '$' nodename SENTENCIA {$$ = new PathExpresion('$' + $2,$3);};



NativeFuntion: NativeFunctionName lparen Expr rparen {$$ = new NativeFunctionExpresion($1,$3);}; //funcion definida

NativeFunctionName: uppercase {$$ = new Funcion(TipoFuncion.Nativa,$1);}
        | lowercase {$$ = new Funcion(TipoFuncion.Nativa,$1);}
        | tostring {$$ = new Funcion(TipoFuncion.Nativa,$1);}
        | tonumber {$$ = new Funcion(TipoFuncion.Nativa,$1);}
        | substring {$$ = new Funcion(TipoFuncion.Nativa,$1);}
        | FunctionName {$$ = new Funcion(TipoFuncion.Definida,$1);}
        ;
 
FLWORExpr : InitialClause ELIntermediateClause ReturnClause {$$ = new FLWORExpr($1,$2,$3);};

QuantifiedExpr: '$' nodename {$$ = '$'+$2;}; 

InitialClause: ForClause {$$=$1;}
| LetClause {$$=$1;};

LetClause: let LLetBinding {$$ = $2;};

LLetBinding: LLetBinding ',' LetBinding  {$1.Variables.push($3); $$ = $1;}
	|LetBinding {$$ = new FLWORBinding(FLWORTipo.Let, $1);}
        ;
			
LetBinding: '$' nodename ':=' ExprSingle  {$$ = new FLWORVariables('$' + $2, null, $4);};

ELIntermediateClause : LIntermediateClause {$$ = $1;}
        |{$$ = null;};

LIntermediateClause : LIntermediateClause IntermediateClause {$1.push($2); $$ = $1;}
                |IntermediateClause {$$ = []; $$.push($1); };

IntermediateClause: InitialClause {$$ = new IntermediteClause(TipoClausulaIntermedia.InitialClause, $1);}
| WhereClause {$$ = new IntermediteClause(TipoClausulaIntermedia.WhereClause, $1);}
| OrderByClause {$$ = new IntermediteClause(TipoClausulaIntermedia.OrderByClause, $1);}
;

WhereClause: where LComparisonExpr {$$ = $2;};

OrderByClause: order by OrderSpecList {$$ = $3};

OrderSpecList:OrderSpecList ',' OrderSpec { $1.push($3); $$ = $1;}
	| OrderSpec {$$ = []; $$.push($1);};

OrderSpec : ExprSingle OrderModifier {$$ = new OrderSpec($1,$2);};

OrderModifier: ascending {$$ = OrderModifierType.Ascendente}
	| descending {$$ = OrderModifierType.Descendente}
        | {$$ = OrderModifierType.Ninguno};
			
ReturnClause: return ExprSingle {$$ = $2;};

IfExpr: if lparen Expr rparen Then ExprSingle else ExprSingle {$$ = new IfExpresion($3,$6,$8);};

Expr: 	Expr ExprSingle {$1.push($2); $$ = $1;}
        |Expr ',' ExprSingle {$1.push($3); $$ = $1;}
        |ExprSingle {$$ = []; $$.push($1);};

LComparisonExpr : LComparisonExpr and  ComparisonExpr {$$ = new parametroXpath($1,$3,null,TipoOperador.And);}
        | LComparisonExpr or  ComparisonExpr {$$ = new parametroXpath($1,$3,null,TipoOperador.Or);}
        | ComparisonExpr {$$ = new parametroXpath(null,null,$1,TipoOperador.None);};

ComparisonExpr : QuantifiedExpr ComparisonValue ExprSingle 
{$$ = new OperacionXpath(new ParametroOperacionXpath(null,$1,TipoParametro.Variable),$3.Objeto,$2,null);}
| QuantifiedExpr SENTENCIA ComparisonValue ExprSingle {$$ = new OperacionXpath(new ParametroOperacionXpath(null,$1,TipoParametro.Variable),$4.Objeto,$3,$2);};

XPARAM : OTRO {$$ = $1}
|  XOPERACION  {$$ = new ParametroOperacionXpath($1,'',TipoParametro.Operacion);}
| numberLiteral {$$ = $1;};

OTRO: QuantifiedExpr {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Variable);}
| LlamadoFuncion {$$ = new ParametroOperacionXpath(null,null,TipoParametro.FuncionDefinida,$1);}
| PathExpresion {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Ruta);}
| STRING_LITERAL {$$ = new ParametroOperacionXpath(null,$1,TipoParametro.Cadena);};
XOPERACION: XPARAM '+' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mas);}
        |XPARAM '-' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Menos);}
        |XPARAM '*' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Por);}
        |XPARAM mod XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mod);}
        |XPARAM 'div' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Div);}
        |XPARAM 'eq' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Igual);}
        |XPARAM 'ne' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Diferente);}
        |XPARAM 'lt' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Menor);}
        |XPARAM 'le' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.MenorIgual);}
        |XPARAM 'gt' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mayor);}
        |XPARAM 'ge' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.MayorIgual);}
        |XPARAM '=' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Igual);}
        |XPARAM '!=' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Diferente);}
        |XPARAM '<' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Menor);}
        |XPARAM '<=' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.MenorIgual);}
        |XPARAM '>' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Mayor);}
        |XPARAM '>=' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.MayorIgual);}
	|XPARAM 'and' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.And);}
        |XPARAM 'or' XPARAM {$$ = new OperacionXpath($1,$3,TipoOperador.Or);}
        |lparen XPARAM rparen {$$ = $2.Operacion;};





ComparisonValue : GeneralComp {$$ = $1;}| ValueComp{$$ = $1;} ;

ValueComp : 'eq' {$$ = TipoOperador.Igual;}
        | 'ne' {$$ = TipoOperador.Diferente;}
        | 'lt' {$$ = TipoOperador.Menor;}
        | 'le' {$$ = TipoOperador.MenorIgual;}
        | 'gt' {$$ = TipoOperador.Mayor;}
        | 'ge'{$$ = TipoOperador.MayorIgual;}
        ;

GeneralComp : '=' {$$ = TipoOperador.Igual;}
        | '!=' {$$ = TipoOperador.Diferente;}
        | '<' {$$ = TipoOperador.Menor;}
        | '<=' {$$ = TipoOperador.MenorIgual;}
        | '>' {$$ = TipoOperador.Mayor;}
        | '>=' {$$ = TipoOperador.MayorIgual;}
        ;

//******************* FIN
XCOMPARISON : $ SENTENCIA ComparisonValue PARAMETRO;

        


XPath : LSENTENCIA {$$ = salida; salida = []; return new Entrada(null,$$,0);};

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
        //| '*' {$$ = new NodoXpath(TipoNodo.Asterisco,$1,null);}
        | nodename {$$ = new NodoXpath(TipoNodo.ID,$1,null);}
        | DOBLEDOT {$$ = new NodoXpath(TipoNodo.NodoPadre,$1,null); }
        | DOT {$$ = new NodoXpath(TipoNodo.AutoReferencia,$1,null);}
        | AXIS {$$ = $1;}
        ;

NODO_PREDICABLE: //'*' {$$ = new NodoXpath(TipoNodo.Asterisco,$1,null);}
         nodename {$$ = new NodoXpath(TipoNodo.ID,$1,null);}
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