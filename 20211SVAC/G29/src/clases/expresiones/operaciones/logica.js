import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import relacional from "./relacional";
export default class logica {
    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1;
        this.operador = operador;
        this.e2 = e2;
        this.linea = linea;
        this.columna = columna;
        this.expU = expU;
    }
    traducir(ent, c3d) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent, arbol) {
        return tipo.BOOL;
    }
    getValor(ent, arbol) {
        let val1;
        let val2;
        let valU;
        if (this.expU) {
            valU = this.e1.getValor(ent, arbol);
        }
        else {
            val1 = this.e1.getValor(ent, arbol);
            val2 = this.e2.getValor(ent, arbol);
        }
        switch (this.operador) {
            case "||":
                if (val1 instanceof Array && val2 instanceof Array) {
                    if (val1[0] instanceof entorno || val2[0] instanceof entorno) {
                        let res_ent = new Array();
                        let arr1 = this.getDictionary(val1);
                        let arr2 = this.getDictionary(val2);
                        let res = {};
                        for (let i in arr1) {
                            res[i] = arr1[i];
                        }
                        for (let i in arr2) {
                            res[i] = arr2[i];
                        }
                        for (let index in res) {
                            for (let n_ent of val1) {
                                if (n_ent.tabla["index"].valor == index) {
                                    res_ent.push(n_ent);
                                    delete res[index];
                                }
                            }
                        }
                        for (let index in res) {
                            for (let n_ent of val2) {
                                if (n_ent.tabla["index"].valor == index) {
                                    res_ent.push(n_ent);
                                }
                            }
                        }
                        return res_ent;
                    }
                    else {
                        //Error
                    }
                }
                else {
                    //Error
                }
                break;
            case "&&":
                if (val1 instanceof Array && val2 instanceof Array) {
                    if (val1[0] instanceof entorno && val2[0] instanceof entorno) {
                        let res_ent = new Array();
                        let arr1 = this.getDictionary(val1);
                        let arr2 = this.getDictionary(val2);
                        let res = {};
                        for (let i in arr1) {
                            for (let j in arr2) {
                                if (i == j) {
                                    res[i] = arr1[i];
                                }
                            }
                        }
                        for (let index in res) {
                            for (let n_ent of val1) {
                                if (n_ent.tabla["index"].valor == index) {
                                    res_ent.push(n_ent);
                                    delete res[index];
                                }
                            }
                        }
                        for (let index in res) {
                            for (let n_ent of val2) {
                                if (n_ent.tabla["index"].valor == index) {
                                    res_ent.push(n_ent);
                                }
                            }
                        }
                        return res_ent;
                    }
                    else {
                        //Error
                    }
                }
                else {
                    //Error
                }
                break;
            case "!":
                if (typeof valU === 'boolean') {
                    return !valU;
                }
                else {
                    //Error
                }
                break;
            default:
                break;
        }
        return null;
    }
    getDictionary(entornos) {
        let arr = {};
        for (let ent of entornos) {
            let index = ent.tabla["index"];
            arr[index.valor] = index.valor;
        }
        return arr;
    }
    /* logicas para ifs */
    getValorX(ent, arbol) {
        let val1;
        let val2;
        let valU;
        if (this.expU) {
            if (this.e1 instanceof relacional || this.e1 instanceof logica) {
                valU = this.e1.getValorX(ent, arbol);
            }
            else {
                valU = this.e1.getValor(ent, arbol);
            }
        }
        else {
            if (this.e1 instanceof relacional || this.e1 instanceof logica) {
                val1 = this.e1.getValorX(ent, arbol);
            }
            else {
                val1 = this.e1.getValor(ent, arbol);
            }
            if (this.e2 instanceof relacional || this.e2 instanceof logica) {
                val2 = this.e2.getValorX(ent, arbol);
            }
            else {
                val2 = this.e2.getValor(ent, arbol);
            }
        }
        switch (this.operador) {
            case "||":
                if (val1 || val2) {
                    return true;
                }
                return false;
            case "&&":
                if (val1 && val2) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}
//# sourceMappingURL=logica.js.map