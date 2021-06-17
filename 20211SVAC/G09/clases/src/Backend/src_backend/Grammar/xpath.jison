%{      
        const { TipoSeleccion } = require('../Xpath/TipoSeleccion')
        const { OpBinaria } = require('../Xpath/OpBinaria')
        const { TiposOp } = require('../Xpath/TiposOp')
        const { Primitivo } = require('../Xpath/Primitivo')
        const { TipoVal } = require('../Xpath/TipoVal')

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

/lex
%left 'mas' 'menos' 
%left 'asterisco' 'slash' 
%left 'MAYOR' 'MENOR' ' MAYORIGUAL' 'MENORIGUAL'


%start XPATH
%%

XPATH:
        CONCATENACION_SETS EOF  { return $1; }
;


CONCATENACION_SETS:
        CONCATENACION_SETS barraVertical LISTA_SETS     { $1.push($3); $$=$1; }
        |LISTA_SETS                                     { $$ = [$1]; }
;

LISTA_SETS: 
        LISTA_SETS SET  { 
                aux = $1
                while(aux.next != null) { 
                        aux = aux.next;  
                }; 
                aux.next = $2
                $$=$1; 
        }
        |SET    { $$ = $1; }
;


SELECTOR:
        slash           { $$ = $1 }
        |dobleSlash     { $$ = $1 }
;

SET:
        identificador                          { $$ = {tipo: TipoSeleccion.ACCESO_NODO_RAIZ, id: $1, next: null }; }
        |SELECTOR identificador                { $$ = {tipo: TipoSeleccion.SELECT_NODOS_FROM_NODO, selector: $1, id: $2, predicado: null, next: null }; }
        |SELECTOR identificador PREDICADO      { $$ = {tipo: TipoSeleccion.SELECT_NODOS_FROM_NODO, selector: $1, id: $2, predicado: $3, next: null }; }
        |SELECTOR arroba identificador         
        |SELECTOR dosPuntos
        |SELECTOR punto
        |SELECTOR arroba asterisco
        |SELECTOR asterisco
;

PREDICADO:
        corecheteA OPERACION corcheteC  { $$ = $2; }
;

OPERACION:
        OPERACION mas OPERACION         { $$ = new OpBinaria($1, $3, TiposOp.SUMA); }
        |OPERACION menos OPERACION      { $$ = new OpBinaria($1, $3, TiposOp.RESTA); }
        |OPERACION asterisco OPERACION  { $$ = new OpBinaria($1, $3, TiposOp.MULTIPLICACION); }
        |OPERACION slash OPERACION      { $$ = new OpBinaria($1, $3, TiposOp.DIVISION) }
        |entero                         { $$ = new Primitivo(parseInt($1), TipoVal.ENTERO); }
        |decimal                        { $$ = new Primitivo(parseFloat($1), TipoVal.DECIMAL); }
;