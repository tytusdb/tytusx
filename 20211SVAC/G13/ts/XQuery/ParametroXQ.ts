import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";

export class ParametroXQ {
    nombre:string;
    tipo:TipoXQ

    constructor(n:string) {
        this.nombre = n;
        this.tipo = new TipoXQ(EnumTipo.defecto);
    }

    setTipo(t:TipoXQ) {
        this.tipo = t;
    }
}