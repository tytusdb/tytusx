import { Retorno } from "../../Interfaces/Expresion";
import { Simbolo } from "../../xmlAST/Simbolo";

export class EntornoXQuery {

    private variables: Map<string, Retorno>;
    //public funciones: Map<string, InsFuncion>;

    constructor (public anterior: EntornoXQuery | null){
        this.variables = new Map();
    }

    public guaradarVar(id: string, valor: Retorno){
        this.variables.set(id, valor);
    }

    public existeLocalVar (id : string): boolean{
        return this.variables.has(id);
    }

//para asignacion-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    
    public existeVar(id : string){

        let envXqery: EntornoXQuery | null = this;

        if (envXqery.variables.has(id)){
            return true;
        }else {

            while(envXqery.anterior != null){
                envXqery = envXqery.anterior;
            }
            
            if (envXqery.variables.has(id)){
                return true;
            }else {
                return false;
            }
        }
    }

    public actualizarVar(id : string, nvoValor : Retorno){

        let envXqery: EntornoXQuery | null = this;

        if (envXqery.variables.has(id)) {
            for (let entry of Array.from(envXqery.variables.entries())) {
                let key = entry[0];
                if (key === id) {
                    entry[1] = nvoValor;
                }
            }

        }else {
 
            while(envXqery.anterior != null){
                envXqery = envXqery.anterior;
            }

            if (envXqery.variables.has(id)){

                for (let entry of Array.from(envXqery.variables.entries())) {
                    let key = entry[0];
                    if (key === id) {
                        entry[1] = nvoValor;
                    }
                }
            }
        }
    }

    public getVar(id : string) : Retorno | null{

        let envXqery: EntornoXQuery = this;

        if (envXqery.variables.has(id)) {
            for (let entry of Array.from(envXqery.variables.entries())) {
                let key = entry[0];
                if (key === id) {
                    return entry[1];
                }
            }

        }else {

            while(envXqery.anterior != null){
                envXqery = envXqery.anterior;
            }

            if (envXqery.variables.has(id)){

                for (let entry of Array.from(envXqery.variables.entries())) {
                    let key = entry[0];
                    if (key === id) {
                        return entry[1] ;
                    }
                }
            }
        }
        return null;
    }


}