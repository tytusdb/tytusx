
%{
    const { Valor }  = require('../Instrucciones/Valor');
    const { Aritmetica, TipoA} = require('../Expresiones/Aritmetica')
    const { Primitivo } = require('../Expresiones/Primitivo')
    const { TipoDato } = require ('../../InterpreteXML/TablaSimbolo/TipoDato')
    const { Relacional } = require ('../Expresiones/Relacional')
    const { Logica, TipoL} = require('../Expresiones/Logica')
    const { Funcion, TipoF } = require ('../Instrucciones/Funcion')
    const { Ruta } = require ('../Instrucciones/Ruta')

    const { Consulta } = require('../Instrucciones/Consulta')
    const { Cuerpo } = require('../Instrucciones/Cuerpo')
    const { Predicado } = require('../Instrucciones/Predicado')

    var Auxi = []; 
    var instr = ""
    var Tokens =[]
    var cvivar = ""
%}
/*-----------------------------LEXICO-----------------------------*/
%lex

%options case-insensitive

%%
\s+                                         /* skip whitespace */
// \(:(\S)*:\) COMENTARIO      
"text"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_TEXT'; }
"node"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_NODE'; }
"last"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_LAST'; }
"position"                      { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_POSITION'; }
"or"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_OR'; }
"and"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_AND'; }
"div"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DIV'; }
"mod"                           { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_MOD'; }
"eq"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_EQ'; }
"ne"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_NE'; }
"lt"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_LT'; }
"le"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_LE'; }
"gt"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_GT'; }
"ge"                            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_GE'; }
"child"                         { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_CHILD'; }
"descendant-or-self"            { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DESCENDANT_OR_SELF'; }
"descendant"                    { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_DESCENDANT'; }
"attribute"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ATTRIBUTE'; }
"self"                          { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_SELF'; }
"following-sibling"             { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_FOLLOWING_SIBLING'; }
"namespace"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_NAMESPACE'; }
"following"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_FOLLOWING'; }
"parent"                        { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PARENT'; }
"ancestor-or-self"              { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ANCESTOR_OR_SELF'; }
"ancestor"                      { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_ANCESTOR'; }
"preceding-sibling"             { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PRECEDING_SIBLING'; }
"preceding"                     { Tokens.push(['reservada',     yytext, (yylineno + 1).toString()]); return 'R_PRECEDING'; }
"("                             { Tokens.push(['paren. a.',     yytext, (yylineno + 1).toString()]); return 'PARENTESIS_ABRE'; }
")"                             { Tokens.push(['paren. c.',     yytext, (yylineno + 1).toString()]); return 'PARENTESIS_CIERRA'; }
"["                             { Tokens.push(['corch. a.',     yytext, (yylineno + 1).toString()]); return 'CORCHETE_ABRE'; }
"]"                             { Tokens.push(['corch. c.',     yytext, (yylineno + 1).toString()]); return 'CORCHETE_CIERRA'; }        
"<="                            { Tokens.push(['menor igual',   yytext, (yylineno + 1).toString()]); return 'LE'; }
">="                            { Tokens.push(['mayor igual',   yytext, (yylineno + 1).toString()]); return 'GE'; }
"<"                             { Tokens.push(['menor',         yytext, (yylineno + 1).toString()]); return 'LT'; }
">"                             { Tokens.push(['mayor',         yytext, (yylineno + 1).toString()]); return 'GT'; }
"="                             { Tokens.push(['igual',         yytext, (yylineno + 1).toString()]); return 'E'; }
"!="                            { Tokens.push(['distinto',      yytext, (yylineno + 1).toString()]); return 'NE'; }
"::"                            { Tokens.push(['acceso',        yytext, (yylineno + 1).toString()]); return 'ACCESO'; }
":"                             { Tokens.push(['acceso',         yytext, (yylineno + 1).toString()]); return 'SEPARADOR'; }
"@"                             { Tokens.push(['arroba',        yytext, (yylineno + 1).toString()]); return 'ARROBA'; }
".."                            { Tokens.push(['doble_punto',   yytext, (yylineno + 1).toString()]); return 'DPUNTO'; }
"."                             { Tokens.push(['punto',         yytext, (yylineno + 1).toString()]); return 'PUNTO'; }
"|"                             { Tokens.push(['union',         yytext, (yylineno + 1).toString()]); return 'UNION'; }
"*"                             { Tokens.push(['multi',         yytext, (yylineno + 1).toString()]); return 'MULTIPLICACION'; }
"//"                            { Tokens.push(['doble barra',   yytext, (yylineno + 1).toString()]); return 'DBARRA'; }
"/"                             { Tokens.push(['barra',         yytext, (yylineno + 1).toString()]); return 'BARRA'; }
"-"                             { Tokens.push(['menos',         yytext, (yylineno + 1).toString()]); return 'RESTA'; }
"+"                             { Tokens.push(['mas',           yytext, (yylineno + 1).toString()]); return 'SUMA'; }
(\"[^"]*\")                     { Tokens.push(['cadena',        yytext, (yylineno + 1).toString()]); return 'CADENA'; }
[\'][^\'\n][\']                 { Tokens.push(['caracter',      yytext, (yylineno + 1).toString()]); return 'CARACTER'; }
[0-9]+("."[0-9]+)               { Tokens.push(['decimal',       yytext, (yylineno + 1).toString()]); return 'DECIMAL'; }
[0-9]+                          { Tokens.push(['entero',        yytext, (yylineno + 1).toString()]); return 'ENTERO'; }
[A-Za-z][A-Za-z0-9_]*           { Tokens.push(['identificador', yytext, (yylineno + 1).toString()]); return 'IDENTIFICADOR'; }

<<EOF>>			    	return 'EOF';

/lex


%start INICIO
%%

INICIO:                 EXPRESION_SIMPLE EOF                                    { return [$1]; }
;       
//ya
EXPRESION_SIMPLE:       EXPRESION_AND                                           { $$ = $1 }
        |               EXPRESION_SIMPLE R_OR EXPRESION_AND                     { $$ = new Logica(@1.first_line, @1.first_column,$1,$3,TipoL.OR) }
;
//ya
EXPRESION_AND:          EXPRESION_COMPARAC                                      { $$ = $1 }
        |               EXPRESION_AND R_AND EXPRESION_COMPARAC                  { $$ = new Logica(@1.first_line, @1.first_column,$1,$3,TipoL.AND) }
;
//ya
EXPRESION_COMPARAC:     EXPRESION_ADICION                                       { $$ = $1 }
        |               EXPRESION_ADICION OPERADORES_LOGICOS EXPRESION_ADICION  { $$ = new Relacional(@1.first_line, @1.first_column,$1,$3,$2) }
;
//ya
OPERADORES_LOGICOS:     E                                                       { $$ = $1 }
        |               NE                                                      { $$ = $1 }
        |               LT                                                      { $$ = $1 }
        |               LE                                                      { $$ = $1 }
        |               GT                                                      { $$ = $1 }
        |               GE                                                      { $$ = $1 }
;
//ya
EXPRESION_ADICION:      EXPRESION_MULTI                                         { $$ = $1 }
        |               EXPRESION_ADICION RESTA EXPRESION_MULTI                 { $$ = new Aritmetica(@1.first_line, @1.first_column,$1,$3,TipoA.RESTA) }
        |               EXPRESION_ADICION SUMA EXPRESION_MULTI                  { $$ = new Aritmetica(@1.first_line, @1.first_column,$1,$3,TipoA.SUMA) }
;
//ya
EXPRESION_MULTI:        EXPRESION_UNION                                         { $$ = $1 }
        |               EXPRESION_MULTI MULTIPLICACION EXPRESION_UNION          { $$ =new Aritmetica(@1.first_line, @1.first_column,$1,$3,TipoA.MULTI) }
        |               EXPRESION_MULTI R_DIV EXPRESION_UNION                   { $$ =new Aritmetica(@1.first_line, @1.first_column,$1,$3,TipoA.DIV) }
        |               EXPRESION_MULTI R_MOD EXPRESION_UNION                   { $$ = new Aritmetica(@1.first_line, @1.first_column,$1,$3,TipoA.MOD) }
;

// varias consultas
EXPRESION_UNION:        EXPRESION_UNARIA                                        { $$ = $1 }
        |               EXPRESION_UNION UNION EXPRESION_UNARIA                  { $$ = $1 + " " + $2 + " " + $3 }
;

EXPRESION_UNARIA:       RUTA_RELATIVA                                           { $$ = $1 ; }//instr = $1.ast()
        |               SIMBOLO RUTA_RELATIVA                                   { $$ = $1 + $2 }
;

SIMBOLO:                SUMA                                                    { $$ = $1 }
        |               RESTA                                                   { $$ = $1 }
        |               SIMBOLO SUMA                                            { $$ = $1  +  $2 }
        |               SIMBOLO RESTA                                           { $$ = $1  +  $2 }
;
//ya      /bookstore/book       
RUTA_RELATIVA:          DBARRA PASO                                             {  $$ = new Consulta(@1.first_column,$1,$2,null) }  
        |               BARRA PASO                                              {  $$ = new Consulta(@1.first_column,$1,$2,null) }
        |               PASO                                                    {  $$ = $1  } //
        |               RUTA_RELATIVA BARRA PASO                                {  $$ = new Consulta(@1.first_column,$2,$3,$1) }
        |               RUTA_RELATIVA DBARRA PASO                               {  $$ = new Consulta(@1.first_column,$2,$3,$1)}
;               
//ya
PASO:                   PASO_EJE                                                { $$ = $1 ; 
                                                                                }
        |               POSTFIX                                                 { $$ = $1 }
;       

// ya  ====
PASO_EJE:               PASO_ADELANTE LISTA_PREDICADOS_AUX                      { 
                                                                                        $1.predicado = $2; $$ = $1 // cuerpo
                                                                                }
        |               PASO_ATRAS LISTA_PREDICADOS_AUX                         {
                                                                                        $1.predicado = $2; $$=$1
                                                                                }  // .. or a::a [exp]
;
//ya
LISTA_PREDICADOS_AUX:   LISTA_PREDICADOS                                        { $$ = $1 }     //[ exp ]
        |                                                                       { $$ = null }
;

//ya medias
LISTA_PREDICADOS:       PREDICADO                                               { $$ = $1 }
        |               LISTA_PREDICADOS PREDICADO                              { $$ = $1.push($2) } 
;
//ya
PREDICADO:              CORCHETE_ABRE EXPRESION_SIMPLE CORCHETE_CIERRA          {  $$=new Predicado(@1.first_column,$2) }//instr=$2.ast() ;$$ = $1 + $2.evaluar().getValorImplicito() + $3;
;

// ya
PASO_ADELANTE:          EJE_ADELANTE PRUEBA_NODO                                {$$ = new Cuerpo(@1.first_column,
                                                                                                new Funcion(@1.first_column,$1,TipoF.ACCESO, $2),
                                                                                                ); } 
                                                                                /* child :: id:id
                                                                                    child:: id
                                                                                    child:: *        */
        |               PASO_ADELANTE_ABREV                                     { $$ = $1 } // cuerpo
;
//ya
EJE_ADELANTE:           R_CHILD ACCESO                                          { $$ = $1  +  $2 }  // child::
        |               R_DESCENDANT ACCESO                                     { $$ = $1  +  $2 }  // descendant::
        |               R_ATTRIBUTE ACCESO                                      { $$ = $1  +  $2 }  // atribute ::
        |               R_SELF ACCESO                                           { $$ = $1  +  $2 }      // etc
        |               R_DESCENDANT_OR_SELF ACCESO                             { $$ = $1  +  $2 }
        |               R_FOLLOWING_SIBLING ACCESO                              { $$ = $1  +  $2 }
        |               R_FOLLOWING ACCESO                                      { $$ = $1  +  $2 }
        |               R_NAMESPACE ACCESO                                      { $$ = $1  +  $2 }
;
//ya
PASO_ADELANTE_ABREV:    ARROBA PRUEBA_NODO                                      {  
                                                                                        $$ = new Cuerpo(@1.first_column,null,$1,$2,null);
                                                                                        // @ // id:id   or  id   or  * or funcion() 
                                                                                }              
        |               PRUEBA_NODO                                             {
                                                                                        $$ = new Cuerpo(@1.first_column,null,null,$1,null);
                                                                                }                
;

// ya
PASO_ATRAS:             EJE_ATRAS PRUEBA_NODO                                   { 
                                                                                $$ = new Cuerpo(@1.first_column,
                                                                                                new Funcion(@1.first_column,$1,TipoF.ACCESO, $2),
                                                                                                );
                                                                                
                                                                                 /* ancestor::  position() 
                                                                                    ancestor:: id:id
                                                                                    ancestor:: id
                                                                                    ancestor:: *        */ }                                                                       
        |               PASO_ATRAS_ABREV                                        { 
                                                                                  $$ = new Cuerpo(@1.first_column,null,null,$1,null);
                                                                                } 
                                                                                 //  ..                 
;
// ya
EJE_ATRAS:              R_PARENT ACCESO                                         { $$ = $1  +  $2; $$ = $1 }             
        |               R_ANCESTOR ACCESO                                       { $$ = $1  +  $2;$$ = $1 }             
        |               R_PRECEDING_SIBLING ACCESO                              { $$ = $1  +  $2;$$ = $1 }                    
        |               R_PRECEDING ACCESO                                      { $$ = $1  +  $2;$$ = $1 }              
        |               R_ANCESTOR_OR_SELF ACCESO                               { $$ = $1  +  $2;$$ = $1 }                    
;
// ya
PASO_ATRAS_ABREV:       DPUNTO                                                  { $$ = $1 } //    ..
;
// ya
PRUEBA_NODO:            NOMBRE_PRUEBA                                           { $$ = $1 } // id:id   or  id   or  *
        |               TIPO_PRUEBA                                             { $$ = $1 } // funcion()
;
// ya
NOMBRE_PRUEBA:          Q_NAME                                                  { $$ = $1 }  // id:id   or  id
        |               WILDCARD                                                { $$ = $1 }  // *
;
// ya
WILDCARD:               MULTIPLICACION                                          {  $$ = new Primitivo(0, @1.first_column, TipoDato.FILTRO, $1) }  // *
;       
// ya
Q_NAME:                 NOMBRE_PREFIJO                                          { $$ = $1 }   // id:id
        |               NOMBRE_SIN_PREFIJO                                      { $$ = $1 }   //id
;
// aun no
NOMBRE_PREFIJO:         NCNAME SEPARADOR NCNAME                                 { $$ = new Primitivo(0, @1.first_column, TipoDato.VARIABLE, [$1,$2,$3])  }   // id:id
;
// ya
NOMBRE_SIN_PREFIJO:     NCNAME                                                  { $$ = $1 } //id
;
// ya
NCNAME:                 IDENTIFICADOR                                           { $$ = new Primitivo(0, @1.first_column, TipoDato.VARIABLE, $1)  }
;

// ya
TIPO_PRUEBA:            PRUEBA_TEXTO                                            { $$ = $1 }  // text()
        |               PRUEBA_NODE                                             { $$ = $1 }    //node()
        |               PRUEBA_POSICION                                         { $$ = $1 }     //position()
        |               PRUEBA_ULTIMO                                           { $$ = $1 }     //last()
;
// ya
PRUEBA_ULTIMO:          R_LAST PARENTESIS_ABRE PARENTESIS_CIERRA                { $$ = $1 + $2 + $3; $$ = new Funcion(1,$1,TipoF.FUNCION) }
;
// ya
PRUEBA_TEXTO:           R_TEXT PARENTESIS_ABRE PARENTESIS_CIERRA                { $$ = $1 + $2 + $3;$$ = new Funcion(1,$1,TipoF.FUNCION) }
;// ya

PRUEBA_POSICION:        R_POSITION PARENTESIS_ABRE PARENTESIS_CIERRA            { $$ = $1 + $2 + $3;$$ = new Funcion(1,$1,TipoF.FUNCION) }
;// ya

PRUEBA_NODE:            R_NODE PARENTESIS_ABRE PARENTESIS_CIERRA                { $$ = $1 + $2 + $3 ;$$ = new Funcion(1,$1,TipoF.FUNCION) }
;
//ya
POSTFIX:                EXPRESION_PRIMARIA                                      { $$ = new Cuerpo(@1.first_column,null,null,$1,null); }       // primitivo or expresion
        |               EXPRESION_PRIMARIA LISTA_PREDICADOS                     { $$ =  new Cuerpo(@1.first_column,null,null,$1,$2); }  // primitivo or expresion     predicado
;
//ya
EXPRESION_PRIMARIA:     LITERAL                                                 { $$ = $1 } //primitivo
        |               EXPRESION_PARENTESIS                                    { $$ = $1 } // expresion
;
//ya
EXPRESION_PARENTESIS:   PARENTESIS_ABRE PARENTESIS_CIERRA                       { $$ = $1 + $2 } // ()
        |               PARENTESIS_ABRE EXPRESION_SIMPLE PARENTESIS_CIERRA      { $$ =$2 }       // ( exp )
;
//ya
LITERAL:                LITERAL_NUMERO                                          { $$ = $1 } //primitivo
        |               CADENA                                                  { $$ = $1 }
;//ya

LITERAL_NUMERO:        ENTERO                                                   { $$ = new Primitivo(0, 0, TipoDato.INT, $1) }
	|              DECIMAL                                                  { $$ = new Primitivo(0,@1.first_column, TipoDato.DOUBLE, $1) }
; 