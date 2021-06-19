
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2
### Catedrático: Luis Fernando Espino

# Manual Técnico

<br>
<div style="text-align: justify">
<table class="default">
  <tr>
    <th>Nombre</th>
    <th>Carnet</th>
  </tr>
  <tr>
    <td>Carlos Ojani Ng Valladares</td>
    <td>201801424</td>
  </tr>
  <tr>
    <td>Lourdes Mishel Lorenzana Ochoa</td>
    <td>201602935</td>
  </tr>
  <tr>
    <td>Fabio Andre Sanchez Chavez</td>
    <td>201709075</td>
  </tr>
</table>
</div>
<br>

## Contenido
- [Presentacion](#TytusX) 
- [Requisitos_del_Sistema](#Requisitos_del_Sistema)
- [Elementos](#Elementos)
- [Gramaticas](#Gramaticas)
- [Análisis_XML](#XML)
- [Análisis_XPATH](#XPATH)
- [Archivo_Entrada_XML](#Ejemplo_Entrada_XML)



<br>

# TytusX

<div style="text-align: justify">TytusX es un administrador de bases de datos documental de código abierto desarrollado bajo licencia MIT que utilizará lenguaje JavaScript para su construcción. Soportará archivos XML y manejará los lenguajes de consultas XPath.</div>
<br>



## Requisitos_del_Sistema
<div style="text-align: justify">Los requisitos para la ejecución correcta del sistema son

* Procesador Intel(R) Dual Core(TM) G6950 CPU @ 2,8 Ghz*,  2 procesadores principales
* Javascript  
* Conexión a internet de 1Mb/s o superior.
* Sistema Operativo: Windows 7 o superior.

</div>
<br>

## Elementos
<div style="text-align: justify">
  <img src="Imagenes/Tecnico01.jpg" width="600" alt="Menu">
<h3>Interfaz</h3>

La interfaz consta de un titulo con el numero de grupo correspondiente, posteriormente una sección de botones con las funcionalidades de cada analizador.
 El primer segmento son las funciones básicas del editor 
 ### Funciones generales del editor
   <img src="Imagenes/Usuario03.jpg" width="600" alt="Menu">
* ### Agregar una pestaña: 
Función que crea un nuevo segmento donde se puede ingresar código manualmente o haciendo uso de la funcion abrir archivo cargara un archivo seleccionado en la seccion del editor
* ### Abrir Archivo: 
 Funcion que selecciona un archivo local del computador en donde se encontraran las entradas para cada analizador
*  ### Guardar: 
Funcion que guardara el contenido dentro del editor en un archivo nuevo con las caracteristicas proporcionadas
* ### Quitar Pestaña: 
Funcion que elimina la ultima pestaña seleccionada para descartar los cambios realizados
* ### Reporte Errores:
Función que llama una nueva pestaña del navegador donde mostrara los errores encontrados durante le analisis de cada archivo si no existen errores se mostrara en blanco
* ### Limpiar Consolas: 
 Funcion que limpia las salidas de cada analisis
 
### Seccion de consultas
Nota: Debe de cargarse un archivo XML previamente y agregarse una pestaña  nueva para realizar las consultas del archivo XML con XPATH
* ### Consulta: 
Funcion que ejecuta la sentencia previamente analizada
* ### Analizar XPATH: 
Función que analiza la entrada escrita en la pestaña del analizador
* ### Analizar XPATH Descendente: 
 Funcion que analiza la entrada escrita en la pestaña del analizador de manera  descendente
* ### AST XPATH: 
Funcion que muestra el reporte AST del analisis ascendente
* ### AST XPATH: 
Función que muestra el reporte AST del análisis descendente
## Sección de análisis XML
  <img src="Imagenes/Usuario02.jpg" width="600" alt="Menu">
* ### Analizar XML Descendente: 
Función que analiza la entrada escrita en la pestaña del analizador de manera  descendente
* ### Analizar XML Ascendente: 
Función que analiza la entrada escrita en la pestaña del analizador de manera  ascendentemente
* ### CST Ascendente: 
Función que muestra en la sección de reporte el árbol CST del análisis XML ascendentemente
* ### CST Descendente: 
Función que muestra en la sección de reporte el árbol CST del análisis XML ascendentemente
*###  Gramatical Ascendente: 
Función que muestra el reporte de análisis gramatical realizado del manera ascendente
* ### Gramatical Descendente: 
Función que muestra el reporte de análisis gramatical realizado del manera ascendente
* ### Tabla de Simbolos Ascendente: 
Funcion que muestra el reporte de analisis de la tabla de simbolos generada de manera ascendente
* ### Tabla de Símbolos Descendente: 
Función que muestra el reporte de análisis de la tabla de símbolos generada de manera ascendente

<br>
<br>
<p align="center">
  <img src="Imagenes/Usuario04.jpg" width="600" alt="Inicio TytusX">
</p>
</div>
<br>

## GRAMATICAS
<div style="text-align: justify">
<p align="center">
  <img src="Imagenes/Tecnico01.jpg" width="600" alt="Menu">

</p>
</div>
## Análisis_XML_Ascendente

### Lexico
~~~

"/"  return  'div';
"<"  =  'lt';
">"  =  'gt';
"="  =  'asig';
[a-zA-Z_][a-zA-Z.0-9_ñÑ]*  =  'identifier';
{stringliteral}  =  'StringLiteral'
{charliteral}  =  'CharLiteral'
[^<>]*[a-zA-Z0-9_ñÑ]+[^<>]*  =  'todos';
~~~

### Caracteres especiales

~~~
<caracter_especial> ::= <IGUAL> | <BLANCO> |
    <MAYORAB> |
    <MENORAB> |
    <MAYORABD> |
    <MENORABD> |
    <ID> |
    <CADENA> |
    <CARACTER> |
    <COMENTARIO_MULTILINEA> |
    <COMENTARIO_SIMPLE> 

<IGUAL> = =
<MAYORAB> = >
<MENORAB> = <
<MAYORABD> = />
<MENORABD> = </

~~~

## Sintáctico_XML_ASC

### Gramatica Ascendente

~~~
START : RAICES EOF { $$ = $1; return  $$; }
;

  

RAICES:

RAICES RAIZ 

| RAIZ 



RAIZ:
PRINT semicolon 
| OBJETO 

 

OBJETO:
lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt 
| lt identifier LATRIBUTOS gt LISTA_ID_OBJETO lt div identifier gt 
| lt identifier LATRIBUTOS div gt 
| lt identifier LATRIBUTOS gt lt div identifier gt 
|error identifier 
LATRIBUTOS: ATRIBUTOS 
| epsilon

  

ATRIBUTOS:
ATRIBUTOS ATRIBUTO 
| ATRIBUTO 



  

ATRIBUTO:identifier asig StringLiteral 
|error StringLiteral 
  

LISTA_ID_OBJETO: LISTA_ID_OBJETO todos 
| todos 
|LISTA_ID_OBJETO identifier 
| identifier 


OBJETOS:
OBJETOS OBJETO 
| OBJETO

~~~

## Análisis_Sintáctico_XML_DESC

### Gramatica Descendente 
    
~~~
OBJETO:

lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt

| lt identifier LATRIBUTOS gt LISTA_ID_OBJETO lt div identifier gt

| lt identifier LATRIBUTOS div gt

| lt identifier LATRIBUTOS gt lt div identifier gt

 
OBJETO:
lt identifier LALATRIBUTOS OBJETOP;


OBJETOP:
gt OBJETOS lt div identifier gt
| gt LISTA_ID_OBJETO lt div identifier gt
| div gt
| gt lt div identifier gt



OBJETO:
lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt 
| lt identifier LATRIBUTOS gt LISTA_ID_OBJETO lt div identifier gt 
| lt identifier LATRIBUTOS div gt
| lt identifier LATRIBUTOS gt lt div identifier gt 
~~~


## Análisis_Léxico_XPATH

### Palabras reservadas
~~~
"*" = 'asterisk';
".." = 'twoPoint';
"." = 'point';
"(" = 'parIzq';
")" = 'parDer';
"{" = 'llaIzq';
"}" = 'llaDer';
"::" = 'doubleColon';
":" = 'colon';
"|" = 'barra';
"[" = 'corcheteIzq';
"]" = 'corcheteDer';
";" = 'ptcoma';
"+" = 'add';
"," = 'comma';
"-" = 'minus';
"=>" = 'arrow';
"=" = 'equal';
"/""/" = 'doubleSlash';
"/" = 'slash';
"!=" = 'diferent';
"<" = 'menor';
"<=" = 'menorIgual';
">" = 'mayor';
">=" = 'mayorIgual';
"@" = 'at';
"or" = 'or';
"let" = 'let';
"last" = 'last';
"and" = 'and';
"div" = 'div';
"mod" = 'mod';
"text" = 'text';
"node" = 'node';
"child" = 'child';
"self" = 'self';
"parent" = 'parent';
"comment" = 'comment';
"element" = 'element';
"ancestor" = 'ancestor';
"namespace" = 'namespace';
"attribute" = 'attribute';
"preceding" = 'preceding';
"following" = 'following';
"ancestor_or_self" = 'ancestor_or_self';
"descendant_or_self" = 'descendant_or_self';
"following_sibling" = 'following_sibling';
"preceding_sibling" = 'preceding_sibling';
"processing_instruction" = 'processing_instruction';

[ \r\t]+ {}
\n {}
[0-9]+ return 'digits';
[0-9]+("."[0-9]+)? return 'decimal';
(\"({EscapeQuot}|[^"])*\")|("'""({EscapeApos}|[^'])*""'") return 'cadena';
[A-Za-z_][A-Za-z_0-9]* return 'id';
~~~

### Caracteres especiales

~~~
ini

:XPATH EOF 

XPATH:
ENTRY LIST_STEP
| LIST_STEP 

ENTRY
:slash

|doubleSlash

LIST_STEP: STEP LIST_STEPP 

LIST_STEPP: SEPARATE STEP LIST_STEPP 
| {
  

SEPARATE
:barra ENTRY 
|barra
|slash 
|doubleSlash 
  

STEP
:id LIST_PREDICATE 
|id 
|AXIS 
|WILDCARD 
  
  

LIST_PREDICATE: PREDICATE LIST_PREDICATEP 

LIST_PREDICATEP: PREDICATE LIST_PREDICATEP 

PREDICATE:

corcheteIzq LIST_E corcheteDer 

LIST_E: E LIST_EP 

LIST_EP: OP E LIST_EP
  

OP
:add 
|minus 
|asterisk
|slash
|equal
|diferent
|menor
|menorIgual
|mayorIgual
|mayor
|or
|barra
|and
|mod

E:
STEP
|ENTRY
|decimal
|digits
|cadena

AXIS
:AXIS_NAME doubleColon STEP 
|AXIS_NAME

AXIS_NAME
:ancestor{
|ancestor_or_self
|attribute
|child
|descendant
|descendant_or_self
|following
|following_sibling
|namespace
|parent
|preceding
|preceding_sibling
|self

WILDCARD
:asterisk{
|twoPoint
|point
|at asterisk
|at id PREDICATE
|at id
|node parIzq parDer
|text parIzq parDer
|last parIzq parDer


~~~


## Análisis_Sintáctico_XPATH_DESC

### Gramatica Descendente 
    
~~~
ini

:XPATH EOF



XPATH

:ENTRY LIST_STEP 
|LIST_STEP 
;

ENTRY

:slash 

|doubleSlash 

;

LIST_STEP

:LIST_STEP SEPERATE STEP 

|STEP 
;

SEPERATE

:barra ENTRY 

|barra 
|slash 

|doubleSlash 


  

STEP

:id LIST_PREDICATE 

|id 

|AXIS {

|WILDCARD {


LIST_PREDICATE

:LIST_PREDICATE PREDICATE 

|PREDICATE 
;

PREDICATE

:corcheteIzq LIST_E corcheteDer 
;

LIST_E

:LIST_E OP E 
|E 

;

OP

:add 

|minus 

|asterisk 

|slash 
|equal 
|diferent 
|menor 
|menorIgual 
|mayorIgual 
|mayor 
|or 
|barra 
|and 
|mod 
;

E

:STEP 
|ENTRY 

|decimal 

|digits 

|cadena 

AXIS
:AXIS_NAME doubleColon STEP 
|AXIS_NAME

AXIS_NAME
:ancestor 
|ancestor_or_self 
|attribute 
|child 
|descendant 
|descendant_or_self 
|following 
|following_sibling 
|namespace 
|parent 
|preceding 
|preceding_sibling
|self

WILDCARD
:asterisk 
|point 
|twoPoint 
|at asterisk 
|at id PREDICATE 
|at id 
|node parIzq parDer 

|text parIzq parDer 

|last parIzq parDer 

~~~

