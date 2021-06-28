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
exports.Funcion = exports.TipoF = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var TipoF;
(function (TipoF) {
    TipoF[TipoF["ACCESO"] = 0] = "ACCESO";
    TipoF[TipoF["FUNCION"] = 1] = "FUNCION"; //     ()
})(TipoF = exports.TipoF || (exports.TipoF = {}));
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(col, id, tipo, nodetest) {
        var _this = _super.call(this, 0, col) || this;
        _this.id = id;
        _this.tipo = tipo;
        _this.nodetest = nodetest;
        return _this;
    }
    Funcion.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Funcion.prototype.concatenar = function () {
        var cadena = "";
        if (this.tipo == TipoF.ACCESO) {
            cadena += this.id + "::";
        }
        else {
            cadena += this.id + "()";
        }
        if (this.nodetest != null) {
            cadena += this.nodetest.concatenar();
        }
        return cadena;
    };
    Funcion.prototype.ast = function () {
        var nodo = new NodoAST_1.default("FUNCION");
        if (this.tipo == TipoF.FUNCION) {
            nodo.addHijoSimple(this.id);
            nodo.addHijoSimple("(");
            nodo.addHijoSimple(")");
        }
        else {
            nodo.addHijoSimple(this.id);
            nodo.addHijoSimple("::");
        }
        if (this.nodetest != null) {
            nodo.addHijo(this.nodetest.ast());
        }
        return nodo;
    };
    Funcion.prototype.buscar = function (lista) {
        throw new Error("Method not implemented.");
    };
    return Funcion;
}(Expresion_1.Expresion));
exports.Funcion = Funcion;
