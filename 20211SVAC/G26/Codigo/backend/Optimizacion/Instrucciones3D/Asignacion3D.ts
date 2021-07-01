import { Expresion3D } from "../Expresiones3D/Expresion3D";
import { Instruccion3D, TipoInstruccion3D } from "./Instruccion3D";


export class Asignacion3D implements Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    identificador: string
    expresion: Expresion3D
    constructor(tipo: TipoInstruccion3D, identificador: string, expresion: Expresion3D, codigo3d: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo
        this.codigo3D = codigo3d;
        this.expresion = expresion;
        this.identificador = identificador;
    }
    

    getTipoInstruccion(): TipoInstruccion3D{
        return this.tipo;
    }

    setCodigo3D(codigo: string): void{
        this.codigo3D = codigo;
    }

    getCodigo3D(): string{
        if(this.tipo === TipoInstruccion3D.ASIGNORMAL){
            this.codigo3D = this.identificador + " = "+ this.expresion.getCodigo3D()+";"
        }
        return this.codigo3D;
    }
}
