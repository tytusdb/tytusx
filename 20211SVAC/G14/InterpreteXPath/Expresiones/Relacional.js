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
exports.Relacional = exports.TipoR = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoR;
(function (TipoR) {
    TipoR[TipoR["MENOR"] = 0] = "MENOR";
    TipoR[TipoR["MAYOR"] = 1] = "MAYOR";
    TipoR[TipoR["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    TipoR[TipoR["MENORIGUAL"] = 3] = "MENORIGUAL";
    TipoR[TipoR["IGUAL"] = 4] = "IGUAL";
    TipoR[TipoR["DISTINTO"] = 5] = "DISTINTO";
})(TipoR = exports.TipoR || (exports.TipoR = {}));
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Relacional.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        if (res_left.getTipo() !== res_right.getTipo()) {
            console.log(new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
            throw new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        }
        switch (this.tipoA) {
            case ">":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) > Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "<":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) < Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case ">=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) >= Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "<=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) <= Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) === Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) !== Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Relacional.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Relacional.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Relacional.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Relacional;
}(Expresion_1.Expresion));
exports.Relacional = Relacional;
