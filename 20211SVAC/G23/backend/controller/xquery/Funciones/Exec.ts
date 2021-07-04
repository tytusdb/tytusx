import { Contexto } from "../../Contexto";
import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Variable } from "../../../model/xml/Ambito/Variable";
import { Tipos } from "../../../model/xpath/Enum";
import Expresion from "../../xpath/Expresion/Expresion";

function Exec(_instr: any, _ambito: Ambito, _contexto: Contexto, _id?: any) { // Buscar la función, asignar los nuevos parámetros y ejecutarla.
    let name: string = _instr.name;
    let parametros: Array<any> = _instr.parametros;
    let funcion = _ambito.getFunction(name);

    if (parametros.length !== funcion?.parametros.length)
        return { error: 'El número de parámetros debe coincidir con la cantidad de parámetros de la función', linea: _instr.linea, columna: _instr.columna, origen: "XQuery", tipo: "Semántico" };

    // Declaración de parámetros
    let a: Array<Variable> = [];
    a = a.concat(_contexto.tablaVariables);
    let tmp = new Contexto(_contexto, a);
    let aux: Array<any> = [];
    for (let i = 0; i < parametros.length; i++) {
        const parametro = parametros[i];
        tmp = new Contexto(_contexto, a);
        // LetClause({ variable: funcion.parametros[i].id }, parametro, _ambito, tmp, _id);
        let variable = new Variable(funcion.parametros[i].id, Tipos.VARIABLE, parametro.linea, parametro.columna, 'local:' + name);
        let contexto = Expresion(parametro, _ambito, tmp);
        aux.push({ variable: variable, contexto: contexto });
        // console.log(variable.id, contexto, '\n')
    }

    // Asignar los valores
    for (let i = 0; i < aux.length; i++) {
        const variable = aux[i].variable;
        const contexto = aux[i].contexto;
        if (contexto) {
            variable.setValue(contexto);
            tmp.addVariable(variable);
        }
    }
    tmp = new Contexto(_contexto, a);

    // Ejecutar las instrucciones de la función
    const Bloque_XQuery = require("../Bloque_XQuery");
    let _bloque = Bloque_XQuery.getIterators(funcion.sentencias, _ambito, tmp, _id);
    // console.log(_bloque, 339393939);
    _ambito.tablaVariables = tmp.tablaVariables;
    if (_bloque.parametros) return _bloque.parametros[0];
    return _bloque;
}

export = Exec;