export class Objeto_Optimizar
{
    tipo : string;
    regla: string; 
    eliminado: string; //codigo eliminado 
    nuevo: string; //codigo nuevo
    fila: number;

    constructor({tipo,regla,eliminado,nuevo,fila} : { tipo:string,regla: string, eliminado: string, nuevo: string, fila: number})
    {
        Object.assign(this, {tipo,regla,eliminado,nuevo,fila});
    }
}