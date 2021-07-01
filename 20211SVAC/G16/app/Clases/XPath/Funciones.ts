import { NodoAbs } from "./NodoAbs";
import { ConsultasTS } from "./ConsultasTS.js";

export class Funciones implements NodoAbs {
    funcion:string
    constructor(fn:string) {
        this.funcion=fn
    }

    execute(padre) {
        switch (this.funcion){
            case "last":
                let etiqueta = localStorage.getItem("idtmp")
                const consulta = new ConsultasTS()
                let x = consulta.getEntornoActual(etiqueta, padre)
                return x.length
            case "position":
                return 1
            case "node":

            break
            case "text":

            break
        }
        return "F"
    }
}