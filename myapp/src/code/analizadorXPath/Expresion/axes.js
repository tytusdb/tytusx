import { Tipo, TipoPath, concatenarNodos, Predicado } from "../AST/Entorno"
import { Nodo } from "./Expresiones"

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

  GraficarAxis(ListaNodes,ListaEdges,contador,Axis="")
  {
    var NodosActuales = []
    var nodoTipo = {id:contador.num,label:this.tipo==TipoPath.ABS ? "/" : "//"}
    NodosActuales.push(nodoTipo);ListaNodes.push(nodoTipo);contador.num++
    var nodoNombre = {id:contador.num,label:Axis+this.nombre}
    NodosActuales.push(nodoNombre);ListaNodes.push(nodoNombre);contador.num++
    for (const predicado of this.predicado) 
    {
      var nodoCorcheteA = {id:contador.num,label:"["}
      NodosActuales.push(nodoCorcheteA);ListaNodes.push(nodoCorcheteA);contador.num++
      var nodoActual= {id:contador.num,label:"Path"}
      NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
      var nodos = predicado.Graficar(ListaNodes,ListaEdges,contador)
      for (const nodo of nodos) {
        ListaEdges.push({from:nodoActual.id,to:nodo.id})
      }
      var nodoCorcheteC = {id:contador.num,label:"]"}
      NodosActuales.push(nodoCorcheteC);ListaNodes.push(nodoCorcheteC);contador.num++
    }
    return NodosActuales
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"child::")
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
    var descendiente
    if(this.tipo==TipoPath.ABS)
    {
      descendiente = new Camino(this.nombre,[],TipoPath.REL).getValor(nodos)
      descendiente = Predicado(this.predicado,descendiente)
    }
    else
    {
      descendiente = new Camino(this.nombre,this.predicado,TipoPath.REL).getValor(nodos)
    }
    return descendiente
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"descendant::")
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"attribute::")
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"self::")
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"descendant-or-self::")
  }
}

export class FollowSibling extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos,nivel)
  {
    if(!nivel) nivel = 0
    var retornos = new  Map()
    for (const nodo of nodos) {
      var retorno = []
      var nuevaPila = Object.assign([],nodo.pila)
      var entorno = nuevaPila.pop()
      var Padre = [new Nodo(Tipo.NODO,entorno,nuevaPila,"")]
      var hermanos = new Camino(this.nombre,[],TipoPath.ABS).getValor(Padre)
      var indice=-1;
      for (const [i,v] of hermanos.entries()) {
        if(v.entorno == nodo.entorno)
        { 
          indice=i
        }
        if(indice!=-1 && i>indice-nivel && v.entorno.tipo==this.nombre)
        {
          retorno.push(v)
        }
      }
      retorno = Predicado(this.predicado,retorno)
      if(this.tipo==TipoPath.REL){
        var subretorno = []
        for (const hijo of nodo.entorno.hijos) { 
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          subretorno = subretorno.concat(new FollowSibling(this.nombre,this.predicado,this.tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,"")],1))
        }
        retorno = retorno.concat(subretorno)
      }
      for (const iterator of retorno) {
        retornos.set(iterator.entorno,iterator)
      }
    }
    var realretorno=[]
    for (const valor of retornos.values()) {
      realretorno.push(valor)
    }
    return realretorno
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"following-sibling::")
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
    for (const nodo of nodos) {
      var retorno = []
      var nuevaPila = Object.assign([],nodo.pila)
      var EntornoActual = nuevaPila.pop()
      var posibles = (new Camino("*",[],TipoPath.ABS)).getValor([new Nodo(Tipo.NODO,EntornoActual,nuevaPila,"")])
      var indice = -1
      for (let index = 0; index < posibles.length; index++) {
        if(posibles[index].entorno == nodo.entorno)
        {
          indice = index
        }
        if(indice!=-1 && index > indice)
        {
          if (posibles[index].entorno.tipo==this.nombre) retorno.push(posibles[index])
          var nuevaPila2 = (Object.assign([],posibles.pila)).push(posibles[index].entorno)
          var descendientes = (new Camino("*",[],TipoPath.REL)).getValor([new Nodo(Tipo.NODO,posibles[index].entorno,nuevaPila2,"")])
          for (const descendiente of descendientes) {
            if (descendiente.entorno.tipo==this.nombre) retorno.push(descendiente)
          }
        }
      }
      retorno = Predicado(this.predicado,retorno)
      for (const v of retorno) {
        retornos.set(v.entorno,v)
      }
      if(this.tipo==TipoPath.REL)
      {
        var retorno = []
        var nuevaPila = Object.assign([],nodo.pila)
        var EntornoActual = nuevaPila.pop()
        var posibles = (new Camino("*",[],TipoPath.REL)).getValor([new Nodo(Tipo.NODO,EntornoActual,nuevaPila,"")])
        var indice = -1
        for (let index = 0; index < posibles.length; index++) {
          if(posibles[index].entorno == nodo.entorno)
          {
            indice = index
          }
          if (indice!=-1 && index > indice && posibles[index].entorno.tipo==this.nombre) retorno.push(posibles[index])
        }
        retorno = Predicado(this.predicado,retorno)
        for (const v of retorno) {
          retornos.set(v.entorno,v)
        }
      }
    }
    var temp = []
    for (const val of retornos.values()) {
      temp.push(val)
    }
    return temp
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"following::")
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"@")
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
        var posicion = 0;
        if(this.tipo==TipoPath.ABS)
        {
            for (const iterator of nodo.entorno.hijos) {
                if(iterator.tipo == this.nombre || this.nombre=="*" )
                {
                    var nuevaPila = Object.assign([],nodo.pila)
                    nuevaPila.push(nodo.entorno)
                    retorno.push(new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto,posicion,posicion))
                    posicion++
                }
            }
            retorno = Predicado(this.predicado,retorno)
        }
        else
        {
          retorno = RecursivaCamino(nodos,this.nombre,this.predicado)
        }
        retornos = concatenarNodos(retornos,retorno)
      }
      return retornos
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"")
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
}

