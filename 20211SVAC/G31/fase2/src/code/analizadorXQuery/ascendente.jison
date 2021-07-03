%{
        const { Flwor, VariableFor, Where, Return, OrderBy } = require('./Instrucciones/Flwor'); 
        const { Tipo, TipoPath, PathExpresion, Camino } = require('./Expresiones/Expresion'); 
        const { Atributo } = require('./Expresiones/Axes')
        const { Primitivo } = require('./Expresiones/Primitivo'); 
        const { And, Or } = require('./Expresiones/Logicas') ; 
        const { Suma, Resta, Multiplicacion, Division, Positivo, Negativo } = require('./Expresiones/Aritmeticas')
        const { Menor, Mayor, MenorIgual, MayorIgual, Igualdad, Desigualdad } = require('./Expresiones/Relacional')
        const { If } = require('./Instrucciones/If')
        const { Parametro } = require('./Expresiones/Parametro')
        const { Funcion, CallFuncion } = require('./Instrucciones/Funcion')
        const { Declaracion, Asignacion } = require('./Expresiones/Declaracion')
        const { Consulta } = require('./Expresiones/Consulta')
        const { grafoCST } = require('../CST'); 
        const { Error } = require('./Tabla/Error')
        var grafoNuevo = new grafoCST(); 
        var ListaErrores = []


%}

/* Análisis Lexico */
%lex
%options case-sensitive

comentarios       (\(\:[\s\S]*?\:\))
variable          "$"([a-zñÑA-Z])[a-zA-ZñÑ0-9_]*
nodename          ([a-zñÑA-Z])[a-zA-ZñÑ0-9_-]*
digito            [0-9]+
decimal           {digito}?"."{digito}+
comillaSimple     "'"
comillaDoble      "\""
comillas          {comillaDoble}|{comillaSimple}
cadena            {comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas}
comentarios       "(:"[^]*":)"

%%
\s+               /* ignorar espacios en blanco */
{comentarios}     /* ignorar comentarios */

"//"                    return '//'
"/"                     return '/'
".."                    return '..'
"."                     return '.'
"::"                    return '::'
","                     return ','
":="                    return ':='
":"                     return ':'
"@"                     return '@'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
"|"                     return '|'
"{"                     return '{'
"}"                     return '}'
";"                     return ';'
//"$"                     return '$'

"integer"                 return 'integer'
"decimal"                 return 'prdecimal'
"function"                return 'function'
"local"                   return 'local'
"ancestor-or-self"        return 'ancestor-or-self'
"ancestor"                return 'ancestor'
"attribute"               return 'attribute'
"child"                   return 'child'
"descendant-or-self"      return 'descendant-or-self'
"descendant"              return 'descendant'
"following-sibling"       return 'following-sibling'
"following"               return 'following'
"last"                    return 'last'
"namespace"               return 'namespace'
"node"                    return 'node'
"parent"                  return 'parent'
"position"                return 'position'
"preceding-sibling"       return 'preceding-sibling'
"preceding"               return 'preceding'
"self"                    return 'self'
"text"                    return 'text'

"at"                      return 'at'
"as"                      return 'as'
"by"                      return 'by'
"declare"                 return 'declare'
"else"                    return 'else'
"for"                     return 'for'
"if"                      return 'if'
"in"                      return 'in'
"let"                     return 'let'
"order"                   return 'order'
"return"                  return 'return'
"then"                    return 'then'
"to"                      return 'to'
"variable"                return 'variable'
"where"                   return 'where'
"xs"                      return 'xs'

"eq"                      return 'eq'
"ne"                      return 'ne'
"lt"                      return 'lt'
"le"                      return 'le'
"gt"                      return 'gt'
"ge"                      return 'ge'

"and"                     return 'and'
"or"                      return 'or'
"<="                      return '<='
"<"                       return '<'
">="                      return '>='
">"                       return '>'
"="                       return '='
"!="                      return '!='
"*"                       return '*'
"div"                     return 'div'
"mod"                     return 'mod'
"+"                       return '+'
"-"                       return '-'

