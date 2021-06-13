"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
const Entorno_1 = require("../ast/Entorno");
const Tipo_1 = require("../ast/Tipo");
class Objeto {
    constructor(id1, id2, text, listAtributos, listObjetos, line, column) {
        this.id1 = id1;
        this.id2 = id2;
        this.text = text;
        this.listAtributos = listAtributos;
        this.listObjetos = listObjetos;
        this.line = line;
        this.column = column;
        this.entorno = new Entorno_1.Entorno(null);
    }
    getTipo(e) {
        return Tipo_1.Tipo.OBJETO;
    }
    getValorImplicito(e) {
        return this;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        if (this.listAtributos != undefined) {
            this.listAtributos.forEach((o) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
                g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                g.count++;
                o.generarGrafo(g, nombreHijo);
            });
        }
        if (this.listObjetos != undefined) {
            this.listObjetos.forEach((o) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
                g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                g.count++;
                o.generarGrafo(g, nombreHijo);
            });
        }
        return null;
    }
    getNombreHijo() {
        return "OBJETO";
    }
}
exports.Objeto = Objeto;
