class NodoPadre implements NodosCST {
    nombre:string;
    produccion:string;
    reglas:string;
    hijos:Array<NodosCST>;

    constructor(nombre:string,produccion:string,regla:string,hijos:Array<NodosCST>){
        this.nombre = nombre;
        this.produccion = produccion;
        this.reglas = regla;
        this.hijos = hijos;
    }
    getProduccion(): string {
        return this.produccion;
    }
    getReglaSemantica(): string {
        return this.reglas;
    }
    reporteGramatical(): string {
        throw new Error("Method not implemented.");
    }
    getHijos():Array<NodosCST>{
        return this.hijos;
    }
}