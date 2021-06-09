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
        var Retornos = []
        Retornos.push(new Nodo(Tipo.NODO,Entorno,[],""))
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
}

//Clase para los tipos nodes
export class PathExpElement
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

export class AxisStepExp
{
    constructor(valor,predicado)
    {
        this.valor=valor
        this.predicado=predicado
    }

    getValor(pila,Entorno,tipo)
    {
        var retorno = this.valor.getValor(pila,Entorno,tipo)
        if(this.predicado.length > 0)
        {
            for (const iterator of this.predicado) {
                retorno=iterator.getValor(retorno)
            }
        }
        return retorno
    }
}
