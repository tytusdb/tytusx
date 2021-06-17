# Clases para tabla de simbolos XML

## Clase entorno
La clase entorno tiene la capacidad de albergar mas entornos dentro de el ademas de atributos
para sus etiquetas, tambien resguarda el nombre de las etiquetas xml de apertura y cierre.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/entornoXml.png)

## Clase simbolo
Esta clase tiene dentro de ella un estructura en la cual se se guarda un id y un valor asociado
a este id, por el tipo del lenguaje este valor solo puede ser de tipo string.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/simboloXml.png)

## Interfaz expresion
Esta interfaz da los para metros que debe llevar las clases siguientes de los nodos ast

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/d1.png)

## Clase Path
Esta clase ejecuta los querys de xpath

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/d2.png)

## Clase Aritmetico
Esta clase implementa la interfaz expresion para hacer las consultas

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/d3.png)

# Métodos y clases para los reportes

## crearTextoGraphvizRepGram
Este método es el encargado de crear el texto para la gráfica
del Reporte gramatical dentro de graphviz. Recibe como parametros una lista de producciones
en formato string, una lista de reglas semanticas en formato string y un texto el cuál sera el resultado
de la gráfica.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/crearTextoGraphvizRepGram.png)

## crearTextoGraphvizCST
Este método es el encargado de crear el texto para la gráfica
del Reporte del arbol CST dentro de graphviz. Recibe como parametros un nodo padre de tipo
NodoCST y un texto el cuál sera el resultado de la gráfica de graphviz.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/crearTextoGraphvizCST.png)

## Clase NodoCST
Esta clase es utilizada para crear un arbol CST a partir de la gramatica, cada uno
de sus nodos contiene un nombre en string, un indice en number y una lista de nodos
de su mismo tipo. 

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/NodoCST.png)

## crearTextoGraphvizTablaSimbolos
Este método es el encargado de crear el texto para la gráfica
del Reporte de Tabla de Simbolos dentro de graphviz. Recibe como parametros una lista de tipo
SimboloTabla el cual contendra los simbolos obtenidos a partir del analisis y un texto el cual sera el 
resultado para la gráfica de graphviz.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/crearTextoGraphvizTablaSimbolos.png)

## crearTablaSimbolos
Este metodo se encarga de crear la tabla de simbolos a parti del analisis
ejecutado, recibe como parametros una raiz que es de tipo entorno, un resultado que es una lista
de tipo SimboloTabla el cual obtendra los simbolos reconocidos y un entorno de tipo string
para asignar el entorno a un simbolo.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/crearTablaSimbolos.png)

## Clase SimboloTabla
Esta clase es utilizada para la creación de un simbolo para luego agregarlo a
la tabla de simbolos, cada objeto SimboloTabla tendra una linea de formato number, una columna
de tipo number, un nombre en string, un tipo en string, un ambito y valor en string. el nombre
representa el nombre del simbolo, el tipo el tipo de simbolo, el ambito representa a que otro simbolo
pertenece y el valor representa su valor si es que tiene alguno.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/SimboloTabla.png)

## GraficarAST
Este metodo se encarga de crear el AST para XPATH de forma grafica por medio del
uso de graphviz, este metodo es implementado como una interfaz en todas las clases de XPATH por
lo que sus caracteristicas y su funcionamiento cambian dependiendo del metodo en el que se
encuentre.

![alt text](https://github.com/201709309/py_compi2/blob/main/Documentacion/Manual%20Tecnico/imagenes/GraficarAST.png)
