import { Error } from "../arbol/error";
import { Errores } from "../arbol/errores";
import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { getTipo } from "../expresiones/tipo";
import { Variable } from "../expresiones/variable";
import * as _ from 'lodash';
import { entFunc } from "../interfaces/entFunc";

export class letEXP extends Instruccion {
  id: string;
  expresion: Instruccion;

  constructor(linea: string, id: string, expresion: Instruccion) {
    super(linea);
    Object.assign(this, { id, expresion });
  }

  ejecutar(e: Entorno) {
    let variable = e.getVariable(this.id);
    if (variable && !entFunc.getInstance().ejecFuncion()) {
      Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La variable ${this.id} ya existe` }));
      return;
    }

    let valor = this.expresion.ejecutar(e);
    valor = _.cloneDeep(valor);
    //console.log('letexp\n',this.id, this.expresion, valor, e)
    const tipo = getTipo(valor);
    variable = new Variable({ id: this.id, tipo, valor });
    e.setVariable(variable);
  }

}