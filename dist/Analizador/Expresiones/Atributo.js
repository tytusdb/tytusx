"use strict";
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    Atributo.prototype.graph = function (atributo, str, contador) {
        var NUMID = contador.incrementarContador();
        //console.log(atributo);
        str.push("\n        node" + NUMID + "[label=\"ATRIBUTO\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];    \n        node" + contador.getContador() + "[label=\"" + atributo.identificador + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        node" + contador.getContador() + "[label=\"" + atributo.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
        return NUMID;
    };
    return Atributo;
}());
