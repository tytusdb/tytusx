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
exports.ForXQ = void 0;
var InstruccionXQ_1 = require("../Arbol/InstruccionXQ");
var ForXQ = /** @class */ (function (_super) {
    __extends(ForXQ, _super);
    function ForXQ(its, reg, l, c) {
        var _this = _super.call(this) || this;
        _this.iteradores = its;
        _this.regreso = reg;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    ForXQ.prototype.ejecutar = function (ent) {
        var res = true;
        //Verifica que se pueda ejecutar
        for (var _i = 0, _a = this.iteradores; _i < _a.length; _i++) {
            var iter = _a[_i];
            res = iter.validar(ent);
            if (!res) {
                console.log('No se pudo ejecutar el for, error con un iterador');
                return null;
            }
        }
        var controlVariables = [];
        var controlResultados = [];
        var cantAnidada = this.iteradores.length;
        for (var _b = 0, _c = this.iteradores; _b < _c.length; _b++) {
            var itto = _c[_b];
            var nombre = itto.variable.toString();
            if (itto.numerico != null) {
                var att = itto.numerico.toString();
                controlVariables.push([nombre, att]);
            }
            else {
                controlVariables.push([nombre, null]);
            }
        }
        //let entornoFor:EntornoXQ = new EntornoXQ(ent);
        //console.log('Se ejecuta');
        controlResultados = this.ejecucionRecursiva(0);
        return controlResultados;
    };
    ForXQ.prototype.ejecucionRecursiva = function (posicion) {
        var arrayNivel = [];
        var iterador = this.iteradores[posicion];
        if (iterador != null && iterador != undefined) {
            if (Array.isArray(iterador.objetivo.valor)) {
                for (var _i = 0, _a = iterador.objetivo.valor; _i < _a.length; _i++) {
                    var ele = _a[_i];
                    arrayNivel.push(ele.valor);
                }
            }
            else {
                //Es XPath y se opera diferente
            }
        }
        else {
            //Pendiente la condicion de salida
            return null;
        }
        var aux = this.ejecucionRecursiva(posicion + 1);
        if (aux != null) {
            //combninar
            var resul = [];
            if (Array.isArray(aux[0])) {
                for (var _b = 0, arrayNivel_1 = arrayNivel; _b < arrayNivel_1.length; _b++) {
                    var it1 = arrayNivel_1[_b];
                    for (var _c = 0, aux_1 = aux; _c < aux_1.length; _c++) {
                        var it2 = aux_1[_c];
                        resul.push([it1].concat(it2));
                    }
                }
            }
            else {
                for (var _d = 0, arrayNivel_2 = arrayNivel; _d < arrayNivel_2.length; _d++) {
                    var it1 = arrayNivel_2[_d];
                    for (var _e = 0, aux_2 = aux; _e < aux_2.length; _e++) {
                        var it2 = aux_2[_e];
                        resul.push([it1, it2]);
                    }
                }
            }
            return resul;
        }
        else {
            return arrayNivel;
        }
    };
    return ForXQ;
}(InstruccionXQ_1.InstruccionXQ));
exports.ForXQ = ForXQ;
