const { Tipo,TipoPath } = require("../AST/Entorno")

//Literales para el uso de datos y tipos
class Literal
{
    constructor(tipo,valor){
        this.tipo=tipo
        this.valor=valor    
    }

    getValor()
    {
        return this
    }
}
exports.Literal = Literal

class Nodo
{
    constructor(tipo,entorno,pila,valor)
    {
        this.tipo=tipo
        this.entorno=entorno
        this.valor=valor
        this.pila=pila
    }

    getValor()
    {

    }
}
exports.Nodo = Nodo

class PathExp 
{
    constructor(caminos) 
    {
        this.caminos=caminos
    }

    getValor(Entorno)
    {
        var Retornos = []
        Retornos.push(new Nodo(Tipo.NODO,Entorno,[],""))
        for (const iterator of this.caminos) {
            var temp=Retornos
            Retornos = []
            for (const Retorno of temp) {
                var ret = iterator.getValor(Retorno.pila,Retorno.entorno)
                Retornos = Retornos.concat(ret)
                if(ret.tipo == Tipo.ERROR)
                {
                    return new Literal(Tipo.ERROR,'@Error@')
                }   
            }
        }
        if(Retornos.length>0)
        {
            return Retornos
        }
        else
        {
            return new Literal(Tipo.ERROR,'@Error@',[])
        }
    }
}
exports.PathExp=PathExp

//Clase para los tipos nodes
class PathExpElement
{
    constructor(siguiente,tipo)
    {
        this.siguiente = siguiente
        this.tipo = tipo
    }

    getValor(pila,Entorno)
    {
        return this.siguiente.getValor(pila,Entorno,this.tipo)
    }
}
exports.PathExpElement=PathExpElement

class AxisStepExp
{
    constructor(valor,predicado)
    {
        this.valor=valor
        this.predicado=predicado
    }

    getValor(pila,Entorno,tipo)
    {
        var retorno = this.valor.getValor(pila,Entorno,tipo)
        if(this.predicado.lenght > 0)
        {

        }
        return retorno
    }
}
exports.AxisStepExp=AxisStepExp

class Atributo
{
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor(pila,Entorno,tipo)
    {
        var retorno = []
        if(tipo==TipoPath.ABS)
        {
            var nuevaPila = Object.assign([],pila)
            nuevaPila.push(Entorno)
            for (const iterator of Entorno.atributos) {
                if(iterator.nombre == this.nombre || this.nombre=="*" )
                {
                    retorno.push(new Nodo(Tipo.NODO,Entorno,nuevaPila,iterator.valor))
                }
            }
        }
        else
        {
            retorno = RecursivaAtributo(pila,Entorno,this.nombre)
        }
        return retorno
    }
}
exports.Atributo=Atributo

function RecursivaAtributo(pila,Entorno,nombre) 
{
    var retorno = []
    var nuevaPila = Object.assign([],pila)
    nuevaPila.push(Entorno)
    for (const iterator of Entorno.atributos) {
        if(iterator.nombre == nombre || nombre=="*")
        {
            retorno.push(new Nodo(Tipo.NODO,Entorno,nuevaPila,iterator.valor))  
        }
    }
    for (const iterator of Entorno.hijos) {
        var temp = RecursivaAtributo(nuevaPila,iterator,nombre)
        retorno = retorno.concat(temp)
    }
    return retorno
}

class Camino
{
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor(pila,Entorno,tipo)
    {
        var retorno = []
        if(tipo==TipoPath.ABS)
        {
            for (const iterator of Entorno.hijos) {
                if(iterator.tipo == this.nombre || this.nombre=="*" )
                {
                    var nuevaPila = Object.assign([],pila)
                    nuevaPila.push(Entorno)
                    retorno.push(new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto))
                }
            }
        }
        else
        {
            retorno = RecursivaCamino(pila,Entorno,this.nombre)
        }
        return retorno
    }
}
exports.Camino=Camino

function RecursivaCamino(pila,Entorno,nombre) 
{
    var retorno = [];
    if(Entorno.tipo==nombre ||  (nombre=="*" && Entorno.tipo!="/"))
    {
        retorno.push(new Nodo(Tipo.NODO,Entorno,pila,Entorno.texto))
    }
    for (const iterator of Entorno.hijos) {
        var nuevaPila = Object.assign([],pila)
        nuevaPila.push(Entorno)
        var temp = RecursivaCamino(nuevaPila,iterator,nombre)
        retorno = retorno.concat(temp)
    }
    return retorno
}

class CaminoInverso
{  
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor(Pila,Entorno,tipo)
    {
        var Retorno = []
        var temp = Pila.pop()
        Retorno.push(new Nodo(Tipo.NODO,temp,Pila,Entorno.texto))
        return Retorno
    }
}
exports.CaminoInverso=CaminoInverso