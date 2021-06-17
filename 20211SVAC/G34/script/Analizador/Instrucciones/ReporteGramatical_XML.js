"use strict";
var ReporteGramatical_XML = /** @class */ (function () {
    function ReporteGramatical_XML() {
        this.lista_xml = new Array();
    }
    ReporteGramatical_XML.prototype.setValor = function (valor) {
        this.lista_xml.push(valor);
    };
    ReporteGramatical_XML.prototype.getReporte = function () {
        var cadena = "";
        //this.lista_xml.forEach(err=>{
        //    cadena += err;
        //});
        //let arr = [];
        for (var i = this.lista_xml.length - 1; i >= 0; i--) {
            cadena += this.lista_xml[i];
        }
        return cadena;
    };
    return ReporteGramatical_XML;
}());
