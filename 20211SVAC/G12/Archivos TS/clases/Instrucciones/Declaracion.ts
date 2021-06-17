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
    public lista_simbolos: Array<Simbolos>;
    public linea: number;
    public columna  :  number;

    constructor (type,lista_simbolos,linea,columna){
        this.type=type;
        this.lista_simbolos=lista_simbolos;
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {

        for(let simbolo of this.lista_simbolos){
            let variable = simbolo as Simbolos;

            if(ts.existeEnActual(variable.identificador)){
                let error = new Errores('Semantico', `La variable ${variable.identificador} ya existe en el entorno actual.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : La variable ${variable.identificador} ya existe en el entorno actual. En la linea ${this.linea} y columan ${this.columna}`);
                continue;
            }

            if(variable.valor!=null){
                let valor=variable.valor.getValor(controlador,ts);

                let tipo_valor = variable.valor.getTipo(controlador,ts);
                console.log(tipo_valor, this.type.type);
                if(tipo_valor == this.type.type || (tipo_valor == tipo.DOBLE && this.type.type == tipo.ENTERO)  ){
                    let nuevo_simb =new Simbolos(variable.simbolo,this.type,variable.identificador,valor);
                    ts.agregar(variable.identificador,nuevo_simb);   
                }else if(tipo_valor == tipo.CADENA && this.type.type== tipo.CARACTER){
                    if(valor.length==1){
                        let nuevo_simb =new Simbolos(variable.simbolo,this.type,variable.identificador,valor);
                        ts.agregar(variable.identificador,nuevo_simb); 
                    }else{
                        let error = new Errores('Semantico', `La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Error Semantico : La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
                    }
                }else{
                    let error = new Errores('Semantico', `La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error Semantico : La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
                }
            
            }else{
                let nuevo_simb =new Simbolos(variable.simbolo,this.type,variable.identificador,null);
                ts.agregar(variable.identificador,nuevo_simb);
            }


        }
        
    }
    recorrer(): Nodo {
        let padre = new Nodo("Declaraciones","");
        for(let simbolo of this.lista_simbolos){
           let  p = new Nodo("Declaracion","");
           p.AddHijo(new Nodo(simbolo.identificador,""));
           p.AddHijo(new Nodo(";",""));
           padre.AddHijo(p);
        }
        return padre;
    }

}