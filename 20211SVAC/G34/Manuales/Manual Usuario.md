# TytusX Grupo 34

_TytusX es un administrador de bases de datos documental de código abierto desarrollado bajo licencia MIT que utilizará lenguaje JavaScript para su construcción. Soportará archivos XML y manejará los lenguajes de consultas XPath y XQuery._

## Manual de Usuario

_Se desarrollo un interprete que como entrada debe recibir un archivo XML, el cual será utilizado para la captura da datos. Puede recibir un archivo XPATH el cual nos servirá para filtrar los datos realizando diferentes tipos de consultas._

### Partes de la página
_Nuestra pagina web cuenta con diferentes funcionalidades, las cuales son:_
* Barra de opciones

_En esta sección podemos encontrar las opciones para analizar las gramaticas de manera ascendente y descendente, ejecutar hpath, obtener reporte de tabla de simbolos, reporte AST, reporte gramatical y obtener el listado de errores para ambas gramaticas._
![image](https://user-images.githubusercontent.com/70385432/122165127-00fb7480-ce35-11eb-987a-c524f505f695.png)

* Editor de texto para entrada XML Y XPATH.
![image](https://user-images.githubusercontent.com/70385432/122165256-2e482280-ce35-11eb-9456-b95fe3c0ed8c.png)

* Consola de salida

_Todas nuestras instrucciones que devuelven una salida podran ser visualizada en nuestra consola, aca veremos los resultados de cada consulta ingresada._
![image](https://user-images.githubusercontent.com/70385432/122165281-3a33e480-ce35-11eb-89ff-7764d4c8a9cb.png)

* Tabla de errores

_Todos los errores son capturados en esta area, podemos visualizar los errores lexicos, sintacticos y semanticos para  el analizador XML y el analizador XPATH_
![image](https://user-images.githubusercontent.com/70385432/122165352-53d52c00-ce35-11eb-9aa4-c1184c277ae0.png)

* Reporte AST

_En esta area odemos visualizar la estructura de datos que utilizamos extensamente en nuestro compilador, debido a su propiedad de representar la estructura del código de nuestro programa._
![image](https://user-images.githubusercontent.com/70385432/122165522-8f6ff600-ce35-11eb-9ba1-0ea566d0509a.png)

* Reporte Tabla de Simbolos

_Contiene una entrada o registro para cada identificador. Cada registro incluye los campos para los atributos del identificador. El administrador de la tabla de símbolos se encarga de manejar los accesos a la tabla de símbolos, en cada una de las etapas de compilación de un programa._
![image](https://user-images.githubusercontent.com/70385432/122165597-a7477a00-ce35-11eb-8526-e7a7d6abdb1f.png)

* Reporte Gramatical

_En el reporte gramatical odemos observar como se comporta la gramatica con las diferentes entradas que esta tiene._
![image](https://user-images.githubusercontent.com/70385432/122165635-b6c6c300-ce35-11eb-93b2-e8dccebcd340.png)


### Documentacion de utilidad

* **Xpath** (https://www.w3schools.com/xml/xpath_operators.asp)
* **XML** (https://www.w3schools.com/xml/xml_examples.asp)

## Autores

* **Brayan Mauricio Aroche Boror** - *201503918* - [Brayan Aroche](https://github.com/201503918)
* **Luis Enrique Culpatan Lopez** - *201503964* - [Luis Culpatan](https://github.com/201503964)
* **Mitchel Andrea Cano Marroquín** - *201318570* - [Mitchel Cano](https://github.com/ma-cm)

## Licencia

Open Source Native XML Database with Query Languages XPath and XQuery in JavaScript




---
