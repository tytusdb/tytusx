import { concat } from "lodash"
import { Tipo, TipoPath, Siblings } from "../AST/Entorno"
import { Literal, Nodo } from "./Expresiones"

export class Axes 
{
  constructor(nombre,predicado,tipo)
  {
    this.nombre=nombre
    this.predicado=predicado
    this.tipo=tipo
  }

  getValor(nodos)
  {

  }
}

export class Child extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var hijo = new Camino(this.nombre,this.predicado,this.tipo)
    return hijo.getValor(nodos)
  }
}

export class Descendant extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    if(this.tipo==TipoPath.ABS)
    {
      var descendiente = new Camino(this.nombre,[],TipoPath.REL).getValor(nodos)
      descendiente = Predicado(this.predicado,descendiente)
    }
    else
    {
      var descendiente = new Camino(this.nombre,this.predicado,TipoPath.REL).getValor(nodos)
    }
    return descendiente
  }
}

export class Attribute extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var atributo = new Atributo(this.nombre,this.predicado,this.tipo)
    return atributo.getValor(nodos)
  }
}

export class Self extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos=[]
    for (const nodo of nodos) {
      var retorno = []
      if(nodo.entorno.tipo==this.nombre || this.nombre=="*")
      {
        retorno.push(nodo)
        retorno = Predicado(this.predicado,retorno)
      }
      if(this.tipo==TipoPath.REL)
      {
        var hijos=[]
        for (const iterator of nodo.entorno.hijos) {
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          hijos.push(new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto))
        } 
        var hijo = new Self(this.nombre,this.predicado,this.tipo).getValor(hijos)
        retorno = retorno.concat(hijo)
      }
      retornos = retornos.concat(retorno)
    }
    return retornos
  }
}

export class DescSelf extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      var retorno=[]
      if(nodo.entorno.tipo==this.nombre)
      {
        retorno.push(nodo) 
      }
      if(this.tipo==TipoPath.ABS)
      {
        var descendiente = new Camino(this.nombre,[],TipoPath.REL).getValor([nodo])
        retorno = retorno.concat(descendiente)
        retorno = Predicado(this.predicado,retorno)
      }
      else
      {
        var descendiente = new Camino(this.nombre,this.predicado,TipoPath.REL).getValor([nodo])
        retorno = retorno.concat(descendiente)
      }
      retornos=retornos.concat(retorno)
    }
    return retornos
  }
}

export class FollowSibling extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos = new Map()
    for (let i = 0; i < nodos.length; i++) {
      var nuevaPila = Object.assign([],nodos[i].pila)
      var EntornoActual = nuevaPila.pop()
      var posibles = (new Camino("*",[],this.tipo)).getValor([new Nodo(Tipo.NODO,EntornoActual,nuevaPila,"")])
      var Insertar=false
      for (const posible of posibles) {
        if(Insertar && posible.entorno.tipo==this.nombre) retornos.set(posible.entorno,posible)
        if(nodos[i].entorno==posible.entorno)
        {
          Insertar=true
        }
      }
    }
    var tempRetorno=[]
    for (const [clave,valor] of retornos) {
      tempRetorno.push(valor)
    }
    return tempRetorno
  }
}


export class Follow extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos = new Map()
    for (let i = 0; i < nodos.length; i++) {
      var nuevaPila = Object.assign([],nodos[i].pila)
      var EntornoActual = nuevaPila.pop()
      var posibles = (new Camino("*",[],this.tipo)).getValor([new Nodo(Tipo.NODO,EntornoActual,nuevaPila,"")])
      var Insertar=false
      for (const posible of posibles) {
        if(Insertar && posible.entorno.tipo==this.nombre) retornos.set(posible.entorno,posible)
        if(nodos[i].entorno==posible.entorno)
        {
          Insertar=true
        }
      }
    }
    var tempRetorno=[]
    for (const [clave,valor] of retornos) {
      tempRetorno.push(valor)
    }
    return tempRetorno
  }
}

