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
exports.Menor = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Menor = /** @class */ (function (_super) {
    __extends(Menor, _super);
    function Menor(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '+';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Menor.prototype.copiarValor = function () {
        return new Menor(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Menor.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
        if (e1.tipo == 6 && e1.valor == 'position()') {
            //Verificar que el otro sea nuemro
            if (e2.tipo == 0 || e2.tipo == 1) {
                var result = [];
                for (var i = 1; i < e2.valor; i++) {
                    result.push(entorno[0][i - 1]);
                }
                if (result.length > 0) {
                    res.tipo = 100;
                    res.valor = result;
                    return res;
                }
            }
            else {
                //ERROR: tipo2 no compatible para position()
            }
        }
        else if (e2.tipo == 6 && e2.valor == 'position()') {
            if (e1.tipo == 0 || e1.tipo == 1) {
                var result = [];
                for (var i = parseInt(e1.valor.toString()) + 1; i < entorno[0].length + 1; i++) {
                    result.push(entorno[0][i - 1]);
                }
                if (result.length > 0) {
                    res.tipo = 100;
                    res.valor = result;
                    return res;
                }
            }
            else {
                //ERROR: tipo2 no compatible para position()
            }
        }
        else {
            //ERROR: tipo1 no es valido para las sumas
        }
        return res;
    };
    return Menor;
}(Expresion_1.Expresion));
exports.Menor = Menor;
