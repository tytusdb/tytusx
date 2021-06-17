%{
const atributo = require("./Expresiones/Atributo");
const tipo= require("./Simbolos/Tipo");
const objeto= require("./Expresiones/Objeto");
const CErrores= require("./Excepciones/Errores")
const CNodoErrores= require("./Excepciones/NodoErrores")
const inicio = require("../../../componentes/contenido-inicio/contenido-inicio.component")

%}

%lex
%options case-insensitive

%s cuerpo
%s xml
%x Comentario

%%
/* Espacios en blanco */
"//".*            	  {}
"<!--"                {console.log("Comenzo el comentario"); this.begin("Comentario"); }
<Comentario>[ \r\t]+  {}
<Comentario>\n        {}
<Comentario>"-->"     {console.log("Termino el comentario"); this.popState();}
<Comentario>[^"-->"]+ {console.log("Texto dentro del comentario: "+yytext+" :("); return 'COMENTARIOS'}

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
.                        {inicio.listaErrores.push(new CNodoErrores.default("Lexico","No se esperaba el caracter: "+yytext,yylloc.first_line,yylloc.first_column)); console.log("Lexico, No se esperaba el caracter: "+yytext +" Linea: "+ yylloc.first_line + "Columna: " + yylloc.first_column);}

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
        : OBJETO EOF                   {  console.log($1); return $1;}
        ;

INSTRUCCION
        : CUERPO { $$ = $1;}
        | OBJETOS { $$ = $1;}
        ;

OBJETOS
        : OBJETO OBJETOS { $2.push($1); $$ = $2; }
        | OBJETO { $$ = [$1];}
        |%empty 
        ;

OBJETO
        : MENORQUEESPECIAL IDENTIFICADOR L_ATRIBUTOS MAYORQUEESPECIAL  INSTRUCCION          {$$ = new objeto.default($2,null,$3,$5,@1.first_line,@1.first_column);}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS SELFCLOSE INSTRUCCION      {$$ = new objeto.default($2,null,$3,$5,@1.first_line,@1.first_column);}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION SALIDA IDENTIFICADOR MAYORQUE {$$ = new objeto.default($2,null,$3,$5,@1.first_line,@1.first_column);}
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION IDENTIFICADOR MAYORQUE {$$ = new objeto.default($2,$5,$3,null,@1.first_line,@1.first_column);}
        | COMENTARIOS {$$="<!-- "+$1+" --!>"}
        |       {$$=""}
        ;


L_ATRIBUTOS:
           ATRIBUTO L_ATRIBUTOS {$2.push($1); $$ = $2;}
          |ATRIBUTO {  $$ = [$1];}
          |%empty
;

ATRIBUTO
        :IDENTIFICADOR IGUAL CADENA {$$=new atributo.default($1,$3,@1.first_line,@1.first_column);}
        |IDENTIFICADOR IGUAL QUOTE  {$$=new atributo.default($1,$3,@1.first_line,@1.first_column);}
        ;
