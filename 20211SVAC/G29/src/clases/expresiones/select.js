import { tipo } from "../ast/tipo";
export default class select {
    constructor(tipe, id, atr, linea, columna) {
        this.tipe = tipe;
        this.id = id;
        this.atr = atr;
        this.linea = linea;
        this.columna = columna;
        this.matches = new Array();
    }
    getTipo(ent, arbol) {
        return tipo.STRUCT;
    }
    getValor(ent, arbol) {
        if (this.tipe == "//" && this.id != "*" && this.atr == false) {
            this.lookAllNodes(ent, arbol);
        }
        else if (this.tipe == "/" && this.id != "*" && this.atr == false) {
            this.lookAtPath(ent, arbol);
        }
        else if (this.tipe == "//" && this.id != null && this.atr == true) {
            this.lookAllParams(ent, arbol);
        }
        else if (this.tipe == "/" && this.id != null && this.atr == true) {
            this.lookParamsAtPath(ent, arbol);
        }
        else if (this.tipe == "//" && this.id == "*" && this.atr == false) {
            this.lookAllUnknown(ent, arbol);
        }
        else if (this.tipe == "/" && this.id == "*" && this.atr == false) {
            this.lookAtUnkown(ent, arbol);
        }
        else if (this.tipe == "//" && this.id == null && this.atr == true) {
            this.lookAllUnknownP(ent, arbol);
        }
        else if (this.tipe == "/" && this.id == null && this.atr == true) {
            this.lookAtUnknownP(ent, arbol);
        }
        else {
            console.log("NO MATCH");
        }
        return this.matches;
    }
    lookAllNodes(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let simbol = n_ent.tabla["id"];
                if (simbol.valor == this.id) {
                    //Encontrar valor
                    this.matches.push(n_ent);
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key];
                            this.lookAllNodes(hijo.valor, arbol);
                        }
                    }
                }
                else {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key];
                            this.lookAllNodes(hijo.valor, arbol);
                        }
                    }
                }
            }
        }
        else {
            let simbol = ent.tabla["id"];
            if (simbol.valor == this.id) {
                //Encontrar valor
                this.matches.push(ent);
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key];
                        this.lookAllNodes(hijo.valor, arbol);
                    }
                }
            }
            else {
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key];
                        this.lookAllNodes(hijo.valor, arbol);
                    }
                }
            }
        }
    }
    lookAtPath(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = n_ent.tabla[key];
                        if (hijo.id == this.id) {
                            //Encontrar valor
                            this.matches.push(hijo.valor);
                        }
                    }
                }
            }
        }
        else {
            let simbol = ent.tabla["id"];
            if (simbol.valor == this.id) {
                //Encontrar valor
                this.matches.push(ent);
            }
        }
    }
    lookAllParams(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        let atr = n_ent.tabla[key];
                        if (atr.id == this.id) {
                            this.matches.push(n_ent);
                        }
                    }
                    else if (key.startsWith("hijo")) {
                        let hijo = n_ent.tabla[key];
                        this.lookAllParams(hijo.valor, arbol);
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    let atr = ent.tabla[key];
                    if (atr.id == this.id) {
                        this.matches.push(ent);
                    }
                }
                else if (key.startsWith("hijo")) {
                    let hijo = ent.tabla[key];
                    this.lookAllParams(hijo.valor, arbol);
                }
            }
        }
    }
    lookParamsAtPath(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        let atr = n_ent.tabla[key];
                        if (atr.id == this.id) {
                            this.matches.push(n_ent);
                        }
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    let atr = ent.tabla[key];
                    if (atr.id == this.id) {
                        this.matches.push(ent);
                    }
                }
            }
        }
    }
    lookAllUnknown(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo = n_ent.tabla[key];
                    if (key.startsWith("hijo")) {
                        this.matches.push(hijo.valor);
                        this.lookAllUnknown(hijo.valor, arbol);
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                let hijo = ent.tabla[key];
                if (key.startsWith("hijo")) {
                    this.matches.push(hijo.valor);
                    this.lookAllUnknown(hijo.valor, arbol);
                }
            }
        }
    }
    lookAtUnkown(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo = n_ent.tabla[key];
                    if (key.startsWith("hijo")) {
                        this.matches.push(hijo.valor);
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                let hijo = ent.tabla[key];
                if (key.startsWith("hijo")) {
                    this.matches.push(hijo.valor);
                }
            }
        }
    }
    lookAllUnknownP(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo = n_ent.tabla[key];
                    if (key.startsWith("atr")) {
                        this.matches.push(n_ent);
                    }
                    else if (key.startsWith("hijo")) {
                        this.lookAllUnknownP(hijo.valor, arbol);
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                let hijo = ent.tabla[key];
                if (key.startsWith("atr")) {
                    this.matches.push(ent);
                }
                else if (key.startsWith("hijo")) {
                    this.lookAllUnknownP(hijo.valor, arbol);
                }
            }
        }
    }
    lookAtUnknownP(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        this.matches.push(n_ent);
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    this.matches.push(ent);
                }
            }
        }
    }
    traducir(ent, c3d) {
        c3d.main += `\t/* ini select */\n`;
        //posiciones parametros tipe
        let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack };
        c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion return\n`;
        let pos = { "id": c3d.generateTemp(), "val": ret.val + 1 };
        c3d.main += `\tt${pos.id} = t${ret.id} + 1;\t\t//El ultimo stack disponible\n`;
        //ini cadena
        c3d.main += `\t// se añade la cadena ${this.id}\n`;
        let ini = { "id": c3d.generateTemp(), "val": c3d.h };
        c3d.main += `\tt${ini.id} = H;\n`;
        for (let i = 0; i < this.id.length; i++) { //se guarda caracter por caracter
            c3d.heap[c3d.h] = this.id.charCodeAt(i);
            c3d.main += `\theap[(int)H] = ${this.id.charCodeAt(i)};\t\t//se agrega el caracter H[${c3d.h}] ${this.id.charAt(i)}\n`;
            c3d.h += 1;
            c3d.main += `\tH = H + 1;\n`;
        }
        c3d.heap[c3d.h] = -1; //se guarda el fin de la cadena
        c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`;
        c3d.h += 1;
        c3d.main += `\tH = H + 1;\n`;
        //se guarda la referencia al heap en el stack
        c3d.stack[pos.val] = ini.val;
        c3d.main += `\tstack[(int)t${pos.id}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack: stack[${pos.val}] = ${ini.val}\n`;
        c3d.temp[ini.id] = ini.val;
        c3d.temp[pos.id] = pos.val;
        c3d.temp[ret.id] = ret.val;
        //end cadena
        //c3d.addStr(this.id, pos.val)
        c3d.stack[ret.val] = c3d.h;
        c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//posicion del retorno stack[${ret.val}]\n`;
        //traduccion select
        if (this.atr == false) { //     /nombre | /*
            this.lookNodes3D(ent, c3d, ret.id);
        }
        else if (this.atr == true) { //     /@atr | /@*
            this.lookParams3D(ent, c3d, ret.id);
        }
        else {
            console.log("NO MATCH");
        }
        c3d.main += `\t/* fin select */\n`;
        c3d.t_res = ret.id;
    }
    lookNodes3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini look nodes */\n`;
        for (let n_ent of ent) {
            let simbol = n_ent.tabla["id"];
            let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
            //la siguiente posicion disponible id xml
            let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
            c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1;
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml: stack[${pos.val}] = ${simbol.stack} + 1\n`;
            c3d.temp[pos.id] = pos.val;
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack;
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
            //llamada()
            c3d.main += `\tmatchId();\n`;
            c3d.s = c3d.s - c3d.last_stack;
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
            if (this.id == "*") {
                //SE GUARDA EL VALOR
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
                //console.log("MATCH " + c3d.heap[c3d.h])
            }
            if (simbol.valor == this.id) {
                //SE GUARDA EL VALOR
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
                //console.log("MATCH " + c3d.heap[c3d.h])
            }
        }
        c3d.heap[c3d.h] = -1;
        c3d.h += 1;
        c3d.main += `\theap[(int)H] = -1;\t\t//fin del select\n`;
        c3d.main += `\tH = H + 1;\t\t//siguiente espacio en heap\n`;
        c3d.last_stack += 3;
        c3d.main += `\t/* fin look nodes */\n`;
    }
    lookParams3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini look params */\n`;
        for (let n_ent of ent) {
            let id = n_ent.tabla["id"];
            for (let key in n_ent.tabla) {
                if (key.startsWith("atr")) {
                    //retorno
                    let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
                    //seleccion del atributo
                    let simbol = n_ent.tabla[key];
                    let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
                    //la siguiente posicion disponible param xml
                    c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion param xml\n`;
                    //se guarda la posicion (heap) del param
                    c3d.stack[pos.val] = simbol.stack;
                    c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack};\t\t//guarda stack del param xml: stack[${pos.val}] = ${simbol.stack} \n`;
                    //la siguiente posicion disponible id xml
                    //pos.val = pos.val + 1
                    pos.val += 1;
                    c3d.main += `\tt${pos.id} = t${pos.id} + 3;\t\t//La siguiente posicion id xml\n`;
                    //se guarda la posicion (heap) del param
                    c3d.stack[pos.val] = simbol.stack;
                    c3d.main += `\tstack[(int)t${pos.id}] = ${id.stack};\t\t//guarda stack del id xml: stack[${pos.val}] = ${id.stack} \n`;
                    c3d.temp[pos.id] = pos.val;
                    //se cambia de entorno
                    c3d.s = c3d.s + c3d.last_stack;
                    c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
                    //llamada()
                    c3d.main += `\tmatchAtr();\n`;
                    c3d.s = c3d.s - c3d.last_stack;
                    c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
                    if (this.id == "*") {
                        //SE GUARDA EL VALOR
                        c3d.heap[c3d.h] = simbol.stack;
                        c3d.h += 1;
                        break;
                        //console.log("MATCH " + c3d.heap[c3d.h])
                    }
                    if (simbol.id == this.id) {
                        //SE GUARDA EL VALOR
                        c3d.heap[c3d.h] = simbol.stack;
                        c3d.h += 1;
                        break;
                        //console.log("MATCH " + c3d.heap[c3d.h])
                    }
                }
            }
        }
        c3d.heap[c3d.h] = -1;
        c3d.h += 1;
        c3d.main += `\theap[(int)H] = -1;\t\t//fin del select\n`;
        c3d.main += `\tH = H + 1;\t\t//siguiente espacio en heap\n`;
        c3d.last_stack += 4;
        c3d.main += `\t/* fin look params */\n`;
    }
}
//# sourceMappingURL=select.js.map