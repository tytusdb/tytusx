%{
	var helpers = require('./helpers')
  var C3D = require('../C3D')
  const {grafoCST} = require('../CST')
  var grafo = new grafoCST; 
	var atributosRaiz = []
  var tipoCodificacion = "utf8"

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
      ListaErrores.push({Error:'Este es un error Semantico: Etiquetas no coinciden',tipo:"Semantico", Linea: linea , columna:columna})
      return false
    }
	}
  // Codificación global



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
<Etiquetai>"=" 						{ return 'IgualAtributo'}
<Etiquetai>\"[^\n\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'ValorAtributo'}
<Etiquetai>[^A-ZÑa-zñ_=">/]+   { ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<Etiquetai>">"						{ this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						{ this.popState(); return 'FinEtiquetaI'}


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
      $$=$1; grafo.generarPadre(1,"INICIO");
      grafo.generarHijos("INICIO");
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      var retornoGrafo = Object.assign({}, grafo);
      grafo = new grafoCST();
      var c3d = C3D.getFullC3D();
      C3D.SetearXML();
      return{
        datos:$$,
        nodes:retornoGrafo.pilaNodos,
        edges:retornoGrafo.PilaEdges,
        tabla:retornoGrafo.TablaGramatica,
        errores:retornoErrores,
        c3d:c3d
      }
    }
  | error 
    {
      ListaErrores.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column}) 
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      var retornoGrafo = Object.assign({}, grafo);
      grafo = new grafoCST();
      return {datos:[],edges:[],nodes:[], tabla:[], errores:retornoErrores}
    }
;

CUERPO
	: LISTA_OBJETO EOF 									
		{ 
      $$ = new helpers.ObjetoPrincipal("/",[],$1,this._$.first_line, this._$.first_column);  
			grafo.generarPadre(1,"LISTA_OBJETO");
      grafo.generarHijos("LISTA_OBJETO")
      grafo.generarTexto("Cuerpo.entorno = ListaObjeto.entorno")
		}
	| ETIQUETACONFIGURACION LISTA_OBJETO EOF			
		{ 
      $$ = new helpers.ObjetoPrincipal("/",$1,$2,this._$.first_line, this._$.first_column); 
			grafo.generarPadre(2,"LISTA_OBJETO");
      grafo.generarPadre(1,"ETIQUETACONFIGURACION");
      grafo.generarHijos("ETIQUETACONFIGURACION","LISTA_OBJETO");
      grafo.generarTexto("Cuerpo.entorno = ListaObjeto.entorno; Cuerpo.configs = EtiquetaConfigs.configs")
		}
;

LISTA_OBJETO
	: LISTA_OBJETO OBJETO					  
  { 
    $$ = $1; $$.push($2.texto); 
    grafo.generarPadre(2,"OBJETO");
    grafo.generarPadre(1,"LISTA_OBJETO");
    grafo.generarHijos("LISTA_OBJETO","OBJETO")
    grafo.generarTexto('ListaObjeto.entorno = ListaObjeto_1.entorno; LostaObjeto.entorno.set(Objeto.val)')
  }
	| OBJETO											  
  { 
    $$ = $1.esTexto ? $1.texto: new Array($1.texto); 
    grafo.generarPadre(1,"OBJETO");
    grafo.generarHijos("OBJETO") 
    grafo.generarTexto(`ListaObjeto.entorno = new Entorno(); LostaObjeto.entorno.set(Objeto.val)`)
  }
;

OBJETO
	: OBJETODOBLE										
  { 
    $$ = { texto:$1, esTexto:false}; 
    grafo.generarPadre(1,"OBJETODOBLE");
    grafo.generarHijos("OBJETODOBLE")
    grafo.generarTexto("Objeto.val = ObjetoDoble.val")
  }
	| OBJETOSIMPLE									
  { 
    $$ = { texto:$1, esTexto:false}; 
    grafo.generarPadre(1,"OBJETOSIMPLE");
    grafo.generarHijos("OBJETOSIMPLE")
    grafo.generarTexto("Objeto.val = ObjetoSimple.val")
  }
	| Texto 											  
  { 
    $$ = { texto:helpers.CambiarCodificacion($1,tipoCodificacion), esTexto:true}; 
    grafo.generarHijos("texto")
    grafo.generarTexto("Texto.val=texto")
  }
