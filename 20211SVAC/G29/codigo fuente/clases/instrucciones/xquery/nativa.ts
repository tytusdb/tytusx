import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";

export default class nativa implements instruccion {
    public id: string;
    public accion: any;
    public linea: number;
    public columna: number;
    public str
    public result
    public i_ini: number
    public i_fin: number

    constructor(id: string, accion, linea, columna) {
        this.id = id.toLocaleLowerCase();
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        let entXml:any = null;
        if(Object.prototype.hasOwnProperty.call(ent.tabla,"xml")){
            entXml = ent.tabla["xml"].valor;
        }
        if (this.id === "upper-case") {
            if (!(this.accion[0] instanceof variable)) {
                this.str = this.accion[0].getValor(ent, arbol);
                this.result = this.str.toUpperCase();
                return this.result;
            } else {
                //xpath
                this.getXpathVal("upper-case",entXml,arbol)
                return this.result;
            }
        } else if (this.id === "lower-case") {
            if (!(this.accion[0] instanceof variable)) {
                this.str = this.accion[0].getValor(ent, arbol);
                this.result = this.str.toLowerCase();
                return this.result;
            } else {
                //xpath
                this.getXpathVal("lower-case",entXml,arbol)
                return this.result;
            }
        } else if (this.id === "tostring") {
            if (!(this.accion[0] instanceof variable)) {
                this.str = this.accion[0].getValor(ent, arbol);
                this.result = this.str.toString();
                return this.result;
            } else {
                //xpath
                this.getXpathVal("tostring",entXml,arbol);
                return this.result;
            }
        } else if (this.id === "number") {
            if (!(this.accion[0] instanceof variable)) {
                this.str = this.accion[0].getValor(ent, arbol);
                try {
                    this.result = Number(this.str);
                    return this.result
                } catch (error) {
                    InsertarError("Semantico", `Error, el dato ${this.str} no se puede convertir a number`, "xquery", this.accion[0].linea, this.accion[0].columna);
                }
            } else {
                //xpath
                this.getXpathVal("number",entXml,arbol);
                return this.result;
            }
        } else if (this.id === "substring") {
            if (!(this.accion[0] instanceof variable)) {
                this.str = this.accion[0].getValor(ent, arbol);
                this.i_ini = Number(this.accion[1].getValor(ent, arbol))
                this.i_fin = Number(this.accion[2].getValor(ent, arbol))
                this.result = this.str.substring(this.i_ini, this.i_fin);
                return this.result;
            } else {
                //xpath
                if(this.accion[0].xpath.length > 0){
                    this.i_ini = Number(this.accion[1].getValor(ent, arbol))
                    this.i_fin = Number(this.accion[2].getValor(ent, arbol))
                    this.getXpathVal("substring",entXml,arbol,this.i_ini,this.i_fin)
                    return this.result;
                }
            }

        } else if (this.id.toLowerCase() === "data") {
            if (this.accion[0] instanceof variable){
                if(this.accion[0].xpath.length > 0){
                    let entorno_temp;
                    let retxpa = new Array<Array<entorno>>()
                    for (let j = 0; j < this.accion[0].xpath.length; j++) {
                        let slc = this.accion[0].xpath[j]
                        entorno_temp = entXml
                        for (let slc_sub of slc) {
                            entorno_temp = slc_sub.getValor(entorno_temp, arbol)
                        }
                        retxpa.push(entorno_temp)
                    }
                    this.str = "";
                    for(let i = 0; i < retxpa[0].length; i++){
                        if(Object.prototype.hasOwnProperty.call(retxpa[0][i]["tabla"],"valor")){
                            let valAux = retxpa[0][i]["tabla"].valor
                            if(!(valAux.valor instanceof entorno)){
                                this.str += valAux.valor.toString() + "\n";
                            }else{
                                InsertarError("Semantico",`Error, el dato a buscar no es un valor`,"xquery",this.accion[0].linea,this.accion[0].columna);
                            }
                        }else{
                            for (const key in retxpa[0][i]["tabla"]) {
                                if (Object.prototype.hasOwnProperty.call(retxpa[0][i]["tabla"], key)) {
                                    if(key.startsWith("hijo")){
                                        this.str += retxpa[0][i]["tabla"][key].valor["tabla"].valor.valor.toString() + "\n";
                                    }
                                }
                            }
                        }
                    }
                    this.result = this.str;
                    return this.result;
                }
            }
        } else {
            InsertarError("Semantico", `Error, la funcion nativa ${this.id} no existe`, "xquery", this.linea, this.columna);
            return this.result;
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//nativa\n`
        console.log("NATIVA: " + this.id)
        console.log(this.str)
        this.str = this.str.toString()
        let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
        c3d.main += `\tt${ret.id} = ${c3d.last_stack};\n`
        let ini = { "id": -1, "val": -1 }
        let pos = { "id": -1, "val": -1 }
        let index: number = -1
        //guarda cadena
        ini = { "id": c3d.generateTemp(), "val": c3d.h }
        c3d.main += `\tt${ini.id} = H;\n`
        //se guarda caracter por caracter
        for (let i = 0; i < this.str.length; i++) {
            c3d.heap[c3d.h] = this.str.charCodeAt(i)
            c3d.main += `\theap[(int)H] = ${this.str.charCodeAt(i)};\t\t//se agrega el caracter H[${c3d.h}] ${this.str.charAt(i)}\n`
            c3d.h += 1
            c3d.main += `\tH = H + 1;\n`
        }
        //se guarda el fin de la cadena
        c3d.heap[c3d.h] = -1
        c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`
        c3d.h += 1
        c3d.main += `\tH = H + 1;\n`
        switch (this.id) {
            case "upper-case":
                //la siguiente posicion disponible string
                pos = { "id": c3d.generateTemp(), "val": ret.val + 1 }
                c3d.main += `\tt${pos.id} = t${ret.id} + 1;\t\t//La siguiente posicion string\n`
                //se guarda la posicion (heap) del string
                c3d.stack[pos.val] = ini.val
                c3d.main += `\tstack[(int)t${pos.id}] = t${ini.id};\t\t//guarda stack del string: stack[${pos.val}] = ${ini.val}\n`
                c3d.temp[pos.id] = pos.val
                //se cambia de entorno
                c3d.s = c3d.s + c3d.last_stack
                c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`
                //llamada()
                c3d.main += `\tupperCase();\n`
                c3d.s = c3d.s - c3d.last_stack
                c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                index = ini.val
                while (true) {
                    if (c3d.heap[index] == -1) {
                        break
                    } else {
                        if (c3d.heap[index] >= 97 && c3d.heap[index] <= 120) {
                            let val: number = c3d.heap[index]
                            c3d.heap[index] = val - 32
                        }
                        index += 1
                    }
                }
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                c3d.stack[ret.val] = ini.val
                c3d.main += `\tstack[(int)t${ret.id}] = ${ini.val};\n`
                c3d.last_stack += 2
                c3d.t_res = ret.id
                break;
            case "lower-case":
                //la siguiente posicion disponible string
                pos = { "id": c3d.generateTemp(), "val": ret.val + 1 }
                c3d.main += `\tt${pos.id} = t${ret.id} + 1;\t\t//La siguiente posicion string\n`
                //se guarda la posicion (heap) del string
                c3d.stack[pos.val] = ini.val
                c3d.main += `\tstack[(int)t${pos.id}] = t${ini.id};\t\t//guarda stack del string: stack[${pos.val}] = ${ini.val}\n`
                c3d.temp[pos.id] = pos.val
                //se cambia de entorno
                c3d.s = c3d.s + c3d.last_stack
                c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`
                //llamada()
                c3d.main += `\tupperCase();\n`
                c3d.s = c3d.s - c3d.last_stack
                c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                index = ini.val
                while (true) {
                    if (c3d.heap[index] == -1) {
                        break
                    } else {
                        if (c3d.heap[index] >= 65 && c3d.heap[index] <= 90) {
                            let val: number = c3d.heap[index]
                            c3d.heap[index] = val + 32
                        }
                        index += 1
                    }
                }
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                c3d.stack[ret.val] = ini.val
                c3d.main += `\tstack[(int)t${ret.id}] = ${ini.val};\n`
                c3d.last_stack += 2
                c3d.t_res = ret.id
                break;
            case "tostring":
                console.log(`stack[${ret.val}]=${ini.val}`)
                c3d.stack[ret.val] = ini.val
                c3d.main += `\tstack[(int)t${ret.id}] = t${ini.id};\n`
                c3d.last_stack += 1
                break;
            case "number":
                c3d.stack[ret.val] = this.result
                c3d.main += `\tstack[(int)t${ret.id}] = ${this.result};\n`
                c3d.last_stack += 1
                c3d.t_res = ret.id
                break;
            case "substring":
                //la siguiente posicion disponible string
                pos = { "id": c3d.generateTemp(), "val": ret.val + 1 }
                let t2 = { "id": c3d.generateTemp(), "val": ret.val + 2 }
                let t3 = { "id": c3d.generateTemp(), "val": ret.val + 3 }
                c3d.main += `\tt${pos.id} = t${ret.id} + 1;\t\t//S + 1: ini\n`
                c3d.main += `\tt${t2.id} = t${ret.id} + 2;\t\t//S + 2: fin\n`
                c3d.main += `\tt${t3.id} = t${ret.id} + 3;\t\t//S + 3: posh\n`
                //se guarda la posicion (heap) del string
                c3d.stack[pos.val] = this.i_ini
                c3d.main += `\tstack[(int)t${pos.id}] = ${this.i_ini};\t\t//guarda stack del string: stack[${pos.val}] = ${this.i_ini}\n`
                c3d.stack[t2.val] = this.i_fin
                c3d.main += `\tstack[(int)t${t2.id}] = ${this.i_fin};\t\t//guarda stack del string: stack[${t2.val}] = ${this.i_fin}\n`
                c3d.stack[t3.val] = ini.val
                c3d.main += `\tstack[(int)t${t3.id}] = t${ini.id};\t\t//guarda stack del string: stack[${t3.val}] = ${ini.val}\n`
                //se cambia de entorno
                c3d.s = c3d.s + c3d.last_stack
                c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`
                //llamada()
                c3d.main += `\tsubString();\n`
                c3d.s = c3d.s - c3d.last_stack
                c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                c3d.heap[ini.val] = ini.val + this.i_ini
                c3d.heap[ini.val + this.i_fin] = -1
                c3d.stack[ret.val] = ini.val + this.i_ini
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                c3d.last_stack += 4
                c3d.t_res = ret.id
                break;
            default:
                break;
        }
        return this.result
    }

    getXpathVal(instruc:string,entXml:entorno,arbol:ast,iini?:number,ifin?:number){
        if(this.accion[0].xpath.length > 0){
            let entorno_temp;
            let retxpa = new Array<Array<entorno>>()
            for (let j = 0; j < this.accion[0].xpath.length; j++) {
                let slc = this.accion[0].xpath[j]
                entorno_temp = entXml
                for (let slc_sub of slc) {
                    entorno_temp = slc_sub.getValor(entorno_temp, arbol)
                }
                retxpa.push(entorno_temp)
            }
            if(retxpa.length === 1 && retxpa[0].length === 1){
                let valAux = retxpa[0][0]["tabla"].valor
                if(!(valAux.valor instanceof entorno)){
                    this.str = valAux.valor;

                    if(instruc === "upper-case"){
                        this.result = this.str.toUpperCase();
                    }else if(instruc === "lower-case"){
                        this.result = this.str.toLowerCase();
                    }else if(instruc === "number"){
                        try {
                            this.result = Number(this.str);
                        } catch (error) {
                            InsertarError("Semantico", `Error, el dato ${this.str} no se puede convertir a number`, "xquery", this.accion[0].linea, this.accion[0].columna);
                        }
                    }else if(instruc === "tostring"){
                        this.result = this.str.toString();
                    }else if(instruc === "substring"){
                        this.result = this.str.substring(iini,ifin);
                    }

                    
                }else{
                    InsertarError("Semantico",`Error, el dato a buscar no es un valor`,"xquery",this.accion[0].linea,this.accion[0].columna);
                }
            }
        }
    }
}