function RecursivaCamino(nodos,nombre,predicado) 
{
  var retorno = []
  for (const nodo of nodos) 
  {
    var hijos=[]
    var subretorno = []
    for (const [index,iterator] of nodo.entorno.hijos.entries()) {
      var nuevaPila = Object.assign([],nodo.pila)
      nuevaPila.push(nodo.entorno)
      var hijo = new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto)
      hijos.push(RecursivaCamino([hijo],nombre,predicado))
      if(iterator.tipo==nombre || nombre=="*") { hijo.posicion=index; subretorno.push(hijo);  }
    } 
    subretorno = Predicado(predicado,subretorno)
    var index = 0
    for (const [indexHijo,hijo] of hijos.entries()) {
      if(subretorno[index] && subretorno[index].posicion==indexHijo)
      {
        retorno.push(subretorno[index])
        index++
      }
      retorno = retorno.concat(hijo)
    }
    //retorno = retorno.concat(subretorno,retornoTemp)
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
      var convertido = Predicado(this.predicado,[nuevoNodo])
      for (const iterator of convertido) {
        mapa.set(temp,iterator) 
      }
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"")
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
    var padre = new CaminoInverso(this.nombre,this.predicado,this.tipo)
    var retorno = padre.getValor(nodos)
    return retorno
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"parent::")
  }
}

export class Ancestor extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var mapa = new Map()
    for (const nodo of nodos) {
      var submapa = new Map()
      var hijos = []
      if(this.tipo==TipoPath.REL)
      {
        var subhijos = []
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          subhijos.push(new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto))
        }
        hijos = hijos.concat((new Ancestor(this.nombre,this.predicado,this.tipo)).getValor(subhijos))
      }
      var nuevaPila = (Object.assign([],nodo.pila))
      while  (nuevaPila.length>0) {
        var entorno = nuevaPila.pop()
        if(entorno.tipo==this.nombre) submapa.set(entorno,new Nodo(Tipo.NODO,entorno,nuevaPila,entorno.texto))
        nuevaPila = (Object.assign([],nuevaPila))
      }
      var temp = []
      for (const valor of submapa.values()) {
        temp.push(valor)
      }
      temp = Predicado(this.predicado,temp)
      for (const v of temp) {
        mapa.set(v.entorno,v)
      }
      for (const v of hijos) {
        mapa.set(v.entorno,v)
      }
    }
    var temp = []
    for (const valor of mapa.values()) {
      temp.push(valor)
    }
    return temp
  }
  
  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"ancestor::")
  }
}

export class PrecedingSibling extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos,nivel)
  {
    if(!nivel) nivel = 0
    var retornos = new  Map()
    for (const nodo of nodos) {
      var retorno = []
      var nuevaPila = Object.assign([],nodo.pila)
      var entorno = nuevaPila.pop()
      var Padre = [new Nodo(Tipo.NODO,entorno,nuevaPila,"")]
      var hermanos = new Camino(this.nombre,[],TipoPath.ABS).getValor(Padre)
      var indice=-1;
      for (const [i,v] of hermanos.entries()) {
        if(v.entorno == nodo.entorno)
        { 
          indice=i
        }
        if(indice==-1)
        {
          retorno.push(v)
        }
      }
      retorno = Predicado(this.predicado,retorno)
      if(this.tipo==TipoPath.REL){
        var subretorno = []
        for (const hijo of nodo.entorno.hijos) { 
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          subretorno = subretorno.concat(new PrecedingSibling(this.nombre,this.predicado,this.tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,"")],1))
        }
        retorno = retorno.concat(subretorno)
      }
      for (const iterator of retorno) {
        retornos.set(iterator.entorno,iterator)
      }
    }
    var realretorno=[]
    for (const valor of retornos.values()) {
      realretorno.push(valor)
    }
    return realretorno
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"preceding-sibling::")
  }
}

export class AncestorSelf extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      var retorno = new Map()
      if(nodo.entorno.tipo==this.nombre)
      {
        retorno.set(nodo.entorno,nodo)
      }
      var ancestros = new Ancestor(this.nombre,[],this.tipo).getValor([nodo])
      for (const ancestro of ancestros) {
        retorno.set(ancestro.entorno,ancestro)
      }
      var temp = []
      for (const valor of retorno.values()) {
        temp.push(valor)
      }
      temp = Predicado(this.predicado,temp)
      retornos = retornos.concat(temp.reverse())
    }
    return retornos
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"ancestor-or-sibling::")
  }
}