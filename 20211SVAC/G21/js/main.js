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

$(document).ready(function(){
    
    errorTableXml   =  $('#errorTableXml').DataTable();
    symbolTableXml  =  $('#symbolTableXml').DataTable();
    errorTableXpath =  $('#errorTableXpath').DataTable();
    tokenTableXpath =  $('#tokenTableXpath').DataTable();
    
    $('.tabs').tabs();
    $("select").formSelect();
    $('.tooltipped').tooltip();

    xmlEditor       = editor('xml__editor', 'xml');
    xpathEditor     = editor('xpath__editor', 'xquery');
    consoleResult   = editor('console__result', '', false, true, false);
    grammarReport   = editor('grammar__report__editor', 'xml', false, true,false);
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
function editor(id, language, lineNumbers=true, readOnly=false, styleActiveLine=true){
  return CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers,
    mode: language,
    styleActiveLine,
    readOnly,
    theme: "material-ocean", //"yonce",
    setSize: ("100%","95%"),
  });

}




/**
 * Open a text file
 * @param {*} editor editor where the content of the file will be displayed  
 */
const openFile = async ( editor ) =>  {
    
    const { value: file } = await Swal.fire({
    title: 'Select File',
    input: 'file',

    })
    if (!file) return

    let reader = new FileReader();

    reader.onload = (e) => {
    const file = e.target.result;
    editor.setValue( file );
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
const saveFile = async ( fileName, extension, editor ) => {
  if ( !fileName ){
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
  if ( fileName ) {
    download( `${fileName}.${extension}`, editor.getValue() )
  }
}



/**
 * Dowload a file.
 * @param {*} name file name
 * @param {*} content file content
 */
const download = ( name, content) => {
  let blob = new Blob( [content], { type: 'text/plain;charset=utf-8'})
  let link = document.getElementById('download');
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", name)
  link.click()
}



/**
 * Clean an editor's content.
 * @param {*} editor editor to clean the content.
 */
const  cleanEditor = ( editor ) => {
    editor.setValue("");
}


/**
 * Performs top-down parsing of XML
 */
const analysDescXml = () => {
    console.log("DESC XML");

}

/**
 * Perform bottom-up parsing of XML
 */
const analysAscXml  = () => {
    console.log("ASC XML");

}

/**
 * Performs top-down parsing of XPATH
 */
const analysDescXpath = () => {

    errorTableXpath.destroy();
    errorTableXpath = newDataTable('#errorTableXpath', 
                                   [ { data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" } ],
                                   dataTest1 );

    consoleResult.setValue("DESC XPATH FINISHED");
}


/**
 * Perform bottom-up parsing of XPATH
 */
const analysAscXpath = () => {
    console.log("ASC XPATH FINISHED");

    errorTableXpath.destroy();
    errorTableXpath = newDataTable('#errorTableXpath', 
                                   [ { data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" } ],
                                   dataTest2 );

    consoleResult.setValue("ASC XPATH FINISHED");


}

/**
 *  Reinitialize data table
 * @param {*} id        id from table whit '#' -> exampble: #{id}
 * @param {*} columns   arrays of objects with columns name  -> [ { data: "columnName" }, { data: "columnName" }, ]
 * @param {*} data      array of objects with table data -> [ { "columnName": "data" }, { "columnName": "data" } ]
 * @returns             data table
 */
const newDataTable = ( id, columns, data ) => {
    let result =  $(id).DataTable( {
        responsive: true,
        lengthMenu: [ [ 5, 10, 15, 25, 50, -1 ], [ 5, 10, 15, 25, 50, "All" ] ],
        "lengthChange": true,
        data,
        columns
    } );
      $('select').formSelect();
    return result;
}



const btnOpenXml    = document.getElementById('btn__open__xml'),
      btnSaveXml    = document.getElementById('btn__save__xml'),
      btnCleanXml   = document.getElementById('btn__clean__xml'),
      btnShowCst    = document.getElementById('showCST'),
      btnDescXml    = document.getElementById('btn__descAnalysis__xml'),
      btnAscXml     = document.getElementById('btn__ascAnalysis__xml'),
      btnOpenXpath  = document.getElementById('btn__open__xpath'),
      btnSaveXpath  = document.getElementById('btn__save__xpath'),
      btnCleanXpath = document.getElementById('btn__clean__xpath'),
      btnShowAst    = document.getElementById('showAST');
      btnDescXpath  = document.getElementById('btn__descAnalysis__xpath'),
      btnAscXpaht   = document.getElementById('btn__ascAnalysis__xpath')

btnOpenXml.addEventListener( 'click', () => openFile( xmlEditor ) );
btnSaveXml.addEventListener( 'click', () => saveFile( "database", "xml", xmlEditor ) );
btnCleanXml.addEventListener( 'click', () => cleanEditor( xmlEditor ) );
btnShowCst.addEventListener( 'click', () => localStorage.setItem("dot", dotStringCst ) );
btnDescXml.addEventListener( 'click', () => analysDescXml() );
btnAscXml.addEventListener( 'click', () => analysAscXml() );

btnOpenXpath.addEventListener( 'click', () => openFile( xpathEditor ) );
btnSaveXpath.addEventListener( 'click', () => saveFile( "query", "txt", xpathEditor ) );
btnCleanXpath.addEventListener( 'click', () => cleanEditor( xpathEditor ) );
btnShowAst.addEventListener( 'click', () => localStorage.setItem("dot", dotStringAst ) );
btnDescXpath.addEventListener( 'click', () => analysDescXpath() );
btnAscXpaht.addEventListener( 'click', () => analysAscXpath() );