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
exports.Primitivo = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Primitivo = /** @class */ (function (_super) {
    __extends(Primitivo, _super);
    function Primitivo(fila, col, tipo, valor) {
        var _this = _super.call(this, fila, col) || this;
        _this.tipo = tipo;
        _this.valor = valor;
        _this.fila = fila;
        _this.col = col;
        return _this;
    }
    Primitivo.prototype.evaluar = function () {
        return new Simbolo_1.Simbolo("", this.tipo, this.valor, this.fila, this.col);
    };
    Primitivo.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.valor);
        return nodo;
    };
    Primitivo.prototype.concatenar = function () {
        throw new Error("Method not implemented.");
    };
    Primitivo.prototype.buscar = function (lista, isFinal) {
        throw new Error("Method not implemented.");
    };
    return Primitivo;
}(Expresion_1.Expresion));
exports.Primitivo = Primitivo;
