/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex
%options case-insensitive



%%





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
"."                 return 'punto';
"@"                 return 'arroba';



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
%left 'or' 'and'
%left 'menorque' 'menorigualque' 'mayorque' 'mayorigualque' 'distinto' 'igual' 'dospuntos'
%left 'multiplicacion' 'division'
%left 'suma' 'resta' 
//%left 'plus' 'minus'
//%left 'times' 'div' 'mod'
//%left 'pow'
//%left 'not'
//%left UMINUS

%start ini

%% /* Definición de la gramática */

ini
	: LISTARUTAS EOF { $$ = $1; console.log($$); return $$; }
;

LISTARUTAS: RUTA union LISTARUTAS               { $$ = $1+'|'+ $3;}
            |RUTA                               { $$ = $1;}
            | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

RUTA: diagonal RUTA1                            { $$ = $1+''+ $2;}
    | ESATRIBUTO identificador MOSTRAR RUTA2               { $$ = $1+''+ $2+''+$3+''+$4;};

RUTA1:diagonal ESATRIBUTO identificador MOSTRAR RUTA2      { $$ = $1+''+ $2+''+$3+''+$4+''+$5;}
    |ESATRIBUTO identificador MOSTRAR RUTA2               { $$ = $1+''+ $2+''+$3+''+$4;};

RUTA2: diagonal ESATRIBUTO identificador MOSTRAR RUTA2     { $$ = $1+''+ $2+''+$3+''+$4+''+$5;}
     |                                          {$$='';}    ;

ESATRIBUTO: arroba {$$=$1;}
        |   {$$='';};


MOSTRAR: corabre OPEOCOND corcierra { $$ = $1+' '+ $2+' '+$3;}
        |                           { $$ = '';};

OPEOCOND: CONDICION                 { $$ = $1;};

CONDICION:CONDICION or CONDICION                  { $$ = $1+'or'+$3;}
        | CONDICION and CONDICION                 { $$ = $1+'and'+$3;}
        | CONDICION igual CONDICION             { $$ = $1+'='+$3;}
        | CONDICION mayorigualque CONDICION     { $$ = $1+'>='+$3;}
        | CONDICION menorigualque CONDICION     { $$ = $1+'<='+$3;}
        | CONDICION menorque CONDICION          { $$ = $1+'<'+$3;}
        | CONDICION mayorque CONDICION          { $$ = $1+'>'+$3;}
        | CONDICION distinto CONDICION          { $$ = $1+'!='+$3;}
        | CONDICION dospuntos CONDICION          { $$ = $1+'!='+$3;}
        | CONDICION suma  CONDICION        { $$ = $1+'+'+$3;}
        | CONDICION resta CONDICION       { $$ = $1+'-'+$3;}
        |  CONDICION multiplicacion CONDICION               { $$ = $1+'*'+$3;}
        |   CONDICION division CONDICION                     { $$ = $1+'div'+$3;}
        |   entero                           { $$ = $1; }
        |   decimal                          { $$ = $1; }
        |   cadena                           { $$ = $1; }
        |   identificador                    { $$ = $1; }
        |   arroba identificador             { $$ = $1+''+$2;};

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