var {Tipo, ColisionLogical, getTipoById} = require("../AST/Entorno")
const { ErroresGlobal } = require('../AST/Global')
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
        var retornos = new Map()

        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])
            operar(retornos,this.op,valIzq,valDer,Objetos)
        }
        var temp = []
        for (const iterator of retornos.values()) {
            temp.push(iterator)
        }
        return temp
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

function operar(objeto,op,izqValor,derValor,todos){
    var retorno = false
    // validar tipos
    switch(op){
        case "and":
            for (const izq of izqValor) {
                for (const der of derValor) {
                    if(izq.tipo==Tipo.NODO)
                    {
                        if(der.tipo==Tipo.NODO)
                        {
                            if(izq.entorno == der.entorno)
                            {
                                objeto.set(izq.entorno,izq)
                                break
                            }
                            break
                        }
                        objeto.set(izq.entorno,izq)
                        break
                    }
                    else if(der.tipo==Tipo.NODO)
                    {
                        objeto.set(izq.entorno,der)
                        break
                    }
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
            }
            break
        case "or":
            for (const izq of izqValor) {
                if(izq.tipo!=Tipo.NODO)
                {
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
                objeto.set(izq.entorno,izq)
            }
            for (const der of derValor) {
                if(der.tipo!=Tipo.NODO)
                {
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
                objeto.set(der.entorno,der)
            }
            break
    }
    return retorno
}