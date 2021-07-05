
%{
  const {Nodo} = require("../Expresiones/Nodo");
	const {Consulta} = require("../Expresiones/Consulta");
	const {Error} = require("../Expresiones/Error");

	var ListaErrores = [];
  var ListaConsultas = [];
  var Raiz;
  
%}
%lex

%options case-insensitive

%%

\s+										// Espacios

"node()"					      	{return 'Reservada_Node';}
"last()"					      	{return 'Reservada_last';}
"position()"				    	{return 'Reservada_position';}
"div"						          {return 'Reservada_div';}
"or"						          {return 'Reservada_or';}
"and"						          {return 'Reservada_and';}
"mod"						          {return 'Reservada_mod';}
"text()"					      	{return 'Reservada_Text';}
"ancestor::"				    	{return 'Reservada_ancestor';}
"ancestor-or-self::"	 		{return 'Reservada_ancestor-or-self';}
"attribute::"				    	{return 'Reservada_attribute';}
"child::"					      	{return 'Reservada_child';}
"descendant::"				  	{return 'Reservada_descendant';}
"descendant-or-self::"		{return 'Reservada_descendant-or-self';}
"following::"				    	{return 'Reservada_following';}
"following-sibling::"			{return 'Reservada_following-sibling';}
"namespace::"				    	{return 'Reservada_namespace';}
"parent::"					    	{return 'Reservada_parent';}
"preceding::"				    	{return 'Reservada_preceding';}
"preceding-sibling::"			{return 'Reservada_preceding-sibling';}
"self::"					      	{return 'Reservada_self';}

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

\"[^\"]*\"					      {yytext = yytext.substr(1,yyleng-2); return 'Cadena'; }
\'[^\"]*\'					      {yytext = yytext.substr(1,yyleng-2); return 'Caracter'; }
[0-9]+("."[0-9]+)\b 	 	  {return 'Decimal';}
[0-9]+\b					        {return 'Entero';}
([a-zA-Z])[a-zA-Z0-9_]*		{return 'ID';}


<<EOF>>				return 'EOF';

.					{ListaErrores.push(new Error('Lexico', yytext, "Simbolo no perteneciente al lenguaje", yylloc.first_line, yylloc.first_column));}

/lex


%{%}


/* Asociación de operadores y precedencia */

%start INICIO

%% /* Definición de la gramática */

INICIO
      : CONSULTA LISTA_CONSULTA EOF
      {
		    $$=new Nodo("Inicio","");
        $$.Hijos.push($1);
        $$.Hijos.push($2);
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
      | error EOF{
        ListaErrores.push(new Error("Sintactico", yytext, "Token inesperado", this._$.first_line, this._$.first_column));
        $$=new Nodo("Inicio","");
        $$.Hijos.push($1);
        $$.Hijos.push($2);
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

CONSULTA: RELATIVO AXIS POSICION PREDICADO SECUENCIA
        {
          $$=new Nodo("Consulta", "");
          $$.Hijos.push($1);
          $$.Hijos.push($2);
          $$.Hijos.push($3);
          $$.Hijos.push($4);
          $$.Hijos.push($5);
          ListaConsultas.push(new Consulta($1.Valor, $2.Valor, $3, $4, $5.Valor));
			  };

LISTA_CONSULTA: Simbolo_AND CONSULTA LISTA_CONSULTA
              {
                $$=new Nodo("Lista_Consulta", "");
                $$.Hijos.push(new Nodo("|", ""));
                $$.Hijos.push($2);
                $$.Hijos.push($3);
              }
              | Simbolo_Doble_AND CONSULTA LISTA_CONSULTA
              {
                $$=new Nodo("Lista_Consulta", "");
                $$.Hijos.push(new Nodo("||", ""));
                $$.Hijos.push($2);
                $$.Hijos.push($3);
              }
	            | {$$=new Nodo("Lista_Consulta", "");}
;

RELATIVO: Simbolo_Barra		 	    {$$=new Nodo("Relativo", ""); $$.Hijos.push(new Nodo("/", ""));}
		    | Simbolo_Barra_Doble 	{$$=new Nodo("Relativo", ""); $$.Hijos.push(new Nodo("//", ""));}
		    |						            {$$=new Nodo("Relativo", "");}
;

AXIS
	  : Reservada_ancestor 				    {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("ancestor", ""));}
    | Reservada_ancestor-or-self 		{$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("ancestor-or-self", ""));}
    | Reservada_attribute 				  {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("attribute", ""));}
    | Reservada_child 					    {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("child", ""));}
    | Reservada_descendant 				  {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("descendant", ""));}
    | Reservada_descendant-or-self 	{$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("descendant-or-self", ""));}
    | Reservada_following 				  {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("following", ""));}
    | Reservada_following-sibling 	{$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("following-sibling", ""));}
    | Reservada_namespace 				  {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("namespace", ""));}
    | Reservada_parent 					    {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("parent", ""));}
    | Reservada_preceding 				  {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("preceding", ""));}
    | Reservada_preceding-sibling 	{$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("preceding-sibling", ""));}
    | Reservada_self 					      {$$=new Nodo("Axis", ""); $$.Hijos.push(new Nodo("self", ""));}
    | 									            {$$=new Nodo("Axis", "");}
;	

