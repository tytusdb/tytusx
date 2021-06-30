"use strict";
exports.__esModule = true;
exports.ConsultasTS = void 0;
var ConsultasTS = /** @class */ (function () {
    function ConsultasTS() {
        //ESTA CLASE VA A TENER TODAS LAS TIPOS DE CONSULTAS QUE SE PUEDEN REALIZAR 
        //A LA TABLA QUE CONTIENE LA INFORMACIÓN DEL XML, PARA PODER SER USADAS
        //EN TODAS LAS CLASES ABSTRACTAS QUE SE NECESITEN.
        this.contenido = [];
        this.hijos = [];
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"));
        this.encoding = localStorage.getItem("encoding");
    }
    ConsultasTS.prototype.getEntornoActual = function (etiqueta, padre) {
        this.contenido = [];
        // Busca en la tabla de simbolos
        for (var i = 0; i < this.tablasimbolos.length; i++) {
            var elemento = this.tablasimbolos[i];
            if (elemento.Nombre == etiqueta && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor);
            }
            else if (elemento.Tipo == etiqueta && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor.valor);
            }
            else if (etiqueta == "Texto" && elemento.Padre == padre) {
                this.contenido.push(elemento.Valor);
            }
        }
        return this.contenido;
    };
    ConsultasTS.prototype.getEntornoLibre = function (etiqueta) {
        for (var i = 0; i < this.tablasimbolos.length; i++) {
            var elemento = this.tablasimbolos[i];
            if (elemento.Nombre == etiqueta) {
                this.contenido.push(elemento.Valor);
            }
            else if (elemento.Tipo == "Texto") {
                this.contenido.push(elemento.Valor);
            }
        }
    };
    ConsultasTS.prototype.getPredicado = function (indice, etiqueta, padre) {
        this.contenido = [];
        this.getEntornoActual(etiqueta, padre);
        for (var i = 0; i < this.contenido.length; i++) {
            if (i == (indice - 1)) {
                this.hijos.push(this.contenido[i]);
            }
        }
        this.contenido = [];
        this.contenido = this.hijos;
        return this.contenido;
    };
    ConsultasTS.prototype.Concatenar = function (indice, tope, etiqueta, padre) {
        this.contenido = [];
        this.hijos = [];
        this.getEntornoActual(etiqueta, padre);
        for (var i = indice; i < tope; i++) {
            for (var j = 0; j < this.contenido.length; j++) {
                if (j == (i - 1)) {
                    this.hijos.push(this.contenido[j]);
                }
            }
        }
        return this.hijos;
    };
    return ConsultasTS;
}());
exports.ConsultasTS = ConsultasTS;
