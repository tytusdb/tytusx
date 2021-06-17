/*import { Entorno } from "./xml/ast/Entorno";
import { Simbolo } from "./xml/ast/Simbolo";
import { Tipo } from "./xml/ast/Tipo";
import { Atributo } from "./xml/expresiones/Atributo";
import { Objeto } from "./xml/expresiones/Objeto";
import { ReporteXML } from "./xml/reportes/ReporteXML";
import { AST_XML } from "./xml/ast/AST_XML";
import { AST_XPATH } from "./xpath/ast/AST_XPATH"
import { GraphAST } from "./grafo/GraphAST";
import { Gramatica } from "./xml/reportes/Gramatica";
import { Instruccion } from "./xpath/interfases/Instruccion";

const gramatica = require('../grammar/Grammar_xml')
const gramaticaDesc = require('../grammar/Grammar_xml_desc')
const gramaticaXPATH = require('../grammar/Grammar_xpath');*/


let contenido = `
  <?xml version="1.0" encoding="UTF-8"?>  <!-- Your comment -->
  <biblioteca>
    <libro>
      <titulo>La vida está en otra parte</titulo>
      <autor>Milan Kundera</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Pantaleón y las visitadoras</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Conversación en la catedral</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1969"/>
    </libro>
  </biblioteca>
`;

let instrucciones: AST_XML;
//instrucciones = gramatica.parse(contenido);

const entornoGlobal = new Entorno(null);

function ejecutarCodigo(entrada:String) {
  instrucciones = Grammar_xml.parse(entrada);

  instrucciones.getExpresiones().forEach((element:Objeto) => {
    
    let entornoObj = new Entorno(null);
    if(element.listObjetos != undefined && element.listObjetos != null) {
      entornoObj = ambito_objeto(element.listObjetos, entornoGlobal);
    }

    if(element.listAtributos != undefined) {
      if(element.listAtributos.length > 0) {
        element.listAtributos.forEach((a:Atributo) => {
          a.entorno = entornoObj;
          const simbolo:Simbolo = new Simbolo(a.id, a.value,Tipo.ATRIBUTO , a.line, a.column);
          entornoObj.agregar(simbolo);
        });
      }
    }

    if(element.id1 != undefined) { 
      element.entorno = entornoObj;
      const simbolo:Simbolo = new Simbolo(element.id1, element,Tipo.OBJETO , element.line, element.column);
      entornoGlobal.agregar(simbolo);
    }
  });
}

function ambito_objeto(listO:Array<Objeto>, entornoAnterior:Entorno) {
  var entornoObjeto = new Entorno(entornoAnterior);
  listO.forEach((element:Objeto) => {
    let entornoObj = new Entorno(entornoObjeto);
    if(element.listObjetos != undefined && element.listObjetos != null) {
      //entornoObjeto.print();
      entornoObj =  ambito_objeto(element.listObjetos, entornoObjeto);
    }

    if(element.listAtributos != undefined) {
      if(element.listAtributos.length > 0) {
        element.listAtributos.forEach((a:Atributo) => {
          a.entorno = entornoObjeto;
          const simbolo:Simbolo = new Simbolo(a.id, a.value,Tipo.ATRIBUTO , a.line, a.column);
          //entornoObjeto.print();
          entornoObj.agregar(simbolo);
        });
      }
    }
    
    if(element.id1 != undefined) { 
      element.entorno = entornoObj;
      const simbolo:Simbolo = new Simbolo(element.id1, element,Tipo.OBJETO , element.line, element.column);
      entornoObjeto.agregar(simbolo);
    }
  });
  
  return entornoObjeto;
}

let texto = ``;
var text:String = ``;
var entorno_actual:any = [];
var instruccionesXPATH:AST_XPATH;
var entornoTemp:any;


function ejecutarXPATH(query) {
  text = ``
  texto = ``
  entorno_actual = [];
  instruccionesXPATH = G_xpath.parse(query);
  let flag = true;
  let list_entorno:any = [];
  let list_entorno2:any = [];

  instruccionesXPATH.getInstrucciones().forEach((or:Array<Instruccion>) => {
    
    for(let o of or) {
      if (list_entorno.length == 0) {
        if (o.getNode() == "//") {
          list_entorno = getEntornoActual(entornoGlobal, o.getPredicado());
          //console.log(descendiente(entornoGlobal, "autor"))
        } else if (o.getNode() == "/") {
          list_entorno = getEntornoActualSinDescendite(entornoGlobal, o.getPredicado());
        }  
      } else {
        if (o.getPredicado()!=".") { //para guardar los nodos actuales y retornarlos
          entorno_actual = [];
        }
        if (o.getNode() == "//") {
          list_entorno.forEach(e => {
            list_entorno2 = getEntornoActual(e.entorno, o.getPredicado());
          });
          list_entorno = list_entorno2;
        } else if (o.getNode() == "/") {
          list_entorno.forEach(e => {
            list_entorno2 = getEntornoActualSinDescendite(e.entorno, o.getPredicado());
          });
          list_entorno = list_entorno2;
        }  
      }

      if (entorno_actual.length == 0) {
        editor2.setValue("Error!!!");
        flag = false;
        break;
      } 
    }
  });

  if(flag) {
    if(list_entorno2.length != 0) {
      list_entorno = list_entorno2;
    }
  
    list_entorno.forEach((e:any) => {
      //console.log(e)
      print_entorno(e);
    })
    editor2.setValue(text);
  }
}


