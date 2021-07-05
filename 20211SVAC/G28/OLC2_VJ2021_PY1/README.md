# Manual De Usuario

Manual de instrucciones tecnicas internas del proyecto TytusX.

## Interfaz

Para iniciar el proyecto se desplegara la pagina con la siguiente interfaz.

![Front](./manuales/1.png)

## Opciones
### Uso Basico

Antes de Realizar cada accion se recomienda seleccionar la pestaña en la cual se quiere actuar, activandola de esta manera:

![Front](./manuales/2.png)

### Menu

Dentro de menu apreciamos el boton Guardar (Actualmente desactivado) para poder hacer una copia del archivo dentro del panel que estemos seleccionando.

![Front](./manuales/3.png)

### Analizar Ascendente y Analizar Descendente

Estos botones serviran para poder activar el analizador, dando 2 opciones al momento de realizar la funcion, ya sea de manera asecendente o descendente (siemmpre dentro de la pestaña seleccionada).

![Front](./manuales/4.png)

### TS XML

Este boton contiene la tabla de simbolos dependiendo de la gramatica usada, ya se ascendente o descendente, mediante el analisis especificamente del lenguaje XML.

![Front](./manuales/5.png)

Seguido de esto se realizara la descarga de la tabla en formato html:

![Front](./manuales/6.png)

De la Siguiente forma:

![Front](./manuales/7.png)

### Reporte Gramatical

Este boton genera reportes lexicos y sintacticos de acuerdo al analisis realizado especificamente del lenguaje XML.

# Manual Tecnico

## Installation

Descarga de la carpeta de desarrollo y seguido de esto se ocupa el comando:

```bash
npm install
```

Para instalacion de todos los componentes.

## Uso

Para iniciar el proyecto se ocupa el comando:

```bash
npm start
```

## Carpetas

Dentro de nuestro proyecto tendremos la Carpeta SRC en la cual estara alojado el codigo fuente base para la edicion del proyecto, compuesto por:

![Back](./manuales/t1.png)

- Carpeta AST: Gestion de generacion de arbol AST.
- Carpeta Expresiones: Gestion de estructuras base para analisis tanto XML como XPATH, para guardar datos en objetos.
- Carpeta GramaticaXML: Gramaticas Ascendente y Descendente de XML en formato JISON y format JS generado por la herramienta JISON.
- Carpeta GramaticaXPATH: Gramaticas Ascendente y Descendente de XPATH en formato JISON y format JS generado por la herramienta JISON.
- Carpeta Interfaces: Generacion base de las estructuras.

## Archivos

Los Archivos en ejecucion del codigo tanto front como el uso de las interfaces y las gramaticas: 

![Back](./manuales/t2.png)

Archivo App.tsx , El cual esta compuesto por:

![Back](./manuales/t3.png)

Imports Generales:

- Herramienta CodeMirror (para las pestañas)
- analizador (archivo de scripts2 para realizar analisis XML) por medio del metodo "ejecutarCodigo"

![Back](./manuales/t4.png)

- XPATHScann (archivo de scriptOath para analisis XPATH) por medio del metodo "ejecutarCodigo"

![Back](./manuales/t5.png)

- reporteTSXML para generacion de reportes XML , haciendo uso de las gramaticas realizadas en JISON

![Back](./manuales/t6.png)


## Gramaticas

- Ascedente XML

![Back](./manuales/t7.png)

- Descendente XML

![Back](./manuales/t8.png)

- Ascedente XPATH

![Back](./manuales/t9.png)

- Descendente XPATH

![Back](./manuales/t10.png)

## Data interna
- Grupo Numero 28 

## License
[MIT](https://choosealicense.com/licenses/mit/)