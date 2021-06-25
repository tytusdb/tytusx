import {Error} from './Errores'
export class Errores extends Array<Error>{
    constructor(){
        super();
    }

    public static add(err:Error){
        this.prototype.push(err);
    }

    public static verificarerror():string{
        if(this.prototype.length>0){
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }

    public static geterror(){
      return this.prototype;
  }
  public static clear(){
    while(this.prototype.length>0){
        this.prototype.pop();
    }
}
}
