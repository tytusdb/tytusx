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
exports.Imprimir = void 0;
var Instruccion_1 = require("../OptimizadorAST/Instruccion");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var Imprimir = /** @class */ (function (_super) {
    __extends(Imprimir, _super);
    function Imprimir(cad, cadena, linea, columna) {
        var _this = _super.call(this) || this;
        _this.cad = cad;
        _this.cadena = cadena;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    Imprimir.prototype.optimizarCodigo = function (reporte) {
        var antes = this.generarAugus(reporte);
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Imprimir.prototype.generarAugus = function (reporte) {
        var codigoAugus = "printf(" + this.cadena + "," + this.cad.generarAugus() + ");\n";
        return codigoAugus;
    };
    return Imprimir;
}(Instruccion_1.Instruccion));
exports.Imprimir = Imprimir;
