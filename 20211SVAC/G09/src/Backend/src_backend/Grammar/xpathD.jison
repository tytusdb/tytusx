%{      
        const { TipoSeleccion } = require('../Xpath/TipoSeleccion')
        const { OpBinaria } = require('../Xpath/OpBinaria')
        const { TiposOp } = require('../Xpath/TiposOp')
        const { Primitivo } = require('../Xpath/Primitivo')
        const { TipoVal } = require('../Xpath/TipoVal')
        const { ControlError } = require('../Xpath/ControlError')
        listaError = []
%}

%lex
%options case-insensitive
%%

[\s]+   {}
"<"     return 'menor'
">"     return 'mayor'
"//"    return 'dobleSlash'
"/"     return 'slash'
"="     return 'igual'
"|"     return 'barraVertical'
"+"     return 'mas'
"-"     return 'menos'
"*"     return 'asterisco'
"div"   return 'div'
"!="    return 'noIgual'
">="    return 'mayorQue'
"<="    return 'menorQue'
"and"   return 'and'
"or"    return 'or'

"@"     return '@'
"."     return 'punto'
".."    return 'dosPuntos' 
"::"    return 'dobleDosPuntos'
"["     return 'corecheteA'
"]"     return 'corcheteC'
"("     return 'parentesisA'
")"     return 'parentesisC'

"ancestor"              return 'ancestor'
"ancestor-or-self"      return 'ancestor-or-self'
"attribute"             return 'attribute'
"child"                 return 'child'
"descendant"            return 'descendant'
"descendant-or-self"    return 'descendant-or-self'
"following"             return 'following'
"following-sibling"     return 'following-sibling'
"namespace"             return "namespace"
"parent"                return 'parent'
"preceding"             return 'preceding'
"preceding-sibling"     return 'preceding-sibling'
"self"                  return 'self'

"node"          return 'NODO'
"lang"          return 'LANG'   
"position"      return 'POSICION'
"last"          return 'ULTIMO'
"text"          return 'TEXTO'

\'[^\']*\'				return 'CADENA'
[0-9]+("."[0-9]+)\b  	                return 'decimal'
[0-9]+\b				return 'entero'
[a-zA-Z_][a-zA-Z0-9_]*                  return 'identificador'
<<EOF>>				        return 'EOF'
.       {new ControlError(yytext, TipoSeleccion.ERROR_LEXICO, yylloc.first_line,yylloc.first_column,"XpathDescendente")}

/lex
%left 'mas' 'menos' 
%left 'asterisco' 'slash' 
%left 'MAYOR' 'MENOR' ' MAYORIGUAL' 'MENORIGUAL'


%start XPATH
%%

XPATH:
        CONCATENACION_SETS EOF  { return $1;  }
;


CONCATENACION_SETS
        :        LISTA_SETS   CONCATENACION_SETSAUX    {$2.push($1); $$=$2; }                              
;

CONCATENACION_SETSAUX
        :         barraVertical LISTA_SETS CONCATENACION_SETSAUX  {$3.push($2); $$=$3; }   
        |    {$$=[];}
;

LISTA_SETS: 
        SET LISTA_SETS  { 
                aux = $2
                while(aux.next != null) { 
                        aux = aux.next;  
                }; 
                aux.next = $1
                $$=$2; 
        }
        | SET  { $$=$1; }
        | error       { $$ = listaError.push(new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XpathDescendente"))}
;
      

SELECTOR:
        slash           { $$ = $1 }
        |dobleSlash     { $$ = $1 }
;

SET:
        identificador                          { $$ = {tipo: TipoSeleccion.ACCESO_NODO_RAIZ, id: $1, next: null }; }
        |SELECTOR MENU_SELECTOR         { $$ = {tipo: TipoSeleccion.SELECT_NODOS_FROM_NODO, selector: $1, id: $2.ids, predicado: $2.predicados, next: null }; }
         

;


MENU_SELECTOR: identificador MenuIdentificador
{
$$={
    ids:$1,
    predicados:$2
};

}
      
                | arroba MenuArroba
                | MENU_SET


;
MENU_SET:  dosPuntos
        | punto
        |asterisco
        

;
MenuIdentificador :  PREDICADO

{
$$=$1;

}
| 

{
$$ = null

}
   

;


MenuArroba : identificador
        | asterisco

;
PREDICADO:
        corecheteA OPERACION corcheteC  { $$ = $2; }
;

OPERACION:
          entero                         { $$ = new Primitivo(parseInt($1), TipoVal.ENTERO); }
         |decimal                        { $$ = new Primitivo(parseFloat($1), TipoVal.DECIMAL); }
;


MENU_OPERACION :mas OPERACION  

{

$$=
{

        tipo :TiposOp.SUMA,
        op:$2



};

}



| menos OPERACION


{

$$=
{

        tipo :TiposOp.RESTA,
        op:$2



};

}
| asterisco OPERACION


{

$$=
{

        tipo :TiposOp.MULTIPLICACION,
        op:$2



};

}
| slash OPERACION

{

$$=
{

        tipo :TiposOp.DIVISION,
        op:$2



};

}
;