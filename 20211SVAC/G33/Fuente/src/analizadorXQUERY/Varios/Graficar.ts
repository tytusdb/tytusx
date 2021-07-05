import { NodoAST } from "../Arbol/NodoAST";
import { NodoCST } from "../Arbol/NodoCST";
import { Simbolo } from "../Simbolos/Simbolo";

export function graphAST(raiz: NodoAST): String {
    getDot(raiz)
    return grafo
}

export function graphCST(raiz: NodoCST): String {
    getDotCST(raiz)
    return grafo
}

var c: number;
var grafo: String;

function getDotCST(raiz: NodoCST): String {
    grafo = "digraph cst {\n";
    let val = raiz.getValor()
    val = val.replace(/\'/gi, "")
    val = val.replace(/\"/gi, "")
    grafo += "n0 [label = \"" + val + "\"]\n";
    c = 1;
    recorrerCST("n0", raiz);
    grafo += "}";
    return grafo;
}

function recorrerCST(padre: String, nPadre: NodoCST): void {
    nPadre.getHijos().forEach(hijo => {
        var nombreHijo: String = "n" + c;
        let val = hijo.getValor()
        val = val.replace(/\'/gi, "")
        val = val.replace(/\"/gi, "")
        grafo += nombreHijo + " [label = \"";
        grafo = grafo + "" + val
        grafo += "\"]\n";
        grafo += padre + " -> " + nombreHijo + "\n";
        c++;
        recorrerCST(nombreHijo, hijo);
    });
}

function getDot(raiz: NodoAST): String {
    grafo = "digraph ast {\n";
    let val = raiz.getValor()
    val = val.replace(/\'/gi, "")
    val = val.replace(/\"/gi, "")
    grafo += "n0 [label = \"" + val + "\"]\n";
    c = 1;
    recorrerAST("n0", raiz);
    grafo += "}";
    return grafo;
}

function recorrerAST(padre: String, nPadre: NodoAST): void {
    nPadre.getHijos().forEach(hijo => {
        var nombreHijo: String = "n" + c;
        let val = hijo.getValor()
        val = val.replace(/\'/gi, "")
        val = val.replace(/\"/gi, "")
        grafo += nombreHijo + " [label = \"" + val + "\"]\n";
        grafo += padre + " -> " + nombreHijo + "\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    });
}