export default class Nodo{

    Etiqueta:string;
    Valor:string;
    Hijos:Array<any>;

    public constructor(etiqueta:string, valor:string){
        this.Etiqueta=etiqueta;
        this.Valor=valor;
        this.Hijos=new Array<any>();
    }

    public AgregarHijo(nodohijo:any){
        this.Hijos.push(nodohijo);
    }

  }
