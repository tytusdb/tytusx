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
exports.LiteralXQ = void 0;
var ExpresionXQ_1 = require("../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../Entorno/TipoXQ");
var LiteralXQ = /** @class */ (function (_super) {
    __extends(LiteralXQ, _super);
    function LiteralXQ(t, v, l, c) {
        var _this = _super.call(this) || this;
        _this.tipo = t;
        _this.valor = v;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    LiteralXQ.prototype.getValor = function (ent) {
        if (this.tipo.tipo == TipoXQ_1.EnumTipo.XPath) {
            if (Array.isArray(this.valor)) {
                //Ya operado
                return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
            }
            else {
                //Operar
                var xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                var retXP = this.valor.Ejecutar(xmlG.valor);
                return new LiteralXQ(this.tipo, retXP, this.linea, this.columna);
            }
        }
        else {
            return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
        }
    };
    LiteralXQ.prototype.copiar = function () {
        return new LiteralXQ(this.tipo, this.valor, this.linea, this.columna);
    };
    return LiteralXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.LiteralXQ = LiteralXQ;
