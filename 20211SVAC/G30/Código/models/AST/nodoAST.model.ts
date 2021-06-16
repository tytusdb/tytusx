  export class NodoFinal {

    public nombre: string;
    public siguientes: Array<NodoFinal>;
    public dot: string;

    constructor(nombre: string, siguientes:[]){
      this.nombre = nombre;
      this.siguientes = siguientes;
      this.dot = '';
    }

    public getSiguientes(): Array<NodoFinal>{
      return this.siguientes;
    }    

    public hacerDOT(): string{
      return this.dot;
    }

  }