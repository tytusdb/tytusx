class NodoHijo implements NodosCST{    
    id:number;
    nombre:string;
    produccion:string;
    reglas:string;

    constructor(id:number,nombre:string, produccion:string, regla:string){
        this.id = id;
        this.nombre = nombre;
        this.produccion = produccion;
        this.reglas = regla;
    }
    reporteGramatical(): string {
        throw new Error("Method not implemented.");
    }
    getProduccion(): string {
        return this.produccion;
    }
    getReglaSemantica(): string {
        return this.reglas;
    }
    getId(){
        return this.id;
    }
    getNomre(){
        return this.nombre;
    }
}