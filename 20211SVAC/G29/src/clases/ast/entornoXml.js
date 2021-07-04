export class entornoXml {
    constructor(anterior) {
        this.anterior = anterior;
        this.tabla = {};
    }
    agregar(n, simbolo) {
        this.tabla[n] = simbolo;
    }
    existeActual(n, id) {
        let existe = this.tabla[n];
        if (existe != null && existe.id == id) {
            return true;
        }
        return false;
    }
    existe(n, id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla[n];
            if (existe != null && existe.id == id) {
                return true;
            }
            ts = ts.anterior;
        }
        return false;
    }
    getSimbol(n, id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla[n];
            if (existe != null && existe.id == id) {
                return existe;
            }
            ts = ts.anterior;
        }
        return null;
    }
}
//# sourceMappingURL=entornoXml.js.map