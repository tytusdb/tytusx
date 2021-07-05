import { cond, forEach } from "lodash";
import { Objeto } from "./abstractas/objeto";
import { Error } from "./arbol/error";
import { Errores } from "./arbol/errores";
import { XmlTS } from "./arbol/xmlTS";
import { Aritmeticas } from "./expresiones/aritmeticas";
import { Arreglo } from "./expresiones/arreglo";
import { Funcion } from "./expresiones/funcion";
import { identificador } from "./expresiones/identificador";
import { If_Else } from "./expresiones/if_else";
import { letEXP } from "./expresiones/letEXP";
import { llamfuc } from "./expresiones/llamFunc";
import { Mostrar } from "./expresiones/mostrar";
import { nuevaFuncion } from "./expresiones/nuevaFuncion";
import { Operacion, Operador } from "./expresiones/operacion";
import { Primitivo } from "./expresiones/primitivo";
import { Relacion } from "./expresiones/relacional";
import { Retorno } from "./expresiones/retorno";
import { Tipo } from "./expresiones/tipo";
import { Variable } from "./expresiones/variable";
import { Entorno } from "./interfaces/entorno";
import { Expresion } from "./Interfaces/Expresion";
import { Instruccion } from "./interfaces/instruccion";
import { ListaEntornos } from "./interfaces/listaEntornos";
import { funcion_nativa } from "./expresiones/funcion_nativa";
import _ = require("lodash");

export class Ejecucion {
  prologoXml: JSON;
  cuerpoXml: Array<Objeto>;
  cadena: string;

  version: string;
  encoding: string;

  esRaiz: boolean;
  descendiente: boolean;
  atributo: boolean;
  atributoTexto: string;
  atributoIdentificacion: any[];
  indiceValor: number;
  punto: string;
  posicion: any[];
  nodo_descendente: boolean; //  -> //*
  atributo_nodo: boolean;   // -> /@*
  atributo_nodo_descendiente: boolean;
  ej_child: boolean;  //::child
  ej_attrib: boolean; //::attribute
  node_texto: boolean; // -> /node()
  node_desc: boolean; // -> //node()
  atributo_desc: boolean;

  consultaXML: Array<Objeto>;
  pathh: Array<Objeto>;
  pathhCount: number;
  ts: XmlTS;

  tildes: Array<String> = ['á', 'é', 'í', 'ó', 'ú'];

  raiz: Object;
  contador: number;
  dot: string;

  ejecXQuery: string;

  constructor(prologo: JSON, cuerpo: Array<Objeto>, cadena: string, raiz: Object) {
    this.prologoXml = prologo;
    this.cuerpoXml = cuerpo;
    this.cadena = cadena;
    Object.assign(this, { raiz, contador: 0, dot: '' });
  }

  verObjetos() {
    this.ts = new XmlTS();

    this.cuerpoXml.forEach((element, index) => {
      let etiqueta = "doble";
      if (!element.doble) {
        etiqueta = "única"
      }
      this.ts.agregar(element.identificador, element.texto, "Raiz", "Etiqueta " + etiqueta, element.linea, element.columna, null, null);
      if (element.listaAtributos.length > 0) {
        element.listaAtributos.forEach(atributos => {
          this.ts.agregar(atributos.identificador, atributos.valor, element.identificador, "Atributo", atributos.linea, atributos.columna, this.cuerpoXml[index], null);
        });
      }
      if (element.listaObjetos.length > 0) {
        this.tablaRecursiva(element.listaObjetos, element.identificador, this.cuerpoXml, index);
      }
    });
    //console.log(this.ts);
  }

  tablaRecursiva(elemento: Array<Objeto>, entorno: string, padre: Array<Object>, indice: number) {
    elemento.forEach((element, index) => {
      let etiqueta = "doble";
      if (!element.doble) {
        etiqueta = "única"
      }
      let texto = ""
      for (var i = 0; i < element.texto.length; i++) {
        if (this.tildes.includes(element.texto[i])) {
          texto += element.texto[i];
        }
        else if (this.tildes.includes(element.texto[i - 1])) {
          texto += element.texto[i];
        }
        else {
          texto += " " + element.texto[i];
        }
      }
      this.ts.agregar(element.identificador, texto, entorno, "Etiqueta " + etiqueta, element.linea, element.columna, padre[indice], null);
      if (element.listaAtributos.length > 0) {
        element.listaAtributos.forEach(atributos => {
          this.ts.agregar(atributos.identificador, atributos.valor, element.identificador, "Atributo", atributos.linea, atributos.columna, elemento[index], null);
        });
      }
      if (element.listaObjetos.length > 0) {
        this.tablaRecursiva(element.listaObjetos, element.identificador, elemento, index);
      }
    });
  }

  getDot(): string {
    this.contador = 0;
    this.dot = "digraph G {\n";
    if (this.raiz != null) {
      this.generacionDot(this.raiz);
    }
    this.dot += "\n}";
    return this.dot;
  }

  generacionDot(nodo: any): void {
    if (nodo instanceof Object) {
      let idPadre = this.contador;
      this.dot += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
      if (nodo.hasOwnProperty("hijos")) {
        nodo.hijos.forEach((nodoHijo: any) => {
          let idHijo = ++this.contador;
          this.dot += `node${idPadre} -> node${idHijo};\n`;
          if (nodoHijo instanceof Object) {
            this.generacionDot(nodoHijo);
          } else {
            this.dot += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
          }
        });
      }
    }
  }

  getStringValue(label: string): string {
    if (label.startsWith("\"") || label.startsWith("'") || label.startsWith("`")) {
      return label.substr(1, label.length - 2);
    }
    return label;
  }

  identificar(etiqueta: string, nodo: any): boolean {
    if (nodo == null || !(nodo instanceof Object)) {
      return false;
    }
    if (nodo.hasOwnProperty('label') && nodo.label != null) {
      return nodo.label === etiqueta;
    }
    return false;
  }

  recorrer(): string {
    if (this.raiz != null) {
      this.esRaiz = true;
      this.descendiente = false;
      this.atributo = false;
      this.atributoTexto = '';
      this.atributoIdentificacion = [];
      this.ejecXQuery = '';
      this.indiceValor = null;
      this.punto = '';
      this.consultaXML = this.cuerpoXml;

      //this.verObjetos();
      try {
        if (this.raiz instanceof Object) {
          if (this.identificar('XQUERY', this.raiz)) {
            this.xqueryEjec();
            this.recorrido(this.raiz);
            if (!(this.atributoIdentificacion.length > 0)) {
              return this.ejecXQuery;
            }
            return this.ejecXQuery + '\n' + this.traducir();
          }
          else
            this.recorrido(this.raiz);
        }

      } catch (error) {
        return 'No se encontró por algun error\n' + error;
      }
      //console.log(this.atributoIdentificacion);
      if (this.atributoIdentificacion.length > 0) {
        return this.traducir();
      }
      else
        return 'No se encontró'
    }
    return 'no se pudo';
  }

  recorrido(nodo: any): void {
    if (nodo instanceof Object) {
      if (this.identificar('S', nodo)) {
        this.recorrido(nodo.hijos[0]);
        //console.log(this.consultaXML);
      }

      if (this.identificar('INSTRUCCIONES', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            if (element === '|') {
              this.consultaXML.forEach(element => {
                this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
              });
              this.esRaiz = true;
              this.descendiente = false;
              this.atributo = false;
              this.atributoTexto = '';
              this.indiceValor = null;
              this.punto = '';
              this.consultaXML = this.cuerpoXml;
            }
            else if (!(element === '[') && !(element === ']') && !(element === '(') && !(element === ')')) {
              this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
              //console.log(this.consultaXML);
            }
          }
        });
        this.consultaXML.forEach(element => {
          this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
        });
        this.atributoIdentificacion.sort((n1, n2) => {
          if (n1.cons.linea > n2.cons.linea) {
            return 1;
          }

          if (n1.cons.linea < n2.cons.linea) {
            return -1;
          }

          return 0;
        });
      }

