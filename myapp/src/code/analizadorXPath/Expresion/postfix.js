import { Tipo, TipoPath } from '../AST/Entorno'

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
          if (obj.valor != '') retorno.push(obj.valor)
        } else {
          // obtiene el texto de manera recursiva
          retorno = obj.entorno.getTextoRelativo()
        }
      }
    }
    return retorno
  }
}
