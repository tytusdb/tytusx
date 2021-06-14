# TytusX Grupo #24
### Organizacion de Lenguajes y Compiladores 2
#### Universidad de San Carlos de Guatemala, Junio 2021
> Integrantes
> - Cinthya Andrea Palomo Galvez          201700670
> - Jackeline Alexandra Benitez Benitez   201709166

# Manual de Usuario
FRONTEND CREADO EN ANGULAR
## Pantalla Inicial
## Ejecutar XML, Editor de Texto
![Parte1](https://user-images.githubusercontent.com/36779113/121647942-30d10380-ca54-11eb-9126-c4a58fc430b2.gif)
## Ejecutar XPATH, Editor de Texto
![Parte2](https://user-images.githubusercontent.com/36779113/121648335-a3da7a00-ca54-11eb-85ec-852bdf923f13.gif)
## Editor de texto
La interfaz gráfica se compone de un editor de texto con resaltado de sintaxis XML en el cual podemos escribir la base de datos y en la parte superior de la ventana se encuentra para analizar la sintaxis de XPATH nos genera la salida correspondiente a las consultas en el apartado de resultado XPATH.
## Arbol de Directorios
También se cuenta con un navegador en la barra lateral izquierda para poder visualizar las diferentes funciones de reportes como:
> - Principial
> - CST
> - Tabla de Símbolos 
> - Errores

![Parte3](https://user-images.githubusercontent.com/36779113/121649971-4f37fe80-ca56-11eb-86bb-8d782051af45.gif)
## Manejo de árbol
```console
npm install vis
```
Llamaremos en Angular
```python
import * as vis from 'vis';
```
# Manual Técnico 
# XML
## Gramática utilizada para XML 
> - ASCENDENTE
```java
START
        : OBJETO EOF                  
        ;

INSTRUCCION
        : CUERPO 
        | OBJETOS
        ;

OBJETOS
        : OBJETOS OBJETO 
        | OBJETO 
        ;

OBJETO
        : MENORQUEESPECIAL IDENTIFICADOR L_ATRIBUTOS MAYORQUEESPECIAL  INSTRUCCION         
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS SELFCLOSE INSTRUCCION    
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION SALIDA IDENTIFICADOR MAYORQUE 
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION IDENTIFICADOR MAYORQUE
        | COMENTARIOS 
        | %empty      
        ;


L_ATRIBUTOS:
          L_ATRIBUTOS ATRIBUTO 
          |ATRIBUTO       
          |%empty       
;

ATRIBUTO
        :IDENTIFICADOR IGUAL CADENA 
        |IDENTIFICADOR IGUAL QUOTE 
        ;
```
> - DESCENDENTE (ELIMINANDO LA RECURSIVIDAD IZQUIERDA Y AMBIGÜEDAD)
```python
START
        : OBJETO EOF                  
        ;

INSTRUCCION
        : CUERPO 
        | OBJETOS 
        ;

OBJETOS
        : OBJETO OBJETOS 
        |%empty
        ;

OBJETO
        : MENORQUEESPECIAL IDENTIFICADOR L_ATRIBUTOS MAYORQUEESPECIAL  INSTRUCCION          
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS SELFCLOSE INSTRUCCION     
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION SALIDA IDENTIFICADOR MAYORQUE
        | MENORQUE IDENTIFICADOR L_ATRIBUTOS MAYORQUE INSTRUCCION IDENTIFICADOR MAYORQUE
        | COMENTARIOS
        | %empty
        ;


L_ATRIBUTOS:
           ATRIBUTO L_ATRIBUTOS 
          |%empty
;

ATRIBUTO
        :IDENTIFICADOR IGUAL CADENA 
        |IDENTIFICADOR IGUAL QUOTE  
        ;
```
## Clases utilizadas para el intérprete del árbol
> - Instruccion
> - nodoAST
> - Errores
> - Expresion
> - - Aritmetica
>  - - Identificador
>  - - Logica
>  - - Nativo
>  - - Relacional
> - Reporte
>  - - ReporteTabla
> - Simbolos
> - - Arbol
> - - Simbolo
> - - Tabla de Simbolo
> - - Tipo
# XPATH
## Gramática utilizada para XPATH
> - ASCENDENTE
```java
START 
        : INSTRUCCIONES  EOF                 
        ;

INSTRUCCIONES
        : INSTRUCCIONES INSTRUCCION             
        | INSTRUCCION                           
        ;

INSTRUCCION 
        : INSTRUCCION OPTION NODO      
        | AXES                         
        | NODO                         
        ;

NODO
        :BARRA  L_NODO               
        | BARRA BARRA L_NODO         
        | L_NODO                     
        | ASIGNACION                   
        ;

L_NODO
        : FUNCION                    
        | MULTIPLICACION             
        | ATRIBUTOS                  
        | ATRIBUTOS EXPRESION        
        | ATRIBUTOS MULTIPLICACION   
        | EXPRESION                  
        | L_CORCHETES                
        ;

FUNCION 
        :  IDENTIFICADOR PARIZQ PARDER                       
        | IDENTIFICADOR L_CORCHETES                          
        | IDENTIFICADOR CORCHETEIZQ  CORCHETEDER             
        
        
        ;

L_CORCHETES
        : L_CORCHETES CORCHETEIZQ INSTRUCCIONES CORCHETEDER  
        | CORCHETEIZQ INSTRUCCIONES CORCHETEDER              
        | PARIZQ INSTRUCCIONES PARDER COMA                   
        | PARIZQ INSTRUCCIONES PARDER                        
        ;

ASIGNACION 
        :IDENTIFICADOR IGUAL EXPRESION                       
        | SELECT IGUAL EXPRESION                             
        ;

EXPRESION
        :CADENA                                              
        | NUMBER                                             
        | entero                                             
        | CARACTER_LITERAL                                   
        | STRING_LITERAL                                     
        | SELECT                                               
        | IDENTIFICADOR  BARRA BARRA  L_NODO                   
        | IDENTIFICADOR  BARRA  L_NODO                         
        | IDENTIFICADOR                                        
        | EXPRESION COMA EXPRESION                             
        | EXPRESION MENOS EXPRESION                            
        | EXPRESION MAS EXPRESION                              
        | EXPRESION MENOS EXPRESION                            
        | EXPRESION MULTIPLICACION EXPRESION                   
        | EXPRESION DIVISION EXPRESION                         
        | EXPRESION IGUAL EXPRESION                            
        | EXPRESION NOIGUAL EXPRESION                          
        | EXPRESION MENORQUE EXPRESION                         
        | EXPRESION MENORIGUAL EXPRESION                       
        | EXPRESION MAYORQUE EXPRESION                         
        | EXPRESION MAYORIGUAL EXPRESION                       
        | EXPRESION OR EXPRESION                               
        | EXPRESION AND EXPRESION                              
        | EXPRESION MODULO EXPRESION                           
        | SELECT IGUAL EXPRESION                               
        | LAST PARIZQ PARDER                                   
        | POSITION PARIZQ PARDER                               
        | NODE PARIZQ PARDER                                   
        | TEXT PARIZQ PARDER                                   
        | L_NODO                                               
        | FUNCION                                              
        ;


AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS L_NODO                 
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS L_NODO             
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS L_NODO                
        |CHILD DOSPUNTOS DOSPUNTOS L_NODO                    
        |DESCENDENT DOSPUNTOS DOSPUNTOS L_NODO               
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS L_NODO           
        |FOLLOWING DOSPUNTOS DOSPUNTOS L_NODO                
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO           
        |NAMESPACE DOSPUNTOS DOSPUNTOS L_NODO                
        |PARENT DOSPUNTOS DOSPUNTOS L_NODO                   
        |PRECEDING DOSPUNTOS DOSPUNTOS L_NODO                
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO           
        |SELF DOSPUNTOS DOSPUNTOS L_NODO                     
        ;

```
> - DESCENDENTE (ELIMINANDO LA RECURSIVIDAD IZQUIERDA Y AMBIGÜEDAD)
```python
START 
        : INSTRUCCIONES  EOF        
        ;

INSTRUCCIONES
        :  INSTRUCCION INSTRUCCIONES
        | INSTRUCCION               
        ;

INSTRUCCION 
        :  NODO OPTION INSTRUCCION  
        | AXES                      
        | NODO                      
        | %empty
        ;

NODO
        :BARRA  L_NODO              
        | BARRA BARRA L_NODO        
        | L_NODO                    
        | ASIGNACION                
        ;

L_NODO
        : FUNCION                     
        | MULTIPLICACION              
        | ATRIBUTOS                   
        | ATRIBUTOS EXPRESION         
        | ATRIBUTOS MULTIPLICACION    
        | EXPRESION                   
        | L_CORCHETES                 
        ;

FUNCION 
        :  IDENTIFICADOR PARIZQ PARDER                         
        | IDENTIFICADOR L_CORCHETES                            
        | IDENTIFICADOR CORCHETEIZQ  CORCHETEDER               
        ;
        
L_CORCHETES
        : CORCHETEIZQ INSTRUCCIONES CORCHETEDER  L_CORCHETES  
        | CORCHETEIZQ INSTRUCCIONES CORCHETEDER               
        | PARIZQ INSTRUCCIONES PARDER COMA          
        | PARIZQ INSTRUCCIONES PARDER               
        | %empty                                              
        ;

ASIGNACION 
        :IDENTIFICADOR IGUAL EXPRESION              
        | SELECT IGUAL EXPRESION                    
        ;
        
EXPRESION
        : TERMINO OPLOGICAS TERMINO                 
        | TERMINO OPARITMETICAS TERMINO             
        | TERMINO OPRELACIONAL TERMINO              
        | UNARIO TERMINO                            
        | TERMINO                                   
        ;

TERMINO 
        : CADENA                                    
        | NUMBER                                    
        | entero                                    
        | CARACTER_LITERAL                          
        | STRING_LITERAL                            
        | SELECT                                    
        | IDENTIFICADOR  BARRA BARRA  L_NODO        
        | IDENTIFICADOR  BARRA  L_NODO              
        | IDENTIFICADOR                             
        | SELECT IGUAL EXPRESION                    
        | LAST PARIZQ PARDER                        
        | POSITION PARIZQ PARDER                    
        | NODE PARIZQ PARDER                        
        | TEXT PARIZQ PARDER                        
        | L_NODO                                    
        | FUNCION                                   
        ;

OPLOGICAS
        : IGUAL             
        | NOIGUAL           
        | MENORQUE          
        | MENORIGUAL        
        | MAYORQUE          
        | MAYORIGUAL        
        ;
OPARITMETICAS
        :  MENOS            
        |  MAS              
        |  MENOS            
        |  MULTIPLICACION   
        |  DIVISION         
        |  MODULO           
        ;
OPRELACIONAL
        : OR                
        | AND               
        ;
UNARIO
        : MENOS             
        | COMA              
        ;
AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS L_NODO                   
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS L_NODO               
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS L_NODO                  
        |CHILD DOSPUNTOS DOSPUNTOS L_NODO                      
        |DESCENDENT DOSPUNTOS DOSPUNTOS L_NODO                 
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS L_NODO             
        |FOLLOWING DOSPUNTOS DOSPUNTOS L_NODO                  
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO             
        |NAMESPACE DOSPUNTOS DOSPUNTOS L_NODO                  
        |PARENT DOSPUNTOS DOSPUNTOS L_NODO                     
        |PRECEDING DOSPUNTOS DOSPUNTOS L_NODO                  
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS L_NODO             
        |SELF DOSPUNTOS DOSPUNTOS L_NODO                       
        ;

```
