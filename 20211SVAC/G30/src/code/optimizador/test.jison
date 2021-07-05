/* description: Parsea c3d y lo mete en una lista de instrucciones donde 
    clasifica el tipo de instrucción.
    
    TIPOS DE INSTRUCCION = asignación,  */

%{
     /*Acá importo mis cosas errores, tokens para la tabla de símbolos y eso*/
     const { Instruccion } = require('./codigo/instruccion')
     //const { Optimizador } = require('src/code/optimizador/codigo/optimizador')

     var instrucciones = [];
     var pilaexp =  [];
     var pilacondition = [];
     var expabierto = false; 
     var resultado = '';

     console.log(instrucciones);
%}

%lex

%options case-insensitive
number  [0-9]+("."[0-9]+)?\b 


%%

\s+                 /* skip whitespace */
"//".*										/* skip */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			/* skip */
[ \r\t]+  			                            /* skip */

// agrupadores 
"["                   return '[';
"]"                   return ']';
"("                   return '(';
")"                   return ')';
"{"                   return '{';
"}"                   return '}';

// printf
"print"               return 'print';
"printf"               return 'printf';
"%c"				          return '%c';
"%d"				          return '%d';
"%f"				          return '%f';

// header
"#include <stdio.h>"    return 'hc1';
"#include <math.h>"    return 'hc2';


// operaciones condicionales

"<="                   return '<=';
"<"                    return '<';
">="                   return '>=';
">"                    return '>';
"=="                   return '==';
"!="                   return '!=';

// operaciones artiméticas
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
"%"                   return '%';
"="                   return '=';


// Palabras reservadas
"goto"                return 'goto';
"if"				          return 'if';
"return"				      return 'return';

// tiempo de ejecución
"Heap"		          return 'Heap';
"Stack"	          return 'Stack';
"SP"                    return 'SP';
"HP"                    return 'HP';
"P"                    return 'SP';
"H"                    return 'HP';

"heapxq"                    return 'Heap';
"stackxq"                    return 'Stack';
"PQ"                    return 'SP';
"HQ"                    return 'HP';

"SPXP"                    return 'SP';
"HPXP"                    return 'HP';
"heapXP"                    return 'Heap';
"stackXP"                    return 'Stack';


// funciones
"void"				          return 'void';
"main"				          return 'main';

// types

"int"                   return 'int';
"char"                  return 'char';
"double"                return 'double';

// variables y sus nombres
("T"|"t")[0-9]+                   return 'temporal';
("L"|"l")[0-9]+                   return 'etiqueta';
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*\b      return 'id';
{number}                          return 'number';

// Otros cosos
";"                   return ';';
":"                   return ':';
"\""                  return '"';
"'"                   return '\'';
","                   return ',';

<<EOF>>               return 'EOF'
.                     return 'INVALID'

// 

/lex

/* Asociación de operadores y precedencia */
%start ini

%%

ini
	: instrucciones EOF {
		// retorno la lista de tokens
    console.log('-->');
    //console.log(instrucciones)
    return instrucciones;
	}
;

instrucciones
	: instrucciones instruccion 	{ }
	| instruccion					        { }
;


