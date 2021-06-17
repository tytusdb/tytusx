# MANUAL TECNICO TytusX G27 (Fase1)

## Integrantes de G27 ✒️

* **Luis Carlos Valiente Salazar         -   201122864** - *Luiskr1993*
* **Carlos Omar Aquino Escobar           -   201213194** - *carlos093aquino*
* **Daniel Alejandro Herrera Hernández   -   201213194** - *carlos093aquino*


### Descripción General 📋

TytusX es un administrador de bases de datos documental de código abierto
desarrollado bajo licencia MIT que utilizará lenguaje JavaScript para su
construcción. Soportará archivos XML y manejará los lenguajes de consultas XPath
y XQuery.


### Framework Utilizado 🔧

Para la construcción del proyecto no se utilizó ningún framework, se construyó únicamente utilizando clases de javascript, css y archivos html. 

## Dependencias de TytusX G27 ⚙️

Debido a que el proyecto no se construyó utilizando ningún framework, fue necesario agregar dependencias de algunas herramientas externas para módulos específicos de TytusX. A continuación se describen dichas dependencias:

### CodeMirror 🔩

Ya que TytusX en principio pone a disposición del usuario una sección de texto para cargar archivos XML, o bien escribir directamente las sentencias XML en la sección, era necesario dar un formato adecuado que mostrara al usuario el detalle de líneas escritas. Para eso se utilizó CodeMirror a través de la importación de un plugin obtenido desde la página oficial de la herramienta:

* **https://codemirror.net/mode/xml/index.html**

### Viz.js 🔩

Para la generación de gráficas de árbol CST y AST fue necesario agregar las dependencias de Viz.js la cual es una herramienta con licencia MIT que permite la generación de grafos a partir de una entrada de texto trasladada.

### Jison 🔩

Esta herramienta fue necesaria para la generación de la gramática y una clase javascript que permite ejecutar un parser sobre una cadena de entrada. Se utilizó para parsear las entradas de XML y XPATH. Para la utilización de jison se realizó una instalación global de dicha herramienta a través de la cadena en consola:

```bash
npm install -g jison
```
Al haber generado un archivo .jison donde se incluyó la gramática del lenguaje en cuestión (XML y XPATH) se generó la clase javascript para la ejecución del parser desde la interfaz gráfica de TytusX G27. La generación de la gramática .js se realiza de la siguiente forma: 

```bash
jison ./20211SVAC/G27/gramaticaXML.jison
```

### Clases de AST, Expresiones, Instrucciones e Interfaces 🔩

Debido a que el parser generado por jison se ejecuta a través de una clase javascript, al no tener ningún servidor intermedio corriendo como node hace que desde la gramática no se pudieran generar imports de las clases generadas para AST, Expresiones, Instrucciones e Interfaces. Para hacer que los objetos relacionados a estas clases fueran visibles y utilizables desde cualquier clase javascript, incluyendo la gramática, se agregaron las referencias de todos los archivos necesarios en la página index.html: 

```bash

<script src="js/funcionesXPath.js"></script>
<script src="js/funcionesXML.js"></script>
<script src="Reportes/graficaCST.js"></script>
<script src="Reportes/graficaAST.js"></script>
<script src="Reportes/reporteTS.js"></script>
<script src="js/viz.js"></script>
<script src="js/full.render.js"></script>
<script src="Gramatica/gramaticaXML.js"></script>

```
## Gramáticas  📄

A continuación se describen las gramáticas generadas para XML y XPATH:

### Gramática Ascendente XML

``` bash
<START> ::= '<' 'xml' 'version' '=' 'StringLiteral' 'encoding' '=' 'StringLiteral' '>' <RAIZ> EOF 
  
<RAIZ> ::=  '<' 'identifier' <ATRIBUTOS> '>' <RAICES>  '<' '/' 'identifier' '>'  
        |   '<' 'identifier' '>' <RAICES> '<' '/' 'identifier' '>'   

<RAICES> ::=  <RAICES> <OBJETO> 
	      |   <OBJETO>  
  
<OBJETO>::=  '<' 'identifier' <ATRIBUTOS> '>' <RAICES>  '<' '/' 'identifier' '>' 
         |   '<' 'identifier' <ATRIBUTOS> '>' 'identifier'  '<' '/' 'identifier' '>'   
         |   '<' 'identifier'  '>' <RAICES>  '<' '/' 'identifier' '>'        
         |   '<' 'identifier'  '>' 'identifier'  '<' '/' 'identifier' '>'

<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>                          
             |  <ATRIBUTO> 

<ATRIBUTO> ::= 'identifier' 'asig' 'StringLiteral'              

```

