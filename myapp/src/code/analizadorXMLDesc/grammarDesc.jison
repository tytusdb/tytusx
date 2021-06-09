%{
	var helpers = require('../analizadorXML/helpers')
  const {grafoCST} = require('./CSTXMLDESC')
  var grafo = new grafoCST; 
	var atributosRaiz = []
	function objetoCorrecto (inicio, fin){
		inicio = inicio.replace('<','')
    if(fin == ""){
      return inicio;
    }
		fin = fin.replace('</','')
    if(inicio === fin){
      return inicio;
    }
		return undefined;
	}


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


"<"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*			{this.begin("Etiquetai"); return 'InicioEtiquetaI'}

"<!--"                				{this.begin("EtiquetaComentario"); }
<EtiquetaComentario>[ \r\t]+  {}
<EtiquetaComentario>\n        {}
<EtiquetaComentario>"-->"     {this.popState(); }
<EtiquetaComentario>[^"-->"]+ {} 

<Etiquetai>[ \r\t]+  {}
<Etiquetai>\n        {}

<Etiquetai>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* { return 'AtributoEtiqueta'}
<Etiquetai>"=" 						{ return 'IgualAtributo'}
<Etiquetai>\"[^\n\"]*\"				{ return 'ValorAtributo'}
<Etiquetai>">"						{ this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						{ this.popState(); return 'FinEtiquetaI'}


"</"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*  		{ this.begin("Etiquetac"); return 'InicioEtiquetaC'}
<Etiquetac>[ \r\t]+  				{}
<Etiquetac>\n        				{}
<Etiquetac>">"						{ this.popState(); return 'CierreEtiquetaC'}


"<?"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*       	{ this.begin("EtiquetaConf"); return 'InicioEtiquetaConf'}

<EtiquetaConf>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'AtributoConf'}
<EtiquetaConf>"="             			{ return 'IgualAtributoConf'}
<EtiquetaConf>\"[^\n\"]*\"        		{ return 'ValorAtributoConf'}

<EtiquetaConf>[ \r\t]+  				{}
<EtiquetaConf>"?>"            			{ this.popState(); return 'CierreEtiquetaConf'}


<<EOF>>                 			return 'EOF';

[^<]*                       		{ return 'Texto' }

/lex

/* Asociación de operadores y precedencia */


%start ini

%% /* Definición de la gramática */

ini
  : CUERPO  {$$=$1; grafo.generarPadre(1);grafo.generarHijos("INICIO"); return {datos:$1,nodes:grafo.pilaNodos,edges:grafo.PilaEdges}}
;

CUERPO
	: LISTA_OBJETO EOF 									                  { 
    $$ = new helpers.Objeto("/",[],$1,this._$.first_line, this._$.first_column);  
    grafo.generarPadre(1);grafo.generarHijos("LISTA_OBJETO")
    }
  | ETIQUETACONFIGURACION LISTA_OBJETO EOF		          { $$ = new helpers.Objeto("/",$1,$2,this._$.first_line, this._$.first_column); 
    grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ETIQUETACONFIGURACION","LISTA_OBJETO")
  }
;

LISTA_OBJETO
	: OBJETO SUB_LISTA_OBJETO  						                { if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); $$.reverse(); } grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("OBJETO","SUB_LISTA_OBJETO") }
;

SUB_LISTA_OBJETO
    : OBJETO SUB_LISTA_OBJETO                           { if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); } grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("OBJETO","SUB_LISTA_OBJETO") }
    |                                                   { $$ = new Array(); grafo.generarHijos("Ɛ") }
;

OBJETO
	: OBJETOGENERAL									                        { $$ = { texto:$1, esTexto:false}; grafo.generarPadre(1);grafo.generarHijos("OBJETOGENERAL")}
	| Texto 											                          { $$ = { texto:$1, esTexto:true}; grafo.generarHijos("Texto")}
;

OBJETOGENERAL
  : InicioEtiquetaI SUB_OBJETOGENERAL                         { $2.linea=this._$.first_line; $2.columna=this._$.first_column; $$ = objetoCorrecto($1, $2.tipo)? $2:null; grafo.generarPadre(2);grafo.generarHijos($1,"SUB_OBJETOGENERAL") }
