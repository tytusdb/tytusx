"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const ListaError_1 = __importDefault(require("../Global/ListaError"));
const Tipo_1 = require("./Tipo");
class Entorno {
    constructor(nombre, padre, global) {
        this.tsimbolos = new Array();
        this.nombre = nombre;
        this.padre = padre;
        if (global === null)
            this.global = this;
        else
            this.global = global;
    }
    agregarSimbolo(nombre, simbolo) {
        this.tsimbolos.push({ 'nombre': nombre, 'valor': simbolo });
    }
    sobreEscribirSimbolo(nombre, simbolo) {
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    let nuevo = { 'nombre': nombre, 'valor': simbolo };
                    a.tsimbolos[i] = nuevo;
                    return true;
                }
            }
        }
        ListaError_1.default.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return false;
    }
    getStringTipo(t) {
        switch (t) {
            case Tipo_1.Tipo.STRING:
                return 'Cadena';
            case Tipo_1.Tipo.ETIQUETA:
                return 'Etiqueta';
            case Tipo_1.Tipo.ATRIBUTO:
                return 'Atributo';
        }
        return '';
    }
    obtenerSimbolo(nombre) {
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    return a.tsimbolos[i].valor;
                }
            }
        }
        ListaError_1.default.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return null;
    }
    /* Metodo para cambiar el valor del simbolo */
    setSimbolo(nombre, simbolo) {
        //console.log("Entra a set simbolo");
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                //console.log(a.tsimbolos[i].nombre.toString().toLowerCase());
                //console.log(nombre.toString().toLowerCase());
                let aux = a.tsimbolos[i];
                if (aux.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    aux.valor = simbolo;
                    //console.log(a.tsimbolos[i].valor);
                    //console.log(this.tsimbolos[i].valor);
                    return;
                }
            }
        }
    }
    /* Verifica si el simbolo existe en el entorno actual */
    existeSimbolo(nombre) {
        for (let i = 0; i < this.tsimbolos.length; i++) {
            if (this.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                return true;
        }
        return false;
    }
}
exports.Entorno = Entorno;
