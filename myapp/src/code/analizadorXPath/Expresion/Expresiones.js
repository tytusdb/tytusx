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
}exports.Literal = Literal

exports.PathExp = class PathExp 
{
    constructor(caminos) 
    {
        this.caminos=caminos
    }

    getValor(Entorno)
    {
        var temp = []
        var Retornos = []
        var TipoRetorno = Tipo.ERROR
        temp.push(Entorno)
        for (const iterator of this.caminos) {
            Retornos = [];
            for (const iterator2 of temp) {
                var ret = iterator.getValor(iterator2)
                Retornos = Retornos.concat(ret.valor)
                if(ret.tipo == Tipo.ERROR)
                {
                    return new Literal(Tipo.ERROR,'@Error@')
                }
                TipoRetorno=ret.tipo   
            }
            temp = Retornos
        }
        if(Retornos.length>1)
        {
            return new Literal(Tipo.NODO,Retornos)
        }
        else if(Retornos.length>0)
        {
            return new Literal(TipoRetorno,Retornos[0])
        }
        else
        {
            return new Literal(Tipo.ERROR,'@Error@')
        }
    }
}

//Clase para los tipos nodes
exports.PathExpElement = class PathExpElement
{
    constructor(siguiente,tipo)
    {
        this.siguiente = siguiente
        this.tipo = tipo
    }

    getValor(Entorno)
    {
        return this.siguiente.getValor(Entorno,this.tipo)
    }
}

exports.AxisStepExp = class AxisStepExp
{
    constructor(valor,predicado)
    {
        this.valor=valor
        this.predicado=predicado
    }

    getValor(Entorno,tipo)
    {
        if(this.predicado.lenght > 0)
        {

        }
        else
        {
            return this.valor.getValor(Entorno,tipo)
        }
    }
}

exports.Atributo = class Atributo
{
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor(Entorno,tipo)
    {
        var retorno = new Literal(Tipo.ERROR,'@Error@');
        var datos = []
        if(tipo==TipoPath.ABS)
        {
            for (const iterator of Entorno.atributos) {
                if(iterator.nombre == this.nombre || this.nombre=="*")
                {
                    datos.push(Entorno)
                }
            }
        }
        else
        {
            datos = RecursivaAtributo(Entorno,this.nombre)
        }
        //No existia el hijo
        if(datos.length>0)
        {
            retorno = new Literal(Tipo.NODO,datos);
        }
        return retorno
    }
}

function RecursivaAtributo(Entorno,nombre) 
{
    var datos = [];
    for (const iterator of Entorno.hijos) {
        datos = RecursivaCamino(iterator)
    }
    for (const iterator of Entorno.atributos) {
        if(iterator.nombre == this.nombre || this.nombre=="*")
        {
            datos.push(iterator)
        }
    }
    return Entorno
}

exports.Camino = class Camino
{
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor(Entorno,tipo)
    {
        var retorno = new Literal(Tipo.ERROR,'@Error@');
        var datos = []
        if(tipo==TipoPath.ABS)
        {
            for (const iterator of Entorno.hijos) {
                if(iterator.tipo == this.nombre || this.nombre=="*")
                {
                    datos.push(iterator)
                }
            }
        }
        else
        {
            datos = RecursivaCamino(Entorno,this.nombre)
        }
        //No existia el hijo
        if(datos.length>0)
        {
            retorno = new Literal(Tipo.NODO,datos);
        }
        return retorno
    }
}

function RecursivaCamino(Entorno,nombre) 
{
    var datos = [];
    if(Entorno.tipo==nombre)
    {
        datos.push(Entorno)
    }
    for (const iterator of Entorno.hijos) {
        datos = datos.concat(RecursivaCamino(iterator,nombre))
    }
    return datos
}

exports.CaminoInverso = class CaminoInverso
{  
    constructor(nombre)
    {
        this.nombre=nombre
    }

    getValor()
    {
        
    }
}