//import { Ast } from "./Estructuras/Ast/Ast";
//import { Ast } from "./Estructuras/Ast/NodoAst";
//import { Entorno } from "./AST/Entorno";
//import {  } from "./Interfaces/Instruccion";

const gramatica = require('./Gramatica/gramatica');
//const estructuras1 = require('./Estructuras/Ast/NodoAst');
//const estructuras2 = require('./Estructuras/Ast/Ast');

//Editor Entrada Y Salida
const editorentrada = ace.edit("editorentrada");
editorentrada.setTheme("ace/theme/monokai");
editorentrada.session.setMode("ace/mode/xml");
editorentrada.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false
});

editorentrada.session.setUseSoftTabs(true);
const editorsalida = ace.edit("editorsalida");
editorsalida.setTheme("ace/theme/monokai");
editorsalida.session.setMode("ace/mode/xml");
editorsalida.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false
});
editorsalida.session.setUseSoftTabs(true);

function ejecutarCodigo(/*entrada: string*/) {
  //gramatica.parse(entrada);
}

function InterpretarCodigo() {
  var entrada = editorentrada.getValue();
  var salida = gramatica.parse(entrada);
  try {
    //editorsalida.setValue(salida);
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
  } catch (error) {
    editorsalida.setValue("");
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
  }
}

/*
ejecutarCodigo(`
<bookstore>
<book>
  <title lang = "en">Harry d</title>
  <author>Rowling</author>
  <year>2005</year>
  <price>29.99</price>
</book>
</bookstore>
`);*/
