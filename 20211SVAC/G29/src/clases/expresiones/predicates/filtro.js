import { simbolo } from "src/clases/ast/simbolo";
import select from "../select";
export default class filtro {
    constructor(id, linea, columna, atr) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.atr = atr;
        this.matches = new Array();
    }
    getTipo(ent, arbol) {
        if (this.atr) {
            return true;
        }
        return false;
    }
    getValor(ent, arbol) {
        if (this.atr == false) {
            this.slc = new select("/", this.id, this.atr, this.linea, this.columna);
            let entornos = this.slc.getValor(ent, arbol);
            if (ent instanceof Array) {
                for (let n_ent of entornos) {
                    let val = n_ent.tabla["valor"];
                    if (val instanceof simbolo) {
                        if (val.id == this.id) {
                            this.matches.push(n_ent);
                        }
                    }
                }
            }
            else {
                let val = ent.tabla["valor"];
                if (val instanceof simbolo) {
                    if (val.id == this.id) {
                        this.matches.push(ent);
                    }
                }
            }
        }
        else {
            if (this.id == null) {
                if (ent instanceof Array) {
                    for (let n_ent of ent) {
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("atr")) {
                                this.matches.push(n_ent);
                            }
                        }
                    }
                }
                else {
                    for (let key in ent.tabla) {
                        if (key.startsWith("atr")) {
                            this.matches.push(ent);
                        }
                    }
                }
            }
            else {
                if (ent instanceof Array) {
                    for (let n_ent of ent) {
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("atr")) {
                                let simbol = n_ent.tabla[key];
                                if (simbol.id == this.id) {
                                    this.matches.push(n_ent);
                                }
                            }
                        }
                    }
                }
                else {
                    for (let key in ent.tabla) {
                        if (key.startsWith("atr")) {
                            let simbol = ent.tabla[key];
                            if (simbol.id == this.id) {
                                this.matches.push(ent);
                            }
                        }
                    }
                }
            }
        }
        return this.matches;
    }
    traducir(ent, c3d) {
        if (this.atr == false) {
            this.slc.traducir(this.slc.matches, c3d);
        }
        else {
            this.slc = new select("/", this.id, this.atr, this.linea, this.columna);
            this.slc.traducir(this.matches, c3d);
        }
    }
}
//# sourceMappingURL=filtro.js.map