class NodoHijo {
    constructor(nombre, produccion, regla) {
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
}
