
/* Importacion */


%{
    /*const { Nodo } = require("../dist/xpath/instrucciones/Nodo");   
    const { Expresion } = require("../dist/xpath/instrucciones/Expresion"); 
    const { Predicado } = require("../dist/xpath/instrucciones/Predicado");    
    const { Wildcard } = require("../dist/xpath/instrucciones/Wildcard");    
    const { Axes } = require("../dist/xpath/instrucciones/Axes");    
    const { AxesPredicado } = require("../dist/xpath/instrucciones/AxesPredicado");    
    const { AST_XPATH } = require("../dist/xpath/ast/AST_XPATH");  
    const { Error } = require("../dist/xpath/reportes/Error");  */

    var list_error = [];
     //REPORTE DE ERRORES
    function addError(tipo, descripcion, line, column) {
        let gramatica = new Error(tipo,descripcion,line,column);
        //list_error.push(error);
    }
    
%}



/* Definición Léxica */
%lex
%%
\s+
 
","                                 return 't_coma';

"or"                                return 't_or';

"and"                               return 't_and';


"eq"                                return 't_eq';
"ne"                                return 't_ne';
"lt"                                return 't_lt';
"le"                                return 't_le';
"gt"                                return 't_gt';
"ge"                                return 't_ge';
"="					                return 't_igual';
"!"                                 return 't_diferente';
"<"					                return 't_menor_que';
">"					                return 't_mayor_que';
"is"                                return 't_is';

"::"                                return 't_doble_dos_puntos';
"||"                                return 't_doble_barra';
"|"                                 return 't_barra';

"to"                                return 't_to';

"+"					                return 't_suma';
"-"					                return 't_resta';

"*"                                 return 't_multiplicacion';
"div"                               return 't_div';
"idiv"                              return 't_idiv';
"mod"                               return 't_mod';

"union"                             return 't_union';


"except"                            return 't_except';

"instance"                          return 't_instance';
"of"                                return 't_of';

"treat"                             return 't_treat';
"as"                                return 't_as';

"castable"                          return 't_castable';

"cast"                              return 't_cast';

"//"				                return 't_doble_diagonal';
"/"					                return 't_diagonal';
":"                                 return 't_dos_puntos';
".."					            return 't_doble_punto';
"."					                return 't_punto';
"@"					                return 't_arroba';
"["					                return 't_corchete_izquierdo';
"]"                                 return 't_corchete_derecho';
"("					                return 't_parentesis_izquierdo';
")"					                return 't_parentesis_derecho';
"{"					                return 't_llave_izquierda';
"}"					                return 't_llave_derecha';


"$"                                 return 't_dolar';

"%"					                return 't_modulo';
"#"					                return 't_numeral';

"return"                            return 't_return';

"in"                                return 't_in';

"satisfies"                         return 't_satisfies';

"then"                              return 't_then';
"else"                              return 't_else';

"child"                             return 't_child';
"descendant"                        return 't_descendant';
"attribute"                         return 't_attribute';
"self"                              return 't_self';
"descendant-or-self"                return 't_descendant-or-self';
"following-sibling"                 return 't_following-sibling';
"following"                         return 't_following';
"namespace"                         return 't_namespace';
"parent"                            return 't_parent';
"ancestor"                          return 't_ancestor';
"preceding-sibling"                 return 't_preceding_sibling';
"preceding-sibling"                 return 't_preceding-sibling';
"preceding"                         return 't_preceding';
"ancestor-or-self"                  return 't_ancestor_or_self';
"function"                          return 't_function';
"map"                               return 't_map';
"array"                             return 't_array';
"empty-sequence"                    return 't_empty-sequence';
"item"                              return 't_item';
"node()"                              return 't_node';
"text"                              return 't_text';
"document-node"                     return 't_document-node';
"comment"                           return 't_comment';
"namespace-node"                    return 't_namespace-node';
"processing-instruction"            return 't_processing-instruction';
"schema-attribute"                  return 't_schema-attribute';
"element"                           return 't_element';
"schema-element"                    return 't_schema-element';
"?"                                 return 't_interrogacion';
"Q"                                 return 't_Q';
"x"                                 return 't_doble_comillas';
"y"                                 return 't_doble_comilla';
"not"                               return 't_not';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena' };
[0-9]+("."[0-9]+)?\b  return 'number'
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'StringLiteral';

<<EOF>>				                return 'EOF';

.					                {  list_error.push(`Error léxico`,`No se esperaba ${yytext}`,yylloc.first_line, yylloc.first_column); }

/lex



/* Asociación de operadores y precedencia */


