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
	: LISTARUTAS EOF {rg_path.setValor('inicio->LISTARUTAS;\n'); $$ = $1; console.log($$); return $$; }
;

LISTARUTAS: RUTA union LISTARUTAS               {rg_path.setValor('LISTARUTAS->RUTA union LISTARUTAS;\n'); $$ = $1+'|'+ $3;}
            |RUTA                               {rg_path.setValor('LISTARUTAS->RUTA;\n'); $$ = $1;}
            |error                              { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

RUTA: diagonal  DATO MOSTRAR RUTA2              {rg_path.setValor('RUTA->/ DATO MOSTRAR RUTA2;\n'); $$ = $1+''+ $2+''+$3+''+$4;}
    |doblediagonal  DATO MOSTRAR RUTA2          {rg_path.setValor('RUTA->// DATO MOSTRAR RUTA2;\n'); $$ = $1+''+ $2+''+$3+''+$4;}
    |DATO MOSTRAR RUTA2                         {rg_path.setValor('RUTA->DATO MOSTRAR RUTA2;\n'); $$ = $1+''+ $2+''+$3;};


RUTA2: diagonal  DATO MOSTRAR RUTA2             {rg_path.setValor('RUTA2->/ DATO MOSTRAR RUTA2;\n'); $$ = $1+''+ $2+''+$3+''+$4;}
        |doblediagonal DATO MOSTRAR RUTA2       {rg_path.setValor('RUTA2->// DATO MOSTRAR RUTA2;\n'); $$ = $1+''+ $2+''+$3+''+$4;}
        |                                       {rg_path.setValor('RUTA2->epsilon;\n'); $$='';}    ;

DATO: identificador              {rg_path.setValor('DATO->identificador;\n'); $$ = $1;}
    |multiplicacion              {rg_path.setValor('DATO->multiplicacion;\n'); $$ = $1;}
    |arroba TODOATRIBUTO         {rg_path.setValor('DATO->@ TODOATRIBUTO;\n'); $$ = $1+''+$2;}
    |punto                       {rg_path.setValor('DATO->.;\n'); $$ = $1;}
    |doblepunto                  {rg_path.setValor('DATO->..;\n'); $$ = $1;}
    |siguiente                   {rg_path.setValor('DATO->siguiente;\n');  $$=$1;}
    |texto                       {rg_path.setValor('DATO->texto;\n');  $$=$1;}
    |nodo                        {rg_path.setValor('DATO->nodo;\n');  $$=$1;}
    |posicion                    {rg_path.setValor('DATO->posicion;\n');  $$=$1;}
    | RESERVADAS dospuntos DATO1 {rg_path.setValor('DATO->RESERVADAS :: DATO1;\n'); $$ = $1+'::'+$3;};

RESERVADAS:ancestros        { rg_path.setValor('RESERVADAS->ancestros;\n'); $$=$1;}
        |ancestroself       {rg_path.setValor('RESERVADAS->ancestroself;\n');  $$=$1;}
        |atributos          {rg_path.setValor('RESERVADAS->atributos;\n');  $$=$1;}
        |hijos              {rg_path.setValor('RESERVADAS->hijos;\n');  $$=$1;}
        |descendiente       { rg_path.setValor('RESERVADAS->descendiente;\n'); $$=$1;}
        |descendienteself   {rg_path.setValor('RESERVADAS->descendienteself;\n');  $$=$1;}
        |siguientes         {rg_path.setValor('RESERVADAS->siguientes;\n');  $$=$1;}
        |siguientehermano   {rg_path.setValor('RESERVADAS->siguientehermano;\n');  $$=$1;}
        |espacionombres     {rg_path.setValor('RESERVADAS->espacionombres;\n');  $$=$1;}
        |padre              {rg_path.setValor('RESERVADAS->padre;\n');  $$=$1;}
        |anterior           {rg_path.setValor('RESERVADAS->anterior;\n');  $$=$1;}
        |hemanoanterior     {rg_path.setValor('RESERVADAS->hemanoanterior;\n');  $$=$1;}
        |mismo              {rg_path.setValor('RESERVADAS->mismo;\n');  $$=$1;};

DATO1: identificador        {rg_path.setValor('DATO1->identificador;\n'); $$ = $1;}
    |multiplicacion         {rg_path.setValor('DATO1->multiplicacion;\n'); $$ = $1;}
    |arroba TODOATRIBUTO    {rg_path.setValor('DATO1->@ TODOATRIBUTO;\n'); $$ = $1+''+$2;}
    |siguiente              {rg_path.setValor('DATO1->siguiente;\n');  $$=$1;}
    |texto                  {rg_path.setValor('DATO1->texto;\n');  $$=$1;}
    |posicion               {rg_path.setValor('DATO1->posicion;\n');  $$=$1;}
    |nodo                   {rg_path.setValor('DATO1->nodo;\n');  $$=$1;};

TODOATRIBUTO: multiplicacion {rg_path.setValor('TODOATRIBUTO-> multiplicacion;\n');  $$=$1;}
            | identificador  {rg_path.setValor('TODOATRIBUTO-> identificador;\n');  $$=$1;};



MOSTRAR: corabre CONDICION corcierra MOSTRAR {rg_path.setValor('MOSTRAR-> [ CONDICION ] MOSTRAR;\n'); $$ = $1+' '+ $2+' '+$3+' '+$4;}
        |                           {rg_path.setValor('MOSTRAR -> epsilon;\n'); $$ = '';};



CONDICION: CONDICION1 or CONDICION                  {rg_path.setValor('CONDICION-> CONDICION1 or CONDICION;\n'); $$ = $1+'or'+$3;}
        |  CONDICION1 and CONDICION                 {rg_path.setValor('CONDICION-> CONDICION1 and CONDICION;\n'); $$ = $1+'and'+$3;}
        |  CONDICION1                               {rg_path.setValor('CONDICION-> CONDICION1;\n'); $$ = $1;};

CONDICION1: EXPRESION igual CONDICION1             {rg_path.setValor('CONDICION1-> EXPRESION = CONDICION1;\n'); $$ = $1+'='+$3;}
        |   EXPRESION mayorigualque CONDICION1     {rg_path.setValor('CONDICION1-> EXPRESION >= CONDICION1;\n'); $$ = $1+'>='+$3;}
        |   EXPRESION menorigualque CONDICION1     {rg_path.setValor('CONDICION1-> EXPRESION <= CONDICION1;\n'); $$ = $1+'<='+$3;}
        |   EXPRESION menorque CONDICION1          {rg_path.setValor('CONDICION1-> EXPRESION < CONDICION1;\n'); $$ = $1+'<'+$3;}
        |   EXPRESION mayorque CONDICION1          {rg_path.setValor('CONDICION1-> EXPRESION > CONDICION1;\n'); $$ = $1+'>'+$3;}
        |   EXPRESION distinto CONDICION1          {rg_path.setValor('CONDICION1-> EXPRESION != CONDICION1;\n'); $$ = $1+'!='+$3;}
        |   EXPRESION                              {rg_path.setValor('CONDICION1-> EXPRESION;\n'); $$ = $1;};

EXPRESION:  T suma  EXPRESION        {rg_path.setValor('EXPRESION-> T + EXPRESION;\n'); $$ = $1+'+'+$3;}
        |   T resta EXPRESION       { rg_path.setValor('EXPRESION-> T - EXPRESION;\n'); $$ = $1+'-'+$3;}
        |   T                       { rg_path.setValor('EXPRESION -> T;\n'); $$ = $1;};

        T: F multiplicacion T               { rg_path.setValor('T-> F * T;\n'); $$ = $1+'*'+$3;}
        | F division T                      { rg_path.setValor('T -> F div T;\n'); $$ = $1+'div'+$3;}
        | F mod T                           { rg_path.setValor('T -> F mod T;\n'); $$ = $1+'div'+$3;}
        | F                                 { rg_path.setValor('T -> F;\n'); $$ = $1;};

        F:entero                            {rg_path.setValor('F -> entero;\n'); $$ = $1; }
        |decimal                            {rg_path.setValor('F -> decimal;\n'); $$ = $1; }
        |cadena                             {rg_path.setValor('F -> cadena;\n'); $$ = $1; }
        |RUTA                               {rg_path.setValor('F -> RUTA;\n'); $$ = $1; }
        |para CONDICION parc                {rg_path.setValor('F -> ( CONDICION );\n'); $$ = '('+$2+')';};


