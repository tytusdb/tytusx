"use strict";
class Objeto {
    constructor(id1, id2, text, listAtributos, listObjetos, line, column) {
        this.id1 = id1;
        this.id2 = id2;
        this.text = text;
        this.listAtributos = listAtributos;
        this.listObjetos = listObjetos;
        this.line = line;
        this.column = column;
        this.entorno = new Entorno(null);
    }
    getTipo(e) {
        return Tipo.OBJETO;
    }
    getListaAtributos() {
        return this.listAtributos;
    }
    getValorImplicito(e) {
        return this;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        let padre2;
        let padre3; //para atributos
        if (this.text == '' && this.listObjetos == null) {
            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" LISTA_ATRIBUTOS \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            padre3 = nombreHijo;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" / \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
        }
        else {
            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" LISTA_ATRIBUTOS \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            padre3 = nombreHijo;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            if (this.listObjetos != null) {
                g.graph += "    " + nombreHijo + "[label=\" LISTA_ELEMENTOS \"];\n";
            }
            else {
                g.graph += "    " + nombreHijo + "[label=\" TEXTO \"];\n";
            }
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            padre2 = nombreHijo;
            if (this.listObjetos == null) {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\"" + this.text + "\"];\n";
                g.graph += "    " + padre2 + " -> " + nombreHijo + ";\n";
                g.count++;
            }
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" / \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
        }
        padre = nombreHijo;
        if (this.listAtributos != undefined) {
            this.listAtributos.forEach((o) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
                g.graph += "    " + padre3 + " -> " + nombreHijo + ";\n";
                g.count++;
                o.generarGrafo(g, nombreHijo);
            });
        }
        if (this.listObjetos != undefined) {
            this.listObjetos.forEach((o) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
                if (this.text == '' && this.listObjetos == null) {
                    g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                }
                else {
                    g.graph += "    " + padre2 + " -> " + nombreHijo + ";\n";
                }
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
