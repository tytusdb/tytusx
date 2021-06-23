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
exports.Logica = exports.TipoL = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoL;
(function (TipoL) {
    TipoL["AND"] = "and";
    TipoL["OR"] = "or";
})(TipoL = exports.TipoL || (exports.TipoL = {}));
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Logica.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        // console.log(typeof res_left.getTipo() + "   der: "+res_right.getTipo())
        // if(res_left.getTipo() != TipoDato.BOOL || res_right.getTipo() != TipoDato.BOOL){
        //    console.log(new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
        //    throw new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        // }
        switch (this.tipoA) {
            case TipoL.OR:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Boolean(res_left.getValorImplicito()) && Boolean(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Boolean(res_left.getValorImplicito()) || Boolean(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Logica.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Logica.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Logica.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Logica;
}(Expresion_1.Expresion));
exports.Logica = Logica;
