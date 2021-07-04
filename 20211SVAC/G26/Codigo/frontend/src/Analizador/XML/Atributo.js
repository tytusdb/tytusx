"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const ListaError_1 = __importDefault(require("../Global/ListaError"));
class Atributo {
    constructor(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(entorno) {
        /* Se debe verificar que no exista el atributo */
        if (!entorno.existeSimbolo(this.identificador)) {
            entorno.agregarSimbolo(this.identificador, new Simbolo_1.Simbolo(Tipo_1.Tipo.ATRIBUTO, this.identificador, this.valor, this.linea, this.columna));
        }
        else {
            /*  Error semantico */
            ListaError_1.default.agregarError('semantico', 'Ya existe el simbolo ' + this.identificador, this.linea, this.columna);
        }
    }
}
exports.Atributo = Atributo;
