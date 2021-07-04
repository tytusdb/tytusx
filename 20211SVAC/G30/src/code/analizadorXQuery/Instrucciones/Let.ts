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
        //se agrega el simbolo al entorno
        ent.agregar(new_simbol);
    }
    //obtener contador
    GetCountStorage(): number {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    }
    //actualizar contador
    SetStorage(contador: number) {
        localStorage.setItem('contador', JSON.stringify(contador));
    }

    VariableC3D(ent: Entorno):any{
        var variable = [];
        var id = this.identificador;
        var valor = this.valor.getValorImplicito(ent);
        
        variable.push(id);

        if( typeof(valor) == 'number' ){
            variable.push([valor]);
        }
        else if(typeof(valor) == 'string'){
            let val_temp = [];
            for(let val of valor){
                val_temp.push(val.charCodeAt(0));
            }
            variable.push(val_temp)
        }
        return variable;

    }

}