import { concat, lowerCase, pad, truncate, upperCase } from "lodash"
import { Tipo, TipoPath, Predicado } from "../AST/Entorno"
import { Camino } from "./axes"
import { Literal, Nodo } from "./Expresiones"
import { retonarGlobal } from "../AST/Global"
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
  constructor(predicado,tipo,nombre,argumentos)
  {
    super(predicado,tipo)
    this.nombre=nombre
    this.argumentos = argumentos
  }

  getValor(nodos)
  {
    let expArgumentos = []
    for (const argumento of this.argumentos) {
        expArgumentos = expArgumentos.concat(argumento.getValor(nodos))
    }
    var retorno = []
    switch(this.nombre)
    {
      case 'text':
        if(expArgumentos.length==0){
          retorno = new Texto(this.predicado,this.tipo).getValor(nodos)
          break
        }
        ErroresGlobal.push({Error:`La funcion text no recive argumentos`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'last':
        if(expArgumentos.length==0){
          retorno = new Last(this.predicado,this.tipo).getValor(nodos)  
          break;    
        }
        ErroresGlobal.push({Error:`La funcion text no recive argumentos`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'node':
        if(expArgumentos.length==0){
          retorno = new Node(this.predicado,this.tipo).getValor(nodos)
          break;
        }
        ErroresGlobal.push({Error:`La funcion text no recive argumentos`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'position':
        if(expArgumentos.length==0){
          retorno = new Position(this.predicado,this.tipo).getValor(nodos)
          break;
        }
        ErroresGlobal.push({Error:`La funcion text no recive argumentos`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'upper-case':
        if(expArgumentos.length==1){
          retorno = new Mayusculas(this.predicado,this.tipo).getValor(expArgumentos)
          break
        }
        ErroresGlobal.push({Error:`La funcion uppercase necesita un argumento string`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'lower-case':
        if(expArgumentos.length==1){
          retorno = new Minusculas(this.predicado,this.tipo).getValor(expArgumentos)
          break
        }
        ErroresGlobal.push({Error:`La funcion uppercase necesita un argumento string`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'string':
        if(expArgumentos.length==1)
        {
          retorno = new toString(this.predicado,this.tipo).getValor(expArgumentos)
          break 
        }
        ErroresGlobal.push({Error:`La funcion string necesita un argumento item`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'number':
        if(expArgumentos.length==1)
        {
          retorno = new toNumber(this.predicado,this.tipo).getValor(expArgumentos)
          break
        }
        ErroresGlobal.push({Error:`La funcion string necesita un argumento item`,tipo:"Semantico",Linea:0,columna:0})
        break;
      case 'substring':
        if(expArgumentos.length==2 || expArgumentos.length==3)
        {
          retorno = new subString(this.predicado,this.tipo).getValor(expArgumentos)
          break
        }
        ErroresGlobal.push({Error:`La funcion subString Recive un string, Number o un String, Number, Number`,tipo:"Semantico",Linea:0,columna:0})
        break;
      default:
        ErroresGlobal.push({Error:`No existe la funcion ${this.nombre}`,tipo:"Semantico",Linea:0,columna:0})
        break;
    }
    retorno = Predicado(this.predicado,retorno)
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
//CALLFUNCTIONPREFIX
export class CallFunctionPrefix extends PostFix
{
  constructor(predicado,tipo,prefix,nombre,argumentos)
  {
    super(predicado,tipo)
    this.prefix = prefix
    this.nombre = nombre
    this.argumentos = argumentos
  }

  getValor(nodos)
  {
    if(this.prefix == "fn")
    {
      return new CallFunction(this.predicado,this.tipo,this.nombre,this.argumentos) 
    }
    else if(this.prefix == "local")
    {
      var retornos= []
      var funciones = retonarGlobal()
      for (const funcion of funciones) {
        if(funcion.nombre == this.nombre)
        {
          var nuevoEntorno = [...nodos]
          var ArgumentosRealizados = []
          for (const argumento of this.argumentos) {
            ArgumentosRealizados.push(argumento.getValor(nuevoEntorno))
          }
          if(ArgumentosRealizados.length != funcion.declaraciones.length)
          {
            ErroresGlobal.push({Error:`Error en los argumentos de la funcion`,tipo:"Semantico",Linea:0,columna:0})
            return []
          }
          for (let i = 0; i < ArgumentosRealizados.length; i++) {
            if(
                (ArgumentosRealizados[i][0] && funcion.declaraciones[i]) && 
                (funcion.declaraciones[i].tipo == ArgumentosRealizados[i][0].tipo || funcion.declaraciones[i].tipo==null)
              )
            {
              var Entorno =
              {
                tipo : funcion.declaraciones[i].nombre,
                atributos : [],
                hijos:ArgumentosRealizados[i],
                texto:'',
                posTipo : 0,
                posTexto : 0,
              }
              if(!this.contains(nuevoEntorno,Entorno,funcion.declaraciones[i].nombre))
              {
                nuevoEntorno.push(new Nodo(Tipo.NODO,Entorno,[],'',1))
              }
            }else
            {
              ErroresGlobal.push({Error:`Error en los argumentos de la funcion`,tipo:"Semantico",Linea:0,columna:0})
              return []
            }
          }
          for (const ejectuar of funcion.body) {
            retornos = retornos.concat(ejectuar.getValor(nuevoEntorno))
          }
          if(retornos[0].tipo != funcion.tipo && funcion.tipo != null)
          {
            ErroresGlobal.push({Error:`Error en el retorno de la funcion`,tipo:"Semantico",Linea:0,columna:0})
            return []
          }
          break
        }
      }
      return retornos
    }
  }
  contains(nodos,Entorno,nombre)
    {
      for (let i = 0; i < nodos.length; i++) {
        if(nodos[i].entorno.tipo == nombre)
        {
          nodos[i] = new Nodo(Tipo.NODO,Entorno,[],'',1)
          return true
        }
      }
      return false
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

export class Mayusculas extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      if(nodo.tipo==Tipo.STRING)
      {
        nodo.valor= upperCase(nodo.valor)
        retornos.push(nodo)
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion upper-case recive argumentos de tipo string`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }
}

export class Minusculas extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      if(nodo.tipo==Tipo.STRING)
      {
        nodo.valor= lowerCase(nodo.valor)
        retornos.push(nodo)
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion lower-case recive argumentos de tipo string`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }
}

export class toString extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      nodo.valor = nodo.valor.toString()
      nodo.tipo = Tipo.STRING
      retornos.push(nodo)
    }
    return retornos
  }
}

export class toNumber extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    var retornos = []
    for (const nodo of nodos) {
      nodo.valor = Number(nodo.valor)
      if(nodo.valor)
      {
        nodo.tipo = Tipo.DECIMAL
        retornos.push(nodo)
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion Number no se pudo realizar`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }
}

export class subString extends PostFix
{
  constructor (predicado, tipo) {
    super(predicado, tipo)
  }

  getValor(nodos)
  {
    if(nodos.length==2)
    {
      if (nodos[0].tipo == Tipo.STRING && (nodos[1].tipo==Tipo.DECIMAL || nodos[1].tipo==Tipo.INTEGER)) {
        let minimo = Number(nodos[1].valor) < 0 ? 0 : (Number(nodos[1].valor) )  
        nodos[0].valor = nodos[0].valor.toString().substr(minimo)
        return [nodos[0]]
      }
    }
    else
    {
      if (nodos[0].tipo == Tipo.STRING  
        && (nodos[1].tipo==Tipo.DECIMAL || nodos[1].tipo==Tipo.INTEGER)
        && (nodos[2].tipo==Tipo.DECIMAL || nodos[2].tipo==Tipo.INTEGER) ) {
        let minimo = Number(nodos[1].valor) < 0 ? 0 : (Number(nodos[1].valor) - 1)
        nodos[0].valor = nodos[0].valor.toString().substr(minimo,Number(nodos[2].valor))
        return [nodos[0]]
      }
    }
  }
}