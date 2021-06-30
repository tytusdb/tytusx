// BOTONES PARA ANALIZAR
//Analizar
let botonCargar = document.getElementById("btnCargar");
let botonCargar2 = document.getElementById("btnCargar2");
let editorXPATH = (document.getElementById("editor").value = "/bookstore");
let editorXML = document.getElementById("consolaJS");
let indiceAux=0;
let tipoAnalizadorXML = "";
let tablaSimbolos = [];
let listaTokens=[];
let parserXML;
let parserXPATHDER;
let globalencod;
let codificador = document.getElementById("codencod");
let optimizador;

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
      <title>Empire Burlesque</title>
      <author>Bob Dylan</author>
      <country>USA</country>
      <company>Columbia</company>
      <price>10.90</price>
      <year>1985</year>
   </book>
   <book category="EL BICHO">
      <title>Hide your heart</title>
      <author>Bonnie Tyler</author>
      <country>UK</country>
      <company>CBS Records</company>
      <price>9.90</price>
      <year>1988</year>
   </book>
   <book category="EL BICHO">
      <title>Greatest Hits</title>
      <author>Dolly Parton</author>
      <country>USA</country>
      <company>RCA</company>
      <price>9.90</price>
      <year>1982</year>
   </book>
   <book category="STORY">
      <title>Still got the blues</title>
      <author>Gary Moore</author>
      <country>UK</country>
      <company>Virgin records</company>
      <price>10.20</price>
      <year>1990</year>
   </book>
   <book category="COOKING" category="SITES">
      <!-- Este titulo tiene un & -->
      <title>Eros &amp; Eros</title>
      <author>Eros Ramazzotti</author>
      <country>EU</country>
      <company>BMG</company>
      <price>9.90</price>
      <year>1997</year>
   </book>
   <book category="PINES">
      <!-- Este titulo estará entre comillas dobles  -->
      <title> &quot; Esto tiene que salir bien &quot;</title>
      <author>Bee Gees</author>
      <country>UK</country>
      <company>Polydor</company>
      <price>10.90</price>
      <year>1998</year>
   </book>
   <book category="SPAGET">
      <!-- Este titulo estará entre comilla simples -->
      <title>&apos; Esto tiene que salir muy bien tambien &apos;</title>
      <author>Dr.Hook</author>
      <country>UK</country>
      <company>CBS</company>
      <price>8.10</price>
      <year>1973</year>
   </book>
   <book category="EL BICHO">
      <title>Maggie May</title>
      <author>Rod Stewart</author>
      <country>UK</country>
      <company>Pickwick</company>
      <price>8.50</price>
      <year>1990</year>
   </book>
   <book category="COOKING" category="FANTASY">
      <title>Romanza</title>
      <author>Andrea Bocelli</author>
      <country>EU</country>
      <company>Polydor</company>
      <price calificacion="hola">10.80</price>
      <year>1996</year>
   </book>
   <book category="DIAGRAM">
      <title>When a man loves a woman</title>
      <author>Percy Sledge</author>
      <country>USA</country>
      <company>Atlantic</company>
      <price>8.70</price>
      <year>1987</year>
   </book>
   <book category="CELL">
      <title>Black angel</title>
      <author>Savage Rose</author>
      <country>EU</country>
      <company>Mega</company>
      <price>10.90</price>
      <year>1995</year>
   </book>
   <book category="DBZ">
      <title>1999 Grammy Nominees</title>
      <author>Many</author>
      <country>USA</country>
      <company>Grammy</company>
      <price>10.20</price>
      <year>1999</year>
   </book>
   <book category="AMONG US">
      <title>For the good times</title>
      <author>Kenny Rogers</author>
      <country>UK</country>
      <company>Mucik Master</company>
      <price>8.70</price>
      <year>1995</year>
   </book>
   <book category="EL BICHO">
      <title>Big Willie style</title>
      <author>Will Smith</author>
      <country>USA</country>
      <company>Columbia</company>
      <price>9.90</price>
      <year>1997</year>
   </book>
   <book category="GUERRA">
      <title>Tupelo Honey</title>
      <author>Van Morrison</author>
      <country>UK</country>
      <company>Polydor</company>
      <price>8.20</price>
      <year>1971</year>
   </book>
   <book category="ALIANZA">
      <title>Soulsville</title>
      <author>Jorn Hoel</author>
      <country>Norway</country>
      <company>WEA</company>
      <price>7.90</price>
      <year>1996</year>
   </book>
   <book category="TOPOS">
      <title>The very best of</title>
      <author>Cat Stevens</author>
      <country>UK</country>
      <company>Island</company>
      <price>8.90</price>
      <year>1990</year>
   </book>
   <book category="CARRILES">
      <title>Stop</title>
      <author>Sam Brown</author>
      <country>UK</country>
      <company>A and M</company>
      <price>8.90</price>
      <year>1988</year>
   </book>
   <book category="EL BICHO">
      <title>Bridge of Spies</title>
      <author>T&apos;Pau</author>
      <country>UK</country>
      <company>Siren</company>
      <price>7.90</price>
      <year>1987</year>
   </book>
   <book category="DANZA">
      <title>Private Dancer</title>
      <author>Tina Turner</author>
      <country>UK</country>
      <company>Capitol</company>
      <price>8.90</price>
      <year>1983</year>
   </book>
   <book category="ENGLISH">
      <title>Midt om natten</title>
      <author>Kim Larsen</author>
      <country>EU</country>
      <company>Medley</company>
      <price>7.80</price>
      <year>1983</year>
   </book>
   <book category="ITALY">
      <title>Pavarotti Gala Concert</title>
      <author>Luciano Pavarotti</author>
      <country>UK</country>
      <company>DECCA</company>
      <price>9.90</price>
      <year>1991</year>
   </book>
   <book category="ROCK">
      <title>The dock of the bay</title>
      <author>Otis Redding</author>
      <country>USA</country>
      <company>Stax Records</company>
      <price>7.90</price>
      <year>1968</year>
   </book>
   <book category="EL BICHO">
      <title>Picture book</title>
      <author>Simply Red</author>
      <country>EU</country>
      <company>Elektra</company>
      <price>7.20</price>
      <year>1985</year>
   </book>
   <book category="LONDON">
      <title>Red</title>
      <author>The Communards</author>
      <country>UK</country>
      <company>London</company>
      <price>7.80</price>
      <year>1987</year>
   </book>
   <book category="EL BICHO">
      <title>Unchain my heart</title>
      <author>Joe Cocker</author>
      <country>USA</country>
      <company>EMI</company>
      <price>8.20</price>
      <year>1987</year>
   </book>
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

