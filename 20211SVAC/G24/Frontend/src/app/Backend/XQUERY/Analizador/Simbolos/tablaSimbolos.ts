import Simbolo from './Simbolo';
import Tipo, { tipoDato } from './Tipo';

export default class tablaSimbolos {
  public tablaAnterior: tablaSimbolos | any;
  private tipoDato: Tipo;
  public tablaActual: Array<Simbolo>;
  private nombreDato: String;
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
    this.tablaActual.push(simbolo);
    return `creada con exito`;
  }

  

  public getVariable(id: String) {
    for (let e: tablaSimbolos = this; e != null; e = e.getAnterior()) {
      let encontrado: Simbolo=null;
      for(let h of e.getTabla()){
        if(h.getidentificador()==id){
          encontrado=h;
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
}
//ARREGLO DE SOLO ID DE METODOS
