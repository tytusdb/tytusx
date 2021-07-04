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
<EtiquetaComentario>"-"       {}
<EtiquetaComentario>">"       {}
<EtiquetaComentario>[^-->]+   {} 

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
    $$=$1; grafo.generarPadre(1, "INICIO");grafo.generarHijos("INICIO");
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    return {datos:$1,nodes:retornoGrafo.pilaNodos,edges:retornoGrafo.PilaEdges,tabla:retornoGrafo.TablaGramatica,errores:retornoErrores}
  }
  | error 
    {
      ListaErrores.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column}) 
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      var retornoGrafo = Object.assign({}, grafo);
      grafo = new grafoCST();
      return {datos:[],edges:[],nodes:[], tabla:[], errores:ListaErrores}
    }
;

CUERPO
	: LISTA_OBJETO EOF 									                  { 
    $$ = new helpers.Objeto("/",[],$1,this._$.first_line, this._$.first_column);  
    grafo.generarPadre(1, "LISTA_OBJETO");
    grafo.generarHijos("LISTA_OBJETO");
    grafo.generarTexto("Cuerpo.entorno = ListaObjeto.entorno")
    }
  | ETIQUETACONFIGURACION LISTA_OBJETO EOF		          
  { $$ = new helpers.Objeto("/",$1,$2,this._$.first_line, this._$.first_column); 
    grafo.generarPadre(2, "LISTA_OBJETO");
    grafo.generarPadre(1, "ETIQUETACONFIGURACION");
    grafo.generarHijos("ETIQUETACONFIGURACION","LISTA_OBJETO")
    grafo.generarTexto("Cuerpo.configs = EtiquetaConfigs.configs; Cuerpo.entorno = ListaObjeto.entorno");
  }
;

LISTA_OBJETO
	: OBJETO SUB_LISTA_OBJETO  						                
  { 
    if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); $$.reverse(); }
    grafo.generarPadre(2, "SUB_LISTA_OBJETO");
    grafo.generarPadre(1, "OBJETO");
    grafo.generarHijos("OBJETO","SUB_LISTA_OBJETO");
    grafo.generarTexto(`Objeto.entorno.set(Objeto.val)`)
  }
;

SUB_LISTA_OBJETO
    : OBJETO SUB_LISTA_OBJETO                           
    { 
      if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); }
      grafo.generarPadre(2, "SUB_LISTA_OBJETO");
      grafo.generarPadre(1, "OBJETO");
      grafo.generarHijos("OBJETO","SUB_LISTA_OBJETO");
      grafo.generarTexto(`LostaObjeto.entorno.set(Objeto.val)`)
    }
    |                                                   
    { 
      $$ = new Array(); 
      grafo.generarHijos("Ɛ");
      grafo.generarTexto(`ListaObjeto.entorno = new Entorno();`)
    }
;

OBJETO
	: OBJETOGENERAL									                        
  { 
    $$ = { texto:$1, esTexto:false};
    grafo.generarPadre(1, "OBJETOGENERAL");
    grafo.generarHijos("OBJETOGENERAL");
    grafo.generarTexto("Objeto.val = ObjetoGeneral.val");
  }
	| Texto 											                          
  { 
    $$ = { texto:helpers.CambiarCodificacion($1,tipoCodificacion), esTexto:true};
    grafo.generarHijos("Texto");
    grafo.generarTexto("Texto.val=texto")  
  }
;

OBJETOGENERAL
  : InicioEtiquetaI SUB_OBJETOGENERAL                         
  { 
    $2.linea=this._$.first_line; $2.columna=this._$.first_column;
    $$ = objetoCorrecto($1, $2,this._$.first_line, this._$.first_column)? $2:null;
    grafo.generarPadre(2, "SUB_OBJETOGENERAL");
    grafo.generarHijos($1,"SUB_OBJETOGENERAL");
    grafo.generarTexto(`OBJETOGENERAL.valor = ${$1} + SUB_OBJETOGENERAL.valor;`);
  }
;

