/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */




/* SIMBOLOS PARA OPERACIONES RELACIONALES */

"<?"                        return 'lteq';
"?>"                        return 'gteq';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding'
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"/"                         return 'div';
"!"                         return 'not';


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

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START: 
        lteq xml  version asig StringLiteral encoding asig StringLiteral gteq RAIZ EOF { $$= new Nodo('START', 'START -> lteq xml  version asig StringLiteral encoding asig StringLiteral gteq RAIZ');
                                                                       $$.insertHijo('lteq',$1.yytext);
                                                                       $$.insertHijo('xml', $2.yytext);
                                                                       $$.insertHijo('version', $3.yytext);
                                                                       $$.insertHijo('asig', $4.yytext);
                                                                       $$.insertHijo('StringLiteral', $5.yytext);
                                                                       $$.insertHijo('encoding', $6.yytext);
                                                                       $$.insertHijo('asig', $7.yytext);
                                                                       $$.insertHijo('StringLiteral', $8.yytext);
                                                                       $$.insertHijo('gteq', $9.yytext);
                                                                       $$.insertHijo('RAIZ', $10.yytext);
                                                                       return $10;
                                                                       }
;
RAIZ:  
        lt identifier ATRIBUTOS gt RAICES  lt div identifier gt     { $$= new Nodo('RAIZ', 'RAIZ -> lt identifier ATRIBUTOS gt RAICES lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('ATRIBUTOS', $3.yytext);
                                                                       $$.insertHijo('gt', $4.yytext);
                                                                       $$.insertHijo('RAICES', $5.yytext);
                                                                       $$.insertHijo('lt', $6.yytext);
                                                                       $$.insertHijo('div', $7.yytext);
                                                                       $$.insertHijo('identifier', $8.yytext);
                                                                       $$.insertHijo('gt', $9.yytext); 
                                                                    }
	|   lt identifier  gt RAICES  lt div identifier gt              { $$= new Nodo('RAIZ', 'RAIZ -> lt identifier gt RAICES lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('gt', $3.yytext);
                                                                       $$.insertHijo('RAICES', $4.yytext);
                                                                       $$.insertHijo('lt', $5.yytext);
                                                                       $$.insertHijo('div', $6.yytext);
                                                                       $$.insertHijo('identifier', $7.yytext);
                                                                       $$.insertHijo('gt', $8.yytext); }
;

RAICES:
    NODO RAICES_PRIMA {$$= new Nodo('RAICES', 'RAICES->NODO RAICES_PRIMA');
                       $$.insertHijo('NODO',$1.yytext);
                       $$.insertHijo('RAICES_PRIMA', $2.yytext);  
                      }
;

RAICES_PRIMA:
            NODO RAICES_PRIMA { $$ = new Nodo('RAICES_PRIMA', 'RAICES_PRIMA -> NODO RAICES_PRIMA'); 
                                $$.insertHijo('NODO', $1.yytext); 
                                $$.insertHijo('RAICES_PRIMA',$2.yytext);
                            }
        |  { $$ = ' '; }
;

NODO:  OBJETO  {$$ = new Nodo('NODO', 'NODO -> OBJETO'); $$.insertaHijo('OBJETO',$1.yytext);}
;

OBJETO: 
        lt identifier ATRIBUTOS gt RAICES  lt div identifier gt      { $$= new Nodo('OBJETO', 'OBJETO -> lt identifier ATRIBUTOS gt RAICES lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('ATRIBUTOS', $3.yytext);
                                                                       $$.insertHijo('gt', $4.yytext);
                                                                       $$.insertHijo('RAICES', $5.yytext);
                                                                       $$.insertHijo('lt', $6.yytext);
                                                                       $$.insertHijo('div', $7.yytext);
                                                                       $$.insertHijo('identifier', $8.yytext);
                                                                       $$.insertHijo('gt', $9.yytext);
                                                                     }
	  | lt identifier ATRIBUTOS gt identifier  lt div identifier gt   { $$= new Nodo('OBJETO', 'OBJETO -> lt identifier ATRIBUTOS gt identifier lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('ATRIBUTOS', $3.yytext);
                                                                       $$.insertHijo('gt', $4.yytext);
                                                                       $$.insertHijo('identifier', $5.yytext);
                                                                       $$.insertHijo('lt', $6.yytext);
                                                                       $$.insertHijo('div', $7.yytext);
                                                                       $$.insertHijo('identifier', $8.yytext);
                                                                       $$.insertHijo('gt', $9.yytext);
                                                                      } 
	  | lt identifier  gt RAICES  lt div identifier gt                { $$= new Nodo('OBJETO', 'OBJETO -> lt identifier gt RAICES lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('gt', $3.yytext);
                                                                       $$.insertHijo('RAICES', $4.yytext);
                                                                       $$.insertHijo('lt', $5.yytext);
                                                                       $$.insertHijo('div', $6.yytext);
                                                                       $$.insertHijo('identifier', $7.yytext);
                                                                       $$.insertHijo('gt', $8.yytext);
                                                                      } 
	  | lt identifier  gt identifier  lt div identifier gt            { $$= new Nodo('OBJETO', 'OBJETO -> lt identifier gt identifier lt div identifier gt');
                                                                       $$.insertHijo('lt',$1.yytext);
                                                                       $$.insertHijo('identifier', $2.yytext);
                                                                       $$.insertHijo('gt', $3.yytext);
                                                                       $$.insertHijo('identifier', $4.yytext);
                                                                       $$.insertHijo('lt', $5.yytext);
                                                                       $$.insertHijo('div', $6.yytext);
                                                                       $$.insertHijo('identifier', $7.yytext);
                                                                       $$.insertHijo('gt', $8.yytext); 
                                                                       } 
;

ATRIBUTOS:	
        ATRIBUTO ATRIBUTOS_L {$$= new Nodo('ATRIBUTOS','ATRIBUTOS->ATRIBUTO ATRIBUTOS_L'); $$.insertHijo('ATRIBUTO', $1.yytext); $$.insertHijo('ATRIBUTOS_L',$2.yytext);}
;

ATRIBUTOS_L:	
        ATRIBUTO ATRIBUTOS_L {$$= new Nodo('ATRIBUTOS_L', 'ATRIBUTO ATRIBUTOS_L'); $$.insertHijo('ATRIBUTO',$1.yytext); $$insertHijo('ATRIBUTOS_L', $2.yytext);} 
        | { $$ = '';}
;

ATRIBUTO: identifier asig StringLiteral {
                                            $$ = new Nodo('ATRIBUTO', 'ATRIBUTO -> identifier asig StringLiteral'); 
                                            $$.insertHijo('identifier',$1.yytext);
                                            $$.insertaHijo('asig', $2.yytext);
                                            $$.insertaHijo('StringLiteral', $3.yytext);
                                         }
;