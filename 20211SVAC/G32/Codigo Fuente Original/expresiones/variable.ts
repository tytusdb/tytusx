import { XmlTS } from '../arbol/xmlTS';
import { Tipo } from '../expresiones/tipo';
import { Arreglo } from './arreglo';

export class Variable {
  id: string;
  tipo: Tipo;
  valor: any;
  dimensiones: number;

  constructor({ id, tipo = null, valor = null, dimensiones = 0 }: { id: string, tipo?: Tipo, valor?: any, dimensiones?: number }) {
    Object.assign(this, { id, tipo, valor, dimensiones });
  }

  hasTipoAsignado(): boolean {
    return this.tipo != null;
  }

  getValor(): any {
    return this.valor;
  }

  public toString(ent: number): XmlTS {
    let ts = new XmlTS();
    let valorr = this.valor;
    if (typeof this.valor == 'object') {
      valorr = valorr.toString();
      //this.tipo = 6;
    }
    ts.agregar(this.id, valorr, ent.toString(), this.tipo.toString(), 1, 1, null, null);
    return ts;
  }

}
