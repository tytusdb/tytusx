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
exports.Valor = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Valor = /** @class */ (function (_super) {
    __extends(Valor, _super);
    function Valor(col, id, left, right) {
        var _this = _super.call(this, 1, col) || this;
        _this.id = id;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Valor.prototype.buscar = function (lista) {
        throw new Error("Method not implemented.");
    };
    Valor.prototype.evaluar = function () {
        return new Simbolo_1.Simbolo("", TipoDato_1.TipoDato.INT, 1, 0, 0, 0);
    };
    Valor.prototype.concatenar = function () {
        var cadena = "";
        if (this.left != null) {
            cadena += this.left.concatenar();
        }
        if (this.right != null) {
            cadena += this.left.concatenar();
        }
        return cadena;
    };
    Valor.prototype.ast = function () {
        var nodo = new NodoAST_1.default("nodo");
        if (this.left != null) {
            nodo.addHijo(this.left.ast());
        }
        if (this.right != null) {
            if (this.id == "P") {
                nodo.addHijoSimple("[");
            }
            nodo.addHijo(this.right.ast());
            if (this.id == "P") {
                nodo.addHijoSimple("]");
            }
        }
        return nodo;
    };
    return Valor;
}(Expresion_1.Expresion));
exports.Valor = Valor;
