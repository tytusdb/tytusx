
export class grafoCST {

  constructor()
  {
    this.pilaHijos = []
    this.GrahpvizNodo = ""
    this.pilaNodos= []
    // DAtos { from:idActual, to: idHijos }
    this.PilaEdges= []
    this.GrahpvizEdges = ""
    this.contador = 0
    this.texto=[]
    this.TablaGramatica = []
  }
  //Genera los padres en funcion de los ultimos datos en la pila de Hijos
  generarPadre (posicion,padre="")
  {
    posicion--
    var concatenado=""
    var Edges = this.pilaHijos.pop()  
    for(const temp of Edges)
    {
      this.PilaEdges.push({from:this.contador+posicion, to:temp.id})
      this.GrahpvizEdges += `${this.contador+posicion} -> ${temp.id}\n`
      concatenado+=temp.label+" "
    }
    if(this.texto.length>0)
    {
      var textoActual=this.texto.pop()
      this.TablaGramatica.push({padre:padre,hijos:concatenado,produccion:textoActual})
    }
  }
  //Funcion que recive X parametros 
  generarHijos()
  {
    var Hijos=[]
    for(var i=0;i < arguments.length; i++)
    {
      var hijo = {id:this.contador,label:arguments[i]}
      Hijos.push(hijo)
      this.pilaNodos.push(hijo)
      this.GrahpvizNodo += `${this.contador}[label="${arguments[i]}"]\n`
      this.contador++
    }
    this.pilaHijos.push(Hijos)
  }

  generarTexto(texto)
  {
    this.texto.push(texto)
  }
}
// Datos { id:contador,label:'Nombre' }
