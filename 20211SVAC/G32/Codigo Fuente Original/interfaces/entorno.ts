import { Funcion } from '../expresiones/funcion';
import { Variable } from '../expresiones/variable';
import * as _ from 'lodash';
import { XmlTS } from '../arbol/xmlTS';

export class Entorno {
  variables: Map<String, Variable>;
  padre: Entorno;
  funciones: Map<String, Funcion>;

  constructor(padre?: Entorno) {
    this.padre = padre != null ? padre : null;
    this.variables = new Map();
    this.funciones = new Map();
  }

  setVariable(variable: Variable): void {
    this.variables.set(variable.id, variable);
  }

  getVariable(id: string): Variable {
    for (let e: Entorno = this; e != null; e = e.padre) {
      let variable = e.variables.get(id);
      //console.log('entoronosssss\n', id, e);
      if (variable != null) return variable;
    }
    return null;
  }

  setFuncion(funcion: Funcion) {
    this.funciones.set(funcion.id, funcion);
  }

  getFuncion(id: string): Funcion {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.funciones.has(id)) {
        return e.funciones.get(id);
      }
    }
    return null;
  }

  getEntornoGlobal(): Entorno {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.padre == null) return e;
    }
  }

}
