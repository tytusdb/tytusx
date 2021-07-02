"use strict";
exports.__esModule = true;
exports.EnumTipo = exports.TipoXQ = void 0;
var TipoXQ = /** @class */ (function () {
    function TipoXQ(tipo) {
        this.tipo = tipo;
    }
    return TipoXQ;
}());
exports.TipoXQ = TipoXQ;
var EnumTipo;
(function (EnumTipo) {
    EnumTipo[EnumTipo["entero"] = 0] = "entero";
    EnumTipo[EnumTipo["caracter"] = 1] = "caracter";
    EnumTipo[EnumTipo["booleano"] = 2] = "booleano";
    EnumTipo[EnumTipo["doble"] = 3] = "doble";
    EnumTipo[EnumTipo["cadena"] = 4] = "cadena";
    EnumTipo[EnumTipo["error"] = 5] = "error";
    EnumTipo[EnumTipo["tvoid"] = 6] = "tvoid";
    EnumTipo[EnumTipo["nulo"] = 7] = "nulo";
    EnumTipo[EnumTipo["XPath"] = 8] = "XPath";
    EnumTipo[EnumTipo["sequence"] = 9] = "sequence";
})(EnumTipo = exports.EnumTipo || (exports.EnumTipo = {}));
