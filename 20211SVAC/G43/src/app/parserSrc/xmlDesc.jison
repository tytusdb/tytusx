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

<initTag>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* { return 'att1'}
<initTag>"=" 						{ return 'att2'}
<initTag>\"[^\n\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'att3'}
<initTag>[^A-ZÑa-zñ_=">/]+   { Errors.push({Error:'Lex Error:' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<initTag>">"						{ this.popState(); return 'att4'}
<initTag>"/>"						{ this.popState(); return 'att5'}


<initTag>[ \r\t]+  {}
<initTag>\n        {}
"</"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*  		{ this.begin("endTag"); return '-endTag'}
<endTag>[ \r\t]+  				{}
<endTag>\n        				{}
<endTag>[^>]+            { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<endTag>">"	



					  { this.popState(); return 'att6'}
<ConfTag>[ \r\t]+  				          {}
<ConfTag>[^A-ZÑa-zñ_="?>]+           { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lex Err", Linea: yylloc.first_line , columna:yylloc.first_column}) }
<ConfTag>"?>"            			      { this.popState(); return 'att11'}

"<?"[A-ZÑa-zñ_][A-ZÑa-zñ0-9_-]*       	{ this.begin("ConfTag"); return 'att7'}

<ConfTag>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'att8'}
<ConfTag>"="             			      { return 'att9'}
<ConfTag>\"[^\n\"]*\"        		    { yytext = yytext.substr(1,yyleng-2); return 'att10'}


<<EOF>>                 			return 'att12';

