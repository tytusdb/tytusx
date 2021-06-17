import { Expresion } from "./Expresion";

export class Id extends Expresion {
    id: string;
    tipo: any;

    constructor(t:any, iden: string) {
        super();
        this.id = iden;
        this.tipo = t;
    }
    
    getValor(entorno: any): Expresion {
        //Buscar en el entorno (Objeto XML) lo que deba de ser
        throw new Error("Method not implemented.");
    }
    copiarValor(): Expresion {
        return new Id(this.tipo, this.id);
    }
}