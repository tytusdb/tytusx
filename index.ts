

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
let listaObjetos;

function InterpretarCodigo() {
  var entrada = editorentrada.getValue();
  erroreslexicos = new ListaErrores();
  erroressintacticos = new ListaErrores();
  listaObjetos = gramatica.parse(entrada);
  const tsGlobal:TablaSimbolos = new TablaSimbolos(null);

  //objeto guarda entono de mas objetos
  listaObjetos.forEach((objeto:Objeto) => {
    const tsObjeto:TablaSimbolos = new TablaSimbolos(null);
    if(objeto.listaAtributos.length>0){
      objeto.listaAtributos.forEach((atributo:Atributo) =>{
        const simbolo:NodoTablaSimbolo = new NodoTablaSimbolo(atributo.identificador, atributo.valor, Tipo.ATRIBUTO, atributo.linea, atributo.columna);
        tsObjeto.agregar(simbolo.indentificador, simbolo);
      });      
    }//fin if
    objeto.entorno = tsObjeto;
    const simbolo:NodoTablaSimbolo = new NodoTablaSimbolo(objeto.identificador, objeto, Tipo.OBJETO, objeto.linea, objeto.columna);
    tsGlobal.agregar(simbolo.indentificador, simbolo);

  });


  try {
    //editorsalida.setValue(listaObjetos);
    console.log(tsGlobal);
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

function GraficarXML(){
  
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
