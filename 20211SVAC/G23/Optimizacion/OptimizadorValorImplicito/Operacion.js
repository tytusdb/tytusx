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
exports.Operacion = exports.TIPO_OPERACION = void 0;
var Expresion_1 = require("../OptimizadorAST/Expresion");
var Simbolo_1 = require("../OptimizadorAST/Simbolo");
var OptimizacionResultado_1 = require("../Reporte/OptimizacionResultado");
var TIPO_OPERACION;
(function (TIPO_OPERACION) {
    TIPO_OPERACION[TIPO_OPERACION["SUMA"] = 1] = "SUMA";
    TIPO_OPERACION[TIPO_OPERACION["RESTA"] = 2] = "RESTA";
    TIPO_OPERACION[TIPO_OPERACION["MULTIPLICACION"] = 3] = "MULTIPLICACION";
    TIPO_OPERACION[TIPO_OPERACION["DIVISION"] = 4] = "DIVISION";
    TIPO_OPERACION[TIPO_OPERACION["MODULO"] = 5] = "MODULO";
    TIPO_OPERACION[TIPO_OPERACION["MAYOR_QUE"] = 6] = "MAYOR_QUE";
    TIPO_OPERACION[TIPO_OPERACION["MENOR_QUE"] = 7] = "MENOR_QUE";
    TIPO_OPERACION[TIPO_OPERACION["MAYOR_IGUA_QUE"] = 8] = "MAYOR_IGUA_QUE";
    TIPO_OPERACION[TIPO_OPERACION["MENOR_IGUA_QUE"] = 9] = "MENOR_IGUA_QUE";
    TIPO_OPERACION[TIPO_OPERACION["IGUAL_IGUAL"] = 10] = "IGUAL_IGUAL";
    TIPO_OPERACION[TIPO_OPERACION["DIFERENTE_QUE"] = 11] = "DIFERENTE_QUE";
    TIPO_OPERACION[TIPO_OPERACION["PRIMITIVO"] = 12] = "PRIMITIVO";
    TIPO_OPERACION[TIPO_OPERACION["ID"] = 13] = "ID";
})(TIPO_OPERACION = exports.TIPO_OPERACION || (exports.TIPO_OPERACION = {}));
var Operacion = /** @class */ (function (_super) {
    __extends(Operacion, _super);
    function Operacion() {
        var _this = _super.call(this) || this;
        _this.tipo = 0;
        _this.operadorIzq = null;
        _this.operadorDer = null;
        _this.valor = null;
        _this.linea = 0;
        _this.columna = 0;
        return _this;
    }
    Operacion.prototype.Primitivo = function (valor) {
        this.tipo = TIPO_OPERACION.PRIMITIVO;
        this.valor = valor;
    };
    Operacion.prototype.Identificador = function (valor, linea, columna) {
        this.tipo = TIPO_OPERACION.ID;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    };
    Operacion.prototype.Operation = function (izq, der, operacion, linea, columna) {
        this.tipo = operacion;
        this.operadorIzq = izq;
        this.operadorDer = der;
        this.linea = linea;
        this.columna = columna;
    };
    Operacion.prototype.optimizarCodigo = function () {
        var antes = this.generarAugus();
        var resultado = new OptimizacionResultado_1.OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    };
    Operacion.prototype.generarAugus = function () {
        //PRIMITIVOS
        if (this.tipo == TIPO_OPERACION.PRIMITIVO) {
            var primvalor = this.valor;
            return primvalor.generarAugus();
        }
        //IDENTIFICADORES
        else if (this.tipo == TIPO_OPERACION.ID) {
            var simbolo = new Simbolo_1.Simbolo(this.valor, this.linea, this.columna);
            return simbolo.generarAugus();
        }
        //SUMA
        else if (this.tipo == TIPO_OPERACION.SUMA)
            return this.operadorIzq.generarAugus() + "+" + this.operadorDer.generarAugus();
        //RESTA
        else if (this.tipo == TIPO_OPERACION.RESTA)
            return this.operadorIzq.generarAugus() + "-" + this.operadorDer.generarAugus();
        //MULTIPLICACION
        else if (this.tipo == TIPO_OPERACION.MULTIPLICACION)
            return this.operadorIzq.generarAugus() + "*" + this.operadorDer.generarAugus();
        //DIVISION
        else if (this.tipo == TIPO_OPERACION.DIVISION)
            return this.operadorIzq.generarAugus() + "/" + this.operadorDer.generarAugus();
        //MODULO
        else if (this.tipo == TIPO_OPERACION.MODULO)
            return this.operadorIzq.generarAugus() + "%" + this.operadorDer.generarAugus();
        //MAYOR QUE
        else if (this.tipo == TIPO_OPERACION.MAYOR_QUE)
            return this.operadorIzq.generarAugus() + ">" + this.operadorDer.generarAugus();
        //MAYOR IGUAL
        else if (this.tipo == TIPO_OPERACION.MAYOR_IGUA_QUE)
            return this.operadorIzq.generarAugus() + ">=" + this.operadorDer.generarAugus();
        //MENOR
        else if (this.tipo == TIPO_OPERACION.MENOR_QUE)
            return this.operadorIzq.generarAugus() + "<" + this.operadorDer.generarAugus();
        //MENOR IGUAL
        else if (this.tipo == TIPO_OPERACION.MENOR_IGUA_QUE)
            return this.operadorIzq.generarAugus() + "<=" + this.operadorDer.generarAugus();
        //IGUAL
        else if (this.tipo == TIPO_OPERACION.IGUAL_IGUAL)
            return this.operadorIzq.generarAugus() + "==" + this.operadorDer.generarAugus();
        //DIFERENTE
        else if (this.tipo == TIPO_OPERACION.DIFERENTE_QUE)
            return this.operadorIzq.generarAugus() + "!=" + this.operadorDer.generarAugus();
        else
            return "";
    };
    Operacion.prototype.invertirCondicion = function () {
        //IGUAL
        if (this.tipo == TIPO_OPERACION.IGUAL_IGUAL)
            return this.operadorIzq.generarAugus() + "!=" + this.operadorDer.generarAugus();
        //DIFERENTE
        else if (this.tipo == TIPO_OPERACION.DIFERENTE_QUE)
            return this.operadorIzq.generarAugus() + "==" + this.operadorDer.generarAugus();
        else
            return this.generarAugus();
    };
    //MI REGLA 5
    Operacion.prototype.validarRegla1 = function (varActual, varAsigna, varPrevia, varAsignaPrevia) {
        var varA = varAsignaPrevia;
        var varB = varPrevia;
        if (varA == varActual && varB == varAsigna)
            return true;
        return false;
    };
    //MI REGLA 3
    Operacion.prototype.validarRegla4 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorIzq.generarAugus();
            var value2 = this.operadorDer.generarAugus();
            if (value == value2)
                return true;
        }
        else if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.ID) {
            var value = this.operadorIzq.generarAugus();
            var value2 = this.operadorDer.generarAugus();
            if (value == value2)
                return true;
        }
        return false;
    };
    //MI REGLA 4
    Operacion.prototype.validarRegla5 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorIzq.generarAugus();
            var value2 = this.operadorDer.generarAugus();
            if (value != value2)
                return true;
        }
        return false;
    };
    //MI REGLA 6
    Operacion.prototype.validarRegla8 = function (id) {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorIzq.valor == id) {
                var value = this.operadorDer.generarAugus();
                if (value == "0")
                    return true;
            }
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorDer.valor == id) {
                var value = this.operadorIzq.generarAugus();
                if (value == "0") {
                    return true;
                }
            }
        }
        return false;
    };
    //MI REGLA 7
    Operacion.prototype.validarRegla9 = function (id) {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorIzq.valor == id) {
                var value = this.operadorDer.generarAugus();
                if (value == "0")
                    return true;
            }
        }
        return false;
    };
    //MI REGLA 8
    Operacion.prototype.validarRegla10 = function (id) {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorIzq.valor == id) {
                var value = this.operadorDer.generarAugus();
                if (value == "1")
                    return true;
            }
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorDer.valor == id) {
                var value = this.operadorIzq.generarAugus();
                if (value == "1") {
                    return true;
                }
            }
        }
        return false;
    };
    //MI REGLA 9
    Operacion.prototype.validarRegla11 = function (id) {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            if (this.operadorIzq.valor == id) {
                var value = this.operadorDer.generarAugus();
                if (value == "1")
                    return true;
            }
        }
        return false;
    };
    //MI REGLA 10 revisar esta regla en caso de que me encuentre con problemas
    Operacion.prototype.validarRegla12 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "0")
                return this.operadorIzq.valor;
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorIzq.generarAugus();
            if (value == "0")
                return this.operadorDer.valor;
        }
        return "";
    };
    //MI REGLA 11
    Operacion.prototype.validarRegla13 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "0")
                return this.operadorIzq.valor;
        }
        return "";
    };
    //MI REGLA 12
    Operacion.prototype.validarRegla14 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "1")
                return this.operadorIzq.valor;
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorIzq.generarAugus();
            if (value == "1")
                return this.operadorDer.valor;
        }
        return "";
    };
    //MI REGLA 13
    Operacion.prototype.validarRegla15 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "1")
                return this.operadorIzq.valor;
        }
        return "";
    };
    //MI REGLA 14
    Operacion.prototype.validarRegla16 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "2")
                return this.operadorIzq.valor + "+" + this.operadorIzq.valor;
        }
        return "";
    };
    //MI REGLA 15
    Operacion.prototype.validarRegla17 = function () {
        if (this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorDer.generarAugus();
            if (value == "0")
                return "0";
        }
        else if (this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO) {
            var value = this.operadorIzq.generarAugus();
            if (value == "0")
                return "0";
        }
        return "";
    };
    //MI REGLA 16
    Operacion.prototype.validarRegla18 = function () {
        if (this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.ID) {
            var value = this.operadorIzq.generarAugus();
            if (value == "0")
                return "0";
        }
        return "";
    };
    return Operacion;
}(Expresion_1.Expresion));
exports.Operacion = Operacion;
