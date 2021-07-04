import { Expresion3D, TipoExpresion3D } from "../Expresiones3D/Expresion3D";
import { Operacion3D, TipoOperacion3D } from "../Expresiones3D/Operacion3D";
import { Goto3D } from "./Goto3D";
import { Instruccion3D, TipoInstruccion3D } from "./Instruccion3D";


export class If3D implements Instruccion3D{
    fila: number;
    columna: number;
    tipo: TipoInstruccion3D;
    codigo3D: string;
    condicion: Expresion3D
    gotoEtiqueta: Goto3D;
    eliminada: boolean;
    optimizada: boolean;
    constructor(tipo: TipoInstruccion3D, condicion: Expresion3D, gotoEtiqueta: Goto3D, codigo3d: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo
        this.codigo3D = codigo3d;
        this.condicion = condicion;
        this.gotoEtiqueta = gotoEtiqueta;
        this.eliminada = false;
        this.optimizada = false;
    }

    isOptimizada(): boolean{
        return this.optimizada;
    }

    setOptimizada(optimizada: boolean){
        this.optimizada = optimizada;
    }
    isEliminada(): boolean {
        return this.eliminada;
    }

    setEliminada(eliminada: boolean){
        this.eliminada = eliminada;
    }
    
    getTipoInstruccion(): TipoInstruccion3D{
        return this.tipo;
    }

    negarCondicion(): Expresion3D | undefined{
        if(this.condicion instanceof Operacion3D){
            let negada = this.condicion.negarCondicion();
            if(negada){
                let x = new Operacion3D(TipoExpresion3D.OPERACION, negada, this.condicion.op_izq, this.condicion.op_der, this.condicion.codigo3D, -1, -1 );
                let y = Object.create(x)
                this.condicion = Object.create(y);
                return y
            }
        }
    }

    setCodigo3D(codigo: string): void{
        this.codigo3D = codigo;
    }

    getCodigo3D(): string{
        this.codigo3D = "if ("+this.condicion.getCodigo3D()+")";
        this.codigo3D += " "+this.gotoEtiqueta.getCodigo3D();
        return this.codigo3D;
    }
}
