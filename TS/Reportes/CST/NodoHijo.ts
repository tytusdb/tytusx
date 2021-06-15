class NodoHijo implements NodosCST{    
    nombre:string;
    produccion:string;
    reglas:string;

    constructor(nombre:string, produccion:string, regla:string){
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
}