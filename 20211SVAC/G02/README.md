![](RackMultipart20210616-4-1s5mr1q_html_768563dc68e87d99.png)

# **TytusX: Manual Técnico**

# **Grupo 2**

Escuela de Ciencias y Sistemas

Organización de Lenguajes y Compiladores 1

Vacaciones junio de 2021

# Diagrama de aplicación

![](RackMultipart20210616-4-1s5mr1q_html_b4729692c61956af.png)

# Especificación de Tecnologías utilizadas

## HTML 5

HTML 5 (HyperText Markup Language, versión 5) es la quinta revisión importante del lenguaje básico de la World Wide Web, HTML. HTML5 específica dos variantes de sintaxis para HTML: una «clásica», HTML (text/html), conocida como HTML5, y una variante XHTML conocida como sintaxis XHTML 5 que deberá servirse con sintaxis XML (application/xhtml+xml).1​2​ Esta es la primera vez que HTML y XHTML se han desarrollado en paralelo. La versión definitiva de la quinta revisión del estándar se publicó en octubre de 2014.3​

Al no ser reconocido en viejas versiones de navegadores por sus nuevas etiquetas, se recomienda al usuario común actualizar su navegador a la versión más nueva, para poder disfrutar de todo el potencial que provee HTML 5.

![](RackMultipart20210616-4-1s5mr1q_html_772195d97311b4bf.jpg)

## CSS 3

CSS es un lenguaje de diseño gráfico que permite definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado. Es muy usado para establecer el diseño visual de los documentos web e interfaces de usuario escritas en HTML.

En la propia definición de CSS vemos que está muy ligado desde su nacimiento a HTML. Desde que nació, el objetivo de CSS fue poner un poco de orden a la hora de aplicar los estilos a las páginas web.

## Javascript

JavaScript es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, cada vez que una página web hace algo más que sentarse allí y mostrar información estática para que la veas, muestra oportunas actualizaciones de contenido, mapas interactivos, animación de Gráficos 2D/3D, desplazamiento de máquinas reproductoras de vídeo, etc., puedes apostar que probablemente JavaScript está involucrado. Es la tercera capa del pastel de las tecnologías web estándar

![](RackMultipart20210616-4-1s5mr1q_html_40d599fc3f9a4ec6.png)

## TypeScript

TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Anders Hejlsberg, diseñador de C# y creador de Delphi y Turbo Pascal, ha trabajado en el desarrollo de TypeScript.1​ TypeScript es usado para desarrollar aplicaciones JavaScript que se ejecutarán en el lado del cliente o del servidor, o extensiones para programas (Node.js y Deno).

TypeScript extiende la sintaxis de JavaScript, por tanto cualquier código JavaScript existente debería funcionar sin problemas. Está pensado para grandes proyectos, los cuales a través de un compilador de TypeScript se traducen a código JavaScript original.

TypeScript soporta ficheros de definición que contengan información sobre los tipos de librerías JavaScript existentes, similares a los ficheros de cabeceras de C/C++ que describen la estructura de ficheros de objetos existentes. Esto permite a otros programas usar los valores definidos en los ficheros como si fueran entidades TypeScript de tipado estático. Existen cabeceras para librerías populares como jQuery, MongoDB y D3.js, y los módulos básicos de Node.js.

![](RackMultipart20210616-4-1s5mr1q_html_b1db005c86dacae.png)

## Codemirror

CodeMirror es un componente de JavaScript que proporciona un editor de código en el navegador. Tiene una API de programación rica y un enfoque en la extensibilidad.

La primera versión del editor fue escrita a principios de 2007, para la consola del sitio web de Eloquent JavaScript. El código fue empaquetado por primera vez y publicado bajo el nombre de CodeMirror en mayo de 2007. Esta versión se basaba en la función contentEditable de los navegadores.1​

A finales de 2010, el proyecto Ace, otro editor de código basado en JavaScript, fue pionero en nuevas técnicas de implementación y demostró que es posible, incluso en JavaScript, manejar documentos con miles de líneas sin un rendimiento degradado. Esto provocó una reescritura de CodeMirror2​ según los mismos principios. El resultado fue la versión 2, que ya no dependía de contentEditable y mejoró significativamente el rendimiento.

![](RackMultipart20210616-4-1s5mr1q_html_d17a45bb78080eb5.png)

## Jison

Jison es, en escencia, un clone del generador grammatical Bison y Yacc, pero en javascript. Incluye su propio analizador lexico modelado en base a Flex (analizador lexico para JAVA). Fue creado originalmente por Zach Carter para ayudar el estudio de un curso de compiladores.

![](RackMultipart20210616-4-1s5mr1q_html_a7b3bcc4eb482db7.png)

# Comandos de Compilación

## Frontend
```
npm i -g
```
Para instalar el compilador de typescript, la librería jison y el paquete copyfiles, que sirve para poder copiar, pegar y eliminar archivos en carpetas.

```
npm run build
```
Para compilar el codigo typescript

```
npm run gramaticaXML
```
Para generar la gramática de los archivos XML desde jison.

```
npm run gramaticaXPath
```
Para generar la gramática de los comandos XPath desde jison

```
npm run gramaticas
```
Para generar ambas gramáticas

```
npm run copiarGramaticaXML
```
Para copiar la gramática generada de los archivos XML hacia la carpeta build

```
npm run copiarGramaticaXPath
```
Para copiar la gramática generada de los comandos XPath hacia la carpeta build

```
npm run copiarGramaticas
```
Copia ambas gramáticas generadas hacia la carpeta build

```
npm run correrGramaticas
```
Genera y luego copia ambias gramáticas hacia la carpeta build

```
npm run full-build
```
Genera una compilación completa del código typescript, así como la generación y posterior copia hacia la carpeta build de ambas gramáticas.

![](RackMultipart20210616-4-1s5mr1q_html_46bd759368a4ed09.gif)