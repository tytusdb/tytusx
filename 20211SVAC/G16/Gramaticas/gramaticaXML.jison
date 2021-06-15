%{
  const Estado=require('../app/Clases/Models/Estado.js')
  const Gram = require('../app/Clases/Models/ListaGramatica.js')
  var NodoGram = require('../app/Clases/Models/NodoGramatica.js')
  var Atributo=require("../app/Clases/Models/Atributo.js")
  var Objeto=require("../app/Clases/Models/Objeto.js")
  var Raiz=require("../app/Clases/Models/Raiz.js")
  var nodoError=require("../app/Clases/Models/Errores.js")
  var ErrorL=require("../app/Clases/Models/ListaError.js")
  var Nodo=require("../app/Clases/Models/Nodo.js")

%}

/*-------------------------Léxico------------------*/
%lex
%options case-insensitive
%x Comentario
%%

//comentarios
\s+                                 // se ignoran espacios en blanco
"<!--"                {this.begin("Comentario"); }
<Comentario>[^"-->"]+ {}
<Comentario>"-->"     { this.popState();}

//palabras reservadas
"version"           {return 'version'}
"encoding"          {return 'encoding'}
"xml"               {return 'xml'}
"&lt;"              {return 'menorque'}
"&gt;"              {return 'mayorque'}
"&amp;"             {return 'ampersand'}
"&apos;"            {return 'apostrofe'}
"&quot;"            {return 'comilla'}
"\"UTF-8\""         {return 'utf'}
"\"ASCII\""         {return 'ascii'}
"\"ISO-8859-1\""    {return 'iso'}
// Símbolos pertenecientes al lenguaje

"<"                 {return 'eInicio'}
">"                 {return 'eFin'}
"/"                 {return 'barra'}
"?"                 {return 'inter'}
"="                 {return 'igual'}

//expresiones regulares
([a-zA-Z]|"_")+("_"|"."|"-"|":"|"á"|"é"|"í"|"ó"|ú|"ñ"|"Á"|"É"|"Í"|"Ó"|"Ú"|[0-9A-Za-z])*    %{return 'ID';%}
[0-9]+                                                                                    %{return 'integer';%}
[0-9]+"."[0-9]+                                                                   %{return 'double';%}
[\"]([^\"\n]|(\\\")|(\\\'))*[\"]                                                          %{return 'CADENA';%}
[\'][^\'\n]*[\']                                                                          %{return 'CHAR';%}
[^<>&]+                                                                                   %{return 'CARACTER'%}

<<EOF>>             return 'EOF';

. { ErrorL.Errores.add(new nodoError.Error("Léxico","Caracter "+yytext+
" no reconocido",yylineno,yylloc.first_column,"XML")) }

/lex

/* Presedencia de operadores */

%left '+'
%left '*'

%start S

%% /* Laguage Grammatical */

S
    :INIT EOF       {
                        //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          $$=$1;
                          return $$;
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          let NodoS = new Nodo.default("S", "");
                          NodoS.AgregarHijo($1);
                          $$=NodoS;
                          return $$;
                        }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("S -> INIT EOF", "S.val := INIT.val"));
                        }
                    }
;
INIT
    :VERSION  {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  $$=$1
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$=$1
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("INIT -> VERSION", "INIT.val := VERSION.val"));
                }
              }

;
VERSION
  :eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  $$=new Raiz.default("INICIO");
                  let a=new Raiz.default("VERSION");
                  a.agregarHijo($4);
                  $$.agregarHijo(a);
                  $$.agregarHijo($9);
                  $$.agregarHijo($12);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let NodoVersion = new Nodo.default("VERSION", "");
                  NodoVersion.AgregarHijo(new Nodo.default("Version: "+$6, $9))
                  NodoVersion.AgregarHijo($9);
                  NodoVersion.AgregarHijo($12);
                  $$ = NodoVersion;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("VERSION -> eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP", "VERSION.val := CADENA.lexval + FORMATO.lexval + OP.val"));
                }
              }
  |error EOF {
        ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba una línea de código de inicialización en lugar de: "+yytext,@1.first_line, @1.first_column,"XML"));
  }
