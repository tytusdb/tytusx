

export class Errores{

    texto:string;
    tipoError:string; 
    linea:number;
    columna:number;

    constructor (texto:string, tipoError:string,  linea:number, columna:number)
    {
        this.texto = texto;
        this.tipoError = tipoError;
        this.linea = linea;
        this.columna = columna;
    }
}