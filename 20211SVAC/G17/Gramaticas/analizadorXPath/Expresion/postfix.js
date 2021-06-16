import { concat, pad, truncate } from "lodash"
import { Tipo, TipoPath, Predicado } from "../AST/Entorno"
import { Camino } from "./axes"
import { Literal, Nodo } from "./Expresiones"
const { ErroresGlobal } = require('../AST/Global')


class PostFix
{
  constructor(predicado,tipo)
  {
    this.predicado=predicado
    this.tipo=tipo
  }
}

// TEXTO
export class Texto extends PostFix {

  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(Objetos)
  {
    var retorno = []
    
    // recorrer todos los ojetos para concatener el texto
    for (var obj of Objetos ){
      // si no es de tipo nodo, omite el objeto
      if (obj.tipo == Tipo.NODO) {
        // concatenar el texto de los hijos
        if (this.tipo == TipoPath.ABS){
          // no concatenar vacíos
          if (obj.valor != '') retorno.push(new Literal(Tipo.STRING,obj.valor))
        } else {
          // obtiene el texto de manera recursiva
          retorno = obj.entorno.getTextoRelativo()
        }
      }
    }
    return retorno
  }
}


// CONTEXT
export class ContextItemExpr extends PostFix
{
  constructor(predicado,tipo)
  {
    super(predicado,tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    var retorno = []
    for (const nodo of nodos) {
      retorno.push(nodo)  
      if(this.tipo==TipoPath.REL) //Verifica si es de tipo Relativo para buscar el contexto actual de los hijos
      {
        var hijos=GenerarNodosHijos(nodo.entorno)
        var retornos = retornos.concat(new ContextItemExpr(this.predicado,this.tipo).getValor(hijos))
      } 
    }
    retorno = Predicado(this.predicado,retorno)
    retornos = concat(retorno,retornos)
    return retornos
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    var NodosActuales = []
    var nodoTipo = {id:contador.num,label:this.tipo==TipoPath.ABS ? "/" : "//"}
    NodosActuales.push(nodoTipo);ListaNodes.push(nodoTipo);contador.num++
    var nodoNombre = {id:contador.num,label:"."}
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

function GenerarNodosHijos(padre)
{
  var hijos = []
  for (const hijo of padre.hijos) {
    var nuevaPila = Object.assign([],padre.pila)
    nuevaPila.push(padre)
    hijos.push(new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.valor))
  }
  return hijos;
}

//CALLFUNCTION
export class CallFunction extends PostFix 
{
  constructor(predicado,tipo,nombre)
  {
    super(predicado,tipo)
    this.nombre=nombre
  }

  getValor(nodos)
  {
    var retorno = []
    switch(this.nombre)
    {
      case 'text':
        retorno = new Texto(this.predicado,this.tipo).getValor(nodos)
        break;
      case 'last':
        retorno = new Last(this.predicado,this.tipo).getValor(nodos)  
        break;    
      case 'node':
        retorno = new Node(this.predicado,this.tipo).getValor(nodos)
        break;
      case 'position':
        retorno = new Position(this.predicado,this.tipo).getValor(nodos)
        break;
      default:
        ErroresGlobal.push({Error:`No existe la funcion ${this.nombre}`,tipo:"Semantico",Linea:0,columna:0})
        break;
    }
    return retorno
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    var NodosActuales = []
    var nodoTipo = {id:contador.num,label:this.tipo==TipoPath.ABS ? "/" : "//"}
    NodosActuales.push(nodoTipo);ListaNodes.push(nodoTipo);contador.num++
    var nodoNombre = {id:contador.num,label:this.nombre+"("+")"}
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
// GET LAST
export class Last extends PostFix 
{

  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(Objetos)
  {
    var retorno = []
    /*
    var lastHijo

    // recorrer todos los ojetos para concatener el texto
    var obj = !Objetos[0] ? Objetos[0] : {tipo:Tipo.ERROR}
    var tipoEtiqueta = obj.tipo
    
    if (tipoEtiqueta == Tipo.NODO){
      // el array tiene al menos una posición y es de tipo nodo
      // recorrer el array
      for (var objeto of Objetos) {
        if (this.tipo == TipoPath.REL){
          // si es relativo, recorrer todos los hijos
          if (objeto.tipo == Tipo.NODO){
            var retornoObjeto = this.getLastRelativo(objeto.entorno)
            retorno = retorno.concat(retornoObjeto)
            lastHijo = objeto
          }
        }
      }
    }
    
    if (lastHijo){
      retorno.push(lastHijo)
    }
    */
    var lastIndex = Objetos.length 
    retorno.push(new Literal(Tipo.INTEGER, lastIndex))
    return retorno
  }

  /*
  getLastRelativo (objeto, tipo){
    // recorre todos los hijos de objeto  
    var retorno  = []
    var lastHijo  

    // recorrer todos los hijos y seleccionar el último
    for (var hijo of objeto.hijos) {
      if (hijo.tipo == tipo){
        lastHijo = hijo
        var retornoHijo = this.getLastRelativo(hijo)
        retorno = retorno.concat(retornoHijo)
      }
    }

    // insertar el último hijo
    if (lastHijo)
      retorno.push(new Nodo(Tipo.NODO,lastHijo, [], lastHijo.valor))
  }
  */
}

export class Position extends PostFix 
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var posiciones = []
    for (const nodo of nodos) {
      var posicion=nodo.posicion
      while((posicion)>Math.trunc(posicion)+0.09)
      {
        var temp = Math.trunc(posicion)
        temp*=10
        posicion*=10.0;
        posicion-=temp
      }
      posiciones.push(new Literal(Tipo.INTEGER,Math.trunc(posicion)))
    }
    return posiciones
  }
}

export class Node extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var posiciones = []
    for (const nodo of nodos) {
      if(nodo.valor!="")
      {
        posiciones.push(new Literal(Tipo.STRING,nodo.valor))
      }
      posiciones = posiciones.concat(new Camino("*",[],this.tipo).getValor([nodo]))
    }
    return posiciones
  }
}