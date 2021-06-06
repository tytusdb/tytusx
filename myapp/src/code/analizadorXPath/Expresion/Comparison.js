var {Tipo, Colision} = require("../AST/Entorno");
const { Literal } = require("./Expresiones");

export class ComparisonExp {

    constructor (izquierdo,op,derecho){
        this.op=op
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos)
    {
        var retorno = []
        
        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor(obj.entorno)
            var valDer = this.derecho.getValor(obj.entorno)

            for (var izq of valIzq) {
                var salir = false
                for (var der of valDer){

                    if (comparison(izq,this.op,der)){
                        retorno.push(obj)
                        salir = true
                        break
                    }
                }
                if (salir) break
            }
        }
        return retorno
    }
}

function comparison(izq, op, der) {
    if(!Colision[izq.tipo][der.tipo])
    {
        return false
    }
    switch(op)
    {
        case "=":
            return izq.valor == der.valor
        case "!=":
            return izq.valor != der.valor
        case "<":
            return izq.valor <= der.valor
        case "<=":
            return izq.valor <= der.valor
        case ">":
            return izq.valor > der.valor
        case ">=":
            return izq.valor >= der.valor
    }
    return false
}

/*
    /biblioteca/libro[titulo > 5]
    /biblioteca[libro/titulo > 5]
*/