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
exports.Consulta = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Consulta = /** @class */ (function (_super) {
    __extends(Consulta, _super);
    function Consulta(col, typeBarra, cuerpo, next) {
        var _this = _super.call(this, 0, col) || this;
        _this.typeBarra = typeBarra;
        _this.cuerpo = cuerpo;
        _this.next = next;
        return _this;
    }
    Consulta.prototype.evaluar = function () {
        var lista;
        if (this.typeBarra === "//") {
            var cuerpo = this.cuerpo.evaluar();
            lista = cuerpo;
            //lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
        }
        else {
            var cuerpo = this.cuerpo.evaluar();
            lista = cuerpo;
            // lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
            // Metodologia para / barra simple
        }
        return lista;
    };
    Consulta.prototype.concatenar = function () {
        var cadena = "";
        if (this.next != null) {
            cadena += this.next.concatenar();
        }
        cadena += this.typeBarra;
        if (this.cuerpo != null) {
            cadena += this.cuerpo.concatenar();
        }
        return cadena;
    };
    Consulta.prototype.ast = function () {
        var consulta = new NodoAST_1.default("CONSULTA");
        if (this.next != null) {
            consulta.addHijo(this.next.ast());
        }
        consulta.addHijoSimple(this.typeBarra);
        if (this.cuerpo != null) {
            consulta.addHijo(this.cuerpo.ast());
        }
        return consulta;
    };
    Consulta.prototype.buscar = function (lista) {
        //    //bookstore
        var entorno = lista;
        var aux = [];
        if (this.next != null) {
            entorno = this.next.buscar(entorno);
        }
        if (this.typeBarra === "//") {
            entorno = [];
        }
        else {
            this.cuerpo.buscar(entorno, false);
            // aux = this.cuerpo.buscar(entorno, true)
            // if(this.next !== null){
            //    aux = this.cuerpo.buscar(entorno, false)
            // }
            // entorno = aux;
            // aux =[]
        }
        return entorno;
    };
    return Consulta;
}(Expresion_1.Expresion));
exports.Consulta = Consulta;
