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
exports.Objeto = void 0;
var Nodo_1 = require("../../InterpreteXPath/AST/Nodo");
var NodoAST_1 = __importDefault(require("../../InterpreteXPath/AST/NodoAST"));
var Objeto = /** @class */ (function (_super) {
    __extends(Objeto, _super);
    function Objeto(id, texto, fila, columna, listaAtributos, listaO, cierre) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.texto = texto;
        _this.fila = fila;
        _this.columna = columna;
        _this.lista = listaAtributos;
        _this.listaObjetos = listaO;
        _this.cierre = cierre;
        return _this;
    }
    Objeto.prototype.getValor = function () {
        return this.identificador;
    };
    Objeto.prototype.obtenerNodos = function () {
        var cst = new NodoAST_1.default("OBJETO");
        var ast = new NodoAST_1.default("");
        cst.addHijoSimple("<");
        if (this.identificador == "xml") {
            cst.valor = "PROLOG";
            cst.addHijoSimple("xml");
            var atr = this.lista.obtenerNodos()[0];
            cst.addHijo(atr);
            cst.addHijoSimple("?>");
        }
        else {
            cst.addHijoSimple(this.identificador);
            ast.addHijoSimple(this.identificador);
            // console.log(this.lista)
            if (this.lista != null) {
                var atr2 = this.lista.obtenerNodos()[0];
                cst.addHijo(atr2);
                ast.addHijo(atr2);
            }
            if (this.listaObjetos != null) {
                cst.addHijoSimple("> <");
                var obj = this.listaObjetos.obtenerNodos()[0];
                cst.addHijo(obj);
                cst.addHijoSimple("/");
                cst.addHijoSimple(this.identificador);
                cst.addHijoSimple(this.cierre);
            }
            else if (this.texto != "") {
                cst.addHijoSimple(this.texto);
                cst.addHijoSimple("/");
                cst.addHijoSimple(this.identificador);
                cst.addHijoSimple(this.cierre);
            }
            else {
                cst.addHijoSimple("/>");
            }
        }
        return [cst, ast];
    };
    return Objeto;
}(Nodo_1.Nodo));
exports.Objeto = Objeto;
