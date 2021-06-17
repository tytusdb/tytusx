class NodoHijo {
    constructor(id, nombre, produccion, regla) {
        this.id = id;
        this.nombre = nombre;
        this.produccion = produccion;
        this.reglas = regla;
    }
    reporteGramatical() {
        throw new Error("Method not implemented.");
    }
    getProduccion() {
        return this.produccion;
    }
    getReglaSemantica() {
        return this.reglas;
    }
    getId() {
        return this.id;
    }
    getNomre() {
        return this.nombre;
    }
}
