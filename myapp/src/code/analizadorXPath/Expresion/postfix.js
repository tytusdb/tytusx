import { concat, pad } from "lodash"
import { Tipo, TipoPath, Predicado } from "../AST/Entorno"
import { Nodo } from "./Expresiones"


class PostFix
{
  constructor(predicado,tipo)
  {
    this.predicado=predicado
    this.tipo=tipo
  }
}

// TEXTO


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