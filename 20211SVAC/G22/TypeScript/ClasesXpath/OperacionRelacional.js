"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionRelacional = void 0;
var Operador_1 = require("./Operador");
var TiposXpath_1 = require("./TiposXpath");
var OperacionRelacional = /** @class */ (function () {
    function OperacionRelacional(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    OperacionRelacional.prototype.getTipo = function (arbol) {
        //verificas si es un simple dato o una funcion
        var valor = this.getValorImplicito(arbol);
        if (typeof (valor) === 'boolean') {
            return TiposXpath_1.TiposXpath.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return TiposXpath_1.TiposXpath.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return TiposXpath_1.TiposXpath.INT;
            }
            return TiposXpath_1.TiposXpath.DOUBLE;
        }
        else if (valor === null) {
            return TiposXpath_1.TiposXpath.NULL;
        }
        else {
            //puede ser funcion
        }
        return TiposXpath_1.TiposXpath.VOID;
    };
    OperacionRelacional.prototype.getValorImplicito = function (arbol) {
        //tomar en cuenta que pueden venir datos simples o funciones.
        //en caso sea de tipo funcion 
        //en caso sea de tipo simple 
        var op1 = this.op_izquierda.getValorImplicito(arbol);
        var op2 = this.op_derecha.getValorImplicito(arbol);
        console.log(op1);
        console.log(op1);
        //suma
        if (this.operador == Operador_1.Operador.MAYOR_QUE || this.operador == Operador_1.Operador.MENOR_QUE
            || this.operador == Operador_1.Operador.MAYOR_IGUA_QUE
            || this.operador == Operador_1.Operador.MENOR_IGUA_QUE) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 > op2;
            }
            //si alguno es string entonces es error.
            else if (op1 === "string" || op2 === "string") {
                if (op1 == null)
                    op1 = "null";
                if (op2 == null)
                    op2 = "null";
                return false;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //resta
        else if (this.operador == Operador_1.Operador.RESTA) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 - op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //multiplicación
        else if (this.operador == Operador_1.Operador.MULTIPLICACION) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                return op1 * op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //division
        else if (this.operador == Operador_1.Operador.DIVISION) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                if (op2 === 0) {
                    console.log("Resultado indefinido, no puede ejecutarse operación de division sobre cero.");
                    return null;
                }
                return op1 / op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        //modulo
        else if (this.operador == Operador_1.Operador.MODULO) {
            if (typeof (op1 === "number") && typeof (op2 === "number")) {
                if (op2 === 0) {
                    console.log("Resultado indefinido, no puede ejecutarse operación de modulo sobre cero.");
                    return null;
                }
                return op1 % op2;
            }
            else {
                console.log("Error de tipos de datos no permitidos realizando una suma");
                return null;
            }
        }
        return null;
    };
    OperacionRelacional.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return OperacionRelacional;
}());
exports.OperacionRelacional = OperacionRelacional;
