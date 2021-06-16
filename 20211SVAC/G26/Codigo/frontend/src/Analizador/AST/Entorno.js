"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var ListaError_1 = __importDefault(require("../Global/ListaError"));
var Tipo_1 = require("./Tipo");
var Entorno = /** @class */ (function () {
    function Entorno(nombre, padre, global) {
        this.tsimbolos = new Array();
        this.nombre = nombre;
        this.padre = padre;
        if (global === null)
            this.global = this;
        else
            this.global = global;
    }
    Entorno.prototype.agregarSimbolo = function (nombre, simbolo) {
        this.tsimbolos.push({ 'nombre': nombre, 'valor': simbolo });
    };
    Entorno.prototype.getStringTipo = function (t) {
        switch (t) {
            case Tipo_1.Tipo.STRING:
                return 'Cadena';
            case Tipo_1.Tipo.ETIQUETA:
                return 'Etiqueta';
            case Tipo_1.Tipo.ATRIBUTO:
                return 'Atributo';
        }
        return '';
    };
    Entorno.prototype.obtenerSimbolo = function (nombre) {
        for (var a = this; a != null; a = a.padre) {
            for (var i = 0; i < a.tsimbolos.length; i++) {
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                    return a.tsimbolos[i].valor;
            }
        }
        ListaError_1.default.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return null;
    };
    /* Metodo para cambiar el valor del simbolo */
    Entorno.prototype.setSimbolo = function (nombre, simbolo) {
        //console.log("Entra a set simbolo");
        for (var a = this; a != null; a = a.padre) {
            for (var i = 0; i < a.tsimbolos.length; i++) {
                //console.log(a.tsimbolos[i].nombre.toString().toLowerCase());
                //console.log(nombre.toString().toLowerCase());
                var aux = a.tsimbolos[i];
                if (aux.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    aux.valor = simbolo;
                    //console.log(a.tsimbolos[i].valor);
                    //console.log(this.tsimbolos[i].valor);
                    return;
                }
            }
        }
    };
    /* Verifica si el simbolo existe en el entorno actual */
    Entorno.prototype.existeSimbolo = function (nombre) {
        for (var i = 0; i < this.tsimbolos.length; i++) {
            if (this.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                return true;
        }
        return false;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