instruccion
  : etiqueta ':'                { /*etiqueta pal salto*/ 
                                  $$ = $1 + $2;
                                  instrucciones.push(new Instruccion('etiqueta', $$, '', '', '', ''));
                                }
  | goto etiqueta ';'           { /*salto*/
                                  $$ = $1 + ' ' + $2 + $3;
                                  instrucciones.push(new Instruccion('salto', $$, '', '', '', ''));
                                }
  | if '(' condition ')' goto etiqueta ';'    { /*if*/ 
                                                $$ = $1 + ' ' + $2 + ' ' + $3 + ' ' + $4 + ' ' + $5 + ' ' + $6  + $7
                                                instrucciones.push(new Instruccion('salto_condicional', $$, $6, pilacondition[0], pilacondition[1], pilacondition[2]));
                                                pilacondition = [];
                                              }
  | idsf '=' exp ';'      { /*asignación*/
                            $$ = $1 + ' ' + $2 + ' ' + $3 + $4;
                            if(expabierto){
                                  console.log('expabierto abierto')
                                  instrucciones.push(new Instruccion('asignacion', $$, $1, pilaexp[0], pilaexp[1], pilaexp[2] ));
                                  expabierto = false;
                                  pilaexp = [];
                              } else {
                                  console.log('expabierto no abierto')
                                  instrucciones.push(new Instruccion('asignacion', $$, $1, '', pilaexp[0], '' ));
                                  pilaexp = [];
                              }
                          }
  | asignacionStruct        { /*asignación a estructuras*/
                              $$ = $1;
                              if(expabierto){
                                  console.log('expabierto abierto')
                                  instrucciones.push(new Instruccion('asignacionStruct', $$, resultado, pilaexp[0], pilaexp[1], pilaexp[2] ));
                                  expabierto = false;
                                  pilaexp = [];
                              } else {
                                  console.log('expabierto no abierto')
                                  instrucciones.push(new Instruccion('asignacionStruct', $$, resultado, '', pilaexp[0], '' ));
                                  pilaexp = [];
                              }
                              
                            }
  | prints                  {/* Prints */
                              $$ = $1;
                              instrucciones.push(new Instruccion('print', $$, '', '', '', '' ));
                            }
  | id '(' ')' ';'          {/* llamada a métodos */
                              $$ = $1  + $2  + $3 + $4;
                              instrucciones.push(new Instruccion('llamada_metodo', $$, '', '', '', ''));                                
                            }
  | voids                   {/*  finalización de un método */
                              $$ = $1;
                              instrucciones.push(new Instruccion('void', $$, '', '', '', ''));
                            }
  | return ';'              {/* return  */
                              instrucciones.push(new Instruccion('return', 'return;', '', '', '', ''));                                
                            }
  | return '(' ')' ';'      {/* return  */
                              instrucciones.push(new Instruccion('return', 'return();', '', '', '', ''));                                
                            }

  /* Header */
  | headers                  {
                                $$ = $1;
                                instrucciones.push(new Instruccion('header', $$, '', '', '', ''));  
                              }
;

headers
  : hc1   { /*headers*/ $$ = $1; }
  | hc2   { /*headers*/ $$ = $1; }
  | types Heap '[' number ']' ';'   { /*headers*/$$ = $1 + ' ' + $2 + ' ' + $3 + ' ' + $4 + ' ' + $5  + $6; }
  | types Stack '[' number ']' ';'  { /*headers*/$$ = $1 + ' ' + $2 + ' ' + $3 + ' ' + $4 + ' ' + $5  + $6; }
  | types id '[' number ']' ';'   { /*headers*/$$ = $1 + ' ' + $2 + ' ' + $3 + ' ' + $4 + ' ' + $5  + $6; }
  | types id '[' number ']' ';'  { /*headers*/$$ = $1 + ' ' + $2 + ' ' + $3 + ' ' + $4 + ' ' + $5  + $6; }
  | types SP ';'                    { /*headers*/$$ = $1 + ' ' + $2  + $3 }
  | types HP ';'                    { /*headers*/$$ = $1 + ' ' + $2  + $3 }
  | types tempos ';'                { /*headers*/$$ = $1 + ' ' + $2  + $3 }
  | headers                         { /*headers*/ $$ = $1 }
;

tempos
  : temporal ',' tempos   { /*tempos*/$$ = $1 + $2 + ' ' + $3 }
  | temporal              { /*tempos*/$$ = $1 }
;

prints
  : printf '(' '"'  params '"' ',' '(' types ')' ids ')' ';'    { /*prints*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + $11 + $12; }
  | printf '(' "'"  params "'" ',' '(' types ')' ids ')' ';'    { /*prints*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + $11 + $12; }
;

voids
  : void main '(' ')' '{' instrucciones'}'    { /*voids*/$$ = $1 + ' ' + $2 + $3 + $4 + $5 + ' ' + $6 + ' ' + $7; }
  | void id '(' ')' '{' instrucciones'}'      { /*voids*/$$ = $1 + ' ' + $2 + $3 + $4 + $5 + ' ' + $6 + ' ' + $7; }
;

