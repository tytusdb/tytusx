import { EntornoXQ } from "../Entorno/Entorno";
import { InstruccionXQ } from "./InstruccionXQ";
import { NodoXQ } from "./NodoXQ";

export class AST {
    static contador:number = 0;
    listaInstrucciones:[NodoXQ];
    tablaGlobal:EntornoXQ;

    constructor(lista:any) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }

    ejecutar() {
        this.listaInstrucciones.forEach(ins => {
            if(ins instanceof InstruccionXQ) {
                ins.ejecutar(this.tablaGlobal);
            } else {
                ins.getValor(this.tablaGlobal);
            }
        });
    }
}

export let contador = 0;