POSICION: ID 						          {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("ID", $1));}
		    | Simbolo_Asterisco 		  {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("*", ""));}
		    | Reservada_Node 			    {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("node()", ""));}
		    | Reservada_Text 			    {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("Text()", ""));}
		    | Simbolo_Arroba SELECTF 	{$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("@", "")); $$.Hijos.push($2);}
        | Simbolo_Punto           {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo(".", ""));}
		    | Simbolo_Doble_Punto     {$$=new Nodo("Posicion", ""); $$.Hijos.push(new Nodo("..", ""));}
;
	
PREDICADO: Simbolo_Abrir_Corchete VALOR Simbolo_Cerrar_Corchete
		   	 {
				   $$=new Nodo("Predicado", "");
				   $$.Hijos.push(new Nodo("[", ""));
				   $$.Hijos.push($2);
				   $$.Hijos.push(new Nodo("]", ""));
		   	 }
	 	     | {$$=new Nodo("Predicado", "");}
;

VALOR: C VP 
     {
				$$=new Nodo("Valor", "");
        $$.Hijos.push($1);
			  $$.Hijos.push($2);
		 };

VP: Reservada_or C VP
  {
		$$=new Nodo("VP", "");
    $$.Hijos.push(new Nodo("or", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Reservada_and C VP
  {
		$$=new Nodo("VP", "");
    $$.Hijos.push(new Nodo("and", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | {$$=new Nodo("VP", "");}
;

C: E CP
  {
		$$=new Nodo("C", "");
    $$.Hijos.push($1);
	  $$.Hijos.push($2);
	}
;

CP: Simbolo_Mayor E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo(">", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Simbolo_Mayor_Igual E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo(">=", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Simbolo_Menor E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo("<", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Simbolo_Menor_Igual E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo("<=", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}	
  | Simbolo_Igual E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo("=", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}	
  | Simbolo_Distinto E CP
  {
		$$=new Nodo("CP", "");
    $$.Hijos.push(new Nodo("!=", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}	
  | {$$=new Nodo("CP", "");}
;

E: T EP
  {
		$$=new Nodo("E", "");
    $$.Hijos.push($1);
	  $$.Hijos.push($2);
	}
;

EP: Simbolo_Mas T EP
  {
		$$=new Nodo("EP", "");
    $$.Hijos.push(new Nodo("+", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Simbolo_Menos T EP
  {
		$$=new Nodo("EP", "");
    $$.Hijos.push(new Nodo("-", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | {$$=new Nodo("EP", "");}
;

T: F TP
  {
		$$=new Nodo("T", "");
    $$.Hijos.push($1);
	  $$.Hijos.push($2);
	}
;

TP: Simbolo_Asterisco F ET
  {
		$$=new Nodo("TP", "");
    $$.Hijos.push(new Nodo("*", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Reservada_div F ET
  {
		$$=new Nodo("TP", "");
    $$.Hijos.push(new Nodo("div", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | Reservada_mod F ET
  {
		$$=new Nodo("TP", "");
    $$.Hijos.push(new Nodo("mod", ""));
    $$.Hijos.push($2);
		$$.Hijos.push($3);
	}
  | {$$=new Nodo("TP", "");}
;

F: Entero	 				        {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("Entero", $1));}
 | Decimal	 		    	    {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("Entero", $1));}
 | Reservada_last 		    {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("last()", ""));}
 | Reservada_position   	{$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("position()", ""));}
 | ID 					          {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("ID", $1));}
 | Simbolo_Arroba SELECTF {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("@", "")); $$.Hijos.push($2);}
 | Simbolo_Abrir_Parentesis VALOR Simbolo_Cerrar_Parentesis 
                          {
                            $$=new Nodo("F", "");
                            $$.Hijos.push(new Nodo("(", ""));
                            $$.Hijos.push($2);
                            $$.Hijos.push(new Nodo(")", ""));
                          }
 | Cadena 				        {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("Cadena", $1));}
 | Caracter				        {$$=new Nodo("F", ""); $$.Hijos.push(new Nodo("Cadena", $1));}
;

SELECTF: ID 			        	{$$=new Nodo("SelectF", ""); $$.Hijos.push(new Nodo("ID", $1));}
       | Simbolo_Asterisco 	{$$=new Nodo("SelectF", ""); $$.Hijos.push(new Nodo("*", ""));}
;

SECUENCIA: Simbolo_Barra SUBCONSULTA        {$$=new Nodo("Secuencia", ""); $$.Hijos.push(new Nodo("/", "")); $$.Hijos.push($2); $2.Valor.Relativo = "/"; $$.Valor = $2.Valor;}
	       | Simbolo_Barra_Doble SUBCONSULTA  {$$=new Nodo("Secuencia", ""); $$.Hijos.push(new Nodo("//", "")); $$.Hijos.push($2); $2.Valor.Relativo = "//"; $$.Valor = $2.Valor;}
         |                                  {$$=new Nodo("Secuencia", "");}
;

SUBCONSULTA: AXIS POSICION PREDICADO SECUENCIA
           {
              $$=new Nodo("Consulta", "");
              $$.Hijos.push($1);
              $$.Hijos.push($2);
              $$.Hijos.push($3);
              $$.Hijos.push($4);
              $$.Valor = new Consulta("", $1.Valor, $2, $3, $4.Valor);
			     }
;