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
exports.Call = void 0;
var Instruccion_1 = require("../OptimizadorAST/Instruccion");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var Call = /** @class */ (function (_super) {
    __extends(Call, _super);
    function Call(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    Call.prototype.optimizarCodigo = function (reporte) {
        var antes = this.generarAugus(reporte);
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Call.prototype.generarAugus = function (reporte) {
        var codigoAugus = this.id + "();\n";
        return codigoAugus;
    };
    return Call;
}(Instruccion_1.Instruccion));
exports.Call = Call;
