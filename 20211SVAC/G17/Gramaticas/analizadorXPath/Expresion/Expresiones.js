import { Camino } from "./axes"
import { Atributo } from "./axes"

const { Tipo } = require("../AST/Entorno")
var C3D  = require('../../C3D')

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

    getC3D()
    {}
}
 
export class Literal extends NodoExp
{
    posValor = 0
    constructor(tipo,valor){
        super(tipo,valor) 
    }

    getValor()
    {
        return [this]
    }

    getC3D(){
        //dependiendo el tipo, la devolucion
        switch(this.tipo){
            case Tipo.INTEGER:
            case Tipo.DECIMAL:
                return { cod:'', tipo:Tipo.DECIMAL,valor:this.valor }
            case Tipo.BOOLEAN:
                
                //retorno 1 si es true y 0 si es false
                var val = ''
                if (this.valor.ToString().ToLower() == "true")
                {
                    val = '1'
                }
                else if (this.valor.ToString().ToLower() == "false")
                {
                    val = '0'
                }
                return { cod: '', tipo:Tipo.BOOLEAN,valor:val }
            
            case Tipo.STRING:
                this.posValor = C3D.getNextSP()
                var tmp = C3D.guardarString(this.posValor, this.valor)
                return { cod:'', tipo:Tipo.STRING,valor:tmp }
        }
        
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

    getC3D(){}
}

export class Variable extends NodoExp
{
    constructor(tipo,valor)
    {
        super(tipo,valor)
    }

    getValor(nodos)
    {
        var retornos = []
        for (const nodo of nodos) {
            if(nodo.entorno.tipo==this.valor){
                retornos=retornos.concat(nodo.entorno.hijos)
                break
            }
        }
        return retornos
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
            if(Retornos[0] && Retornos[0].tipo!=Tipo.NODO && Retornos[0].tipo!=Tipo.ATRIB) break
            Retornos = iterator.getValor(Retornos)
        }
        if(Retornos.length>0)
        {

            return Retornos
        }
        else
        {
            return []
        }
    }

    getC3D(objetos)
    {
        var retorno = {cod:'',tipo:Tipo.ERROR};


        for (const objeto of this.caminos){
            var tempretorno = objeto.getC3D(objetos)    //se queda con el ultimo retorno
            retorno.cod += tempretorno.cod 
            retorno.tipo = tempretorno.tipo
            if(tempretorno.valor)
            {
                retorno.valor = tempretorno.valor  
            }          
        }

        return retorno       
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

export class Parentesis 
{
    constructor(expresiones)
    {
        this.expresiones=expresiones
    }

    getValor(nodos)
    {
        var retorno = []
        for (const expresion of this.expresiones) {
            retorno = retorno.concat(expresion.getValor(nodos))
        }
        return retorno
    }
}