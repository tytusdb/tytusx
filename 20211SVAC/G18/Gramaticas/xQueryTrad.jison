 /*---------------------------IMPORTS-------------------------------*/
%{
    let valDeclaration = '';
    let valTag = '';
    let valInside = '';
    const {Error_} = require('../Error');
    const {errores} = require('../Errores');
    const {NodoXML} = require('../Nodes/NodoXml');    
%}

%lex
%options case-sensitive
%x comment1
%x comment2

number      [0-9]+
divsign     ('/')('/')?
dir         ('.')('.')?
orsign      ('|')('|')?
decimal     [0-9]+("."[0-9]+)?
string      ([\"][^"]*[\"])
string2     ([\'][^\']*[\'])

ancestor    ('ancestor')('-or-self')?
following   ('following')('-sibling')?
preceding   ('preceding')('-sibling')?

%%
"<!--"											%{ this.begin("comment1"); %}
<comment1>"-->"		  	    	%{ this.popState(); %}
<comment1>.				        	%{ %}
<comment1>[ \t\r\n\f]	    	%{ %}

"(:"												%{ this.begin("comment2"); %}
<comment2>":)"		  	    	%{ this.popState(); %}
<comment2>.				        	%{ %}
<comment2>[ \t\r\n\f]	    	%{ %}

[ \t\n\r\f] 		        		%{ /*se ignoran*/ %}

{decimal}                   return 'DECIMAL'
{number}                    return 'NUMBER'
{string}                    return 'STRING'
{string2}                   return 'STRING2'
{divsign}                   return 'DIVSIGN'
{dir}                       return 'DIR'
{ancestor}                  return 'ANCESTOR'
{following}                 return 'FOLLOWING'
{preceding}                 return 'PRECEDING'
{orsign}                    return 'ORSIGN'

"@"                         return '@'
"*"                         return '*'
"::"                        return '::'
":="                        return ':='
"-"                         return '-'
"+"                         return '+'
","                         return ','
":"                         return ':'
";"                         return ';'

"</"                        return '</'
"<="                        return '<='
">="                        return '>='
"<"                         return '<'
">"                         return '>'
"!="                        return '!='
"="                         return '='
"or"                        return 'OR'
"and"                       return 'AND'
"mod"                       return 'MOD'
"div"                       return 'DIV'

"("                         return '('
")"                         return ')' 
"["                         return '['
"]"                         return ']'
"{"                         return 'tk_llavea'
"}"                         return 'tk_llavec'

"child"                     return 'CHILD'
"attribute"                 return 'ATTR'
"descendant"                return 'DESCENDANT'
"namespace"                 return 'NAMESPACE'
"parent"                    return 'PARENT'
'self'                      return 'SELF'
"text"                      return 'TEXT'
"last"                      return 'LAST'
"position"                  return 'POSITION'
"node"                      return 'NODE'
"eq"                        return 'EQ'
"ne"                        return 'NE'
"lt"                        return 'LT'
"le"                        return 'LE'
"gt"                        return 'GT'
"ge"                        return 'GE'
"doc"                       return 'DOC'
"for"                       return 'FOR'
"in"                        return 'IN'
"return"                    return 'RETURN'
"at"                        return 'AT'
"in"                        return 'IN'
"to"                        return 'TO'
"let"                       return 'LET'
"where"                     return 'WHERE'
"order"                     return 'ORDER'
"by"                        return 'BY'
"if"                        return 'IF'
"then"                      return 'THEN'
"else"                      return 'ELSE'
"data"                      return 'DATA'
"upper-case"                return 'UPPERCASE'
"substring"                 return "SUBSTRING"
"true"                      return "TRUE"
"false"                     return "FALSE"

"declare"                   return 'DECLARE'
"function"                 	return 'FUNCTION'
"local"                     return 'LOCAL'
"as"                        return 'AS'
"xs"                        return 'XS'
"decimal"                  	return 'DECIMAL_'
"integer"                   return 'INTEGER_'
"string"                    return 'STRING_'
"date"                      return 'DATE_'
"time"                      return 'TIME_'
"dateTime"               		return 'DATETIME_'
"boolean"                 	return 'BOOLEAN_'
"double"                   	return 'DOUBLE_'
"float"                     return 'FLOAT_'

([a-zA-Z_])[a-zA-Z0-9_ñÑ.]*	        return 'ID';
('$')([a-zA-Z_])[a-zA-Z0-9_ñÑ.]*		return 'VARIABLE';
<<EOF>>		                        	return 'EOF'
.                                   %{ errores.push(new Error_(yylloc.first_line, yylloc.first_column, 'Lexico','Valor inesperado ' + yytext)); %}

/lex
%left 'OR'
%left 'AND'
%left '=', '!='
%left '>=', '<=', '<', '>'
%left EQ,NE
%left LT,LE,GT,GE
%left '+' '-'
%left '*' 'DIV' 'MOD'

%start Init

%%

Init : LExpresiones EOF { return $1; }; 

LExpresiones: LExpresiones Instrucciones { 
              var node1 = new NodoXML('LExpresiones','LExpresiones',@1.first_line+1,+@1.first_column+1);
              node1.addHijo($1);
              node1.addHijo($2);
              $$ = node1;
            }
    				| Instrucciones { $$ = $1; }  
						| error {        
							errores.push(new Error_(@1.first_line, @1.first_column, 'Sintactico','Valor inesperado ' + yytext));
							return "error";
						}
						;

Instrucciones: For { $$ = $1; }
            | Return { $$ = $1; }
            | Let { $$ = $1; }
            | If { $$ = $1; }
            | Valor { $$ = $1; }
            | Function { $$ = $1; }
            ;
		
LlamadaFuncion: LOCAL ':' ID '(' LParams ')' { 
                var node1 = new NodoXML('LlamadaFuncion','LlamadaFuncion',@1.first_line+1,+@1.first_column+1);
                node1.addHijo($3);
                node1.addHijo($5);
                $$ = node1;
              }
              | LOCAL ':' ID '(' ')' {
                var node1 = new NodoXML('LlamadaFuncion','LlamadaFuncion',@1.first_line+1,+@1.first_column+1);
                node1.addHijo($3);
                $$ = node1;
              }
							;

LParams: LParams ',' ExprLogica { 
        var node1 = new NodoXML('LParams','LParams',@1.first_line+1,+@1.first_column+1);
        node1.addHijo($1);
        node1.addHijo($3);
        $$ = node1;
      }
			| ExprLogica { $$ = $1; }
			;

Exp: DIVSIGN Lexp {
      var node1 = new NodoXML('Exp','Exp',@1.first_line+1,+@1.first_column+1);
      var node2 = new NodoXML($1,'DIVSIGN',@1.first_line+1,+@1.first_column+1);
      node1.addHijo(node2);
      node1.addHijo($2);
      $$ = node1;
    }
    | Lexp { $$ = $1; }
		;

Lexp: Lexp ORSIGN DIVSIGN Syntfin	{
      var node1 = new NodoXML('Lexp','Lexp',@1.first_line+1,+@1.first_column+1);
      var node2 = new NodoXML($2,'ORSIGN',@2.first_line+1,+@2.first_column+1);
      var node3 = new NodoXML($3,'DIVSIGN',@3.first_line+1,+@3.first_column+1);
      node1.addHijo($1);
      node1.addHijo(node2);
      node1.addHijo(node3);
      node1.addHijo($4);
      $$ = node1;
    }
		| Lexp DIVSIGN Syntfin {
      var node1 = new NodoXML('Lexp','Lexp',@1.first_line+1,+@1.first_column+1);
      var node2 = new NodoXML($2,'DIVSIGN',@2.first_line+1,+@2.first_column+1);
      node1.addHijo($1);
      node1.addHijo(node2);
      node1.addHijo($3);
      $$ = node1;
    }
		| Syntfin { $$ = $1; }
		;

Syntfin: Fin { $$ = $1; }
			| '@' Valor Opc	{ 
        var node1 = new NodoXML($1,'Syntfin',@1.first_line+1,+@1.first_column+1);
        node1.addHijo($2);
        node1.addHijo($3);
        $$ = node1;
      }
			| Preservada '::' Fin	{
        var node1 = new NodoXML($2,'Syntfin',@1.first_line+1,+@1.first_column+1);
        node1.addHijo($1);
        node1.addHijo($2);
        $$ = node1;
      }
			| '@' Preservada Opc {
        var node1 = new NodoXML($1,'Syntfin',@1.first_line+1,+@1.first_column+1);
        node1.addHijo($2);
        node1.addHijo($3);
        $$ = node1;
      }
			| '@' '*' { $$ = new NodoXML('@*','Syntfin',@1.first_line+1,+@1.first_column+1); }
			;

Fin: Valor Opc {
      var node1 = new NodoXML('Fin','Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($1);
      node1.addHijo($2);
      $$ = node1;
    }
		| DIR Opc {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($2);
      $$ = node1;
    }
    | TEXT '(' ')' { $$ = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1); }
    | NODE  '(' ')' { $$ = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1); }
    | POSITION '(' ')' { $$ = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1); }
    | LAST '(' ')' { $$ = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1); }
    | DOC '(' STRING ')' {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($3);
      $$ = node1;
    }
    | DATA'(' ExprLogica ')' {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($3);
      $$ = node1;
    }
    | UPPERCASE '(' ExprLogica ')' {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($3);
      $$ = node1;
    }
    | SUBSTRING '(' ExprLogica ',' ExprLogica ',' ExprLogica ')' {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($3);
      node1.addHijo($5);
      node1.addHijo($7);
      $$ = node1;
    }
    | Preservada Opc {
      var node1 = new NodoXML('Fin','Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($1);
      node1.addHijo($2);
      $$ = node1;
    }
    | '*' Opc {
      var node1 = new NodoXML($1,'Fin',@1.first_line+1,+@1.first_column+1);
      node1.addHijo($2);
      $$ = node1;
    }
		;

Valor: ID { $$ = new NodoXML($1,"ID",@1.first_line+1,@1.first_column+1); }
    | NUMBER { $$ = new NodoXML($1,"NUMBER",@1.first_line+1,@1.first_column+1); }
    | STRING { $$ = new NodoXML($1,"STRING",@1.first_line+1,@1.first_column+1); }
    | STRING2 { $$ = new NodoXML($1,"STRING",@1.first_line+1,@1.first_column+1); }
    | DECIMAL { $$ = new NodoXML($1,"NUMBER",@1.first_line+1,@1.first_column+1); }
    | VARIABLE { $$ = new NodoXML($1,"VARIABLE",@1.first_line+1,@1.first_column+1); }
    | TRUE { $$ = new NodoXML($1,"BOOLEAN",@1.first_line+1,@1.first_column+1); }
    | FALSE { $$ = new NodoXML($1,"BOOLEAN",@1.first_line+1,@1.first_column+1); }
	  | LlamadaFuncion { $$ = $1; }
		;

Preservada: CHILD	{ $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | DESCENDANT { $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | ANCESTOR { $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | PRECEDING	{ $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | FOLLOWING	{ $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
	      	| NAMESPACE	{ $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }		
          | SELF { $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | PARENT { $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
          | ATTR { $$ = new NodoXML($1,"Preservada",@1.first_line+1,@1.first_column+1); }
					;

Opc: '[' ExprLogica ']' { $$ = $2; }
  | { $$ = null; }
  ;

For: FOR LFor forstmnt LForWhere {
      var nodo1 = new NodoXML('For','For',@1.first_line+1,@1.first_column+1);
      nodo1.addHijo($2);
      nodo1.addHijo($3);
      nodo1.addHijo($4);
      $$ = nodo1;
    };

If: IF '(' ExprLogica ')' THEN stmnt ELSE stmn {
    var nodo1 = new NodoXML('If','If',@1.first_line+1,@1.first_column+1);
    nodo1.addHijo($3);
    nodo1.addHijo($6);
    nodo1.addHijo($8);
    $$ = nodo1;
  };

stmnt: '('')' { $$ = null; }
    | '('LExpresiones')' { $$ = $1; }
    | Instrucciones { $$ = $1; }
    ;

LFor: LFor ',' VARIABLE IN ClauseExpr {
      var nodo1 = new NodoXML('LFor', 'LFor',@1.first_line+1,@1.first_column+1);
      var nodo2 = new NodoXML('IN', 'IN',@4.first_line+1,@4.first_column+1);
      nodo1.addHijo($1);
      nodo2.addHijo($3);
      nodo2.addHijo($5);
      nodo1.addHijo(nodo2);
      $$ = nodo1;
    }
    | LFor ',' VARIABLE AT VARIABLE IN ClauseExpr {
      var nodo1 = new NodoXML('LFor', 'LFor',@1.first_line+1,@1.first_column+1);
      var nodo2 = new NodoXML('AT', 'AT',@4.first_line+1,@4.first_column+1);
      var nodo3 = new NodoXML('IN', 'IN',@6.first_line+1,@6.first_column+1); 
      nodo3.addHijo($5);
      nodo3.addHijo($7);
      nodo2.addHijo($3);
      nodo2.addHijo(nodo3);
      nodo1.addHijo($1);
      nodo1.addHijo(nodo2);
      $$ = nodo1;
    }
    | VARIABLE IN ClauseExpr {
      var nodo1 = new NodoXML('IN', 'IN',@2.first_line+1,@2.first_column+1);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
    | VARIABLE AT VARIABLE IN ClauseExpr {
      var nodo1 = new NodoXML('AT', 'AT',@2.first_line+1,@2.first_column+1);
      var nodo2 = new NodoXML('IN', 'IN',@4.first_line+1,@4.first_column+1); 
      nodo2.addHijo($3);
      nodo2.addHijo($5);
      nodo1.addHijo($1);
      nodo1.addHijo(nodo2);
      $$ = nodo1;
    };

forstmnt: LForExpresiones { $$ = $1; }
				| { $$ = null; }
        ;

LForExpresiones: LForExpresiones For_Let_Opt { 
        var nodo1 = new NodoXML('LForExpresiones', 'LForExpresiones',@1.first_line+1,+@1.first_column+1);
        nodo1.addHijo($1);
        nodo1.addHijo($2);
        $$ = nodo1;
      }
			| For_Let_Opt { $$ = $1; }
			;

For_Let_Opt: Let { $$ = $1; }
          | For { $$ = $1; }
					;
	   
LForWhere: Where LForOrderby {
          var nodo1 = new NodoXML('LForWhere', 'LForWhere',@1.first_line+1,+@1.first_column+1);
          nodo1.addHijo($1);
          nodo1.addHijo($2);
          $$ = nodo1;
        }  
        | LForOrderby { $$ = $1; }
        ;

LForOrderby: Orderby Return {
            var node1 = new NodoXML('LForOrderby','LForOrderby',@1.first_line+1,+@1.first_column+1);
            node1.addHijo($1);
            node1.addHijo($2);
            $$ = nodo1;
          }
          | Return { $$ = $1; };

Let: LET VARIABLE ':=' ClauseExpr {
      var nodo1 = new NodoXML('Let', 'Let',@1.first_line+1,+@1.first_column+1);
      var nodo2 = new NodoXML($2,'VARIABLE',@2.first_line+1,+@2.first_column+1);
      nodo1.addHijo(nodo2);
      nodo1.addHijo($4);
      $$ = nodo1;
    };

Where : WHERE ExprLogica {
        var nodo1 = new NodoXML("Where","Where",@1.first_line+1,@1.first_column+1);
        nodo1.addHijo($2);
        $$ = nodo1;
      };

OrderBy: ORDER BY LExp {
          var nodo1 = new NodoXML("OrderBy","OrderBy",@1.first_line+1,@1.first_column+1);
          nodo1.addHijo($3);
          $$ = nodo1;
        };

LExp: LExp ',' Exp {
      var nodo1 = new NodoXML('LExp', 'LExp',@1.first_line+1,+@1.first_column+1);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
    | Exp { $$ = $1; };

ClauseExpr: ExprLogica { $$ = $1; } 	
					| '(' ExprLogica TO ExprLogica ')' { 
            var node1 = new NodoXML('TO', 'TO',@3.first_line+1,+@3.first_column+1);
            node1.addHijo($2);
            node1.addHijo($4);
            $$ = node1;
          }
					| '(' ExprLogica ',' ExprLogica')' {
            var node1 = new NodoXML(',', ',',@3.first_line+1,+@3.first_column+1);
            node1.addHijo($2);
            node1.addHijo($4);
            $$ = node1;
          }
					;

Return: RETURN ExprLogica { $$ = $2; }
      | RETURN If { $$ = $2; }
      ;

Function : DECLARE FUNCTION Prefix ':' ID Parameter AS XS':'TipoVar prod_statement ';' {
            var nodo1 = new NodoXML('Function', 'Function',@1.first_line+1,+@1.first_column+1);
            var nodo2 = new NodoXML('AS', 'AS',@7.first_line+1,+@7.first_column+1);
            var nodo3 = new NodoXML($5,'ID',@5.first_line+1,+@5.first_column+1);
            nodo2.addHijo($6);
            nodo2.addHijo($10);
            nodo1.addHijo($3);
            nodo1.addHijo(nodo3);
            nodo1.addHijo(nodo2);
            nodo1.addHijo($11);
            $$ = nodo1;
          };

prod_statement: tk_llavea LExpresiones tk_llavec { $$ = $2; }
            | tk_llavea tk_llavec { $$ = null; }
            ;

Parameter: '(' LVariables ')' { $$ = $2; }
        |'('')' { $$ = null; }
        ;

LVariables: LVariables ',' VARIABLE AS XS':'TipoVar {
            var nodo1 = new NodoXML('LVariables', 'LVariables',@1.first_line+1,+@1.first_column+1);
            var nodo2 = new NodoXML('AS', 'AS',@4.first_line+1,@4.first_column+1);
            nodo2.addHijo($3);
            nodo2.addHijo($7);
            nodo1.addHijo($1);
            nodo1.addHijo(nodo2);
            $$ = nodo1; 
          }
          | VARIABLE AS XS ':' TipoVar {
            var nodo1 = new NodoXML('AS', 'AS',@2.first_line+1,+@2.first_column+1);
            nodo1.addHijo($1);
            nodo1.addHijo($5);
            $$ = nodo1;
          }
          ; 

TipoVar: INTEGER_ { $$ = new NodoXML($1,"TipoVar",@1.first_line+1,@1.first_column+1); }
      | DECIMAL_ { $$ = new NodoXML($1,"TipoVar",@1.first_line+1,@1.first_column+1); }
      | STRING_ { $$ = new NodoXML($1,"TipoVar",@1.first_line+1,@1.first_column+1); }              
      | BOOLEAN_ { $$ = new NodoXML($1,"TipoVar",@1.first_line+1,@1.first_column+1); }
      | DOUBLE_ { $$ = new NodoXML($1,"TipoVar",@1.first_line+1,@1.first_column+1); }
      ; 

Prefix: LOCAL { $$ = new NodoXML($1,"Prefix",@1.first_line+1,@1.first_column+1); };

ExprLogica: ExprLogica '<=' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica '>=' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica '=' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica '!=' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica '>' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica '<' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica 'EQ' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica 'NE' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica 'LT' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          } 
          | ExprLogica 'LE' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica 'GT' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | ExprLogica 'GE' ExprLogica {
            var nodo1 = new NodoXML($2, 'ExprLogica',@1.first_line+1,@1.first_column);
            nodo1.addHijo($1);
            nodo1.addHijo($3);
            $$ = nodo1;
          }
          | Expr { $$ = $1; }
          ;

Expr : Expr '+' Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr '-' Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr '*' Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr DIV Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr MOD Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr OR Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		| Expr AND Expr {
      var nodo1 = new NodoXML($2, 'Expr',@2.first_line+1,@2.first_column);
      nodo1.addHijo($1);
      nodo1.addHijo($3);
      $$ = nodo1;
    }
		|'(' ExprLogica ')' { $$ = $2; }
		| Exp { $$ = $1; }
		;
