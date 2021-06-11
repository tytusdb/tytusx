/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex
%options case-insensitive



%%




"//"				return 'doblediagonal';
"/"					return 'diagonal';
"("					return 'para';
")"					return 'parc';
"["					return 'corabre';
"]"					return 'corcierra';
"::"				return 'dospuntos';

"|"                 return 'union';
"+"                 return 'suma';
"-"                 return 'resta';
"*"                 return 'multiplicacion';
"div"               return 'division';
"="                 return 'igual';
"!="                return 'distinto';
"<="				return 'menorigualque';
">="				return 'mayorigualque';
"<"					return 'menorque';
">"					return 'mayorque';
"and"			    return 'and';
"or"				return 'or';
"mod"				return 'mod';
".."                return 'doblepunto';
"."                 return 'punto';
"@"                 return 'arroba';
"node()"            return 'nodo';
"text()"            return 'texto';
"last()"            return 'siguiente';
"position()"        return 'posicion';

"ancestor"          return 'ancestros';
"ancestor-or-self"  return 'ancestroself';
"attribute"         return 'atributos';
"child"             return 'hijos';
"descendant"        return 'descendiente';
"descendant-or-self" return 'descendienteself';
"following"          return 'siguientes';
"following-sibling"  return 'siguientehermano';
"namespace"          return 'espacionombres';
"parent"             return 'padre';
"preceding"          return 'anterior';
"preceding-sibling"  return 'hemanoanterior';
"self"               return 'mismo';




/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b				return 'entero';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';

<<EOF>>				return 'EOF';

.					{ //console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        let errores = new NodoError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', 'XML', yylloc.first_line, yylloc.first_column);
                        erroreslexicos.setError(errores);
                    }
/lex



/* Asociación de operadores y precedencia */

%left 'para' 'parc'
%left 'or' 
%left 'and'
%left 'menorque' 'menorigualque' 'mayorque' 'mayorigualque' 'distinto' 'igual' 'dospuntos'
%left 'suma' 'resta' 
%left 'multiplicacion' 'division' 'mod'
//%left 'plus' 'minus'
//%left 'times' 'div' 'mod'
//%left 'pow'
//%left 'not'
//%left UMINUS

%start ini

%% /* Definición de la gramática */

ini
	: LISTARUTAS EOF { $$ = $1;  
        rg_path.setValor('inicio -> EXML LISTARUTAS;\n');
        return $$; }
;

LISTARUTAS: RUTA union LISTARUTAS               { 
        rg_path.setValor('LISTARUTAS -> RUTA LISTARUTAS;\n');
}
            |RUTA{
                rg_path.setValor('LISTARUTAS -> RUTA ;\n');
                $$ = $1;}
            | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

RUTA: diagonal  DATO MOSTRAR RUTA2      { 
        rg_path.setValor('RUTA -> / DATO MOSTRAR RUTA2;\n');
}
    |doblediagonal  DATO MOSTRAR RUTA2      { 
        rg_path.setValor('RUTA -> // DATO MOSTRAR RUTA2;\n');
    }
    |DATO MOSTRAR RUTA2               { 
        rg_path.setValor('RUTA -> DATO MOSTRAR RUTA2;\n');
    };
/*
RUTA1:diagonal  DATO MOSTRAR RUTA2      { $$ = $1+''+ $2+''+$3+''+$4+''+$5;}
    | DATO MOSTRAR RUTA2               { $$ = $1+''+ $2+''+$3+''+$4;};
*/

RUTA2: diagonal  DATO MOSTRAR RUTA2     { 
        rg_path.setValor('RUTA2 -> / DATO MOSTRAR RUTA2;\n');
}
        |doblediagonal DATO MOSTRAR RUTA2     { 
                rg_path.setValor('RUTA2 -> // DATO MOSTRAR RUTA2;\n');
        }
        | {rg_path.setValor('RUTA2 -> epsilon;\n');}    ;

