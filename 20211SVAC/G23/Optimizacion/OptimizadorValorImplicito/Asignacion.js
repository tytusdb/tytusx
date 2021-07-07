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
exports.Asignacion = void 0;
var Operacion_1 = require("./Operacion");
var Instruccion_1 = require("../OptimizadorAST/Instruccion");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var OPtimizacion_1 = require("../Reporte/OPtimizacion");
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(id, valor, linea, columna) {
        var _this = _super.call(this) || this;
        _this.linea = linea;
        _this.columna = columna;
        _this.id = id;
        _this.valor = valor;
        _this.instruccionPrevia = null;
        return _this;
    }
    Asignacion.prototype.optimizarCodigo = function (reporte) {
        var antes = this.generarAugus(reporte);
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Asignacion.prototype.generarAugus = function (reporte) {
        var codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";
        var optimizacion = new OPtimizacion_1.OPtimizacion();
        optimizacion.linea = "" + (this.linea + 1);
        optimizacion.antes = codigoAugus;
        optimizacion.tipo = "Mirilla - Simplificación algebraica y por fuerza";
        if (this.valor.tipo == Operacion_1.TIPO_OPERACION.SUMA) {
            if (this.valor.validarRegla8(this.id)) {
                optimizacion.regla = "Regla 6";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla12() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla12() + ";\n";
                optimizacion.regla = "Regla 10";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if (this.valor.tipo == Operacion_1.TIPO_OPERACION.RESTA) {
            if (this.valor.validarRegla9(this.id)) {
                optimizacion.regla = "Regla 7";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla13() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla13() + ";\n";
                optimizacion.regla = "Regla 11";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if (this.valor.tipo == Operacion_1.TIPO_OPERACION.MULTIPLICACION) {
            if (this.valor.validarRegla10(this.id)) {
                optimizacion.regla = "Regla 8";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla14() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla14() + ";\n";
                optimizacion.regla = "Regla 12";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
            else if (this.valor.validarRegla16() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla16() + ";\n";
                optimizacion.regla = "Regla 14";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
            else if (this.valor.validarRegla17() == "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla17() + ";\n";
                optimizacion.regla = "Regla 15";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if (this.valor.tipo == Operacion_1.TIPO_OPERACION.DIVISION) {
            if (this.valor.validarRegla11(this.id)) {
                optimizacion.regla = "Regla 9";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla15() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla15() + ";\n";
                optimizacion.regla = "Regla 13";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
            else if (this.valor.validarRegla18() != "") {
                codigoAugus = this.id + " = " + this.valor.validarRegla18() + ";\n";
                optimizacion.regla = "Regla 16";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if (this.valor.tipo == Operacion_1.TIPO_OPERACION.ID) {
            codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";
            if (this.instruccionPrevia != null) {
                if (this.instruccionPrevia.valor.tipo == Operacion_1.TIPO_OPERACION.ID) {
                    //MI REGLA 5 Revisar estas reglas en caso de...
                    var varA = this.id;
                    var varB = this.instruccionPrevia.id;
                    if (this.valor.validarRegla1(varA, this.valor.valor, varB, this.instruccionPrevia.valor.valor)) {
                        optimizacion.tipo = "Mirilla - Eliminación de Instrucciones Redundantes y de Almacenamiento";
                        optimizacion.regla = "Regla 5";
                        optimizacion.despues = "";
                        reporte.agregarOpt(optimizacion);
                        return "";
                    }
                }
            }
        }
        else
            codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";
        return codigoAugus;
    };
    return Asignacion;
}(Instruccion_1.Instruccion));
exports.Asignacion = Asignacion;
