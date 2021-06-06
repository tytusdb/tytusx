%{
	var helpers = require('./helpers')
	var atributosRaiz = []
	function objetoCorrecto (inicio, fin){
		inicio = inicio.replace('<','')
		fin = fin.replace('</','')
		return inicio === fin
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
<Etiquetai>\"[^\n\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'ValorAtributo'}
<Etiquetai>">"						{ this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						{ this.popState(); return 'FinEtiquetaI'}


"</"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*  		{ this.begin("Etiquetac"); return 'InicioEtiquetaC'}
<Etiquetac>[ \r\t]+  				{}
<Etiquetac>\n        				{}
<Etiquetac>">"						{ this.popState(); return 'CierreEtiquetaC'}


"<?"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*       	{ this.begin("EtiquetaConf"); return 'InicioEtiquetaConf'}

<EtiquetaConf>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'AtributoConf'}
<EtiquetaConf>"="             			{ return 'IgualAtributoConf'}
<EtiquetaConf>\"[^\n\"]*\"        		{ yytext = yytext.substr(1,yyleng-2); return 'ValorAtributoConf'}

<EtiquetaConf>[ \r\t]+  				{}
<EtiquetaConf>"?>"            			{ this.popState(); return 'CierreEtiquetaConf'}


<<EOF>>                 			return 'EOF';

[^<]*                       		{ return 'Texto' }

/lex

/* Asociación de operadores y precedencia */


%start ini

%% /* Definición de la gramática */

ini
	: LISTA_OBJETO EOF 									{ $$ = new helpers.Objeto("/",[],$1); return $$; }
	| ETIQUETACONFIGURACION LISTA_OBJETO EOF			{ $$ = new helpers.Objeto("/",$1,$2); return $$; }
;

LISTA_OBJETO
	: LISTA_OBJETO OBJETO								{ $$ = $1; $$.push($2.texto);}
	| OBJETO											{ $$ = $1.esTexto ? $1.texto: new Array($1.texto); }
;

OBJETO
	: OBJETODOBLE										{ $$ = { texto:$1, esTexto:false}; }
	| OBJETOSIMPLE										{ $$ = { texto:$1, esTexto:false}; }
	| Texto 											{ $$ = { texto:$1, esTexto:true}; }
;

OBJETODOBLE
	: ETIQUETAABRE ETIQUETACIERRE						{
			$$ = objetoCorrecto($1.tipo, $2) ? new helpers.Objeto($1.tipo, $1.atributos, []) : null;
		}
	| ETIQUETAABRE LISTA_OBJETO ETIQUETACIERRE 			{ 
			$$ = objetoCorrecto($1.tipo, $3) ? new helpers.Objeto($1.tipo, $1.atributos, $2) : null;
		}
;

ETIQUETACONFIGURACION
  : InicioEtiquetaConf LISTA_ATRIBUTOSCONF CierreEtiquetaConf 	{ $$ = $2; }
  | InicioEtiquetaConf CierreEtiquetaConf           			{ $$ = []; }
;

LISTA_ATRIBUTOSCONF
  : LISTA_ATRIBUTOSCONF ATRIBUTOCONF       	{ $$ = $1; $$.push($2); }
  | ATRIBUTOCONF                			{ $$ = []; $$.push($1); }
;

ATRIBUTOCONF
  : AtributoConf IgualAtributoConf ValorAtributoConf  { $$ = new helpers.Atributo($1,$3); }
;


ETIQUETAABRE
	: InicioEtiquetaI CierreEtiquetaI					{ $$ = {tipo:$1, atributos:[]};}
	| InicioEtiquetaI LISTA_ATRIBUTOS CierreEtiquetaI	{ $$ = {tipo:$1, atributos:$2};}
;

ETIQUETACIERRE
	: InicioEtiquetaC CierreEtiquetaC					{ $$ = $1;}
;

OBJETOSIMPLE
	: InicioEtiquetaI FinEtiquetaI						{ $$ = new helpers.Objeto($1,[],[]);}
	| InicioEtiquetaI LISTA_ATRIBUTOS FinEtiquetaI		{ $$ = new helpers.Objeto($1,$2,[]);}
;

LISTA_ATRIBUTOS
	: LISTA_ATRIBUTOS ATRIBUTO							{ $$ = $1; $$.push($2);}
	| ATRIBUTO											{ $$ = []; $$.push($1);}
;

ATRIBUTO
	: AtributoEtiqueta IgualAtributo ValorAtributo		{$$ = new helpers.Atributo($1,$3);}
;


