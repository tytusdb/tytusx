import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import { Tipos } from "../../model/xpath/Enum";
import WhereClause from "./Where";
import OrderBy from "./OrderBy";
import returnQuery from "./Return";
import { Contexto } from "../Contexto";
import LetClause from "./Let";
import IfConditional from "./If";

function ForLoop(_instruccion: any, _ambito: Ambito, _contexto: Contexto) {
    // console.log(_instruccion, 'instrucciones For')
    let declaracion = _instruccion.cuerpo;
    let iterators: Array<Contexto> = [];
    declaracion.forEach((_declaracion: any) => {
        let it = Expresion(_declaracion, _ambito, _contexto);
        iterators = iterators.concat(it);
    });
    for (let i = 0; i < _instruccion.instrucciones.length; i++) {
        const instr = _instruccion.instrucciones[i];
        if (instr.tipo === Tipos.LET_CLAUSE) { // Declara una variable y la almacena de primero en el ámbito
            LetClause(instr.id, instr.valor, _ambito, _contexto);
        }
        if (instr.tipo === Tipos.WHERE_CONDITION) { // Filtrar los elementos de cada variable
            iterators = WhereClause(instr.condiciones, _ambito, iterators);
        }
        if (instr.tipo === Tipos.ORDER_BY_CLAUSE) { // Ordenar los elementos según los parámetros
            let filter = OrderBy(instr.ordenes, _ambito, iterators);
            if (filter.length > 0) iterators = filter;
        }
        if (instr.tipo === Tipos.IF_THEN_ELSE) { // En caso venga un if dentro del for
            return IfConditional(instr.condicionIf, instr.instruccionesThen, instr.instruccionesElse, _ambito, _contexto);
        }
        if (instr.tipo === Tipos.RETURN_STATEMENT) { // Retorna la salida
            return returnQuery(instr.expresion, _ambito, iterators);
        }
    }
}

export = ForLoop;