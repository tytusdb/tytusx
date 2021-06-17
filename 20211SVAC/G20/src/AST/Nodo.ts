export class Nodo {
    nombre: string;
    hijos = [];

    constructor(nombre: string, hijos: []) {
        this.nombre = nombre;
        this.hijos = hijos;
    }

}