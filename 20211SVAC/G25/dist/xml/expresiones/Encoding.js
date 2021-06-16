"use strict";
class Encoding {
    constructor(encoding, line, column) {
        this.encoding = encoding;
        this.line = line;
        this.column = column;
    }
    getTipo(e) {
        return Tipo.ENCODING;
    }
    ;
    getValorImplicito(e) {
        return this;
    }
    ;
    generarGrafo(g, padre) {
        return null;
    }
    ;
    getNombreHijo() {
        return "ENCODING";
    }
    ;
}
