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
  encoding="";
  texto=""
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
([a-zA-Z]|"_")+("_"|"."|"-"|":"|"á"|"é"|"í"|"ó"|ú|[0-9A-Za-z]|ñ|Ñ)*    %{return 'ID';%}
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
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("S -> INIT EOF", "S.val := INIT.val"));
                          $$=$1; return {list:$$,encoding:encoding};
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          let NodoS = new Nodo.default("S", "");
                          NodoS.AgregarHijo($1);
                          $$=NodoS;
                          return {list:$$,encoding:encoding};
                        }
                    
                    }
;
INIT
    :eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS
                      {
                          //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("INIT -> eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS", "INIT.val := vers.lexval + FORMATO.val + NODOS.val"));
                          $$ = $12
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          let NodoVersion = new Nodo.default("INIT", "INIT -> eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS");
                          NodoVersion.AgregarHijo(new Nodo.default("VERSION", ""))
                          NodoVersion.AgregarHijo(new Nodo.default($1,""));
                          NodoVersion.AgregarHijo(new Nodo.default($2,""));
                          NodoVersion.AgregarHijo(new Nodo.default($3,""));
                          NodoVersion.AgregarHijo(new Nodo.default($4,""));
                          NodoVersion.AgregarHijo(new Nodo.default($5,""));
                          NodoVersion.AgregarHijo(new Nodo.default($6,""));
                          NodoVersion.AgregarHijo(new Nodo.default($7,""));
                          NodoVersion.AgregarHijo(new Nodo.default($8,""));
                          NodoVersion.AgregarHijo($9);
                          NodoVersion.AgregarHijo(new Nodo.default($10,""));
                          NodoVersion.AgregarHijo(new Nodo.default($11,""));
                          NodoVersion.AgregarHijo($12);
                          $$ = NodoVersion;
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
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> utf", "FORMATO.val := utf.lexval"));
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("FORMATO", "FORMATO -> utf");
                          $$.AgregarHijo(new Nodo.default($1, ""));
                        }
                        encoding="utf";
                      }
  | ascii             {
                          //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> ascii", "FORMATO.val := ascii.lexval"));
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("FORMATO", "FORMATO -> ascii");
                          $$.AgregarHijo(new Nodo.default($1, ""));
                        }
                        encoding="ascii"
                      }
  | iso               {
                        //ESTADO 1 ES PARA TS
                        if(Estado.Estado.cambio==1){
                          Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FORMATO -> iso", "FORMATO.val := iso.lexval"));
                          $$=$1
                        }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                          $$ = new Nodo.default("FORMATO", "FORMATO -> iso");
                          $$.AgregarHijo(new Nodo.default($1, ""));
                        }
                        encoding="iso"
                      }

    | error EOF       {
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
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> NODO NODOS", "NODOS.val := NODO.val + NODOS1.val"));
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let lnodos = new Nodo.default("NODOS","NODOS -> NODO NODOS");
                                        lnodos.AgregarHijo($1);
                                        lnodos.AgregarHijo($2);
                                        $$=lnodos;
                                      }
                                    }
  |                                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODOS -> EPSILO", "-"));
                                        $$=[]
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("EPSILO", "NODOS -> EPSILO");
                                      }
                                    }
;

NODO
  : eInicio ID CONT                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("NODO -> eInicio ID CONT", "NODO.val := ID.lexval + CONT.val"));
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
                                        let nonodo = new Nodo.default("NODO","NODO -> eInicio ID CONT");
                                        nonodo.AgregarHijo(new Nodo.default($1, ""));
                                        nonodo.AgregarHijo(new Nodo.default($2, ""));
                                        nonodo.AgregarHijo($3);
                                        $$=nonodo;
                                      }
                                    }
  | error eFin                      {
                                      ErrorL.Errores.add(new nodoError.Error("Sintáctico","No se esperaba esta expresión: "+yytext,@1.first_line, @1.first_column,"XML"));
                                    }

;

