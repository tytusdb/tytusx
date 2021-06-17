//Se llama al tipo primitivo para crear la lista
import { ValAscendente } from "./ValAscendente";

//La clase a exportar para el reporte gramatical ascendente del XML
export class RepGramDescXML 
{
    private static instance: RepGramDescXML;
    
    //Lista de objetos con las producciones y sus reglas (ValAsc = ValDesc)
    lista: ValAscendente[];

    private constructor() 
    {
        this.lista = [];
    }

    public static getInstance(): RepGramDescXML 
    {
        if (!RepGramDescXML.instance) 
        {
            RepGramDescXML.instance = new RepGramDescXML();
        }
        return RepGramDescXML.instance;
    }

    public push(valor: ValAscendente): void 
    {
        //unshift para agregar un dato al inicio
        //push para agregar un dato al final    
        this.lista.unshift(valor);
    }

    public clear(): void 
    {
        this.lista = [];
    }

    public hasProd(): boolean 
    {
        return this.lista.length > 0;
    }

    public getText(): ValAscendente[] 
    {
        return this.lista;
    }
}