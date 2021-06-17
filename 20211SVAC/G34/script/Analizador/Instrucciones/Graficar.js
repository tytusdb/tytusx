"use strict";
var Graficar = /** @class */ (function () {
    function Graficar() {
        this.contador = 0;
    }
    Graficar.prototype.graficarXML = function () {
        var NUMID = this.incrementarContador();
        var encabezado = "digraph AST \n        {\n        rankdir=TB; \n        node[shape = box, style = filled, color = white];\n        node" + NUMID + "[label=\"AST XML\"];\n        ";
        var str = [];
        str.push(encabezado);
        var numaux = 0;
        var g = new Graficar();
        g.incrementarContador();
        for (var _i = 0, listaObjetos_1 = listaObjetos; _i < listaObjetos_1.length; _i++) {
            var aux = listaObjetos_1[_i];
            numaux = aux.graph(aux, str, g);
            str.push("\n            node" + NUMID + " -> node" + numaux + ";\n            ");
        }
        str.push("\n}\n");
        return str.join("");
    };
    Graficar.prototype.incrementarContador = function () {
        return this.contador++;
    };
    Graficar.prototype.getContador = function () {
        return this.contador;
    };
    return Graficar;
}());
