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
exports.Cuerpo = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Cuerpo = /** @class */ (function (_super) {
    __extends(Cuerpo, _super);
    function Cuerpo(col, axis, filtro, node, predicado) {
        var _this = _super.call(this, 0, col) || this;
        _this.axisOrFunction = axis;
        _this.filtro = filtro;
        _this.node = node;
        _this.predicado = predicado;
        return _this;
    }
    Cuerpo.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Cuerpo.prototype.concatenar = function () {
        var cadena = "";
        if (this.axisOrFunction != null) {
            cadena += this.axisOrFunction.concatenar();
        }
        else {
            if (this.filtro != null) {
                cadena += this.filtro;
            }
            if (this.node != null) {
                if (typeof this.node == "object") {
                    cadena += this.node.concatenar();
                }
                else {
                    cadena += this.node;
                }
            }
            if (this.predicado != null) {
                cadena += this.predicado.concatenar();
            }
        }
        return cadena;
    };
    Cuerpo.prototype.ast = function () {
        var cuerpo = new NodoAST_1.default("CUERPO");
        if (this.axisOrFunction != null) {
            cuerpo.addHijo(this.axisOrFunction.ast());
        }
        else {
            if (this.filtro != null) {
                cuerpo.addHijoSimple(this.filtro);
            }
            if (this.node != null) {
                if (typeof this.node == "object") {
                    var hola = this.node;
                    cuerpo.addHijo(hola.ast());
                }
                else {
                    cuerpo.addHijoSimple(this.node);
                }
            }
            if (this.predicado != null) {
                cuerpo.addHijo(this.predicado.ast());
            }
        }
        return cuerpo;
    };
    Cuerpo.prototype.buscar = function (lista, isFinal) {
        var entorno = lista;
        //      /id
        if (this.node != null) {
            var aux = this.node;
            entorno = this.BuscarEntorno(entorno, aux.valor, isFinal, 0);
        }
        return entorno;
    };
    return Cuerpo;
}(Expresion_1.Expresion));
exports.Cuerpo = Cuerpo;
