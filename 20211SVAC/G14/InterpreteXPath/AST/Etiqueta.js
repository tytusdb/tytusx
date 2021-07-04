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
exports.Etiqueta = void 0;
var Nodo_1 = require("./Nodo");
var NodoAST_1 = __importDefault(require("./NodoAST"));
var Etiqueta = /** @class */ (function (_super) {
    __extends(Etiqueta, _super);
    function Etiqueta(id, fila, columna, etiqueta, valor) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.fila = fila;
        _this.columna = columna;
        _this.etiqueta = etiqueta;
        _this.valor = valor;
        return _this;
    }
    Etiqueta.prototype.obtenerNodos = function () {
        var nodo;
        if (this.identificador == "atributo") {
            nodo = new NodoAST_1.default("LISTA_ATRIBUTOS");
        }
        else {
            nodo = new NodoAST_1.default("LISTA_OBJETOS");
        }
        if (this.etiqueta != null) {
            var eti = this.etiqueta.obtenerNodos()[0];
            nodo.addHijo(eti);
        }
        if (this.valor != null) {
            nodo.addHijo(this.valor.obtenerNodos()[0]);
        }
        return [nodo, nodo];
    };
    return Etiqueta;
}(Nodo_1.Nodo));
exports.Etiqueta = Etiqueta;
