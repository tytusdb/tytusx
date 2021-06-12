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
INICIO : MOBJETOS EOF     { 
                            $$ = $1;
                            console.log(ListaErr.getErrores());
                            console.log("TODO BIEN, TODO CORRECTO :D!!");
                            return $$;
                            } ;

MOBJETOS:   MOBJETOS MOBJETO        { $1.push($2); $$ = $1; }
	     | MOBJETO                {  $$ = [$1];  } ;
                
MOBJETO  : tk_menor tk_identificador LATRIBUTOS tk_mayor OBJETOS tk_menor tk_slash tk_identificador tk_mayor {

                $$ = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3,$5,1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor TEXTOS tk_menor tk_slash tk_identificador tk_mayor {
                $$ = new Objeto($2,$8,$5,@1.first_line, @1.first_column,$3,[],1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor tk_menor tk_slash tk_identificador tk_mayor { 
                $$ = new Objeto($2,$7,'',@1.first_line, @1.first_column,$3,[],1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_slash tk_mayor {
                $$ = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3,[],1);

        }
        | tk_menor tk_interrogacion tk_xml tk_version tk_igual CADENA tk_encoding tk_igual CADENA tk_interrogacion tk_mayor {  
                $$ = new Objeto("version","version",$9,@1.first_line, @1.first_column,[],[],0);
        } 
        | error FINERROR {

                ListaErr.agregarError(new Error(NumeroE, yylineno,this._$.first_column + 1, "Sintactico", "Se esperaba un objeto y se encontro "+ yytext,"XML")); NumeroE++;
                $$ = new Objeto("","",'',@1.first_line, @1.first_column,[],[],0);
        
        } ;

FINERROR: tk_mayor 

        | tk_menor

        | tk_identificador

        | tk_slash

        | tk_igual

        | tk_texto

        | tk_cadena1

        | tk_cadena2

        | EOF;
        
CADENA : tk_cadena1 { $$ = $1 }
        | tk_cadena2 {  $$ = $1 };

TEXTOS : TEXTOS TEXTO { $1 = $1 + " " + $2; $$ = $1; } 
        | TEXTO {  $$ = $1; } ; 

TEXTO :      tk_identificador   { $$ = $1; }
        |    tk_numero          { $$ = $1; }
        |    tk_lt              { $$ = "<"; }
        |    tk_gt              { $$ = ">"; }
        |    tk_amp             { $$ = "&"; }
        |    tk_apos            { $$ = "\'"; }
        |    tk_squote          { $$ = $1; }
        |    tk_interrogacion   { $$ = $1; }
        |    tk_dquote          { $$ = $1; }
        |    tk_corchetea       { $$ = $1; }
        |    tk_corchetec       { $$ = $1; }
        |    tk_llavea          { $$ = $1; }
        |    tk_llavec          { $$ = $1; }
        |    tk_xml             { $$ = $1; }
        |    tk_encoding        { $$ = $1; }
        |    tk_version         { $$ = $1; }
        |    tk_quot            { $$ = "\""; }
        |    tk_cadena1         { $1 = `"`+ $1 + `"`; $$ = $1; }
        |    tk_cadena2         { $1 = `'`+ $1 + `'`; $$ = $1; }
        |    tk_texto           { $$ = $1; };

OBJETOS:   OBJETOS OBJETO        { $1.push($2); $$ = $1; }
	     | OBJETO                { $$ = [$1];  } ;
                
OBJETO  : tk_menor tk_identificador LATRIBUTOS tk_mayor OBJETOS tk_menor tk_slash tk_identificador tk_mayor {
                $$ = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3,$5,1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor TEXTOS tk_menor tk_slash tk_identificador tk_mayor {
                $$ = new Objeto($2,$8,$5,@1.first_line, @1.first_column,$3,[],1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor tk_menor tk_slash tk_identificador tk_mayor { 
                $$ = new Objeto($2,$7,'',@1.first_line, @1.first_column,$3,[],1);
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_slash tk_mayor {
                $$ = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3,[],1);
         }
        | error FINERROR {
        ListaErr.agregarError(new Error(NumeroE, yylineno, this._$.first_column + 1, "Sintactico", "Se esperaba un objeto y se encontro "+ yytext,"XML")); NumeroE++;
        $$ = new Objeto("","",'',@1.first_line, @1.first_column,[],[],0);
        } ;


LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; };

ATRIBUTOS:  ATRIBUTOS ATRIBUTO                      { $1.push($2); $$ = $1; }
        | ATRIBUTO                                  { $$ = [$1];} ;

ATRIBUTO: tk_identificador tk_igual tk_cadena1            { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
        | tk_identificador tk_igual tk_cadena2            { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); }
        | error FINERROR {
          ListaErr.agregarError(new Error(NumeroE, yylineno, this._$.first_column + 1, "Sintactico", "Se esperaba un atributo y se encontro "+ yytext,"XML")); NumeroE++;
          $$ = null;
          } ;





