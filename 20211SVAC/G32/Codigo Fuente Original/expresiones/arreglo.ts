import { Entorno } from "../interfaces/entorno";
import { Instruccion } from "../interfaces/instruccion";
import { Arreglo as recuperarArreglo } from "./ejeArreglo";

export class Arreglo extends Instruccion {
    valores_arreglo: Array<Instruccion>;

    constructor(linea: string, valores_arreglo: Array<Instruccion> = null) {
        super(linea);
        this.valores_arreglo = valores_arreglo;
    }

    ejecutar(e: Entorno) {
        const arreglo = [];
        let inicio = this.valores_arreglo[0].ejecutar(e);
        let final = this.valores_arreglo[1].ejecutar(e);
        //console.log(inicio, final);
        for (let index = inicio; index < final + 1; index++) {
            arreglo.push(index);
        }
        return new recuperarArreglo(arreglo);
    }

}