import select from "../expresiones/select";
import { ast } from "./ast";
import { entorno } from "./entorno";

export default class ast_xpath {
    public lista_several: Array<Array<select>>
    public str_result: string
    constructor(lista_several) {
        this.lista_several = lista_several
        this.str_result = ""
    }
    ejecutar(ent: entorno, arbol: ast) {
        let entorno_result: Array<Array<entorno>> = new Array<Array<entorno>>()
        let entorno_temp
        for (let i = 0; i < this.lista_several.length; i++) {
            let slc: Array<select> = this.lista_several[i]
            entorno_temp = ent
            for (let slc_sub of slc) {
                entorno_temp = slc_sub.getValor(entorno_temp, arbol)
            }
            entorno_result.push(entorno_temp)
        }
        for (let n_ent of entorno_result) {
            for (let slc of n_ent) {
                this.getResult(slc, "")
            }
        }
        return this.str_result
    }
    getResult(ent: entorno, str: string) {
        if (ent.tabla["n_etiquetas"].valor == 1) {
            this.str_result += str + "<" + ent.tabla["id"].valor
            this.getParams(ent)
            this.str_result += "/>\n"
        } else {
            this.str_result += str + "<" + ent.tabla["id"].valor
            this.getParams(ent)
            this.str_result += ">\n"
            this.getNodes(ent, str)
            this.getNodeVal(ent, str)
            this.str_result += str + "</" + ent.tabla["id"].valor + ">\n"
        }
    }
    getParams(ent: entorno) {
        for (let key in ent.tabla) {
            let atr = ent.tabla[key]
            if (key.startsWith("atr")) {
                this.str_result += ` ${atr.id}="${atr.valor}"`
            }
        }
    }
    getNodes(ent: entorno, str: string) {
        for (let key in ent.tabla) {
            let hijo = ent.tabla[key]
            if (key.startsWith("hijo")) {
                this.getResult(hijo.valor, str + "\t")
            }
        }
    }
    getNodeVal(ent: entorno, str: string) {
        let val = ent.tabla["valor"]
        if (val != null) {
            this.str_result += str + "\t" + val.valor + "\n"
        }
    }
}