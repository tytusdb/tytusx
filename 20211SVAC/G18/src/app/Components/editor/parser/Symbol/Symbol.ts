import { Type, getTypeName } from "../Abstract/Retorno";
import { _Array } from '../Object/Array';
import { _Struct } from '../Object/Struct';

export class Symbol {
    public valor: any;
    public id: string;
    public type: Type;
    public ambito: string;

    constructor(valor: any, id: string, type: Type, ambito: string = "") {
        this.valor = valor;
        this.id = id;
        this.type = type;
        this.ambito = ambito;
    }

    private getTypeName() {
        switch (this.type) {
            case 0: return "Entero";
            case 1: return "String";
            case 2: return "Booleano";
            case 3: return "Null";
            case 4: return "Array";
            case 5: return "Reservada";
            case 6: return "Template";
            case 7: return "Type";
            case 8: return "Funcion";
            case 9: return "Float";
            default: return this.type;
        }
    }

    htmlRow() {
        let result = "";
        if (this.valor instanceof _Array || this.valor instanceof _Struct) result += "<td>" + this.valor.print() + "</td>" + "<td>" + this.id + "</td>" + "<td>" + this.getTypeName() + "</td>";
        else result += "<td>" + this.valor + "</td>" + "<td>" + this.id + "</td>" + "<td>" + this.getTypeName() + "</td>" + "<td>" + this.ambito + "</td>";
        return result;
    }
}