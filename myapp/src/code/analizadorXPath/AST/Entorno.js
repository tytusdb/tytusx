
//Enum de tipos
export const Tipo = {
    "INTEGER" : 0,
    "DECIMAL" : 1,
    "STRING"  : 2,
    "NODO"    : 3,
    "BOOLEAN" : 4,
    "ATRIB"   : 5,
    "ERROR"   : 6
} 

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

export const TipoPath = {
    "ABS" : "absoluto",
    "REL" : "relativo"
}

var XML= {
    tipo: "/",
    texto: "",
    atributos: [],
    hijos: [
      {
        tipo: "biblioteca",
        texto: "",
        atributos: [],
        hijos: [
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "La vida está en otra parte",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Milan Kundera",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1973"
                    }
                ],
                hijos:[]
              }
            ]
          },
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "Pantaleón y las visitadoras",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Mario Vargas Llosa",
                atributos:[
                    {
                        nombre:"fechaNacimiento",
                        valor:"28/03/1936"
                    }
                ],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1973"
                    }
                ],
                hijos:[]
              }
            ]
          },
          {
            tipo: "libro",
            texto: "",
            atributos: [],
            hijos: [
              {
                tipo:"titulo",
                texto: "Conversación en la catedral",
                atributos:[],
                hijos:[]
              },
              {
                tipo:"autor",
                texto: "Mario Vargas Llosa",
                atributos:[
                    {
                        nombre:"fechaNacimiento",
                        valor:"28/03/1936"
                    }
                ],
                hijos:[]
              },
              {
                tipo:"fechaPublicacion",
                texto:"",
                atributos:[
                    {
                        nombre:"año",
                        valor:"1969"
                    }
                ],
                hijos:[]
              }
            ]
          }
        ]
      }
    ]
}

export class Comando
{
  constructor(Instrucciones)
  {
    this.Instrucciones = Instrucciones
  }

  Ejecutar()
  {
    var Salida = ""
    var retornos=[]
    for (const iterator of this.Instrucciones) {
      retornos = retornos.concat(iterator.getValor(XML))
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