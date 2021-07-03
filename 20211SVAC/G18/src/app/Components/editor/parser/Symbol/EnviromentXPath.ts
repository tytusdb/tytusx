import { errores } from '../Errores';
import { Error_ } from '../Error';
import { XMLSymbol } from './xmlSymbol';

export class EnvironmentXPath {
  public nombre: string;
  public anterior: EnvironmentXPath;
  public tablaSimbolos: Array<XMLSymbol>;

  constructor(nombre, anterior) {
    this.nombre = nombre;
    this.anterior = anterior;
    this.tablaSimbolos = new Array<XMLSymbol>();
  }

  addSimbolo(simbolo: XMLSymbol) {
    //check only if is attr
    if (simbolo.getTipo() === 'Atributo') {
      let tmp = this.tablaSimbolos;
      for (let index = 0; index < tmp.length; index++) {
        if (
          tmp[index].getNombre() === simbolo.getNombre() &&
          tmp[index].getTipo() === simbolo.getTipo()
        ) {
          //error semantico se declaro dos veces el atributo
          console.error(
            'el atributo -> ' + simbolo.getNombre() + ' ya existe;'
          );
          errores.push(
            new Error_(
              simbolo.getFila(),
              simbolo.getColumna(),
              'Semantico',
              "el atributo -> ' + simbolo.getNombre() + ' ya existe;"
            )
          );
          return;
        }
      }
      this.tablaSimbolos.push(simbolo);
      return;
    }
  }

  printEntornos() {
    let ent: EnvironmentXPath = this;
    while (ent != null) {
      console.log(ent.nombre);
      ent = ent.anterior;
    }
  }

  printTablaSimbolos() {
    let ent: EnvironmentXPath = this;
    while (ent != null) {
      var tmp = ent.tablaSimbolos;
      tmp.forEach((element) => {
        // console.log(element);
      });
      ent = ent.anterior;
    }
  }

  getTablaSimbolos() {
    let ent: EnvironmentXPath = this;
    let simb = new Array();
    while (ent != null) {
      let tmp = ent.tablaSimbolos;
      tmp.forEach((element) => {
        simb.push(element);
      });
      ent = ent.anterior;
    }
    return simb;
  }
}
