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
    this.return=null
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
    var retorno = this.return.getValor(newEntorno)
    return retorno
  }
}

export class Return
{
  constructor(expresion)
  {
    this.expresion=expresion
  }

  getValor(nodos)
  {
    return this.expresion.getValor(nodos)
  }
}

export class FotDeclaracion
{
  constructor(nombre,posicion='',exp)
  {
    this.nombre = nombre
    this.posicion = posicion
    this.exp = exp
  }

  getValor(nodos)
  {
    var retornos = this.expresion.getValor(nodos)
    if(retornos[0] && retornos[0].tipo==Tipo.ERROR) return
    if(!this.contains(nodos,this.nombre,retornos))
    {
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
    if(this.posicion=='') return retornos
    var Iterador = []
    for (let index = 0; index < array.length; index++) {
      Iterador.push(new Literal(Tipo.INTEGER,index+1))  
    } 
    if(!this.contains(nodos,this.posicion,Iterador))
    {
      var Entorno =
      {
        tipo : `${this.posicion}`,
        atributos : [],
        hijos:Iterador,
        texto:'',
        posTipo : 0,
        posTexto : 0,
      }
      nodos.push(new Nodo(Tipo.NODO,Entorno,[],'',1))
    } 
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
  constructor()
  {

  }

  getValor()
  {
    
  }
}