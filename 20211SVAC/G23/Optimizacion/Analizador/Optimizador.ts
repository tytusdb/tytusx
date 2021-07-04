import { Nodo } from "../AST/Node";
import { Etiqueta } from "../OptimizadorAST/Etiqueta";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";
import { GeneradorOptiAST } from "./GeneradorOptiAST";
import { AST } from "../OptimizadorAST/AST";


export class Optimizador{
    public codigoOptimizado: string;
    public codigoAnterior: string;
    public instrucciones: Array<Etiqueta>;
    public reporte: ReporteOptimizacion;

    public constructor(){
        this.codigoOptimizado = "";
        this.codigoAnterior = "";
        this.instrucciones = null;
        this.reporte = null;
    }

    public inicializar() {
        this.reporte = new ReporteOptimizacion();
        this.codigoOptimizado = "";
        this.codigoAnterior = "";
        this.instrucciones = new Array<Etiqueta>();
    }

    public optimizar(texto: string, arbol: Nodo, aplicaBloques: boolean = false): string {
        let codFuncion = ""; //mi variable
        let codInstrucciones = ""; //mi variable
        this.codigoAnterior = texto;
        this.codigoOptimizado = "";
        let migenerador = new GeneradorOptiAST(arbol);
        let funciones = migenerador.funciones;
        this.codigoOptimizado += migenerador.head;
        for(let funcion of funciones) {
            codInstrucciones = "";
            let instrucciones = funcion.instrucciones;
            this.instrucciones = instrucciones;
            let ast = new AST(this.instrucciones);
            //PRIMERA PASADA: PARA GUARDAR TODAS LAS ETIQUETAS
            if(instrucciones != null) {
                for(let ins of instrucciones) {
                    ast.agregarEtiqueta(ins);
                }
            }

            //SEGUNDA PASADA: OPTIMIZAMOS
            if(instrucciones != null)
            {
                for(let func of instrucciones) {
                    if (ast.etiquetasBetadas.includes(func.id)) continue;
                    codInstrucciones += func.optimizarCodigoo(this.reporte, ast, aplicaBloques);
                }
            }
            codFuncion = "void " + funcion.nombre + "(){\n" + codInstrucciones + "}\n\n";
            this.codigoOptimizado += codFuncion;
        }
        return this.codigoOptimizado;
    }

    public reportar() {
        this.reporte.generarReporteOptimizacion();
    }
}