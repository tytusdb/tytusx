%{
%}

/* Análisis Lexico */
%lex
%options case-sensitive
// comentarios       (\(\:[\s\S]*?\:\))
nodename          ([a-zñÑA-Z])[a-zA-ZñÑ0-9_-]*
digito            [0-9]+
decimal           {digito}?"."{digito}+
comillaSimple     "'"
comillaDoble      "\""
comillas          {comillaDoble}|{comillaSimple}
cadena            {comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas}

%%
\s+               /* ignorar espacios en blanco */
// {comentarios}     /* ignorar comentarios */

"//"                    return '//'
"/"                     return '/'
".."                    return '..'
"."                     return '.'
"::"                    return '::'
":="                    return ':='
":"                     return ':'
"@"                     return '@'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
"|"                     return '|'
"$"                     return '$'


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


{nodename}                return 'nodename'
{decimal}                 return 'decimal'
{digito}                  return 'digito'
{cadena}                  { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<<EOF>>                   return 'EOF';

.                         {
                            excepciones.push(new Excepcion('Léxico', `Patrón desconocido ${yytext}`, yylloc.first_line, yylloc.first_column));
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

RAIZ : DECLARACIONES EOF  
    | EOF   
	  ;

DECLARACIONES: 'declare' VAR_DECL
              |EXPR_SINGLE
              ;
			
VAR_DECL : 'variable' '$' VAR_NAME ':=' VAR_VALUE
		|'variable' '$' VAR_NAME TYPE_DECL ':=' VAR_VALUE
		;
		
TYPE_DECL : 'as' SEQUENCE_TYPE
          ;

SEQUENCE_TYPE : ITEM_TYPE OCCURRENCE_INDICATOR
              | ITEM_TYPE
              ;

ITEM_TYPE : KIND_TEST
          |PARENTHESIZED_EXPR
          ;

VAR_VALUE : EXPR_SINGLE
;

VAR_NAME : EQNAME
;

QUERY : '/'                   
      | '/' PATH_EXPR         
      | '//' PATH_EXPR        
      | PATH_EXPR             
   ;   

PATH_EXPR : PATH_EXPR '/' STEP_EXPR   
          | PATH_EXPR '//' STEP_EXPR  
          | STEP_EXPR                 
    ;      

STEP_EXPR : POST_FIX_EXPR  
          | AXIS_STEP       
     ;     

AXIS_STEP : REVERSE_STEP                    
          | REVERSE_STEP PREDICATE_LIST     
          | FORWARD_STEP                    
          | FORWARD_STEP PREDICATE_LIST     
          ;

FORWARD_STEP : 'attribute' '::' NODE_TEST             
             | 'child' '::' NODE_TEST                 
             | 'descendant' '::' NODE_TEST            
             | 'descendant-or-self' '::' NODE_TEST    
             | 'following' '::' NODE_TEST             
             | 'following-sibling' '::' NODE_TEST     
             | 'namespace' '::' NODE_TEST             
             | 'self' '::' NODE_TEST                  
             | '@' NODE_TEST                          
             | NODE_TEST                              
             ;

REVERSE_STEP : 'ancestor' '::' NODE_TEST              
             | 'ancestor-or-self' '::' NODE_TEST      
             | 'parent' '::' NODE_TEST                
             | 'preceding' '::' NODE_TEST             
             | 'preceding-sibling' '::' NODE_TEST     
             | '..'                                   
             ;

NODE_TEST : KIND_TEST  
          | EQNAME      
          | '*'         
          ;

POST_FIX_EXPR : PRIMARY_EXPR                  
              | PRIMARY_EXPR PREDICATE_LIST   
              ;

PREDICATE_LIST : PREDICATE_LIST PREDICATE   
               | PREDICATE                  
               ;

PREDICATE : '[' EXPR ']'    
          ;

PRIMARY_EXPR : PARENTHESIZED_EXPR   
             | '.'                  
             | 'cadena'             
             | 'digito'             
             | 'decimal'            
             | '[' ']'             
             | '[' QUERY_LIST ']'   
             ;

PARENTHESIZED_EXPR : '(' ')'        
                   | '(' EXPR ')'   
                   ;

QUERY_LIST : QUERY_LIST ',' QUERY   
           | QUERY                  
           ;

KIND_TEST : 'text' '(' ')'  
          | 'node' '(' ')' 
          | 'last' '(' ')'  
          | 'position' '(' ')'  
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
       ;

EXPR : EXPR ',' EXPR_SINGLE   
     | EXPR_SINGLE            
     ;

EXPR_SINGLE : 	FLWOR_EXPR
            |IF_EXPR
            |OR_EXPR 
            ;
			
FLWOR_EXPR: INITIAL_CLAUSE INTERMEDIATE_CLAUSE_LIST RETURN_CLAUSE
	|INITIAL_CLAUSE RETURN_CLAUSE
	;
			
INITIAL_CLAUSE : FOR_CLAUSE
		|LET_CLAUSE
		;
		
INTERMEDIATE_CLAUSE_LIST: INTERMEDIATE_CLAUSE_LIST INTERMEDIATE_CLAUSE
                        |INTERMEDIATE_CLAUSE
                        ;
INTERMEDIATE_CLAUSE : INITIAL_CLAUSE
		|WHERE_CLAUSE
		|ORDERBY_CLAUSE
		;
					
FOR_CLAUSE : 'for' FOR_BINDING_LIST 
;

FOR_BINDING_LIST: FOR_BINDING_LIST ',' FOR_BINDING
			| FOR_BINDING
			;
			
FOR_BINDING : '$' VAR_NAME  POSITIONAL_VAR 'in' EXPR_SINGLE
		|'$' VAR_NAME 'in' EXPR_SINGLE
		;
			
POSITIONAL_VAR : 'at' '$' VAR_NAME
;

LET_CLAUSE: 'let'  LET_BINDING_LIST
;

LET_BINDING_LIST: LET_BINDING_LIST ',' LET_BINDING
				|LET_BINDING
;

LET_BINDING	 : '$' VAR_NAME ':=' EXPR_SINGLE
;

WHERE_CLAUSE : 'where' '$' EXPR_SINGLE
;

ORDERBY_CLAUSE : 'order' 'by' '$' ORDER_SPEC_LIST
;

ORDER_SPEC_LIST : ORDER_SPEC_LIST ',' ORDER_SPEC
		|ORDER_SPEC
;

ORDER_SPEC : EXPR_SINGLE 
;

RETURN_CLAUSE : 'return' '$' EXPR_SINGLE
;

IF_EXPR : 'if' '(' EXPR ')' 'then' EXPR_SINGLE 'else' EXPR_SINGLE
        ;

OR_EXPR : AND_EXPR                  
        | OR_EXPR 'or' AND_EXPR     
;        

AND_EXPR : COMPARISON_EXPR                         
         | AND_EXPR 'and' COMPARISON_EXPR           
         ;

COMPARISON_EXPR : ADDITIVE_EXPR                       
                | ADDITIVE_EXPR '<' ADDITIVE_EXPR     
                | ADDITIVE_EXPR '>' ADDITIVE_EXPR     
                | ADDITIVE_EXPR '<=' ADDITIVE_EXPR    
                | ADDITIVE_EXPR '>=' ADDITIVE_EXPR    
                | ADDITIVE_EXPR '=' ADDITIVE_EXPR     
                | ADDITIVE_EXPR '!=' ADDITIVE_EXPR    
                ;

ADDITIVE_EXPR : MULTIPLICATIVE_EXPR                          
              | ADDITIVE_EXPR '+' MULTIPLICATIVE_EXPR        
              | ADDITIVE_EXPR '-' MULTIPLICATIVE_EXPR         
              ;

MULTIPLICATIVE_EXPR : UNARY_EXPR                            
                    | MULTIPLICATIVE_EXPR '*' UNARY_EXPR      
                    | MULTIPLICATIVE_EXPR 'div' UNARY_EXPR    
                    ;

UNARY_EXPR  : QUERY                        
            | '-' UNARY_EXPR %prec UMINUS     
            | '+' UNARY_EXPR %prec UPLUS     
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

