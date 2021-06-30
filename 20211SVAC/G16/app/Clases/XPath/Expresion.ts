import { NodoAbs } from "./NodoAbs";

export class Expresion implements NodoAbs {
    operadori:any
    operadord:any
    operador:string
    constructor(opizq:any, opder:any, operador:string) {
        this.operadori=opizq
        this.operadord=opder
        this.operador=operador
    }

    execute(padre) {
        let datos ={}
        switch (this.operador){
            case "id":
                datos = {
                    id: this.operadori,
                    pred: "false"
                }
                return datos
            case "IdPredicado":
                datos={
                    id:this.operadori,
                    pred:this.operadord
                }
                return datos
            case "dospuntos":
                datos={
                    id:"..",
                    pred:"false"
                }
                return datos
            case "punto":
                datos={
                    id:".",
                    pred:"false"
                }
                return datos
            case "aterisco":
                datos={
                    id:"*",
                    pred:"false"
                }
                return datos
            case "agributoT":
                datos={
                    id:"@*",
                    pred:"false"
                }
                return datos
            case "+":
                return this.operadori.execute(padre) + this.operadord.execute(padre)
            case "-":
                return this.operadori.execute(padre) - this.operadord.execute(padre)
            case "*":
                return this.operadori.execute(padre) * this.operadord.execute(padre)
            case "div":
                return this.operadori.execute(padre) / this.operadord.execute(padre)
            case "mod":
                return this.operadori.execute(padre) % this.operadord.execute(padre)
            case "decimal":
                return Number(this.operadori)
            case "menor":
                
                let indice=this.operadori.execute(padre)
                let tope=this.operadord.execute(padre)
                console.log("Entro "+ indice + " < " + tope)
                datos={
                    id:{indice, tope},
                    pred:"menor"
                }
                return datos
            case "entero":
                return Number(this.operadori)
        }
        return datos
    }
}