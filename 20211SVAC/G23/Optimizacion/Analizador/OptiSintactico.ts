import { Nodo } from "../AST/Node";
import { Optimizador } from "./Optimizador";

export class OptiSintactico {

//converti el metodo en funcion para que devolviera algo

    public static optimizarC3D(texto: string, arbol: Nodo):string {
        let optimizador = new Optimizador();
        optimizador.inicializar();
        let salida = optimizador.optimizar(texto, arbol);
        optimizador.reportar();
        return salida;
    }

}