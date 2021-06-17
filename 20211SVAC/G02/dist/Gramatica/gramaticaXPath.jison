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
                                        erroresXPath.push(new ErrorCapturado(TipoError.ERROR_LEXICO, yytext, 'Error lexico detectado',yylloc.first_line, yylloc.first_column));
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
                                                                                                                            $$ = $1;
                                                                                                                        } ;

INSTRUCCION:
    PRINT semicolon {
                        $$ = $1
                    }
    |  PATHEXPR {$$=$1;}
    | NODEXPR {$$=$1;};

    

PRINT:
    print lparen EXPR rparen {
                                     $$ = new Print($3, @1.first_line, @1.first_column);
                             } ;

PATHEXPR:
    diagonal STEPEXPR PATHEXPR{
        $$ = [];

    }
    | diagonal diagonal STEPEXPR PATHEXPR{
        $$ = [];
    }
    | {$$=[]}
    | error { $$ = []; console.log('error sintactico ' + yytext); erroresXPath.push(new ErrorCapturado(TipoError.ERROR_SINTACTICO, yytext, 'Se esperaba token diferente',this._$.first_line, this._$.first_column));};

NODEXPR:
    EXPR PATHEXPR{var nodo1=new Nodo([$1],@1.first_line,@2.first_column); var lista=[nodo1]; $$=lista;}
    | times PATHEXPR{ $$= [$2];};


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
            $$=$1
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


PREDICATELIST: PREDICATELISTP {$$=$1;}
    |{$$=[]};

PREDICATELISTP: PREDICATELISTP PREDICATE   {$1.push($2); $$=$1;}
    | PREDICATE {$$=[$1];};

PREDICATE: lKey EXPR rKey {$$=$2;};

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
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);
        }   
        | EXPR minus EXPR  
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);
        }  
        | EXPR times EXPR  
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);
        }  
        | EXPR division EXPR
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }        
        | EXPR pow EXPR
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        } 
        | EXPR equal EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR greaterThan EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR minusThan EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR greaterEqual EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR minusEqual EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }      
        | EXPR and EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR or EXPR 
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR mod EXPR
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | EXPR notEqual EXPR {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
        | lparen EXPR rparen       
        {
            $$=new Predicados($1,$3,$2,@1.first_line,@1.first_column);        }
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
