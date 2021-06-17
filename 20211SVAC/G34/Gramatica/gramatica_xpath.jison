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

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        let errores = new NodoError(yytext, 'Lexico', 'Token no perteneciente al lenguaje.', 'XPATH', yylloc.first_line, yylloc.first_column);
                        erroresXPATH.setError(errores);
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
	: LISTARUTAS EOF {   
        rg_path.setValor('inicio ->  LISTARUTAS;\n');
        console.log($1);
        return $1; 
        }
;

LISTARUTAS: LISTARUTAS union RUTA {         
                rg_path.setValor('LISTARUTAS -> LISTARUTAS union RUTA;\n');
                $1.push($3); $$ = $1;}
            |RUTA{
                rg_path.setValor('LISTARUTAS -> RUTA ;\n');
                $$ = [$1];}
            | error { //console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                        let errores = new NodoError(yytext, 'Sintactico', 'Token no esperado.', 'XPATH', this._$.first_line, this._$.first_column);
                        erroresXPATH.setError(errores);}
;
RUTA: diagonal  DATO MOSTRAR RUTA2      { 
        rg_path.setValor('RUTA -> / DATO MOSTRAR RUTA2;\n');
        $$ = new nodoRuta($2, $3, $4, TIPO_RUTA.DIAGONALSIMPLE, this._$.first_line, this._$.first_column); 
}
    |doblediagonal  DATO MOSTRAR RUTA2      { 
        rg_path.setValor('RUTA -> // DATO MOSTRAR RUTA2;\n');
        $$ = new nodoRuta($2, $3, $4, TIPO_RUTA.DIAGOBALDOBLE, this._$.first_line, this._$.first_column);
    }
    | DATO MOSTRAR RUTA2               { 
        rg_path.setValor('RUTA -> DATO MOSTRAR RUTA2;\n');
        $$ = new nodoRuta($1, $2, $3, TIPO_RUTA.DIAGONALVACIA, this._$.first_line, this._$.first_column);
    };


RUTA2:   diagonal  DATO MOSTRAR RUTA2{ 
                rg_path.setValor('RUTA2 -> / DATO MOSTRAR RUTA2;\n');
                $$ = new nodoRuta($2, $3, $4, TIPO_RUTA.DIAGONALSIMPLE, this._$.first_line, this._$.first_column);                
}
        | doblediagonal DATO MOSTRAR RUTA2 { 
                rg_path.setValor('RUTA2 -> // DATO MOSTRAR RUTA2;\n');
                //nodoRuta(dato:any, mostrar:any, ruta2:any, tipoRuta:TIPO_RUTA, fila:number, columna:number) {
                $$ = new nodoRuta($2, $3, $4, TIPO_RUTA.DIAGOBALDOBLE, this._$.first_line, this._$.first_column);
        }
        | {rg_path.setValor('RUTA2 -> epsilon;\n'); }   ;

DATO: identificador         { rg_path.setValor('DATO -> identificador;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.IDENTIFICADOR,this._$.first_line, this._$.first_column);}
    |multiplicacion         { rg_path.setValor('DATO -> multiplicacion;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.ASTERISCO,this._$.first_line, this._$.first_column);}
    |arroba TODOATRIBUTO    { rg_path.setValor('DATO -> @ TODOATRIBUTO;\n'); 
                                $$ = new nodoDator($2, TIPO_DATO.ARROBA,this._$.first_line, this._$.first_column);}}
    |punto                  { rg_path.setValor('DATO -> punto;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.PUNTO,this._$.first_line, this._$.first_column);}
    |doblepunto             { rg_path.setValor('DATO -> doblepunto;\n');
                                $$ = new nodoDator($1, TIPO_DATO.DOBLEPUNTO,this._$.first_line, this._$.first_column);}
    |siguiente              { rg_path.setValor('DATO -> siguiente;\n');
                                $$ = new nodoDator($1, TIPO_DATO.SIGUIENTE,this._$.first_line, this._$.first_column);}
    |texto                  { rg_path.setValor('DATO -> texto;\n'); $$=$1;
                                $$ = new nodoDator($1, TIPO_DATO.TEXTO,this._$.first_line, this._$.first_column);}
    |nodo                   { rg_path.setValor('DATO -> nodo;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.NODO,this._$.first_line, this._$.first_column);}
    |posicion               { rg_path.setValor('DATO -> posicion;\n');
                                $$ = new nodoDator($1, TIPO_DATO.POSICION,this._$.first_line, this._$.first_column);}
    |RESERVADAS dospuntos DATO1 { rg_path.setValor('DATO -> RESERVADS :: DATO1 ;\n'); 
                                $$ = new nodoDatorersva($1, $3, TIPO_DATO.RESERVADAS,this._$.first_line, this._$.first_column);};

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

DATO1: identificador      { rg_path.setValor('DATO1 -> identificador;\n');
                                $$ = new nodoDator($1, TIPO_DATO.IDENTIFICADOR,this._$.first_line, this._$.first_column);}
    |multiplicacion       { rg_path.setValor('DATO1 -> multiplicacion;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.ASTERISCO,this._$.first_line, this._$.first_column);}
    |arroba TODOATRIBUTO  { rg_path.setValor('DATO1 -> @ TODOATRIBUTO;\n'); 
                                $$ = new nodoDator($2, TIPO_DATO.ARROBA,this._$.first_line, this._$.first_column);}
    |siguiente            {  rg_path.setValor('DATO1 -> siguiente;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.SIGUIENTE,this._$.first_line, this._$.first_column);}
    |texto                {  rg_path.setValor('DATO1 -> texto;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.TEXTO,this._$.first_line, this._$.first_column);}
    |nodo                 {  rg_path.setValor('DATO1 -> nodo;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.NODO,this._$.first_line, this._$.first_column);};

TODOATRIBUTO: multiplicacion { rg_path.setValor('TODOATRIBUTO -> multiplicacion;\n'); 
                                $$ = new nodoDator($1, TIPO_DATO.ASTERISCO,this._$.first_line, this._$.first_column);} 
            | identificador  {  rg_path.setValor('TODOATRIBUTO -> identificador;\n');  
                                $$ = new nodoDator($1, TIPO_DATO.IDENTIFICADOR,this._$.first_line, this._$.first_column);};


MOSTRAR: corabre OPEOCOND corcierra MOSTRAR { rg_path.setValor('MOSTRAR -> [ OPEOCOND ]  MOSTRAR;\n');
                                $$ = new nodoMostrar($2,$4, this._$.first_line, this._$.first_column);}
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
                                                        $$ = nodoDato($1, TIPO_PRIMITIVO.NUMERICO);}
        |   decimal                             {rg_path.setValor('OPEOCCONDICIONOND ->  decimal;\n');
                                                        $$ = nodoDato($1, TIPO_PRIMITIVO.NUMERICO);}
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