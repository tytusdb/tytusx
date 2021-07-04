
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar') 

export class GeneradorC3D {
    linea: number;
    columna: number;
    public path: any;
    public identificador: string;

    constructor(linea: number, columna: number, path: any, identificador: string) {
       
    }

    ejecutar(ent) {
    
    }

    SetStorage(data: any, id:string ) {
        localStorage.setItem(id, JSON.stringify(data));
    }

    GetStorage(id: string): any {
        var data = localStorage.getItem(id);
        return JSON.parse(data);
    }

}