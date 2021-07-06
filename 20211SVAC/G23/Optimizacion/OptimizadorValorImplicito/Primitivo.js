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
exports.Primitivo = void 0;
var Expresion_1 = require("../OptimizadorAST/Expresion");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var Primitivo = /** @class */ (function (_super) {
    __extends(Primitivo, _super);
    function Primitivo(valor) {
        var _this = _super.call(this) || this;
        _this.valor = valor;
        return _this;
    }
    Primitivo.prototype.optimizarCodigo = function () {
        var antes = this.generarAugus();
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Primitivo.prototype.generarAugus = function () {
        return "" + this.valor;
    };
    return Primitivo;
}(Expresion_1.Expresion));
exports.Primitivo = Primitivo;
