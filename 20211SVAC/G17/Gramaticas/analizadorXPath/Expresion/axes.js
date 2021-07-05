import { Objeto } from "../../analizadorXML/helpers"
import { Tipo, TipoPath, concatenarNodos, concatenarNodosOrden , Predicado } from "../AST/Entorno"
import { Nodo } from "./Expresiones"
var C3D = require('../../C3D')

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

export class Camino extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)

  }

  getValor(nodos,inicio=1)
  {
    var retornos = []                                 //declaramos un array vacio de retornos
    for (const nodo of nodos)                         //para cada nodo de los nodos
    {
      var retorno = []                                //declaramos un array vacio de retornos en cada nodo
      var posicion = inicio;                          //posicion es igual a inicio, posicion = 1
      if(this.tipo==TipoPath.ABS)                     /**** si es de tipo absoluto ****/
      {
          for (const iterator of nodo.entorno.hijos) {    //para cada nodo hijo  de la lista de los hijos
            if(iterator.tipo == this.nombre || this.nombre=="*" )   //si nodohijo.tipo = nombre que le mandan o a todos (*)
            {
                var nuevaPila = Object.assign([],nodo.pila)       //clonamos la pila de entornos en una nueva pila
                nuevaPila.push(nodo.entorno)                      //metemos el entorno en la nueva pila
                retorno.push(new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto,posicion,posicion))   //metemos el nodo a la lista de retornos del nodo
                posicion++                                      //aumentamos la posicion de cada nodo
            }
          }
          retorno = Predicado(this.predicado,retorno)             //y el retorno pasa por el predicado
      }
      else                                            /*** Si es de tipo relativo ****/
      {
        retorno = RecursivaCamino(nodos,this.nombre,this.predicado,posicion,1)    //el retorno pasa por el RecursivaCamino
        retornos = concatenarNodos(retornos,retorno)                              //la lista de retornos es concatenarNodos
        break
      }
      retornos = concatenarNodos(retornos,retorno)                                //la lista de retornos es concatenarNodos
    }
    return retornos                 //devolvemos la lista de retornos
  }

  getC3D(){

    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
      var ascci = letra.charCodeAt(0);
      cod += (`heapConsulta[(int)hpc] = ${ascci}; \n`);
      cod += (`hpc = hpc + 1; \n`);
    } 
    cod += (`heapConsulta[(int)hpc] = -1; \n`);
    cod += (`hpc = hpc + 1; \n`);

    if(this.tipo == TipoPath.REL)
    {
      C3D.funcBoleanas[C3D.funcIndices.DESCENDANT] = true
      cod += (`\n/* Cambiando de entorno */\n`);
      cod += (`sp = sp + 1; \n`);
      var TC3 = C3D.newTemp();
      cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
      cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
      cod += (`Descendant(); \n`); //manda a llamar a la funcion camino
      cod += (`sp = sp - 1; \n`);
    }
    else
    {
      C3D.funcBoleanas[C3D.funcIndices.CAMINO] = true
      cod += (`\n/* Cambiando de entorno */\n`);
      cod += (`sp = sp + 1; \n`);
      var TC3 = C3D.newTemp();
      cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
      cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
      cod += (`Camino(); \n`); //manda a llamar a la funcion camino
      cod += (`sp = sp - 1; \n`);
  
    }
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"")
  }
}

