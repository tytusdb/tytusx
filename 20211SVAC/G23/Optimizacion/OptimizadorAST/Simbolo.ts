import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';
import { Expresion } from './Expresion';

export class Simbolo extends Expresion{
    private id: string;
    private linea: number;
    private columna: number;

    public constructor(id: string, linea: number, columna: number){
        super();
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }

    public optimizarCodigo(): OptimizacionResultado
    {
        let antes = this.generarAugus();
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(): string
    {
        return this.id;
    }
}