"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoNodo = exports.Nodo = void 0;
var Nodo = /** @class */ (function () {
    function Nodo(nombre, tipo, linea, columna, predicado) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.nombre = nombre;
        this.predicado = predicado;
        this.fromRoot = true;
    }
    Nodo.prototype.isFromRoot = function () {
        return this.fromRoot;
    };
    Nodo.prototype.setFromRoot = function (fromRoot) {
        this.fromRoot = fromRoot;
    };
    Nodo.prototype.getValor = function (Ent) {
        return this.nombre;
    };
    Nodo.prototype.getNombre = function () {
        return this.nombre;
    };
    Nodo.prototype.getPredicado = function () {
        return this.predicado;
    };
    Nodo.prototype.getTipo = function () {
        return this.tipo;
    };
    return Nodo;
}());
exports.Nodo = Nodo;
var TipoNodo;
(function (TipoNodo) {
    TipoNodo[TipoNodo["IDENTIFIER"] = 0] = "IDENTIFIER";
    TipoNodo[TipoNodo["ATRIBUTO"] = 1] = "ATRIBUTO";
    TipoNodo[TipoNodo["DOT"] = 2] = "DOT";
    TipoNodo[TipoNodo["DOTDOT"] = 3] = "DOTDOT";
    TipoNodo[TipoNodo["ASTERISCO"] = 4] = "ASTERISCO";
    TipoNodo[TipoNodo["AXIS"] = 5] = "AXIS";
    TipoNodo[TipoNodo["FUNCION"] = 6] = "FUNCION";
})(TipoNodo = exports.TipoNodo || (exports.TipoNodo = {}));
