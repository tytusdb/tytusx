import { Instruccion } from "../OptimizadorAST/Instruccion";
import { OptimizacionResultado } from "../Reporte/OptimizacionResultado";
import { OPtimizacion } from "../Reporte/OPtimizacion";
import { Operacion, TIPO_OPERACION } from "../OptimizadorValorImplicito/Operacion";
import { AST } from "../OptimizadorAST/AST";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";
import { GOTO } from "../OptimizadorAST/GOTO";
import { Etiqueta } from "../OptimizadorAST/Etiqueta";

export class If extends Instruccion {
    private condicion: Operacion;
    private etiqueta: string;
    private linea: number;
    private columna: number;
    public instrucciones: Array<Instruccion>;
    public ast: AST;
    public seAplicoRegla3: boolean;

    public constructor(condicion: Operacion, etiqueta:string, linea: number, columna: number){
        super();
        this.condicion = condicion;
        this.etiqueta = etiqueta;
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = new Array<Instruccion>();
        this.ast = null;
        this.seAplicoRegla3 = false;
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
        let codigoAugus = "if(" + this.condicion.generarAugus() + ") goto " + this.etiqueta + ";\n";
        let optimizacion = new OPtimizacion();
        optimizacion.linea = ""+(this.linea+1);
        optimizacion.antes = codigoAugus;
        optimizacion.tipo = "Mirilla - Eliminación de Codigo Inalcanzable";

        if(this.condicion.tipo == TIPO_OPERACION.IGUAL_IGUAL)
        {
            if (this.condicion.validarRegla4())
            {
                optimizacion.regla = "Regla 3";
                optimizacion.despues = "goto " + this.etiqueta + ";";
                reporte.agregarOpt(optimizacion);
                codigoAugus = "goto " + this.etiqueta + ";\n";
            }
            else if (this.condicion.validarRegla5())
            {
                optimizacion.regla = "Regla 4";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
        }

        try
        {
            if (codigoAugus.startsWith("if"))
            {
                if (this.instrucciones.length > 0)
                {
                    if(this.instrucciones[0] instanceof GOTO) //validamos que la siguiente instruccion sea un goto
                    {
                        let condicionNueva = this.condicion.invertirCondicion();

                        if(condicionNueva != this.condicion.generarAugus()) //si la condicion si cambio se hace la optimizacion
                        {
                            let etiquetaFalse = this.instrucciones[0] as unknown as GOTO;
                            let etiquetaTrue = this.ast.obtenerEtiqueta(this.etiqueta);

                            let codigoOptimizar = codigoAugus;
                            codigoOptimizar += "goto " + etiquetaFalse.id + ";\n";
                            codigoOptimizar += etiquetaTrue.id + ":\n";
                            codigoOptimizar += "[instrucciones_" + etiquetaTrue.id + "]\n";
                            codigoOptimizar += etiquetaFalse.id + ":\n";
                            codigoOptimizar += "[instrucciones_" + etiquetaFalse.id + "]\n";

                            codigoAugus = "if(" + condicionNueva + ") goto " + etiquetaFalse.id + ";\n";
                            let codigoOptimizado = codigoAugus;
                            codigoOptimizado += "[instrucciones_" + etiquetaTrue.id + "]\n";
                            codigoOptimizado += etiquetaFalse.id + ":\n";
                            codigoOptimizado += "[instrucciones_" + etiquetaFalse.id + "]\n";

                            optimizacion.antes = codigoOptimizar;
                            optimizacion.despues = codigoOptimizado;
                            optimizacion.regla = "Regla 2";
                            optimizacion.tipo = "Mirilla - Eliminación de Código Inalcanzable";
                            reporte.agregarOpt(optimizacion);
                            this.seAplicoRegla3 = true;
                            etiquetaTrue.imprimirEtiqueta = false;
                            //etiquetaTrue.ast = ast;
                            codigoAugus += etiquetaTrue.optimizarCodigoo(reporte, this.ast);

                            this.ast.etiquetasBetadas.push(etiquetaTrue.id);
                        }
                    }
                }
            }
        } catch(Exception)
        {
            return null;
        }
        return codigoAugus;
    }

    
}