
### UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
### FACULTAD DE INGENIERIA
### ORGANIZACIÓN DE LENGUAJES Y COMPILADORES 2
### ESCUELA DE VACIONES JUNIO 2021
---
# MANUAL TÉCNICO
---
## INDICE
1. Introducción
2. Objetivos
3. Alcances del proyecto
4. Requerimientos
5. Justificación de la gramática
6. Diagramas
7. Estructura
8. Requerimientos tecnicos
9. Librerias Utilizadas
10. Gramatica
11. Analisis Sintactico
12. Glosario
---
## INTRODUCCIÓN
El presente documento detalla una los elementos basicos de TytusX DBMS, el cual fue desarrollado por alumnos del gurpo 33 del curso de compiladores 2. Documentado de la mejor manera posible
---
## OBJETIVOS
### GENERAL
* Desarrollar una aplicación robusta y completa, que sea capaz de gestionar adecuadamente el control de los datos a un nivel funcional.
## ESPECIFICOS
* El entorno gráfico de la aplicación debe de ser una interfaz amigable con el usuario, permitiendole una manipulación de datos sin complicaciones.
* A través de XPath, permitir un acceso rápido e integro a los datos del XML.
---
## ALCANCE DEL PROYECTO
* El proyecto desarrollado por los alumnos del curso de Organización de Lenguajes y Compiladores 2, tiene como alcance el desarrollar una aplicación que pueda cumplicar con la función de un DBMS, que tiene como base la información recolectada de un archivo XML.
El cual intervenga a favor del usuario final, permitiendo dirigir y ordenar la forma en que la base de datos organiza la información. Al mismo tiempo que gestiona cada una de las fuentes para que el usuario pueda acceder a los datos automatizadamente, sin tener que buscar manualmente exactamente en qué parte del sistema se encuentra el dato específico que necesita. Tendrá la seguridad de que estará en el lugar que le corresponde.
---

## REQUERIMIENTOS
* Debe de ser desarrollado con apoyo de la herramienta .jison
* Debe ser capaz de ejecutar las instruciones Xpath correspondientes a la busqueda de información en el XML.
* Debe ser capaz de llevar un control adecuado de los tipos de datos.
* Debe ser capaza de obtener información a traves de consultas Xpath.
* Tener un control y manejo adecuado de los archivos en los que se almacenaran los datos.
* Reportar adecuadamente los errores encontrados en las sentencias XML y XPath ingresadas.

## Justificación de la gramática implementada
Para el proyecto, se opto por implementar una gramatica descendente. Las gramaticas descendente, son autómatas a pila deterministas que reconocen las frases de un lenguaje por la estrategia de vaciado de pila. Por lo que la pila es de gran ayuda al momento de implementarla. Tomando en consideración el manejo de la pila, decimos implementas este tipo de gramatica. De igual forma tomando en consideración lo siguiente:
* Fácil de entender e interpretar
* Gramática explícitamente representada
* Cada función representa un no terminal
* Adecuado para gramáticas sencillas

## Diagramas

![alt text](https://github.com/JoseTg1904/OLC2_Proyecto/blob/main/src/assets/patron.png "PatronD")


## ESTRUCTURA
### Archivo gramatica.jison
* En este archivo se encuentra definido lo que es la gramatica a implementar para el proyecto


## REQUERIMIENTOS TECNICOS
```python
* ***jison
* ***node 12.14.0
* ***angular
* ***Sistema Operativo:*** Windows 10, Linux, Mac
* ***Capacidad RAM:*** 2GB 
```
## LIBRERIAS UTILIZADAS
```python
* 
```
## GRAMATICA
Palabras reservadas:

```python
keywords = {
"&lt;"                      return 'lesst'
"&gt;"                      return 'greatert'
"&amp;"                     return 'ampersand'
"&apos;"                    return 'apostro'
"&quot;"                    return 'quotation'

"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"=="                        return 'equal';
"!="                        return 'nequal';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"?"                         return 'interC';

";"                         return 'semicolon';
","                         return 'coma';
"."                         return 'period';
// "'"                         return 'apost';

"("                         return 'lparen';
")"                         return 'rparen';
"{"                         return 'lcurly';
"}"                         return 'rcurly';
"["                         return 'lbracket';
"]"                         return 'rbracket';
}
```

Tokens:
```python
#Definicion de ER
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

#ER ACEPTADOS
/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

/* Identifier literals */
[a-zA-Z_áÁéÉíÍóÓ][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';
```
## ANALISIS SINTACTICO
```python
# Asociación de operadores y precedencia
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'


#Se define una producción para analizar una parte de la gramatica,
#colocamos el no terminal en mayusculas, seguido de dos puntos y el valor de la producción.

#Ejemplo

/* Definición de la gramática */
START : 
        ENCODING RAICES EOF         {   
                                        reportBNF.push('&lt;START&gt; ::= &lt;RAICES&gt; EOF');
                                        reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
                                        $$ = $2;
                                        return new SalidaGramatica($$, reportBNF, reportBNF2,$1);
                                    }
    ;

ENCODING: 
        lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt      {   $$ = $9; }
    |   error gt                                                                            {}
    ;

```



## GLOSARIO
1. COMPILADOR: Es un Software que traduce un programa escrito en un lenguaje de programación de alto nivel (C / C ++, COBOL, etc.) en lenguaje de máquina. Un compilador generalmente genera lenguaje ensamblador primero y luego traduce el lenguaje ensamblador al lenguaje máquina.
2. ANALIZADOR: es un programa informático que analiza una cadena de símbolos de acuerdo a las reglas de una gramática formal. 
3. XML: es el acrónimo de Extensible Markup Language, es decir, es un lenguaje de marcado que define un conjunto de reglas para la codificación de documentos.
4. PATRO DE DISEÑO:  son técnicas para resolver problemas comunes en el desarrollo de software y otros ámbitos referentes al diseño de interacción o interfaces.
5. XPATH: es un lenguaje que permite construir expresiones que recorren y procesan un documento XML.
6. GRAMATICA:Es una forma de describir un lenguaje formal. La gramática permite generar cadenas a partir de un simbolo inicial y aplicando reglas que indican como ciertas combinaciones de símbolos pueden ser reemplazadas usando otras combinaciones de símbolos
7. FUNCION: En programación, una función es una sección de un programa que calcula un valor de manera independiente al resto del programa. los parámetros, que son los valores que recibe la función como entrada; ... el código de la función, que son las operaciones que hace la función; y.
8. NODO:De forma muy general, un nodo es un punto de intersección, conexión o unión de varios elementos que confluyen en el mismo lugar. En estructuras de datos dinámicas un nodo es un registro que contiene un dato de interés y al menos un puntero para referenciar (apuntar) a otro nodo.
9. DBMS:Un sistema manejador de bases de datos (SGBD, por sus siglas en inglés) o DataBase Management System (DBMS) es una colección de software muy específico, orientado al manejo de base de datos, cuya función es servir de interfaz entre la base de datos, el usuario y las distintas aplicaciones utilizadas.
10. AST: es una representación de árbol de la estructura sintáctica simplificada del código fuente escrito en cierto lenguaje de programación.
11. INTERFAZ: Se conoce como la interfaz de usuario al medio que permite a una persona comunicarse con una máquina.
12. LICENCIA MIT: Esta licencia es una Licencia de software libre permisiva lo que significa que impone muy pocas limitaciones en la reutilización y por tanto posee una excelente Compatibilidad de licencia. La licencia MIT permite reutilizar software dentro de Software propietario.