CONT
  : ATRIBUTOS CONT2                 {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("CONT -> ATRIBUTOS CONT2", "CONT.val := ATRIBUTOS.val"));
                                        $$={atributos:$1,cont2:$2}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let c1 = new Nodo.default("CONT","CONT -> ATRIBUTOS CONT2");
                                        c1.AgregarHijo($1);
                                        c1.AgregarHijo($2);
                                        $$=c1;
                                      }
                                    }
  | CONT2                           {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("CONT -> CONT2", "CONT.val := CONT2.val"));
                                        $$={cont2:$1}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$=new Nodo.default("CONT2", "CONT -> CONT2")
                                        $$.AgregarHijo($1);
                                      }
                                    }
;

CONT2
  : eFin FINAL                      {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("CONT2 -> eFin FINAL", "CONT2.val := FINAL.val"));
                                        $$= {final:$2}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let C1 = new Nodo.default("CONT2","CONT2 -> eFin FINAL");
                                        C1.AgregarHijo(new Nodo.default($1, ""));
                                        C1.AgregarHijo($2);
                                        $$ = C1;
                                      }
                                    }
  | barra eFin                      {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("CONT2 -> barra eFin", "CONT2.val := -"));
                                        $$={unica:true}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let C2 = new Nodo.default("CONT2","CONT2 -> barra eFin");
                                        C2.AgregarHijo(new Nodo.default($1, ""));
                                        C2.AgregarHijo(new Nodo.default($2, ""));
                                        $$=C2;
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
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> OPCIONES eInicio barra ID eFin", "FINAL.val := OPCIONES.val ID.lexval"));
                                        $$={nodos:$1,id:$4}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f1 = new Nodo.default("FINAL","FINAL -> OPCIONES eInicio barra ID eFin");
                                        f1.AgregarHijo($1);
                                        f1.AgregarHijo(new Nodo.default($2, ""));
                                        f1.AgregarHijo(new Nodo.default($3, ""));
                                        f1.AgregarHijo(new Nodo.default($4, ""));
                                        f1.AgregarHijo(new Nodo.default($5, ""));
                                        $$=f1;
                                      }
                                    }
  | TEXTO eInicio barra ID eFin     {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> TEXTO eInicio barra ID eFin", "FINAL.val := TEXTO.val + ID.lexval"));
                                        $$={texto:$1,id:$4}
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f2 = new Nodo.default("FINAL","FINAL -> TEXTO eInicio barra ID eFin");
                                        f2.AgregarHijo($1);
                                        f2.AgregarHijo(new Nodo.default($2, ""));
                                        f2.AgregarHijo(new Nodo.default($3, ""));
                                        f2.AgregarHijo(new Nodo.default($4, ""));
                                        f2.AgregarHijo(new Nodo.default($5, ""));
                                        $$=f2;
                                      }
                                    }
  | eInicio barra ID eFin           {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("FINAL -> eInicio barra ID eFin", "FINAL.val := ID.lexval"));
                                        $$={id: $3};
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let f3 = new Nodo.default("FINAL","FINAL -> eInicio barra ID eFin");
                                        f3.AgregarHijo(new Nodo.default($1, ""));
                                        f3.AgregarHijo(new Nodo.default($2, ""));
                                        f3.AgregarHijo(new Nodo.default($3, ""));
                                        f3.AgregarHijo(new Nodo.default($4, ""));
                                        $$=f3;
                                      }
                                    }
;

ATRIBUTOS
:
  ATRIBUTO ATRIBUTOS                {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTOS -> ATRIBUTO ATRIBUTOS", "ATRIBUTOS.val := ATRIBUTO.val + ATRIBUTOS1.val"));
                                        $$=new Raiz.default("ATRIBUTOS","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2)
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let nodoatr = new Nodo.default("ATRIBUTOS","ATRIBUTOS -> ATRIBUTO ATRIBUTOS");
                                        nodoatr.AgregarHijo($2);
                                        nodoatr.AgregarHijo($1);
                                        $$=nodoatr;
                                      }
                                    }
  |ATRIBUTO                         {
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
  : ID igual CADENA                 {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CADENA", "ATRIBUTO.val := ID.lexval + igual.lexval + CADENA.lexval"));
                                        let atributo=new Atributo.default($1,$3,@1.first_line,@1.first_column);
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
  | ID igual CHAR                   {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("ATRIBUTO -> ID IGUAL CHAR", "ATRIBUTO.val := ID.lexval + igual.lexval + CHAR.lexval"));
                                        let atributo2=new Atributo.default($1,$3,@1.first_line,@1.first_column)
                                        let p3=new Raiz.default("ATRIBUTO");
                                        p3.agregarHijo(atributo2);
                                        $$= p3;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let atch = new Nodo.default("ATRIBUTO", "ATRIBUTO -> ID IGUAL CHAR");
                                        atch.AgregarHijo(new Nodo.default($1, ""));
                                        atch.AgregarHijo(new Nodo.default($2, ""));
                                        atch.AgregarHijo(new Nodo. default($3, ""));
                                        $$=atch;
                                      }
                                    }
