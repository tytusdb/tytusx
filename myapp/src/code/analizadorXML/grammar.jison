%{
	var helpers = require('./helpers')
	
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

%%
/* Espacios en blanco */
[ \r\t]+  			{}
\n                  {}

"<"[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]*				{this.begin("Etiquetai"); return 'InicioEtiquetaI'}

<Etiquetai>[ \r\t]+  {}
<Etiquetai>\n        {}

<Etiquetai>[A-ZÑa-zñ][A-ZÑa-zñ0-9_-]* 	{ return 'AtributoEtiqueta'}
<Etiquetai>"=" 						{ return 'IgualAtributo'}
<Etiquetai>\"[^\n\"]*\"				{ return 'ValorAtributo'}
<Etiquetai>">"						{ this.popState(); return 'CierreEtiquetaI'}
<Etiquetai>"/>"						{ this.popState(); return 'FinEtiquetaI'}


"</"[A-ZÑa-zñ][A-ZÑa-zñ0-9]*  			{ this.begin("Etiquetac"); return 'InicioEtiquetaC'}
<Etiquetac>[ \r\t]+  {}
<Etiquetac>\n        {}
<Etiquetac>">"						{ this.popState(); return 'CierreEtiquetaC'}

<<EOF>>                 return 'EOF';

[^<]*                       { return 'Texto' }
/lex

/* Asociación de operadores y precedencia */


%start ini

%% /* Definición de la gramática */

ini
	: LISTA_OBJETO EOF 									{ $$ = new helpers.Objeto("/",[],$1); return $$; }
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
			$$ = objetoCorrecto($1.tipo, $2) ? new helpers.Objeto($1.tipo, [], []) : null;
		}
	| ETIQUETAABRE LISTA_OBJETO ETIQUETACIERRE 			{ 
			$$ = objetoCorrecto($1.tipo, $3) ? new helpers.Objeto($1.tipo, [], $2) : null;
		}
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


