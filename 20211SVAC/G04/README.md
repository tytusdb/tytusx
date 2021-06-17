**Tytus**

**Manual para el usuario**

Usuario correspondiente gracias por utilizar neutra app-web TaytusX en su versión 1.0, esta basado en un reconocedor estructura de 
XML donde también puede realizar distintas consultas tipo XPATH, cuando usted ingrese tendrá la siguiente visualización inicial.

![imagen](https://user-images.githubusercontent.com/41486403/122272160-79961b80-ce9d-11eb-9548-3fa73ff8fe99.png)


En la siguiente area podra cargar un archivo de entrada para la entrada (XML)

![abrirArchivo](https://user-images.githubusercontent.com/41486403/122273006-35574b00-ce9e-11eb-867a-615441e5b032.gif)

Despues de esto podra realizar un consulta desdeada con una forma de XPATH la siguiente area de consulta es


![imagen](https://user-images.githubusercontent.com/41486403/122273372-9bdc6900-ce9e-11eb-85d1-0caf156d908f.png)


Al momento de ingresar la estructura del xml podra analizar y ver una tabla de simbolos la cual sera de la siguiente manera


![tablaSimbolos](https://user-images.githubusercontent.com/41486403/122274492-d397e080-ce9f-11eb-80ac-7cadd16c805f.gif)


Si ingresa una consulta y esta tiene un resultado existoso se mostrara el resultado de dicha consulta de la siguiente manera


![Screen record from 2021-06-16 12 40 35](https://user-images.githubusercontent.com/41486403/122274724-1d80c680-cea0-11eb-8af2-57c474ea0a98.gif)


Luego de esto, si por algun motivo se tiene un error sintactco, lexico o semantico tanto en la entrada del xml y del expath se 
mostrar en la tabla se la siguiente manera


![errores](https://user-images.githubusercontent.com/41486403/122275595-1efebe80-cea1-11eb-9a4d-8c74de392d7f.gif)


Para la entrada de estrucutra de xml se debe seguir el siguiente formato

Debe iniciar con la configuracion del archivo la cual es la siguiente
**Estructura XML**

**Prologo**
<?xml version="1.0" encoding=E0?>
  Donde E0 es el tipo de encodificacion, los formatos soportados son los siguientes: ASCII e ISO 8859-1.
 
**Etiquetas**
<E1>E2</E1>
  Donde E1 es cualqueier identificador de para dicha etiqueta pude ser una letra seguido de mas letras o numeros o gion bajo o  
  alto, todo esto no puede contener espacios, dentro de <E1>, tambien puede agregar atributos para dicha etiqueta.
  En E2, podra agregar mas etiquetas o cualquier tipo de texto, algunos caracteres no seran reconocidos, para esto debera usar
  esta expresion para poder ingrear el caracter desado

<E1/>
  Donde E1 es cualqueier identificador de para dicha etiqueta pude ser una letra seguido de mas letras o numeros o gion bajo o  
  alto, todo esto no puede contener espacios, dentro de <E1/>, tambien puede agregar atributos para dicha etiqueta. Esta se conoce 
  como etiqueta vacia.  
  
**Estructura XPATH**
  
  Debido a que es extensa la documentacion y funciones que se tomaron en cuenta se presenta el siguiente link, en donde se explican 
  las funcionalidades basicas: https://www.w3schools.com/xml/xpath_intro.asp
  
  
**REPORTERIA**
  
  Para el area de reportes se tienen los siguientes: reporteGramatical y reporte de CST tanto ascendente como descendente.
  Estos reportes son basado en la entrada XML, los cuales se presentan de la siguiente manera
  
  **Reporte gramatical**
  
  ![reporteGramatical](https://user-images.githubusercontent.com/41486403/122278373-10fe6d00-cea4-11eb-8c80-3d5991f547c9.gif)

  **Reporte CST**
  
  ![reporteCST](https://user-images.githubusercontent.com/41486403/122278419-1bb90200-cea4-11eb-90b8-1d523abab2f4.gif)

  
  
**-----------Manual para el tecnico-----------**
  
  
  Manual tecnico
Requisitos minimos

    • Tener coneccion a internet.
    • Ram minima de 4gb para consultas, para poder ver reporte de cst del xml cuando estos son muy grandes, puede que tenga ciertos 
        lag al momento de que estos sean generadosa.
    • Navegador Mozilla FireFox 85.0.2 (64bit).


	En este manual se proporciona la información para que se puedan hacer correcciones o simplemente saber como funcionan los 
  cimientos principales para la aplicación pueda funcionar de manera adecuada. Se comenzaran por las gramáticas que reconoce la 
  estructura de la entrada.

En este proyecto se usaron 4 analizadores, 2 de forma ascendente y los mismos convertidos para un análisis descendente, los 
  primeros dos son para reconocer estructuras XML y XPATH, los cuales incluyen en el XML la estructura básica con atributos y 
  etiqueta vacías con reconocimiento de comentarios, para el XPATH se incluyeron las funciones nativas, consultas simples, con 
  accesores tipo (/, //, ., .., *), todas estas estructuras fueron tomadas de la siguiente pagina:

https://www.w3schools.com/xml/default.asp, la gramatica de XML fue delimitada, la gramatica de XPATH no fue delimitada.

Reconocedores léxicos XML (Forma expresion regular)
A continuación se presentan las expresiones lexicas que se utilizaron para reconocer la entrada y mandar los tomentos y lexemas del 
  archivo de entrada para el posterior análisis sintáctico, semántico de la entrada de xml.

Las siguientes expresiones recnocen a patrones de un solo carácter que pertenece token 1 a 1 con lexemas y son los siguientes
< | > | / | = | !


Los siguientes patrones para lexemas son los siguientes

Se utilizaron estados para reconocer comentarios y textos en las etiquetas, los estados a utilizar fueron los siguientes, textTag, 
  comment.

La siguiente expresion regular reconoce el patron para comentario e ignorar espacios en blanco.
\s+                       


Las siguientes expresiones con para reconocer los textos dentro de las etiquetas.
La salida para este estado al inicial es <.
<textTag>"<"                    
<textTag>\s+                    
<textTag>"&lt;"                 
<textTag>"&gt;"                 
<textTag>"&amp;"                
<textTag>"&apos;"               
<textTag>"&quot;"               
<textTag>[^<&]+                 
<textTag><<EOF>>                



Las siguientes expresiones son los estados para los comentarios.
<comment>">"                    
<comment>\s+                    
<comment>"--"                   
<comment>[^-]+                  



Las siguientes expresiones son las de palabras reservadas.
"xml”| "version" | "encoding" | "\"UTF-8\"" | "\"ASCII\"" |  "\"ISO-8859-1\""                    



La siguiente expresión reconoce cadenas tipo string y las retorna como value.
(["][^"\""]+["])|(['][^']+['])  



La siguiente expresión es para detectar identificadores
\w+






Reconocimiento de la gramática de XML.
Las siguientes reglas gramaticales definen la estructura de que debe cumplir la entrada de XML, las cuales sirven para luego hacer las distintas estructuras para el análisis correspondiente y hacer las funcionalidades correspondientes.


START
    : XML_STRUCTURE EOF
;

XML_STRUCTURE
    : PROLOG NODES
    | COMMENT PROLOG NODES
;

PROLOG
    : less_than question_mark xml version assign value encoding assign TYPE_ENCODING 	question_mark greater_than TEXTTAG
    | less_than question_mark xml encoding assign TYPE_ENCODING version assign value 	question_mark greater_than TEXTTAG
;

NODES
    : NODES NODE
    | NODE
;

NODE
    : OPENING_TAG NODES CLOSING_TAG
    | OPENING_TAG CLOSING_TAG
    | EMPTY_TAG
    | COMMENT
;

OPENING_TAG
    : less_than IDENTIFIER greater_than TEXTTAG
    | less_than IDENTIFIER ATTRIBS greater_than TEXTTAG
;

CLOSING_TAG
    : less_than slash IDENTIFIER greater_than TEXTTAG
;

EMPTY_TAG
    : less_than IDENTIFIER slash greater_than TEXTTAG
    | less_than IDENTIFIER ATTRIBS slash greater_than TEXTTAG
;

ATTRIBS
    : ATTRIBS ATTRIB
    | ATTRIB
;



ATTRIB
    : IDENTIFIER assign value
;

TEXTTAG
    : TEXT_TAG_CHARS
    |
;

TEXT_TAG_CHARS
    : TEXT_TAG_CHARS TEXT_TAG_CHAR
;

TEXT_TAG_CHAR
    : lt
    | gt
    | amp
    | apos
    | quot
    | textTag
;

IDENTIFIER
    : identifier
    | xml
    | version
    | encoding
;

COMMENT
    : less_than exclamation_mark doble_guion textComment doble_guion greater_than
;

TYPE_ENCODING
    : utf
    | iso
    | ascii
;






Producciones léxicas para XPATH

A continuación se presentan las expresiones lexicas que se utilizaron para reconocer la entrada y mandar los tomentos y lexemas del 
  archivo de entrada para el posterior análisis sintáctico, semántico de la entrada de patata.


La siguiente expresion es para reconocer e ignorar los espacios en blanco.
\s+






Las siguientes expresiones reconocen a patrones de un solo carácter que pertenece token 1 a 1 con lexemas y son los siguientes

/ | . | @ | ( | ) |  : 



Las siguientes expresiones son tomadas como palabras reservadas en el lenguaje
son funciones en Xpath

"node" | "text" | "last" | "position"



Las siguientes expresiones son tomadas como palabras reservadas esto es para los ejes de Xpath

"ancestor"
"ancestor-or-self"
"attribute"
"child"
"descendant"
"descendant-or-self"
"following"
"following-sibling"
"parent"
"preceding"
"preceding-sibling"
“self"




Las siguientes expresiones son para operadores aritméticos, lógicos y relacionales.

“|” | "+"  | "-" |  "*" | "div" "=" | "!=" | "<" | "<="  | ">" | ">=" | "or" | "and"| "mod" | "(" | ")" | "[" | "]" 



Las siguientes expresión reconoce dígitos.

(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?))?



Las siguientes expresión reconoce identificadores.
\w+



Las siguientes expresión reconoce cadenas tipo string.
"\""[^"\""]*"\""

Gramática de XPATH
Las siguientes reglas gramaticales definen la estructura de que debe cumplir la entrada de XML, las cuales sirven para luego hacer 
  las distintas estructuras para el análisis correspondiente y hacer las funcionalidades correspondientes.


INIT
    : CONSULTAS_XPATH eof
    | error eof
;


CONSULTAS_XPATH
    : CONSULTAS_XPATH operador_o CONSULTA_XPATH         
    | CONSULTA_XPATH                                    
    | corchete_abierto error corchete_cerrado
;

CONSULTA_XPATH
    : RELATIVA                  
    | EXPRESIONES_RUTA          
    | PUNTOS EXPRESIONES_RUTA
;

EXPRESIONES_RUTA
    : EXPRESIONES_RUTA EXPRESION_RUTA       
    | EXPRESION_RUTA                        
    | error operador_o
;

EXPRESION_RUTA
    : RELATIVA DIAGONALES ACCESORES
    | error identificador
;

RELATIVA :                                  
    | identificador OPCIONAL_PREDICADO      
;

DIAGONALES
    : diagonal diagonal                     
    | diagonal                              
;

PUNTOS : punto              
    | punto punto           
;

ACCESORES
    : ID OPCIONAL_PREDICADO             
    | ATRIBUTO OPCIONAL_PREDICADO       
    | PUNTOS OPCIONAL_PREDICADO         
    | multiplicacion                    
    | NODE                              
    | TEXT                              
;

TEXT
    : text parentesis_abierto parentesis_cerrado 
;

NODE : node parentesis_abierto parentesis_cerrado 
;

ATRIBUTO
    : arroba identificador          
    | arroba multiplicacion         
;

ID : identificador      
    | EJE
;

EJE : EJES dos_puntos dos_puntos ACCESORES_EJE
;

ACCESORES_EJE : identificador
    | NODE
    | TEXT
    | multiplicacion
;

EJES : ancestor
    | ancestor-or-self
    | attribute
    | child
    | descendant
    | descendant-or-self
    | following
    | following-sibling
    | parent
    | preceding
    | preceding-sibling
    | self
;

OPCIONAL_PREDICADO : | PREDICADOS
;

PREDICADOS : PREDICADOS PREDICADO | PREDICADO
    | corchete_abierto error corchete_cerrado
;

PREDICADO : corchete_abierto FILTRO corchete_cerrado
;

FILTRO
    : EXPR igual EXPR
    | EXPR diferente EXPR
    | EXPR mayor EXPR
    | EXPR menor EXPR
    | EXPR mayor_igual EXPR
    | EXPR menor_igual EXPR
    | FILTRO and FILTRO
    | FILTRO or FILTRO
    | EJE OPCIONAL_PREDICADO
    | EXPR
;

EXPR
    : EXPR suma EXPR
    | EXPR resta EXPR
    | EXPR multiplicacion EXPR
    | EXPR division EXPR
    | EXPR mod EXPR
    | parentesis_abierto EXPR parentesis_cerrado
    | TIPOS
    | parentesis_abierto error parentesis_cerrado
;

TIPOS : string
    | digito
    | ATRIBUTO
    | PUNTOS
    | CONSULTA_XPATH
    | last parentesis_abierto parentesis_cerrado
    | position parentesis_abierto parentesis_cerrado
    | TEXT
;


Fin de documentación de análisis léxico y sintáctico





Clases que son la base para el análisis

Las siguientes clases son las que ayudan a hacer los cimientos para este proyecto.


     JisonXpaht, como se sabe este analizador que después de compilarse por jison se genera una función en la cual retorna valores 
  primitivos como no primitivos, los cuales son utilizados para poder realizar las operaciones que se requiera, al momento de 
  sintetizar funciones se utilizan clases para poder realizar las consultas correspondientes. Las clases utilizadas son las 
  siguientes.
         ConsultaDescAllAttr.
         ConsultaDescAllNodes.
         ConsultaDescAtribute.
         ConsultaDescendente.
         ConsultaDescendente2.
         ConsultaDescNode.
         ConsultaDescText.
         analizador.
         Consulta.
         ConsultaNode.
         ConsultaPunto.
         ConsultaPuntos.
         ConsultaSimple.
         ConsultaText.

Las consultas  en su mayoria hereda de consulta simple, a su vez tiene dos métodos principales para realizar las consultas, el 
  primer método es el siguiente:
public run(entornos: Array<Entorno>)
El cual recibe un arreglo de entornos, para luego hacer un recorrido hacia la tabla de símbolos y según sea el análisis o solicitud 
  que se haga se buscara la información, que esta devuelve un arreglo nuevo de entornos los cuales ya contienen los datos de la 
  petición, todo esto se realiza con una función recursiva, la cual es la siguiente:
private busquedaDescendente(entorno: Entorno, newEntornos: Array<Entorno>)
Este se llama a si mismo si el entorno en que se encuentra es de tipo nodo sino retorna los entornos encontrados.

Las clases anteriores contemplan la lógica para poder hacer las consultas necesarias para devolver la información solicitada en el path en el xml, todos estas manejan un arreglo de entornos, las cuales son estructuras como las siguientes.


XML
Para generar guardar la información de xml en un objeto entorno se almacena en una tabla que contienen símbolos que a su vez 
  contienen un tabla de símbolos por cada simbolo, estos los nodos y atributos son heredados de símbolo. Las clases son las 
  siguientes.

     Simbolo
      Esta clase contiene los siguientes atributos: 
             private nombre: string
             private type: Type
             private ambito: string
             private linea: number
             private columna: number
Tambien contiene sus get y set, y una función abstracta, que retorna un string del valor de la nodo o el texto del nodo.

     Entorno
      Esta clase contiene dos atributos, un entorno anterior, para poder regresar al entorno padre, y un arreglo de simbolos para 
  la tabla de simbolos, contemplan las funciones siguientes
         public add(simbolo: Simbolo)
         public getTable()
         public setTable(table: Array<Simbolo>)
         public getAnterior()
         public setAnterior(anterior: Entorno)

Las clases atributo y nodo como se menciono anterior mente heredan de símbolo ya que ambos son simbolos.
     Nodo
      La clase nodo contiene 5 atributos loas cuales son:
         private atributos: Array<Atributo>
         private nodos: Array<Nodo>
         private entorno: Entorno
         private texto: string
         private showTextOnly: boolean

Los atributos a su vez tambien son simbolos que se almacenan en nodo ya que pertenecen a el, tambien almacenan nodos hijos, el 
  entorno en que se encuentran, un texto de contenido, y si es tipo etiqueta o entorno.

Asi mismo tiene las siguientes funciones:

     public getValorImplicito():
     private attribsToText(): string
     private nodesToTag(entorno: Entorno): string
     private attribsToText(): string
     private nodesToTag(entorno: Entorno): string

Tambien tiene los geters y seters de los valores principales, los anteriores sirven para poder mostrar el texto o etiqueta, las 
  cuales trasnforman los datos capturados a las salida que se necesite.

     Atributo
      La clase símbolo contiene un valor el cual es el valor del atributo del nodo, esta clase a su vez tiene las funciones de get 
      y set para ese mismo valor.

Reporteria
Para el manejo de los distintos reportes, se cuentan con las siguientes clases y su descripción.

     NodoCST
      Es una interfaz permite armar una estructura para elaborar tanto el reporte gramatical como el reporte CST, el cual sera 
      implementado por el nodo padre con los metodos siguientes
      getProduccion()
      getReglaSemantica()
      
     NodoPadre como se menciono anterior mente el NodoPadre impleneta la interfaz NodoCST, la clase Nodo contiene los siguientes 
      atributos: 
         id:number
         nombre:string
         produccion:string
         reglas:string
         hijos:Array<NodosCST>

Esta clase servirá para almacenar la informacion de la estructura y posteriormente usarla para genera los reportes, solo tiene 
    metodos tipo get(), para cada uno de los atributos.

     NodoHijo
      Esta clase hace referencia a los hijos que tiene un NodoPadre, esta informacion es de igual manera para tratar los reportes, 
      esta clase contiene los siguientes atributos:
         id:number
         nombre:string
         produccion:string
         reglas:string
Solo contempla metodos tipo get() para cada atributo.

     Reporte CST
      Esta clase se encarga de la logica para poder hacer la estructura correspondiente para poderlo graficar con la herramienta de 
      viz, la cual generara un arbol para posteriormente mostrar este arbol en la forma que se necesite, en donde simulara un arbol 
      CST, el cual contendra la forma en que se reconocio la estructura, dicha clase contiene los siguientes atributos:
      listadoNodos: tipo arreglo de objetos
      listadoPunteros: tipo arreglo de objetos
  
Estos dos atributos contendran la estrctura que necesita viz para asi poder generar el arbol. Tambien se cuentan con dos metodos 
  los cuales son:

run() 
recibe como parametro un NodoPadre

recursiva()
recibe como parametro un Nodo y un NodoPadre

recursiva1()
recibe como parametro un Nodo y un NodoPadre
La primer funcion se encarga de llamar a las otras dos funciones y asi mismo agregar la configuracion para poder mostrar el arbol 
  de manera optima, dicha configuracion es la siguiente.

var options = {
                interaction: {
                    dragNodes: false,
                    hoverConnectedEdges: true,
                },
                layout: {
                    improvedLayout: true,
                    hierarchical: {
                        levelSeparation: 250,
                        nodeSpacing: 500,
                        parentCentralization: true,
                        direction: 'DU',
                        sortMethod: 'directed'
                    }
                },
            };

Esta variable contendra la configuracion del archivo, la cual significa:
     dragNodes : false		hace que no se puedan mover los nodos
     hoverConnectedEdges: true	hace que muestra las conexiones de un nodo
     improvedLayout: true		hace que se agrupe en nodos de mas de 100 nodos y mejorar su 					forma
     levelSeparation: 250		separacion entre los niveles
     nodeSpacing: 500		espacio entre nodos
     parentCentralization: true	pone al centro al padre
     direction: 'DU'			direccion de mostrar de abajo hacia ariba
     sortMethod: 'directed'		pone los nodos en forma que el padre es un nivel superior al hijo




**recursiva()**
Esta funcion se encarga de recorrer el arbol y hacer generar los nodos y los id que son necesarios para su posterior contruccion, 
  esta informacion es almacenada en listado de nodos, contiene la siguiente forma
{ id: entrada.getId(), label: entrada.getNomre() }

**recursiva1()**
Esta funcion es la encargada de recorrer el arbol y a medida que va encontrando hijos que a su vez son padre entonces va agregando 
  estos hijos de manera recursiva y crea un puntero a su padre, esto se agrega en el listdo de punteros, contiene la siguiente forma

{ from: h.getId(), to: padre.getId() }

     ReporteGramatical
      Esta clase es la encargada de crear un listado de tipo arreglo para poder mostrar la informacion en una tabla, informacion de 
      reporte gramatical, tiene un atributo que es de tipo listado, asi mismo contiene dos funciones.

run()
Recibe como parametro un NodoPadre

recursiva()
Recibe como entrada un NodoCST

La primer funcion se encarga de llamar a la segunda y asi mismo retorna el listado del reporte gramatical.
La segunda funcion se encarga de recorrer el arbol y por cada padre que encuentra agrega al listado gramatical la regla que 
  necesita en la primer posicion, en la segunda guardara la regla semantica.


Manejo de errores 
Para el manejo de errores se manejaron dos clases las cuales son las siguientes:

     Erro
      Contiene los atributos
         tipo:string
         descripcion:string
         linea:number
         columna:number
         lexema:string

Dicha clase contiene los get() correspondientes a cada atributo, asi como tambien contiene set() para lexema, columna y 
  descripcion.

     Errores
      Esta clase es la encargada de contener un atributo el cual es un listado de Erro, para almacenar los distintos errores, 
  contiene 3 funciones las cuales son:
         agregarError(), esta funcion recibe como parametros el tipo de error, la descripcion del error, la linea y columna donde 
          se encuentra este error, esta funcion solo es utilizada para agregar errores semanticos y sintacticos.
         AgregarErrorLexico(), esta funcion recibe los mismos parametros pero la diferencia es que esta implementa una pequeña 
          logica que servira para agrupar errores lexicos que vienen concatenados y asi poder mostrarlo como una sola palabra y no 
          como un carácter por carcter para que esto no sea tedioso de leer en el reporte.


De esta clase se hace una instancia en el primer analizador, para poder capturar los errores en la primer fase, y esta declarada de 
  manera globar para poder utilizarlo en las distintas logicas que se implementan
