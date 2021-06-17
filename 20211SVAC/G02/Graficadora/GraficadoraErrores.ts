var cadenaReporteErrores: string;

function generarReporteErrores() {
    cadenaReporteErrores = "<html><head><style>" +
    "table { font-family: arial, sans - serif; border-collapse: collapse; width: 100 %;}" +
    "td, th { border: 1px solid #dddddd;  text-align: left; padding: 8px;}        " +
    "tr: nth-child(even) {background-color: #dddddd;}" +
    "</style></head>" +
    "<body><h2>Tabla de Errores</h2><table>" +
    "<tr>"+
    "<th> Tipo de Error</th>" +
    "<th> Id relacionado </th>" +
    "<th> Mensaje </th>" +
    "<th> Linea </th>" +
    "<th> Columna </th>" +
    "</tr>";
    procesarErrores();
    cadenaReporteErrores += "</table></body></html>";
    generarArchivoReporte("ReporteDeErrores","html",cadenaReporteErrores);
}

function procesarErrores(){
    cadenaReporteErrores += "<tr><td colspan=5><h3>Errores XML</h3></td></tr>"
    erroresXML.forEach((err: ErrorCapturado) => {
        cadenaReporteErrores += "<tr>";
        cadenaReporteErrores += "<td>" + TipoError[err.tipoError] + "</td>";
        cadenaReporteErrores += "<td>" + err.token + "</td>";
        cadenaReporteErrores += "<td>" + err.mensaje + "</td>";
        cadenaReporteErrores += "<td>" + err.linea + "</td>";
        cadenaReporteErrores += "<td>" + err.columna + "</td>";
        cadenaReporteErrores += "</tr>";
     });
     cadenaReporteErrores += "<tr><td colspan=5><h3>Errores XPath</h3></td></tr>"
     erroresXPath.forEach((err: ErrorCapturado) => {
         cadenaReporteErrores += "<tr>";
         cadenaReporteErrores += "<td>" + TipoError[err.tipoError] + "</td>";
         cadenaReporteErrores += "<td>" + err.token + "</td>";
         cadenaReporteErrores += "<td>" + err.mensaje + "</td>";
         cadenaReporteErrores += "<td>" + err.linea + "</td>";
         cadenaReporteErrores += "<td>" + err.columna + "</td>";
         cadenaReporteErrores += "</tr>";
      });
}

