class Errors {
    constructor(tipo, desc, analis, linea, columna) {
        this.tipo = tipo;
        this.desc = desc;
        this.analizador = analis;
        this.linea = linea;
        this.columna = columna;
    }
    toString() {
        return "Error, tipo: " + this.tipo + ", descripcion: " + this.desc + ", analizador: " + this.analizador;
    }
}
export { Errors };
//# sourceMappingURL=Errors.js.map