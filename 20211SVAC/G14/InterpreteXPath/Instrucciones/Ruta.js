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
exports.Ruta = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Instruction_1 = require("../Interface/Instruction");
var Ruta = /** @class */ (function (_super) {
    __extends(Ruta, _super);
    function Ruta(col, typeBarra, expresion) {
        var _this = _super.call(this, col) || this;
        _this.typeBarra = typeBarra;
        _this.expresion = expresion;
        return _this;
    }
    Ruta.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Ruta.prototype.concatenar = function () {
        var cadena = "";
        cadena += this.typeBarra + this.expresion.concatenar();
        return cadena;
    };
    Ruta.prototype.ast = function () {
        var ruta = new NodoAST_1.default("Ruta");
        ruta.addHijoSimple(this.typeBarra);
        ruta.addHijo(this.expresion.ast());
        return ruta;
    };
    return Ruta;
}(Instruction_1.Instruccion));
exports.Ruta = Ruta;
