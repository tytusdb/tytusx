"use strict";
//Clase para guardar las filas de la tabla de simbolos del codigo de tres direcciones
Object.defineProperty(exports, "__esModule", { value: true });
var FilaTablaSimbolos = /** @class */ (function () {
    /**
     * Constructor de un objeto FilaTablaSimbolos
     * @param tag_name
     * @param ambito
     * @param tipo
     * @param line
     * @param col
     * @param position
     */
    function FilaTablaSimbolos(tag_name, ambito, tipo, line, col, position) {
        this.name = tag_name;
        this.ambito = ambito;
        this.tipo = tipo;
        this.linea = line;
        this.columna = col;
        this.posicion = position;
    }
    /**
     * Arma un arreglo con los valores de la fila para la tabla de simbolos;
     * el arreglo que arma siempre tiene un tamaño de 6, pues son 6 atributos,
     * estructura del arreglo-> [ tipo, name, ambito, posicion, linea, columna ]
     * El metodo es por si llega a ser util
     * @returns [string]:arreglo de strings
     */
    FilaTablaSimbolos.prototype.getFila = function () {
        var fila = [];
        fila.push(this.tipo);
        fila.push(this.name);
        fila.push(this.ambito);
        fila.push((this.posicion !== undefined) ? this.posicion.toString() : '-');
        fila.push(this.linea.toString());
        fila.push(this.columna.toString());
        return fila;
    };
    return FilaTablaSimbolos;
}());
exports.FilaTablaSimbolos = FilaTablaSimbolos;
