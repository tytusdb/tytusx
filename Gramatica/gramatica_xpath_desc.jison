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
%left'and'
%left 'menorque' 'menorigualque' 'mayorque' 'mayorigualque' 'distinto' 'igual'
%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod' 
%left 'para' 'parc'

%start ini

%% /* Definición de la gramática */

ini
	: LISTARUTAS EOF { $$ = $1; console.log($$); return $$; }
;

LISTARUTAS: RUTA union LISTARUTAS               { $$ = $1+'|'+ $3;}
            |RUTA                               { $$ = $1;}
            |error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

RUTA: diagonal  DATO MOSTRAR RUTA2      { $$ = $1+''+ $2+''+$3+''+$4;}
    |doblediagonal  DATO MOSTRAR RUTA2      { $$ = $1+''+ $2+''+$3+''+$4;}
    |DATO MOSTRAR RUTA2               { $$ = $1+''+ $2+''+$3;};


RUTA2: diagonal  DATO MOSTRAR RUTA2     { $$ = $1+''+ $2+''+$3+''+$4;}
        |doblediagonal DATO MOSTRAR RUTA2     { $$ = $1+''+ $2+''+$3+''+$4;}
        |                                        {$$='';}    ;

DATO: identificador         { $$ = $1;}
    |multiplicacion         { $$ = $1;}
    |arroba TODOATRIBUTO   { $$ = $1+''+$2;}
    |punto                  { $$ = $1;}
    |doblepunto             { $$ = $1;}
    |siguiente              {  $$=$1;}
    |texto                  {  $$=$1;}
    |nodo                   {  $$=$1;}
    |posicion               {  $$=$1;}
    | RESERVADAS dospuntos DATO1 { $$ = $1+'::'+$3;};

RESERVADAS:ancestros        {  $$=$1;}
        |ancestroself       {  $$=$1;}
        |atributos          {  $$=$1;}
        |hijos              {  $$=$1;}
        |descendiente       {  $$=$1;}
        |descendienteself   {  $$=$1;}
        |siguientes         {  $$=$1;}
        |siguientehermano   {  $$=$1;}
        |espacionombres     {  $$=$1;}
        |padre              {  $$=$1;}
        |anterior           {  $$=$1;}
        |hemanoanterior     {  $$=$1;}
        |mismo              {  $$=$1;};

DATO1: identificador        { $$ = $1;}
    |multiplicacion         { $$ = $1;}
    |arroba TODOATRIBUTO    { $$ = $1+''+$2;}
    |siguiente              {  $$=$1;}
    |texto                  {  $$=$1;}
    |posicion               {  $$=$1;}
    |nodo                   {  $$=$1;};

TODOATRIBUTO: multiplicacion {  $$=$1;}
            | identificador  {  $$=$1;};



MOSTRAR: corabre OPEOCOND corcierra MOSTRAR { $$ = $1+' '+ $2+' '+$3+' '+$4;}
        |                           { $$ = '';};

OPEOCOND: CONDICION                 { $$ = $1;};


CONDICION: CONDICION1 or CONDICION                  { $$ = $1+'or'+$3;}
        |  CONDICION1 and CONDICION                 { $$ = $1+'and'+$3;}
        |  CONDICION1                               { $$ = $1;};

CONDICION1: EXPRESION igual CONDICION1             { $$ = $1+'='+$3;}
        |   EXPRESION mayorigualque CONDICION1     { $$ = $1+'>='+$3;}
        |   EXPRESION menorigualque CONDICION1     { $$ = $1+'<='+$3;}
        |   EXPRESION menorque CONDICION1          { $$ = $1+'<'+$3;}
        |   EXPRESION mayorque CONDICION1          { $$ = $1+'>'+$3;}
        |   EXPRESION distinto CONDICION1          { $$ = $1+'!='+$3;}
        |   EXPRESION                              { $$ = $1;};

EXPRESION:  T suma  EXPRESION        { $$ = $1+'+'+$3;}
        |   T resta EXPRESION       { $$ = $1+'-'+$3;}
        |   T                       { $$ = $1;};

        T: F multiplicacion T               { $$ = $1+'*'+$3;}
        | F division T                     { $$ = $1+'div'+$3;}
        | F                                { $$ = $1;};

        F:entero                            { $$ = $1; }
        |decimal                            { $$ = $1; }
        |cadena                             { $$ = $1; }
        |RUTA                               { $$ = $1; }
        |para CONDICION parc                { $$ = '('+$2+')';};


/