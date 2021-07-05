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
exports.ReturnXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var localStorage = require('localStorage');
var ReturnXQ = /** @class */ (function (_super) {
    __extends(ReturnXQ, _super);
    function ReturnXQ(e, l, c) {
        var _this = _super.call(this) || this;
        _this.exret = e;
        _this.linea = l;
        _this.columna = c;
        _this.retorno = null;
        return _this;
    }
    ReturnXQ.prototype.ejecutar = function (ent) {
        //Verificar que este dentro de una funcion
        var contador = parseInt(localStorage.getItem('contador'));
        //console.log('La pila tiene un length de: ' + contador);
        if (contador != 0) {
            if (this.exret != null) {
                this.retorno = this.exret.getValor(ent);
            }
            return this;
        }
        return null;
    };
    return ReturnXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.ReturnXQ = ReturnXQ;
