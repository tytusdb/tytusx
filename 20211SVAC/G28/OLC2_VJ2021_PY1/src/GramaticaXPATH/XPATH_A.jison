%{
	const {Nodo} = require("../Expresiones/Nodo");
	const {Consulta} = require("../Expresiones/Consulta");
	const {Error} = require("../Expresiones/Error");

	var ListaAuxiliar = [];
	var Aux = "";

	function Invertir(Cabeza){
		ListaAuxiliar = new Array();
		Aux = Cabeza;
		while(Aux!=""){
			ListaAuxiliar.push(Aux);
			Aux = Aux.Secuencia;
		}
		ListaAuxiliar[0].Secuencia = "";
		for (var i = 1; i < ListaAuxiliar.length; i++) {
			ListaAuxiliar[i].Secuencia = ListaAuxiliar[i-1];
		}
		return ListaAuxiliar[ListaAuxiliar.length-1];
	}

	var ListaErrores = [];
	var ListaConsultas = [];
    var Raiz;

%}
%lex

%options case-insensitive

%%

\s+										// Espacios

"last()"					{return 'Reservada_last';}
"position()"				{return 'Reservada_position';}
"div"						{return 'Reservada_div';}
"or"						{return 'Reservada_or';}
"and"						{return 'Reservada_and';}
"mod"						{return 'Reservada_mod';}
"node()"					{return 'Reservada_Node';}
"text()"					{return 'Reservada_Text';}
"ancestor::"				{return 'Reservada_ancestor';}
"ancestor-or-self::"		{return 'Reservada_ancestor-or-self';}
"attribute::"				{return 'Reservada_attribute';}
"child::"					{return 'Reservada_child';}
"descendant::"				{return 'Reservada_descendant';}
"descendant-or-self::"		{return 'Reservada_descendant-or-self';}
"following::"				{return 'Reservada_following';}
"following-sibling::"		{return 'Reservada_following-sibling';}
"namespace::"				{return 'Reservada_namespace';}
"parent::"					{return 'Reservada_parent';}
"preceding::"				{return 'Reservada_preceding';}
"preceding-sibling::"		{return 'Reservada_preceding-sibling';}
"self::"					{return 'Reservada_self';}

'||'						{return 'Simbolo_Doble_AND';}
'|'							{return 'Simbolo_AND';}
'+'							{return 'Simbolo_Mas';}
'-'							{return 'Simbolo_Menos';}
'*'							{return 'Simbolo_Asterisco';}
'//'						{return 'Simbolo_Barra_Doble';}
'/'							{return 'Simbolo_Barra';}
'='							{return 'Simbolo_Igual';}
'>='						{return 'Simbolo_Mayor_Igual';}
'>'							{return 'Simbolo_Mayor';}
'<='						{return 'Simbolo_Menor_Igual';}
'<'							{return 'Simbolo_Menor';}
'!='						{return 'Simbolo_Distinto';}
'('							{return 'Simbolo_Abrir_Parentesis';}
')'							{return 'Simbolo_Cerrar_Parentesis';}
'['							{return 'Simbolo_Abrir_Corchete';}
']'							{return 'Simbolo_Cerrar_Corchete';}
'@'							{return 'Simbolo_Arroba';}
'..'						{return 'Simbolo_Doble_Punto';}
'.'							{return 'Simbolo_Punto';}

\"[^\"]*\"					{yytext = yytext.substr(1,yyleng-2); return 'Cadena'; }
\'[^\"]*\'					{yytext = yytext.substr(1,yyleng-2); return 'Caracter'; }
[0-9]+("."[0-9]+)\b 	 	{return 'Decimal';}
[0-9]+\b					{return 'Entero';}
([a-zA-Z])[a-zA-Z0-9_]*		{return 'ID';}


<<EOF>>				return 'EOF';

.					{ListaErrores.push(new Error('Lexico', yytext, "Simbolo no perteneciente al lenguaje", yylloc.first_line, yylloc.first_column));}

/lex


%{%}


/* Asociación de operadores y precedencia */
%left 'Reservada_or' 'Reservada_and'
%left 'Simbolo_Igual' 'Simbolo_Mayor_Igual' 'Simbolo_Mayor' 'Simbolo_Menor_Igual' 'Simbolo_Menor' 'Simbolo_Distinto'
%left 'Simbolo_Mas' 'Simbolo_Menos'
%left 'Simbolo_Asterisco' 'Reservada_div' 'Reservada_mod'
%left UMINUS

