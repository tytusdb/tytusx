"use strict";
var TablaSim = /** @class */ (function () {
    function TablaSim() {
        this.tabla = new Array();
    }
    TablaSim.prototype.addSimbolo = function (simbolo) {
        this.tabla.push(simbolo);
    };
    TablaSim.prototype.getTabla = function () {
        return this.tabla;
    };
    return TablaSim;
}());
//# sourceMappingURL=TablaSim.js.map