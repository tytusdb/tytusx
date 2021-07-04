  export class NodoFinal {

    public name: string;
    public children: Array<NodoFinal>;

    constructor(nombre: string, children:[]){
      this.name = nombre;
      this.children = children;
    }

    public getSiguientes(): Array<NodoFinal>{
      return this.children;
    }

  }