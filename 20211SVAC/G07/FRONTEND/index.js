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
let editorXPATH = (document.getElementById("editor").value = "//@año");
let editorXML = document.getElementById("consolaJS");
let tipoAnalizadorXML = "";
let tablaSimbolos = [];
let parserXML;
let codificador = document.getElementById("codencod");
let textoEntrada = `
<?xml version="1.0" encoding="UTF-8"?>
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
`
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
  

})
document.getElementById("ast").addEventListener("click", () => {
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente
  generarAST(AST_xPath);
})
// ======================================
// MODAL XML
// ======================================
let btnReporteXML = document.getElementById('btnReporteXML');
let btnReportCST = document.getElementById('btnReporteXAST');
let btnReporteGram = document.getElementById('btnReporteXGRAM');

let tablaTitulo = document.getElementById('EpicModalLabel');
let tablaTituloCST = document.getElementById('EpicModalLabelAST');
let tabla = document.getElementById('tablaSimbolos');
let contenidoModal2 = document.getElementById('modal2Content');

btnReporteXML.addEventListener("click", () => {
  tablaTitulo.innerHTML = 'Reporte Tabla Simbolos XML ' + tipoAnalizadorXML;
  tabla.innerHTML = "";

  // Tabla de Simbolos
  tablaSimbolos = new TablaSimbolos(parserXML.json);
  tablaSimbolos = tablaSimbolos.generarTabla();

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

btnReportCST.addEventListener("click", () => {
  tablaTituloCST.innerHTML = 'Reporte Arbol CST XML ' + tipoAnalizadorXML;
  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;

  // Generar el arbol CST
  generarAST(parserXML.json.nodo);

});

btnReporteGram.addEventListener('click', () => {
  tablaTituloCST.innerHTML = 'Reporte Gramatical XML ' + tipoAnalizadorXML;

  contenidoModal2.innerHTML = `<textarea style="width: 38%; height: 700px; resize: none;">${parserXML.gramaticapp}</textarea>
  <textarea style="width: 60%; height: 700px; resize: none;">${parserXML.gramatical}</textarea>
  `;
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

  console.log("Analizando XPATH...");
  let AST_xPath=analizadorizq_xpath.parse(document.getElementById("editor").value);//Decendente

  // GENERANDO ARBOL AST
  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;
  generarAST(AST_xPath);
  generTabla();
}


function analizar_xpath() {
  listaTokens = [];
  listaErrores = [];
  //console.log("Analizando XML ...");
  //let AST_xml=xmlDerecha.parse(editorXML.value);//Decendente
  

  console.log("Analizando XPATH...");

  
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente

  //GENERANDO ARBOL AST
  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;
  generarAST(AST_xPath);
  generTabla();

  
  console.log("Interpretando");
  interpretar(AST_xPath,parserXML.json);
  //interpretar(AST_xPath,AST_xml);
  //imprimiConsola("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;");
 // imprimiConsola(parseCadena.parse("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;"));
  
}

let listaTokens = [];
let listaErrores = [];
function generTabla() {
  if(listaErrores.length){
    document.getElementById("msgError").style.display="block";
  }else{
    document.getElementById("msgError").style.display="none";
  }
  let titulo = document.getElementById("tbl_titulo");
  for (const token of listaErrores) {
    titulo.insertAdjacentHTML(
      "afterend",
      "<tr class='contenido'><td>" +
        token.analizador +
        "</td><td>" +
        token.tipo +
        "</td><td>" +
        token.descripcion +
        "</td><td>" +
        token.linea +
        "</td><td>" +
        token.columna +
        "</td></tr >"
    );
  }

  document.getElementById("tbl_simbolos").style.display = "block";
}
function imprimiConsola(txt){
    document.getElementById("consolaPython").value=txt+"\n";
}
document.getElementById("msgError").style.display="none";



