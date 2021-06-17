#### Universidad de San Carlos de Guatemala
#### Facultad de Ingeniería
#### Escuela de Ciencias y Sistemas
#### Organización de Lenguajes y Compiladores 2 - Sección A
#### Ing. Luis Fernando Espino Barrios
#### Aux. Haroldo Arias   
<br>
<div style="text-align: justify">
<table class="default">
  <tr>
    <th>Nombre</th>
    <th>Carnet</th>
  </tr>
  <tr>
    <td>Jonnathan Antonio Castillo Avendaño    (Coordinador)</td>
    <td>201314340</td>
  </tr>
  <tr>
    <td>Hilbert Josue Perucho Ramirez</td>
    <td>201313889</td>
  </tr>
  <tr>
    <td>Ricardo Humberto Fuentes Garcia</td>
    <td>201513747</td>
  </tr>
</table>
</div>
<br>

## Índice
- [TytusX Grupo 12](#TuytusX - Proyecto de Clase) 
- [Objetivos](#Objetivos)
- [Requisitos_del_Sistema](#Requisitos_del_Sistema)
- [Componentes](#Componentes)
- [Análisis_Léxico_XML](#Analisis_Lexico_Gramatica_XML)
- [Análisis_Sintáctico_XML_DESC](#Gramatica_Descendente_XML)
- [Análisis_Léxico_XPATH](#Analisis_XPATH)



<br>

# TuytusX - Proyecto de Clase

<div style="text-align: justify">TytusX es un proyecto desarrollado por estudiantes el cual es un proyecto de codigo abierto, se debe de realizar un proyecto en el cual se implemente gramaticas, recorrido de gramaticas, recorridos en producciones. Para la segunda fase se debe de realizar codigo en 3 direcciones.</div>
<br>

## Objetivos  
### General  
* <div style="text-align: justify">Objetivo general</div>
* <div style="text-align: justify">Que el estudiante aplique la fase de analisis y sintesis de la construccion de un compilador para realizar por un lado un interprete y por otro lado un traductor a un codigo ejecutable utilizando herramientas de analisis ascendente.</div>

### Específicos  
* <div style="text-align: justify">Objetivos específicos</div>
* <div style="text-align: justify">Que el estudiante genere un analizador lexico y sintactico para construir un interprete haciendo uso de atributos heredados y sintetizados.</div>
* <div style="text-align: justify">Que el estudiante utilice tanto una gramática adecuada para el analizador ascendente y otra gramática adecuada para el analizador descendente.</div>
* <div style="text-align: justify">Que el estudiante maneje la pila o el árbol que proporciona el analizador sintáctico para simular el paso de atributos heredados.</div>
* <div style="text-align: justify">Que el estudiante implemente la ejecución de la traducción utilizando traducción dirigida por la sintaxis.</div>
* <div style="text-align: justify">Que el estudiante comprenda los conceptos acerca de traducciones.</div>
* <div style="text-align: justify">Que el estudiante traduzca el código fuente a un código de tres direcciones.</div>
* <div style="text-align: justify">Que el estudiante aplique las reglas de optimización en el código de tres direcciones previo a su ejecución.</div>
<br>

## Requisitos_del_Sistema
<div style="text-align: justify">Componentes minimos para la ejecion del proyecto:  

* Procesador Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz, 2712 Mhz, 2 procesadores principales, 4 procesadores lógicos
* Javascript  
* Sistema Operativo: Windows 7 o superior.
* Entorno visual para poder realizar agregaciones o modificaciones de codigo
</div>
<br>

## Componentes
<div style="text-align: justify">

<h3>XML - XPATH - G12</h3>

El compilador de XML aparecera en la pantalla en la parte superior donde se ingresara un archivo de entrada el cual contendra una serie de instrucciones en gramatica XML, lo que se debe de realizar es analizar dicha gramatica la cual estara unida con una gramatica que sea de tipo XPATH, al momento de ejecutar estas gramaticas debera de devolver un resultado en gramatica de tipo XML con los resultados.</div>


<p align="center">
  <img src="Imagenes/Arquitectura.png" width="800" alt="TytusX Architecture">
</p>

## Analisis_Sintactico_Gramatica_XML

~~~

inicio: raices
    ;

raices: raices raiz
        | raiz
        ;

raiz: objeto
    ;

objeto:  '<' ID latributos '/' '>'
       | '<' ID latributos '>'  texto_libre  '<' '/' ID '>'    
       | '<' ID latributos '>'  objetos  '<' '/' ID '>'
        ;

objetos: objetos objeto
         |objeto
         ;

latributos: atributos
            |
            ;

atributos:   atributos atributo
            |atributo
            ;

atributo: ID '=' CADENA
        ;

texto_libre : texto_libre TEXTO
             | TEXTO
             ;

~~~

### Gramatica_Descendente_XML

~~~

inicio: raices
    ;

raices: raiz raices
        | raiz
        ;

raiz: objeto
    ;

objetos: objeto objetos
         ;
    

objeto:  '<' ID latributos '/' '>'
       | '<' ID latributos '>'
       | '<' ID latributos '>'
        ;

latributos: atributos
            |
            ;

atributos:   atributo atributos
            |atributo
            ;

atributo: ID '=' CADENA
        ;

texto_libre :  TEXTO  texto_libre
             | TEXTO
             ;

~~~

## Analisis_XPATH

# Precedencia de Operadores
~~~

%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE'  'MAYORIGUAL' 
%left 'MAS' 'MENOS'
%left 'ASTERISCO' 'DIV' 'MODULO'
%nonassoc 'POT'
%right 'UNARIO'
%right 'PARA' 'CORA'

inicio
    : varias


varias: instrucciones SIGNOO
        |instrucciones
        ;

instrucciones : instruccion instrucciones
            |   instruccion
            ;

instruccion : BARRA e
            | BARRABARRA e
            | RESERV DOSPUNTOS e
            | BARRA RESERV DOSPUNTOS e
            | BARRA PUNTOPUNTO
            | BARRABARRA RESERV DOSPUNTOS e             
            | ID
            ;

        RESERV :  LAST
        |         POSITION
        |         ANCESTOR RESERVLARGE
        |         ATTRIBUTE
        |         ANCESORSELF
        |         CHILD
        |         DESCENDANT RESERVLARGE
        |         DESCENDANT
        |         FOLLOWING  MENOS SIBLING
        |         FOLLOWING
        |         NAMESPACE
        |         PARENT
        |         PRECENDING
        |         PRECENDING MENOS SIBLING
        |         SELF
        |         TEXT
        |         NODE
        |         SIBLING
        ;

RESERVLARGE :   MENOS OR MENOS SELF
            |   MENOS SIBLING
            ;

e :   ID
    | ARROBA ID
    | ARROBA ASTERISCO
    | ASTERISCO
    | ID CORA OPERADORES CORC
    ;
 
    


OPERADORES :  OPERADORES MAS OPERADORES
            | OPERADORES MENOS OPERADORES
            | OPERADORES ASTERISCO OPERADORES
            | OPERADORES DIV OPERADORES
            | OPERADORES MODULO OPERADORES
            | OPERADORES AND OPERADORES
            | OPERADORES OR OPERADORES
            | OPERADORES MAYORQUE OPERADORES
            | OPERADORES MAYORIGUAL OPERADORES
            | OPERADORES MENORQUE OPERADORES
            | OPERADORES MENORIGUAL OPERADORES
            | OPERADORES DIFERENTE OPERADORES
            | OPERADORES IGUAL OPERADORES
            | MENOS OPERADORES %prec UNARIO
            | DECIMAL
            | ENTERO
            | ID
            | LAST
            | POSITION
            | CADENA
            | ARROBA ID
            ;
~~~
