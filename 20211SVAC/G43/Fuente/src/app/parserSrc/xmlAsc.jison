%{
  var Arbolgraph = new ArbolgraphCST; 
	var rootAtts = []
  var codftype = "utf8"
	function okobj (startch, endch,row,col){
    if(!startch || !endch)      return false
    
		startch = startch.replace('<','')
		endch = endch.replace('</','')
	if(startch === endch)
    {
      return true
    }
    else
    {
      Errors.push({Error:'Error Semantico',tipo:"Error Semantico", Linea: row , columna:col})
      return false
    }
	}

  function ChangeTxt(txt)
  {
    if(!txt)
    {
      return txt
    }
    var finalres = txt.split("&lt;").join("<");
    finalres = txt.split("&gt;").join(">");
    finalres = txt.split("&amp;").join("&");
    finalres = txt.split("&apos;").join("'");
    finalres = txt.split("&quot;").join(`"`);
    return finalres
  }
  var Errors = []
%}


/* Lex Config */
%lex

%options case-insensitive
%x initTag
%x endTag
%x ConfTag
%x CommentTag
%%
/* blank spaces */
[ \r\t]+  			{}
\n                  {}


"<"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*			{this.begin("initTag"); return 'initTag'}

"<!--"                				{this.begin("CommentTag"); }
<CommentTag>[ \r\t]+  {}
<CommentTag>\n        {}
<CommentTag>"-->"     {this.popState(); }
<CommentTag>[^"-->"]+ {} 

