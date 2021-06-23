import { NodoXML } from '../parser/Nodes/NodoXml';
import { EnvironmentXPath } from '../parser/Symbol/EnviromentXPath';
import { EnvironmentXML } from '../parser/Symbol/EnviromentXML';
import { Error_ } from '../parser/Error';
import { errores } from '../parser/Errores';
import { _Console } from '../parser/Util/Salida';
import { Return } from '../parser/Instruction/Return';

export class EjecutorXPath {
  entorno: EnvironmentXPath;
  environmentXML: EnvironmentXML;
  nivel: number;
  indexCount: number;
  constructor(xmlEnvironment: EnvironmentXML) {
    this.entorno = new EnvironmentXPath('global', null);
    this.nivel = 0;
    this.indexCount = 1;
    this.environmentXML = xmlEnvironment; // El entorno de xml donde busca la consulta
  }

  ejecutar(ast: NodoXML) {
    // console.log("nodo pricipal xpath",ast);
    let response = null;
    if (ast != null) {
      let tipo = ast.getTipo();
      // console.log("tipo",tipo);
      switch (tipo) {
        case 'Fin':
          let find = this.ejecutarFin(ast);
          if (find) {
            // console.log("entorno",this.environmentXML);
            let valor = this.environmentXML.getValor(this.environmentXML.nombre);
            _Console.salida = valor;
          }
          break;
        case 'Syntfin':
          _Console.salida = this.ejecutarSyntfin(ast);
          break;
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
    let ruta = hijos[0].name;
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
