### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2
### Catedrático: Luis Fernando Espino

# Manual Usuario

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

## INTERFAZ PRINCIPAL
<div style="text-align: justify">
<p align="center">
  <img src="Imagenes/Tecnico01.jpg" width="600" alt="Menu">

</p>
</div>

* 


## Consola_Salida 
<div style="text-align: justify">
Al realizar una consulta se mostrara  la parte inferior su salida ya codificada.
<br>
<br>
<p align="center">
  <img src="Imagenes/Usuario05.jpg" width="600" alt="Consola de Salida">
</p>
</div>
<br>



