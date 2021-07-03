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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicado = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Predicado = /** @class */ (function (_super) {
    __extends(Predicado, _super);
    function Predicado(col, exp) {
        var _this = _super.call(this, 0, col) || this;
        _this.exp = exp;
        return _this;
    }
    Predicado.prototype.evaluar = function () {
        var res = this.exp.evaluar();
        return res; // Deberia retornar la lista
    };
    Predicado.prototype.concatenar = function () {
        var cadena = "";
        cadena += this.exp.concatenar();
        return cadena;
    };
    Predicado.prototype.ast = function () {
        var predicado = new NodoAST_1.default("PREDICADO");
        predicado.addHijo(this.exp.ast());
        return predicado;
    };
    Predicado.prototype.buscar = function (lista, isFinal) {
        throw new Error("Method not implemented.");
    };
    return Predicado;
}(Expresion_1.Expresion));
exports.Predicado = Predicado;
