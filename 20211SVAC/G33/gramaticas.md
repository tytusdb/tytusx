#### UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
#### FACULTAD DE INGENIERIA
#### ORGANIZACIÓN DE LENGUAJES Y COMPILADORES 2
#### ESCUELA DE VACIONES JUNIO 2021

---
# MANUAL TÉCNICO
---

### Gramatica BNF ascendente XML
```
V = { <START>, <ENCODING>, <RAICES>, <RAIZ>, <OBJETO>, <LATRIBUTOS>, <ATRIBUTOS>, <ATRIBUTO>, <OBJETOS>, <LISTA_ID_OBJETO>, <LISTA_VALORES>, <CARACTERES> }

T = { "&lt;": 'lesst', "&gt;": 'greatert', "&amp;": 'ampersand',"&apos;": 'apostro', "&quot;": 'quotation', 'null', 'true', 'false', 'xml', 'version', 'encoding', "+": 'plus', "-": 'minus', "*": 'times', "/": 'div', "%": 'mod', "<=": 'lte', ">=": 'gte', "<": 'lt', ">": 'gt', "=": 'asig', "==": 'equal', "!=": 'nequal', "&&": 'and', "||": 'or', "!": 'not', "?": 'interC', ";": 'semicolon', ",": 'coma', ".": 'period', "'": 'apost', "(": 'lparen', ")": 'rparen', "{": 'lcurly', "}": 'rcurly', "[": 'lbracket';, "]": 'rbracket', 'DoubleLiteral', 'IntegerLiteral', 'identifier', 'StringLiteral', 'CharLiteral' }

S = <START>

P = {
<START> ::= <ENCODING> <RAICES> 

<ENCODING> ::=  lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt

<RAICES> ::=  <RAICES> <RAIZ>
	        | <RAIZ>

<RAIZ> ::= <OBJETO>

<OBJETO> ::= lt identifier <LATRIBUTOS> gt <OBJETOS> lt div identifier gt
           | lt identifier <LATRIBUTOS> gt <LISTA_ID_OBJETO> lt div identifier gt
           | lt identifier <LATRIBUTOS> div gt

<LATRIBUTOS> ::= <ATRIBUTOS>
               | epsilon
<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>
              | <ATRIBUTO>

<ATRIBUTO> ::= identifier asig StringLiteral

<OBJETOS> ::= <OBJETOS> <OBJETO>
	        | <OBJETO>

<LISTA_ID_OBJETO> ::=  <LISTA_ID_OBJETO> <LISTA_VALORES>
                     | <LISTA_VALORES>

<LISTA_VALORES> ::= IntegerLiteral
                  | DoubleLiteral
                  | identifier
                  | StringLiteral
                  | CharLiteral
                  | xml
                  | <CARACTERES>

<CARACTERES>| ::= plus 
               | minus       
               | times       
               | div         
               | mod         
               | asig        
               | equal       
               | nequal      
               | and         
               | or          
               | not         
               | semicolon   
               | lparen      
               | rparen      
               | lcurly      
               | rcurly      
               | lbracket    
               | rbracket    
               | period      
               | coma        
               | lesst       
               | greatert    
               | ampersand   
               | apostro     
               | quotation   
}
```

### Gramatica BNF ascendente XPATH
``` 
V = { <INICIO>, <INICIALES>, <DIAGONALES>, <DERIVACIONDIAGONAL>, <DERIVADOSLIMITADO>, <DERIVADOS>, <AXES>, <NODETEST>, <PREDICATE>, <EXPRESION>, <ATRIBUTO> } 

T = { "tk_decimal", "tk_entero", "tk_node", "tk_child", "tk_descendant", "tk_descendatOr", "tk_ancestor", "tk_ancestorOr", "tk_attribute", "tk_following", "tk_followingSi", "tk_parent", "tk_preceding", "tk_precedingSi", "tk_self", "tk_text", "tk_position", "tk_last", "tk_div", "tk_and", "tk_or", "tk_mod", "|": "tk_barra", ".": "tk_punto", "/": "tk_diagonal", "*": "tk_asterisco", ":": "tk_dosPuntos", "+": "tk_mas", "-": "tk_menos", "<=": "tk_menorIgual", ">=": "tk_mayorIgual", "<": "tk_menor", ">": "tk_mayor", "!=": "tk_distinto", "=": "tk_igual", "[": "tk_llaveA", "]": "tk_llaveC", "@": "tk_arroba", "(": "tk_parA", ")": "tk_parC", "tk_stringtexto", "tk_identificador" }

S = <INICIO>

P = {
<INICIO> ::= <INICIO> tk_barra <INICIALES> 
    | <INICIALES>

<INICIALES> ::= tk_punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVACIONDIAGONAL>
              | tk_identificador <PREDICATE> <DERIVACIONDIAGONAL>
              | tk_diagonal <DERIVADOS> <DERIVACIONDIAGONAL> 
              | tk_diagonal tk_diagonal <DERIVADOS> <DERIVACIONDIAGONAL>   
              | tk_asterisco <PREDICATE> <DERIVACIONDIAGONAL>
              | tk_node tk_parA tk_parC  <PREDICATE> <DERIVACIONDIAGONAL>

<DIAGONALES> ::= tk_diagonal 
               | tk_diagonal tk_diagonal

<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL> 
                       | epsilon

<DERIVADOSLIMITADO> ::= tk_identificador <PREDICATE> 
                      | tk_asterisco <PREDICATE> 
                      | tk_node tk_parA tk_parC <PREDICATE> 
                      | tk_arroba <ATRIBUTO>
                      | <AXES>

<DERIVADOS> ::= tk_punto 
              | tk_punto tk_punto 
              | <DERIVADOSLIMITADO> 

<AXES> ::= tk_child tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_descendant tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_descendatOr tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_ancestor tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_ancestorOr tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_attribute tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_following tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_followingSi tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_parent tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_preceding tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_precedingSi tk_dosPuntos tk_dosPuntos <NODETEST>
         | tk_self tk_dosPuntos tk_dosPuntos <NODETEST>

<NODETEST> ::= tk_asterisco <PREDICATE>
             | tk_node tk_parA tk_parC <PREDICATE>
             | tk_identificador <PREDICATE>
             | tk_text tk_parA tk_parC

<PREDICATE> ::=  tk_llaveA <EXPRESION> tk_llaveC
               | epsilon

<EXPRESION> ::= <EXPRESION> tk_mas <EXPRESION>
              | <EXPRESION> tk_menos <EXPRESION>
              | <EXPRESION> tk_asterisco <EXPRESION>
              | <EXPRESION> tk_div <EXPRESION>
              | <EXPRESION> tk_mod <EXPRESION>
              | <EXPRESION> tk_menor <EXPRESION>
              | <EXPRESION> tk_mayor <EXPRESION>
              | <EXPRESION> tk_menorIgual <EXPRESION>
              | <EXPRESION> tk_mayorIgual <EXPRESION>
              | <EXPRESION> tk_igual <EXPRESION>
              | <EXPRESION> tk_distinto <EXPRESION>
              | <EXPRESION> tk_or <EXPRESION>
              | <EXPRESION> tk_and <EXPRESION>
              | tk_entero 
              | tk_decimal
              | tk_arroba <ATRIBUTO>
              | tk_identificador
              | tk_position tk_parA tk_parC   
              | tk_last tk_parA tk_parC
              | tk_stringTexto
              | tk_parA <EXPRESION> tk_parC

<ATRIBUTO> ::= tk_asterisco 
             | tk_identificador
             | tk_node tk_parA tk_ParC
}
```