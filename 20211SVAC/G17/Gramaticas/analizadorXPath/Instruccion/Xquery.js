import { concat, map } from "lodash";
import { Tipo } from "../AST/Entorno";
import { Literal, Nodo } from "../Expresion/Expresiones";

export class Flower
{
  constructor(clauseexp,returnexp)
  {
    this.clauseexp=clauseexp  
    this.returnexp=returnexp
    this.EntornoLocal = [[]]
  }

  getValor(nodos)
  {
    this.EntornoLocal[0] = this.EntornoLocal[0].concat(nodos)
    for (const clause of this.clauseexp) {
      this.EjecutarClouse(clause,nodos)
    }
    return this.EjecutarReturn()
  }

  EjecutarClouse(clause,nodos)
  {
    switch(clause.name)
    {
      case 'Let':
        for (const exp of clause.exp) {
          this.DeclararLet(exp.name,exp.exp)
        }
        break;
      case 'For':
        for (const exp of clause.exp) {
          this.DeclararFor(exp.name,exp.posicion,exp.exp)
        }
        break;
      case 'Where':
        this.EjecutarWhere(clause.exp,nodos)
        break;
      case 'Order':
        for (const exp of clause.exp) { 
          this.EjecutarOrder(exp.exp,exp.mode.order,exp.mode.empty)
        }
        break;
    }
  }

  DeclararLet(nombre,exp)
  {
    for (const entorno of this.EntornoLocal) {
      var retornos = exp.getValor(entorno) 
      if(retornos[0] && retornos[0].tipo==Tipo.ERROR) return 
      if(this.contains(entorno,retornos,nombre)) return
      var Entorno =
      {
        tipo : nombre,
        atributos : [],
        hijos:retornos,
        texto:'',
        posTipo : 0,
        posTexto : 0,
      }
      entorno.push(new Nodo(Tipo.NODO,Entorno,[],'',1))
    } 
  }

  DeclararFor(nombre,posicion,exp)
  {
    var NuevoEntornoLocal = []
    for (const entorno of this.EntornoLocal) {
      var retornos = exp.getValor(entorno)
      if(retornos[0] && retornos[0].tipo==Tipo.ERROR) return 
      var index = 1;
      for (const retorno of retornos) {
        var nuevoEntorno = [...entorno]
        if(this.contains(nuevoEntorno,[retorno],nombre)) continue
        var Entorno =
        {
          tipo : nombre,
          atributos : [],
          hijos: [retorno],
          texto: '',
          posTipo : 0,
          posTexto : 0,
        }
        nuevoEntorno.push(new Nodo(Tipo.NODO,Entorno,[],'',1))
        if(posicion!='')
        {
          var posicionEntorno =
          {
            tipo: posicion,
            atributos: [],
            hijos: [new Literal(Tipo.INTEGER,index)],
            posTipo: 0,
            posTexto: 0,
          }
          nuevoEntorno.push(new Nodo(Tipo.NODO,posicionEntorno,[],'',1))
        }
        NuevoEntornoLocal.push(nuevoEntorno)
        index++
      }
    }
    this.EntornoLocal=NuevoEntornoLocal
  }

  contains(nodos,nuevoValor,nombre)
  {
    for (const nodo of nodos) {
      if(nodo.entorno.tipo==nombre){
        nodo.entorno.hijos = nuevoValor
        return true
      } 
    }
    return false
  }

  EjecutarWhere(exp)
  {
    var EntornoFiltrado = []
    for (const entorno of this.EntornoLocal) {
      var retorno = exp.getValor(entorno)
      if(retorno.length>0)
      {
        EntornoFiltrado.push(entorno)
      }
    }
    this.EntornoLocal=EntornoFiltrado
  }

  EjecutarOrder(exp,order,empty)
  { 
    var mapa = []
    for (const entorno of this.EntornoLocal) {
      var retorno = exp.getValor(entorno)
      mapa = this.insertarOrden({valor:retorno[0].tipo!=Tipo.ERROR ? retorno[0].valor : undefined ,nodo:entorno},mapa,order,empty)
    }
    var LocalEnOrden = []
    for (const valor of mapa) {
      LocalEnOrden.push(valor.nodo)
    }
    this.EntornoLocal=LocalEnOrden
  }

  insertarOrden(nodo,mapa,order,empty)
  {
    var tempmapa = []
    let bandera = false
    let i = 0
    for (; i < mapa.length; i++) {
      if(this.comparacion(nodo.valor,mapa[i].valor,order,empty))
      {
        tempmapa.push(nodo)
        bandera=true
        break
      }
      tempmapa.push(mapa[i])   
    } 
    for (; i < mapa.length; i++) {
      tempmapa.push(mapa[i])   
    }
    if(!bandera)
    {
      tempmapa.push(nodo)
    }
   return tempmapa
  }
  //Valor 1 es el valor entrante
  comparacion(valor1,valor2,order,empty)
  {
    switch(empty)
    {
      case 'g':
        switch(order)
        {
          case 'asc':
            if(!valor1) return false
            if(!valor2) return true
            if(valor1<valor2) return true
            return false
          case 'desc':
            if(!valor1 && !valor2) return false
            if(!valor1) return true
            if(valor1>valor2) return true
            return false
        }
        break;
      case 'l':
        switch(order)
        {
          case 'asc':
            if(!valor1 && !valor2) return false
            if(!valor1) return true
            if(valor1<valor2) return true
            return false
          case 'desc':
            if(!valor1) return false
            if(!valor2) return true
            if(valor1>valor2) return true
            return false
        }
        break;
    }
  }

  EjecutarReturn()
  {
    var retornos = []
    for (const entorno of this.EntornoLocal) {
      retornos = retornos.concat(this.returnexp.getValor(entorno))
    }
    return retornos
  }
  
}

export class IfThenElse
{
  constructor( condiciones, bloqueverdadero,bloquefalso )
  {
    this.condiciones=condiciones
    this.bloqueverdadero=bloqueverdadero
    this.bloquefalso=bloquefalso
  }

  getValor(nodos)
  {
    var retorno = []
    if(this.condiciones.length > 1) return retorno
    var rescondicion = this.condiciones[0].getValor(nodos)
    if(rescondicion.length>0)
    {
      retorno = retorno.concat(this.bloqueverdadero.getValor(nodos))
    }
    else
    {
      retorno = retorno.concat(this.bloquefalso.getValor(nodos))
    }
    return retorno
  }
}