%start INICIO

%% /* Definición de la gramática */

INICIO
	: LISTA_CONSULTA EOF
	{
		$$=new Nodo("Inicio","");
        $$.Hijos.push($1);
        Raiz=$$;
        var retorno={
			raiz:Raiz,
			Errores: ListaErrores,
			Consultas: ListaConsultas,
        };
        ListaErrores = new Array();
		ListaConsultas = new Array();
        return retorno;
	}
	| error EOF {
        ListaErrores.push(new Error("Sintactico", yytext, "Token inesperado", this._$.first_line, this._$.first_column));
        $$=new Nodo("Inicio","");
        Raiz=$$;
        var retorno={
          raiz:Raiz,
          Errores: ListaErrores,
		  Consultas: ListaConsultas,
        };
        ListaErrores = new Array();
		ListaConsultas = new Array();
        return retorno;
      }
;

LISTA_CONSULTA: LISTA_CONSULTA Simbolo_AND SECUENCIA
				{
					$$=new Nodo("Lista_Consulta", "");
					$$.Hijos.push($1);
					$$.Hijos.push(new Nodo("|", ""));
					$$.Hijos.push($3);
					ListaConsultas.push(Invertir($3.Valor));
				}
			  | SECUENCIA
			  	{
					$$=new Nodo("Lista_Consulta", "");
					$$.Hijos.push($1);
					ListaConsultas.push(Invertir($1.Valor));
				}
;

SECUENCIA: SECUENCIA RELATIVO_S AXIS POSICION PREDICADO
			{
				$$=new Nodo("Secuencia", "");
				$$.Hijos.push($1);
				$$.Hijos.push($2);
				$$.Hijos.push($3);
				$$.Hijos.push($4);
				$$.Hijos.push($5);
				$$.Valor = new Consulta($2.Valor, $3.Valor, $4, $5, $1.Valor);
			}
         | RELATIVO AXIS POSICION PREDICADO
		 	{
				$$=new Nodo("Secuencia", "");
				$$.Hijos.push($1);
				$$.Hijos.push($2);
				$$.Hijos.push($3);
				$$.Hijos.push($4);
				$$.Valor = new Consulta($1.Valor, $2.Valor, $3, $4, "");
			}
;

RELATIVO_S: Simbolo_Barra 			{$$=new Nodo("Relativo_S", ""); $$.Hijos.push(new Nodo("/", ""));}
		  | Simbolo_Barra_Doble 	{$$=new Nodo("Relativo_S", ""); $$.Hijos.push(new Nodo("//", ""));}
;

RELATIVO: Simbolo_Barra		 	{$$=new Nodo("Relativo", "/"); $$.Hijos.push(new Nodo("/", ""));}
		| Simbolo_Barra_Doble 	{$$=new Nodo("Relativo", "//"); $$.Hijos.push(new Nodo("//", ""));}
		|						{$$=new Nodo("Relativo", "");}
;

AXIS
	: Reservada_ancestor 				{$$=new Nodo("Axis", "ancestor"); $$.Hijos.push(new Nodo("ancestor", ""));}
    | Reservada_ancestor-or-self 		{$$=new Nodo("Axis", "ancestor-or-self"); $$.Hijos.push(new Nodo("ancestor-or-self", ""));}
    | Reservada_attribute 				{$$=new Nodo("Axis", "attribute"); $$.Hijos.push(new Nodo("attribute", ""));}
    | Reservada_child 					{$$=new Nodo("Axis", "child"); $$.Hijos.push(new Nodo("child", ""));}
    | Reservada_descendant 				{$$=new Nodo("Axis", "descendant"); $$.Hijos.push(new Nodo("descendant", ""));}
    | Reservada_descendant-or-self 		{$$=new Nodo("Axis", "descendant-or-self"); $$.Hijos.push(new Nodo("descendant-or-self", ""));}
    | Reservada_following 				{$$=new Nodo("Axis", "following"); $$.Hijos.push(new Nodo("following", ""));}
    | Reservada_following-sibling 		{$$=new Nodo("Axis", "following-sibling"); $$.Hijos.push(new Nodo("following-sibling", ""));}
    | Reservada_namespace 				{$$=new Nodo("Axis", "namespace"); $$.Hijos.push(new Nodo("namespace", ""));}
    | Reservada_parent 					{$$=new Nodo("Axis", "parent"); $$.Hijos.push(new Nodo("parent", ""));}
    | Reservada_preceding 				{$$=new Nodo("Axis", "preceding"); $$.Hijos.push(new Nodo("preceding", ""));}
    | Reservada_preceding-sibling 		{$$=new Nodo("Axis", "preceding-sibling"); $$.Hijos.push(new Nodo("preceding-sibling", ""));}
    | Reservada_self 					{$$=new Nodo("Axis", "self"); $$.Hijos.push(new Nodo("self", ""));}
    | 									{$$=new Nodo("Axis", "");}
