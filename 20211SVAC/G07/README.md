# Organización de Lenguajes y Compiladores 2

## Vacaciones de Junio 2021

Repositorio del Grupo NO.7 del curso de organizacion de lenguajes y compiladores 2

## Requisitos Previos

Los requerimientos previos necesarios para poder compilar nuestro programa es unicamente ingresar al link de nuestra pagina en GitHubPages y ingresar las entradas correspondientes que se mostraran de ejemplo a continuacion.

#### Paso 1: Ingresar al link de nuestra pagina

A continuacion mostramos el link de nuestro repo:

[Link de Visualizacion de pagina](https://tytusdb.github.io/tytusx/20211SVAC/G07/FRONTEND/index.html)

#### Paso 2: Analisis XML
Intenta copiar esta entrada y colocarla en el bloque de texto de XML:

``` sh 
<!-------Your comment----->
<?xml version="1.0" encoding="UTF-8"?>
<!-------Your comment----->
<libros>
<equipo>
<!-------Your comment----->
 <defensas>
  son muuchos &lt;
  <jugador nombre="Pepito 1" />
  <jugador nombre="Pepito 2" />
 </defensas>
 <medios>
 <!-------Your comment----->
  <jugador nombre="Pepito 5" edad="22"/>
  <jugador nombre="Pepito 6" />
 </medios>
 <!-------Your comment----->
 <delantero>Cristiano Ronaldo Dos Santos Aveiro</delantero>
</equipo>
<!-------Your comment----->
<equipos>
<!-------Your comment----->
 <defensa>
  son muuchos &lt;
  <jugador nombre="Pepito 1" />
  <jugador nombre="Pepito 2" />
 </defensa>
 <medio>
 <!-------Your comment----->
  <jugador nombre="Pepito 5" edad="22"/>
  <jugador nombre="Pepito 6" />
 </medio>
 <!-------Your comment----->
 <delanteros>Cristiano Ronaldo Dos Santos Aveiro</delanteros>
</equipos>
<!-------Your comment----->
<seccion>
<!-------Your comment----->
 <padre>
  son muuchos &lt;
  <jugador nombre="Pepito 1" />
  <jugador nombre="Pepito 2" />
 </padre>
 <hijo>
 <!-------Your comment----->
  <jugador nombre="Pepito 5" edad="22"/>
  <jugador nombre="Pepito 6" />
 </hijo>
 <!-------Your comment----->
 <sobrino>Cristiano Ronaldo Dos Santos Aveiro</sobrino>
</seccion>
<!-------Your comment----->
</libros>
```

### Paso 3: Ejecucion XML

Para poder compilar esta entrada tendras dos botones uno ascendente y el otro descendente

#### Paso 3.1: Vista de arbol

Contamos con vista de arbol ascendente o bien de forma descendente

``` sh 
    Arbol de analisis sintactico AST
    Arbol sintactico CST
```
  
### Paso 4: Ejecucion XPATH

Para poder compilar esta entrada tendras dos botones uno ascendente y el otro descendente

``` sh 
/bookstore/book[1]|/bookstore/book[last()]|/bookstore/book[last()-1]|/bookstore/book[position()<3]|//title[@lang]|//title[@lang='en']|/bookstore/book[price>35.00]|/bookstore/book[price>35.00]/title
```

#### Paso 4.1: Vista de arbol

Contamos con vista de arbol ascendente o bien de forma descendente

``` sh 
    Arbol de analisis sintactico AST
    Arbol sintactico CST
```

#### Paso 5: Reporte de errores

Contamos con una tabla de reporte de errores

``` sh 
    Errores lexicos
    Errores Sintacticos
    Errores Semanticos
```

#### Paso 6: Tabla de simbolos

Contamos con una tabla de simbolos que almacena todos los items captados dentro de nuestro XML

``` sh 
    NOMBRE
    TIPO
    AMBITO
    NO. FILA
    NO. COLUMNA
    VALOR
```

#### Paso 7: Salida

 Una terminal que cuenta con el resultado de la consulta realizada en XPATH obteniendo los datos del XML
