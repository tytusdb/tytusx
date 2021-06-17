
import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/continuar";
import retornar from "../SentenciaTransferencia/retornar";


export default class For implements Instruccion{

    public condicion: Expreciones;
    public lista_instrucciones : Array<Instruccion>;
    public inicio;
    public fin;
    public linea : number;
    public columna : number;

    constructor(condicion, lista_instrucciones,inicio,fin,linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.inicio=inicio;
        this.fin=fin;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_for = new TablaSimbolos(ts);
        this.inicio.ejecutar(controlador,ts_for);
        let valor_condicion = this.condicion.getValor(controlador, ts_for);
        
        if(typeof valor_condicion == 'boolean'){

            while(this.condicion.getValor(controlador,ts_for)){

                let ts_local = new TablaSimbolos(ts_for);
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
                    
                     //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador,ts_local," (FOR)");

                this.fin.ejecutar(controlador,ts_for);
            }
        }
        controlador.graficarEntornos(controlador,ts_for," (FOR)");
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("CICLO","");
        padre.AddHijo(new Nodo("for",""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.inicio.recorrer());
        padre.AddHijo(new Nodo(";",""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new Nodo(";",""));
        padre.AddHijo(this.fin.recorrer());
        padre.AddHijo(new Nodo(")",""));
        padre.AddHijo(new Nodo("{",""));
        for(let ins of this.lista_instrucciones){
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new Nodo("}",""));
        return padre;
    }

} 