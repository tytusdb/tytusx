%{
    const Nodo = require('./Nodo');
    var arreglolexico = "Codigo:";

%}


%lex

%options case-insensitive

//----------------------Palabras Reservadas-------------

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
"ancestor-or-self"          return 'ancestor_or_self';
"descendant-or-self"        return 'descendant_or_self';
"following-sibling"         return 'following_sibling';
"namespace-node"            return 'namespace_node';
"preceding-sibling"         return 'preceding_sibling';
"ancestor"                  return 'ancestor';
"attribute"                 return 'attribute';
"child"                     return 'child';
"descendant"                return 'descendant';
"following"                 return 'following';
"parent"                    return 'parent';
"preceding"                 return 'preceding';
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
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DecimalLiteral';
//Numeros Enteros
{digit}                             return 'IntegerLiteral';

//Double
//( ({digit}"."[0-9]*)|("."{digit})  (e|E)(+|-)? {digit} )    return 'DoubleLiteral';


//String
{stringliteral}                     return 'StringLiteral';
//Char
{charliteral}                       return 'CharLiteral';
//Identificador
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

//error lexico
.                                   {
                                       console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                   }

<<EOF>>                     return 'EOF';

/lex

//SECCION DE IMPORTS
%{
       
   
%}


// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'sdiagonal','ddiagonal'
%left 'simpleor'
%left 'or_'
%left 'and_'
%left 'menorq' 'menorigual' 'mayorq' 'mayorigual' 'igual' 'diferente'
%left 'mas' 'menos'
%left 'div_' 'mul' 'mod_'
%left umenos

// DEFINIMOS PRODUCCIÓN INICIAL
%start XPATH
%%


/* Definición de la gramática de Alejandro */

XPATH: OPERACIONOR EOF    {   
                     $$= new Nodo("INICIO","Xpath");
		       $$.addHijos($1);
                     return { ErrorLexico:arreglolexico,msj:"Analisis XPath Ascendenete Finalizado.\n.",diagramaAST:$$};
                     };




//                                          
//Bookstore/book/titulo | //Bookstore/book/titulo/pagina 

OPERACIONOR: OPERACIONOR simpleor OPERACIONOR            { 
                                                         $$ = new Nodo($2,"OPERACIONOR:simpleor");
                                                         $$.addHijos($1);
                                                         $$.addHijos($3);  
                                                         } 
              |PATHRELL1           { 
                                   $$ =$1; 
                                   } 
       ;


//                            //path1 //path2 //path3

PATHRELL1: PATHRELL1  sdiagonal PATHRELL1     { 
                                                 $$ = new Nodo($2,"PATHRELL1:sdiagonal");
                                                 $$.addHijos($1); 
                                                 $$.addHijos($3); 
                                              } 
       |PATHRELL1 ddiagonal  PATHRELL1           { 
                                                 $$ = new Nodo($2,"PATHRELL1:sdiagonal");
                                                 $$.addHijos($1); 
                                                 $$.addHijos($3); 
                                              } 
       
       |PATHRELL2                         { 
                                          $$ = $1;   
                                          }
       ; 

PATHRELL2:sdiagonal EXPRESION       {  
                                          $$ = new Nodo($1,"PATHRELL2:sdiagonal");   
                                          $$.addHijos($2);    
                                   }        
       |ddiagonal EXPRESION        {  
                                          $$ = new Nodo($1,"PATHRELL2:ddiagonal");  
                                          $$.addHijos($2); 
                                   }
       |EXPRESION                  {  
                                          $$ = $1;    
                                   }
       ;



// EXPRESION : RETONA UN VALOR    ---- INSTRUCCION : EJECUTA (REALIZA EL CALCULO)      	
EXPRESION:AXISNAME          {  
                            $$ = $1;   
                            }                                   
       |METODO              {  
                            $$ =$1;   
                            }
       |ACCES               {  
                            $$ = $1;   
                            }
       ;

ACCES:   identifier         {  
                            $$ = new Nodo($1,"ACCES:identificador");
                            }                                       // PRIMITIVO new primitivo expresion
       |arroba identifier   {  
                            $$ = new Nodo($1+$2,"ACCES:arrobaidentificador");
                              
                            }    // PRIMITIVOESP                              //ATRIBUTOE                     // INSTRUCCION retorna todos los atributos con el mismo nombre dentod de su padre
       |arroba mul          {  
                            $$ = new Nodo($1+$2,"ACCES:arrobamul");
                            }                                  //mul                     // INSTRUCCION retorna todos los atributos de la etiqueta padre
       //|mul {$$=$1;}
       |spunto              {  
                            $$ = new Nodo($1,"ACCES:spunto");    
                            }// retonos                                        // INSTRUCCION  .  retorna todos los nodos con el mismo nombre
       |dpunto              {  
                            $$ = new Nodo($1,"ACCES:dpunto");     
                            }// retonos                                       // INSTRUCCION   .. retorna el padre del nodo actual

       ;