let XQuery = `for $x in (1 to 5)
return <test>{$x}</test>
`




editorXQUERY.value=XQuery;

editorXML.value = textoEntrada;
let consolaC3D = document.getElementById('consola3D');
let consolaC3DOptimizada = document.getElementById('consola3DOptimizada');


// ======================================
//BOTON DE XML DESCENDENTE
// ======================================


// Analizar la entrada XML al hacer CLICK al boton
botonCargar.addEventListener("click", () => {
    alert("Ejecutando XML Descendente");

    tipoAnalizadorXML = "Descendente";

    // Analizador XML por la izquierda
    parserXML = xmlDerecha.parse(editorXML.value);

    console.log("EL ANALIZADOR REGRESA");
    console.log(parserXML);
    console.log("tipo de encoding: " + parserXML.tipoencoding);    

    codificador.innerHTML = parserXML.tipoencoding;
    globalencod =parserXML.tipoencoding;
    //console.log(consulta_xml.parse("<price>5.95</price>"));

    // Se genera la Tabla de Simbolos
    tablaSimbolos = new TablaSimbolos(parserXML.json);
    tablaSimbolos = tablaSimbolos.generarTabla();


})

// ======================================
//BOTON DE XML ASCENDENTE
// ======================================


botonCargar2.addEventListener("click", () => {
  alert("Ejecutando XML Ascendente");

  tipoAnalizadorXML = "Ascendente";

  // Analizador XML por la izquierda
  parserXML = analizador_izq.parse(editorXML.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXML);
  console.log("tipo de encoding: " + parserXML.tipoencoding);    

  codificador.innerHTML = parserXML.tipoencoding;
  globalencod =parserXML.tipoencoding;

  // Se genera la Tabla de Simbolos
  tablaSimbolos = new TablaSimbolos(parserXML.json);
  tablaSimbolos = tablaSimbolos.generarTabla();
})


// ======================================
//BOTON DE XPATH ARBOL AST
// ======================================


document.getElementById("ast").addEventListener("click", () => {
    let AST_xPath=analizadorizq_xpath.parse(document.getElementById("editor").value);
  
    // Se activa el modal
    activarModal();

    // Generar el arbol con Treant JS
    graficarArbol(AST_xPath);
  
})

