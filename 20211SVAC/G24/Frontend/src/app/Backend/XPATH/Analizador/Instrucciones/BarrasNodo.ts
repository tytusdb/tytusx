
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';
import tablaSimbolos from 'src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos';
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Aritmetica from '../Expresiones/Aritmetica';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import AtributoSimple from './AtributosSimples';
import SelectRoot from './SelectRoot';
import Todo from './todo';
const inicio = require("../../../../componentes/contenido-inicio/contenido-inicio.component")

export default class BarrasNodo extends Instruccion {
  public variablePublica:any

  public Barra: string;
  public Barra2: string;
  public Operacion: Instruccion   //Nodo
  contenido: string = "";
  constructor(barra1: string, expresion: Instruccion, fila: number, columna: number, barra2?: string) {

    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.Barra = barra1
    this.Barra2 = barra2
    this.Operacion = expresion
  }
  public getNodosAST(): nodoAST {
    var nodo = new nodoAST('INSTRUCCION'); //PADRE SELECT
    var nodsBarras = new nodoAST(this.Barra)
    nodo.agregarHijoAST(nodsBarras)
    if (this.Barra2 != null) {
      /*nodo.agregarHijo(this.Barra2)*/
      var nodsBarras2 = new nodoAST(this.Barra2)
      nodo.agregarHijoAST(nodsBarras2)
    }
    if (this.Operacion != null) {

      nodo.agregarHijoAST(this.Operacion.getNodosAST())
    }

    return nodo;
  }


