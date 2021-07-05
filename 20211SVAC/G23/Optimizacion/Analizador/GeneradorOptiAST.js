"use strict";
exports.__esModule = true;
exports.GeneradorOptiAST = void 0;
var Funcion_1 = require("../OptimizadorAST/Funcion");
var Operacion_1 = require("../OptimizadorValorImplicito/Operacion");
var Exit_1 = require("../OptimizadorPrimitivas/Exit");
var GOTO_1 = require("../OptimizadorAST/GOTO");
var Etiqueta_1 = require("../OptimizadorAST/Etiqueta");
var Asignacion_1 = require("../OptimizadorValorImplicito/Asignacion");
var Primitivo_1 = require("../OptimizadorValorImplicito/Primitivo");
var If_1 = require("../OptimizadorCondicional/If");
var Imprimir_1 = require("../OptimizadorPrimitivas/Imprimir");
var Call_1 = require("../OptimizadorPrimitivas/Call");
var GeneradorOptiAST = /** @class */ (function () {
    function GeneradorOptiAST(arbol) {
        this.funciones = new Array();
        this.generar(arbol);
    }
    GeneradorOptiAST.prototype.generar = function (raiz) {
        this.funciones = this.analizarNodo(raiz);
    };
    GeneradorOptiAST.prototype.analizarNodo = function (actual) {
        if (this.compararNodo(actual, "Inicio")) {
            this.head = "";
            this.analizarNodo(actual.hijos[0]);
            return this.analizarNodo(actual.hijos[1]);
        }
        else if (this.compararNodo(actual, "HEAD")) {
            this.head += "#include <stdio.h>\n";
            this.analizarNodo(actual.hijos[5]); //L_VR
            this.analizarNodo(actual.hijos[6]); //G_TMP
        }
        else if (this.compararNodo(actual, "L_VR")) {
            for (var _i = 0, _a = actual.hijos; _i < _a.length; _i++) {
                var hijo = _a[_i];
                this.analizarNodo(hijo);
            }
        }
        else if (this.compararNodo(actual, "VR")) {
            if (actual.hijos.length == 6) {
                this.head += "float " + this.getLexema(actual.hijos[1]) + "[" + this.getLexema(actual.hijos[3]) + "];\n";
            }
            else { //3 HIJOS
                this.head += "float " + this.getLexema(actual.hijos[1]) + ";\n";
            }
        }
        else if (this.compararNodo(actual, "G_TMP")) {
            this.head += "float ";
            this.analizarNodo(actual.hijos[1]);
        }
        else if (this.compararNodo(actual, "L_TMP")) {
            for (var i = 0; i < actual.hijos.length; i++) {
                var temporal = actual.hijos[i];
                var cadtemporal = this.getLexema(temporal);
                if (i + 1 == actual.hijos.length) { //si es el ultimo
                    this.head += cadtemporal + ";\n\n";
                }
                else {
                    if (cadtemporal.endsWith("0"))
                        this.head += cadtemporal + ",\n";
                    else
                        this.head += cadtemporal + ",";
                }
            }
        }
        else if (this.compararNodo(actual, "L_FUN")) {
            var funciones = new Array();
            for (var _b = 0, _c = actual.hijos; _b < _c.length; _b++) {
                var hijo = _c[_b];
                var funcion = this.analizarNodo(hijo);
                funciones.push(funcion);
            }
            return funciones;
        }
        else if (this.compararNodo(actual, "FUN")) {
            var id = this.getLexema(actual.hijos[1]);
            var etiquetas = void 0;
            if (actual.hijos.length == 8) {
                var sentencias = this.analizarNodo(actual.hijos[5]);
                var subetiquetas = this.analizarNodo(actual.hijos[6]);
                //Simulo la primera etiqueta
                var primerEtiqueta = new Etiqueta_1.Etiqueta("//PET", sentencias, actual.hijos[0].linea, actual.hijos[0].columna); //poner parametro en el Nodo para linea y columna
                etiquetas = new Array();
                etiquetas.push(primerEtiqueta);
                for (var _d = 0, subetiquetas_1 = subetiquetas; _d < subetiquetas_1.length; _d++) {
                    var eti = subetiquetas_1[_d];
                    etiquetas.push(eti);
                }
            }
            else { //7 hijos
                if (this.compararNodo(actual.hijos[5], "L_SEN")) {
                    var sentencias = this.analizarNodo(actual.hijos[5]);
                    //Simulo la primera etiqueta
                    var primerEtiqueta = new Etiqueta_1.Etiqueta("//PET", sentencias, actual.hijos[0].linea, actual.hijos[0].columna);
                    etiquetas = new Array();
                    etiquetas.push(primerEtiqueta);
                }
                else { //L_ET
                    etiquetas = this.analizarNodo(actual.hijos[5]);
                }
            }
            return new Funcion_1.Funcion(id, etiquetas);
        }
        else if (this.compararNodo(actual, "L_ET")) {
            var etiquetas = new Array();
            for (var _e = 0, _f = actual.hijos; _e < _f.length; _e++) {
                var hijo = _f[_e];
                var etiqueta = this.analizarNodo(hijo);
                etiquetas.push(etiqueta);
            }
            return etiquetas;
        }
        else if (this.compararNodo(actual, "ET")) {
            var id = this.getLexema(actual.hijos[0]);
            var sentencias = void 0;
            if (actual.hijos.length == 3) {
                sentencias = this.analizarNodo(actual.hijos[2]);
            }
            else { //2 HIJOS
                sentencias = new Array();
            } // parametros para lineas y columnas
            return new Etiqueta_1.Etiqueta(id, sentencias, actual.hijos[0].linea, actual.hijos[0].columna);
        }
        else if (this.compararNodo(actual, "L_SEN")) {
            var sentencias = new Array();
            for (var _g = 0, _h = actual.hijos; _g < _h.length; _g++) {
                var hijo = _h[_g];
                var sentencia = this.analizarNodo(hijo);
                sentencias.push(sentencia);
            }
            return sentencias;
        }
        else if (this.compararNodo(actual, "SEN")) {
            return this.analizarNodo(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "ASIG")) {
            var target = this.analizarNodo(actual.hijos[0]);
            var expresion = this.analizarNodo(actual.hijos[2]); // parametros de fila y columna
            return new Asignacion_1.Asignacion(target, expresion, actual.hijos[1].linea, actual.hijos[1].columna);
        }
        else if (this.compararNodo(actual, "TG")) {
            var target = void 0;
            if (actual.hijos.length == 1) {
                target = this.getLexema(actual.hijos[0]);
            }
            else {
                target = this.getLexema(actual.hijos[0]);
                target += "[" + this.analizarNodo(actual.hijos[2]) + "]"; //espero que no de problemas
            }
            return target;
        }
        else if (this.compararNodo(actual, "INDEX")) {
            var index = void 0;
            if (actual.hijos.length == 1) {
                index = this.getLexema(actual.hijos[0]);
            }
            else {
                index = "(int)" + this.getLexema(actual.hijos[3]);
            }
            return index;
        }
        else if (this.compararNodo(actual, "EXP")) {
            return this.analizarNodo(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "EXPNUM")) {
            var opIzq = this.analizarNodo(actual.hijos[0]);
            var operacion = this.analizarNodo(actual.hijos[1]);
            var opDer = this.analizarNodo(actual.hijos[2]);
            var op = new Operacion_1.Operacion();
            op.Operation(opIzq, opDer, operacion, 1, 1);
            return op;
        }
        else if (this.compararNodo(actual, "VALO")) {
            return this.analizarNodo(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "PUN")) {
            var op = new Operacion_1.Operacion(); //parametros de linea y columna
            op.Identificador(this.getLexema(actual.hijos[0]), actual.hijos[0].linea, actual.hijos[0].columna);
            return op;
        }
        else if (this.compararNodo(actual, "PRIMI")) {
            var op = new Operacion_1.Operacion();
            var valor = void 0;
            if (actual.hijos.length == 1) {
                valor = this.getLexema(actual.hijos[0]); //aqui puede dar problemas, espero que no.
                op.Primitivo(new Primitivo_1.Primitivo(valor));
            }
            else {
                valor = "-" + this.getLexema(actual.hijos[1]); //aqui puede dar problemas, espero que no.
                op.Primitivo(new Primitivo_1.Primitivo(valor));
            }
            return op;
        }
        else if (this.compararNodo(actual, "TEMP")) {
            var op = new Operacion_1.Operacion();
            op.Identificador(this.getLexema(actual.hijos[0]), actual.hijos[0].linea, actual.hijos[0].columna);
            return op;
        }
        else if (this.compararNodo(actual, "STR")) {
            var estructura = this.getLexema(actual.hijos[0]);
            estructura += "[" + this.analizarNodo(actual.hijos[2]) + "]";
            var op = new Operacion_1.Operacion(); //parametros de linea y columna para el node
            op.Identificador(estructura, actual.hijos[0].linea, actual.hijos[0].columna);
            return op;
        }
        else if (this.compararNodo(actual, "ARI")) {
            return this.getOperacion(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "IF")) {
            var condicion = this.analizarNodo(actual.hijos[2]);
            var etiqueta = this.getLexema(actual.hijos[5]); // tambien parametros de fila y columna
            return new If_1.If(condicion, etiqueta, actual.hijos[0].linea, actual.hijos[0].columna);
        }
        else if (this.compararNodo(actual, "COND")) {
            var izq = this.analizarNodo(actual.hijos[0]);
            var operacion = this.analizarNodo(actual.hijos[1]);
            var der = this.analizarNodo(actual.hijos[2]);
            var op = new Operacion_1.Operacion(); //parametros de fila y columna
            op.Operation(izq, der, operacion, actual.hijos[1].hijos[0].linea, actual.hijos[1].hijos[0].columna);
            return op;
        }
        else if (this.compararNodo(actual, "VALI")) {
            return this.analizarNodo(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "RELA")) {
            return this.getOperacion(actual.hijos[0]);
        }
        else if (this.compararNodo(actual, "GO")) {
            var id = this.getLexema(actual.hijos[1]); // parametros de fila y columna
            return new GOTO_1.GOTO(id, actual.hijos[0].linea, actual.hijos[0].columna);
        }
        else if (this.compararNodo(actual, "PRT")) {
            var cadena = this.getLexema(actual.hijos[2]);
            var value = this.analizarNodo(actual.hijos[4]);
            var op = new Operacion_1.Operacion(); //parametros para fila y columna
            op.Identificador(value, actual.hijos[0].linea, actual.hijos[0].columna);
            return new Imprimir_1.Imprimir(op, cadena, actual.hijos[0].linea, actual.hijos[0].columna);
        }
        else if (this.compararNodo(actual, "VALP")) {
            var valp = void 0;
            if (actual.hijos.length == 1) {
                valp = this.getLexema(actual.hijos[0]);
            }
            else if (actual.hijos.length == 2) {
                valp = "-" + this.getLexema(actual.hijos[1]);
            }
            else {
                valp = "(int)" + this.getLexema(actual.hijos[3]);
            }
            return valp;
        }
        else if (this.compararNodo(actual, "RET")) {
            return new Exit_1.Exit();
        }
        else if (this.compararNodo(actual, "CALL")) {
            var id = this.getLexema(actual.hijos[0]);
            return new Call_1.Call(id);
        }
        return null;
    };
    GeneradorOptiAST.prototype.compararNodo = function (nodo, nombre) {
        return nodo.nombre == nombre;
    };
    GeneradorOptiAST.prototype.getLexema = function (nodo) {
        return nodo.valor;
    };
    GeneradorOptiAST.prototype.getOperacion = function (nodo) {
        var nombre = nodo.valor;
        if (nombre.includes(">="))
            return Operacion_1.TIPO_OPERACION.MAYOR_IGUA_QUE;
        else if (nombre.includes("<="))
            return Operacion_1.TIPO_OPERACION.MENOR_IGUA_QUE;
        else if (nombre.includes("!="))
            return Operacion_1.TIPO_OPERACION.DIFERENTE_QUE;
        else if (nombre.includes(">"))
            return Operacion_1.TIPO_OPERACION.MAYOR_QUE;
        else if (nombre.includes("<"))
            return Operacion_1.TIPO_OPERACION.MENOR_QUE;
        else if (nombre.includes("=="))
            return Operacion_1.TIPO_OPERACION.IGUAL_IGUAL;
        else if (nombre.includes("+"))
            return Operacion_1.TIPO_OPERACION.SUMA;
        else if (nombre.includes("-"))
            return Operacion_1.TIPO_OPERACION.RESTA;
        else if (nombre.includes("*"))
            return Operacion_1.TIPO_OPERACION.MULTIPLICACION;
        else if (nombre.includes("/"))
            return Operacion_1.TIPO_OPERACION.DIVISION;
        else
            return Operacion_1.TIPO_OPERACION.MODULO; //MODULO
    };
    return GeneradorOptiAST;
}());
exports.GeneradorOptiAST = GeneradorOptiAST;
