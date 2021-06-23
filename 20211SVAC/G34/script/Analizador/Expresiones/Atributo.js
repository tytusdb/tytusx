"use strict";
var Atributo = /** @class */ (function () {
    function Atributo(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.tipo = Tipo.ATRIBUTO;
        this.linea = linea;
        this.columna = columna;
    }
    Atributo.prototype.graph = function (atributo, str, contador) {
        var NUMID = contador.incrementarContador();
        //console.log(atributo);
        str.push("\n        node" + NUMID + "[label=\"ATRIBUTO\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];    \n        node" + contador.getContador() + "[label=\"" + atributo.identificador + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        node" + contador.getContador() + "[label=\"" + atributo.valor + "\",fillcolor=\"LightBlue\", style =\"filled\", shape=\"box\"];\n        node" + NUMID + " -> node" + contador.incrementarContador() + ";\n        ");
        return NUMID;
    };
    Atributo.prototype.agregarTDS = function (entorno, atributo, entornoactual, tetiqueta) {
        entorno.setSimbolo(atributo.identificador, atributo.valor, atributo.tipo, entornoactual, tetiqueta);
    };
    Atributo.prototype.graficarTDS = function (str, atibuto, entornoactual) {
        var cadena = "<tr>\n<th scope=\"row\">" + contador_tds + "</th>\n" +
            "<td scope=\"row\">" + atibuto.identificador + "</td>\n" +
            "<td>" + atibuto.valor + "</td>\n" +
            "<td>" + "Atributo" + "</td>\n" +
            "<td>" + entornoactual + "</td>\n" +
            "<td>" + atibuto.linea + "</td>\n" +
            "<td>" + atibuto.columna + "</td>\n" +
            "</tr>\n";
        str.push(cadena);
        contador_tds++;
    };
    return Atributo;
}());
