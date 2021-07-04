"use strict";
exports.__esModule = true;
exports.Operacion = void 0;
var XPath_js_1 = require("./XPath.js");
var TipoOperacion_js_1 = require("./TipoOperacion.js");
var Objeto_js_1 = require("../Models/Objeto.js");
var Operacion = /** @class */ (function () {
    function Operacion(tipo, operador1, operador2) {
        this.tipo = tipo;
        this.operador1 = operador1;
        this.operador2 = operador2;
    }
    Operacion.prototype.ejecutar = function (Entorno, node) {
        console.log(node);
        var op1 = this.operador1.ejecutar(Entorno, node);
        var op2 = this.operador2.ejecutar(Entorno, node);
        if (node != undefined) {
            if (op1.etiqueta != undefined) {
                var cadena = node + "[" + op1.etiqueta + this.getTipo(this.tipo) + op2 + "]";
                var nuevo = new XPath_js_1.XPath(cadena);
                nuevo.ejecutar(Entorno, node);
                if (nuevo.padre != null) {
                    Entorno.setVariable(this.operador1.valor, { xpath: nuevo.padre });
                }
                if (nuevo.padre.length == 1) {
                    return { xpath: nuevo.padre[0] };
                }
                return { xpath: nuevo.padre };
            }
            else if (op2.etiqueta != undefined) {
                var cadena = node + "[" + op1 + this.getTipo(this.tipo) + op2.etiqueta + "]";
                var nuevo = new XPath_js_1.XPath(cadena);
                nuevo.ejecutar(Entorno, node);
                if (nuevo.padre != null) {
                    console.log(nuevo.padre);
                    Entorno.setVariable(this.operador2.valor, { xpath: nuevo.padre });
                }
                if (nuevo.padre.length == 1) {
                    return { xpath: nuevo.padre[0] };
                }
                return { xpath: nuevo.padre };
            }
        }
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
                if (op1 instanceof Array) {
                    var retorno_1 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor != op2) {
                                retorno_1.push(elemento);
                            }
                        }
                    });
                    return retorno_1;
                }
                else if (op2 instanceof Array) {
                    var retorno_2 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor != op1) {
                                retorno_2.push(elemento);
                            }
                        }
                    });
                    return retorno_2;
                }
                if (op1 != op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.IGUAL:
                if (op1 instanceof Array) {
                    var retorno_3 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor == op2) {
                                retorno_3.push(elemento);
                            }
                        }
                    });
                    return retorno_3;
                }
                else if (op2 instanceof Array) {
                    var retorno_4 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor == op1) {
                                retorno_4.push(elemento);
                            }
                        }
                    });
                    return retorno_4;
                }
                if (op1 == op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.IGUALU:
                if (op1 instanceof Array) {
                    var bandera_1 = false;
                    var retorno_5 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor == op2 && !bandera_1) {
                                retorno_5.push(elemento);
                                bandera_1 = true;
                            }
                            else if (bandera_1 && valor == op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_5;
                }
                else if (op2 instanceof Array) {
                    var bandera_2 = false;
                    var retorno_6 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor == op1 && !bandera_2) {
                                retorno_6.push(elemento);
                                bandera_2 = true;
                            }
                            else if (bandera_2 && valor == op1) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_6;
                }
                break;
            case TipoOperacion_js_1.Operador.DIFERENTEU:
                if (op1 instanceof Array) {
                    var bandera_3 = false;
                    var retorno_7 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor != op2 && !bandera_3) {
                                retorno_7.push(elemento);
                                bandera_3 = true;
                            }
                            else if (bandera_3 && valor != op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_7;
                }
                else if (op2 instanceof Array) {
                    var bandera_4 = false;
                    var retorno_8 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor != op1 && !bandera_4) {
                                retorno_8.push(elemento);
                                bandera_4 = true;
                            }
                            else if (bandera_4 && valor != op1) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_8;
                }
                break;
            case TipoOperacion_js_1.Operador.MAYOR:
                console.log("ESTÁ EN MAYOR QUÉ");
                console.log(Array.isArray(op1));
                if (Array.isArray(op1)) {
                    var retorno_9 = [];
                    op1.forEach(function (elemento) {
                        if (elemento.texto != undefined) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor > op2) {
                                retorno_9.push(elemento);
                            }
                        }
                    });
                    return retorno_9;
                }
                else if (op2 instanceof Array) {
                    var retorno_10 = [];
                    op2.forEach(function (elemento) {
                        if (elemento.texto != undefined) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 > valor) {
                                retorno_10.push(elemento);
                            }
                        }
                    });
                    return retorno_10;
                }
                if (op1 > op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MAYORI:
                if (op1 instanceof Array) {
                    var retorno_11 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor >= op2) {
                                retorno_11.push(elemento);
                            }
                        }
                    });
                    return retorno_11;
                }
                else if (op2 instanceof Array) {
                    var retorno_12 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 >= valor) {
                                retorno_12.push(elemento);
                            }
                        }
                    });
                    return retorno_12;
                }
                if (op1 >= op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MAYORU:
                if (op1 instanceof Array) {
                    var bandera_5 = false;
                    var retorno_13 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor > op2 && !bandera_5) {
                                retorno_13.push(elemento);
                                bandera_5 = true;
                            }
                            else if (bandera_5 && valor > op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_13;
                }
                else if (op2 instanceof Array) {
                    var bandera_6 = false;
                    var retorno_14 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 > valor && !bandera_6) {
                                retorno_14.push(elemento);
                                bandera_6 = true;
                            }
                            else if (bandera_6 && op1 > valor) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_14;
                }
                break;
            case TipoOperacion_js_1.Operador.MAYORIU:
                if (op1 instanceof Array) {
                    var bandera_7 = false;
                    var retorno_15 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor >= op2 && !bandera_7) {
                                retorno_15.push(elemento);
                                bandera_7 = true;
                            }
                            else if (bandera_7 && valor >= op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_15;
                }
                else if (op2 instanceof Array) {
                    var bandera_8 = false;
                    var retorno_16 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 >= valor && !bandera_8) {
                                retorno_16.push(elemento);
                                bandera_8 = true;
                            }
                            else if (bandera_8 && op1 >= valor) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_16;
                }
                break;
            case TipoOperacion_js_1.Operador.MENOR:
                if (op1 instanceof Array) {
                    var retorno_17 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor < op2) {
                                retorno_17.push(elemento);
                            }
                        }
                    });
                    return retorno_17;
                }
                else if (op2 instanceof Array) {
                    var retorno_18 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 < valor) {
                                retorno_18.push(elemento);
                            }
                        }
                    });
                    return retorno_18;
                }
                if (op1 < op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MENORI:
                if (op1 instanceof Array) {
                    var retorno_19 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor <= op2) {
                                retorno_19.push(elemento);
                            }
                        }
                    });
                    return retorno_19;
                }
                else if (op2 instanceof Array) {
                    var retorno_20 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 <= valor) {
                                retorno_20.push(elemento);
                            }
                        }
                    });
                    return retorno_20;
                }
                if (op1 <= op2) {
                    return true;
                }
                return false;
            case TipoOperacion_js_1.Operador.MENORU:
                if (op1 instanceof Array) {
                    var bandera_9 = false;
                    var retorno_21 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor < op2 && !bandera_9) {
                                retorno_21.push(elemento);
                                bandera_9 = true;
                            }
                            else if (bandera_9 && valor < op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_21;
                }
                else if (op2 instanceof Array) {
                    var bandera_10 = false;
                    var retorno_22 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 < valor && !bandera_10) {
                                retorno_22.push(elemento);
                                bandera_10 = true;
                            }
                            else if (bandera_10 && op1 < valor) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_22;
                }
                break;
            case TipoOperacion_js_1.Operador.MENORIU:
                if (op1 instanceof Array) {
                    var bandera_11 = false;
                    var retorno_23 = [];
                    op1.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (valor <= op2 && !bandera_11) {
                                retorno_23.push(elemento);
                                bandera_11 = true;
                            }
                            else if (bandera_11 && valor <= op2) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_23;
                }
                else if (op2 instanceof Array) {
                    var bandera_12 = false;
                    var retorno_24 = [];
                    op2.forEach(function (elemento) {
                        if (elemento instanceof Objeto_js_1["default"]) {
                            var valor = void 0;
                            try {
                                valor = Number(elemento.texto);
                            }
                            catch (Error) {
                                valor = elemento.texto;
                            }
                            if (op1 <= valor && !bandera_12) {
                                retorno_24.push(elemento);
                                bandera_12 = true;
                            }
                            else if (bandera_12 && op1 <= valor) {
                                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                                return null;
                            }
                        }
                    });
                    return retorno_24;
                }
                break;
        }
        return null;
    };
    Operacion.prototype.getTipo = function (tipo) {
        switch (tipo) {
            case TipoOperacion_js_1.Operador.RESTA:
                return "-";
            case TipoOperacion_js_1.Operador.SUMA:
                return "+";
            case TipoOperacion_js_1.Operador.MULTIPLICACION:
                return "*";
            case TipoOperacion_js_1.Operador.DIVISION:
                return "div";
            case TipoOperacion_js_1.Operador.MODAL:
                return "%";
            case TipoOperacion_js_1.Operador.OR:
                return "or";
            case TipoOperacion_js_1.Operador.AND:
                return "and";
            case TipoOperacion_js_1.Operador.MAYOR:
                return ">";
            case TipoOperacion_js_1.Operador.MENOR:
                return "<";
            case TipoOperacion_js_1.Operador.MAYORI:
                return ">=";
            case TipoOperacion_js_1.Operador.MENORI:
                return "<=";
            case TipoOperacion_js_1.Operador.MAYORU:
                return "gt";
            case TipoOperacion_js_1.Operador.MAYORIU:
                return "ge";
            case TipoOperacion_js_1.Operador.MENORU:
                return "lt";
            case TipoOperacion_js_1.Operador.MENORIU:
                return "le";
            case TipoOperacion_js_1.Operador.IGUALU:
                return "eq";
            case TipoOperacion_js_1.Operador.DIFERENTEU:
                return "ne";
        }
        return "F";
    };
    return Operacion;
}());
exports.Operacion = Operacion;
