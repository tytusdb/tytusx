
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2 
### Vacaciones junio 2021 - Sección A
### Ing. Luis Fernando Espino Barrios
### Aux. Haroldo Arias

### REPORTE GRAMATICAL XML


## -----------------------------------------Proyecto: TytusX-----------------------------------------

<br>
<div style="text-align: justify">
<table class="w3-table">
  <tr>
    <th>Nombre</th>
    <th>Carnet</th>
  </tr>
  <tr>
    <td>Cristian Alexander Gomez Guzman</td>
    <td>201801480</td>
  </tr>  
  <tr>
    <td>Elder Aquilino Tojin</td>
    <td>201020445</td>
  </tr>
</table>
</div>
<br>

## GRAMATICA 
    
    <ESTRUCTURA> ::= 
        <ESTRUCTURA> <ROOT>
    |   <ROOT>
    ;

    <ROOT> ::= 
        '<' '?' xml version '=' <cadena> 'encoding' '=' <cadena> '?' '>'     
    |   '<' <identificador> '>' <LISTA_<ELEMENTOS> '<' '/' <identificador> '>'           
    ;

    <LISTA_<ELEMENTOS> ::=  
        <LISTA_<ELEMENTOS> <ELEMENTO>    
    |   <ELEMENTO>                               
    ;   

    <ELEMENTO> ::= 
        '<' <identificador> '>' <Texto> '<' '/' <identificador> '>'                        
    |   '<' <identificador> '>' <LISTA_ELEMENTOS> '<' '/' <identificador> '>'                 
    |   '<' <identificador> <LISTA_ATRIBUTO> '>' <LISTA_ELEMENTOS> '<' '/' <identificador> '>'  
    |   '<' <identificador> <LISTA_ATRIBUTO> '>' <Texto> '<' '/' <identificador> '>'            
    |   '<' <identificador> <LISTA_ATRIBUTO> '/' '>'                                              
    |   '<' <identificador> '/' '>'                                                             
    ;

    <LISTA_ATRIBUTO> ::= 
        <ATRIBUTOS>                         
    |                                              
    ;

    <ATRIBUTOS>::=
        <ATRIBUTOS> <ATRIBUTO>                             
    |   <ATRIBUTO>                                   
    ;

    <ATRIBUTO> ::= 
        <identificador> '=' <cadena>           
    ;