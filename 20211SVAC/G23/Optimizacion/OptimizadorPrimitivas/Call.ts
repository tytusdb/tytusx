import { Instruccion } from "../OptimizadorAST/Instruccion";
import { OptimizacionResultado } from "../Reporte/OptimizacionResultado";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";

export class Call extends Instruccion {
    private id: string;

    public constructor(id: string){
        super();
        this.id = id;
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado {
        let antes = this.generarAugus(reporte);
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(reporte: ReporteOptimizacion): string {
        let codigoAugus = this.id + "();\n";
        return codigoAugus;
    }

    
}