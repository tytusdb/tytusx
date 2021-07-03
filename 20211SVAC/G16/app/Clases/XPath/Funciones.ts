import { NodoAbs } from "./NodoAbs";
import { ConsultasTS } from "./ConsultasTS.js";

export class Funciones implements NodoAbs {
    funcion:string
    constructor(fn:string) {
        this.funcion=fn
    }

    execute(padre) {
        let datos ={}
        switch (this.funcion){
            case "last":
                let tmp = JSON.parse(padre)
                return tmp.length
            case "position":
                return 1
            case "node":
                datos={
                    id:"",
                    pred:"node"
                }
                return datos
            case "text":
                datos={
                    id:"",
                    pred:"text"
                }
                return datos
        }
        return "F"
    }
}