"use strict";
exports.__esModule = true;
exports.EntornoXQ = void 0;
var EntornoXQ = /** @class */ (function () {
    function EntornoXQ(ant) {
        this.anterior = ant;
        if (ant == null || ant == undefined) {
            this.global = null;
        }
        else {
            this.global = ant.global;
        }
        this.tabla = new Map();
    }
    EntornoXQ.prototype.insertar = function (nombre, sim, l, c, cError) {
        if (this.tabla.has(nombre)) {
            console.log("Error Semantico: " + cError + " '" + nombre + "' ya existe. F:" + l + " C:" + c);
            //Insert tabla de errores
            return;
        }
        this.tabla.set(nombre, sim);
    };
    EntornoXQ.prototype.buscar = function (nombre, l, c, cError) {
        var e = this;
        for (e = this; e != null; e = e.anterior) {
            if (e.tabla.has(nombre)) {
                var sim = e.tabla.get(nombre);
                return sim;
            }
        }
        if (this.global.tabla.has(nombre)) {
            var sim = this.global.tabla.get(nombre);
            return sim;
        }
        return null;
    };
    return EntornoXQ;
}());
exports.EntornoXQ = EntornoXQ;
