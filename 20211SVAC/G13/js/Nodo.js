"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodo = /** @class */ (function () {
    /**
     * Constructor de Nodo para estructura del CST
     * @param node_id numero de nodo
     * @param name nombre del nodo
     * @param content contenido del nodo
     * @param list lista de nodos hijos
     */
    function Nodo(id, name, list, content) {
        this.node_id = id;
        this.node_name = name;
        this.node_content = (content != undefined) ? content : '';
        this.node_list = (list != undefined) ? list : [];
    }
    /**
     * Agrega un nodo a lista de nodos
     * @param nodo void
     */
    Nodo.prototype.addNodo = function (nodo) {
        if (nodo != undefined) {
            this.node_list.push(nodo);
        }
    };
    /**
     * Devuleve cadena con las propiedades del nodo
     * @returns string
     */
    Nodo.prototype.toString = function () {
        var cadena = 'Nodo:' + this.node_name + ' Contenido:' + this.node_content;
        return cadena;
    };
    /**
     * Setea el objeto de produccion para un nodo
     * @param produ void
     */
    Nodo.prototype.setProdu = function (produ) {
        this.node_production = produ;
    };
    /**
     * Metodo que obtiene arreglo con objetos de produccion de gramatica y de nodos sus hijos
     * @returns FilaGrammar[]
     */
    Nodo.prototype.getGrammar = function () {
        var resultado = new Array();
        if (this.node_production != undefined) {
            resultado.push(this.node_production);
            var size = this.node_list.length;
            for (var i = 0; i < size; i++) {
                if (this.node_list[i] != undefined) {
                    resultado = resultado.concat(this.node_list[i].getGrammar());
                }
            }
        }
        return resultado;
    };
    return Nodo;
}());
exports.Nodo = Nodo;
