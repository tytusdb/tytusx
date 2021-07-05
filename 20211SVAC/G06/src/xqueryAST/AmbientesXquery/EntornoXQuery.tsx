import { Retorno } from "../../Interfaces/ExpressionXquery";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";
import { DecFunction } from "../ExpresionesXquery/DecFunction";
import { SimboloXquery } from "./SimboloXquery";

export class EntornoXQuery {

    private variables: Map<string, SimboloXquery>;
    private funciones: Map<string, DecFunction>;
    public graphTS : string;

    constructor (
        public anterior: EntornoXQuery | null,
        public nombreEntXquery: string){
        this.variables = new Map();
        this.funciones = new Map();
        this.graphTS = "";
    }

    

    public guaradarVar(id: string, valor: Retorno, linea: Number, col: Number){
        this.variables.set(id, new SimboloXquery(id, valor, linea, col));
    }

    public existeVar (id : string): boolean{
        return this.variables.has(id);
    }

    public getVar(id : string) : Retorno | null{

        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            if (key === id) {
                return entry[1].valor;
            }
        }
        return null;
    }

    public getAllVars() {

        let salida : string = "";
        for (let entry of Array.from(this.variables.entries())) {
            salida +="            <tr><td>"+entry[1].linea +"</td><td>"+entry[1].columna+"</td><td>"+this.nombreEntXquery+"</td><td>"+entry[1].identificador+"</td><td>"+this.getTipo(entry[1].valor.type)+"</td><td>"+this.getVal(entry[1].valor)+"</td></tr>\n";
        }

        let ent: EntornoXQuery = this;
        while (ent.anterior !== null){
            ent = ent.anterior
        }
        ent.graphTS += salida;
    }

    private getTipo(tipo : tipoPrimitivo): string{

        if (tipo === tipoPrimitivo.BOOL){
            return "boolean";
        }else if (tipo === tipoPrimitivo.NODO){
            return "nodo";
        }else if (tipo === tipoPrimitivo.NUMBER){
            return "number";
        }else if (tipo === tipoPrimitivo.RESP){
            return "listado";
        }else if (tipo === tipoPrimitivo.STRING){
            return "cadena";
        }else {
            return "void";
        }

    }

    private getVal(val : Retorno): string{

        if (val.type  === tipoPrimitivo.RESP){
            return "listado";
        }else if (val.type  === tipoPrimitivo.NODO){
            return val.value.texto;
        }else if  (val.type  === tipoPrimitivo.VOID){
            return "void";
        }else {
            return val.value;
        }
    }

    // funcion--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    public guaradarFunc(id: string, func: DecFunction){
        this.funciones.set(id, func);
    }

    public existeFunc (id : string): boolean{
        return this.funciones.has(id);
    }

    public getFunc(id : string) : DecFunction | null{

        let ent: EntornoXQuery = this;
        while (ent.anterior !== null){
            ent = ent.anterior
        }

        if (ent.funciones.has(id)){
            for (let entry of Array.from(ent.funciones.entries())) {
                let key = entry[0];
                if (key === id) {
                    return entry[1];
                }
            }
        }

        return null;
    }

}