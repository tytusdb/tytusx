"use strict";
//Editor Entrada Y Salida
var editorentrada = ace.edit("editorentrada");
editorentrada.setTheme("ace/theme/monokai");
editorentrada.session.setMode("ace/mode/xml");
editorentrada.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
});
editorentrada.session.setUseSoftTabs(true);
var editorsalida = ace.edit("editorsalida");
editorsalida.setTheme("ace/theme/monokai");
editorsalida.session.setMode("ace/mode/xml");
editorsalida.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
});
editorsalida.session.setUseSoftTabs(true);
function ejecutarCodigo( /*entrada: string*/) {
    //gramatica.parse(entrada);
}
var erroreslexicos;
var erroressintacticos;
var listaObjetos;
//Reporte Gramatical
var rg_xml;
function InterpretarCodigo() {
    var entrada = editorentrada.getValue();
    erroreslexicos = new ListaErrores();
    erroressintacticos = new ListaErrores();
    rg_xml = new ReporteGramatical_XML();
    listaObjetos = gramatica.parse(entrada);
    var tsGlobal = new TablaSimbolos(null);
    //objeto guarda entono de mas objetos
    listaObjetos.forEach(function (objeto) {
        var tsObjeto = new TablaSimbolos(null);
        if (objeto.listaAtributos.length > 0) {
            objeto.listaAtributos.forEach(function (atributo) {
                var simbolo = new NodoTablaSimbolo(atributo.identificador, atributo.valor, Tipo.ATRIBUTO, atributo.linea, atributo.columna);
                tsObjeto.agregar(simbolo.indentificador, simbolo);
            });
        } //fin if
        objeto.entorno = tsObjeto;
        var simbolo = new NodoTablaSimbolo(objeto.identificador, objeto, Tipo.OBJETO, objeto.linea, objeto.columna);
        tsGlobal.agregar(simbolo.indentificador, simbolo);
    });
    try {
        //editorsalida.setValue(listaObjetos);
        console.log(tsGlobal);
        console.log(erroreslexicos);
        console.log(erroressintacticos);
        document.getElementById("consola").value += "Mensaje Grupo34 >> Se analizo el documento XML\n";
    }
    catch (error) {
        editorsalida.setValue("");
        document.getElementById("consola").value += "Mensaje Grupo34 >> No analizo el documento XML\n";
    }
}
//Errores Lexicos del lenguaje XML
function MostrarErroresLexicosXML() {
    try {
        var cadena_1 = "";
        var p_1 = 0;
        erroreslexicos.listaerrores.forEach(function (err) {
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
//Errores Sintacticos del lenguaje XML
function MostrarErroresSintacticosXML() {
    try {
        var cadena_2 = "";
        var p_2 = 0;
        erroressintacticos.listaerrores.forEach(function (err) {
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
//Reporte Gramatical
function RG_XML_ASC() {
    document.getElementById('reportegr').innerHTML = rg_xml.getReporte();
}
function RG_XML_DESC() {
}