;

FORMATO
  : utf         {
                  //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  $$=new Raiz.default("FORMATO")
                  $$.agregarHijo($1);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$ = new Nodo.default("UTF", $1);
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> utf", "FORMATO.val := utf.lexval"));
                }
    }
  | ascii       {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$=new Raiz.default("FORMATO")
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("ASCII", $1);
                  }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> ascii", "FORMATO.val := ascii.lexval"));
                  }
                }
  | iso         {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$=new Raiz.default("FORMATO")
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("ISO", $1);
                  }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> iso", "FORMATO.val := iso.lexval"));
                  }
                }
  |error EOF {
                //ESTADO 1 ES PARA TS
 ErrorL.Errores.add(new nodoError.Error("Sintáctico","Formato desconocido: "+yytext,@1.first_line, @1.first_column,"XML"));
              }
;

OP
  : NODOS       {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$=new Raiz.default("L_ELEMENTOS");
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$=$1
                  }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OP -> NODOS", "OP.val := NODOS.val"));
                  }
                }
  |             {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$=[]
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("EPSILO", "");
                  }else{//PARA REPORTE GRAMATICAL

                  }
                }
;

NODOS
  : NODOS NODO {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    let p12=new Raiz.default("L_ELEMENTOS");
                    p12.agregarHijo($1);
                    p12.agregarHijo($2);
                    $$=p12;
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    let lnodo = new Nodo.default("NODOS","");
                    lnodo.AgregarHijo($1);
                    lnodo.AgregarHijo($2);
                    $$=lnodo;
                  }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODOS NODO", "NODOS.val := NODOS1.val + NODO.val"));
                  }
                }
  | NODO        {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$= new Raiz.default("ELEMENTO");
                    $$.agregarHijo($1)
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = $1
                  }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODO", "NODOS.val := NODO.val"));
                  }
                }
;

