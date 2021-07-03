import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/continuar";
import retornar from "../SentenciaTransferencia/retornar";


export default class DoWhile implements Instruccion{

    public condicion: Expreciones;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(typeof valor_condicion == 'boolean'){
           do{
                let ts_local = new TablaSimbolos(ts);
                for(let ins of this.lista_instrucciones){
                    let res = ins.ejecutar(controlador,ts_local);
                    if( ins instanceof Detener || res instanceof Detener){
                        controlador.graficarEntornos(controlador,ts_local," (While)");
                        return null;
                    }else{
                        if(ins instanceof Continuar || res instanceof Continuar){
                            break;
                        }else{
                            if( ins instanceof retornar || res instanceof retornar){
                                controlador.graficarEntornos(controlador,ts_local," (While)");
                                return res;
                            }
                        }
                    }
                }
                controlador.graficarEntornos(controlador,ts_local," (doWhile)");
            } while(this.condicion.getValor(controlador,ts));
        }
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("CICLO","");
        padre.AddHijo(new Nodo("do",""));
        padre.AddHijo(new Nodo("{",""));
        for(let ins of this.lista_instrucciones){
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new Nodo("}",""));
        padre.AddHijo(new Nodo("while",""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new Nodo(")",""));
        return padre;
    }

} 