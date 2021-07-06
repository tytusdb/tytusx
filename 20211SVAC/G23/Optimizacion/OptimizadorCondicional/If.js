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
exports.If = void 0;
var Instruccion_1 = require("../OptimizadorAST/Instruccion");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var OPtimizacion_1 = require("../Reporte/OPtimizacion");
var Operacion_1 = require("../OptimizadorValorImplicito/Operacion");
var GOTO_1 = require("../OptimizadorAST/GOTO");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(condicion, etiqueta, linea, columna) {
        var _this = _super.call(this) || this;
        _this.condicion = condicion;
        _this.etiqueta = etiqueta;
        _this.linea = linea;
        _this.columna = columna;
        _this.instrucciones = new Array();
        _this.ast = null;
        _this.seAplicoRegla3 = false;
        return _this;
    }
    If.prototype.optimizarCodigo = function (reporte) {
        var antes = this.generarAugus(reporte);
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    If.prototype.generarAugus = function (reporte) {
        var codigoAugus = "if(" + this.condicion.generarAugus() + ") goto " + this.etiqueta + ";\n";
        var optimizacion = new OPtimizacion_1.OPtimizacion();
        optimizacion.linea = "" + (this.linea + 1);
        optimizacion.antes = codigoAugus;
        optimizacion.tipo = "Mirilla - Eliminación de Codigo Inalcanzable";
        if (this.condicion.tipo == Operacion_1.TIPO_OPERACION.IGUAL_IGUAL) {
            if (this.condicion.validarRegla4()) {
                optimizacion.regla = "Regla 3";
                optimizacion.despues = "goto " + this.etiqueta + ";";
                reporte.agregarOpt(optimizacion);
                codigoAugus = "goto " + this.etiqueta + ";\n";
            }
            else if (this.condicion.validarRegla5()) {
                optimizacion.regla = "Regla 4";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
        }
        try {
            if (codigoAugus.startsWith("if")) {
                if (this.instrucciones.length > 0) {
                    if (this.instrucciones[0] instanceof GOTO_1.GOTO) //validamos que la siguiente instruccion sea un goto
                     {
                        var condicionNueva = this.condicion.invertirCondicion();
                        if (condicionNueva != this.condicion.generarAugus()) //si la condicion si cambio se hace la optimizacion
                         {
                            var etiquetaFalse = this.instrucciones[0];
                            var etiquetaTrue = this.ast.obtenerEtiqueta(this.etiqueta);
                            var codigoOptimizar = codigoAugus;
                            codigoOptimizar += "goto " + etiquetaFalse.id + ";\n";
                            codigoOptimizar += etiquetaTrue.id + ":\n";
                            codigoOptimizar += "[instrucciones_" + etiquetaTrue.id + "]\n";
                            codigoOptimizar += etiquetaFalse.id + ":\n";
                            codigoOptimizar += "[instrucciones_" + etiquetaFalse.id + "]\n";
                            codigoAugus = "if(" + condicionNueva + ") goto " + etiquetaFalse.id + ";\n";
                            var codigoOptimizado = codigoAugus;
                            codigoOptimizado += "[instrucciones_" + etiquetaTrue.id + "]\n";
                            codigoOptimizado += etiquetaFalse.id + ":\n";
                            codigoOptimizado += "[instrucciones_" + etiquetaFalse.id + "]\n";
                            optimizacion.antes = codigoOptimizar;
                            optimizacion.despues = codigoOptimizado;
                            optimizacion.regla = "Regla 2";
                            optimizacion.tipo = "Mirilla - Eliminación de Código Inalcanzable";
                            reporte.agregarOpt(optimizacion);
                            this.seAplicoRegla3 = true;
                            etiquetaTrue.imprimirEtiqueta = false;
                            //etiquetaTrue.ast = ast;
                            codigoAugus += etiquetaTrue.optimizarCodigoo(reporte, this.ast);
                            this.ast.etiquetasBetadas.push(etiquetaTrue.id);
                        }
                    }
                }
            }
        }
        catch (Exception) {
            return null;
        }
        return codigoAugus;
    };
    return If;
}(Instruccion_1.Instruccion));
exports.If = If;
