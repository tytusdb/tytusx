"use strict";
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
function ejecutarCodigo( /*entrada: string*/) {
    //exepath(listaDirecciones);
    document.getElementById("consola").value += exepath(listaDirecciones);
}
var erroresXML;
var erroresXPATH;
var listaObjetos;
var tds_xml_persistente = [];
var graficat_tds_xml = [];
var contador_tds = 1;
//Reporte Gramatical
var rg_xml;
var rg_path;
//variable para almacenar encoding de salida
var codificacion;
var listaDirecciones;
// interpretar codigo XPATH ASCENDENTE
function InterpretarCodigoXPATH(entrada) {
    rg_path = new ReporteGramatical_XPATH();
    try {
        listaDirecciones = gramatica_xpath.parse(entrada);
        //console.log(listaDirecciones);
        //ejecutarXPATH(tds_xml_persistente[0],listaDirecciones[0]);
        document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XPATH\n";
    }
    catch (error) {
        console.log(error);
        document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XPATH\n";
    }
}
// interpretar codigo XPATH DESCENDENTE
function InterpretarCodigoXPATH_DESC(entrada) {
    rg_path = new ReporteGramatical_XPATH();
    try {
        listaDirecciones = gramatica_xpath.parse(entrada);
        document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XPATH\n";
    }
    catch (error) {
        console.log(error);
        document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XPATH\n";
    }
}
//interpretar codigo XML ASCENDENTE
function InterpretarCodigo(entrada) {
    tds_xml_persistente = [];
    erroresXML = new ListaErrores();
    rg_xml = new ReporteGramatical_XML();
    try {
        tds_xml_persistente = [];
        listaObjetos = gramatica.parse(entrada);
        //Crea entorno global
        var tsGlobal = new TablaSimbolos([], null, "global");
        //tabla de simbolos que maneja la persistencia de todos los datos
        //tds_xml_persistente.push(tsGlobal);
        var etiquetasVerificadas = true;
        for (var _i = 0, listaObjetos_1 = listaObjetos; _i < listaObjetos_1.length; _i++) {
            var aux = listaObjetos_1[_i];
            etiquetasVerificadas = aux.verificarEtiquetas(aux);
            if (!etiquetasVerificadas) {
                console.log("error en etiquetas");
            }
        }
        for (var _a = 0, listaObjetos_2 = listaObjetos; _a < listaObjetos_2.length; _a++) {
            var aux = listaObjetos_2[_a];
            tsGlobal.simbolos.push(aux.agregarTDS(tsGlobal, aux)); //aux.agregarTDS(tsGlobal,aux);
            tds_xml_persistente.push(tsGlobal.simbolos[0].simbolos);
        }
        //console.log( tsGlobal);
        //console.log(tds_xml_persistente);
        document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
    }
    catch (error) {
        //editorsalida.setValue("");
        console.log(error);
        document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
    }
}
// interpretar codigo XML DESCEDENTE
function interpretarCodigoXMLdesc(entrada) {
    try {
        tds_xml_persistente = [];
        erroresXML = new ListaErrores();
        rg_xml = new ReporteGramatical_XML();
        listaObjetos = gramatica_xml_desc.parse(entrada);
        //Crea entorno global
        var tsGlobal = new TablaSimbolos([], null, "global");
        //tabla de simbolos que maneja la persistencia de todos los datos
        tds_xml_persistente.push(tsGlobal);
        for (var _i = 0, listaObjetos_3 = listaObjetos; _i < listaObjetos_3.length; _i++) {
            var aux = listaObjetos_3[_i];
            aux.agregarTDS(tsGlobal, aux);
        }
        document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML descendente\n";
    }
    catch (error) {
        console.log(error);
        document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML descendente\n";
    }
}
function MostrarTDS_XML() {
    try {
        graficat_tds_xml = [];
        var cadena = "<thead>\n    <tr>\n        <th scope=\"col\">No.</th>\n        <th scope=\"col\">Identificador</th>\n        <th scope=\"col\">Valor</th>\n        <th scope=\"col\">Tipo</th>\n        <th scope=\"col\">Entorno</th>\n        <th scope=\"col\">Fila</th>\n        <th scope=\"col\">Columna</th>\n    </tr></thead>\n    <tbody id=\"contts\">\n    ";
        graficat_tds_xml.push(cadena);
        for (var _i = 0, listaObjetos_4 = listaObjetos; _i < listaObjetos_4.length; _i++) {
            var aux = listaObjetos_4[_i];
            aux.graficarTDS(graficat_tds_xml, aux);
        }
        graficat_tds_xml.push("</tbody>");
        //cadena+= `</tbody>`;
        console.log(cadena);
        document.getElementById('tbts').innerHTML = graficat_tds_xml.join("");
    }
    catch (error) {
    }
}
//Errores del lenguaje XML
function MostrarErroresXML() {
    try {
        var cadena_1 = "";
        var p_1 = 0;
        erroresXML.listaerrores.forEach(function (err) {
            p_1 = p_1 + 1;
            cadena_1 += "<tr>\n<th scope=\"row\">" + p_1 + "</th>\n" +
                "<td scope=\"row\">" + err.lexema + "</td>\n" +
                "<td>" + err.descripcion + "</td>\n" +
                "<td>" + err.tipoerror + "</td>\n" +
                "<td>" + err.lenguaje + "</td>\n" +
                "<td>" + err.linea + "</td>\n" +
                "<td>" + err.columna + "</td>\n" +
                "</tr>\n";
        });
        document.getElementById('contlextraduccion').innerHTML = cadena_1;
    }
    catch (error) {
    }
}
//Errores Sintacticos del lenguaje XPATH
function MostrarErroresXPATH() {
    try {
        var cadena_2 = "";
        var p_2 = 0;
        erroresXPATH.listaerrores.forEach(function (err) {
            p_2 = p_2 + 1;
            cadena_2 += "<tr>\n<th scope=\"row\">" + p_2 + "</th>\n" +
                "<td scope=\"row\">" + err.lexema + "</td>\n" +
                "<td>" + err.descripcion + "</td>\n" +
                "<td>" + err.tipoerror + "</td>\n" +
                "<td>" + err.lenguaje + "</td>\n" +
                "<td>" + err.linea + "</td>\n" +
                "<td>" + err.columna + "</td>\n" +
                "</tr>\n";
        });
        document.getElementById('contlextraduccion').innerHTML = cadena_2;
    }
    catch (error) {
    }
}
function GraficarXMLASC() {
    var grafica = new Graficar();
    d3.select("#graph").graphviz()
        .renderDot("" + grafica.graficarXML());
}
function GraficarXMLDESC() {
    var grafica = new Graficar();
    d3.select("#graph").graphviz()
        .renderDot("" + grafica.graficarXML());
}
function GraficarXPATHASC() {
    var grafica = new Graficar();
    d3.select("#graph").graphviz()
        .renderDot("" + grafica.graficarXPATHAST());
}
function GraficarXPATHCST() {
    var grafica = new Graficar();
    d3.select("#graph").graphviz()
        .renderDot("" + grafica.graficarXPATHCST());
}
//Reporte Gramatical
function RG_XML_ASC() {
    document.getElementById('reportegr').innerHTML = "";
    document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}
function RG_XML_DESC() {
    document.getElementById('reportegr').innerHTML = "";
    document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}
function RG_XPATH_ASC() {
    document.getElementById('reportegr').innerHTML = "";
    document.getElementById('reportegr').innerHTML = rg_path.getReporte();
}
function RG_XPATH_DESC() {
    document.getElementById('reportegr').innerHTML = "";
    document.getElementById('reportegr').innerHTML = rg_path.getReporte();
}