function print_entorno(o:Objeto) {
  text +=`<${o.id1} `;

  if(o.listAtributos != null) {
    o.listAtributos.forEach(a => {
      text += `${a.id}="${a.value}" `;
    })
  } 
  if (o.text == '' && o.listObjetos == null) {
    text +=`/>`
  } else {
    
    if (o.text != null) {
      text +=`> ${o.text}`
    } else {
      text +=`>`;
    }

    if(o.listObjetos != null) {
      o.listObjetos.forEach(lo => {
        print_entorno(lo);
      })
    }
    text += `</${o.id2}>\n`;
  }
  
  return text;
}

//Busca el entorno descendiente "//"
function getEntornoActual(entornoG:Entorno, id:String):any {
  if (id == ".") {  //selecciona el nodo actual
    return entorno_actual;   
  }  else if (id == "..") { //Selecciona el padre del nodo actual
    entorno_actual.push(entornoG.getAnterior().getAnterior().getSimbolo("0").getValorImplicito());
    return entorno_actual;
  } else if (id == "@*") {
    entornoTemp = entornoG;//Guardando entorno anterior
    console.log(entornoG.getTabla(),"SIIIIIIII")
    entorno_actual = searchAllAtributos(entornoG);
    return entorno_actual;
  }

  for (let key in entornoG.getTabla()) { 
    if (entornoG.getSimbolo(key).id === id)  {
      console.log(entornoG)
      entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
    }

    let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
      if (siguienteEntorno != null) {
        getEntornoActual(siguienteEntorno, id)
      }
  }
  return entorno_actual;
}

//Busca el entorno descendiente "/"
function getEntornoActualSinDescendite(entornoG:Entorno, id:String):any {
  if (id == ".") {  //selecciona el nodo actual
    return entorno_actual;   
  }  else if (id == "..") { //Selecciona el padre del nodo actual
    entorno_actual.push(entornoG.getAnterior().getAnterior().getSimbolo("0").getValorImplicito());
    return entorno_actual;
  }

  for (let key in entornoG.getTabla()) { 

    if (entornoG.getSimbolo(key).id === id)  {
      entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
    }
    /*let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
      if (siguienteEntorno != null) {
        getEntornoActual(siguienteEntorno, id)
      }*/
  }
  return entorno_actual;
}


function searchAllAtributos(entornoG:Entorno):any { //@*

  for (let key in entornoG.getTabla()) { 

    if(typeof(entornoG.getSimbolo(key).getValorImplicito()) == "string") {
      entorno_actual.push(entornoTemp.getSimbolo(key).getValorImplicito());
    }

    let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
      if (siguienteEntorno != null) {

        searchAllAtributos(siguienteEntorno)
      }
  }
  return entorno_actual;
}


function getEntorno(entornoG:Entorno, id:String):any {
  for (let key in entornoG.getTabla()) { 
    if (entornoG.getSimbolo(key).id === id)  {
      //console.log(entornoG)
      entorno_actual.push(entornoG.getSimbolo(key).getValorImplicito());
    }
    let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
      if (siguienteEntorno != null) {
        getEntornoActual(siguienteEntorno, id)
      }
  }
  return entorno_actual;
}

function descendiente(entornoG:Entorno, id:String) { /* "//" */
  for (let key in entornoG.getTabla()) { 

    texto += `${entornoG.getSimbolo(key).id}`;
    
    let siguienteEntorno = entornoG.getSimbolo(key).getValorImplicito().entorno;
    if (siguienteEntorno != null) {
      descendiente(siguienteEntorno, id)
    }
  }
  return texto;
}

//ejecutarXML();
//ejecutarXPATH();

function getTablaSimboloXML() {
  const reporte = new ReporteXML();
  return reporte.tablaSimbolos(entornoGlobal,"0");
}

function getReporteErrorXMLASC() {
  return instrucciones.getErrores();
}

function getReporteGramaticalXMLASC() {
  return instrucciones.getProducciones();
}

function getGrafoAscXML() {
  //GRAFO
  let graph = new GraphAST(instrucciones);
  return graph.getGrafo();
}

function getGrafoAscXPATH() {
  //GRAFO
  let graph = new GraphASTXPATH(instruccionesXPATH);
  return graph.getGrafo();
}




