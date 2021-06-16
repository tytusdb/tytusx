import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Instruccion } from "../Interfaz/instruccion";
import { Atributo } from "../XML/Atributo";
import { Objeto } from "../XML/Objeto";
import { Nodo, TipoNodo } from "./Nodo";

export class Consulta implements Instruccion {
  linea: number;
  columna: number;
  listaNodos: Array<Nodo>;
  constructor(listaNodos: Array<Nodo>, linea: number, columna: number) {
    this.listaNodos = listaNodos;
    this.linea = linea;
    this.columna = columna;
  }

  ToString(): string {
    let cad = "";
    this.listaNodos.forEach((nodo: Nodo) => {
      cad += "/" + nodo.getNombre();
      if (nodo.getPredicado() != undefined) {
        cad += "[" + nodo.getPredicado() + "]";
      }
    });
    return cad;
  }

  ejecutar(global: Entorno): any {
    //Recorrer lista de nodos
    return this.obtenerSalida(0, global, null);
  }

  obtenerSalida(pos: number, ent: Entorno, elemAux: any): String {
    let salida = "";
    let actualNode: Nodo = this.listaNodos[pos];
    switch (actualNode.getTipo()) {
      case TipoNodo.IDENTIFIER:
        //Buscar si este id existe en el entorno.
        ent.tsimbolos.forEach((e: any) => {
          //Ver si este simbolo es igual a actualNode.getNombre()
          let elem = e.valor;
          if (elem.getNombre() === actualNode.getNombre()) {
            //Si existe este simbolo en el entorno.
            //1. Revisar si es el ultimo nodo a buscar
            if (pos + 1 < this.listaNodos.length) {
              //Aun existen mas nodos en la consulta, ir a buscar eso
              salida += this.obtenerSalida(pos + 1, elem.valor, elem);
            } else {
              //Es el ultimo nodo en la consulta, escribir su informacion de objeto
              if (elem.getTipo() === Tipo.STRING) {
                salida += this.concatHijoTexto(elem, 0);
              } else {
                salida += this.getConsultaObjeto(elem, 0);
              }
            }
          } else if (!actualNode.isFromRoot()) {
            //Este nodo es de tipo //, entonces entrar a buscar de todos modos.
            if (elem.getTipo() === Tipo.ETIQUETA) {
              salida += this.obtenerSalida(pos, elem.valor, elem);
            }
          }
        });
        break;
      case TipoNodo.ATRIBUTO:
        //Ver si es @algo o @*
        if (actualNode.getNombre() === "*") {
          //Si es asterisco, obtener todos los atributos del entorno actual
          if (actualNode.isFromRoot()) {
            //Solo es /, buscar solo en el entorno actual todos los atributos.
            ent.tsimbolos.forEach((e: any) => {
              let elem = e.valor;
              if (elem.getTipo() === Tipo.ATRIBUTO) {
                salida += elem.valor + "\n";
              }
            });
          } else {
            //Es //, buscar en el entorno actual y los entornos hijos.
            ent.tsimbolos.forEach((e: any) => {
              let elem = e.valor;
              if (elem.getTipo() === Tipo.ATRIBUTO) {
                salida += elem.valor + "\n";
              } else if (elem.getTipo() === Tipo.STRING) {
                /*
                  FALTAN ETIQUETAS CON TEXTO Y ATRIBUTO EJEMPLO:
                    <title atributorandom="hola"> hola texto </title>
                */
              } else if (elem.getTipo() === Tipo.ETIQUETA) {
                //Ir a buscar atributos al entorno de esta etiqueta
                salida += this.getConsultaAtributos(elem, 0, "*");
              }
            });
          }
        } else {
          //El atributo tiene identificador, buscar solo los atributos que tienen este nombre.
          if (actualNode.isFromRoot()) {
            //Solo es /, buscar solo en el entorno actual todos los atributos.
            ent.tsimbolos.forEach((e: any) => {
              let elem = e.valor;
              if (elem.getTipo() === Tipo.ATRIBUTO) {
                //Concatenar solo si los nombres son iguales.
                if (actualNode.getNombre() === elem.getNombre()) {
                  salida += elem.valor + "\n";
                }
              }
            });
          } else {
            //Es //, buscar en el entorno actual y los entornos hijos.
            ent.tsimbolos.forEach((e: any) => {
              let elem = e.valor;
              if (elem.getTipo() === Tipo.ATRIBUTO) {
                if (actualNode.getNombre() === elem.getNombre()) {
                  salida += elem.valor + "\n";
                }
              } else if (elem.getTipo() === Tipo.STRING) {
                /*
                  FALTAN ETIQUETAS CON TEXTO Y ATRIBUTO EJEMPLO:
                    <title atributorandom="hola"> hola texto </title>
                */
              } else if (elem.getTipo() === Tipo.ETIQUETA) {
                //Ir a buscar atributos al entorno de esta etiqueta
                salida += this.getConsultaAtributos(
                  elem,
                  0,
                  actualNode.getNombre()
                );
              }
            });
          }
        }
        break;
      case TipoNodo.DOTDOT:
        /*
        **
        **  .. (DOTDOT) ESTA BUGGEADO :(
        **
        */
        //Ver si es el ultimo o no
        if (pos + 1 < this.listaNodos.length) {
          //Aun hay mas nodos.
          //Avanzar en la lista de nodos (pos+1) pero regresar al entorno anterior (padre)
          salida += this.obtenerSalida(pos + 1, ent.padre, elemAux);
        } else {
          //Es el ultimo nodo, entonces obtener consulta sobre este entorno
          let father = elemAux.valor.padre;
          console.log("FATHER: ", father);
          salida += "<" + father.nombre + ">\n";
          father.tsimbolos.forEach((e: any) => {
            //Para cada simbolo en el entorno anterior, obtener su contenido
            let elem = e.valor;
            if (elem.getTipo() === Tipo.STRING) {
              //Esta etiqueta contiene solo texto.
              salida += this.concatHijoTexto(elem, 1);
            } else if (elem.getTipo() === Tipo.ETIQUETA) {
              salida += this.getConsultaObjeto(elem, 1);
            }
          });
          salida += "</" + father.nombre + ">\n";
        }

        break;
      case TipoNodo.DOT:
        //Ver si es el ultimo o no
        if (pos + 1 < this.listaNodos.length) {
          //Aun hay mas nodos.
          //Avanzar en la lista de nodos (pos+1) pero mantener el mismo entorno
          salida += this.obtenerSalida(pos + 1, ent, elemAux);
        } else {
          //Es el ultimo nodo, entonces obtener consulta sobre este entorno
          if (elemAux.getTipo() === Tipo.STRING) {
            //Esta etiqueta contiene solo texto.
            salida += this.concatHijoTexto(elemAux, 0);
          } else if (elemAux.getTipo() === Tipo.ETIQUETA) {
            salida += this.getConsultaObjeto(elemAux, 0);
          }
        }
        break;
      case TipoNodo.ASTERISCO:
        //* Obtener Todo
        //1. Ver si existen mas nodos
        if (pos + 1 < this.listaNodos.length) {
          //Aun hay mas nodos.
          ent.tsimbolos.forEach((e: any) => {
            if (e.valor.getTipo() === Tipo.ETIQUETA) {
              salida += this.obtenerSalida(pos + 1, e.valor.valor, elemAux);
            }
          });
        } else {
          //Es el ultimo nodo.

          ent.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
            if (elem.getTipo() === Tipo.STRING) {
              salida += this.concatHijoTexto(elem, 0);
            } else if (elem.getTipo() === Tipo.ETIQUETA) {
              salida += this.getConsultaObjeto(elem, 0);
            }
          });
        }
        break;
      case TipoNodo.FUNCION:
        