{variable}                return 'variable'
{nodename}                return 'nodename'
{decimal}                 return 'decimal'
{digito}                  return 'digito'
{cadena}                  { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<<EOF>>                   return 'EOF';

.                         {
                            ListaErrores.push(new Error('Léxico', `Patrón desconocido ${yytext}`, yylloc.first_line, yylloc.first_column));
                            console.log(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y columna ${yylloc.first_column}`);
                          }
/lex

/* Asociación y precedencia de operadores */
%right '='
%left 'or'
%left 'and'
%left '=', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' 'div' 'mod'
%left UMINUS UPLUS

%start RAIZ
%% /* Gramática */

RAIZ : DECLARACIONES EOF                {       grafoNuevo.generarPadre(1,"INICIO");
                                                grafoNuevo.generarHijos("INICIO");

                                                $$ = {
                                                        instrucciones: $1.instrucciones, 
                                                        errores: ListaErrores, 
                                                        grafo: grafoNuevo
                                                }
                                                ListaErrores = []
                                                return $$
                                        }
    | EOF                               { return 'Entrada vacia' }
 /*   | error                             {
                                                ListaErrores.push(new Error('Sintáctico', `Se obtuvo ${yytext}`, this._$.first_line, this._$.first_column));
                                                console.log(`Error Sintáctico: ${yytext} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                                        }*/
    ;



DECLARACIONES: EXPR                    {        
                                                grafoNuevo.generarHijos("EXPR")
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        } 
             ;
	

VAR_DECL : 'variable' VAR_NAME ':=' EXPR_SINGLE         {
                                                                $$ = {
                                                                        instrucciones: new Declaracion($2.consulta, Tipo.STRING, $4.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
	|  'variable' VAR_NAME TYPE_DECL ':=' EXPR_SINGLE       {
                                                                        $$ = {
                                                                                instrucciones: new Declaracion($2.consulta, $3.tipo, $4.instrucciones, this._$.first_line, this._$.first_column)
                                                                        }
                                                                }
	;

FUNC_DECL: 'function' 'local' ':' 'VAR_NAME' '(' PARAMS_LIST ')'  TYPE_DECL '{' EXPR '}'  
                                                                                                {
                                                                                                
                                                                                                        $$ = {
                                                                                                                instrucciones: new Funcion($4.consulta, $6.instrucciones, $10.instrucciones,  $8.tipo)
                                                                                                        }
                                                                                                }
        | 'function' 'local' ':' 'VAR_NAME' '(' ')'  TYPE_DECL '{' EXPR '}'  
                                                                                                {
                                                                                                
                                                                                                        $$ = {
                                                                                                                instrucciones: new Funcion($4.consulta, [] , $10.instrucciones,  $8.tipo)
                                                                                                        }
                                                                                                }
; 

PARAMS_LIST: PARAMS_LIST ',' PARAMS     {       $1.instrucciones.push($3.instrucciones)
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
        | PARAMS                        {
                                                $$ = {
                                                        instrucciones: [$1.instrucciones]
                                                }
                                        }
        ; 

PARAMS: VAR_NAME TYPE_DECL              {
                                                $$ = {
                                                        instrucciones: new Parametro($1.consulta, $2.tipo, this._$.first_line, this._$.first_column)
                                                }
                                        }
        ; 


CALL_FUNCT: 'local' ':' VAR_NAME '(' EXPR  ')'          {
                                                                $$ = {
                                                                        instrucciones: new CallFuncion($3.consulta, $5.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
        | 'local' ':' VAR_NAME '('  ')'                 {
                                                                $$ = {
                                                                        instrucciones: new CallFuncion($3.consulta, [], this._$.first_line, this._$.first_column)
                                                                }
                                                        }
        ; 


		
TYPE_DECL : 'as' ITEM_TYPE  {
                                        $$ = {
                                                tipo: $2.tipo
                                        }
                                }
        ;

ITEM_TYPE : KIND_TEST
          | PARENTHESIZED_EXPR          {
                                                        console.log('PASO POR AQUI')
                                        }
          | 'xs' '':' 'integer'                   {
                                                $$ = {
                                                        tipo: Tipo.INTEGER
                                                }
                                        }
          | 'xs' '':' 'prdecimal'                   {
                                                $$ = {
                                                        tipo: Tipo.DECIMAL
                                                }
                                        }
          ;


VAR_NAME : EQNAME       {
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
;


EXPR : EXPR ',' EXPR_SINGLE     {
                                        $1.instrucciones.push($3.instrucciones)
                                        $$ = {
                                                consulta: `${$1.consulta},${$3.consulta}`, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
     | EXPR ';' EXPR_SINGLE     {
                                        $1.instrucciones.push($3.instrucciones)
                                        $$ = {
                                                consulta: `${$1.consulta},${$3.consulta}`, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
     | EXPR_SINGLE      {
                                $$ = {
                                        consulta: $1.consulta,
                                        instrucciones: [$1.instrucciones]
                                }
                        }
     ;

EXPR_SINGLE : FLWOR_EXPR        {
                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
            | IF_EXPR           {
                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
            | OR_EXPR           {
                                        $$ = {
                                                consulta: $1.consulta,
                                                instrucciones: $1.instrucciones
                                        }
                                }

            | RETURN_CLAUSE     {
                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
        
            |  'declare' FUNC_DECL     {
                                                $$ = {
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
            | 'declare' VAR_DECL        {
                                                $$ = {
                                                        instrucciones: $2.instrucciones
                                                }
            }
            ;
			
FLWOR_EXPR: INITIAL_CLAUSE INTERMEDIATE_CLAUSE_LIST RETURN_CLAUSE       {       
                                                                                if($1.tipo == 'LET_CLAUSE'){
                                                                                        $$ = {
                                                                                                instrucciones: new Flwor($1.tipo, '', $1.instrucciones, $2.instrucciones, $3.instrucciones, this._$.first_line, this._$.first_column)
                                                                                        }
                                                                                }else{
                                                                                        $$ = {
                                                                                        instrucciones: new Flwor($1.tipo, '', $1.listaVaribles, $2.instrucciones, $3.instrucciones, this._$.first_line, this._$.first_column)
                                                                                        }
                                                                                }

                                                                                
                                                                        }
	|INITIAL_CLAUSE RETURN_CLAUSE                                   {       // Aqui tengo que cambiar estooo para el Let pero ya me voy a mimir
                                                                                if($1.tipo == 'LET_CLAUSE'){
                                                                                        $$ = {
                                                                                                instrucciones: new Flwor($1.tipo, '', $1.instrucciones, [], $2.instrucciones, this._$.first_line, this._$.first_column)
                                                                                        }
                                                                                }else{
                                                                                        $$ = {
                                                                                                instrucciones: new Flwor($1.tipo, '', $1.listaVaribles,[], $2.instrucciones, this._$.first_line, this._$.first_column)
                                                                                        }
                                                                                }
                                                                        }
	;
			
INITIAL_CLAUSE : FOR_CLAUSE     {
                                        $$ = {
                                                instrucciones: $1.instrucciones, 
                                                tipo: 'FOR_CLAUSE', 
                                                listaVaribles: $1.variables
                                        }
                                }
		|LET_CLAUSE     {
                                        $$ = {
                                                instrucciones: $1.instrucciones, 
                                                tipo: 'LET_CLAUSE'
                                        }
                                }
		;
		
INTERMEDIATE_CLAUSE_LIST: INTERMEDIATE_CLAUSE_LIST INTERMEDIATE_CLAUSE           {
                                                                                        $1.instrucciones.push($2.instrucciones)
                                                                                        $$ = {
                                                                                                instrucciones: $1.instrucciones
                                                                                        }
                                                                                }
                        |INTERMEDIATE_CLAUSE                                    {
                                                                                        $$ = {
                                                                                                instrucciones: [$1.instrucciones]
                                                                                        }
                                                                                }
                        ;


INTERMEDIATE_CLAUSE : INITIAL_CLAUSE    {
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }   
		|WHERE_CLAUSE           {
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
		|ORDERBY_CLAUSE         {
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
		;

					
FOR_CLAUSE : 'for' FOR_BINDING_LIST      {     
                                                $$ = {
                                                        variables: $2.variables
                                                }
}
;

FOR_BINDING_LIST: FOR_BINDING_LIST ',' FOR_BINDING      {       

                                                                $1.variables.push($3.variables); 
                                                                $$ = {
                                                                        variables: $1.variables
                                                                }
                                                        }       
		| FOR_BINDING                           {
                                                                $$ = {
                                                                        variables: [$1.variables]
                                                                }
                                                        }
		;
			
FOR_BINDING :  VAR_NAME  'at' VAR_NAME 'in' QUERY     {      
                                                                    $$ = {
                                                                        variables: new VariableFor(this._$.first_line, this._$.first_column, $1.consulta, $5.consulta, $3.consulta)
                                                                    }

                                                             }
		| VAR_NAME 'in' QUERY                      {      
                                                                   $$ = {
                                                                        variables: new VariableFor(this._$.first_line, this._$.first_column, $1.consulta, $3.consulta, null)
                                                                   }
                                                           }
		;
			

LET_CLAUSE: 'let'  LET_BINDING_LIST             {
                                                        $$ = {
                                                                instrucciones: $2.instrucciones
                                                        }
                                                }
;

LET_BINDING_LIST: LET_BINDING_LIST ',' LET_BINDING      {     $1.instrucciones.push($3.instrucciones)
                                                                $$ = {
                                                                        instrucciones: $1.instrucciones
                                                                }

                                                        }
		|LET_BINDING                            {
                                                                $$ = {
                                                                        instrucciones: [$1.instrucciones]
                                                                }
                                                        }
;

LET_BINDING	 :  VAR_NAME ':=' EXPR_SINGLE   {
                                                        $$ = {
                                                                instrucciones: new Asignacion($1.consulta, $3.instrucciones, this._$.first_line, this.first_column)
                                                        }
                                                }
;

WHERE_CLAUSE : 'where' EXPR_SINGLE  {  
                                                $$ = {
                                                        instrucciones: new Where(this._$.first_line, this._$.first_column, $2.consulta, $2.instrucciones)
                                                }
                                        }
;

ORDERBY_CLAUSE : 'order' 'by'  ORDER_SPEC_LIST          {
                                                                $$ = {
                                                                        instrucciones: new OrderBy($3.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
;

ORDER_SPEC_LIST : ORDER_SPEC_LIST ',' EXPR_SINGLE       {       
                                                                $1.instrucciones.push($3.instrucciones)
                                                                $$  = {
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }
		|EXPR_SINGLE                            {
                                                                $$ = {
                                                                        instrucciones: [$1.instrucciones]
                                                                }
                                                        }
;


RETURN_CLAUSE :  'return' EXPR_SINGLE   {
                                                $$ = {
                                                        instrucciones: new Return($2.instrucciones)
                                                }
                                        }
;

IF_EXPR : 'if' '(' EXPR ')' 'then' EXPR_SINGLE 'else' EXPR_SINGLE       {
                                                                                $$ = {
                                                                                        instrucciones: new If(this._$.first_line, this._$.first_column, $3.instrucciones, $6.instrucciones, $8.instrucciones )
                                                                                }
                                                                        }
; 


OR_EXPR : AND_EXPR                      {
                                                $$ = {
                                                        consulta: $1.consulta, 
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
        | OR_EXPR 'or'  AND_EXPR         {     // console.log('OR', $1.instrucciones, $3.instrucciones)
                                                $$ = {
                                                        consulta: `${$1.consulta} or ${$3.consulta}` , 
                                                        instrucciones: new Or(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones) 
                                                }
                                        }  
;        

AND_EXPR :  COMPARISON_EXPR                     {
                                                        $$ = {
                                                                consulta: $1.consulta, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
         | AND_EXPR 'and' COMPARISON_EXPR       {       
                                                    //   console.log('AND', $1.instrucciones, $3.instrucciones)
                                                        $$ = {
                                                                consulta: `${$1.consulta} and ${$3.consulta}`, 
                                                                instrucciones: new And(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones)
                                                        }
                                                }  
        ;


COMPARISON_EXPR : ADDITIVE_EXPR                         {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}`, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }
                | ADDITIVE_EXPR '<' ADDITIVE_EXPR       {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`,
                                                                        instrucciones: new Menor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '>' ADDITIVE_EXPR       {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Mayor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '<=' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MenorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '>=' ADDITIVE_EXPR      {       
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MayorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                } 

                                                        }
                | ADDITIVE_EXPR '=' ADDITIVE_EXPR       {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Igualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '!=' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Desigualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'eq' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Igualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'ne' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Desigualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'lt' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                         instrucciones: new Menor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'le' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MenorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'gt' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Mayor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'ge' ADDITIVE_EXPR      {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MayorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                ;

ADDITIVE_EXPR : MULTIPLICATIVE_EXPR                     {
                                                                $$ = {
                                                                        consulta: $1.consulta, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }   
              | ADDITIVE_EXPR '+' MULTIPLICATIVE_EXPR   {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Suma(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                }
                                                        }  
              | ADDITIVE_EXPR '-' MULTIPLICATIVE_EXPR   {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Resta(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones )
                                                                }
                                                        } 
              ;

MULTIPLICATIVE_EXPR : UNARY_EXPR                                {
                                                                        $$ = {
                                                                                consulta: $1.consulta, 
                                                                                instrucciones: $1.instrucciones
                                                                        }
                                                                }
                    | MULTIPLICATIVE_EXPR '*' UNARY_EXPR        {
                                                                        $$ = {
                                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                                instrucciones: new Multiplicacion(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                        }
                                                                }
                    | MULTIPLICATIVE_EXPR 'div' UNARY_EXPR      {
                                                                        $$ = {
                                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                                instrucciones: new Division(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                        }
                                                                }
                    ;

UNARY_EXPR  : QUERY                          {

                                                $$ = {
                                                        consulta: $1.consulta, 
                                                        instrucciones: new Consulta(Tipo.STRING,  $1.consulta, '', $1.instrucciones, this._$.first_line, this._$.first_column)
                                                }
                                             }
            | '-' UNARY_EXPR %prec UMINUS       {
                                                        $$ = {
                                                                consulta: `-${$2.consulta}`, 
                                                                instrucciones: new Negativo(this._$.first_line,this._$.first_column, Tipo.STRING, $2.instrucciones) 
                                                        }
                                                }
            | '+' UNARY_EXPR %prec UPLUS        {
                                                        $$ = {
                                                                consulta: `+${$2.consulta}`, 
                                                                instrucciones: new Positivo(this._$.first_line, this._$.first_column, Tipo.STRING, $2.instrucciones)
                                                        }
                                                }
            | CALL_FUNCT        {
                                        $$ = {
                                                consulta: $1.consulta, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
            ;


// Gramatica para la Consulta en XQuery 
QUERY :  '/' PATH_EXPR                  {
                                                $$ = {
                                                        consulta: `${$1}${$2.consulta}`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
      | '//' PATH_EXPR                  {       
                                                $$ = {
                                                        consulta: `${$1}${$2.consulta}`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
      | PATH_EXPR                       {
                                                $$ = {
                                                        consulta: `${$1.consulta}`, 
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
;   

PATH_EXPR : PATH_EXPR '/' STEP_EXPR             {       $1.instrucciones.push($3.instrucciones); 
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | PATH_EXPR '//' STEP_EXPR            {       $1.instrucciones.push($3.instrucciones); 
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | STEP_EXPR                           {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: [$1.instrucciones] 
                                                        }
                                                }
    ;      

STEP_EXPR : POST_FIX_EXPR                       {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | AXIS_STEP                           {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
     ;     

AXIS_STEP : REVERSE_STEP                        {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | REVERSE_STEP PREDICATE_LIST         {
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | FORWARD_STEP                        {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | FORWARD_STEP PREDICATE_LIST         {
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones   // aqui arreglar 
                                                        }
                                                }
          ;

FORWARD_STEP : 'attribute' '::' NODE_TEST               {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'child' '::' NODE_TEST                   {       
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }  
             | 'descendant' '::' NODE_TEST              {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }  
             | 'descendant-or-self' '::' NODE_TEST      {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        } 
             | 'following' '::' NODE_TEST               {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'following-sibling' '::' NODE_TEST       {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'namespace' '::' NODE_TEST               {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }      
             | 'self' '::' NODE_TEST                    {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }         
             | '@' NODE_TEST                            {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2.consulta} `, 
                                                                        instrucciones: $2.instrucciones
                                                                }
                                                        }   
             | NODE_TEST                                {
                                                                $$ = {
                                                                        consulta: `${$1.consulta}`, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }      
        ;

REVERSE_STEP : 'ancestor' '::' NODE_TEST                {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }   
             | 'ancestor-or-self' '::' NODE_TEST        {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }      
             | 'parent' '::' NODE_TEST                  {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }       
             | 'preceding' '::' NODE_TEST               {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }   
             | 'preceding-sibling' '::' NODE_TEST       {
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }     
             | '..'                                     {
                                                                $$ = {
                                                                        consulta: `${$1}`
                                                                }
                                                        }            
             ;

NODE_TEST : KIND_TEST   {
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          | EQNAME      {
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          | '*'         {
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          ;

POST_FIX_EXPR : PRIMARY_EXPR                    {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
              | PRIMARY_EXPR PREDICATE_LIST     {
                                                        $$ = {
                                                                consulta: `${$1.consulta} ${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
              ;

PREDICATE_LIST : PREDICATE_LIST PREDICATE       {
                                                        $$ = {
                                                                consulta: `${$1.consulta} ${$2.consulta}`
                                                        }
                                                }
               | PREDICATE                      {
                                                        $$ = { 
                                                                consulta: `${$1.consulta}`
                                                        }
                                                }
               ;

PREDICATE : '[' EXPR ']'        {
                                        $$ = { 
                                                consulta: `${$1}${$2.consulta}${$3}`
                                        }
                                }
          ;

PRIMARY_EXPR : PARENTHESIZED_EXPR       {
                                                $$ = {
                                                        consulta: `${$1.consulta}`,
                                                        instrucciones: $1.instrucciones
                                                }        
                                        }
             | '.'                      {
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: null

                                                }
                                        }
             | 'cadena'                 {
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.STRING, $1)
                                                }
                                        }
             | 'digito'                 {
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.INTEGER, $1)
                                                }
                                        }
             | 'decimal'                {
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.DECIMAL, $1)
                                                }
                                        } 
             | '[' ']'                  {
                                                $$ = {
                                                        consulta: `${$1}`
                                                }
                                        }
             | '[' QUERY_LIST ']'       {
                                                $$ = { 
                                                        consulta: `[${$2.consulta}]`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
             ;

PARENTHESIZED_EXPR : '(' ')'                            {
                                                                $$ = {
                                                                        consulta: `()`
                                                                }
                                                        }
                   | '(' EXPR ')'                       {      
                                                                $$ = {
                                                                        consulta: `(${$2.consulta})`, 
                                                                        instrucciones: $2.instrucciones
                                                                }
                                                        }
                   | '('  '$' 'VAR_NAME' 'EXPR' ')'        {
                                                                $$ = {
                                                                        consulta: `($${$3.consulta}${$4.consulta})`, 
                                                                        instrucciones: $4.instrucciones
                                                                }
                   }
                   ;

QUERY_LIST : QUERY_LIST ',' QUERY               {
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`
                                                        }
                                                }
           | QUERY                              {
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }         
           ;

KIND_TEST : 'text' '(' ')'                      {
                                                        $$ = {
                                                                consulta: `text()`
                                                        }
                                                }
          | 'node' '(' ')'                      {
                                                        $$ = {
                                                                consulta: `node()`
                                                        }
                                                }
          | 'last' '(' ')'                      {
                                                        $$ = {
                                                                consulta: `last()`
                                                        }
                                                }
          | 'position' '(' ')'                  {
                                                        $$ = {
                                                                consulta: `position()`
                                                        }
                                                }
          ;

EQNAME : 'nodename'               
       | 'ancestor-or-self'       
       | 'ancestor'               
       | 'attribute'              
       | 'child'                  
       | 'descendant-or-self'     
       | 'descendant'             
       | 'following-sibling'      
       | 'following'              
       | 'last'                   
       | 'namespace'              
       | 'node'                   
       | 'parent'                 
       | 'position'               
       | 'preceding-sibling'      
       | 'preceding'              
       | 'self'                   
       | 'text'                  
       | 'and'                    
       | 'or'                     
       | 'div'                   
       | 'mod'   
       | 'function'   
       | 'variable'         
       ;

ERROR : '/'
      | '//'
      | '::'
      | ']'
      | '['
      | '.'
      | '..'
      | '@'
      | '('
      | ')'
      ;