NODO
  : eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento=new Objeto.default($2,$8,"",$3,$5,false,@1.first_line, @1.first_column);
                  let p4=new Raiz.default("ELEMENTO");
                  p4.agregarHijo(elemento);
                  $$= p4;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n1 = new Nodo.default("NODO","");
                  n1.AgregarHijo(new Nodo.default($2, $2));
                  n1.AgregarHijo($3);
                  n1.AgregarHijo($5);
                  n1.AgregarHijo(new Nodo.default($8, $8));
                  $$=n1;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + NODOS.val + ID2.lexval"));
                }


  }
  | eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento1=new Objeto.default($2,$8,$5,$3,null,false,@1.first_line, @1.first_column) ;
                  let p5=new Raiz.default("ELEMENTO");
                  p5.agregarHijo(elemento1);
                  $$= p5;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n2 = new Nodo.default("NODO","");
                  n2.AgregarHijo(new Nodo.default($2, $2));
                  n2.AgregarHijo($3);
                  n2.AgregarHijo($5);
                  n2.AgregarHijo(new Nodo.default($8, $8));
                  $$=n2;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + TEXTO.val + ID2.lexval"));
                }
              }
  | eInicio ID ATRIBUTOS eFin eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento2=new Objeto.default($2,$7,"",$3,null,false,@1.first_line, @1.first_column)
                  let p6=new Raiz.default("ELEMENTO");
                  p6.agregarHijo(elemento2);
                  $$= p6;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n3 = new Nodo.default("NODO","");
                  n3.AgregarHijo(new Nodo.default($2, $2));
                  n3.AgregarHijo($3);
                  n3.AgregarHijo(new Nodo.default($7, $7));
                  $$=n3;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS eFin eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + ID2.lexval"));
                }
              }
  | eInicio ID ATRIBUTOS barra eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento3=new Objeto.default($2,"",texto,$3,null,true,@1.first_line, @1.first_column);
                  let p7=new Raiz.default("ELEMENTO");
                  p7.agregarHijo(elemento3);
                  $$= p7;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                   let n4 = new Nodo.default("NODO","");
                    n4.AgregarHijo(new Nodo.default($2, $2));
                    n4.AgregarHijo($3);
                    $$=n4;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS barra eFin", "NODO.val := ID.lexval + ATRIBUTOS.val"));
                }
              }
  | eInicio ID eFin NODOS eInicio barra ID eFin
            {
              //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento4=new Objeto.default($2,$7,"",null,$4,false,@1.first_line, @1.first_column);
                  let p8=new Raiz.default("ELEMENTO");
                  p8.agregarHijo(elemento4)
                  $$= p8;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n5 = new Nodo.default("NODO","");
                  n5.AgregarHijo(new Nodo.default($2, $2));
                  n5.AgregarHijo($4);
                  n5.AgregarHijo(new Nodo.default($7, $7));
                  $$=n5;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID eFin NODOS eInicio barra ID eFin", "NODO.val := ID1.lexval + NODOS.val + ID2.lexval"));
                }
            }
  | eInicio ID eFin TEXTO eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento5=new Objeto.default($2,$7,$4,null,null,false,@1.first_line, @1.first_column) ;
                  let p9=new Raiz.default("ELEMENTO");
                  p9.agregarHijo(elemento5);
                  $$= p9;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n6 = new Nodo.default("NODO","");
                  n6.AgregarHijo(new Nodo.default($2, $2));
                  n6.AgregarHijo($4);
                  n6.AgregarHijo(new Nodo.default($7, $7));
                  $$=n6;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID eFin TEXTO eInicio barra ID eFin", "NODO.val := ID1.lexval + TEXTO.val + ID2.lexval"));
                }
              }
  | eInicio ID  eFin eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento6=new Objeto.default($2,$6,texto,null,null,false,@1.first_line, @1.first_column);
                  let p10=new Raiz.default("ELEMENTO");
                  p10.agregarHijo(elemento6);
                  $$= p10;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n7 = new Nodo.default("NODO","");
                  n7.AgregarHijo(new Nodo.default($2, $2));
                  n7.AgregarHijo(new Nodo.default($6, $6));
                  $$=n7;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID  eFin eInicio barra ID eFin", "NODO.val := ID1.lexval + ID2.lexval"));
                }
              }
  | eInicio ID barra eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let elemento7=new Objeto.default($2,"",texto,null,null,true,@1.first_line, @1.first_column);
                  let p11=new Raiz.default("ELEMENTO");
                  p11.agregarHijo(elemento7);
                  $$= p11;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n8 = new Nodo.default("NODO","");
                  n8.AgregarHijo(new Nodo.default($2, $2));
                  $$=n8;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID barra eFin", "NODO.val := ID.lexval"));
                }

    }
  |error eFin
              {
              ErrorL.Errores.add(new nodoError.Error("Sintáctico","Caracter inesperado, verifique las etiquetas de apertura y cierre: "+yytext,@1.first_line, @1.first_column,"XML"));
              }
;

ATRIBUTOS
  : ATRIBUTOS ATRIBUTO
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let p3=new Raiz.default("L_ATRIBUTOS");
                  p3.agregarHijo($1);
                  p3.agregarHijo($2);
                  $$=p3;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let nodoatr = new Nodo.default("ATRIBUTOS","");
                  nodoatr.AgregarHijo($1);
                  nodoatr.AgregarHijo($2);
                  $$=nodoatr;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTOS ATRIBUTO ", "ATRIBUTOS.val := ATRIBUTOS1.val + ATRIBUTO.val"));
                }
              }
  | ATRIBUTO
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  $$= new Raiz.default("ATRIBUTO");
                  $$.agregarHijo($1);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$=$1;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTO", "ATRIBUTOS.val := ATRIBUTOS.val"));
                }
              }
;

