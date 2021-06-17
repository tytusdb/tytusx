"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
//var Entorno_1 = require("./Entorno");
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, valor, tipo, fila, columna, padre) {
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        if (padre == undefined || padre == null) {
            this.entorno = new Entorno(null);
        }
        else {
            this.entorno = new Entorno(padre);
        }
    }
    Simbolo.prototype.getTabla = function (papa) {
        var _this = this;
        var dot = "";
        if (this.entorno != undefined || this.entorno != null) {
            this.entorno.ambito.forEach(function (element) {
                dot += element.getTabla(_this.nombre);
            });
        }
        if (this.tipo != 3 && this.nombre != "global") {
            var dot2 = "<tr><td>" + this.nombre + "</td>\n";
            dot2 += "<td>" + this.getTipo() + "</td>\n";
            dot2 += "<td>" + this.valor + "</td>\n";
            dot2 += "<td>" + papa + "</td>\n";
            dot2 += "<td>" + this.fila + "</td>\n";
            dot2 += "<td>" + this.columna + "</td></tr>\n";
            return dot2 + dot;
        }
        else {
            return dot;
        }
    };
    Simbolo.prototype.getTipo = function () {
        switch (this.tipo) {
            case 0:
                return "Texto";
            case 1:
                return "Objeto unario";
            case 2:
                return "Atributo";
            case 3:
                return "Objeto";
        }
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
