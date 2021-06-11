%{
	var helpers = require('./helpers')
	var atributosRaiz = []
	function objetoCorrecto (inicio, fin,linea,columna){
    if(!inicio || !fin)
    {
      return false
    }
		inicio = inicio.replace('<','')
		fin = fin.replace('</','')
		if(inicio === fin)
    {
      return true
    }
    else
    {
      ListaErrores.push({Error:'Este es un error Semantico: Etiquetas no coinciden',tipo:"Semantico", linea: linea , columna:columna})
      return false
    }
	}
  // Codificación global
  var tipoCodificacion = "utf8"
  // Datos { id:contador,label:'Nombre' }
  var pilaHijos = []
  var GrahpvizNodo = ""
  var pilaNodos= []
  // DAtos { from:idActual, to: idHijos }
  var PilaEdges= []
  var GrahpvizEdges = ""
  var contador = 0
  //Genera los padres en funcion de los ultimos datos en la pila de Hijos
  function generarPadre (posicion)
  {
    posicion--
    var Edges = pilaHijos.pop()  
    for(const temp of Edges)
    {
      PilaEdges.push({from:contador+posicion, to:temp.id})
      GrahpvizEdges += `${contador+posicion} -> ${temp.id}\n`
    }
  }
  //Funcion que recive X parametros 
  function generarHijos()
  {
    var Hijos=[]
    for(var i=0;i < arguments.length; i++)
    {
      var hijo = {id:contador,label:arguments[i]}
      Hijos.push(hijo)
      pilaNodos.push(hijo)
      GrahpvizNodo += `${contador}[label="${arguments[i]}"]\n`
      contador++
    }
    pilaHijos.push(Hijos)
  }

  function ReemplazaTexto(texto)
  {
    if(!texto)
    {
      return texto
    }
    var result = texto.split("&lt;").join("<");
    result = texto.split("&gt;").join(">");
    result = texto.split("&amp;").join("&");
    result = texto.split("&apos;").join("'");
    result = texto.split("&quot;").join(`"`);
    return result
  }

  var ListaErrores = []
%}


/* Definición Léxica */
%lex

%options case-insensitive
%x Etiquetai
%x Etiquetac
%x EtiquetaConf
%x EtiquetaComentario
%%
/* Espacios en blanco */
[ \r\t]+  			{}
\n                  {}


"<"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*			{this.begin("Etiquetai"); return 'InicioEtiquetaI'}

"<!--"                				{this.begin("EtiquetaComentario"); }
<EtiquetaComentario>[ \r\t]+  {}
<EtiquetaComentario>\n        {}
<EtiquetaComentario>"-->"     {this.popState(); }
<EtiquetaComentario>[^"-->"]+ {} 

<Etiquetai>[ \r\t]+  {}
<Etiquetai>\n        {}

<Etiquetai>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* { return 'AtributoEtiqueta'}
<Etiquetai>"=" 						{ return 'IgualAtributo'}
<Etiquetai>\"[^\n\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'ValorAtributo'}
<Etiquetai>[^A-ZÑa-zñ_=">]+   { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", linea: yylloc.first_line , columna:yylloc.first_column}) }
<Etiquetai>">"						{ this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						{ this.popState(); return 'FinEtiquetaI'}


"</"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*  		{ this.begin("Etiquetac"); return 'InicioEtiquetaC'}
<Etiquetac>[ \r\t]+  				{}
<Etiquetac>\n        				{}
<Etiquetac>[^>]+            { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", linea: yylloc.first_line , columna:yylloc.first_column}) }
<Etiquetac>">"						  { this.popState(); return 'CierreEtiquetaC'}


"<?"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*       	{ this.begin("EtiquetaConf"); return 'InicioEtiquetaConf'}

<EtiquetaConf>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'AtributoConf'}
<EtiquetaConf>"="             			      { return 'IgualAtributoConf'}
<EtiquetaConf>\"[^\n\"]*\"        		    { yytext = yytext.substr(1,yyleng-2); return 'ValorAtributoConf'}
<EtiquetaConf>[ \r\t]+  				          {}
<EtiquetaConf>[^A-ZÑa-zñ_="?>]+           { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", linea: yylloc.first_line , columna:yylloc.first_column}) }
<EtiquetaConf>"?>"            			      { this.popState(); return 'CierreEtiquetaConf'}

<<EOF>>                 			return 'EOF';

[^<]+                       	{ yytext = ReemplazaTexto(yytext); return 'Texto' }
.                             { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", linea: yylloc.first_line , columna:yylloc.first_column}) }
/lex

/* Asociación de operadores y precedencia */


%start ini

%% /* Definición de la gramática */

ini : 
	CUERPO	{$$=$1; generarPadre(1); generarHijos("INICIO");  return {datos:$$,edges:PilaEdges,nodes:pilaNodos,errores:ListaErrores}}
  | error 
    {
      ListaErrores.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column}) 
      return {datos:[],edges:[],nodes:[],errores:ListaErrores}
    }
;

