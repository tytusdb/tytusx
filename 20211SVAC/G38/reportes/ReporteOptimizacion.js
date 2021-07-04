"use strict";
class ReporteOptimizacion {
    constructor() {
        this.lista = [];
    }
    static InicializarReporteOptimizacion() {
        this._reporteOptimizacion = new ReporteOptimizacion();
    }
    static AgregarFilaOptimizacion(filaOptimizacion) {
        if (this._reporteOptimizacion == undefined || Object.keys(this._reporteOptimizacion).length === 0) {
            this.InicializarReporteOptimizacion();
        }
        this._reporteOptimizacion.lista.push(filaOptimizacion);
    }
    static getHtmlReporteOptimizacion() {
        return this.getCadHtmlFromReprote("Reporte Optimizacion C3D");
    }
    static getCadHtmlFromReprote(encabezado) {
        let cad;
        var index = 1;
        cad = '<cite style="font-size:x-large;">' + encabezado + '</cite><br/>' +
            '<table border="1">';
        for (let fila of ReporteOptimizacion._reporteOptimizacion.lista) {
            if (index == 1) {
                cad += fila.createCabeceras();
                index++;
            }
            cad += fila.toString();
        }
        cad += '</table>';
        return cad;
    }
}
ReporteOptimizacion._reporteOptimizacion = new ReporteOptimizacion();
