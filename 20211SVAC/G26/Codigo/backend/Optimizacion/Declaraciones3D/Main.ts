import { Instruccion3D } from "../Instrucciones3D/Instruccion3D";
import { Declaracion3D, TipoDeclaracion3D } from "./Declaracion3D";


export class Main implements Declaracion3D{
    fila: number;
    columna: number;
    tipo: TipoDeclaracion3D;
    codigo3Dir: string;
    listaInstrucciones: Array<Instruccion3D>;
    constructor(tipo: TipoDeclaracion3D, listaInstrucciones: Array<Instruccion3D>, codigo3D: string, fila: number, columna: number){
        this.fila = fila;
        this.codigo3Dir = codigo3D;
        this.columna = columna;
        this.tipo = tipo;
        this.listaInstrucciones = listaInstrucciones;
    }

    getCodigo3Dir(): string{
        let auxCode = "void main() {\n"
        this.listaInstrucciones.forEach((instruccion: Instruccion3D) =>{
            auxCode += "    "+instruccion.getCodigo3D()+"\n";
        });
        auxCode += "}"
        return auxCode;
    }

    setCodigo3Dir(codigo: string): void{
        this.codigo3Dir = codigo;
    }    

    optimizar(){
        return "";
    }

}