### Gramática Descendente XML

``` bash
<START> ::= '<' 'xml' 'version' '=' 'StringLiteral' 'encoding' '=' 'StringLiteral' '>' <RAIZ> EOF 
  
<RAIZ> ::=  '<' 'identifier' <ATRIBUTOS> '>' <RAICES>  '<' '/' 'identifier' '>'  
        |   '<' 'identifier' '>' <RAICES> '<' '/' 'identifier' '>'   

<RAICES> ::=  <NODO> <RAICES_PRIMA>

<RAICES_PRIMA> ::= <NODO> <RAICES_PRIMA>
                |

<NODO> ::= <OBJETO>
  
<OBJETO>::=  '<' 'identifier' <ATRIBUTOS> '>' <RAICES>  '<' '/' 'identifier' '>' 
         |   '<' 'identifier' <ATRIBUTOS> '>' 'identifier'  '<' '/' 'identifier' '>'   
         |   '<' 'identifier'  '>' <RAICES>  '<' '/' 'identifier' '>'        
         |   '<' 'identifier'  '>' 'identifier'  '<' '/' 'identifier' '>'

<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>                          
             |  <ATRIBUTO> 

<ATRIBUTO> ::= 'identifier' 'asig' 'StringLiteral'              

```

### Gramática Ascendente XPATH

``` bash
<START> ::= <LISTA_NODOS> EOF

<LISTA_NODOS> ::= <LISTA_NODOS> <OPERADOR> <NODO>              
              |   <NODO>

<OPERADOR> ::=  'union'
              | 'or'
              | 

<NODO> ::= '//' <VALOR_NODO>
        |  '/' <VALOR_NODO>      
        |  <VALOR_NODO>

<VALOR_NODO> ::= 'nodoid' <NODO_COMPLEMENTO>
              | <FUNCION>
              | <SELECT>
              | <EJE>
              | '@' 'nodoid' <NODO_COMPLEMENTO>

<NODO_COMPLEMENTO> ::= '[' <EXPRESION> ']'    
                    | '.' '.'               
                    | ''

<SELECT> ::= '//' <SELECT_ARGUMENTO>
          |  '/' <SELECT_ARGUMENTO>

<SELECT_ARGUMENTO> ::= '@' '*'
                  | '*'
                  | '.'
                  | '.' '.'

<EJE> ::= 'ancestor' <OR_SELF>
       |  'attribute' ':' <EJE_COMPLEMENTO>
       |  'child' ':' <EJE_COMPLEMENTO>
       |  'descendant' <OR_SELF>
       |  'following' <SIBLING>
       |  'namespace' ':' <EJE_COMPLEMENTO>
       |  'parent' ':' <EJE_COMPLEMENTO>
       |  'preceding' <SIBLING> 
       |  'self' ':' <EJE_COMPLEMENTO>

<OR_SELF> ::= '-' 'or' '-' 'self' ':' <EJE_COMPLEMENTO>
           |  ':' <EJE_COMPLEMENTO>

<SIBLING> ::= '-' 'sibling' ':' <EJE_COMPLEMENTO>
           |  ':' <EJE_COMPLEMENTO>

<EJE_COMPLEMENTO> ::= <FUNCION>
                   |  'nodoid' <EJE_COMPLEMENTO_2>
                   |  <SELECT_ARGUMENTO>

<EJE_COMPLEMENTO_2> ::= '[' <EXPRESION> ']'
                     |

<FUNCION> ::= 'position' '(' ')'
           |  'last' '(' ')'
           |  'text' '(' ')'
           |  'node' '(' ')'

<EXPRESION> ::= <ARITMETICA>
             |  <LOGICA>
             |  <PRIMITIVO>             
             |  <FUNCION>

<ARITMETICA> ::= <EXPRESION> '+' <EXPRESION>
              |  <EXPRESION> '-' <EXPRESION>
              |  <EXPRESION> '*' <EXPRESION>
              |  <EXPRESION> '/' <EXPRESION>
              |  '(' <EXPRESION> ')'
            
<PRIMITIVO> ::=  'entero'
             |  'decimal'
             |  'nodoid'
             |  'punto'
             |  'STRING'
             |  '@' 'nodoid'
             |  '*'

<LOGICA> ::= <EXPRESION> '<' <EXPRESION>
          |  <EXPRESION> '>' <EXPRESION>
          |  <EXPRESION> '=' <EXPRESION>
          |  <EXPRESION> '<=' <EXPRESION>
          |  <EXPRESION> '>=' <EXPRESION>

```

