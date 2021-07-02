"use strict";
exports.__esModule = true;
var Entorno_1 = require("../AST/Entorno");
var TraduceXML = /** @class */ (function () {
    function TraduceXML() {
        this.contS = 0;
        this.contH = 0;
        this.indice = 0;
        this.heap = new Array();
        this.stack = new Array();
        this.strTraduccion = '';
        if (typeof TraduceXML._instance === "object") {
            return TraduceXML._instance;
        }
        TraduceXML._instance = this;
        return this;
    }
    TraduceXML.prototype.getHeap = function () {
        return this.heap;
    };
    TraduceXML.prototype.getStack = function () {
        return this.stack;
    };
    TraduceXML.prototype.getContS = function () {
        return this.contS;
    };
    TraduceXML.prototype.getContH = function () {
        return this.contS;
    };
    TraduceXML.prototype.getStrTraduccion = function () {
        return this.strTraduccion;
    };
    TraduceXML.prototype.getEncabezado = function () {
        var encabezado = '/*------HEADER------*/ \n'
            + '#include <stdio.h> \n'
            + '#include <math.h> \n'
            + '\n'
            + 'double heap[30101999]; \n'
            + 'double stack[30101999]; \n'
            + 'double S; \n'
            + 'double H; \n';
        return encabezado;
    };
    TraduceXML.prototype.getMain = function (cuerpo) {
        var main;
        main = '/*------MAIN------*/ \n'
            + 'void main() { \n'
            + '    S = 0; H = 0; \n'
            + cuerpo + '\n'
            + '    return; \n'
            + '} \n';
        return main;
    };
    TraduceXML.prototype.getCodeC = function (cuerpo) {
        var codigo3d;
        codigo3d = this.getEncabezado();
        codigo3d = codigo3d + this.getMain(cuerpo);
    };
    TraduceXML.prototype.traducirXML = function (global) {
        console.log('/* Inicio Traduccion */');
        this.strTraduccion = this.strTraduccion + this.getEncabezado();
        this.strTraduccion = this.strTraduccion + this.getDeclaraTemps();
        this.strTraduccion = this.getMain(this.getTraduccion(global));
        console.log('/* Fin Traduccion */');
        return '';
    };
    TraduceXML.prototype.getDeclaraTemps = function () {
        var temps = 'double ';
        for (var c = 0; c < this.heap.length; c++) {
            temps = temps + 't' + c.toString();
            temps = temps + ((c == this.heap.length - 1) ? ';' : ',');
        }
        return temps;
    };
    TraduceXML.prototype.getTraduccion = function (entrada) {
        var _this = this;
        var cadena = '\n';
        var tabla = entrada.tsimbolos;
        tabla.forEach(function (elem) {
            if (elem.valor.pade !== null || elem.valor.pade == undefined) {
                if (elem.valor.valor instanceof Entorno_1.Entorno) {
                    _this.getTraduccion(elem.valor.valor);
                }
                else {
                    if (elem.valor.valor !== false) {
                        cadena = cadena + _this.getIDAsignacionHeap(elem.valor.nombre);
                        cadena = cadena + _this.getVALAsignacionHeap(elem.valor.valor);
                    }
                }
            }
        });
        return cadena;
    };
    TraduceXML.prototype.getIDAsignacionHeap = function (palabra) {
        var _this = this;
        var asignacion = '\t/* IDENTIFICADOR "' + palabra + '" EN HEAP*/';
        asignacion = asignacion + 'T' + this.contS + ' = H;\n';
        /* Descompone la palabra en caracteres y los asigna al Heap */
        palabra.split('').forEach(function (element) {
            asignacion = asignacion
                + 'heap[(int)H] = ' + element.charCodeAt(0) + '; \n'
                + 'H = H + 1; \n';
            _this.heap.push(element.charCodeAt(0));
            _this.contH++;
        });
        /* Coloca un -1 para indicar que el valor es una cadena*/
        asignacion = asignacion
            + 'heap[(int)H] = -1;'
            + 'H = H + 1;';
        asignacion = asignacion
            + 'stack[(int)' + this.contS + '] = T' + this.contS + '; \n';
        this.stack.push(this.contS);
        this.contS++;
        return asignacion;
    };
    TraduceXML.prototype.getVALAsignacionHeap = function (palabra) {
        var _this = this;
        var asignacion = '\t/* VALOR "' + palabra + '" EN HEAP*/';
        asignacion = asignacion + 'T' + this.contH + ' = H;\n';
        /* Descompone la palabra en caracteres y los asigna al Heap */
        palabra.split('').forEach(function (element) {
            asignacion = asignacion
                + 'heap[(int)H] = ' + element.charCodeAt(0) + '; \n'
                + 'H = H + 1; \n';
            _this.heap.push(element.charCodeAt(0));
            _this.contH++;
        });
        /* Coloca un -1 para indicar que el valor es una cadena*/
        asignacion = asignacion
            + 'heap[(int)H] = -1;'
            + 'H = H + 1;';
        asignacion = asignacion
            + 'stack[(int)' + this.contS + '] = T' + this.contS + ';';
        this.stack.push(this.contS);
        this.contS++;
        return asignacion;
    };
    return TraduceXML;
}());
var traductorXML = new TraduceXML();
exports["default"] = traductorXML;
