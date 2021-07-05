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
        let indice
        let tope
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
                    pred:"dospuntos"
                }
                return datos
            case "punto":
                datos={
                    id:".",
                    pred:"punto"
                }
                return datos
            case "aterisco":
                datos={
                    id:"*",
                    pred:"false"
                }
                return datos
            case "atributoT":
                datos={
                    id:"@*",
                    pred:"atributoT"
                }
                return datos
            case "atributoid":
                indice=this.operadord
                tope="*"
                datos={
                    id: {indice, tope},
                    pred:"atributoid"
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
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},
                    pred:"menor"
                }
                return datos
            case "menori":
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},
                    pred:"menori"
                }
                return datos
            case "mayor":
                indice=this.operadori.execute(padre)//este creo que no va a importar
                tope=this.operadord.execute(padre)//en este caso en este es donde comienza
                datos={
                    id:{indice, tope},
                    pred:"mayor"
                }
                return datos
            case "mayori":
                indice=this.operadori.execute(padre)//este creo que no va a importar
                tope=this.operadord.execute(padre)//en este caso en este es donde comienza
                datos={
                    id:{indice, tope},  
                    pred:"mayori"
                }
                return datos
            case "igual":
                indice=this.operadori.execute(padre)//este creo que no va a importar
                tope=this.operadord.execute(padre)//en este caso en este es donde comienza
                datos={
                    id:{indice, tope},  
                    pred:"igual"
                }
                return datos
            case "noigual":
                indice=this.operadori.execute(padre)//este creo que no va a importar
                tope=this.operadord.execute(padre)//en este caso en este es donde comienza
                datos={
                    id:{indice, tope},  
                    pred:"noigual"
                }
                return datos
            //PARA EL XQUERY
            case "eq"://IGUAL
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},
                    pred:"eq"
                }
                return datos
            case "ne"://DIFERENTE
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},
                    pred:"ne"
                }
                return datos
            case "lt"://MENOR
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},
                    pred:"lt"
                }
                return datos
            case "le"://MENOR IGUAL
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},  
                    pred:"le"
                }
                return datos
            case "gt"://MAYOR
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},  
                    pred:"gt"
                }
                return datos
            case "ge"://MAYOR IGUAL
                indice=this.operadori.execute(padre)
                tope=this.operadord.execute(padre)
                datos={
                    id:{indice, tope},  
                    pred:"ge"
                }
                return datos
            //------------------------------------------------------------------------------
            case "cadenas":
                var x:string = this.operadori
                let cadena=x.replace("\"", "")
                return cadena
            case "entero":
                return Number(this.operadori)
        }
        return datos
    }
}