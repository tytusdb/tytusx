let errorTableXml, symbolTableXml;
let errorTableXpath, tokenTableXpath;
let xmlEditor, xpathEditor, consoleResult, grammarReport;


let dotStringCst = "",
  dotStringAst = `digraph G {
        n0 [ label = "BEGIN ASC" ];
        n1 [ label = "EXP" ];
        n0 -> n1; 
        n2 [ label = "ADDITIVEEXPR" ];
        n1 -> n2; 
        n3 [ label = "NUMERICLITERAL" ];
        n2 -> n3; 
        n4 [ label = "1" ];
        n3 -> n4; 
        n5 [ label = "+" ];
        n2 -> n5; 
        n6 [ label = "NUMERICLITERAL" ];
        n2 -> n6; 
        n7 [ label = "2" ];
        n6 -> n7; 
        n8 [ label = "EOF" ];
        n0 -> n8; 
        }`;

let dataTest1 = [
  {
    "Error Type": "Lexico",
    "Row": "50",
    "Column": "10",
    "Description": "akljf lajfdlajlsfdjla sfjd",
  },
  {
    "Error Type": "Semantico",
    "Row": "20",
    "Column": "5",
    "Description": "fjfjfj akljf lajfdlajlsfdjla sfjd",
  },
  {
    "Error Type": "Sintactico",
    "Row": "30",
    "Column": "8",
    "Description": "jajajaja akljf lajfdlajlsfdjla sfjd",
  }
]

let dataTest2 = [
  {
    "Error Type": "Lexico 2",
    "Row": "50",
    "Column": "10",
    "Description": "description 1",
  },
  {
    "Error Type": "Semantico 2",
    "Row": "20",
    "Column": "5",
    "Description": "description 2",
  },
  {
    "Error Type": "Sintactico 2",
    "Row": "30",
    "Column": "8",
    "Description": "description 3",
  }
]

$(document).ready(function () {

  errorTableXml = $('#errorTableXml').DataTable();
  symbolTableXml = $('#symbolTableXml').DataTable();
  errorTableXpath = $('#errorTableXpath').DataTable();
  tokenTableXpath = $('#tokenTableXpath').DataTable();

  $('.tabs').tabs();
  $("select").formSelect();
  $('.tooltipped').tooltip();

  xmlEditor = editor('xml__editor', 'xml');
  xpathEditor = editor('xpath__editor', 'xquery');
  consoleResult = editor('console__result', '', false, true, false);
  grammarReport = editor('grammar__report__editor', 'xml', false, true, false);
});




/**
 * create a new instance of codemirror
 * @param {*} id            id from textarea
 * @param {*} language      lenguage highlighter
 * @param {*} lineNumbers   true = show line numbers; false: not show line numbers; default = true
 * @param {*} readOnly      true = the editor will be read only, otherwaise not; default = false
 * @param {*} styleActiveLine true =  gives the wrapper of the line that contains the cursor, otherwaise not; default = false
 * @returns  new instance of CodeMirror
 */
function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
  return CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers,
    mode: language,
    styleActiveLine,
    readOnly,
    theme: "material-ocean", //"yonce",
    setSize: ("100%", "95%"),
  });

}




/**
 * Open a text file
 * @param {*} editor editor where the content of the file will be displayed  
 */
const openFile = async (editor) => {

  const { value: file } = await Swal.fire({
    title: 'Select File',
    input: 'file',

  })
  if (!file) return

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    editor.setValue(file);
  }
  reader.onerror = (e) => {
    console.log("Error to read file", e.target.error)
  }
  reader.readAsText(file)
}



/**
 * Save editor content 
 * @param {*} fileName      file name
 * @param {*} extension     file extension
 * @param {*} editor        editor with the content to save
 */
