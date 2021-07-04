"use strict";
exports.__esModule = true;
exports.Entorno = void 0;
var Entorno = /** @class */ (function () {
    //recibe un entorno unicamente, el entorno anterior
    function Entorno(identificador, anterior) {
        this.tabla = [];
        this.identificador = identificador;
        this.anterior = anterior;
    }
    //se agrega un simbolo a la tabla
    Entorno.prototype.agregar = function (simbolo) {
        var symbol_exist = false;
        for (var _i = 0, _a = this.tabla; _i < _a.length; _i++) {
            var sim = _a[_i];
            if (simbolo.identificador == sim.identificador)
                symbol_exist = true;
        }
        if (!symbol_exist)
            this.tabla.push(simbolo);
        else
            this.reemplazar(simbolo.identificador, simbolo);
    };
    Entorno.prototype.getIdentificador = function () {
        return this.identificador;
    };
    //existe simbolo utilizable
    Entorno.prototype.existe = function (id) {
        var existe_id = false;
        for (var ent = this; ent != null; ent = ent.anterior) {
            ent.tabla.forEach(function (simbolo) {
                if (simbolo.identificador == id)
                    existe_id = true;
            });
        }
        return existe_id;
    };
    //existe simbolo en entorno actual
    Entorno.prototype.existeEnActual = function (id) {
        var existe_id = false;
        this.tabla.forEach(function (simbolo) {
            if (simbolo.identificador == id) {
                existe_id = true;
            }
        });
        return existe_id;
    };
    Entorno.prototype.getSimbolo = function (id) {
        var simbol_temp = null;
        for (var ent = this; ent != null; ent = ent.anterior) {
            ent.tabla.forEach(function (simbolo) {
                if (simbolo.identificador == id) {
                    simbol_temp = simbolo;
                }
            });
        }
        return simbol_temp;
    };
    Entorno.prototype.reemplazar = function (id, nuevoValor) {
        for (var i = 0; i < this.tabla.length; i++) {
            if (this.tabla[i].identificador == id) {
                this.tabla.splice(i, 1);
                this.agregar(nuevoValor);
            }
        }
    };
    return Entorno;
}());
exports.Entorno = Entorno;
