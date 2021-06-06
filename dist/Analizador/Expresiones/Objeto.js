"use strict";
//import { Atributo } from "./Atributo";
var Objeto = /** @class */ (function () {
    function Objeto(id, texto, linea, columna, listaAtributos, listaO, identificador_cierre) {
        this.identificador = id;
        this.identificador_cierre = identificador_cierre;
        this.texto = texto;
        this.entorno = new TablaSimbolos(null);
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.linea = linea;
        this.columna = columna;
    }
    Objeto.prototype.graph = function (objeto, str, contador) {
        var NUMID = contador.incrementarContador();
        str.push("\n        node" + NUMID + "[label=\"OBJETO\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];    \n        node" + contador.getContador() + "[label=\"" + objeto.identificador + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
        var NUMPARAM = contador.incrementarContador();
        NUMPARAM = NUMPARAM - 1;
        var ptr;
        if (objeto.listaAtributos != undefined) {
            var atributo = new Atributo('', '', 0, 0);
            for (var i = 0; i < objeto.listaAtributos.length; i++) {
                ptr = atributo.graph(objeto.listaAtributos[i], str, contador);
                str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
            }
        }
        if (objeto.texto != "") {
            str.push("\n            node" + contador.getContador() + "[label=\"" + objeto.texto + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n            node" + NUMID + " -> node" + contador.incrementarContador() + ";\n            ");
        }
        for (var i = 0; i < objeto.listaObjetos.length; i++) {
            console.log(objeto.listaObjetos[i]);
            ptr = objeto.graph(objeto.listaObjetos[i], str, contador);
            str.push(" node" + NUMID + " -> node" + ptr + ";\n ");
        }
        str.push("\n        node" + contador.getContador() + "[label=\"" + objeto.identificador_cierre + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
        return NUMID;
    };
    return Objeto;
}());
