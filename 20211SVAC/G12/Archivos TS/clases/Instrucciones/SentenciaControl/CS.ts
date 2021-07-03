import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/continuar";
import retornar from "../SentenciaTransferencia/retornar";

export default class CS implements Instruccion{
    public lista_instrucciones : Array<Instruccion>;
    public valor_case: Expreciones;
    public valor_sw;

    constructor(valor_case,lista_intrucciones){
        this.lista_instrucciones=lista_intrucciones;
        this.valor_case=valor_case;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local= new TablaSimbolos(ts);
        if(this.valor_sw==this.valor_case.getValor(controlador,ts)){
            for(let res of this.lista_instrucciones){
                let ins =res.ejecutar(controlador,ts_local);
                if( ins instanceof Detener || res instanceof Detener){
                    controlador.graficarEntornos(controlador,ts_local," (case)");
                    return ins;
                }else{
                    if(ins instanceof Continuar || res instanceof Continuar){
                        controlador.graficarEntornos(controlador,ts_local," (case)");
                        return ins;
                    }else{
                        if( ins instanceof retornar || res instanceof retornar){
                            controlador.graficarEntornos(controlador,ts_local," (case)");
                            return ins;
                        }
                    }
                }
            }
        }
        controlador.graficarEntornos(controlador,ts_local," (case)");
    }

    recorrer(): Nodo {
        let padre = new Nodo("CASE","");
        padre.AddHijo(new Nodo("case",""));
        padre.AddHijo(this.valor_case.recorrer());
        padre.AddHijo(new Nodo(":",""));
        for(let ins of this.lista_instrucciones){
            padre.AddHijo(ins.recorrer());
        }
        return padre;
    }

}