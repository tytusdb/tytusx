import Simbolo from "./Simbolo";

export default class Entorno{
    private anterior:Entorno;
    public entornos:Array<Simbolo>;

    constructor(anterior:Entorno){
        this.entornos = new Array<Simbolo>();
        this.anterior = anterior;
    }

    Add(Simbolo:Simbolo){
        Simbolo.Nombre = Simbolo.Nombre;
        this.entornos.push(Simbolo);
    }

    Get(){
      return this.entornos;
    }
}
