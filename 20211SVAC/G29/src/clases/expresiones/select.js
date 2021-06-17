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
}
//# sourceMappingURL=select.js.map