ATRIBUTO
  : ID igual CADENA
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let atributo=new Atributo.default($1,$3,@1.first_line, @1.first_column);
                  let p2=new Raiz.default("ATRIBUTO");
                  p2.agregarHijo(atributo);
                  $$= p2;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let atid = new Nodo.default("ATR ID", $1);
                  atid.AgregarHijo(new Nodo.default($1, $1));
                  atid.AgregarHijo(new Nodo.default($2, $2));
                  $$=atid;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CADENA", "ATRIBUTO.val := ID.lexval + igual.lexval + CADENA.lexval"));
                }
              }
  | ID igual CHAR
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  let atributo2=new Atributo.default($1,$3,@1.first_line, @1.first_column);
                  let p1=new Raiz.default("ATRIBUTO");
                  p1.agregarHijo(atributo2);
                  $$= p1;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let atch = new Nodo.default("ATR CH", $1);
                  atch.AgregarHijo(new Nodo.default($1, $1));
                  atch.AgregarHijo(new Nodo.default($2, $2));
                  $$=atch;
                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CHAR", "ATRIBUTO.val := ID.lexval + igual.lexval + CHAR.lexval"));
                }
              }
  |error eFin {

                  ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba el valor de un atributo: "+yytext,@1.first_line, @1.first_column,"XML"));

              }
;

