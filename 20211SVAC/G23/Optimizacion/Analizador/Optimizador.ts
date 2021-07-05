import { Nodo } from "../AST/Node";
import { Etiqueta } from "../OptimizadorAST/Etiqueta";
import { ReporteOptimizacion } from "../Reporte/ReporteOptimizacion";
import { GeneradorOptiAST } from "./GeneradorOptiAST";
import { AST } from "../OptimizadorAST/AST";


export class Optimizador{
    public codigoOptimizado: string;
    public codigoAnterior: string;
    public instrucciones = new Array<Etiqueta>();
    public reporte = new ReporteOptimizacion();

    public constructor(){
        this.codigoOptimizado = "";
        this.codigoAnterior = "";
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

        for(let a = 0; a < funciones.length; a++){
            codInstrucciones = "";
            let instrucciones = funciones[a].instrucciones;
            this.instrucciones = instrucciones;
            let ast = new AST(this.instrucciones);
            //PRIMERA PASADA: PARA GUARDAR TODAS LAS ETIQUETAS
            if(instrucciones != null) {
                for(let i = 0; i < instrucciones.length; i++){
                    ast.agregarEtiqueta(instrucciones[i]);
                }
            }

            //SEGUNDA PASADA: OPTIMIZAMOS
            if(instrucciones != null) {
                for(let i = 0; i < instrucciones.length; i++){
                    if(ast.etiquetasBetadas.includes(instrucciones[i].id)) continue;
                    codInstrucciones += instrucciones[i].optimizarCodigoo(this.reporte, ast, aplicaBloques);
                }
            }
            codFuncion = "void " + funciones[a].nombre + "(){\n" + codInstrucciones + "}\n\n";
            this.codigoOptimizado += codFuncion;
        }
        return this.codigoOptimizado;
    }

    public reportar() {
        this.reporte.generarReporteOptimizacion();
    }
}