;

POSICION: ID 						{$$=new Nodo("Posicion", "ID"); $$.Hijos.push(new Nodo("ID", $1));}
		| Simbolo_Asterisco 		{$$=new Nodo("Posicion", "*"); $$.Hijos.push(new Nodo("*", ""));}
		| Reservada_Node 			{$$=new Nodo("Posicion", "node()"); $$.Hijos.push(new Nodo("node()", ""));}
		| Reservada_Text 			{$$=new Nodo("Posicion", "Text()"); $$.Hijos.push(new Nodo("Text()", ""));}
		| Simbolo_Arroba SELECTF 	{$$=new Nodo("Posicion", "@"); $$.Hijos.push(new Nodo("@", "")); $$.Hijos.push($2);}
		| Simbolo_Punto				{$$=new Nodo("Posicion", "."); $$.Hijos.push(new Nodo(".", ""));}
		| Simbolo_Doble_Punto		{$$=new Nodo("Posicion", ".."); $$.Hijos.push(new Nodo("..", ""));}
;
	
PREDICADO: Simbolo_Abrir_Corchete VALOR Simbolo_Cerrar_Corchete
		   	{
				$$=new Nodo("Predicado", $2);
				$$.Hijos.push(new Nodo("[", ""));
				$$.Hijos.push($2);
				$$.Hijos.push(new Nodo("]", ""));
		   	}
	 	 | 	{$$=new Nodo("Predicado", "");}
;

VALOR: VALOR Reservada_or VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("or", "")); $$.Hijos.push($3);}
     | VALOR Reservada_and VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("and", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Mayor VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo(">", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Mayor_Igual VALOR 		{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo(">=", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Menor VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("<", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Menor_Igual VALOR	 	{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("<=", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Igual VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("=", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Distinto VALOR 		{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("!=", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Mas VALOR	 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("+", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Menos VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("-", "")); $$.Hijos.push($3);}
     | VALOR Simbolo_Asterisco VALOR 		{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("*", "")); $$.Hijos.push($3);}
     | VALOR Reservada_div VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("div", "")); $$.Hijos.push($3);}
     | VALOR Reservada_mod VALOR 			{$$=new Nodo("VALOR", ""); $$.Hijos.push($1); $$.Hijos.push(new Nodo("mod", "")); $$.Hijos.push($3);}
     | VALORES 								{$$=new Nodo("VALOR", ""); $$.Hijos.push($1);}
;

VALORES: Entero	 				{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("Entero", $1));}
 	   | Decimal	 			{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("Entero", $1));}
 	   | Reservada_last 		{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("last()", ""));}
 	   | Reservada_position  	{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("position()", ""));}
	   | Reservada_Node			{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("node()", ""));}
	   | Reservada_Text			{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("text()", ""));}
 	   | ID 					{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("ID", $1));}
 	   | Simbolo_Arroba SELECTF {$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("@", "")); $$.Hijos.push($2);}
 	   | Simbolo_Abrir_Parentesis VALOR Simbolo_Cerrar_Parentesis 
	  							{
									$$=new Nodo("Valores", "");
									$$.Hijos.push(new Nodo("(", ""));
									$$.Hijos.push($2);
									$$.Hijos.push(new Nodo(")", ""));
								}
	   | Cadena 				{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("Cadena", $1));}
       | Caracter				{$$=new Nodo("Valores", ""); $$.Hijos.push(new Nodo("Cadena", $1));}
;

SELECTF: ID 			 	{$$=new Nodo("SelectF", ""); $$.Hijos.push(new Nodo("ID", $1));}
       | Simbolo_Asterisco 	{$$=new Nodo("SelectF", ""); $$.Hijos.push(new Nodo("*", ""));}
;