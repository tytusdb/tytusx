# Gramática Ascendente XML
Las siguientes gramaticas moldean un XML, un XML es el acrónimo de Extensible Markup Language, es decir, es un lenguaje de marcado que define un conjunto de reglas para la codificación de documentos
```xml

<inicio> ::=  <encoding> <etiqueta> 

<encoding> ::=  <INI> <INTERROGAC> <XML> <lista_atributos> <INTERROGAC> <FIN>

<etiqueta> ::=  <INI> <ID> <FIN> <lista_nodos> <INI> <CIERRE> <ID> <FIN> <EOF> 

<lista_nodos> ::= <lista_nodos><nodo>
                | <nodo> 

<nodo> ::=  <INI> <ID> <FIN> <lista_valor> <INI> <CIERRE> <ID> <FIN>
          | <INI> <ID> <FIN> <lista_nodos> <INI> <CIERRE> <ID> <FIN>
          | <INI> <ID> <lista_atributos> <FIN> <lista_valor> <INI> <CIERRE> <ID> <FIN>
          | <INI> <ID> <lista_atributos> <FIN> <lista_nodos> <INI> <CIERRE> <ID> <FIN>
          | <INI> <ID> <lista_atributos> <CIERRE> <FIN>
  
<lista_atributos> ::=  <lista_atributos> <atributos>
                       | <atributos>
  
<atributos> : <ID> <IGUAL> <valor>
  
<valor> ::=  <CADENA>
          |  <NUM> 

<lista_valor> ::=  <lista_valor> <ID>
                | <lista_valor> <NUM>
                | <ID>
                | <NUM> 


```
# Gramática Descendente XML
```xml
<inicio> ::= <encoding> <etiqueta>

<encoding> ::= <INI> <INTERROGAC> <XML> <lista_atributos> <INTERROGAC> <FIN> 

<etiqueta> ::= <INI> <ID> <FIN> <lista_nodos> <INI> <CIERRE> <ID> <FIN> EOF 
                

<lista_nodos> ::= <lista_nodos> <nodo>
                | <nodo> 


<nodo> ::= <INI> <ID> <opcion_nodo>

<opcion_nodo> ::= <cierre_nodo>
                | <lista_atributos> <cierre_nodo>

<cierre_nodo> ::= <FIN> <cuerpo_nodo>
                | <CIERRE> <FIN>

<cuerpo_nodo> ::= <lista_valor> <INI> <CIERRE> <ID> <FIN> 
                | <lista_nodos> <INI> <CIERRE> <ID> <FIN>

<lista_atributos> ::= <atributos> <lista_atributos>
                  | <atributos>

<atributos> ::= <ID> <IGUAL> <valor>

<valor> ::= <CADENA>
        | <NUM>

<lista_<valor> ::= <tipo_valor> <lista_<valor>>
               | <tipo_valor>

<tipo_valor> ::= <ID>
               | <NUM>
```
