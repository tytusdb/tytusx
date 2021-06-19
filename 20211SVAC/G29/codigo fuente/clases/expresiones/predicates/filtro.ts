import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";
import select from "../select";

export default class filtro implements expresion {
    public id: string
    public linea: number
    public columna: number
    public atr: boolean
    public matches: Array<entorno>
    constructor(id, linea, columna, atr) {
        this.id = id
        this.linea = linea
        this.columna = columna
        this.atr = atr
        this.matches = new Array<entorno>()
    }
    getTipo(ent: entorno, arbol: ast) {
        if (this.atr) {
            return true
        }
        return false
    }
    getValor(ent: entorno, arbol: ast) {
        if (this.atr == false) {
            let slc: select = new select("/", this.id, this.atr, this.linea, this.columna)
            let entornos = slc.getValor(ent, arbol)
            if (ent instanceof Array) {
                for (let n_ent of entornos) {
                    let val = n_ent.tabla["valor"]
                    if (val instanceof simbolo) {
                        if (val.id == this.id) {
                            this.matches.push(n_ent)
                        }
                    }
                }
            } else {
                let val = ent.tabla["valor"]
                if (val instanceof simbolo) {
                    if (val.id == this.id) {
                        this.matches.push(ent)
                    }
                }
            }
        } else {
            if (this.id == null) {
                if (ent instanceof Array) {
                    for (let n_ent of ent) {
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("atr")) {
                                this.matches.push(n_ent)
                            }
                        }
                    }
                } else {
                    for (let key in ent.tabla) {
                        if (key.startsWith("atr")) {
                            this.matches.push(ent)
                        }
                    }
                }
            } else {
                if (ent instanceof Array) {
                    for (let n_ent of ent) {
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("atr")) {
                                let simbol = n_ent.tabla[key]
                                if (simbol.id == this.id) {
                                    this.matches.push(n_ent)
                                }
                            }
                        }
                    }
                } else {
                    for (let key in ent.tabla) {
                        if (key.startsWith("atr")) {
                            let simbol = ent.tabla[key]
                            if (simbol.id == this.id) {
                                this.matches.push(ent)
                            }
                        }
                    }
                }
            }
        }
        return this.matches
    }

}