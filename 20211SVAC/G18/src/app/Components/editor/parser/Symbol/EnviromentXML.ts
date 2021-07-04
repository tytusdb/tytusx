import { errores } from '../Errores';
import { Error_ } from '../Error';
import { XMLSymbol } from '../Symbol/xmlSymbol';

export class EnvironmentXML {
  public nombre: string;
  // public anterior: EnvironmentXML;
  public hijos: Array<EnvironmentXML>;
  public tablaSimbolos: Array<XMLSymbol>;

  constructor(nombre) {
    this.nombre = nombre;
    this.hijos = new Array<EnvironmentXML>();
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
              'el atributo -> ' + simbolo.getNombre() + ' ya existe;'
            )
          );
          return;
        }
      }
      this.tablaSimbolos.push(simbolo);
    } else if (simbolo.getTipo() === 'Valor') {
      this.tablaSimbolos.push(simbolo);
    }
    return;
  }

  getValor(ambito: string): string {
    let response = '';
    if (this.tablaSimbolos.length > 0) {
      this.tablaSimbolos.forEach((element) => {
        if (element.ambito == ambito) {
          if (element.nombre == '') response = element.getValor();
        }
      });
    }
    // Imprimir etiqueta XML Completa
    this.hijos.forEach((element) => {
      response +=
        '<' +
        element.nombre +
        '>' +
        element.getValor(element.nombre) +
        '</' +
        element.nombre +
        '>\n';
    });
    return response;
  }

  getValArr(tagID: string): string[] {
    console.log('getvallarr');
    let results = [];
    this.getTablaSimbolos().forEach((sym) => {
      console.log(sym.ambito, tagID);
      if (sym.ambito == tagID && sym.tipo == 1) {
        results.push(`<${sym.ambito}>${sym.valor}</${sym.ambito}>`);
      }
    });
    return results;
  }

  getAttribute(att: string) {
    let valorAtt = '';
    this.tablaSimbolos.forEach((element) => {
      if (element.nombre == att) {
        valorAtt = element.valor;
      }
    });
    return valorAtt;
  }

  public getByAttribute(att: string, value: string) {
    let find = false;
    this.hijos.forEach((element) => {
      if (element.nombre == att) {
        let valorAtt = element.getValor(element.nombre);
        if (valorAtt == value) {
          find = true;
          return;
        }
      }
    });
    return find ? this : null;
  }

  addHijo(ent: EnvironmentXML) {
    this.hijos.push(ent);
  }

  printEntornos() {
    let ent: EnvironmentXML = this;
    this.printEntornos2(ent);
  }

  private printEntornos2(ent: EnvironmentXML) {
    // console.log(ent.nombre);
    ent.hijos.forEach((element) => {
      this.printEntornos2(element);
    });
  }

  getTablaSimbolos() {
    let ent: EnvironmentXML = this;
    let simb = new Array();
    this.tablaSimbolos.forEach((element) => {
      simb.push(element);
    });
    ent.hijos.forEach((element) => {
      this.getSimbolos(element, simb);
    });
    return simb;
  }

  private getSimbolos(ent: EnvironmentXML, list: any) {
    ent.tablaSimbolos.forEach((element) => {
      list.push(element);
    });
    ent.hijos.forEach((element) => {
      this.getSimbolos(element, list);
    });
  }
}
