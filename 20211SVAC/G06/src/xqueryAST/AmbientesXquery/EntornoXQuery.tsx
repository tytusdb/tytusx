import { Retorno } from "../../Interfaces/ExpressionXquery";
import { DecFunction } from "../ExpresionesXquery/DecFunction";

export class EntornoXQuery {

    private variables: Map<string, Retorno>;
    private funciones: Map<string, DecFunction>;

    constructor (
        public anterior: EntornoXQuery | null,
        public nombreEntXquery: string){
        this.variables = new Map();
        this.funciones = new Map();
    }

    

    public guaradarVar(id: string, valor: Retorno){
        this.variables.set(id, valor);
    }

    public existeVar (id : string): boolean{
        return this.variables.has(id);
    }

    public getVar(id : string) : Retorno | null{

        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            if (key === id) {
                return entry[1];
            }
        }
        return null;
    }

    public actualizarVar(id : string, nvoValor : Retorno){

        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            if (key === id) {
                entry[1] = nvoValor;
            }
        }
    }

    public getAllVars() : String{

        let salida : string = ""
    
        salida += "Anbiente: " + this.nombreEntXquery+ "\n";

        for (let entry of Array.from(this.variables.entries())) {
            salida += "identificador: "+ entry[1] + "valor: "+ entry[0]+ "\n";
        }
        return salida;

    }

    // funcion--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    public guaradarFunc(id: string, func: DecFunction){
        this.funciones.set(id, func);
    }

    public existeFunc (id : string): boolean{
        return this.funciones.has(id);
    }

    public getFunc(id : string) : DecFunction | null{

        let ent: EntornoXQuery = this;
        while (ent.anterior !== null){
            ent = ent.anterior
        }

        if (ent.funciones.has(id)){
            for (let entry of Array.from(this.funciones.entries())) {
                let key = entry[0];
                if (key === id) {
                    return entry[1];
                }
            }
        }

        return null;
    }

}