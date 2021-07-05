 /*---------------------------IMPORTS-------------------------------*/
%{
    let valDeclaration = '';
    let valTag = '';
    let valInside = '';
	
    const {Error_} = require('../Error');
    const {errores} = require('../Errores');
	
	const {Regla_} = require('../Regla');
    const {reglas} = require('../Reglas');
	
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
			reglas.push(new Regla_("Init -> Exp EOF"," Init.val = Exp.val"));
			
			var init = new NodoXML("Init","Init",@1.first_line+1,@1.first_column+1);
			init.addHijo($1);
			return init;
		} ;
		

Exp : DIVSIGN Lexp
		{
			reglas.push(new Regla_("Exp -> DIVSIGN Lexp","exp.val=array(DIVSIGN.val, Lexp.val)"));
		
			var exp = new NodoXML("Exp","Exp",@1.first_line+1,@1.first_column+1);
			var val = new NodoXML($1,"Exp",@1.first_line+1,@1.first_column+1);
			exp.addHijo(val);
			exp.addHijo($2);
			$$ = exp;
		}
   | Lexp
		{
			reglas.push(new Regla_("Exp -> Lexp"," Exp.val = Lexp.val"));
			
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
			reglas.push(new Regla_("Lexp -> Lexp ORSIGN DIVSIGN Syntfin"," Lexp.val = array( Lexp.val,ORSIGN.val,DIVSIGN.val,Syntfin.val)"));
		
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
			reglas.push(new Regla_("Lexp -> Lexp DIVSIGN Syntfin"," Lexp.val = array( Lexp.val,DIVSIGN.val,Syntfin.val)"));
			
			var lexp = new NodoXML("Lexp","Lexp",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($2,"Lexp",@1.first_line+1,@1.first_column+1);			
			lexp.addHijo($1);
			lexp.addHijo(val1);			
			lexp.addHijo($3);
			$$ = lexp;
		}
     | Syntfin
		{
			
			reglas.push(new Regla_("Lexp -> Syntfin"," Lexp.val = Syntfin.val"));
			
			var lexp = new NodoXML("Lexp","Lexp",@1.first_line+1,@1.first_column+1);			
			lexp.addHijo($1);
			$$ = lexp;
		};


Syntfin    : Fin
				{
					reglas.push(new Regla_("Syntfin -> Fin"," Syntfin.val = Fin.val"));
					
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);		
					syntfin.addHijo($1);
					$$ = syntfin;
				}
           | '@' Valor Opc
				{
					reglas.push(new Regla_("Syntfin -> @ Valor Opc"," Syntfin.val = array( @, valor.val, opc.val)"));
					
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo($2);			
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
           | Preservada '::' Fin
				{
					reglas.push(new Regla_("Syntfin -> Preservada :: Fin"," Syntfin.val = array( Preservada.val, ::, Fin.val)"));
					
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($2,"Syntfin",@1.first_line+1,@1.first_column+1);													
					syntfin.addHijo($1);			
					syntfin.addHijo(val1);
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
           | '@' Preservada Opc
				{
					reglas.push(new Regla_("Syntfin -> @ Preservada Opc"," Syntfin.val = array(@, Preservada.val, Opc.val)"));
					
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo($2);			
					syntfin.addHijo($3);										
					$$ = syntfin;
				}
			| '@' '*'{
					reglas.push(new Regla_("Syntfin ->@ *"," Syntfin.val = @*"));
					
					var syntfin = new NodoXML("Syntfin","Syntfin",@1.first_line+1,@1.first_column+1);
					var val1 = new NodoXML($1,"Syntfin",@1.first_line+1,@1.first_column+1);								
					var val2 = new NodoXML($2,"Syntfin",@1.first_line+1,@1.first_column+1);								
					syntfin.addHijo(val1);
					syntfin.addHijo(val2);					
					$$ = syntfin;
				};


Fin :  Valor Opc 
		{
			reglas.push(new Regla_("Fin ->  Valor Opc "," Fin.val = array(Valor.val,Opc.val)"));
		
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);			
			fin.addHijo($1);			
			fin.addHijo($2);										
			$$ = fin;
		}
	
  
	| DIR Opc
		{
			reglas.push(new Regla_("Fin ->  DIR Opc "," Fin.val = array(Dir.val,Opc.val)"));
		
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Fin",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);		
			fin.addHijo($2);					
			$$ = fin;
		}
    | TEXT   '('   ')'
		{
			reglas.push(new Regla_("Fin ->  TEXT  (   ) "," Fin.val = TEXT.val"));
		
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | NODE  '('   ')'
		{
			reglas.push(new Regla_("Fin ->  NODE  (   ) "," Fin.val = NODE.val"));
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | POSITION '('   ')'
		{
			reglas.push(new Regla_("Fin ->  POSITION  (   ) "," Fin.val = POSITION.val"));
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
	| LAST '('   ')'
		{	
			reglas.push(new Regla_("Fin ->  LAST  (   ) "," Fin.val = LAST.val"));
			
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Funcion",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);									
			$$ = fin;
		}
    | Preservada Opc 
		{
			reglas.push(new Regla_("Fin -> Preservada Opc "," Fin.val = array(Preservada.val,Opc.val)"));
			
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);			
			fin.addHijo($1);
			fin.addHijo($2);												
			$$ = fin;
		}
    |'*' Opc 
		{
		
			reglas.push(new Regla_("Fin -> '*' Opc "," Fin.val = array(*,Opc.val)"));
			
			var fin = new NodoXML("Fin","Fin",@1.first_line+1,@1.first_column+1);
			var val1 = new NodoXML($1,"Fin",@1.first_line+1,@1.first_column+1);								
			fin.addHijo(val1);	
			fin.addHijo($2);				
			$$ = fin;
		};



Valor : ID
			{
				reglas.push(new Regla_("Valor -> ID"," Valor.val = ID.val"));
			
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | NUMBER
			{
				reglas.push(new Regla_("Valor -> NUMBER"," Valor.val = NUMBER.val"));
				
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | STRING
			{
				reglas.push(new Regla_("Valor -> STRING"," Valor.val = STRING.val"));
				
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | STRING2
			{
				reglas.push(new Regla_("Valor -> STRING2"," Valor.val = STRING2.val"));
				
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			}
          | DECIMAL
			{
				reglas.push(new Regla_("Valor -> DECIMAL"," Valor.val = DECIMAL.val"));
				
				var val = new NodoXML($1,"Valor",@1.first_line+1,@1.first_column+1);				
				$$ = val;
			};


Preservada:  CHILD
					{
						reglas.push(new Regla_("Preservada -> CHILD"," Preservada.val = CHILD.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | DESCENDANT
					{
						reglas.push(new Regla_("Preservada -> DESCENDANT"," Preservada.val = DESCENDANT.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | ANCESTOR
					{
						reglas.push(new Regla_("Preservada -> ANCESTOR"," Preservada.val = ANCESTOR.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | PRECEDING
					{
						reglas.push(new Regla_("Preservada -> PRECEDING"," Preservada.val = PRECEDING.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | FOLLOWING
					{
						reglas.push(new Regla_("Preservada -> FOLLOWING"," Preservada.val = FOLLOWING.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | NAMESPACE
					{
						reglas.push(new Regla_("Preservada -> NAMESPACE"," Preservada.val = NAMESPACE.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | SELF
					{
						reglas.push(new Regla_("Preservada -> SELF"," Preservada.val = SELF.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
                | PARENT
					{
						reglas.push(new Regla_("Preservada -> PARENT"," Preservada.val = PARENT.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
				| ATTR
					{
						reglas.push(new Regla_("Preservada -> ATTR"," Preservada.val = ATTR.val"));
						
						var val = new NodoXML($1,"Axes",@1.first_line+1,@1.first_column+1);				
						$$ = val;
					}
					;


Opc : LPredicado
			{
				reglas.push(new Regla_("Opc -> LPredicado"," Opc.val = LPredicado.val"));
				
				var opc = new NodoXML("Opc","Opc",@1.first_line+1,@1.first_column+1);				
				opc.addHijo($1);				
				$$ = opc;
			}
		|	{
				reglas.push(new Regla_("Opc -> epsilon"," epsilon"));
				
				var opc = new NodoXML("Opc","Opc",@1.first_line+1,@1.first_column+1);									
				$$ = opc;
			};


LPredicado : LPredicado  Predicado
						{
							reglas.push(new Regla_("LPredicado ->LPredicado Predicado"," LPredicado.val =array(LPredicado.val,Predicado.val)"));
							
							var lpredicado = new NodoXML("LPredicado","LPredicado",@1.first_line+1,@1.first_column+1);				
							lpredicado.addHijo($1);	
							lpredicado.addHijo($2);
							$$ = lpredicado;
						}
                    | Predicado
						{
							reglas.push(new Regla_("LPredicado -> Predicado"," LPredicado.val = Predicado.val"));
							
							var lpredicado = new NodoXML("LPredicado","LPredicado",@1.first_line+1,@1.first_column+1);				
							lpredicado.addHijo($1);
							$$ = lpredicado;
						};


Predicado: '[' ExprLogica']'
			{
			
			
				reglas.push(new Regla_("Predicado ->[ ExprLogica]"," Predicado.val =ExprLogica.val"));
			
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
				reglas.push(new Regla_("ExprLogica ->Expr <= Expr"," ExprLogica.val =array(Expr1.val,<=,Expr2.val)"));
				
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '>=' Expr   
			{
				reglas.push(new Regla_("ExprLogica ->Expr >= Expr"," ExprLogica.val =array(Expr1.val,>=,Expr2.val)"));
				
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '=' Expr   
			{
				reglas.push(new Regla_("ExprLogica ->Expr = Expr"," ExprLogica.val =array(Expr1.val,=,Expr2.val)"));
				
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '!=' Expr  
			{	
				reglas.push(new Regla_("ExprLogica ->Expr != Expr"," ExprLogica.val =array(Expr1.val,!=,Expr2.val)"));
				
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '>' Expr
			{
				reglas.push(new Regla_("ExprLogica ->Expr > Expr"," ExprLogica.val =array(Expr1.val,>,Expr2.val)"));
			
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr '<' Expr
			{
				reglas.push(new Regla_("ExprLogica ->Expr <Expr"," ExprLogica.val =array(Expr1.val,<,Expr2.val)"));
				
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				exprLogica.addHijo($1);	
				exprLogica.addHijo(val1);	
				exprLogica.addHijo($3);					
				$$ = exprLogica;
			}
         | Expr
			{
				reglas.push(new Regla_("ExprLogica ->Expr <= Expr"," ExprLogica.val =Expr.val"));
			
				var exprLogica = new NodoXML("ExprLogica","ExprLogica",@1.first_line+1,@1.first_column+1);
				exprLogica.addHijo($1);					
				$$ = exprLogica;
			};


Expr : Expr '+' Expr   
			{
				reglas.push(new Regla_("Expr ->Expr + Expr"," Expr.val =array(Expr1.val,+,Expr2.val)"));
			
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr '-' Expr
			{
				reglas.push(new Regla_("Expr ->Expr - Expr"," Expr.val =array(Expr1.val,-,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr '*' Expr
			{
				reglas.push(new Regla_("Expr ->Expr * Expr"," Expr.val =array(Expr1.val,*,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr DIV Expr
			{
				reglas.push(new Regla_("Expr ->Expr DIV Expr"," Expr.val =array(Expr1.val,DIV,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  MOD Expr
			{
				reglas.push(new Regla_("Expr ->Expr MOD Expr"," Expr.val =array(Expr1.val,MOD,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  OR Expr
			{
				reglas.push(new Regla_("Expr ->Expr OR Expr"," Expr.val =array(Expr1.val,OR,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
         | Expr  AND Expr
			{
				reglas.push(new Regla_("Expr ->Expr AND Expr"," Expr.val =array(Expr1.val,AND,Expr2.val)"));
				
				var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
				var val1 = new NodoXML($2,"Operador",@1.first_line+1,@1.first_column+1);					
				expr.addHijo($1);	
				expr.addHijo(val1);	
				expr.addHijo($3);					
				$$ = expr;
			}
		|'(' Expr ')'
			{
				reglas.push(new Regla_("Expr ->( Expr )"," Expr.val =Exp.val"));
			
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
			reglas.push(new Regla_("Expr ->Expr"," Expr.val =Exp.val"));
		 
			var expr = new NodoXML("Expr","Expr",@1.first_line+1,@1.first_column+1);
			expr.addHijo($1);
			$$ = expr;
		 };

