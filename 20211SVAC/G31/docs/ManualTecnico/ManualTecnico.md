# Manual Técnico TytusX - Grupo 31 

## **Integrantes**
- Aracely Jacqueline Méndez González     201800491 
- Stefany Samantha Abigail Coromac Huezo 201801182

## **Contenido**
- [Descripción General](#idDescripcion)
- [Framework](#idFramework)
- [Ejecucion](#idEjecucion)
- [Dependencias](#idDependencias)
  - [Angular Material](#angularMaterial)
  - [CodeMirror](#codeMirror)
  - [ECharts](#eCharts)
  - [Jison](#jison)
  - [Angular-cli-ghpages](#ghpages)
- [Despliegue de Proyecto](#idDeploy)
- [Gramática Ascendete XML](#idAscXML)
- [Gramática Descendente XML](#idDescXML)
- [Gramática Ascendente XPATH](#idAscXPATH)
- [Gramática Descedente XPATH](#idDescXPATH)

## Descripción General <a name="idDescripcion"></a>

Tytus X es un administrador de bases de datos documental de codigo abierto. Soporta archivos de tipo XML y maneja los lenguajes de consultas de XPath y XQuery.  

## Framework <a name="idFramework"></a>

Este proyecto se genero con [Angular Cli](https://github.com/angular/angular-cli) versión 11.2.11

## Ejecución <a name="idEjecucion"></a>

Es necesario instalar las dependencias utilizadas luego de ser descargado el proyecto, ejecutando el siguiente comando en la terminal
```
npm install
```

Para ejecutar el proyecto se debe ejecutar el siguiente comando
```
ng serve --open 
```
## Dependecias <a name="idDependencias"></a>

Dependencias utilizadas para la creación del proyecto TytusX-G31. 

### Angular Material<a name="angularMaterial"></a>
Módulo de diseño material para componentes de angular, el cual se instaló a través del siguiente comando
```
ng add @angular/material
```


### CodeMirror<a name="codeMirror"></a>
Módulo de diseño el cual permite agregar un editor de texto o código, el cual se instaló a través del siguiente comando

```
npm install @ctrl/ngx-codemirror codemirror
```

Luego de la instalación se agregó las siguiente sección **_allowedCommonJsDependencies_** en el archivo [**_angular.json_**](./angular.json)

```json
...,
"allowedCommonJsDependencies": [
  "@ctrl/ngx-codemirror"
],
...
```

### ECharts<a name="eCharts"></a>
Módulo de diseño el cual permite agregar gráficas, el cual permitió crear los arboles de AST y CST, se instaló a través de los siguientes comandos
```
npm install echarts
npm install ngx-echarts
```
Luego de la instalación se agregaron las siguientes líneas en las áreas de **_scripts_** en el archivo [**_angular.json_**](./angular.json)
```json
...,
"scripts": [
  ...,
  "node_modules/echarts/dist/echarts.min.js"
],
...
```

### Jison<a name="jison"></a>
Módulo el cual permite crear el parser para la lectura de los archivos XML y consultas XPATH, para esto se necesitó instalar de manera global en el equipo
```
npm install -g jison 
```

Para compilar la gramática es necesario abrir la terminal donde se encuentre el archivo con extensión **_.jison_** y ejecutar el siguiente comando
```
jison nombre.jison
```

Para poder utilizar nuestra gramática es necesario agregar las siguiente línea en el archivo [**_tsconfig.json_**](./tsconfig.json)
```json
...,
"compilerOptions": {
  ...,
  "noImplicitAny": false
},
...
```

El cual permite importar nuestra gramática de la siguiente manera
```ts

import { parser } from 'src/app/utils/gramaticaXML/ascendente.js';

import { parser } from 'src/app/utils/gramaticaXML/descendente.js';

import { parser } from 'src/app/utils/gramatica-xpath/ascendente.js';

import { parser } from 'src/app/utils/gramatica-xpath/descendente.js';

```

### Angular-cli-ghpages<a name="ghpages"></a>

Módulo el cual permite desplegar el proyecto en github pages, para esto se necesitó instalar de manera global en el equipo
```
ng add angular-cli-ghpages
```


## Despliegue del Proyecto <a name="idDeploy"></a>

Para realizar el despliegue en github pages es solo se debe ejecutar el siguiente comando
```
ng deploy --base-href "https://USERNAME.github.io/REPOSITORY_NAME/"

ng deploy --base-href "https://tytusdb.github.io/tytusx/20211SVAC/G31/"

```

## Gramática Ascendente XML <a name="idAscXML"></a>

```bash

<INICIO> ::= <CONFIG> <OBJETOS_GLOBALES> EOF 
| EOF 

<CONFIG> ::= '<' '?' 'xml' 'version' '=' 'cadena' 'encoding' '=' 'cadena' '?' '>'

<OBJETOS_GLOBALES> ::= <OBJETOS_GLOBALES> <OBJETO>
| <OBJETO>

<OBJETO> ::= '<' 'id' '>' <OBJETOS> '<' '/' 'id' '>'
| '<' 'id' <ATRIBUTOS> '>' <OBJETOS> '<' '/' 'id' '>'
| '<' 'id' '>' <TEXTO> '<' '/' 'id' '>'
| '<' 'id' <ATRIBUTOS> '>' <TEXTO> '<' '/' 'id' '>' 
| '<' 'id' '>' <TEXTO>  'id' '>'
| '<' 'id' <ATRIBUTOS> '>' <TEXTO>  'id' '>' 
| '<' 'id' <ATRIBUTOS> '>'  '<' '/' 'id' '>' 
| '<' 'id' <ATRIBUTOS> '/' '>'

<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>
| <ATRIBUTO>

<ATRIBUTO> ::= 'id' '=' 'cadena'

<TEXTO> ::= <TEXTO> <CONTENIDO>
| <CONTENIDO>

<CONTENIDO> ::= 'dentro'
| 'id'
| 'decimal'
| 'digito'

``` 
## Gramática Descendente XML <a name="idDescXML"></a>

```bash

<INICIO> ::= <CONFIG> <OBJETOS_GLOBALES> EOF 
| EOF 

<CONFIG> ::= '<' '?' 'xml' 'version' '=' 'cadena' 'encoding' '=' 'cadena' '?' '>'

<OBJETOS_GLOBALES> ::= <OBJETO> <OBJETOS_GLOBALES>
| 

<OBJETOS> ::= <OBJETO> <OBJETOS>
| 

<OBJETO> ::= <INICIO_ETIQUETA> <DENTRO_OBJETO>

<DENTRO_OBJETO> ::= <OBJETOS> <FIN_ETIQUETA1>
| <TEXTO> <FIN_ETIQUETA2> 
| 'id' <FIN_ETIQUETA1>
| 'decimal' <FIN_ETIQUETA1>
| 'digito' <FIN_ETIQUETA1>

<INICIO_ETIQUETA> ::= '<' 'id' <ATRIBUTOS> '>' 

<FIN_ETIQUETA1> ::= '<' '/' 'id' '>'

<FIN_ETIQUETA2> ::= 'id' '>'

<ATRIBUTOS> ::= <ATRIBUTO> <ATRIBUTOS>
| 

<ATRIBUTO> ::= 'id' '=' 'cadena'

<TEXTO>: 'dentro'

```

## Gramática Ascendente XPATH <a name="idAscXPATH"></a>

```bash

<RAIZ> ::= <QUERIES> EOF  
    | EOF           
    

<QUERIES> ::= <QUERIES> '|' <QUERY>   
        | <QUERY>              
        

<QUERY> ::= '/'                   
      | '/' <PATH_EXPR>         
      | '//' <PATH_EXPR>        
      | <PATH_EXPR>             
      

<PATH_EXPR> ::= <PATH_EXPR> '/' <STEP_EXPR>   
          | <PATH_EXPR> '//' <STEP_EXPR>  
          | <STEP_EXPR>                 
          

<STEP_EXPR> ::= <POST_FIX_EXPR>  
          | <AXIS_STEP>       
          

<AXIS_STEP> ::= <REVERSE_STEP>                    
          | <REVERSE_STEP> <PREDICATE_LIST>     
          | <FORWARD_STEP>                    
          | <FORWARD_STEP> <PREDICATE_LIST>     
          

<FORWARD_STEP> ::= 'attribute' '::' <NODE_TEST>             
             | 'child' '::' <NODE_TEST>                 
             | 'descendant' '::' <NODE_TEST>            
             | 'descendant-or-self' '::' <NODE_TEST>    
             | 'following' '::' <NODE_TEST>             
             | 'following-sibling' '::' <NODE_TEST>     
             | 'namespace' '::' <NODE_TEST>             
             | 'self' '::' <NODE_TEST>                  
             | '@' <NODE_TEST>                          
             | <NODE_TEST>                              
             

<REVERSE_STEP> ::= 'ancestor' '::' <NODE_TEST>              
             | 'ancestor-or-self' '::' <NODE_TEST>      
             | 'parent' '::' <NODE_TEST>                
             | 'preceding' '::' <NODE_TEST>             
             | 'preceding-sibling' '::' <NODE_TEST>     
             | '..'                                   
             

<NODE_TEST> ::= <KIND_TEST>  
          | <EQNAME>      
          | '*'         
          

<POST_FIX_EXPR> ::= <PRIMARY_EXPR>                  
              | <PRIMARY_EXPR> <PREDICATE_LIST>   
              

<PREDICATE_LIST> ::= <PREDICATE_LIST> <PREDICATE>   
               | <PREDICATE>                  
               

<PREDICATE> ::= '[' <EXPR> ']'    
          

<PRIMARY_EXPR> ::= <PARENTHESIZED_EXPR>   
             | '.'                  
             | 'cadena'             
             | 'digito'             
             | 'decimal'            
             | '[' ']'             
             | '[' <QUERY_LIST> ']'   
             

<PARENTHESIZED_EXPR> ::= '(' ')'        
                   | '(' <EXPR> ')'   
                   

<QUERY_LIST> ::= <QUERY_LIST> ',' <QUERY>   
           | <QUERY>                  
           

<KIND_TEST> ::= 'text' '(' ')'  
          | 'node' '(' ')'  
          | 'last' '(' ')'  
          | 'position' '(' ')'  
          

<EQNAME> ::= 'nodename'               
       | 'ancestor-or-self'       
       | 'ancestor'               
       | 'attribute'              
       | 'child'                  
       | 'descendant-or-self'     
       | 'descendant'             
       | 'following-sibling'      
       | 'following'              
       | 'last'                   
       | 'namespace'              
       | 'node'                   
       | 'parent'                 
       | 'position'               
       | 'preceding-sibling'      
       | 'preceding'              
       | 'self'                   
       | 'text'                  
       | 'and'                    
       | 'or'                     
       | 'div'                   
       | 'mod'                    
       

<EXPR> ::= <EXPR> ',' <EXPR_SINGLE>   
     | <EXPR_SINGLE>            
     

<EXPR_SINGLE> ::= <OR_EXPR> 
            

<OR_EXPR> ::= <AND_EXPR>                  
        | <OR_EXPR> 'or' <AND_EXPR>     
        

<AND_EXPR> ::= <COMPARISON_EXPR>                         
         | <AND_EXPR> 'and' <COMPARISON_EXPR>           
         

<COMPARISON_EXPR> ::= <ADDITIVE_EXPR>                       
                | <ADDITIVE_EXPR> '<' <ADDITIVE_EXPR>     
                | <ADDITIVE_EXPR> '>' <ADDITIVE_EXPR>     
                | <ADDITIVE_EXPR> '<=' <ADDITIVE_EXPR>    
                | <ADDITIVE_EXPR> '>=' <ADDITIVE_EXPR>    
                | <ADDITIVE_EXPR> '=' <ADDITIVE_EXPR>     
                | <ADDITIVE_EXPR> '!=' <ADDITIVE_EXPR>    
                

<ADDITIVE_EXPR> ::= <MULTIPLICATIVE_EXPR>                          
              | <ADDITIVE_EXPR> '+' <MULTIPLICATIVE_EXPR>        
              | <ADDITIVE_EXPR> '-' <MULTIPLICATIVE_EXPR>         
              

<MULTIPLICATIVE_EXPR> ::= <UNARY_EXPR>                            
                    | <MULTIPLICATIVE_EXPR> '*' <UNARY_EXPR>      
                    | <MULTIPLICATIVE_EXPR> 'div' <UNARY_EXPR>    
                    

<UNARY_EXPR>  ::= <QUERY>                        
            | '-' <UNARY_EXPR> %prec UMINUS     
            | '+' <UNARY_EXPR> %prec UPLUS     
                  
```

## Gramática Descendente XPATH <a name="idDescXPATH"></a>

```bash

<RAIZ> ::= <QUERIES> EOF  
    | EOF           
    

<QUERIES> ::= <QUERY> <QUERIES_PRIMA> 
        

<QUERIES_PRIMA> ::= '|' <QUERY> <QUERIES_PRIMA> 
              |                         
              

<QUERY> ::= '/'                   
      | '/' <PATH_EXPR>         
      | '//' <PATH_EXPR>        
      | <PATH_EXPR>             
      

<PATH_EXPR> ::= <STEP_EXPR> <PATH_EXPR_PRIMA> 
          

<PATH_EXPR_PRIMA> ::= '/' <STEP_EXPR> <PATH_EXPR_PRIMA>   
                | '//' <STEP_EXPR> <PATH_EXPR_PRIMA>  
                |                                 
                

<STEP_EXPR> ::= <POST_FIX_EXPR>   
          | <AXIS_STEP>      
          

<AXIS_STEP> ::= <REVERSE_STEP>                    
          | <REVERSE_STEP> <PREDICATE_LIST>     
          | <FORWARD_STEP>                    
          | <FORWARD_STEP> <PREDICATE_LIST>     
          

<FORWARD_STEP> ::= 'attribute' '::' <NODE_TEST>            
             | 'child' '::' <NODE_TEST>                 
             | 'descendant' '::' <NODE_TEST>            
             | 'descendant-or-self' '::' <NODE_TEST>    
             | 'following' '::' <NODE_TEST>             
             | 'following-sibling' '::' <NODE_TEST>     
             | 'namespace' '::' <NODE_TEST>             
             | 'self' '::' <NODE_TEST>                  
             | '@' <NODE_TEST>                          
             | <NODE_TEST>                              
             

<REVERSE_STEP> ::= 'ancestor' '::' <NODE_TEST>              
             | 'ancestor-or-self' '::' <NODE_TEST>      
             | 'parent' '::' <NODE_TEST>                
             | 'preceding' '::' <NODE_TEST>            
             | 'preceding-sibling' '::' <NODE_TEST>     
             | '..'                                  
             

<NODE_TEST> ::= <KIND_TEST>   
          | <EQNAME>     
          | '*'        
          

<POST_FIX_EXPR> ::= <PRIMARY_EXPR>                  
              | <PRIMARY_EXPR> <PREDICATE_LIST>   
              

<PREDICATE_LIST> ::= <PREDICATE> <PREDICATE_LIST_PRIMA>
               

<PREDICATE_LIST_PRIMA> ::= <PREDICATE> <PREDICATE_LIST_PRIMA> 
                     |                                
                     

<PREDICATE> ::= '[' <EXPR> ']'    
          

<PRIMARY_EXPR> ::= <PARENTHESIZED_EXPR>   
             | '.'                  
             | 'cadena'             
             | 'digito'             
             | 'decimal'            
             | '[' ']'              
             | '[' <PARENTHESIZED_EXPR> ']'   
             

<PARENTHESIZED_EXPR> ::= '(' ')'       
                   | '(' <EXPR> ')'   
                   

<PARENTHESIZED_EXPR> ::= <QUERY> <QUERY_LIST_PRIMA> 
           

<QUERY_LIST_PRIMA> ::= ',' <QUERY> <QUERY_LIST_PRIMA> 
                 |                            

                 

<KIND_TEST> ::= 'text' '(' ')'  
          | 'node' '(' ')'  
          | 'last' '(' ')'  
          | 'position' '(' ')'  
          

<EQNAME> ::= 'nodename'               
       | 'ancestor-or-self'       
       | 'ancestor'               
       | 'attribute'              
       | 'child'                
       | 'descendant-or-self'     
       | 'descendant'            
       | 'following-sibling'      
       | 'following'             
       | 'last'                   
       | 'namespace'             
       | 'node'                   
       | 'parent'                 
       | 'position'               
       | 'preceding-sibling'      
       | 'preceding'              
       | 'self'                 
       | 'text'                  
       | 'and'                  
       | 'or'                     
       | 'div'                   
       | 'mod'                    
       

<EXPR> ::= <EXPR_SINGLE> <EXPR_PRIMA>  
     

<EXPR_PRIMA> ::= ',' <EXPR_SINGLE> <EXPR_PRIMA>   
           |                           
           

<EXPR_SINGLE> ::= <OR_EXPR> 
            

<OR_EXPR> ::= <AND_EXPR> <OR_EXPR_PRIMA>  
        

<OR_EXPR_PRIMA> ::= 'or' <AND_EXPR> <OR_EXPR_PRIMA>   
              |                               
              

<AND_EXPR> ::= <COMPARISON_EXPR> <AND_EXPR_PRIMA>   
         

<AND_EXPR_PRIMA> ::= 'and' <COMPARISON_EXPR> <AND_EXPR_PRIMA>   
               |                                        
               

<COMPARISON_EXPR> ::= <ADDITIVE_EXPR>                      
                | <ADDITIVE_EXPR> '<' <ADDITIVE_EXPR>     
                | <ADDITIVE_EXPR> '>' <ADDITIVE_EXPR>    
                | <ADDITIVE_EXPR> '<=' <ADDITIVE_EXPR>    
                | <ADDITIVE_EXPR> '>=' <ADDITIVE_EXPR>    
                | <ADDITIVE_EXPR> '=' <ADDITIVE_EXPR>     
                | <ADDITIVE_EXPR> '!=' <ADDITIVE_EXPR>   
                

<ADDITIVE_EXPR> ::= <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA>   
              

<ADDITIVE_EXPR_PRIMA> ::= '+' <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA>   
                    | '-' <MULTIPLICATIVE_EXPR> <ADDITIVE_EXPR_PRIMA>   
                    |                                               
                    

<MULTIPLICATIVE_EXPR> ::= <UNARY_EXPR> <MULTIPLICATIVE_EXPR_PRIMA>    
                    


<MULTIPLICATIVE_EXPR_PRIMA> ::= '*' <UNARY_EXPR> <MULTIPLICATIVE_EXPR_PRIMA>   
                          | 'div' <UNARY_EXPR> <MULTIPLICATIVE_EXPR_PRIMA>  
                          |                                             
                          

<UNARY_EXPR>  ::= <QUERY>                           
            | '-' <UNARY_EXPR> %prec UMINUS     
            | '+' <UNARY_EXPR> %prec UPLUS        

```
