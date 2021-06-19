import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { simbolTabla } from "src/clases/ast/simbolTabla";
import { tipo } from "src/clases/ast/tipo";


export class tablaSimbolos {
    public simbolos: Array<simbolTabla>
    constructor() {
        this.simbolos = new Array<simbolTabla>()
    }

    public getTableSimbolos(ent: entorno) {
        let nodo: simbolTabla
        let actual_ent: simbolo
        if (ent.anterior.tabla["xml"] != null) {
            actual_ent = ent.tabla["id"]
            nodo = new simbolTabla(actual_ent.valor, actual_ent.getTipoStr(), "Global", actual_ent.linea, actual_ent.columna, actual_ent.stack, null)
        } else {
            let anterior = ent.anterior.tabla["id"]
            actual_ent = ent.tabla["id"]
            nodo = new simbolTabla(actual_ent.valor, actual_ent.getTipoStr(), anterior.valor, actual_ent.linea, actual_ent.columna, actual_ent.stack, null)
        }
        this.simbolos.push(nodo)
        let valor = ent.tabla["valor"]
        if (valor != null && !(valor instanceof entorno)) {
            nodo = new simbolTabla(valor.id, valor.getTipoStr(), actual_ent.id, valor.linea, valor.columna, valor.stack, valor.valor)
            this.simbolos.push(nodo)
        }
        for (let key in ent.tabla) {
            if (key.startsWith("atr")) {
                let atr = ent.tabla[key]
                nodo = new simbolTabla(atr.id, atr.getTipoStr(), actual_ent.id, atr.linea, atr.columna, atr.stack, atr.valor)
                this.simbolos.push(nodo)
            } else if (key.startsWith("hijo")) {
                this.getTableSimbolos(ent.tabla[key].valor)
            }
        }
    }
}