%{

    const Nodo= require('./Nodito');
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
[a-zA-Z_][a-zA-Z0-9_ñÑá-ü]*            return 'identifier';
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
                        $$= new Nodo("INICIO","Xpath");
		        $$.addHijos($1);
                     return { ErrorLexico:arreglolexico,msj:"Analisis XPath Ascendenete Finalizado.\n.",diagramaAST:$$};
       
        };

EXPR: EXPRESIONSIMPLE           {       
                                $$ = new Nodo("EXPRESIONSIMPLE","PATHEXPRESION");
                                $$.addHijos($1);
                                } 
                                 ;

EXPRESIONSIMPLE: OREXPRESION                    {       
                                                $$ = new Nodo("EXPRESIONSIMPLE","PATHEXPRESION");
                                                $$.addHijos($1);
                                                }             
                                                ;
//---------OR
OREXPRESION: ANDEXPRESION OREXPRESIONL1         {       
                                                $$ = new Nodo("OREXPRESION","PATHEXPRESION");
                                                $$.addHijos($1);
                                                $$.addHijos($2);
                                                }              
        |ANDEXPRESION                           {       
                                                $$ = new Nodo("OREXPRESION","PATHEXPRESION");
                                                $$.addHijos($1);
                                                }                   
        ;


OREXPRESIONL1:  OREXPRESIONL2 OREXPRESIONL1      {       
                                                $$ = new Nodo("OREXPRESIONL1","PATHEXPRESION");
                                                $$.addHijos($1);
                                                $$.addHijos($2);
                                                }
                |OREXPRESIONL2          {       
                                                $$ = new Nodo("OREXPRESIONL1","PATHEXPRESION");
                                                $$.addHijos($1);
                                        }
                ;

OREXPRESIONL2: or_ ANDEXPRESION         {       $$ = new Nodo("COMPARACIONEXPRESION","PATHEXPRESION");
                                                $$.addHijos(new Nodo($1,"or"));
                                                $$.addHijos($2);
                                        } 
                                                
                        ;
