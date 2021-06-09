import { concat, pad } from "lodash"
import { Tipo, TipoPath, Predicado } from "../AST/Entorno"
import { Nodo,Literal } from "./Expresiones"


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
      default:
        //Retorno un error semantico
        break;
    }
    return retorno
  }

}
// GET LAST
export class Last extends PostFix {

  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(Objetos)
  {
    var retorno = []
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

    return retorno
  }

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
}