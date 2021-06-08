import { Colision, ColisionTipo, Tipo } from "../AST/Entorno";
var {Tipo, Colision} = require("../AST/Entorno");
const { Literal } = require("./Expresiones");

class Arithmetic {

    constructor (izquierdo,op,derecho){
        this.op=op
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos){
        var retorno = []

        for (var obj of Objetos){
            var valIzq = this.izquierdo.getValor(obj.entorno)
            var valDer = this.derecho.getValor(obj.entorno)

            // plano cartesiano entre valores izq y valores 
            for (var izq of valIzq){
                var salir = false
                for (var der of valDer){
                    var newValor = operar(izq, this.op, der)
                    if (newValor){
                        retorno.push(
                            new Literal(
                                ColisionTipo[izq.tipo][der.tipo],
                                newValor
                            )
                        )
                    }
                }
            }
        }
        return retorno
    }

    operar(izq, op, der){
        retorno = false
        // validar tipos
        if (Colision[izq.tipo][der.tipo]){
            switch(op){
                case "+":
                    retorno =  izq.valor + der.valor
                    break;
                case "-":
                    retorno = izq.valor - der.valor
                    break;
                case "*":
                    retorno = izq.valor * der.valor
                    break;
                case "div":
                    retorno = izq.valor / der.valor
                    break;
                case "mod":
                    retorno = izq.valor % der.valor
                    break;
                case "idiv":
                    retorno = Math.trunc(izq.valor / der.valor)
                    break;
            }   
        }
        return retorno
    }
}