//--------AND
ANDEXPRESION:COMPARACIONEXPRESION ANDEXPRESIONL1{   
                                                        $$ = new Nodo("ANDEXPRESION","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        $$.addHijos($2);
                                                }
        |COMPARACIONEXPRESION                   {   
                                                        $$ = new Nodo("ANDEXPRESION","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                }
        ;
ANDEXPRESIONL1: ANDEXPRESIONL1 ANDEXPRESIONL2   {   
                                                        $$ = new Nodo("ANDEXPRESIONL2","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        $$.addHijos($2);
                                                }
        |ANDEXPRESIONL2                         {       $$ = new Nodo("COMPARACIONEXPRESION","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                } 
                        ;

//COMPARACIONEXPRESION
COMPARACIONEXPRESION: STRINGCONCATENA COMPARACIONGENERAL STRINGCONCATENA        {   
                                                                                $$ = new Nodo("COMPARACIONEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                $$.addHijos($2);
                                                                                $$.addHijos($3);
                                                                                }  
                     |STRINGCONCATENA                                           {   
                                                                                $$ = new Nodo("COMPARACIONEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                }  
                     ;

//COMPARACION GENERAL

COMPARACIONGENERAL:igual                        {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"igual"));
                                                }
                |diferente                      {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"diferente"));
                                                }
                |menorq                         {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"menorq"));
                                                }
                |menorigual                     {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"menorigual"));
                                                }
                |mayorq                         {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"mayorq"));
                                                }
                |mayorigual                     {   
                                                        $$ = new Nodo("COMPARACIONGENERAL","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"mayorigual"));
                                                };
                

//STRINGCONCATENA

STRINGCONCATENA:SUMAEXPRESION                                                   {   
                                                                                $$ = new Nodo("STRINGCONCATENA","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                };
//SUMAEXPRESION
SUMAEXPRESION:MULTIPLICACIONEXPRESION SUMAEXPRESIONL1                           {   
                                                                                $$ = new Nodo("SUMAEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                $$.addHijos($2);
                                                                                }
        |MULTIPLICACIONEXPRESION                                                {   
                                                                                $$ = new Nodo("SUMAEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                }
                                                                                ;

SUMAEXPRESIONL1:SUMAEXPRESIONL1 SUMAEXPRESIONL2                                 {   
                                                                                $$ = new Nodo("SUMAEXPRESIONL1","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                $$.addHijos($2);
                                                                                }
        |SUMAEXPRESIONL2                                                        {   
                                                                                $$ = new Nodo("SUMAEXPRESIONL1","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                }
        ;
SUMAEXPRESIONL2:mas MULTIPLICACIONEXPRESION                                     {   
                                                                                $$ = new Nodo("SUMAEXPRESIONL2","PATHEXPRESION");
                                                                                $$.addHijos(new Nodo($1,"mas"));
                                                                                $$.addHijos($2);
                                                                                }
                |menos MULTIPLICACIONEXPRESION                                  {   
                                                                                $$ = new Nodo("SUMAEXPRESIONL2","PATHEXPRESION");
                                                                                $$.addHijos(new Nodo($1,"menos"));
                                                                                $$.addHijos($2);
                                                                                }
                ;

//MULTIPLICACION
MULTIPLICACIONEXPRESION:UNIONEXPRESION MULTIPLICACIONEXPRESIONL1                {   
                                                                                $$ = new Nodo("MULTIPLICACIONEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                $$.addHijos($2);
                                                                                }
                        |UNIONEXPRESION                                         {   
                                                                                $$ = new Nodo("MULTIPLICACIONEXPRESION","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                }
                        ;

MULTIPLICACIONEXPRESIONL1:MULTIPLICACIONEXPRESIONL1 MULTIPLICACIONEXPRESIONL2   {   
                                                                                $$ = new Nodo("MULTIPLICACIONEXPRESIONL1","PATHEXPRESION");
                                                                                $$.addHijos($1);
                                                                                $$.addHijos($2);
                                                                                } 
                        |MULTIPLICACIONEXPRESIONL2      {   
                                                        $$ = new Nodo("MULTIPLICACIONEXPRESIONL1","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        } 
                                                        ;

MULTIPLICACIONEXPRESIONL2: mul UNIONEXPRESION           {   
                                                        $$ = new Nodo("MULTIPLICACIONEXPRESIONL2","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"mul"));
                                                        $$.addHijos($2);
                                                        }  
                        |div_ UNIONEXPRESION            {   
                                                        $$ = new Nodo("MULTIPLICACIONEXPRESIONL2","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"div"));
                                                        $$.addHijos($2);
                                                        } 
                        |mod_ UNIONEXPRESION            {   
                                                        $$ = new Nodo("MULTIPLICACIONEXPRESIONL2","PATHEXPRESION");
                                                        $$.addHijos(new Nodo($1,"mod"));
                                                        $$.addHijos($2);
                                                        }    
                        ;
//UNION EXPRESION

UNIONEXPRESION:INTERSECCINEXPRESION UNIONEXPRESIONL1    {   
                                                        $$ = new Nodo("UNIONEXPRESION","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        $$.addHijos($2);
                                                        }
                |INTERSECCINEXPRESION                   {   
                                                        $$ = new Nodo("UNIONEXPRESION","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        }
                |                               
                ;

UNIONEXPRESIONL1: UNIONEXPRESIONL1 UNIONEXPRESIONL2     {   
                                                        $$ = new Nodo("UNIONEXPRESIONL1","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        $$.addHijos($2);
                                                        }
                |UNIONEXPRESIONL2                       {   
                                                        $$ = new Nodo("UNIONEXPRESIONL1","PATHEXPRESION");
                                                        $$.addHijos($1);
                                                        }
                ;

UNIONEXPRESIONL2: simpleor INTERSECCINEXPRESION {   
                                                $$ = new Nodo("UNIONEXPRESIONL2","PATHEXPRESION");
                                                $$.addHijos($1);
                                                $$.addHijos($2);	
                                                };

//INTERSECCION
INTERSECCINEXPRESION:PATHEXPRESION              {   
                                                $$ = new Nodo("INTERSECCINEXPRESION","PATHEXPRESION");
                                                $$.addHijos($1);	
                                                }
                                                ;

//INSTACIAEXPRESION
                                                
                                
//EXPRESION UNARIA FALTA SIGNO MAS Y MENOS
//EXPRESIONUNARIA: PATHEXPRESION                  
                                

PATHEXPRESION:ddiagonal RUTARELATIVA            {   
                                                $$ = new Nodo("PATHEXPRESION","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"ddiagonal"));
                                                $$.addHijos($2);	
                                                } 
        |sdiagonal RUTARELATIVA                 {   
                                                $$ = new Nodo("PATHEXPRESION","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"sdiagonal"));
                                                $$.addHijos($2);	
                                                } 
        |ddiagonal                              {   
                                                $$ = new Nodo("PATHEXPRESION","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"ddiagonal"));	
                                                } 
        |sdiagonal                              {   
                                                $$ = new Nodo("PATHEXPRESION","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"sdiagonal"));	
                                                } 
        |RUTARELATIVA                           {   
                                                $$ = new Nodo("PATHEXPRESION","POSTEXPRESION");
			                        $$.addHijos($1);
                                                }     
                                                ;

//RUTA RELATIVA
RUTARELATIVA:PASOEXPRESION RUTARELATIVAL1       {   
                                                $$ = new Nodo("RUTARELATIVAL1","POSTEXPRESION");
			                        $$.addHijos($1);
                                                $$.addHijos($2);
                                                }                
        |PASOEXPRESION                          {   
                                                $$ = new Nodo("RUTARELATIVAL1","POSTEXPRESION");
			                        $$.addHijos($1);
                                                } 
                                                ;

RUTARELATIVAL1:RUTARELATIVAL1 RUTARELATIVAL2    {   
                                                $$ = new Nodo("RUTARELATIVAL1","POSTEXPRESION");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                                } 
        |RUTARELATIVAL2                         {   
                                                $$ = new Nodo("RUTARELATIVAL1","POSTEXPRESION");
			                        $$.addHijos($1);	
                                                }                  
                                                ;

RUTARELATIVAL2:sdiagonal PASOEXPRESION          {   
                                                $$ = new Nodo("RUTARELATIVAL2","POSTEXPRESION");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                                } 
                |ddiagonal PASOEXPRESION        {   
                                                $$ = new Nodo("RUTARELATIVAL2","POSTEXPRESION");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                                } 
                                                ;

//PASO EXPRESION

PASOEXPRESION:POSTEXPRESION             {   
                                                $$ = new Nodo("PASOEXPRESION","POSTEXPRESION");
			                        $$.addHijos($1);	
                                        }  
        |AXISEXPRESION                  {   
                                                $$ = new Nodo("PASOEXPRESION","AXISEXPRESION");
			                        $$.addHijos($1);	
                                        }          
                                        ;

//AXISEXPRESION

AXISEXPRESION:REVERSOPASO PREDICADO     {   
                                                $$ = new Nodo("AXISEXPRESION","REVERSOPASO");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                        } //LISTADOPREDICADO
        |DELANTEPASO PREDICADO          {   
                                                $$ = new Nodo("AXISEXPRESION","DELANTEPASO");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                        }  // LISTADOPREDICADO
        |REVERSOPASO                    {   
                                                $$ = new Nodo("AXISEXPRESION","REVERSOPASO");
			                        $$.addHijos($1);	
                                        } //LISTADOPREDICADO
        |DELANTEPASO                    {   
                                                $$ = new Nodo("AXISEXPRESION","DELANTEPASO");
			                        $$.addHijos($1);	
                                        }   // LISTADOPREDICADO
                                        ;
//DELANTEPASO
DELANTEPASO:ABREVIATURADESPUESPASO              {   
                                                $$ = new Nodo("DELANTEPASO","ABREVIATURADESPUESPASO");
			                        $$.addHijos($1);	
                                                } 
        |DELANTEAXIS NODOPRUEBA                  {   
                                                $$ = new Nodo("DELANTEPASO","TERM");
			                        $$.addHijos($1);
                                                $$.addHijos($2);	
                                                } 
                                                ;
//ABREVIATURADEPUES
ABREVIATURADESPUESPASO:arroba NODOPRUEBA        {   
                                                $$ = new Nodo("ABREVIATURADESPUESPASO","NODOPRUEBA-arroba");
			                        $$.addHijos($1);	
                                                } 
                |NODOPRUEBA             {   
                                                $$ = new Nodo("ABREVIATURADESPUESPASO","NODOPRUEBA");
			                        $$.addHijos($1);	
                                        } 
                                        ;


DELANTEAXIS: child ddospuntos           {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"child"));	
                                        }
        |descendant ddospuntos          {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"descendant"));	
                                        } 
        |attribute ddospuntos           {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"attribute"));	
                                        }           
        |self ddospuntos                {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"self"));	
                                        }
        |descendant_or_self ddospuntos  {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"descendant_or_self"));	
                                        }
        |following ddospuntos           {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"following"));	
                                        }
        |following_sibling ddospuntos   {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"following_sibling"));	
                                        }
        |namespace ddospuntos           {   
                                                $$ = new Nodo("DELANTEAXIS","NOMBREPRIMERTESTTEST");
			                        $$.addHijos(new Nodo($1,"namespace"));	
                                        }  
                                        ;

NODOPRUEBA:NOMBRETEST                   {   
                                                $$ = new Nodo("NODOPRUEBA","NOMBRETEST");
			                        $$.addHijos($1);	
                                        }   
        |PRIMERTEST                     {   
                                                $$ = new Nodo("NODOPRUEBA","NOMBREPRIMERTESTTEST");
			                        $$.addHijos($1);	
                                        }  
                                        ;


PRIMERTEST:METODONODO                   {   
                                                $$ = new Nodo("PRIMERTEST","METODONODO");
			                        $$.addHijos($1);	
                                        }
        |METODOTEXTO                    {   
                                                $$ = new Nodo("PRIMERTEST","METODOTEXTO");
			                        $$.addHijos($1);	
                                        }
        |METODOLAST                     {   
                                                $$ = new Nodo("PRIMERTEST","METODOLAST");
			                        $$.addHijos($1);	
                                        }
        |METODOPOSITION                 {   
                                                $$ = new Nodo("PRIMERTEST","METODOPOSITION");
			                        $$.addHijos($1);	
                                        }
                                        ;

METODONODO: node lparen rparen          {   
                                                $$ = new Nodo("METODONODO","TERM");
			                        $$.addHijos(new Nodo($1,"node")); 	
                                        };
METODOTEXTO: text lparen rparen         {   
                                                $$ = new Nodo("METODOLAST","TERM");
			                        $$.addHijos(new Nodo($1,"position")); 	
                                        };
METODOLAST: last lparen rparen          {   
                                                $$ = new Nodo("METODOLAST","TERM");
			                        $$.addHijos(new Nodo($1,"last")); 	
                                        };
METODOPOSITION: position lparen rparen  {   
                                                $$ = new Nodo("METODOPOSITION","TERM");
			                        $$.addHijos(new Nodo($1,"position")); 	
                                        }
                                        ;

//REVERSOPASO
REVERSOPASO:REVERSOAXIS NODOPRUEBA      { 
                                                $$ = new Nodo("REVERSOPASO","REVERSOAXIS");
					        $$.addHijos($1);
                                                $$.addHijos($2);
					}   
        |ABREVIATURAREVERSEPASO         { 
                                                $$ = new Nodo("REVERSOPASO","ABREVIATURAREVERSEPASO");
					        $$.addHijos($1);
					}          
                                        ;

//REVERSOAXIS
REVERSOAXIS: parent ddospuntos          {   
                                                $$ = new Nodo("REVERSOAXIS","TERM");
			                        $$.addHijos(new Nodo($1,"parent")); 	
                                        }
        |ancestor_or_self ddospuntos    {   
                                                $$ = new Nodo("REVERSOAXIS","TERM");
			                        $$.addHijos(new Nodo($1,"ancestor_or_self")); 	
                                        }
        |ancestor ddospuntos            {   
                                                $$ = new Nodo("REVERSOAXIS","TERM");
			                        $$.addHijos(new Nodo($1,"ancestor")); 	
                                        }
        |preceding_sibling ddospuntos   {   
                                                $$ = new Nodo("REVERSOAXIS","TERM");
			                        $$.addHijos(new Nodo($1,"preceding_sibling")); 	
                                        }  
        |preceding ddospuntos           {   
                                                $$ = new Nodo("REVERSOAXIS","TERM");
			                        $$.addHijos(new Nodo($1,"preceding")); 	
                                        }   
                                        ;
//ABREVIATURAPASO
ABREVIATURAREVERSEPASO:dpunto    {   
                                $$ = new Nodo("ABREVIATURAREVERSEPASO","TERM");
			        $$.addHijos(new Nodo($1,"dpunto")); 	
                                }
                                ;

//POSTEXPRESION
POSTEXPRESION: EXPRESIONPRIMARIA PREDICADO      { 
                                                        $$ = new Nodo("POSTEXPRESION","EXPRESIONPRIMARIA2");
					                $$.addHijos($1);
                                                        $$.addHijos($2);
					        } 
        |EXPRESIONPRIMARIA                      { 
                                                        $$ = new Nodo("POSTEXPRESION","EXPRESIONPRIMARIA");
					                $$.addHijos($1);
					        } 
                                                ;
PREDICADO:lcorchete EXPR rcorchete      { 
                                                $$ = new Nodo("PREDICADO","LITERAL");
					        $$.addHijos($1);
                                                $$.addHijos($2);
                                                $$.addHijos($3);
					}      
                                        ;

EXPRESIONPRIMARIA:LITERAL               { 
                                                $$ = new Nodo("EXPRESIONPRIMARIA","LITERAL");
					        $$.addHijos($1);
					} 
                |ITEMEXPRESION          { 
                                                $$ = new Nodo("EXPRESIONPRIMARIA","LITERAL");
					        $$.addHijos($1);
					}          
                                        ;

LITERAL:EXPRESIONSTRING                 { $$ = new Nodo("LITERAL","EXPRESIONSTRING");
					        $$.addHijos($1);
					}
        |EXPRESIONNUMERICA              { $$ = new Nodo("LITERAL","EXPRESIONNUMERICA");
					        $$.addHijos($1);
					}
        |EXPRESIONARROBA                { $$ = new Nodo("LITERAL","EXPRESIONARROBA");
					        $$.addHijos($1);
					} 
                                        ;

EXPRESIONARROBA:arroba identifier       {   
                                        $$ = new Nodo("EXPRESIONARROBA","TERM");
			                $$.addHijos(new Nodo($2,"identificador")); 	
                                        }  
                |arroba mul             {   
                                        $$ = new Nodo("EXPRESIONARROBA","TERM");
			                $$.addHijos(new Nodo($2,"mul")); 	
                                        }  
                                        ;

EXPRESIONNUMERICA:DecimalLiteral{   
                                $$ = new Nodo("EXP","TERM");
			        $$.addHijos(new Nodo($1,"decimal")); 	
                                }  
                |IntegerLiteral {   
                                $$ = new Nodo("EXP","TERM");
			        $$.addHijos(new Nodo($1,"entero")); 	
                                }   
                                ;
EXPRESIONSTRING:StringLiteral   { 
                                $$ = new Nodo("EXP","TERM");
			        $$.addHijos(new Nodo($1,"identificador")); 	
                                }
                |CharLiteral    {   
                                $$ = new Nodo("EXP","TERM");
			        $$.addHijos(new Nodo($1,"char")); 	
                                }
                |identifier     {   
                                $$ = new Nodo("EXP","TERM");
			        $$.addHijos(new Nodo($1,"identificador")); 	
                                }
                                ;
ITEMEXPRESION:spunto            {   
                                $$ = new Nodo("ITEMEXPRESION","TERM");
			        $$.addHijos(new Nodo($1,"spunto")); 	
                                }
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