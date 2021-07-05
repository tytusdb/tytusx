"use strict";
exports.__esModule = true;
exports.Grafica = void 0;
var fs = require('fs').fs;
var Grafica = /** @class */ (function () {
    function Grafica() {
        this.conte = "";
    }
    Grafica.prototype.Graficar = function (raiz) {
        this.conte = "";
        this.conte = this.conte + "digraph lista{ rankdir=TB;node[shape = box, style = filled, color = LightBlue];\n";
        this.Generar(raiz);
        this.conte = this.conte + "}";
    };
    Grafica.prototype.Generar = function (raiz) {
        if (raiz.valor == '') {
            this.conte = this.conte + "nodo" + raiz.id + "[label=\"" + raiz.nombre + "\", shape=\"box\"]; \n";
        }
        else {
            this.conte = this.conte + "nodo" + raiz.id + "[label=\"" + raiz.valor + "\", shape=\"box\"]; \n";
        }
        if (raiz.hijos == undefined) {
            console.log("Grafica:  Hijos no esta definido! ");
            return;
        }
        if (raiz.hijos.length > 0) {
            var childs = raiz.hijos;
            for (var i = 0; i < childs.length; i++) {
                this.Generar(childs[i]);
                this.conte = this.conte + "\"nodo" + raiz.id + "\" -> \"nodo" + childs[i].id + "\" \n";
            }
        }
    };
    return Grafica;
}());
exports.Grafica = Grafica;
