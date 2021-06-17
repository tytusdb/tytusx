export enum Type {
    NUMBER = 0,
    STRING = 1,
    BOOLEAN = 2,
    NULL = 3,
    ARRAY = 4,
    RESERVADA = 5,
    TEMPLATE = 6,
    STRUCT = 7,
    FUNCION = 8,
    FLOAT = 9
}

export type Retorno = {
    value: any,
    type: Type
}

export function getTypeName(tipo: Type) {
    switch (tipo) {
        case 0: return "Numero";
        case 1: return "String";
        case 2: return "Booleano";
        case 3: return "Nulo";
        case 4: return "Arreglo";
        case 5: return "Reservada";
        case 6: return "Plantilla de Texto";
        case 7: return "Struct";
        case 8: return "Funcion";
        case 9: return "Float";
    }
}