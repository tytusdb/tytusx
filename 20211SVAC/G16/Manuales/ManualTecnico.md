 <div style="text-align:center">

# **Manual técnico TytusX G16**
</div>
 <div style="text-align:center">

 |     Integrantes  |carnet  |
 |-------------|--------|
 |Josselyn Vanessa Polanco Gameros|201602676|
 |Karla Julissa Ajtún Velásquez   |201700565|
 |Diego Leonel Marroquín Martínez |201709014|
</div>

## **Introducción**
 <div style="text-align:justify">
Para el proyecto del curso de Organización y Compiladores 2, se realizó una herramienta que compila, interpreta y traduce el lenguaje de xpath con xml. Este proyecto se desarrollo con lenguaje JavaScript y algunas herramientas que se encuentran bajo la licencia MIT. A continuación se muestran las librerías que se utilizaron.
</div>
<br>

* Para la el diseño de la interfaz se utilizó Boostrap.
  En donde dentro de un script del index.html se colocó el plugin del mismo: assets/plugins/bootstrap/js/bootstrap.min.js

* Para el diseño del mensaje de texto que se muestra en pantalla se utilizó la librería ngx-toastr.

* Para el color, numero de fila y columna que se ve en la interfaz, se utilizó la librería ctrl/ngx-codemirror.

* Para la realización de los analizadores, se usó la herramienta de jison. Para la instalacion y modo de uso se tiene su documentación oficial: https://zaa.ch/jison/.

* De parte de angular se utilizaron estas librerías:
  * BrowserAnimationsModule  
  * FormsModule 
  * BrowserModule
  * NgModule
  * CommonModule

Sin embargo, con que usted en la terminal en la carpeta de frontend escriba el comando "npm install" todas estas librerías se instalaran de forma automática.

 <div style="text-align:justify">
Para realizar este proyecto se utilizaron 4 gramáticas, 2 para el lenguaje de xml y 2 para el lenguaje xpath. Para cada lenguaje se uiliza una gramatica ascendente y una descendente. A continuacion se muestran las gramaticas que se utilizaron.

