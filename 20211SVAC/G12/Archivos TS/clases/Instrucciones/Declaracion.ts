import Errores from "../AST/Errores";
import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class Declaracion implements Instruccion{

    public type: Tipo;
    public stype: string;
    public simbolo: Simbolos;
    public linea: number;
    public columna  :  number;

    constructor (type,lista_simbolos,linea,columna){
        this.type=type;
        this.simbolo=lista_simbolos;
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
            let variable = this.simbolo;
            console.log("entre en asignacion ");
            console.log(variable);
            if(ts.existeEnActual(variable.identificador)){
                let error = new Errores('Semantico', `La variable ${variable.identificador} ya existe en el entorno actual.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : La variable ${variable.identificador} ya existe en el entorno actual. En la linea ${this.linea} y columan ${this.columna}`);
            }else{
                if(variable.valor!=null){
                    let valor=variable.valor.getValor(controlador,ts);
                    let nuevo_simb =new Simbolos(variable.simbolo,this.type,variable.identificador,valor);
                    ts.agregar2(variable.identificador,nuevo_simb);   
                    console.log("todo bien");
                    }else{
                        let nuevo_simb =new Simbolos(variable.simbolo,this.type,variable.identificador,null);
                        ts.agregar2(variable.identificador,nuevo_simb);  
                }
            }

            


        
        
    }
    recorrer(): Nodo {
       /* let padre = new Nodo("Declaraciones","");
        for(let simbolo of this.lista_simbolos){
           let  p = new Nodo("Declaracion","");
           p.AddHijo(new Nodo(simbolo.identificador,""));
           p.AddHijo(new Nodo(";",""));
           padre.AddHijo(p);
        }*/
        return null;
    }

}