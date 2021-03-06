# MANUAL TECNICO TytusX G27 (Fase1)

## Integrantes de G27 鉁掞笍

* **Luis Carlos Valiente Salazar         -   201122864** - *Luiskr1993*
* **Carlos Omar Aquino Escobar           -   201213194** - *carlos093aquino*
* **Daniel Alejandro Herrera Hern谩ndez   -   201213194** - *carlos093aquino*


### Descripci贸n General 馃搵

TytusX es un administrador de bases de datos documental de c贸digo abierto
desarrollado bajo licencia MIT que utilizar谩 lenguaje JavaScript para su
construcci贸n. Soportar谩 archivos XML y manejar谩 los lenguajes de consultas XPath
y XQuery.


### Framework Utilizado 馃敡

Para la construcci贸n del proyecto no se utiliz贸 ning煤n framework, se construy贸 煤nicamente utilizando clases de javascript, css y archivos html. 

## Dependencias de TytusX G27 鈿欙笍

Debido a que el proyecto no se construy贸 utilizando ning煤n framework, fue necesario agregar dependencias de algunas herramientas externas para m贸dulos espec铆ficos de TytusX. A continuaci贸n se describen dichas dependencias:

### CodeMirror 馃敥

Ya que TytusX en principio pone a disposici贸n del usuario una secci贸n de texto para cargar archivos XML, o bien escribir directamente las sentencias XML en la secci贸n, era necesario dar un formato adecuado que mostrara al usuario el detalle de l铆neas escritas. Para eso se utiliz贸 CodeMirror a trav茅s de la importaci贸n de un plugin obtenido desde la p谩gina oficial de la herramienta:

* **https://codemirror.net/mode/xml/index.html**

### Viz.js 馃敥

Para la generaci贸n de gr谩ficas de 谩rbol CST y AST fue necesario agregar las dependencias de Viz.js la cual es una herramienta con licencia MIT que permite la generaci贸n de grafos a partir de una entrada de texto trasladada.

### Jison 馃敥

Esta herramienta fue necesaria para la generaci贸n de la gram谩tica y una clase javascript que permite ejecutar un parser sobre una cadena de entrada. Se utiliz贸 para parsear las entradas de XML y XPATH. Para la utilizaci贸n de jison se realiz贸 una instalaci贸n global de dicha herramienta a trav茅s de la cadena en consola:

```bash
npm install -g jison
```
Al haber generado un archivo .jison donde se incluy贸 la gram谩tica del lenguaje en cuesti贸n (XML y XPATH) se gener贸 la clase javascript para la ejecuci贸n del parser desde la interfaz gr谩fica de TytusX G27. La generaci贸n de la gram谩tica .js se realiza de la siguiente forma: 

```bash
jison ./20211SVAC/G27/gramaticaXML.jison
```

### Clases de AST, Expresiones, Instrucciones e Interfaces 馃敥

Debido a que el parser generado por jison se ejecuta a trav茅s de una clase javascript, al no tener ning煤n servidor intermedio corriendo como node hace que desde la gram谩tica no se pudieran generar imports de las clases generadas para AST, Expresiones, Instrucciones e Interfaces. Para hacer que los objetos relacionados a estas clases fueran visibles y utilizables desde cualquier clase javascript, incluyendo la gram谩tica, se agregaron las referencias de todos los archivos necesarios en la p谩gina index.html: 

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
## Gram谩ticas  馃搫

A continuaci贸n se describen las gram谩ticas generadas para XML y XPATH:

### Gram谩tica Ascendente XML

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

### Gram谩tica Descendente XML

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

### Gram谩tica Ascendente XPATH

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

### Gram谩tica Descendente XPATH

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

### Y las pruebas de estilo de codificaci贸n 鈱笍

_Explica que verifican estas pruebas y por qu茅_

```
Da un ejemplo
```

## Despliegue 馃摝

Para el despliegue del proyecto no se requiri贸 realizar ning煤n build de integraci贸n debido a que las dependencias se agregan directamente en el index.html a trav茅s de archivos javascript. Por lo tanto 煤nicamente se accede al index.html y ya se realiza el despliegue de TytusX G27.

## Contribuyendo 馃枃锔?

Este proyecto se realiz贸 como una contribuci贸n para un proyecto main llamado TytusX, el cual se puede encontrar en la siguiente direcci贸n: 
* **https://github.com/tytusdb/tytusx**


## Licencia 馃搫

Este proyecto y todos sus componentes est谩n basados en licencia MIT.
