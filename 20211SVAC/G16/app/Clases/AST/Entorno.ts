import Simbolo from "./Simbolo";

export default class Entorno{
    private Padre:Entorno;
    public entornos:Array<Simbolo>;

    constructor(Padre:Entorno){
        this.entornos = new Array<Simbolo>();
        this.Padre = Padre;
    }

    Add(Simbolo:Simbolo){
        Simbolo.Nombre = Simbolo.Nombre;
        this.entornos.push(Simbolo);
    }

    Get(){
      return this.entornos;
    }
}
