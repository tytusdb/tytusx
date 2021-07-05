export class Predicate {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    get3Dir(ent) {
        return this.expresion.get3Dir(ent);
    }
    getValor(ent) {
        let resultado = this.expresion.getValor(ent);
        this.tipo = this.expresion.getTipo(ent);
        return resultado;
    }
    getValorInicial(ent) {
    }
}
