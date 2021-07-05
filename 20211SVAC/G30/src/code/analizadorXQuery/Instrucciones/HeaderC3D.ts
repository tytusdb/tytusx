import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
const { parse } = require('../../analizadorXPath/Xpath')
const grammar = require('../../analizadorXML/grammar')

export class HeaderC3D implements Instruccion {
    linea: number;
    columna: number;
    public cont_ini: number;
    public cont_fin: number;
    public code: string;

    constructor(linea: number, columna: number, cont_ini: number, cont_fin: number, code: string) {
        this.linea = linea;
        this.columna = columna;
        this.cont_ini = cont_ini;
        this.cont_fin = cont_fin;
        this.code = code;
    }

    ejecutar(ent: Entorno): any {

        var def_temp = '';
        var output = `/*------HEADER------*/\n#include <stdio.h>\n#include <math.h>\n\n
double heapxq[30101999];\ndouble stackxq[30101999];\ndouble PQ;\ndouble HQ;\ndouble `;


        for(let i = this.cont_ini; i < (this.cont_fin-1); i ++){
            def_temp += 't'+i+', ';
        }
        def_temp += 't'+(this.cont_fin-1)+';\n\n';

        output = output + def_temp + this.code;

        return output;

    }
    //obtener contador
    GetCountStorage(): number {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    }
    //actualizar contador
    SetStorage(contador: number) {
        localStorage.setItem('contador', JSON.stringify(contador));
    }


}