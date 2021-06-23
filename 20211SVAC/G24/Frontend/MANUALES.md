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

![Parte1](https://user-images.githubusercontent.com/36779113/122318238-f942db00-cedb-11eb-9a9e-1cd3642ff55c.gif)


## Ejecutar XPATH, Editor de Texto
![Parte2](https://user-images.githubusercontent.com/36779113/122318829-f2689800-cedc-11eb-88ae-854aa2abf9fa.gif)


## Editor de texto
La interfaz gráfica se compone de un editor de texto con resaltado de sintaxis XML en el cual podemos escribir la base de datos y en la parte superior de la ventana se encuentra para analizar la sintaxis de XPATH nos genera la salida correspondiente a las consultas en el apartado de resultado XPATH.
## Arbol de Directorios
También se cuenta con un navegador en la barra lateral izquierda para poder visualizar las diferentes funciones de reportes como:
> - Principial
> - CST
> - AST
> - Tabla de Símbolos 
> - Reporte Gramatical
> - Errores

![Parte3](https://user-images.githubusercontent.com/36779113/122319751-4aec6500-cede-11eb-8f2b-fa10484df446.gif)

## Manejo de árbol
```console
npm install vis
```
Llamaremos en Angular
```python
import * as vis from 'vis';
```
# Manual Técnico 
## Clases utilizadas para el intérprete XPATH
> - Instruccion
> - nodoAST
> - Errores
> - Excepcion
> - - Errores
> - - NodoErrores
> - Expresion
> - - Atributo
> - - Objeto
> - Reporte
>  - - ReporteTabla
> - Simbolos
> - - Arbol
> - - Simbolo
> - - Tabla de Simbolo
> - - Tipo
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
## Clases utilizadas para el intérprete XPATH
> - Instruccion
> - nodoAST
> - Errores
> - Excepcion
> - - Errores
> - - NodoErrores
> - Expresion
> - - Aritmetica
>  - - Identificador
>  - - Logica
>  - - Nativo
>  - - ParentesisExpresion
>  - - Relacional
>  - Funciones
>  - - Axes
>  - - Especiales
>  - Instrucciones
>  - - Arreglos
>  - - AtributosExpresion
>  - - AtributosPredicados
>  - - AtributosSimples
>  - - BarrasNodo
>  - - Predicados
>  - - SelectRoot
>  - - Todo
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
        | INSTRUCCIONES OPTION INSTRUCCION     

        ;

INSTRUCCION 
        
        : BARRA BARRA  EXPRESION                     
        | BARRA    EXPRESION                         
        | ATRIBUTO                                   
        | AXES                                       
        | ALL                                        

        ;
PREDICADOS
        :INSTRUCCION                    
        | IDENTIFICADOR  L_CORCHETES    
        ;
ALL 
        : SELECT  SELECT                
        | SELECT                        
        | MULTIPLICACION                
        ;
ATRIBUTO 
        : ATRIBUTOS EXPRESION     
        | ATRIBUTOS SELECT                              
        | ATRIBUTOS MULTIPLICACION                      
        | ATRIBUTOS IDENTIFICADOR  L_CORCHETES          
        ; 

L_CORCHETES
        : L_CORCHETES CORCHETEIZQ EXPRESION CORCHETEDER     
        | CORCHETEIZQ EXPRESION CORCHETEDER                 
        | PARIZQ EXPRESION PARDER COMA                      
        | PARIZQ EXPRESION PARDER                           
        ;

EXPRESION
        : CADENA                                            
        | NUMBER                                            
        | entero                                            
        | CARACTER_LITERAL                                  
        | STRING_LITERAL                                    
        | ALL                                               
        | ATRIBUTO                                          
        | IDENTIFICADOR                                     
        | PREDICADOS                                        
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
        | MENOS EXPRESION %prec UMENOS	                    
        | LAST PARIZQ PARDER                                
        | POSITION PARIZQ PARDER                            
        | NODE PARIZQ PARDER                                
        | TEXT PARIZQ PARDER                                
        ;

AXES
        :ANCESTOR DOSPUNTOS DOSPUNTOS EXPRESION             
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS EXPRESION         
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS EXPRESION            
        |CHILD DOSPUNTOS DOSPUNTOS EXPRESION                
        |DESCENDENT DOSPUNTOS DOSPUNTOS EXPRESION           
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS EXPRESION       
        |FOLLOWING DOSPUNTOS DOSPUNTOS EXPRESION            
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION       
        |NAMESPACE DOSPUNTOS DOSPUNTOS EXPRESION            
        |PARENT DOSPUNTOS DOSPUNTOS EXPRESION               
        |PRECEDING DOSPUNTOS DOSPUNTOS EXPRESION            
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION       
        |SELF DOSPUNTOS DOSPUNTOS EXPRESION                 
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
        :ANCESTOR DOSPUNTOS DOSPUNTOS EXPRESION                
        |ANCESTORSELF DOSPUNTOS DOSPUNTOS EXPRESION            
        |ATTRIBUTE DOSPUNTOS DOSPUNTOS EXPRESION               
        |CHILD DOSPUNTOS DOSPUNTOS EXPRESION                   
        |DESCENDENT DOSPUNTOS DOSPUNTOS EXPRESION              
        |DESCENDENTSELF DOSPUNTOS DOSPUNTOS EXPRESION          
        |FOLLOWING DOSPUNTOS DOSPUNTOS EXPRESION               
        |FOLLOWINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION          
        |NAMESPACE DOSPUNTOS DOSPUNTOS EXPRESION               
        |PARENT DOSPUNTOS DOSPUNTOS EXPRESION                  
        |PRECEDING DOSPUNTOS DOSPUNTOS EXPRESION               
        |PRECEDINGSIBLI DOSPUNTOS DOSPUNTOS EXPRESION          
        |SELF DOSPUNTOS DOSPUNTOS EXPRESION                    
        ;

```
