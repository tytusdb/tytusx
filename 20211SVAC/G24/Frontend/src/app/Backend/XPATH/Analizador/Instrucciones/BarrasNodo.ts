
import tablaSimbolos from 'src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos';
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Aritmetica from '../Expresiones/Aritmetica';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import AtributoSimple from './AtributosSimples';

export default class BarrasNodo extends Instruccion {
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
    let variable = this.Operacion.interpretar(arbol, tabla);
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
      }else if(this.Operacion instanceof Aritmetica){
        
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
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }



}
