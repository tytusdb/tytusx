# Manual de usuario

## Advertencias y tips
* Verificar los comandos antes de ejecutar la aplicación.
* Asegurarse de tener un encoding adecuado (utf8, utf16le, ascii).
* En este programa no se puede realizar comandos de Xquery solamente de Xpath.
* Pueden ocurrir errores de análisis irrecuperables.
* Si la aplicación deja de funcionar correctamente, debe recargar la página para reiniciarla.
## Aplicaciones típicas y capacidad de la tecnología
* Consultas para busqueda de informacion en archivos XML.
* Puede analizar en codificacion UTF8, UTF16 y ASCII.
* Permite el uso de Axes, busqueda por Id, busqueda por nombre de etiqueta.
* Función nativa text para mostrar texto de la etiqueta.
* Función nativa node para buscar los nodos internos de la clase.
* Función nativa position para comaprar la posicion actual del nodo.
* Función nativa last para obtener el ultimo nodo de la busqueda.
## Descripción descriptiva del sistema con ilustraciones
* **Menú de reportes:** En éste menú encontrará las opciones de reportería tales como: ![img][img1]
    * Reporte gramatical
    * Reporte árbol AST
    * Reporte árbol CST
    * Reporte tabla de símbolos
    * Reporte de errores
* **Sección de archivos XML:** Se puede cargar un archivo XML desde el computador dando clic en éste botón. 
![img][img2]
* **Sección de archivos XPATH:** Se puede cargar un archivo XPATH desde el computador dando clic en éste botón. 
![img][img7]
* **Sección de Análisis:** Se puede ejecutar un análisis sintáctico de los archivos que cargamos o que ingresamos en la sección de ingreso. ![img][img3]
    * Análisis ascendente
    * Análisis descendente
* **Sección de ingreso manual XML:** Se puede editar manualmente el contenido a analizar. ![img][img4]
* **Sección de ingreso manual de XPATH:** Se puede editar manualmente el contenido a analizar. ![img][img5]
* **Consola de salida:** ![img][img6]
## Descripción funcional de los subsistemas
* **Analisis de XML:** Crea un entorno por medio de la lectura de un archivo XML que será usado posteriormente para la consulta por medio de XPath.
    * Análisis descendente, permite obtener los datos del XML mediante un arbol sin recursividad por la derecha.
    * Análisis ascendente, permite obtener los datos del XML mediante un arbol que puede ser recursivo por la izquierda.
* **Analisis de XPath:** Analiza una entrada XPath para la consulta, posteriormente ejecuta con el entorno proporcionado por el analisís XML para la busqueda deseada.
    * Análisis descendente, permite obtener los datos del Xpath mediante un arbol sin recursividad por la derecha.
    * Análisis ascendente, permite obtener los datos del XPath mediante un arbol que puede ser recursivo por la izquierda.
* **Reporteria:** Seccion donde se muestran los reportes generados por el analisis del XPath y del XML entre estos se encuentran el reporte AST, CST, gramatical y tabla de simbolos, asi como la tabla de errores del análisis.
## Instrucciones para el funcionamiento del sistema
* Cargar un archivo XML o ingresar una entrada por medio del cuadro de texto.
* Este al momento de cargar o de dejar de escribir hace el analisis ascedente automaticamente.
* Presionar el botón de analisis desecente si se quiere ejecutar con ese modo.
* Ingresar un archivo Xpath o ingresar una entrada por medio del cuadro de texto.
* Ejecutar con los botones ascendente o descendente.
* El programa analisará y mostrara la respuesta en el cuadro de la consola.
## Requisitos de mantenimiento del sistema
* Conocimientos de JavaScript.
* Conocimientos de Jison.
* Conocimientos generales de programación.
* **Npm install** para la instalacion de las dependencias.
* Conocimiento en el uso de gramaticas ascendentes y descendentes.
## Instrucciones de solución de problemas
* En caso de fallo del analizador recargar la pagina para limpiar el analisis realizado.

[img1]: https://i.imgur.com/xdXARQn.png
[img2]: https://i.imgur.com/vBgGcZw.png
[img3]: https://i.imgur.com/Plq4vNr.png
[img4]: https://i.imgur.com/xuIJV2S.png
[img5]: https://i.imgur.com/DRFheyc.png
[img6]: https://i.imgur.com/IvFdmgi.png
[img7]: https://i.imgur.com/5P43ad2.png
