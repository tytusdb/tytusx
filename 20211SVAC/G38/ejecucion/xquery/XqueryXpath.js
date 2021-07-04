"use strict";
class XqueryXpath {
    constructor(predicate) {
        this.predicate = predicate;
    }
    ejecutar(ent, xmlData) {
        return [this.predicate.getValor(ent, xmlData)];
    }
}
