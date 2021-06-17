# Gramatica XML

## Analizador Lexico
```python
\s+			// se ignoran espacios en blanco
[<][!][^-]*[-]+([^<!][^-]*[-]+)*[>]			// comentario multiple líneas

"<"	            return 'menorque';
">"	            return 'mayorque';
"/"	            return 'diagonal';
"="	            return 'igual';
"("	            return 'para';
")"	            return 'parc';
"&lt"               return 'lg';
"&gt"               return 'gt';
"&amp"              return 'amp';
"&apos"             return 'apos';
"&quot"             return 'quot';
"?"                 return 'interroga';    
"xml"               return 'tck_xml';
"version"           return 'tck_version';
"encoding"          return 'tck_encoding';

/* Espacios en blanco */
[ \r\t]+			{}
\n					{}


[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b          	return 'entero';

\".*?\"|\'.*?\'|\`.*?\`			{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([a-zA-Z])[a-zA-Z0-9_]*	    return 'identificador';
```

##Analizador Sintactico
```python
ini
	: EXML LISTA_PRINCIPAL EOF 
;

EXML : menorque  interroga tck_xml tck_version igual cadena tck_encoding igual cadena interroga mayorque;

LISTA_PRINCIPAL : LISTA_PRINCIPAL LISTA     
   				| LISTA                     
 ;


LISTA: menorque identificador LATRIBUTOS mayorque OBJETOS menorque diagonal identificador mayorque 
    | menorque identificador LATRIBUTOS mayorque PARRAFO menorque diagonal identificador mayorque 
    | menorque identificador LATRIBUTOS diagonal mayorque      
    | error ;

LATRIBUTOS: ATRIBUTOS        
           |   ;

ATRIBUTOS : ATRIBUTOS ATRIBUTO   
          | ATRIBUTO            ;

ATRIBUTO :  identificador igual cadena ;


OBJETOS: OBJETOS LISTA       
	   | LISTA               ;

PARRAFO : PARRAFO VALORES 
		| VALORES          ;

VALORES : identificador 
        | decimal 
        | entero 
        | lg 
        | gt 
        | amp 
        | apos 
        | quot ;
```

# Gramatica XPATH
## Analiador Lexico
```python
"//"				return 'doblediagonal';
"/"					return 'diagonal';
"("					return 'para';
")"					return 'parc';
"["					return 'corabre';
"]"					return 'corcierra';
"::"				return 'dospuntos';

"|"         return 'union';
"+"         return 'suma';
"-"         return 'resta';
"*"         return 'multiplicacion';
"div"       return 'division';
"="         return 'igual';
"!="        return 'distinto';
"<="				return 'menorigualque';
">="				return 'mayorigualque';
"<"					return 'menorque';
">"					return 'mayorque';
"and"			  return 'and';
"or"				return 'or';
"mod"				return 'mod';
".."                 return 'doblepunto';
"."                  return 'punto';
"@"                  return 'arroba';
"node()"             return 'nodo';
"text()"             return 'texto';
"last()"             return 'siguiente';
"position()"         return 'posicion';

"ancestor"           return 'ancestros';
"ancestor-or-self"   return 'ancestroself';
"attribute"          return 'atributos';
"child"              return 'hijos';
"descendant"         return 'descendiente';
"descendant-or-self" return 'descendienteself';
"following"          return 'siguientes';
"following-sibling"  return 'siguientehermano';
"namespace"          return 'espacionombres';
"parent"             return 'padre';
"preceding"          return 'anterior';
"preceding-sibling"  return 'hemanoanterior';
"self"               return 'mismo';

```
## Analizador Sintactico
```python
ini
	: LISTARUTAS EOF 
;

LISTARUTAS: LISTARUTAS union RUTA 
            |RUTA
            | error ;
;
RUTA: diagonal  DATO MOSTRAR RUTA2      
    |doblediagonal  DATO MOSTRAR RUTA2  
    | DATO MOSTRAR RUTA2 ;


RUTA2:   diagonal  DATO MOSTRAR RUTA2
        | doblediagonal DATO MOSTRAR RUTA2 
        | ;

DATO: identificador        
    |multiplicacion        
    |arroba TODOATRIBUTO   
    |punto                 
    |doblepunto            
    |siguiente             
    |texto                 
    |nodo                  
    |posicion              
    |RESERVADAS dospuntos DATO1;

RESERVADAS: ancestros     
        |ancestroself     
        |atributos        
        |hijos            
        |descendiente     
        |descendienteself 
        |siguientes       
        |siguientehermano 
        |espacionombres   
        |padre            
        |anterior         
        |hemanoanterior   
        |mismo            

DATO1: identificador   
    |multiplicacion   
    |arroba TODOATRIBUTO 
    |siguiente     
    |texto    
    |nodo                 ;

TODOATRIBUTO: multiplicacion 
            | identificador  ;


MOSTRAR: corabre OPEOCOND corcierra MOSTRAR 
        |   ;

OPEOCOND: CONDICION ;

CONDICION:CONDICION or CONDICION                
        | CONDICION and CONDICION               
        | CONDICION igual CONDICION             
        | CONDICION mayorigualque CONDICION     
        | CONDICION menorigualque CONDICION     
        | CONDICION menorque CONDICION          
        | CONDICION mayorque CONDICION          
        | CONDICION distinto CONDICION          
        | CONDICION suma  CONDICION             
        | CONDICION resta CONDICION             
        | CONDICION multiplicacion CONDICION    
        | CONDICION division CONDICION          
        | CONDICION mod CONDICION               
        | para CONDICION parc                   
        | entero                              
        | decimal                             
        | cadena                              
        | RUTA ;
```
