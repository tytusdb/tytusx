import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { Retorno } from "./retorno";

export class If_Else extends Instruccion {
    condicionIF: Instruccion;
    instruccionIF: Instruccion;
    condicionELSEIF: Instruccion;
    instruccionELSEIF: Instruccion;
    instruccionELSE: Instruccion;

    constructor(linea: string, condicionIF: Instruccion, instruccionIF: Instruccion, instruccionELSE: Instruccion, condicionELSEIF?: Instruccion, instruccionELSEIF?: Instruccion) {
        super(linea);
        Object.assign(this, { condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF });
    }

    ejecutar(e: Entorno) {
        if (this.condicionELSEIF) {
            if (this.condicionIF.ejecutar(e)) {
                const entorno = new Entorno(e);
                const resp = this.instruccionIF.ejecutar(entorno);
                //console.log('entra if', this.instruccionIF, resp);
                return resp;
            }
            else if (this.condicionELSEIF.ejecutar(e)) {
                const entorno = new Entorno(e);
                const resp = this.instruccionELSEIF.ejecutar(entorno);
                //console.log('entra elseif', this.instruccionELSEIF, resp);
                return resp;
            }
            else {
                const entorno = new Entorno(e);
                const resp = this.instruccionELSE.ejecutar(entorno);
                //console.log('entra else', this.instruccionELSE, resp);
                return resp;
            }
        }
        if (this.condicionIF.ejecutar(e)) {
            const entorno = new Entorno(e);
            const resp = this.instruccionIF.ejecutar(entorno);
            //console.log('entra if', this.instruccionIF, resp);
            return resp;
        }
        else {
            const entorno = new Entorno(e);
            const resp = this.instruccionELSE.ejecutar(entorno);
            //console.log('entra else', this.instruccionELSE, resp);
            return resp;
        }
    }

}