class Entorno {
    constructor(anterior) {
        this.tabla = new Array();
        this.anterior = anterior;
    }
    add(simbolo) {
        this.tabla.push(simbolo);
    }
    getTable() {
        return this.tabla;
    }
}
