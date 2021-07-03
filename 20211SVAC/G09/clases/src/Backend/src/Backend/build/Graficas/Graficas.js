"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graficas;
(function (Graficas) {
    function formatId(numId) {
        return "nodo" + numId.toString();
    }
    function defNodo(nodoId, etiqueta) {
        return formatId(nodoId) + "[label=\"" + etiqueta + "\"] \n";
    }
    Graficas.defNodo = defNodo;
    function defEdge(id1, id2) {
        return formatId(id1) + " -> " + formatId(id2) + "\n";
    }
    Graficas.defEdge = defEdge;
    function getElement(id, etiqueta, idPadre) {
        let dotText = "";
        dotText += defNodo(id, etiqueta);
        dotText += defEdge(idPadre, id);
        return dotText;
    }
    Graficas.getElement = getElement;
})(Graficas = exports.Graficas || (exports.Graficas = {}));
