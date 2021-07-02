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
exports.SimboloXQ = void 0;
var ExpresionXQ_1 = require("../Arbol/ExpresionXQ");
var LiteralXQ_1 = require("../Expresiones/LiteralXQ");
var SimboloXQ = /** @class */ (function (_super) {
    __extends(SimboloXQ, _super);
    function SimboloXQ(t, v) {
        var _this = _super.call(this) || this;
        _this.tipo = t;
        _this.valor = v;
        return _this;
    }
    SimboloXQ.prototype.getValor = function (ent) {
        return new LiteralXQ_1.LiteralXQ(this.tipo, this.valor);
    };
    SimboloXQ.prototype.copiar = function () {
        return new SimboloXQ(this.tipo, this.valor);
    };
    return SimboloXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.SimboloXQ = SimboloXQ;
