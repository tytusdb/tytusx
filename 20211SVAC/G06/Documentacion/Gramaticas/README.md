# XML ASCENDENTE:
### \<INIT\>	
:=	'menor' '?' id \<ATRIBUTO\>\<ATRIBUTO\> '?' 'mayor' \<INTRO\>    
|	\<INTRO\>     

### \<INTRO\>	
:=	\<INTRO\> \<NODO\> "EOF"           
|	\<NODO\> \<CHECK\>               
    
### \<CHECK\>	
:=	"EOF"               
|	Ε                  

### \<NODO\>	
:=	'menor' id \<LISTAATRIBUTOS\> 'mayor' \<LISTANODOS\> 'menor' '/' id 'mayor'<br>
|	'menor' id \<LISTAATRIBUTOS\> 'mayor' \<NODOTEXTO\> 'menor' '/' id 'mayor'<br>
|	'menor' id \<LISTAATRIBUTOS\> '/' 'mayor'           
|	'menor' id  'mayor' \<LISTANODOS\> 'menor' '/' id 'mayor' <br>
|	'menor' id  'mayor' \<NODOTEXTO\> 'menor' '/' id 'mayor'<br>
|	'menor' id  '/' 'mayor'                                   
|	error \<FINDERROR\>                                               


### \<FINDERROR\>
:=	'mayor' 

### \<LISTANODOS\>	
:=	\<LISTANODOS\> \<NODO\>   
|	\<NODO\>              

### \<LISTAATRIBUTOS\>	
:=	\<LISTAATRIBUTOS><ATRIBUTO\>   
|	\<ATRIBUTO\>                  

### \<ATRIBUTO\>	
:=	id '=' sstring    
|	id '=' dstring    

### \<NODOTEXTO\>	
:= 	\<NODOTEXTO\> dstring          
|	\<NODOTEXTO\> sstring          
|	\<NODOTEXTO\> id                  
|	\<NODOTEXTO\> lessthan            
|	\<NODOTEXTO\> greaterthan        
| 	\<NODOTEXTO\> ampersand           
| 	\<NODOTEXTO\> apostrophe          
|	\<NODOTEXTO\> quotmark           
| 	\<NODOTEXTO\> number           
|	\<NODOTEXTO\> random              
| 	\<NODOTEXTO\> '/'                
| 	\<NODOTEXTO\> '='                 
| 	dstring                       
| 	sstring                       
| 	id                           
| 	number                       
| 	lessthan                     
| 	greaterthan                  
| 	ampersand                    
| 	apostrophe                    
| 	quotmark                      
| 	random                       
| 	'/'                           
| 	'='  

# XML DESCENDENTE:
### \<INIT\>	
:=	'menor' '?' id \<ATRIBUTO\>\<ATRIBUTO\> '?' 'mayor' \<INTRO\>    
|	\<INTRO\>     

### \<INTRO\>	
:=	\<NODO\> \<INTRO\> "EOF"           
|	\<NODO\> \<CHECK\>               
    
### \<CHECK\>	
:=	"EOF"               
|	Ε                  

### \<NODO\>	
:=	'menor' id \<LISTAATRIBUTOS\> 'mayor' \<LISTANODOS\> 'menor' '/' id 'mayor'<br>
|	'menor' id \<LISTAATRIBUTOS\> 'mayor' \<NODOTEXTO\> 'menor' '/' id 'mayor' <br>
|	'menor' id \<LISTAATRIBUTOS\> '/' 'mayor'                          
|	'menor' id  'mayor' \<LISTANODOS\> 'menor' '/' id 'mayor' <br>
|	'menor' id  'mayor' \<NODOTEXTO\> 'menor' '/' id 'mayor'<br>
|	'menor' id  '/' 'mayor'                                       
|	error \<FINDERROR\>                                               


### \<FINDERROR\>	
:=	'mayor' 

### \<LISTANODOS\>	
:=	\<NODO\> \<LISTANODOS\>   
|	\<NODO\>              

### \<LISTAATRIBUTOS\>	
:=	\<ATRIBUTO\> \<LISTAATRIBUTOS\>   
|	\<ATRIBUTO\>                  

### \<ATRIBUTO\>	
:=	id '=' sstring    
|	id '=' dstring    

### \<NODOTEXTO\>	
:= 	dstring \<NODOTEXTO\>          
|	sstring \<NODOTEXTO\>           
|	id \<NODOTEXTO\>                  
|	lessthan \<NODOTEXTO\>            
|	greaterthan \<NODOTEXTO\>        
| 	ampersand \<NODOTEXTO\>          
| 	apostrophe \<NODOTEXTO\>          
|	quotmark \<NODOTEXTO\>           
| 	number \<NODOTEXTO\>           
|	random \<NODOTEXTO\>              
| 	'/' \<NODOTEXTO\>                
| 	'=' \<NODOTEXTO\>                 
| 	dstring                       
| 	sstring                       
| 	id                           
| 	number                       
| 	lessthan                     
| 	greaterthan                  
| 	ampersand                    
| 	apostrophe                    
| 	quotmark                      
| 	random                       
| 	'/'                           
| 	'='

# XPATH ASCENDENTE:
### \<INIT\>	
:=	'/' 'EOF'                                     
|	\<MULTIPATH\> 'EOF'               
|	'EOF'         

### \<MULTIPATH\>	
:=	\<MULTIPATH\> '|' \<PATH\>                      
|	\<PATH\>    

### \<PATH\>	
:=	'/' \<LACCESOS\>                                 
|	'//' \<LACCESOS\>                           

