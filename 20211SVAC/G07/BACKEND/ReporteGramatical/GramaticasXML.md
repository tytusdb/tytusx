# Gramaticas BNF - XML 3.1

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
<reservadas> ::= <?xml version | ?> | encoding | standalone

~~~

### Caracteres especiales

~~~
<caracter_especial> ::= <IGUAL> | <BLANCO> |
    <MAYORAB> |
    <MENORAB> |
    <MAYORABD> |
    <MENORABD> |
    <ID> |
    <CADENA> |
    <CARACTER> |
    <COMENTARIO_MULTILINEA> |
    <COMENTARIO_SIMPLE> 

<IGUAL> = =
<MAYORAB> = >
<MENORAB> = <
<MAYORABD> = />
<MENORABD> = </

~~~

## Gramatica Descendente 
    
~~~
<<INICIO>> ::= <PROLOGO> <EOF> 
			
<PROLOGO> ::= <?xml version <VERSION> <CODIFICACION> <DEPENDENCIA> ?> <RAIZ>
            | <RAIZ>

<VERSION> ::= = <cadena>

<CODIFICACION> ::= encoding = <cadena>
                |

<DEPENDENCIA> ::= standalone = <cadena>
                |

<RAIZ> ::= = <ETIQUETA>

<ETIQUETA> ::=  <ETIQUETA_UNICA>
                | <APERTURA> <CONTENIDO> <CIERRE>

<ETIQUETA_UNICA> ::= < <etiqueta> <ATRIBUTOS> />

<APERTURA> ::= < <etiqueta> <ATRIBUTOS> >

<ATRIBUTOS> ::= <ATRIBUTO> <ATRIBUTOS>
                |

<ATRIBUTO> ::= <etiqueta> = <cadena>

<CONTENIDO> ::= <cadena> <CONTENIDO>
                | <numero> <CONTENIDO>
                | <ETIQUETA> <CONTENIDO>                
                | <CARACESPECIAL> <CONTENIDO>
                |

<CARACESPECIAL> ::= &lt;
                | &gt;
                | &amp;
                | &apos;
                | &quot;

<CIERRE> ::= </ <etiqueta> >

~~~

## Gramatica Ascendente

~~~

<<INICIO>> ::= <PROLOGO> <EOF> 
			
<PROLOGO> ::= <?xml version <VERSION> <CODIFICACION> <DEPENDENCIA> ?> <RAIZ>
            | <RAIZ>

<VERSION> ::= = <cadena>

<CODIFICACION> ::= encoding = <cadena>
                |

<DEPENDENCIA> ::= standalone = <cadena>
                |

<RAIZ> ::= = <ETIQUETA>

<ETIQUETA> ::=  <ETIQUETA_UNICA>
                | <APERTURA> <CONTENIDO> <CIERRE>
                | <APERTURA> <CIERRE>                

<ETIQUETA_UNICA> ::= < <etiqueta> <ATRIBUTOS> />

<APERTURA> ::= < <etiqueta> <ATRIBUTOS> >
                |< <etiqueta> >

<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>
                | <ATRIBUTO>

<ATRIBUTO> ::= <etiqueta> = <cadena>

<CONTENIDO> ::= <CONTENIDO> <LISTACONT>
                | <LISTACONT>

<LISTACONT> ::= <cadena> 
                | <numero> 
                | <ETIQUETA>                 
                | <CARACESPECIAL> 

<CARACESPECIAL> ::= &lt;
                | &gt;
                | &amp;
                | &apos;
                | &quot;

<CIERRE> ::= </ <etiqueta> >

~~~