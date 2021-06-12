/* Definición Léxica */
%lex

%options case-insensitive

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */

"<!--"                               this.begin('comment');
<comment>"-->"                       this.popState();
<comment>.                          /* skip commentario content*/



"&lt;"                            %{ return 'tk_lt'; %}
"&gt;"                            %{ return 'tk_gt'; %}
"&amp;"                           %{ return 'tk_amp'; %}
"&apos;"                          %{ return 'tk_apos'; %}
"&quot;"                          %{ return 'tk_quot'; %}
[0-9]+("."[0-9]+)?\b              %{ return 'tk_numero';  %}
"xml"                  %{ return 'tk_xml'; %}
"version"                  %{ return 'tk_version'; %}
"encoding"                  %{ return 'tk_encoding'; %}
">"                     %{ return 'tk_mayor'; %}
"<"                     %{ return 'tk_menor'; %}
"="                     %{ return 'tk_igual'; %}
"?"                     %{ return 'tk_interrogacion'; %}
"/"                     %{ return 'tk_slash'; %}
\"[^\"]*\"              %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'              %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_!@#$%\+\^\'\`\"&\*()/¡:;.,~-]+     %{ return 'tk_texto'; %}
[']     %{ return 'tk_squote'; %}
["]      %{ return 'tk_dquote'; %}
"["      %{ return 'tk_corchetea'; %}
"]"      %{ return 'tk_corchetec'; %}
"{"      %{ return 'tk_llavea'; %}
"}"      %{ return 'tk_llavec'; %}

\s+                                 /* skip whitespace */
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}
<<EOF>>     %{  return 'EOF';   %}
.          {
        ListaErr.agregarError(new Error(NumeroE, yylloc.first_line, yylloc.first_column + 1, "Lexico", "El caracter " + yytext + " no pertenece al lenguaje.","XML")); NumeroE++;
 }

/lex

//SECCION DE IMPORTS
%{

%}


// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO :  EOF     {  } ;


