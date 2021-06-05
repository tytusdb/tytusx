//import { Ast } from "./Estructuras/Ast/Ast";
//import { Ast } from "./Estructuras/Ast/NodoAst";
//import { Entorno } from "./AST/Entorno";
//import {  } from "./Interfaces/Instruccion";

//const gramatica = require('./Gramatica/gramatica');
//const estructuras1 = require('./Estructuras/Ast/NodoAst');
//const estructuras2 = require('./Estructuras/Ast/Ast');
//const analizador = require('./Analizador/Expresiones/Atributo');
//const objeto = require('./Analizador/Expresiones/Objeto');


//import { Atributo } from "./Analizador/Expresiones/Atributo";
//import { Atributo } from "./Analizador/Expresiones/Atributo";

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

let erroreslexicos:ListaErrores;
let erroressintacticos:ListaErrores;

function InterpretarCodigo() {
  var entrada = editorentrada.getValue();
  erroreslexicos = new ListaErrores();
  erroressintacticos = new ListaErrores();
  var salida = gramatica.parse(entrada);
  try {
    //editorsalida.setValue(salida);
    console.log(erroreslexicos);
    console.log(erroressintacticos)
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
  } catch (error) {
    editorsalida.setValue("");
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
  }
}

//Errores Lexicos del lenguaje XML

function MostrarErroresLexicosXML()
{
  try {
    let cadena:string = "";
    let p:number = 0;
    erroreslexicos.listaerrores.forEach(err => { 
      p = p + 1;
      cadena += "<tr>\n<th scope=\"row\">" + p + "</th>\n" +
          "<td scope=\"row\">" + err.lexema + "</td>\n" +
          "<td>" + err.descripcion + "</td>\n" +
          "<td>" + err.tipoerror + "</td>\n" +
          "<td>" + err.lenguaje + "</td>\n" +
          "<td>" + err.linea + "</td>\n" +
          "<td>" + err.columna + "</td>\n" +
          "</tr>\n";
    });
    document.getElementById('contlextraduccion').innerHTML = cadena;
  } catch (error) {
    
  }
}

//Errores Sintacticos del lenguaje XML
function MostrarErroresSintacticosXML()
{
  try {
    let cadena:string = "";
    let p:number = 0;
    erroressintacticos.listaerrores.forEach(err => { 
      p = p + 1;
      cadena += "<tr>\n<th scope=\"row\">" + p + "</th>\n" +
          "<td scope=\"row\">" + err.lexema + "</td>\n" +
          "<td>" + err.descripcion + "</td>\n" +
          "<td>" + err.tipoerror + "</td>\n" +
          "<td>" + err.lenguaje + "</td>\n" +
          "<td>" + err.linea + "</td>\n" +
          "<td>" + err.columna + "</td>\n" +
          "</tr>\n";
    });
    document.getElementById('contlextraduccion').innerHTML = cadena;
  } catch (error) {
    
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
