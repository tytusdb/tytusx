![image](https://github.com/201503600/OLC2-Proyecto1/blob/main/Documentacion/Imagenes/ECYS.png?raw=true)

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

## Interfaz de enlace Backend y FrontEnd
### IndexAnalizador
Clase que maneja todos los metodos que ejecutan los analisis de los lenguajes, obtiene datos del backend para procesarlos y enviarlos
al frontEnd.

```
indexAnalizador.ts
        Propiedades
        private static _instance: Analizador -> instancia unica que se maneja en patron singleton.
        global:Entorno -> Almacena el entorno global que contiene todo lo generado por el analisis.
        indice:number -> Variable para el manejo de ciclos, utilizado en reportes.
```

# Interfaces
## AST
### Entorno
Almacena la informacion principal del entorno que reconoce la gramatica.
```
Entorno.ts
        nombre:string -> Almacena el nombre del entorno.
        padre:any -> Almacena referencia al Entorno padre, para entorno global se encuentra null.
        global:any -> Almacena el entorno global para todos los entornos.
        tsimbolos:Array<any> -> Almacena un arreglo de simbolos encontrados en este entorno.
```

### Simbolo
Clase que contiene la informacion para cada simbolo encontrado.
```
Simbolo.ts
        tipo:Tipo -> Tipo del simbolo (refencia a clase Tipo).
        nombre:string -> Contiene el nombre del simbolo, el cual es el reconocido en la gramatica.
        valor:any -> Contiene el valor del simbolo, puede ser cualquier tipo, desde entorno hasta texto.
        linea:number -> Indica el numero de linea en el cual se reconocio el simbolo.
        columna:number -> Indica el numero de columna en el que incia el simbolo en la cadena ingresada.
```

### Tipo
Clasificacion de tipos encontrados en el lenguaje.
```
Tipo.ts
        STRING,
        ETIQUETA,
        ATRIBUTO,
        ETIQUETA_UNIQUE
```

## Expresiones
### Operacion
Clase que maneja toda la lógica para las operaciones que ejecuta XPATH.
```
Operacion.ts
        Propiedades
        linea: number;
        columna: number;
        op_izq: Expresion;
        op_der: Expresion;
        operacion: TipoOperacion;
        tipo: TipoPrim | undefined | null;

        Funciones
        getTipo(Entorno)
        getValor(Entorno)
        getStringTipo(TipoPrim) retorna un *string*
        tipoDominanteAritmetica(TipoPrim, TipoPrim) retorna un *TipoPrim* ó *null*
        tipoDominanteOperacion(TipoPrim, TipoPrim) retorna un *TipoPrim* ó *null*
        TipoOperacion
```
### Primitiva
Clase que maneja la logica de operaciones primitivas que se ejecutan desde XPATH.
```
Primitiva.ts
        Propiedades
        linea: number;
        columna: number;
        valor: any;
        tipo: TipoPrim;

        Funciones
        getTipo(Entorno)
        getValor(Entorno)
```

## Global
### Error
Clase que maneja las propiedades de los errores encontrados durante el analisis.
```
Primitiva.ts
        Propiedades
        private tipoError: string;
        private descripcion:string;
        private linea: number;
        private columna: number;

        Funciones
        getTipo() retorna *string*
        getDescripcion() retorna *string*
        getColumna() retorna *number*
        getLinea() retorna *number*
```

### ListaError
Clase que maneja una lista de los errores encontrados durante el analisis.
```
Primitiva.ts
        Propiedades
        private static _instance: ListaError -> instancia de la clase, manejada en patron singleton.
        listaError: Array<mierror> -> Arreglo de errores almacenados.

        Funciones
        getTipo() retorna *string*
        getDescripcion() retorna *string*
        getColumna() retorna *number*
        getLinea() retorna *number*
```

# Gramatica

## Analisis Lexico
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
```

## Analisis Sintactico

### Gramatica Ascendente XML
```
//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : ENCABEZADO EOF             
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

TEXT: identifier            
        | content           
        | DoubleLiteral     
        | IntegerLiteral    
        | xml               
        | apos              
        | less              
        | greater           
        | ampersand         
        | apostrophe        
        | quot              
        | error             
;
```

### Gramatica Descendente XML
```
//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : ENCABEZADO EOF         
    ;

ENCABEZADO: lt interrog xml LISTAATRIBUTOS interrog gt LISTAELEMENTOS       
            | error LISTAELEMENTOS       
;

LISTAELEMENTOS: ELEMENTO LISTAELEMENTOS 
                |  
;

ELEMENTO: lt ELEM 
;

ELEM:   identifier LISTAATRIBUTOS TIPOELEM    
;


LISTAATRIBUTOS:
        ATRIBUTO LISTAATRIBUTOS         
        |                               
;

ATRIBUTO:   
        identifier asig TIPOCADENA 
        | error gt
        | error lt       
;

TIPOCADENA:     
        cadena          
        | cadena2      
;

TIPOELEM: 
        diag gt                               
        | gt TEXTCONTENT lt MOREELEMENTS      
        | diag error gt
        ;

MOREELEMENTS:
        diag identifier gt      
        | ELEM lt MOREELEMENTS         
;

TEXTCONTENT:    TEXT TEXTCONTENT 
                |                
;

TEXT:   identifier          
        | content           
        | DoubleLiteral     
        | IntegerLiteral    
        | xml               
        | apos              
        | less              
        | greater           
        | ampersand         
        | apostrophe        
        | quot              
        | error                           
;
```

## Analisis Lexico XPATH
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
content                         [^<]
%s                                  comment
%%

\s+                                 /* skip whitespace */

"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'igual';
"/"                         return 'diag';
"."                         return "dot";
"@"                         return "attr";
"["                         return "corA";
"]"                         return "corC";
"|"                         return "andSelect";
"::"                        return "dospuntos";
"("                         return "parA";
")"                         return "parC";

//OPERADORES
"*"                         return 'asterisco';
"+"                         return "mas";
"-"                         return "menos";
"div"                       return "div";
"<="                        return 'lte';
">="                        return "gte";
"!="                        return "nequal";
"or"                        return "or";
"and"                       return "and";
"mod"                       return "mod";

/* PALABRAS RESERVADAS */
"ancestor-or-self"              return "ancestorSelf";
"ancestor"                      return "ancestor";
"attribute"                     return "attribute";
"child"                         return "child";
"descendant-or-self"            return "descendantSelf";
"descendant"                    return "descendant";
"following-sibling"             return "followingSib";
"following"                     return "following";
"namespace"                     return "namespace";
"parent"                        return "parent";
"preceding-sibling"             return "precedSib";
"preceding"                     return "preced";
"self"                          return "self";

// FUNCIONES NATIVAS
"last()"                        return "lastFunc";
"position()"                    return "positionFunc";
"node()"                        return "nodeFunc";
"text()"                        return "textFunc";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*            return 'identifier';

{stringliteral}                     return 'cadena';
{charliteral}                       return 'cadena2';

//error lexico
.                                   {
                                        console.log(errores.default);
                                        errores.default.agregarError('lexico', 'Simbolo inesperado ' + yytext, yylloc.first_line, yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'
```

## Analisis Sintactico XPATH

### Gramatica Ascendente XPATH
```
START : LISTACONSULTAS EOF         
    ;

LISTACONSULTAS: LISTACONSULTAS andSelect CONSULTA 
        |  CONSULTA    
;

CONSULTA: identifier 
        | identifier LISTANODOS 
        | MASTIPOS LISTANODOS
        | LISTANODOS 
        | MASTIPOS 
;

LISTANODOS:  LISTANODOS NODO
        | NODO
;

NODO: diag TIPONODO 
    | diag diag TIPONODO 
    | diag error 
    | diag diag error
;

TIPONODO: identifier 
        | identifier corA EXPRESION corC 
        | MASTIPOS 
        |  AXES    

;
MASTIPOS: attr identifier PREDICATE 
    | attr asterisco PREDICATE
    | dot PREDICATE
    | dot dot PREDICATE 
    | asterisco PREDICATE 
    | FUNCIONES 
;

AXES:    ancestor dospuntos NODETEST 
        |     ancestorSelf dospuntos NODETEST
        |     attribute dospuntos NODETEST
        |     child dospuntos NODETEST 
        |     descendant dospuntos NODETEST 
        |     descendantSelf dospuntos NODETEST 
        |     following dospuntos NODETEST
        |     followingSib dospuntos NODETEST
        |     namespace dospuntos NODETEST 
        |     parent dospuntos NODETEST 
        |     preced dospuntos NODETEST 
        |     precedSib dospuntos NODETEST
        |     self dospuntos NODETEST 
;

PREDICATE: corA EXPRESION corC 
        |                      
;

NODETEST: identifier PREDICATE
        |  textFunc PREDICATE  
        | nodeFunc PREDICATE 
        | asterisco PREDICATE
        ;

LISTAEXPRESIONES: LISTAEXPRESIONES EXPRESION
                    | EXPRESION 
                    ;

EXPRESION:  PRIMITIVA 
            | Operacion 
;

Operacion: EXPRESION asterisco EXPRESION
        | EXPRESION mas EXPRESION 
        | EXPRESION menos EXPRESION 
        | EXPRESION div EXPRESION 
        | EXPRESION lte EXPRESION 
        | EXPRESION lt EXPRESION
        | EXPRESION gte EXPRESION
        | EXPRESION gt EXPRESION
        | EXPRESION igual EXPRESION
        | EXPRESION nequal EXPRESION 
        | EXPRESION or EXPRESION
        | EXPRESION and EXPRESION
        | EXPRESION mod EXPRESION                               
        | parA EXPRESION parC 
;

PRIMITIVA: DoubleLiteral 
        | IntegerLiteral 
        | cadena
        | cadena2
        | identifier 
        | attr identifier
        | attr asterisco 
        | dot
        | FUNCIONES
    ;

FUNCIONES: 
        lastFunc
        | positionFunc
        | nodeFunc
        | textFunc
;
```
