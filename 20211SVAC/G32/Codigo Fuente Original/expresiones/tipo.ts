import { Arreglo } from "./arreglo";


export const enum Tipo {
    STRING,
    INT,
    DOUBLE,
    BOOL,
    VOID,
    NULL,
    ARRAY
}

export function getTipo(valor: any): Tipo {
    if (typeof valor == 'string') {
        return Tipo.STRING;
    }
    else if (typeof valor == 'number') {
        return Tipo.INT;
    }
    else if (typeof valor == 'boolean') {
        return Tipo.BOOL;
    }
    else if (typeof valor == 'object') {
        return Tipo.ARRAY;
    }
    else if (valor == null) {
        return null;
    }
    return null;
}