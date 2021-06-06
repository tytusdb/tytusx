

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
let tds_xml_persistente=[];
let graficat_tds_xml = [];
let contador_tds:number=1;

//Reporte Gramatical
let rg_xml:ReporteGramatical_XML;

function InterpretarCodigo() {
  tds_xml_persistente=[];
  var entrada = editorentrada.getValue();
  erroreslexicos = new ListaErrores();
  erroressintacticos = new ListaErrores();
  rg_xml = new ReporteGramatical_XML();
  

  try {
    listaObjetos = gramatica.parse(entrada);
    //Crea entorno global
    const tsGlobal:TablaSimbolos = new TablaSimbolos([],null,"global");
    //tabla de simbolos que maneja la persistencia de todos los datos
    tds_xml_persistente.push(tsGlobal);

    for(let aux of listaObjetos){
        aux.agregarTDS(tsGlobal,aux);
    }
    
    //console.log(tds_xml_persistente);
    //editorsalida.setValue(listaObjetos);
    //console.log(tsGlobal);
    //console.log(erroreslexicos);
    //console.log(erroressintacticos);
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
  } catch (error) {
    editorsalida.setValue("");
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
  }
}

function MostrarTDS_XML(){
  try{
    graficat_tds_xml = [];
    let cadena:string = `<thead>
    <tr>
        <th scope="col">No.</th>
        <th scope="col">Identificador</th>
        <th scope="col">Valor</th>
        <th scope="col">Tipo</th>
        <th scope="col">Entorno</th>
        <th scope="col">Fila</th>
        <th scope="col">Columna</th>
    </tr></thead>
    <tbody id="contts">
    `;
    graficat_tds_xml.push(cadena);
    
    for(let aux of listaObjetos){
      aux.graficarTDS(graficat_tds_xml,aux);      
    }
    graficat_tds_xml.push("</tbody>");
    //cadena+= `</tbody>`;
    console.log(cadena);
    document.getElementById('tbts').innerHTML = graficat_tds_xml.join("");
    
  }catch(error){

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


function GraficarXMLASC(){
  let grafica = new Graficar();
  d3.select("#graph").graphviz()
                     .renderDot(`${grafica.graficarXML()}`);
}

function GraficarXMLDESC(){
  let grafica = new Graficar();
  d3.select("#graph").graphviz()
                     .renderDot(`${grafica.graficarXML()}`);
}

//Reporte Gramatical

function RG_XML_ASC()
{
  document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}

function RG_XML_DESC()
{
  
}