import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";
import { LlamadaF } from "../Funciones/LlamadaF";
import { ForXQ } from "../Instrucciones/For";
import { ExpresionXQ } from "./ExpresionXQ";
import { InstruccionXQ } from "./InstruccionXQ";
import { NodoXQ } from "./NodoXQ";
var parseXML = require('../../../../analizadorXML/grammar');

export class AST {
    listaInstrucciones:[NodoXQ];
    tablaGlobal:EntornoXQ;

    constructor(lista:any) {
        this.listaInstrucciones = lista;
        this.tablaGlobal = new EntornoXQ(null);
        this.tablaGlobal.global = this.tablaGlobal;
    }

    ejecutar(inputXML:string) {
        //Creacion XML interno
        let texto = new SimboloXQ(new TipoXQ(EnumTipo.defecto), inputXML);
        this.tablaGlobal.insertar('#XML#', texto, 0, 0, 'La variable');



        //Ejecucion XQuery
        let salidas = [];
        this.listaInstrucciones.forEach(ins => {
            if(ins instanceof InstruccionXQ) {
                var auxx = ins.ejecutar(this.tablaGlobal);
                if(ins instanceof ForXQ) {
                    if(auxx != null) {
                        let temp;
                        for (const arry of auxx) {
                            salidas.push(arry.toString());    
                        }
                    }
                }
            } else if (ins instanceof ExpresionXQ){
                if(ins instanceof LlamadaF) {
                    var alv = ins.getValor(this.tablaGlobal);
                    if((alv.tipo.tipo != EnumTipo.error) && (alv.tipo.tipo != EnumTipo.defecto) &&
                    (alv.tipo.tipo != EnumTipo.tvoid) && (alv.tipo.tipo != EnumTipo.nulo) && 
                    (alv.tipo.tipo != EnumTipo.funcion)) {
                        salidas.push(alv.valor);
                        //console.log(">> " + alv.valor);
                    }
                } else {
                    ins.getValor(this.tablaGlobal);
                }
            } else {
                console.log('Tipo de inst. no contemplada');
            }
        });
        return salidas;
    }
}

export let contador = 0;