"use strict";
class ReporteGramatical {
    constructor() {
        this._produccionesGramaticales = [];
    }
    static InicializarReporteGramaticalXpath() {
        this._reporteXpath = new ReporteGramatical();
    }
    static InicializarReporteGramaticalXML() {
        this._reporteXML = new ReporteGramatical();
    }
    static agregarProduccionXpath(produccion, reglaSemantica) {
        if (this._reporteXpath == undefined || Object.keys(this._reporteXpath).length === 0) {
            this.InicializarReporteGramaticalXpath();
        }
        this._reporteXpath._produccionesGramaticales.push(new ProduccionGramatical(produccion, reglaSemantica));
    }
    static agregarProduccionXML(produccion, reglaSemantica) {
        if (this._reporteXML == undefined || Object.keys(this._reporteXML).length === 0) {
            this.InicializarReporteGramaticalXpath();
        }
        this._reporteXML._produccionesGramaticales.push(new ProduccionGramatical(produccion, reglaSemantica));
    }
    static LimpiarReportesGramaticales() {
        this.InicializarReporteGramaticalXpath();
        this.InicializarReporteGramaticalXML();
    }
    get produccionesGramaticales() {
        return this._produccionesGramaticales;
    }
    set produccionesGramaticales(value) {
        this._produccionesGramaticales = value;
    }
    static getHtmlTableXml() {
        return this.getCadHtmlFromReprote(ReporteGramatical._reporteXML, "Reporte Gramatical XHML");
    }
    static getHtmlTableXPath() {
        return this.getCadHtmlFromReprote(ReporteGramatical._reporteXpath, "Reporte Gramatical XPath");
    }
    static getCadHtmlFromReprote(reporteGramatical, encabezado) {
        let cad;
        cad = '<cite style="font-size:x-large;">encabezado</cite><br/>' +
            '<table border="1">'
            + '<tr>'
            + '<th>PRODUCCION</th><th>REGLA SEMANTICA</th> '
            + '</tr>';
        for (let reg of reporteGramatical.produccionesGramaticales) {
            cad += '<tr>'
                + reg.toString()
                + '</tr>';
        }
        cad += '</table>';
        return cad;
    }
}
ReporteGramatical._reporteXpath = new ReporteGramatical();
ReporteGramatical._reporteXML = new ReporteGramatical();
class ProduccionGramatical {
    constructor(produccion, reglaSemantica) {
        this.produccion = (produccion == null) ? "" : produccion;
        this.reglaSemantica = (reglaSemantica == null) ? "" : reglaSemantica;
    }
    toString() {
        return "<TD style=\"font-size: 15px;  ;\"  align=rigth><p>" + this.produccion + "</p></TD>\n" +
            "<TD style=\"font-size: 15px;  ;\"  align=left><p>" + this.reglaSemantica + "</p></TD>\n";
    }
}
