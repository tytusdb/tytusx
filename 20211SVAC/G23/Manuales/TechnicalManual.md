# MANUAL TÉCNICO

## Indice
- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Requerimientos funcionales](#Requerimientos-funcionales)
- [Atributos del sistema](#Atributos-del-sistema)
- [Método de trabajo](#método-de-trabajo)

<hr>
<br>

## Introducción
A continuacion, se detallaran los elementos técnicos utilizados para la funcionalidad del programa llamado TYTUSX, proyecto del curso de Organización de Lenguajes y Compiladores 2. Especificamente
se detallara la forma en la que se trabajo este proyecto por parte del grupo numero 23

## Objetivos
### General 
Aplicar los conocimientos sobre la fase de análisis léxico, sintáctico y semántico de un compilador para
la realización de interpretes con funcionalidades especificas, un interprete para XML y otro para Xpath
### Específicos
-	Reforzar los conocimientos de análisis léxico, sintáctico y semántico para la creación de un lenguaje de programación.
-	Aplicar los conceptos de compiladores para implementar el proceso de
interpretación de código de alto nivel.
-	Aplicar los conceptos de compiladores para analizar un lenguaje de

<br>
<hr>
<br>

## Atributos del sistema
Cualquier computadora con sistema operativo que soporte los navegadores actuales para correr las funcionalidades de la aplicación en un entorno web.

## Requerimientos funcionales
-	Abrir archivos: El editor deberá abrir archivos xml y xpath
-	Guardar el archivo: El editor deberá guardar el estado del archivo en el que se estará trabajando.
-	Nueva Pestaña: El editor deberá ser capaz de abrir pestañas en el navegador
-	Reconocer, analizar y validar cadenas ingresadas.
-	Graficar toda parte del proceso por medio de una interfaz amigable al usuario.
-	Cerrar Pestaña: ademas del boton de cierre en la pestaña hay un boton que cumplira esta funcion.
-	Limpiar: Esta opcion limpiara las cajas de texto que se encuentran en la interfaz.
-	Reportes: Esta pertaña mostrara tres opciones para reportes, el AST, CST y DAG
-	Cambio de gramatica: se podra cambiar entre las gramaticas ascendentes y descendentes.
-   	Eliminar pestaña: permitirá cerrar la pestaña actual.

<br>
<hr>
<br>

## Herramientas
-   Compilar: hará el llamado al intérprete, el cual se hará cargo de realizar los análisis léxico, sintáctico y semántico, además de ejecutar todas las sentencias.

<br>

## Reportes
-   Reporte de Errores: Se mostrarán todos los errores encontrados al realizar el análisis léxico, sintáctico y semántico.
-   Reporte de Tabla de Símbolos: Se mostrarán todas las variables, métodos y funciones que han sido declarados dentro del flujo del programa.
-   Generar Árbol AST (Árbol de Análisis Sintáctico): se debe generar una imagen del árbol de análisis sintáctico que se genera al seleccionar la opcion.
-   Generar Árbol CST (Árbol de Análisis Concreto): se debe generar una imagen del árbol de análisis concreto que se genera al seleccionar la opcion.
-   Generar Árbol DAG (Grafico Aciclico Dirigido): se debe generar una imagen del Arbol Aciclico Dirigido que se genera al seleccionar la opcion.

<br>
<br>

## Método de trabajo
El proyecto está distribuido en distintas carpetas, para optimizar y ordenar mejor el trabajo, los módulos son los siguientes:

### Backend:
- analyzers
- controller
- model
- routes

### Frontend:
- Se hizo uso de componenetes de Angular en su versión 11.
- App-Component (html, css, services)


## [xml_up.jison](tytus/backend/analyzers)
Este archivo contiene la gramatica XML de forma ascendente, y esta recopila el analizador lexico y sintactico, asi como la informacion posterior a dichos procesos.

## [xml_down.jison](tytus/backend/analyzers)
Este archivo contiene la gramatica XML de forma descendente, y esta recopila el analizador lexico y sintactico, asi como la informacion posterior a dichos procesos.

## [xpath_up.jison](tytus/backend/analyzers)
Este archivo contiene la gramatica Xpath de forma ascendente, y esta recopila el analizador lexico y sintactico, asi como la informacion posterior a dichos procesos.

## [xpath_down.jison](tytus/backend/analyzers)
Este archivo contiene la gramatica Xpath de forma descendente, y esta recopila el analizador lexico y sintactico, asi como la informacion posterior a dichos procesos.

<br>

#### [Operacion.ts](tytusx/20211SVAC/G23/backend/controller/xpath/Expresion/Operators/Aritmetica.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `init(_opIzq: any, _opDer: any, _ambito: Array<any>, _tipo: Tipos)` | Esta funcion se encarga de realizar las operaciones aritemeticas que se puedan localizar en la gramaticas. Esta misma funcion se repite en los archivos Logica.ts y relacional.ts pero con otro nombre. |

<br>

#### [Expresion.ts](tytusx/20211SVAC/G23/backend/controller/xpath/Expresion/Expresion.ts)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `Expresion(_expresion: any, _ambito: Ambito, _contexto: any)` | Esta funcion es la que se encarga de clasificar las expresiones que sean encontradas en la entrada durante el proceso de analisis. |

<br>

### [routes](tytusx/20211SVAC/G23/backend/routes/compile.ts)
Carpeta en donde se encuentran cada uno de los archivos .js para poder hacer caso a las solicitudes que se realicen desde la aplicación, en este caso para compilar y devolver un archivo del AST.

<br>

#### [compile.ts](https://github.com/ldecast/Typesty-OLC1/blob/master/server/routes/compile.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `compile(req: any)` | Esta es la funcion que se encarga de ejecutar los analizadores, extraer la informacion necesaria de estos y asi poder mostrar

<br>

## Errores
Es parte del flujo de programa detectar y reportar errores, por lo que en todas partes del programa, en caso de manejar un error se retornan objetos js { err: "error detectado" }.

<br>

<hr>
<br>

## Contacto:
luis.danniel@hotmail.com







