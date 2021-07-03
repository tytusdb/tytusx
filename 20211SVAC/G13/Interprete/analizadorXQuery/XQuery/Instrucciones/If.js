"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.If = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var Entorno_1 = require("../Entorno/Entorno");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(lc, b, l, c) {
        var _this = _super.call(this) || this;
        _this.lista_condiciones = lc;
        _this.bloque_else = b;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    If.prototype.ejecutar = function (ent) {
        this.lista_condiciones.forEach(function (condicion) {
            var res = condicion.ejecutar(ent);
            if (res != null) {
                return res;
            }
            if (condicion.ejecutado) {
                return null;
            }
        });
        if (this.bloque_else != null && this.bloque_else != undefined) {
            var res = this.bloque_else.ejecutar(new Entorno_1.EntornoXQ(ent));
            if (res != null) {
                return res;
            }
        }
        return null;
    };
    return If;
}(InstruccionXQ_1.InstruccionXQ));
exports.If = If;
