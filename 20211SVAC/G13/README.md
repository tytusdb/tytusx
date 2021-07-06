# **TytusX**
## _Grupo 13 | Escuela de Vacaciones Junio 2021_
Universidad de San Carlos de Guatemala
Facultad de Ingeniería
Escuela de Ciencias y Sistemas
> TytusX es un administrador de bases de datos documental de código abierto desarrollado bajo licencia MIT. Hace uso del lenguaje JavaScript para su desarrollo. Soporta archivos con formato XML y es capaz de realizar diversas consultas sobre los archivos XML con el lenguaje `XPath y XQuery.`


# MANUAL DE USUARIO **(DEMO)**
> Visita [TytusX](https://tytusdb.github.io/tytusx/20211SVAC/G13/) (website de la aplicación)
> 
Para empezar deberá de ingresar una entrada en el campo de texto proveído, ya sea seleccionando un archivo personal, tecleando la entrada en la caja de texto o copiando y pegando el documento con formato XML.
#### - **Análisis**
Una vez la entrada a analizar se encuentra en el área de texto se cuenta con botones para `iniciar el análisis,`.
Al presionar cualquiera de los dos botones la aplicación procede a realizar una análisis sobre el código con sintaxis XML
de forma ascendente o descendente según corresponda.

Una vez la xml ha sido analizada con éxito es posible realizar consultas con sintaxis del lenguaje XPath o con lenguaje XQuery. Para ello deberá
teclear la consulta en el campo de texto correspondiente y presionar el botón `Consultar/Ejecutar`, si la consulta es válida para la entrada dada
se mostrará la salida en el cuadro de texto correspondiente. Ya sea el código de tres direcciones que incluye el almacenamiento de la estructura
xml en pilas de datos y el código de tres direcciones para visualizar las consultas con XPath y XQuery.


#### - **Reportes**
Si se detectan errores durante el análisis de la entrada la aplicación generará un `reporte de errores` especificando cuál fue el error y qué tipo de error fue localizado
en la entrada junto con su ubicación en la entrada.
De no encontrar errores en la entrada la aplicación esta genera un reporte detallado con la `tabla de símbolos`. Es posible saber en dónde fue
localizado el símbolo, el nombre de etiqueta en incluso su ámbito (etiqueta padre). Además también muestra la tabla de símbolos de análisis de XQuery
y la tabla de símbolos del análisis del código de tres direcciones, también genera una tabla con reglas optimizadas después de la generación del código
de tres direcciones.

##### - *CST (Concrete Syntax Tree)*
Una vez el análisis de la entrada ha sido ejecutado y ha finalizado también es posible observar el `árbol concreto de análisis`.
Este árbol refleja el análisis de la entrada XML, se observan todos los nodos generados por las producciones de la gramática.
La forma del árbol generado por este reporte depende del tipo de análisis seleccionado por el usuario.

##### - *Reporte Gramatical*
Junto con el árbol de CST de la entrada XML también se genera un `reporte gramatical` en el cual se pueden observar las producciones de la gramática
usada en el análisis de XML, la tabla generada despliega las filas justo en el orden que el analizador ha derivado durante el análisis, además se
muestran las acciones semánticas de cada producción. La salida de este reporte, al igual que con el reporte del CST, dependerá del tipo de análisis
que el usuario decida usar, dependiendo del tipo de análisis los reportes presentarán las características correspondientes.

##### - *AST (Abstract Syntax Tree)*
Una vez se ha realizado una consulta sobre una entrada XML la aplicación genera el árbol de análisis sintáctico donde es posible ver como el
el analizador ha procesado la entrada, ya sea para el análisis ascendente o descendente.


# MANUAL TÉCNICO

## Tecnologías Incluidas

## Jison
¿Qué es?
Los analizadores ayudan a las computadoras a derivar el significado de un texto arbitrario. ¡Y Jison te ayuda a construir analizadores!
Jison es esencialmente un clon del generador de analizador Bison (por lo tanto, Yacc) pero en JavaScript.
Incluye su propio analizador léxico modelado a partir de Flex.
Fue creado originalmente por Zach Carter para ayudar a estudiar para un curso de Compiladores.

## Java Scritp
JavaScript (abreviado comúnmente JS) es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, basado en prototipos, imperativo, débilmente tipado y dinámico.

## Type Script
TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Anders Hejlsberg, diseñador de C# y creador de Delphi y Turbo Pascal, ha trabajado en el desarrollo de TypeScript. TypeScript es usado para desarrollar aplicaciones JavaScript que se ejecutarán en el lado del cliente o del servidor, o extensiones para programas (Node.js y Deno).

## HTML
HTML, siglas en inglés de HyperText Markup Language (‘lenguaje de marcado de hipertexto’), hace referencia al lenguaje de marcado para la elaboración de páginas web. Es un estándar que sirve de referencia del software que conecta con la elaboración de páginas web en sus diferentes versiones, define una estructura básica y un código (denominado código HTML) para la definición de contenido de una página web, como texto, imágenes, videos, juegos, entre otros.

## VIZ JS
Una biblioteca de visualización dinámica basada en navegadores.
La biblioteca está diseñada para ser fácil de usar, manejar grandes cantidades de datos dinámicos y permitir la manipulación e interacción con los datos.
La biblioteca consta de los componentes DataSet, Timeline, Network, Graph2d y Graph3d. MIT LICENCE


## Gramáticas
Se presentan las gramáticas utilizadas en el desarrollo de este proyecto con notación BFN para su mejor comprensión y entendimiento.
 ## XML
 #### Ascendente
```sh
<S>                 ::= <ROOT>
<ROOT>              ::= <ENCODING> <ELEMENTO>
<ENCODING>          ::= "<" "ident" "ident" = "string" " >"
                    | "epsilon"
<ELEMENTO>          ::= "<" "ident" <ATRIBUTOS> "/" " >"
                    | "<" "ident" <ATRIBUTOS> ">" <CONTENIDO> "<" "/" "ident" " >"
                    | "<" "ident" <ATRIBUTOS> ">" <ELEMENTOS> "<" "/" "ident" " >"
<ATRIBUTOS>         ::= <LISTA_ATRIBUTOS>
                    | "epsilon"
<LISTA_ATRIBUTOS>   ::= <LISTA_ATRIBUTOS> <ATRIBUTO>
                    | <ATRIBUTO>
<ATRIBUTO>          ::= "ident" = "string"
<ELEMENTOS>         ::= <ELEMENTOS> <ELEMENTO>
                    | <ELEMENTO>
<CONTENIDO>         ::= <LISTA_DATOS>
                    | "epsilon"
<LISTA_DATOS>       ::= <LISTA_DATOS> <DATOS>
                    | <DATOS>
<DATOS>             ::= "Data"
                    | "Name"
```
 #### Descendente
```sh
<S>                 ::= <ROOT>
<ROOT>              ::= <ENCODING> <ELEMENTO>
<ENCODING>          ::= "<" "ident" "ident" "=" "string" ">"
                    | "epsilon"
<ELEMENTO>          ::= "<" "ident" <ATRIBUTOS> "/" ">"
    		        | "<" "ident" <ATRIBUTOS> ">" <CONTENIDO> "<" "/" "ident" ">"
    		        | "<" "ident" <ATRIBUTOS> ">" <ELEMENTOS> "<" "/" "ident" ">"
<ATRIBUTOS>         ::= <LISTA_ATRIBUTOS>
    		        | "epsilon"
<LISTA_ATRIBUTOS>   ::= <ATRIBUTO> <LISTA_ATRIBUTOS_P>
<LISTA_ATRIBUTOS_P> ::= <ATRIBUTO> <LISTA_ATRIBUTOS_P>
    			    | "epsilon"
<ATRIBUTO>          ::= "ident" "=" "string"
<ELEMENTOS>         ::= <ELEMENTO> <ELEMENTOS_P>
<ELEMENTOS_P>       ::= <ELEMENTO> <ELEMENTOS_P>
    		        | "epsilon"
<CONTENIDO>	        ::= <LISTA_DATOS>
    		        | "epsilon"
<LISTA_DATOS>       ::= <DATOS> <LISTA_DATOS_P>
<LISTA_DATOS_P>     ::= <DATOS> <LISTA_DATOS_P>
    			    | "epsilon"
<DATOS>             ::= "Data"
    		        | "ident"
```
 ## XPATH
 #### Ascendente
```sh
<START>         ::= <LCONSULTAS>
<LCONSULTAS>    ::= <CONSULTA> <LCP>
<LCP>           ::= "|" <CONSULTA> <LCP>
                | "epsilon"
<OPPATH>        ::= "//"
                | "/"
<CONSULTA>      ::= <OPPATH> <RUTA>
                | <RUTA>
<RUTA>          ::= <ENODO> <RP>
<RP>            ::= <OPPATH> <ENODO> <RP>
                | "epsilon"
<ENODO>         ::= "@" <NODO>
                | <NODO>
<NODO>          ::= "ident" "[" <E> "]"
                | "ident"
                | "node" "(" ")"
                | "*"
                | "."
                | ".."
<E>             ::= <E> "+" <E>
                | <E> "-" <E>
                | <E> "*" <E>
                | <E> "div" <E>
                | <E> "%" <E>
                | <E> "<" <E>
                | <E> "<=" <E>
                | <E> ">" <E>
                | <E> ">=" <E>
                | <E> "=" <E>
                | <E> "!=" <E>
                | "-" <E>
                | "(" <E> ")"
                | "ident" "(" ")"
                | <PRIMITIVO>
<PRIMITIVO>     ::= "integer"
                | "double"
                | "char"
                | "string"
                | "ident"
```
 #### Descendete
```sh
<START>         ::=  <LCONSULTAS>
<LCONSULTAS>    ::= <CONSULTA> <LCP>
<LCP>           ::= vertical <CONSULTA> <LCP>
                | "epsilon"
<OPPATH>        ::= "//"
                | "/"
<CONSULTA>      ::= <OPPATH> <RUTA>
                | <RUTA>
<RUTA>          ::= <ENODO> <RP>
<RP>            ::= <OPPATH> <ENODO> <RP>
                | "epsilon"
<ENODO>         ::= "@" <NODO>
                | <NODO>
<NODO>          ::= "ident" "[" <E> "]"
                | "ident"
                | "node" "(" ")"
                | "*"
                | "."
                | ".."
<E>             ::= <T> <EP>
<EP>            ::= "or" <T> <EP>
                |"epsilon";
<T>             ::= <F> <TP>
<TP>            ::= "and" <F> <TP>            
                | "epsilon"
<F>             ::= <G> <FP>
<FP>            ::= "=" <G> <FP>
                | "!=" <G> <FP>
                | "<" <G> <FP>
                | "<=" <G> <FP>
                | ">" <G> <FP>
                | ">=" <G> <FP>
                | "epsilon"
<G>             ::= <H> <GP>
<GP>            ::= "+" <H> <GP>
                | "-" <H> <GP>
                | "epsilon"
<H>             ::= <I> <HP>
<HP>            ::= "*" <I> <HP>
                | "div" <I> <HP>
                | "%" <I> <HP>          
                | "epsilon"
<I>             ::= "-" <E>
                | "(" <E> ")"
                | <PRIMITIVO>
<PRIMITIVO>     ::= "integer"    
                | "double"
                | "char"
                | "string"
                | "last" "(" ")"
                | "position" "(" ")"
                | "ident"
```

## Licencia
##### Publicado bajo licencia MIT.

Por la presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión , publicar, distribuir, sublicenciar y / o vender copias del Software, y permitir que las personas a las que se les proporcione el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
