%{

    const Nodito= require('./Nodito');
    var arreglolexico = "Codigo:";

 %}


%lex

//escape principal
escapechar                          [\'\"\\bfnrtv]

//Componentes del String
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
//----String Formal
stringliteral                       \"{stringdouble}*\"

//Componentes del Char
acceptedcharssingle                 [^\'\\]+
stringsingle                        {escape}|{acceptedcharssingle}
//CharFormal
charliteral                         \'{stringsingle}*\'
//Digito
digit                               [0-9]+ 

//Comentario
acceptedcomment                      [^\:)\\]+
commentdouble                        {escape}|{acceptedcomment}
commentliteral                        \(\: {commentdouble} \:\)

%%


//----------------Palabras Reservadas
"ancestor"                  return 'ancestor';
"ancestor-or-self"          return 'ancestor_or_self';
"attribute"                 return 'attribute';
"child"                     return 'child';
"descendant"                return 'descendant';
"descendant-or-self"        return 'descendant_or_self';
"following"                 return 'following';
"following-sibling"         return 'following_sibling';
"namespace-node"            return 'namespace_node';
"parent"                    return 'parent';
"preceding"                 return 'preceding';
"preceding-sibling"         return 'preceding_sibling';
"self"                      return 'self';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"node"                      return 'node';
"text"                      return 'text';
"last"                      return 'last';
"position"                  return 'position';

//-------- Operadores Palabras
"div"                       return 'div_';
"or"                        return 'or_';
"and"                       return 'and_';
"mod"                       return 'mod_';
//-------- Operadores Simbolos-----------
"|"                         return 'simpleor';
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'mul';
"="                         return 'igual';
"!="                        return 'diferente';
"<"                         return 'menorq';
"<="                        return 'menorigual';
">"                         return 'mayorq';
">="                        return 'mayorigual';
"("                         return 'lparen';
")"                         return 'rparen';
"["                         return 'lcorchete';
"]"                         return 'rcorchete';
//----------Selectores-----------------
"//"                         return 'ddiagonal'; //Probar Esto
"/"                         return 'sdiagonal';
".."                         return 'dpunto';
"."                         return 'spunto';

"@"                         return 'arroba';
"::"                        return 'ddospuntos';

//----------Expresiones Regulares------------

{commentliteral}                     /*skip comment */
\s+                                 /* skip whitespace */
//Numeros Decimales
(({digit}"."[0-9]*)|("."{digit}))  return 'DecimalLiteral';
//Numeros Enteros
{digit}                             return 'IntegerLiteral';


//Double
//( ({digit}"."[0-9]*)|("."{digit})  (e|E)(+|-)? {digit} )    return 'DoubleLiteral';

//Identificador
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';
//String
{stringliteral}                     return 'StringLiteral';
//Char
{charliteral}                       return 'CharLiteral';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF';

/lex

//SECCION DE IMPORTS
%{
       
        
    
%}


%left umul
 

// DEFINIMOS PRESEDENCIA DE OPERADORES

// DEFINIMOS PRODUCCIÓN INICIAL
%start XPATH
%%


/* Definición de la gramática de Alejandro */

XPATH: EXPR EOF{
                        $$= new Nodito("INICIO","Xpath");
		       //$$.addHijos($1);
                     return { ErrorLexico:arreglolexico,msj:"Analisis XPath Ascendenete Finalizado.\n.",diagramaAST:$$};
       
        };

EXPR: EXPRESIONSIMPLE   {    
                          
                        };

EXPRESIONSIMPLE: OREXPRESION;
//---------OR
OREXPRESION: ANDEXPRESION OREXPRESIONL1
        |ANDEXPRESION;


OREXPRESIONL1:OREXPRESIONL1 OREXPRESIONL2
                |OREXPRESIONL2;

OREXPRESIONL2: or_ ANDEXPRESION;
//--------AND
ANDEXPRESION:COMPARACIONEXPRESION ANDEXPRESIONL1
        |COMPARACIONEXPRESION
        ;
ANDEXPRESIONL1: ANDEXPRESIONL1 ANDEXPRESIONL2
        |ANDEXPRESIONL2;

ANDEXPRESIONL2:and_ COMPARACIONEXPRESION;

//COMPARACIONEXPRESION
COMPARACIONEXPRESION: STRINGCONCATENA COMPARACIONGENERAL STRINGCONCATENA
                     |STRINGCONCATENA  ;

//COMPARACION GENERAL

COMPARACIONGENERAL:igual
                |diferente
                |menorq
                |menorigual
                |mayorq
                |mayorigual
                ;

//STRINGCONCATENA

STRINGCONCATENA:SUMAEXPRESION;
//SUMAEXPRESION
SUMAEXPRESION:MULTIPLICACIONEXPRESION SUMAEXPRESIONL1
        |MULTIPLICACIONEXPRESION;

SUMAEXPRESIONL1:SUMAEXPRESIONL1 SUMAEXPRESIONL2
        |SUMAEXPRESIONL2
        ;
SUMAEXPRESIONL2:mas MULTIPLICACIONEXPRESION
                |menos MULTIPLICACIONEXPRESION
                ;

//MULTIPLICACION
MULTIPLICACIONEXPRESION:UNIONEXPRESION MULTIPLICACIONEXPRESIONL1
                        |UNIONEXPRESION
                        ;

MULTIPLICACIONEXPRESIONL1:MULTIPLICACIONEXPRESIONL1 MULTIPLICACIONEXPRESIONL2
                        |MULTIPLICACIONEXPRESIONL2;

MULTIPLICACIONEXPRESIONL2: mul UNIONEXPRESION 
                        |div_ UNIONEXPRESION
                        |mod_ UNIONEXPRESION
                        ;
//UNION EXPRESION

UNIONEXPRESION:INTERSECCINEXPRESION UNIONEXPRESIONL1
                |INTERSECCINEXPRESION
                |;

UNIONEXPRESIONL1: UNIONEXPRESIONL1 UNIONEXPRESIONL2
                |UNIONEXPRESIONL2;

UNIONEXPRESIONL2: simpleor INTERSECCINEXPRESION;

//INTERSECCION
INTERSECCINEXPRESION:INSTACIAEXPRESION;

//INSTACIAEXPRESION
INSTACIAEXPRESION:EXPRESIONUNARIA;
//EXPRESION UNARIA FALTA SIGNO MAS Y MENOS
EXPRESIONUNARIA: PATHEXPRESION;

PATHEXPRESION:ddiagonal RUTARELATIVA 
        |sdiagonal RUTARELATIVA
        |ddiagonal
        |sdiagonal
        |RUTARELATIVA
        ;

//RUTA RELATIVA
RUTARELATIVA:PASOEXPRESION RUTARELATIVAL1
        |PASOEXPRESION
        ;

RUTARELATIVAL1:RUTARELATIVAL1 RUTARELATIVAL2
        |RUTARELATIVAL2;

RUTARELATIVAL2:sdiagonal PASOEXPRESION
                |ddiagonal PASOEXPRESION
                ;

//PASO EXPRESION

PASOEXPRESION:POSTEXPRESION
        |AXISEXPRESION
        ;

//AXISEXPRESION

AXISEXPRESION:REVERSOPASO PREDICADO //LISTADOPREDICADO
        |DELANTEPASO PREDICADO // LISTADOPREDICADO
        |REVERSOPASO //LISTADOPREDICADO
        |DELANTEPASO  // LISTADOPREDICADO
        ;
//DELANTEPASO
DELANTEPASO:ABREVIATURADESPUESPASO
        |DELANTEAXIS NODOPRUEBA
        ;
//ABREVIATURADEPUES
ABREVIATURADESPUESPASO:arroba NODOPRUEBA
                |NODOPRUEBA
                ;


DELANTEAXIS: child ddospuntos
        |descendant ddospuntos
        |attribute ddospuntos
        |self ddospuntos
        |descendant_or_self ddospuntos
        |following ddospuntos
        |following_sibling ddospuntos
        |namespace ddospuntos
        ;

NODOPRUEBA:NOMBRETEST   
        |PRIMERTEST
        ;


PRIMERTEST:METODONODO
        |METODOTEXTO
        |METODOLAST
        |METODOPOSITION
                ;

METODONODO: node lparen rparen;
METODOTEXTO: text lparen rparen;
METODOLAST: last lparen rparen;
METODOPOSITION: position lparen rparen;

//REVERSOPASO
REVERSOPASO:REVERSOAXIS NODOPRUEBA
        |ABREVIATURAREVERSEPASO
        ;

//REVERSOAXIS
REVERSOAXIS: parent ddospuntos
        |ancestor_or_self ddospuntos
        |ancestor ddospuntos
        |preceding_sibling ddospuntos
        |preceding ddospuntos
        ;
//ABREVIATURAPASO
ABREVIATURAREVERSEPASO:dpunto;

//POSTEXPRESION
POSTEXPRESION: EXPRESIONPRIMARIA PREDICADO
        |EXPRESIONPRIMARIA
        ;
PREDICADO:lcorchete EXPR rcorchete;

EXPRESIONPRIMARIA:LITERAL
                |ITEMEXPRESION;

LITERAL:EXPRESIONSTRING
        |EXPRESIONNUMERICA
        |EXPRESIONARROBA 
        ;

EXPRESIONARROBA:arroba identifier
                |arroba mul
                ;

EXPRESIONNUMERICA:DecimalLiteral
                |IntegerLiteral
                ;
EXPRESIONSTRING:StringLiteral
                |CharLiteral {    
                               // $$ = new Nodo($1,"EXPRESIONSTRING:charliteral");
                             }
                |identifier {    
                               // $$ = new Nodo($1,"EXPRESIONSTRING:identificador");
                            }
                ;
ITEMEXPRESION:spunto
        ;

/* Definición de la gramática de Horacio */


/*
book/price// 



XPATH:INSTRUCCIONES {console.log('1');};//

INSTRUCCIONES:SENTENCIABARRA
             |OTHER
             ;
SENTENCIABARRA:ddiagonal
               |sdiagonal

EXPR:ancestor;
*/

//-------------2