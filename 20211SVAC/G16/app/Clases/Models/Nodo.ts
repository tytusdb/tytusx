export default class Nodo{

    Etiqueta:string;
    Valor:string;
    Hijos:Array<Nodo>;
  
    public constructor(etiqueta:string, valor:string){
        this.Etiqueta=etiqueta;
        this.Valor=valor;
        this.Hijos=new Array<Nodo>();
    }
    
    public AgregarHijo(nodohijo:Nodo){
        this.Hijos.push(nodohijo);
    }

  }