export class Atributo extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
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
          retorno = Predicado(this.predicado,retorno)
      }
      else
      {
          retorno = RecursivaAtributo(nodos,this.nombre,this.predicado)
      }
      retornos = retornos.concat(retorno)
    }
    return retornos
  }
}

export class Camino extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
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
            retorno = Predicado(this.predicado,retorno)
        }
        else
        {
          retorno = RecursivaCamino(nodos,this.nombre,this.predicado)
        }
        retornos = retornos.concat(retorno)
      }
      return retornos
  }
}

function RecursivaAtributo(nodos,nombre,predicado) 
{
  var retornos=[]
  for (const nodo of nodos) 
  {
    var retorno = []
    var hijos = []
    for (const atributo of nodo.entorno.atributos) {
      if(atributo.nombre == nombre || nombre=="*") {
        var nuevoNodo = Object.assign({},nodo)
        nuevoNodo.tipo=Tipo.ATRIB
        retorno.push(nuevoNodo)
      }
    }
    for (const iterator of nodo.entorno.hijos) {
      var nuevaPila = Object.assign([],nodo.pila)
      nuevaPila.push(nodo.entorno)
      var hijo = new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto)
      hijos.push(hijo)
    }
    var retornohijos = RecursivaAtributo(hijos,nombre,predicado)
    retorno = Predicado(predicado,retorno)
    retornos = retornos.concat(retorno,retornohijos)
  }
  return retornos
   /* var retorno = []
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
    return retorno*/
}

function RecursivaCamino(nodos,nombre,predicado) 
{
  var retorno = []
  for (const nodo of nodos) 
  {
    var hijos=[]
    var subretorno = []
    for (const iterator of nodo.entorno.hijos) {
      var nuevaPila = Object.assign([],nodo.pila)
      nuevaPila.push(nodo.entorno)
      var hijo = new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto)
      hijos.push(hijo)
      if(iterator.tipo==nombre || nombre=="*") subretorno.push(hijo)
    } 
    var retornoTemp = RecursivaCamino(hijos,nombre,predicado)
    subretorno = Predicado(predicado,subretorno)
    retorno = retorno.concat(subretorno,retornoTemp)
  }
  return retorno
}

function Predicado(predicado,retorno)
{
  if(predicado.length > 0)
  {
    for (const iterator of predicado) {
      var posibles=iterator.getValor(retorno)
      if(posibles[0].tipo!=undefined)
      {
        switch(posibles[0].tipo)
        {
          case Tipo.NODO:
            retorno=posibles
            break
          case Tipo.INTEGER:
          case Tipo.DECIMAL:
            var temp=[]
            for (const posible of posibles) {
              if(retorno[posible.valor-1])
              {
                temp.push(retorno[posible.valor-1])
              }
            }
            retorno = temp
            break
        }
      }
    } 
  }
  return retorno
}


export class CaminoInverso extends Axes
{  
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var mapa = new Map()
    for (const nodo of nodos) {
      var nuevaPila = Object.assign([],nodo.pila)
      var temp = nuevaPila.pop()
      var nuevoNodo = new Nodo(Tipo.NODO,temp,nuevaPila,temp.texto) 
      mapa.set(temp,nuevoNodo)
      if(this.tipo==TipoPath.REL)
      {
        var temps = (new Camino(this.nombre,[],this.tipo)).getValor([nuevoNodo])
        for (const temp of temps) {
          mapa.set(temp.entorno,temp)
        }
      }
    }
    var tempRetorno=[]
    for (const [clave,valor] of mapa  ) {
      tempRetorno.push(valor)
    }
    return tempRetorno
  }
}

export class Parent extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var padre = new CaminoInverso(this.nombre,[],this.tipo)
    var retorno = padre.getValor(nodos)
    return retorno
  }
}