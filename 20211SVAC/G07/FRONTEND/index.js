let tabs_ = Array.from(document.querySelectorAll(".tab"));
let panels = Array.from(document.querySelectorAll(".panel"));
let editors = [];

// EDITOR INICIAL

editors.push(document.getElementById("editor"));

// ELIMINAR LA CLASE ACTIVE
function removeActive() {
  tabs_.map((tab) => tab.classList.remove("active"));
  panels.map((panel) => panel.classList.remove("active"));
}

// EVENTO PARA DETECTAR LA PESTAÑA SELECCIONADA
document.getElementById("tabs").addEventListener("click", (event) => {
  if (event.target.classList.contains("tab")) {
    let i = tabs_.indexOf(event.target);
    removeActive();
    tabs_[i].classList.add("active");
    panels[i].classList.add("active");
  }
});

// FUNCION PARA CREAR UN ARCHIVO NUEVO DENTRO DEL EDITOR
function nuevoArchivo(nombreTab = "new.XPath", contenido = "") {
  removeActive();

  let li = document.createElement("li");
  li.className = "tab active";
  li.innerHTML = nombreTab;

  let div = document.createElement("div");
  div.className = "panel active";

  let txtArea = document.createElement("textarea");
  txtArea.className = "editor";
  txtArea.value = contenido;

  div.appendChild(txtArea);

  tabs_.push(li);
  panels.push(div);
  document.getElementById("tabs").appendChild(li);
  document.getElementById("panels").appendChild(div);
}

// EVENTO QUE CREA EL NUEVO DOCUMENTO EN BLANCO
document.getElementById("nuevoDoc").addEventListener("click", () => {
  nuevoArchivo();
});

// EVENTO QUE CIERRA LAS PESTAÑAS
document.getElementById("cerrarDoc").addEventListener("click", () => {
  let i = tabs_.findIndex((tab) => tab.classList.contains("active"));
  let tab = tabs_[i];
  let panel = panels[i];

  tab.parentNode.removeChild(tab);
  panel.parentNode.removeChild(panel);

  tabs_.splice(i, 1);
  panels.splice(i, 1);

  if (tabs_.length > 0) {
    tabs_[0].classList.add("active");
    panels[0].classList.add("active");
  }
});

