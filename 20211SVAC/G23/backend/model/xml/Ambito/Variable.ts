import { Contexto } from "../../../controller/Contexto";
import { Tipos } from "../../xpath/Enum";

export class Variable {

    id: string;
    tipo: Tipos;
    linea: number;
    columna: number;
    entorno: string;
    contexto?: Contexto;
    valor?: any;

    constructor(_id: string, _tipo: Tipos, _linea?: number, _columna?: number, _entorno?: string) {
        this.id = _id;
        this.tipo = _tipo;
        this.linea = _linea ? _linea : 1;
        this.columna = _columna ? _columna : 1;
        this.entorno = _entorno ? _entorno : "global";
    }

    setValue(_obj: any) {
        if (_obj.constructor.name === "Contexto") {
            this.contexto = _obj;
        }
        else {
            this.valor = _obj;
        }
    }

}