DATO: identificador         { rg_path.setValor('DATO -> identificador;\n'); $$ = $1;}
    |multiplicacion         { rg_path.setValor('DATO -> multiplicacion;\n'); $$ = $1;}
    |arroba TODOATRIBUTO    { rg_path.setValor('DATO -> @ TODOATRIBUTO;\n'); $$ = $1+''+$2;}
    |punto                  { rg_path.setValor('DATO -> punto;\n'); $$ = $1;}
    |doblepunto             { rg_path.setValor('DATO -> doblepunto;\n'); $$ = $1;}
    |siguiente              { rg_path.setValor('DATO -> siguiente;\n'); $$=$1;}
    |texto                  { rg_path.setValor('DATO -> texto;\n'); $$=$1;}
    |nodo                   { rg_path.setValor('DATO -> nodo;\n'); $$=$1;}
    |posicion               { rg_path.setValor('DATO -> posicion;\n'); $$=$1;}
    | RESERVADAS dospuntos DATO1 { rg_path.setValor('DATO -> RESERVADS :: DATO1 ;\n'); };

RESERVADAS: ancestros            {  rg_path.setValor('RESERVADAS -> ancestros;\n'); $$=$1;}
        |ancestroself            {  rg_path.setValor('RESERVADAS -> ancestroself;\n'); $$=$1;}
        |atributos               {  rg_path.setValor('RESERVADAS -> atributos;\n'); $$=$1;}
        |hijos                   {  rg_path.setValor('RESERVADAS -> hijos;\n'); $$=$1;}
        |descendiente            {  rg_path.setValor('RESERVADAS -> descendiente;\n'); $$=$1;}
        |descendienteself        {  rg_path.setValor('RESERVADAS -> descendienteself;\n'); $$=$1;}
        |siguientes              {  rg_path.setValor('RESERVADAS -> siguientes;\n'); $$=$1;}
        |siguientehermano        {  rg_path.setValor('RESERVADAS -> siguientehermano;\n'); $$=$1;}
        |espacionombres          {  rg_path.setValor('RESERVADAS -> espacionombres;\n'); $$=$1;}
        |padre                   {  rg_path.setValor('RESERVADAS -> padre;\n'); $$=$1;}
        |anterior                {  rg_path.setValor('RESERVADAS -> anterior;\n'); $$=$1;}
        |hemanoanterior          {  rg_path.setValor('RESERVADAS -> hemanoanterior;\n'); $$=$1;}
        |mismo                   {  rg_path.setValor('RESERVADAS -> mismo;\n'); $$=$1;};

DATO1: identificador         { rg_path.setValor('DATO1 -> identificador;\n');$$ = $1;}
    |multiplicacion         { rg_path.setValor('DATO1 -> multiplicacion;\n'); $$ = $1;}
    |arroba TODOATRIBUTO   { rg_path.setValor('DATO1 -> @ TODOATRIBUTO;\n'); $$ = $1+''+$2;}
    |siguiente              {  rg_path.setValor('DATO1 -> siguiente;\n'); $$=$1;}
    |texto                  {  rg_path.setValor('DATO1 -> texto;\n'); $$=$1;}
    |nodo                   {  rg_path.setValor('DATO1 -> nodo;\n'); $$=$1;};

TODOATRIBUTO: multiplicacion {  rg_path.setValor('TODOATRIBUTO -> multiplicacion;\n'); $$=$1;}
            | identificador  {  rg_path.setValor('TODOATRIBUTO -> identificador;\n'); $$=$1;};

/*
ESATRIBUTO: arroba {$$=$1;}
        |   {$$='';};*/


MOSTRAR: corabre OPEOCOND corcierra MOSTRAR { rg_path.setValor('MOSTRAR -> [ OPEOCOND ]  MOSTRAR;\n');}
        |                           { rg_path.setValor('MOSTRAR -> epsilon;\n'); $$ = '';};

OPEOCOND: CONDICION                 { rg_path.setValor('OPEOCOND -> identificador;\n'); $$ = $1;};

