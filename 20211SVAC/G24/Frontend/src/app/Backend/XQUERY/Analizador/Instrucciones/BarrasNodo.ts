import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import Simboloxml from "src/app/Backend/XML/Analizador/Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import Aritmetica from '../Expresiones/Aritmetica';
import Identificador from '../Expresiones/Identificador';
import AtributoSimple from '../../../XPATH/Analizador/Instrucciones/AtributosSimples'
import SelectRoot from '../../../XPATH/Analizador/Instrucciones/SelectRoot';
import Todo from '../../../XPATH/Analizador/Instrucciones/Todo';
import Relacional from "../Expresiones/Relacional";
import ForSimple from "./ForSimple";
const inicio = require("../../../../componentes/contenido-inicio/contenido-inicio.component")

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
  public getNodoAST(): nodoAST {
    var nodo = new nodoAST('INSTRUCCION'); //PADRE SELECT
    var nodsBarras = new nodoAST(this.Barra)
    nodo.agregarHijoAST(nodsBarras)
    if (this.Barra2 != null) {
      /*nodo.agregarHijo(this.Barra2)*/
      var nodsBarras2 = new nodoAST(this.Barra2)
      nodo.agregarHijoAST(nodsBarras2)
    }
    if (this.Operacion != null) {

      nodo.agregarHijoAST(this.Operacion.getNodoAST())
    }

    return nodo;
  }


  //BARRA: SELECCIONA DESDE EL NODO RAIZ
  //DOBLE BARRA: SELECCIONA LOS NODOS QUE HAGAN MATCH EN EL DOCUMENTO NO IMPORTANDO DONDE ESTEN DESDE EL NODO ACTUAL 
  public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    //arbol.gettablaGlobal();
    //BARRA
    console.log('BARRA')
    console.log(tabla)
    let variable = this.Operacion.interpretar(arbol, tabla, tablaxml)
    console.log(this.Operacion)
    //if (variable != null) {
    if (this.Barra2 == null) {
      console.log("Aqui esta el arbol");
      let salidas: tablaSimbolosxml = new tablaSimbolosxml();
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

      } else if (this.Operacion instanceof Relacional) {
        if (
          this.Operacion.cond1.tipoDato.getTipo() == tipoDato.CADENA &&
          this.Operacion.cond2.tipoDato.getTipo() != tipoDato.CADENA
        ) {

          ///SE HACE LA COMPARACION PARA RETORNAR SI ES DE BARRANODO Y HAY CADENA
          for (var simb of tablaxml.getAnterior().getTabla()) {
            var bloqueaceptado: Simbolo = simb
            if (simb.getidentificador() == ForSimple.prototype.variableanterior) {

              for (let key of simb.getvalor().getTabla()) {
                try {
                  for (let sim of key.getvalor().getTabla()) {

                  }
                } catch (error) {

                  if (this.busquedaCondicion(variable.condicion1, key, variable.condicion2, variable.operador, this.Operacion.cond2.tipoDato)) {
                    for (let where of simb.getvalor().getTabla()) {
                      salidas.setVariable(where)
                    }
                  }
                }

              }
            }
          }

        } else if (
          this.Operacion.cond2.tipoDato.getTipo() == tipoDato.CADENA &&
          this.Operacion.cond1.tipoDato.getTipo() != tipoDato.CADENA
        ) {
          for (var simb of tablaxml.getAnterior().getTabla()) {
            var bloqueaceptado: Simbolo = simb
            if (simb.getidentificador() == ForSimple.prototype.variableanterior) {

              for (let key of simb.getvalor().getTabla()) {
                try {
                  for (let sim of key.getvalor().getTabla()) {

                  }
                } catch (error) {

                  if (this.busquedaCondicion(variable.condicion2, key, variable.condicion1, variable.operador, this.Operacion.cond2.tipoDato)) {
                    for (let where of simb.getvalor().getTabla()) {
                      salidas.setVariable(where)
                    }
                  }
                }

              }
            }
          }
        }else if (
          this.Operacion.cond2.tipoDato.getTipo() == tipoDato.CADENA &&
          this.Operacion.cond1.tipoDato.getTipo() == tipoDato.CADENA
        ) {
          var cond1= this.Operacion.cond1.interpretar(arbol,tabla,tablaxml)
          var cond2= this.Operacion.cond2.interpretar(arbol,tabla,tablaxml)
          var operador= this.Operacion.TipoOperando()
          for (var simb of tablaxml.getAnterior().getTabla()) {
            if (simb.getidentificador() == ForSimple.prototype.variableanterior) {

              for (let key of simb.getvalor().getTabla()) {
                try {
                  for (let sim of key.getvalor().getTabla()) {

                  }
                } catch (error) {

                  if (this.busquedaCondicion(cond1, key, cond2, operador, this.Operacion.cond2.tipoDato)) {
                    for (let where of simb.getvalor().getTabla()) {
                      salidas.setVariable(where)
                    }
                  }else if(this.busquedaCondicion(cond2, key, cond1, operador, this.Operacion.cond2.tipoDato)){
                    for (let where of simb.getvalor().getTabla()) {
                      salidas.setVariable(where)
                    }
                    
                  }
                }

              }
            }
          }
        }

        if (salidas != null) {
          return salidas
        }
      } else if (this.Operacion instanceof SelectRoot) {
        if (variable === ".") {
          for (var key of tablaxml.getTabla()) {
            salidas.setVariable(key)
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        } else {
          //SI EN CASO FUERA .. ENTONCES REGRESA AL NODO ANTERIOR
          var temporal = tablaxml.tablaAnterior
          if (temporal != null) {

            for (var i of temporal.tablaActual) {
              console.log(inicio.ArbolGlobalReporte)
              for (var b of inicio.ArbolGlobalReporte) {
                if (b.identificador === i.identificador && b.entorno == "Global") {
                  return "Nodo no encontado: [object XMLDocument]"
                }
              }
              salidas.setVariable(i)
            }
          } else {
            cadena = "Nodo no encontado: [object XMLDocument]"
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }
      } else if (this.Operacion instanceof Todo) {
        for (var key of tablaxml.getTabla()) {
          salidas.setVariable(key)
        }
        if (cadena != '') {
          return cadena
        }
        return salidas
      } else {
        var devolver: Array<Simboloxml> = new Array<Simboloxml>();
        for (var key of tablaxml.getTabla()) {
          if (key.getidentificador() == variable) {
            ForSimple.prototype.variableanterior = variable
            console.log(key.getidentificador())
            try {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }
            } catch (error) {
              devolver.push(key)
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          } else {
            error = "Nodo no encontrado ";
            console.log(error);
          }
        }
        if (cadena != '') {
          return devolver
        } else if (error != '') {
          return error
        }
        console.log("OBJETOSSALIDA")
        console.log(salidas)
        salidas.setAnterior(tablaxml)
        return salidas

      }

    } else {         // **************************************ESTE ES DOBLE BARRA******************************
      console.log("entro doble barra")
      //DOBLE BARRA
      let salidas = new tablaSimbolosxml();
      let cadena = ''

      /**ESTE SERVIRIA CUANDO ES TRIPO ATRIBUTO SIMPLE */
      if (this.Operacion instanceof AtributoSimple) {
        //SECCION DE LO QUE DEVUELVA ATRIBUTOS SIMPLES QUE SON * Y .
        if (this.Operacion.cadena != '') {
          return this.Operacion.cadena
        }
        return variable
      } else if (this.Operacion instanceof Todo) {
      } else if (this.Operacion instanceof SelectRoot) {
        if (variable === ".") {
          for (var key of tablaxml.getTabla()) {
            salidas.setVariable(key)
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        } else {
          //SI EN CASO FUERA .. ENTONCES REGRESA AL NODO ANTERIOR
          var temporal = tabla.tablaAnterior
          if (temporal != null) {

            for (var i of temporal.tablaActual) {
              console.log(inicio.ArbolGlobalReporte)
              for (var b of inicio.ArbolGlobalReporte) {
                if (b.identificador === i.identificador && b.entorno == "Global") {
                  return "Nodo no encontado: [object XMLDocument]"
                }
              }
              salidas.setVariable(i)
            }
          } else {
            cadena = "Nodo no encontado: [object XMLDocument]"
          }
          if (cadena != '') {
            return cadena
          }
          return salidas
        }
      } else {

        var devolver: Array<Simboloxml> = new Array<Simboloxml>();
        for (var key of tablaxml.getTabla()) {
          if (key.getidentificador() == variable) {
            console.log(key.getidentificador())
            try {
              for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
              }
            } catch (error) {
              devolver.push(key)
              cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
            }
          } else {
            console.log("NO SE ENCONTRO NODO")
          }
        }
        if (cadena != '') {
          return devolver
        }
        console.log("OBJETOSSALIDA")
        console.log(salidas)
        salidas.setAnterior(tablaxml)
        return salidas
      }
    }

  }
  /**
   * BUSQUEDA DE LA CONDICION CON ALGUNA ETIQUETA REALMENTE PARA LA FUNCION DE FOR Y LOS DERIVADOS DE WHERE
   * @param id 
   * @param tabla 
   * @returns 
   */
  busquedaCondicion(id: String, sim: Simboloxml, condicion2: any, operador: String, tipodato: Tipo): Boolean {
    if (id == sim.getidentificador()) {
      var condicion1 = this.cambiartipo(tipodato, sim.getvalor().trim())
      return this.hacerOperacion(condicion1, operador, condicion2)
    }
    return null
  }
  /**
   * ESTE HACE LA OPERACION Y DEVUELVE UN TRUE PARA 
   * @param cond1 
   * @param Operador 
   * @param cond2 
   * @returns 
   */
  hacerOperacion(cond1: any, Operador: String, cond2: any): Boolean {
    switch (Operador) {
      case "==":
        return cond1 == cond2;
      case "!=":
        return cond1 != cond2;
      case "<":
        return cond1 < cond2;
      case "<=":
        return cond1 <= cond2;
      case ">":
        return cond1 > cond2;
      case ">=":
        return cond1 >= cond2;
      default:
        return false;
    }
  }
  /**
   * CAMBIAR TIPO PARA HACER COMPARACION
   * @param tipodato 
   * @param valor 
   * @returns 
   */
  cambiartipo(tipodato: Tipo, valor: any) {
    switch (tipodato.getTipo()) {
      case tipoDato.ENTERO:
        return parseInt(valor);
      case tipoDato.DECIMAL:
        return parseFloat(valor);
      case tipoDato.CARACTER:
        var da = valor + '';
        var res = da.charCodeAt(0);
        return res;
      case tipoDato.BOOLEANO:
        let dats = valor + '';
        let otr = dats.toLowerCase();
        return parseInt(otr);
      case tipoDato.CADENA:
        return '' + valor;
    }
  }
  /////////////////////////////////FALTA COMPONER ESTA PARTE PARA QUE TAMBIEN HAGA LA COMPARACION CON CODIGO 3D
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
