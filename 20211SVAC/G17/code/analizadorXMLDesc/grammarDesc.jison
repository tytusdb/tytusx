%{
	var helpers = require('../analizadorXML/helpers')
  const {grafoCST} = require('../CST')
  var grafo = new grafoCST(); 
	var atributosRaiz = []
	// Codificación global
  var tipoCodificacion = "utf8"

  function objetoCorrecto (inicio, fin, linea, columna){
    if(!inicio || fin==undefined)
    {
      return undefined
    }
		inicio = inicio.replace('<','')
    if(fin.tipo == ""){
      fin.tipo=inicio
      return inicio;
    }
		var tempfin = fin.tipo.replace('</','')
    if(inicio === tempfin){
      return inicio;
    }
    ListaErrores.push({Error:'Este es un error Semantico: Etiquetas no coinciden',tipo:"Semantico", Linea: linea , columna:columna})
		return undefined;
	}

  function ReemplazaTexto(texto)
  {
    if(!texto)
    {
      return texto
    }
    var result = texto.split("&lt;").join("<");
    result = result.split("&gt;").join(">");
    result = result.split("&amp;").join("&");
    result = result.split("&apos;").join("'");
    result = result.split("&quot;").join(`"`);
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
<Etiquetai>"=" 						      { return 'IgualAtributo'}
<Etiquetai>\"[^\n\"]*\"				  { yytext = yytext.substr(1,yyleng-2); return 'ValorAtributo'}
<Etiquetai>[^A-ZÑa-zñ_="/>]+    { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<Etiquetai>">"						      { this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						      { this.popState(); return 'FinEtiquetaI'}


"</"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*  		{ this.begin("Etiquetac"); return 'InicioEtiquetaC'}
<Etiquetac>[ \r\t]+  				{}
<Etiquetac>\n        				{}
<Etiquetac>[^>]+            { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<Etiquetac>">"						  { this.popState(); return 'CierreEtiquetaC'}


"<?"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*       	{ this.begin("EtiquetaConf"); return 'InicioEtiquetaConf'}

<EtiquetaConf>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'AtributoConf'}
<EtiquetaConf>"="             			      { return 'IgualAtributoConf'}
<EtiquetaConf>\"[^\n\"]*\"        		    { yytext = yytext.substr(1,yyleng-2); return 'ValorAtributoConf'}
<EtiquetaConf>[ \r\t]+  				          {}
<EtiquetaConf>[^A-ZÑa-zñ_="?>]+           { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<EtiquetaConf>"?>"            			      { this.popState(); return 'CierreEtiquetaConf'}

<<EOF>>                 			return 'EOF';

[^<]+                       	{ yytext = ReemplazaTexto(yytext); return 'Texto' }
.                             { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
/lex


/* Asociación de operadores y precedencia */


%start ini

%% /* Definición de la gramática */

ini
  : CUERPO  
  {
    $$=$1; grafo.generarPadre(1);grafo.generarHijos("INICIO");
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    return {datos:$1,nodes:retornoGrafo.pilaNodos,edges:retornoGrafo.PilaEdges,errores:retornoErrores}
  }
  | error 
    {
      ListaErrores.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column}) 
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      var retornoGrafo = Object.assign({}, grafo);
      grafo = new grafoCST();
      return {datos:[],edges:[],nodes:[],errores:ListaErrores}
    }
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
	| Texto 											                          { $$ = { texto:helpers.CambiarCodificacion($1,tipoCodificacion), esTexto:true}; grafo.generarHijos("Texto")}
;

OBJETOGENERAL
  : InicioEtiquetaI SUB_OBJETOGENERAL                         { $2.Linea=this._$.first_line; $2.columna=this._$.first_column; $$ = objetoCorrecto($1, $2,this._$.first_line, this._$.first_column)? $2:null; grafo.generarPadre(2);grafo.generarHijos($1,"SUB_OBJETOGENERAL") }
;

SUB_OBJETOGENERAL
    : LISTA_ATRIBUTOS CIERRE_ETIQUETAINICIO                   { $$=$2; $$.atributos=$1; grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("LISTA_ATRIBUTOS","CIERRE_ETIQUETAINICIO")}
    | CIERRE_ETIQUETAINICIO                                   { $$=$1; grafo.generarPadre(1);grafo.generarHijos("CIERRE_ETIQUETAINICIO")}
    | error CIERRE_ETIQUETAINICIO                             { 
      $$=$1; 
      $$.atributos=[]; 
      grafo.generarPadre(2);
      grafo.generarHijos("error","CIERRE_ETIQUETAINICIO");
      ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
    }
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
  | ATRIBUTOCONF error                                  { 
    $$=[]; $$.push($1);
    grafo.generarPadre(1);
    grafo.generarHijos("ATRIBUTOCONF","error");
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

SUB_LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                { $$=$2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTOCONF","SUB_LISTA_ATRIBUTOSCONF")  }
  |                                                     { $$ = []; grafo.generarHijos("Ɛ")}
  | ATRIBUTOCONF error                                  { 
    $$ = []; $$.push($1); 
    grafo.generarPadre(1);
    grafo.generarHijos("ATRIBUTOCONF","error");
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf    { 
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
    grafo.generarHijos($1,$2,$3) 
    if ($1 == 'encoding')
      tipoCodificacion = $3
  }
  | AtributoConf error                                  
  { 
    $$ = []; $$.push($1);
    grafo.generarHijos($1,"error");
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});   
    }
;

LISTA_ATRIBUTOS
	: ATRIBUTO SUB_LISTA_ATRIBUTOS							          { $$ = $2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS") }
  | ATRIBUTO error                                      { 
    $$ = []; $$.push($1);
    grafo.generarPadre(1);
    grafo.generarHijos("ATRIBUTO","error"); 
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;

SUB_LISTA_ATRIBUTOS
  : ATRIBUTO SUB_LISTA_ATRIBUTOS                        { $$ = $2; $$.push($1); grafo.generarPadre(2);grafo.generarPadre(1);grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS") }
  |                                                     { $$ = []; grafo.generarHijos("Ɛ")}
  | ATRIBUTO error                                      { 
    $$ = []; $$.push($1);
    grafo.generarPadre(1);
    grafo.generarHijos("ATRIBUTO","error");
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});  
  }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		    { $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); grafo.generarHijos($1,$2,$3)}
  | AtributoEtiqueta error                              { 
    $$ = null; 
    grafo.generarHijos($1,"error"); 
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;
