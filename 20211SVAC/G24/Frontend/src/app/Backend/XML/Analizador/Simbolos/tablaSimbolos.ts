import Simbolo from './Simbolo';
import Tipo, { tipoDato } from './Tipo';

export default class tablaSimbolos {
  public tablaAnterior: tablaSimbolos | any;
  private tipoDato: Tipo;
  public tablaActual: Array<Simbolo>;
  private nombreDato: String;

  private list_asignaciones = []

  constructor(anterior?: tablaSimbolos) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Array<Simbolo>();
    this.tipoDato = new Tipo(tipoDato.CADENA);
    this.nombreDato = '';
  }

  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: tablaSimbolos) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  public setTabla(Tabla: Array<Simbolo>) {
    this.tablaActual = Tabla;
  }
  public setVariable(simbolo: Simbolo) {
    /*
    for (let e: tablaSimbolos = this; e != null; e = e.getAnterior()) {
      let encontrado: Simbolo = null;
      for(let h of e.getTabla()){
        if(h.getidentificador()==simbolo.getidentificador()){
          encontrado=h;
          break;
        }
      }
           
      if (encontrado != null) {
        return `La variable existe actualmente`;
      }
      break;
    }
    */
    this.tablaActual.push(simbolo);
    return `creada con exito`;
  }

  public getVariable(id: String) {
    for (let e: tablaSimbolos = this; e != null; e = e.getAnterior()) {
      let encontrado: Simbolo = null;
      for (let h of e.getTabla()) {
        if (h.getidentificador() == id) {
          encontrado = h;
          break;
        }
      }
      if (encontrado != null) {
        return encontrado;
      }
    }
    return null;
  }
  public getNombre(): String {
    return this.nombreDato;
  }

  public setNombre(nombre: String) {
    this.nombreDato = nombre;
  }

  public pushListAsignacion(temp1, temp2) {
    this.list_asignaciones.push({ temp1: temp1, temp2: temp2 })
  }

  public thisDeclarationExist(temp1, temp2): String {
    for (let asignacion of this.list_asignaciones) {
      if (asignacion.temp1 == temp2 && asignacion.temp2 == temp1) {
        return ""
      }
    }

    this.pushListAsignacion(temp1, temp2)
    return temp1 + "=" + temp2
  }

}
//ARREGLO DE SOLO ID DE METODOS
