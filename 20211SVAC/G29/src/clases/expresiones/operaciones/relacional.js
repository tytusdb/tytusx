import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
export default class relacional {
    constructor(e1, operador, e2, linea, columna) {
        this.e1 = e1;
        this.operador = operador;
        this.e2 = e2;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, arbol) {
        return tipo.BOOL;
    }
    getValor(ent, arbol) {
        let val1 = this.e1.getValor(ent, arbol);
        let val2 = this.e2.getValor(ent, arbol);
        if (val1 instanceof Array) {
            let val = val1[0];
            if (typeof val === 'number') {
                let index = new Array();
                for (let i = 1; i <= val; i++) {
                    switch (this.operador) {
                        case "<":
                            if (i < val2) {
                                index.push(i);
                            }
                            break;
                        case "<=":
                            if (i <= val2) {
                                index.push(i);
                            }
                            break;
                        case ">":
                            if (i > val2) {
                                index.push(i);
                            }
                            break;
                        case ">=":
                            if (i >= val2) {
                                index.push(i);
                            }
                            break;
                        case "=":
                            if (i == val2) {
                                index.push(i);
                            }
                            break;
                        case "!=":
                            if (i != val2) {
                                index.push(i);
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (index.length == 0) {
                    return null;
                }
                else {
                    return index;
                }
            }
            else if (val instanceof entorno) {
                let res_ent = new Array();
                let tipe = this.e1.getTipo(ent, arbol);
                if (!tipe) {
                    for (let sub_ent of val1) {
                        let simbol = sub_ent.tabla["valor"];
                        if (this.compare(simbol.valor, val2)) {
                            res_ent.push(sub_ent.anterior);
                        }
                    }
                }
                else {
                    for (let sub_ent of val1) {
                        for (let key in sub_ent.tabla) {
                            if (key.startsWith("atr")) {
                                let simbol = sub_ent.tabla[key];
                                if (this.compare(simbol.valor, val2)) {
                                    res_ent.push(sub_ent);
                                }
                            }
                        }
                    }
                }
                return res_ent;
            }
            else {
                console.log("NO NUMBER, NO ENTORNO");
            }
        }
        else {
            console.log("NO ARRAY");
        }
        return null;
    }
    compare(val1, val2) {
        switch (this.operador) {
            case "<":
                if (val1 < val2) {
                    return true;
                }
                break;
            case "<=":
                if (val1 <= val2) {
                    return true;
                }
                break;
            case ">":
                if (val1 > val2) {
                    return true;
                }
                break;
            case ">=":
                if (val1 >= val2) {
                    return true;
                }
                break;
            case "=":
                if (val1 == val2) {
                    return true;
                }
                break;
            case "!=":
                if (val1 != val2) {
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }
}
//# sourceMappingURL=relacional.js.map