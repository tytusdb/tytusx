import { Simbolo } from "./Simbolo";

export class Table{
    Anterior: Table;
    Variables: Map<String, Simbolo>;

    constructor(Anterior: Table){
        this.Anterior = Anterior;
        this.Variables = new Map<String, Simbolo>();
    }

    setVariable(simbol: Simbolo){
        let ambito: Table;
        for(ambito = this; ambito!= null; ambito = ambito.Anterior){
            for(let key of Array.from(ambito.Variables.keys())) {
                if(key.toLowerCase() === simbol.id.toLowerCase()){
                    // return `La variable ${key} ya ha sido declarada.`;
                    return this.Variables.set(simbol.id.toLowerCase(), simbol);
                }
            }
        }
        this.Variables.set(simbol.id.toLowerCase(), simbol);
        return null;
    }
    
    getVariable(id: String): any{
        let ambito: Table;
        for(ambito = this; ambito != null; ambito = ambito.Anterior){
            for(let key of Array.from( ambito.Variables.keys()) ) {
                if(key.toLowerCase() === id.toLowerCase()){
                    return ambito.Variables.get(key.toLocaleLowerCase());
                }
            }
        }
        return null;
    }
}