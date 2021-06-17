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


([a-zA-Z])[a-zA-Z0-9_]*  return 'IDENTIFICADOR';
<<EOF>>               return 'EOF'
[ \r\t]+ {}
\n+ {}
\s+ {}
.                       console.log("Error Lexico");
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
        : OBJETO EOF                   { return $1;}
        ;

INSTRUCCION
        : CUERPO { $$ = $1;}
        | OBJETOS { $$ = $1;}
        ;

OBJETOS
        : OBJETO OBJETOS { $$ = $1+$2; }
        | OBJETO { $$ = $1; }
        |%empty
        ;

OBJETO
        : MENORQUEESPECIAL IDENTIFICADOR L_ATRIBUTOS MAYORQUEESPECIAL  INSTRUCCION          {$$ = "Inicio: "+$2 + " -> atributos:  -> "+ $3+ " instruccion: "+ $5;}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS SELFCLOSE INSTRUCCION      {$$ = $2 +" -> atributos:  -> "+ $3+ " -> [" + $5 + "]";}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION SALIDA IDENTIFICADOR MAYORQUE {$$ = $2 +" -> atributos:  -> "+ $3+ " -> [" + $5 + "]";}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION IDENTIFICADOR MAYORQUE {$$ = $2 + " -> atributos:  -> "+ $3 + " instruccion: "+ $5;}
        ;


L_ATRIBUTOS:
           ATRIBUTO L_ATRIBUTOS {$$=$1+$2;}
          |ATRIBUTO { $$ = $1; }
          |%empty
;

ATRIBUTO
        :IDENTIFICADOR IGUAL CADENA {$$=$1+"="+$3}
        |IDENTIFICADOR IGUAL QUOTE  {$$=$1+"="+$3}
        ;
