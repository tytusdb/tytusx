import { concat, lowerCase, pad, truncate, upperCase } from "lodash"
import { Tipo, TipoPath, Predicado } from "../AST/Entorno"
import { Camino } from "./axes"
import { Literal, Nodo } from "./Expresiones"
import { retonarGlobal } from "../AST/Global"
const { ErroresGlobal } = require('../AST/Global')
const C3D = require('../../C3D')


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

  getC3D()
  {
    C3D.funcBoleanas[C3D.funcIndices.TEXT] = true
    var TT1 = C3D.newTemp();
    var cod = ""
    cod += `sp = sp + 1;\n`
    cod += `Text();\n`
    cod += `${TT1} = stack[(int)sp];\n`
    cod += `sp = sp - 1;`

    return {cod:cod,tipo:Tipo.STRING,valor:TT1}
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

  getC3D(){   

    C3D.funcBoleanas[C3D.funcIndices.SELF] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta del atributo ${this.nombre} */ \n`);

    //guardamos en el heapConsulta el camino que nos dieron /* esto solo viene una vez */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of "*") {
      var ascci = letra.charCodeAt(0);
      cod += (`heapConsulta[(int)hpc] = ${ascci}; \n`);
      cod += (`hpc = hpc + 1; \n`);
    } 
    cod += (`heapConsulta[(int)hpc] = -1; \n`);
    cod += (`hpc = hpc + 1; \n`);

    cod += (`\n/* Cambiando de entorno */\n`);
    cod += (`sp = sp + 1; \n`);
    var TC3 = C3D.newTemp();
    cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
    cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
    cod += (`Self(); \n`); //manda a llamar a la funcion atributo
    cod += (`sp = sp - 1; \n`);

    if(this.predicado.length > 0)
    {
      var tempCod
      for (const predicado of this.predicado) {
        tempCod = predicado.getC3D()
        if(tempCod.tipo == Tipo.DECIMAL || tempCod.tipo == Tipo.INTEGER)
        {
          C3D.funcBoleanas[C3D.funcIndices.PREDICADODECIMAL] = true
          cod += tempCod.cod;
          cod += `sp = sp + 1;\n`
          cod += `stack[(int)sp] = ${tempCod.valor};\n`
          cod += `predicadoDecimal();\n`
          cod += `sp = sp -1;\n`
        }
        if(tempCod.tipo == Tipo.STRING)
        {
          cod += tempCod.cod;
        }
        if(tempCod.tipo == Tipo.BOOLEAN)
        {
          C3D.funcBoleanas[C3D.funcIndices.PREDICADONODO] = true
          cod += tempCod.cod;
          cod += `sp = sp + 1;\n`
          cod += `stack[(int)sp] = ${tempCod.valor};\n`
          cod += `predicadoNodo();\n`
          cod += `sp = sp - 1;\n`
        }
      }
    }

    return {cod: cod, tipo: Tipo.NODO}

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
        retorno.push(new Literal(Tipo.ERROR,"@Error@"))
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

  
  getC3D()
  {
    var retornos = []
    for (const iterator of this.argumentos) {
      retornos.push(iterator.getC3D()) 
    }
    var retorno
    switch(this.nombre)
    {
      case 'text':
        retorno = new Texto(this.predicado,this.tipo)
        return retorno.getC3D();
      case 'last':
        retorno = new Last(this.predicado,this.tipo)
        return retorno.getC3D();
      case 'node':
        retorno = new Node(this.predicado,this.tipo)
        return retorno.getC3D();
      case 'position':
        retorno = new Position(this.predicado,this.tipo)
        break;
      case 'upper-case':
        retorno = new Mayusculas(this.predicado,this.tipo)
        return retorno.getC3D(retornos[0]);
      case 'lower-case':
        retorno = new Minusculas(this.predicado,this.tipo)
        return retorno.getC3D(retornos[0]);
      case 'string':
        retorno = new toString(this.predicado,this.tipo)
        return retorno.getC3D(retornos[0]);
      case 'number':
        retorno = new toNumber(this.predicado,this.tipo)
        return retorno.getC3D(retornos[0]);
      case 'substring':
        retorno = new subString(this.predicado,this.tipo)
        return retorno.getC3D(retornos)
        break;
    }
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
      return new CallFunction(this.predicado,this.tipo,this.nombre,this.argumentos).getValor(nodos)
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
            
            if(this.transformTipo(ArgumentosRealizados,i,funcion.declaraciones[i].type))
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
            if(!(funcion.tipo == null || retornos[0].tipo == funcion.tipo))
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
  transformTipo(ArgumentosRealizados,i,tipo)
  {
    let expresion = /[0-9]+(\.[0-9]+)?/i;
    switch(tipo)
    {
      case null:
        return true
      case Tipo.DECIMAL:
        switch(ArgumentosRealizados[i][0].tipo)
        {
          case Tipo.NODO:
          case Tipo.ATRIB:
            if(ArgumentosRealizados[i][0].valor.match(expresion))
            {
              ArgumentosRealizados[i][0] = new Literal(Tipo.DECIMAL,Number(ArgumentosRealizados[i][0].valor))
              return true
            }
            return false
          case Tipo.DECIMAL:
          case Tipo.INTEGER:
            return true
          default:
            return false
        }
      case Tipo.INTEGER:
        switch(ArgumentosRealizados[i][0].tipo)
        {
          case Tipo.NODO:
          case Tipo.ATRIB:
            if(ArgumentosRealizados[i][0].valor.match(expresion))
            {
              ArgumentosRealizados[i][0] = new Literal(Tipo.DECIMAL,parseInt(ArgumentosRealizados[i][0].valor,10))
              return true
            }
            return false
          case Tipo.DECIMAL:
          case Tipo.INTEGER:
            return true
          default:
            return false
        }
      case Tipo.STRING:
        switch(ArgumentosRealizados[i][0].tipo)
        {
          case Tipo.NODO:
          case Tipo.ATRIB:
            this.ArgumentosRealizados[i][0] = new Literal(Tipo.STRING,ArgumentosRealizados[i][0].valor)
            return true
          case Tipo.STRING:
            return true
          default:
            return false
        }
      case Tipo.NODO:
      case Tipo.ATRIB:
        if(ArgumentosRealizados[i][0].tipo == tipo) return true
        return false
    }
  }

  getC3D()
  {
    if(this.prefix == "fn")
    {
      return new CallFunction(this.predicado,this.tipo,this.nombre,this.argumentos).getC3D()
    }
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
    var lastIndex = Objetos.length 
    retorno.push(new Literal(Tipo.INTEGER, lastIndex))
    return retorno
  }

  getC3D()
  {
    C3D.funcBoleanas[C3D.funcIndices.LAST] = true
    var TT1 = C3D.newTemp();
    var cod = ""
    cod += `sp = sp + 1;\n`
    cod += `Last();\n`
    cod += `${TT1} = stack[(int)sp];\n`
    cod += `sp = sp - 1;`

    return {cod:cod,tipo:Tipo.DECIMAL,valor:TT1}
  }
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

  getC3D()
  {
    C3D.funcBoleanas[C3D.funcIndices.CAMINO] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of "*") {
      var ascci = letra.charCodeAt(0);
      cod += (`heapConsulta[(int)hpc] = ${ascci}; \n`);
      cod += (`hpc = hpc + 1; \n`);
    } 
    cod += (`heapConsulta[(int)hpc] = -1; \n`);
    cod += (`hpc = hpc + 1; \n`);

    cod += (`\n/* Cambiando de entorno */\n`);
    cod += (`sp = sp + 1; \n`);
    var TC3 = C3D.newTemp();
    cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
    cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
    cod += (`Camino(); \n`); //manda a llamar a la funcion camino
    cod += (`sp = sp - 1; \n`);

    return {cod:cod,tipo:Tipo.NODO}
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
        var nuevo = new Literal(Tipo.STRING,upperCase(nodo.valor))
        retornos.push(nuevo)
      }
      else if (nodo.tipo == Tipo.NODO || nodo.tipo == Tipo.ATRIB)
      {
        retornos.push(new Literal(Tipo.STRING,upperCase(nodo.valor)))
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion upper-case recive argumentos de tipo string`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }

  getC3D(argumento)
  {
    var cod = ""
    cod += argumento.cod;
    C3D.funcBoleanas[C3D.funcIndices.UPPERCASE] = true
    if(argumento.tipo == Tipo.STRING)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp();
      cod += `sp = sp + 1;\n`
      cod += `${TT1} = sp + 1;\n`
      cod += `stack[(int)${TT1}] = ${argumento.valor};\n`
      cod += `UpperCase();\n`
      cod += `${TT2} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT2}
    }
    if(argumento.tipo == Tipo.NODO)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
      var TT5 = C3D.newTemp();
      cod += `${TT1} = spc;\n`
      cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
      cod += `${TT2} = ${TT2} + 3;\n`
      cod += `${TT3} = Indexes[(int)${TT2}];\n`
      cod += `sp = sp + 1;\n`
      cod += `${TT4} = sp + 1;\n`
      cod += `stack[(int)${TT4}] = ${TT3};\n`
      cod += `UpperCase();\n`
      cod += `${TT5} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT5}
    }
    if(argumento.tipo == Tipo.ATRIB)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
      var TT5 = C3D.newTemp();
      cod += `${TT1} = spc;\n`
      cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
      cod += `${TT2} = ${TT2} + 1;\n`
      cod += `${TT3} = stackAtributos[(int)${TT2}];\n`
      cod += `sp = sp + 1;\n`
      cod += `${TT4} = sp + 1;\n`
      cod += `stack[(int)${TT4}] = ${TT3};\n`
      cod += `UpperCase();\n`
      cod += `${TT5} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT5}
    }
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
      if(nodo.tipo==Tipo.STRING || nodo.tipo == Tipo.NODO || nodo.tipo == Tipo.ATRIB)
      {
        var nuevo = new Literal(Tipo.STRING,lowerCase(nodo.valor))
        retornos.push(nuevo)
      }
      else if (nodo.tipo == Tipo.NODO || nodo.tipo == Tipo.ATRIB)
      {
        retornos.push(new Literal(Tipo.STRING,lowerCase(nodo.valor)))
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion lower-case recive argumentos de tipo string`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }

  getC3D(argumento)
  {
    var cod = ""
    cod += argumento.cod;
    C3D.funcBoleanas[C3D.funcIndices.UPPERCASE] = true
    if(argumento.tipo == Tipo.STRING)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp();
      cod += `sp = sp + 1;\n`
      cod += `${TT1} = sp + 1;\n`
      cod += `stack[(int)${TT1}] = ${argumento.valor};\n`
      cod += `LowerCase();\n`
      cod += `${TT2} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT2}
    }
    if(argumento.tipo == Tipo.NODO)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
      var TT5 = C3D.newTemp();
      cod += `${TT1} = spc;\n`
      cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
      cod += `${TT2} = ${TT2} + 3;\n`
      cod += `${TT3} = Indexes[(int)${TT2}];\n`
      cod += `sp = sp + 1;\n`
      cod += `${TT4} = sp + 1;\n`
      cod += `stack[(int)${TT4}] = ${TT3};\n`
      cod += `LowerCase();\n`
      cod += `${TT5} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT5}
    }
    if(argumento.tipo == Tipo.ATRIB)
    {
      var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
      var TT5 = C3D.newTemp();
      cod += `${TT1} = spc;\n`
      cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
      cod += `${TT2} = ${TT2} + 1;\n`
      cod += `${TT3} = stackAtributos[(int)${TT2}];\n`
      cod += `sp = sp + 1;\n`
      cod += `${TT4} = sp + 1;\n`
      cod += `stack[(int)${TT4}] = ${TT3};\n`
      cod += `LowerCase();\n`
      cod += `${TT5} = stack[(int)sp];\n`
      cod += `sp = sp - 1;\n`
      return {cod:cod,tipo:Tipo.STRING,valor:TT5}
    }
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
      var newNodo = new Literal(Tipo.STRING,nodo.valor.toString())
      retornos.push(newNodo)
    }
    return retornos
  }

  getC3D(argumento){
    C3D.funcBoleanas[C3D.funcIndices.TOSTRING] = true
    var cod = ''
    if(argumento.tipo == Tipo.NODO){
      var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
      cod += argumento.cod
      //enviamos la posicion en el indexes
      cod += `sp = sp + 1; \n`
      cod += `${T0} = spc; \n`
      cod += `${T1} = stackConsulta[(int)${T0}]; \n`
      cod += `${T1} = ${T1} + 1; \n`
      cod += `${T2} = Indexes[(int)${T1}]; \n`
      cod += `stack[(int)sp] = ${T2}; \n`
      cod += `NumberToString(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.STRING,valor:T0}
    }
    else if (argumento.tipo == Tipo.ATRIB){
      cod += argumento.cod
      var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
      var T3 = C3D.newTemp();
      //enviamos referencia a stackAtributos
      cod += `sp = sp + 1; \n`
      cod += `${T0} = spc; \n`
      cod += `${T1} = stackConsulta[(int)spc]; \n`
      cod += `${T1} = ${T1} + 1;\n` //posicion de atributos
      cod += `${T2} = Indexes[(int)${T1}]; \n`
      cod += `${T3} = stackAtributos[(int)${T2}]; \n`
      cod += `stack[(int)sp] = ${T3}; \n`
      cod += `NumberToString(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.STRING,valor:T0}
    }
    else if(argumento.tipo == Tipo.DECIMAL || argumento.tipo == Tipo.INTEGER){
      cod += argumento.cod
      var T0 = C3D.newTemp();
      //enviamos el valor (valor o temporal)
      cod += `sp = sp + 1; \n`
      cod += `stack[(int)sp] = ${argumento.valor}; \n`
      cod += `NumberToString(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.STRING,valor:T0}
    }
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
      var temp = Number(nodo.valor)
      if(nodo.valor)
      {
        retornos.push(new Literal(Tipo.DECIMAL,temp))
      }
      else
      {
        ErroresGlobal.push({Error:`La funcion Number no se pudo realizar`,tipo:"Semantico",Linea:0,columna:0})
      }
    }
    return retornos
  }
  
  getC3D(argumento){
    C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
    var cod = ''
    if(argumento.tipo == Tipo.NODO){
      var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp(); var T3 = C3D.newTemp();
      cod += argumento.cod
      //enviamos la posicion en el indexes
      cod += `sp = sp + 1; \n`
      cod += `${T0} = spc; \n`
      cod += `${T1} = stackConsulta[(int)${T0}]; \n`
      cod += `${T1} = ${T1} + 3; \n`
      cod += `${T2} = Indexes[(int)${T1}]; \n`
      cod += `${T3} = sp + 1; \n`
      cod += `stack[(int)${T3}] = ${T2}; \n`
      cod += `CastNum(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.DECIMAL,valor:T0}
    }
    else if (argumento.tipo == Tipo.ATRIB){
      cod += argumento.cod
      var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
      var T3 = C3D.newTemp();
      //enviamos referencia a stackAtributos
      cod += `sp = sp + 1; \n`
      cod += `${T0} = spc; \n`
      cod += `${T1} = stackConsulta[(int)spc]; \n`
      cod += `${T1} = ${T1} + 1;\n` //posicion de atributos
      cod += `${T2} = stackAtributos[(int)${T1}]; \n`
      cod += `${T3} = sp + 1; \n`
      cod += `stack[(int)${T3}] = ${T2}; \n`
      cod += `CastNum(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.DECIMAL,valor:T0}
    }
    else if(argumento.tipo == Tipo.STRING){
      cod += argumento.cod
      var T0 = C3D.newTemp(); var T1 = C3D.newTemp();
      //enviamos el valor (valor o temporal)
      cod += `sp = sp + 1; \n`
      cod += `${T1} = sp + 1; \n`
      cod += `stack[(int)${T1}] = ${argumento.valor}; \n`
      cod += `CastNum(); \n`
      cod += `${T0} = stack[(int)sp]; \n`
      cod += `sp = sp - 1; \n`
      return {cod:cod,tipo:Tipo.DECIMAL,valor:T0}
    }
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
      if ((nodos[0].tipo == Tipo.STRING || nodos[0].tipo == Tipo.NODO || nodos[0].tipo == Tipo.ATRIB) 
      && (nodos[1].tipo==Tipo.DECIMAL || nodos[1].tipo==Tipo.INTEGER)) {
        let minimo = Number(nodos[1].valor) < 1 ? 0 : (Number(nodos[1].valor) - 1 )  
        var nuevo = new Literal(Tipo.STRING,nodos[0].valor.toString().substring(minimo))
        return [nuevo]
      }
    }
    else
    {
      if ((nodos[0].tipo == Tipo.STRING || nodos[0].tipo == Tipo.NODO || nodos[0].tipo == Tipo.ATRIB)   
        && (nodos[1].tipo==Tipo.DECIMAL || nodos[1].tipo==Tipo.INTEGER)
        && (nodos[2].tipo==Tipo.DECIMAL || nodos[2].tipo==Tipo.INTEGER) ) {
        let minimo = Number(nodos[1].valor) < 1 ? 0 : (Number(nodos[1].valor) - 1)
        var nuevo = new Literal(Tipo.STRING,nodos[0].valor.toString().substring(minimo,minimo + Number(nodos[2].valor)))
        return [nuevo]
      }
    }
  }

  getC3D(argumentos)
  {
    var cod = ""
    if(argumentos.length == 2)
    {
      cod += argumentos[0].cod;
      cod += argumentos[1].cod;
      C3D.funcBoleanas[C3D.funcIndices.SUBSTR1] = true
      if(argumentos[0].tipo == Tipo.STRING)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp();
        cod += `sp = sp + 1;\n`
        cod += `${TT1} = sp + 1;\n`
        cod += `stack[(int)${TT1}] = ${argumentos[0].valor};\n`
        cod += `${TT2} = sp + 2;\n`
        cod += `stack[(int)${TT2}] = ${argumentos[1].valor};\n`
        cod += `SubString_int();\n`
        cod += `${TT3} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT3}
      }
      else if(argumentos[0].tipo == Tipo.NODO)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
        var TT5 = C3D.newTemp(); var TT6 = C3D.newTemp();
        cod += `${TT1} = spc;\n`
        cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
        cod += `${TT2} = ${TT2} + 3;\n`
        cod += `${TT3} = Indexes[(int)${TT2}];\n`
        cod += `sp = sp + 1;\n`
        cod += `${TT4} = sp + 1;\n`
        cod += `stack[(int)${TT4}] = ${TT3};\n`
        cod += `${TT5} = sp + 2;\n`
        cod += `stack[(int)${TT5}] = ${argumentos[1].valor};\n`
        cod += `SubString_int();\n`
        cod += `${TT6} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT6}
      }
      else if(argumentos[0].tipo == Tipo.ATRIB)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
        var TT5 = C3D.newTemp(); var TT6 = C3D.newTemp();
        cod += `${TT1} = spc;\n`
        cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
        cod += `${TT2} = ${TT2} + 1;\n`
        cod += `${TT3} = stackAtributos[(int)${TT2}];\n`
        cod += `sp = sp + 1;\n`
        cod += `${TT4} = sp + 1;\n`
        cod += `stack[(int)${TT4}] = ${TT3};\n`
        cod += `${TT5} = sp + 2;\n`
        cod += `stack[(int)${TT5}] = ${argumentos[1].valor};\n`
        cod += `SubString_int();\n`
        cod += `${TT6} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT6}
      }
    }
    else
    {
      cod += argumentos[0].cod;
      cod += argumentos[1].cod;
      cod += argumentos[2].cod;
      C3D.funcBoleanas[C3D.funcIndices.SUBSTR2] = true
      if(argumentos[0].tipo == Tipo.STRING)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
        cod += `sp = sp + 1;\n`
        cod += `${TT1} = sp + 1;\n`
        cod += `stack[(int)${TT1}] = ${argumentos[0].valor};\n`
        cod += `${TT2} = sp + 2;\n`
        cod += `stack[(int)${TT2}] = ${argumentos[1].valor};\n`
        cod += `${TT3} = sp + 3;\n`
        cod += `stack[(int)${TT3}] = ${argumentos[2].valor};\n`
        cod += `SubString_int_int();\n`
        cod += `${TT4} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT4}
      }
      else if(argumentos[0].tipo == Tipo.NODO)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
        var TT5 = C3D.newTemp(); var TT6 = C3D.newTemp(); var TT7 = C3D.newTemp();
        cod += `${TT1} = spc;\n`
        cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
        cod += `${TT2} = ${TT2} + 3;\n`
        cod += `${TT3} = Indexes[(int)${TT2}];\n`
        cod += `sp = sp + 1;\n`
        cod += `${TT4} = sp + 1;\n`
        cod += `stack[(int)${TT4}] = ${TT3};\n`
        cod += `${TT5} = sp + 2;\n`
        cod += `stack[(int)${TT5}] = ${argumentos[1].valor};\n`
        cod += `${TT6} = sp + 3;\n`
        cod += `stack[(int)${TT6}] = ${argumentos[2].valor};\n`
        cod += `SubString_int_int();\n`
        cod += `${TT7} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT7}
      }
      else if(argumentos[0].tipo == Tipo.ATRIB)
      {
        var TT1 = C3D.newTemp(); var TT2 = C3D.newTemp(); var TT3 = C3D.newTemp(); var TT4 = C3D.newTemp();
        var TT5 = C3D.newTemp(); var TT6 = C3D.newTemp(); var TT7 = C3D.newTemp();
        cod += `${TT1} = spc;\n`
        cod += `${TT2} = stackConsulta[(int)${TT1}];\n`
        cod += `${TT2} = ${TT2} + 1;\n`
        cod += `${TT3} = stackAtributos[(int)${TT2}];\n`
        cod += `sp = sp + 1;\n`
        cod += `${TT4} = sp + 1;\n`
        cod += `stack[(int)${TT4}] = ${TT3};\n`
        cod += `${TT5} = sp + 2;\n`
        cod += `stack[(int)${TT5}] = ${argumentos[1].valor};\n`
        cod += `${TT6} = sp + 3;\n`
        cod += `stack[(int)${TT6}] = ${argumentos[2].valor};\n`
        cod += `SubString_int_int();\n`
        cod += `${TT7} = stack[(int)sp];\n`
        cod += `sp = sp - 1;\n`
        return {cod:cod,tipo:Tipo.STRING,valor:TT7}
      }
    }
  }
}