CUERPO
	: LISTA_OBJETO EOF 									
		{ $$ = new helpers.Objeto("/",[],$1,this._$.first_line, this._$.first_column);  
			generarPadre(1);generarHijos("LISTA_OBJETO")
		}
	| ETIQUETACONFIGURACION LISTA_OBJETO EOF			
		{ $$ = new helpers.Objeto("/",$1,$2,this._$.first_line, this._$.first_column); 
			generarPadre(2);generarPadre(1);generarHijos("ETIQUETACONFIGURACION","LISTA_OBJETO")
		}
;

LISTA_OBJETO
	: LISTA_OBJETO OBJETO					  { $$ = $1; $$.push($2.texto); generarPadre(2);generarPadre(1);generarHijos("LISTA_OBJETO","OBJETO")}
	| OBJETO											  { $$ = $1.esTexto ? $1.texto: new Array($1.texto); generarPadre(1);generarHijos("OBJETO") }
;

OBJETO
	: OBJETODOBLE										{ $$ = { texto:$1, esTexto:false}; generarPadre(1);generarHijos("OBJETODOBLE")}
	| OBJETOSIMPLE									{ $$ = { texto:$1, esTexto:false}; generarPadre(1);generarHijos("OBJETOSIMPLE")}
	| Texto 											  { $$ = { texto:$1, esTexto:true}; generarHijos("texto")}
;

OBJETODOBLE
	: ETIQUETAABRE ETIQUETACIERRE						{
			$$ = objetoCorrecto($1.tipo, $2,this._$.first_line,this._$.first_column) ? new helpers.Objeto($1.tipo, $1.atributos, [], this._$.first_line, this._$.first_column) : null;
			generarPadre(2);generarPadre(1);generarHijos("ETIQUETAABRE","ETIQUETACIERRE")
		}
	| ETIQUETAABRE LISTA_OBJETO ETIQUETACIERRE 			{ 
			$$ = objetoCorrecto($1.tipo, $3) ? new helpers.Objeto($1.tipo, $1.atributos, $2, this._$.first_line, this._$.first_column) : null;
			generarPadre(3);generarPadre(2);generarPadre(1);generarHijos("ETIQUETAABRE","LISTA_OBJETO","ETIQUETACIERRE")
		}
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	{ $$ = $2; generarPadre(2);generarHijos($1,"LISTA_ATRIBUTOSCONF",$3) }
  | InicioEtiquetaConf CierreEtiquetaConf           			{ $$ = []; generarHijos($1,$2)}
  | InicioEtiquetaConf error CierreEtiquetaConf   
  { 
    ListaErrores.push({Error:'Este es un error Sintactico: ' + $2 ,tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column})
    $$= {tipo:$1,atributos:[]}
    $$=[];generarHijos($1,"error",$2)
  }
;

LISTA_ATRIBUTOSCONF
  : LISTA_ATRIBUTOSCONF ATRIBUTOCONF       	{ $$ = $1; $$.push($2); generarPadre(2);generarPadre(1);generarHijos("LISTA_ATRIBUTOSCONF","ATRIBUTOCONF")  }
  | ATRIBUTOCONF                			{ $$ = []; $$.push($1); generarPadre(1);generarHijos("ATRIBUTOCONF") }
  | LISTA_ATRIBUTOSCONF error             
    { 
      $$=$1; generarPadre(1); generarHijos("ATRIBUTO","error") 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column})  
    }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf  { 
      $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
      generarHijos($1,$2,$3);
      if ($1 == '')
        tipoCodificacion =  $3
    }
;


ETIQUETAABRE
	: InicioEtiquetaI CierreEtiquetaI					{ $$ = {tipo:$1, atributos:[]}; generarHijos($1,$2) }
	| InicioEtiquetaI LISTA_ATRIBUTOS CierreEtiquetaI	{ $$ = {tipo:$1, atributos:$2}; generarPadre(2);generarHijos($1,"LISTA_ATRIBUTOS",$3)  }
  | InicioEtiquetaI error CierreEtiquetaI   
    { 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,atributos:[]}
      generarHijos($1,"error",$3)
    }
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					{ $$ = $1; generarHijos($1,$2) }
;

OBJETOSIMPLE
	: InicioEtiquetaI FinEtiquetaI						{ $$ = new helpers.Objeto($1,[],[],this._$.first_line, this._$.first_column); generarHijos($1,$2) }
	| InicioEtiquetaI LISTA_ATRIBUTOS FinEtiquetaI		{ $$ = new helpers.Objeto($1,$2,[],this._$.first_line, this._$.first_column); generarPadre(2);generarHijos($1,"LISTA_ATRIBUTOS",$3) }
  | InicioEtiquetaI error FinEtiquetaI   
    { 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,atributos:[]}
      generarHijos($1,"error",$3)
    }
;

LISTA_ATRIBUTOS
	: LISTA_ATRIBUTOS ATRIBUTO							{ $$ = $1; $$.push($2); generarPadre(2);generarPadre(1);generarHijos("LISTA_ATRIBUTOS","ATRIBUTO") }
	| ATRIBUTO											{ $$ = []; $$.push($1); generarPadre(1);generarHijos("ATRIBUTO")}
  | LISTA_ATRIBUTOS error 
    { 
      $$=$1; generarPadre(1); generarHijos("ATRIBUTO","error") 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", linea: this._$.first_line , columna: this._$.first_column})
    }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		{$$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); generarHijos($1,$2,$3);}
;


