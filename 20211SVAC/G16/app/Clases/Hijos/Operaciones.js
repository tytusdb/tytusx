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
                }
                break;
            case TipoOperacion_js_1.Operador.SUMA:
                var arreglito = [];
                if (op1.length != undefined && this.operador1.tipo != 0 && op2.length != undefined &&
                    this.operador2.tipo != 0) {
                    for (var index = 0; index < op1.length; index++) {
                        var element = op1[index];
                        arreglito.push(element + op2[index]);
                    }
                }
                else if (op1.length != undefined && this.operador1.tipo != 0) {
                    for (var index = 0; index < op1.length; index++) {
                        var element = op1[index];
                        arreglito.push(element + op2);
                    }
                    return arreglito;
                }
                else if (op2.length != undefined && this.operador2.tipo != 0) {
                    for (var index = 0; index < op2.length; index++) {
                        var element = op2[index];
                        arreglito.push(op1 + element);
                    }
                    return arreglito;
                }
                return op1 + op2;
            case TipoOperacion_js_1.Operador.RESTA:
                try {
                    var arreglito_1 = [];
                    if (op1.length != undefined) {
                        for (var index = 0; index < op1.length; index++) {
                            var element = op1[index];
                            arreglito_1.push(element - op2);
                        }
                        return arreglito_1;
                    }
                    else if (op2.length != undefined) {
                        for (var index = 0; index < op2.length; index++) {
                            var element = op2[index];
                            arreglito_1.push(op1 - element);
                        }
                        return arreglito_1;
                    }
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
                    var arreglito_2 = [];
                    if (op1.length != undefined) {
                        for (var index = 0; index < op1.length; index++) {
                            var element = op1[index];
                            arreglito_2.push(element * op2);
                        }
                        return arreglito_2;
                    }
                    else if (op2.length != undefined) {
                        for (var index = 0; index < op2.length; index++) {
                            var element = op2[index];
                            arreglito_2.push(op1 * element);
                        }
                        return arreglito_2;
                    }
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
                    var arreglito_3 = [];
                    if (op1.length != undefined) {
                        Number(op2);
                        if (op2 == 0) {
                            // error semántico, división por 0
                            return null;
                        }
                        for (var index = 0; index < op1.length; index++) {
                            var element = Number(op1[index]);
                            arreglito_3.push(element / op2);
                        }
                        return arreglito_3;
                    }
                    else if (op2.length != undefined) {
                        Number(op1);
                        for (var index = 0; index < op2.length; index++) {
                            var element = Number(op2[index]);
                            if (element == 0) {
                                // error semántico, división por 0
                                return null;
                            }
                            arreglito_3.push(op1 / element);
                        }
                        return arreglito_3;
                    }
                    Number(op1);
                    Number(op2);
                    return op1 / op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.MODAL:
                try {
                    var arreglito_4 = [];
                    if (op1.length != undefined) {
                        Number(op2);
                        if (op2 == 0) {
                            // error semántico, división por 0
                            return null;
                        }
                        for (var index = 0; index < op1.length; index++) {
                            var element = Number(op1[index]);
                            arreglito_4.push(element % op2);
                        }
                        return arreglito_4;
                    }
                    else if (op2.length != undefined) {
                        Number(op1);
                        for (var index = 0; index < op2.length; index++) {
                            var element = Number(op2[index]);
                            if (element == 0) {
                                // error semántico, división por 0
                                return null;
                            }
                            arreglito_4.push(op1 % element);
                        }
                        return arreglito_4;
                    }
                    Number(op1);
                    Number(op2);
                    return op1 % op2;
                }
                catch (Error) {
                    console.log("Solo números we");
                }
                break;
            case TipoOperacion_js_1.Operador.AND:
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
