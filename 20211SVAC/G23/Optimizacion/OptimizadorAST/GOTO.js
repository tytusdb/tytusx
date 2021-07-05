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
exports.GOTO = void 0;
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var Instruccion_1 = require("./Instruccion");
var GOTO = /** @class */ (function (_super) {
    __extends(GOTO, _super);
    function GOTO(id, linea, columna) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.linea = linea;
        _this.columna = columna;
        _this.ast = null;
        return _this;
    }
    GOTO.prototype.GOTO = function (id, linea, columna) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.ast = null;
    };
    GOTO.prototype.optimizarCodigo = function (reporte) {
        var antes = this.generarAugus(reporte);
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    GOTO.prototype.generarAugus = function (reporte) {
        var codigoAugus = "goto " + this.id + ";\n";
        return codigoAugus;
    };
    return GOTO;
}(Instruccion_1.Instruccion));
exports.GOTO = GOTO;
