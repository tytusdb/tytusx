"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = exports.Comilla = void 0;
var Comilla;
(function (Comilla) {
    Comilla[Comilla["SIMPLE"] = 0] = "SIMPLE";
    Comilla[Comilla["DOBLE"] = 1] = "DOBLE";
})(Comilla = exports.Comilla || (exports.Comilla = {}));
class Atributo {
    constructor(id, valor, linea, columna, comilla) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.comilla = comilla;
        this.textWithoutSpecial = this.setCaracteresEspeciales(valor);
    }
    setCaracteresEspeciales(valor) {
        let value = valor.split("&lt;").join("<");
        value = value.split("&gt;").join(">");
        value = value.split("&amp;").join("&");
        value = value.split("&apos;").join("'");
        value = value.split("&quot;").join('"');
        return value;
    }
}
exports.Atributo = Atributo;
