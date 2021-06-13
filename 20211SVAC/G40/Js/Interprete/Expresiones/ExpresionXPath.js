"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.ExpresionXPath = void 0;
var ExpresionXPath = /** @class */ (function () {
    function ExpresionXPath(linea, columna, identificador, tipo, predicado) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.identificador = identificador;
        this.predicado = predicado;
    }
    ExpresionXPath.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };
    ExpresionXPath.prototype.getValorImplicito = function (ent, busqueda) {

        if(busqueda == 13){
            return "EXPRESION NORMAL :O";
        } else if(busqueda == 14){
            return "EXPRESION GLOBAL :O";
        } else if(busqueda == 15){
            return "EXPRESION FOLLOWING :O";
        } else if(busqueda == 16){
            return "EXPRESION FOLLOWING-SIBLING :O";
        } else if(busqueda == 17){
            return "EXPRESION PRECEDING :O";
        } else if(busqueda == 18){
            return "EXPRESION PRECEDING-SIBLING :O";
        } else if(busqueda == 19){
            return "EXPRESION SELF :O";
        } 


    };
    return ExpresionXPath;
}());
//exports.ExpresionXPath = ExpresionXPath;