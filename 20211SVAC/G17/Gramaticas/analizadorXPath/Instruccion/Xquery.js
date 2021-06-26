import { Tipo } from "../AST/Entorno";
import { Literal, Nodo } from "../Expresion/Expresiones";


export class Declaracion
{
  constructor(nombre,expresion)
  {
    this.nombre=nombre
    this.expresion=expresion
  }

  getValor(nodos)
  {
    var retornos = this.expresion.getValor(nodos)
    if(retornos[0] && retornos[0].tipo==Tipo.ERROR) return
    if(this.contains(nodos,retornos)) return
    var Entorno =
    {
      tipo : `${this.nombre}`,
      atributos : [],
      hijos:retornos,
      texto:'',
      posTipo : 0,
      posTexto : 0,
    }
    nodos.push(new Nodo(Tipo.NODO,Entorno,[],'',1))
  }

  contains(nodos,retornos)
  {
    for (const nodo of nodos) {
      if(nodo.entorno.tipo==this.nombre){
        nodo.entorno.hijos = retornos
        return true
      } 
    }
    return false
  }

  getValor
}

export class Let{
  constructor(declaracion)
  {
    this.declaraciones = []
    this.declaraciones.push(declaracion)
    this.intermediate = []
    this.expReturn=null
  }

  getValor(nodos)
  {
    var newEntorno = [...nodos]
    for (const declaracion of this.declaraciones) {
      declaracion.getValor(newEntorno)
    }
    for (const intermedia of this.intermediate) {
      intermedia.getValor(newEntorno)
    }
    var retorno = this.return(newEntorno)
    return retorno
  }

  return(nodos)
  {
    return this.expReturn.getValor(nodos)
  }
}

export class ForDeclaracion
{
  constructor(nombre,posicion='',expresion)
  {
    this.nombre = nombre
    this.posicion = posicion
    this.expresion = expresion
  }

  getValor(nodos=[])
  {
    var retornos = this.expresion.getValor(nodos)
    if(retornos[0] && retornos[0].tipo==Tipo.ERROR) return {valor:[],posicion:[],largo:0}
    var Iterador = []
    if(this.posicion!='')
    { 
      for (let index = 0; index < retornos.length; index++) {
        Iterador.push(new Literal(Tipo.INTEGER,index+1))  
      } 
    }
    return {valor:retornos,posicion:Iterador,largo:retornos.length,nombreValor:this.nombre,nombrePosicion:this.posicion}
  }

  contains(nodos,nombre,retornos)
  {
    for (const nodo of nodos) {
      if(nodo.entorno.tipo==nombre){
        nodo.entorno.hijos = retornos
        return true
      } 
    }
    return false
  }
}

export class For{
  constructor(declaraciones=[])
  {
    this.declaraciones = declaraciones
    this.intermediate = []
    this.expReturn = null
  }

  getValor(nodos)
  {
    var nuevos = []
    for (const declaracion of this.declaraciones) {
      nuevos.push(declaracion.getValor(nodos))
    }
    for (const intermedia of this.intermediate) {
      intermedia.getValor(nodos)
    }
    var pila = nuevos.map(function(val){return 0})
    return this.return(nodos,nuevos,0,pila)
  }

  return(nodos,nuevos,posicion,pila)
  {
    var retornos = []
    for (let i = 0; i < nuevos[posicion].valor.length; i++) {
      var tempnodos = [...nodos]
      tempnodos.push(
        new Nodo(
          Tipo.NODO, 
          {
            tipo : nuevos[posicion].nombreValor,
            atributos : [],
            hijos:nuevos[posicion].valor[i],
            valor:'',
            posTipo : 0,
            posTexto : 0,
          }
        )
      )
      if(nuevos[posicion].posicion.length>0)
      {
        tempnodos.push(
          new Nodo(
            Tipo.NODO, 
            {
              tipo : nuevos[posicion].nombrePosicion,
              atributos : [],
              hijos:nuevos[posicion].posicion[i],
              texto:'',
              posTipo : 0,
              posTexto : 0,
            }
          )
        )
      }
      if(nuevos.length-1>posicion) {
        retornos = retornos.concat(this.return(tempnodos,nuevos,posicion+1,pila))
      }
      else {
        retornos = retornos.concat(this.expReturn.getValor(tempnodos))
      }
    }
    return retornos
  }
}
