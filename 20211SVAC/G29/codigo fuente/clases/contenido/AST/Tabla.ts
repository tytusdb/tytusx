import {Simbolo} from './Simbolo';

class Tabla{
    t_anterior: Tabla;
    variables: Map<string, Simbolo>;

    constructor(t_anterior: Tabla){
        this.t_anterior = t_anterior;
        this.variables = new Map<string, Simbolo>();
    }

    set_variable(simbolo: Simbolo){
        for(let key of Array.from( this.variables.keys()) ) {
            if(key === simbolo.id){
                return `La variable ${key} ya ha sido declarada.`;
            }
        }
        this.variables.set(simbolo.id, simbolo);
        return null;
    }

    get_var(identifier: String): Simbolo{
        let t_actual: Tabla;
        for(t_actual = this; t_actual != null; t_actual = t_actual.t_anterior){
                for(let key of Array.from( t_actual.variables.keys()) ) {
                    if(key === identifier){
                        return t_actual.variables.get(key);
                    }
                }
        }
        return null;
    }

}
export{Tabla};
