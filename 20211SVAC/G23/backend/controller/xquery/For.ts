import { Element } from "../../model/xml/Element";
import { Atributo } from "../../model/xml/Atributo";
import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import Bloque from "../xpath/Instruccion/Bloque";
import { Tipos } from "../../model/xpath/Enum";
import { Variable } from "../../model/xml/Ambito/Variable";
import returnQuery from "./Return";
import WhereClause from "./Where";


function ForLoop(_instruccion: any, _ambito: Ambito, _contexto: any) {
    // console.log(_instruccion, 'instrucciones For')
    let contexto: any = (_contexto.elementos) ? (_contexto.elementos) : null;
    let declaracion = _instruccion.cuerpo;
    // console.log(declaracion, 444)
    let iterators: Array<any> = [];
    declaracion.forEach((_declaracion: any) => {
        let it = Expresion(_declaracion, _ambito, _contexto);
        iterators = iterators.concat(it);
    });
    for (let i = 0; i < _instruccion.instrucciones.length; i++) {
        const instr = _instruccion.instrucciones[i];
        // if (!Array.isArray(instr.expresion)) {
        //     instr.expresion = [instr.expresion];
        // }
        if (instr.tipo === Tipos.WHERE_CONDITION) {
            let filter = WhereClause(instr.condiciones, _ambito, iterators); //, contexto
            if (filter) iterators = filter;
            else iterators = [];
        }
        if (instr.tipo === Tipos.RETURN_STATEMENT) {
            // console.log(iterators[0].iterators,33333);
            return returnQuery(instr.expresion, _ambito, iterators) //, contexto);
        }
    }























    if (_instruccion.where) {
        // Filtrar los elementos de cada variable
    }

    if (_instruccion.orderby) {
        // Ordenar los elementos según los parámetros
    }

    if (_instruccion.return) {
        // let retorno = Expresion()
    }

}

export = ForLoop;