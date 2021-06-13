/* Definición Léxica */
%lex

%options case-insensitive

%%
/* PALABRAS RESERVADAS */
"last"                     return  'last';
"position"                 return  'position';
"ancestor"                 return  'ancestor'; 
"attribute"                return  'attribute'
"child"                    return  'child'
"descendant"               return  'descendant'
"following"                return  'following'
"namespace"                return  'namespace'
"parent"                   return  'parent'
"preceding"                return  'preceding'
"sibling"                  return  'sibling'
"self"                     return  'self'
"node"                     return  'node'

/* SIMBOLOS PARA OPERACIONES ARITMÉTICAS */
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'por';
"%"                         return 'mod';
"div"                       return 'div';

/* SIMBOLOS PARA OPERACIONES RELACIONALES */
"<="                        return 'menorigual';
">="                        return 'mayorigual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'igual';
"=="                        return 'digual';
"!="                        return 'noigual';

"&&"                        return 'and';
"or"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'parentesisa';
")"                         return 'parentesisc';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';


"["                         return 'cora'
"]"                         return 'corc'
"."                         return 'punto'
".."                        return 'dpunto'
"::"                        return 'ddpuntos'
"@"                         return 'arroba'

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'entero';
[a-zA-Z0-9_]+                       return 'nodoid';
\/\/                                return 'ddoble'
\/                                  return 'dsimple'


//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS


// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'menor' 'mayor' 
%left 'menorigual' 'mayorigual' 
%left 'igual' 'noigual'
%left 'mas' 'menos'
%left 'por' 'div' 'mod' 
%left 'not'
%left UMINUS

%left 'parentesisa' 'parentesisc'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START : INSTRUCCIONES  {return $1;};

INSTRUCCIONES : NODOS EOF {$$=$1;};

NODOS : NODOS NODO {$$ = $1;}
       |NODO {$$=$1;};

NODO : ddoble NODO_F {$$ = $2;}
       |dsimple NODO_F {$$ = $2;}
       |NODO_F {$$ = $1;};

NODO_F : nodoid  PREDICADO {$$=$2;}
        |atributo PREDICADO {$$=$1;}
        |AXES {$$=$1;}
        |WILDCARD {$$=$1;};

AXES : ancestor AXES_F3 {$$=$1;}       
       |attribute AXES_F {$$=$1;}
       |child AXES_F {$$=$1;}
       |descendant AXES_F3 {$$=$1;}       
       |following AXES_F2 {$$=$1;}       
       |namespace AXES_F {$$=$1;}
       |parent AXES_F {$$=$1;}
       |preceding AXES_F2 {$$=$1;}       
       |self AXES_F {$$=$1;};

WILDCARD :  por PREDICADO {$$=$1;}           
          | node parentesisa parentesisc {$$=$1;};
       
AXES_F : ddpuntos PREDICADO {$$=$1;};

AXES_F2 : menos sibling AXES_F {$$=$1;}
         |;

AXES_F3 : menos or menos self AXES_F {$$=$1;}
         |;

PREDICADO : cora EXPRESION corc{$$=$2;}
                |;

EXPRESION : ARITMETICA {$$=$1;}
            |LOGICA {$$=$1;}
            |VAL_TERMINAL{$$=$1;}
            |WILDCARD {$$=$1;}
            |FUNCIONES {$$=$1;};

ARITMETICA : EXPRESION mas EXPRESION {$$=$1+$3;}
            |EXPRESION menos EXPRESION {$$=$1-$3;}
            |EXPRESION por EXPRESION {$$=$1*$3;}
            |EXPRESION div EXPRESION {$$=$1*$3;}
            |parentesisa EXPRESION parentesisc {$$=$2;};
            
VAL_TERMINAL :  entero {$$=$1;}
                |decimal{$$=$1;}
                |nodoid {$$=$1;}                
                |atributo {$$=$1;};

WILDCARD : arroba WILDCARD_F {$$=$1;};

WILDCARD_F: por {$$=$1;}
           |nodoid {$$=$1;};

FUNCIONES : last parentesisa parentesisc {$$=$1;}
            |position parentesisa parentesisc {$$=$1;};


LOGICA : EXPRESION menor  EXPRESION { $$='true';}
        |EXPRESION mayor  EXPRESION { $$='false';}
        |EXPRESION igual EXPRESION { $$='false';}
        |EXPRESION menorigual EXPRESION { $$='false';}
        |EXPRESION mayorigual EXPRESION { $$='false';};
                 
                

               
