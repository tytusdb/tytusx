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
exports.Literal = void 0;
var Expresion_1 = require("./Expresion");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    //linea: number; //Desbloquear si implementa interfaz
    //columna: number;  //Desbloquear si implementa interfaz
    function Literal(t, v, l, c) {
        var _this = _super.call(this) || this;
        _this.tipo = t;
        _this.valor = v;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Literal.prototype.getValor = function (entorno) {
        if (this.valor == 'last()' && this.tipo == 6) {
            return new Literal(0, entorno[0].length, this.linea, this.columna);
        }
        else {
            return new Literal(this.tipo, this.valor, this.linea, this.columna);
        }
    };
    Literal.prototype.copiarValor = function () {
        return new Literal(this.tipo, this.valor, this.linea, this.columna);
    };
    return Literal;
}(Expresion_1.Expresion));
exports.Literal = Literal;
