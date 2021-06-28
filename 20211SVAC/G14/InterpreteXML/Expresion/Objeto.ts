import { Etiqueta } from "../../InterpreteXPath/AST/Etiqueta";
import { Nodo } from "../../InterpreteXPath/AST/Nodo";
import NodoAST from "../../InterpreteXPath/AST/NodoAST";
import { Atributo } from "./Atributo";

export class Objeto extends Nodo {
    identificador: string;
    texto: string;
    lista: Etiqueta;
    listaObjetos: Etiqueta;
    fila: number;
    columna: number;
    cierre: string; // Agregado para saber con que cierra.

    constructor(id: string, texto: string, fila: number, columna: number, listaAtributos: Etiqueta, listaO: Etiqueta, cierre: string) {
        super(fila, columna)
        this.identificador = id;
        this.texto = texto;
        this.fila = fila;
        this.columna = columna;
        this.lista = listaAtributos;
        this.listaObjetos = listaO;
        this.cierre = cierre;
    }

    getValor(): string {
        return this.identificador
    }

    obtenerNodos(): NodoAST[] {
        var cst = new NodoAST("OBJETO");
        var ast = new NodoAST("");
        cst.addHijoSimple("<")

        if (this.identificador == "xml") {
            cst.valor = "PROLOG"
            cst.addHijoSimple("xml")

            var atr = this.lista.obtenerNodos()[0]

            cst.addHijo(atr);
            cst.addHijoSimple("?>")
        }
        else {
            cst.addHijoSimple(this.identificador)
            ast.addHijoSimple(this.identificador)
           // console.log(this.lista)
            if (this.lista != null) {
                var atr2 = this.lista.obtenerNodos()[0]

                cst.addHijo(atr2);
                ast.addHijo(atr2)
            }
            if (this.listaObjetos != null) {
                cst.addHijoSimple("> <")

                var obj = this.listaObjetos.obtenerNodos()[0]
                cst.addHijo(obj)
                cst.addHijoSimple("/")
                cst.addHijoSimple(this.identificador)
                cst.addHijoSimple(this.cierre)
            }
            else if (this.texto != "") {
                cst.addHijoSimple(this.texto)
                cst.addHijoSimple("/")
                cst.addHijoSimple(this.identificador)
                cst.addHijoSimple(this.cierre)
            }
            else {
                cst.addHijoSimple("/>")
            }
        }
        return [cst, ast]
    }

}