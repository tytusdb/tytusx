import { Tipo } from './Tipo';
export class Parametros{
  variable:string;
  tipo:Tipo;
  constructor(variable:string,tipo:Tipo){
    this.variable=variable;
    this.tipo=tipo;
  }

  getTipo():Tipo{
    return this.tipo;
  }

  getVariable():string{
    return this.variable;
  }
}
