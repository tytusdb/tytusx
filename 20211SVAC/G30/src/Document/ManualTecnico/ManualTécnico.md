# Manual Técnico
## OLC2 - Proyecto 1


### Descripción general
Para la creación del presente proyecto que tiene por finalidad crear un programa que pueda ejecutar consultas xpath por medio de un xml ingresado se utilizó React JS como medio para crear las interfaces necesarias. Para apoyo en el backend del proyecto se utilizó node js.
El proyecto cuenta con 3 módulos generales dentro de las cuales está el código originalmente escrito en typescript.

#### Components
En esta carpeta se encuentran los archivos utilizados para generar el aspecto visual del proyecto. Se encuentra un html, un css y el typescript respoectivo.
A continuación los nombres de los archivos:
- Navigation
- Gramatical
- InConsole
- SimbolosXQ
- TablaErrores

### Code
En esta carpeta se encuentran los modelos de datos generados para todos los analizadores, incluyendo los de la optimización separados en respecttivas subcarpetas como AST y CST, donde además se encuentran los archivos de funcionalidades respectivas a los reportes de cada uno de los árboles. Y a los respectivos generadores de Código en 3 direcciones.

# Gramáticas

## XML

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