### \<LACCESOS\>	
:=	\<LACCESOS\> '/' \<ACCESO\>                          
|	\<LACCESOS\> '//' \<ACCESO\>                        
|	\<LACCESOS\> '/' 'descendant' '::' id             
|	\<LACCESOS\> '//' 'descendant' '::' id          
| 	\<LACCESOS\> '/' 'descendant' '::' id \<PREDICADOS\><br>
| 	\<LACCESOS\> '//' 'descendant' '::' id \<PREDICADOS\><br>
|	\<ACCESO\>                                     

### \<ACCESO\>	
:=	id                                        
|	'*'                                        
|	'.'                                         
| 	'..'                                         
| 	id \<PREDICADOS\>                         
| 	'*' \<PREDICADOS\>                             
|	child '::' id                                
| 	child '::' '*'                             
| 	child '::' id \<PREDICADOS\>                     
| 	child '::' '*' \<PREDICADOS\>                  
| 	'@' id                                        
| 	'@' '*'                                    
| 	'@' id \<PREDICADOS\>                            
| 	'@' '*' \<PREDICADOS\>                            
|  	attribute '::' id \<PREDICADOS\>                
| 	attribute '::' '*' \<PREDICADOS\>             
|  	error \<FINDERROR\>                          

### \<FINDERROR\>	
:=	'/' 


### \<PREDICADOS\>	
:=	 \<PREDICADOS\> \<PREDI\>         
|	 \<PREDI\>                  

### \<PREDI\>	
:	'[' \<EXP\> ']'              
    
### \<EXP\> 	
:=	\<EXP\>  '+'  \<EXP\>           
|	\<EXP\>  '-'  \<EXP\>           
| 	\<EXP\>  '*'  \<EXP\>             
| 	\<EXP\> 'div' \<EXP\>         
| 	\<EXP\> 'mod' \<EXP\>         
| 	\<EXP\>  '=' \<EXP\>           
| 	\<EXP\> '!=' \<EXP\>            
| 	\<EXP\>  '<' \<EXP\>             
| 	\<EXP\> '<='  \<EXP\>            
| 	\<EXP\>  '>'  \<EXP\>          
| 	\<EXP\> '>='  \<EXP\>           
| 	\<EXP\> 'and' \<EXP\>          
| 	\<EXP\> 'or' \<EXP\>          
| 	\<VALOR\>                   
 
### \<VALOR\>	
:=	'(' \<EXP\> ')'             
|	cadena                   
| 	scadena                 
| 	number                    
| 	'position' '(' ')'        
| 	'last' '(' ')'            
| 	\<LACCESOS\>                 
| 	'//' \<LACCESOS\>            

# XPATH DESCENDENTE:
### \<INIT\>	
:=	'/' 'EOF'                                     
|	\<MULTIPATH\> 'EOF'               
|	'EOF'         

### \<MULTIPATH\>	
:=	\<PATH\> '|' \<MULTIPATH\>                      
|	\<PATH\>    

### \<PATH\>	
:=	'/' \<LACCESOS\>                                 
|	'//' \<LACCESOS\>                           

### \<LACCESOS\>	
:=	\<ACCESO\> '/' \<LACCESOS\>                          
|	\<ACCESO\> '//' \<LACCESOS\>                       
|	\<LACCESOS\> '/' 'descendant' '::' id             
|	\<LACCESOS\> '//' 'descendant' '::' id          
| 	\<LACCESOS\> '/' 'descendant' '::' id \<PREDICADOS\><br>
| 	\<LACCESOS\> '//' 'descendant' '::' id \<PREDICADOS\><br>
|	\<ACCESO\>                                     

### \<ACCESO\>	
:=	id                                        
|	'*'                                        
| 	'.'                                         
| 	'..'                                         
| 	id \<PREDICADOS\>                         
| 	'*' \<PREDICADOS\>                             
|	child '::' id                                
| 	child '::' '*'                             
| 	child '::' id \<PREDICADOS\>                     
| 	child '::' '*' \<PREDICADOS\>                  
| 	'@' id                                        
| 	'@' '*'                                    
| 	'@' id \<PREDICADOS\>                            
| 	'@' '*' \<PREDICADOS\>                            
|  	attribute '::' id \<PREDICADOS\>                
| 	attribute '::' '*' \<PREDICADOS\>             
|  	error \<FINDERROR\>                          

### \<FINDERROR\>	
:=	'/' 


### \<PREDICADOS\>	
:=	 \<PREDI\> \<PREDICADOS\>         
|	 \<PREDI\>                  

### \<PREDI\>	
:	'[' \<EXP\> ']'              
    
### \<EXP\> 	
:=	\<EXP\>  '+'  \<EXP\>           
|	\<EXP\>  '-'  \<EXP\>           
| 	\<EXP\>  '*'  \<EXP\>             
| 	\<EXP\> 'div' \<EXP\>         
| 	\<EXP\> 'mod' \<EXP\>         
| 	\<EXP\>  '=' \<EXP\>           
| 	\<EXP\> '!=' \<EXP\>           
| 	\<EXP\>  '<' \<EXP\>             
| 	\<EXP\> '<='  \<EXP\>            
| 	\<EXP\>  '>'  \<EXP\>          
| 	\<EXP\> '>='  \<EXP\>           
| 	\<EXP\> 'and' \<EXP\>          
| 	\<EXP\> 'or' \<EXP\>          
| 	\<VALOR\>                   
 
### \<VALOR\>	
:=	'(' \<EXP\> ')'             
|	cadena                   
| 	scadena                 
| 	number                    
| 	'position' '(' ')'        
| 	'last' '(' ')'            
| 	\<LACCESOS\>                 
| 	'//' \<LACCESOS\>    
