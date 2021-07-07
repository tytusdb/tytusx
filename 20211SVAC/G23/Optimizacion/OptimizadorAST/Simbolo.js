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
exports.Simbolo = void 0;
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var Expresion_1 = require("./Expresion");
var Simbolo = /** @class */ (function (_super) {
    __extends(Simbolo, _super);
    function Simbolo(id, linea, columna) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    Simbolo.prototype.optimizarCodigo = function () {
        var antes = this.generarAugus();
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Simbolo.prototype.generarAugus = function () {
        return this.id;
    };
    return Simbolo;
}(Expresion_1.Expresion));
exports.Simbolo = Simbolo;
