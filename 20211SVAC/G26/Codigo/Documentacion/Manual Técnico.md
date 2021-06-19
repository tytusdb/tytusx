![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/ECYS.png)

# **TytusX: Manual Técnico**

# **Grupo 26**

Escuela de Ciencias y Sistemas (ECYS)

Organización de Lenguajes y Compiladores 2

Vacaciones junio de 2021

# Diagramas

## Diagrama de aplicación

![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/diagrama.JPG)

## Diagrama de Sitio

![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/diagrama_sitio_web.JPG)

# Librerias o Frameworks utilizados

## React JS

Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres.

React ayudaa a los desarrolladores a construir aplicaciones que usan datos que cambian todo el tiempo. Su objetivo es ser sencillo, declarativo y fácil de combinar. React sólo maneja la interfaz de usuario en una aplicación

![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/img_react.JPG)

## React Bootstrap

React-Bootstrap reemplaza Bootstrap JavaScript. Cada componente se ha creado desde cero como un verdadero componente de React, sin dependencias innecesarias como jQuery.
Como una de las bibliotecas de React más antiguas, React-Bootstrap ha evolucionado y crecido junto con React, lo que la convierte en una excelente opción como base de la interfaz de usuario.


## Javascript

JavaScript es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, muestra oportunas actualizaciones de contenido, mapas interactivos. Es la tercera capa del pastel de las tecnologías web estándar que permite presentar y ejecutar animaciones, funciones, actualizaciones etc.

![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/img_js.JPG)


## TypeScript

TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Anders Hejlsberg, diseñador de C# y creador de Delphi y Turbo Pascal, ha trabajado en el desarrollo de TypeScript.

TypeScript extiende la sintaxis de JavaScript, por tanto cualquier código JavaScript existente debería funcionar sin problemas. Está pensado para grandes proyectos, los cuales a través de un compilador de TypeScript se traducen a código JavaScript original. TypeScript soporta ficheros de definición que contengan información sobre los tipos de librerías JavaScript existentes, similares a los ficheros de cabeceras de C/C++ que describen la estructura de ficheros de objetos existentes.

![image](https://user-images.githubusercontent.com/24401039/122161408-e4f4d480-ce2e-11eb-96f4-a2be7d21eadd.png)


## Codemirror

CodeMirror es un componente de JavaScript que proporciona un editor de código en el navegador. Tiene una API de programación rica y un enfoque en la extensibilidad.

La primera versión del editor fue escrita a principios de 2007, para la consola del sitio web de Eloquent JavaScript. El código fue empaquetado por primera vez y publicado bajo el nombre de CodeMirror en mayo de 2007. Esta versión se basaba en la función contentEditable de los navegadores.1​


![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/img_codemirror.JPG)

## Jison

Jison es, en escencia, un clone del generador grammatical Bison y Yacc, pero en javascript. Incluye su propio analizador lexico modelado en base a Flex (analizador lexico para JAVA). Fue creado originalmente por Zach Carter para ayudar el estudio de un curso de compiladores.

![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/img_jison.JPG)

# Comandos de Compilación

## Frontend
```
npm i -g
```
Para instalar todo lo necesario utilizado en proyecto, compilador de typescript, librería jison.

```
npm run build
```
Para compilar el codigo typescript

```
npm run XML_Gramatica
```
Para generar la gramática de los archivos XML desde jison.

```
npm run XPath_gramatica
```
Para generar la gramática de los comandos XPath desde jison

```
npm start
```
Para ejecutar proyecto react.

# Gramaticas

## Gramatica Ascendente XML
```
escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'

//CUALQUIER CARACTER EXCEPT <
content                             [^<]

%s                                  comment
%%

//CONTENIDO DE TEXTO PARA LAS ETIQUETAS
//COMENTARIOS <!-- asd -->
\s+                                 /* skip whitespace */
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/

"<"                                 return 'lt';
">"                                 return 'gt';
"="                                 return 'asig';
"/"                                 return 'diag';
"?"                                 return 'interrog';
"'"                                return 'apos';
[xX][mM][lL]                        return "xml";

'&lt;'                              return 'less';
'&gt;'                              return 'greater';
'&amp;'                             return 'ampersand';
'&apos;'                            return "apostrophe";
'&quot;'                            return "quot";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*          return 'identifier';

{stringliteral}                     return 'cadena'
{charliteral}                       return 'cadena2'

{content}                           return 'content'

<<EOF>>                             return 'EOF'
//error lexico
.                                   {
                                        console.log(errores.default);
                                        errores.default.agregarError('lexico', 'Simbolo inesperado ' + yytext , yylloc.first_line, yylloc.first_column);
                                    }

/lex

//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : ENCABEZADO EOF              { return $1; }
;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            | error LISTAELEMENTOS
;

LISTAELEMENTOS: LISTAELEMENTOS ELEMENTO 
            | ELEMENTO                  

;

ELEMENTO: lt identifier LISTAATRIBUTOS diag gt                                  
        | lt identifier LISTAATRIBUTOS gt TEXTCONTENT lt diag identifier gt     
        | lt identifier LISTAATRIBUTOS gt LISTAELEMENTOS lt diag identifier gt  
        | lt identifier LISTAATRIBUTOS gt lt diag identifier gt                 
        | error gt
;

LISTAATRIBUTOS: ATRIBUTOS
            |            
             ;

ATRIBUTOS: ATRIBUTOS ATRIBUTO  
            | ATRIBUTO         
            ;

ATRIBUTO:   identifier asig cadena
            | identifier asig cadena2
            | error             
;

TEXTCONTENT: TEXTCONTENT TEXT   
            | TEXT              
;

TEXT: identifier            {  $$ = $1.toString(); }
        | content           {  $$ = $1.toString(); }
        | DoubleLiteral     { $$ = $1.toString(); }
        | IntegerLiteral    {  $$ = $1.toString(); }
        | xml               {  $$ = $1.toString(); }
        | apos              {  $$ = $1.toString(); }
        | less              { $$ = "<";}
        | greater           { $$ = ">";}
        | ampersand         {  $$ = "&"; }
        | apostrophe        { $$ = "'";}
        | quot              { $$ = "\""; }
        | error             { $$ = $1.toString();}
;
```