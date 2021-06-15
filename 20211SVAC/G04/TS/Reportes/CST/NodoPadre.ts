class NodoPadre implements NodosCST {
    id:number;
    nombre:string;
    produccion:string;
    reglas:string;
    hijos:Array<NodosCST>;

    constructor(id:number,nombre:string,produccion:string,regla:string,hijos:Array<NodosCST>){
        this.id = id;
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
    getId(){
        return this.id;
    }
    getNomre(){
        return this.nombre;
    }
}