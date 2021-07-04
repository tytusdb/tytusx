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
exports.Atributo = void 0;
var Nodo_1 = require("../../InterpreteXPath/AST/Nodo");
var NodoAST_1 = __importDefault(require("../../InterpreteXPath/AST/NodoAST"));
var Atributo = /** @class */ (function (_super) {
    __extends(Atributo, _super);
    function Atributo(id, valor, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.valor = valor;
        _this.fila = fila;
        _this.columna = columna;
        return _this;
    }
    Atributo.prototype.obtenerNodos = function () {
        var nodo = new NodoAST_1.default("ATRIBUTO");
        nodo.addHijoSimple(this.identificador);
        nodo.addHijoSimple("=");
        nodo.addHijoSimple(this.valor);
        return [nodo, nodo];
    };
    return Atributo;
}(Nodo_1.Nodo));
exports.Atributo = Atributo;
