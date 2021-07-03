 /*---------------------------IMPORTS-------------------------------*/
%{
    let valDeclaration = '';
    let valTag = '';
    let valInside = '';
    const {Error_} = require('../Error');
    const {errores} = require('../Errores');
    const {NodoXML} = require('../Nodes/NodoXml')
%}


%lex
%options case-sensitive


number  [0-9]+
divsign ('/')('/')?
dir     ('.')('.')?
orsign ('|')('|')?
decimal [0-9]+("."[0-9]+)?
string  ([\"][^"]*[\"])
string2  ([\'][^\']*[\'])

ancestor ('ancestor')('-or-self')?
following ('following')('-sibling')?
preceding ('preceding')('-sibling')?

%%
\s+                   /* skip whitespace */

{decimal}                  return 'DECIMAL'
{number}                  return 'NUMBER'
{string}                      return 'STRING'
{string2}                      return 'STRING2'
{divsign}                    return 'DIVSIGN'
{dir}                            return 'DIR'
{ancestor}                  return 'ANCESTOR'
{following}                  return 'FOLLOWING'
{preceding}                return 'PRECEDING'
{orsign}                return 'ORSIGN'

"@"                     return '@'
"*"                     return '*'
"::"                     return '::'
"-"                     return '-'
"+"                     return '+'

"<="                      return '<='
">="                      return '>='
"<"                        return '<'
">"                        return '>'
"!="                       return '!='
"="                        return '='
"or"                       return 'OR'
"and"                    return 'AND'
"mod"                   return 'MOD'
"div"                      return 'DIV'

"("                     return '('
")"                     return ')' 
"["                     return '['
"]"                     return ']'

"child"                        return 'CHILD'
"attribute"                  return 'ATTR'
"descendant"             return 'DESCENDANT'
"namespace"              return 'NAMESPACE'
"parent"                     return 'PARENT'
'self'                           return 'SELF'
"text"                         return 'TEXT'
"last"                         return 'LAST'
"position"                 return 'POSITION'
"node"                       return 'NODE'

([a-zA-Z_])[a-zA-Z0-9_ñÑ.]*	return 'ID';
<<EOF>>		                return 'EOF'
.                   %{ errores.push(new Error_(yylloc.first_line, yylloc.first_column, 'Lexico','Valor inesperado ' + yytext)); console.error(errores); %}

/lex
%left 'OR'
%left 'AND'
%left '=', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' 'DIV' 'MOD'


%start Init

%%

Init : Exp EOF 
		{
			var init = new NodoXML("Init","Init",@1.first_line+1,@1.first_column+1);
			init.addHijo($1);
			return init;
		} ;
		

Exp : DIVSIGN Lexp
		{
			var exp = new NodoXML("Exp","Exp",@1.first_line+1,@1.first_column+1);
			var val = new NodoXML($1,"Exp",@1.first_line+1,@1.first_column+1);
			exp.addHijo(val);
			exp.addHijo($2);
			$$ = exp;
		}
   | Lexp
		{
			var exp = new NodoXML("Exp","Exp",@1.first_line+1,@1.first_column+1);			
			exp.addHijo($1);
			$$ = exp;
		}
	| error {        
			errores.push(new Error_(@1.first_line, @1.first_column, 'Sintactico','Valor inesperado ' + yytext));
			
			var init = new NodoXML("Init","Init",@1.first_line+1,@1.first_column+1);			
			return init;
		};


Lexp : Lexp ORSIGN DIVSIGN Syntfin
		{
			var lexp = new NodoXML("Lexp","Lexp",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($2,"Lexp",@1.first_line+1,@1.first_column+1);
			var val2 = new NodoXML($3,"Lexp",@1.first_line+1,@1.first_column+1);
			lexp.addHijo($1);
			lexp.addHijo(val1);
			lexp.addHijo(val2);
			lexp.addHijo($4);
			$$ = lexp;
		}
     | Lexp DIVSIGN Syntfin
		{
			var lexp = new NodoXML("Lexp","Lexp",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($2,"Lexp",@1.first_line+1,@1.first_column+1);			
			lexp.addHijo($1);
			lexp.addHijo(val1);			
			lexp.addHijo($3);
			$$ = lexp;
		}
     | Syntfin
		{
			var lexp = new NodoXML("Lexp","Lexp",@1.first_line+1,@1.first_column+1);			
			lexp.addHijo($1);
			$$ = lexp;
		};


Syntfin    : Fin
				{
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);		
					syntfin.addHijo($1);
					$$ = syntfin;
				}
           | '@' Valor Opc
				{
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo($2);			
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
           | Preservada '::' Fin
				{
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($2,"Syntfin",@1.first_line+1,@1.first_column+1);													
					syntfin.addHijo($1);			
					syntfin.addHijo(val1);
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
           | '@' Preservada Opc
				{
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo($2);			
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
			| '@' '*'{
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					var val2 = new NodoXML($2,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo(val2);					
					$$ = syntfin;
				};


Fin :  Valor Opc 
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);			
			fin.addHijo($1);			
			fin.addHijo($2);										
			$$ = fin;
		}
	
  
	| DIR Opc
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Fin",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);		
			fin.addHijo($2);					
			$$ = fin;
		}
    | TEXT   '('   ')'
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | NODE  '('   ')'
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | POSITION '('   ')'
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
	| LAST '('   ')'
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | Preservada Opc 
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);			
			fin.addHijo($1);
			fin.addHijo($2);												
			$$ = fin;
		}
    |'*' Opc 
		{
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Fin",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);	
			fin.addHijo($2);				
			$$ = fin;
		};



Valor : ID
			{
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | NUMBER
			{
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | STRING
			{
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | STRING2
			{
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | DECIMAL
			{
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			};


Preservada:  CHILD
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | DESCENDANT
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | ANCESTOR
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | PRECEDING
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | FOLLOWING
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | NAMESPACE
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | SELF
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | PARENT
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
				| ATTR
					{
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
					;


Opc : LPredicado
			{
				var opc = new NodoXML("Opc","Opc",@1.first_line+1,@1.first_column+1);				
				opc.addHijo($1);				
				$$ = opc;
			}
		|	{
				var opc = new NodoXML("Opc","Opc",@1.first_line+1,@1.first_column+1);									
				$$ = opc;
			};


LPredicado : LPredicado Predicado
						{
							var lpredicado = new NodoXML("LPredicado","LPredicado",@1.first_line+1,@1.first_column+1);				
							lpredicado.addHijo($1);	
							lpredicado.addHijo($2);
							$$ = lpredicado;
						}
                    | Predicado
						{
							var lpredicado = new NodoXML("LPredicado","LPredicado",@1.first_line+1,@1.first_column+1);				
							lpredicado.addHijo($1);
							$$ = lpredicado;
						};


Predicado: '[' ExprLogica']'
			{
				var predicado = new NodoXML("Predicado","Predicado",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($1,"Predicado",@1.first_line+1,@1.first_column+1);	
				var val2 = new NodoXML($3,"Predicado",@1.first_line+1,@1.first_column+1);					
				predicado.addHijo(val1);	
				predicado.addHijo($2);	
				predicado.addHijo(val2);					
				$$ = predicado;
			};


ExprLogica
         : Expr '<=' Expr
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '>=' Expr   
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '=' Expr   
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '!=' Expr  
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '>' Expr
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '<' Expr
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr
			{
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				exprLogica.addHijo($1);					
				$$ = exprLogica;
			};


Expr : Expr '+' Expr   
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr '-' Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr '*' Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr DIV Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  MOD Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  OR Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  AND Expr
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
		|'(' Expr ')'
			{
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($1,"Operador",@1.first_line+1,@1.first_column+1);					
				var val2 = new NodoXML($3,"Operador",@1.first_line+1,@1.first_column+1);										
				expr.addHijo(val1);	
				expr.addHijo($2);	
				expr.addHijo(val2);					
				$$ = expr;
			}
        | Exp
		 {
			var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
			expr.addHijo($1);
			$$ = expr;
		 };

