//Clase para almacenar bloques de codigo de tres direcciones

export class CodeBlock{

    bloques: string[];
    temporales: string[];

    /**
     * Constructor de bloque de codigo de tres direcciones
     * @param bloq arreglo de strings que contiene codigo de 3 direcciones
     * @param temps arreglos de string que contiene lista de temporales usados
     */
    constructor(bloq:string[],temps:string[]){
        this.bloques = bloq;
        this.temporales = temps;
    }

    addBloque(bloq:string){
        this.bloques.push(bloq);
    }

    addTemporal(temp:string){
        this.temporales.push(temp);
    }

}