const { Tipo } = require("../AST/Entorno")


//Literales para el uso de datos y tipos
export class NodoExp
{
    constructor(tipo,valor)
    {
        this.tipo=tipo
        this.valor=valor
    }

    getValor()
    {

    }
}
 
export class Literal extends NodoExp
{
    constructor(tipo,valor){
        super(tipo,valor) 
    }

    getValor()
    {
        return [this]
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.valor}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        return NodosActuales
    }
}

export class Nodo extends NodoExp
{
    constructor(tipo,entorno,pila,valor,posicion=-1)
    {
        super(tipo,valor) // Tipo es NODO; valor es TEXTO
        this.entorno=entorno // Atributos e Hijos de Etiqueta
        this.pila=pila // Anteriores
        this.posicion=posicion
    }

    setPosicion(posicion)
    {
        this.posicion=posicion
    }

    getValor()
    {
    }
}

export class PathExp  
{
    constructor(caminos) 
    {
        this.caminos=caminos
    }

    getValor(Entorno)
    {
        var Retornos = Entorno
        for (const iterator of this.caminos) {
            Retornos = iterator.getValor(Retornos)
        }
        if(Retornos.length>0)
        {

            return Retornos
        }
        else
        {
            return [new Literal(Tipo.ERROR,'@Error@',[])]
        }
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {   
        var NodosActuales = []
        for(var i=0; i < this.caminos.length; i++)
        {
            var nodoActual = {id:contador.num,label:"RelativePath"}
            NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
            var nodos = this.caminos[i].Graficar(ListaNodes,ListaEdges,contador)
            for (const nodo of nodos) {
              ListaEdges.push({from:nodoActual.id,to:nodo.id})
            }
        }
        return NodosActuales
    }
}
