"use strict";
//import { Atributo } from "./Atributo";
var Objeto = /** @class */ (function () {
    function Objeto(id, texto, linea, columna, listaAtributos, listaO, identificador_cierre, tipoE) {
        this.identificador = id;
        this.identificador_cierre = identificador_cierre;
        this.texto = texto;
        //  this.entorno = new TablaSimbolos(null);
        this.tipo = Tipo.OBJETO;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.linea = linea;
        this.columna = columna;
        this.tipoEtiqueta = tipoE;
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
    Objeto.prototype.agregarTDS = function (entorno, objeto) {
        var ts = new TablaSimbolos([], entorno, this.identificador);
        //tds_xml_persistente.push(ts);
        if (objeto.listaAtributos != undefined) {
            var atributo = new Atributo('', '', 0, 0);
            for (var i = 0; i < objeto.listaAtributos.length; i++) {
                atributo.agregarTDS(ts, objeto.listaAtributos[i], objeto.identificador, this.tipoEtiqueta);
            }
        }
        if (objeto.texto != "") {
            ts.setSimbolo(objeto.identificador, objeto.texto, objeto.tipo, objeto.identificador, this.tipoEtiqueta);
        }
        for (var i = 0; i < objeto.listaObjetos.length; i++) {
            ts.simbolos.push(objeto.agregarTDS(ts, objeto.listaObjetos[i]));
        }
        return ts;
    };
    Objeto.prototype.graficarTDS = function (str, objeto) {
        if (objeto.listaAtributos != undefined) {
            var atributo = new Atributo('', '', 0, 0);
            for (var i = 0; i < objeto.listaAtributos.length; i++) {
                atributo.graficarTDS(str, objeto.listaAtributos[i], objeto.identificador);
            }
        }
        if (objeto.texto != "") {
            var cadena = "<tr>\n<th scope=\"row\">" + contador_tds + "</th>\n" +
                "<td scope=\"row\">" + objeto.identificador + "</td>\n" +
                "<td>" + objeto.texto + "</td>\n" +
                "<td>" + "Objeto" + "</td>\n" +
                "<td>" + objeto.identificador + "</td>\n" +
                "<td>" + objeto.linea + "</td>\n" +
                "<td>" + objeto.columna + "</td>\n" +
                "</tr>\n";
            str.push(cadena);
            contador_tds++;
        }
        for (var i = 0; i < objeto.listaObjetos.length; i++) {
            objeto.graficarTDS(str, objeto.listaObjetos[i]);
        }
    };
    Objeto.prototype.verificarEtiquetas = function (objeto) {
        for (var i = 0; i < objeto.listaObjetos.length; i++) {
            var valida = objeto.verificarEtiquetas(objeto.listaObjetos[i]);
            if (!valida) {
                return false;
            }
        }
        if (objeto.tipoEtiqueta) {
            //es una etiqueta doble
            if (objeto.identificador != objeto.identificador_cierre) {
                //Error Semantico etiquedas diferentes
                return false;
            }
        }
        else {
            //Etiqueta Unica
            return true;
        }
        return true;
    };
    return Objeto;
}());
