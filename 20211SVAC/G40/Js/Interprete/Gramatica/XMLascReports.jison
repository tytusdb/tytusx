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
/*var nodoAux = null;
var objeto = null;
var atributo = null; */ 
%}


// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : MOBJETOS EOF     { RGxml.agregarElemento("INICIO -> listaObjetosRaiz","INICIO.val := ListaObjetosRaiz.val");
                            var root = new NodoArbol("INICIO","");
                            root.agregarHijo($1[1]);
                            console.log("TODO BIEN, TODO CORRECTO :D!! (Version 2)");
                            $$ = [$1[0], root];
                            return $$;
                            } ;

MOBJETOS:   MOBJETOS MOBJETO        { RGxml.agregarElemento("ListaObjetosRaiz -> ListaObjetosRaiz Objeto","ListaObjetosRaiz.val := ListaObjetosRaiz.val.push(Objeto.val)");
                                      nodoAux = new NodoArbol("ListaObjetosRaiz","");                                  
                                      nodoAux.agregarHijo($2[1]);
                                      $1[1].agregarHijo(nodoAux);
                                      $1[0].push($2[0]); 
                                      $$ = [$1[0],$1[1]]; }

	     | MOBJETO                { RGxml.agregarElemento("ListaObjetosRaiz -> Objeto","ListaObjetosRaiz.val := Objeto.val");
                                        nodoAux = new NodoArbol("ListaObjetosRaiz","");
                                        nodoAux.agregarHijo($1[1]);
                                        $$ = [[$1[0]],nodoAux];  } ;
                
