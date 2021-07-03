

//Editor Entrada Y Salida
/*
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

*/
function ejecutarCodigo(/*entrada: string*/) {
  //exepath(listaDirecciones);
  document.getElementById("consola").value +=exepath(listaDirecciones);
}



let erroresXML:ListaErrores;
let erroresXPATH:ListaErrores;
let listaObjetos;
let tds_xml_persistente=[];
let graficat_tds_xml = [];
let contador_tds:number=1;

//Reporte Gramatical
let rg_xml:ReporteGramatical_XML;
let rg_path:ReporteGramatical_XPATH;

//variable para almacenar encoding de salida
let codificacion:string;
let listaDirecciones;
// interpretar codigo XPATH ASCENDENTE
function InterpretarCodigoXPATH(entrada:string){
  rg_path = new ReporteGramatical_XPATH();
  try{
    listaDirecciones = gramatica_xpath.parse(entrada);
    //console.log(listaDirecciones);
    //ejecutarXPATH(tds_xml_persistente[0],listaDirecciones[0]);

    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XPATH\n";
  }catch (error){
    console.log(error);
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XPATH\n";
  }
}
// interpretar codigo XPATH DESCENDENTE
function InterpretarCodigoXPATH_DESC(entrada:string){
  rg_path = new ReporteGramatical_XPATH();
  try{

    listaDirecciones = gramatica_xpath.parse(entrada);
    
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XPATH\n";
  }catch (error){
    console.log(error);
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XPATH\n";
  }
}
//interpretar codigo XML ASCENDENTE
function InterpretarCodigo(entrada:string) {
  tds_xml_persistente=[];
 
  erroresXML = new ListaErrores();

  rg_xml = new ReporteGramatical_XML();
  

  try {
    tds_xml_persistente=[];
    listaObjetos = gramatica.parse(entrada);
    //Crea entorno global
    const tsGlobal:TablaSimbolos = new TablaSimbolos([],null,"global");
    
    //tabla de simbolos que maneja la persistencia de todos los datos
    //tds_xml_persistente.push(tsGlobal);
    let etiquetasVerificadas = true;
    for(let aux of listaObjetos){        
      etiquetasVerificadas = aux.verificarEtiquetas(aux);  
      if(!etiquetasVerificadas){
        console.log("error en etiquetas");
      }
    }
    for(let aux of listaObjetos){        
        tsGlobal.simbolos.push(aux.agregarTDS(tsGlobal,aux)); //aux.agregarTDS(tsGlobal,aux);
        tds_xml_persistente.push(tsGlobal.simbolos[0].simbolos);
    }
    //console.log( tsGlobal);
    //console.log(tds_xml_persistente);
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
  } catch (error) {
    //editorsalida.setValue("");
    console.log(error);
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
  }
}
// interpretar codigo XML DESCEDENTE
function interpretarCodigoXMLdesc(entrada:string){
  try {
    tds_xml_persistente=[];
    erroresXML = new ListaErrores();
    
    rg_xml = new ReporteGramatical_XML();
    listaObjetos = gramatica_xml_desc.parse(entrada);

    //Crea entorno global
    const tsGlobal:TablaSimbolos = new TablaSimbolos([],null,"global");
    //tabla de simbolos que maneja la persistencia de todos los datos
    tds_xml_persistente.push(tsGlobal);

    for(let aux of listaObjetos){
      aux.agregarTDS(tsGlobal,aux);
    }
    document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML descendente\n";
  } catch (error) {
    console.log(error);
    document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML descendente\n";
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
//Errores del lenguaje XML
function MostrarErroresXML()
{
  try {
    let cadena:string = "";
    let p:number = 0;
    erroresXML.listaerrores.forEach(err => { 
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

//Errores Sintacticos del lenguaje XPATH
function MostrarErroresXPATH()
{
  try {
    let cadena:string = "";
    let p:number = 0;
    erroresXPATH.listaerrores.forEach(err => { 
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

function GraficarXPATHASC(){
  let grafica = new Graficar();
  d3.select("#graph").graphviz()
                     .renderDot(`${grafica.graficarXPATHAST()}`);
}

function GraficarXPATHCST(){
  let grafica = new Graficar();
  d3.select("#graph").graphviz()
                     .renderDot(`${grafica.graficarXPATHCST()}`);
}

//Reporte Gramatical

function RG_XML_ASC()
{
  document.getElementById('reportegr').innerHTML = "";
  document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}

function RG_XML_DESC()
{
  document.getElementById('reportegr').innerHTML = "";
  document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}

function RG_XPATH_ASC()
{
  document.getElementById('reportegr').innerHTML = "";
  document.getElementById('reportegr').innerHTML = rg_path.getReporte();
}

function RG_XPATH_DESC()
{
  document.getElementById('reportegr').innerHTML = "";
  document.getElementById('reportegr').innerHTML = rg_path.getReporte();

}