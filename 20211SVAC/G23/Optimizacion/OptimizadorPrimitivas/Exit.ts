import { Instruccion } from "../OptimizadorAST/Instruccion";
import { OptimizacionResultado } from "../Reporte/OptimizacionResultado";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";

export class Exit extends Instruccion {
    
    public constructor(){
        super();
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado {
        let antes = this.generarAugus(reporte);
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(reporte: ReporteOptimizacion): string {
        let codigoAugus = "return;\n";
        return codigoAugus;
    }

}