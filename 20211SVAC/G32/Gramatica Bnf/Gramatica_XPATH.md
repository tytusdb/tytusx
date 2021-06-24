# **Gramatica BNF XPATH 3.1**

**Contenido**   
1. [Simbolos Terminales](#id1)
2. [Simbolos No Terminales](#id2)
1. [Gramatica Ascendente](#id3)
2. [Gramatica Descendente](#id4)


## Simbolos Terminales<a name="id1"></a>

#### Palabras Reservadas

        last
        position
        node
        text
        ancestor
        attribute
        child
        descendant
        following
        namespace
        parent
        preceding
        sibling
        self
        mod 
        div
        and
        or

#### Signos
        (  par_izq
        )  par_der
        [  cor_izq
        ]  cor_der
        .   punto 
        ..  dos_pts
        /   diagonal 
        //  doble_diagonal
        @   arroba
        ::  bi_punto

#### Operadores 
        |   o
        +   mas
        -   menos
        *   mul
        =   igual 
        !=  diferencia
        <=  menor_igual
        >=  mayor_igual
        <   menor
        >   mayor

## Simbolos No Terminales<a name="id2"></a>

        S
        INSTRUCCIONES
        INSTRUCCION
        RUTA
        FILTROS
        ATRIBUTO_DESCENDIENTES
        DESCENDIENTES_NODO
        PADRE
        HIJOS
        ATRIBUTO_NODO
        PADRE_NODO
        RAIZ
        NODO_ACTUAL
        ANY
        EJES
        OPC_EJES
        EXPR
        PASOS
        PREDICADO
        PATH
        ORDEN
        ATRIBUTO_PREDICADO
        LISTA_PREDICADO
        LOGICAS
        RELACIONALES
        VALORES
        ARITMETICAS


## Gramatica Ascendente<a name="id3"></a>

        <S> ::= <INSTRUCCIONES> 

        <INSTRUCCIONES> ::= <INSTRUCCIONES>  <INSTRUCCION>  
                           | <INSTRUCCION>  

        <INSTRUCCION> ::= <INSTRUCCION> o <RUTA> <FILTROS>
                           | <RUTA>  <FILTROS>

        <RUTA> ::=   <ATRIBUTO_DESCENDIENTES>
                           | <DESCENDIENTES_NODO>
                           | <DESCENDIENTE>        
                           | <PADRE>
                           | <ATRIBUTO_NODO>
                           | <HIJOS>
                           | <RAIZ>
                           | <NODO_ACTUAL>
                           | <PADRE_NODO>
                           | <ANY> 
                           | id 
                           | <EJES> <OPC_EJES> 

        <ATRIBUTO_DESCENDIENTES> ::= diagonal_diagonal_arroba_ast  <OPC>
                        
        <DESCENDIENTES_NODO> ::= diagonal_diagonal_ast <OPC>

        <DESCENDIENTE> ::= doble_diagonal <OPC>

        <PADRE> ::= diagonal_dos_pts <OPC>

        <ATRIBUTO_NODO> ::= diagonal_arroba_ast <OPC>

        <HIJOS> ::= diagonal_ast <OPC>

        <RAIZ> ::= diagonal <OPC>

        <NODO_ACTUAL> ::= punto

        <PADRE_NODO> ::= dos_pts 

        <ANY> ::= mul 

        <EJES> ::= ancestor bi_pto
                | ancestor menos or menos self bi_pto
                | attribute bi_pto
                | child bi_pto
                | descendant bi_pto
                | descendant menos or self bi_pto 
                | following bi_pto
                | following menos sibling bi_pto
                | namespace bi_pto
                | parent bi_pto
                | preceding bi_pto
                | preceding menos sibling bi_pto
                | self bi_pto

        <OPC_EJES> ::= id
                |  mul         
                |  NODO_FUNCION 

        <NODO_FUNCION> ::= node
                | text

        <OPC> ::=       
                | <NODO_FUNCION>
                | <PASOS>

        <PASOS> ::= <ANY_ATRIBUTO>
                | <ATRIBUTO> 

        <ANY_ATRIBUTO> ::= any_atributo 

        <ATRIBUTO> ::= arroba id

        <FILTROS> ::= 
                | <LISTA_PREDICADO>

        <LISTA_PREDICADO> ::= <LISTA_PREDICADO> <PREDICADO> 
                | <PREDICAD>    

        <PREDICADO> ::= cor_izq  <EXPR>  cor_der

        <EXPR> ::= <ATRIBUTO_PREDICADO>
                | <ARITMETICAS>
                | <RELACIONALES>
                | <LOGICAS>
                | <ORDEN> 
                | <VALORES>
                | <EJES OPC_EJES>
                | <PATH>
                | <PREDICADO>
                | <NODO_FUNCION>
                | par_izq <EXPR> par_der

        <PATH> ::= <EXPR> doble_diagonal <EXPR>
                | <EXPR> diagonal <EXPR>
                | doble_diagonal <OPC_PATH> <EXPR>
                | diagonal <OPC_PATH> <EXPR>
                | <EXPR> diagonal_dos_pts 
                | diagonal_dos_pts

        <OPC_PATH> ::= id 
                | arroba id

        <ORDEN> ::= last par_izq par_der 
                | position par_izq par_der 

        <ARITMETICAS> ::= <EXPR> mas <EXPR>   
                | <EXPR> menos EXPR 
                | <EXPR> mul <EXPR>
                | <EXPR> div <EXPR> 
                | <EXPR> mod <EXPR>

        <RELACIONALES> ::= <EXPR> mayor <EXPR>
                | <EXPR> menor <EXPR>
                | <EXPR> mayor_igual <EXPR>
                | <EXPR> menor_igual <EXPR> 
                | <EXPR> igual <EXPR>
                | <EXPR> diferencia <EXPR>

        <LOGICAS> ::= <EXPR> or <EXPR>
                | <EXPR> and <EXPR>

        <ATRIBUTO_PREDICADO> ::= arroba <OPC>
                        | any_atributo
                        | arroba id

        <VALORES> ::= integer
                | double
                | string 
                | id
                | punto
                | dos_pts


## Gramatica Descendente<a name="id4"></a>

        <S> ::= <INSTRUCCIONES> 

        <INSTRUCCIONES> ::= <INSTRUCCION> <INSTRUCCIONES> 

        <INSTRUCCIONES> ::= epsilon

        <INSTRUCCION> ::= <INSTRUCCION> o <RUTA> <FILTROS>
                | <RUTA> <FILTROS>

        <RUTA> ::=  <ATRIBUTO_DESCENDIENTES>
                | <DESCENDIENTES_NODO>
                | <DESCENDIENTE>
                | <PADRE>
                | <ATRIBUTO_NODO>
                | <HIJOS> 
                | <RAIZ>
                | <NODO_ACTUAL>
                | <PADRE_NODO>
                | <ANY> 
                | id 
                | <EJES> <OPC_EJES> 

        <ATRIBUTO_DESCENDIENTES> ::= diagonal_diagonal_arroba_ast <OPC>

        <DESCENDIENTES_NODO> ::= diagonal_diagonal_ast <OPC>

        <DESCENDIENTE> ::= doble_diagonal <OPC>

        <PADRE> ::= diagonal_dos_pts <OPC>

        <ATRIBUTO_NODO> ::= diagonal_arroba_ast <OPC>

        <HIJOS> ::= diagonal_ast <OPC>

        <RAIZ> ::= diagonal <OPC>

        <NODO_ACTUAL> ::= punto

        <PADRE_NODO> ::= dos_pts 

        <ANY> ::= mul 

        <EJES> ::= ancestor bi_pto
                | ancestor menos or menos self bi_pto
                | attribute bi_pto
                | child bi_pto
                | descendant bi_pto
                | descendant menos or self bi_pto 
                | following bi_pto
                | following menos sibling bi_pto
                | namespace bi_pto
                | parent bi_pto
                | preceding bi_pto
                | preceding menos sibling bi_pto
                | self bi_pto

        <OPC_EJES> ::= id
                |  mul         
                |  <NODO_FUNCION>

        <NODO_FUNCION> ::= node 
                | text 

        <OPC>  ::=  epsilon
                | <NODO_FUNCION>
                | <PASOS>

        <PASOS> ::= <ANY_ATRIBUTO>
                | <ATRIBUTO> 

        <ANY_ATRIBUTO> ::= any_atributo 

        <ATRIBUTO> ::= arroba id

        <FILTROS> ::= <LISTA_PREDICADO>   

        <LISTA_PREDICADO> ::= <PREDICADO> <LISTA_PREDICADO> 

        <LISTA_PREDICADO> ::= epsilon

        <PREDICADO>  ::= cor_izq  <EXPR>  cor_der

        <EXPR> ::= <ATRIBUTO_PREDICADO>
                | <ORDEN> 
                | <VALORES>
                | <EJES> <OPC_EJES>
                | <PREDICADO>
                | <NODO_FUNCION>
                | <OPERACIONES> 
                | <PATH>
                | par_izq <EXPR> par_der

        <OPERACIONES> ::= <EXPR> <OPER>

        <OPER> ::= mas <EXPR> 
                | menos <EXPR> 
                | mul <EXPR>
                | div <EXPR>
                | mod <EXPR> 
                | or <EXPR>
                | and <EXPR> 
                | mayor <EXPR> 
                | menor <EXPR> 
                | mayor_igual <EXPR> 
                | menor_igual <EXPR> 
                | igual  <EXPR> 
                | diferencia  <EXPR> 
                | doble_diagonal <EXPR>
                | diagonal <EXPR>
                | diagonal_dos_pts 

        <PATH> ::= doble_diagonal <OPC_PATH> <EXPR>
                | diagonal <OPC_PATH> <EXPR>
                | diagonal_dos_pts

        <OPC_PATH> ::= id 
                | arroba id

        <ORDEN> ::= last par_izq par_der 
                | position par_izq par_der 

        <ATRIBUTO_PREDICADO> ::= arroba <OPC>
                        | any_atributo
                        | arroba id

        <VALORES> ::= integer 
                | double
                | string 
                | id
                | punto
                | dos_pts


