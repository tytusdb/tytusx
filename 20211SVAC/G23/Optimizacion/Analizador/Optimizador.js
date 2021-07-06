"use strict";
exports.__esModule = true;
exports.Optimizador = void 0;
var ReporteOptimizacion_1 = require("../Reporte/ReporteOptimizacion");
var GeneradorOptiAST_1 = require("./GeneradorOptiAST");
var AST_1 = require("../OptimizadorAST/AST");
var Optimizador = /** @class */ (function () {
    function Optimizador() {
        this.instrucciones = new Array();
        this.reporte = new ReporteOptimizacion_1.ReporteOptimizacion();
        this.codigoOptimizado = "";
        this.codigoAnterior = "";
    }
    Optimizador.prototype.inicializar = function () {
        this.reporte = new ReporteOptimizacion_1.ReporteOptimizacion();
        this.codigoOptimizado = "";
        this.codigoAnterior = "";
        this.instrucciones = new Array();
    };
    Optimizador.prototype.optimizar = function (texto, arbol, aplicaBloques) {
        if (aplicaBloques === void 0) { aplicaBloques = false; }
        var codFuncion = ""; //mi variable
        var codInstrucciones = ""; //mi variable
        this.codigoAnterior = texto;
        this.codigoOptimizado = "";
        var migenerador = new GeneradorOptiAST_1.GeneradorOptiAST(arbol);
        var funciones = migenerador.funciones;
        this.codigoOptimizado += migenerador.head;
        for (var a = 0; a < funciones.length; a++) {
            codInstrucciones = "";
            var instrucciones = funciones[a].instrucciones;
            this.instrucciones = instrucciones;
            var ast = new AST_1.AST(this.instrucciones);
            //PRIMERA PASADA: PARA GUARDAR TODAS LAS ETIQUETAS
            if (instrucciones != null) {
                for (var i = 0; i < instrucciones.length; i++) {
                    ast.agregarEtiqueta(instrucciones[i]);
                }
            }
            //SEGUNDA PASADA: OPTIMIZAMOS
            if (instrucciones != null) {
                for (var i = 0; i < instrucciones.length; i++) {
                    if (ast.etiquetasBetadas.includes(instrucciones[i].id))
                        continue;
                    codInstrucciones += instrucciones[i].optimizarCodigoo(this.reporte, ast, aplicaBloques);
                }
            }
            codFuncion = "void " + funciones[a].nombre + "(){\n" + codInstrucciones + "}\n\n";
            this.codigoOptimizado += codFuncion;
        }
        return this.codigoOptimizado;
    };
    Optimizador.prototype.reportar = function () {
        this.reporte.generarReporteOptimizacion();
    };
    return Optimizador;
}());
exports.Optimizador = Optimizador;
