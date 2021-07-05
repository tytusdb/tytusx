import { Objeto_Optimizar } from "./Objeto_Optimizar";

export class Rep_Optimizar
{
    private static instance: Rep_Optimizar;
    
    lista: Objeto_Optimizar[]; 

    private constructor() 
    {
        this.lista = [];
    }

    public static getInstance(): Rep_Optimizar
    {
        if (!Rep_Optimizar.instance) 
        {
            Rep_Optimizar.instance = new Rep_Optimizar();
        }
        return Rep_Optimizar.instance;
    }

    public push(valor: Objeto_Optimizar): void 
    {
        //unshift para agregar un dato al inicio
        //push para agregar un dato al final    
        this.lista.push(valor);
    }

    public clear(): void 
    {
        this.lista = [];
    }

    public hasProd(): boolean 
    {
        return this.lista.length > 0;
    }

    public getText(): Objeto_Optimizar[] 
    {
        return this.lista;
    }
}