# Manual Técnico

#### Descripción
Realización de analizador léxico, sintático y semántico, ascendente y descendente de lenguaje XML y de lenguaje de consultas XPath. Con interfaz gráfica web desarrollada en React y Javascript.


#### Desarrolladores: Grupo no. 17
    - Angel Marcelo Rama Marroquín García 201701020
    - Jorge David Ambrocio Ventura 201709454
    - Viany Paola Juárez Hernández 201700659

### Dependencias

#### Interfaz
- React 17.0.2
- Bootstrap 5.0.1
- CodeMirror 5.61.1 
- vis-react: 0.5.1

#### Desarrollo
- Javascript
- JISON 0.4.18
- Node JS 14.16.1
- npm 6.14.12

#### IDE
- Visual Studio Code

#### Versionamiento
- Git (local)
- Github (online)

#### Despliegue
- gh-pages 3.2.0

#### Enlace de Despliegue
https://tytusdb.github.io/tytusx/20211SVAC/G17


#### Codigo Fuente:
### Ejecución de archivo XML

Archivo Helpers.js
 - Clase Nodo:
######
![Nodo][img1]
######
La clase "Nodo" es la clase principal de donde derivan las demás clases de ejecución para los analizadores. Es una clase de encapsulamiento para todas las clases.

 - Clase Objeto:
######
![Nodo][img2]
######
La clase "Objeto" extiende de la clase principal "Nodo" y almacena cada objeto dentro del XML. Este contiene tipo, una lista de atributos, una lista de hijos, linea, columna (estas ultimas dos extendidas de nodo) y el texto respectivo a cada objeto.

 - Clase Nodo:
######
![Nodo][img3]
######
La clase "Atributo" de igual forma extiende de nodo y guarda el nombre, el valor, la linea y la columna respectiva a cada atributo de cada objeto.

 - Función CambiarCodificación:
######
![Nodo][img4]
######
Esta función se ejecuta cada vez que el analizador reconoce una etiqueta con atributos de configuración para todo el archivo. Esta función, almacena los valores y los ejecuta para todo el archivo.

### Ejecución de archivos XPath
Archivo Axes.js
- Clase Axes
######
![Nodo][img5]
######
La clase "Axes" es la clase principal maneja las relaciones que pueden haber entre los nodos actuales y los otros.
Contiene una función getValor actualmente vacia, que permite que las clases que extienden de ella puedan heredarla y simular un funcionamiento de clases abstractas.

Archivo Arithmetics.js
- Clase Arithmetic
######
![Nodo][img6]
######
La clase "Arithmetic" creada como principal para ejecutar las funciones aritmeticas de multiplicación, división, suma y resta; validando de forma recursiva los hijos izquierdos y derechos respectivamente creando literales.

Archivo Expresiones.js
- Clase NodoExp
######
![Nodo][img7]
######
La clase "NodoExp" se crea como la clase principal que almacena un tipo y un valor para las expresiones como literales y nodos.

- Clase Literal
######
![Nodo][img8]
######
La clase "Literal" extiende de la clase NodoExp y retorna el valor puro que se ingreso (Integer, Decimal, String).


Archivo Entorno.js
- Clase Comando
######
![Nodo][img9]
######
La clase "Comando" almacena en un objeto el resultado del análisis ya sea descendente o ascendente del jison XPath, guardando una lista de instrucciones (para mostrar como salida), una lista de nodos y edges (para graficar reportes de árboles CST y AST), una lista de errores (con recuperación para continuar con la ejecución), una lista de produccione y acciones semánticas (para el reportes gramticales).

- Función Ejecutar
######
![Nodo][img10]
######
Esta función ejecuta de manera recursiva la lista de instrucciones realizando cada instruccion para luego analizar los retornos de cada una y devolver una salida.

## Contactos:
- Angel Marroquín: 3512337680403@ingenieria.usac.edu.gt
- Jorge Ambrocio: 3665782860101@ingenieria.usac.edu.gt
- Viany Juárez: 3001620730101@ingenieria.usac.edu.gt

[img1]: images/classNodo.png
[img2]: images/classObjeto.png
[img3]: images/classAtributo.png
[img4]: images/funcCambiarCodificacion.png
[img5]: images/classAxes.png
[img6]: images/classArithmetic.png
[img7]: images/classNodoExp.png
[img8]: images/classLiteral.png
[img9]: images/classComando.png
[img10]: images/funcEjecutarXML.png
