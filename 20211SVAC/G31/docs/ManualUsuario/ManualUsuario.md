# Manual de Usuario Tytus X - Grupo 31

## **Contenido**
- [Descripcion General](#idDescripcion)
- [Interfaz Grafica](#idInterfaz)
- [Uso App Web](#idUsoApp)

## **Descripción General** <a name="idDescripcion"></a>

Tytus X es un administrador de bases de datos documental de codigo abierto. Soporta archivos de tipo XML y maneja los lenguajes de consultas de XPath y XQuery. 

## **Interfaz Gráfica** <a name="idInterfaz"></a>

La interfaz grafica cuenta con dos editores de texto uno para el archivo a utilizar de consulta de tipo XML y el otro editor para la consulta en XPath 

<div align="center">
    <img src="" width="400">
    <p align="center">Editores de XML Y XPath </p>
</div>

Seguidamente tenemos un conjunto de pestañas para poder visualizar los reportes de cada uno de los analizadores de XML y XPath. 

<div align="center">
    <img src="" width="400">
    <p align="center">Reportes </p>
</div>

## **Uso de la aplicación**

### Pasos para la ejecución 

1. Ingresa un archivo de entrada en el editor de XML. 

#### Ejemplo de Entrada de un archivo XML 

```bash
< ? xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <!-- Esto es un comentario -->
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Lau&amp;rentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>

  <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>

  <book category="web">
    <title lang="en">XQuery Kick Start</title>
    <author>James &quot; McGovern</author>
    <author>Per &lt; Bothner</author>
    <author>Kurt Cagle</author>
    <author>James Linn</author>
    <author>Vaidyanathan Nagarajan</author>
    <year>2003</year>
    <price>49.99</price>
  </book>

  <book category="web" cover="paperback">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```

- En el editor de XML se encuentra la opción de realizar el análisis Ascendente y Descendente de la entrada XML. 

2. Elige el analizador a utilizar para el archivo de entrada. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Botones de Analisis Ascendente y Descendente </p>
</div>

3. Visualiza los reportes generador por el analizador, si la entrada es correcta se mostraran los reportes de Arbol CST, Tabla de Simbolos y Reporte Gramatical de la entrada. 

#### Análisis Ascendente de XML 

La entrada pasa por un analizador Ascendente y devuelve un arbol CST y una tabla de simbolos para poder trabajar con la información que se reconocio en el archivo de XML. 

##### Reporte Árbol CST - XML 

- Ejemplo de Arbol CST generado para un archivo XML, este reporte se muestra si el archivo no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Arbol CST  </p>
</div>

##### Reporte Tabla de Simbolos 

- Ejemplo de tabla de símbolos generada para un archivo XML, este reporte se muestra si el archivo no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Tabla de Símbolos  </p>
</div>

##### Reporte de Errores Léxicos, Sintácticos y Semánticos 

- Ejemplo de Reportes generados si el archivo de entrada contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Errores Encontrados </p>
</div>

#### Analisis Descendente de XML 

La entrada pasa por un analizador Descendente y devuelve un arbol CST y una tabla de simbolos para poder trabajar con la información que se reconocio en el archivo de XML. 

##### Reporte Árbol CST - XML 

- Ejemplo de Arbol CST generado para un archivo XML, este reporte se muestra si el archivo no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Árbol CST  </p>
</div>

##### Reporte Tabla de Símbolos 

- Ejemplo de tabla de símbolos generada para un archivo XML, este reporte se muestra si el archivo no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Tabla de Símbolos  </p>
</div>

##### Reporte de Errores Léxicos, Sintácticos y Semánticos 

- Ejemplo de Reportes generados si el archivo de entrada contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Errores Encontrados </p>
</div>


4. Ingresa en el editor de XPATH una Consulta 

#### Ejemplo de consultas para XPATH

```bash
/bookstore/book/title
/bookstore/book[1]/title
/bookstore/book/price[text()]
/bookstore/book[price>35]/price
```
- En el editor de XPATH se encuentran las opciones para poder ejecutar un análisis ascendente o descendente. 

5. Se procede a ejecutar la consulta con el analizador correspondiente. 

#### Análisis Ascendente de XPATH 

La entrada pasa por un analizador ascendente y devuelve un árbol CST, un árbol AST y un reporte gramatical de como reconocio la consulta por el analizador.  

##### Reporte Árbol CST - XPATH 

- Ejemplo de árbol CST generado para una consulta de XPATH, este reporte se muestra si la entrada no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Arbol CST  </p>
</div>

##### Reporte Árbol AST - XPATH  

- Ejemplo de árbol AST generado para una consulta en XPATH, este reporte se muestra si la entrada no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Árbol AST  </p>
</div>

##### Reporte de Errores Léxicos, Sintácticos y Semánticos 

- Ejemplo de Reportes generados si el archivo de entrada contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Errores Encontrados </p>
</div>

#### Análisis Descendente de XPATH

La entrada pasa por un analizador descendente y devuelve un árbol CST, un árbol AST y un reporte gramatical de como reconocio la consulta por el analizador.  

##### Reporte Arbol CST - XPATH 

- Ejemplo de árbol CST generado para una consulta de XPATH, este reporte se muestra si la entrada no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Arbol CST  </p>
</div>

##### Reporte Árbol AST - XPATH  

- Ejemplo de árbol AST generado para una consulta en XPATH, este reporte se muestra si la entrada no contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Árbol AST  </p>
</div>

##### Reporte de Errores Léxicos, Sintácticos y Semánticos 

- Ejemplo de Reportes generados si el archivo de entrada contiene errores. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Errores Encontrados </p>
</div>

6. Si la ejecución del archivo XML y la consulta en XPATH es correcta se procede a mostrar el resultado en el apartado de consola. 

<div align="center">
    <img src="" width="400">
    <p align="center"> Consola </p>
</div>

7. Fin de la ejecución del programa. 
