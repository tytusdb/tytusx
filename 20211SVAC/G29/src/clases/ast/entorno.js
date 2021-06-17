export class entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.tabla = {};
        this.consola = "";
    }
    agregar(id, simbolo) {
        this.tabla[id.toLocaleLowerCase()] = simbolo;
    }
    existeActual(id) {
        let existe = this.tabla[id.toLocaleLowerCase()];
        if (existe != null) {
            return true;
        }
        return false;
    }
    existe(id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla[id.toLocaleLowerCase()];
            if (existe != null) {
                return true;
            }
            ts = ts.anterior;
        }
        return false;
    }
    getSimbol(id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla[id.toLocaleLowerCase()];
            if (existe != null) {
                return existe;
            }
            ts = ts.anterior;
        }
        return null;
    }
    appEnd(cadena) {
        return this.consola += cadena + "\n";
    }
}
//# sourceMappingURL=entorno.js.map