# Manual Técnico
## OLC2 - Proyecto 1


### Descripción general
Para la creación del presente proyecto que tiene por finalidad crear un programa que pueda ejecutar consultas xpath por medio de un xml ingresado se utilizó Angular como medio para crear las interfaces necesarias. Para apoyo en el backend del proyecto se utilizó node js.
El proyecto cuenta con 3 módulos generales dentro de las cuales está el código originalmente escrito en typescript.

#### Components
En esta carpeta se encuentran los archivos utilizados para generar el aspecto visual del proyecto. Se encuentra un html, un css y el typescript respoectivo.
A continuación los nombres de los archivos:
- home.component.css
- home.component.html
- home.component.spec.ts
- home.component.ts  -- en este archivo se encuentra el código general de inicialización de los analizadores, así como la configuración de los árboles, que fueron realizados con Echartsjs, librería que cuenta con licencia MIT para su óptima implementación en el proyecto.

### Models
En esta carpeta se encuentran los modelos de datos generados para ambos analizadores, separados en respecttivas subcarpetas como AST y CST, donde además se encuentran los archivos de funcionalidades respectivas a los reportes de cada uno de los árboles.
Los archivos encontrados en esta carpeta incluyen: 
- Estructuras de datos de nodos AST y CST en archivos homónimos al nodo que representan.
- paquete.model.ts -- archivo donde se encuenrtra la clase paquete, que regresa el archivo jison después de ejecutar el análisis.
- excepción.ts -- clase que representa los errores encontrados en el análisis
- token.ts -- clase que representa los tokens encontrados en el análisis


### Utils
En esta carpeta se encuentran los analizadores ascendentes generados por medio de la biblioteca Jison, además de el archivo js generado por el archivo jison.  
Los analizadores se dividen en dos carpetas
- XML -- acá se encuentra el analizador ascendente XML así como el código js generado al ejecutar el código respectivo
- XPath -- acá se encuentra el analizador ascendente XPATH así como el código js generado al ejecutar el código respectivo


# Gramáticas

## XML
## Xpath

Init -> instrucciones EOF

instrucciones ->instrucciones primero
&nbsp;&nbsp;&nbsp;&nbsp;->primero

primero ->'//'  segundo
&nbsp;&nbsp;&nbsp;&nbsp;->'/' segundo
&nbsp;&nbsp;&nbsp;&nbsp;->'.' Barritas
&nbsp;&nbsp;&nbsp;&nbsp;->'..' Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->sinBarritas

sinBarritas ->'ID' Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'ID'
&nbsp;&nbsp;&nbsp;&nbsp;->'ID' specs 
&nbsp;&nbsp;&nbsp;&nbsp;->'ID' specs Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->Axes Barritas 

Barritas -> '//'  segundo
&nbsp;&nbsp;&nbsp;&nbsp;->'/' segundo 
&nbsp;&nbsp;&nbsp;&nbsp;->'|' primero   
&nbsp;&nbsp;&nbsp;&nbsp;-> EOF

segundo -> 'ID' specs Barritas
&nbsp;&nbsp;&nbsp;&nbsp;-> '*' specs Barritas
&nbsp;&nbsp;&nbsp;&nbsp;->'*' Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'ID' Barritas
&nbsp;&nbsp;&nbsp;&nbsp;->'@' 'ID' specs 
&nbsp;&nbsp;&nbsp;&nbsp;->'@' '*' specs
&nbsp;&nbsp;&nbsp;&nbsp;->'@' 'ID' 
&nbsp;&nbsp;&nbsp;&nbsp;->'@' '*' 
&nbsp;&nbsp;&nbsp;&nbsp;->Axes Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'.' specs Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'.' Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'..' specs Barritas
&nbsp;&nbsp;&nbsp;&nbsp;->'..' Barritas 
&nbsp;&nbsp;&nbsp;&nbsp;->'text''('')' 
&nbsp;&nbsp;&nbsp;&nbsp;->'node''('')'

specs -> '[' expr ']'

expr -> '(' expr ')'
&nbsp;&nbsp;&nbsp;&nbsp;-> expr '+' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '-' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '*' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr 'div' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '=' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '<' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '>' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '<=' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr '>=' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr 'or' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr 'and' expr
&nbsp;&nbsp;&nbsp;&nbsp;->expr 'mod' expr
&nbsp;&nbsp;&nbsp;&nbsp;->ident

ident -> 'text''('')' 
&nbsp;&nbsp;&nbsp;&nbsp;->'node''('')'
&nbsp;&nbsp;&nbsp;&nbsp;->'position''('')'
&nbsp;&nbsp;&nbsp;&nbsp;->'last''('')' 
&nbsp;&nbsp;&nbsp;&nbsp;->'@''ID'  
&nbsp;&nbsp;&nbsp;&nbsp;->'@''*' 
&nbsp;&nbsp;&nbsp;&nbsp;->'ID'
&nbsp;&nbsp;&nbsp;&nbsp;->'NUMBER'
&nbsp;&nbsp;&nbsp;&nbsp;->'cadena' 
&nbsp;&nbsp;&nbsp;&nbsp;->Axes

Axes -> nombre '::' predicado  
&nbsp;&nbsp;&nbsp;&nbsp;->nombre '::' predicado specs

nombre -> 'ancestor'
&nbsp;&nbsp;&nbsp;&nbsp;->'ancestor-or-self'
&nbsp;&nbsp;&nbsp;&nbsp;->'attribute'
&nbsp;&nbsp;&nbsp;&nbsp;->'child'
&nbsp;&nbsp;&nbsp;&nbsp;->'descendant' 
&nbsp;&nbsp;&nbsp;&nbsp;->'descendant-or-self'
&nbsp;&nbsp;&nbsp;&nbsp;->'following'
&nbsp;&nbsp;&nbsp;&nbsp;->'following-sibling'
&nbsp;&nbsp;&nbsp;&nbsp;->'namespace'
&nbsp;&nbsp;&nbsp;&nbsp;->'parent'
&nbsp;&nbsp;&nbsp;&nbsp;->'preceding' 
&nbsp;&nbsp;&nbsp;&nbsp;->'preceding-sibling'
&nbsp;&nbsp;&nbsp;&nbsp;->'self'

predicado -> '*'
&nbsp;&nbsp;&nbsp;&nbsp;->'ID'
&nbsp;&nbsp;&nbsp;&nbsp;->'text''('')'
&nbsp;&nbsp;&nbsp;&nbsp;->'node''('')'
&nbsp;&nbsp;&nbsp;&nbsp;->'position''('')'
&nbsp;&nbsp;&nbsp;&nbsp;->'last''('')' 





