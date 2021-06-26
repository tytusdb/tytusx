import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class logica implements expresion {
    public e1: expresion
    public operador: string
    public e2: expresion
    public linea: number
    public columna: number
    public expU: boolean
    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1
        this.operador = operador
        this.e2 = e2
        this.linea = linea
        this.columna = columna
        this.expU = expU
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.BOOL
    }
    getValor(ent: entorno, arbol: ast) {
        let val1
        let val2
        let valU
        if (this.expU) {
            valU = this.e1.getValor(ent, arbol)
        } else {
            val1 = this.e1.getValor(ent, arbol)
            val2 = this.e2.getValor(ent, arbol)
        }
        switch (this.operador) {
            case "||":
                if (val1 instanceof Array && val2 instanceof Array) {
                    if (val1[0] instanceof entorno || val2[0] instanceof entorno) {
                        let res_ent: Array<entorno> = new Array<entorno>()
                        let arr1: { [id: number]: number } = this.getDictionary(val1)
                        let arr2: { [id: number]: number } = this.getDictionary(val2)
                        let res: { [id: number]: number } = {}
                        for (let i in arr1){
                            res[i] = arr1[i]
                        }
                        for (let i in arr2){
                            res[i] = arr2[i]
                        }
                        for (let index in res){
                            for (let n_ent of val1){
                                if (n_ent.tabla["index"].valor == index){
                                    res_ent.push(n_ent)
                                    delete res[index]
                                }
                            }
                        }
                        for (let index in res){
                            for (let n_ent of val2){
                                if (n_ent.tabla["index"].valor == index){
                                    res_ent.push(n_ent)
                                }
                            }
                        }
                        return res_ent
                    } else {
                        //Error
                    }
                } else {
                    //Error
                }
                break;
            case "&&":
                if (val1 instanceof Array && val2 instanceof Array) {
                    if (val1[0] instanceof entorno && val2[0] instanceof entorno) {
                        let res_ent: Array<entorno> = new Array<entorno>()
                        let arr1: { [id: number]: number } = this.getDictionary(val1)
                        let arr2: { [id: number]: number } = this.getDictionary(val2)
                        let res: { [id: number]: number } = {}
                        for (let i in arr1){
                            for (let j in arr2){
                                if (i == j){
                                    res[i] = arr1[i]
                                }
                            }
                        }
                        for (let index in res){
                            for (let n_ent of val1){
                                if (n_ent.tabla["index"].valor == index){
                                    res_ent.push(n_ent)
                                    delete res[index]
                                }
                            }
                        }
                        for (let index in res){
                            for (let n_ent of val2){
                                if (n_ent.tabla["index"].valor == index){
                                    res_ent.push(n_ent)
                                }
                            }
                        }
                        return res_ent
                    } else {
                        //Error
                    }
                } else {
                    //Error
                }
                break;
            case "!":
                if (typeof valU === 'boolean') {
                    return !valU
                } else {
                    //Error
                }
                break;
            default:
                break;
        }
        return null
    }
    getDictionary(entornos: Array<entorno>) {
        let arr: { [id: number]: number } = {}
        for (let ent of entornos) {
            let index = ent.tabla["index"]
            arr[index.valor] = index.valor
        }
        return arr
    }
}