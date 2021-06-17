export class Error_{
    
    constructor(private linea : number, private columna: number, private tipo : string, private mensaje : string){

    }

    getLinea() { return this.linea }
    getColumna() { return this.columna }
    getTipo() { return this.tipo }
    getDescripcion() { return this.mensaje }

    htmlRow() : string {
        let result = "<td>"+this.tipo+"</td>";
        result += "<td>"+this.mensaje+"</td>";
        result += "<td>"+this.linea+"</td>";
        result += "<td>"+this.columna+"</td>";
        return result;
    }
}