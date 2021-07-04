"use strict";
//Clase de los atributos que puede tener una etiqueta XML
Object.defineProperty(exports, "__esModule", { value: true });
var AtributoXML = /** @class */ (function () {
    /**
     * Constructor de un atributo para una etiqueta xml
     * @param atributo nombre de atributo
     * @param contenido cadena con contenido del atributo
     * @param fila fila donde se encontro un atributo
     * @param columna columna donde se entonctro un atributo
     */
    function AtributoXML(atributo, contenido, fila, columna) {
        this.contenido = ''; //Contenido del atributo
        this.atributo = atributo;
        this.setContenido(contenido);
        this.fila = (fila != undefined) ? fila : 0;
        this.columna = (columna != undefined) ? columna : 0;
    }
    /**
     * Normaliza entrada de un atributo y setea el contenido del atributo
     * @param cont void
     */
    AtributoXML.prototype.setContenido = function (cont) {
        var cadena = cont.replace('\n', '').replace('\t', '').replace('\r', '');
        if (cadena.replace('\n', '') === '') {
            this.contenido = '';
        }
        else {
            this.contenido = cont.replace(/"/g, '');
        }
    };
    /**
     * Retorna el atributo  en una cadena: atributo = contenido
     * @returns string
     */
    AtributoXML.prototype.toString = function () {
        return this.atributo + '=' + this.contenido;
    };
    return AtributoXML;
}());
exports.AtributoXML = AtributoXML;