;

OPCIONES
  : OPCIONES NODO                   {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OPCIONES -> NODO OPCIONES", "OPCIONES.val := NODO.val + OPCIONES.val"));
                                        $$=new Raiz.default("NODOS","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2);
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let nodoop = new Nodo.default("OPCIONES","OPCIONES -> NODO OPCIONES");
                                        nodoop.AgregarHijo($2);
                                        nodoop.AgregarHijo($1);
                                        $$=nodoop;
                                      }
                                    }
  | NODO                            {
                                      //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("OPCIONES -> NODO", "OPCIONES.val := NODO.val"));
                                        $$=$1
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$=new Nodo.default("OPCIONES", "OPCIONES -> NODO");
                                        $$.AgregarHijo($1)
                                      }
                                    }
;

TEXTO
  : PALABRA TEXTO                  {
                                     //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> PALABRA TEXTOTEXTO -> PALABRA TEXTO", "TEXTO.val:= PALABRA.lexval + TEXTO1.val"));
                                        $$=$1+" " +$2
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let Ltexto = new Nodo.default("TEXTO","TEXTO -> PALABRA TEXTO");
                                        Ltexto.AgregarHijo($1);
                                        Ltexto.AgregarHijo($2);
                                        $$=Ltexto;
                                      }
                                   }
  | PALABRA                        {
                                    //ESTADO 1 ES PARA TS
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("TEXTO -> PALABRA", "TEXTO.val:= PALABRA.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        let Ltexto2 = new Nodo.default("TEXTO","TEXTO -> PALABRA");
                                        Ltexto2.AgregarHijo($1);
                                        $$= Ltexto2;
                                      }
                                  }
;

PALABRA
:
    ID                              { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> ID", "PALABRA.val:= ID.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> ID");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | integer                         { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> integer", "PALABRA.val:= integer.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> integer");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | double                          { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> double", "PALABRA.val:= double.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> double");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | CADENA                          { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> CADENA", "PALABRA.val:= CADENA.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> CADENA");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | barra                           { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> barra", "PALABRA.val:= barra.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> barra");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | inter                           { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> inter", "PALABRA.val:= inter.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> inter");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | igual                           { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> igual", "PALABRA.val:= igual.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> igual");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | utf                             { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> utf", "PALABRA.val:= utf.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> utf");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | version                         { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> version", "PALABRA.val:= version.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> version");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | encoding                        { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> encoding", "PALABRA.val:= encodign.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> encoding");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | xml                             { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> xml", "PALABRA.val:= xml.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> xml");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | CARACTER                        { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> caracter", "PALABRA.val:= caracter.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> caracter");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | mayorque                        { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> mayorque", "PALABRA.val:= mayorque.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> mayorque");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | menorque                        { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> menorque", "PALABRA.val:= menorque.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> menorque");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | apostrofe                       { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> apostrofe", "PALABRA.val:= apostrofe.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> apostrofe");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | comilla                         { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> comilla", "PALABRA.val:= comilla.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> comilla");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | ampersand                       { 
                                      if(Estado.Estado.cambio==1){
                                        Gram.ReporteGramatical.add( new NodoGram.NodoGramatica("PALABRA -> ampersand", "PALABRA.val:= ampersand.lexval"));
                                        $$= $1;
                                      }else if(Estado.Estado.cambio==2){//ESTADO DOS PARA CST
                                        $$ = new Nodo.default("PALABRA", "PALABRA -> ampersand");
                                        $$.AgregarHijo(new Nodo.default($1, ""))
                                      }
                                    }
  | error eInicio                   {
                                      ErrorL.Errores.add(new nodoError.Error("Sintáctico","Caracter no permitido para texto de etiqueta: "+yytext,@1.first_line, @1.first_column,"XML"));
                                    }
;
