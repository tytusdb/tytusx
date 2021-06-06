import { concat } from "lodash"
import { Tipo, TipoPath, Siblings } from "../AST/Entorno"
import { Literal, Nodo } from "./Expresiones"

export class Axes 
{
  constructor(nombre)
  {
    this.nombre=nombre
    this.predicado=[]
    this.tipo=null
  }

  getValor(nodos)
  {

  }
}

export class Child extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(pila,Entorno,tipo)
    {
      var hijo = new Camino(this.nombre)
      return hijo.getValor(pila,Entorno,tipo)
    }
}

export class Descendant extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(pila,Entorno,tipo)
  {
    var descendiente = new Camino(this.nombre)
    return descendiente.getValor(pila,Entorno,TipoPath.REL)
  }
}

export class Attribute extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(pila,Entorno,tipo)
  {
    var atributo = new Atributo(this.nombre)
    return atributo.getValor(pila,Entorno,tipo)
  }
}

export class Self extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(pila,Entorno,tipo)
  {
    if(Entorno.tipo==this.nombre)
    {
      return [new Nodo(Tipo.NODO,Entorno,pila,Entorno.texto)]
    }
    else if(tipo=TipoPath.REL)
    {
      var hijo = new Camino(this.nombre)
      return hijo.getValor(pila,Entorno,tipo)
    }
    return [new Literal(Tipo.ERROR,'@Error@')]
  }
}

export class DescSelf extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(pila,Entorno,tipo)
  {
    var retorno = []
    if(Entorno.tipo==this.nombre)
    {
      retorno.push(new Nodo(Tipo.NODO,Entorno,pila,Entorno.texto)) 
    }
    for (const iterator of Entorno.hijos) {
      var nuevaPila = Object.assign([],pila)
      nuevaPila.push(Entorno)
      var hijo = new Camino(this.nombre)
      retorno = retorno.concat(hijo.getValor(nuevaPila,iterator,TipoPath.REL))
    }
    if(retorno.length>0)
    {
      return retorno
    }
    return [new Literal(Tipo.ERROR,'@Error@')]
  }
}

export class FollowSibling extends Axes
{
  constructor(nombre)
  {
    super(nombre)
  }

  getValor(Objetos)
  {
    
  }
}

export class Atributo extends Axes
{
    constructor(nombre)
    {
        super(nombre)
    }

    getValor(nodos)
    {
        var retornos = []
        for (const nodo of nodos) 
        {
          var retorno = []
          if(this.tipo==TipoPath.ABS)
          {
              var nuevaPila = Object.assign([],nodo.pila)
              nuevaPila.push(nodo.entorno)
              for (const iterator of nodo.entorno.atributos) {
                  if(iterator.nombre == this.nombre || this.nombre=="*" )
                  {
                      retorno.push(new Nodo(Tipo.ATRIB,nodo.entorno,nuevaPila,iterator.valor))
                  }
              }
          }
          else
          {
              retorno = RecursivaAtributo(nodo.pila,nodo.entorno,this.nombre)
          }
          retornos = retornos.concat(retorno)
        }
        return retornos
    }
}

function RecursivaAtributo(pila,Entorno,nombre) 
{
    var retorno = []
    var nuevaPila = Object.assign([],pila)
    nuevaPila.push(Entorno)
    for (const iterator of Entorno.atributos) {
        if(iterator.nombre == nombre || nombre=="*")
        {
            retorno.push(new Nodo(Tipo.ATRIB,Entorno,nuevaPila,iterator.valor))  
        }
    }
    for (const iterator of Entorno.hijos) {
        var temp = RecursivaAtributo(nuevaPila,iterator,nombre)
        retorno = retorno.concat(temp)
    }
    return retorno
}

export class Camino extends Axes
{
    constructor(nombre)
    {
      super(nombre)
    }

    getValor(nodos)
    {
        var retornos = []
        for (const nodo of nodos) 
        {
          var retorno = []
          if(this.tipo==TipoPath.ABS)
          {
              for (const iterator of nodo.entorno.hijos) {
                  if(iterator.tipo == this.nombre || this.nombre=="*" )
                  {
                      var nuevaPila = Object.assign([],nodo.pila)
                      nuevaPila.push(nodo.entorno)
                      retorno.push(new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto))
                  }
              }
          }
          else
          {
            for (const hijo of nodo.entorno.hijos) { 
              var nuevaPila = Object.assign([],nodo.pila)
              nuevaPila.push(nodo.entorno)
              retorno = retorno.concat(RecursivaCamino(nuevaPila,hijo,this.nombre))
            }
          }
          retornos = retornos.concat([],retorno)
        }
        return retornos
    }
}

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