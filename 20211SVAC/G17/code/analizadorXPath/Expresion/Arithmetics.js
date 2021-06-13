const { Colision, ColisionTipo, Tipo } = require('../AST/Entorno')
const { Literal } = require("./Expresiones");

export class Arithmetic {

    constructor (izquierdo,op,derecho){
        this.op=op
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos){
        var retorno = []

        for (var obj of Objetos){
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])

            // plano cartesiano entre valores izq y valores 
            for (var izq of valIzq){
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

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.op}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        nodos=this.derecho.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }
}

function operar(izq, op, der){
    var retorno = false
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

export class Unary {
    constructor (op,izquierdo){
        this.op=op
        this.izquierdo = izquierdo;
    }

    getValor(Objetos){
        var retorno = []
        // recorrer lista de objetos
        for (var obj of Objetos) {
            var valIzq = this.izquierdo.getValor([obj])
            // recorrer lista de resultados de izquierda
            for (var izq of valIzq) {
                if (Colision[Tipo.INTEGER][izq.tipo]){
                    var newValor = null
                switch(this.op){
                    case "-":
                        newValor = - izq.valor
                    break;
                    case "+":
                        newValor = + izq.valor
                    break;
                }
                if (newValor)
                    retorno.push(new Literal(izq.tipo, newValor))
                }
            }
        }
        return retorno
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.op}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }
}