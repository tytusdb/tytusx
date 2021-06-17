"use strict";
class AST_XPATH {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.columna = 0;
        this.linea = 0;
    }
    getValorImplicito() {
        return this.instrucciones;
    }
    generarGrafo(g, padre) {
        return null;
    }
    getNombreHijo() {
        return "";
    }
}
