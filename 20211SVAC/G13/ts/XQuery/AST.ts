import { EntornoXQ } from "../Entorno/Entorno";
import { EnumTipo } from "../Entorno/TipoXQ";
import { LlamadaF } from "../Funciones/LlamadaF";
import { ExpresionXQ } from "./ExpresionXQ";
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
            } else if (ins instanceof ExpresionXQ){
                if(ins instanceof LlamadaF) {
                    var alv = ins.getValor(this.tablaGlobal);
                    if((alv.tipo.tipo != EnumTipo.error) && (alv.tipo.tipo != EnumTipo.defecto) &&
                    (alv.tipo.tipo != EnumTipo.tvoid) && (alv.tipo.tipo != EnumTipo.nulo) && 
                    (alv.tipo.tipo != EnumTipo.funcion)) {
                        console.log(">> " + alv.valor);
                    }
                } else {
                    ins.getValor(this.tablaGlobal);
                }
            } else {
                console.log('Tipo de inst. no contemplada');
            }
        });
    }
}

export let contador = 0;