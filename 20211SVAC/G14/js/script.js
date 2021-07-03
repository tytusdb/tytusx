const Simbolo = require("../InterpreteXML/TablaSimbolo/Simbolo");
var scriptXML = require("./scriptXML");

document.getElementById("file").addEventListener("change", add, false);
document
  .getElementById("openBrowser")
  .addEventListener("click", openBrowser, false);
document.getElementById("Download").addEventListener("click", Download, false);
document.getElementById("Clean").addEventListener("click", Clean, false);
document.getElementById("Ejecutar").addEventListener("click", Ejecutar, false);

var editor = CodeMirror(document.getElementById("codemirror"), {
  mode: "xml",
  lineNumbers: true,
  theme: "dracula",
  autoRefresh: true,
});
editor.setSize("100%", "100%");

var xpath = CodeMirror(document.getElementById("xpath"), {
  mode: "text",
  theme: "dracula",
  //autoRefresh: true
});
xpath.setSize("100%", "100%");

var res = CodeMirror(document.getElementById("resultado"), {
  mode: "xml",
  lineNumbers: true,
  theme: "dracula",
  autoRefresh: true,
});
res.setSize("100%", "100%");

var container = document.getElementById("grafoXML");
var container2 = document.getElementById("grafoXPATH");

function openBrowser() {
  let fileinput = document.getElementById("file");
  fileinput.click();
}

function add(evt) {
  let fil = evt.target.files[0];
  if (!fil) {
    return;
  }

  if (fil.type == "text/xml") {
    let cuerpo = "";
    let lector = new FileReader();
    lector.onload = function (evt) {
      cuerpo = evt.target.result;
      editor.getDoc().setValue(cuerpo);
    };

    lector.readAsText(fil);
  } else {
    alert("Por favor seleccione un archivo XML.");
  }
}

function Download() {
  let content = editor.getDoc().getValue();
  let nombre = "archivo.xml"; //nombre del archivo
  let file = new Blob([content], { type: "xml" });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, nombre);
  } else {
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function Clean() {
  editor.getDoc().setValue("");
}

function Ejecutar() {
  let objetos = "";
  let contentXML = editor.getDoc().getValue();
  let contentXPath = xpath.getDoc().getValue();
  let Tablasimbolos = "";
  let objetosxpath = "";
  if (document.getElementById("aXml").checked) {
    objetos = scriptXML.ParsearAsc(contentXML);
    Tablasimbolos = scriptXML.BuildSimbolTable(objetos[1]);
    objetosxpath = scriptXML.ParsearAscPath(contentXPath);
  } else {
    objetos = scriptXML.ParsearDesc(contentXML);
    Tablasimbolos = scriptXML.BuildSimbolTable(objetos[1]);
  }
  scriptXML.Graficar(objetos);
  $("#cst-xml").show();
  MostrarCST(scriptXML.dot, container);
  MostrarSimbolos(Tablasimbolos);
  $("#ast-xpath").show();
  scriptXML.GraficarAST(objetosxpath);
  MostrarCST(scriptXML.dot, container2);

  if (document.getElementById("aXPath").checked) {
    alert("Y analisis de XPath ascendente");
  } else {
    alert("Analisis de XML descendente");
  }
}

function MostrarCST(DOTstring, id_div) {
  var parsedData = vis.network.convertDot(DOTstring);
  var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges,
  };

  var options = {
    scale: 0.8,
    nodes: {
      shape: "box",
      size: 15,
      font: {
        color: "#282a36",
        face: "helvetica",
      },
      color: "#ffffff",
    },
    edges: {
      smooth: false,
      arrows: {
        to: true,
      },
    },
    layout: {
      //Clasificación
      hierarchical: {
        levelSeparation: 150, // La distancia entre diferentes niveles
        nodeSpacing: 200, // La distancia mínima entre nodos en el eje libre
        treeSpacing: 500, // La distancia entre diferentes árboles
        // dirección
        direction: "UD",
        sortMethod: "directed", // hubsize, directed
      },
    },
  };

  var network = new vis.Network(id_div, data, options);
}

var cont = 1;
function MostrarSimbolos(simbolos) {
  $("#simbolTable").show();
  let $cuerpo = document.getElementById("tbodyJS");
  cont = 1;
  $cuerpo.innerHTML = "";

  let $tr = document.createElement("tr");
  // Número
  let $conta = document.createElement("th");
  $conta.textContent = cont;
  $tr.appendChild($conta);
  cont = cont + 1;
  // ID
  let $id = document.createElement("td");
  $id.textContent = "Global";
  $tr.appendChild($id);
  // Valor
  let $valor = document.createElement("td");
  $valor.textContent = "";
  $tr.appendChild($valor);
  // Entorno
  let $Entorno = document.createElement("td");
  $Entorno.textContent = "";
  $tr.appendChild($Entorno);

  $cuerpo.appendChild($tr);
  MostrarFilasTabla(simbolos, $cuerpo);
}

function MostrarFilasTabla(simbolo, cuerpo) {
  simbolo.entorno.forEach((element) => {
    let $tr = document.createElement("tr");
    // Número
    let $conta = document.createElement("th");
    $conta.textContent = cont;
    $tr.appendChild($conta);
    cont = cont + 1;
    // ID
    let $id = document.createElement("td");
    $id.textContent = element.id + element.indice;
    $tr.appendChild($id);
    // Valor
    let $valor = document.createElement("td");
    $valor.textContent = element.getValorImplicito();
    $tr.appendChild($valor);
    // Entorno
    let $Entorno = document.createElement("td");
    $Entorno.textContent = simbolo.id + simbolo.indice;
    $tr.appendChild($Entorno);

    cuerpo.appendChild($tr);
    MostrarFilasTabla(element, cuerpo);
  });
}