TEXTO
  : TEXTO ID                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto = new Nodo.default("Texto", "");
                                  nodoTexto.AgregarHijo($1);
                                  nodoTexto.AgregarHijo(new Nodo.default("ID","$2"));
                                  $$= nodoTexto;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO ID", "TEXTO.val:= TEXTO1.val + ID.lexval"));
                                }

                              }
  | TEXTO integer             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto1 = new Nodo.default("Texto", "");
                                  nodoTexto1.AgregarHijo($1);
                                  nodoTexto1.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto1;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO INTEGER", "TEXTO.val:= TEXTO1.val + INTEGER.lexval"));
                                }
                              }
  | TEXTO double              {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto2 = new Nodo.default("Texto", "");
                                  nodoTexto2.AgregarHijo($1);
                                  nodoTexto2.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto2;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO DOBLE", "TEXTO.val:= TEXTO1.val + DOBLE.lexval"));
                                }
                              }
  | TEXTO CADENA              {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto3 = new Nodo.default("Texto", "");
                                  nodoTexto3.AgregarHijo($1);
                                  nodoTexto3.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto3;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO CADENA", "TEXTO.val:= TEXTO1.val + CADENA.lexval"));
                                }
                              }
  | TEXTO barra               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto4 = new Nodo.default("Texto", "");
                                  nodoTexto4.AgregarHijo($1);
                                  nodoTexto4.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto4;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO BARRA", "TEXTO.val:= TEXTO1.val + BARRA.lexval"));
                                }
                              }
  | TEXTO inter               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto5 = new Nodo.default("Texto", "");
                                  nodoTexto5.AgregarHijo($1);
                                  nodoTexto5.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto5;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO INTER", "TEXTO.val:= TEXTO1.val + INTER.lexval"));
                                }
                              }
  | TEXTO igual               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto6 = new Nodo.default("Texto", "");
                                  nodoTexto6.AgregarHijo($1);
                                  nodoTexto6.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto6;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO IGUAL", "TEXTO.val:= TEXTO1.val + IGUAL.lexval"));
                                }
                              }
  | TEXTO utf                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto7 = new Nodo.default("Texto", "");
                                  nodoTexto7.AgregarHijo($1);
                                  nodoTexto7.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto7;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO UTF", "TEXTO.val:= TEXTO1.val + UTF.lexval"));
                                }
                              }
  | TEXTO version             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto8 = new Nodo.default("Texto", "");
                                  nodoTexto8.AgregarHijo($1);
                                  nodoTexto8.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto8;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO VERSION", "TEXTO.val:= TEXTO1.val + VERSION.lexval"));
                                }
                              }
  | TEXTO encoding            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto9 = new Nodo.default("Texto", "");
                                  nodoTexto9.AgregarHijo($1);
                                  nodoTexto9.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto9;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO ENCODING", "TEXTO.val:= TEXTO1.val + ENCODING.lexval"));
                                }
                              }
  | TEXTO CARACTER            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                 $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto10 = new Nodo.default("Texto", "");
                                  nodoTexto10.AgregarHijo($1);
                                  nodoTexto10.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto10;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO CARACTER", "TEXTO.val:= TEXTO1.val + CARACTER.lexval"));
                                }
                              }
  | TEXTO mayorque            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+">"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto11 = new Nodo.default("Texto", "");
                                  nodoTexto11.AgregarHijo($1);
                                  nodoTexto11.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto11;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO MAYORQUE", "TEXTO.val:= TEXTO1.val + MAYORQUE.lexval"));
                                }
                              }
  | TEXTO menorque            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+"<"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto12 = new Nodo.default("Texto", "");
                                  nodoTexto12.AgregarHijo($1);
                                  nodoTexto12.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto12;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO MENORQUE", "TEXTO.val:= TEXTO1.val + MENORQUE.lexval"));
                                }
                              }
  | TEXTO apostrofe           {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+"'"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto13 = new Nodo.default("Texto", "");
                                  nodoTexto13.AgregarHijo($1);
                                  nodoTexto13.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto13;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO APOSTROFE", "TEXTO.val:= TEXTO1.val + APOSTROFE.lexval"));
                                }
                              }
  | TEXTO comilla             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+"\""
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto14 = new Nodo.default("Texto", "");
                                  nodoTexto14.AgregarHijo($1);
                                  nodoTexto14.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto14;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO COMILLA", "TEXTO.val:= TEXTO1.val + COMILLA.lexval"));
                                }
                              }
  | TEXTO ampersand           {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+"&"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto15 = new Nodo.default("Texto", "");
                                  nodoTexto15.AgregarHijo($1);
                                  nodoTexto15.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto15;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO AMPERSAND", "TEXTO.val:= TEXTO1.val + AMPERSAND.lexval"));
                                }
                              }
  | TEXTO xml                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto16 = new Nodo.default("Texto", "");
                                  nodoTexto16.AgregarHijo($1);
                                  nodoTexto16.AgregarHijo(new Nodo.default($2,$2));
                                  $$= nodoTexto16;
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO XML", "TEXTO.val:= TEXTO1.val + XML.lexval"));
                                }
                              }
  | mayorque                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> MAYORQUE", "TEXTO.val := MAYORQUE.lexval"));
                                }
                              }
  | menorque                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> MENORQUE", "TEXTO.val := MENORQUE.lexval"));
                                }
                              }
  | apostrofe                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                 $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> APOSTROFE", "TEXTO.val := APOSTROFE.lexval"));
                                }
                              }
  | comilla                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> COMILLA", "TEXTO.val := COMILLA.lexval"));
                                }
                              }
  | ampersand                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> AMPERSAND", "TEXTO.val := AMPERSAND.lexval"));
                                }
                              }
  | barra                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> BARRA", "TEXTO.val := BARRA.lexval"));
                                }
                              }
  | inter                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> INTER", "TEXTO.val := INTER.lexval"));
                                }
                              }
  | igual                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> IGUAL", "TEXTO.val := IGUAL.lexval"));
                                }
                              }
  | utf                       {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> UTF", "TEXTO.val := UTF.lexval"));
                                }
                              }
  | version                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> VERSION", "TEXTO.val := VERSION.lexval"));
                                }
                              }
  | encoding                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> ENCODING", "TEXTO.val := ENCODING.lexval"));
                                }
                              }
  | xml                       {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> XML", "TEXTO.val := XML.lexval"));
                                }
                              }
  | ID                        {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                 $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> ID", "TEXTO.val := ID.lexval"));
                                }
                              }
  | integer                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                 $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> INTEGER", "TEXTO.val := INTEGER.lexval"));
                                }
                              }
  | double                    {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> DOBLE", "TEXTO.val := DOBLE.lexval"));
                                }
                              }
  | CADENA                    {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> CADENA", "TEXTO.val := CADENA.lexval"));
                                }
                              }
  | CARACTER                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default($1,$1);
                                }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> CARACTER", "TEXTO.val := CARACTER.lexval"));
                                }
                              }
  | error eInicio             {

                                  ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba un texto válido: "+yytext,@1.first_line, @1.first_column,"XML"));

                  }
;


