"use strict";
var EntornoXML = /** @class */ (function () {
    function EntornoXML(id, texto, linea, columna, tablaSimbolos, tablaEntornos, entorno, entornoAnterior, EtiquetaCierre) {
        this.id = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.tablaSimbolos = tablaSimbolos;
        this.tablaEntornos = tablaEntornos;
        this.entorno = entorno;
        this.entornoAnterior = entornoAnterior;
        this.EtiquetaCierre = EtiquetaCierre;
    }
    EntornoXML.prototype.getId = function () {
        return this.id;
    };
    EntornoXML.prototype.getTexto = function () {
        return this.texto;
    };
    EntornoXML.prototype.getLinea = function () {
        return this.linea;
    };
    EntornoXML.prototype.getColumna = function () {
        return this.columna;
    };
    EntornoXML.prototype.getTablaEntornos = function () {
        return this.tablaEntornos;
    };
    EntornoXML.prototype.getTablaSimbolos = function () {
        return this.tablaSimbolos;
    };
    EntornoXML.prototype.getEtiquetaCierre = function () {
        return this.EtiquetaCierre;
    };
    return EntornoXML;
}());
//# sourceMappingURL=EntornoXML.js.map