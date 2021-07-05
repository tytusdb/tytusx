import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { simbolo } from "src/clases/ast/simbolo";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";
import select from "src/clases/expresiones/select";

export default class order implements instruccion {
    public accion: variable;
    public linea: number;
    public columna: number;
    public simbol: simbolo;

    constructor(accion, linea, columna) {
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        this.verificaMatch(ent);
        let valor = this.simbol.valor;
        let idx: any = "";
        if (Array.isArray(valor)) {
            valor = valor[0]
            for (let i = 0; i < this.accion.xpath.length; i++) {
                for (let j = 0; j < this.accion.xpath[i].length; j++) {
                    idx = this.accion.xpath[i][j].id;
                }
            }
            /* Ordenamiento burbuja asc */
            let tmp: any;
            for (let i = 0; i < valor.length; i++) {
                for (const key in valor[i]["tabla"]) {
                    let llave = valor[i]["tabla"][key];
                    if (llave.id === idx) {
                        for (let j = 0; j < (valor.length - 1); j++) {
                            for (const llv in valor[j]["tabla"]) {
                                let llave2 = valor[j]["tabla"][llv];
                                if (llave2 !== null && llave2 != undefined) {
                                    if (llave2.id === idx) {
                                        if (valor[j]["tabla"][llv].valor instanceof entorno && valor[j + 1]["tabla"][llv].valor instanceof entorno) {
                                            if (valor[j]["tabla"][llv].valor["tabla"]["valor"].valor > valor[j + 1]["tabla"][llv].valor["tabla"]["valor"].valor) {
                                                tmp = valor[j];
                                                valor[j] = valor[j + 1];
                                                valor[j + 1] = tmp;
                                            }
                                        } else {
                                            if (valor[j]["tabla"][llv].valor > valor[j + 1]["tabla"][llv].valor) {
                                                tmp = valor[j];
                                                valor[j] = valor[j + 1];
                                                valor[j + 1] = tmp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent: entorno) {
        let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
        while (match) {
            let simbol = entXq.getSimbol("var" + ind.toString());
            if (simbol && simbol.valor instanceof variable) {
                if (simbol.valor.id === this.accion.id) {
                    this.simbol = simbol.valor;
                    match = false;
                }
                ind++;
            } else {
                match = false;
                InsertarError("Semantico", `Error, la variable a ordenar ${this.accion.id} no esta definida`, "xquery", this.accion.linea, this.accion.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//order\n`
        console.log("ORDER BY")
        console.log("accion")
        console.log(this.accion)
        let slc: select = this.accion.xpath[0][0]
        console.log("simbol")
        console.log(this.simbol)
        let arr_val = this.simbol.valor
        if (arr_val[arr_val.length - 1] == "xpath") {
            let arr_ent = arr_val[0]
            console.log("ARR ENTORNOS")
            console.log(arr_ent)
            /*console.log("SELECT")
            console.log(slc)*/
            let matches: Array<entorno> = slc.getValor(arr_ent, null)
            slc.traducir(slc.matches, c3d)
            console.log("RESULT")
            console.log(matches)
            let s = { "id": c3d.generateTemp(), "val": c3d.last_stack }
            c3d.main += `\tt${s.id} = ${c3d.last_stack};\t\t//posicion inicio\n`
            //entornos
            c3d.main += `\t//Ordenados\n`
            let up = { "id": c3d.generateTemp(), "val": s.val + 1 }
            c3d.main += `\tt${up.id} = t${s.id} + 1;\t\t//posicion nodos\n`
            let up_pos = { "id": c3d.generateTemp(), "val": c3d.h }
            c3d.main += `\tt${up_pos.id} = H;\t\t//posicion nodos\n`
            for (let ant of arr_ent) {
                let nodo: simbolo = ant.tabla["id"]
                c3d.heap[c3d.h] = nodo.stack
                c3d.main += `\theap[(int)H] = ${nodo.stack};\n`
                c3d.h += 1
                c3d.main += `\tH = H + 1;\n`
            }
            c3d.heap[c3d.h] = -1
            c3d.main += `\theap[(int)H] = -1;\n`
            c3d.h += 1
            c3d.main += `\tH = H + 1;\n`
            //cadenas
            c3d.main += `\t//Por\n`
            let child = { "id": c3d.generateTemp(), "val": s.val + 2 }
            c3d.main += `\tt${child.id} = t${s.id} + 2;\t\t//posicion nodos\n`
            let child_pos = { "id": c3d.generateTemp(), "val": c3d.h }
            c3d.main += `\tt${child_pos.id} = H;\t\t//posicion nodos\n`
            for (let n_ent of matches) {
                let nodo: simbolo = n_ent.tabla["valor"]
                c3d.heap[c3d.h] = nodo.stack
                c3d.main += `\theap[(int)H] = ${nodo.stack};\n`
                c3d.h += 1
                c3d.main += `\tH = H + 1;\n`
            }
            c3d.heap[c3d.h] = -1
            c3d.main += `\theap[(int)H] = -1;\n`
            c3d.h += 1
            c3d.main += `\tH = H + 1;\n`
            c3d.stack[up.val] = up_pos.val
            c3d.stack[child.val] = child_pos.val
            c3d.main += `\tstack[(int)t${up.id}] = t${up_pos.id};\t\t//stack[${up.val}] = ${up_pos.val}\n`
            c3d.main += `\tstack[(int)t${child.id}] = t${child_pos.id};\t\t//stack[${child.val}] = ${child_pos.val}\n`
            //cambio de entorno
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`
            //llamada()
            c3d.main += `\torder();\n`
            c3d.s = c3d.s - c3d.last_stack
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`
            //cambio entorno
            c3d.stack[s.val] = up.val
            c3d.main += `\tstack[(int)t${s.id}] = ${up.val};\n`
            c3d.last_stack += 2
            c3d.t_res = s.id
            /*c3d.heap[c3d.h] = 
            let n_ent = { "id": c3d.generateTemp(), "val": c3d.h }
            c3d.main += `\tt${n_ent.id} = H;\t\t//posicion inicio\n`*/
        }
        //c3d.main += `\t;\n`
        //throw new Error("Method not implemented.");
    }
}