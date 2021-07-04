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
  texto=""
  encoding="";
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
[0-9]+"."[0-9]+                                                                   %{return 'double';%}
[0-9]+                                                                                    %{return 'integer';%}
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
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("S -> INIT EOF", "S.val := INIT.val"));
                          $$=$1;
                          return {list:$$,encoding:encoding};
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          let NodoS = new Nodo.default("S", "");
                          NodoS.AgregarHijo($1);
                          $$=NodoS;
                          return {list:$$,encoding:encoding};
                        }
                    }
;
INIT
    :VERSION  {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("INIT -> VERSION", "INIT.val := VERSION.val"));
                  $$=$1
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$=new Nodo.default("INIT", "INIT -> VERSION");
                  $$.AgregarHijo($1);
                }
              }

;
VERSION
  :eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("VERSION -> eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP", "VERSION.val := CADENA.lexval + FORMATO.lexval + OP.val"));
                  $$=new Raiz.default("INICIO");
                  let a=new Raiz.default("VERSION");
                  a.agregarHijo($4);
                  $$.agregarHijo(a);
                  $$.agregarHijo($9);
                  $$.agregarHijo($12);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let NodoVersion = new Nodo.default("VERSION", "VERSION -> eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP");
                  NodoVersion.AgregarHijo(new Nodo.default($1,""));
                  NodoVersion.AgregarHijo(new Nodo.default($2,""));
                  NodoVersion.AgregarHijo(new Nodo.default($3,""));
                  NodoVersion.AgregarHijo(new Nodo.default($4,""));
                  NodoVersion.AgregarHijo(new Nodo.default($5,""));
                  NodoVersion.AgregarHijo(new Nodo.default("Version:", $6));
                  NodoVersion.AgregarHijo(new Nodo.default($7,""));
                  NodoVersion.AgregarHijo(new Nodo.default($8,""));
                  NodoVersion.AgregarHijo($9);
                  NodoVersion.AgregarHijo(new Nodo.default($10,""));
                  NodoVersion.AgregarHijo(new Nodo.default($11,""));
                  NodoVersion.AgregarHijo($12);
                  $$ = NodoVersion;
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
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> utf", "FORMATO.val := utf.lexval"));
                  $$=new Raiz.default("FORMATO")
                  $$.agregarHijo($1);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$ = new Nodo.default("FORMATO", "FORMATO -> utf");
                  $$.AgregarHijo(new Nodo.default($1,""));
                }
                encoding="utf"
    }
  | ascii       {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> ascii", "FORMATO.val := ascii.lexval"));
                    $$=new Raiz.default("FORMATO")
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("FORMATO", "FORMATO -> ascii");
                    $$.AgregarHijo(new Nodo.default($1,""));
                  }
                  encoding="ascii"
                }
  | iso         {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> iso", "FORMATO.val := iso.lexval"));
                    $$=new Raiz.default("FORMATO")
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("FORMATO", "FORMATO -> iso");
                    $$.AgregarHijo(new Nodo.default($1,""));
                  }
                  encoding="iso"
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
                    Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OP -> NODOS", "OP.val := NODOS.val"));
                    $$=new Raiz.default("L_ELEMENTOS");
                    $$.agregarHijo($1);
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$=new Nodo.default("OP", "OP -> NODOS");
                    $$.AgregarHijo($1)
                  }
                }
  |             {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    $$=[]
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST

                  }
                }
;

NODOS
  : NODOS NODO {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODOS NODO", "NODOS.val := NODOS1.val + NODO.val"));
                    let p12=new Raiz.default("L_ELEMENTOS");
                    p12.agregarHijo($1);
                    p12.agregarHijo($2);
                    $$=p12;
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    let lnodo = new Nodo.default("NODOS","NODOS -> NODOS NODO");
                    lnodo.AgregarHijo($1);
                    lnodo.AgregarHijo($2);
                    $$=lnodo;
                  }
                }
  | NODO        {
                    //ESTADO 1 ES PARA TS
                  if(Estado.Estado.cambio==1){
                    Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODO", "NODOS.val := NODO.val"));
                    $$= new Raiz.default("ELEMENTO");
                    $$.agregarHijo($1)
                  }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                    $$ = new Nodo.default("NODOS", "NODOS -> NODO");
                    $$.AgregarHijo($1)
                  }
                }
;

