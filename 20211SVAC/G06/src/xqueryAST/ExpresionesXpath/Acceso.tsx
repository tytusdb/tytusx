import { Expression } from "../../Interfaces/Expresion";


export class Acceso {

    SP_id:number;
    SP_tipoAcceso:number;

    constructor (
    public line : Number,
    public column: Number,
    public id: string,
    public tipoAcceso: string,
    public predicados: Expression[],
    public tipoQuery ?: string ){
        this.SP_id = -1;
        this.SP_tipoAcceso = -1
    } 

    public GraficarAST(texto:string):string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.id.toString() + "\"];\n";
        for (const key in this.predicados) {
            texto = this.predicados[key].GraficarAST(texto);
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "-> nodo" + this.predicados[key].line.toString() + "_" + this.predicados[key].column.toString() + ";\n";
        }
        return texto;
    }

}