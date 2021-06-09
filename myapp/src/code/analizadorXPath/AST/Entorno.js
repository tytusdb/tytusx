
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

export var Siblings = []

export const Colision = 
  [
    [true , true , false, false, false, true , false],
    [true , true , false, false, false, true , false],
    [false, false, true , true , false, true , false],
    [false, false, true , true , false, true , false],
    [false, false, false, false, true , false, false],
    [true , true , true , true , false, true , false],
    [false, false, false, false, false, false, false]
  ]

export const ColisionTipo = 
[
  [Tipo.INTEGER, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
  [Tipo.ERROR,   Tipo.ERROR,   Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR  , Tipo.ERROR],
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
  constructor(Instrucciones,Nodos,Edges,graphviz)
  {
    this.Instrucciones = Instrucciones
    this.Nodos=Nodos
    this.Edges=Edges
    this.graphviz=graphviz
  }

  Ejecutar(XML)
  {
    var Salida = ""
    var retornos=[]
    for (const iterator of this.Instrucciones) {
      retornos = retornos.concat(iterator.getValor(XML))
    }
    for (const retorno of retornos) {
      if(retorno.tipo == Tipo.NODO || retorno.tipo == Tipo.ATRIB)
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
    return Salida;
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
      var posibles=iterator.getValor(retorno)
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
            for (const posible of posibles) {
              if(retorno[posible.valor-1])
              {
                temp.push(retorno[posible.valor-1])
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