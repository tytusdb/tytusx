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
exports.NotXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var NotXQ = /** @class */ (function (_super) {
    __extends(NotXQ, _super);
    function NotXQ(der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '! | not';
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    NotXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var exD = this.hD.getValor(ent);
        if (exD.tipo.tipo == TipoXQ_1.EnumTipo.booleano) {
            res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
            var tmp = (exD.valor.toString() == 'true');
            res.valor = (!tmp).toString();
            return res;
        }
        else {
            console.log('Error con la operacion NOT. La expresion no es de tipo booleano');
        }
        return res;
    };
    NotXQ.prototype.copiar = function () {
        return new NotXQ(this.hD.copiar(), this.linea, this.columna);
    };
    return NotXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.NotXQ = NotXQ;
