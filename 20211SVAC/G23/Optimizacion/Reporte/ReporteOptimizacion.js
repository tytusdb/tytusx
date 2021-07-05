"use strict";
exports.__esModule = true;
exports.ReporteOptimizacion = void 0;
var ReporteOptimizacion = /** @class */ (function () {
    function ReporteOptimizacion() {
        this.reporte = new Array();
    }
    ReporteOptimizacion.prototype.ReporteOptimizacion = function () {
        this.reporte = new Array();
    };
    ReporteOptimizacion.prototype.agregarOpt = function (opt) {
        this.reporte.push(opt);
    };
    ReporteOptimizacion.prototype.esVacio = function () {
        return this.reporte.length == 0;
    };
    //CREAR METODO PARA GENERAR EL REPORTE DE OPTIMIZACION
    ReporteOptimizacion.prototype.generarReporteOptimizacion = function () {
        var css = this.estiloTabla();
        this.generarArchivoEstiloTabla(css);
        var html = this.escribirTablaOptimizacion();
        this.generarArchivoOptimizacion(html);
    };
    ReporteOptimizacion.prototype.estiloTabla = function () {
        var css = "body {background-color: #d0efb141;font-family: calibri, Helvetica, Arial;}\n";
        css += "h1 {text-align: center;font-size: 100px;}\n";
        css += "table {width: 100%;border-collapse: collapse;font-size: 25px;font-weight: bold;}\n";
        css += "table td, table th, table caption {border: 0px dashed #77A6B6;padding: 10px;}\n";
        css += "table tr:nth-child(even){ background-color: #9DC3C2; }\n";
        css += "table tr:nth-child(odd){ background-color: #B3D89C; }\n";
        css += "table tr:hover {background-color: #77A6B6;color: #feffff;}\n";
        css += "table th, table caption {color: white;background-color: #4d7298;text-align: left;padding-top: 12px;padding-bottom: 12px;}\n";
        css += ".content {width: 90%;margin: 0 auto;}";
        return css;
    };
    ReporteOptimizacion.prototype.escribirTablaOptimizacion = function () {
        var html = "<!Doctype html>\n<html lang=\"es-Es\">\n<head>\n";
        html += "<link rel=\"stylesheet\" href=\"estiloTabla.css\">\n";
        html += "<title>Reporte Optimizacion</title>\n</head>\n<body>\n<h1><center>Reporte de Optimización</center></h1>\n<table style=\"margin: 0 auto;\">\n";
        html += "<thead>\n<tr>\n<th>Tipo</th>\n<th>Regla</th>\n<th>Código eliminado</th>\n<th>Código agregado</th>\n<th>Fila</th>\n</tr>\n</thead>\n<tbody>\n";
        //RECORRERMOS EL REPORTE
        this.reporte.forEach(function (Element) {
            html += "<tr>\n";
            html += "<td>" + Element.tipo + "</td>\n";
            html += "<td>" + Element.regla + "</td>\n";
            html += "<td>" + Element.antes + "</td>\n";
            html += "<td>" + Element.despues + "</td>\n";
            html += "<td>" + Element.linea + "</td>\n";
            html += "</tr>\n";
        });
        html += "</tbody>\n</table>\n</body>\n</html>";
        return html;
    };
    ReporteOptimizacion.prototype.generarArchivoEstiloTabla = function (css) {
        // TextWriter archivo;
        // archivo = new StreamWriter("C:\\compiladores2\\estiloTabla.css");
        // archivo.WriteLine(css);
        // archivo.Close();
    };
    ReporteOptimizacion.prototype.generarArchivoOptimizacion = function (html) {
        // TextWriter archivo;
        // archivo = new StreamWriter("C:\\compiladores2\\ReporteOpti.html");
        // archivo.WriteLine(html);
        // archivo.Close();
    };
    return ReporteOptimizacion;
}());
exports.ReporteOptimizacion = ReporteOptimizacion;
