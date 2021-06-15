class NodoPadre {
    constructor(id, nombre, produccion, regla, hijos) {
        this.id = id;
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
    getId() {
        return this.id;
    }
    getNomre() {
        return this.nombre;
    }
}