//pendiente----------------------------------------
AXISNAME: NAMEAXIS ddospuntos  EXPRESION  {  
                                          $$ = new Nodo("Axis","AXISNAME:UNICO");
                                          $$.addHijos($1);
                                          $$.addHijos(new Nodo($2,"AXISNAME:dospuntos"));  
                                          $$.addHijos($3);    
                                          };


//TIPO NAMEAXIS enum   
NAMEAXIS:ancestor           {    
                             $$ = new Nodo($1,"NAMEAXIS:ancestor");
                            }                     
   |ancestor_or_self        {    
                             $$ = new Nodo($1,"NAMEAXIS:ancestor_or_self");
                            }            
   |attribute               {    
                             $$ = new Nodo($1,"NAMEAXIS:attribute");
                            }
   |child                   {    
                             $$ = new Nodo($1,"NAMEAXIS:child");
                            }
   |descendant              {    
                             $$ = new Nodo($1,"NAMEAXIS:descendant");
                            }
   |descendant_or_self      {    
                             $$ = new Nodo($1,"NAMEAXIS:descendant_or_self");
                            }
   |following               {    
                             $$ = new Nodo($1,"NAMEAXIS:following");
                            }
   |following_sibling       {    
                             $$ = new Nodo($1,"NAMEAXIS:following_sibling");
                            }
   |namespace_node          {    
                             $$ = new Nodo($1,"NAMEAXIS:namespace_node");
                            }
   |parent                  {    
                             $$ = new Nodo($1,"NAMEAXIS:parent");
                            }
   |preceding               {    
                             $$ = new Nodo($1,"NAMEAXIS:preceding");
                            }
   |preceding_sibling       {    
                             $$ = new Nodo($1,"NAMEAXIS:preceding_sibling");
                            }
   |self                    {    
                            $$ = new Nodo($1,"NAMEAXIS:self");
                            }
   ;

OPERACION:OPERACION mas OPERACION                {    
                                                 $$ = new Nodo($2,"OPERACION:mas");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION menos OPERACION                      {    
                                                 $$ = new Nodo($2,"OPERACION:menos");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);     
                                                 }
 |OPERACION mul OPERACION                        {    
                                                 $$ = new Nodo($2,"OPERACION:mul");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION div_ OPERACION                       {    
                                                 $$ = new Nodo($2,"OPERACION:div");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION igual OPERACION                      {    
                                                 $$ = new Nodo($2,"OPERACION:igual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION diferente OPERACION                  {    
                                                 $$ = new Nodo($2,"OPERACION:diferente");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION menorq OPERACION                     {    
                                                 $$ = new Nodo($2,"OPERACION:menorque");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION menorigual OPERACION                 {    
                                                 $$ = new Nodo($2,"OPERACION:menorigual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);       
                                                 }
 |OPERACION mayorq OPERACION                     {    
                                                  $$ = new Nodo($2,"OPERACION:mayorque");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION mayorigual OPERACION                 {    
                                                 $$ = new Nodo($2,"OPERACION:mayorigual");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERACION or_ OPERACION                        {    
                                                 $$ = new Nodo($2,"OPERACION:or");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);   
                                                 }
 |OPERACION and_ OPERACION                       {    
                                                 $$ = new Nodo($2,"OPERACION:and");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);    
                                                 }
 |OPERACION mod_ OPERACION                       {    
                                                  $$ = new Nodo($2,"OPERACION:mod");
                                                 $$.addHijos($1);
                                                 $$.addHijos($3);      
                                                 }
 |OPERAD                                         {    
                                                 $$ = $1  
                                                 }
 |PATHRELL1                                      {    
                                                 $$ = $1   
                                                 }
 ;

OPERAD: //Primitivo
       DecimalLiteral       {    
                            $$ = new Nodo($1,"OPERAD:decimal");
                            }
       |IntegerLiteral      {    
                            $$ = new Nodo($1,"OPERAD:entero");
                            }
       |StringLiteral       {    
                            $$ = new Nodo($1,"OPERAD:cadenaS"); 
                            }
       |CharLiteral         {    
                            $$ = new Nodo($1,"OPERAD:cadenaC");
                            }
       
       ;

//INSTRUCCION
METODO: text lparen rparen  {$$ = new Nodo($1,"METODO:text");  
                            }
       |node lparen rparen  {$$ = new Nodo($1,"METODO:node");  
                            }
       |last lparen rparen{$$ = new Nodo($1,"METODO:last");  
                            }
       |position lparen rparen{$$ = new Nodo($1,"METODO:posicion");  
                            }
       |arroba identifier lcorchete OPERACION rcorchete {$$ = new Nodo($1+$2,"METODO:atributo");
                                                        $$.addHijos(new Nodo($2,"METODO:lcorchete"));
                                                        $$.addHijos($3);
                                                        $$.addHijos(new Nodo($4,"METODO:rcorchete"));
                                                        }   
                            
       |identifier lcorchete OPERACION rcorchete        {$$ = new Nodo($1,"METODO:etiqueta");
                                                        $$.addHijos(new Nodo($2,"METODO:lcorchete"));
                                                        $$.addHijos($3);
                                                        $$.addHijos(new Nodo($4,"METODO:rcorchete"));
                                                        }   
       ;

