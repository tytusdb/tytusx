import { Error } from "../arbol/error";
import { Errores } from "../arbol/errores";
import { Entorno } from "../interfaces/entorno";
import { Funcion } from "./funcion";
import { Instruccion } from "../interfaces/instruccion";
import { Tipo } from "./tipo";
import { Variable } from "./variable";

export class nuevaFuncion extends Instruccion {

  linea: string;
  id: string;
  instrucciones: Array<Instruccion>;
  tipo: Tipo;
  params: Array<Variable>;

  constructor(linea: string, id: string, instrucciones: Array<Instruccion>, tipo: Tipo = Tipo.VOID, params: Array<Variable> = null) {
    super(linea);
    Object.assign(this, { id, instrucciones, tipo, params });
  }

  ejecutar(e: Entorno) {
    const funcion = e.getFuncion(this.id);
    if (funcion) {
      Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} ya existe` }));
      return;
    }
    else if (this.params) {
      const items = [];
      for (let variable of this.params) {
        if (items.includes(variable.id)) {
          Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El parámetro ${variable.id} de la función ${this.id} está repetido` }));
          return;
        }
        items.push(variable.id);
      }
    }
    e.setFuncion(new Funcion(this.id, this.instrucciones, this.tipo, this.params));
  }

}