import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';
import { ReporteOptimizacion } from '../Reporte/ReporteOptimizacion';
import { AST } from './AST';
import { Instruccion } from './Instruccion';

export class GOTO extends Instruccion {
    public id: string;
    public linea: number;
    public columna: number;
    public ast: AST;

    public constructor(id: string, linea: number, columna: number){
        super();
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.ast = null;
    }

    public GOTO(id: string, linea: number, columna: number)
    {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.ast = null;
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado
    {
        let antes = this.generarAugus(reporte);
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(reporte: ReporteOptimizacion): string
    {
        let codigoAugus = "goto " + this.id + ";\n";
        return codigoAugus;
    }

}