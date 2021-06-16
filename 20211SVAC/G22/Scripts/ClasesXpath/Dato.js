"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dato = void 0;
var TiposXpath_1 = require("./TiposXpath");
var Dato = /** @class */ (function () {
    function Dato(valor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    Dato.prototype.getTipo = function (arbol) {
        var valor = this.getValorImplicito(arbol);
        if (typeof (valor) === 'boolean') {
            return TiposXpath_1.TiposXpath.BOOL;
        }
        else if (typeof (valor) === 'string') //aplica para cadena
         {
            return TiposXpath_1.TiposXpath.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return TiposXpath_1.TiposXpath.INT;
            }
            return TiposXpath_1.TiposXpath.DOUBLE;
        }
        else if (valor === null) {
            return TiposXpath_1.TiposXpath.NULL;
        }
        else {
            //evaluar si es una ruta(consulta), funcion , metodo 
        }
        return TiposXpath_1.TiposXpath.VOID;
    };
    Dato.prototype.getValorImplicito = function (arbol) {
        return this.valor;
    };
    Dato.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Dato;
}());
exports.Dato = Dato;