const saveFile = async (fileName, extension, editor) => {
  if (!fileName) {
    const { value: name } = await Swal.fire({
      title: 'Enter File name',
      input: 'text',
      inputLabel: 'File name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    fileName = name;
  }
  if (fileName) {
    download(`${fileName}.${extension}`, editor.getValue())
  }
}



/**
 * Dowload a file.
 * @param {*} name file name
 * @param {*} content file content
 */
const download = (name, content) => {
  let blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  let link = document.getElementById('download');
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", name)
  link.click()
}



/**
 * Clean an editor's content.
 * @param {*} editor editor to clean the content.
 */
const cleanEditor = (editor) => {
  editor.setValue("");
}


/**
 * Performs top-down parsing of XML
 */
const analysDescXml = () => {

  console.log('Analizador Descendente')
  var texto = xmlEditor.getValue();
  var path = xpathEditor.getValue();

  //creacion del arbol
  const raiz_arbol = gramdesc.parse(texto);
  console.log(raiz_arbol);

  //creacion de la tabla de simbolos
  const tabla_simbolos = new Tabla_Simbolos(CrearTabla(raiz_arbol.objeto));
  console.log(tabla_simbolos);

  //generacion del arbol 
  dotStringCst = CST_XML(raiz_arbol.objeto);

  //generacion reporte tabla de simbolos
  const TablaSimbolos = ReporteTabla(tabla_simbolos.simbolos, 'Global', []);
  console.log(TablaSimbolos);

  //test consulta
  let entrada = path.split('/')
  entrada.splice(0, 1);
  const consulta = new Consulta(entrada, 1, 1);
  console.log('Entrada: ' + entrada);
  consulta.ejecutar(tabla_simbolos.simbolos, {});



  //cargando datos a tabla de simbolos
  symbolTableXml.destroy();
  symbolTableXml = newDataTable('#symbolTableXml',
    [{ data: "Idientifier" }, { data: "Type" }, { data: "Value" }, { data: "Row" }, { data: "Column" }, { data: "Environment" }],
    TablaSimbolos);
  //cargando datos a tabla de errores
  errorTableXml.destroy();
  errorTableXml = newDataTable('#errorTableXml',
    [{ data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" }],
    raiz_arbol.errores);

}

/**
 * Perform bottom-up parsing of XML
 */

var count_temp = 0;

const analysAscXml = () => {

  console.log('Analizador Ascendente')
  var texto = xmlEditor.getValue();
  var path = xpathEditor.getValue();

  //creacion del arbol
  const raiz_arbol = gramasc.parse(texto);
  console.log(raiz_arbol);

  //creacion de la tabla de simbolos
  const tabla_simbolos = new Tabla_Simbolos(CrearTabla(raiz_arbol.objeto));
  console.log(tabla_simbolos);

  //generacion del arbol
  dotStringCst = CST_XML(raiz_arbol.objeto);

  //generacion reporte tabla de simbolos
  const TablaSimbolos = ReporteTabla(tabla_simbolos.simbolos, 'Global', []);
  console.log(TablaSimbolos);

  //test consulta
  let entrada = path.split('/')
  entrada.splice(0, 1);
  const consulta = new Consulta(entrada, 1, 1);
  console.log('Entrada: ' + entrada);
  consulta.ejecutar(tabla_simbolos.simbolos, {});


  //cargando datos a tabla de simbolos
  symbolTableXml.destroy();
  symbolTableXml = newDataTable('#symbolTableXml',
    [{ data: "Idientifier" }, { data: "Type" }, { data: "Value" }, { data: "Row" }, { data: "Column" }, { data: "Environment" }],
    TablaSimbolos);
  //cargando datos a tabla de errores
  errorTableXml.destroy();
  errorTableXml = newDataTable('#errorTableXml',
    [{ data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" }],
    raiz_arbol.errores);

}

function CrearTabla(objeto) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //definiendo valores
    let id = objeto.identificador;
    let tipo = 'etiqueta'
    let valor = objeto.texto;
    let linea = objeto.linea;
    let columna = objeto.columna;
    //creando el simbolo (entorno)
    let entorno = new Simbolo(id, tipo, valor, linea, columna, [])

    //creando entornos hijos
    if (objeto.listaAtributos != undefined) {
      objeto.listaAtributos.forEach(atr => {
        //definiendo valores
        let id = atr.identificador;
        let tipo = 'atributo'
        let valor = atr.valor;
        let linea = atr.linea;
        let columna = atr.columna;
        //creando el simbolo (entorno)
        let entorno_new = new Simbolo(id, tipo, valor, linea, columna, [])
        //agregando el entorno nuevo
        entorno.entorno.push(entorno_new)
      });
    }
    //recursividad hijos
    objeto.listaObjetos.forEach(obj => {
      //llamado recursivo
      entorno.entorno.push(CrearTabla(obj));
    });
    //retornando valor
    return entorno;
  }
}

function ReporteTabla(objeto, entorno, tabla) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //definiendo valores
    let simbolo = {
      'Idientifier': objeto.id,
      'Type': objeto.tipo,
      'Value': objeto.valor,
      'Row': objeto.linea,
      'Column': objeto.columna,
      'Environment': entorno
    }
    tabla.push(simbolo);
    //recursividad entornos
    objeto.entorno.forEach(obj => {
      //llamado recursivo
      tabla = ReporteTabla(obj, objeto.id, tabla);
    });
    return tabla;
  }
}

function CST_XML(objeto) {
  var text = ''
  text += CrearCST(objeto, 1, text + 'digraph G {\n')
  text += '}'
  count_temp = 0;
  return text;
}

function CrearCST(objeto, count, node) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //creando contador temporal 
    count_temp = count + 1;
    //creando nodo
    node += count + '[label="' + objeto.identificador + '"];\n';
    //creando nodos si contiene atributos
    if (objeto.listaAtributos.length > 0) {
      objeto.listaAtributos.forEach(atr => {
        node += count_temp + '[label="' + atr.identificador + '"];\n';
        node += count + '--' + count_temp + ';\n';
        count_temp++;
      });
    }
    if (objeto.listaObjetos.length > 0) {
      objeto.listaObjetos.forEach(obj => {
        node += count + '--' + count_temp + ';\n';
        // let node_temp = CrearCST(obj, count_temp2, '');
        let node_temp = CrearCST(obj, count_temp, '');
        node += node_temp

        count_temp++;
      });
    }

    //retornando nodo
    count++;
    return node;
  }
}




