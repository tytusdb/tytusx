import { Expresion } from '../OptimizadorAST/Expresion';
import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';

export class Primitivo extends Expresion{
    private valor: Object;

    public constructor(valor: object){
        super();
        this.valor = valor;
    }

    public optimizarCodigo(): OptimizacionResultado{
        let antes = this.generarAugus();
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(): string
    {
        return ""+this.valor;
    }

}