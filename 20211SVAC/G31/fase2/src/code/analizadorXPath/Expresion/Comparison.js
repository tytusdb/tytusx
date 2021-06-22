var {Tipo, Colision, getTipoById} = require("../AST/Entorno");
const { ErroresGlobal } = require('../AST/Global')
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
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])
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

function comparison(izq, op, der) {
    if(!Colision[izq.tipo][der.tipo])
    {
        ErroresGlobal.push({Error:`No se pudieron operar los tipos ${getTipoById(izq.tipo)} - ${getTipoById(der.tipo)}`,tipo:"Semantico",Linea:0,columna:0})
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