      
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2 
### Vacaciones junio 2021 - Sección A
### Ing. Luis Fernando Espino Barrios
### Aux. Haroldo Arias

### REPORTE GRAMATICAL XPATH


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
      
       
      
<INICIO> ::=
<LISTA_<NODE>> EOF 
    ;


<LISTA_<NODE>>::=  <LISTA_<NODE>> <PATH> 
    |   <PATH> 
;


<PATH> ::= <NODE> <EXPR>  
    |  <NODE> <WILDCARD>
    |  <EXPR>         
    |  <NODE> <AXES> <EXPR> 
    |  <AXES> <EXPR>      
;

<NODE>::=   t_doble_diagonal 
    |   t_diagonal       
;


<EXPR>::= <StringLiteral>            
    | t_arroba <StringLiteral>   
    | t_doble_punto            
    | t_punto                  
    | <PREDICATES>               
;

<WILDCARD>::=   t_multiplicacion   
    | t_arroba t_multiplicacion
    | <NODE>                     
;

<AXES> ::=  ancestor t_doble_dos_puntos         
    |   t_ancestor_or_self t_doble_dos_puntos 
    |   t_attribute t_doble_dos_puntos        
    |   t_child t_doble_dos_puntos            
    |   t_descendant t_doble_dos_puntos       
    |   t_following t_doble_dos_puntos        
;

<PREDICATES> ::= <StringLiteral> t_corchete_izquierdo <EXPRESION> t_corchete_derecho {$$ = new Predicado($1,$3,this._$.first_line, this._$.first_column);}
;

<EXPRESION> ::= 
	  <EXPRESION> t_suma <EXPRESION>		       
	| <EXPRESION> t_resta <EXPRESION>		       
	| <EXPRESION> t_multiplicacion <EXPRESION>		
	| <EXPRESION> t_div <EXPRESION>	                
	| <EXPRESION> t_igual <EXPRESION>	            
	| t_parentesis_izquierdo <EXPRESION> t_parentesis_derecho	
	| <PRIMITIVO>					
	;


<PRIMITIVO> ::= 
	  number 	      
	| cadena		  
	| <StringLiteral>   
	| t_arroba <StringLiteral>  
	;


<ESPECIAL>::= 
;