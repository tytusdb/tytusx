import { Instruccion } from "../interfaces/instruccion";
import { Tipo } from "../expresiones/tipo";
import { Variable } from "./variable";
import { XmlTS } from "../arbol/xmlTS";

export class Funcion{
  id: string;
  instrucciones: Array<Instruccion>;
  tipo: Tipo;
  params: Array<Variable>;

  constructor(id: string, instrucciones: Array<Instruccion>, tipo: Tipo = Tipo.VOID, params: Array<Variable> = null){
    Object.assign(this, {id, instrucciones, tipo, params});
  }

  hasReturn() : boolean{
    return this.tipo != Tipo.VOID;
  }

  hasParametros() : boolean{
    return this.params != null;
  }

  getParametrosSize() : number{
    return this.hasParametros() ? this.params.length : 0;
  }

  public toString(ent: number) : XmlTS{
    let ts = new XmlTS();
    const parametros = this.params != null ? this.params.length : 0;
    ts.agregar(this.id,parametros.toString() + ' Params', ent.toString(),this.tipo.toString(),1,1,null,null);
    return ts;
  }
}
