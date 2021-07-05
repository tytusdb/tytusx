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
exports.MenorIgualXQ = void 0;
var ExpresionXQ_1 = require("../../Arbol/ExpresionXQ");
var TipoXQ_1 = require("../../Entorno/TipoXQ");
var LiteralXQ_1 = require("../../Expresiones/LiteralXQ");
var MenorIgualXQ = /** @class */ (function (_super) {
    __extends(MenorIgualXQ, _super);
    function MenorIgualXQ(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '<= | le';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    MenorIgualXQ.prototype.getValor = function (ent) {
        var res = new LiteralXQ_1.LiteralXQ(new TipoXQ_1.TipoXQ(TipoXQ_1.EnumTipo.error), "@ERROR@", this.linea, this.columna);
        var exI = this.hI.getValor(ent);
        var exD = this.hD.getValor(ent);
        switch (exI.tipo.tipo) {
            case TipoXQ_1.EnumTipo.entero:
                switch (exD.tipo.tipo) {
                    case TipoXQ_1.EnumTipo.entero:
                        res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                        res.valor = parseInt(exI.valor.toString()) <= parseInt(exD.valor.toString());
                        return res;
                    case TipoXQ_1.EnumTipo.doble:
                        res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                        res.valor = parseInt(exI.valor.toString()) <= parseFloat(exD.valor.toString());
                        return res;
                    default:
                        console.log('Error con la operacion MenorIgualQue de HI: Entero');
                        break;
                }
                break;
            case TipoXQ_1.EnumTipo.doble:
                switch (exD.tipo.tipo) {
                    case TipoXQ_1.EnumTipo.entero:
                        res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                        res.valor = parseFloat(exI.valor.toString()) <= parseInt(exD.valor.toString());
                        return res;
                    case TipoXQ_1.EnumTipo.doble:
                        res.tipo.tipo = TipoXQ_1.EnumTipo.booleano;
                        res.valor = parseFloat(exI.valor.toString()) <= parseFloat(exD.valor.toString());
                        return res;
                    default:
                        console.log('Error con la operacion MenorIgualQue de HI: Doble');
                        break;
                }
                break;
            default:
                console.log('No se puede operar MenorIgualQue HI >=GE HD');
                break;
        }
        return res;
    };
    MenorIgualXQ.prototype.copiar = function () {
        return new MenorIgualXQ(this.hI.copiar(), this.hD.copiar(), this.linea, this.columna);
    };
    return MenorIgualXQ;
}(ExpresionXQ_1.ExpresionXQ));
exports.MenorIgualXQ = MenorIgualXQ;
