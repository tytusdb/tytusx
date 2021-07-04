"use strict";
exports.__esModule = true;
exports.Optimizacion = exports.Optimizador = void 0;
var test_1 = require("../test");
var Optimizador = /** @class */ (function () {
    function Optimizador() {
        this.cadenaOptimizada = '';
        this.cadenaInicial = '';
        this.listaInstrucciones = [];
        this.reporteOptimizacion = [];
        this.nuevasInstrucciones = [];
    }
    Optimizador.prototype.addInstruccion = function (instruccion) {
        this.listaInstrucciones.push(instruccion);
    };
    Optimizador.prototype.optimizar = function (codigo) {
        this.listaInstrucciones = [];
        // trayendo c3d del main
        this.cadenaOptimizada = '';
        console.log('codigo -Z', codigo);
        //metiendo el c3d al parser
        this.listaInstrucciones = test_1.parse(codigo);
        console.log(this.listaInstrucciones);
        // nuevalista.lenght = viejalista.lenght
        this.nuevasInstrucciones = this.listaInstrucciones;
        this.reglas6_16Header(this.listaInstrucciones);
        //paso el array a la cadena
        this.arrayCadena();
        console.log(this.reporteOptimizacion);
        return this.cadenaOptimizada;
    };
    Optimizador.prototype.reglas6_16Header = function (array) {
        var contador = 0;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var instruccion = array_1[_i];
            if (instruccion.getTipo().includes('header')) {
                // primero miro si es header, si es, lo meto de una a la cadena
                this.cadenaOptimizada += instruccion.cadena;
                this.cadenaOptimizada += '\n';
            }
            if (instruccion.getTipo().includes('asignacion')) {
                if (instruccion.arg1 == '0' || instruccion.arg2 == '0') {
                    if (instruccion.operador == '/' || instruccion.operador == '*') {
                        // si cumple con todas las condiciones de 15 y 16 
                        var regla = void 0;
                        if (instruccion.operador == '/') {
                            regla = '16';
                        }
                        else {
                            regla = '15';
                        }
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena));
                    }
                }
            }
            contador++;
        }
    };
    Optimizador.prototype.arrayCadena = function () {
        for (var _i = 0, _a = this.nuevasInstrucciones; _i < _a.length; _i++) {
            var linea = _a[_i];
            this.cadenaOptimizada += linea.cadena + '\n';
        }
    };
    return Optimizador;
}());
exports.Optimizador = Optimizador;
var Optimizacion = /** @class */ (function () {
    function Optimizacion(linea, regla, codigo) {
        this.linea = linea;
        this.regla = regla;
        this.codigo = codigo;
    }
    return Optimizacion;
}());
exports.Optimizacion = Optimizacion;
