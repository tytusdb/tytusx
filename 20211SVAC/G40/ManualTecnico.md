# TytusX

## Información General
- SO: Windows 10
- Lenguaje: JavaScript
- Oscar Alfredo Llamas Lemus
- Grupo 40

&nbsp; 
<font size="4">[TytusX URL: ](https://tytusdb.github.io/tytusx/20211SVAC/G40/) https://tytusdb.github.io/tytusx/20211SVAC/G40/ </font> 
---
&nbsp; 

# Contenido 


- [Herramientas](#herramientas)
  - [Jison](#Jison)
  - [Visjs](#Visjs)
- [Gramáticas](#gramáticas)
  - [Ascendentes](#ascendentes)
  - [Descendentes](#descendentes)
- [Clases importantes](#clases-importantes)
- [Anexos](#anexos)

# Herramientas

## [Jison](https://zaa.ch/jison/)

- Herramienta utilizada para generar los analizadores. 
---

## [Visjs](https://visjs.org/)

- Herramienta utilizada para generar los grafos.
---
&nbsp;
&nbsp; 

# Gramáticas

## Ascendentes

```js
INICIO : LISTA_XPATH EOF    
LISTA_XPATH: SETS OTRO_SET 
        
OTRO_SET: tk_barra SETS OTRO_SET 
        | 

SETS: SETS SET 
    | SET  

SET:    SELECTORES EXPRESION 
   |    EXPRESION
   |    AXES
   |    SELECTORES AXES  



SELECTORES: tk_dobleslash OTRO_SELECTOR 
         |  tk_dobleslash 
         |  tk_slash 
         |  tk_slash OTRO_SELECTOR 
         |  OTRO_SELECTOR  

OTRO_SELECTOR: tk_dpds AGREGAR_SELECTOR 
            |  tk_pds  AGREGAR_SELECTOR 
            |  tk_dps  AGREGAR_SELECTOR 
            |  tk_ps   AGREGAR_SELECTOR 

AGREGAR_SELECTOR:  OTRO_SELECTOR 
                | 

EXPRESION : tk_identificador PREDICADO 
        |  tk_asterisco PREDICADO 
        |  tk_punto 
        |  tk_doblepunto 
        |  tk_node PREDICADO 

PREDICADO : tk_corchetea EXPRESION_FILTRO tk_corchetec  
        |  


EXPRESION_FILTRO : EXPRESION_LOGICA 

AXES :          tk_ancestorself   EXPRESION      
        |       tk_ancestor   EXPRESION          
        |       tk_child      EXPRESION          
        |       tk_descendantself EXPRESION      
        |       tk_descendant  EXPRESION         
        |       tk_followingsibling EXPRESION    
        |       tk_following  EXPRESION          
        |       tk_self  EXPRESION               
        |       tk_parent  EXPRESION             
        |       tk_precedingsibling EXPRESION    
        |       tk_preceding  EXPRESION          

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA 
        |  tk_attribute tk_identificador tk_igual CADENA  


EXPRESION_LOGICA : EXPRESION_LOGICA tk_and EXPRESION_RELACIONAL 
                |  EXPRESION_LOGICA tk_or EXPRESION_RELACIONAL      
                |  EXPRESION_RELACIONAL 


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA      
                |       EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA   
                |       EXPRESION_NUMERICA        
                |       ATRIBUTO 
                |       tk_asterisco 
                |       tk_arrobaasterisco 
                |       tk_node   


EXPRESION_CADENA :      CADENA 
                |      EXPRESION_NUMERICA 

EXPRESION_NUMERICA : tk_menos EXPRESION_NUMERICA %prec UMENOS	
	| EXPRESION_NUMERICA tk_mas EXPRESION_NUMERICA		
	| EXPRESION_NUMERICA tk_menos EXPRESION_NUMERICA	
	| EXPRESION_NUMERICA tk_asterisco EXPRESION_NUMERICA	
    | EXPRESION_NUMERICA tk_mod EXPRESION_NUMERICA	        
	| EXPRESION_NUMERICA tk_division EXPRESION_NUMERICA	
	| tk_parentesisa EXPRESION_NUMERICA tk_parentesisc	
	| tk_entero						
	| tk_decimal						
    | tk_last                                               
    | AXES                                                  
    | tk_position                                           
	| tk_identificador	                                

CADENA :     tk_cadena1 
    |        tk_cadena2 


```

## Descendentes

```js
NICIO : LISTA_XPATH EOF     
                                return $$ } 
LISTA_XPATH: SETS OTRO_SET 
        
OTRO_SET: tk_barra SETS OTRO_SET 
        | 

SETS: SET OS 

OS: SET OS 
    | 

SET:    SELECTORES EXPRESION 
   |    EXPRESION
   |    AXES 
   |    SELECTORES AXES 

SELECTORES: tk_dobleslash OTRO_SELECTOR 
         |  tk_dobleslash 
         |  tk_slash 
         |  tk_slash OTRO_SELECTOR 
         |  OTRO_SELECTOR 

OTRO_SELECTOR: tk_dpds AGREGAR_SELECTOR 
            |  tk_pds  AGREGAR_SELECTOR 
            |  tk_dps  AGREGAR_SELECTOR 
            |  tk_ps   AGREGAR_SELECTOR 

AGREGAR_SELECTOR:  OTRO_SELECTOR 
                | 

EXPRESION : tk_identificador PREDICADO 
        |  tk_asterisco PREDICADO 
        |  tk_punto 
        |  tk_doblepunto 
        |  tk_node PREDICADO 

PREDICADO : tk_corchetea EXPRESION_FILTRO tk_corchetec  
        |  


EXPRESION_FILTRO : EXPRESION_LOGICA 

AXES :          tk_ancestorself   EXPRESION      
        |       tk_ancestor   EXPRESION          
        |       tk_child      EXPRESION          
        |       tk_descendantself EXPRESION      
        |       tk_descendant  EXPRESION         
        |       tk_followingsibling EXPRESION    
        |       tk_following  EXPRESION          
        |       tk_self  EXPRESION               
        |       tk_parent  EXPRESION             
        |       tk_precedingsibling EXPRESION    
        |       tk_preceding  EXPRESION          

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA  
          |  tk_attribute tk_identificador tk_igual CADENA  


EXPRESION_LOGICA : EXPRESION_RELACIONAL tk_and EXPRESION_LOGICA 
                |  EXPRESION_RELACIONAL tk_or EXPRESION_LOGICA      
                |  EXPRESION_RELACIONAL 


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA 
                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA      
                |       EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA   
                |       EXPRESION_NUMERICA        
                |       ATRIBUTO 
                |       tk_asterisco 
                |       tk_arrobaasterisco 
                |       tk_node   

EXPRESION_CADENA :  CADENA 
                |   EXPRESION_NUMERICA 

CADENA :         tk_cadena1 
        |        tk_cadena2 

EXPRESION_NUMERICA: tk_menos EXPRESION_NUMERICA %prec  UMENOS   
                |  tk_entero EXPRESION_PRIMA      
	        | tk_decimal EXPRESION_PRIMA             
                | tk_last EXPRESION_PRIMA                          
                | AXES EXPRESION_PRIMA                                 
                | tk_position EXPRESION_PRIMA            
	        | tk_identificador EXPRESION_PRIMA


EXPRESION_PRIMA:            tk_mas  EXPRESION_NUMERICA                            
                    |       tk_menos EXPRESION_NUMERICA                 
                    |       tk_asterisco EXPRESION_NUMERICA                      
                    |       tk_mod EXPRESION_NUMERICA                        
                    |      tk_division EXPRESION_NUMERICA                                      
                    |       tk_parentesisa EXPRESION_NUMERICA tk_parentesisc  
                    |                              
```

# Clases importantes

• Objeto: clase para representar cada elemento XML
```js
var Objeto = /** @class */ (function () {
    function Objeto(id1, id2, texto, linea, columna, listaAtributos, listaObjetos, agregar) {...
```

• Entorno: clase para representar cada entorno de los nodos XML
```js
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {...
```

• Atributo: clase para representar cada atributo del los elementos en el archivo XML.
```js
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {...
```

• Axes: clase para representar las funciones Axes en XPath
```js
var Axes = /** @class */ (function () {
    function Axes(linea, columna, tipo, expresion) {...
```

• ExpresionXPath: clase para representar las funciones en XPath
```js
var ExpresionXPath = /** @class */ (function () {
    function ExpresionXPath(linea, columna, identificador, tipo, predicado) {...
```

• NodoXPath: clase para representar los nodos de una expresion XPath
```js
var NodoXpath = /** @class */ (function () {
    function NodoXpath(id, tipo, axes, listaSelectores, expresion, linea, columna) {...
```    

• Primitivo: clase para representar cada valor primitivo
```js
var Primitivo = /** @class */ (function () {
    function Primitivo(valor, linea, columna) {...
```  

• TablaSimbolos: clase para representar la tabla de simbolos
```js
var TablaSimbolos = /** @class */ (function () {
    function TablaSimbolos() {
        this.entornoGlobal = new EntornoXML(null);...
```  

• Simbolo: clase para representar cada simbolo de la tabla de simbolos
```js
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, linea, columna, valor) {...
```  

• Simbolo: clase para representar cada simbolo de la tabla de simbolos
```js
var Operacion = /** @class */ (function () {
    function Operacion(tipo_op, op_izquierda, op_derecha, operacion, linea, columna) {...
``` 

• XPath: clase para representar una instruccion XPaths
```js
var XPath = /** @class */ (function () {
    function XPath(linea, columna, lista) {...
``` 

## Anexos

  > Vista a la interfaz

![Interfaz TytusX](https://i.ibb.co/Ltxp227/interfaz.jpg)