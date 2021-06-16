export class ClaseError{
    tipo:string;
    error:string;
    linea: number;
    columna: number;

    constructor(tipo:string, error:string, linea:number, columna:number){
        this.tipo = tipo;
        this.error = error;
        this.linea = linea;
        this.columna = columna;
    }

}

export function crearTextoReporteErrorXML(listaErr:Array<ClaseError>,texto:string) {
    texto += "node0[shape=record label=\"{Tipo";
    for (const key in listaErr) {
        texto += "|" + listaErr[key].tipo;
    }
    texto += "}|{Linea";
    for (const key in listaErr) {
        texto += "|" + listaErr[key].linea;
    }
    texto += "}|{Columna";
    for (const key in listaErr) {
        texto += "|" + listaErr[key].columna;
    }
    texto += "}|{Descripcion";
    for (const key in listaErr) {
        texto += "|" + listaErr[key].error;
    }
    
    texto += "}\"];";
    return texto;
}