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
        this.val2 = val2;
        if (val1 instanceof Array) {
            let val = val1[0];
            if (typeof val === 'number') {
                this.index = val1;
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
                        case "lt":
                            if (val1 < val2) {
                                index.push(i);
                            }
                            break;
                        case "le":
                            if (val1 <= val2) {
                                index.push(i);
                            }
                            break;
                        case "gt":
                            if (val1 > val2) {
                                index.push(i);
                            }
                            break;
                        case "ge":
                            if (val1 >= val2) {
                                index.push(i);
                            }
                            break;
                        case "eq":
                            if (val1 == val2) {
                                index.push(i);
                            }
                            break;
                        case "ne":
                            if (val1 != val2) {
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
                this.atr = this.e1.getTipo(ent, arbol);
                this.res_ent = val1;
                if (!this.atr) {
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
            case "lt":
                if (val1 < val2) {
                    return true;
                }
                break;
            case "le":
                if (val1 <= val2) {
                    return true;
                }
                break;
            case "gt":
                if (val1 > val2) {
                    return true;
                }
                break;
                ;
            case "ge":
                if (val1 >= val2) {
                    return true;
                }
                break;
                ;
            case "eq":
                if (val1 == val2) {
                    return true;
                }
                break;
            case "ne":
                if (val1 != val2) {
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }
    traducir(ent, c3d) {
        if (this.index != null) {
            let x = 1;
            //return
            let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack };
            c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion de retorno\n`;
            //posicion return
            c3d.stack[ret.val] = c3d.h;
            c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//H = ${c3d.h}\n`;
            for (let n_ent of ent) {
                //posiciones y parametros: ret[ret] tipo_rel[ret+1] x[ret+2] i[ret + 3] id[ret + 4]
                let tipo = { "id": c3d.generateTemp(), "val": ret.val + 1 };
                c3d.main += `\tt${tipo.id} = t${ret.id} + 1;\t\t//posicion de tipo relacional\n`;
                let param = { "id": c3d.generateTemp(), "val": ret.val + 2 };
                c3d.main += `\tt${param.id} = t${ret.id} + 2;\t\t//posicion de i\n`;
                let i = { "id": c3d.generateTemp(), "val": ret.val + 3 };
                c3d.main += `\tt${i.id} = t${ret.id} + 3;\t\t//posicion de val\n`;
                let id = { "id": c3d.generateTemp(), "val": ret.val + 4 };
                c3d.main += `\tt${id.id} = t${ret.id} + 4;\t\t//posicion de id\n`;
                //guarda valores
                c3d.stack[tipo.val] = this.getNum();
                c3d.main += `\tstack[(int)t${tipo.id}] = ${this.getNum()};\n`;
                c3d.stack[param.val] = x;
                c3d.main += `\tstack[(int)t${param.id}] = ${x};\n`;
                c3d.stack[i.val] = this.val2;
                c3d.main += `\tstack[(int)t${i.id}] = ${this.val2};\n`;
                c3d.stack[id.val] = n_ent.tabla["id"].stack;
                c3d.main += `\tstack[(int)t${id.id}] = ${n_ent.tabla["id"].stack};\n`;
                //cambio de entorno
                c3d.s = c3d.s + c3d.last_stack;
                c3d.main += `\tS = S + ${c3d.last_stack};\n`;
                if (this.compare(x, this.val2)) {
                    let simbol = n_ent.tabla["id"];
                    console.log("AGREGA");
                    console.log(simbol);
                    c3d.heap[c3d.h] = simbol.stack;
                    c3d.h += 1;
                }
                c3d.main += `\texpRel1();\n`;
                c3d.s = c3d.s - c3d.last_stack;
                c3d.main += `\tS = S - ${c3d.last_stack};\n`;
                //actualizacion retorno
                //
                x += 1;
            }
            c3d.t_res = ret.id;
            c3d.last_stack += 5;
        }
        else if (this.res_ent != null) {
            //cadena
            let ini = { "id": c3d.generateTemp(), "val": c3d.h };
            c3d.main += `\tt${ini.id} = H;\t\t//posicion inicio cadena\n`;
            let val2 = this.val2.toString();
            for (let i = 0; i < val2.length; i++) {
                c3d.heap[c3d.h] = val2.charCodeAt(i);
                c3d.main += `\theap[(int)H] = ${val2.charCodeAt(i)};\t\t//se agrega el caracter H[${c3d.h}] ${val2.charAt(i)}\n`;
                c3d.h += 1;
                c3d.main += `\tH = H + 1;\n`;
            }
            //se guarda el fin de la cadena
            c3d.heap[c3d.h] = -1;
            c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`;
            c3d.h += 1;
            c3d.main += `\tH = H + 1;\n`;
            if (this.atr) {
                //return
                let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack };
                c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion de retorno\n`;
                //posicion return
                c3d.stack[ret.val] = c3d.h;
                c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//H = ${c3d.h}\n`;
                for (let n_ent of this.res_ent) {
                    let nodo = n_ent.tabla["id"];
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("atr")) {
                            let atr = n_ent.tabla[key];
                            //posiciones y parametros: ret[ret] tipo_rel[ret+1] id[ret+2] param[ret + 3] id[ret + 4]
                            let tipo = { "id": c3d.generateTemp(), "val": ret.val + 1 };
                            c3d.main += `\tt${tipo.id} = t${ret.id} + 1;\t\t//posicion de tipo relacional\n`;
                            let param = { "id": c3d.generateTemp(), "val": ret.val + 2 };
                            c3d.main += `\tt${param.id} = t${ret.id} + 2;\t\t//posicion de val\n`;
                            let i = { "id": c3d.generateTemp(), "val": ret.val + 3 };
                            c3d.main += `\tt${i.id} = t${ret.id} + 3;\t\t//posicion de val compare\n`;
                            let id = { "id": c3d.generateTemp(), "val": ret.val + 4 };
                            c3d.main += `\tt${id.id} = t${ret.id} + 4;\t\t//posicion de id\n`;
                            //guarda valores
                            c3d.stack[tipo.val] = this.getNum();
                            c3d.main += `\tstack[(int)t${tipo.id}] = ${this.getNum()};\t\t\n`;
                            c3d.stack[param.val] = atr.stack + 1;
                            c3d.main += `\tstack[(int)t${param.id}] = ${atr.stack} + 1;\n`;
                            c3d.stack[i.val] = ini.val;
                            c3d.main += `\tstack[(int)t${i.id}] = t${ini.id};\n`;
                            c3d.stack[id.val] = nodo.stack;
                            c3d.main += `\tstack[(int)t${id.id}] = ${nodo.stack};\n`;
                            //cambio de entorno
                            c3d.s = c3d.s + c3d.last_stack;
                            c3d.main += `\tS = S + ${c3d.last_stack};\n`;
                            c3d.main += `\texpRel2();\n`;
                            c3d.s = c3d.s - c3d.last_stack;
                            c3d.main += `\tS = S - ${c3d.last_stack};\n`;
                            //actualizacion retorno
                            if (this.compare(atr.valor, this.val2.toString())) {
                                c3d.heap[c3d.h] = nodo.stack;
                                c3d.h += 1;
                            }
                        }
                    }
                }
                c3d.t_res = ret.id;
            }
            else {
                //return
                let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack };
                c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion de retorno\n`;
                //posicion return
                c3d.stack[ret.val] = c3d.h;
                c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//H = ${c3d.h}\n`;
                for (let n_ent of this.res_ent) {
                    let anterior = n_ent.anterior;
                    let simbol = n_ent.tabla["valor"];
                    if (simbol != null) {
                        //posiciones y parametros: ret[ret] tipo_rel[ret+1] id[ret+2] param[ret + 3] id[ret + 4]
                        let tipo = { "id": c3d.generateTemp(), "val": ret.val + 1 };
                        c3d.main += `\tt${tipo.id} = t${ret.id} + 1;\t\t//posicion de tipo relacional\n`;
                        let param = { "id": c3d.generateTemp(), "val": ret.val + 2 };
                        c3d.main += `\tt${param.id} = t${ret.id} + 2;\t\t//posicion de val\n`;
                        let i = { "id": c3d.generateTemp(), "val": ret.val + 3 };
                        c3d.main += `\tt${i.id} = t${ret.id} + 3;\t\t//posicion de val compare\n`;
                        let id = { "id": c3d.generateTemp(), "val": ret.val + 4 };
                        c3d.main += `\tt${id.id} = t${ret.id} + 4;\t\t//posicion de id\n`;
                        //guarda valores
                        c3d.stack[tipo.val] = this.getNum();
                        c3d.main += `\tstack[(int)t${tipo.id}] = ${this.getNum()};\t\t\n`;
                        c3d.stack[param.val] = simbol.stack;
                        c3d.main += `\tstack[(int)t${param.id}] = ${simbol.stack};\n`;
                        c3d.stack[i.val] = ini.val;
                        c3d.main += `\tstack[(int)t${i.id}] = t${ini.id};\n`;
                        c3d.stack[id.val] = anterior.tabla["id"].stack;
                        c3d.main += `\tstack[(int)t${id.id}] = ${anterior.tabla["id"].stack};\n`;
                        //cambio de entorno
                        c3d.s = c3d.s + c3d.last_stack;
                        c3d.main += `\tS = S + ${c3d.last_stack};\n`;
                        c3d.main += `\texpRel2();\n`;
                        c3d.s = c3d.s - c3d.last_stack;
                        c3d.main += `\tS = S - ${c3d.last_stack};\n`;
                        //actualizacion retorno
                        if (this.compare(simbol.valor, this.val2.toString())) {
                            c3d.heap[c3d.h] = anterior.tabla["id"].stack;
                            c3d.h += 1;
                        }
                    }
                }
                c3d.t_res = ret.id;
            }
        }
        c3d.last_stack += 4;
        c3d.heap[c3d.h] = -1;
        c3d.h += 1;
    }
    getNum() {
        switch (this.operador) {
            case "<":
                return 1;
            case "<=":
                return 2;
            case ">":
                return 3;
            case ">=":
                return 4;
            case "=":
                return 5;
            case "!=":
                return 6;
            case "lt":
                return 7;
            case "le":
                return 8;
            case "gt":
                return 9;
            case "ge":
                return 10;
            case "eq":
                return 11;
            case "ne":
                return 12;
            default:
                break;
        }
        return -1;
    }
    /* relacional para ifs */
    getValorX(ent, arbol) {
        let val1 = this.e1.getValor(ent, arbol);
        let val2 = this.e2.getValor(ent, arbol);
        switch (this.operador) {
            case "<":
                if (val1 < val2) {
                    return true;
                }
                return false;
            case "<=":
                if (val1 <= val2) {
                    return true;
                }
                return false;
            case ">":
                if (val1 > val2) {
                    return true;
                }
                return false;
            case ">=":
                if (val1 >= val2) {
                    return true;
                }
                return false;
            case "=":
                if (val1 == val2) {
                    return true;
                }
                return false;
            case "!=":
                if (val1 != val2) {
                    return true;
                }
                return false;
            case "lt":
                if (val1 < val2) {
                    return true;
                }
                return false;
            case "le":
                if (val1 <= val2) {
                    return true;
                }
                return false;
            case "gt":
                if (val1 > val2) {
                    return true;
                }
                return false;
            case "ge":
                if (val1 >= val2) {
                    return true;
                }
                return false;
            case "eq":
                if (val1 == val2) {
                    return true;
                }
                return false;
            case "ne":
                if (val1 != val2) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}
//# sourceMappingURL=relacional.js.map