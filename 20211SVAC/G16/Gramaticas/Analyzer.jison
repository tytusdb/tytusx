%{
  const Estado=require('../app/Clases/Models/Estado.js')
  const Gram = require('../app/Clases/Models/ListaGramatica.js')
  var NodoGram = require('../app/Clases/Models/NodoGramatica.js')
  var Nodo=require("../app/Clases/Models/Nodo.js")
  var Raiz=require("../app/Clases/Models/Raiz.js")
  var Atributo=require("../app/Clases/Models/Atributo.js")
  var Objeto=require("../app/Clases/Models/Objeto.js")
  var nodoError=require("../app/Clases/Models/Errores.js")
  var ErrorL=require("../app/Clases/Models/ListaError.js")
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
[0-9]+"."[0-9]+                   %{return 'double';%}
[0-9]+                            %{return 'integer';%}
([a-zA-Z]|"_")+("_"|"."|"-"|":"|"á"|"é"|"í"|"ó"|ú|[0-9A-Za-z])*    %{return 'ID';%}
[\"]([0-9]+"."[0-9]+)["\"]        %{return 'vers';%}
[\"]([^\"\n]|(\\\")|(\\\'))*[\"]  %{return 'CADENA';%}
[\'][^\'\n]*[\']                   %{return 'CHAR';%}
[^<>&]+                           %{return 'CARACTER'%}

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
                          $$=$1; return $$;
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
    :eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS
                      {
                          //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          $$ = $12
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          let NodoVersion = new Nodo.default("INIT", "");
                          NodoVersion.AgregarHijo(new Nodo.default("VERSION", $9))
                          NodoVersion.AgregarHijo($9);
                          NodoVersion.AgregarHijo($12);
                          $$ = NodoVersion;
                        }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("INIT -> eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS", "INIT.val := vers.lexval + FORMATO.val + NODOS.val"));
                        }
                      }
  | error EOF         {
                        ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba una línea de código de inicialización en lugar de: "+yytext,@1.first_line, @1.first_column,"XML"));
                      }
;

FORMATO
  : utf               {
                          //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("UTF", $1);
                        }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> utf", "FORMATO.val := utf.lexval"));
                        }
                      }
  | ascii             {
                          //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("ASCII", $1);
                        }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> ascii", "FORMATO.val := ascii.lexval"));
                        }
                      }
  | iso               {
                        //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("ISO", $1);
                        }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> iso", "FORMATO.val := iso.lexval"));
                        } 
                      }
    | error EOF   {
                        ErrorL.Errores.add(new nodoError.Error("Sintáctico","Error sintáctico en la etiqueta: "+yytext,@1.first_line, @1.first_column,"XML"));
                      }
;

NODOS
  : NODO NODOS                      {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=new Raiz.default("NODOS","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2);
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let lnodos = new Nodo.default("NODOS","");
                                        lnodos.AgregarHijo($1);
                                        lnodos.AgregarHijo($2);
                                        $$=lnodos;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODO NODOS", "NODOS.val := NODO.val + NODOS1.val"));
                                      }
                                    }
  |                                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=[]
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("EPSILO", "");
                                      }else{//PARA REPORTE GRAMATICAL

                                      }
                                    }
;

NODO
  : eInicio ID CONT                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        let nombreInit=$2;
                                        let atributos=$3.atributos;
                                        let unica=$3.cont2.unica;
                                        let elementos=$3.cont2.final.nodos;
                                        let texto=$3.cont2.final.texto;
                                        let nombreFin=$3.cont2.final.id;
                                        if(atributos==undefined){atributos=null;}
                                        if(unica==undefined){unica:false;}
                                        if(elementos==undefined){elementos=null;}
                                        if(texto==undefined){texto="";}
                                        if(nombreFin==undefined){nombreFin=""}
                                        let elemento=new Objeto.default(nombreInit,nombreFin,texto,atributos,elementos,unica,@1.first_line,@1.first_column);
                                        let p4=new Raiz.default("ELEMENTO");
                                        p4.agregarHijo(elemento);
                                        $$= p4;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let nonodo = new Nodo.default("NODO","");
                                        nonodo.AgregarHijo(new Nodo.default($2, $2));
                                        nonodo.AgregarHijo($3);
                                        $$=nonodo;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID CONT", "NODO.val := ID.lexval + CONT.val"));
                                      }
                                    }
  | error eFin            {
                        ErrorL.Errores.add(new nodoError.Error("Sintáctico","No se esperaba esta expresión: "+yytext,@1.first_line, @1.first_column,"XML"));
                          }

;

CONT
  : ATRIBUTOS CONT2                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$={atributos:$1,cont2:$2}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let c1 = new Nodo.default("CONT","");
                                        c1.AgregarHijo($1);
                                        c1.AgregarHijo($2);
                                        $$=c1;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("CONT -> ATRIBUTOS CONT2", "CONT.val := ATRIBUTOS.val"));
                                      }
                                    }
  | CONT2                           {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                       $$={cont2:$1}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$=$1; 
                                      }else{//PARA REPORTE GRAMATICAL

                                      }
                                    }
;

