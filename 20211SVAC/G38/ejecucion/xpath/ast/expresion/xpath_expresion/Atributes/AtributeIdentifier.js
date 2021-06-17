"use strict";
class AtributeIdentifier {
    constructor(identifier, linea, columna) {
        this.identifier = identifier;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent) {
        return new Tipo(TipoDato.atributo);
    }
    getValor(ent) {
        ent.findAtributesByNombreElemento(this.identifier);
    }
}
