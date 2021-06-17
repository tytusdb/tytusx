"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoPrim = exports.Primitiva = void 0;
var ListaError_1 = __importDefault(require("../Global/ListaError"));
var Primitiva = /** @class */ (function () {
    function Primitiva(valor, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
    Primitiva.prototype.getTipo = function (ent) {
        return this.tipo;
    };
    Primitiva.prototype.getValor = function (ent) {
        if (this.tipo === TipoPrim.IDENTIFIER) {
            /* SE BUSCAN LAS ETIQUETAS CON ESTE NOMBRE */
            if (ent.existeSimbolo(this.valor)) {
                return ent.obtenerSimbolo(this.valor);
            }
            else {
                ListaError_1.default.agregarError('semantico', 'No existe el simbolo ' + this.valor, this.linea, this.columna);
                this.tipo = TipoPrim.ERROR;
                return null;
            }
        }
        else if (this.tipo === TipoPrim.ATRIBUTO) {
            /* SE BUSCAN LOS ATRIBUTOS CON ESTE NOMBRE */
        }
        else
            return this.valor;
    };
    return Primitiva;
}());
exports.Primitiva = Primitiva;
var TipoPrim;
(function (TipoPrim) {
    TipoPrim[TipoPrim["INTEGER"] = 0] = "INTEGER";
    TipoPrim[TipoPrim["DOUBLE"] = 1] = "DOUBLE";
    TipoPrim[TipoPrim["CADENA"] = 2] = "CADENA";
    TipoPrim[TipoPrim["IDENTIFIER"] = 3] = "IDENTIFIER";
    TipoPrim[TipoPrim["ATRIBUTO"] = 4] = "ATRIBUTO";
    TipoPrim[TipoPrim["DOT"] = 5] = "DOT";
    TipoPrim[TipoPrim["FUNCION"] = 6] = "FUNCION";
    TipoPrim[TipoPrim["BOOLEAN"] = 7] = "BOOLEAN";
    TipoPrim[TipoPrim["ERROR"] = 8] = "ERROR";
})(TipoPrim = exports.TipoPrim || (exports.TipoPrim = {}));