<initTag>[ \r\t]+  {}
<initTag>\n        {}
"</"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*  		{ this.begin("endTag"); return '-endTag'}
<endTag>[ \r\t]+  				{}
<endTag>\n        				{}
<endTag>[^>]+            { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<endTag>">"	

<initTag>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* { return 'att1'}
<initTag>"=" 						{ return 'att2'}
<initTag>\"[^\n\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'att3'}
<initTag>[^A-ZÑa-zñ_=">/]+   { Errors.push({Error:'Lex Error:' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<initTag>">"						{ this.popState(); return 'att4'}
<initTag>"/>"						{ this.popState(); return 'att5'}


					  { this.popState(); return 'att6'}

<ConfTag>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'att8'}
<ConfTag>"="             			      { return 'att9'}
<ConfTag>\"[^\n\"]*\"        		    { yytext = yytext.substr(1,yyleng-2); return 'att10'}
<ConfTag>[ \r\t]+  				          {}
<ConfTag>[^A-ZÑa-zñ_="?>]+           { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<ConfTag>"?>"            			      { this.popState(); return 'att11'}

"<?"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*       	{ this.begin("ConfTag"); return 'att7'}


<<EOF>>                 			return 'att12';

[^<]+                       	{ yytext = ReemplazaTexto(yytext); return 'att13' }
.                             { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
/lex



%start ini

%% /* Definición de la gramática */

ini 
  : BodyAtt	
    {
      $$=$1; Arbolgraph.CreateUpperParent(1,"INICIO");
      Arbolgraph.CreateBottomChild("INICIO");
      var retornoErrores = Object.assign([], Errors);
      Errors = [];
      var retornoArbolgraph = Object.assign({}, Arbolgraph);
      Arbolgraph = new ArbolgraphCST();
      return {datos:$$,nodes:retornoArbolgraph.pilaNodos,edges:retornoArbolgraph.PilaEdges,tabla:retornoArbolgraph.TablaGramatica,errores:retornoErrores}
    }
  | error 
    {
      Errors.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column}) 
      var retornoErrores = Object.assign([], Errors);
      Errors = [];
      var retornoArbolgraph = Object.assign({}, Arbolgraph);
      Arbolgraph = new ArbolgraphCST();
      return {datos:[],edges:[],nodes:[], tabla:[], errores:retornoErrores}
    }
;

BodyAtt
	: TAG_LIST EOF 									
		{ 
      $$ = new helpers.Objeto("/",[],$1,this._$.first_line, this._$.first_column);  
			Arbolgraph.CreateUpperParent(1,"TAG_LIST");
      Arbolgraph.CreateBottomChild("TAG_LIST")
      Arbolgraph.SetLabel("BodyAtt.env = ListaObjeto.env")
		}
	| ConfTagIGURACION TAG_LIST EOF			
		{ 
      $$ = new helpers.Objeto("/",$1,$2,this._$.first_line, this._$.first_column); 
			Arbolgraph.CreateUpperParent(2,"TAG_LIST");
      Arbolgraph.CreateUpperParent(1,"ConfTagIGURACION");
      Arbolgraph.CreateBottomChild("ConfTagIGURACION","TAG_LIST");
      Arbolgraph.SetLabel("BodyAtt.env = ListaObjeto.env; BodyAtt.configs = ConfTagigs.configs")
		}
;

TAG_LIST
	: TAG_LIST OBJETO					  
  { 
    $$ = $1; $$.push($2.texto); 
    Arbolgraph.CreateUpperParent(2,"OBJETO");
    Arbolgraph.CreateUpperParent(1,"TAG_LIST");
    Arbolgraph.CreateBottomChild("TAG_LIST","OBJETO")
    Arbolgraph.SetLabel('ListaObjeto.env = ListaObjeto_1.env; LostaObjeto.env.set(Objeto.val)')
  }
	| OBJETO											  
  { 
    $$ = $1.esTexto ? $1.texto: new Array($1.texto); 
    Arbolgraph.CreateUpperParent(1,"OBJETO");
    Arbolgraph.CreateBottomChild("OBJETO") 
    Arbolgraph.SetLabel(`ListaObjeto.env = new Entorno(); LostaObjeto.env.set(Objeto.val)`)
  }
;

OBJETO
	: MULTIOBJECT										
  { 
    $$ = { texto:$1, esTexto:false}; 
    Arbolgraph.CreateUpperParent(1,"MULTIOBJECT");
    Arbolgraph.CreateBottomChild("MULTIOBJECT")
    Arbolgraph.SetLabel("Objeto.val = MULTIOBJECT.val")
  }
	| SIMPLEOBJECT									
  { 
    $$ = { texto:$1, esTexto:false}; 
    Arbolgraph.CreateUpperParent(1,"SIMPLEOBJECT");
    Arbolgraph.CreateBottomChild("SIMPLEOBJECT")
    Arbolgraph.SetLabel("Objeto.val = SIMPLEOBJECT.val")
  }
	| Texto 											  
  { 
    $$ = { texto:helpers.CambiarCodificacion($1,tipoCodificacion), esTexto:true}; 
    Arbolgraph.CreateBottomChild("texto")
    Arbolgraph.SetLabel("Texto.val=texto")
  }
;

MULTIOBJECT
	: OPENTAG endTagIERRE						{
			$$ = okObject($1.tipo, $2,this._$.first_line,this._$.first_column) ? new helpers.Objeto($1.tipo, $1.TreeAtts, [], this._$.first_line, this._$.first_column) : null;
			Arbolgraph.CreateUpperParent(2,"endTagIERRE");
      Arbolgraph.CreateUpperParent(1,"OPENTAG");
      Arbolgraph.CreateBottomChild("OPENTAG","endTagIERRE")
      Arbolgraph.SetLabel(`if(OPENTAG.nombre==endTagierra.nombre){ MULTIOBJECT.val = new Etiqueta(OPENTAG.nombre) } else { new Error() }`)
		}
	| OPENTAG TAG_LIST endTagIERRE 			{ 
			$$ = okObject($1.tipo, $3) ? new helpers.Objeto($1.tipo, $1.TreeAtts, $2, this._$.first_line, this._$.first_column) : null;
			Arbolgraph.CreateUpperParent(3,"endTagIERRE");
      Arbolgraph.CreateUpperParent(2,"TAG_LIST");
      Arbolgraph.CreateUpperParent(1,"OPENTAG");
      Arbolgraph.CreateBottomChild("OPENTAG","TAG_LIST","endTagIERRE")
      Arbolgraph.SetLabel(`if(OPENTAG.nombre==endTagierra.nombre){ MULTIOBJECT.val = new Etiqueta(OPENTAG.nombre,TAG_LISTs.env); } else { new Error() }`)
		}
;

ConfTagIGURACION
  : STARTCONFTAG LIST_TREEAttSCONF ENDCONFTAG 	
  { 
    $$ = $2; Arbolgraph.CreateUpperParent(2,"LIST_TREEAttSCONF");
    Arbolgraph.CreateBottomChild($1,"LIST_TREEAttSCONF",$3) 
    Arbolgraph.SetLabel(`ConfTagiguracion.configuraciones=LIST_TREEAttsConf.configuraciones; `)
  }
  | STARTCONFTAG ENDCONFTAG           			
  { 
    $$ = []; 
    Arbolgraph.CreateBottomChild($1,$2)
    Arbolgraph.SetLabel(`ConfTagiguracion.configuraciones=[]`)
  }
  | STARTCONFTAG error ENDCONFTAG   
  { 
    Errors.push({Error:'Este es un error Sintactico: ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
    $$= {tipo:$1,TreeAtts:[]}
    $$=[];Arbolgraph.CreateBottomChild($1,"error",$2)
    Arbolgraph.SetLabel(`ConfTagiguracion.configuraciones=[]; new Error()`)
  }
;

LIST_TREEAttSCONF
  : LIST_TREEAttSCONF TreeAttCONF       	
    { 
      $$ = $1; $$.push($2); 
      Arbolgraph.CreateUpperParent(2,"TreeAttCONF");
      Arbolgraph.CreateUpperParent(1,"LIST_TREEAttSCONF");
      Arbolgraph.CreateBottomChild("LIST_TREEAttSCONF","TreeAttCONF")  
      Arbolgraph.SetLabel(`LIST_TREEAttConf.configuraciones=LIST_TREEAttConf.configuraciones; LIST_TREEAttConf.configuraciones.push(TreeAttConf.configuracion)`)
    }
  | TreeAttCONF                			
    { 
      $$ = []; 
      $$.push($1); 
      Arbolgraph.CreateUpperParent(1,"TreeAttCONF");
      Arbolgraph.CreateBottomChild("TreeAttCONF") 
      Arbolgraph.SetLabel(`LIST_TREEAttConf.configuraciones= []; LIST_TREEAttConf.configuraciones.push(TreeAttConf.configuracion)`)
    }
  | LIST_TREEAttSCONF error             
    { 
      $$=$1; Arbolgraph.CreateUpperParent(1,"LIST_TREEAttSCONF"); Arbolgraph.CreateBottomChild("TreeAtt","error") 
      Errors.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})  
      Arbolgraph.SetLabel(`LIST_TREEAttConf.configuraciones=LIST_TREEAttConf.configuraciones; new Error()`)
    }
;

TreeAttCONF
  : TreeAttConf IgualTreeAttConf ValorTreeAttConf  
    { 
      $$ = new helpers.TreeAtt($1,$3,this._$.first_line, this._$.first_column); 
      Arbolgraph.CreateBottomChild($1,$2,$3);
      if ($1 == 'encoding') tipoCodificacion =  $3
      Arbolgraph.SetLabel(`TreeAttConf.configuracion = new Configuracion(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
    }
;


OPENTAG
	: InicioinitTag CierreinitTag					
    { 
      $$ = {tipo:$1, TreeAtts:[]}; 
      Arbolgraph.CreateBottomChild($1,$2) 
      Arbolgraph.SetLabel(`OPENTAG.nombre = ${$1.replace("<","")}`)
    }
	| InicioinitTag LIST_TREEAttS CierreinitTag	
    { 
      $$ = {tipo:$1, TreeAtts:$2}; Arbolgraph.CreateUpperParent(2,"LIST_TREEAttS");
      Arbolgraph.CreateBottomChild($1,"LIST_TREEAttS",$3)  
      Arbolgraph.SetLabel(`OPENTAG.nombre = ${$1.replace("<","")}; OPENTAG.env = LIST_TREEAtts.env`)
    }
  | InicioinitTag error CierreinitTag   
    { 
      Errors.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,TreeAtts:[]}
      Arbolgraph.CreateBottomChild($1,"error",$3)
      Arbolgraph.SetLabel(`OPENTAG.nombre = ${$1.replace("<","")};new Error()`)
    }
;

endTagIERRE
	: InicioendTag CierreendTag					
    { 
      $$ = $1; 
      Arbolgraph.CreateBottomChild($1,$2) 
      Arbolgraph.SetLabel(`endTagierre.nombre = ${$1.replace("</","")}`)
    }
;

SIMPLEOBJECT
	: InicioinitTag FininitTag						
    { 
      $$ = new helpers.Objeto($1,[],[],this._$.first_line, this._$.first_column); 
      Arbolgraph.CreateBottomChild($1,$2) 
      Arbolgraph.SetLabel(`SIMPLEOBJECT.val = new Etiqueta(${$1.replace("<","")})`)
    }  
	| InicioinitTag LIST_TREEAttS FininitTag		
    { 
      $$ = new helpers.Objeto($1,$2,[],this._$.first_line, this._$.first_column); 
      Arbolgraph.CreateUpperParent(2,"LIST_TREEAttS");
      Arbolgraph.CreateBottomChild($1,"LIST_TREEAttS",$3) 
      Arbolgraph.SetLabel(`SIMPLEOBJECT.val = new Etiqueta(${$1.replace("<","")},Lista_Astributos)`)
    }
  | InicioinitTag error FininitTag   
    { 
      Errors.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
      $$= {tipo:$1,TreeAtts:[]}
      Arbolgraph.CreateBottomChild($1,"error",$3)
      Arbolgraph.SetLabel(`SIMPLEOBJECT.val = new Etiqueta(${$1.replace("<","")});new Error()`)
    }
;

LIST_TREEAttS
	: LIST_TREEAttS TreeAtt							
    { 
      $$ = $1; $$.push($2); 
      Arbolgraph.CreateUpperParent(2,"TreeAtt");
      Arbolgraph.CreateUpperParent(1,"LIST_TREEAttS");
      Arbolgraph.CreateBottomChild("LIST_TREEAttS","TreeAtt") 
      Arbolgraph.SetLabel(`LIST_TREEAtts.env = LIST_TREEAtts_1.env;  LIST_TREEAtts.set(TreeAtt.valor)`)
    }
	| TreeAtt											        
    { 
      $$ = []; 
      $$.push($1); 
      Arbolgraph.CreateUpperParent(1,"TreeAtt");
      Arbolgraph.CreateBottomChild("TreeAtt")
      Arbolgraph.SetLabel(`LIST_TREEAtts.env = new Entorno("TreeAtts"); LIST_TREEAtts.env.set(TreeAtt.valor)`)
    }
  | LIST_TREEAttS error 
    { 
      $$=$1; Arbolgraph.
      CreateUpperParent(1,"LIST_TREEAttS");
      Arbolgraph.CreateBottomChild("TreeAtt","error");
      Arbolgraph.SetLabel(`LIST_TREEAtts.env=LIST_TREEAtts_1.env new Error()`)
      Errors.push({Error:'Error sintactico se recupero en ' + $2 ,tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column})
    }
;

TreeAtt
	: TreeAttEtiqueta IgualTreeAtt ValorTreeAtt		
  {
    $$ = new helpers.TreeAtt($1,$3,this._$.first_line, this._$.first_column); 
    Arbolgraph.CreateBottomChild($1,$2,$3);
    Arbolgraph.SetLabel(`TreeAtt.valor = new TreeAtt(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
;