types
  : int     { /*types*/$$ = $1; }
  | char    { /*types*/$$ = $1; }
  | double  { /*types*/$$ = $1; }
;

params 
  : '%c'    { /*params*/$$ = $1; }
  | '%d'    { /*params*/$$ = $1; }
  | '%f'    { /*params*/$$ = $1; }
;

asignacionStruct
  : Heap '[' ids ']' '=' exp ';'                  { /*asignacionStruct*/$$ = $1 + $2 + $3 + $4 + ' ' + $5 + ' ' + $6 + $7; 
                                                    resultado = $1 + $2 + $3 + $4;
                                                  }
  | Stack '[' ids ']' '=' exp ';'                 { /*asignacionStruct*/$$ = $1 + $2 + $3 + $4 + ' ' + $5 + ' ' + $6 + $7;  
                                                    resultado = $1 + $2 + $3 + $4;
                                                  }
  | Heap '[' '(' types ')' ids ']' '=' exp ';'    { /*asignacionStruct*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7 + ' ' + $8 + ' ' + $9 + $10;  
                                                    resultado = $1 + $2 + $3 + $4 + $5 + $6 + $7;
                                                  }
  | Stack '[' '(' types ')' ids ']' '=' exp ';'   { /*asignacionStruct*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7 + ' ' + $8 + ' ' + $9 + $10; 
                                                    resultado = $1 + $2 + $3 + $4 + $5 + $6 + $7;
                                                  }
;

exp
  : ids '+' ids       { /*exp*/$$ = $1 + ' ' + $2 + ' ' + $3;
                        pilaexp.push($2);
                        pilaexp.push($1);
                        pilaexp.push($3);
                        expabierto = true;}
  | ids '-' ids       { /*exp*/$$ = $1 + ' ' + $2 + ' ' + $3;
                        pilaexp.push($2);
                        pilaexp.push($1);
                        pilaexp.push($3);
                        expabierto = true;}
  | ids '*' ids       { /*exp*/$$ = $1 + ' ' + $2 + ' ' + $3;
                        pilaexp.push($2);
                        pilaexp.push($1);
                        pilaexp.push($3);
                        expabierto = true;}
  | ids '/' ids       { /*exp*/$$ = $1 + ' ' + $2 + ' ' + $3; 
                        pilaexp.push($2);
                        pilaexp.push($1);
                        pilaexp.push($3);
                        expabierto = true;}
  | ids '%' ids       { /*exp*/$$ = $1 + ' ' + $2 + ' ' + $3;
                        pilaexp.push($2);
                        pilaexp.push($1);
                        pilaexp.push($3);
                        expabierto = true;}
  | Heap '[' ids ']'      { /*exp*/$$ = $1 + $2 + $3 + $4; 
                            pilaexp.push($$); }
  | Stack '[' ids ']'     { /*exp*/$$ = $1 + $2 + $3 + $4;
                            pilaexp.push($$); } 
  | Stack '[' '(' types ')' ids']'  { /*exp*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7; 
                                    pilaexp.push($$); } 
  | Heap '[' '(' types ')' ids']'   { /*exp*/$$ = $1 + $2 + $3 + $4 + $5 + $6 + $7;
                                    pilaexp.push($$); } 
  | ids       { /*exp*/$$ = $1; 
              pilaexp.push($$); }
;

condition
  : ids '<' ids     { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
  | ids '>' ids     { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
  | ids '<=' ids    { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
  | ids '>=' ids    { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
  | ids '==' ids    { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
  | ids '!=' ids    { $$ = $1 + ' ' + $2 + ' ' + $3;
                     pilacondition.push($2, $1, $3);}
;

ids
  : temporal  { $$ = $1 }
  | SP        { $$ = $1 }
  | HP        { $$ = $1 }
  | number    { $$ = $1 }
  | id        { $$ = $1 }
  | '-' ids   { $$ = $1 + $2 }
;

idsf 
  : temporal    { $$ = $1;
                  resultado = $$; }
  | SP    { $$ = $1;
            resultado = $$; }
  | HP    { $$ = $1;
            resultado = $$; }
  | id    { $$ = $1;
            resultado = $$; }
;