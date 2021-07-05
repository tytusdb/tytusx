import { Instruccion } from '../OptimizadorAST/Instruccion'
import { ReporteOptimizacion } from '../Reporte/ReporteOptimizacion';
import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';
import { Asignacion } from '../OptimizadorValorImplicito/Asignacion';
import { OPtimizacion } from '../Reporte/OPtimizacion';
import { AST } from './AST';
import { GOTO } from './GOTO';
import { If } from '../OptimizadorCondicional/If';

export class Etiqueta extends Instruccion {

    public id: string;
    public instrucciones: Array<Instruccion>;
    public linea: number;
    public columna: number;
    public codigoOptimizado: string;
    public imprimirEtiqueta: boolean;

    public constructor(id: string, instrucciones: Array<Instruccion>, linea: number, columna: number){
        super();
        this.id = id;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
        this.codigoOptimizado = "";
        this.imprimirEtiqueta = true;
    }

    private traducirCodigo(reporte: ReporteOptimizacion, ast: AST, instrucciones: Array<Instruccion>, aplicaBloque: boolean) {
        let contador = 0;
        let codigoOptimizado = "";
        let instruccionAnterior: Instruccion;
        let asignacionPrevia: Asignacion;
        let codigoAnterior = "";

        for (let Element of instrucciones){
            if(Element instanceof Asignacion) {
                let asig = Element as Asignacion;
                asig.instruccionPrevia = asignacionPrevia;
                asignacionPrevia = Element as Asignacion; 
            }
            else if(Element instanceof GOTO) {
                let insgoto = Element as GOTO;
                insgoto.ast = ast;
            }
            else if(Element instanceof If) {
                let insif = Element as If;
                for(let i = contador+1; i < this.instrucciones.length; i++)
                {
                    insif.instrucciones.push(this.instrucciones[i]);
                }
            }

            let optimizado = "";
            if(Element instanceof If) {
                let insif = Element as If;
                insif.ast = ast; //necesario antes de optimizar cada if
                optimizado = insif.optimizarCodigo(reporte).codigo;
            }
            else
            {
                if(instruccionAnterior instanceof If && Element instanceof GOTO)
                {
                    let antif = instruccionAnterior as If;
                    if(!antif.seAplicoRegla3) optimizado = Element.optimizarCodigo(reporte).codigo;
                } else optimizado = Element.optimizarCodigo(reporte).codigo; 
            }

            //Regla 2 Mirilla
            if(Element instanceof GOTO)
            {
                if (codigoAnterior.startsWith("goto"))
                {
                    if(instruccionAnterior instanceof If)
                    {
                        codigoAnterior = "";
                        continue;
                    }
                }
                let insgoto = Element as GOTO;
                if (ast.existeEtiqueta(insgoto.id))
                {
                    if (optimizado != "")
                    {
                        codigoOptimizado += "   " + optimizado;
                        codigoAnterior = optimizado;
                    }
                    if ((contador + 1) == this.instrucciones.length) continue; //si no existen mas instrucciones no hay optimizacion
                    let optimizacion = new OPtimizacion(); //si hay optimizacion
                    optimizacion.linea = "" + (insgoto.linea + 1);
                    let codigoOptimizar = "";
                    for (let i = contador + 1; i < this.instrucciones.length; i++) {
                        let instruccion = this.instrucciones[i];
                        if (instruccion instanceof GOTO) {
                            let mygoto = instruccion as GOTO;
                            mygoto.ast = ast;
                        }
                        else if (instruccion instanceof If) continue;
                        codigoOptimizar += instruccion.optimizarCodigo(reporte).codigo;
                    }
                    optimizacion.antes = codigoOptimizar;
                    optimizacion.despues = insgoto.id + ":\n";
                    optimizacion.regla = "Regla 1";
                    optimizacion.tipo = "Mirilla - Eliminación de Código Inalcanzable";
                    reporte.agregarOpt(optimizacion);
                    codigoAnterior = "";
                    break;
                } else {
                    if (optimizado != "") {
                        codigoOptimizado += "   " + optimizado;
                        codigoAnterior = optimizado;
                    }
                }
            } else {
                if (optimizado != "") {
                    codigoOptimizado += "   " + optimizado;
                    codigoAnterior = optimizado;
                }
            }
            instruccionAnterior = Element;
            contador++;
        }
        //(Instruccion ins in instrucciones) 

        return codigoOptimizado;
    }

    public optimizarCodigoo(reporte: ReporteOptimizacion, ast: AST, aplicaBloque = false): string
    {
        this.codigoOptimizado = "";
        if (this.imprimirEtiqueta) this.codigoOptimizado += this.id + ":\n";
        let strResultado = this.traducirCodigo(reporte,ast,this.instrucciones,aplicaBloque);
        this.codigoOptimizado += strResultado;
        return this.codigoOptimizado;
    }

    public optimizarCodigo(reporte: ReporteOptimizacion): OptimizacionResultado{
        return null;
    }

    public generarAugus(reporte: ReporteOptimizacion): string {
        return "";
    }
}