function RecursivaCamino(nodos,nombre,predicado,actual,suma) 
{
  var retorno = []
  for (const nodo of nodos) 
  {
    var subretorno = []
    var posicion = actual;
    for (const iterator of nodo.entorno.hijos) {
      var nuevaPila = Object.assign([],nodo.pila)
      nuevaPila.push(nodo.entorno)
      var hijo = new Nodo(Tipo.NODO,iterator,nuevaPila,iterator.texto,posicion)
      retorno = concatenarNodosOrden(retorno,RecursivaCamino([hijo],nombre,predicado,posicion+(suma/10),suma/10))
      if(iterator.tipo==nombre || nombre=="*") { subretorno.push(hijo); posicion+=suma  }
    } 
    subretorno = Predicado(predicado,subretorno)
    retorno = concatenarNodosOrden(retorno,subretorno)
    // var index = 0
    // for (const [indexHijo,hijo] of hijos.entries()) {
    //   if(subretorno[index] && subretorno[index].posicion==indexHijo)
    //   {
    //     retorno.push(subretorno[index])
    //     index++
    //   }
    //   retorno = retorno.concat(hijo)
    // }
    //retorno = retorno.concat(subretorno,retornoTemp)
  }
  return retorno
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
      var posicion = 1;
      if(this.tipo==TipoPath.ABS)
      {
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          for (const iterator of nodo.entorno.atributos) {
              if(iterator.nombre == this.nombre || this.nombre=="*" )
              {
                  retorno.push(new Nodo(Tipo.ATRIB,nodo.entorno,nuevaPila,iterator.valor,posicion))
                  posicion++
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

  getC3D(nodos){   
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta del atributo ${this.nombre} */ \n`);

    //guardamos en el heapConsulta el camino que nos dieron /* esto solo viene una vez */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
      var ascci = letra.charCodeAt(0);
      cod += (`heapConsulta[(int)hpc] = ${ascci}; \n`);
      cod += (`hpc = hpc + 1; \n`);
    } 
    cod += (`heapConsulta[(int)hpc] = -1; \n`);
    cod += (`hpc = hpc + 1; \n`);

    if(this.tipo == TipoPath.REL)
    {
      C3D.funcBoleanas[C3D.funcIndices.RECURSIVAATRIBUTO] = true
      C3D.funcBoleanas[C3D.funcIndices.RRECURSIVAATROBUTO] = true
      cod += (`\n/* Cambiando de entorno */\n`);
      cod += (`sp = sp + 1; \n`);
      var TC3 = C3D.newTemp();
      cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
      cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
      cod += (`AtributoDescendant(); \n`); //manda a llamar a la funcion atributo
      cod += (`sp = sp - 1; \n`);
    }
    else
    {
      C3D.funcBoleanas[C3D.funcIndices.ATRIBUTO] = true
      cod += (`\n/* Cambiando de entorno */\n`);
      cod += (`sp = sp + 1; \n`);
      var TC3 = C3D.newTemp();
      cod += (`${TC3} = sp + 1; \n`); //le sumamos uno para dejar espacio para el return
      cod += (`stack[(int)${TC3}] = ${TC0}; \n`);  //guardamos el inicio de heapConsulta
      cod += (`Atributo(); \n`); //manda a llamar a la funcion atributo
      cod += (`sp = sp - 1; \n`);
  
    }

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

    return {cod: cod, tipo: Tipo.ATRIB}

  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"@")
  }
}

function RecursivaAtributo(nodos,nombre,predicado) 
{
  var retornos=[]
  for (const nodo of nodos) 
  {
    var retorno = []
    var hijos = []
    var posicion=1;
    for (const atributo of nodo.entorno.atributos) {
      if((atributo.nombre == nombre || nombre=="*") && nodo.entorno.tipo!="/") {
        var nuevoNodo = Object.assign({},nodo)
        nuevoNodo.tipo=Tipo.ATRIB
        nuevoNodo.posicion=posicion
        nuevoNodo.valor=atributo.valor
        nuevoNodo.pila.push(nodo.entorno)
        retorno.push(nuevoNodo)
        posicion++
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

  getC3D(nodos){
    C3D.funcBoleanas[C3D.funcIndices.CAMINO] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    var retornos = []
    for (const nodo of nodos) { 
      var descendientes = []
      descendientes = new Camino(this.nombre,[],TipoPath.REL).getValor([nodo])
      descendientes = Predicado(this.predicado,descendientes)
      if(this.tipo==TipoPath.REL)
      {
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          descendientes = descendientes.concat(new Descendant(this.nombre,this.predicado,this.Tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto)])) 
        }
      }
      retornos = retornos.concat(descendientes)
    }
    return retornos
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"descendant::")
  }

  getC3D(nodos)
  {
    C3D.funcBoleanas[C3D.funcIndices.DESCENDANT] = true
    C3D.funcBoleanas[C3D.funcIndices.DESCENDANTRECURSIVA] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`Descendant(); \n`); //manda a llamar a la funcion camino
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

  getC3D(nodos){   
    C3D.funcBoleanas[C3D.funcIndices.ATRIBUTO] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta del atributo ${this.nombre} */ \n`);

    //guardamos en el heapConsulta el camino que nos dieron /* esto solo viene una vez */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`Atributo(); \n`); //manda a llamar a la funcion atributo
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

    return {cod: cod, tipo: Tipo.ATRIB}

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
      var posicion = 1;
      if(nodo.entorno.tipo==this.nombre || this.nombre=="*")
      {
        nodo.posicion=posicion;
        retorno.push(nodo)
        retorno = Predicado(this.predicado,retorno)
        posicion++
      }
      if(this.tipo==TipoPath.REL)
      {
        var hijos=new Camino(this.nombre,this.predicado,this.tipo).getValor([nodo])
        retorno = retorno.concat(hijos)
      }
      retornos = retornos.concat(retorno)
    }
    return retornos
  }

  getC3D(nodos){   

    C3D.funcBoleanas[C3D.funcIndices.SELF] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta del atributo ${this.nombre} */ \n`);

    //guardamos en el heapConsulta el camino que nos dieron /* esto solo viene una vez */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
        nodos.posicion=1
        retorno.push(nodo) 
      }
      retorno = retorno.concat(new Camino(this.nombre,[],TipoPath.REL).getValor([nodo]))
      retorno = Predicado(this.predicado,retorno)
      retornos = retornos.concat(retorno)
      if(this.tipo==TipoPath.REL)
      {
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          retorno = retorno.concat(new DescSelf(this.nombre,this.predicado,this.Tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto)])) 
        }
        retornos = retornos.concat(retorno)
      }
    }
    return retornos
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"descendant-or-self::")
  }

  getC3D(nodos)
  {
    C3D.funcBoleanas[C3D.funcIndices.DESCENDANTSELF] = true
    C3D.funcBoleanas[C3D.funcIndices.DESCENDANTRECURSIVA] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`DescendantSelf(); \n`); //manda a llamar a la funcion camino
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

export class FollowSibling extends Axes
{
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos,nivel)
  {
    if(!nivel) nivel = 0                    //si no hay nivel, el nivel es 0
    var retornos = new  Map()               //crea una tabla hash para almacenar
    for (const nodo of nodos) {             //para cada nodo desde la raiz
      var retorno = []                      //crea un array par los retornos
      var nuevaPila = Object.assign([],nodo.pila)   //crea una nueva pila de la pila de los hijos
      var entorno = nuevaPila.pop()                 //saca el primero de la pila
      var Padre = [new Nodo(Tipo.NODO,entorno,nuevaPila,"")]  
      var hermanos = new Camino("*",[],TipoPath.ABS).getValor(Padre)
      var indice=-1;
      var posicion=1
      for (const [i,v] of hermanos.entries()) {
        if(v.entorno == nodo.entorno)
        { 
          indice=i
        }
        if(indice!=-1 && i>indice-nivel && (v.entorno.tipo==this.nombre || v.entorno.tipo=="*"))
        {
          v.posicion=posicion
          retorno.push(v)
          posicion++
        }
      }
      retorno = Predicado(this.predicado,retorno)
      if(this.tipo==TipoPath.REL) {
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
    var posicion = 1
    for (const valor of retornos.values()) {
      valor.posicion=1
      realretorno.push(valor)
      posicion++
    }
    return realretorno
  }

  getC3D(nodos){
    /* Todos los hermanos del nodo en cuestion -> Todos los hijos del padre del nodo actual (menos el actual) */

    C3D.funcBoleanas[C3D.funcIndices.FOLLOWINGSIBLING] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion FOLLOWING-SIBLING*/
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`FollowingSibling(); \n`); //manda a llamar a la funcion camino
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
      var posibles = (new Camino("*",[],TipoPath.REL)).getValor([new Nodo(Tipo.NODO,EntornoActual,nuevaPila,"")])
      var indice = -1
      var posicion = 1
      for (let index = 0; index < posibles.length; index++) {
        if(posibles[index].entorno == nodo.entorno)
        {
          indice = index
        }
        if(indice!=-1 && index > indice && posibles[index].entorno.tipo==this.nombre)
        {
          posibles[index].posicion=posicion
          retorno.push(posibles[index])
          posicion++ 
        }
      }
      retorno = Predicado(this.predicado,retorno)
      for (const v of retorno) {
        retornos.set(v.entorno,v)
      }
      if(this.tipo==TipoPath.REL)
      {
        var subretorno = []
        for (const hijo of nodo.entorno.hijos) { 
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          subretorno = subretorno.concat(new Follow(this.nombre,this.predicado,this.tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,"")],1))
        }
        retorno = retorno.concat(subretorno)
      }
      for (const iterator of retorno) {
        retornos.set(iterator.entorno,iterator)
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

export class CaminoInverso extends Axes
{  
  constructor(nombre,predicado,tipo)
  {
    super(nombre,predicado,tipo)
  }

  getValor(nodos)
  {
    var mapa = new Map()                                //iniciamos una tabla hash
    for (const nodo of nodos) {                         //para cada nodo desde la raiz
      var nuevaPila = Object.assign([],nodo.pila)       //copiamos la una nueva pila de la pila del nodo
      var temp = nuevaPila.pop()                        //tomamos el primero de la pila
      var nuevoNodo = new Nodo(Tipo.NODO,temp,nuevaPila,temp.texto,1)   //
      var convertido = Predicado(this.predicado,[nuevoNodo])
      for (const iterator of convertido) {
        mapa.set(temp,iterator) 
      }
      if(this.tipo==TipoPath.REL)
      {
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          var retorno = new CaminoInverso(this.nombre,this.predicado,this.Tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto)]) 
          for (const iterator of retorno) {
            mapa.set(iterator.entorno,iterator) 
          }
        }
      }
    }
    var tempRetorno=[]
    for (const [clave,valor] of mapa  ) {
      tempRetorno.push(valor)
    }
    return tempRetorno
  }

  getC3D(nodos){
    /* Esta funcion solo captura el primer padre del nodo en cuestion */
    //hacemos el camino con normalidad ::check
    //en este Axes guardamos en el heapConsulta el nombre del padre :: check    

    C3D.funcBoleanas[C3D.funcIndices.PARENT] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`Parent(); \n`); //manda a llamar a la funcion camino inverso
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

  getC3D(nodos){
    /* Esta funcion solo captura el primer padre del nodo en cuestion */
    //hacemos el camino con normalidad ::check
    //en este Axes guardamos en el heapConsulta el nombre del padre :: check    

    C3D.funcBoleanas[C3D.funcIndices.PARENT] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`Parent(); \n`); //manda a llamar a la funcion camino inverso
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

  getValor(nodos,inicio=1)
  {
    var retornos = new Map()
    for (const nodo of nodos) {
      var nuevaPila = (Object.assign([],nodo.pila))
      var ancestros=[]
      while  (nuevaPila.length>0) {
        var entorno = nuevaPila.pop()
        if(entorno.tipo==this.nombre) ancestros.push(new Nodo(Tipo.NODO,entorno,nuevaPila,entorno.texto))
        nuevaPila = (Object.assign([],nuevaPila))
      }
      ancestros = Predicado(this.predicado,ancestros)
      for (const ancestro of ancestros) {
        retornos.set(ancestro.entorno,ancestro)
      }
      if(this.tipo==TipoPath.REL)
      {
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          var retorno = new Ancestor(this.nombre,this.predicado,this.Tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto)]) 
          for (const iterator of retorno) {
            retornos.set(iterator.entorno,iterator) 
          }
        }
      }
    }
    var retornoReal = []
    var posicion = inicio;
    for (const valor of retornos.values()) {
      valor.posicion=posicion
      retornoReal.push(valor)
      posicion++
    }
    return retornoReal
  }
  
  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"ancestor::")
  }

  getC3D(nodos){
    /* Esta funcion solo captura el primer padre del nodo en cuestion */
    //hacemos el camino con normalidad ::check
    //en este Axes guardamos en el heapConsulta el nombre del padre :: check    

    C3D.funcBoleanas[C3D.funcIndices.ANCESTOR] = true
    C3D.funcBoleanas[C3D.funcIndices.ANCESTORRECURSIVA] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`Ancestor(); \n`); //manda a llamar a la funcion camino inverso
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

export class AncestorSelf extends Axes
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
      if(nodo.entorno.tipo==this.nombre)
      {
        nodo.posicion=1
        retorno.push(nodo)
      }
      retorno = retorno.concat(new Ancestor(this.nombre,[],this.ABS).getValor([nodo]))
      retorno = Predicado(this.predicado,retorno)
      for (const iterator of retorno) {
        retornos.set(iterator.entorno,iterator) 
      }
      if(this.tipo==TipoPath.REL)
      {
        for (const hijo of nodo.entorno.hijos) {     
          var nuevaPila = Object.assign([],nodo.pila)
          nuevaPila.push(nodo.entorno)
          var retorno = new AncestorSelf(this.nombre,this.predicado,this.tipo).getValor([new Nodo(Tipo.NODO,hijo,nuevaPila,hijo.texto)]) 
          for (const iterator of retorno) {
            retornos.set(iterator.entorno,iterator) 
          }
        }
      }
    }
    var temp = []
    var posicion=1
    for (const valor of retornos.values()) {
      valor.posicion=posicion
      temp.push(valor)
      posicion++
    }
    return temp
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"ancestor-or-sibling::")
  }

  getC3D(nodos){
    /* Esta funcion solo captura el primer padre del nodo en cuestion */
    //hacemos el camino con normalidad ::check
    //en este Axes guardamos en el heapConsulta el nombre del padre :: check    

    C3D.funcBoleanas[C3D.funcIndices.ANCESTORSELF] = true
    C3D.funcBoleanas[C3D.funcIndices.ANCESTORRECURSIVA] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`AncestorSelf(); \n`); //manda a llamar a la funcion camino inverso
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
      var hermanos = new Camino("*",[],TipoPath.ABS).getValor(Padre)
      var indice=-1;
      var posicion=1
      for (const [i,v] of hermanos.entries()) {
        if(v.entorno == nodo.entorno)
        { 
          indice=i
        }
        if(indice==-1 && (v.entorno.tipo==this.nombre || v.entorno.tipo=="*"))
        {
          v.posicion=posicion
          retorno.push(v)
          posicion++
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
    var posicion = 1
    for (const valor of retornos.values()) {
      valor.posicion=1
      realretorno.push(valor)
      posicion++
    }
    return realretorno
  }

  getC3D(nodos){
    /* Captura todos los hermanos del nodo actual hasta que aparesca el nodo actual */

    C3D.funcBoleanas[C3D.funcIndices.PRECEDINGSIBLING] = true
    var cod = ''

    /* Añadiendo en el Main la llamada y los parametros a la funcion CaminoABS */
    cod += (`\n/* Guardando la ruta ${this.nombre} */ \n`);
    //guardamos en el heapConsulta el camino que nos dieron /* esto es recursivo */
    var TC0 = C3D.newTemp();
    cod += (`${TC0} = hpc; \n`);  //guardamos donde inicia la consulta

    for (const letra of this.nombre) {
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
    cod += (`PrecedingSibling(); \n`); //manda a llamar a la funcion camino inverso
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
        if(tempCod.tipo == Tipo.NODO)
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

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"preceding-sibling::")
  }
}

export class Preceding extends Axes
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
      var hermanos = new Camino("*",[],TipoPath.REL).getValor(Padre)
      var indice=-1;
      var posicion=1
      for (const [i,v] of hermanos.entries()) {
        if(v.entorno == nodo.entorno)
        { 
          indice=i
        }
        if(indice==-1 && v.entorno.tipo==this.nombre)
        {
          v.posicion=posicion
          retorno.push(v)
          posicion++
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
    var posicion = 1
    for (const valor of retornos.values()) {
      valor.posicion=1
      realretorno.push(valor)
      posicion++
    }
    return realretorno
  }

  Graficar(ListaNodes,ListaEdges,contador)
  {
    return this.GraficarAxis(ListaNodes,ListaEdges,contador,"preceding-sibling::")
  }
}
