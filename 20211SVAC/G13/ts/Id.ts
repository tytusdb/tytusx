import { Expresion } from "./Expresion";

export class Id extends Expresion {
    id: string;

    constructor(iden: string, l: number, c: number) {
        super();
        this.id = iden;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(): Expresion {
        //Buscar en el entorno (Objeto XML) lo que deba de ser
        throw new Error("Method not implemented.");
    }
    copiarValor(): Expresion {
        return new Id(this.id, this.linea, this.columna);
    }
}