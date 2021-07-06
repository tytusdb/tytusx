import { Tipos } from "../model/xpath/Enum";

export class Funcion {

    name: string;
    parametros: Array<Parametro>;
    sentencias: Array<any>;
    retorno: Tipos
    linea: number;
    columna: number;

    constructor(_name: string, _parametros: Array<any>, _sentencias: Array<any>, _retorno: Tipos, _linea: number, _columna: number) {
        this.name = _name;
        this.parametros = this.createParam(_parametros);
        this.sentencias = _sentencias;
        this.retorno = _retorno;
        this.linea = _linea;
        this.columna = _columna;
    }

    createParam(_params: Array<any>): Array<Parametro> {
        let parametros: Array<Parametro> = [];
        _params.forEach(param => {
            parametros.push(new Parametro(param.id.variable, param.tipado, param.linea, param.columna));
        });
        return parametros;
    }

}

class Parametro {

    id: string;
    tipado: Tipos;
    linea: number;
    columna: number;

    constructor(_id: string, _tipado: Tipos, _linea: number, _columna: number) {
        this.id = _id;
        this.tipado = _tipado;
        this.linea = _linea;
        this.columna = _columna;
    }

}