## Gramática XML Ascendente
```
    S: INIT EOF;

INIT: VERSION;

VERSION:
  eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP
  |error EOF;

FORMATO:
    utf 
  | ascii
  | iso
  |error EOF;

OP:
   NODOS
  |;

NODOS: 
    NODOS NODO
  | NODO;

NODO: 
    eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin
  | eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin
  | eInicio ID ATRIBUTOS eFin eInicio barra ID eFin
  | eInicio ID ATRIBUTOS barra eFin
  | eInicio ID eFin NODOS eInicio barra ID eFin
  | eInicio ID eFin TEXTO eInicio barra ID eFin
  | eInicio ID  eFin eInicio barra ID eFin
  | eInicio ID barra eFin
  |error eFin;

ATRIBUTOS: 
    ATRIBUTOS ATRIBUTO
  | ATRIBUTO;

ATRIBUTO: 
    ID igual CADENA
  | ID igual CHAR
  |error eFin;

TEXTO: 
    TEXTO ID
  | TEXTO integer
  | TEXTO double
  | TEXTO CADENA
  | TEXTO barra
  | TEXTO inter
  | TEXTO igual
  | TEXTO utf
  | TEXTO version
  | TEXTO encoding
  | TEXTO CARACTER
  | TEXTO mayorque
  | TEXTO menorque
  | TEXTO apostrofe
  | TEXTO comilla
  | TEXTO ampersand
  | TEXTO xml
  | mayorque
  | menorque
  | apostrofe
  | comilla
  | ampersand
  | barra
  | inter
  | igual
  | utf
  | version
  | encoding
  | xml
  | ID
  | integer
  | double
  | CADENA 
  | CARACTER 
  | error eInicio;
```
## Gramática XML Descendente
```
S: INIT EOF;

INIT:
  eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS
  | error EOF;

FORMATO
  : utf
  | ascii
  | iso
  | error EOF;

NODOS
  : NODO NODOS
  | ;

NODO
  : eInicio ID CONT
  | error eFin;

CONT
  : ATRIBUTOS CONT2
  | CONT2;

CONT2
  : eFin FINAL
  | barra eFin
  | error eInicio;

FINAL
  : OPCIONES eInicio barra ID eFin
  | TEXTO eInicio barra ID eFin
  | eInicio barra ID eFin;

ATRIBUTOS:
  ATRIBUTO ATRIBUTOS
  |ATRIBUTO;

ATRIBUTO
  : ID igual CADENA
  | ID igual CHAR;

OPCIONES
  : OPCIONES NODO
  | NODO;

TEXTO:
    PALABRA TEXTO
  | PALABRA;

PALABRA:
    ID
  | integer
  | double
  | CADENA
  | barra
  | inter
  | igual
  | utf
  | version
  | encoding
  | xml
  | CARACTER
  | mayorque
  | menorque
  | apostrofe
  | comilla
  | ampersand
  | error eInicio;
```
## Gramática Xpath Ascendente
```
S: INICIO EOF;

INICIO:
	 INICIO diagonal id PREDICADO
	|diagonal id PREDICADO
	|INICIO diagonal id
	|diagonal id
	|INICIO diagonal EXPRESION
	|diagonal EXPRESION PREDICADO
	|diagonal EXPRESION
	|INICIO diagonal EJES 
	|diagonal EJES
	|INICIO dobled id PREDICADO 
	|dobled id PREDICADO
	|INICIO dobled id
	|dobled id 	
	|INICIO dobled EXPRESION 
	|dobled EXPRESION PREDICADO	
	|dobled EXPRESION 
	|INICIO dobled EJES 
	|dobled EJES
	|INICIO barra INICIO 
	|id PREDICADO	
	|punto 
	|doblep 
	|INICIO diagonal punto
	|INICIO diagonal doblep
	|diagonal punto
	|diagonal doblep
	|INICIO dobled punto
	|INICIO dobled doblep
	|dobled doblep
	|dobled punto
	|error EOF;

PREDICADO:
	 PREDICADO corizq EXPRESION corder
	|corizq EXPRESION corder;

EXPRESION:
	 EXPRESION mas EXPRESION
	|EXPRESION menos EXPRESION
	|EXPRESION por EXPRESION
	|EXPRESION div EXPRESION
	|EXPRESION mod EXPRESION
	|EXPRESION or EXPRESION 
	|EXPRESION and EXPRESION 
	|EXPRESION igual EXPRESION 
	|EXPRESION dif EXPRESION
	|EXPRESION menor EXPRESION 
	|EXPRESION mayor EXPRESION
	|EXPRESION menori EXPRESION
	|EXPRESION mayori EXPRESION 
	|EXPRESION diagonal EXPRESION 
	|EXPRESION dobled EXPRESION 
	|parizq EXPRESION parder
	|arroba EXPRESION 
	|por 
	|FUNCIONES 
	|cadena 
	|decimal 
	|entero 
	|punto 	
	|doblep 
	|id 
	|cadenas 
	|INICIO 
  |error diagonal;

FUNCIONES:
	 FUNCION parizq parder;

FUNCION:
	 rlast
	|rposition	
	|rnode
	|rtext
  |error diagonal;

EJES:
	 EJE dospuntos dospuntos CONTENIDO
	|EJES EJE dospuntos dospuntos CONTENIDO;

EJE:
	 rancestros
	|rancestro 
	|ratributo 
	|rchild
	|rdescenos
	|rdescen 
	|rseguidorh
	|rseguidor 
	|rnombres 
	|rparent
	|rprecedings 
	|rpre
  |error diagonal;

CONTENIDO:
	 id
	|id parizq parder
	|id PREDICADO
	|por
	|por diagonal
	|por dobled
	|FUNCIONES
	|EXPRESION;
```

## Gramática Xpath Descendente
```
S: INICIO EOF { $$=$1; return $$; };

INICIO:
	 diagonal LDIAGONAL
	|dobled LDIAGONAL
	|id	LID	
	|punto INICIOP
	|doblep INICIOP
;

LDIAGONAL:
	 id LID
	|EXPRESION LID
	|EJES INICIOP
	|punto	INICIOP 
	|doblep INICIOP
;

LID:
	 INICIOP
	|PREDICADO INICIOP;

INICIOP:
	 diagonal LDIAGONAL 
	|dobled LDIAGONAL 
	|barra INICIO INICIOP	
	|	;

PREDICADO: corizq EXPRESION corder LPREDICADO;

LPREDICADO:
	 corizq EXPRESION corder LPREDICADO
	|	;

EXPRESION:
	 parizq EXPRESION parder EXPRESIONP 
	|arroba EXPRESION EXPRESIONP
	|por EXPRESIONP
	|FUNCIONES EXPRESIONP
	|cadena EXPRESIONP
	|decimal EXPRESIONP
	|entero EXPRESIONP
	|punto EXPRESIONP
	|doblep EXPRESIONP
	|id EXPRESIONP
	|cadenas EXPRESIONP
	|INICIO EXPRESIONP
;

EXPRESIONP:
	 mas EXPRESION 	EXPRESIONP
	|menos EXPRESION EXPRESIONP
	|por EXPRESION EXPRESIONP
	|div EXPRESION EXPRESIONP
	|mod EXPRESION EXPRESIONP
	|or EXPRESION EXPRESIONP
	|and EXPRESION EXPRESIONP
	|igual EXPRESION EXPRESIONP
	|dif EXPRESION EXPRESIONP
	|menor EXPRESION EXPRESIONP
	|mayor EXPRESION EXPRESIONP	
	|menori EXPRESION EXPRESIONP
	|mayori EXPRESION EXPRESIONP
	|diagonal EXPRESION EXPRESIONP
	|dobled EXPRESION EXPRESIONP
	| ;

FUNCIONES: FUNCION parizq parder;

FUNCION:
	 rlast
	|rposition
	|rnode
	|rtext;

EJES:
	 EJE dospuntos dospuntos CONTENIDO EJESP ;

EJESP:
	 EJE dospuntos dospuntos CONTENIDO EJESP
	| ;

EJE:
	 rancestros
	|rancestro
	|ratributo
	|rchild
	|rdescenos
	|rdescen
	|rseguidorh
	|rseguidor 
	|rnombres 
	|rparent 
	|rprecedings
	|rpreceding
	|rself;

CONTENIDO:
	 id LIDCONTENIDO
	|por LPORCONTENIDO
	|FUNCIONES
	|EXPRESION
	|	;

LIDCONTENIDO:
	 parizq parder
	|PREDICADO
	|	;

LPORCONTENIDO:
	 diagonal
	|
	| ;
```