CONT2
  : eFin FINAL                      {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$= {final:$2}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$=$2;
                                      }else{//PARA REPORTE GRAMATICAL

                                      }
                                    }
  | barra eFin                      {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$={unica:true}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("CONT2",""); 
                                      }else{//PARA REPORTE GRAMATICAL

                                      }
                                    }
  | error eInicio     {
                        ErrorL.Errores.add(new nodoError.Error("Sintáctico","Se esperaba el fin de la etiqueta: "+yytext,@1.first_line, @1.first_column));
                      }
;

FINAL
  : OPCIONES eInicio barra ID eFin  {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$={nodos:$1,id:$4}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f1 = new Nodo.default("FINAL","");
                                        f1.AgregarHijo($1);
                                        f1.AgregarHijo(new Nodo.default($4, $4));
                                        $$=f1;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> OPCIONES eInicio barra ID eFin", "FINAL.val := OPCIONES.val ID.lexval"));
                                      }
                                    }
  | TEXTO eInicio barra ID eFin     {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$={texto:$1,id:$4}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f2 = new Nodo.default("FINAL","");
                                        f2.AgregarHijo($1)
                                        f2.AgregarHijo(new Nodo.default($4, $4));
                                        $$=f2;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> TEXTO eInicio barra ID eFin", "FINAL.val := TEXTO.val + ID.lexval"));
                                      }
                                    }
  | eInicio barra ID eFin           {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$={id: $3};
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f3 = new Nodo.default("FINAL","");
                                        f3.AgregarHijo(new Nodo.default($3, $3));
                                        $$=f3;
                                      }else{//PARA REPORTE GRAMATICAL
  Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> eInicio barra ID eFin", "FINAL.val := ID.lexval"));
                                      }
                                    }
;

ATRIBUTOS
:
  ATRIBUTO ATRIBUTOS                {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=new Raiz.default("ATRIBUTOS","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2)
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let nodoatr = new Nodo.default("ATRIBUTOS","");
                                        nodoatr.AgregarHijo($2);
                                        nodoatr.AgregarHijo($1);
                                        $$=nodoatr;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTO ATRIBUTOS", "ATRIBUTOS.val := ATRIBUTO.val + ATRIBUTOS1.val"));
                                      }
                                    }
  |ATRIBUTO                         {
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
  : ID igual CADENA                 {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        let atributo=new Atributo.default($1,$3,@1.first_line,@1.first_column);
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
  | ID igual CHAR                   {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        let atributo2=new Atributo.default($1,$3,@1.first_line,@1.first_column)
                                        let p3=new Raiz.default("ATRIBUTO");
                                        p3.agregarHijo(atributo2);
                                        $$= p3;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let atch = new Nodo.default("ATR CH", $1);
                                        atch.AgregarHijo(new Nodo.default($1, $1));
                                        atch.AgregarHijo(new Nodo.default($2, $2));
                                        $$=atch;
                                      }else{//PARA REPORTE GRAMATICAL
Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CHAR", "ATRIBUTO.val := ID.lexval + igual.lexval + CHAR.lexval"));
                                      }
                                    }
;

OPCIONES
  : OPCIONES NODO                   {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=new Raiz.default("NODOS","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2);
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let nodoop = new Nodo.default("OPCIONES","");
                                        nodoop.AgregarHijo($2);
                                        nodoop.AgregarHijo($1);
                                        $$=nodoop;
                                      }else{//PARA REPORTE GRAMATICAL
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OPCIONES -> NODO OPCIONES", "OPCIONES.val := NODO.val + OPCIONES.val"));
                                      }
                                    }
  | NODO                            {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=$1
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$=$1;
                                      }else{//PARA REPORTE GRAMATICAL
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OPCIONES -> NODO", "OPCIONES.val := NODO.val"));
                                      }
                                    }
;

TEXTO
  : PALABRA TEXTO                  {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$=$1+" " +$2
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let Ltexto = new Nodo.default("TEXTO","");
                                        Ltexto.AgregarHijo(new Nodo.default($1,$1));
                                        Ltexto.AgregarHijo($2);
                                        $$=Ltexto;
                                      }else{//PARA REPORTE GRAMATICAL
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> PALABRA TEXTO", "TEXTO.val:= PALABRA.lexval + TEXTO1.val"));
                                      }
                                   }
  | PALABRA                        {
                                    //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$= new Nodo.default($1,$1);
                                      }else{//PARA REPORTE GRAMATICAL
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> PALABRA", "TEXTO.val:= PALABRA.lexval"));
                                      }
                                  }
;

PALABRA
:
    ID                              { $$ = $1; }
  | integer                         { $$ = $1; }
  | double                          { $$ = $1; }
  | CADENA                          { $$ = $1; }
  | barra                           { $$ = $1; }
  | inter                           { $$ = $1; }
  | igual                           { $$ = $1; }
  | utf                             { $$ = $1; }
  | version                         { $$ = $1; }
  | encoding                        { $$ = $1; }
  | xml                             { $$ = $1; }
  | CARACTER                        { $$ = $1; }
  | mayorque                        { $$ = $1; }
  | menorque                        { $$ = $1; }
  | apostrofe                       { $$ = $1; }
  | comilla                         { $$ = $1; }
  | ampersand                       { $$ = $1; }
  | error eInicio                   {
                                      ErrorL.Errores.add(new nodoError.Error("Sintáctico","Caracter no permitido para texto de etiqueta: "+yytext,@1.first_line, @1.first_column,"XML"));
                                    }
;
