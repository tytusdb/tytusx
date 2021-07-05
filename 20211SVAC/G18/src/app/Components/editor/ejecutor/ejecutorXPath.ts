import { NodoXML } from '../parser/Nodes/NodoXml';
import { EnvironmentXML } from '../parser/Symbol/EnviromentXML';
import { Error_ } from '../parser/Error';
import { errores } from '../parser/Errores';
import { _Console } from '../parser/Util/Salida';
import { Environment } from '../parser/Symbol/Environment';
import { Symbol } from '../parser/Symbol/Symbol';
declare var require: any
const xPathASC = require('../parser/Grammar/xPathAsc.js');

export class EjecutorXPath {
  entorno: Environment;
  environmentXML: EnvironmentXML;
  nivel: number;
  indexCount: number;

  constructor(entorno: Environment) {
    this.entorno = entorno;
    this.environmentXML = entorno.xmlEnvironment;
    this.nivel = 0;
    this.indexCount = 1;
  }

  ejecutar(ast: NodoXML) {
    // console.log("nodo pricipal xpath",ast);
    let response = null;
    if (ast != null) {
      let tipo = ast.getTipo();
      // console.log("tipo",tipo);
      switch (tipo) {
        case 'Fin':
          return this.ejecutarFin(ast);
        case 'Syntfin':
          _Console.salida += this.ejecutarSyntfin(ast);
          break;
        case 'Return':
          return this.ejecutarReturn(ast);
        case 'LPredicado':
          let index = this.ejecutarPredicado(ast);
          return index;
        default:
          let nodos = ast.getHijos();
          nodos.forEach(element => {
            response = this.ejecutar(element);
          });
          break;
      }
    }
    return response;
  }

  ejecutarReturn(ast: NodoXML){
    console.log("return", ast);
    // obtener el primer hijo
    let first = this.ejecutar(ast.listaNodos[0]);
    if(first != null && first instanceof Symbol) {
      const envXmlTemp = this.environmentXML;
      // buscar la ruta
      let queryTree = xPathASC.parse(first.valor);
      let newEnv = new Environment(this.entorno,this.environmentXML);
      // se pasa el env xml
      let ejecutor = new EjecutorXPath(newEnv);
      ejecutor.ejecutar(queryTree);
      
    }
  }

  ejecutarSyntfin(ast: NodoXML) {
    let hijos = ast.getHijos();
    if (hijos.length == 3) {
      // se busca un atributo
      let ruta = hijos[1].name;
      return this.environmentXML.getAttribute(ruta);
    }
    else if (hijos.length == 1) return this.ejecutarFin(hijos[0]);
    return true;
  }

  ejecutarPredicado(ast: NodoXML) {
    let result = null;
    if (ast != null) {
      let tipo = ast.getTipo();
      // console.log("tipo",tipo);
      switch (tipo) {
        case 'Fin':
          let hijos = ast.getHijos();
          let index = hijos[0].name;
          return index;
        case 'ExprLogica':
          let hijos1 = ast.getHijos();
          let att = this.ejecutarPredicado(hijos1[0]);
          let search = this.ejecutarPredicado(hijos1[2]);
          return { "att": att, "search": search }
        default:
          let nodos = ast.getHijos();
          nodos.forEach(element => {
            let retorno = this.ejecutarPredicado(element);
            result = (retorno == null) ? result : retorno;
            if (result != null) return;
          });
          break;
      }
    }
    return result;
  }

  ejecutarFin(ast: NodoXML) {
    let hijos = ast.getHijos();
    if (hijos.length == 0) return this.environmentXML.getValor(this.environmentXML.nombre);
    let ruta = "";
    if(hijos[0].type == "Access") {
      return this.entorno.getVar(hijos[0].name);
    }
    else {
      ruta = hijos[0].name;
    }
    // console.log("validando",this.environmentXML,hijos[0]);
    let nodes = this.environmentXML.hijos;
    let find = false;
    nodes.forEach(element => {
      if (find) return; // si ya lo encuentra no valida a los demas elementos
      // console.log("validando",element.nombre,ruta);
      if (element.nombre == ruta) {
        // valida si tiene index
        if (hijos[1].listaNodos.length != 0) {

          let index = this.ejecutar(hijos[1]);
          if (index.search != undefined) {
            // busca por atributo
            let nodeSearch = element.getByAttribute(index.att, index.search.replaceAll('"', ''));
            if (nodeSearch != null) {
              this.environmentXML = nodeSearch;
              find = true;
              this.indexCount = 0;
            }
          }
          else if (index.att == this.indexCount) {
            // avanza un nivel
            this.environmentXML = element;
            find = true;
            this.indexCount = 0;
          }
          else this.indexCount++;
        }
        else {
          // avanza un nivel
          this.environmentXML = element;
          find = true;
        }
      }
    });
    if (!find) {
      errores.push(
        new Error_(
          hijos[0].getLine(),
          hijos[0].getColumn(),
          'Semantico',
          `No se encuentra $ruta`
        )
      );
      return false;
    }
    find = false;
    this.nivel++;
    return this.ejecutarFin(hijos[0]);
  }

  public getEntorno() {
    return this.entorno;
  }
}
