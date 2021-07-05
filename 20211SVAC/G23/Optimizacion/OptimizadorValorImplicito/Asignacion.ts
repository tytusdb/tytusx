import { Operacion, TIPO_OPERACION } from "./Operacion";
import { Instruccion } from "../OptimizadorAST/Instruccion";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";
import { OptimizacionResultado } from "../Reporte/OptimizacionResultado";
import { OPtimizacion } from "../Reporte/OPtimizacion";


export class Asignacion extends Instruccion{
    private linea: number;
    private columna: number;
    private id: string;
    private valor: Operacion;
    public instruccionPrevia: Asignacion;

    public constructor(id: string, valor: Operacion, linea: number, columna: number){
        super();
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.valor = valor;
        this.instruccionPrevia = null;
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado {
        let antes = this.generarAugus(reporte);
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(reporte: ReporteOptimizacion): string {
        let codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";
        let optimizacion = new OPtimizacion();
        optimizacion.linea = "" + (this.linea + 1);
        optimizacion.antes = codigoAugus;
        optimizacion.tipo = "Mirilla - Simplificación algebraica y por fuerza";

        if(this.valor.tipo == TIPO_OPERACION.SUMA)
        {
            if (this.valor.validarRegla8(this.id))
            {
                optimizacion.regla = "Regla 6";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            } else if (this.valor.validarRegla12() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla12() + ";\n";
                optimizacion.regla = "Regla 10";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if(this.valor.tipo == TIPO_OPERACION.RESTA)
        {
            if (this.valor.validarRegla9(this.id))
            {
                optimizacion.regla = "Regla 7";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla13() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla13() + ";\n";
                optimizacion.regla = "Regla 11";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if(this.valor.tipo == TIPO_OPERACION.MULTIPLICACION)
        {
            if (this.valor.validarRegla10(this.id))
            {
                optimizacion.regla = "Regla 8";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            } else if (this.valor.validarRegla14() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla14() + ";\n";
                optimizacion.regla = "Regla 12";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
            else if (this.valor.validarRegla16() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla16() + ";\n";
                optimizacion.regla = "Regla 14";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
            else if (this.valor.validarRegla17() == "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla17() + ";\n";
                optimizacion.regla = "Regla 15";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        } 
        else if(this.valor.tipo == TIPO_OPERACION.DIVISION)
        {
            if (this.valor.validarRegla11(this.id))
            {
                optimizacion.regla = "Regla 9";
                optimizacion.despues = "";
                reporte.agregarOpt(optimizacion);
                return "";
            }
            else if (this.valor.validarRegla15() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla15() + ";\n";
                optimizacion.regla = "Regla 13";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            } else if (this.valor.validarRegla18() != "")
            {
                codigoAugus = this.id + " = " + this.valor.validarRegla18() + ";\n";
                optimizacion.regla = "Regla 16";
                optimizacion.despues = codigoAugus;
                reporte.agregarOpt(optimizacion);
            }
        }
        else if (this.valor.tipo == TIPO_OPERACION.ID)
        {
            codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";
            if (this.instruccionPrevia != null)
            {
                if(this.instruccionPrevia.valor.tipo == TIPO_OPERACION.ID)
                {
                    //MI REGLA 5 Revisar estas reglas en caso de...
                    let varA = this.id as unknown as object;
                    let varB = this.instruccionPrevia.id as unknown as object
                    if (this.valor.validarRegla1(varA, this.valor.valor, varB, this.instruccionPrevia.valor.valor))
                    {
                        optimizacion.tipo = "Mirilla - Eliminación de Instrucciones Redundantes y de Almacenamiento";
                        optimizacion.regla = "Regla 5";
                        optimizacion.despues = "";
                        reporte.agregarOpt(optimizacion);
                        return "";
                    }
                }
            }
        }
        else codigoAugus = this.id + " = " + this.valor.generarAugus() + ";\n";

        return codigoAugus;
        
    }


}