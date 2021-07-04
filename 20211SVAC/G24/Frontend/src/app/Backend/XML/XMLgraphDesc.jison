

%lex
%options case-insensitive

%s cuerpo
%s xml
%x Comentario

%%
/* Espacios en blanco */
[<][!][-][-][^>]*[-][-]+[>]                        {}

">"                     this.begin('cuerpo'); return 'MAYORQUE'

<cuerpo>"</"           this.begin('INITIAL');if(palabra.replaceAll(" ","") == "")  return 'SALIDA'; yytext = palabra; palabra = "";if(palabra.replaceAll(" ","") == "") return 'CUERPO';
<cuerpo>"<"           this.begin('INITIAL');  return 'MENORQUE'; yytext = palabra; palabra = ""; return 'CUERPO';
<cuerpo>"<"           this.begin('INITIAL');  return 'SELFCLOSE'; yytext = palabra; palabra = ""; return 'CUERPO';

<cuerpo>.             palabra += yytext;



"?>"                    return 'MAYORQUEESPECIAL'
"</"                     return 'SALIDA'
"/>"                    return 'SELFCLOSE'
"<?"                    return 'MENORQUEESPECIAL'
"<"                     return 'MENORQUE'
"="                     return 'IGUAL';
\"[^\"]*\"             { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'             { yytext=yytext.substr(1,yyleng-2); return 'QUOTE'; }


([a-zA-Z_À-ÿ])[a-zA-Z0-9_^ÑñÀ-ÿ]*  return 'IDENTIFICADOR';
<<EOF>>               return 'EOF'
[ \r\t]+ {}
\n+ {}
\s+ {}
.                        {}
/lex

// DEFINIMOS PRECEDENCIA DE OPERADORES

%{
    var palabra = ""
    var palabra1 = ""
%}

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%
/* Definición de la gramática */


START
        : OBJETO EOF                   {  return "<START> ::= <OBJETO> <EOF>\n"+$1;}
        ;

INSTRUCCION
        : CUERPO { 
                
                $$=$1+"<INSTRUCCION> ::= <CUERPO>\n" +"<INSTRUCCION> ::= "+" \n"
        }
        | OBJETOS { 
                
                $$=$1+"<INSTRUCCION> ::= <OBJETOS>\n"  
        }
        ;

OBJETOS
        : OBJETO OBJETOS { 
                $$="<OBJETOS> ::= <OBJETO><OBJETOS>\n"+$1+$2
         }
        | OBJETO { 
                $$="<OBJETOS> ::= <OBJETO>\n"+$1
         }
        |%empty 
        ;

OBJETO
        : MENORQUEESPECIAL IDENTIFICADOR L_ATRIBUTOS MAYORQUEESPECIAL  INSTRUCCION          {
                $$="<OBJETO> ::= <MENORQUEESPECIAL> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUEESPECIAL> <INSTRUCCION>\n<OBJETO> ::= <?"+$2+" "+$3+"?>\n"+$5
        }
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS SELFCLOSE INSTRUCCION      {
                $$="<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <SELFCLOSE> <INSTRUCCION>\n<OBJETO> ::= <"+$2+" "+ $3+"/>\n"+$5
        }
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION SALIDA IDENTIFICADOR MAYORQUE {
                $$="<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <SALIDA> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <"+$2+$3+">\n"+$5+"<"+$7+">\n"
        }
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION IDENTIFICADOR MAYORQUE {
                $$="<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <"+$2+$3+">\n"+$5+"<"+$6+">\n"
        }
        ;


L_ATRIBUTOS:
           ATRIBUTO L_ATRIBUTOS  {
                $$="<L_ATRIBUTOS> ::= <ATRIBUTO><L_ATRIBUTOS>\n"+$1+$2+"\n"
          }
          |ATRIBUTO           {
                $$="<L_ATRIBUTOS> ::= <ATRIBUTO>\n"+$1+"\n"
          }
          |%empty
;

ATRIBUTO
        :IDENTIFICADOR IGUAL CADENA {
                $$="<ATRIBUTO> ::= <IDENTIFICADOR><IGUAL><CADENA>\n<ATRIBUTO> ::= "+$1+"= \""+$3+"\"\n"
        }
        |IDENTIFICADOR IGUAL QUOTE  {
                $$="<ATRIBUTO> ::= <IDENTIFICADOR><IGUAL><QUOTE>\n<ATRIBUTO> ::= "+$1+"= \""+$3+"\"\n"
        }
        ;