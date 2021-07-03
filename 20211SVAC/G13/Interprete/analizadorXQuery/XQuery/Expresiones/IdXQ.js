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
exports.IdXQ = void 0;
var ExpresionXQ_1 = require("../Arbol/ExpresionXQ");
var LiteralXQ_1 = require("./LiteralXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var IdXQ = /** @class */ (function (_super) {
    __extends(IdXQ, _super);
    function IdXQ(id, l, c) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    IdXQ.prototype.getValor = function (ent) {
        var sim = ent.buscar(this.id, this.linea, this.columna, 'La Variable');
        if (sim != null || sim != undefined) {
            var ret = new LiteralXQ_1.LiteralXQ(sim.tipo, sim.valor, this.linea, this.columna);
            return ret;
        }
        return new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@Error@", this.linea, this.columna);
    };
    IdXQ.prototype.copiar = function () {
        return new IdXQ(this.id, this.linea, this.columna);
    };
    return IdXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.IdXQ = IdXQ;
