import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import primitivo from "src/clases/expresiones/primitivo";
import select from "src/clases/expresiones/select";
import { expresion } from "src/clases/interfaces/expresion";
import { InsertarError } from "src/reports/ReportController";

export default class variable implements expresion{
    public id:string;
    public xpath:Array<any>;
    public linea:number;
    public columna: number;
    public valor: any = null;

    constructor(id,xpath,linea,columna,valor?){
        this.id = id;
        this.xpath = xpath;
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    getTipo(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
    getValor(ent: entorno, arbol: ast) {
        let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
        let func = entXq.getSimbol("function");
        if(func){
            entXq = func.valor;
        }
        while(match){
            let simbol = entXq.getSimbol("var"+ind.toString());
            if (!simbol){
                simbol = entXq.getSimbol("param"+ind.toString());
            }else{
                if(simbol.id !== this.id){
                    simbol = entXq.getSimbol("param"+ind.toString());
                }
            }
            if(simbol){
                if(simbol.id === this.id){
                    let val = simbol.valor;
                    if (Array.isArray(val) && val[0] instanceof variable){
                        this.valor = val[0].valor;
                    }else if(val instanceof primitivo){
                        this.valor = val.getValor(ent,arbol);
                    }else{
                        this.valor = val
                    }
                    match = false;
                }
                ind++;
            }else{
                this.valor = null;
                match = false;
                InsertarError("Semantico",`Error, la variable ${this.id} no esta definida`,"xquery",this.linea,this.columna);
            }
        }
        return this.valor;
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//variable\n`
        let arr_val = this.valor
        console.log(arr_val)
        if (arr_val.length == 1) {
            let val = arr_val[0]
            if (typeof val === 'number') {
                //guarda numero
                let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
                c3d.main += `\tt${ret.id} = ${c3d.last_stack};\n`
                c3d.stack[ret.id] = val
                c3d.main += `\tstack[(int)t${ret.id}] = ${val};\n`
                c3d.last_stack += 1
                c3d.t_res = ret.id
                return val
            } else {
                let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
                c3d.main += `\tt${ret.id} = ${c3d.last_stack};\n`
                //guarda cadena
                let ini = { "id": c3d.generateTemp(), "val": c3d.h }
                c3d.main += `\tt${ini.id} = H;\n`
                //se guarda caracter por caracter
                for (let i = 0; i < val.length; i++) {
                    c3d.heap[c3d.h] = val.charCodeAt(i)
                    c3d.main += `\theap[(int)H] = ${val.charCodeAt(i)};\t\t//se agrega el caracter H[${c3d.h}] ${val.charAt(i)}\n`
                    c3d.h += 1
                    c3d.main += `\tH = H + 1;\n`
                }
                //se guarda el fin de la cadena
                c3d.heap[c3d.h] = -1
                c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`
                c3d.h += 1
                c3d.main += `\tH = H + 1;\n`
                c3d.stack[ret.id] = ini.val
                c3d.main += `\tstack[(int)t${ret.id}] = ${ini.val};\n`
                c3d.last_stack += 1
                c3d.t_res = ret.id
                return val
            }
        } else {
            if (arr_val[arr_val.length - 1] == "xpath") {
                let slc = arr_val[0]
                console.log(slc)
                for (let i = 0; i < slc.length; i++){
                    console.log(slc[i])
                    slc[i].traducir(slc[i].matches, c3d)
                }
            } else {
                //guarda arreglo
                let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
                c3d.main += `\tt${ret.id} = ${c3d.last_stack};\n`
                let ini = { "id": c3d.generateTemp(), "val": c3d.h }
                c3d.main += `\tt${ini.id} = H;\n`
                //se guarda caracter por caracter
                for (let i = 0; i < arr_val.length; i++) {
                    c3d.heap[c3d.h] = arr_val[i]
                    c3d.main += `\theap[(int)H] = ${arr_val[i]};\t\t//se agrega el caracter H[${c3d.h}] ${arr_val[i]}\n`
                    c3d.h += 1
                    c3d.main += `\tH = H + 1;\n`
                }
                //se guarda el fin del arreglo
                c3d.heap[c3d.h] = -1
                c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`
                c3d.h += 1
                c3d.main += `\tH = H + 1;\n`
                c3d.stack[ret.id] = ini.val
                c3d.main += `\tstack[(int)t${ret.id}] = ${ini.val};\n`
                c3d.last_stack += 1
                c3d.t_res = ret.id
            }
        }
        return null
    }
}