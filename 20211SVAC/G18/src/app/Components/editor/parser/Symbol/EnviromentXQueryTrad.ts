import { errores } from '../Errores';
import { Error_ } from '../Error';
import { XQuerySymbol } from './xquerySymbol';

export class EnvironmentXQuery {
  public nombre: string;
  public anterior: EnvironmentXQuery;
  public hijos: Array<EnvironmentXQuery>;
  public tablaSimbolos: Array<XQuerySymbol>;

  constructor(nombre, anterior) {
    this.nombre = nombre;
    this.anterior = anterior;
    this.hijos = new Array<EnvironmentXQuery>();
    this.tablaSimbolos = new Array<XQuerySymbol>();
  }

  addSimbolo(simbolo: XQuerySymbol) {
    //check only if is attr
    let tmp = this.tablaSimbolos;
    for (let index = 0; index < tmp.length; index++) {
      if (tmp[index].getNombre() === simbolo.getNombre()) {
        //error semantico se declaro dos veces el atributo
        console.error('la variable -> ' + simbolo.getNombre() + ' ya existe;');
        errores.push(
          new Error_(
            simbolo.getFila(),
            simbolo.getColumna(),
            'Semantico',
            'la variable -> ' + simbolo.getNombre() + ' ya existe;'
          )
        );
        return;
      }
    }
    this.tablaSimbolos.push(simbolo);
    return;
  }

  addHijo(ent: EnvironmentXQuery) {
    this.hijos.push(ent);
  }

  printEntornos() {
    let ent: EnvironmentXQuery = this;
    this.printEntornos2(ent);
  }

  private printEntornos2(ent: EnvironmentXQuery) {
    console.log(ent.nombre);
    ent.hijos.forEach((element) => {
      this.printEntornos2(element);
    });
  }

  getTablaSimbolos() {
    let ent: EnvironmentXQuery = this;
    let simb = new Array();
    this.tablaSimbolos.forEach((element) => {
      simb.push(element);
    });
    ent.hijos.forEach((element) => {
      this.getSimbolos(element, simb);
    });
    return simb;
  }

  private getSimbolos(ent: EnvironmentXQuery, list: any) {
    ent.tablaSimbolos.forEach((element) => {
      list.push(element);
    });
    ent.hijos.forEach((element) => {
      this.getSimbolos(element, list);
    });
  }

  public searchVar(name: string) {
    let ret = null;
    let tmp: EnvironmentXQuery = this;
    while (tmp != null) {
      tmp.tablaSimbolos.forEach((element) => {
        if (element.nombre === name) {
          ret = element;
          return;
        }
      });
      tmp = this.anterior;
    }
    return ret;
  }
}
