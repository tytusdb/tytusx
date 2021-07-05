import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')
 
export class Let implements Instruccion {
    linea: number;
    columna: number;
    public valor: any;
    public identificador: string;

    constructor(linea: number, columna: number, valor: any, identificador: string) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.identificador = identificador;
    }

    ejecutar(ent: Entorno) {
        //creamos una variable en la tabla de simbolos del entorno global y le mandamos el objeto como valor  
        var new_simbol = new Simbolo(this.identificador, this.valor.getTipo(ent), this.linea, this.columna, this.valor.getValorImplicito(ent))
        var simb = [];
        simb = simb.concat(this.GetTablaStorage());
        simb.push(new_simbol);
        this.SetTablaStorage(simb);
        //se agrega el simbolo al entorno
        ent.agregar(new_simbol);
    }
    
    //obtener contador
    GetCountStorage(): number {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    }
    //actualizar contador
    SetCountStorage(contador: number) {
        localStorage.setItem('contador', JSON.stringify(contador));
    }

    VariableC3D(ent: Entorno):any{
        try {
            var variable = [];
            var id = this.identificador;
            var valor = this.valor.getValorImplicito(ent);
            variable.push(id);
            if( typeof(valor) == 'number' ){
                variable.push([valor]);
            }
            else if(typeof(valor) == 'string'){
                let val_temp = [];
                for(let i = 0; i < valor.length; i ++){
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable.push(val_temp)
            }
            return variable;
        } catch (error) {
            var variable = [];
            var id = this.identificador;
            var valor = this.valor
            variable.push(id);
            if( typeof(valor) == 'number' ){
                variable.push([valor]);
            }
            else if(typeof(valor) == 'string'){
                let val_temp = [];
                for(let i = 0; i < valor.length; i ++){
                    val_temp.push(valor[i].charCodeAt(0));
                }
                variable.push(val_temp)
            }
            return variable;
        }




        
    }

    //obtener tabla simbolos
    GetTablaStorage(): any {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    }
    //actualizar contador
    SetTablaStorage(tabla: any) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    }
}