NODO
  : eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + NODOS.val + ID2.lexval"));
                  let elemento=new Objeto.default($2,$8,"",$3,$5,false,@1.first_line, @1.first_column);
                  let p4=new Raiz.default("ELEMENTO");
                  p4.agregarHijo(elemento);
                  $$= p4;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n1 = new Nodo.default("NODO","eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin");
                  n1.AgregarHijo(new Nodo.default($1,""));
                  n1.AgregarHijo(new Nodo.default($2,""));
                  n1.AgregarHijo($3);
                  n1.AgregarHijo(new Nodo.default($4,""));
                  n1.AgregarHijo($5);
                  n1.AgregarHijo(new Nodo.default($6,""));
                  n1.AgregarHijo(new Nodo.default($7,""));
                  n1.AgregarHijo(new Nodo.default($8,""));
                  n1.AgregarHijo(new Nodo.default($9,""));
                  $$=n1;
                }
  }
  | eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + TEXTO.val + ID2.lexval"));
                  let elemento1=new Objeto.default($2,$8,$5,$3,null,false,@1.first_line, @1.first_column) ;
                  let p5=new Raiz.default("ELEMENTO");
                  p5.agregarHijo(elemento1);
                  $$= p5;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n2 = new Nodo.default("NODO","NODO -> eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin");
                  n2.AgregarHijo(new Nodo.default($1,""));
                  n2.AgregarHijo(new Nodo.default($2,""));
                  n2.AgregarHijo($3);
                  n2.AgregarHijo(new Nodo.default($4,""));
                  n2.AgregarHijo($5);
                  n2.AgregarHijo(new Nodo.default($6,""));
                  n2.AgregarHijo(new Nodo.default($7,""));
                  n2.AgregarHijo(new Nodo.default($8,""));
                  n2.AgregarHijo(new Nodo.default($9,""));
                  $$=n2;
                }
              }
  | eInicio ID ATRIBUTOS eFin eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS eFin eInicio barra ID eFin", "NODO.val := ID1.lexval + ATRIBUTOS.val + ID2.lexval"));
                  let elemento2=new Objeto.default($2,$7,"",$3,null,false,@1.first_line, @1.first_column)
                  let p6=new Raiz.default("ELEMENTO");
                  p6.agregarHijo(elemento2);
                  $$= p6;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n3 = new Nodo.default("NODO","NODO -> eInicio ID ATRIBUTOS eFin eInicio barra ID eFin");
                  n3.AgregarHijo(new Nodo.default($1,""));
                  n3.AgregarHijo(new Nodo.default($2,""));
                  n3.AgregarHijo($3);
                  n3.AgregarHijo(new Nodo.default($4,""));
                  n3.AgregarHijo(new Nodo.default($5,""));
                  n3.AgregarHijo(new Nodo.default($6,""));
                  n3.AgregarHijo(new Nodo.default($7,""));
                  n3.AgregarHijo(new Nodo.default($8,""));
                  $$=n3;
                }
              }
  | eInicio ID ATRIBUTOS barra eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID ATRIBUTOS barra eFin", "NODO.val := ID.lexval + ATRIBUTOS.val"));
                  let elemento3=new Objeto.default($2,"",texto,$3,null,true,@1.first_line, @1.first_column);
                  let p7=new Raiz.default("ELEMENTO");
                  p7.agregarHijo(elemento3);
                  $$= p7;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n4 = new Nodo.default("NODO","NODO -> eInicio ID ATRIBUTOS barra eFin");
                  n4.AgregarHijo(new Nodo.default($1,""));
                  n4.AgregarHijo(new Nodo.default($2,""));
                  n4.AgregarHijo($3);
                  n4.AgregarHijo(new Nodo.default($4,""));
                  n4.AgregarHijo(new Nodo.default($5,""));
                  $$=n4;
                }
              }
  | eInicio ID eFin NODOS eInicio barra ID eFin
            {
              //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID eFin NODOS eInicio barra ID eFin", "NODO.val := ID1.lexval + NODOS.val + ID2.lexval"));
                  let elemento4=new Objeto.default($2,$7,"",null,$4,false,@1.first_line, @1.first_column);
                  let p8=new Raiz.default("ELEMENTO");
                  p8.agregarHijo(elemento4)
                  $$= p8;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n5 = new Nodo.default("NODO","NODO -> eInicio ID eFin NODOS eInicio barra ID eFin");
                  n5.AgregarHijo(new Nodo.default($1,""));
                  n5.AgregarHijo(new Nodo.default($2,""));
                  n5.AgregarHijo(new Nodo.default($3,""));
                  n5.AgregarHijo($4);
                  n5.AgregarHijo(new Nodo.default($5,""));
                  n5.AgregarHijo(new Nodo.default($6,""));
                  n5.AgregarHijo(new Nodo.default($7,""));
                  n5.AgregarHijo(new Nodo.default($8,""));
                  $$=n5;
                }
            }
  | eInicio ID eFin TEXTO eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID eFin TEXTO eInicio barra ID eFin", "NODO.val := ID1.lexval + TEXTO.val + ID2.lexval"));
                  let elemento5=new Objeto.default($2,$7,$4,null,null,false,@1.first_line, @1.first_column) ;
                  let p9=new Raiz.default("ELEMENTO");
                  p9.agregarHijo(elemento5);
                  $$= p9;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n6 = new Nodo.default("NODO","NODO -> eInicio ID eFin TEXTO eInicio barra ID eFin");
                  n6.AgregarHijo(new Nodo.default($1,""));
                  n6.AgregarHijo(new Nodo.default($2,""));
                  n6.AgregarHijo(new Nodo.default($3,""));
                  n6.AgregarHijo($4);
                  n6.AgregarHijo(new Nodo.default($5,""));
                  n6.AgregarHijo(new Nodo.default($6,""));
                  n6.AgregarHijo(new Nodo.default($7,""));
                  n6.AgregarHijo(new Nodo.default($8,""));
                  $$=n6;
                }
              }
  | eInicio ID  eFin eInicio barra ID eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID  eFin eInicio barra ID eFin", "NODO.val := ID1.lexval + ID2.lexval"));
                  let elemento6=new Objeto.default($2,$6,texto,null,null,false,@1.first_line, @1.first_column);
                  let p10=new Raiz.default("ELEMENTO");
                  p10.agregarHijo(elemento6);
                  $$= p10;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n7 = new Nodo.default("NODO","NODO -> eInicio ID  eFin eInicio barra ID eFin");
                  n7.AgregarHijo(new Nodo.default($1, ""));
                  n7.AgregarHijo(new Nodo.default($2, ""));
                  n7.AgregarHijo(new Nodo.default($3, ""));
                  n7.AgregarHijo(new Nodo.default($4, ""));
                  n7.AgregarHijo(new Nodo.default($5, ""));
                  n7.AgregarHijo(new Nodo.default($6, ""));
                  n7.AgregarHijo(new Nodo.default($7, ""));
                  $$=n7;
                }
              }
  | eInicio ID barra eFin
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID barra eFin", "NODO.val := ID.lexval"));
                  let elemento7=new Objeto.default($2,"",texto,null,null,true,@1.first_line, @1.first_column);
                  let p11=new Raiz.default("ELEMENTO");
                  p11.agregarHijo(elemento7);
                  $$= p11;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let n8 = new Nodo.default("NODO","NODO -> eInicio ID barra eFin");
                  n8.AgregarHijo(new Nodo.default($1,""));
                  n8.AgregarHijo(new Nodo.default($2,""));
                  n8.AgregarHijo(new Nodo.default($3,""));
                  n8.AgregarHijo(new Nodo.default($4,""));
                  $$=n8;
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
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTOS ATRIBUTO ", "ATRIBUTOS.val := ATRIBUTOS1.val + ATRIBUTO.val"));
                  let p3=new Raiz.default("L_ATRIBUTOS");
                  p3.agregarHijo($1);
                  p3.agregarHijo($2);
                  $$=p3;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let nodoatr = new Nodo.default("ATRIBUTOS","ATRIBUTOS -> ATRIBUTOS ATRIBUTO ");
                  nodoatr.AgregarHijo($1);
                  nodoatr.AgregarHijo($2);
                  $$=nodoatr;
                }else{//PARA REPORTE GRAMATICAL

                }
              }
  | ATRIBUTO
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTO", "ATRIBUTOS.val := ATRIBUTOS.val"));
                  $$= new Raiz.default("ATRIBUTO");
                  $$.agregarHijo($1);
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  $$=new Nodo.default("ATRIBUTOS", "ATRIBUTOS -> ATRIBUTO");
                  $$.AgregarHijo($1);
                }
              }
