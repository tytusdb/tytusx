"use strict";
class AST_XPATH {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.columna = 0;
        this.linea = 0;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    getValorImplicito() {
        return this.instrucciones;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"INICIO\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        this.instrucciones.forEach((or) => {
            or.forEach((o) => {
                /*nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";
                g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                g.count++;*/
                nombreHijo = o.generarGrafo(g, nombreHijo);
            });
        });
        return null;
    }
    getNombreHijo() {
        return "";
    }
}