CONDICION:CONDICION or CONDICION                {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION and CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_IGUAL, TIPO_EXPRESION.OP_OR, this._$.first_line, this._$.first_column);}
        | CONDICION and CONDICION               {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION or CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_IGUAL, TIPO_EXPRESION.OP_AND, this._$.first_line, this._$.first_column);}
        | CONDICION igual CONDICION             {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION = CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_IGUAL, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION mayorigualque CONDICION     {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION >= CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MAYOR_IGUAL, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION menorigualque CONDICION     {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION <= CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MENOR_IGUAL, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION menorque CONDICION          {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION < CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MENOR_QUE, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION mayorque CONDICION          {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION > CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MAYOR_QUE, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION distinto CONDICION          {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION != CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_NO_IGUAL, TIPO_EXPRESION.OP_RELACIONAL, this._$.first_line, this._$.first_column);}
        | CONDICION suma  CONDICION             {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION + CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_SUMA, TIPO_EXPRESION.OP_ARITMETICA, this._$.first_line, this._$.first_column);}
        | CONDICION resta CONDICION             {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION - CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_RESTA, TIPO_EXPRESION.OP_ARITMETICA, this._$.first_line, this._$.first_column);}
        | CONDICION multiplicacion CONDICION    {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION * CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MULTIPLICACION, TIPO_EXPRESION.OP_ARITMETICA, this._$.first_line, this._$.first_column);}
        | CONDICION division CONDICION          {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION / CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_DIVISION, TIPO_EXPRESION.OP_ARITMETICA, this._$.first_line, this._$.first_column);}
        | CONDICION mod CONDICION               {rg_path.setValor('OPEOCCONDICIONOND -> CONDICION % CONDICION;\n');
                                                        $$ = nodoOperacionBinaria($1,$3,TIPO_OPERACION.OP_MODULAR, TIPO_EXPRESION.OP_ARITMETICA, this._$.first_line, this._$.first_column);}
        | para CONDICION parc                   {rg_path.setValor('OPEOCCONDICIONOND -> ( CONDICION ) ;\n');
                                                        $$ = $2; }
        |   entero                              {rg_path.setValor('OPEOCCONDICIONOND ->  entero;\n');
                                                        $$ = nodoDato($1, TIPO_PRIMITIVO.ENTERO);}
        |   decimal                             {rg_path.setValor('OPEOCCONDICIONOND ->  decimal;\n');
                                                        $$ = nodoDato($1, TIPO_PRIMITIVO.DECIMAL);}
        |   cadena                              {rg_path.setValor('OPEOCCONDICIONOND ->  cadena;\n');
                                                        $$ = nodoDato($1, TIPO_PRIMITIVO.CADENA);}
        //|   identificador                    { $$ = $1; }
        //|   punto                            {  $$=$1;}
        //|   doblepunto                       {  $$=$1;}
        //|   arroba identificador             { $$ = $1+''+$2;}
        //|   siguiente                            {  $$=$1;}
        //|   texto                            {  $$=$1;}
        |   RUTA                            {  $$=$1;};
        //|   nodo                            {  $$=$1;};

  /*      
CONDICION: CONDICION1 or CONDICION                  { $$ = $1+'or'+$3;}
        |  CONDICION1 and CONDICION                 { $$ = $1+'and'+$3;}
        |  CONDICION1                               { $$ = $1;};

CONDICION1: EXPRESION igual CONDICION1             { $$ = $1+'='+$3;}
        |   EXPRESION mayorigualque CONDICION1     { $$ = $1+'>='+$3;}
        |   EXPRESION menorigualque CONDICION1     { $$ = $1+'<='+$3;}
        |   EXPRESION menorque CONDICION1          { $$ = $1+'<'+$3;}
        |   EXPRESION mayorque CONDICION1          { $$ = $1+'>'+$3;}
        |   EXPRESION distinto CONDICION1          { $$ = $1+'!='+$3;}
        |   EXPRESION dospuntos CONDICION1          { $$ = $1+'!='+$3;}
        |   EXPRESION                              { $$ = $1;};

EXPRESION:  T suma  EXPRESION        { $$ = $1+'+'+$3;}
        |   T resta EXPRESION       { $$ = $1+'-'+$3;}
        |   T                       { $$ = $1;};

        T: F multiplicacion T               { $$ = $1+'*'+$3;}
        | F division T                     { $$ = $1+'div'+$3;}
        | F                                { $$ = $1;};               

        F:entero                           { $$ = $1; }
        |decimal                          { $$ = $1; }
        |cadena                           { $$ = $1; }
        |identificador                    { $$ = $1; }
        |arroba identificador             { $$ = $1+''+$2;};



CONDICION2: identificador           { $$ = $1; }
        |   entero                  { $$ = $1; }
        |   decimal                 { $$ = $1; }
        |   cadena                  { $$ = $1; }
        |   arroba identificador    { $$ = $1+''+$2;};
*/