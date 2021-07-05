import Errores from "../AST/Errores";
import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class Asignacion implements Instruccion {

    public identificador: string;
    public valor : Expreciones;
    public linea : number;
    public columna: number;

    constructor (identificador,valor,linea,columna){
        this.identificador=identificador;
        this.valor=valor;
        this.linea=linea;
        this.columna=columna;
    }




    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        if(ts.existe(this.identificador)){
            let valor=this.valor.getValor(controlador,ts);
            ts.getSimbolo2(this.identificador).setValor(valor);
        }else{
                let error = new Errores('Semantico', `La variable ${this.identificador} no a sido declarada.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : La variable ${this.identificador} no a sido declarada. En la linea ${this.linea} y columan ${this.columna}`);
                
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Asignacion","");
           padre.AddHijo(new Nodo(this.identificador,""));
           padre.AddHijo(new Nodo("=",""));
           padre.AddHijo(this.valor.recorrer());
        
        return padre;
    }

}