// ======================================
//BOTON DE XPATH ARBOL CST
// ======================================


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

  
  // Agregar las cabeceras
  tablaCabeceras.innerHTML = `
  <th scope="col">Nombre</th>
  <th scope="col">Tipo</th>
  <th scope="col">Ambito</th>
  <th scope="col">Fila</th>
  <th scope="col">Columna</th>
  <th scope="col">Valor</th>
  <th scope="col">Indice</th>
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
        <td>${simbolo.indice === -1 ? '' : simbolo.indice}</td>
      </tr>
    `;
  });
});

// ======================================
//BOTON DE XML DE REPORTE DE ARBOL CST
// ======================================

// REPORTE DEL CST
btnReporteXMLCST.addEventListener("click", () => {

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(parserXML.json.nodo);

});

// ======================================
//BOTON DE REPORTE DE GRAMATICA
// ======================================

// REPORTE DE LA GRAMATICA
btnReporteGram.addEventListener('click', () => {
  tablaTituloCST.innerHTML = 'Reporte Gramatical XML ' + tipoAnalizadorXML;

  contenidoModal2.innerHTML = `<textarea style="width: 38%; height: 700px; resize: none;">${parserXML.gramatical}</textarea>
  <textarea style="width: 60%; height: 700px; resize: none;">${parserXML.gramaticapp}</textarea>
  `;
});

// ======================================
//BOTON DE REPORTE DE ERRORES
// ======================================

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

  

  console.log("Analizando XPATH...");
 
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
let boton3D = document.getElementById('btn3d');
    

boton3D.addEventListener("click", () => {

  // Mostrar el C3D Traducido
  if (tablaSimbolos.length > 0) {
    consolaC3D.value = traductorC3D.obtenerCodigo();
  }

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
/*
btnCargarxqueryder.addEventListener("click", () => {
  console.log("Analizando XQUERY ")
  tipoAnalizadorXML = "DESCENDENTE";

  // Analizador XQUERY por la DERECHA
  parserXQUERYder = analizador_xqueryder.parse(editorXQUERY.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXQUERYder);


})*/
document.getElementById("btnReporteXQUERYcst").addEventListener("click", () => {
  let AST_xQuery=analizador_xquery_ast.parse(editorXQUERY.value);

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(AST_xQuery);

})

let botonCargar3 = document.getElementById("btnCargar3");
botonCargar3.addEventListener("click", () => {
  alert("Vaciaste el consola");
  editorXML.value = " ";
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




// FUNCION PARA COPIAR
let copyButton = document.getElementById('copyBtn');
let clearButton = document.getElementById('clearBtn');

copyButton.addEventListener('click', () => {

  if (consolaC3D.value.trim() !== '') {
    alert("Copiado");
    consolaC3D.select();
    document.execCommand('Codigo Copiado');
  } else {
    alert("No hay codigo");
  }

});

clearButton.addEventListener('click', () => {
  consolaC3D.value = '';
  consolaC3DOptimizada.value = '';
})


// Optimizacion de Codigo de 3D
let optimizarButton = document.getElementById('optimizarBtn');
let optimizarReporteButton = document.getElementById("btnReporteOptimizar");


optimizarButton.addEventListener("click", () => {

  if (consolaC3D.value.trim() !== '') {

    alert('Optimizando');
    optimizador = new Optimizacion(consolaC3D.value);
    optimizador.regla5();
    optimizador.regla6_7_8_9();
    consolaC3DOptimizada.value = optimizador.obtenerOptimizacion();

  } else {
    alert('No hay codigo en 3Direcciones para optimizar');
  }

});


optimizarReporteButton.addEventListener("click", () => {

  tablaTitulo.innerHTML = 'Reporte Optimizaciones';
  tabla.innerHTML = "";

  if (optimizador) {
    let bitacoraOptimizacion = optimizador.bitacoraOptimizaciones;

    // Agregar las cabeceras
    tablaCabeceras.innerHTML = `
    <th scope="col">Linea</th>
    <th scope="col">Regla</th>
    <th scope="col">Instruccion</th>
    <th scope="col">Cambio</th>
    `;

    console.log(bitacoraOptimizacion);

    // Agregar contenido a la tabla
    bitacoraOptimizacion.forEach(optimizacion => {
      tabla.innerHTML += `
        <tr>
          <td>${optimizacion.linea}</td>
          <td>${optimizacion.regla}</td>
          <td>${optimizacion.instruccion}</td>
          <td>${optimizacion.cambio}</td>
        </tr>
      `;
    });
    }

});

