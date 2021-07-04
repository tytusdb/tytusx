import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/continuar";
import retornar from "../SentenciaTransferencia/retornar";
import CS from "./CS";

export default class SW implements Instruccion{

    public Lista_case: Array<CS>;
    public valor_sw: Expreciones;
    public Lista_defaul: Array<Instruccion>;

    constructor(valo_sw,lista_case,lista_defaul){
        this.valor_sw=valo_sw;
        this.Lista_case=lista_case;
        this.Lista_defaul=lista_defaul;
    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos (ts);
        for(let sw of this.Lista_case){
            sw.valor_sw=this.valor_sw.getValor(controlador,ts_local);
        }
        let x=0;
        for(let ins of this.Lista_case){
            let res=ins.ejecutar(controlador,ts_local);
            if( ins instanceof Detener || res instanceof Detener){
                controlador.graficarEntornos(controlador,ts_local," (switch)");
                x=1;
                break;
            }else{
                    if( ins instanceof retornar || res instanceof retornar){
                        controlador.graficarEntornos(controlador,ts_local," (switch)");
                        return res; 
                    }
                }
            }

            if(x==0){
                for(let ins of this.Lista_defaul){
                    let res=ins.ejecutar(controlador,ts_local);
                    if( ins instanceof Detener || res instanceof Detener){
                        controlador.graficarEntornos(controlador,ts_local," (switch)");
                        break;
                    }else{
                            if( ins instanceof retornar || res instanceof retornar){
                                controlador.graficarEntornos(controlador,ts_local," (switch)");
                                return res; 
                            }
                        }
                    }
            }
            controlador.graficarEntornos(controlador,ts_local," (switch)");
    }
    recorrer(): Nodo {
        let padre = new Nodo("SWITCH","");
        padre.AddHijo(new Nodo("switch",""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.valor_sw.recorrer());
        padre.AddHijo(new Nodo(")",""));
        padre.AddHijo(new Nodo("{",""));
        for(let ins of this.Lista_case){
            padre.AddHijo(ins.recorrer());
        }

        if(this.Lista_defaul.length>0){
            padre.AddHijo(new Nodo("default:",""));
            for(let ins of this.Lista_defaul){
                padre.AddHijo(ins.recorrer());
            }
        }
        padre.AddHijo(new Nodo("}",""));
        return padre;
    }

}