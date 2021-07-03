import Entorno from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";

export class XPath implements Expresion{
  xpath:any;
  constructor(xpath:any){
    this.xpath=xpath
  }
  ejecutar(Entorno: Entorno, node: any) {
    throw new Error("Method not implemented.");
  }

}