;

ATRIBUTO
  : ID igual CADENA
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CADENA", "ATRIBUTO.val := ID.lexval + igual.lexval + CADENA.lexval"));
                  let atributo=new Atributo.default($1,$3,@1.first_line, @1.first_column);
                  let p2=new Raiz.default("ATRIBUTO");
                  p2.agregarHijo(atributo);
                  $$= p2;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let atid = new Nodo.default("ATRIBUTO", "ATRIBUTO -> ID IGUAL CADENA");
                  atid.AgregarHijo(new Nodo.default($1, ""));
                  atid.AgregarHijo(new Nodo.default($2, ""));
                  atid.AgregarHijo(new Nodo. default($3, ""));
                  $$=atid;
                }
              }
  | ID igual CHAR
              {
                //ESTADO 1 ES PARA TS
                if(Estado.Estado.cambio==1){
                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CHAR", "ATRIBUTO.val := ID.lexval + igual.lexval + CHAR.lexval"));
                  let atributo2=new Atributo.default($1,$3,@1.first_line, @1.first_column);
                  let p1=new Raiz.default("ATRIBUTO");
                  p1.agregarHijo(atributo2);
                  $$= p1;
                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                  let atch = new Nodo.default("ATRIBUTO", "ATRIBUTO -> ID IGUAL CHAR");
                  atch.AgregarHijo(new Nodo.default($1, ""));
                  atch.AgregarHijo(new Nodo.default($2, ""));
                  atch.AgregarHijo(new Nodo. default($3, ""));
                  $$=atch;
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
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO ID", "TEXTO.val:= TEXTO1.val + ID.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto = new Nodo.default("TEXTO", "TEXTO -> TEXTO ID");
                                  nodoTexto.AgregarHijo($1);
                                  nodoTexto.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto;
                                }

                              }
  | TEXTO integer             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO INTEGER", "TEXTO.val:= TEXTO1.val + INTEGER.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto1 = new Nodo.default("TEXTO", "TEXTO -> TEXTO INTEGER");
                                  nodoTexto1.AgregarHijo($1);
                                  nodoTexto1.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto1;
                                }
                              }
  | TEXTO double              {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO DOBLE", "TEXTO.val:= TEXTO1.val + DOBLE.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto2 = new Nodo.default("TEXTO", "TEXTO -> TEXTO DOBLE");
                                  nodoTexto2.AgregarHijo($1);
                                  nodoTexto2.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto2;
                                }
                              }
  | TEXTO CADENA              {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO CADENA", "TEXTO.val:= TEXTO1.val + CADENA.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto3 = new Nodo.default("TEXTO", "TEXTO -> TEXTO CADENA");
                                  nodoTexto3.AgregarHijo($1);
                                  nodoTexto3.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto3;
                                }
                              }
  | TEXTO barra               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO BARRA", "TEXTO.val:= TEXTO1.val + BARRA.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto4 = new Nodo.default("TEXTO", "TEXTO -> TEXTO BARRA");
                                  nodoTexto4.AgregarHijo($1);
                                  nodoTexto4.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto4;
                                }else{//PARA REPORTE GRAMATICAL

                                }
                              }
  | TEXTO inter               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO INTER", "TEXTO.val:= TEXTO1.val + INTER.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto5 = new Nodo.default("TEXTO", "TEXTO -> TEXTO INTER");
                                  nodoTexto5.AgregarHijo($1);
                                  nodoTexto5.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto5;
                                }else{//PARA REPORTE GRAMATICAL

                                }
                              }
  | TEXTO igual               {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO IGUAL", "TEXTO.val:= TEXTO1.val + IGUAL.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto6 = new Nodo.default("TEXTO", "TEXTO -> TEXTO IGUAL");
                                  nodoTexto6.AgregarHijo($1);
                                  nodoTexto6.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto6;
                                }
                              }
  | TEXTO utf                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO UTF", "TEXTO.val:= TEXTO1.val + UTF.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto7 = new Nodo.default("Texto", "TEXTO -> TEXTO UTF");
                                  nodoTexto7.AgregarHijo($1);
                                  nodoTexto7.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto7;
                                }
                              }
  | TEXTO version             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO VERSION", "TEXTO.val:= TEXTO1.val + VERSION.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto8 = new Nodo.default("TEXTO", "TEXTO -> TEXTO VERSION");
                                  nodoTexto8.AgregarHijo($1);
                                  nodoTexto8.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto8;
                                }
                              }
  | TEXTO encoding            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO ENCODING", "TEXTO.val:= TEXTO1.val + ENCODING.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto9 = new Nodo.default("TEXTO", "TEXTO -> TEXTO ENCODING");
                                  nodoTexto9.AgregarHijo($1);
                                  nodoTexto9.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto9;
                                }
                              }
  | TEXTO CARACTER            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO CARACTER", "TEXTO.val:= TEXTO1.val + CARACTER.lexval"));
                                 $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto10 = new Nodo.default("TEXTO", "TEXTO -> TEXTO CARACTER");
                                  nodoTexto10.AgregarHijo($1);
                                  nodoTexto10.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto10;
                                }
                              }
  | TEXTO mayorque            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO MAYORQUE", "TEXTO.val:= TEXTO1.val + MAYORQUE.lexval"));
                                  $$=$1+" "+">"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto11 = new Nodo.default("TEXTO", "TEXTO -> TEXTO MAYORQUE");
                                  nodoTexto11.AgregarHijo($1);
                                  nodoTexto11.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto11;
                                }
                              }
  | TEXTO menorque            {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO MENORQUE", "TEXTO.val:= TEXTO1.val + MENORQUE.lexval"));
                                  $$=$1+" "+"<"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto12 = new Nodo.default("TEXTO", "TEXTO -> TEXTO MENORQUE");
                                  nodoTexto12.AgregarHijo($1);
                                  nodoTexto12.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto12;
                                }
                              }
  | TEXTO apostrofe           {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO APOSTROFE", "TEXTO.val:= TEXTO1.val + APOSTROFE.lexval"));
                                  $$=$1+" "+"'"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto13 = new Nodo.default("TEXTO", "TEXTO -> TEXTO APOSTROFE");
                                  nodoTexto13.AgregarHijo($1);
                                  nodoTexto13.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto13;
                                }
                              }
  | TEXTO comilla             {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO COMILLA", "TEXTO.val:= TEXTO1.val + COMILLA.lexval"));
                                  $$=$1+" "+"\""
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto14 = new Nodo.default("TEXTO", "TEXTO -> TEXTO COMILLA");
                                  nodoTexto14.AgregarHijo($1);
                                  nodoTexto14.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto14;
                                }
                              }
  | TEXTO ampersand           {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO AMPERSAND", "TEXTO.val:= TEXTO1.val + AMPERSAND.lexval"));
                                  $$=$1+" "+"&"
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto15 = new Nodo.default("TEXTO", "TEXTO -> TEXTO AMPERSAND");
                                  nodoTexto15.AgregarHijo($1);
                                  nodoTexto15.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto15;
                                }
                              }
  | TEXTO xml                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> TEXTO XML", "TEXTO.val:= TEXTO1.val + XML.lexval"));
                                  $$=$1+" "+$2
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  let nodoTexto16 = new Nodo.default("TEXTO", "TEXTO -> TEXTO XML");
                                  nodoTexto16.AgregarHijo($1);
                                  nodoTexto16.AgregarHijo(new Nodo.default($2,""));
                                  $$= nodoTexto16;
                                }
                              }
  | mayorque                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> MAYORQUE", "TEXTO.val := MAYORQUE.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> MAYORQUE");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | menorque                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> MENORQUE", "TEXTO.val := MENORQUE.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> MENORQUE");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | apostrofe                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> APOSTROFE", "TEXTO.val := APOSTROFE.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> APOSTROFE");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | comilla                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> COMILLA", "TEXTO.val := COMILLA.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> COMILLA");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | ampersand                 {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> AMPERSAND", "TEXTO.val := AMPERSAND.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> AMPERSAND");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | barra                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> BARRA", "TEXTO.val := BARRA.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> BARRA");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | inter                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> INTER", "TEXTO.val := INTER.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> INTER");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | igual                     {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> IGUAL", "TEXTO.val := IGUAL.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> IGUAL");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | utf                       {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> UTF", "TEXTO.val := UTF.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> UTF");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | version                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> VERSION", "TEXTO.val := VERSION.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> VERSION");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | encoding                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> ENCODING", "TEXTO.val := ENCODING.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> ENCODING");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | xml                       {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> XML", "TEXTO.val := XML.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> XML");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | ID                        {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> ID", "TEXTO.val := ID.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> ID");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | integer                   {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> INTEGER", "TEXTO.val := INTEGER.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> INTEGER");
                                  $$.AgregarHijo(new Nodo.default($1, ""));
                                }
                              }
  | double                    {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> DOBLE", "TEXTO.val := DOBLE.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> DOBLE");
                                  $$.AgregarHijo(new Nodo.default($1, ""))
                                }
                              }
  | CADENA                    {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> CADENA", "TEXTO.val := CADENA.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> CADENA");
                                  $$.AgregarHijo(new Nodo.default($1, ""))
                                }
                              }
  | CARACTER                  {
                                //ESTADO 1 ES PARA TS
                                if(Estado.Estado.cambio==1){
                                  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> CARACTER", "TEXTO.val := CARACTER.lexval"));
                                  $$=$1
                                }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                  $$=new Nodo.default("TEXTO","TEXTO -> CARACTER");
                                  $$.AgregarHijo(new Nodo.default($1, ""))
                                }
                              }
  | error eInicio             {

                                  ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba un texto válido: "+yytext,@1.first_line, @1.first_column,"XML"));

                  }
;


