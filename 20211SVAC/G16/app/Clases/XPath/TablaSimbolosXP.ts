import { NodoAbs } from "./NodoAbs";

export class TablaSimbolosXP extends Array<NodoAbs>{
    constructor(){
        super();
    }

    public static add(gram:NodoAbs){
        this.prototype.push(gram);
    }

    public static verificarvacio():string{
        if(this.prototype.length>0){
            return "NO"
        }
        return "SI";
    }

    public static getSimbolos(){
      return this.prototype;
    }

  public static clear(){
    while(this.prototype.length>0){
        this.prototype.pop();
    }
  }
}