  //BARRA: SELECCIONA DESDE EL NODO RAIZ
  //DOBLE BARRA: SELECCIONA LOS NODOS QUE HAGAN MATCH EN EL DOCUMENTO NO IMPORTANDO DONDE ESTEN DESDE EL NODO ACTUAL 
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    //arbol.gettablaGlobal();
    //BARRA
    console.log('BARRA')
    console.log(tabla)
     this.variablePublica = this.Operacion.interpretar(arbol, tabla);
    console.log(this.Operacion)
    //if (variable != null) {
    if (this.Barra2 == null) {
      console.log("Aqui esta el arbol");
      let salidas:tablaSimbolos = new tablaSimbolos();
      let cadena = ''
      let error = ''

      if (this.Operacion instanceof AtributoSimple) {
        //SECCION DE LO QUE DEVUELVA ATRIBUTOS SIMPLES QUE SON * Y .
        if (this.Operacion.cadena != '') {
          console.log(this.Operacion.cadena)
          return this.Operacion.cadena
        } else {
          return "No hay atributos"
        }
      } else if (this.Operacion instanceof Aritmetica) {

      } else if (this.Operacion instanceof SelectRoot){
        if(this.variablePublica==="."){
          for (var key of tabla.getTabla()) {
            salidas.setVariable(key)
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }else{
          //SI EN CASO FUERA .. ENTONCES REGRESA AL NODO ANTERIOR
          var temporal=tabla.tablaAnterior
          if(temporal!=null){
            
            for(var i of temporal.tablaActual){
              console.log(inicio.ArbolGlobalReporte)
              for(var b of inicio.ArbolGlobalReporte){
                if( b.identificador=== i.identificador && b.entorno=="Global"){
                  return "Nodo no encontado: [object XMLDocument]"
                }
              }
              salidas.setVariable(i)
            }
          }else{
            cadena="Nodo no encontado: [object XMLDocument]"
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }
      }else if (this.Operacion instanceof Todo) {
        for (var key of tabla.getTabla()) {
          salidas.setVariable(key)
        }
        if (cadena != '') {
          return cadena
        }
        return salidas
      } else {
        for (var key of tabla.getTabla()) {
         
          if (key.getidentificador() == this.variablePublica) {
            
            console.log(key.getidentificador())
            if (key.getvalor() instanceof tablaSimbolos) {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }

            }
            else {
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          } else {
            error = "Nodo no encontrado ";
            console.log(error);
          }

        }
        if (cadena != '') {
          return cadena
        } else if (error != '') {
          return error
        }
        console.log("OBJETOSSALIDA")
        console.log(salidas)
        salidas.setAnterior(tabla)
        return salidas

      }

    } else {         // **************************************ESTE ES DOBLE BARRA******************************
      console.log("entro doble barra")
      //DOBLE BARRA
      let salidas = new tablaSimbolos();
      let cadena = ''

      /**ESTE SERVIRIA CUANDO ES TRIPO ATRIBUTO SIMPLE */
      if (this.Operacion instanceof AtributoSimple) {
        //SECCION DE LO QUE DEVUELVA ATRIBUTOS SIMPLES QUE SON * Y .
        if (this.Operacion.cadena != '') {
          return this.Operacion.cadena
        }
        return this.variablePublica
      } else if (this.Operacion instanceof Todo) {
      } else if (this.Operacion instanceof SelectRoot){
        if(this.variablePublica==="."){
          for (var key of tabla.getTabla()) {
            salidas.setVariable(key)
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }else{
          //SI EN CASO FUERA .. ENTONCES REGRESA AL NODO ANTERIOR
          var temporal=tabla.tablaAnterior
          if(temporal!=null){
            
            for(var i of temporal.tablaActual){
              console.log(inicio.ArbolGlobalReporte)
              for(var b of inicio.ArbolGlobalReporte){
                if( b.identificador=== i.identificador && b.entorno=="Global"){
                  return "Nodo no encontado: [object XMLDocument]"
                }
              }
              salidas.setVariable(i)
            }
          }else{
            cadena="Nodo no encontado: [object XMLDocument]"
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }
      }else {

        for (var key of tabla.getTabla()) {
          if (key.getidentificador() == this.variablePublica) {
            console.log(key.getidentificador())
            if (key.getvalor() instanceof tablaSimbolos) {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }

            }
            else {
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          }
          if (cadena != '') {
            return cadena
          }
          console.log("OBJETOSSALIDA")
          console.log(salidas)
          salidas.setAnterior(tabla)
          return salidas
        }
      }
    }

  }
  CollectAll(key: Simbolo, cad: string, salidas: tablaSimbolos) {
    if (key.getvalor().getTabla() != null) {
      for (let sim of key.getvalor().getTabla()) {
        salidas.setVariable(sim)
        if (sim instanceof Simbolo) {
          if (sim.getAtributo().size != 0) {
            sim.getAtributo().forEach(element => {
              cad += element.trim() + "\n"
            });
          }
          if (sim.getvalor() instanceof tablaSimbolos) {
            this.CollectAll(sim, cad, salidas)
          }
        }
      }
    }
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    let variable = this.Operacion.codigo3D(arbol, tabla);
    console.log(this.Operacion)
    //if (variable != null) {
    if (this.Barra2 == null) {
      console.log("Aqui esta el arbol");
      let salidas = new tablaSimbolos();
      let cadena = ''
      let error = ''

      if (this.Operacion instanceof AtributoSimple) {
        //SECCION DE LO QUE DEVUELVA ATRIBUTOS SIMPLES QUE SON * Y .
        if (this.Operacion.cadena != '') {
          console.log(this.Operacion.cadena)
          return this.Operacion.cadena
        }
        return variable
      } else if (this.Operacion instanceof Aritmetica) {

      } else {
        for (var key of tabla.getTabla()) {
          if (key.getidentificador() == variable) {
            console.log(key.getidentificador())
            if (key.getvalor() instanceof tablaSimbolos) {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }

            }
            else {
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          } else {
            error = "Nodo no encontrado ";
            console.log(error);
          }

        }
        if (cadena != '') {
          return cadena
        } else if (error != '') {
          return error
        }
        console.log("OBJETOSSALIDA")
        console.log(salidas)
        return salidas

      }

    } else {
      console.log("entro doble barra")
      //DOBLE BARRA
      let salidas = new tablaSimbolos();
      let cadena = ''

      /**ESTE SERVIRIA CUANDO ES TRIPO ATRIBUTO SIMPLE */
      if (this.Operacion instanceof AtributoSimple) {
        //SECCION DE LO QUE DEVUELVA ATRIBUTOS SIMPLES QUE SON * Y .
        if (this.Operacion.cadena != '') {
          return this.Operacion.cadena
        }
        return variable
      } else {

        for (var key of tabla.getTabla()) {
          if (key.getidentificador() == variable) {
            console.log(key.getidentificador())
            if (key.getvalor() instanceof tablaSimbolos) {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }

            }
            else {
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          }
          if (cadena != '') {
            return cadena
          }
          console.log("OBJETOSSALIDA")
          console.log(salidas)
          return salidas
        }
      }
    }
  }



}