[^<]+                       	{ yytext = ReemplazaTexto(yytext); return 'att13' }
.                             { Errors.push({Error:'Lex Error: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }
/lex




%start ini

%% 

ini
  : Body  
  {
    $$=$1; AttGraphz.CreateUpperParent(1, "INICIO");AttGraphz.CreateBottomChild("INICIO");
    var retornoErrores = Object.assign([], Errors);
    Errors = [];
    var retornoAttGraphz = Object.assign({}, AttGraphz);
    AttGraphz = new AttGraphzCST();
    return {datos:$1,nodes:retornoAttGraphz.pilaNodos,edges:retornoAttGraphz.PilaEdges,tabla:retornoAttGraphz.TablaGramatica,errores:retornoErrores}
  }
  | error 
    {
      Errors.push({Error:'Error sintactico irrecuperable',tipo:"Semantico", Linea: this._$.first_line , columna: this._$.first_column}) 
      var retornoErrores = Object.assign([], Errors);
      Errors = [];
      var retornoAttGraphz = Object.assign({}, AttGraphz);
      AttGraphz = new AttGraphzCST();
      return {datos:[],edges:[],nodes:[], tabla:[], errores:Errors}
    }
;

Body
	: ObjAtt_List EOF 									                  { 
    $$ = new helpers.subObject("/",[],$1,this._$.first_line, this._$.first_column);  
    AttGraphz.CreateUpperParent(1, "ObjAtt_List");
    AttGraphz.CreateBottomChild("ObjAtt_List");
    AttGraphz.SetLabel("Body.entorno = ListasubObject.entorno")
    }
  | confTag ObjAtt_List EOF		          
  { $$ = new helpers.subObject("/",$1,$2,this._$.first_line, this._$.first_column); 
    AttGraphz.CreateUpperParent(2, "ObjAtt_List");
    AttGraphz.CreateUpperParent(1, "confTag");
    AttGraphz.CreateBottomChild("confTag","ObjAtt_List")
    AttGraphz.SetLabel("Body.configs = EtiquetaConfigs.configs; Body.entorno = ListasubObject.entorno");
  }
;

ObjAtt_List
	: subObject SUB_ObjAtt_List  						                
  { 
    if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); $$.reverse(); }
    AttGraphz.CreateUpperParent(2, "SUB_ObjAtt_List");
    AttGraphz.CreateUpperParent(1, "subObject");
    AttGraphz.CreateBottomChild("subObject","SUB_ObjAtt_List");
    AttGraphz.SetLabel(`subObject.entorno.set(subObject.val)`)
  }
;

SUB_ObjAtt_List
    : subObject SUB_ObjAtt_List                           
    { 
      if ($1.esTexto) { $$ = $1.texto } else { $$=$2; $$.push($1.texto); }
      AttGraphz.CreateUpperParent(2, "SUB_ObjAtt_List");
      AttGraphz.CreateUpperParent(1, "subObject");
      AttGraphz.CreateBottomChild("subObject","SUB_ObjAtt_List");
      AttGraphz.SetLabel(`LostasubObject.entorno.set(subObject.val)`)
    }
    |                                                   
    { 
      $$ = new Array(); 
      AttGraphz.CreateBottomChild("Ɛ");
      AttGraphz.SetLabel(`ListasubObject.entorno = new Entorno();`)
    }
;

subObject
	: BaseObje									                        
  { 
    $$ = { texto:$1, esTexto:false};
    AttGraphz.CreateUpperParent(1, "BaseObje");
    AttGraphz.CreateBottomChild("BaseObje");
    AttGraphz.SetLabel("subObject.val = BaseObje.val");
  }
	| Texto 											                          
  { 
    $$ = { texto:helpers.CambiarCodificacion($1,tipoCodificacion), esTexto:true};
    AttGraphz.CreateBottomChild("Texto");
    AttGraphz.SetLabel("Texto.val=texto")  
  }
;

BaseObje
  : InicioEtiquetaI SUB_BaseObje                         
  { 
    $2.linea=this._$.first_line; $2.columna=this._$.first_column;
    $$ = subObjectCorrecto($1, $2,this._$.first_line, this._$.first_column)? $2:null;
    AttGraphz.CreateUpperParent(2, "SUB_BaseObje");
    AttGraphz.CreateBottomChild($1,"SUB_BaseObje");
    AttGraphz.SetLabel(`BaseObje.valor = ${$1} + SUB_BaseObje.valor;`);
  }
;

SUB_BaseObje
    : Atts_List CloseInTag                   
    { 
      $$=$2; $$.atributos=$1; AttGraphz.CreateUpperParent(2, "CloseInTag");
      AttGraphz.CreateUpperParent(1, "Atts_List");
      AttGraphz.CreateBottomChild("Atts_List","CloseInTag");
      AttGraphz.SetLabel("SUB_BaseObje.entorno = Atts_List.entorno; SUB_BaseObje.valor = CloseInTag.valor");
    }
    | CloseInTag                                   
    { 
      $$=$1; AttGraphz.CreateUpperParent(1, "CloseInTag");
      AttGraphz.CreateBottomChild("CloseInTag");
      AttGraphz.SetLabel(`SUB_BaseObje.valor = CloseInTag.valor;`);
    }
    | error CloseInTag                             
    { 
      $$=$1; 
      $$.atributos=[]; 
      AttGraphz.CreateUpperParent(2, "CloseInTag");
      AttGraphz.CreateBottomChild("error","CloseInTag");
      AttGraphz.SetLabel("SUB_BaseObje.valor = CloseInTag.valor; new Error();");
      Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
    }
;

CloseInTag
  : CierreEtiquetaI ObjAtt_List_Epsilon Closetag       
  { 
    $$ = new helpers.subObject("", [], $2,0,0);
    $$.setTipo($3);
    AttGraphz.CreateUpperParent(3, "Closetag");
    AttGraphz.CreateUpperParent(2, "ObjAtt_List_Epsilon");
    AttGraphz.CreateBottomChild($1,"ObjAtt_List_Epsilon","Closetag");
    AttGraphz.SetLabel(`CloseInTag.valor = ">" + ObjAtt_List_Epsilon.valor;`);
    }
  | FinEtiquetaI                                              
  { 
    $$ = new helpers.subObject("",[], [],0,0);
    AttGraphz.CreateBottomChild($1);
    AttGraphz.SetLabel(`CloseInTag.valor = "/>";`);
  }
;

Closetag
	: InicioEtiquetaC CierreEtiquetaC					            { $$ = $1; AttGraphz.CreateBottomChild($1,$2); AttGraphz.SetLabel(`Closetag.nombre = ${$1.replace("</","")}`) }
;

ObjAtt_List_Epsilon
  : ObjAtt_List                                        
  { 
    $$ = $1; AttGraphz.CreateUpperParent(1, "ObjAtt_List");
    AttGraphz.CreateBottomChild("ObjAtt_List");
    AttGraphz.SetLabel("ObjAtt_List_Epsilon.valor = ObjAtt_List.subObjects");
  } 
  |                                                     
  {
    $$ = []; AttGraphz.CreateBottomChild("Ɛ");
    AttGraphz.SetLabel("ObjAtt_List_Epsilon.valor = [];");
  } 
;

confTag
  : InicioEtiquetaConf DownConfTag 	            
  { 
    $$ = $2; AttGraphz.CreateUpperParent(2, "DownConfTag");
    AttGraphz.CreateBottomChild($1,"DownConfTag");
    AttGraphz.SetLabel(`confTag.configuraciones= DownConfTag.valor`)
  }
;

DownConfTag
  : Atts_ListCONF CierreEtiquetaConf 	            
  { 
    $$ = $1; AttGraphz.CreateUpperParent(1, "DownConfTag");
    AttGraphz.CreateBottomChild("Atts_ListCONF",$2) 
    AttGraphz.SetLabel(`DownConfTag.valor = Atts_ListConf.configuraciones;`)
  }
  | CierreEtiquetaConf           			                  
  { 
    $$ = []; AttGraphz.CreateBottomChild($1) 
    AttGraphz.SetLabel(`DownConfTag.valor = [];`)
  }
;

Atts_ListCONF
  : ATRIBUTOCONF SUB_Atts_ListCONF                
  { 
    $$=$2; $$.push($1);
    AttGraphz.CreateUpperParent(2, "SUB_Atts_ListCONF");
    AttGraphz.CreateUpperParent(1, "ATRIBUTOCONF");
    AttGraphz.CreateBottomChild("ATRIBUTOCONF","SUB_Atts_ListCONF") 
    AttGraphz.SetLabel(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion);`)
    }
  | ATRIBUTOCONF error                                  
  { 
    $$=[]; $$.push($1);
    AttGraphz.CreateUpperParent(1, "ATRIBUTOCONF");
    AttGraphz.CreateBottomChild("ATRIBUTOCONF","error");
    AttGraphz.SetLabel(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion); new Error();`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

SUB_Atts_ListCONF
  : ATRIBUTOCONF SUB_Atts_ListCONF                
  {
    $$=$2; $$.push($1);
    AttGraphz.CreateUpperParent(2, "SUB_Atts_ListCONF");
    AttGraphz.CreateUpperParent(1, "ATRIBUTOCONF");
    AttGraphz.CreateBottomChild("ATRIBUTOCONF","SUB_Atts_ListCONF");
    AttGraphz.SetLabel(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion);`)
    }
  |                                                     
  {
    $$ = []; AttGraphz.CreateBottomChild("Ɛ");
     AttGraphz.SetLabel(`Lista_AtributoConf.configuraciones= [];`)
  }
  | ATRIBUTOCONF error                                  
  { 
    $$ = []; $$.push($1); 
    AttGraphz.CreateUpperParent(1, "ATRIBUTOCONF");
    AttGraphz.CreateBottomChild("ATRIBUTOCONF","error");
    AttGraphz.SetLabel(`Lista_AtributoConf.configuraciones.push(AtributoConf.configuracion); new Error();`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column}); 
  }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf    { 
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column); 
    AttGraphz.CreateBottomChild($1,$2,$3) 
    if ($1 == 'encoding') tipoCodificacion = $3
    AttGraphz.SetLabel(`AtributoConf.configuracion = new Configuracion(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
  | AtributoConf error                                  
  { 
    $$ = []; $$.push($1);
    AttGraphz.CreateBottomChild($1,"error");
    AttGraphz.SetLabel(`AtributoConf.configuracion = new Configuracion(${$1}); new Error();`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});   
    }
;

Atts_List
	: ATRIBUTO SUB_Atts_List							          
  { 
    $$ = $2; $$.push($1);
    AttGraphz.CreateUpperParent(2,"ATRIBUTO");
    AttGraphz.CreateUpperParent(1,"SUB_Atts_List");
    AttGraphz.CreateBottomChild("ATRIBUTO","SUB_Atts_List");
    AttGraphz.SetLabel(`Atts_List.entorno.set(Atributo.valor);`)
  }
  | ATRIBUTO error                                      
  { 
    $$ = []; $$.push($1);
    AttGraphz.CreateUpperParent(1,"ATRIBUTO");
    AttGraphz.CreateBottomChild("ATRIBUTO","error"); 
    AttGraphz.SetLabel(`Atts_List.entorno.set(Atributo.valor); new Error();`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;

SUB_Atts_List
  : ATRIBUTO SUB_Atts_List                        
  {
    $$ = $2; $$.push($1);
    AttGraphz.CreateUpperParent(2, "SUB_Atts_List");
    AttGraphz.CreateUpperParent(1, "ATRIBUTO");
    AttGraphz.CreateBottomChild("ATRIBUTO","SUB_Atts_List")
    AttGraphz.SetLabel(`Atts_List.entorno.set(Atributo.valor);`)
  }
  |                                                     
  { 
    $$ = []; AttGraphz.CreateBottomChild("Ɛ");
    AttGraphz.SetLabel(`Atts_List.entorno = new Entorno("Atributos");`)
  }
  | ATRIBUTO error                                      
  { 
    $$ = []; $$.push($1);
    AttGraphz.CreateUpperParent(1, "ATRIBUTO");
    AttGraphz.CreateBottomChild("ATRIBUTO","error");
    AttGraphz.SetLabel(`Atts_List.entorno.set(Atributo.valor); new Error();`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});  
  }
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		    
  {
    $$ = new helpers.Atributo($1,$3,this._$.first_line, this._$.first_column);
    AttGraphz.CreateBottomChild($1,$2,$3)
    AttGraphz.SetLabel(`Atributo.valor = new Atributo(${$1},${$3},${this._$.first_line},${this._$.first_column})`)
  }
  | AtributoEtiqueta error                              
  { 
    $$ = null; 
    AttGraphz.CreateBottomChild($1,"error"); 
    AttGraphz.SetLabel(`new Error()`)
    Errors.push({Error:'Error sintactico recuperado en ' + yytext ,tipo:"Sintáctico", Linea: this._$.first_line , columna: this._$.first_column});
  }
;