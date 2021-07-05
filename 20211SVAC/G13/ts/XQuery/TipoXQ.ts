export class TipoXQ {
    tipo:EnumTipo;

    constructor(tipo:EnumTipo) {
        this.tipo = tipo;
    }    
}

export enum EnumTipo {
    entero, caracter, booleano, 
    doble, cadena, error, tvoid, nulo,
    XPath, sequence, defecto, funcion
}