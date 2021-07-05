import { tipo } from "src/clases/ast/tipo";
export default class axes {
    constructor(tipe, axe, id, linea, columna) {
        this.tipe = tipe;
        this.axe = axe.toLocaleLowerCase();
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.matches = Array();
        this.index = {};
    }
    getTipo(ent, arbol) {
        return tipo.STRUCT;
    }
    getValor(ent, arbol) {
        if (this.tipe == "/" && this.axe == "ancestor") {
            this.getAncestor(ent, arbol, true, false);
        }
        else if (this.tipe == "//" && this.axe == "ancestor") {
            this.getAncestor(ent, arbol, true, false);
        }
        else if (this.tipe == "/" && this.axe == "ancestor_or_self") {
            this.getAncestor(ent, arbol, false, true);
        }
        else if (this.tipe == "//" && this.axe == "ancestor_or_self") {
            this.getAncestor(ent, arbol, true, false);
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "/" && this.axe == "attribute") {
            this.getAtr(ent, arbol, false);
        }
        else if (this.tipe == "//" && this.axe == "attribute") {
            this.getAtr(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "child") {
            this.getChild(ent, arbol, false);
        }
        else if (this.tipe == "//" && this.axe == "child") {
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "descendant") {
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "//" && this.axe == "descendant") {
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "descendant_or_self") {
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "//" && this.axe == "descendant_or_self") {
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "/" && this.axe == "self") {
            this.getSelf(ent, arbol);
        }
        else if (this.tipe == "//" && this.axe == "self") {
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "/" && this.axe == "parent") {
            this.getAncestor(ent, arbol, false, false);
        }
        else if (this.tipe == "//" && this.axe == "parent") {
            this.getAncestor(ent, arbol, true, false);
        }
        else if (this.tipe == "/" && this.axe == "node()") {
            this.getSelf(ent, arbol);
        }
        else if (this.tipe == "//" && this.axe == "node()") {
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "//" && this.axe == "..") {
            this.getAncestor(ent, arbol, true, false);
            this.getChildSelf(ent, arbol);
        }
        else if (this.tipe == "/" && this.axe == "following_sibling") {
            this.getFollowing(ent, arbol, false);
        }
        else if (this.tipe == "//" && this.axe == "following_sibling") {
            this.getFollowing(ent, arbol, false);
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "following") {
            this.getFollowing(ent, arbol, true);
        }
        else if (this.tipe == "//" && this.axe == "following") {
            this.getFollowing(ent, arbol, true);
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "preceding_sibling") {
            this.getPreciding(ent, arbol, false);
        }
        else if (this.tipe == "//" && this.axe == "preceding_sibling") {
            this.getPreciding(ent, arbol, false);
            this.getChild(ent, arbol, true);
        }
        else if (this.tipe == "/" && this.axe == "preceding") {
            this.getPreciding(ent, arbol, true);
        }
        else if (this.tipe == "//" && this.axe == "preceding") {
            this.getPreciding(ent, arbol, true);
            this.getChild(ent, arbol, true);
        }
        return this.matches;
    }
    getAncestor(ent, arbol, all, self) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                if (self) {
                    if (this.id == "*") {
                        let index = n_ent.tabla["index"].valor;
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(n_ent);
                        }
                    }
                    else {
                        let simbol = n_ent.tabla["id"];
                        if (simbol.valor == this.id) {
                            let index = n_ent.tabla["index"].valor;
                            if (this.index[index] == null) {
                                this.index[index] = index;
                                this.matches.push(n_ent);
                            }
                        }
                    }
                }
                let anterior = n_ent.anterior;
                if (anterior.tabla["xml"] == null) {
                    if (this.id == "*") {
                        let index = anterior.tabla["index"].valor;
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(anterior);
                        }
                    }
                    else {
                        let simbol = anterior.tabla["id"];
                        if (simbol.valor == this.id) {
                            let index = anterior.tabla["index"].valor;
                            if (this.index[index] == null) {
                                this.index[index] = index;
                                this.matches.push(anterior);
                            }
                        }
                    }
                    if (all) {
                        this.getAncestor(anterior, arbol, all, self);
                    }
                }
            }
        }
        else {
            if (self) {
                if (this.id == "*") {
                    let index = ent.tabla["index"].valor;
                    if (this.index[index] == null) {
                        this.index[index] = index;
                        this.matches.push(ent);
                    }
                }
                else {
                    let simbol = ent.tabla["id"];
                    if (simbol.valor == this.id) {
                        let index = ent.tabla["index"].valor;
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(ent);
                        }
                    }
                }
            }
            let anterior = ent.anterior;
            if (anterior.tabla["xml"] == null) {
                if (this.id == "*") {
                    let index = anterior.tabla["index"].valor;
                    if (this.index[index] == null) {
                        this.index[index] = index;
                        this.matches.push(anterior);
                    }
                }
                else {
                    let simbol = anterior.tabla["id"];
                    if (simbol.valor == this.id) {
                        let index = anterior.tabla["index"].valor;
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(anterior);
                        }
                    }
                }
                if (all) {
                    this.getAncestor(anterior, arbol, all, self);
                }
            }
        }
    }
    getAtr(ent, arbol, all) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        if (this.id == "*") {
                            this.matches.push(n_ent);
                            break;
                        }
                        let simbol = n_ent.tabla[key];
                        if (simbol.id == this.id) {
                            this.matches.push(n_ent);
                            break;
                        }
                    }
                }
                if (all) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key];
                            this.getAtr(hijo.valor, arbol, all);
                        }
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    if (this.id == "*") {
                        this.matches.push(ent);
                        break;
                    }
                    let simbol = ent.tabla[key];
                    if (simbol.id == this.id) {
                        this.matches.push(ent);
                        break;
                    }
                }
            }
            if (all) {
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key];
                        this.getAtr(hijo.valor, arbol, all);
                    }
                }
            }
        }
    }
    getChild(ent, arbol, all) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let simbol = n_ent.tabla[key];
                        if (this.id == "*") {
                            this.matches.push(simbol.valor);
                        }
                        else {
                            if (simbol.id == this.id) {
                                this.matches.push(simbol.valor);
                            }
                        }
                    }
                }
                if (all) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key];
                            this.getChild(hijo.valor, arbol, all);
                        }
                    }
                }
            }
        }
        else {
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let simbol = ent.tabla[key];
                    if (this.id == "*") {
                        this.matches.push(simbol.valor);
                    }
                    else {
                        if (simbol.id == this.id) {
                            this.matches.push(simbol.valor);
                        }
                    }
                }
            }
            if (all) {
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key];
                        this.getChild(hijo.valor, arbol, all);
                    }
                }
            }
        }
    }
    getChildSelf(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let index = n_ent.tabla["index"].valor;
                if (this.id == "*") {
                    if (this.index[index] == null) {
                        this.index[index] = index;
                        this.matches.push(n_ent);
                    }
                }
                else {
                    let simbol = n_ent.tabla["id"];
                    if (simbol.id == this.id) {
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(n_ent);
                        }
                    }
                }
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let simbol = n_ent.tabla[key];
                        if (this.id == "*") {
                            index = simbol.valor.tabla["index"].valor;
                            if (this.index[index] == null) {
                                this.index[index] = index;
                                this.matches.push(simbol.valor);
                            }
                        }
                        else {
                            if (simbol.id == this.id) {
                                index = simbol.valor.tabla["index"].valor;
                                if (this.index[index] == null) {
                                    this.index[index] = index;
                                    this.matches.push(simbol.valor);
                                }
                            }
                        }
                    }
                }
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = n_ent.tabla[key];
                        this.getChildSelf(hijo.valor, arbol);
                    }
                }
            }
        }
        else {
            let index = ent.tabla["index"].valor;
            if (this.id == "*") {
                if (this.index[index] == null) {
                    this.index[index] = index;
                    this.matches.push(ent);
                }
            }
            else {
                let simbol = ent.tabla["id"];
                if (simbol.id == this.id) {
                    if (this.index[index] == null) {
                        this.index[index] = index;
                        this.matches.push(ent);
                    }
                }
            }
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let simbol = ent.tabla[key];
                    if (this.id == "*") {
                        index = simbol.valor.tabla["index"].valor;
                        if (this.index[index] == null) {
                            this.index[index] = index;
                            this.matches.push(simbol.valor);
                        }
                    }
                    else {
                        if (simbol.id == this.id) {
                            index = simbol.valor.tabla["index"].valor;
                            if (this.index[index] == null) {
                                this.index[index] = index;
                                this.matches.push(simbol.valor);
                            }
                        }
                    }
                }
            }
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let hijo = ent.tabla[key];
                    this.getChildSelf(hijo.valor, arbol);
                }
            }
        }
    }
    getSelf(ent, arbol) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let simbol = n_ent.tabla["id"];
                if (simbol.valor == this.id) {
                    this.matches.push(n_ent);
                }
            }
        }
        else {
            let simbol = ent.tabla["id"];
            if (simbol.valor == this.id) {
                this.matches.push(ent);
            }
        }
    }
    getFollowing(ent, arbol, follow) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let anterior = n_ent.anterior;
                if (anterior.tabla["xml"] == null) {
                    for (let key in anterior.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = anterior.tabla[key].valor;
                            if (this.id == "*") {
                                if (hijo.tabla["index"].valor > n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo);
                                    if (follow) {
                                        this.getChild(hijo, arbol, true);
                                    }
                                }
                            }
                            else if (this.id == hijo.tabla["id"].valor) {
                                if (hijo.tabla["index"].valor > n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo);
                                    if (follow) {
                                        this.getChild(hijo, arbol, true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            let anterior = ent.anterior;
            if (anterior.tabla["xml"] == null) {
                for (let key in anterior.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = anterior.tabla[key].valor;
                        if (this.id == "*") {
                            if (hijo.tabla["index"].valor > ent.tabla["index"].valor) {
                                this.matches.push(hijo);
                                if (follow) {
                                    this.getChild(hijo, arbol, true);
                                }
                            }
                        }
                        else if (this.id == hijo.tabla["id"].valor) {
                            if (hijo.tabla["index"].valor > ent.tabla["index"].valor) {
                                this.matches.push(hijo);
                                if (follow) {
                                    this.getChild(hijo, arbol, true);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    getPreciding(ent, arbol, follow) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let anterior = n_ent.anterior;
                if (anterior.tabla["xml"] == null) {
                    for (let key in anterior.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = anterior.tabla[key].valor;
                            if (this.id == "*") {
                                if (hijo.tabla["index"].valor < n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo);
                                    if (follow) {
                                        this.getChild(hijo, arbol, true);
                                    }
                                }
                            }
                            else if (this.id == hijo.tabla["id"].valor) {
                                if (hijo.tabla["index"].valor < n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo);
                                    if (follow) {
                                        this.getChild(hijo, arbol, true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            let anterior = ent.anterior;
            if (anterior.tabla["xml"] == null) {
                for (let key in anterior.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = anterior.tabla[key].valor;
                        if (this.id == "*") {
                            if (hijo.tabla["index"].valor < ent.tabla["index"].valor) {
                                this.matches.push(hijo);
                                if (follow) {
                                    this.getChild(hijo, arbol, true);
                                }
                            }
                        }
                        else if (this.id == hijo.tabla["id"].valor) {
                            if (hijo.tabla["index"].valor < ent.tabla["index"].valor) {
                                this.matches.push(hijo);
                                if (follow) {
                                    this.getChild(hijo, arbol, true);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    traducir(ent, c3d) {
        c3d.main += `\t/* inicia select */\n`;
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
        c3d.main += `\tstack[(int)t${pos.id}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`;
        c3d.temp[ini.id] = ini.val;
        c3d.temp[pos.id] = pos.val;
        c3d.temp[ret.id] = ret.val;
        //end cadena
        //c3d.addStr(this.id, pos.val)
        c3d.stack[ret.val] = c3d.h;
        c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//posicion del retorno\n`;
        //traduccion select
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        if (this.axe == "ancestor") {
            this.ancestor3D(ent, c3d, ret.id);
        }
        else if (this.axe == "ancestor_or_self") {
            this.ancestor3D(ent, c3d, ret.id);
        }
        else if (this.axe == "attribute") {
            this.atr3D(ent, c3d, ret.id);
        }
        else if (this.axe == "child") {
            this.child3D(ent, c3d, ret.id);
        }
        else if (this.axe == "descendant") {
            this.child3D(ent, c3d, ret.id);
        }
        else if (this.axe == "descendant_or_self") {
            this.child3D(ent, c3d, ret.id);
        }
        else if (this.axe == "self") {
            this.self3D(ent, c3d, ret.id);
        }
        else if (this.axe == "parent") {
            this.ancestor3D(ent, c3d, ret.id);
        }
        else if (this.axe == "node()") {
            this.self3D(ent, c3d, ret.id);
        }
        else if (this.axe == "..") {
            this.ancestor3D(ent, c3d, ret.id);
        }
        else if (this.axe == "following_sibling") {
            this.following3D(ent, c3d, ret.id);
        }
        else if (this.axe == "following") {
            this.following3D(ent, c3d, ret.id);
        }
        else if (this.axe == "preceding_sibling") {
            this.preciding3D(ent, c3d, ret.id);
        }
        else if (this.axe == "preceding") {
            this.preciding3D(ent, c3d, ret.id);
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        c3d.heap[c3d.h] = -1;
        c3d.h += 1;
        c3d.main += `\theap[(int)H] = -1;\t\t//fin del select\n`;
        c3d.main += `\tH = H + 1;\t\t//siguiente espacio en heap\n`;
        c3d.last_stack += 3;
        c3d.main += `\t/* fin select */\n`;
        c3d.t_res = ret.id;
    }
    ancestor3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe ancestor */\n`;
        for (let n_ent of ent) {
            let simbol = n_ent.tabla["id"];
            let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
            //la siguiente posicion disponible id xml
            let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
            c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1;
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`;
            c3d.temp[pos.id] = pos.val;
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack;
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
            //llamada()
            c3d.main += `\tmatchAncestor();\n`;
            c3d.s = c3d.s - c3d.last_stack;
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
            if (this.id == "*") {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
            else if (simbol.valor == this.id) {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
        }
        c3d.main += `\t/* fin axe ancestor */\n`;
    }
    atr3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe atr */\n`;
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
                    c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack};\t\t//guarda stack del param xml\n`;
                    //la siguiente posicion disponible id xml
                    //pos.val = pos.val + 1
                    pos.val += 1;
                    c3d.main += `\tt${pos.id} = t${pos.id} + 3;\t\t//La siguiente posicion id xml\n`;
                    //se guarda la posicion (heap) del param
                    c3d.stack[pos.val] = simbol.stack;
                    c3d.main += `\tstack[(int)t${pos.id}] = ${id.stack};\t\t//guarda stack del id xml\n`;
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
        c3d.main += `\t/* fin axe atr */\n`;
    }
    child3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe child */\n`;
        for (let n_ent of ent) {
            for (let key in n_ent.tabla) {
                if (key.startsWith("hijo")) {
                    let hijo = n_ent.tabla[key].valor;
                    let simbol = hijo.tabla["id"];
                    let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
                    //la siguiente posicion disponible id xml
                    let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
                    c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
                    //se guarda la posicion (heap) del id
                    c3d.stack[pos.val] = simbol.stack + 1;
                    c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`;
                    c3d.temp[pos.id] = pos.val;
                    //se cambia de entorno
                    c3d.s = c3d.s + c3d.last_stack;
                    c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
                    //llamada()
                    c3d.main += `\tmatchChild();\n`;
                    c3d.s = c3d.s - c3d.last_stack;
                    c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
                    if (this.id == "*") {
                        //encuentra valor
                        c3d.heap[c3d.h] = simbol.stack;
                        c3d.h += 1;
                    }
                    else if (simbol.id == this.id) {
                        //encuentra valor
                        c3d.heap[c3d.h] = simbol.stack;
                        c3d.h += 1;
                    }
                }
            }
        }
        c3d.main += `\t/* fin axe child */\n`;
    }
    self3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe self */\n`;
        for (let n_ent of ent) {
            let simbol = n_ent.tabla["id"];
            let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
            //la siguiente posicion disponible id xml
            let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
            c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1;
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`;
            c3d.temp[pos.id] = pos.val;
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack;
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
            //llamada()
            c3d.main += `\tmatchSelf();\n`;
            c3d.s = c3d.s - c3d.last_stack;
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
            if (this.id == "*") {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
            else if (simbol.valor == this.id) {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
        }
        c3d.main += `\t/* fin axe self */\n`;
    }
    following3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe following */\n`;
        for (let n_ent of ent) {
            let simbol = n_ent.tabla["id"];
            let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
            //la siguiente posicion disponible id xml
            let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
            c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1;
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`;
            c3d.temp[pos.id] = pos.val;
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack;
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
            //llamada()
            c3d.main += `\tmatchFollowing();\n`;
            c3d.s = c3d.s - c3d.last_stack;
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
            if (this.id == "*") {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
            else if (simbol.valor == this.id) {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
        }
        c3d.main += `\t/* fin axe following */\n`;
    }
    preciding3D(ent, c3d, pos_param) {
        c3d.main += `\t/* ini axe preceding */\n`;
        for (let n_ent of ent) {
            let simbol = n_ent.tabla["id"];
            let ret = { "id": pos_param, "val": c3d.temp[pos_param] };
            //la siguiente posicion disponible id xml
            let pos = { "id": c3d.generateTemp(), "val": ret.val + 2 };
            c3d.main += `\tt${pos.id} = t${ret.id} + 2;\t\t//La siguiente posicion id xml\n`;
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1;
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`;
            c3d.temp[pos.id] = pos.val;
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack;
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`;
            //llamada()
            c3d.main += `\tmatchPreceding();\n`;
            c3d.s = c3d.s - c3d.last_stack;
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`;
            if (this.id == "*") {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
            else if (simbol.valor == this.id) {
                //encuentra valor
                c3d.heap[c3d.h] = simbol.stack;
                c3d.h += 1;
            }
        }
        c3d.main += `\t/* fin axe preceding */\n`;
    }
}
//# sourceMappingURL=axes.js.map