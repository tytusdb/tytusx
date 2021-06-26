# MANUAL DE USUARIO TytusX G27 (Fase1)

## Integrantes de G27 ✒️

* **Luis Carlos Valiente Salazar         -   201122864** - *Luiskr1993*
* **Carlos Omar Aquino Escobar           -   201213194** - *carlos093aquino*
* **Daniel Alejandro Herrera Hernández   -   201213194** - *carlos093aquino*

## Detalles Generales 🚀
* **Sistema Operativo:** Windows 10
* **Diseño Visual:** HTML, CSS, Bootstrap
* **Lenguaje:** Javascript
* **URL:** - https://tytusdb.github.io/tytusx/20211SVAC/G27/
### Descripción General 📋

TytusX es un administrador de bases de datos documental de código abierto
desarrollado bajo licencia MIT que utilizará lenguaje JavaScript para su
construcción. Soportará archivos XML y manejará los lenguajes de consultas XPath
y XQuery. A continuación se describen las funcionalidades que se pueden encontrar dentro de TytusX G27:

## Interfaz Gráfica

La interfaz gráfica de TytusX es bastante simple con una sección de texto grande ubicada a la izquierda de la pantalla donde se podrán cargar archivos XML para llenar la BD de la aplicación. También cuenta con una segunda sección amplia de texto para la visualización de las consultas realizadas y en la parte posterior se encuentra una caja de texto para escribir consultas en formato XPATH. 

![alt text](/img/f1.png "Interfaz Grafica")


También se agrega un menú de funciones en las cuales se podrán ejecutar los distintos parsers de TytusX. Las funcionalidades listadas de izquierda a derecha son:
* Limpiar Contenedores
* Abrir Nuevo Archivo
* Guardar archivo
* Submenú de reportes: (AST, CST, Errores, Tabla de Símbolo, Gramaticales)
* Stop
* Ejecutar XML

![alt text](/img/f2.png "Menú de Funciones XML")


##  Reportes

Para los reportes se incluye en el menú un desplegable donde se pueden observar las distintas opciones de reporte a generar:

![alt text](/img/f3.png "Reportes")

Para poder generar un reporte primero se deben haber seguido los pasos de ejecución y traducción:
* Cargar un archivo XML
* Ejecutar el archivo XML
* Generar una consulta XPATH

Luego de haber seguido esos pasos ya podrá generar reportes haciendo click sobre el reporte deseado en el menú y luego se podrá visualizar en la parte inferior de la pantalla el reporte generado: 

![alt text](/img/f4.png "Reportes")

![alt text](/img/f5.png "Reportes")


## Contribuyendo 🖇️

Este proyecto se realizó como una contribución para un proyecto main llamado TytusX, el cual se puede encontrar en la siguiente dirección: 
* **https://github.com/tytusdb/tytusx**


## Licencia 📄

Este proyecto y todos sus componentes están basados en licencia MIT.