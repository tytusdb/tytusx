import _ = require("lodash");
import { Error } from "../arbol/error";
import { Errores } from "../arbol/errores";
import { entFunc } from "../interfaces/entFunc";
import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { Retorno as ejeReturn } from "./ejeReturn";
import { Retorno } from "./retorno";
import { getTipo } from "./tipo";

export class llamfuc extends Instruccion {
  id: string;
  params: Array<Instruccion>;

  constructor(linea: string, id: string, params: Array<Instruccion> = null) {
    super(linea);
    Object.assign(this, { id, params });
  }

  ejecutar(e: Entorno) {
    let entAux = new Entorno();
    let entLocal = new Entorno(e);

    const ejecFunc = _.cloneDeep(e.getFuncion(this.id));

    if (!ejecFunc) {
      Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} no existe.` }));
      return;
    }
    else {
      if (this.params) {
        if (!ejecFunc.hasParametros()) {
          Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La funcion ${this.id} no recibe parámetros` }));
          return;
        }
        else if (this.params.length != ejecFunc.params.length) {
          Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} recibe otra cantidad de parámetros` }));
          return;
        }
        else {
          for (let i = 0; i < this.params.length; i++) {
            const expresion = this.params[i];
            const variable = ejecFunc.params[i];
            const valor = expresion.ejecutar(entLocal);
            if (valor != null && variable.hasTipoAsignado() && variable.tipo != getTipo(valor)) {
              Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El parámetro ${variable.id} de la función ${this.id} no coincide con la llamada` }));
              return;
            }
            variable.valor = valor;
            entAux.setVariable(variable);
          }
        }
      }
      else {
        if (ejecFunc.hasParametros()) {
          Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} recibe ${ejecFunc.getParametrosSize()} parámetros` }));
          return;
        }
      }

      entLocal.variables = entAux.variables;
      entLocal.padre = e.getEntornoGlobal();

      entFunc.getInstance().iFuncion();

      for (let instruccion of ejecFunc.instrucciones) {
        const resp = instruccion.ejecutar(entLocal);
        //console.log(instruccion, entLocal)
        if (resp instanceof ejeReturn) {
          if (ejecFunc.hasReturn() && resp.hasValue()) {
            let val = resp.getValue();
            if (typeof val == 'object') {
              val = val.toString();
              entFunc.getInstance().fFuncion();
              return val;
            }
            if (val != null && getTipo(val) != ejecFunc.tipo) {
              Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `El retorno de la función ${this.id} no corresponde` }));
              entFunc.getInstance().fFuncion();
              return;
            }
            else {
              entFunc.getInstance().fFuncion();
              return val;
            }
          }
          else if (ejecFunc.hasReturn() && !resp.hasValue()) {
            Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} debe retornar un valor` }));
            entFunc.getInstance().fFuncion();
            return;
          }
          else if (!ejecFunc.hasReturn() && resp.hasValue()) {
            Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} no debe retornar un valor` }));
            entFunc.getInstance().fFuncion();
            return;
          }
          else {
            entFunc.getInstance().fFuncion();
            return;
          }
        }
      }
      if (ejecFunc.hasReturn()) {
        Errores.getInstance().push(new Error({ tipo: 'Semántico', linea: this.linea, descripcion: `La función ${this.id} debe retornar un valor` }));
        entFunc.getInstance().fFuncion();
        return;
      }
      entFunc.getInstance().fFuncion();
    }
  }
}