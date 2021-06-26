import {NodoGramatica} from './NodoGramatica'
export class ReporteGramatical extends Array<NodoGramatica>{
    constructor(){
        super();
    }

    public static add(gram:NodoGramatica){
        this.prototype.push(gram);
    }

    public static verificarvacio():string{
        if(this.prototype.length>0){
            return "NO"
        }
        return "SI";
    }

    public static getGramatica(){
      return this.prototype;
    }

  public static clear(){
    while(this.prototype.length>0){
        this.prototype.pop();
    }
  }
}