Por medio de esa gramatica, podemos realizar reportes gramaticales, generar el CSt del lenguaje XML tanto como el XML ascendente y XML descendente. A continuación se muestran unos códigos de la aplicación que son de importancia:

* Para poder generar los reportes se tienen dos modos, primero se analiza para que guarde los datos para generar la tabla de simbolos y el reporte gramatical. Mientras que la segunda vez que se analiza se extrae el CST. Esto sucede para el lenguaje XML.
```
ListaGramatica.ReporteGramatical.clear()
    errores.Errores.clear();
    let cadena =this.ExtraerTexto();
    try{
    Estado.Estado.Cambio(1)
    const CST = parserDesc.parse(cadena);
    this.GenerarTablaSimbolos(CST)
    Estado.Estado.Cambio(2)
    this.nodoraiz = parserDesc.parse(cadena);
    localStorage.setItem("CSTA", JSON.stringify(this.nodoraiz))
    localStorage.setItem("TIPO", "Descendente")
    }catch(Error){
      this.toastr.error("No se ha podido generar correctamente el análisis")
    }
```

* Para poder graficar el CST se tienen los siguientes métodos.
```
 Graficar(raiz:Nodo){
    this.listaedges=[];
    this.listanodes=[];
    this.contgrafica=0;
    this.RecorrerCST(raiz)
  var nodes = new DataSet(this.listanodes);
  var edges = new DataSet(this.listaedges);
  var container = document.getElementById('visualizar');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    layout: {
      randomSeed: undefined,
      improvedLayout:true,
      hierarchical: {
      enabled:true
    }
  }
  };
  var network = new Network(container, data, options);
  }

  RecorrerCST(raiz:Nodo){
    //Agregando el nodo padre
    let nodo = {
      id: 0,
      label: raiz.Etiqueta
    }
    this.listanodes.push(nodo);
    if (raiz.Hijos.length!=0){
        this.RecorrerHijos(raiz.Hijos, 0)
    }
  }

  RecorrerHijos(hijos:Array<Nodo>, idpadre:number){
  for(let i=0; i<hijos.length; i++){
      //VERIFICA SI EL ID YA ESTÁ USADO.
      if(this.switchversion==1){
        this.nodohoja++;
      }
      this.switchversion++;
      
      let hijo = this.nodohoja + 1;
      if (this.VerificarID(hijo)==false){
        let nodo = {
          id: hijo,
          label: hijos[i].Etiqueta + "\n"+ hijos[i].Valor
        }
        this.listanodes.push(nodo);
      }
      //CREA LA RELACIÓN PADRE E HIJO
      let edge = {
        from: idpadre,
        to: hijo
      }
      this.listaedges.push(edge);
      //VE SI ESTE HIJO TIENE HIJOS
      if(hijos[i].Hijos.length>0){
        this.nodohoja=hijo;
        this.RecorrerHijos( hijos[i].Hijos, hijo);
      }else{//SI NO TIENE ES UN NUEVO NODO HOJA Y SE DEBE DE ACTUALIZAR.
        this.nodohoja=hijo;
      }
    }
  }

  VerificarID(padre:number):boolean{
    for (let i=0; i<this.listanodes.length; i++) {
      if(this.listanodes[i].id==padre){
        return true;
      }
    }
    return false;
  }
```