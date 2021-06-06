%{
	var helpers = require('../analizadorXML/helpers')
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
  var ETI_ABRE_TIPO = "";
  var INI_ETI_I = "";

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
	: LISTA_OBJETO EOF 									                  { $$ = new helpers.Objeto("/",[],$1); return $$; }
  | ETIQUETACONFIGURACION LISTA_OBJETO EOF		          { $$ = new helpers.Objeto("/",$1,$2); return $$; }
;

LISTA_OBJETO
	: OBJETO SUB_LISTA_OBJETO  						                { if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); $$.reverse(); } }
;

SUB_LISTA_OBJETO
    : OBJETO SUB_LISTA_OBJETO                           { if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); }  }
    |                                                   { $$ = new Array(); }
;

OBJETO
	: OBJETOGENERAL									                        { $$ = { texto:$1, esTexto:false}; }
	| Texto 											                          { $$ = { texto:$1, esTexto:true}; }
;

OBJETOGENERAL
  : InicioEtiquetaI SUB_OBJETOGENERAL                         { $$ = objetoCorrecto($1, $2.tipo)? $2:null }
;

SUB_OBJETOGENERAL
    : LISTA_ATRIBUTOS CIERRE_ETIQUETAINICIO                   { $$=$2; $$.Objeto.atributos=$1;  }
    | CIERRE_ETIQUETAINICIO                                   { $$=$1; }
;

CIERRE_ETIQUETAINICIO
  : CierreEtiquetaI LISTA_OBJETO_Epsilon ETIQUETACIERRE       { $$ = new helpers.Objeto("", [], $2); $$.setTipo($3); }
  | FinEtiquetaI                                              { $$ = new helpers.Objeto("",[], $2) }
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					            { $$ = $1; }
;

LISTA_OBJETO_Epsilon
  : LISTA_OBJETO                                        { $$ = $1; } 
  |                                                     { $$ = []; } 
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf SUB_ETIQUETACONFIG 	            { $$ = $2; }
;

SUB_ETIQUETACONFIG
  : LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	            { $$ = $2; }
  | CierreEtiquetaConf           			                  { $$ = []; }
;

LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                { $$=$2; $$.push($1); }
;

SUB_LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                { $$=$2; $$.push($1); }
  |                                                     { $$ = []; }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf    { $$ = new helpers.Atributo($1,$3); }
;

LISTA_ATRIBUTOS
	: ATRIBUTO SUB_LISTA_ATRIBUTOS							          { $$ = $2; $$.push($1); }
;

SUB_LISTA_ATRIBUTOS
  : ATRIBUTO SUB_LISTA_ATRIBUTOS                        { $$ = $2; $$.push($1); }
  |                                                     { $$ = []; }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		    { $$ = new helpers.Atributo($1,$3); }
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







