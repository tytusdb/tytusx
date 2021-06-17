"use strict";
var ReporteGramatical_XPATH = /** @class */ (function () {
    function ReporteGramatical_XPATH() {
        this.lista_xpath = new Array();
    }
    ReporteGramatical_XPATH.prototype.setValor = function (valor) {
        this.lista_xpath.push(valor);
    };
    ReporteGramatical_XPATH.prototype.getReporte = function () {
        var cadena = "";
        //this.lista_xpath.forEach(err=>{
        //    cadena += err;
        //});
        //let arr = [];
        for (var i = this.lista_xpath.length - 1; i >= 0; i--) {
            cadena += this.lista_xpath[i];
        }
        return cadena;
    };
    return ReporteGramatical_XPATH;
}());
