"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Tipo_1 = require("../AST/Tipo");
var ListaError_1 = __importDefault(require("../Global/ListaError"));
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    Atributo.prototype.ejecutar = function (entorno) {
        /* Se debe verificar que no exista el atributo */
        if (!entorno.existeSimbolo(this.identificador)) {
            entorno.agregarSimbolo(this.identificador, new Simbolo_1.Simbolo(Tipo_1.Tipo.ATRIBUTO, this.identificador, this.valor, this.linea, this.columna));
        }
        else {
            /*  Error semantico */
            ListaError_1.default.agregarError('semantico', 'Ya existe el simbolo ' + this.identificador, this.linea, this.columna);
        }
    };
    return Atributo;
}());
exports.Atributo = Atributo;
