
/* Definición Léxica */
%lex
%options case-insensitive

%%

"<"					return 'menorque';
">"					return 'mayorque';
"/"					return 'diagonal';
"="					return 'igual';
"("					return 'para';
")"					return 'parc';

/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b				return 'entero';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';

<<EOF>>				return 'EOF';

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                       // let errores = new NodoError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', 'XML', yylloc.first_line, yylloc.first_column);
                        //erroreslexicos.setError(errores);
                    }
/lex



/* Asociación de operadores y precedencia */

//%left 'or'
//%left 'and'
%left 'menorque' 'mayorque'  //'equal' 'nequal'
//%left 'plus' 'minus'
//%left 'times' 'div' 'mod'
//%left 'pow'
//%left 'not'
//%left UMINUS
%left 'para' 'parc'

%start ini

%% /* Definición de la gramática */

ini
	: LISTA_PRINCIPAL EOF { $$ = $1; console.log($$);  return $$; }
;

//LISTA_PRINCIPAL : LISTA_PRINCIPAL LISTA     { $1.push($2); $$ = $1;}
//   				| LISTA                     { $$ = [$1]; }
// ;

LISTA_PRINCIPAL : LISTA LISTA_PRINCIPAL
                | { $$ = []; };


LISTA:menorque identificador LATRIBUTOS mayorque OBJETOS menorque diagonal identificador mayorque { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); }
    | menorque identificador LATRIBUTOS mayorque PARRAFO menorque diagonal identificador mayorque { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); }
    | menorque identificador LATRIBUTOS diagonal mayorque      { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); }
    |
    | error { 
        console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
        //let errores = new NodoError(yytext, 'Sintactico', 'Token no esperado.', 'XML', this._$.first_line, this._$.first_column);
        //erroressintacticos.setError(errores);
    };

LATRIBUTOS: ATRIBUTOS        { $$ = $1; };
          // |                 { $$ = []; };

//ATRIBUTOS : ATRIBUTOS ATRIBUTO   { $1.push($2); $$ = $1;}
//          | ATRIBUTO             { $$ = [$1]; } ;

ATRIBUTOS : ATRIBUTO ATRIBUTOS   { $2.push($1); $$ = $2; };
//          | { $$ = []; };

ATRIBUTO :  identificador igual cadena { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); };


//OBJETOS: OBJETOS LISTA       { $1.push($2); $$ = $1;}
//	   | LISTA                { $$ = [$1]; } ;
OBJETOS : LISTA OBJETOS       { $2.push($1); $$ = $2;};
       // | { $$ = []; };

//PARRAFO : PARRAFO VALORES { $1=$1 + ' ' +$2 ; $$ = $1;}
//		| VALORES           { $$ = [$1]; } ;
PARRAFO : VALORES PARRAFO { $2=$2 + ' ' +$1 ; $$ = $2;};
//        | { $$ = []; };

VALORES : identificador { $$ = $1; }
        | decimal { $$ = $1; }
        | entero { $$ = $1; };


