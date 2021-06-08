var {Tipo, ColisionLogical} = require("../AST/Entorno")
const { Literal } = require("./Expresiones")
//Funcion para el Or entre booleanos
export class Logical
{
    constructor(izquierdo,op,derecho)
    {
        this.op=op
        this.izquierdo=izquierdo;
        this.derecho=derecho;
    }
    
    getValor(Objetos)
    {
        var retorno = []

        for (var obj of Objetos){
            var valIzq = this.izquierdo.getValor(obj.entorno)
            var valDer = this.derecho.getValor(obj.entorno)

            // plano cartesiano entre valores izq y valores 
            for (var izq of valIzq){
                for (var der of valDer){
                    var newValor = operar(izq, this.op, der)
                    if (newValor){
                        retorno.push(
                            new Literal(
                                ColisionLogical[izq.tipo][der.tipo],
                                newValor
                            )
                        )
                    }
                }
            }
        }
        return retorno
    }
}

function operar(izq, op, der){
    var retorno = false
    // validar tipos
    if (ColisionLogical[izq.tipo][der.tipo]){
        switch(op){
            case "and":
                retorno =  izq.valor && der.valor
                break;
            case "or":
                retorno = izq.valor || der.valor
                break;
        }   
    }
    return retorno
}