        break;
      case TipoNodo.AXIS:
        return "Implementacion de Axis no existe:'v";
        break;
    }
    return salida;
  }

  addTabs(nTabs: number) {
    let tabs = "";
    for (let i = 0; i < nTabs; i++) {
      tabs += "    ";
    }
    return tabs;
  }

  getConsultaAsterisco(ent: Entorno, pos: number, nTabs: number) {
    let salida = this.addTabs(nTabs) + "";
  }

  getConsultaAtributos(elem: any, nTabs: number, atrBuscar: String): string {
    let salida = "";

    let hijosList = elem.valor.tsimbolos;
    hijosList.forEach((e: any) => {
      let son = e.valor;

      if (son.getTipo() === Tipo.ATRIBUTO) {
        //Es atributo, concatenar a la salida
        if (atrBuscar === "*") {
          salida += son.valor + "\n";
        } else if (atrBuscar === son.getNombre()) {
          salida += son.valor + "\n";
        }
      }
      if (son.getTipo() === Tipo.ETIQUETA) {
        salida += this.getConsultaAtributos(son, nTabs, atrBuscar);
      }
    });

    return salida;
  }

  getConsultaObjeto(elem: any, nTabs: number): string {
    let salida = this.addTabs(nTabs) + "";
    //Obtener todos los que se llaman nombre y sus hijos.
    //1. Para cada elemento escribir su etiqueta, atributos e hijos o texto
    //2 Escribir nombre:
    salida += "<" + elem.nombre;
    let hijosList = elem.valor.tsimbolos;
    //3. Ver si este elemento tiene Atributos
    hijosList.forEach((atr: any) => {
      let atributo = atr.valor;
      //3.1 Ver si el hijo es atributo
      if (atributo.getTipo() === Tipo.ATRIBUTO) {
        //3.2 Concatenar atributo a la salida ejmplo: category="web"
        salida += " " + atributo.nombre + "=" + atributo.valor;
      }
    });
    salida += ">\n";
    //4. Ver si el elemento tiene hijos adentro
    hijosList.forEach((h: any) => {
      let hijo = h.valor;
      if (hijo.getTipo() === Tipo.STRING) {
        salida += this.concatHijoTexto(hijo, nTabs + 1);
      } else if (hijo.getTipo() === Tipo.ETIQUETA) {
        //3.3 Escribir la info de este hijo
        salida += this.getConsultaObjeto(hijo, nTabs + 1);
      }
    });

    //2.4 Cerrar la etiqueta actual
    salida += this.addTabs(nTabs) + "</" + elem.nombre + ">\n";
    return salida;
  }

  concatHijoTexto(son: any, nTabs: number): string {
    let salida = this.addTabs(nTabs) + "";
    salida += "" + son.getValor() + " ";
    return salida + "\n";
  }
}
