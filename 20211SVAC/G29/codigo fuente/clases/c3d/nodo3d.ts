import { entorno } from "../ast/entorno"
import { simbolo } from "../ast/simbolo"

export class nodo3d {
    public code: string
    public header: string
    public main: string
    public funciones: string
    public t: number
    public s: number
    public h: number
    public last_stack: number
    public temp: { [id: number]: number }
    public stack: { [id: number]: number }
    public heap: { [id: number]: number }
    constructor() {
        this.code = ""
        this.header = `/*------HEADER------*/
#include <stdio.h>
#include <math.h>\n
double heap[30101999];
double stack[30101999];
double P;
double H;\n`
        this.main = `/*------MAIN------*/
void main() {
\tP = 0; H = 0;\n`
        this.funciones = ""
        this.t = 0
        this.s = 0
        this.h = 0
        this.last_stack = 0
        this.stack = {}
        this.heap = {}
        this.temp = {}
    }
    addRoot() {
        this.stack[this.last_stack] = 0
        this.main += `\tstack[(int)${this.last_stack}] = 0;\t\t// se agrega nodo raiz\n`
        this.last_stack += 1
    }
    addNodo(ent: entorno) {
        this.stack[this.last_stack] = 0
        this.main += `\n\tstack[(int)${this.last_stack}] = 0;\t\t// se agrega nodo "${ent.tabla["id"].valor}"\n`
        ent.tabla["id"].stack = this.last_stack
        this.last_stack += 1
    }
    addAtr(simbol: simbolo) {
        this.main += `\t//se añade el atributo ${simbol.id}\n`
        let ini = { "id": this.generateTemp(), "val": this.h }
        this.main += `\tt${ini.id} = H;\n`
        //se guarda caracter por caracter
        let atr: string = simbol.valor
        for (let i = 0; i < atr.length; i++) {
            this.heap[this.h] = atr.charCodeAt(i)
            this.main += `\theap[(int)H] = ${atr.charCodeAt(i)};\t\t//se agrega el caracter ${atr.charAt(i)}\n`
            this.h += 1
            this.main += `\tH = H + 1;\n`
        }
        //se guarda el fin de la cadena
        this.heap[ini.val] = -1
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos\n`
        this.h += 1
        this.main += `\tH = H + 1;\n`
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`
        simbol.stack = ini.val
        this.last_stack += 1
        this.temp[ini.id] = ini.val
    }
    addVal(simbol: simbolo) {
        this.main += `\t// se añade el valor ${simbol.id}\n`
        let ini = { "id": this.generateTemp(), "val": this.h }
        this.main += `\tt${ini.id} = H;\n`
        //se guarda caracter por caracter
        let atr: string = simbol.valor
        for (let i = 0; i < atr.length; i++) {
            this.heap[this.h] = atr.charCodeAt(i)
            this.main += `\theap[(int)H] = ${atr.charCodeAt(i)};\t\t//se agrega el caracter ${atr.charAt(i)}\n`
            this.h += 1
            this.main += `\tH = H + 1;\n`
        }
        //se guarda el fin de la cadena
        this.heap[ini.val] = -1
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos\n`
        this.h += 1
        this.main += `\tH = H + 1;\n`
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`
        simbol.stack = ini.val
        this.last_stack += 1
        this.temp[ini.id] = ini.val
    }
    endCode() {
        this.declareTemps()
        this.code = this.header
        this.code += this.main
        this.code += '\treturn;\n}'
        this.code += this.funciones
    }
    generateTemp() {
        let temporal = this.t
        this.temp[this.t] = -1
        this.t += 1
        return temporal
    }
    declareTemps() {
        let temps: string = `double`
        for (let key in this.temp){
            temps += ` t${key},`
        }
        temps = temps.slice(0,temps.length-1)
        temps += ";\n"
        this.header += temps
    }
}