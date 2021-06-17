import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/continuar";
import retornar from "../SentenciaTransferencia/retornar";


export default class Ifs implements Instruccion{

    public condicion : Expreciones;
     public lista_ifs : Array<Instruccion>;
     public lista_elses : Array<Instruccion>;
     public linea : number;
     public columna : number;

     constructor(condicion, lista_ifs, lista_elses, linea, columna) {
         this.condicion = condicion;
         this.lista_ifs = lista_ifs;
         this.lista_elses = lista_elses;
         this.columna = columna; 
         this.linea = linea;
     }

     ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);

        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            if(valor_condicion){
                for(let ins of this.lista_ifs){
                    let res = ins.ejecutar(controlador, ts_local);

                    if( ins instanceof Detener || res instanceof Detener){
                        controlador.graficarEntornos(controlador,ts_local," (While)");
                        return res;
                    }else{
                        if(ins instanceof Continuar || res instanceof Continuar){
                            controlador.graficarEntornos(controlador,ts_local," (While)");
                            return res;
                        }else{
                            if( ins instanceof retornar || res instanceof retornar){
                                controlador.graficarEntornos(controlador,ts_local," (While)");
                                return res;
                            }
                        }
                    }
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador,ts_local," (IF)");
            }else{
                for(let ins of this.lista_elses){
                    let res = ins.ejecutar(controlador,ts_local);
                   
                        if( ins instanceof Detener || res instanceof Detener){
                            controlador.graficarEntornos(controlador,ts_local," (While)");
                            return res;
                        }else{
                            if(ins instanceof Continuar || res instanceof Continuar){
                                controlador.graficarEntornos(controlador,ts_local," (While)");
                                return res;
                            }else{
                                if( ins instanceof retornar || res instanceof retornar){
                                    controlador.graficarEntornos(controlador,ts_local," (While)");
                                    return res;
                                }
                            }
                        }
                    
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador,ts_local," (IF)");
            }
        }
        return null;
    }
    recorrer(): Nodo {
        let padre = new Nodo("SENTENCIA","");
        padre.AddHijo(new Nodo("if",""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new Nodo(")",""));
        padre.AddHijo(new Nodo("{",""));
        for(let ins of this.lista_ifs){
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new Nodo("}",""));
        if(this.lista_elses.length>0){
            padre.AddHijo(new Nodo("}",""));
            padre.AddHijo(new Nodo("else",""));
            padre.AddHijo(new Nodo("{",""));
            for(let ins of this.lista_elses){
                padre.AddHijo(ins.recorrer());
            }
            padre.AddHijo(new Nodo("}",""));
        }
        return padre;
    }

}