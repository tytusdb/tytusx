# TytusX Grupo 34

_TytusX es un administrador de bases de datos documental de código abierto desarrollado bajo licencia MIT que utilizará lenguaje JavaScript para su construcción. Soportará archivos XML y manejará los lenguajes de consultas XPath y XQuery._

## Manual Técnico

_Se desarrollo un interprete que como entrada debe recibir un archivo XML, el cual será utilizado para la captura da datos. Puede recibir un archivo XPATH el cual nos servirá para filtrar los datos realizando diferentes tipos de consultas._


Utilizamos **Jison** para genera los analizadores, tanto el analizador léxico como el analizador sintáctico. Jison toma una gramática libre de contexto como entrada y produce código JavaScript capaz de parsear el lenguaje descrito por dicha gramática. 


### Pre-requisitos 📋

_Para la implementación del proyecto es necesario tener instaldo:_
* Javascript
```
sudo apt install nodejs
sudo apt install npm
```
* Typescript
```
npm install -g typescript
```
* Jison
```
npm install jison -g
```


### Flujo del proyecto
![image](https://user-images.githubusercontent.com/70385432/122160755-b7f3f200-ce2d-11eb-8d2a-4f1a8bd60b52.png)


### Clases Principales
## Instrucción
![image](https://user-images.githubusercontent.com/70385432/122163505-8df0fe80-ce32-11eb-8031-bcdb895e5ab5.png)

## Expresión
![image](https://user-images.githubusercontent.com/70385432/122163712-d90b1180-ce32-11eb-8680-2147f2541473.png)

## Tabla de Simbolos
![image](https://user-images.githubusercontent.com/70385432/122163950-343d0400-ce33-11eb-9a8c-afbf940c589c.png)


### Documentacion de utilidad

* **Xpath** (https://www.w3schools.com/xml/xpath_operators.asp)
* **XML** (https://www.w3schools.com/xml/xml_examples.asp)

## Construido con 

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Jison](https://zaa.ch/jison/docs/) - Heramienta utilizada para crear analizador
* [CodeMirror](https://codemirror.net/) - Editor de Texto

## Autores

* **Brayan Mauricio Aroche Boror** - *201503918* - [Brayan Aroche](https://github.com/201503918)
* **Luis Enrique Culpatan Lopez** - *201503964* - [Luis Culpatan](https://github.com/201503964)
* **Mitchel Andrea Cano Marroquín** - *201318570* - [Mitchel Cano](https://github.com/ma-cm)

## Licencia

Open Source Native XML Database with Query Languages XPath and XQuery in JavaScript




---
