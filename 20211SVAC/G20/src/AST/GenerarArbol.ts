import { NodoArbol } from "./NodoArbol"

export class GenerarArbol {
    public id_n: number

    constructor(id_n: number) {
        this.id_n = id_n
    }

    recorrerDOT(nodo: NodoArbol) {
        var concatena = ""
        if (nodo.getid() == 0) {
            nodo.setid(this.id_n)
            this.id_n++
        }

        concatena += `${nodo.getid()} [label = "${nodo.getvalor()}" shape = "oval" ];\n`
        nodo.gethijos().forEach(element => {
            concatena += this.recorrerDOT(element)
        });
        return concatena
    }
}