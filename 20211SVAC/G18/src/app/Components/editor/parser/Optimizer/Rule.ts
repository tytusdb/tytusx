export class Rule {

    constructor(private linea: number, private tipo: string, private regla: string, private eliminado: string, private agregado: string) {
    }

    htmlRow() : string {
        let result = "<td>"+this.linea+"</td>";
        result += "<td>"+this.tipo+"</td>";
        result += "<td>"+this.regla+"</td>";
        result += "<td>"+this.agregado+"</td>";
        result += "<td>"+this.eliminado+"</td>";
        return result;
    }
}