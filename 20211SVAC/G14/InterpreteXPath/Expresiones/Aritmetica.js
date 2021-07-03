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
exports.Aritmetica = exports.TipoA = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoA;
(function (TipoA) {
    TipoA["SUMA"] = "+";
    TipoA["RESTA"] = "-";
    TipoA["MULTI"] = "*";
    TipoA["DIV"] = "/";
    TipoA["MOD"] = "%";
})(TipoA = exports.TipoA || (exports.TipoA = {}));
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Aritmetica.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        if (res_left.getTipo() != TipoDato_1.TipoDato.INT || res_right.getTipo() != TipoDato_1.TipoDato.INT) {
            console.log(new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
            throw new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        }
        switch (this.tipoA) {
            case TipoA.SUMA:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) + Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.RESTA:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) - Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.DIV:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) / Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.MULTI:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) * Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) % Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Aritmetica.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Aritmetica.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Aritmetica.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
