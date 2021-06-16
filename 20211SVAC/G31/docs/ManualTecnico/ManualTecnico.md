# Manual Técnico TytusX - Grupo 31 

## **Integrantes**
- Aracely Jacqueline Méndez González     201800491 
- Stefany Samantha Abigail Coromac Huezo 201801182

## **Contenido**
- [Descripción General](#idDescripcion)
- [Framework](#idFramework)
- [Estructura del Proyecto](#idEstructura)
- [Gramática Ascendete XML](#idAscXML)
- [Gramática Descendente XML](#idDescXML)
- [Gramática Ascendente XPATH](#idAscXPATH)
- [Gramática Descedente XPATH](#idDescXPATH)

## Descripción General <a name="idDescripcion"></a>

Tytus X es un administrador de bases de datos documental de codigo abierto. Soporta archivos de tipo XML y maneja los lenguajes de consultas de XPath y XQuery.  

## Framework <a name="idFramework"></a>

## Estructura del Proyecto <a name="idEstructura"></a>

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
```

## Gramática Descendente XPATH <a name="idDescXPATH"></a>

```bash
```
