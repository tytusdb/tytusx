import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';

export abstract class Expresion{
    public abstract optimizarCodigo(): OptimizacionResultado;
    public abstract generarAugus(): String;
}