MOBJETO  : tk_menor tk_identificador LATRIBUTOS tk_mayor OBJETOS tk_menor tk_slash tk_identificador tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" objetos "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,objetos.val)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3[0],$5[0],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor TEXTOS tk_menor tk_slash tk_identificador tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" textos "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,textos.val)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,$5[0],@1.first_line, @1.first_column,$3[0],[],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor tk_menor tk_slash tk_identificador tk_mayor { 
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,null)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($8,"simbolo"));
                objeto = new Objeto($2,$7,'',@1.first_line, @1.first_column,$3[0],[],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_slash tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos / id>`,"Objeto.val := new Objeto(id.val,atributos.val,null)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                objeto = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3[0],[],2);
                $$ = [objeto,nodoAux];
        }
        | tk_menor tk_interrogacion tk_xml tk_version tk_igual CADENA tk_encoding tk_igual CADENA tk_interrogacion tk_mayor { 
                RGxml.agregarElemento(`Objeto -> "<" "?" "xml" "version" "=" Cadena "encoding" "igual" Cadena "?" ">"`,"Objeto.val := new Objeto(encoding,null,null)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($3,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($4,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                nodoAux.agregarHijo($6[1]);
                nodoAux.agregarHijo(new NodoArbol($7,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($8,"simbolo"));
                nodoAux.agregarHijo($9[1]);
                nodoAux.agregarHijo(new NodoArbol($10,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($11,"simbolo"));
                objeto = new Objeto("version","version",$9[0],@1.first_line, @1.first_column,[],[],0);
                $$ = [objeto,nodoAux];
        } 
        | error FINERROR {
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol("Error",""));
                ListaErr.agregarError(new Error(NumeroE, yylineno,this._$.first_column + 1, "Sintactico", "Se esperaba un objeto y se encontro "+ yytext,"XML")); NumeroE++;
                objeto = new Objeto("","",'',@1.first_line, @1.first_column,[],[],0);
                $$ = [objeto,nodoAux];
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
        


CADENA : tk_cadena1 {   RGxml.agregarElemento(`Cadena -> tk_cadena`,"Cadena.val := tk_cadena.val");
                        nodoAux = new NodoArbol($1,"cadena");
                        $$ = [$1, nodoAux]; }

        | tk_cadena2 {  RGxml.agregarElemento(`Cadena -> tk_cadena`,"Cadena.val := tk_cadena.val");
                        nodoAux = new NodoArbol($1,"cadena");
                        $$ = [$1, nodoAux]; };

TEXTOS : TEXTOS TEXTO { RGxml.agregarElemento(`Textos -> Textos Texto`,`Textos.val := Textos.val + " " + Texto.val`);
                        nodoAux = new NodoArbol("TEXTOS","");
                        nodoAux.agregarHijo($2[1]);
                        $1[1].agregarHijo(nodoAux);
                        $1[0] = $1[0] + " " + $2[0];
                        $$ = [$1[0],$1[1]]; } 

        | TEXTO {  RGxml.agregarElemento(`Textos -> Texto`,`Textos.val := Texto.val`);
                   nodoAux = new NodoArbol("TEXTOS","");
                   nodoAux.agregarHijo($1[1]);
                   $$ = [$1[0],nodoAux]; } ; 

TEXTO :      tk_identificador   { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_numero          { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_lt              { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol("<","texto"));
                                  $$ = ["<",nodoAux]; }

        |    tk_gt              { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol(">","texto"));
                                  $$ = [">",nodoAux]; }

        |    tk_amp             { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol("&","texto"));
                                  $$ = ["&",nodoAux]; }
                                  
        |    tk_apos            { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol("\'","texto"));
                                  $$ = ["\'",nodoAux]; }

        |    tk_squote          { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_interrogacion   { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_dquote          { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_corchetea       { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_corchetec       { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_llavea          { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_llavec          { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_xml             { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_encoding        { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_version         { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_quot            { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol("\"","texto"));
                                  $$ = ["\"",nodoAux]; }

        |    tk_cadena1         { $1 = `"`+ $1 + `"`;
                                  nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux]; }

        |    tk_cadena2         { $1 = `'`+ $1 + `'`;
                                  nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux];  }
                                  
        |    tk_texto           { nodoAux = new NodoArbol("TEXTO","");
                                  nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                                  $$ = [$1,nodoAux];  };

OBJETOS:   OBJETOS OBJETO        { RGxml.agregarElemento("ListaObjetos -> ListaObjetos Objeto","ListaObjetos.val := ListaObjetos.val.push(Objeto.val)");
                                   nodoAux = new NodoArbol("ListaObjetos","");                                  
                                   nodoAux.agregarHijo($2[1]);
                                   $1[1].agregarHijo(nodoAux);
                                   $1[0].push($2[0]); 
                                   $$ = [$1[0],$1[1]]; }


	     | OBJETO                { RGxml.agregarElemento("ListaObjetos -> ListaObjetos Objeto","ListaObjetos.val := Objeto.val");
                                       nodoAux = new NodoArbol("ListaObjetos","");
                                       nodoAux.agregarHijo($1[1]);
                                       $$ = [[$1[0]],nodoAux];  } ;
                
OBJETO  : tk_menor tk_identificador LATRIBUTOS tk_mayor OBJETOS tk_menor tk_slash tk_identificador tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" objetos "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,objetos.val)");
                nodoAux = new NodoArbol("Objeto","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3[0],$5[0],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor TEXTOS tk_menor tk_slash tk_identificador tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" textos "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,textos.val)");
                nodoAux = new NodoArbol("Objeto","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,$5[0],@1.first_line, @1.first_column,$3[0],[],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_mayor tk_menor tk_slash tk_identificador tk_mayor { 
                RGxml.agregarElemento(`Objeto -> "<" id atributos ">" "<" / id>`,"Objeto.val := new Objeto(id.val,atributos.val,null)");
                nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux = new NodoArbol("Objeto","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($8,"simbolo"));
                objeto = new Objeto($2,$7,'',@1.first_line, @1.first_column,$3[0],[],1);
                $$ = [objeto,nodoAux];
        } 
        | tk_menor tk_identificador LATRIBUTOS tk_slash tk_mayor {
                RGxml.agregarElemento(`Objeto -> "<" id atributos / id>`,"Objeto.val := new Objeto(id.val,atributos.val,null)");
                nodoAux = new NodoArbol("Objeto","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                objeto = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3[0],[],2);
                $$ = [objeto,nodoAux];
         }
        | error FINERROR {
                nodoAux = new NodoArbol("Objeto","");
                nodoAux.agregarHijo(new NodoArbol("Error",""));
                ListaErr.agregarError(new Error(NumeroE, yylineno,this._$.first_column + 1, "Sintactico", "Se esperaba un objeto y se encontro "+ yytext,"XML")); NumeroE++;
                objeto = new Objeto("","",'',@1.first_line, @1.first_column,[],[],0);
                $$ = [objeto,nodoAux];
        } ;


LATRIBUTOS: ATRIBUTOS   { RGxml.agregarElemento(`ListaAtributos -> Atributos`,"ListaAtributos.val := Atributos.val");
                          nodoAux = new NodoArbol("ListaAtributos","");
                          nodoAux.agregarHijo($1[1]);
                          $$ = [$1[0], nodoAux]; }

           |            { RGxml.agregarElemento(`ListaAtributos -> ε`,"ListaAtributos.val := []");
                          nodoAux = new NodoArbol("ListaAtributos","");
                          nodoAux.agregarHijo(new NodoArbol("E","simbolo"));
                          $$ = [[], nodoAux]; };

ATRIBUTOS:  ATRIBUTOS ATRIBUTO  { RGxml.agregarElemento(`Atributos -> Atributos Atributo`,"Atributos.val := Atributos.val.push(Atributo.val)");
                                  nodoAux = new NodoArbol("Atributos","");                                  
                                  nodoAux.agregarHijo($2[1]);
                                  $1[1].agregarHijo(nodoAux);
                                  $1[0].push($2[0]); 
                                  $$ = [$1[0],$1[1]]; }

        | ATRIBUTO              { RGxml.agregarElemento(`Atributos -> Atributo`,"Atributos.val := Atributo.val");
                                  nodoAux = new NodoArbol("Atributos","");
                                  nodoAux.agregarHijo($1[1]);
                                  $$ = [[$1[0]],nodoAux]; } ;

ATRIBUTO: tk_identificador tk_igual tk_cadena1  {  RGxml.agregarElemento(`Atributo -> id "=" Cadena`,"Atributo.val := new Atributo(id.val,cadena.val)");
                                                   nodoAux = new NodoArbol("Atributo","");
                                                   nodoAux.agregarHijo(new NodoArbol($1,"identificador"));
                                                   nodoAux.agregarHijo(new NodoArbol($2,"simbolo"));
                                                   nodoAux.agregarHijo(new NodoArbol($3,"cadena"));
                                                   atributo = new Atributo($1, $3, @1.first_line, @1.first_column);
                                                   $$ = [atributo,nodoAux]; }
        

        | tk_identificador tk_igual tk_cadena2  {  RGxml.agregarElemento(`Atributo -> id "=" Cadena`,"Atributo.val := new Atributo(id.val,cadena.val)");
                                                   nodoAux = new NodoArbol("Atributo","");
                                                   nodoAux.agregarHijo(new NodoArbol($1,"identificador"));
                                                   nodoAux.agregarHijo(new NodoArbol($2,"simbolo"));
                                                   nodoAux.agregarHijo(new NodoArbol($3,"cadena"));
                                                   atributo = new Atributo($1, $3, @1.first_line, @1.first_column);
                                                   $$ = [atributo,nodoAux]; }
        | error FINERROR {
        
          nodoAux = new NodoArbol("Atributo","");
          nodoAux.agregarHijo(new NodoArbol("Error",""));
          ListaErr.agregarError(new Error(NumeroE, yylineno, this._$.first_column + 1, "Sintactico", "Se esperaba un atributo y se encontro "+ yytext,"XML")); NumeroE++;
          atributo = null;
          $$ = [atributo,nodoAux];
          } ;





