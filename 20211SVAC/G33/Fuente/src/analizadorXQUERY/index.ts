import { NodoX } from './Expresiones/NodoX';
import { EjecucionXpath } from './Arbol/Ejecucion';
import { If } from './Instrucciones/If';
import { Retorno } from './Instrucciones/Retorno';
import { Aritmetica } from './Expresiones/Aritmetica';
import { Relacional } from './Expresiones/Relacional';
import { Tree } from './Simbolos/Tree';
import { Tipo, tipos, esEntero } from './Varios/Tipo';
import { Primitivo } from './Expresiones/Primitivo';
import { Error } from './Varios/Error';
import { Identificador } from './Expresiones/identificador';
import { Declaracion } from './Instrucciones/Declaracion';
import { DeclaracionMetodo } from './Instrucciones/DeclaracionMetodo';
import { LlamadaMetodo } from './Instrucciones/LlamadaMetodo';
import { Logico } from './Expresiones/Logico';
import { Table } from './Simbolos/Table';
import { NodoAST } from './Arbol/NodoAST';
import { Nodo } from './Arbol/Nodo';
import { Print } from './Instrucciones/Print';
import { Substrings } from './Expresiones/Substring';
import { ToLower } from './Expresiones/ToLower';
import { ToString } from './Expresiones/ToString';
import { ToUpper } from './Expresiones/uppercase';
import { ToNumber } from './Expresiones/ToNumber';
import { graphAST, graphCST } from './Varios/Graficar';
import { NodoCST } from './Arbol/NodoCST';
import { GramaticaBNF } from './Arbol/GramaticaBNF';
import { xml3D } from '../analizadorXML/Codigo3D/xml3D';

import * as gramatica from './GramaticaXquery';

interface retorno {
    errores: any,
    consola: any,
    ast: any,
    cst: any,
    tabla: any,
    bnf: any,
    salida3d: any
}

export class AnalizadorXquery {

    public ejecutarCodigo(entrada: string) {
        //entrada = `local:minPrice($/bookstore/book/price,$/bookstore/book/year)`
        //let arbol: Tree = gramatica.parse(entrada)

        let ret: retorno =  {
            errores: [], 
            consola: [],
            ast: "",
            cst: "",
            tabla: [],
            bnf: [],
            salida3d: []
        };

        try {
            const tree = gramatica.parse(entrada);
            const tabla = new Table(null);
        
            tree.instrucciones.map((m: any) => {
                try {
                    const res = m.execute(tabla, tree);
                } catch (error) {
                const error2 = new Error('Sintactico', `Irrecuperable`, 0, 0);
                    tree.consola.push(error2.toString());
                }
            });
        
            var init: NodoAST = new NodoAST("RAIZ");
            var instr: NodoAST = new NodoAST("INSTRUCCIONES");
            tree.instrucciones.map((m: Nodo) => {
                instr.agregarHijo(m.getNodo());
            });
            init.agregarHijo(instr);
        
            var init2: NodoCST = new NodoCST("RAIZ");
            var instr2: NodoCST = new NodoCST("INSTRUCCIONES");
            tree.instrucciones.map((m: Nodo) => {
                instr2.agregarHijo(m.getNodoCST());
            });
            init2.agregarHijo(instr2);

            ret.cst = graphCST(init2);
            ret.ast = graphAST(init);

            let bnfC = new GramaticaBNF(tree.produccion, tree.accion)
            let reporteBNF = bnfC.getBNFReport();

            let buscador = new xml3D();
            

            console.log(tree)
            ret.consola = tree.consola;
            ret.errores = tree.errores;
            ret.tabla = tree.Variables;
            ret.bnf = reporteBNF;
            ret.salida3d = tree.salida3d;
            ret.salida3d.push(buscador.generate3DDecla(tree.Variables))
        } catch (error) {
            let consola2 = new Array<String>();
            consola2.push(error);
            consola2.push("Ocurrio un Error sintactico Irrecuperable\n\n");
            consola2.push("                   FFFFFFFFFFFFFFF\n" +
                "                   FFFFFFFFFFFFFFF\n" +
                "                   FFFFFF\n" +
                "                   FFFFFF\n" +
                "                   FFFFFFFFFFFFFFF\n" +
                "                   FFFFFFFFFFFFFFF\n" +
                "                   FFFFFFF\n" +
                "                   FFFFFFF\n" +
                "                   FFFFFFF\n" +
                "                   FFFFFFF");
            
            ret.consola = consola2;
            ret.errores = [];
        }
        return ret
    }
}