/**
 * Performs top-down parsing of XPATH
 */
const analysDescXpath = () => {

  console.log('Analizador XPath desc')
  var path = xpathEditor.getValue();

  //ParserXPath
  const xpath_in = gram_xpath_desc.parse(path);
  console.log(xpath_in);





  errorTableXpath.destroy();
  errorTableXpath = newDataTable('#errorTableXpath',
    [{ data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" }],
    dataTest1);

  consoleResult.setValue("DESC XPATH FINISHED");
}


/**
 * Perform bottom-up parsing of XPATH
 */
const analysAscXpath = () => {

  console.log('Analizador XPath desc')
  var path = xpathEditor.getValue();

  //ParserXPath
  const xpath_in = gram_xpath_asc.parse(path);
  console.log(xpath_in);



  errorTableXpath.destroy();
  errorTableXpath = newDataTable('#errorTableXpath',
    [{ data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" }],
    dataTest2);

  consoleResult.setValue("ASC XPATH FINISHED");


}

/**
 *  Reinitialize data table
 * @param {*} id        id from table whit '#' -> exampble: #{id}
 * @param {*} columns   arrays of objects with columns name  -> [ { data: "columnName" }, { data: "columnName" }, ]
 * @param {*} data      array of objects with table data -> [ { "columnName": "data" }, { "columnName": "data" } ]
 * @returns             data table
 */
const newDataTable = (id, columns, data) => {
  let result = $(id).DataTable({
    responsive: true,
    lengthMenu: [[5, 10, 15, 25, 50, -1], [5, 10, 15, 25, 50, "All"]],
    "lengthChange": true,
    data,
    columns
  });
  $('select').formSelect();
  return result;
}



const btnOpenXml = document.getElementById('btn__open__xml'),
  btnSaveXml = document.getElementById('btn__save__xml'),
  btnCleanXml = document.getElementById('btn__clean__xml'),
  btnShowCst = document.getElementById('showCST'),
  btnDescXml = document.getElementById('btn__descAnalysis__xml'),
  btnAscXml = document.getElementById('btn__ascAnalysis__xml'),
  btnOpenXpath = document.getElementById('btn__open__xpath'),
  btnSaveXpath = document.getElementById('btn__save__xpath'),
  btnCleanXpath = document.getElementById('btn__clean__xpath'),
  btnShowAst = document.getElementById('showAST');
btnDescXpath = document.getElementById('btn__descAnalysis__xpath'),
  btnAscXpaht = document.getElementById('btn__ascAnalysis__xpath')

btnOpenXml.addEventListener('click', () => openFile(xmlEditor));
btnSaveXml.addEventListener('click', () => saveFile("database", "xml", xmlEditor));
btnCleanXml.addEventListener('click', () => cleanEditor(xmlEditor));
btnShowCst.addEventListener('click', () => localStorage.setItem("dot", dotStringCst));
btnDescXml.addEventListener('click', () => analysDescXml());
btnAscXml.addEventListener('click', () => analysAscXml());

btnOpenXpath.addEventListener('click', () => openFile(xpathEditor));
btnSaveXpath.addEventListener('click', () => saveFile("query", "txt", xpathEditor));
btnCleanXpath.addEventListener('click', () => cleanEditor(xpathEditor));
btnShowAst.addEventListener('click', () => localStorage.setItem("dot", dotStringAst));
btnDescXpath.addEventListener('click', () => analysDescXpath());
btnAscXpaht.addEventListener('click', () => analysAscXpath());