%left 't_coma'
%left 't_or'
%left 't_and'
%left 't_doble_barra'
%left 't_doble_punto'
%left 't_doble_diagonal'
%left 't_diagonal'
%left 't_barra'
%left 't_punto'
%left 't_or'
%left 't_union' t_barra
%left 't_intersect' 't_except' 
%left 't_interrogacion'
%left 't_diagonal'
%left 't_corchete_izquierdo' 't_corchete_derecho' 't_interrogacion'

%left 't_suma' 't_resta'
%left 't_multiplicacion' 't_div'

%left 'UMINUS'

%start INICIO

%% /* Definición de la gramática */



INICIO :
OR_LISTA_NODE EOF                    
    { 
        var root = new AST_XPATH($1);
        root.setErrores(list_error);
        list_error = [];
        return root; 
    }
    ;

OR_LISTA_NODE : OR_LISTA_NODE RUTA    {$1.push($2); $$ = $1;}
    |   RUTA                           { $$ = [$1]}
;

RUTA:   LISTA_NODE t_barra      { $$ = $1; }
    |   LISTA_NODE              { $$ = $1; }
;

LISTA_NODE:  LISTA_NODE PATH {$1.push($2); $$ = $1;}
    |   PATH            { $$ = [$1]}
;

//(node,valor,axes,predicado,wildcard,tipo,fila,columna){
PATH : NODE EXPR  {$$ = new Nodo($1, null, null, $2, null, TipoX.PATH, this._$.first_line, this._$.first_column);} 
    |  NODE WILDCARD    {$$ = new Nodo($1,null,null,$2,null,TipoX.WILDCARD, this._$.first_line, this._$.first_column);} 
    |  EXPR             {$$ = new Nodo(null,$1,null,null,null,TipoX.PATH, this._$.first_line, this._$.first_column);} 
    |  NODE AXES EXPR   {$$ = new Nodo($1,$3,$2,null,null,TipoX.AXES, this._$.first_line, this._$.first_column);} 
    |  AXES EXPR        {$$ = new Nodo(null,null,$1,null,null,TipoX.AXES, this._$.first_line, this._$.first_column);} 
;

NODE:   t_doble_diagonal        {$$ = $1;}
    |   t_diagonal              {$$ = $1;}
;


EXPR: StringLiteral             {$$ = $1;}
    | t_arroba StringLiteral    {$$ = $2;}
    | t_doble_punto             {$$ = $1;}
    | t_punto                   {$$ = $1;}
    | PREDICATES                {$$ = $1;}
;

WILDCARD:   t_multiplicacion    {$$ = $1;}
    | t_arroba t_multiplicacion {$$ = $1 + $2;}
    | node                      {$$ = $1;}
;

AXES :  ancestor t_doble_dos_puntos             { $$ = $1;}
    |   t_ancestor_or_self t_doble_dos_puntos   { $$ = $1;}
    |   t_attribute t_doble_dos_puntos            { $$ = $1;}
    |   t_child t_doble_dos_puntos                { $$ = $1;}
    |   t_descendant t_doble_dos_puntos           { $$ = $1;}
    |   t_following t_doble_dos_puntos            { $$ = $1;}
;

PREDICATES : StringLiteral t_corchete_izquierdo EXPRESION t_corchete_derecho {$$ = new Predicado($1,$3,this._$.first_line, this._$.first_column);}
;

EXPRESION : 
	// Aritmeticas
	  EXPRESION t_suma EXPRESION		        { $$ = $1 + $3; }
	| EXPRESION t_resta EXPRESION		        { $$ = $1 - $3; }
	| EXPRESION t_multiplicacion EXPRESION		{ $$ = $1 * $3; }
	| EXPRESION t_div EXPRESION	                { $$ = $1 / $3; }
	| EXPRESION t_igual EXPRESION	            { $$ = $1 + $2+ $3; }
	| t_parentesis_izquierdo EXPRESION t_parentesis_derecho	{ $$ = $2; }
	| PRIMITIVO						            { $$ = $1; }
	;


PRIMITIVO : 
	  number 	                { $$ = $1; } //{ $$ = new Primitivo( $1, TipoPrimitivo.INT, this._$.first_line, this._$.first_column); }
	| cadena		            { $$ = $1; } //{ $$ = new Primitivo( $1,TipoPrimitivo.STRING, this._$.first_line, this._$.first_column); }
	| StringLiteral             { $$ = $1; } //{ $$ = new Primitivo( $1,TipoPrimitivo.ID,this._$.first_line, this._$.first_column); }
	| t_arroba StringLiteral    { $$ = $2; } //{ $$ = new Primitivo( $2,TipoPrimitivo,ATRIBUTO,this._$.first_line, this._$.first_column); }
	;

