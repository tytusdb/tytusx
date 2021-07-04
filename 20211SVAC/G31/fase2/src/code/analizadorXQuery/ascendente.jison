%{
        const { Flwor, VariableFor, Where, Return, OrderBy } = require('./Instrucciones/Flwor'); 
        const { Tipo, TipoPath, PathExpresion, Camino } = require('./Expresiones/Expresion'); 
        const { Atributo } = require('./Expresiones/Axes')
        const { Primitivo } = require('./Expresiones/Primitivo'); 
        const { And, Or } = require('./Expresiones/Logicas') ; 
        const { Suma, Resta, Multiplicacion, Division, Positivo, Negativo } = require('./Expresiones/Aritmeticas')
        const { Menor, Mayor, MenorIgual, MayorIgual, Igualdad, Desigualdad } = require('./Expresiones/Relacional')
        const { LowerFuncion, UpperFuncion, SubstringFuncion, Anumber, Astring } = require('./Instrucciones/FuncionN')
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

"string"                  return 'string'
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
"upper-case"              return 'uppercase'
"substring"               return 'substring'
"lower-case"              return 'lowercase'
"number"                  return 'number'

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
"variable"                return 'prvariable'
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
                            ListaErrores.push({Error: `Se encontro caracter desconocido ${yytext}`, tipo:`Léxico`, linea: yylloc.first_line, columna: yylloc.first_column});
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

RAIZ : DECLARACIONES EOF                {       grafoNuevo.generarPadre(1,"DECLARACIONES");
                                                grafoNuevo.generarHijos("DECLARACIONES");
                                                
                                                var retornoGrafo = Object.assign({}, grafoNuevo)
                                                var retornoErrores = Object.assign({}, ListaErrores)

                                                $$ = {
                                                        instrucciones: $1.instrucciones, 
                                                        errores: ListaErrores, 
                                                        grafo: retornoGrafo, 
                                                        grafoNodes: retornoGrafo.pilaNodos, 
                                                        grafoEdges: retornoGrafo.PilaEdges, 
                                                        
                                                }
                                                ListaErrores = []; 
                                                grafoNuevo = new grafoCST()
                                                
                                                return $$
                                        }
    | EOF                               { return 'Entrada vacia' }
    | error                             {
                                                ListaErrores.push({Error: `Se esperaba ${yy.parser.hash.expected} en lugar de ${yytext}`, tipo: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column});
                                                console.log(`Error Sintáctico: ${yytext} en la linea ${this._$.first_line} y columna ${this._$.first_column}`);
                                               
                                                var retornoErrores = Object.assign({}, ListaErrores)
                                                $$ = {
                                                        instrucciones: null, 
                                                        errores: ListaErrores, 
                                                        grafo: null, 
                                                        grafoNodes: null, 
                                                        grafoEdges: null
                                                }

                                                ListaErrores = []
                                                grafoNuevo = new grafoCST()
                                                return $$
                                        }
    ;



DECLARACIONES: EXPR                    {        grafoNuevo.generarPadre(1, "EXPR")
                                                grafoNuevo.generarHijos("EXPR")
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        } 
             ;
	

VAR_DECL : 'prvariable' VAR_NAME ':=' EXPR_SINGLE         {       grafoNuevo.generarPadre(4, "EXPR_SINGLE")
                                                                grafoNuevo.generarPadre(2, "VAR_NAME")
                                                               
                                                                grafoNuevo.generarHijos($1, "VAR_NAME", $3, "EXPR_SINGLE")

                                                                $$ = {
                                                                        instrucciones: new Declaracion($2.consulta, Tipo.STRING, $4.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
	|  'prvariable' VAR_NAME TYPE_DECL ':=' EXPR_SINGLE       {       grafoNuevo.generarPadre(5, "EXPR_SINGLE")
                                                                        grafoNuevo.generarPadre(3, "TYPE_DECL")
                                                                        grafoNuevo.generarPadre(2, "VAR_NAME")
                                                                        
                                                                        
                                                                        grafoNuevo.generarHijos($1, "VAR_NAME", "TYPE_DECL", $4, "EXPR_SINGLE")
                                                                        $$ = {
                                                                                instrucciones: new Declaracion($2.consulta, $3.tipo, $4.instrucciones, this._$.first_line, this._$.first_column)
                                                                        }
                                                                }
	;

FUNC_DECL: 'function' 'local' ':' 'VAR_NAME' '(' PARAMS_LIST ')'  TYPE_DECL '{' EXPR '}'  
                                                                                                {       grafoNuevo.generarPadre(10, "EXPR")
                                                                                                        grafoNuevo.generarPadre(8, "TYPE_DECL")
                                                                                                        grafoNuevo.generarPadre(6, "PARAMS_LIST")
                                                                                                        grafoNuevo.generarPadre(4, "VAR_NAME")

                                                                                                        grafoNuevo.generarHijos($1, $2, $3, "VAR_NAME", $5, "PARAMS_LIST", $7, "TYPE_DECL", $9, "EXPR", $11)
                                                                                                
                                                                                                        $$ = {
                                                                                                                instrucciones: new Funcion($4.consulta, $6.instrucciones, $10.instrucciones,  $8.tipo)
                                                                                                        }
                                                                                                }
        | 'function' 'local' ':' 'VAR_NAME' '(' ')'  TYPE_DECL '{' EXPR '}'  
                                                                                                {
                                                                                                        grafoNuevo.generarPadre(9, "EXPR")
                                                                                                        grafoNuevo.generarPadre(7, "TYPE_DECL")
                                                                                                        grafoNuevo.generarPadre(4, "VAR_NAME")                                                                                                        
                                                                                                        
                                                                                                        grafoNuevo.generarHijos($1, $2, $3, "VAR_NAME", $5, $6, "TYPE_DECL", $8, "EXPR", $10)

                                                                                                        $$ = {
                                                                                                                instrucciones: new Funcion($4.consulta, [] , $10.instrucciones,  $8.tipo)
                                                                                                        }
                                                                                                }
; 

PARAMS_LIST: PARAMS_LIST ',' PARAMS     {       
                                                grafoNuevo.generarPadre(3, "PARAMS")
                                                grafoNuevo.generarPadre(1, "PARAMS_LIST")
                                                
                                                grafoNuevo.generarHijos("PARAMS_LIST", $2, "PARAMS")

                                                $1.instrucciones.push($3.instrucciones)
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
        | PARAMS                        {
                                                grafoNuevo.generarPadre(1, "PARAMS"); 
                                                grafoNuevo.generarHijos("PARAMS")
                                                $$ = {
                                                        instrucciones: [$1.instrucciones]
                                                }
                                        }
        ; 

PARAMS: VAR_NAME TYPE_DECL              {       
                                                grafoNuevo.generarPadre(2, "TYPE_DECL")
                                                grafoNuevo.generarPadre(1, "VAR_NAME")
                                                
                                                grafoNuevo.generarHijos("VAR_NAME", "TYPE_DECL")

                                                $$ = {
                                                        instrucciones: new Parametro($1.consulta, $2.tipo, this._$.first_line, this._$.first_column)
                                                }
                                        }
        ; 


CALL_FUNCT: 'local' ':' VAR_NAME '(' EXPR  ')'          {
                                                                grafoNuevo.generarPadre(5, "EXPR")
                                                                grafoNuevo.generarPadre(3, "VAR_NAME")
                                                                
                                                                grafoNuevo.generarHijos($1, $2, "VAR_NAME", $4, "EXPR", $6)
                                                                $$ = {
                                                                        instrucciones: new CallFuncion($3.consulta, $5.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
        | 'local' ':' VAR_NAME '('  ')'                 {       
                                                                grafoNuevo.generarPadre(3, "VAR_NAME")
                                                                grafoNuevo.generarHijos($1, $2, "VAR_NAME", $4, $5)
                                                                $$ = {
                                                                        instrucciones: new CallFuncion($3.consulta, [], this._$.first_line, this._$.first_column)
                                                                }
                                                        }
        ; 


		
TYPE_DECL : 'as' ITEM_TYPE  {           grafoNuevo.generarPadre(2, "ITEM_TYPE")
                                        grafoNuevo.generarHijos($1, "ITEM_TYPE")
                                        $$ = {
                                                tipo: $2.tipo
                                        }
                                }
        ;

ITEM_TYPE : KIND_TEST                   {
                                                grafoNuevo.generarPadre(1, "KIND_TEST")
                                                grafoNuevo.generarHijos("KIND_TEST")
                                        }
          | PARENTHESIZED_EXPR          {
                                                grafoNuevo.generarPadre(1, "PARENTHESIZED_EXPR")      
                                                grafoNuevo.generarPadre("PARENTHESIZED")
                                        }
          | 'xs' '':' 'integer'         {
                                                grafoNuevo.generarHijos($1, $2, $3)
                                                $$ = {
                                                        tipo: Tipo.INTEGER
                                                }
                                        }
          | 'xs' '':' 'prdecimal'       {       
                                                grafoNuevo.generarHijos($1, $2, $3)
                                                $$ = {
                                                        tipo: Tipo.DECIMAL
                                                }
                                        }
          
          | 'xs' ':' 'string'           {
                                                grafoNuevo.generarHijos($1, $2, $3)
                                                $$ = {
                                                        tipo: Tipo.STRING
                                                }
                                        }
          ;


VAR_NAME : EQNAME       {       grafoNuevo.generarPadre(1,"EQNAME")
                                grafoNuevo.generarHijos("EQNAME")
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
;


EXPR : EXPR ',' EXPR_SINGLE     {       grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                        grafoNuevo.generarPadre(1, "EXPR")
                                        
                                        grafoNuevo.generarHijos("EXPR", ",","EXPR_SINGLE")
                                        
                                        $1.instrucciones.push($3.instrucciones)
                                        $$ = {
                                                consulta: `${$1.consulta},${$3.consulta}`, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
     | EXPR ';' EXPR_SINGLE     {       grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                        grafoNuevo.generarPadre(1, "EXPR")
                                                                               
                                        grafoNuevo.generarHijos("EXPR", ";","EXPR_SINGLE")

                                        $1.instrucciones.push($3.instrucciones)
                                        $$ = {
                                                consulta: `${$1.consulta},${$3.consulta}`, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
     | EXPR_SINGLE      {       
                                grafoNuevo.generarPadre(1, "EXPR_SINGLE")
                                grafoNuevo.generarHijos("EXPR_SINGLE")

                                $$ = {
                                        consulta: $1.consulta,
                                        instrucciones: [$1.instrucciones]
                                }
                        }
     ;

EXPR_SINGLE : FLWOR_EXPR        {       grafoNuevo.generarPadre(1, "FLWOR_EXPR")
                                        grafoNuevo.generarHijos("FLWOR_EXPR")

                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
            | IF_EXPR           {       grafoNuevo.generarPadre(1, "IF_EXPR")
                                        grafoNuevo.generarHijos("IF_EXPR")

                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
            | OR_EXPR           {       grafoNuevo.generarPadre(1, "OR_EXPR")
                                        grafoNuevo.generarHijos("OR_EXPR")

                                        $$ = {
                                                consulta: $1.consulta,
                                                instrucciones: $1.instrucciones
                                        }
                                }

            | RETURN_CLAUSE     {       grafoNuevo.generarPadre(1, "RETURN_CLAUSE")
                                        grafoNuevo.generarHijos("RETURN_CLAUSE")

                                        $$ = {
                                                instrucciones: $1.instrucciones
                                        }
                                }
        
            |  'declare' FUNC_DECL     {        grafoNuevo.generarPadre(2, "FUNC_DECL")
                                                grafoNuevo.generarHijos("declare", "FUNC_DECL")

                                                $$ = {
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
            | 'declare' VAR_DECL        {       grafoNuevo.generarPadre(2, "VAR_DECL")
                                                grafoNuevo.generarHijos("declare", "VAR_DECL")

                                                $$ = {
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
            | 'lowercase' '(' EXPR_SINGLE ')'           {
                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE"); 
                                                                grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4); 
                                                                
                                                                $$ = {
                                                                        instrucciones: new LowerFuncion($3.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        } 
            | 'uppercase' '(' EXPR_SINGLE ')'           {
                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE"); 
                                                                grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4); 

                                                                $$ = {
                                                                        instrucciones: new UpperFuncion($3.instrucciones, this._$.first_line, this._$.first_column)

                                                                }
                                                        }                  

        | 'string' '(' EXPR_SINGLE ')'                  {
                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                                grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4)

                                                                $$ = {
                                                                        instrucciones: new Astring($3.instrucciones, this._$.first_line, this._$.first_column)
                                                                }

                                                        }             
        | 'number' '(' EXPR_SINGLE ')'                  {
                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                                grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4)

                                                                $$ = {
                                                                        instrucciones: new Anumber($3.instrucciones, this._$.first_line, this.$.first_column)
                                                                }
                                                               
                                                        }
        | 'substring' '(' EXPR_SINGLE ',' EXPR_SINGLE ',' EXPR_SINGLE ')'       {       grafoNuevo.generarPadre(7, "EXPR_SINGLE")
                                                                                        grafoNuevo.generarPadre(5, "EXPR_SINGLE")
                                                                                        grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                                                        grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4, "EXPR_SINGLE", $6, "EXPR_SINGLE", $8)
                                                                                        $$ = {
                                                                                                instrucciones: new SubstringFuncion($3.instrucciones, $5.instrucciones, $7.instrucciones,this._$.first_line, this._$.first_column )
                                                                                        }
                                                                                }
        | 'substring'  '(' EXPR_SINGLE ',' EXPR_SINGLE ')'              {
                                                                                
                                                                                grafoNuevo.generarPadre(5, "EXPR_SINGLE")
                                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                                                grafoNuevo.generarHijos($1, $2, "EXPR_SINGLE", $4, "EXPR_SINGLE", $6,)
                                                                                $$ = {
                                                                                        instrucciones: new SubstringFuncion($3.instrucciones, $5.instrucciones, null ,this._$.first_line, this._$.first_column )
                                                                                }
                                                                        }
        ; 
			
FLWOR_EXPR: INITIAL_CLAUSE INTERMEDIATE_CLAUSE_LIST RETURN_CLAUSE       {       grafoNuevo.generarPadre(3, "RETURN_CLAUSE")
                                                                                grafoNuevo.generarPadre(2, "INTERMEDIA_CLAUSE")
                                                                                grafoNuevo.generarPadre(1, "INITIAL_CLAUSE")
                                                                                grafoNuevo.generarHijos("INTIAL_CLAUSE", "INTERMEDIA_CLAUSE", "RETURN_CLAUSE")

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
	|INITIAL_CLAUSE RETURN_CLAUSE                                   {       
                                                                                grafoNuevo.generarPadre(2, "RETURN_CLAUSE")
                                                                                grafoNuevo.generarPadre(1, "INITIAL_CLAUSE")
                                                                                
                                                                                grafoNuevo.generarHijos("INTIAL_CLAUSE",  "RETURN_CLAUSE")

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
			
INITIAL_CLAUSE : FOR_CLAUSE     {       grafoNuevo.generarPadre(1, "FOR_CLAUSE")
                                        grafoNuevo.generarHijos("FOR_CLAUSE")
                                        $$ = {
                                                instrucciones: $1.instrucciones, 
                                                tipo: 'FOR_CLAUSE', 
                                                listaVaribles: $1.variables
                                        }
                                }
		|LET_CLAUSE     {       grafoNuevo.generarPadre(1, "LET_CLAUSE")
                                        grafoNuevo.generarHijos("LET_CLAUSE")
                                        $$ = {
                                                instrucciones: $1.instrucciones, 
                                                tipo: 'LET_CLAUSE'
                                        }
                                }
		;
		
INTERMEDIATE_CLAUSE_LIST: INTERMEDIATE_CLAUSE_LIST INTERMEDIATE_CLAUSE           {      grafoNuevo.generarPadre(2, "INTERMEDIATE_CLAUSE")
                                                                                        grafoNuevo.generarPadre(1, "INTERMEDIATE_CLAUSE_LIST")
                                                                                        
                                                                                        grafoNuevo.generarHijos("INTERMEDIATE_CLAUSE_LIST", "INTERMEDIATE_CLAUSE")

                                                                                        $1.instrucciones.push($2.instrucciones)
                                                                                        $$ = {
                                                                                                instrucciones: $1.instrucciones
                                                                                        }
                                                                                }
                        |INTERMEDIATE_CLAUSE                                    {       grafoNuevo.generarPadre(1, "INTERMEDIATE_CLAUSE")
                                                                                        grafoNuevo.generarHijos("INTERMEDIATE_CLAUSE")
                                                                                        
                                                                                        $$ = {
                                                                                                instrucciones: [$1.instrucciones]
                                                                                        }
                                                                                }
                        ;


INTERMEDIATE_CLAUSE : INITIAL_CLAUSE    {       grafoNuevo.generarPadre(1, "INITIAL_CLAUSE")
                                                grafoNuevo.generarHijos("INITIAL_CLAUSE")

                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }   
		|WHERE_CLAUSE           {       grafoNuevo.generarPadre(1, "WHERE_cLAUSE")
                                                grafoNuevo.generarHijos("WHERE_CLAUSE")

                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
		|ORDERBY_CLAUSE         {       grafoNuevo.generarPadre(1, "ORDERBY_CLAUSE")
                                                grafoNuevo.generarHijos("ORDERBY_CLAUSE")
                                                $$ = {
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
		;

					
FOR_CLAUSE : 'for' FOR_BINDING_LIST      {      grafoNuevo.generarPadre(2, "FOR_BINDING_LIST")
                                                grafoNuevo.generarHijos($1, "FOR_BINDING_LIST")
                                                $$ = {
                                                        variables: $2.variables
                                                }
}
;

FOR_BINDING_LIST: FOR_BINDING_LIST ',' FOR_BINDING      {       
                                                                grafoNuevo.generarPadre(2, "FOR_BINDING")
                                                                grafoNuevo.generarPadre(1, "FOR_BINDING_LIST")
                                                                
                                                                grafoNuevo.generarHijos("FOR_BINDING_LIST", $2, "FOR_BINDING")

                                                                $1.variables.push($3.variables); 
                                                                $$ = {
                                                                        variables: $1.variables
                                                                }
                                                        }       
		| FOR_BINDING                           {       grafoNuevo.generarPadre(1, "FOR_BINDING")
                                                                grafoNuevo.generarHijos("FOR_BINDING")

                                                                $$ = {
                                                                        variables: [$1.variables]
                                                                }
                                                        }
		;
			
FOR_BINDING :  VAR_NAME  'at' VAR_NAME 'in' QUERY     {         grafoNuevo.generarPadre(5, "QUERY")
                                                                grafoNuevo.generarPadre(3, "VAR_NAME")
                                                                grafoNuevo.generarPadre(1, "VAR_NAME")
                                                                grafoNuevo.generarHijos("VAR_NAME", $2, "VAR_NAME", $4, "QUERY")

                                                                    $$ = {
                                                                        variables: new VariableFor(this._$.first_line, this._$.first_column, $1.consulta, $5.consulta, $3.consulta)
                                                                    }

                                                             }
		| VAR_NAME 'in' QUERY                      {    grafoNuevo.generarPadre(3, "QUERY")
                                                                grafoNuevo.generarPadre(1, "VAR_NAME")
                                                                
                                                                grafoNuevo.generarHijos("VAR_NAME", $2, "QUERY")

                                                                   $$ = {
                                                                        variables: new VariableFor(this._$.first_line, this._$.first_column, $1.consulta, $3.consulta, null)
                                                                   }
                                                           }
		;
			

LET_CLAUSE: 'let'  LET_BINDING_LIST             {       grafoNuevo.generarPadre(2, "LET_BINDING_LIST")
                                                        grafoNuevo.generarHijos($1, "LET_BINDING_LIST")
                                                        $$ = {
                                                                instrucciones: $2.instrucciones
                                                        }
                                                }
;

LET_BINDING_LIST: LET_BINDING_LIST ',' LET_BINDING      {     
                                                                grafoNuevo.generarPadre(3, "LET_BINDING")
                                                                grafoNuevo.generarPadre(1, "LET_BINDING_LIST");
                                                                
                                                                grafoNuevo.generarHijos("LET_BINDING_LIST", $2, "LET_BINDING")

                                                                $1.instrucciones.push($3.instrucciones)
                                                                $$ = {
                                                                        instrucciones: $1.instrucciones
                                                                }

                                                        }
		|LET_BINDING                            {       grafoNuevo.generarPadre(1, "LET_BINDING")
                                                                grafoNuevo.generarHijos("LET_BINDING")
                                                                $$ = {
                                                                        instrucciones: [$1.instrucciones]
                                                                }
                                                        }
;

LET_BINDING	 :  VAR_NAME ':=' EXPR_SINGLE   {       
                                                        grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                        grafoNuevo.generarPadre(1, "VAR_NAME")
                                                       
                                                        grafoNuevo.generarHijos("VAR_NAME", $2, "EXPR_SINGLE")
                                                        $$ = {
                                                                instrucciones: new Asignacion($1.consulta, $3.instrucciones, this._$.first_line, this.first_column)
                                                        }
                                                }
;

WHERE_CLAUSE : 'where' EXPR_SINGLE  {           grafoNuevo.generarPadre(2, "EXPR_SINGLE")
                                                grafoNuevo.generarHijos($1, "EXPR_SINGLE")
                                                $$ = {
                                                        instrucciones: new Where(this._$.first_line, this._$.first_column, $2.consulta, $2.instrucciones)
                                                }
                                        }
;

ORDERBY_CLAUSE : 'order' 'by'  ORDER_SPEC_LIST          {       grafoNuevo.generarPadre(3, "ORDER_SPEC_LIST")
                                                                grafoNuevo.generarHijos($1, $2, "ORDER_SPEC_LIST")
                                                                $$ = {
                                                                        instrucciones: new OrderBy($3.instrucciones, this._$.first_line, this._$.first_column)
                                                                }
                                                        }
;

ORDER_SPEC_LIST : ORDER_SPEC_LIST ',' EXPR_SINGLE       {       
                                                                grafoNuevo.generarPadre(3, "EXPR_SINGLE")
                                                                grafoNuevo.generarPadre(1, "ORDER_SPEC_LIST")
                                                                
                                                                grafoNuevo.generarHijos("ORDER_SPEC_LIST", $2, "EXPR_SINGLE")

                                                                $1.instrucciones.push($3.instrucciones)
                                                                $$  = {
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }
		|EXPR_SINGLE                            {       grafoNuevo.generarPadre(1, "EXPR_SINGLE")
                                                                grafoNuevo.generarHijos("EXPR_SINGLE")
                                                                $$ = {
                                                                        instrucciones: [$1.instrucciones]
                                                                }
                                                        }
;


RETURN_CLAUSE :  'return' EXPR_SINGLE   {       grafoNuevo.generarPadre(2, "EXPR_SINGLE")       
                                                grafoNuevo.generarHijos($1 ,"EXPR_SINGLE")
                                                $$ = {
                                                        instrucciones: new Return($2.instrucciones)
                                                }
                                        }
;

IF_EXPR : 'if' '(' EXPR ')' 'then' EXPR_SINGLE 'else' EXPR_SINGLE       {       
                                                                                grafoNuevo.generarPadre(8, "EXPR_SINGLE")
                                                                                grafoNuevo.generarPadre(6, "EXPR_SINGLE")
                                                                                grafoNuevo.generarPadre(3, "EXPR")
                                                                                grafoNuevo.generarHijos($1, $2, "EXPR", $4, $5, "EXPR_SINGLE", $7, "EXPR_SINGLE")
                                                                                $$ = {
                                                                                        instrucciones: new If(this._$.first_line, this._$.first_column, $3.instrucciones, $6.instrucciones, $8.instrucciones )
                                                                                }
                                                                        }
; 


OR_EXPR : AND_EXPR                      {       
                                                grafoNuevo.generarPadre(1, "AND_EXPR")
                                                grafoNuevo.generarHijos("AND_EXPR")

                                                $$ = {
                                                        consulta: $1.consulta, 
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
        | OR_EXPR 'or'  AND_EXPR         {     // console.log('OR', $1.instrucciones, $3.instrucciones)
                                                grafoNuevo.generarPadre(3, "AND_EXPR")
                                                grafoNuevo.generarPadre(1, "OR_EXPR")
                                                
                                                grafoNuevo.generarHijos("OR_EXPR", $2, "AND_EXPR")
                                                $$ = {
                                                        consulta: `${$1.consulta} or ${$3.consulta}` , 
                                                        instrucciones: new Or(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones) 
                                                }
                                        }  
;        

AND_EXPR :  COMPARISON_EXPR                     {       grafoNuevo.generarPadre(1, "COMPARISON_EXPR")
                                                        grafoNuevo.generarHijos("COMPARISON_EXPR")
                                                        $$ = {
                                                                consulta: $1.consulta, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
         | AND_EXPR 'and' COMPARISON_EXPR       {       
                                                    //   console.log('AND', $1.instrucciones, $3.instrucciones)
                                                        grafoNuevo.generarPadre(3, "COMPARISON_EXPR")
                                                        grafoNuevo.generarPadre(1, "AND_EXPR")
                                                        
                                                        grafoNuevo.generarHijos("AND_EXPR", $2, "COMPARISON_EXPR")

                                                        $$ = {
                                                                consulta: `${$1.consulta} and ${$3.consulta}`, 
                                                                instrucciones: new And(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones)
                                                        }
                                                }  
        ;


COMPARISON_EXPR : ADDITIVE_EXPR                         {       
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}`, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }
                | ADDITIVE_EXPR '<' ADDITIVE_EXPR       {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`,
                                                                        instrucciones: new Menor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '>' ADDITIVE_EXPR       {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Mayor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '<=' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MenorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '>=' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MayorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                } 

                                                        }
                | ADDITIVE_EXPR '=' ADDITIVE_EXPR       {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Igualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR '!=' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Desigualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, false)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'eq' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Igualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'ne' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Desigualdad(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'lt' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                         instrucciones: new Menor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'le' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MenorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'gt' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Mayor(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                | ADDITIVE_EXPR 'ge' ADDITIVE_EXPR      {       grafoNuevo.generarPadre(3, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "ADDITIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new MayorIgual(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.BOOLEAN, $1.instrucciones, $3.instrucciones, true)
                                                                }
                                                        }
                ;

ADDITIVE_EXPR : MULTIPLICATIVE_EXPR                     {       grafoNuevo.generarPadre(1, "MULTIPLICATIVE_EXPR")
                                                                grafoNuevo.generarHijos("MULTIPLICATIVE_EXPR")
                                                                $$ = {
                                                                        consulta: $1.consulta, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }   
              | ADDITIVE_EXPR '+' MULTIPLICATIVE_EXPR   {       grafoNuevo.generarPadre(3, "MULTIPLICATIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "MULTIPLICATIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Suma(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                }
                                                        }  
              | ADDITIVE_EXPR '-' MULTIPLICATIVE_EXPR   {       grafoNuevo.generarPadre(3, "MULTIPLICATIVE_EXPR")
                                                                grafoNuevo.generarPadre(1, "ADDITIVE_EXPR")
                                                                grafoNuevo.generarHijos("ADDITIVE_EXPR", $2, "MULTIPLICATIVE_EXPR")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                        instrucciones: new Resta(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones )
                                                                }
                                                        } 
              ;

MULTIPLICATIVE_EXPR : UNARY_EXPR                                {       grafoNuevo.generarPadre(1, "UNARY_EXPR")
                                                                        grafoNuevo.generarHijos("UNARY_EXPR")
                                                                        $$ = {
                                                                                consulta: $1.consulta, 
                                                                                instrucciones: $1.instrucciones
                                                                        }
                                                                }
                    | MULTIPLICATIVE_EXPR '*' UNARY_EXPR        {       grafoNuevo.generarPadre(3, "UNARY_EXPR")
                                                                        grafoNuevo.generarPadre(1, "MULTIPLICATIVE_EXPR")
                                                                        
                                                                        grafoNuevo.generarHijos("MULTIPLICATIVE_EXPR", $2, "UNARY_EXPR")
                                                                        $$ = {
                                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                                instrucciones: new Multiplicacion(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                        }
                                                                }
                    | MULTIPLICATIVE_EXPR 'div' UNARY_EXPR      {       grafoNuevo.generarPadre(3, "UNARY_EXPR")
                                                                        grafoNuevo.generarPadre(1, "MULTIPLICATIVE_EXPR")
                                                                        grafoNuevo.generarHijos("MULTIPLICATIVE_EXPR", $2, "UNARY_EXPR")
                                                                        $$ = {
                                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                                instrucciones: new Division(this._$.first_line, this._$.first_column, Tipo.STRING, $1.instrucciones, $3.instrucciones)
                                                                        }
                                                                }
                    ;

UNARY_EXPR  : QUERY                          {
                                                grafoNuevo.generarPadre(1, "QUERY"); 
                                                grafoNuevo.generarHijos("QUERY")
                                                $$ = {
                                                        consulta: $1.consulta, 
                                                        instrucciones: new Consulta(Tipo.STRING,  $1.consulta, '', $1.instrucciones, this._$.first_line, this._$.first_column)
                                                }
                                             }
            | '-' UNARY_EXPR %prec UMINUS       {       
                                                        grafoNuevo.generarPadre(2, "UNARY_EXPR"); 
                                                        grafoNuevo.generarHijos($1, "UNARY_EXPR")
                                                        $$ = {
                                                                consulta: `-${$2.consulta}`, 
                                                                instrucciones: new Negativo(this._$.first_line,this._$.first_column, Tipo.STRING, $2.instrucciones) 
                                                        }
                                                }
            | '+' UNARY_EXPR %prec UPLUS        {
                                                        grafoNuevo.generarPadre(2, "UNARY_EXPR"); 
                                                        grafoNuevo.generarHijos($1, "UNARY_EXPR")
                                                        $$ = {
                                                                consulta: `+${$2.consulta}`, 
                                                                instrucciones: new Positivo(this._$.first_line, this._$.first_column, Tipo.STRING, $2.instrucciones)
                                                        }
                                                }
            | CALL_FUNCT        {       
                                        grafoNuevo.generarPadre(1, "CALL_FUNCT")
                                        grafoNuevo.generarHijos("CALL_FUNCT")
                                        $$ = {
                                                consulta: $1.consulta, 
                                                instrucciones: $1.instrucciones
                                        }
                                }
            ;


// Gramatica para la Consulta en XQuery 
QUERY :  '/' PATH_EXPR                  {       grafoNuevo.generarPadre(2, "PATH_EXPR")
                                                grafoNuevo.generarHijos($1, "PATH_EXPR")
                                                $$ = {
                                                        consulta: `${$1}${$2.consulta}`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
      | '//' PATH_EXPR                  {       grafoNuevo.generarPadre(2, "PATH_EXPR")
                                                grafoNuevo.generarHijos($1, "PATH_EXPR")
                                                $$ = {
                                                        consulta: `${$1}${$2.consulta}`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
      | PATH_EXPR                       {       grafoNuevo.generarPadre(1, "PATH_EXPR")
                                                grafoNuevo.generarHijos("PATH_EXPR")
                                                $$ = {
                                                        consulta: `${$1.consulta}`, 
                                                        instrucciones: $1.instrucciones
                                                }
                                        }
;   

PATH_EXPR : PATH_EXPR '/' STEP_EXPR             {       grafoNuevo.generarPadre(3, "STEP_EXPR")
                                                        grafoNuevo.generarPadre(1, "PATH_EXPR")
                                                        grafoNuevo.generarHijos("PATH_EXPR", $2, "STEP_EXPR")        
                                                        $1.instrucciones.push($3.instrucciones); 
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | PATH_EXPR '//' STEP_EXPR            {       grafoNuevo.generarPadre(3, "STEP_EXPR")
                                                        grafoNuevo.generarPadre(1, "PATH_EXPR")
                                                        
                                                        grafoNuevo.generarHijos("PATH_EXPR", $2, "STEP_EXPR")

                                                        $1.instrucciones.push($3.instrucciones); 
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | STEP_EXPR                           {       grafoNuevo.generarPadre(1, "STEP_EXPR")
                                                        grafoNuevo.generarHijos("STEP_EXPR")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: [$1.instrucciones] 
                                                        }
                                                }
    ;      

STEP_EXPR : POST_FIX_EXPR                       {       grafoNuevo.generarPadre(1, "POST_FIX_EXPR")
                                                        grafoNuevo.generarHijos("POST_FIX_EXPR")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | AXIS_STEP                           {       grafoNuevo.generarPadre(1, "AXIS_STEP")
                                                        grafoNuevo.generarHijos("AXIS_STEP")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
     ;     

AXIS_STEP : REVERSE_STEP                        {       grafoNuevo.generarPadre(1, "REVERSE_STEP")
                                                        grafoNuevo.generarHijos("REVERSE_STEP")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | REVERSE_STEP PREDICATE_LIST         {       grafoNuevo.generarPadre(2, "PREDICATE_LIST")
                                                        grafoNuevo.generarPadre(1, "REVERSE_STEP")
                                                        
                                                        grafoNuevo.generarHijos("REVERSE_STEP", "PREDICATE_LIST")
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | FORWARD_STEP                        {       grafoNuevo.generarPadre(1, "FORWARD_STEP")
                                                        grafoNuevo.generarHijos("FORWARD_STEP")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
          | FORWARD_STEP PREDICATE_LIST         {       grafoNuevo.generarPadre(2, "PREDICATE_LIST")
                                                        grafoNuevo.generarPadre(1, "FORWARD_STEP")
                                                        
                                                        grafoNuevo.generarHijos("FORWARD_STEP", "PREDICATE_LIST")
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones   // aqui arreglar 
                                                        }
                                                }
          ;

FORWARD_STEP : 'attribute' '::' NODE_TEST               {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {  
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'child' '::' NODE_TEST                   {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")         
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }  
             | 'descendant' '::' NODE_TEST              {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }  
             | 'descendant-or-self' '::' NODE_TEST      {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        } 
             | 'following' '::' NODE_TEST               {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'following-sibling' '::' NODE_TEST       {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }
             | 'namespace' '::' NODE_TEST               {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }      
             | 'self' '::' NODE_TEST                    {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3.consulta}`
                                                                }
                                                        }         
             | '@' NODE_TEST                            {       grafoNuevo.generarPadre(2, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2.consulta} `, 
                                                                        instrucciones: $2.instrucciones
                                                                }
                                                        }   
             | NODE_TEST                                {       grafoNuevo.generarPadre(1, "NODE_TEST")
                                                                grafoNuevo.generarHijos("NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1.consulta}`, 
                                                                        instrucciones: $1.instrucciones
                                                                }
                                                        }      
        ;

REVERSE_STEP : 'ancestor' '::' NODE_TEST                {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }   
             | 'ancestor-or-self' '::' NODE_TEST        {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }      
             | 'parent' '::' NODE_TEST                  {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }       
             | 'preceding' '::' NODE_TEST               {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }   
             | 'preceding-sibling' '::' NODE_TEST       {       grafoNuevo.generarPadre(3, "NODE_TEST")
                                                                grafoNuevo.generarHijos($1, $2, "NODE_TEST")
                                                                $$ = {
                                                                        consulta: `${$1} ${$2} ${$3}`
                                                                }
                                                        }     
             | '..'                                     {       grafoNuevo.generarHijos($1)
                                                                $$ = {
                                                                        consulta: `${$1}`
                                                                }
                                                        }            
             ;

NODE_TEST : KIND_TEST   {       grafoNuevo.generarPadre(1, "KIND_TEST")
                                grafoNuevo.generarHijos("KIND_TEST")
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          | EQNAME      {       grafoNuevo.generarPadre(1, "EQNAME")
                                grafoNuevo.generarHijos($1)
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          | '*'         {       grafoNuevo.generarHijos($1)
                                $$ = {
                                        consulta: `${$1}`
                                }
                        }
          ;

POST_FIX_EXPR : PRIMARY_EXPR                    {       
                                                        grafoNuevo.generarPadre(1, "PRIMARY_EXPR")
                                                        grafoNuevo.generarHijos("PRIMARY_EXPR")
                                                        $$ = {
                                                                consulta: `${$1.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
              | PRIMARY_EXPR PREDICATE_LIST     {       grafoNuevo.generarPadre(1, "PRIMARY_EXPR")
                                                        grafoNuevo.generarPadre(2, "PREDICATE_LIST")
                                                        $$ = {
                                                                consulta: `${$1.consulta} ${$2.consulta}`, 
                                                                instrucciones: $1.instrucciones
                                                        }
                                                }
              ;

PREDICATE_LIST : PREDICATE_LIST PREDICATE       {       grafoNuevo.generarPadre(1, "PREDICATE_LIST")
                                                        grafoNuevo.generarPadre(2, "PREDICATE")
                                                        $$ = {
                                                                consulta: `${$1.consulta} ${$2.consulta}`
                                                        }
                                                }
               | PREDICATE                      {       grafoNuevo.generarPadre(1, "PREDICATE")
                                                        grafoNuevo.generarHijos("PREDICATE")
                                                        $$ = { 
                                                                consulta: `${$1.consulta}`
                                                        }
                                                }
               ;

PREDICATE : '[' EXPR ']'        {       grafoNuevo.generarPadre(2, "EXPR")
                                        grafoNuevo.generarHijos($1, "EXPR", $3)
                                        $$ = { 
                                                consulta: `${$1}${$2.consulta}${$3}`
                                        }
                                }
          ;

PRIMARY_EXPR : PARENTHESIZED_EXPR       {       grafoNuevo.generarPadre(1, "PARENTHESIZED_EXPR")
                                                grafoNuevo.generarHijos("PARENTHESIZED_EXPR")
                                                $$ = {
                                                        consulta: `${$1.consulta}`,
                                                        instrucciones: $1.instrucciones
                                                }        
                                        }
             | '.'                      {       grafoNuevo.generarHijos($1)
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: null

                                                }
                                        }
             | 'cadena'                 {       grafoNuevo.generarHijos($1)
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.STRING, $1)
                                                }
                                        }
             | 'digito'                 {       grafoNuevo.generarHijos($1)
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.INTEGER, $1)
                                                }
                                        }
             | 'decimal'                {       grafoNuevo.generarHijos($1)
                                                $$ = {
                                                        consulta: `${$1}`, 
                                                        instrucciones: new Primitivo(this._$.first_line, this._$.first_column, Tipo.PRIMITIVO, Tipo.DECIMAL, $1)
                                                }
                                        } 
             | '[' ']'                  {       grafoNuevo.generarHijos($1, $2)
                                                $$ = {
                                                        consulta: `${$1}`
                                                }
                                        }
             | '[' QUERY_LIST ']'       {       grafoNuevo.generarPadre(2, "QUERY_LIST")
                                                grafoNuevo.generarHijos($1, "QUERY_LIST", $3)
                                                $$ = { 
                                                        consulta: `[${$2.consulta}]`, 
                                                        instrucciones: $2.instrucciones
                                                }
                                        }
             ;

PARENTHESIZED_EXPR : '(' ')'                            {       grafoNuevo.generarHijos($1, $2)
                                                                $$ = {
                                                                        consulta: `()`
                                                                }
                                                        }
                   | '(' EXPR ')'                       {       grafoNuevo.generarPadre(2, "EXPR")  
                                                                grafoNuevo.generarHijos($1, "EXPR", $3)
                                                                $$ = {
                                                                        consulta: `(${$2.consulta})`, 
                                                                        instrucciones: $2.instrucciones
                                                                }
                                                        }
        /*           | '('  '$' 'VAR_NAME' 'EXPR' ')'        {    grafoNuevo.generarPadre()
                                                                $$ = {
                                                                        consulta: `($${$3.consulta}${$4.consulta})`, 
                                                                        instrucciones: $4.instrucciones
                                                                }
                   }*/
                   ;

QUERY_LIST : QUERY_LIST ',' QUERY               {       grafoNuevo.generarPadre(3, "QUERY")
                                                        grafoNuevo.generarPadre(1, "QUERY_LIST")
                                                        
                                                        grafoNuevo.generarHijos("QUERY_LIST", $2, "QUERY")
                                                        $$ = {
                                                                consulta: `${$1.consulta}${$2}${$3.consulta}`
                                                        }
                                                }
           | QUERY                              {       grafoNuevo.generarPadre(1, "QUERY")
                                                        grafoNuevo.generarHijos("QUERY")
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
                                                        grafoNuevo.generarHijos($1, $2, $3);
                                                }
          | 'node' '(' ')'                      {
                                                        $$ = {
                                                                consulta: `node()`
                                                        }
                                                        grafoNuevo.generarHijos($1, $2, $3);
                                                }
          | 'last' '(' ')'                      {
                                                        $$ = {
                                                                consulta: `last()`
                                                        }
                                                       
                                                        grafoNuevo.generarHijos($1, $2, $3);
                                                }
          | 'position' '(' ')'                  {
                                                        $$ = {
                                                                consulta: `position()`
                                                        }

                                                        grafoNuevo.generarHijos($1, $2, $3);
                                                }
          ;

EQNAME : 'nodename'                     { grafoNuevo.generarHijos($1)}
       | 'ancestor-or-self'             { grafoNuevo.generarHijos($1)}
       | 'ancestor'                     { grafoNuevo.generarHijos($1)}        
       | 'attribute'                    { grafoNuevo.generarHijos($1)}       
       | 'child'                        { grafoNuevo.generarHijos($1)}
       | 'descendant-or-self'           { grafoNuevo.generarHijos($1)}
       | 'descendant'                   { grafoNuevo.generarHijos($1)}
       | 'following-sibling'            { grafoNuevo.generarHijos($1)}
       | 'following'                    { grafoNuevo.generarHijos($1)}
       | 'last'                         { grafoNuevo.generarHijos($1)}
       | 'namespace'                    { grafoNuevo.generarHijos($1)}
       | 'node'                         { grafoNuevo.generarHijos($1)}
       | 'parent'                       { grafoNuevo.generarHijos($1)}
       | 'position'                     { grafoNuevo.generarHijos($1)}
       | 'preceding-sibling'            { grafoNuevo.generarHijos($1)}
       | 'preceding'                    { grafoNuevo.generarHijos($1)}     
       | 'self'                         { grafoNuevo.generarHijos($1)}
       | 'text'                         { grafoNuevo.generarHijos($1)}
       | 'and'                          { grafoNuevo.generarHijos($1)}
       | 'or'                           { grafoNuevo.generarHijos($1)}
       | 'div'                          { grafoNuevo.generarHijos($1)}
       | 'mod'                          { grafoNuevo.generarHijos($1)}
       | 'function'                     { grafoNuevo.generarHijos($1)}
       | 'variable'                     { grafoNuevo.generarHijos($1)}
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