SUB_OBJETOGENERAL
    : LISTA_ATRIBUTOS CIERRE_ETIQUETAINICIO                   
    { 
      $$=$2; $$.atributos=$1; grafo.generarPadre(2, "CIERRE_ETIQUETAINICIO");
      grafo.generarPadre(1, "LISTA_ATRIBUTOS");
      grafo.generarHijos("LISTA_ATRIBUTOS","CIERRE_ETIQUETAINICIO");
      grafo.generarTexto("SUB_OBJETOGENERAL.entorno = LISTA_ATRIBUTOS.entorno; SUB_OBJETOGENERAL.valor = CIERRE_ETIQUETAINICIO.valor");
    }
    | CIERRE_ETIQUETAINICIO                                   
    { 
      $$=$1; grafo.generarPadre(1, "CIERRE_ETIQUETAINICIO");
      grafo.generarHijos("CIERRE_ETIQUETAINICIO");
      grafo.generarTexto(`SUB_OBJETOGENERAL.valor = CIERRE_ETIQUETAINICIO.valor;`);
    }
    | error CIERRE_ETIQUETAINICIO                             
    { 
      $$=$1; 
      $$.atributos=[]; 
      grafo.generarPadre(2, "CIERRE_ETIQUETAINICIO");
      grafo.generarHijos("error","CIERRE_ETIQUETAINICIO");
      grafo.generarTexto("SUB_OBJETOGENERAL.valor = CIERRE_ETIQUETAINICIO.valor; new Error();");
      ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
    }
;

CIERRE_ETIQUETAINICIO
  : CierreEtiquetaI LISTA_OBJETO_Epsilon ETIQUETACIERRE       
  { 
    $$ = new helpers.Objeto("", [], $2,0,0);
    $$.setTipo($3);
    grafo.generarPadre(3, "ETIQUETACIERRE");
    grafo.generarPadre(2, "LISTA_OBJETO_Epsilon");
    grafo.generarHijos($1,"LISTA_OBJETO_Epsilon","ETIQUETACIERRE");
    grafo.generarTexto(`CIERRE_ETIQUETAINICIO.valor = ">" + LISTA_OBJETO_Epsilon.valor;`);
    }
  | FinEtiquetaI                                              
  { 
    $$ = new helpers.Objeto("",[], [],0,0);
    grafo.generarHijos($1);
    grafo.generarTexto(`CIERRE_ETIQUETAINICIO.valor = "/>";`);
  }
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					            { $$ = $1; grafo.generarHijos($1,$2); grafo.generarTexto(`EtiquetaCierre.nombre = ${$1.replace("</","")}`) }
;

LISTA_OBJETO_Epsilon
  : LISTA_OBJETO                                        
  { 
    $$ = $1; grafo.generarPadre(1, "LISTA_OBJETO");
    grafo.generarHijos("LISTA_OBJETO");
    grafo.generarTexto("LISTA_OBJETO_Epsilon.valor = LISTA_OBJETO.Objetos");
  } 
  |                                                     
  {
    $$ = []; grafo.generarHijos("Ɛ");
    grafo.generarTexto("LISTA_OBJETO_Epsilon.valor = [];");
  } 
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf SUB_ETIQUETACONFIG 	            
  { 
    $$ = $2; grafo.generarPadre(2, "SUB_ETIQUETACONFIG");
    grafo.generarHijos($1,"SUB_ETIQUETACONFIG");
    grafo.generarTexto(`EtiquetaConfiguracion.configuraciones= SUB_ETIQUETACONFIG.valor`)
  }
;

SUB_ETIQUETACONFIG
  : LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	            
  { 
    $$ = $1; grafo.generarPadre(1, "SUB_ETIQUETACONFIG");
    grafo.generarHijos("LISTA_ATRIBUTOSCONF",$2) 
    grafo.generarTexto(`SUB_ETIQUETACONFIG.valor = Lista_AtributosConf.configuraciones;`)
  }
  | CierreEtiquetaConf           			                  
  { 
    $$ = []; grafo.generarHijos($1) 
    grafo.generarTexto(`SUB_ETIQUETACONFIG.valor = [];`)
  }
;

LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                
  { 
    $$=$2; $$.push($1);
    grafo.generarPadre(2, "SUB_LISTA_ATRIBUTOSCONF");
    grafo.generarPadre(1, "ATRIBUTOCONF");
    grafo.generarHijos("ATRIBUTOCONF","SUB_LISTA_ATRIBUTOSCONF") 
    grafo.generarTexto(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion);`)
    }
  | ATRIBUTOCONF error                                  
  { 
    $$=[]; $$.push($1);
    grafo.generarPadre(1, "ATRIBUTOCONF");
    grafo.generarHijos("ATRIBUTOCONF","error");
    grafo.generarTexto(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion); new Error();`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

SUB_LISTA_ATRIBUTOSCONF
  : ATRIBUTOCONF SUB_LISTA_ATRIBUTOSCONF                
  {
    $$=$2; $$.push($1);
    grafo.generarPadre(2, "SUB_LISTA_ATRIBUTOSCONF");
    grafo.generarPadre(1, "ATRIBUTOCONF");
    grafo.generarHijos("ATRIBUTOCONF","SUB_LISTA_ATRIBUTOSCONF");
    grafo.generarTexto(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion);`)
    }
  |                                                     
  {
    $$ = []; grafo.generarHijos("Ɛ");
     grafo.generarTexto(`Lista_AtributoConf.configuraciones= [];`)
  }
  | ATRIBUTOCONF error                                  
  { 
    $$ = []; $$.push($1); 
    grafo.generarPadre(1, "ATRIBUTOCONF");
    grafo.generarHijos("ATRIBUTOCONF","error");
    grafo.generarTexto(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion); new Error();`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf    { 
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
    grafo.generarHijos($1,$2,$3) 
    if ($1 == 'encoding') tipoCodificacion = $3
    grafo.generarTexto(`AtributoConf.configuracion = new Configuracion(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
  | AtributoConf error                                  
  { 
    $$ = []; $$.push($1);
    grafo.generarHijos($1,"error");
    grafo.generarTexto(`AtributoConf.configuracion = new Configuracion(${$1}); new Error();`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});   
    }
;

LISTA_ATRIBUTOS
	: ATRIBUTO SUB_LISTA_ATRIBUTOS							          
  { 
    $$ = $2; $$.push($1);
    grafo.generarPadre(2,"ATRIBUTO");
    grafo.generarPadre(1,"SUB_LISTA_ATRIBUTOS");
    grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS");
    grafo.generarTexto(`Lista_Atributos.entorno.set(Atributo.valor);`)
  }
  | ATRIBUTO error                                      
  { 
    $$ = []; $$.push($1);
    grafo.generarPadre(1,"ATRIBUTO");
    grafo.generarHijos("ATRIBUTO","error"); 
    grafo.generarTexto(`Lista_Atributos.entorno.set(Atributo.valor); new Error();`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;

SUB_LISTA_ATRIBUTOS
  : ATRIBUTO SUB_LISTA_ATRIBUTOS                        
  {
    $$ = $2; $$.push($1);
    grafo.generarPadre(2, "SUB_LISTA_ATRIBUTOS");
    grafo.generarPadre(1, "ATRIBUTO");
    grafo.generarHijos("ATRIBUTO","SUB_LISTA_ATRIBUTOS")
    grafo.generarTexto(`Lista_Atributos.entorno.set(Atributo.valor);`)
  }
  |                                                     
  { 
    $$ = []; grafo.generarHijos("Ɛ");
    grafo.generarTexto(`Lista_Atributos.entorno = new Entorno("Atributos");`)
  }
  | ATRIBUTO error                                      
  { 
    $$ = []; $$.push($1);
    grafo.generarPadre(1, "ATRIBUTO");
    grafo.generarHijos("ATRIBUTO","error");
    grafo.generarTexto(`Lista_Atributos.entorno.set(Atributo.valor); new Error();`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});  
  }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		    
  {
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column);
    grafo.generarHijos($1,$2,$3)
    grafo.generarTexto(`Atributo.valor = new Atributo(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
  | AtributoEtiqueta error                              
  { 
    $$ = null; 
    grafo.generarHijos($1,"error"); 
    grafo.generarTexto(`new Error()`)
    ListaErrores.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;
