import { Expression } from "../../Interfaces/Expresion";


export class Acceso {

    public tipoQuery : string;
    constructor (
    public line : Number,
    public column: Number,
    public id: string,
    public tipoAcceso: string,
    public predicados: Expression[]){
        this.tipoQuery= "";
    } 

    public setipoQuery(tipo: string){
        this.tipoQuery = tipo;
    }

    

}