### Gramática Descendente XPATH

``` bash
<START> ::= <LISTA_NODOS> EOF

<LISTA_NODOS> ::= <NODO> <LISTA_NODOS_PRIMA>              

<LISTA_NODOS_PRIMA> ::= <OPERADOR> <NODO> <LISTA_NODOS_PRIMA>
                     |

<OPERADOR> ::=  'union'
              | 'or'
              | 

<NODO> ::= '//' <VALOR_NODO>
        |  '/' <VALOR_NODO>      
        |  <VALOR_NODO>

<VALOR_NODO> ::= 'nodoid' <NODO_COMPLEMENTO>
              | <FUNCION>
              | <SELECT>
              | <EJE>
              | '@' 'nodoid' <NODO_COMPLEMENTO>

<NODO_COMPLEMENTO> ::= '[' <EXPRESION> ']'    
                    | '.' '.'               
                    | ''

<SELECT> ::= '//' <SELECT_ARGUMENTO>
          |  '/' <SELECT_ARGUMENTO>

<SELECT_ARGUMENTO> ::= '@' '*'
                  | '*'
                  | '.'
                  | '.' '.'

<EJE> ::= 'ancestor' <OR_SELF>
       |  'attribute' ':' <EJE_COMPLEMENTO>
       |  'child' ':' <EJE_COMPLEMENTO>
       |  'descendant' <OR_SELF>
       |  'following' <SIBLING>
       |  'namespace' ':' <EJE_COMPLEMENTO>
       |  'parent' ':' <EJE_COMPLEMENTO>
       |  'preceding' <SIBLING> 
       |  'self' ':' <EJE_COMPLEMENTO>

<OR_SELF> ::= '-' 'or' '-' 'self' ':' <EJE_COMPLEMENTO>
           |  ':' <EJE_COMPLEMENTO>

<SIBLING> ::= '-' 'sibling' ':' <EJE_COMPLEMENTO>
           |  ':' <EJE_COMPLEMENTO>

<EJE_COMPLEMENTO> ::= <FUNCION>
                   |  'nodoid' <EJE_COMPLEMENTO_2>
                   |  <SELECT_ARGUMENTO>

<EJE_COMPLEMENTO_2> ::= '[' <EXPRESION> ']'
                     |

<FUNCION> ::= 'position' '(' ')'
           |  'last' '(' ')'
           |  'text' '(' ')'
           |  'node' '(' ')'

<EXPRESION> ::= <ARITMETICA>
             |  <LOGICA>
             |  <PRIMITIVO>             
             |  <FUNCION>

<ARITMETICA> ::= <EXPRESION> '+' <EXPRESION>
              |  <EXPRESION> '-' <EXPRESION>
              |  <EXPRESION> '*' <EXPRESION>
              |  <EXPRESION> '/' <EXPRESION>
              |  '(' <EXPRESION> ')'
            
<PRIMITIVO> ::=  'entero'
             |  'decimal'
             |  'nodoid'
             |  'punto'
             |  'STRING'
             |  '@' 'nodoid'
             |  '*'

<LOGICA> ::= <EXPRESION> '<' <EXPRESION>
          |  <EXPRESION> '>' <EXPRESION>
          |  <EXPRESION> '=' <EXPRESION>
          |  <EXPRESION> '<=' <EXPRESION>
          |  <EXPRESION> '>=' <EXPRESION>

```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

Para el despliegue del proyecto no se requirió realizar ningún build de integración debido a que las dependencias se agregan directamente en el index.html a través de archivos javascript. Por lo tanto únicamente se accede al index.html y ya se realiza el despliegue de TytusX G27.

## Contribuyendo 🖇️

Este proyecto se realizó como una contribución para un proyecto main llamado TytusX, el cual se puede encontrar en la siguiente dirección: 
* **https://github.com/tytusdb/tytusx**


## Licencia 📄

Este proyecto y todos sus componentes están basados en licencia MIT.
