/* Definición Léxica */
%lex

%options case-insensitive

ESCAPECHAR                          [\'\"\\bfnrtv]
ESCAPE                              \\{ESCAPECHAR}
ACCEPTEDCHARSDOUBLE                 [^\"\\]+
STRINGDOUBLE                        {ESCAPE}|{ACCEPTEDCHARSDOUBLE}
STRINGLITERAL                       \"{STRINGDOUBLE}*\"

ACCEPTEDCHARSSINGLE                 [^\'\\]
STRINGSINGLE                        {ESCAPE}|{ACCEPTEDCHARSSINGLE}
CHARLITERAL                         \'{STRINGSINGLE}\'

BSL                                 "\\".
%s                                  comment
%%


\s+                                 /* skip whitespace */

"print"                     return 'PRINT';
"null"                      return 'NULL';
"true"                      return 'TRUE';
"false"                     return 'FALSE';

"+"                         return 'PLUS';
"-"                         return 'MINUS';
"*"                         return 'TIMES';
"//"                        return 'DSLASH';
"/"                         return 'SLASH';
"div"                       return 'DIV';
".."                        return 'DDOT';
"."                         return 'DOT';
"@"                         return 'AT';
"mod"                       return 'MOD';

"<="                        return 'LTE';
">="                        return 'GTE';
"<"                         return 'LT';
">"                         return 'GT';
"="                         return 'ASIG';
"=="                        return 'EQUAL';
"!="                        return 'NEQUAL';

"and"                       return 'AND';
"|"                         return 'SOR';
"or"                        return 'OR';
"not"                       return 'NOT';

","                         return 'COMA';
";"                         return 'SEMICOLON';
"::"                        return 'AXE'
"("                         return 'LPAREN';
")"                         return 'RPAREN';
"["                         return 'LCOR';
"]"                         return 'RCOR';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DOUBLELITERAL';
[0-9]+                              return 'INTEGERLITERAL';

[A-ZA-Z_][A-ZA-Z0-9_\-Ñ]*            return 'IDENTIFIER';

{STRINGLITERAL}                     return 'STRINGLITERAL';
{CHARLITERAL}                       return 'CHARLITERAL';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

%{
    const nodo_ast = require('../NODOS/nodo_ast');
%}

%start S

%%

S               : consultas EOF
                ;
/*
ASIG -> id ASIGP
ASIGP -> , ASIG
ASIGP -> ''
*/
consultas       : expresion_A SOR consultas
                | expresion_A
                ;

expresion_A     : DSLASH expresion_B
                | SLASH expresion_B
                | expresion_B
                ;

expresion_B     : expresion_C DSLASH expresion_B
                | expresion_C SLASH expresion_B
                | expresion_C
                ;


expresion_C     : expresion_D expresion_Cp
                ;

expresion_Cp    : AXE expresion_D expresion_Cp
                |
                ;               

expresion_D     : expresion_E expresion_Dp
                ;

expresion_Dp    : OR expresion_E expresion_Dp
                |
                ;

expresion_E     : expresion_F expresion_Ep
                ;

expresion_Ep    : AND expresion_F expresion_Ep
                |
                ;
                
expresion_F     : NOT expresion_G
                | expresion_G
                ;

expresion_G     : expresion_H expresion_Gp
                ;

expresion_Gp    : ASIG expresion_H expresion_Gp
                | NEQUAL expresion_H expresion_Gp
                |
                ;

expresion_H     : expresion_I expresion_Hp
                ;

expresion_Hp    : GT expresion_I expresion_Hp
                | GTE expresion_I expresion_Hp
                | LT expresion_I expresion_Hp
                | LTE expresion_I expresion_Hp
                |
                ;

expresion_I     : expresion_J expresion_Ip
                ;

expresion_Ip    : PLUS expresion_J expresion_Ip
                | MINUS expresion_J expresion_Ip
                |
                ;

expresion_J     : expresion_K expresion_Jp
                ;

expresion_Jp    : MOD expresion_K expresion_Jp
                | DIV expresion_K expresion_Jp
                | TIMES expresion_K expresion_Jp
                |
                ;

expresion_K     : MINUS expresion_L
                | expresion_L
                ;

expresion_L     : expresion_M TIMES
                ;                              

expresion_M     : LPAREN expresion_A RPAREN                     
                | TIMES                    
                | DOUBLELITERAL                                  
                | INTEGERLITERAL                          
                | STRINGLITERAL                   
                | CHARLITERAL                      
                | nodo                           
                | DOT nodo                     
                | DDOT nodo                     
                | DOT                          
                | DDOT           
                ;       

nodo            : AT TIMES
                | AT predicado                   
                | predicado                                      
                ;

predicado       : IDENTIFIER cors
                | IDENTIFIER func
                | IDENTIFIER                    
                ;

func            : LPAREN args PAREN
                | LPAREN RPAREN
                ;               

args            : expresion COMA args
                | expresion
                ;                 

cors            : LCOR expresion RCOR cors         
                | LCOR expresion RCOR         
                ;                