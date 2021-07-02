import { EntornoXQ } from "../Entorno/Entorno";
import { InstruccionXQ } from "./InstruccionXQ";

export class AST {
    listaInstrucciones:[InstruccionXQ];
    tablaGlobal:EntornoXQ;

    constructor(lista:any) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }

    ejecutar() {
        this.listaInstrucciones.forEach(ins => {
            ins.ejecutar(this.tablaGlobal);
        });
    }
}