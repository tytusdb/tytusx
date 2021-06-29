"use strict";
exports.__esModule = true;
exports.Objeto = void 0;
var Objeto = /** @class */ (function () {
    function Objeto(id, texto, linea, columna, listaAtributos, listaO, Tipo, Padre) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.tipo = Tipo;
        this.padre = Padre;
        this.posicion = -1;
    }
    Objeto.prototype.getId = function () {
        return this.identificador;
    };
    ;
    Objeto.prototype.getConcatenar = function (text) {
        this.texto = this.texto + " " + text;
    };
    ;
    Objeto.prototype.setPosicion = function (pos) {
        if (this.posicion == -1)
            this.posicion = pos;
    };
    ;
    Objeto.prototype.getAtributos = function () {
        return this.listaAtributos;
    };
    ;
    Objeto.prototype.getTexto = function () {
        return this.texto;
    };
    ;
    Objeto.prototype.getObjetos = function () {
        return this.listaObjetos;
    };
    ;
    return Objeto;
}());
exports.Objeto = Objeto;
