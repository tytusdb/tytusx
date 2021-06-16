"use strict";
var cadenaReporteGramatical;
function generarReporteGramatical() {
    cadenaReporteErrores = "<html><head><style>" +
        "table { font-family: arial, sans - serif; border-collapse: collapse; width: 100 %;}" +
        "td, th { border: 1px solid #dddddd;  text-align: left; padding: 8px;}        " +
        "tr: nth-child(even) {background-color: #dddddd;}" +
        "</style></head>" +
        "<body><h2>Tabla de Reglas Gramaticales</h2><table>" +
        "<tr>" +
        "<th> Id</th>" +
        "<th> Produccion </th>" +
        "<th> Regla </th>" +
        "</tr>";
    procesarReglasGramaticales();
    cadenaReporteErrores += "</table></body></html>";
    generarArchivoReporte("ReporteGramatical", "html", cadenaReporteErrores);
}
function procesarReglasGramaticales() {
    var contador = 0;
    cadenaReporteErrores += "<tr><td colspan=3><h3>Reporte Gramatical XML</h3></td></tr>";
    reglasGramaticalesXML.forEach((regla) => {
        cadenaReporteErrores += "<tr>";
        cadenaReporteErrores += "<td>" + contador + "</td>";
        cadenaReporteErrores += "<td>" + regla.produccion + "</td>";
        cadenaReporteErrores += "<td>" + regla.regla + "</td>";
        cadenaReporteErrores += "</tr>";
        contador++;
    });
    contador = 0;
    cadenaReporteErrores += "<tr><td colspan=5><h3>Reporte Gramatical XPath</h3></td></tr>";
    reglasGramaticalesXPath.forEach((regla) => {
        cadenaReporteErrores += "<tr>";
        cadenaReporteErrores += "<td>" + contador + "</td>";
        cadenaReporteErrores += "<td>" + regla.produccion + "</td>";
        cadenaReporteErrores += "<td>" + regla.regla + "</td>";
        cadenaReporteErrores += "</tr>";
        contador++;
    });
}
