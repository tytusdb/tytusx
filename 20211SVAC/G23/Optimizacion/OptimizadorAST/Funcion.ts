import { Etiqueta } from './Etiqueta';

export class Funcion
{
    public nombre: String;
    public instrucciones: Array<Etiqueta>;

    public constructor(nombre: string,instrucciones: Array<Etiqueta>){
        this.nombre = nombre;
        this.instrucciones = instrucciones;
    }

    public Funcion(nombre: string,instrucciones: Array<Etiqueta>) {
        this.nombre = nombre;
        this.instrucciones = instrucciones;
    }
}