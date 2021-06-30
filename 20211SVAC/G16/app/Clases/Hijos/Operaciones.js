"use strict";
exports.__esModule = true;
exports.Operacion = void 0;
var TipoOperacion_js_1 = require("./TipoOperacion.js");
var Operacion = /** @class */ (function () {
    function Operacion(tipo, operador1, operador2) {
        this.tipo = tipo;
        this.operador1 = operador1;
        this.operador2 = operador2;
    }
    Operacion.prototype.ejecutar = function (Entorno, node) {
        console.log("Pasó por operación");
        var op1 = this.operador1.ejecutar(Entorno, this.operador1);
        var op2 = this.operador2.ejecutar(Entorno, this.operador2);
        if (op1 == null && op2 == null) {
            return null;
        }
        switch (this.tipo) {
            case TipoOperacion_js_1.Operador.TO:
                try {
                    Number(op1);
                    Number(op2);
                    var array = [];
                    console.log(op1);
                    if (op1 < op2) {
                        while (op1 <= op2) {
                            array.push(op1);
                            op1 = op1 + 1;
                        }
                        return array;
                    }
                    else {
                        console.log("el operador 1 debe ser mayor al segundo");
                    }
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.SUMA:
                return op1 + op2;
            case TipoOperacion_js_1.Operador.RESTA:
                try {
                    Number(op1);
                    Number(op2);
                    return op1 - op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.MULTIPLICACION:
                try {
                    Number(op1);
                    Number(op2);
                    return op1 * op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.DIVISION:
                try {
                    Number(op1);
                    Number(op2);
                    if (op2 == 0) {
                        // error semántico, división por 0
                        return null;
                    }
                    return op1 / op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.MODAL:
                try {
                    Number(op1);
                    Number(op2);
                    return op1 % op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.AND:
                console.log(op1 + "and" + op2);
                if (op1 && op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.OR:
                if (op1 || op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.DIFERENTE:
                if (op1 != op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.IGUAL:
                console.log(op1 + "=" + op2);
                if (op1 == op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.IGUALU:
                break;
            case TipoOperacion_js_1.Operador.DIFERENTEU:
                break;
            case TipoOperacion_js_1.Operador.MAYOR:
                if (op1 > op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MAYORI:
                if (op1 >= op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MAYORU:
                break;
            case TipoOperacion_js_1.Operador.MAYORIU:
                break;
            case TipoOperacion_js_1.Operador.MENOR:
                if (op1 < op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MENORI:
                if (op1 <= op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MENORU:
                break;
            case TipoOperacion_js_1.Operador.MENORIU:
                break;
        }
        return null;
    };
    return Operacion;
}());
exports.Operacion = Operacion;
