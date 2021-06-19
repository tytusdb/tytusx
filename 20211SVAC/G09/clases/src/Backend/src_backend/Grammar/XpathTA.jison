%{    
        const { ControlError } = require('../Xpath/ControlError')
            const { TipoSeleccion } = require('../Xpath/TipoSeleccion')
%}
%lex
%options case-insensitive
%%

[\s]+                             {} // Espacios en blanco

//simbolos
"<" return 'MENOR'
">" return 'MAYOR'
"//" return 'SLASH_DOBLE'
"/" return 'SLASH'
"=" return 'IGUAL'
"|" return 'SEPARADOR'
"+" return 'MAS'
"-" return 'MENOS'
"*" return 'MULTIPLICACION'
"div" return 'DIVISION'
"!=" return 'DIFERENTE'
">=" return 'MAYOR_IGUAL'
"<=" return 'MENOR_IGUAL'
"and" return 'AND'
"or" return 'OR'
"mod" return 'MODULAR'
"@" return 'ARROBA'
"." return 'PUNTO'
".." return 'DOBLE_PUNTO' 
"::" return 'DOBLE_DOSPUNTOS'
"[" return 'COR_IZQUIERDO'
"]" return 'COR_DERECHO'
"(" return 'PAR_IZQUIERDO'
")" return 'PAR_DERECHO'

//reservadas-selects
"ancestor" return 'ANCESTOR'
"attribute" return 'ATTRIBUTE'
"child" return 'CHILD'
"descendant" return 'DESCENDANT'
"following" return 'FOLLOWING'
"namespace" return "NAMESPACE"
"parent" return 'PARENT'
"preceding" return 'PRECEDING'
"self" return 'SELF'
"silbling" return 'SILBLING'
//locales
"node" return 'NODO'
"lang" return 'LANG'   
"position" return 'POSICION'
"last" return 'ULTIMO'
"text" return 'TEXTO'



//expresiones regulares
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO'
[a-zA-Z_][a-zA-Z0-9_]*  return 'ID'

<<EOF>>				return 'EOF';
.       {console.log(yytext,"ErroreLexico");new ControlError(yytext, TipoSeleccion.ERROR_LEXICO, yylloc.first_line,yylloc.first_column,"XpathAscendente") }
/lex

%{
//importaciones y demas    
%}

%left 'AND' 'OR' 
%left 'IGUALIGUAL' 'DIFERENTE' 
%left 'MAYOR' 'MENOR' ' MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION'

// inicia la gramatica
%start xpath
%%

inicio 
        :        xpath SEPARADOR xpath
        |       xpath
;
xpath
        :       simbolo produccion EOF
        |       produccion EOF 
;

produccion   
        :       produccion simbolo produccionaux
        |       produccion simbolo ComandosLocales
        |       produccionaux
;


simbolo
        :       SLASH
        |       SLASH_DOBLE
;

produccionaux
        :       PUNTO 
        |       DOBLE_PUNTO
        |       ARROBA simboloaux
        |       ARROBA 
        |       ID
        |       MULTIPLICACION
        |       ID atributos
        |       error  SEPARADOR {console.log("error sintactico")
        
                new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XPathAscendente")
    
        
        }
;


atributos 
        :       COR_IZQUIERDO operacion COR_DERECHO
;

operacion 
        :       operacion AND operacion           {$$ = $1 + "and" + $3;}
        |       operacion OR operacion            {$$ = $1 + "or" + $3;}
        |       operacion_relacional              {$$ = $1;}
;

operacion_relacional
        :       operacion_numerica   IGUAL      operacion_numerica                {$$ = $1 + "==" + $3;}
        |       operacion_numerica   DIFERENTE       operacion_numerica                {$$ = $1 + "!=" + $3;}
        |       operacion_numerica   MAYOR           operacion_numerica                {$$ = $1 + ">" + $3;}
        |       operacion_numerica   MENOR           operacion_numerica                {$$ = $1 + "<" + $3;}
        |       operacion_numerica   MAYOR_IGUAL      operacion_numerica                {$$ = $1 + ">=" + $3;}
        |       operacion_numerica   MENOR_IGUAL      operacion_numerica                {$$ = $1 + "<=" + $3;}
        |       operacion_numerica                                                     {$$ = $1;}
        ;

operacion_numerica 
        :   operacion_numerica   MAS             operacion_numerica                {$$ = $1 + "+" + $3;}
        |   operacion_numerica   MENOS           operacion_numerica                {$$ = $1 + "-" + $3;}
        |   operacion_numerica   MULTIPLICACION  operacion_numerica                {$$ = $1 + "*" + $3;}
        |   operacion_numerica   DIVISION        operacion_numerica                {$$ = $1 + "/" + $3;}
        |   valor                {$$ = $1;}
;

  

valor 
        :   ENTERO               {$$ = $1;} 
        |   ID                   {$$ = $1;}
        |   DECIMAL              {$$ = $1;}
        |   CADENA               {$$ = '\"'+$1+'\"';}  
        |   ARROBA simboloaux   
        |   punto
        |   localaux            
;

localaux
        :LANG 
        |TEXTO PAR_IZQUIERDO PAR_DERECHO
        |POSICION PAR_IZQUIERDO PAR_DERECHO
        |ULTIMO PAR_IZQUIERDO PAR_DERECHO
        |NODO PAR_IZQUIERDO PAR_DERECHO
        
;

simboloaux
        : ID
        | MULTIPLICACION
        |LANG
;

ComandosLocales
        :   local DOBLE_DOSPUNTOS valor
        |   local DOBLE_DOSPUNTOS MULTIPLICACION
;

local
        :   ANCESTOR
        |   ANCESTOR MENOS OR MENOS SELF
        |   ATTRIBUTE
        |   CHILD
        |   DESCENDANT
        |   DESCENDANT MENOS OR MENOS SELF
        |   PRECEDING
        |   PRECEDING MENOS SIBLING   
        |   PARENT
        |   SELF
        |   NAMESPACE
        |   FOLLOWING
        |   FOLLOWING  MENOS SIBLING
;