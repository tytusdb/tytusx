export default class print {
    constructor(exp, linea, columna) {
        this.exp = exp;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, arbol) {
        ent.appEnd(this.exp.getValor(ent, arbol));
    }
}
//# sourceMappingURL=print.js.map