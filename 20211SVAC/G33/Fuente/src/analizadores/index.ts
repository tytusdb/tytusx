import { SalidaGramatica } from './AST/SalidaGramatica';
import { Nodo } from './Expresiones/Nodo';
import { GramaticaBNF } from './AST/GramaticaBNF';
import { Arbol } from './AST/Arbol';
import { ListaErrores } from './Errores/ListaErrores';
import Primitivo from './Expresiones/Primitivo';
import Aritmetica from './Operaciones/Aritmeticas';
import Relacional from './Operaciones/Relacional';
import Logica from './Operaciones/Logica';

import * as gramatica from './xpathAsc';

interface retorno {
    objetos: Nodo[],
    bnfRep: any,
    astRep: any,
    cstRep: any,
    ejecutado: any,
    errores: any
}

export class AnalizadosAscXpath {
    
    public ejecutarCodigo(entrada: string): retorno {

        const salidaG = gramatica.parse(entrada);
        const gramBnf = new GramaticaBNF(salidaG.reporteBNF, salidaG.reporteBNF2);
        const arbol = new Arbol(salidaG.objetos);
        const Listaerrores = new ListaErrores();

        console.log(salidaG.objetos)

        let reporteBNF = gramBnf.getBNFReport();
        let reporteAST = arbol.crearGrafoAST();
        let reporteCST = arbol.crearGrafoCST();
        let resultado = arbol.ejecutarArbol();
        //Errores
        let errores = Listaerrores.generateHtmlBody(salidaG.reportError, []);

        return {
            objetos: salidaG.objetos,
            bnfRep: reporteBNF,
            astRep: reporteAST,
            cstRep: reporteCST,
            ejecutado: resultado,
            errores: errores
        };
    }
}