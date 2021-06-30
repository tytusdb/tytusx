# XML

Inicia en produccion "<START>" reconociendo un documento en formato "XML" con todos sus atributos.

```
**<START>** ::= <ENCABEZADO> <EOF>

**<ENCABEZADO>** ::= <lt> <interrog> "xml" <LISTAATRIBUTOS> <interrog> <gt> <LISTAELEMENTOS>       
                    | <error> <LISTAELEMENTOS>

**<LISTAELEMENTOS>** ::= <LISTAELEMENTOS> <ELEMENTO> 
                        | <ELEMENTO>

**<ELEMENTO>** ::=  <lt> <identifier> <LISTAATRIBUTOS> <diag> <gt>                                  
                  | <lt> <identifier> <LISTAATRIBUTOS> <gt>   <TEXTCONTENT>     <lt> <diag> <identifier> <gt>     
                  | <lt> <identifier> <LISTAATRIBUTOS> <gt>   <LISTAELEMENTOS>  <lt> <diag> <identifier> <gt>  
                  | <lt> <identifier> <LISTAATRIBUTOS> <gt>                     <lt> <diag> <identifier> <gt>                 
                  | <error> <gt>

**<LISTAATRIBUTOS>** ::= <ATRIBUTOS>
                        | < >            
             
**<ATRIBUTOS>** ::= <ATRIBUTOS> <ATRIBUTO>  
                    | <ATRIBUTO>

**<ATRIBUTO>** ::=    <identifier> <asig> <cadena>
                    | <identifier> <asig> <cadena2>
                    | <error>

**<TEXTCONTENT>** ::=   <TEXTCONTENT> <TEXT>   
                      | <TEXT>

**<TEXT>** ::= <identifier>
              | <content>           
              | <DoubleLiteral>     
              | <IntegerLiteral>    
              | <xml>               
              | <apos>              
              | <less>              
              | <greater>           
              | <ampersand>         
              | <apostrophe>        
              | <quot>              
              | <error>             
```

# XPath

```
**<START>**  ::= <LISTACONSULTAS> <EOF>         
    
**<LISTACONSULTAS>** ::= <LISTACONSULTAS> <andSelect> <CONSULTA> 
                  |  <CONSULTA>    

**<CONSULTA>** ::= <identifier> 
            | <identifier> <LISTANODOS> 
            | <MASTIPOS> <LISTANODOS>
            | <LISTANODOS> 
            | <MASTIPOS> 

**<LISTANODOS>** ::=  <LISTANODOS> <NODO>
              | <NODO>

**<NODO>** ::= <diag> <TIPONODO> 
        | <diag> <diag> <TIPONODO> 
        | <diag> <error> 
        | <diag> <diag> <error>

**<TIPONODO>** ::= <identifier> 
            | <identifier> <corA> <EXPRESION> <corC> 
            | <MASTIPOS> 
            |  <AXES>

**<MASTIPOS>** ::= <attr> <identifier> <PREDICATE> 
            | <attr> <asterisco> <PREDICATE>
            | <dot> <PREDICATE>
            | <dot> <dot> <PREDICATE> 
            | <asterisco> <PREDICATE> 
            | <FUNCIONES> 

**<AXES>** ::=    <ancestor> <dospuntos> <NODETEST> 
        |     <ancestorSelf> <dospuntos> <NODETEST>
        |     <attribute> <dospuntos> <NODETEST>
        |     <child> <dospuntos> <NODETEST> 
        |     <descendant> <dospuntos> <NODETEST> 
        |     <descendantSelf> <dospuntos> <NODETEST> 
        |     <following> <dospuntos> <NODETEST>
        |     <followingSib> <dospuntos> <NODETEST>
        |     <namespace> <dospuntos> <NODETEST> 
        |     <parent> <dospuntos> <NODETEST> 
        |     <preced> <dospuntos> <NODETEST> 
        |     <precedSib> <dospuntos> <NODETEST>
        |     <self> <dospuntos> <NODETEST> 

**<PREDICATE>** ::= <corA> <EXPRESION> <corC> 
              | < >

**<NODETEST>** ::= <identifier> <PREDICATE>
            | <textFunc> <PREDICATE>  
            | <nodeFunc> <PREDICATE> 
            | <asterisco> <PREDICATE>

**<LISTAEXPRESIONES>** ::= <LISTAEXPRESIONES> <EXPRESION>
                    | <EXPRESION> 
                    
**<EXPRESION>** ::=  <PRIMITIVA> 
              | <Operacion> 

**<Operacion>** ::= <EXPRESION> <asterisco> <EXPRESION>
              | <EXPRESION> <mas> <EXPRESION> 
              | <EXPRESION> <menos <EXPRESION> 
              | <EXPRESION> <div> <EXPRESION> 
              | <EXPRESION> <lte> <EXPRESION> 
              | <EXPRESION> <lt> <EXPRESION>
              | <EXPRESION> <gte> <EXPRESION>
              | <EXPRESION> <gt> <EXPRESION>
              | <EXPRESION> <igual> <EXPRESION>
              | <EXPRESION> <nequal> <EXPRESION> 
              | <EXPRESION> <or> <EXPRESION>
              | <EXPRESION> <and> <EXPRESION>
              | <EXPRESION> <mod> <EXPRESION>
              | <parA> <EXPRESION> <parC> 

**<PRIMITIVA>** ::= <DoubleLiteral> 
              | <IntegerLiteral >
              | <cadena>
              | <cadena2>
              | <identifier> 
              | <attr ><identifier>
              | <attr> <asterisco> 
              | <dot>
              | <FUNCIONES>

**<FUNCIONES>** ::= <lastFunc>
              | <positionFunc>
              | <nodeFunc>
              | <textFunc>
```