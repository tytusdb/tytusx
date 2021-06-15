class NodoPadre {
    constructor(nombre, produccion, regla, hijos) {
        this.nombre = nombre;
        this.produccion = produccion;
        this.reglas = regla;
        this.hijos = hijos;
    }
    getProduccion() {
        return this.produccion;
    }
    getReglaSemantica() {
        return this.reglas;
    }
    reporteGramatical() {
        throw new Error("Method not implemented.");
    }
    getHijos() {
        return this.hijos;
    }
}
