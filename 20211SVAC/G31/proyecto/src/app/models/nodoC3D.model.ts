export abstract class NodoC3D {
    public cadena: string;
    public lv: string;
    public lf: string;
    public valor: Object;
  
    constructor(cadena: string, lv: string, lf: string, valor: Object) {  
      this.cadena = cadena;
      this.lv = lv;
      this.lf = lf;
      this.valor = valor;
    }
  }