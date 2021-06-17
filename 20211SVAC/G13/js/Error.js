"use strict";
//Clase para los errores encontrados durante el analisis
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    /**
     * Contructor de un objeto de error
     * @param tipo tipo de error (lexico|sintactico|semantico)
     * @param contenido contenido del error
     * @param linea linea de error
     * @param columna columna de error
     * @param mensaje mensaje sobre tipo de error encontrado
     */
    function Error(tipo, contenido, linea, columna, mensaje) {
        this.tipo = tipo;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
    }
    /**
     * Retorna cadena con informacion del error
     * @returns string
     */
    Error.prototype.toString = function () {
        var cadena = '';
        cadena += ' Tipo: ' + this.tipo +
            " Error:'" + this.contenido + "' en linea:" + this.linea + ' columna:' + this.columna
            + ' Mensaje:' + this.mensaje;
        return cadena;
    };
    return Error;
}());
exports.Error = Error;
