"use strict";

var Objeto = /** @class */ (function () {
    function Objeto(id1, id2, texto, linea, columna, listaAtributos, listaObjetos, agregar) {
        this.identificador1 = id1;
        this.identificador2 = id2;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
        this.agregar = agregar;
        this.entorno = null;
        this.id = 0;
    }

    Objeto.prototype.getAgregar = function () {
        return this.agregar;
    };

    Objeto.prototype.LeerID = function () {
        return this.id;
    };

    Objeto.prototype.SetearID = function (id) {
        this.id = id;
    };

    Objeto.prototype.getID = function () {
        return this.identificador1;
    };

    Objeto.prototype.getEntorno = function () {
        return this.entorno;
    };

    Objeto.prototype.concatenarTexto = function (texto) {
        this.texto = this.texto + " " + texto;
    };
    return Objeto;
}());