      if (this.identificar('RAIZ', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            //console.log(element);
            this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
          }
        });
      }

      if (this.identificar('DESCENDIENTES_NODO', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            //console.log(element);
            this.consultaXML = this.reducir(this.consultaXML, element, 'DESCENDIENTES_NODO');
          }
        });
      }

      if (this.identificar('PADRE', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            //console.log(element);
            this.consultaXML = this.reducir(this.consultaXML, element, 'PADRE');
          }
        });
      }

      if (this.identificar('ATRIBUTO_PREDICADO', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            //console.log(element);
            this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_PREDICADO');
          }
        });
      }

      if (this.identificar('ORDEN', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string' && element === 'last') {
            let cons: Array<Objeto>;
            cons = [];
            this.consultaXML.forEach((element, index) => {
              if (index === this.consultaXML.length - 1) {
                cons.push(element);
              }
            });
            this.consultaXML = cons;
          }
        });
      }

      if (this.identificar('ARITMETICAS', nodo) || this.identificar('integer', nodo)) {
        if (this.identificar('integer', nodo)) {
          this.consultaXML = this.reducir(this.consultaXML, nodo.hijos[0], 'INSTRUCCIONES');
        }
        else {
          let val: Expresion = null;
          val = this.calcular(nodo, null, 0);
          this.consultaXML = this.reducir(this.consultaXML, val.getValorImplicito(val), 'INSTRUCCIONES');
        }
      }

      if (this.identificar('RELACIONALES', nodo)) {
        let val: Expresion = null;
        let cons: Array<Objeto> = [];
        let es: string = '';

        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            if (this.identificar('ATRIBUTO_PREDICADO', element)) {
              es = 'es@';
            }
            else if (this.identificar('id', element)) {
              es = 'esID';
            }
            else if (this.identificar('punto', element)) {
              es = 'esPunto';
            }
            else if (this.identificar('PATH', element)) {
              es = 'esPath';
              this.pathh = this.consultaXML;
              this.pathhCount = 0;
              this.path(element);
            }
            else if (this.identificar('ORDEN', element)) {
              es = 'esOrden';
              this.posicion = [];
            }
          }
        });

        if (es === 'esPath') {
          this.pathh.forEach((element, index) => {
            if (this.atributo) {
              if (element.listaAtributos.length > 0) {
                val = this.calcular(nodo, element, index);
                if (val.getValorImplicito(val)) {
                  console.log(element);
                  cons.push(element);
                }
              }
            }
            else {
              if (element) {
                val = this.calcular(nodo, element, index);
                if (val.getValorImplicito(val)) {
                  cons.push(element);
                }
              }
            }
          });
          this.atributo = false;
          this.pathh = [];
          for (let index = 0; index < this.pathhCount; index++) {
            cons.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  let a = padre[6];
                  let b = false;
                  cons.forEach(element => {
                    if (element == a) {
                      b = true;
                    }
                  });
                  if (!b) {
                    cons.push(a);
                  }
                }
              });
            });
          }
          if (cons.length > 0) {
            this.consultaXML.forEach((element) => {
              cons.forEach(y => {
                if (element.identificador === y.identificador && element.linea === y.linea && element.columna === y.columna) {
                  this.pathh.push(element);
                }
                else if (y.listaObjetos.length > 0) {
                  y.listaObjetos.forEach(yy => {
                    if (element.identificador === yy.identificador && element.linea === yy.linea && element.columna === yy.columna) {
                      this.pathh.push(element);
                    }
                  });
                }
              });
            });
          }
          cons = this.pathh;
        }
        else
          this.consultaXML.forEach((element, index) => {
            if (es === 'es@') {
              if (element.listaAtributos.length > 0) {
                val = this.calcular(nodo, element, index);
                if (val.getValorImplicito(val)) {
                  cons.push(element);
                }
              }
            }
            else if (es === 'esID') {
              //console.log("entró esID");
              if (element.listaObjetos.length > 0) {
                val = this.calcular(nodo, element, index);
                if (val.getValorImplicito(val)) {
                  cons.push(element);
                }
              }
            }
            else if (es === "esPunto") {
              if (this.atributo) {
                if (element.listaAtributos.length > 0) {
                  val = this.calcular(nodo, element, index);
                  if (val.getValorImplicito(val)) {
                    cons.push(element);
                  }
                }
              }
              else {
                if (element) {
                  val = this.calcular(nodo, element, index);
                  if (val.getValorImplicito(val)) {
                    cons.push(element);
                  }
                }
              }
            }
            else if (es === 'esOrden') {
              try {
                if (es === 'esOrden') {
                  val = this.calcular(nodo, element, index);
                  if (this.posicion[1]) {
                    console.log("es posicion ", this.posicion)
                    switch (this.posicion[4]) {
                      case '<':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && this.posicion[3] < this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && this.posicion[3] > this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        break;
                      case '>':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && this.posicion[3] > this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && this.posicion[3] < this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        break;
                      case '<=':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && this.posicion[3] <= this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && this.posicion[3] >= this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        break;
                      case '>=':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && this.posicion[3] >= this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && this.posicion[3] <= this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        break;
                      case '=':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && this.posicion[3] === this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && this.posicion[3] === this.posicion[5]) {
                            cons.push(element)
                          }
                        }
                        break;
                      case '!=':
                        if (this.posicion[2] === 'izq') {
                          if (index === this.posicion[0] && !(this.posicion[3] === this.posicion[5])) {
                            cons.push(element)
                          }
                        }
                        else {
                          if (index === this.posicion[0] && !(this.posicion[3] === this.posicion[5])) {
                            cons.push(element)
                          }
                        }
                        break;
                      default:
                        break;
                    }
                  }
                  this.posicion = [];
                }
              } catch (error) {

              }
            }
          });
        console.log(cons.length, cons)
        if (cons.length > 0) {
          this.consultaXML = cons;
          console.log(this.consultaXML)
        }
        else {
          this.consultaXML = [];
          const er = new Error({ tipo: 'Semántico', linea: '0', descripcion: 'No existe ese atributo.' });
          Errores.getInstance().push(er);
        }
      }

      if (this.identificar('HIJOS', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            //console.log(this.consultaXML);
            this.consultaXML = this.reducir(this.consultaXML, element, 'HIJOS');
          }
        });
      }

      if (this.identificar('ATRIBUTO_NODO', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_NODO');
          }
        });
      }

      if (this.identificar('EJES', nodo)) {
        //Se obtiene el tipo de eje y se activa el bool
        if (nodo.hijos[0] == 'child') {
          this.ej_child = true;
        }
        else if (nodo.hijos[0] == 'attribute') {
          this.ej_attrib = true;
          this.atributo = true;
        }
      }

      if (this.identificar('ATRIBUTO_DESCENDIENTES', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_DESCENDIENTES');
          }
        });
      }

      if (this.identificar('NODO_FUNCION', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            this.consultaXML = this.reducir(this.consultaXML, element, 'NODO_FUNCION');
          }
        });
      }

      if (this.identificar('XQUERY', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {

          }
        });
      }

      if (this.identificar('HTML', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {

          }
        });
      }

      if (this.identificar('FOR', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {

          }
        });
        this.atributoIdentificacion = [];
        this.consultaXML.forEach(element => {
          this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
        });
        //this.atributoIdentificacion = this.atributoIdentificacion.filter(item => this.consultaXML.includes(item.cons))
      }

      if (this.identificar('WHERE', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {

          }
        });
      }

      if (this.identificar('LOGICAS', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {

          }
        });
      }

      if (this.identificar('ORDER BY', nodo)) {
        let regresar: boolean = false;
        let atrib = false;
        let nombre;
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            if (element === '$x') {
              this.consultaXML;
            }
            else if (element === '/') {
              this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
            }
            else if (element === '@') {
              this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
              atrib = true;
            }
            else if (!(element === ',')) {
              if (atrib) {
                this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                this.atributo = false;
                nombre = element;
              }
              else {
                this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                regresar = true;
              }
            }
          }
          if (atrib && nombre) {
            console.log('entra')
            this.consultaXML.sort((n1, n2) => {
              let indice1 = 0, indice2 = 0;
              n1.listaAtributos.forEach((elementLA, indexLA) => {
                //console.log(elementLA.identificador, indice1)
                if (elementLA.identificador === nombre) {
                  indice1 = indexLA;
                }
              });
              n2.listaAtributos.forEach((elementLA, indexLA) => {
                if (elementLA.identificador === nombre) {
                  indice2 = indexLA;
                }
              });
              //console.log(indice1,n1.listaAtributos[indice1].valor,indice2,n2)
              if (n1.listaAtributos[indice1].valor.slice(1, -1) > n2.listaAtributos[indice2].valor.slice(1, -1)) {
                return 1;
              }

              if (n1.listaAtributos[indice1].valor.slice(1, -1) < n2.listaAtributos[indice2].valor.slice(1, -1)) {
                return -1;
              }

              return 0;
            });
            atrib = false;
            console.log('sale', this.consultaXML)
          }
          else {
            this.consultaXML.sort((n1, n2) => {
              if (n1.texto > n2.texto) {
                return 1;
              }

              if (n1.texto < n2.texto) {
                return -1;
              }

              return 0;
            });
          }
          console.log('despues', this.consultaXML)
          if (regresar) {
            console.log('regresar', regresar, this.consultaXML, element)
            this.consultaXML = this.reducir(this.consultaXML, '/..', 'PADRE')
            regresar = false;
          }
        });
      }

      if (this.identificar('RETURN', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            if (element === '$x') {
              this.consultaXML;
            }
            else if (element === '/') {
              this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
            }
            else {
              this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
            }
          }
        });
      }

      if (this.identificar('IF', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            if (element === '$x') {
              this.consultaXML;
            }
            else if (element === '/') {
              this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
            }
            else {
              this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
            }
          }
        });
      }

      if (this.identificar('THEN', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
          else if (typeof element === 'string') {
            if (element === '$x') {
              this.consultaXML;
            }
            else if (element === '/') {
              this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
            }
            else {
              this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
            }
          }
        });
      }
    }
  }

  reducir(consulta: Array<Objeto>, etiqueta: string, nodo: string): Array<Objeto> {
    if (nodo === 'RAIZ') {
      if (etiqueta === '/') {
        this.descendiente = false;
        return consulta;
      }
      else if (etiqueta === '@') {
        this.atributo = true;
        return consulta;
      }
      else if (this.atributo) {
        this.punto = etiqueta;
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          element.listaAtributos.forEach(atributo => {
            if (atributo.identificador === etiqueta) {
              this.atributoTexto = etiqueta;
              cons.push(element);
            }
          });
        });
        return cons;
      }
      else if (etiqueta === 'node()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(element.listaObjetos);
              } else {
                //arreglar cuando solo viene texto 
                this.node_texto = true;
                if (element.texto != null)
                  cons = cons.concat(element);
              }
            }
          });
        });
        return cons;
      }
      else if (etiqueta === 'text()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                //elemento
              } else {
                this.node_texto = true;
                if (element.texto != null)
                  cons = cons.concat(element);
              }
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'DESCENDIENTES_NODO') {
      if (etiqueta === '//') {
        this.descendiente = true;
        this.esRaiz = false;
        return consulta;
      }
      else if (etiqueta === '@') {
        this.atributo = true;
        return consulta;
      }
      else if (this.atributo) {
        this.punto = etiqueta;
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          element.listaAtributos.forEach(atributo => {
            if (atributo.identificador === etiqueta) {
              this.atributoTexto = etiqueta;
              cons.push(element);
            }
          });
          if (element.listaObjetos.length > 0) {
            cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
          }
        });
        return cons;
      }
      else if (etiqueta === '//*') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(element.listaObjetos);
              }
            }
          });
        });
        this.nodo_descendente = true;
        return cons;
      }
      else if (etiqueta === 'node()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(element.listaObjetos);
              } else {
                //arreglar cuando solo viene texto 
                this.node_texto = true;
                if (element.texto != null)
                  cons = cons.concat(element);
              }
            }
          });
        });
        this.node_desc = true;
        return cons;
      }
      else if (etiqueta === 'text()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                if (element.texto != null) {
                  this.node_texto = true;
                  cons = cons.concat(element.listaObjetos);
                }
              } else {
              }
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'INSTRUCCIONES') {
      let cons: Array<Objeto>;
      cons = [];
      if (Number.isInteger(parseInt(etiqueta))) {
        let indice = parseInt(etiqueta);
        //console.log(indice);
        consulta.forEach((element, index) => {
          if (index === indice - 1) {
            cons.push(element);
          }
        });
        return cons;
      }
      //Axes - ::child
      else if (this.ej_child) {
        //Para child::*
        if (etiqueta === '*') {
          /*  Falta arreglar cuando se coloca -> //child::*; */
          if (this.esRaiz) {
            return consulta;
          }
          else {
            consulta.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  if (element.listaObjetos.length > 0) {
                    cons = cons.concat(element.listaObjetos);
                  }
                }
              });
            });
            return cons;
          }
        }
        else {
          //Si viene una ruta tipo -> //nodo::child
          if (this.descendiente) {
            this.punto = etiqueta;
            consulta.forEach(element => {
              if (element.identificador === etiqueta) {
                cons.push(element);
              }
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
              }
            });
            return cons;
          }
          //Si viene una ruta normal -> /nodo::child
          else {
            this.punto = etiqueta;
            // Si child viene en la raiz -> child::raiz
            if (this.esRaiz) {
              consulta.forEach(element => {
                if (element.identificador === etiqueta) {
                  cons.push(element);
                }
              });
              this.esRaiz = false;

              return cons;
            }
            else {
              consulta.forEach(element => {
                if (element.listaObjetos.length > 0) {
                  element.listaObjetos.forEach(elements => {
                    if (elements.identificador === etiqueta) {
                      cons.push(elements);
                    }
                  });
                }
              });

              return cons;
            }
          }
        }
      }
      //Axes - :: attribute
      else if (this.ej_attrib) {
        /*  Falta arreglar cuando se coloca -> //attribute::attrib; y /attribute::attrib; */
        /*  Falta agregar correción también con //attribute::*; y /attribute::*; */
        if (etiqueta === '*') {
          if (this.descendiente) {
            this.atributo = true;
            this.atributo_nodo_descendiente = true;
            consulta.forEach(element => {
              if (element.listaAtributos.length > 0) {
                cons = cons.concat(element);
              }
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
              }
            });
            //this.atributo_nodo = true; 
            return cons;
          }
          else {
            consulta.forEach(element => {
              if (element.listaAtributos.length > 0) {
                cons = cons.concat(element);
              }
            });
            this.atributo = false;
            this.atributo_nodo = true;
            return cons;
          }
        }
        else {
          if (this.descendiente) {
            this.punto = etiqueta;
            consulta.forEach(element => {
              element.listaAtributos.forEach(atributo => {
                if (atributo.identificador === etiqueta) {
                  this.atributoTexto = etiqueta;
                  cons.push(element);
                }
              });
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
              }
            });
            return cons;
          }
          else {
            this.punto = etiqueta;
            consulta.forEach(element => {
              element.listaAtributos.forEach(atributo => {
                if (atributo.identificador === etiqueta) {
                  this.atributoTexto = etiqueta;
                  cons.push(element);
                }
              });
            });
            return cons;
          }
        }
      }
      else if (!this.descendiente) {
        this.punto = etiqueta;
        if (this.esRaiz) {
          consulta.forEach(element => {
            if (element.identificador === etiqueta) {
              cons.push(element);
            }
          });
          this.esRaiz = false;
          return cons;
        }
        else {
          consulta.forEach(element => {
            if (element.listaObjetos.length > 0) {
              element.listaObjetos.forEach(elements => {
                if (elements.identificador === etiqueta) {
                  cons.push(elements);
                }
              });
            }
          });
          return cons;
        }
      }
      else { //descendiente = true;
        this.punto = etiqueta;
        consulta.forEach(element => {
          if (element.identificador === etiqueta) {
            cons.push(element);
          }
          if (element.listaObjetos.length > 0) {
            cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
          }
        });
        return cons;
      }
    }
    else if (nodo === 'PADRE') {
      if (etiqueta === '/..') {
        if (this.atributo) {
          this.descendiente = false;
          this.atributo = false;
          return consulta;
        }
        this.descendiente = false;
        this.atributo = false;
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              let a = padre[6];
              let b = false;
              cons.forEach(element => {
                if (element == a) {
                  b = true;
                }
              });
              if (!b) {
                cons.push(a);
              }
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'ATRIBUTO_PREDICADO') {
      if (etiqueta === '@') {
        this.atributo = true;
        return consulta;
      }
      else if (this.atributo) {
        this.atributo = false;
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          element.listaAtributos.forEach(atributo => {
            if (atributo.identificador === etiqueta) {
              this.atributoTexto = etiqueta;
              cons.push(element);
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'HIJOS') {
      if (etiqueta === '/*') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(element.listaObjetos);
              }
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'ATRIBUTO_NODO') {
      if (etiqueta === '/@*') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          if (element.listaAtributos.length > 0) {
            cons = cons.concat(element);
          }
        });
        this.atributo_nodo = true;
        return cons;
      }
    }
    else if (nodo === 'NODO_FUNCION') {
      //Axes - child::func()
      if (this.ej_child) {
        let cons: Array<Objeto>;
        cons = [];
        if (etiqueta === 'text()') {
          if (!this.esRaiz) {
            //Falta retornar en caso de: //child::text();
            return consulta;
          }
          consulta.forEach(element => {
            this.ts.tabla.forEach(padre => {
              if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                //Si el elemento posee más hijos entonces no puede poseer texto adentro
                if (element.listaObjetos.length > 0) {
                  //No retorna nada
                } else {
                  //Si no tiene hijos entonces se obtiene el texto
                  this.node_texto = true;
                  if (element.texto != null)
                    cons = cons.concat(element);
                }
              }
            });
          });
          return cons;
        }
      }
      if (etiqueta === 'node()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                cons = cons.concat(element.listaObjetos);
              } else {
                //arreglar cuando solo viene texto 
                this.node_texto = true;
                if (element.texto != null)
                  cons = cons.concat(element);
              }
            }
          });
        });
        this.node_desc = true;
        return cons;
      }
      else if (etiqueta === 'text()') {
        let cons: Array<Objeto> = [];
        consulta.forEach(element => {
          this.ts.tabla.forEach(padre => {
            if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
              if (element.listaObjetos.length > 0) {
                //elemento
              } else {
                this.node_texto = true;
                if (element.texto != null)
                  cons = cons.concat(element);
              }
            }
          });
        });
        return cons;
      }
    }
    else if (nodo === 'ATRIBUTO_DESCENDIENTES') {
      if (etiqueta === '//@*') {
        let cons: Array<Objeto> = [];
        this.atributo = true;
        this.atributo_nodo_descendiente = true;
        consulta.forEach(element => {
          if (element.listaAtributos.length > 0) {
            cons = cons.concat(element);
          }
          if (element.listaObjetos.length > 0) {
            cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
          }
        });
        //this.atributo_nodo = true; 
        return cons;
      }
    }
  }

  recDescen(a: Array<Objeto>, etiqueta: string, atributo: boolean): Array<Objeto> {
    let cons: Array<Objeto> = [];
    a.forEach((element) => {
      if (atributo) {
        element.listaAtributos.forEach(atributo => {
          if (atributo.identificador === etiqueta) {
            this.atributoTexto = etiqueta;
            cons.push(element);
          }
        });
        if (element.listaAtributos.length > 0 && this.atributo_nodo_descendiente) {
          cons.push(element);
        }
        if (element.listaObjetos.length > 0) {
          cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
        }
      }
      else {
        if (element.identificador === etiqueta) {
          cons.push(element);
          if (this.descendiente && element.listaObjetos.length > 0) {
            cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
          }
        }
        else if (element.listaObjetos.length > 0) {
          cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
        }
      }
    });
    return cons;
  }

  recuperar(a: Array<Objeto>, b: Array<Objeto>, i: number) {
    let cons: Array<Objeto> = a;
    b.forEach((element) => {
      cons.forEach(y => {
        if (element.identificador === y.identificador && element.linea === y.linea && element.columna === y.columna) {
          this.pathh.push(this.consultaXML[i]);
          if (this.descendiente && element.listaObjetos.length > 0) {
            this.recuperar(a, b, i);
          }
        }
        else if (element.listaObjetos.length > 0) {
          this.recuperar(a, b, i);
        }
        else {
          this.recuperar(this.reducir(cons, '../', 'PADRE'), b, i);
        }
      });
    });
  }

  path(nodo: any): void {
    let cons: Array<Objeto> = this.pathh;
    //console.log('entra');
    if (this.identificar('PATH', nodo)) {
      nodo.hijos.forEach((element: any, index) => {
        if (element instanceof Object) {
          if (element.label === 'PATH') {
            this.path(element);
          }
          else if (element.label === 'ATRIBUTO_PREDICADO') {
            cons = this.reducir(cons, element.hijos[0], 'RAIZ');
            cons = this.reducir(cons, element.hijos[1], 'RAIZ');
            this.pathh = cons;
            this.pathhCount--;
            //console.log('/@identificador ', this.pathh);
          }
          else if (element.label === 'id') {
            cons = this.reducir(cons, '/', 'RAIZ');
            cons = this.reducir(cons, element.hijos[0], 'INSTRUCCIONES');
            this.pathh = cons;
            if (index === 0)
              this.pathhCount++;
            else
              this.pathhCount++;
            //console.log('id ', this.pathh);
          }
          else if (element.label === 'dos_pts') {
            cons = this.reducir(cons, '/..', 'PADRE');
            this.pathh = cons;
            this.pathhCount--;
            //console.log('padre ', this.pathh);
          }
        }
        else if (typeof element === 'string') {
          //console.log(element);
          if (element === '..') {
            cons = this.reducir(cons, '/..', 'PADRE');
            this.pathh = cons;
            //console.log('padre ', this.pathh);
          }
          else if (element === '/') {
            cons = this.pathh;
            cons = this.reducir(cons, element, 'RAIZ');
            this.pathh = cons;
            this.pathhCount++;
            //console.log('raiz ', this.pathh);
          }
          else {
            cons = this.reducir(cons, element, 'INSTRUCCIONES');
            //console.log('instruccion');
            this.pathh = cons;
          }
        }
      });
    }
  }

  calcular(nodo: any, logica: Objeto, position: number): Expresion {
    if (this.identificar('ARITMETICAS', nodo)) {
      let izq: Expresion, der: Expresion = null;
      let op = "";
      nodo.hijos.forEach((element: any) => {
        if (element instanceof Object) {
          if (op === "" && this.identificar('integer', element)) {
            izq = new Primitivo(Number(element.hijos[0]), 1, 1);
          }
          else if (!(op === "") && this.identificar('integer', element)) {
            der = new Primitivo(Number(element.hijos[0]), 1, 1);
          }
          else if (op === "" && this.identificar('double', element)) {
            izq = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
          }
          else if (!(op === "") && this.identificar('double', element)) {
            der = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
          }
          else if (op === "" && this.identificar('ARITMETICAS', element)) {
            izq = this.calcular(element, null, position);
          }
          else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
            der = this.calcular(element, null, position);
          }
          else if (op === "" && this.identificar('ORDEN', element)) {
            izq = new Primitivo(Number(this.consultaXML.length), 1, 1);
          }
          else if (!(op === "") && this.identificar('ORDEN', element)) {
            der = new Primitivo(Number(this.consultaXML.length), 1, 1);
          }
        }
        else if (typeof element === 'string') {
          if (!(element === '(') && !(element === ')')) {
            op = element;
          }
        }
      });
      if (izq && der && !(op === "")) {
        let a: Operacion;
        if (op === '+') {
          a = new Operacion(izq, der, Operador.SUMA, 1, 1);
        }
        else if (op === '-') {
          a = new Operacion(izq, der, Operador.RESTA, 1, 1);
        }
        else if (op === '*') {
          a = new Operacion(izq, der, Operador.MULTIPLICACION, 1, 1);
        }
        else if (op === 'div') {
          a = new Operacion(izq, der, Operador.DIVISION, 1, 1);
        }
        else if (op === 'mod') {
          a = new Operacion(izq, der, Operador.MODULO, 1, 1);
        }
        return a;
      }
    }

    if (this.identificar('RELACIONALES', nodo)) {
      let izq: Expresion, der: Expresion = null;
      let op = "";
      //console.log("entró relacional")
      nodo.hijos.forEach((element: any) => {
        if (element instanceof Object) {
          if (op === "" && this.identificar('integer', element)) {
            izq = new Primitivo(Number(element.hijos[0]), 1, 1);
          }
          else if (!(op === "") && this.identificar('integer', element)) {
            der = new Primitivo(Number(element.hijos[0]), 1, 1);
          }
          else if (op === "" && this.identificar('double', element)) {
            izq = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
          }
          else if (!(op === "") && this.identificar('double', element)) {
            der = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
          }
          else if (op === "" && this.identificar('string', element)) {
            let texto = element.hijos[0].slice(1, -1);
            let t = texto.split(" ");
            texto = '';
            for (var i = 0; i < t.length; i++) {
              texto += t[i];
            }
            izq = new Primitivo(texto, 1, 1);
          }
          else if (!(op === "") && this.identificar('string', element)) {
            //console.log("entró string derecho");
            let texto = element.hijos[0].slice(1, -1);
            let t = texto.split(" ");
            texto = '';
            for (var i = 0; i < t.length; i++) {
              texto += t[i];
            }
            //console.log(texto);
            der = new Primitivo(texto, 1, 1);
          }
          else if (op === "" && this.identificar('ARITMETICAS', element)) {
            izq = this.calcular(element, logica, position);
          }
          else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
            der = this.calcular(element, logica, position);
          }
          else if (op === "" && this.identificar('ORDEN', element)) {
            if (element.hijos[0] === 'position') {
              izq = new Primitivo(Number(position), 1, 1);
              this.posicion.push(Number(position));
              this.posicion.push(true);
              this.posicion.push("izq");
            }
            else
              izq = new Primitivo(Number(this.consultaXML.length), 1, 1);
          }
          else if (!(op === "") && this.identificar('ORDEN', element)) {
            if (element.hijos[0] === 'position') {
              der = new Primitivo(Number(position), 1, 1);
              this.posicion.push(Number(position));
              this.posicion.push(true);
              this.posicion.push("der");
            }
            else
              der = new Primitivo(Number(this.consultaXML.length), 1, 1);
          }
          else if (op === "" && this.identificar('ATRIBUTO_PREDICADO', element)) {
            logica.listaAtributos.forEach(atri => {
              if (atri.identificador === element.hijos[1]) {
                let valor = atri.valor.slice(1, -1);
                if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                  //console.log(parseInt(valor));
                  izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                }
                else {
                  let texto = valor;
                  let t = texto.split(" ");
                  texto = '';
                  for (var i = 0; i < t.length; i++) {
                    texto += t[i];
                  }
                  izq = new Primitivo(texto, 1, 1);
                }
              }
            });
          }
          else if (!(op === "") && this.identificar('ATRIBUTO_PREDICADO', element)) {
            logica.listaAtributos.forEach(atri => {
              if (atri.identificador === element.hijos[1]) {
                let valor = atri.valor.slice(1, -1);
                if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                  der = new Primitivo(Number(parseInt(valor)), 1, 1);
                }
                else {
                  let texto = valor;
                  let t = texto.split(" ");
                  texto = '';
                  for (var i = 0; i < t.length; i++) {
                    texto += t[i];
                  }
                  der = new Primitivo(texto, 1, 1);
                }
              }
            });
          }
          else if (op === "" && this.identificar('id', element)) {
            //console.log("entró id");
            logica.listaObjetos.forEach(ob => {
              if (ob.identificador === element.hijos[0]) {
                let texto = "";
                for (var i = 0; i < ob.texto.length; i++) {
                  texto += ob.texto[i];
                }
                if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                  //console.log(parseInt(texto));
                  izq = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  izq = new Primitivo(texto, 1, 1);
                }
              }
            });
          }
          else if (!(op === "") && this.identificar('id', element)) {
            logica.listaObjetos.forEach(ob => {
              if (ob.identificador === element.hijos[0]) {
                //console.log(ob.texto);
                let texto = "";
                for (var i = 0; i < ob.texto.length; i++) {
                  texto += ob.texto[i];
                }
                if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                  //console.log(parseInt(texto));
                  der = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  der = new Primitivo(texto, 1, 1);
                }
              }
            });
          }
          else if (op === "" && this.identificar('punto', element)) {
            //console.log("at " + this.atributo);
            if (logica.identificador === this.punto && !this.atributo) {
              let texto = "";
              for (var i = 0; i < logica.texto.length; i++) {
                texto += logica.texto[i];
              }
              if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                //console.log(parseInt(texto));
                izq = new Primitivo(Number(parseInt(texto)), 1, 1);
              }
              else {
                //console.log(texto);
                izq = new Primitivo(texto, 1, 1);
              }
            }
            else {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === this.punto) {
                  let valor = atri.valor.slice(1, -1);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    izq = new Primitivo(texto, 1, 1);
                  }
                }
              });
            }
          }
          else if (!(op === "") && this.identificar('punto', element)) {
            if (logica.identificador === this.punto && !this.atributo) {
              //console.log(logica.texto);
              let texto = "";
              for (var i = 0; i < logica.texto.length; i++) {
                texto += logica.texto[i];
              }
              if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                //console.log(parseInt(texto));
                der = new Primitivo(Number(parseInt(texto)), 1, 1);
              }
              else {
                //console.log(texto);
                der = new Primitivo(texto, 1, 1);
              }
            }
            else {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === this.punto) {
                  let valor = atri.valor.slice(1, -1);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    der = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    der = new Primitivo(texto, 1, 1);
                  }
                }
              });
            }
          }
          else if (op === "" && this.identificar('PATH', element)) {
            //console.log("at " + this.atributo);
            if (logica.identificador === this.punto && !this.atributo) {
              let texto = "";
              for (var i = 0; i < logica.texto.length; i++) {
                texto += logica.texto[i];
              }
              if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                //console.log(parseInt(texto));
                izq = new Primitivo(Number(parseInt(texto)), 1, 1);
              }
              else {
                //console.log(texto);
                izq = new Primitivo(texto, 1, 1);
              }
            }
            else {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === this.punto) {
                  let valor = atri.valor.slice(1, -1);
                  //console.log(valor);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    izq = new Primitivo(texto, 1, 1);
                  }
                }
              });
            }
          }
          else if (!(op === "") && this.identificar('PATH', element)) {
            if (logica.identificador === this.punto && !this.atributo) {
              //console.log(logica.texto);
              let texto = "";
              for (var i = 0; i < logica.texto.length; i++) {
                texto += logica.texto[i];
              }
              if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                //console.log(parseInt(texto));
                der = new Primitivo(Number(parseInt(texto)), 1, 1);
              }
              else {
                //console.log(texto);
                der = new Primitivo(texto, 1, 1);
              }
            }
            else {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === this.punto) {
                  let valor = atri.valor.slice(1, -1);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    der = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    der = new Primitivo(texto, 1, 1);
                  }
                }
              });
            }
          }
        }
        else if (typeof element === 'string') {
          if (!(element === '(') && !(element === ')')) {
            op = element;
          }
        }
        if (!izq) {
          izq = new Primitivo(Number(-1), 1, 1);
        }
        if (!der) {
          der = new Primitivo(Number(-1), 1, 1);
        }
      });
      if (izq && der && !(op === "")) {
        console.log(izq.getValorImplicito(izq) + ',' + der.getValorImplicito(der));
        let a: Relacion;
        if (op === '<') {
          a = new Relacion(izq, der, Operador.MENOR_QUE, 1, 1);
        }
        else if (op === '>') {
          a = new Relacion(izq, der, Operador.MAYOR_QUE, 1, 1);
        }
        else if (op === '<=') {
          a = new Relacion(izq, der, Operador.MENOR_IGUA_QUE, 1, 1);
        }
        else if (op === '>=') {
          a = new Relacion(izq, der, Operador.MAYOR_IGUA_QUE, 1, 1);
        }
        else if (op === '=') {
          a = new Relacion(izq, der, Operador.IGUAL_IGUAL, 1, 1);
        }
        else if (op === '!=') {
          a = new Relacion(izq, der, Operador.DIFERENTE_QUE, 1, 1);
        }
        else if (op === '!') {
          a = new Relacion(izq, null, Operador.NOT, 1, 1);
        }
        if (this.posicion) {
          if (this.posicion[1]) {
            this.posicion.push(izq.getValorImplicito(izq) - 1);
            this.posicion.push(op);
            this.posicion.push(der.getValorImplicito(der) - 1);
          }
        }
        console.log(a.getValorImplicito(a))
        return a;
      }
    }
  }

  traducir(): string {
    let cadena: string = '';
    let numero: number = 0;
    this.atributoIdentificacion.forEach(element => {
      numero++;
      if (!element.atributo) {
        let texto = "";
        //console.log("texto: " + element.identificador);
        for (var i = 0; i < element.cons.texto.length; i++) {
          if (Number.isInteger(parseInt(element.cons.texto[i]))) {
            texto += element.cons.texto[i];
          }
          else if (Number.isInteger(parseInt(element.cons.texto[i - 1]))) {
            texto += element.cons.texto[i];
          }
          else if (element.cons.texto[i] === '.' || element.cons.texto[i] === '!' || element.cons.texto[i] === '?' || element.cons.texto[i] === ',' || element.cons.texto[i] === "'") {
            texto += element.cons.texto[i];
          }
          else if (element.cons.texto[i - 1] === "'") {
            texto += element.cons.texto[i];
          }
          else {
            texto += " " + element.cons.texto[i];
          }
        }
        cadena += '--------------------------------------(' + numero + ')---------------------------------\n';
        if (this.nodo_descendente) {
          cadena += '<' + element.cons.identificador;
          if (element.cons.listaAtributos.length > 0) {
            element.cons.listaAtributos.forEach(atributos => {
              cadena += ' ' + atributos.identificador + '=' + atributos.valor;
            });
          }
          if (element.cons.doble) {
            cadena += '>\n';
          }
          else {
            cadena += '/>\n';
          }
          if (texto != '') {
            cadena += this.encode(texto) + '\n';
          }
          if (element.cons.listaObjetos.length > 0) {
            cadena += this.traducirRecursiva(element.cons.listaObjetos);
          }
          if (element.cons.doble) {
            cadena += '</' + element.cons.identificador + '>\n';
          }
          if (element.cons.listaObjetos.length > 0) {
            cadena += this.traducirRecursiva(element.cons.listaObjetos);
          }
        }
        else if (this.atributo_nodo) {
          if (element.cons.listaAtributos.length > 0) {
            element.cons.listaAtributos.forEach(atributos => {
              cadena += ' ' + atributos.identificador + '=' + atributos.valor + '\n';
            });
          }
        }
        else if (this.node_desc) {
          cadena += '<' + element.cons.identificador;
          if (element.cons.listaAtributos.length > 0) {
            element.cons.listaAtributos.forEach(atributos => {
              cadena += ' ' + atributos.identificador + '=' + atributos.valor;
            });
          }
          if (element.cons.doble) {
            cadena += '>\n';
          }
          else {
            cadena += '/>\n';
          }
          if (texto != '') {
            cadena += this.encode(texto) + '\n';
          }
          if (element.cons.listaObjetos.length > 0) {
            cadena += this.traducirRecursiva(element.cons.listaObjetos);
          }
          if (element.cons.doble) {
            cadena += '</' + element.cons.identificador + '>\n';
          }
          if (texto != '') {
            cadena += this.encode(texto) + '\n';
          }
        }
        else if (this.node_texto) {
          if (element.texto != null) {
            cadena += this.encode(texto) + '\n';
          }
        }
        else {
          cadena += '<' + element.cons.identificador;
          if (element.cons.listaAtributos.length > 0) {
            element.cons.listaAtributos.forEach(atributos => {
              cadena += ' ' + atributos.identificador + '=' + atributos.valor;
            });
          }
          if (element.cons.doble) {
            cadena += '>\n';
          }
          else {
            cadena += '/>\n';
          }
          if (texto != '') {
            cadena += this.encode(texto) + '\n';
          }
          if (element.cons.listaObjetos.length > 0) {
            cadena += this.traducirRecursiva(element.cons.listaObjetos);
          }
          if (element.cons.doble) {
            cadena += '</' + element.cons.identificador + '>\n';
          }
        }
      }
      else {
        cadena += '--------------------------------------(' + numero + ')---------------------------------\n';
        element.cons.listaAtributos.forEach(atributo => {
          if (element.texto === atributo.identificador) {
            cadena += atributo.identificador + '=' + atributo.valor + '\n';
          }
          else if (this.atributo_nodo_descendiente) {
            cadena += atributo.identificador + '=' + atributo.valor + '\n';
          }
        });
      }
    });
    return cadena;
  }

  traducirRecursiva(elemento: Array<Objeto>): string {
    let cadena: string = '';

    elemento.forEach(element => {
      let texto = "";
      for (var i = 0; i < element.texto.length; i++) {
        if (Number.isInteger(parseInt(element.texto[i]))) {
          texto += element.texto[i];
        }
        else if (Number.isInteger(parseInt(element.texto[i - 1]))) {
          texto += element.texto[i];
        }
        else if (element.texto[i] === '.' || element.texto[i] === '!' || element.texto[i] === '?' || element.texto[i] === ',' || element.texto[i] === "'") {
          texto += element.texto[i];
        }
        else if (element.texto[i - 1] === "'") {
          texto += element.texto[i];
        }
        else {
          texto += " " + element.texto[i];
        }
      }
      cadena += '<' + element.identificador;
      if (element.listaAtributos.length > 0) {
        element.listaAtributos.forEach(atributos => {
          cadena += ' ' + atributos.identificador + '=' + atributos.valor;
        });
      }
      if (element.doble) {
        cadena += '>\n';
      }
      else {
        cadena += '/>\n';
      }
      if (texto != '') {
        cadena += this.encode(texto) + '\n';
      }
      if (element.listaObjetos.length > 0) {
        cadena += this.traducirRecursiva(element.listaObjetos);
      }
      if (element.doble) {
        cadena += '</' + element.identificador + '>\n';
      }
    });
    return cadena;
  }

  enISO: string;
  encode(texto: string): string {
    var buf = new Buffer(texto)
    var buf2 = 'ay :(';
    //console.log(JSON.stringify(this.prologoXml))
    if (JSON.stringify(this.prologoXml).includes("UTF-8")) {
      //console.log(buf.toString("utf8"))
      buf2 = (buf.toString("utf8"))
    }
    else if (JSON.stringify(this.prologoXml).includes("ISO-8859-1")) {
      try {
        buf2 = unescape(encodeURIComponent(texto));

      } catch (error) {
        buf2 = '(ISO falló) ' + texto;
      }
    }
    else if (JSON.stringify(this.prologoXml).includes("ASCII")) {
      //console.log(buf.toString("ascii"))
      buf2 = (buf.toString("ascii"))
    }
    return buf2;
  }

  stringToBytes(text) {
    const length = text.length;
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      const code = text.charCodeAt(i);
      const byte = code > 255 ? 32 : code;
      result[i] = byte;
    }
    return result;
  }
  validarError(error) {
    const json = JSON.stringify(error);
    const objeto = JSON.parse(json);
    console.log(objeto);
  }

  xqueryEjec(): void {
    ListaEntornos.getInstance().clear();
    const instrucciones = this.xqueryRec(this.raiz);
    if (instrucciones instanceof Array) {
      const entorno = new Entorno();
      instrucciones.forEach(element => {
        if (element instanceof Instruccion) {
          try {
            //console.log(element, entorno)
            if (element instanceof Mostrar) {
              let a = element.ejecutar(entorno);
              if (typeof a == 'object') {
                this.atributoIdentificacion.pop()
                if (!(a[0] instanceof Objeto)) {
                  this.atributoIdentificacion.push({ cons: a, atributo: this.atributo, texto: this.atributoTexto })
                }
                else {
                  a.forEach(element => {
                    this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
                  });
                }
              }
              else
                this.ejecXQuery = a.toString();
            }
            else {
              element.ejecutar(entorno);
            }
          } catch (error) {
            //console.log(error);
            Errores.getInstance().push(new Error({ tipo: 'Fatal', linea: '0', descripcion: error }))
          }
        }
      });
      ListaEntornos.getInstance().push(entorno);
      let lista = ListaEntornos.getInstance().lista;
      let tsAux = new XmlTS();

      lista.forEach((elementE, indexE) => {
        elementE['funciones'].forEach(elementF => {
          if (elementF instanceof Funcion) {
            let a = elementF.toString(indexE).tabla;
            a.forEach(elementTS => {
              let entorno = elementTS[2];
              if (entorno == '0') {
                entorno = 'GLOBAL';
              }
              let tipo = '';
              switch (elementTS[3]) {
                case '0':
                  tipo = 'STRING';
                  break;
                case '1':
                  tipo = 'INTEGER';
                  break;
                case '2':
                  tipo = 'DECIMAL'
                  break;
                case '3':
                  tipo = 'BOOLEAN'
                  break;
                case '4':
                  tipo = 'VOID'
                  break;
                case '5':
                  tipo = 'NULL'
                  break;
                case '6':
                  tipo = 'ARRAY'
                  break;
              }
              tsAux.agregar(elementTS[0], elementTS[1], entorno, 'Función - ' + tipo, elementTS[4], elementTS[5], elementTS[6], elementTS[7]);
            })
          }
        });
        elementE['variables'].forEach(elementV => {
          if (elementV instanceof Variable) {
            let a = elementV.toString(indexE).tabla;
            a.forEach(elementTS => {
              let entorno = elementTS[2];
              if (entorno == '0') {
                entorno = 'GLOBAL';
              }
              let tipo = '';
              switch (elementTS[3]) {
                case '0':
                  tipo = 'STRING';
                  break;
                case '1':
                  tipo = 'INTEGER';
                  break;
                case '2':
                  tipo = 'DECIMAL'
                  break;
                case '3':
                  tipo = 'BOOLEAN'
                  break;
                case '4':
                  tipo = 'VOID'
                  break;
                case '5':
                  tipo = 'NULL'
                  break;
                case '6':
                  tipo = 'ARRAY'
                  break;
              }
              tsAux.agregar(elementTS[0], elementTS[1], entorno, 'Variable - ' + tipo, elementTS[4], elementTS[5], elementTS[6], elementTS[7]);
            });
          }
        });
      });
      this.ts.concatenar(tsAux.tabla);
    }
  }

  estaEnFuncion: Boolean = false;
  consParam: any;

  xqueryRec(nodo: any): any {
    if (nodo instanceof Object) {
      if (this.identificar('XQUERY', nodo)) {
        let instrucciones = [];
        nodo.hijos.forEach(element => {
          const inst = this.xqueryRec(element);
          if (inst instanceof Array) {
            instrucciones = instrucciones.concat(inst);
          }
          else {
            if (this.identificar('F_LLAMADA', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('LLAMADA_FUNCION', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            }
            else if (this.identificar('F_UPPERCASE', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('F_NUMBER', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('F_STRING', element)) { //nativa string
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('F_LOWERCASE', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('F_SUBSTRING', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            } else if (this.identificar('F_SUBSTRING1', element)) {
              instrucciones.push(new Mostrar(element.linea, inst))
            }
            else
              instrucciones.push(inst);
          }
        });
        return instrucciones;
      }

      if (this.identificar('LET', nodo)) {
        let instrucciones = [];
        if (this.identificar('LET', nodo.hijos[0])) {
          nodo.hijos.forEach(element => {
            const inst = this.xqueryRec(element);
            if (inst instanceof Array) {
              instrucciones = instrucciones.concat(inst);
            }
            else {
              instrucciones.push(inst);
            }
          });
        }
        else {
          if (this.identificar('EXPR', nodo.hijos[2])) {
            if (this.identificar('PATH', nodo.hijos[2].hijos[0])) {
              let val = this.xqueryRec(nodo.hijos[2].hijos[0]);
              instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
            }
            else {
              let val = this.xqueryRec(nodo.hijos[2]);
              instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
            }
          }
          if (nodo.hijos.length === 4) {
            if (this.identificar('RETURN', nodo.hijos[3])) {
              let inst;
              if (this.identificar('EXPR', nodo.hijos[3].hijos[0])) {
                inst = this.xqueryRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
              }
              else if (typeof nodo.hijos[3].hijos[0] == 'string') {
                inst = new identificador(nodo.linea, nodo.hijos[3].hijos[0]);
                if (nodo.hijos[3].hijos[1] === '/') {
                  let retorno = this.pathh;
                  retorno = this.reducir(retorno, '/', 'RAIZ');
                  retorno = this.reducir(retorno, nodo.hijos[3].hijos[2], 'INSTRUCCIONES');
                  console.log(retorno)
                  inst = new Primitivo(retorno, nodo.linea, 1)
                }
              }
              else {
                inst = this.xqueryRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
              }
              if (this.estaEnFuncion) {
                instrucciones.push(new Retorno(nodo.linea, true, inst));
              }
              else {
                instrucciones.push(new Mostrar(nodo.linea, inst));
              }
            }
          }
        }
        //console.log(instrucciones);
        return instrucciones;
      }

      if (this.identificar('FUNCION', nodo)) {
        this.estaEnFuncion = true;
        let instrucciones = [];
        if (this.identificar('FUNCION', nodo.hijos[0])) {
          nodo.hijos.forEach(element => {
            const inst = this.xqueryRec(element);
            if (inst instanceof Array) {
              instrucciones = instrucciones.concat(inst);
            }
            else {
              instrucciones.push(inst);
            }
          });
        }
        else {
          if (nodo.hijos.length === 5) {
            const variables = [];
            if (this.identificar('PARAMETROS', nodo.hijos[2])) {
              for (let index = 0; index < nodo.hijos[2].hijos.length / 3; index++) {
                const id = nodo.hijos[2].hijos[index * 3 + 0]
                let tipo = nodo.hijos[2].hijos[index * 3 + 2]
                if (tipo === 'integer') {
                  tipo = Tipo.INT;
                }
                else if (tipo === 'decimal') {
                  tipo = Tipo.DOUBLE;
                }
                else if (tipo === 'string') {
                  tipo = Tipo.STRING;
                }
                else if (tipo === 'boolean') {
                  tipo = Tipo.BOOL;
                }
                variables.push(new Variable({ id, tipo: tipo }));
              }
              const id_funcion = nodo.hijos[1];
              let tipo_funcion = nodo.hijos[3].hijos[0];
              if (tipo_funcion === 'integer') {
                tipo_funcion = Tipo.INT;
              }
              else if (tipo_funcion === 'decimal') {
                tipo_funcion = Tipo.DOUBLE;
              }
              else if (tipo_funcion === 'string') {
                tipo_funcion = Tipo.STRING;
              }
              else if (tipo_funcion === 'boolean') {
                tipo_funcion = Tipo.BOOL;
              }
              const flwor = this.xqueryRec(nodo.hijos[4]);
              instrucciones.push(new nuevaFuncion(nodo.linea, id_funcion, flwor, tipo_funcion, variables));
            }
          }
        }
        this.estaEnFuncion = false;
        return instrucciones;
      }
    }

    if (this.identificar('F_LLAMADA', nodo)) {
      let parametros = this.xqueryRec(nodo.hijos[2]);
      let llamada = new llamfuc(nodo.linea, nodo.hijos[1], parametros);
      //return new Mostrar(nodo.linea,llamada);
      return llamada
    }

    if (this.identificar('PARAMETROS', nodo)) {
      let parametros = [];
      nodo.hijos.forEach((element: any) => {
        if (element instanceof Object) {
          const exp = this.xqueryRec(element);
          parametros.push(exp);
        }
      });
      return parametros;
    }

    if (this.identificar('FLWOR', nodo)) {
      let instrucciones = [];
      nodo.hijos.forEach(element => {
        const inst = this.xqueryRec(element);
        if (inst instanceof Array) {
          instrucciones = instrucciones.concat(inst);
        }
        else {
          instrucciones.push(inst);
        }
      });
      return instrucciones;
    }

    if (this.identificar('IF', nodo)) {
      let instrucciones = [];
      let condicionIF = this.xqueryRec(nodo.hijos[0]);
      let instruccionIF = this.xqueryRec(nodo.hijos[1].hijos[0]);
      let condicionELSEIF;
      let instruccionELSEIF;
      let instruccionELSE;
      if (nodo.hijos.length == 4) {
        condicionELSEIF = this.xqueryRec(nodo.hijos[2].hijos[0]);
        instruccionELSEIF = this.xqueryRec(nodo.hijos[2].hijos[1].hijos[0]);
        instruccionELSEIF = new Retorno(nodo.linea, true, instruccionELSEIF);
        instruccionELSE = this.xqueryRec(nodo.hijos[3].hijos[0]);
        instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
      }
      else {
        instruccionELSE = this.xqueryRec(nodo.hijos[2].hijos[0]);
        instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
      }
      instruccionIF = new Retorno(nodo.linea, true, instruccionIF);
      const ifins = new If_Else(nodo.linea, condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF);
      instrucciones.push(ifins);
      return instrucciones;
    }

    if (this.identificar('EXPR', nodo)) {
      const expresion = this.xqueryRec(nodo.hijos[0]);
      if (this.identificar('xquery', nodo.hijos[0])) {
        return new identificador(nodo.linea, expresion);
      }
      else if (this.identificar('to', nodo.hijos[0])) {
        let inicio = this.xqueryRec(nodo.hijos[0].hijos[0]);
        let final = this.xqueryRec(nodo.hijos[0].hijos[1]);
        return new Arreglo(nodo.linea, [inicio, final]);
      }
      else {
        return expresion;
      }

    }

    if (this.identificar('ARITMETICAS', nodo)) {
      if (nodo.hijos.length === 3) {
        let aritIzq = this.xqueryRec(nodo.hijos[0]);
        let aritDer = this.xqueryRec(nodo.hijos[2]);

        if (typeof aritIzq == 'string') {
          aritIzq = new identificador(nodo.linea, aritIzq);
        }
        if (typeof aritDer == 'string') {
          aritDer = new identificador(nodo.linea, aritDer);
        }
        const operando = nodo.hijos[1];
        switch (operando) {
          case '+':
            return new Aritmeticas(aritIzq, aritDer, Operador.SUMA, nodo.linea);
          case '-':
            return new Aritmeticas(aritIzq, aritDer, Operador.RESTA, nodo.linea);
          case '*':
            return new Aritmeticas(aritIzq, aritDer, Operador.MULTIPLICACION, nodo.linea);
          case 'div':
            return new Aritmeticas(aritIzq, aritDer, Operador.DIVISION, nodo.linea);
        }
      }
    }

    if (this.identificar('RELACIONALES', nodo)) {
      if (nodo.hijos.length === 3) {
        let aritIzq = this.xqueryRec(nodo.hijos[0]);
        let aritDer = this.xqueryRec(nodo.hijos[2]);

        if (typeof aritIzq == 'string') {
          aritIzq = new identificador(nodo.linea, aritIzq);
        }
        if (typeof aritDer == 'string') {
          aritDer = new identificador(nodo.linea, aritDer);
        }
        const operando = nodo.hijos[1];
        switch (operando) {
          case '=':
            return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
          case 'eq':
            return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
          case '!=':
            return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
          case 'ne':
            return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
          case '<':
            return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
          case 'lt':
            return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
          case '<=':
            return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
          case 'le':
            return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
          case '>':
            return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
          case 'gt':
            return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
          case '>=':
            return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);
          case 'ge':
            return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);

        }
      }
    }

    if (this.identificar('LOGICAS', nodo)) {
      if (nodo.hijos.length === 3) {
        let aritIzq = this.xqueryRec(nodo.hijos[0]);
        let aritDer = this.xqueryRec(nodo.hijos[2]);

        if (typeof aritIzq == 'string') {
          aritIzq = new identificador(nodo.linea, aritIzq);
        }
        if (typeof aritDer == 'string') {
          aritDer = new identificador(nodo.linea, aritDer);
        }
        const operando = nodo.hijos[1];
        switch (operando) {
          case 'and':
            return new Aritmeticas(aritIzq, aritDer, Operador.AND, nodo.linea);
          case 'or':
            return new Aritmeticas(aritIzq, aritDer, Operador.OR, nodo.linea);
        }
      }
    }

    if (this.identificar('integer', nodo)) {
      return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
    }

    if (this.identificar('double', nodo)) {
      return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
    }

    if (this.identificar('boolean', nodo)) {
      return new Primitivo((nodo.hijos[0] == "true"), nodo.linea, 0);
    }

    if (this.identificar('string', nodo)) {
      return new Primitivo(nodo.hijos[0], nodo.linea, 0);
    }

    if (this.identificar('xquery', nodo)) {
      return new identificador(nodo.linea, nodo.hijos[0] + nodo.hijos[1]);
    }

    if (this.identificar('PATH', nodo)) {
      this.esRaiz = true;
      this.descendiente = false;
      this.atributo = false;
      this.atributoTexto = '';
      this.atributoIdentificacion = [];
      this.ejecXQuery = '';
      this.indiceValor = null;
      this.punto = '';
      this.consultaXML = this.cuerpoXml;
      this.pathh = this.consultaXML;
      this.pathhCount = 0;
      this.path(nodo);
      let texto = "";
      let param;
      if (!(this.pathh[1]) && this.pathh[0].texto.length > 0) {
        for (var i = 0; i < this.pathh[0].texto.length; i++) {
          texto += this.pathh[0].texto[i];
        }
        if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
          param = new Primitivo(Number(texto), nodo.linea, 1);
          return param;
        } else {
          param = new Primitivo(texto, nodo.linea, 1);
          return param;
        }
      }
      else {
        param = new Primitivo(this.pathh, nodo.linea, 1);
        return param;
      }
    }

    if (this.identificar('RAIZ', nodo)) {
      nodo.hijos.forEach((element: any) => {
        if (typeof element === 'string') {
          this.consParam = this.reducir(this.consultaXML, element, 'RAIZ');
        }
      });
      //return this.consParam;
    }

    if (this.identificar('INSTRUCCIONES', nodo)) {
      this.consParam = this.cuerpoXml;
      nodo.hijos.forEach((element: any) => {
        if (element instanceof Object) {
          this.xqueryRec(element);
        }
        else if (typeof element === 'string') {
          if (!(element === '[') && !(element === ']') && !(element === '(') && !(element === ')')) {
            this.consParam = this.reducir(this.consParam, element, 'INSTRUCCIONES');
          }
        }
      });
      let texto = '';
      let param;
      if (this.consParam[0].texto.length > 0) {
        for (var i = 0; i < this.consParam[0].texto.length; i++) {
          texto += this.consParam[0].texto[i];
        }
          console.log(texto)
        if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
          param = new Primitivo(Number(texto), nodo.linea, 1);
          return param;
        } 
        else {
          param = new Primitivo(texto, nodo.linea, 1);
          return param;
        }
      }
    }

    if (this.identificar('LLAMADA_FUNCION', nodo)) {
      let parametros = this.xqueryRec(nodo.hijos[1]);
      let llamada = new llamfuc(nodo.linea, nodo.hijos[0], parametros);
      //return new Mostrar(nodo.linea,llamada);
      return llamada
    }

    if (this.identificar('F_UPPERCASE', nodo)) {
      if (typeof nodo.hijos[0].hijos[0] == 'string') {
        let valor;
        if (nodo.hijos[0].hijos[0].startsWith('$')) {
          valor = new identificador(nodo.linea, nodo.hijos[0].hijos[0])
        }
        else {
          valor = nodo.hijos[0].hijos[0];
        }
        let nativa = new funcion_nativa(nodo.linea, 'F_UPPERCASE', valor);
        return nativa
      } else {
        let valor = this.xqueryRec(nodo.hijos[0].hijos[0]);
        let nativa = new funcion_nativa(nodo.linea, 'F_UPPERCASE', valor);
        return nativa
      }
    }

    if (this.identificar('F_LOWERCASE', nodo)) {
      if (typeof nodo.hijos[0].hijos[0] == 'string') {
        let valor;
        if (nodo.hijos[0].hijos[0].startsWith('$')) {
          valor = new identificador(nodo.linea, nodo.hijos[0].hijos[0])
        }
        else {
          valor = nodo.hijos[0].hijos[0];
        }
        let nativa = new funcion_nativa(nodo.linea, 'F_LOWERCASE', valor);
        return nativa
      } else {
        let valor = this.xqueryRec(nodo.hijos[0].hijos[0]);
        let nativa = new funcion_nativa(nodo.linea, 'F_LOWERCASE', valor);
        return nativa
      }
    }

    if (this.identificar('F_STRING', nodo)) {
      if (typeof nodo.hijos[0].hijos[0] == 'string') {
        let valor;
        if (nodo.hijos[0].hijos[0].startsWith('$')) {
          valor = new identificador(nodo.linea, nodo.hijos[0].hijos[0])
        }
        else {
          valor = nodo.hijos[0].hijos[0];
        }
        let nativa = new funcion_nativa(nodo.linea, 'F_STRING', valor);
        return nativa
      } else {
        let valor = this.xqueryRec(nodo.hijos[0]);
        let nativa = new funcion_nativa(nodo.linea, 'F_STRING', valor);
        return nativa
      }
    }

    if (this.identificar('F_NUMBER', nodo)) {
      let valoresAceptados = /^[0-9]+$/;
      if (typeof nodo.hijos[0] == 'string'){
        if (nodo.hijos[0] == 'true'){
          let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',true);
          return nativa
        } 
        else if (nodo.hijos[0] == 'false') {
          let nativa = new funcion_nativa(nodo.linea, 'F_NUMBER', false);
          return nativa
        } 
        else if (nodo.hijos[0].match(valoresAceptados)) {
          let valor = nodo.hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',parseInt(valor));
          return nativa
        } 
        else {
          let valor;
          if (nodo.hijos[0].startsWith('$')) {
            valor = new identificador(nodo.linea, nodo.hijos[0])
            console.log(valor)
          }
          else if(nodo.hijos[0].includes('\'')){
            valor = nodo.hijos[0].slice(1,-1);
          }
          else {
            valor = nodo.hijos[0];
          }
          let nativa = new funcion_nativa(nodo.linea, 'F_NUMBER', valor);
          return nativa
        }
      } else {
        let valor = this.xqueryRec(nodo.hijos[0]);
        let nativa = new funcion_nativa(nodo.linea, 'F_NUMBER', valor);
        return nativa
      }
    }

    if (this.identificar('F_SUBSTRING', nodo)) {
      if (typeof nodo.hijos[0].hijos[0] == 'string') {
        let valor;
        if (nodo.hijos[0].hijos[0].startsWith('$')) {
          valor = new identificador(nodo.linea, nodo.hijos[0].hijos[0])
        }
        else {
          valor = nodo.hijos[0].hijos[0];
        }
        let inicio = parseInt(nodo.hijos[1]);
        let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING',valor,inicio);
        return nativa
      } else {
        let valor = this.xqueryRec(nodo.hijos[0].hijos[0]);
        let inicio = parseInt(nodo.hijos[1]);
        let nativa = new funcion_nativa(nodo.linea, 'F_SUBSTRING', valor, inicio);
        return nativa
      }
    }

    if (this.identificar('F_SUBSTRING1', nodo)) {
      if (typeof nodo.hijos[0].hijos[0] == 'string') {
        let valor;
        if (nodo.hijos[0].hijos[0].startsWith('$')) {
          valor = new identificador(nodo.linea, nodo.hijos[0].hijos[0])
        }
        else {
          valor = nodo.hijos[0].hijos[0];
        }
        let inicio = parseInt(nodo.hijos[1]);
        let fin = parseInt(nodo.hijos[2]); 
        let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING1',valor,inicio,fin);
        return nativa
      } else {
        let valor = this.xqueryRec(nodo.hijos[0].hijos[0]);
        let inicio = parseInt(nodo.hijos[1]);
        let fin = parseInt(nodo.hijos[2]);
        let nativa = new funcion_nativa(nodo.linea, 'F_SUBSTRING1', valor, inicio, fin);
        return nativa
      }
    }
   

    
  }
}