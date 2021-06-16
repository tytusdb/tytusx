 <div style="text-align:center">

# **Manual de Usuario - TytusX**
</div>
  <div style="text-align:center">

|     Integrantes  |Carnet  |
|-------------|--------|
|Josselyn Vanessa Polanco Gameros|201602676|
|Karla Julissa Ajtún Velásquez|201700565|
|Diego Leonel Marroquin Martínez|201709014|
|
  </div>

## **Introducción**
 <div style="text-align:justify">
TytusX es una aplicación que soportará archivos XML y manejará el lenguaje de consulta XPath. Para esto se construye un parser y un intérprete para ambos.
</div>
<br>

 <div style="text-align:justify">

 ### **Cómo utilizar TytusX**

  <div style="text-align:justify">
  A continuación se muestra la manera correcta de utilizar la aplicación.
  <br><br>

  * **Ventana Principal**

![Principal](Usuario/img1.png) 
<div style="text-align: center">

_Imagen No. 1_
</div>
Se muestra la ventana de inicio de la aplicación, se puede observar que cuenta con su respectivo espacio para los archivos XML, XPath y las respectivas consolas de salida.
<br><br>

* **XML**

![XML](Usuario/img2.png) 
<div style="text-align: center">

_Imagen No. 2_
</div>
Aquí se puede ver la sección asignada para los archivos XML, en el área de texto se mostrará el contenido del archivo. Esta sección contiene los boton para realizar el análisis del archivo, este análisis puede ser Ascendente o Descendente, para luego poder obtener los respectivos reportes, los cuales se detallarán más adelante.
<br><br>

* **XPath**

![XPath](Usuario/img3.png) 
<div style="text-align: center">

_Imagen No. 3_
</div>
Al igual que con los archivos XML, las consultas de XPath también cuentan con su propia sección, en la cual se ingresará la consulta que se desea realizar. De igual manera, también se puede analizar la consulta de manera Ascendente y Descendente para obtener los reportes correspondientes.
<br><br>

  * **Consolas**

![Consolas](Usuario/img4.png)
<div style="text-align: center">

_Imagen No. 4_
</div>
En esta sección se encuentran las consolas de salida. En Consola se mostrarán los errores, en caso haya, al momento de analizar, tanto los archivos XML como las consultas XPath. Y en Salida se obtendrá el resultado de la consulta XPath realizada.
<br><br>

  * **Reportes**

  ![Reportes](Usuario/img5.png)
  <div style="text-align: center">

  _Imagen No. 5_
  </div>
Esta pestaña muestra los reportes que se pueden realizar luego de analizar los archivos y consultas, los reportes están distriubuidos de la siguiente manera: <br>
 
  <div style="text-align: center">

|              Reporte              | Lenguaje  |
|-----------------------------------|-----------|
|Tabla de Símbolos                  |XML        |
|Árbol de Análisis Sintáctico (CST) |XML        |
|Árbol Sintáctico (AST)             |XPath      |
|Gramatical                         |XML        |
|Errores                            |XML y XPath|
|
  </div>
<br><br>

* **Ejemplos**

* XML

![EjemploXML](Usuario/img8.png)
  <div style="text-align: center">

  _Imagen No. 6_
  </div>
  Archivo XML listo para ser analizado por la aplicación.
  <br><br>

* CST

![EjmeploCST](Usuario/img9.png)
  <div style="text-align: center">

  _Imagen No. 7_
  </div>
  Ejemplo de CST generado del XML analizado.
  <br><br>

* Tabla de Símbolos

![EjemploSimbolos](Usuario/img10.png)
  <div style="text-align: center">

  _Imagen No. 8_
  </div>
  Tabla de símbolos generada luego de analizar el archivo XML.
  <br><br>

* Reporte Gramatical

![EjemploGramatical](Usuario/img11.png)
  <div style="text-align: center">

  _Imagen No. 9_
  </div>
  Reporte gramatical generado del análisis del archivo XML.
  <br><br>

* XPath

![EjemploXpath](Usuario/img6.png)
  <div style="text-align: center">

  _Imagen No. 10_
  </div>
  Ejemplo de una consulta XPath.
  <br><br>

* Reporte AST

![EjemploAST](Usuario/img7.png)
  <div style="text-align: center">

  _Imagen No. 11_
  </div>
  Se observa el AST generado luego correspondiente a la consulta analizada.
  <br><br>

* Consola

![EjemploConsola](Usuario/img12.png)
  <div style="text-align: center">

  _Imagen No. 12_
  </div>
Se observa que no hay errores en el análisis.
  <br><br>

* Salida

![EjemploSalida](Usuario/img13.png)
  <div style="text-align: center">

  _Imagen No. 13_
  </div>
Se observa el resultado de la consulta.

</div>

</div>