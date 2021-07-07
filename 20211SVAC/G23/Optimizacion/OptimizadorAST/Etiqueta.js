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
exports.Etiqueta = void 0;
var Instruccion_1 = require("../OptimizadorAST/Instruccion");
var Asignacion_1 = require("../OptimizadorValorImplicito/Asignacion");
var OPtimizacion_1 = require("../Reporte/OPtimizacion");
var GOTO_1 = require("./GOTO");
var If_1 = require("../OptimizadorCondicional/If");
var Etiqueta = /** @class */ (function (_super) {
    __extends(Etiqueta, _super);
    function Etiqueta(id, instrucciones, linea, columna) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.instrucciones = instrucciones;
        _this.linea = linea;
        _this.columna = columna;
        _this.codigoOptimizado = "";
        _this.imprimirEtiqueta = true;
        return _this;
    }
    Etiqueta.prototype.traducirCodigo = function (reporte, ast, instrucciones, aplicaBloque) {
        var contador = 0;
        var codigoOptimizado = "";
        var instruccionAnterior;
        var asignacionPrevia;
        var codigoAnterior = "";
        for (var _i = 0, instrucciones_1 = instrucciones; _i < instrucciones_1.length; _i++) {
            var Element_1 = instrucciones_1[_i];
            if (Element_1 instanceof Asignacion_1.Asignacion) {
                var asig = Element_1;
                asig.instruccionPrevia = asignacionPrevia;
                asignacionPrevia = Element_1;
            }
            else if (Element_1 instanceof GOTO_1.GOTO) {
                var insgoto = Element_1;
                insgoto.ast = ast;
            }
            else if (Element_1 instanceof If_1.If) {
                var insif = Element_1;
                for (var i = contador + 1; i < this.instrucciones.length; i++) {
                    insif.instrucciones.push(this.instrucciones[i]);
                }
            }
            var optimizado = "";
            if (Element_1 instanceof If_1.If) {
                var insif = Element_1;
                insif.ast = ast; //necesario antes de optimizar cada if
                optimizado = insif.optimizarCodigo(reporte).codigo;
            }
            else {
                if (instruccionAnterior instanceof If_1.If && Element_1 instanceof GOTO_1.GOTO) {
                    var antif = instruccionAnterior;
                    if (!antif.seAplicoRegla3)
                        optimizado = Element_1.optimizarCodigo(reporte).codigo;
                }
                else
                    optimizado = Element_1.optimizarCodigo(reporte).codigo;
            }
            //Regla 2 Mirilla
            if (Element_1 instanceof GOTO_1.GOTO) {
                if (codigoAnterior.startsWith("goto")) {
                    if (instruccionAnterior instanceof If_1.If) {
                        codigoAnterior = "";
                        continue;
                    }
                }
                var insgoto = Element_1;
                if (ast.existeEtiqueta(insgoto.id)) {
                    if (optimizado != "") {
                        codigoOptimizado += "   " + optimizado;
                        codigoAnterior = optimizado;
                    }
                    if ((contador + 1) == this.instrucciones.length)
                        continue; //si no existen mas instrucciones no hay optimizacion
                    var optimizacion = new OPtimizacion_1.OPtimizacion(); //si hay optimizacion
                    optimizacion.linea = "" + (insgoto.linea + 1);
                    var codigoOptimizar = "";
                    for (var i = contador + 1; i < this.instrucciones.length; i++) {
                        var instruccion = this.instrucciones[i];
                        if (instruccion instanceof GOTO_1.GOTO) {
                            var mygoto = instruccion;
                            mygoto.ast = ast;
                        }
                        else if (instruccion instanceof If_1.If)
                            continue;
                        codigoOptimizar += instruccion.optimizarCodigo(reporte).codigo;
                    }
                    optimizacion.antes = codigoOptimizar;
                    optimizacion.despues = insgoto.id + ":\n";
                    optimizacion.regla = "Regla 1";
                    optimizacion.tipo = "Mirilla - Eliminación de Código Inalcanzable";
                    reporte.agregarOpt(optimizacion);
                    codigoAnterior = "";
                    break;
                }
                else {
                    if (optimizado != "") {
                        codigoOptimizado += "   " + optimizado;
                        codigoAnterior = optimizado;
                    }
                }
            }
            else {
                if (optimizado != "") {
                    codigoOptimizado += "   " + optimizado;
                    codigoAnterior = optimizado;
                }
            }
            instruccionAnterior = Element_1;
            contador++;
        }
        //(Instruccion ins in instrucciones) 
        return codigoOptimizado;
    };
    Etiqueta.prototype.optimizarCodigoo = function (reporte, ast, aplicaBloque) {
        if (aplicaBloque === void 0) { aplicaBloque = false; }
        this.codigoOptimizado = "";
        if (this.imprimirEtiqueta)
            this.codigoOptimizado += this.id + ":\n";
        var strResultado = this.traducirCodigo(reporte, ast, this.instrucciones, aplicaBloque);
        this.codigoOptimizado += strResultado;
        return this.codigoOptimizado;
    };
    Etiqueta.prototype.optimizarCodigo = function (reporte) {
        return null;
    };
    Etiqueta.prototype.generarAugus = function (reporte) {
        return "";
    };
    return Etiqueta;
}(Instruccion_1.Instruccion));
exports.Etiqueta = Etiqueta;