;

SUB_OBJETOGENERAL
    : LISTA_ATRIBUTOS CIERRE_ETIQUETAINICIO                   { $$=$2; $$.atributos=$1; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("LISTA_ATRIBUTOS","CIERRE_ETIQUETAINICIO")}
    | CIERRE_ETIQUETAINICIO                                   { $$=$1; grafo.generarPadre(1);grafo.generarHijos("CIERRE_ETIQUETAINICIO")}
;

CIERRE_ETIQUETAINICIO
  : CierreEtiquetaI LISTA_OBJETO_Epsilon ETIQUETACIERRE       { $$ = new helpers.Objeto("", [], $2,0,0); $$.setTipo($3); grafo.generarPadre(3);grafo.generarPadre(2);grafo.generarHijos($1,"LISTA_OBJETO_Epsilon","ETIQUETACIERRE") }
  | FinEtiquetaI                                              { $$ = new helpers.Objeto("",[], [],0,0); grafo.generarHijos($1)}
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					            { $$ = $1; grafo.generarHijos($1,$2) }
;

LISTA_OBJETO_Epsilon
  : LISTA_OBJETO                                        { $$ = $1; grafo.generarPadre(1);grafo.generarHijos("LISTA_OBJETO")} 
  |                                                     { $$ = []; grafo.generarHijos("Ɛ") } 
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf SUB_ETIQUETACONFIG 	            { $$ = $2; grafo.generarPadre(2);grafo.generarHijos($1,"SUB_ETIQUETACONFIG")}
;

SUB_ETIQUETACONFIG
  : LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	            { $$ = $2; grafo.generarPadre(1);grafo.generarHijos("LISTA_ATRIBUTOSCONF",$2) }
  | CierreEtiquetaConf           			                  { $$ = []; grafo.generarHijos($1) }
;

LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                { $$=$2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTOCONF","SUB_LISTA_ATRIBUTOSCONF") }
;

SUB_LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                { $$=$2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTOCONF","SUB_LISTA_ATRIBUTOSCONF")  }
  |                                                     { $$ = []; grafo.generarHijos("Ɛ")}
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf    { $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); grafo.generarHijos($1,$2,$3) }
;

LISTA_ATRIBUTOS
	: ATRIBUTO SUB_LISTA_ATRIBUTOS							          { $$ = $2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS") }
;

SUB_LISTA_ATRIBUTOS
  : ATRIBUTO SUB_LISTA_ATRIBUTOS                        { $$ = $2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS") }
  |                                                     { $$ = []; grafo.generarHijos("Ɛ")}
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		    { $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); grafo.generarHijos($1,$2,$3)}
;


// /*function objetoCorrecto (inicio, fin), objeto(tipo, atributos, hijos)*/
// OBJETODOBLE
//     : ETIQUETAABRE SUB_OBJETODOBLE                      { $$ = $2; console.log("OBJETODOBLE"); }
// ;

// SUB_OBJETODOBLE
//     : ETIQUETACIERRE                                    { $$ = objetoCorrecto($0, $1) ? new helpers.Objeto($0, $1.atributos, []) : null; console.log("SUB_OBJETODOBLE"); }
//     | LISTA_OBJETO ETIQUETACIERRE	                      { $$ = objetoCorrecto($0, $2) ? new helpers.Objeto($0, $1.atributos, $1) : null;  console.log("SUB_OBJETODOBLE");}
// ;



// ETIQUETAABRE
// 	: InicioEtiquetaI SUB_ETIQUETAABRE					          {  }
// ;

// SUB_ETIQUETAABRE
//     : LISTA_ATRIBUTOS CierreEtiquetaI                   {  }
//     | CierreEtiquetaI                                   {  }
// ;



// OBJETOSIMPLE
// 	: InicioEtiquetaI SUB_OBJETOSIMPLE						        { $$ = $2; $$.setTipo($1);}
// ;

// SUB_OBJETOSIMPLE
//   : FinEtiquetaI						                            { $$ = new helpers.Objeto("",[],[]); }
//   | LISTA_ATRIBUTOS FinEtiquetaI                        { $$ = new helpers.Objeto("",$2,[]); }
// ;







