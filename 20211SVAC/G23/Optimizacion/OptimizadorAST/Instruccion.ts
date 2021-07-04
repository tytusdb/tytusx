
import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';
import { ReporteOptimizacion } from '../Reporte/ReporteOptimizacion';

export abstract class Instruccion {
    public abstract optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado;
    public abstract generarAugus(reporte: ReporteOptimizacion): string;

}