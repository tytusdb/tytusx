const { ErroresGlobal, LimpiarErrores, CrearGlobal, AgregarGlobal } = require('./Global')
var C3D = require('../../C3D')
//Enum de tipos
export const Tipo = {
    "INTEGER" : 0,
    "DECIMAL" : 1,
    "STRING"  : 2,
    "NODO"    : 3,
    "BOOLEAN" : 4,
    "ATRIB"   : 5,
    "ERROR"   : 6,
    "SIBLING" : 7
} 

export function getTipoById(numero)
{
  switch(numero)
  {
    case 0:
      return "integer"
    case 1:
      return "decimal"
    case 2:
      return "string"
    case 3:
      return "nodo"
    case 4:
      return "boolean"
    case 5:
      return "atrib" 
    case 6:
      return "error" 
    case 7:
      return "sibling"
  }
}  

export var Siblings = []

export const Colision = 
[
  [true , true , false, false, false, true , false],
  [true , true , false, false, false, true , false],
  [false, false, true , true , false, true , false],
  [true, true, true , true , false, true , false],
  [false, false, false, false, true , false, false],
  [true , true , true , true , false, true , false],
  [false, false, false, false, false, false, false]
]

export const ColisionTipo = 
[
  [Tipo.INTEGER, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
]

export const ColisionLogical = 
[
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.BOOLEAN, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,    Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
]

export const TipoPath = {
    "ABS" : "absoluto",
    "REL" : "relativo"
}

export class Comando
{
  constructor(Prologo,Instrucciones,Nodos,Edges,graphviz,errores,tablaGramatica)
  {
    this.Instrucciones = Instrucciones
    this.Prologo = Prologo
    this.Nodos=Nodos
    this.Edges=Edges
    this.graphviz=graphviz
    this.errores = errores
    this.tablaGramatica = tablaGramatica
  }

  Ejecutar(XML)
  {
    LimpiarErrores()
    C3D.returnXMLC3D()
    var Salida = ""
    var retornos=[]
    CrearGlobal();
    for (const prologo of this.Prologo) {
      AgregarGlobal(prologo)
    }
    for (const iterator of this.Instrucciones) {
      var {Nodo} = require('../Expresion/Expresiones')
      retornos = retornos.concat(
        iterator.getValor(
          [
            new Nodo(Tipo.NODO,XML,[],"",1)
          ]
        )
      )
    }
    if(retornos.length==0)
    {
      Salida += "No se encontro esta consulta" + "\n"
    }
    for (const retorno of retornos) {
      if(retorno.tipo == Tipo.NODO)
      {
        Salida += ConvertiraXML(retorno.entorno,0) + "\n"
      }
      else if(retorno.tipo==Tipo.ERROR)
      {
        Salida += "No se encontro esta consulta" + "\n"
      }
      else
      {
        Salida += retorno.valor + "\n"
      }
    }
    this.errores = this.errores.concat(ErroresGlobal)
    return Salida;
  }

  // función para generar c3d
  EjecutarC3D(xml){
    var salida = ""
    var retornos=[]
    for (const instruccion of this.Instrucciones) {
      retornos = retornos.concat(instruccion.getC3D())
      
    }

    for (const retorno of retornos) {
      C3D.addCodigo3D(`\n/* Añadiendo la raiz para la consulta */\n`);
      C3D.addCodigo3D(`stackConsulta[0] = stack[0];\n`)
      C3D.addCodigo3D(`stackConsulta[1] = -2;\n`) 

      C3D.addCodigo3D(retorno.cod)

      switch(retorno.tipo)
      {
        case Tipo.STRING:
          var T0 = C3D.newTemp();
          C3D.funcBoleanas[C3D.funcIndices.STRING] = true
          C3D.addCodigo3D(`sp = sp + 1; \n`)
          C3D.addCodigo3D(`${T0} = sp + 0; \n`)
          C3D.addCodigo3D(`stack[(int)${T0}] = ${retorno.valor}; \n`)
          C3D.addCodigo3D(`imprimirString(); \n`)
          C3D.addCodigo3D(`sp = sp - 1; \n`)
          break;
        case Tipo.DECIMAL:
          C3D.addCodigo3D(`printf("%f", ${retorno.valor}); \n`);
          break;
        case Tipo.INTEGER:
          C3D.addCodigo3D(`printf("%d", (int)${retorno.valor}); \n`);
          break;
        case Tipo.ATRIB:
          //entonces fue un atributo
          C3D.funcBoleanas[C3D.funcIndices.IMPRIMIRATRIBUTO] = true
          C3D.addCodigo3D(`ImprimirAtributoR(); \n`);
          break;
        case Tipo.NODO:
          //entonces fue un camino
          C3D.funcBoleanas[C3D.funcIndices.IMPRIMIRCONSULTA] = true
          C3D.addCodigo3D(`ImprimirConsultaR(); \n`);
      }
      // if(retorno){
      //   C3D.addCodigo3D(C3D.getstr3d())
      //   switch (retorno.tipo) {
      //     case Tipo.STRING:
            
          
          
      //   }
      // }
      // if(retorno.tipo == 5 /*Tipo.ATRIB*/){
        
      // }else if(retorno.tipo == 3 /*Tipo.NODO*/){
      // }
    }

    

    // imprimir 
    console.log(retornos)
    salida = C3D.getFullC3D()
    return salida
  }

  Graficar()
  {
    var ListaNodes = []
    var ListaEdges = []
    var contador = {num:2}
    ListaNodes.push({id:1,label:"AST"})
    ListaEdges.push({from:1,to:2})
    var nodoActual = {id:contador.num,label:"XPath"}
    contador.num++
    ListaNodes.push(nodoActual)
    for(var i = 0; i < this.Instrucciones.length; i++)
    {
      var nodos = [] 
      if(i!=0)
      {
        ListaNodes.push({id:contador.num,label:"|"})
        nodos.push({id:contador.num,label:"|"})
        contador.num++
      }
      nodos = nodos.concat(this.Instrucciones[i].Graficar(ListaNodes,ListaEdges,contador))
      for (const nodo of nodos) {
        ListaEdges.push({from:nodoActual.id,to:nodo.id})
      }
    }
    return {nodes:ListaNodes,edges:ListaEdges}
  }

  InvertirNodes()
  {
    var NoGrade = this.Nodos[this.Nodos.length-1].id
    for (const nodo of this.Nodos) {
      nodo.id = Math.abs(nodo.id-NoGrade)
    }
    for (const edge of this.Edges) {
      edge.from = Math.abs(edge.from-NoGrade)
      edge.to = Math.abs(edge.to-NoGrade)
    }
  }
}

function ConvertiraXML(nodos,iteracion)
{
    var XML=""
    for (var i=0;i<iteracion;i++) {
        XML += "  "
    }
    XML+="<"+nodos.tipo+" "
    for (const atributo of nodos.atributos) {
        XML+=`${atributo.nombre}="${atributo.valor}" `
    }
    if(nodos.hijos.length>0 || nodos.texto!="")
    {
        XML+=">"
        XML+=nodos.texto
        for (const hijo of nodos.hijos) {
            XML+= "\n" + ConvertiraXML(hijo,iteracion+1)
        }
        if(nodos.hijos.length > 0)
        {
            XML += "\n";
            for (var i=0;i<iteracion;i++) {
                XML += "  "
            }
        }
        XML+="</"+nodos.tipo+">"
    }   
    else
    {
        XML += "/>"
    }
    return XML
}

export function Predicado(predicado,retorno)
{
  if(predicado.length > 0)
  {
    for (const iterator of predicado) {
      var posibles = iterator.getValor(retorno)
      if(posibles.length==0)
      {
        return []
      }
      if(posibles[0].tipo!=undefined)
      {
        switch(posibles[0].tipo)
        {
          case Tipo.NODO:
            retorno=posibles
            break
          case Tipo.INTEGER:
          case Tipo.DECIMAL:
            var temp=[]
            var posicion=1;
            for (const posible of posibles) {
              if(retorno[posible.valor-1])
              {
                temp.push(retorno[posible.valor-1])
                posicion++;
              }
            }
            retorno = temp
            break
        }
      }
    } 
  }
  return retorno
}

export function concatenarNodos(principales,secundarios)
{
  var posicion = principales.length>0 ? principales[principales.length-1].posicion : 1
  for (const secundario of secundarios) {
    secundario.setPosicion(posicion)
    principales.push(secundario)
    posicion++;
  }
  return principales
}

export function concatenarNodosOrden(principales,secundarios)
{
  var nuevoRetorno = []
  var iSec = 0
  for (const principal of principales) {
    for (; iSec < secundarios.length; iSec++) {
      if(principal.posicion > secundarios[iSec].posicion)
      {
        nuevoRetorno.push(secundarios[iSec]) 
      }
      else
      {
        break
      }
    }
    nuevoRetorno.push(principal)
  }
  for (; iSec < secundarios.length; iSec++) {
    nuevoRetorno.push(secundarios[iSec]) 
  }
  return nuevoRetorno
}

