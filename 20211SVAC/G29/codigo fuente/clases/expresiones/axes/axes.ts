import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class axes implements expresion {
    public tipe: string
    public axe: string
    public id: string
    public linea: number
    public columna: number
    public matches: Array<entorno>
    public index: { [id: number]: number }
    constructor(tipe, axe, id, linea, columna) {
        this.tipe = tipe
        this.axe = axe
        this.id = id
        this.linea = linea
        this.columna = columna
        this.matches = Array<entorno>()
        this.index = {}
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.STRUCT
    }
    getValor(ent: entorno, arbol: ast) {
        if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "ancestor") {
            this.getAncestor(ent, arbol, true, false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "ancestor") {
            this.getAncestor(ent, arbol, true, false)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "ancestor_or_self") {
            this.getAncestor(ent, arbol, false, true)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "ancestor_or_self") {
            this.getAncestor(ent, arbol, true, false)
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "attribute") {
            this.getAtr(ent, arbol, false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "attribute") {
            this.getAtr(ent, arbol, true)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "child") {
            this.getChild(ent, arbol, false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "child") {
            this.getChild(ent, arbol, true)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "descendant") {
            this.getChild(ent, arbol, true)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "descendant") {
            this.getChild(ent, arbol, true)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "descendant_or_self") {
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "descendant_or_self") {
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "self") {
            this.getSelf(ent, arbol)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "self") {
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "parent") {
            this.getAncestor(ent, arbol, false, false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "parent") {
            this.getAncestor(ent, arbol, true, false)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "node()") {
            this.getSelf(ent, arbol)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "node()") {
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "..") {
            this.getAncestor(ent, arbol, true, false)
            this.getChildSelf(ent, arbol)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "following_sibling") {
            this.getFollowing(ent, arbol,false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "following_sibling") {
            this.getFollowing(ent, arbol, false)
            this.getChild(ent, arbol, true)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "following") {
            this.getFollowing(ent, arbol,true)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "following") {
            this.getFollowing(ent, arbol, true)
            this.getChild(ent, arbol, true)
        }//
        else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "preciding_sibling") {
            this.getPreciding(ent, arbol,false)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "preciding_sibling") {
            this.getPreciding(ent, arbol, false)
            this.getChild(ent, arbol, true)
        } else if (this.tipe == "/" && this.axe.toLocaleLowerCase() == "preciding") {
            this.getPreciding(ent, arbol,true)
        } else if (this.tipe == "//" && this.axe.toLocaleLowerCase() == "preciding") {
            this.getPreciding(ent, arbol, true)
            this.getChild(ent, arbol, true)
        }
        return this.matches
    }
    getAncestor(ent, arbol: ast, all: boolean, self: boolean) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                if (self) {
                    if (this.id == "*") {
                        let index = n_ent.tabla["index"].valor
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(n_ent)
                        }
                    } else {
                        let simbol: simbolo = n_ent.tabla["id"]
                        if (simbol.valor == this.id) {
                            let index = n_ent.tabla["index"].valor
                            if (this.index[index] == null) {
                                this.index[index] = index
                                this.matches.push(n_ent)
                            }
                        }
                    }
                }
                let anterior: entorno = n_ent.anterior
                if (anterior.tabla["xml"] == null) {
                    if (this.id == "*") {
                        let index = anterior.tabla["index"].valor
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(anterior)
                        }
                    } else {
                        let simbol: simbolo = anterior.tabla["id"]
                        if (simbol.valor == this.id) {
                            let index = anterior.tabla["index"].valor
                            if (this.index[index] == null) {
                                this.index[index] = index
                                this.matches.push(anterior)
                            }
                        }
                    }
                    if (all) {
                        this.getAncestor(anterior, arbol, all, self)
                    }
                }
            }
        } else {
            if (self) {
                if (this.id == "*") {
                    let index = ent.tabla["index"].valor
                    if (this.index[index] == null) {
                        this.index[index] = index
                        this.matches.push(ent)
                    }
                } else {
                    let simbol: simbolo = ent.tabla["id"]
                    if (simbol.valor == this.id) {
                        let index = ent.tabla["index"].valor
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(ent)
                        }
                    }
                }
            }
            let anterior: entorno = ent.anterior
            if (anterior.tabla["xml"] == null) {
                if (this.id == "*") {
                    let index = anterior.tabla["index"].valor
                    if (this.index[index] == null) {
                        this.index[index] = index
                        this.matches.push(anterior)
                    }
                } else {
                    let simbol: simbolo = anterior.tabla["id"]
                    if (simbol.valor == this.id) {
                        let index = anterior.tabla["index"].valor
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(anterior)
                        }
                    }
                }
                if (all) {
                    this.getAncestor(anterior, arbol, all, self)
                }
            }
        }
    }
    getAtr(ent, arbol: ast, all: boolean) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        if (this.id == "*") {
                            this.matches.push(n_ent)
                            break
                        }
                        let simbol: simbolo = n_ent.tabla[key]
                        if (simbol.id == this.id) {
                            this.matches.push(n_ent)
                            break
                        }
                    }
                }
                if (all) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key]
                            this.getAtr(hijo.valor, arbol, all)
                        }
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    if (this.id == "*") {
                        this.matches.push(ent)
                        break
                    }
                    let simbol: simbolo = ent.tabla[key]
                    if (simbol.id == this.id) {
                        this.matches.push(ent)
                        break
                    }
                }
            }
            if (all) {
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key]
                        this.getAtr(hijo.valor, arbol, all)
                    }
                }
            }
        }
    }
    getChild(ent, arbol: ast, all: boolean) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let simbol: simbolo = n_ent.tabla[key]
                        if (this.id == "*") {
                            this.matches.push(simbol.valor)
                        } else {
                            if (simbol.id == this.id) {
                                this.matches.push(simbol.valor)
                            }
                        }
                    }
                }
                if (all) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key]
                            this.getChild(hijo.valor, arbol, all)
                        }
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let simbol: simbolo = ent.tabla[key]
                    if (this.id == "*") {
                        this.matches.push(simbol.valor)
                    } else {
                        if (simbol.id == this.id) {
                            this.matches.push(simbol.valor)
                        }
                    }
                }
            }
            if (all) {
                for (let key in ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key]
                        this.getChild(hijo.valor, arbol, all)
                    }
                }
            }
        }
    }
    getChildSelf(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let index = n_ent.tabla["index"].valor
                if (this.id == "*") {
                    if (this.index[index] == null) {
                        this.index[index] = index
                        this.matches.push(n_ent)
                    }
                } else {
                    let simbol = n_ent.tabla["id"]
                    if (simbol.id == this.id) {
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(n_ent)
                        }
                    }
                }
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let simbol: simbolo = n_ent.tabla[key]
                        if (this.id == "*") {
                            index = simbol.valor.tabla["index"].valor
                            if (this.index[index] == null) {
                                this.index[index] = index
                                this.matches.push(simbol.valor)
                            }
                        } else {
                            if (simbol.id == this.id) {
                                index = simbol.valor.tabla["index"].valor
                                if (this.index[index] == null) {
                                    this.index[index] = index
                                    this.matches.push(simbol.valor)
                                }
                            }
                        }
                    }
                }
                for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = n_ent.tabla[key]
                        this.getChildSelf(hijo.valor, arbol)
                    }
                }
            }
        } else {
            let index = ent.tabla["index"].valor
            if (this.id == "*") {
                if (this.index[index] == null) {
                    this.index[index] = index
                    this.matches.push(ent)
                }
            } else {
                let simbol = ent.tabla["id"]
                if (simbol.id == this.id) {
                    if (this.index[index] == null) {
                        this.index[index] = index
                        this.matches.push(ent)
                    }
                }
            }
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let simbol: simbolo = ent.tabla[key]
                    if (this.id == "*") {
                        index = simbol.valor.tabla["index"].valor
                        if (this.index[index] == null) {
                            this.index[index] = index
                            this.matches.push(simbol.valor)
                        }
                    } else {
                        if (simbol.id == this.id) {
                            index = simbol.valor.tabla["index"].valor
                            if (this.index[index] == null) {
                                this.index[index] = index
                                this.matches.push(simbol.valor)
                            }
                        }
                    }
                }
            }
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let hijo = ent.tabla[key]
                    this.getChildSelf(hijo.valor, arbol)
                }
            }
        }
    }
    getSelf(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                this.matches.push(n_ent)
            }
        } else {
            this.matches.push(ent)
        }
    }
    getFollowing(ent, arbol: ast, follow: boolean) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let anterior = n_ent.anterior
                if (anterior.tabla["xml"] == null) {
                    for (let key in anterior.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = anterior.tabla[key].valor
                            if (this.id == "*") {
                                if (hijo.tabla["index"].valor > n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo)
                                    if (follow){
                                        this.getChild(hijo,arbol,true)
                                    }
                                }
                            } else if (this.id == hijo.tabla["id"].valor) {
                                if (hijo.tabla["index"].valor > n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo)
                                    if (follow){
                                        this.getChild(hijo,arbol,true)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            let anterior = ent.anterior
            if (anterior.tabla["xml"] == null) {
                for (let key in anterior.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = anterior.tabla[key].valor
                        if (this.id == "*") {
                            if (hijo.tabla["index"].valor > ent.tabla["index"].valor) {
                                this.matches.push(hijo)
                                if (follow){
                                    this.getChild(hijo,arbol,true)
                                }
                            }
                        } else if (this.id == hijo.tabla["id"].valor) {
                            if (hijo.tabla["index"].valor > ent.tabla["index"].valor) {
                                this.matches.push(hijo)
                                if (follow){
                                    this.getChild(hijo,arbol,true)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    getPreciding(ent, arbol: ast, follow: boolean) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                let anterior = n_ent.anterior
                if (anterior.tabla["xml"] == null) {
                    for (let key in anterior.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = anterior.tabla[key].valor
                            if (this.id == "*") {
                                if (hijo.tabla["index"].valor < n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo)
                                    if (follow){
                                        this.getChild(hijo,arbol,true)
                                    }
                                }
                            } else if (this.id == hijo.tabla["id"].valor) {
                                if (hijo.tabla["index"].valor < n_ent.tabla["index"].valor) {
                                    this.matches.push(hijo)
                                    if (follow){
                                        this.getChild(hijo,arbol,true)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            let anterior = ent.anterior
            if (anterior.tabla["xml"] == null) {
                for (let key in anterior.tabla) {
                    if (key.startsWith("hijo")) {
                        let hijo = anterior.tabla[key].valor
                        if (this.id == "*") {
                            if (hijo.tabla["index"].valor < ent.tabla["index"].valor) {
                                this.matches.push(hijo)
                                if (follow){
                                    this.getChild(hijo,arbol,true)
                                }
                            }
                        } else if (this.id == hijo.tabla["id"].valor) {
                            if (hijo.tabla["index"].valor < ent.tabla["index"].valor) {
                                this.matches.push(hijo)
                                if (follow){
                                    this.getChild(hijo,arbol,true)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}