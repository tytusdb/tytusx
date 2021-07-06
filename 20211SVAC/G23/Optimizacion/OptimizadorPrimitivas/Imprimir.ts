import { Instruccion } from "../OptimizadorAST/Instruccion";
import { OptimizacionResultado } from "../Reporte/OptimizacionResultado";
import { Operacion } from "../OptimizadorValorImplicito/Operacion";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";

export class Imprimir extends Instruccion {
    public cad: Operacion;
    public cadena: string;
    public linea: number;
    public columna: number;

    public constructor(cad: Operacion, cadena: string, linea: number, columna: number){
        super()
        this.cad = cad;
        this.cadena = cadena;
        this.linea = linea;
        this.columna = columna;
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado {
        let antes = this.generarAugus(reporte);
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(reporte: ReporteOptimizacion): string {
        let codigoAugus = "printf(" +this.cadena + "," + this.cad.generarAugus() + ");\n";
        return codigoAugus;
    }

    
}