// EVENTO QUE GUARDA EL DOCUMENTO QUE SE TIENE EN EL EDITOR
document.getElementById("guardarDoc").addEventListener("click", () => {
  let i = tabs_.findIndex((tab) => tab.classList.contains("active"));
  let ed = editors[i];

  let blob = new Blob([ed.getValue()], { type: "text/plain" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = tabs_[i].textContent;
  a.click();
});

// EVENTO QUE ABRE UN DOCUMENTO DEL EQUIPO
document.getElementById("abrirDoc").addEventListener("click", () => {
  let archivo = document.getElementById("fileInput").click();
});

// FUNCION PARA ABRIR EL ARCHIVO SELECCIONADO DEL EQUIPO
function abrirArchivo(archivos) {
  let archivo = archivos.files[0];
  let lector = new FileReader();
  lector.onload = (e) => {
    let contents = e.target.result;
    nuevoArchivo(archivo.name, contents);
  };
  lector.readAsText(archivo);
  archivo.clear;

  document.getElementById("fileInput").value = "";
}

// BOTONES PARA ANALIZAR
//Analizar
let botonCargar = document.getElementById("btnCargar");
let botonCargar2 = document.getElementById("btnCargar2");
let editorXPATH = (document.getElementById("editor").value = "/*");
let editorXML = document.getElementById("consolaJS");
let indiceAux=0;
let tipoAnalizadorXML = "";
let tablaSimbolos = [];
let listaTokens=[];
let parserXML;
let globalencod;
let codificador = document.getElementById("codencod");

//botones de xquery por la izquierda
let btnCargarxquery = document.getElementById("btnCargarxquery");
let parserXQUERY;
let editorXQUERY = document.getElementById("consolaXQUERY");

//variables para boton a la derecha de xquery
let btnCargarxqueryder = document.getElementById("btnCargarxqueryder");
let parserXQUERYder;

let textoEntrada = `<?xml version="1.0" encoding="UTF-8"?>

<bookstore>

<book category="COOKING">
  <title lang="en">Everyday Italian</title>
  <author>Giada De Laurentiis</author>
  <year>2005</year>
  <price>30.00</price>
</book>

<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
  <price>29.99</price>
</book>

<book category="WEB">
  <title lang="en">XQuery Kick Start</title>
  <author>James McGovern</author>
  <author>Per Bothner</author>
  <author>Kurt Cagle</author>
  <author>James Linn</author>
  <author>Vaidyanathan Nagarajan</author>
  <year>2003</year>
  <price>49.99</price>
</book>

<book category="WEB">
  <title lang="en">Learning XML</title>
  <author>Erik T. Ray</author>
  <year>2003</year>
  <price>39.95</price>
</book>

</bookstore>
`
let XQuery = `
for $x in /bookstore/book
return $x/title
`
//for $x in /bookstore/book
//where $x/price>30
//return $x/title

let Encabezado3D = `/*------HEADER------*/
#include <stdio.h>
#include <math.h>

double heap[30101999];
double stack[30101999];
double P;
double H;



/*------MAIN------*/
void main() {
    P = 0; H = 0;


    return;
}
`

editorXQUERY.value=XQuery;
editorXML.value = textoEntrada


// Analizar la entrada XML al hacer CLICK al boton
botonCargar.addEventListener("click", () => {
    console.log("Analizando XML DES ...")
    tipoAnalizadorXML = "Descendente";

    // Analizador XML por la izquierda
    parserXML = xmlDerecha.parse(editorXML.value);

    console.log("EL ANALIZADOR REGRESA");
    console.log(parserXML);
    console.log("tipo de encoding: " + parserXML.tipoencoding);    

    codificador.innerHTML = parserXML.tipoencoding;
    globalencod =parserXML.tipoencoding;
    console.error("Aqui");
    console.log(consulta_xml.parse("<price>5.95</price>"));
})

botonCargar2.addEventListener("click", () => {
  console.log("Analizando XML ASC ...")
  tipoAnalizadorXML = "Ascendente";

  // Analizador XML por la izquierda
  parserXML = analizador_izq.parse(editorXML.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXML);
  console.log("tipo de encoding: " + parserXML.tipoencoding);    

  codificador.innerHTML = parserXML.tipoencoding;
  globalencod =parserXML.tipoencoding;


})


document.getElementById("ast").addEventListener("click", () => {
    let AST_xPath=analizadorizq_xpath.parse(document.getElementById("editor").value);
  
    // Se activa el modal
    activarModal();

    // Generar el arbol con Treant JS
    graficarArbol(AST_xPath);
  
})

document.getElementById("btnReporteXPATHcst").addEventListener("click", () => {
  let AST_xPath2=analizador_xpath.parse(document.getElementById("editor").value);

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(AST_xPath2);

})

// ======================================
// MODAL XML
// ======================================
let btnReporteXML = document.getElementById('btnReporteXML');
let btnReporteXMLCST= document.getElementById('btnReporteXMLcst');
let btnReporteGram = document.getElementById('btnReporteXGRAM');
let btnReporteXMLErrores = document.getElementById('btnReporteXMLErrores');

let tablaTitulo = document.getElementById('EpicModalLabel');
let tablaTituloCST = document.getElementById('EpicModalLabelAST');
let tabla = document.getElementById('tablaSimbolos');
let contenidoModal2 = document.getElementById('modal2Content');

let tablaCabeceras = document.getElementById('tablaCabeceras');

// REPORTE TABLA DE SIMBOLOS
btnReporteXML.addEventListener("click", () => {
  tablaTitulo.innerHTML = 'Reporte Tabla Simbolos XML ' + tipoAnalizadorXML;
  tabla.innerHTML = "";

  // Tabla de Simbolos
  tablaSimbolos = new TablaSimbolos(parserXML.json);
  tablaSimbolos = tablaSimbolos.generarTabla();

  // Agregar las cabeceras
  tablaCabeceras.innerHTML = `
  <th scope="col">Nombre</th>
  <th scope="col">Tipo</th>
  <th scope="col">Ambito</th>
  <th scope="col">Fila</th>
  <th scope="col">Columna</th>
  <th scope="col">Valor</th>
  `;


  // Agregar contenido a la tabla
  tablaSimbolos.forEach(simbolo => {
    tabla.innerHTML += `
      <tr>
        <td>${simbolo.nombre}</td>
        <td>${simbolo.tipo}</td>
        <td>${simbolo.ambito}</td>
        <td>${simbolo.fila}</td>
        <td>${simbolo.columna}</td>
        <td>${simbolo.valor}</td>
      </tr>
    `;
  });
});

// REPORTE DEL CST
btnReporteXMLCST.addEventListener("click", () => {

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(parserXML.json.nodo);

  
});

// REPORTE DE LA GRAMATICA
btnReporteGram.addEventListener('click', () => {
  tablaTituloCST.innerHTML = 'Reporte Gramatical XML ' + tipoAnalizadorXML;

  contenidoModal2.innerHTML = `<textarea style="width: 38%; height: 700px; resize: none;">${parserXML.gramatical}</textarea>
  <textarea style="width: 60%; height: 700px; resize: none;">${parserXML.gramaticapp}</textarea>
  `;
});

//REPORTE DE ERRORES
btnReporteXMLErrores.addEventListener("click", () => {
  tablaTitulo.innerHTML = 'Reporte Errores XML ' + tipoAnalizadorXML;
  tabla.innerHTML = "";

  // Lista de errores
  listaErrores = parserXML.listaErrores;

  console.log("ESTA ES LA LISTA DE ERRORES");
  console.log(listaErrores);

  // Agregar las cabeceras
  tablaCabeceras.innerHTML = `
  <th scope="col">Analizador</th>
  <th scope="col">Tipo</th>
  <th scope="col">Descripcion</th>
  <th scope="col">Linea</th>
  <th scope="col">Columna</th>
  `;

  // Agregar contenido a la tabla
  listaErrores.forEach(error => {
    tabla.innerHTML += `
      <tr>
        <td>${error.analizador}</td>
        <td>${error.tipo}</td>
        <td>${error.descripcion}</td>
        <td>${error.linea}</td>
        <td>${error.columna}</td>
      </tr>
    `;
  });
});



/**
 * ******************************************************
 * XPATH
 * ******************************************************
 */

document.getElementById("btn_EjecutarDer").onclick = this.analizar_xpath;
document.getElementById("btn_EjecutarIzq").onclick = this.analizar_xpath_izq;

function analizar_xpath_izq(){
  listaTokens = [];
  listaErrores = [];

  parserXML = xmlDerecha.parse(editorXML.value);

  console.log("Analizando XPATH...");
  let AST_xPathizq=analizadorizq_xpath.parse(document.getElementById("editor").value);//Decendente
  
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente

  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;

  //generarAST(AST_xPathizq);
  console.log("Interpretando");
  interpretar(AST_xPath,parserXML.json);
}


function analizar_xpath() {
  listaTokens = [];
  listaErrores = [];
  //console.log("Analizando XML ...");
  //let AST_xml=xmlDerecha.parse(editorXML.value);//Decendente
  

  console.log("Analizando XPATH...");
  parserXML = xmlDerecha.parse(editorXML.value);
  console.log("Analizando XPATH por la derecha");

  
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente
  console.log(AST_xPath);

  //GENERANDO ARBOL AST
  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;
  
  //generarAST(AST_xPath);
  

  //generarAST(AST_xPath);
  console.log("Interpretando");
  interpretar(AST_xPath,parserXML.json);
  //interpretar(AST_xPath,AST_xml);
  //imprimiConsola("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;");
 // imprimiConsola(parseCadena.parse("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;"));
  
}
/**
 * ******************************************************
 * CONSOLA 3D
 * ******************************************************
 */

    

btn3d.addEventListener("click", () => {

  console.log("EL ANALIZADOR REGRESA");
  consola3D.value=Encabezado3D;


})

/**
 * ******************************************************
 * XQUERY
 * ******************************************************
 */
 btnCargarxquery.addEventListener("click", () => {
  console.log("Analizando XQUERY ")
  tipoAnalizadorXML = "ASCENDENTE";

  // Analizador XQUERY por la izquierda
  parserXQUERY = analizador_xqueryizq.parse(editorXQUERY.value);

  console.log("EL ANALIZADOR REGRESA");
  parserXML = xmlDerecha.parse(editorXML.value);
  globalencod =parserXML.tipoencoding;
  ejecutarXQuery(parserXQUERY,parserXML.json);


})

btnCargarxqueryder.addEventListener("click", () => {
  console.log("Analizando XQUERY ")
  tipoAnalizadorXML = "DESCENDENTE";

  // Analizador XQUERY por la DERECHA
  parserXQUERYder = analizador_xqueryder.parse(editorXQUERY.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXQUERYder);


})
document.getElementById("btnReporteXQUERYcst").addEventListener("click", () => {
  let AST_xQuery=analizador_xquery_ast.parse(editorXQUERY.value);

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(AST_xQuery);

})


    // Original
    function encode_utf8(s) {
      return unescape(encodeURIComponent(s));
    }

    function decode_utf8(s) {
      return decodeURIComponent(escape(s));
    }

    function codificarascci(t) {
      var caracteres = [];
      valor = t;
      for (var i = 0; i < valor.length; i++) {
        caracteres[i] = valor.charAt(i).charCodeAt(0);
      }
      return caracteres.toString().replaceAll(",",' ');
    }

function imprimiConsola(txt){
  console.log("imprimir en consola");
  console.log(globalencod);  
  //console.log(encode_utf8(txt)+"\n");
  // asi se imprime la salida
  //  document.getElementById("consolaPython").value=txt+"\n";
    if(globalencod.includes('ISO-8859-1')){
      console.log("entre en iso");
      document.getElementById("consolaPython").value=encode_utf8(txt)+"\n";
    }
//IMPLEMENTACION DEL CODIGO ASCII
/*    else if(globalencod.includes('ASCII')){
      console.log("entre en ASCII");
      document.getElementById("consolaPython").value = codificarascci(txt)+"\n";
    }
*/
    else{
      console.log("entre en utf");
      document.getElementById("consolaPython").value=txt+"\n";
    }
  }
document.getElementById("msgError").style.display="none";