;

OBJETODOBLE
	: ETIQUETAABRE ETIQUETACIERRE						{
			$$ = objetoCorrecto($1.tipo, $2,this._$.first_line,this._$.first_column) ? new helpers.Objeto($1.tipo, $1.atributos, [], this._$.first_line, this._$.first_column) : null;
			grafo.generarPadre(2,"ETIQUETACIERRE");
      grafo.generarPadre(1,"ETIQUETAABRE");
      grafo.generarHijos("ETIQUETAABRE","ETIQUETACIERRE")
      grafo.generarTexto(`if(EtiquetaAbre.nombre==EtiquetaCierra.nombre){ ObjetoDoble.val = new Etiqueta(EtiquetaAbre.nombre) } else { new Error() }`)
		}
	| ETIQUETAABRE LISTA_OBJETO ETIQUETACIERRE 			{ 
			$$ = objetoCorrecto($1.tipo, $3) ? new helpers.Objeto($1.tipo, $1.atributos, $2, this._$.first_line, this._$.first_column) : null;
			grafo.generarPadre(3,"ETIQUETACIERRE");
      grafo.generarPadre(2,"LISTA_OBJETO");
      grafo.generarPadre(1,"ETIQUETAABRE");
      grafo.generarHijos("ETIQUETAABRE","LISTA_OBJETO","ETIQUETACIERRE")
      grafo.generarTexto(`if(EtiquetaAbre.nombre==EtiquetaCierra.nombre){ ObjetoDoble.val = new Etiqueta(EtiquetaAbre.nombre,Lista_Objetos.entorno); } else { new Error() }`)
		}
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	
  { 
    $$ = $2; grafo.generarPadre(2,"LISTA_ATRIBUTOSCONF");
    grafo.generarHijos($1,"LISTA_ATRIBUTOSCONF",$3) 
    grafo.generarTexto(`EtiquetaConfiguracion.configuraciones=Lista_AtributosConf.configuraciones; `)
  }
  | InicioEtiquetaConf CierreEtiquetaConf           			
  { 
    $$ = []; 
    grafo.generarHijos($1,$2)
    grafo.generarTexto(`EtiquetaConfiguracion.configuraciones=[]`)
  }
  | InicioEtiquetaConf error CierreEtiquetaConf   
  { 
    ListaErrores.push({Error:'Este es un error Sintactico: ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
    $$= {tipo:$1,atributos:[]}
    $$=[];grafo.generarHijos($1,"error",$2)
    grafo.generarTexto(`EtiquetaConfiguracion.configuraciones=[]; new Error()`)
  }
;

LISTA_ATRIBUTOSCONF
  : LISTA_ATRIBUTOSCONF ATRIBUTOCONF       	
    { 
      $$ = $1; $$.push($2); 
      grafo.generarPadre(2,"ATRIBUTOCONF");
      grafo.generarPadre(1,"LISTA_ATRIBUTOSCONF");
      grafo.generarHijos("LISTA_ATRIBUTOSCONF","ATRIBUTOCONF")  
      grafo.generarTexto(`Lista_AtributoConf.configuraciones=Lista_AtributoConf.configuraciones; Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion)`)
    }
  | ATRIBUTOCONF                			
    { 
      $$ = []; 
      $$.push($1); 
      grafo.generarPadre(1,"ATRIBUTOCONF");
      grafo.generarHijos("ATRIBUTOCONF") 
      grafo.generarTexto(`Lista_AtributoConf.configuraciones= []; Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion)`)
    }
  | LISTA_ATRIBUTOSCONF error             
    { 
      $$=$1; grafo.generarPadre(1,"LISTA_ATRIBUTOSCONF"); grafo.generarHijos("ATRIBUTO","error") 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})  
      grafo.generarTexto(`Lista_AtributoConf.configuraciones=Lista_AtributoConf.configuraciones; new Error()`)
    }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf  
    { 
      $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
      grafo.generarHijos($1,$2,$3);
      if ($1 == 'encoding') tipoCodificacion =  $3
      grafo.generarTexto(`AtributoConf.configuracion = new Configuracion(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
    }
;


ETIQUETAABRE
	: InicioEtiquetaI CierreEtiquetaI					
    { 
      $$ = {tipo:$1, atributos:[]}; 
      grafo.generarHijos($1,$2) 
      grafo.generarTexto(`EtiquetaAbre.nombre = ${$1.replace("<","")}`)
    }
	| InicioEtiquetaI LISTA_ATRIBUTOS CierreEtiquetaI	
    { 
      $$ = {tipo:$1, atributos:$2}; grafo.generarPadre(2,"LISTA_ATRIBUTOS");
      grafo.generarHijos($1,"LISTA_ATRIBUTOS",$3)  
      grafo.generarTexto(`EtiquetaAbre.nombre = ${$1.replace("<","")}; EtiquetaAbre.entorno = Lista_Atributos.entorno`)
    }
  | InicioEtiquetaI error CierreEtiquetaI   
    { 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,atributos:[]}
      grafo.generarHijos($1,"error",$3)
      grafo.generarTexto(`EtiquetaAbre.nombre = ${$1.replace("<","")};new Error()`)
    }
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					
    { 
      $$ = $1; 
      grafo.generarHijos($1,$2) 
      grafo.generarTexto(`EtiquetaCierre.nombre = ${$1.replace("</","")}`)
    }
;

OBJETOSIMPLE
	: InicioEtiquetaI FinEtiquetaI						
    { 
      $$ = new helpers.Objeto($1,[],[],this._$.first_line, this._$.first_column); 
      grafo.generarHijos($1,$2) 
      grafo.generarTexto(`ObjetoSimple.val = new Etiqueta(${$1.replace("<","")})`)
    }  
	| InicioEtiquetaI LISTA_ATRIBUTOS FinEtiquetaI		
    { 
      $$ = new helpers.Objeto($1,$2,[],this._$.first_line, this._$.first_column); 
      grafo.generarPadre(2,"LISTA_ATRIBUTOS");
      grafo.generarHijos($1,"LISTA_ATRIBUTOS",$3) 
      grafo.generarTexto(`ObjetoSimple.val = new Etiqueta(${$1.replace("<","")},Lista_Astributos)`)
    }
  | InicioEtiquetaI error FinEtiquetaI   
    { 
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,atributos:[]}
      grafo.generarHijos($1,"error",$3)
      grafo.generarTexto(`ObjetoSimple.val = new Etiqueta(${$1.replace("<","")});new Error()`)
    }
;

LISTA_ATRIBUTOS
	: LISTA_ATRIBUTOS ATRIBUTO							
    { 
      $$ = $1; $$.push($2); 
      grafo.generarPadre(2,"ATRIBUTO");
      grafo.generarPadre(1,"LISTA_ATRIBUTOS");
      grafo.generarHijos("LISTA_ATRIBUTOS","ATRIBUTO") 
      grafo.generarTexto(`Lista_Atributos.entorno = Lista_Atributos_1.entorno;  Lista_Atributos.set(Atributo.valor)`)
    }
	| ATRIBUTO											        
    { 
      $$ = []; 
      $$.push($1); 
      grafo.generarPadre(1,"ATRIBUTO");
      grafo.generarHijos("ATRIBUTO")
      grafo.generarTexto(`Lista_Atributos.entorno = new Entorno("Atributos"); Lista_Atributos.entorno.set(Atributo.valor)`)
    }
  | LISTA_ATRIBUTOS error 
    { 
      $$=$1; grafo.
      generarPadre(1,"LISTA_ATRIBUTOS");
      grafo.generarHijos("ATRIBUTO","error");
      grafo.generarTexto(`Lista_Atributos.entorno=Lista_Atributos_1.entorno new Error()`)
      ListaErrores.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
    }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		
  {
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
    grafo.generarHijos($1,$2,$3);
    grafo.generarTexto(`Atributo.valor = new Atributo(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
;


