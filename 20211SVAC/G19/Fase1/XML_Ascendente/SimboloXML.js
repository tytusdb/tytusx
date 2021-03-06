"use strict";
var SimboloXML = /** @class */ (function () {
    function SimboloXML(tipo, id, linea, columna, valor, Entorno) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.Entorno = Entorno;
    }
    SimboloXML.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    SimboloXML.prototype.getValorImplicito = function (ent, arbol) {
        return this.valor;
    };
    return SimboloXML;
}());
//# sourceMappingURL=SimboloXML.js.map