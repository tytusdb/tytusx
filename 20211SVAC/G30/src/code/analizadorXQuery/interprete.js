"use strict";
exports.__esModule = true;
exports.Interprete = void 0;
var XQuery_1 = require("./XQuery");
var Interprete = /** @class */ (function () {
    function Interprete() {
    }
    Interprete.prototype.interpretar = function (entrada) {
        var analizador = XQuery_1.parse(entrada);
        return analizador;
    };
    return Interprete;
}());
exports.Interprete = Interprete;
//esta clase unicamente sirve como puente para enlazar datos entre el analizador xquery.js y navigation.js
