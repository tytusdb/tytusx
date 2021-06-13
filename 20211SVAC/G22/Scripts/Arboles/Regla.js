"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo_Regla = exports.Regla = void 0;
var Regla = /** @class */ (function () {
    function Regla(tipo, produccion, reglaSemantica) {
        this.tipo = tipo;
        this.produccion = produccion;
        this.reglaSemantica = reglaSemantica;
    }
    return Regla;
}());
exports.Regla = Regla;
var Tipo_Regla;
(function (Tipo_Regla) {
    Tipo_Regla[Tipo_Regla["SUMA"] = 0] = "SUMA";
    Tipo_Regla[Tipo_Regla["RESTA"] = 1] = "RESTA";
    Tipo_Regla[Tipo_Regla["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Tipo_Regla[Tipo_Regla["DIVISION"] = 3] = "DIVISION";
    Tipo_Regla[Tipo_Regla["MODULO"] = 4] = "MODULO";
    Tipo_Regla[Tipo_Regla["MENOS_UNARIO"] = 5] = "MENOS_UNARIO";
    Tipo_Regla[Tipo_Regla["MAYOR_QUE"] = 6] = "MAYOR_QUE";
    Tipo_Regla[Tipo_Regla["MENOR_QUE"] = 7] = "MENOR_QUE";
    Tipo_Regla[Tipo_Regla["IGUAL_IGUAL"] = 8] = "IGUAL_IGUAL";
    Tipo_Regla[Tipo_Regla["DIFERENTE_QUE"] = 9] = "DIFERENTE_QUE";
    Tipo_Regla[Tipo_Regla["OR"] = 10] = "OR";
    Tipo_Regla[Tipo_Regla["AND"] = 11] = "AND";
    Tipo_Regla[Tipo_Regla["NOT"] = 12] = "NOT";
    Tipo_Regla[Tipo_Regla["MAYOR_IGUA_QUE"] = 13] = "MAYOR_IGUA_QUE";
    Tipo_Regla[Tipo_Regla["MENOR_IGUA_QUE"] = 14] = "MENOR_IGUA_QUE";
    Tipo_Regla[Tipo_Regla["DESCONOCIDO"] = 15] = "DESCONOCIDO";
})(Tipo_Regla = exports.Tipo_Regla || (exports.Tipo_Regla = {}));
