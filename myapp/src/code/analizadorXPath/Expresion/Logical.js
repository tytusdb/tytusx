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

        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])

            for (var izq of valIzq) {
                var salir = false
                for (var der of valDer){

                    if (operar(izq,this.op,der)){
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