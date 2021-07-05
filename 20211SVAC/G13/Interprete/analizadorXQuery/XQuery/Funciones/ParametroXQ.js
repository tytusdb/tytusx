"use strict";
exports.__esModule = true;
exports.ParametroXQ = void 0;
var TipoXQ_1 = require("../Entorno/TipoXQ");
var ParametroXQ = /** @class */ (function () {
    function ParametroXQ(n) {
        this.nombre = n;
        this.tipo = new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.defecto);
    }
    ParametroXQ.prototype.setTipo = function (t) {
        this.tipo = t;
    };
    return ParametroXQ;
}());
exports.ParametroXQ = ParametroXQ;
