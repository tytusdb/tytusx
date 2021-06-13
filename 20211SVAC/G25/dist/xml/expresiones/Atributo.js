"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
const Entorno_1 = require("../ast/Entorno");
const Tipo_1 = require("../ast/Tipo");
class Atributo {
    constructor(id, value, line, column) {
        this.id = id;
        this.value = value;
        this.line = line;
        this.column = column;
        this.entorno = new Entorno_1.Entorno(null);
    }
    getTipo(e) {
        return Tipo_1.Tipo.OBJETO;
    }
    ;
    getValorImplicito(e) {
        return this.value;
    }
    ;
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\" = \"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"" + this.value + "\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        return null;
    }
    ;
    getNombreHijo() {
        return "ATRIBUTO";
    }
    ;
}
exports.Atributo = Atributo;