function crear_tabla_errores_xpaht() {      
  let body = document.getElementsByTagName("body")[0];
  let tabla = document.createElement("table");
  let tblBody = document.createElement("tbody");

  //CREAR ENCABEZADO
  let encabezado = document.createElement("tr");
  encabezado.style.color = "white";
  encabezado.style.background = 'black';

  var titulo = document.createElement("h1");
  var espacio = document.createElement("br"); 
  var espacio2 = document.createElement("br"); 
  var espacio3 = document.createElement("br");  


  let numero = document.createElement("td");
  let tipo = document.createElement("td");
  let descripcion = document.createElement("td");
  let fila = document.createElement("td");
  let columna = document.createElement("td");
  
  var t_titulo = document.createTextNode("REPORTE XPAHT");
  let t_numero = document.createTextNode("Linea");
  let t_tipo = document.createTextNode("Tipo");
  let t_descripcion = document.createTextNode("Descripcion");
  let t_fila = document.createTextNode("Fila");
  let t_columna = document.createTextNode("Columna");
  
  numero.appendChild(t_numero);
  tipo.appendChild(t_tipo);
  descripcion.appendChild(t_descripcion);
  fila.appendChild(t_fila);
  columna.appendChild(t_columna);
  titulo.appendChild(t_titulo);

  encabezado.appendChild(numero)
  encabezado.appendChild(tipo)
  encabezado.appendChild(descripcion)
  encabezado.appendChild(fila)
  encabezado.appendChild(columna)    
  body.appendChild(titulo);
  tblBody.appendChild(encabezado);
  
  
  let arrayErrores = [];        
  let listaErrores = instruccionesXPATH.getErrores();

  for (let i = 0; i < listaErrores.length; i += 4) {
      let grupoErrores = listaErrores.slice(i, i + 4);
      arrayErrores.push(grupoErrores);
  }

  //CREAR CUERPO
  for (let i = 0; i < arrayErrores.length; ++i) {
      let error = arrayErrores[i]      
      let Fila = document.createElement("tr"); 
      let celda = document.createElement("td");
      let cont = i+1;
          let textoCelda = document.createTextNode("# "+cont);
          celda.appendChild(textoCelda);
          Fila.appendChild(celda);     
      for (let j = 0; j < error.length; ++j) {            
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(error[j]);
          celda.appendChild(textoCelda);
          Fila.appendChild(celda);
      }        
      tblBody.appendChild(Fila);
  }


  tabla.appendChild(tblBody);
  body.appendChild(tabla);
  body.appendChild(espacio);
   body.appendChild(espacio2);
    body.appendChild(espacio3);
  //tabla.setAttribute("border", "2");
}


function crear_tabla_errores_xml() {      
  let body = document.getElementsByTagName("body")[0];
  let tabla = document.createElement("table");
  let tblBody = document.createElement("tbody");

  //CREAR ENCABEZADO
  let encabezado = document.createElement("tr");
  encabezado.style.color = "white";
  encabezado.style.background = 'black';
  var titulo = document.createElement("h1");
  var espacio = document.createElement("br"); 
  var espacio2 = document.createElement("br"); 
  var espacio3 = document.createElement("br");

  let numero = document.createElement("td");
  let tipo = document.createElement("td");
  let descripcion = document.createElement("td");
  let fila = document.createElement("td");
  let columna = document.createElement("td");
  
  var t_titulo = document.createTextNode("REPORTE XML");
  let t_numero = document.createTextNode("Linea");
  let t_tipo = document.createTextNode("Tipo");
  let t_descripcion = document.createTextNode("Descripcion");
  let t_fila = document.createTextNode("Fila");
  let t_columna = document.createTextNode("Columna");
  
  numero.appendChild(t_numero);
  tipo.appendChild(t_tipo);
  descripcion.appendChild(t_descripcion);
  fila.appendChild(t_fila);
  columna.appendChild(t_columna);
  titulo.appendChild(t_titulo);
  
  encabezado.appendChild(numero)
  encabezado.appendChild(tipo)
  encabezado.appendChild(descripcion)
  encabezado.appendChild(fila)
  encabezado.appendChild(columna)    
  body.appendChild(titulo);
  tblBody.appendChild(encabezado);
  
  
  let arrayErrores = [];        
  let listaErrores = instrucciones.getErrores();

  for (let i = 0; i < listaErrores.length; i += 4) {
      let grupoErrores = listaErrores.slice(i, i + 4);
      arrayErrores.push(grupoErrores);
  }

  //CREAR CUERPO
  for (let i = 0; i < arrayErrores.length; ++i) {
      let error = arrayErrores[i]      
      let Fila = document.createElement("tr"); 
      let celda = document.createElement("td");
      let cont = i+1;
          let textoCelda = document.createTextNode("# "+cont);
          celda.appendChild(textoCelda);
          Fila.appendChild(celda);     
      for (let j = 0; j < error.length; ++j) {            
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(error[j]);
          celda.appendChild(textoCelda);
          Fila.appendChild(celda);
      }        
      tblBody.appendChild(Fila);
  }


  tabla.appendChild(tblBody);
  body.appendChild(tabla);
  body.appendChild(espacio);
    body.appendChild(espacio2);
    body.appendChild(espacio3);
  //tabla.setAttribute("border", "2");
}
