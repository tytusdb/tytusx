
%{
    let $ESPACIOS = "";
%}
%lex
%options case-insensitive
%s S1

/* Expresiones regulares */
num     [0-9]+
id      [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

%%
"<!--"(.|\n)*"-->"  {/* Ignoro los comentarios simples */}
<INITIAL>\s+                    /* skip whitespace */
<INITIAL>{cadena}              { console.log("Reconocio : "+ yytext); return 'CADENA'} 
<INITIAL>{id}                  { console.log("Reconocio : "+ yytext); return 'ID'}
<INITIAL>"<"                   { console.log("Reconocio : "+ yytext); return '<'}  
<INITIAL>"="                   { console.log("Reconocio : "+ yytext); return '='}
<INITIAL>"/"                   { console.log("Reconocio : "+ yytext); return '/'}

// Cambiando de estado
<INITIAL>'>'                 { this.begin("S1"); $ESPACIOS=""; console.log("Reconocio : "+ yytext); return ">";}

// Estado S1
<S1>"&lt;"                   { yytext = $ESPACIOS + "<"; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };
<S1>"&gt;"                   { yytext = $ESPACIOS + ">"; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };
<S1>"&amp;"                  { yytext = $ESPACIOS + "&"; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };
<S1>"&apos;"                 { yytext = $ESPACIOS + "\'"; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };
<S1>"&quot;"                 { yytext = $ESPACIOS + "\""; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };
"<!--"(.|\n)*"-->"           {  /* Ignoro los comentarios simples */}
<S1>\s                       { $ESPACIOS += yy.lexer.match;};
<S1>'<'                      { this.begin("INITIAL"); console.log("Reconocio : "+ yytext); return "<";}
<S1>.                        { yytext = $ESPACIOS + yytext; $ESPACIOS="";  console.log("Reconocio : "+ yytext); return 'TEXTO'; };

<<EOF>>		                 return 'EOF'

/* Errores lexicos */
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));        
                        }
/lex


/* Area de imports */

%{
     
%}

%start inicio

%% /* gramatica */


inicio: raices EOF {$$ = "inicio -> raices \n"+$1;  return $$; }
    ;

raices: raices raiz { $$ = 'raices -> raices raiz; \n'+$1+$2;}
        | raiz      {$$ = 'raices -> raiz; \n'+$1; }
        ;

raiz: objeto { $$= 'raiz -> objeto; \n'+$1; }
    ;

objeto:  '<' ID latributos '/' '>'                              { $$ = 'objeto -> < ID latributos / >; \n'+$3;}
       | '<' ID latributos '>'  texto_libre  '<' '/' ID '>'     { $$ = 'objeto -> < ID latributos >  texto_libre  < / ID >; \n'+$3+$5;}    
       | '<' ID latributos '>'  objetos  '<' '/' ID '>'         {$$ ='objeto -> < ID latributos >  objetos </ID >; \n'+$3+$5;}
        ;

objetos: objetos objeto         { $$ = 'objetos -> objetos objeto; \n'+$1+$2;}
         |objeto                { $$ = 'raiz -> objeto; \n'+$1;} 
         ;

latributos: atributos { $$ = 'latributos -> atributos; \n'+$1;}
            |         { $$= 'latributos -> []; \n';} 
            ;

atributos:   atributos atributo   { $$ = 'atributos -> atributos atributo; \n'+$1+$2;}
            |atributo             { $$ = 'atributos -> atributo; \n'+$1;} 
            ;

atributo: ID '=' CADENA  { $$ = 'atributo -> ID = CADENA; \n';}
        ;

texto_libre : texto_libre TEXTO       { $$ = 'texto_libre -> texto_libre TEXTO; \n'+$1; }
             | TEXTO                  { $$ = 'texto_libre -> TEXTO; \n';}
             ;
