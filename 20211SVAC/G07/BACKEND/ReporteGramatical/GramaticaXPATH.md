# Gramaticas BNF - XPATH 3.1

Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Curso: 781 Organización de Lenguajes y Compiladores 2  
Junio 2021
Ing. Luis Espino | Aux. Haroldo Arias
Grupo 7

## Índice
- [Descripcion](#descripcion)
- [Elementos Lexicos](#elementos-lexicos)
- [Gramatica Descendente](#gramatica-descendente) 
- [Gramatica Ascendente](#gramatica-ascendente)

## Descripcion
 Ya que se concluyo que Jison, es una herramienta para construir analizadores de forma ascendente. Una de las ventajas mas destacables de usar una gramatica ascendente recursiva por la izquierda es que no necesita de producciones vacias como lo hacemos con la descendente, esto a veces puede incurrir en fallos a la hora de usar producciones vacias en lo que haria que nuestro analizador recurriera a mas bugs.

## Elementos Lexicos

### Palabras reservadas
~~~
<reservadas> ::= or | and | mod | div
            node | text | namespace-node |
            ancestor-or-self | ancestor |
            attribute | child | descendant-or-self |
            descendant | following-sibling | following |
            namespace | parent | preceding-sibling |
            preceding | self | node | last | 
            position 
~~~

### Caracteres especiales

~~~
<caracter_especial> ::= <BARRAOR> | <BLANCO> | <CADENA> | <CARACTER> |
    <IDENTIFICADOR> |
    <MAS> |
    <MENOS> |
    <POR> |
    <INDIFERENTE> |
    <IGUAL> |
    <MENORIGUAL> |
    <MENOR> |
    <MAYORIGUAL> |
    <MAYOR> |
    <CUATROPUNTOS> |
    <DOBLEDIAGONAL> |
    <DIAGONAL> |
    <ARROBA> |
    <DOSPUNTOS> |
    <PARENTIZQ> |
    <PARENTDER> |
    <CORCHEIZQ> |
    <CORCHEDER> |
    <PUNTO>

    <BARRAOR> = |
    <MAS> = +
    <MENOS> = -
    <POR> = * 
    <INDIFERENTE> = !=
    <IGUAL> = =
    <MENORIGUAL> = <=
    <MENOR> = <
    <MAYORIGUAL> = >=
    <MAYOR> = >
    <CUATROPUNTOS> = ::
    <DOBLEDIAGONAL> = //
    <DIAGONAL> = /
    <ARROBA> = @
    <DOSPUNTOS> = ..
    <PARENTIZQ> = (
    <PARENTDER> = )
    <CORCHEIZQ> = [
    <CORCHEDER> = ]
    <PUNTO> = . 

~~~

## Gramatica Descendente 
    
~~~
<<INICIO>> ::= <ELEMENTO> <EOF> 
			
<ELEMENTO> ::= <EXPRESION> <ELEMENTO_P>

<ELEMENTO_P> ::= | <EXPRESION> <ELEMENTO_P>

<EXPRESION> ::= <RESERVA> <RESERVA_P>
                | <SIMBOLOS> <CAJETIN> <SIMBOLOS_P>
                | <identificador> <CAJETIN> <SIMBOLOSSECU> <SIMBOLOSSECU_P>
                | <identificador>
                | * <CAJETIN>

<SIMBOLOS> ::=    / <CONTENIDODOS>
                | // <CONTENIDODOS>
                | @ <ARROPROD>
                | .. <PRODUCT> <CONTENIDODOS>
                | . <PRODUCT> <CONTENIDODOS>
                | * <CONTENIDO>

<SIMBOLOS_P> ::=  <EXPRESION>
                |

<SIMBOLOSSECU> ::= / <CONTENIDODOS>
                | // <CONTENIDODOS>
                | @ <ARROPROD>
                | .. <PRODUCT> <CONTENIDODOS>
                | * <CONTENIDO>

<SIMBOLOSSECU_P> ::=  <EXPRESION>
                |

<RESERVA> ::= ancestor <ITEMRESERVA>
            | ancestor-or-self <ITEMRESERVA>
            | attribute <ITEMRESERVA>
            | child  <ITEMRESERVA>
            | descendant-or-self  <ITEMRESERVA>
            | descendant <ITEMRESERVA>
            | following-sibling <ITEMRESERVA>
            | following <ITEMRESERVA>
            | namespace <ITEMRESERVA>
            | parent <ITEMRESERVA>
            | preceding-sibling <ITEMRESERVA>
            | preceding <ITEMRESERVA>
            | self <ITEMRESERVA>
            | last  ( )
            | position ( ) 
            | text ( )

<RESERVA_P> ::=  <EXPRESION>
                |

<PRODUCT> ::=  /
                | //

<ARROPROD> ::=  *
                | <identificador>

<CONTENIDO> ::= <identificador>

<CONTENIDODOS> ::= @ <ARROPROD>
                    | <identificador>
                    | *
                    | ..
                    | <RESERVA>

<CONTENIDO_P> ::=  <EXPRESION>
                |

<CAJETIN> ::=  [ <PREDICADO> ]
                |

<PREDICADO> ::= <OPERACIONES>

<OPERACIONES> ::= <ITEMINICIO> <OPERADOR> <ITEMFINAL> <OPERACIONES_L>
                    | <ITEMINICIO>

<ITEMINICIO> ::=  <RESERVA>
                | <identificador>
                | @ <ARROPROD>
                | <numero>
                | .

<OPERADOR> ::=  +
                | -
                | *
                | div
                | =
                | !=
                | <=
                | <
                | >=
                | >
                | mod

<ITEMFINAL> ::=  <RESERVA>
                | <caracter>
                | <cadena>
                | <identificador>                
                | @ <ARROPROD>
                | <numero>

<OPERACIONES_L> ::= or <OPERACIONES>
                | and <OPERACIONES>
                |

<ITEMRESERVA> ::= :: <SIMBOLOSTERC>
                |

<SIMBOLOSTERC> ::= <identificador>
                | *
                | <RESERVA>
                | / <CONTENIDODOS>
                | // <CONTENIDODOS>
                | @ <ARROPROD>
                | .. 

~~~

## Gramatica Ascendente

~~~
<<INICIO>> ::= <ELEMENTO> <EOF> 
			
<ELEMENTO> ::= <ELEMENTO> <ELEMENTO_P>
               | <ELEMENTO_P> 

<ELEMENTO_P> ::= | <EXPRESION> 
                | <ELEMENTO_P>

<EXPRESION> ::= <EXPRESION> <CONTENIDO>
                | <SIMBOLOS>

<SIMBOLOS> ::=    / 
                | //
                | @ <ARROPROD>
                | .. 
                | . 
                | *
                | <identificador>
                | <numero>
                | <RESERVA>

<ARROPROD> ::=  *
                | <identificador>

<CONTENIDO> ::= [ <COMPLEMENTO> ]
                | [ <EXPRESION> ]
                | [  ]

<COMPLEMENTO> ::=  <EXPRESION> <PREDICADO>

<PREDICADO> ::=  <OPERACIONES>

<OPERACIONES> ::=  <OPERADOR> <MASSENTENCIA>
                    | <OPERADOR>

<OPERADOR> ::=  +
                | -
                | *
                | div
                | =
                | !=
                | <=
                | <
                | >=
                | >
                | mod

<MASSENTENCIA> ::=  <ITEMFINAL> or <COMPLEMENTO>
                | <ITEMFINAL> and <COMPLEMENTO>
                | <ITEMFINAL>

<ITEMFINAL> ::= <RESERVA>
                    | <caracter>
                    | <cadena>
                    | <identificador>
                    | @ <ARROPROD>
                    | <numero>
                    | /
                    | //
                    | ..
                    | .
                    | *

<RESERVA> ::= ancestor <ITEMRESERVA>
            | ancestor-or-self <ITEMRESERVA>
            | attribute <ITEMRESERVA>
            | child  <ITEMRESERVA>
            | descendant-or-self  <ITEMRESERVA>
            | descendant <ITEMRESERVA>
            | following-sibling <ITEMRESERVA>
            | following <ITEMRESERVA>
            | namespace <ITEMRESERVA>
            | parent <ITEMRESERVA>
            | preceding-sibling <ITEMRESERVA>
            | preceding <ITEMRESERVA>
            | self <ITEMRESERVA>
            | last  ( )
            | position ( ) 
            | text ( )

<ITEMRESERVA> ::= :: <SIMBOLOS>
                |


~~~