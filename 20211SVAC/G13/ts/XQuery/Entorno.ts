import { SimboloXQ } from "./SimboloXQ";

export class EntornoXQ {
    public tabla:any;
    public anterior: EntornoXQ;
    public global: EntornoXQ;

    constructor(ant:EntornoXQ) {
        this.anterior = ant;
        if(ant == null || ant == undefined) {
            this.global = null;
        } else {
            this.global = ant.global;
        }

        this.tabla = new Map();
    }

    insertar(nombre:string, sim:SimboloXQ, l:number, c:number, cError:string) {
        if(this.tabla.has(nombre)) {
            console.log(`Error Semantico: ${cError} '${nombre}' ya existe. F:${l} C:${c}`);
            //Insert tabla de errores
            return;
        }
        this.tabla.set(nombre, sim);
    }

    buscar(nombre:string, l:number, c:number, cError:string):SimboloXQ {
        let e = this;
        for(e = this; e != null; e = e.anterior) {
            if(e.tabla.has(nombre)) {
                let sim:SimboloXQ = e.tabla.get(nombre);
                return sim;
            }
        }
        if(this.global.tabla.has(nombre)) {
            let sim:SimboloXQ = this.global.tabla.get(nombre);
            return sim;
        }
        
        return null;
    }
}