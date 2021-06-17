import { AST } from './AST/AST';
import { CST } from './AST/CST';
import { Entorno } from './AST/Entorno';
import { GramaticaBNF } from './AST/GramaticaBNF';
import { TablaSimbolos } from './AST/TablaSimbolos';
import { SalidaGramatica } from './AST/SalidaGramatica';

import * as gramatica from './Gramatica/gramaticaDesc';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { emitWarning } from 'process';

interface retorno {
    tablaRep: any,
    bnfRep: any,
    cstRep: any,
    encoding: any,
    objetos: any
}

export class AnalizadorASCXML  {

    public ejecutarCodigo(entrada: string): retorno {
        const tabla: TablaSimbolos = new TablaSimbolos();
        const salidaG = gramatica.parse(entrada);
        const arbolCST = new CST(salidaG.objetos);

        // TABLA SIMBOLOS
        let reporteTabla = tabla.generarReporteTablaObjetos(salidaG.objetos); 
        // BNF
        let gramBnf = new GramaticaBNF(salidaG.reporteBNF, salidaG.reporteBNF2);
        let reporteBNF = gramBnf.getBNFReport();
        // DOT CST
        let reporteCST = arbolCST.generarArbolCST(salidaG.objetos); 

        let ret: retorno = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST,
            encoding: salidaG.encoding,
            objetos: salidaG.objetos
        };

        return ret;
    }
}