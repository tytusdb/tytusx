/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
specialCharacters                   ['+'|'*'|'?'|'^'|'$'|'('|')'|'['|'\]'|'{'|'}'|'|'|'.'|'&'|'#'|'\''|'!'|':'|';'|'/'|'¿'|'¡']
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

%%

"(:".*.":)"                              /* skip comments */
\s+                                 /* skip whitespace */

"print"                     return 'print';
"div"                       return 'division'
"mod"                       return 'mod';
"and"                       return 'and';
"or"                        return 'or';
"child"                     return 'child';
"ancestor"                  return 'ancestor';
"sibling"                   return 'sibling';
"attribute"                 return 'attribute';
"descendant"                return 'descendant';
"following"                 return 'following';
"namespace"                 return 'namespace';
"parent"                    return 'parent';
"preceding"                 return 'preceding';
"self"                      return 'self';
"not"                       return 'not';
"last"                      return 'last';
"text"                      return 'text';
"position"                  return 'position';
"node"                      return 'node';

".."                        return 'pointPoint'
"."                         return 'point';
"@"                         return 'atSign'
"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'diagonal';
"^^"                        return 'pow';
"<="	                    return 'minusEqual';
">="		                return 'greaterEqual';
"="                         return 'equal';
"!="		                return 'notEqual';
"<"			                return 'minusThan';
">"			                return 'greaterThan';
";"                         return 'semicolon';
"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lKey';
"]"                         return 'rKey';
"'"                         return 'apostrophe';
"|"                         return 'sAnd';
":"                         return 'twoPoints';



/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{

%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'and''or'
%left 'plus' 'minus'
%left 'doubleEqual' 'greaterEqual' 'greaterThan' 'minusEqual' 'minusThan' 'notEqual' 'equal'
%left 'times' 'division' 'mod'
%left 'pow' 'atSign'
%right 'Umenos'
%left 'lparen' 'rparen'
// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : INSTRUCCIONES EOF         { $$ = $1; return $$; }
    ;

INSTRUCCIONES:
    INSTRUCCIONES sAnd INSTRUCCION                                                                                        {
                                                                                                                            $1.push($2);
                                                                                                                            $$ = $1;
                                                                                                                        }
	| INSTRUCCION                                                                                                       {
                                                                                                                            $$ = [$1];
                                                                                                                        } ;

INSTRUCCION:
    PRINT semicolon {
                        $$ = $1
                    }
    |  PATHEXPR {}
    | NODEXPR {};

    

PRINT:
    print lparen EXPR rparen {
                                     $$ = new Print($3, @1.first_line, @1.first_column);
                             } ;

PATHEXPR:
    diagonal STEPEXPR PATHEXPR{
        $$ = $1
    }
    | diagonal diagonal STEPEXPR PATHEXPR{
        $$ = $1
    }
    | {};

NODEXPR:
    EXPR PATHEXPR{}
    | times PATHEXPR{};


STEPEXPR:
    times {}
    |FILTEREXPR {
        $$ = $1
    }
    | AXISSTEP {
        $$ = $1
    };

AXISSTEP:
    FORWARDSTEP PREDICATELIST{
        $$ = $1
    }
    | REVERSESTEP PREDICATELIST{
        $$ = $1
    };

FORWARDSTEP:
    FORWARDAXIS EXPR {

    };

FORWARDAXIS:
    child twoPoints twoPoints{
        $$ = $1
    }
    | descendant twoPoints twoPoints{

    }
    | attribute twoPoints twoPoints{

    }
    | self twoPoints twoPoints {

    }
    | descendant minus or minus self twoPoints twoPoints {

    } 
    | following twoPoints twoPoints {

    }
    | following minus sibling twoPoints twoPoints {

    }
    | namespace twoPoints twoPoints {

    };

REVERSESTEP:
    REVERSEAXIS EXPR {

    }
    | ABBREVREVERSESTEP{

    };

REVERSEAXIS: 
    parent twoPoints twoPoints {

    }
    | ancestor twoPoints twoPoints {

    }
    | preceding minus sibling twoPoints twoPoints {

    }
    | preceding twoPoints twoPoints {

    }
    | ancestor minus or minus self twoPoints twoPoints {

    };

ABBREVREVERSESTEP:
    pointPoint {

    }
    | point {

    };


PREDICATELIST: PREDICATELISTP {}
    |{};

PREDICATELISTP: PREDICATELIST PREDICATE   {}
    ;

PREDICATE: lKey EXPR rKey {};

FILTEREXPR: EXPR PREDICATELIST {};

EXPR:
    IntegerLiteral                                                                                                    {
                                                                                                                            $$ = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                                                                        }

    | DoubleLiteral                                                                                                     {
                                                                                                                            $$ = new Primitivo(Number($1), @1.first_line, @1.first_column);
                                                                                                                        }

    | StringLiteral                                                                                                     {
                                                                                                                            $$ = new Primitivo($1, @1.first_line, @1.first_column);
                                                                                                                        }

    | CharLiteral                                                                                                       {
                                                                                                                            $$ = new Primitivo($1, @1.first_line, @1.first_column);
                                                                                                                        }

    | null                                                                                                             {
                                                                                                                            $$ = new Primitivo(null, @1.first_line, @1.first_column);
                                                                                                                        }

    | true                                                                                                             {
                                                                                                                            $$ = new Primitivo(true, @1.first_line, @1.first_column);
                                                                                                                        }

    | false                                                                                                            {
                                                                                                                            $$ = new Primitivo(false, @1.first_line, @1.first_column);
                                                                                                                       }
    | identifier                                                                                                        {
                                                                                                                            $$ = new Primitivo($1, @1.first_line, @1.first_column);
                                                                                                                       }
    | minus EXPR %prec Umenos 
        {
           
        } 
        | EXPR plus EXPR   
        {
            
        }   
        | EXPR minus EXPR  
        {
            
        }  
        | EXPR times EXPR  
        {
           
        }  
        | EXPR division EXPR
        {
           
        }        
        | EXPR pow EXPR
        {
            
        } 
        | EXPR equal EXPR 
        {

        }
        | EXPR greaterThan EXPR 
        {
               
        }
        | EXPR minusThan EXPR 
        {
              
        }
        | EXPR greaterEqual EXPR 
        {
                
        }
        | EXPR minusEqual EXPR 
        {
                
        }      
        | EXPR and EXPR 
        {
                
        }
        | EXPR or EXPR 
        {
            
        }
        | EXPR mod EXPR
        {

        }
        | EXPR notEqual EXPR {

        }
        | lparen EXPR rparen       
        {
            $$ =$2;
        }
        | last lparen rparen EXPR 
        {

        }
        | text lparen rparen EXPR {

        }
        | atSign EXPR {
        }
        | last lparen rparen {

        }
        | text lparen rparen {

        }
        | position lparen rparen EXPR {

        }
        | position lparen rparen {

        }
        | node lparen rparen EXPR {

        }
        | node lparen rparen {

        }
        | atSign times {

        }
        ;
